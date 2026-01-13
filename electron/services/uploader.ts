import { spawn, ChildProcess } from 'child_process'
import { BrowserWindow } from 'electron'
import { getITMSTransporterPath } from './environment'
import { addUploadHistory, saveCredential } from './store'
import { sendWebhookNotification } from './webhook'
import * as path from 'path'

export interface UploadConfig {
    ipaPath: string
    appleId: string
    appSpecificPassword: string
    ascProvider?: string  // Team provider shortname
}

export interface UploadResult {
    success: boolean
    errorMessage?: string
}

export interface Provider {
    teamName: string
    teamId: string
    shortName: string
}

// Upload Phase
export type UploadPhase =
    | 'preparing'      // Preparing
    | 'authenticating' // Authenticating
    | 'analyzing'      // Analyzing
    | 'uploading'      // Uploading
    | 'committing'     // Committing
    | 'completed'      // Completed
    | 'failed'         // Failed

export interface UploadProgress {
    phase: UploadPhase
    phaseText: string
    progress: number      // 0-100
    fileName: string
    bytesUploaded?: number
    totalBytes?: number
    speed?: string        // e.g., "4.388 MB/s"
}

let currentUploadProcess: ChildProcess | null = null
let currentUploadConfig: UploadConfig | null = null
let uploadStartTime: string = ''
let currentRetryAttempt: number = 0
let maxRetryAttempts: number = 3
let isCancelledByUser: boolean = false

/**
 * Get available Provider list
 * Execute command: iTMSTransporter -m provider -u email -p password
 */
export async function fetchProviders(appleId: string, password: string): Promise<{ success: boolean; providers?: Provider[]; errorMessage?: string }> {
    return new Promise((resolve) => {
        const iTMSTransporterPath = getITMSTransporterPath()

        const process = spawn(iTMSTransporterPath, [
            '-m', 'provider',
            '-u', appleId,
            '-p', password
        ])

        let stdout = ''
        let stderr = ''

        process.stdout?.on('data', (data: Buffer) => {
            stdout += data.toString()
        })

        process.stderr?.on('data', (data: Buffer) => {
            stderr += data.toString()
        })

        process.on('close', (code: number | null) => {
            if (code === 0) {
                // Parse output to get providers
                const providers: Provider[] = []
                const lines = stdout.split('\n')

                // Check for "Provider listing:" flag
                let inProviderSection = false

                for (const line of lines) {
                    // Check for Provider list start
                    if (line.includes('Provider listing:')) {
                        inProviderSection = true
                        continue
                    }

                    // Skip header line "- Long Name -" or "- Short Name -"
                    if (line.includes('- Long Name -') || line.includes('- Short Name -')) {
                        continue
                    }

                    // Inside Provider section, try to parse data line
                    if (inProviderSection) {
                        // Format: Number  LongName(may contain spaces)  ShortName(usually code)
                        // Example: 1  PLAY CAT NETWORK TECHNOLOGY CO., LIMITED  44FBZ3K49W
                        const tableMatch = line.match(/^\s*(\d+)\s+(.+?)\s{2,}(\S+)\s*$/)
                        if (tableMatch) {
                            providers.push({
                                teamName: tableMatch[2].trim(),
                                teamId: tableMatch[3], // In table format, shortName is ID
                                shortName: tableMatch[3]
                            })
                            continue
                        }
                    }

                    // Try old format: Number. TeamName (TeamId) - ProviderShortName: shortname
                    const oldMatch = line.match(/^\d+\.\s+(.+?)\s+\((\w+)\)\s+-\s+ProviderShortName:\s+(\S+)/)
                    if (oldMatch) {
                        providers.push({
                            teamName: oldMatch[1].trim(),
                            teamId: oldMatch[2],
                            shortName: oldMatch[3]
                        })
                    }

                    // Try DBG-X output format for provider info
                    // Example: parameter PLAY CAT NETWORK TECHNOLOGY CO., LIMITED = 44FBZ3K49W
                    const dbgMatch = line.match(/parameter\s+(.+?)\s+=\s+(\w+)/)
                    if (dbgMatch && !line.includes('Application') && !line.includes('Version') && !line.includes('OSIdentifier')) {
                        // Exclude common non-provider parameters
                        const name = dbgMatch[1].trim()
                        const shortName = dbgMatch[2]
                        // Check if it looks like a provider (shortName is usually Alphanumeric)
                        if (/^[A-Z0-9]{8,12}$/.test(shortName)) {
                            // Avoid duplicate addition
                            if (!providers.find(p => p.shortName === shortName)) {
                                providers.push({
                                    teamName: name,
                                    teamId: shortName,
                                    shortName
                                })
                            }
                        }
                    }
                }

                if (providers.length > 0) {
                    resolve({ success: true, providers })
                } else {
                    // Last attempt: Search for any pattern that looks like provider shortName
                    const shortNameMatch = stdout.match(/ProviderShortName[:\s]+(\S+)/g)
                    if (shortNameMatch) {
                        shortNameMatch.forEach((m, index) => {
                            const shortName = m.replace(/ProviderShortName[:\s]+/, '').trim()
                            providers.push({
                                teamName: `Team ${index + 1}`,
                                teamId: shortName,
                                shortName
                            })
                        })
                        resolve({ success: true, providers })
                    } else {
                        resolve({ success: false, errorMessage: 'Failed to parse Provider list. Please enter Provider Shortname manually.' })
                    }
                }
            } else {
                resolve({
                    success: false,
                    errorMessage: stderr || `Failed to get Provider (Exit code: ${code})`
                })
            }
        })

        process.on('error', (error: Error) => {
            resolve({ success: false, errorMessage: error.message })
        })
    })
}

/**
 * Parse log line for upload progress
 */
function parseProgress(text: string, fileName: string): UploadProgress | null {
    // Match: Package upload progress: XX.XX% completed
    const progressMatch = text.match(/Package upload progress:\s*([\d.]+)%\s*completed/)
    if (progressMatch) {
        const progress = parseFloat(progressMatch[1])
        return {
            phase: 'uploading',
            phaseText: 'Uploading',
            progress,
            fileName
        }
    }

    // Match: File: a.ipa 647498011/647596315, 99.98% completed
    const fileProgressMatch = text.match(/File:\s*\S+\s+(\d+)\/(\d+),\s*([\d.]+)%\s*completed/)
    if (fileProgressMatch) {
        const bytesUploaded = parseInt(fileProgressMatch[1])
        const totalBytes = parseInt(fileProgressMatch[2])
        const progress = parseFloat(fileProgressMatch[3])
        return {
            phase: 'uploading',
            phaseText: 'Uploading',
            progress,
            fileName,
            bytesUploaded,
            totalBytes
        }
    }

    // Match: Finished part upload for: (a.ipa/8) 4.388 MB/s in 15.293 secs
    const finishedMatch = text.match(/Finished part upload.*?([\d.]+)\s*MB\/s/)
    if (finishedMatch) {
        return {
            phase: 'uploading',
            phaseText: 'Uploading',
            progress: 100,
            fileName,
            speed: `${finishedMatch[1]} MB/s`
        }
    }

    return null
}

/**
 * Parse log line for upload phase
 */
function parsePhase(text: string, fileName: string): UploadProgress | null {
    // Authentication phase
    if (text.includes('authenticateForSession') || text.includes('Configuring logging')) {
        return {
            phase: 'authenticating',
            phaseText: 'Authenticating',
            progress: 0,
            fileName
        }
    }

    // Analysis phase
    if (text.includes('Performing analysis') || text.includes('Configuring the Software Uploader')) {
        return {
            phase: 'analyzing',
            phaseText: 'Analyzing',
            progress: 0,
            fileName
        }
    }

    // Start upload
    if (text.includes('Starting upload for package') || text.includes('Computing total size')) {
        return {
            phase: 'uploading',
            phaseText: 'Preparing upload',
            progress: 0,
            fileName
        }
    }

    // Commit phase
    if (text.includes('Committing reservation') || text.includes('Transfer Metrics Summary')) {
        return {
            phase: 'committing',
            phaseText: 'Committing',
            progress: 100,
            fileName
        }
    }

    // Upload success
    if (text.includes('package was uploaded successfully') || text.includes('Package Summary')) {
        return {
            phase: 'completed',
            phaseText: 'Completed',
            progress: 100,
            fileName
        }
    }

    // Error detection
    if (text.includes('ERROR:') || text.includes('Upload Failed') || text.includes('Could not upload')) {
        return {
            phase: 'failed',
            phaseText: 'Failed',
            progress: 0,
            fileName
        }
    }

    return null
}

/**
 * Start uploading IPA file with retry logic
 */
export async function startUpload(
    config: UploadConfig,
    mainWindow: BrowserWindow,
    retryAttempts: number = 3
): Promise<UploadResult> {
    maxRetryAttempts = retryAttempts
    currentRetryAttempt = 0
    isCancelledByUser = false

    let lastResult: UploadResult = { success: false, errorMessage: 'Unknown error' }

    while (currentRetryAttempt < maxRetryAttempts) {
        currentRetryAttempt++

        if (isCancelledByUser) {
            return { success: false, errorMessage: 'User cancelled upload' }
        }

        if (currentRetryAttempt > 1) {
            sendLog(mainWindow, `---`)
            sendLog(mainWindow, `[RETRY] Attempt ${currentRetryAttempt} of ${maxRetryAttempts}...`)
            // Send retry progress to UI
            mainWindow.webContents.send('upload-retry', {
                attempt: currentRetryAttempt,
                maxAttempts: maxRetryAttempts
            })
            // Wait 2 seconds before retry
            await new Promise(resolve => setTimeout(resolve, 2000))
        }

        lastResult = await performSingleUpload(config, mainWindow)

        if (lastResult.success || isCancelledByUser) {
            return lastResult
        }

        // Check if we should retry
        if (currentRetryAttempt < maxRetryAttempts) {
            sendLog(mainWindow, `[INFO] Upload failed, will retry (${maxRetryAttempts - currentRetryAttempt} attempts remaining)...`)
        }
    }

    return lastResult
}

/**
 * Perform a single upload attempt (internal function)
 */
function performSingleUpload(
    config: UploadConfig,
    mainWindow: BrowserWindow
): Promise<UploadResult> {
    return new Promise((resolve) => {
        const iTMSTransporterPath = getITMSTransporterPath()
        const fileName = path.basename(config.ipaPath)

        uploadStartTime = new Date().toISOString()
        currentUploadConfig = config

        // Send initial progress status
        sendProgress(mainWindow, {
            phase: 'preparing',
            phaseText: 'Preparing',
            progress: 0,
            fileName
        })

        // Send start log
        sendLog(mainWindow, `[INFO] Start upload: ${fileName}`)
        sendLog(mainWindow, `[INFO] Apple ID: ${config.appleId}`)
        if (config.ascProvider) {
            sendLog(mainWindow, `[INFO] Provider: ${config.ascProvider}`)
        }
        sendLog(mainWindow, `[INFO] Using iTMSTransporter: ${iTMSTransporterPath}`)
        sendLog(mainWindow, '---')

        // Build command arguments
        const args = [
            '-m', 'upload',
            '-assetFile', config.ipaPath,
            '-u', config.appleId,
            '-p', config.appSpecificPassword
        ]

        // If provider exists, add -asc_provider argument
        if (config.ascProvider) {
            args.push('-asc_provider', config.ascProvider)
        }

        // Start iTMSTransporter process
        currentUploadProcess = spawn(iTMSTransporterPath, args)

        let errorOutput = ''
        let lastProgress: UploadProgress | null = null

        // Handle output and parse progress
        const handleOutput = (text: string, isError: boolean = false) => {
            // Send log
            if (isError) {
                sendLog(mainWindow, `[ERROR] ${text}`)
            } else {
                sendLog(mainWindow, text)
            }

            // Parse progress
            const progress = parseProgress(text, fileName)
            if (progress) {
                lastProgress = progress
                sendProgress(mainWindow, progress)
                return
            }

            // Parse phase
            const phase = parsePhase(text, fileName)
            if (phase) {
                // Keep previous progress percentage (if same phase)
                if (lastProgress && phase.phase === 'uploading' && lastProgress.phase === 'uploading') {
                    phase.progress = lastProgress.progress
                }
                lastProgress = phase
                sendProgress(mainWindow, phase)
            }
        }

        // Listen to stdout
        currentUploadProcess.stdout?.on('data', (data: Buffer) => {
            const text = data.toString()
            // Split by line and process
            const lines = text.split('\n').filter(line => line.trim())
            lines.forEach(line => handleOutput(line))
        })

        // Listen to stderr
        currentUploadProcess.stderr?.on('data', (data: Buffer) => {
            const text = data.toString()
            errorOutput += text
            const lines = text.split('\n').filter(line => line.trim())
            lines.forEach(line => handleOutput(line, true))
        })

        // Listen for process exit
        currentUploadProcess.on('close', (code: number | null) => {
            const endTime = new Date().toISOString()

            if (code === 0) {
                sendLog(mainWindow, '---')
                sendLog(mainWindow, '[SUCCESS] Upload Completed!')

                sendProgress(mainWindow, {
                    phase: 'completed',
                    phaseText: 'Completed',
                    progress: 100,
                    fileName
                })

                // Save credential (upload success)
                saveCredential(config.appleId, config.appSpecificPassword)

                // Add upload history
                addUploadHistory({
                    fileName,
                    filePath: config.ipaPath,
                    appleId: config.appleId,
                    status: 'success',
                    startTime: uploadStartTime,
                    endTime
                })

                mainWindow.webContents.send('upload-complete', { success: true })

                // Send webhook notification for success
                sendWebhookNotification({
                    fileName,
                    status: 'success',
                    appleId: config.appleId,
                    startTime: uploadStartTime,
                    endTime
                })

                resolve({ success: true })
            } else {
                sendLog(mainWindow, '---')
                sendLog(mainWindow, `[FAILED] Upload Failed (Exit code: ${code})`)

                sendProgress(mainWindow, {
                    phase: 'failed',
                    phaseText: 'Failed',
                    progress: lastProgress?.progress || 0,
                    fileName
                })

                // Add upload history (failed)
                addUploadHistory({
                    fileName,
                    filePath: config.ipaPath,
                    appleId: config.appleId,
                    status: 'failed',
                    startTime: uploadStartTime,
                    endTime,
                    errorMessage: errorOutput || `Exit code: ${code}`
                })

                mainWindow.webContents.send('upload-complete', {
                    success: false,
                    errorMessage: errorOutput || `Exit code: ${code}`
                })

                // Send webhook notification for failure
                sendWebhookNotification({
                    fileName,
                    status: 'failed',
                    appleId: config.appleId,
                    startTime: uploadStartTime,
                    endTime,
                    errorMessage: errorOutput || `Exit code: ${code}`
                })

                resolve({ success: false, errorMessage: errorOutput || `Exit code: ${code}` })
            }

            currentUploadProcess = null
            currentUploadConfig = null
        })

        // Listen for process error
        currentUploadProcess.on('error', (error: Error) => {
            const endTime = new Date().toISOString()

            sendLog(mainWindow, `[ERROR] Process failed to start: ${error.message}`)

            sendProgress(mainWindow, {
                phase: 'failed',
                phaseText: 'Start failed',
                progress: 0,
                fileName
            })

            // Add upload history (failed)
            addUploadHistory({
                fileName,
                filePath: config.ipaPath,
                appleId: config.appleId,
                status: 'failed',
                startTime: uploadStartTime,
                endTime,
                errorMessage: error.message
            })

            mainWindow.webContents.send('upload-complete', {
                success: false,
                errorMessage: error.message
            })

            // Send webhook notification for process error
            sendWebhookNotification({
                fileName,
                status: 'failed',
                appleId: config.appleId,
                startTime: uploadStartTime,
                endTime,
                errorMessage: error.message
            })

            resolve({ success: false, errorMessage: error.message })

            currentUploadProcess = null
            currentUploadConfig = null
        })
    })
}

/**
 * Cancel upload
 */
export function cancelUpload(mainWindow: BrowserWindow): boolean {
    isCancelledByUser = true
    if (currentUploadProcess && currentUploadConfig) {
        const fileName = path.basename(currentUploadConfig.ipaPath)

        sendLog(mainWindow, '[INFO] Cancelling upload...')

        sendProgress(mainWindow, {
            phase: 'failed',
            phaseText: 'Cancelled',
            progress: 0,
            fileName
        })

        // Record cancelled upload history
        const endTime = new Date().toISOString()
        const appleId = currentUploadConfig.appleId
        const ipaPath = currentUploadConfig.ipaPath
        addUploadHistory({
            fileName,
            filePath: ipaPath,
            appleId: appleId,
            status: 'cancelled',
            startTime: uploadStartTime,
            endTime,
            errorMessage: 'User cancelled upload'
        })

        // Send webhook notification for cancellation (before nullifying config)
        sendWebhookNotification({
            fileName,
            status: 'cancelled',
            appleId: appleId,
            startTime: uploadStartTime,
            endTime,
            errorMessage: 'User cancelled upload'
        })

        currentUploadProcess.kill('SIGTERM')
        currentUploadProcess = null
        currentUploadConfig = null

        sendLog(mainWindow, '[INFO] Upload cancelled')
        mainWindow.webContents.send('upload-complete', {
            success: false,
            errorMessage: 'User cancelled upload'
        })

        return true
    }
    return false
}

/**
 * Check if uploading
 */
export function isUploading(): boolean {
    return currentUploadProcess !== null
}

/**
 * Send log to renderer process
 */
function sendLog(mainWindow: BrowserWindow, message: string): void {
    mainWindow.webContents.send('upload-log', {
        timestamp: new Date().toISOString(),
        message
    })
}

/**
 * Send progress to renderer process
 */
function sendProgress(mainWindow: BrowserWindow, progress: UploadProgress): void {
    mainWindow.webContents.send('upload-progress', progress)
}
