import { spawn, ChildProcess } from 'child_process'
import { BrowserWindow } from 'electron'
import { getITMSTransporterPath } from './environment'
import { addUploadHistory, saveCredential } from './store'
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

// 上传进度状态
export type UploadPhase =
    | 'preparing'      // 准备中
    | 'authenticating' // 认证中
    | 'analyzing'      // 分析包
    | 'uploading'      // 上传中
    | 'committing'     // 提交中
    | 'completed'      // 完成
    | 'failed'         // 失败

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

/**
 * 获取可用的 Provider 列表
 * 执行命令: iTMSTransporter -m provider -u email -p password
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
                // 解析输出获取 providers
                // 输出格式: "1. YourTeamName (12345678) - ProviderShortName: yourteamname"
                const providers: Provider[] = []
                const lines = stdout.split('\n')

                for (const line of lines) {
                    // 匹配格式: 数字. TeamName (TeamId) - ProviderShortName: shortname
                    const match = line.match(/^\d+\.\s+(.+?)\s+\((\w+)\)\s+-\s+ProviderShortName:\s+(\S+)/)
                    if (match) {
                        providers.push({
                            teamName: match[1].trim(),
                            teamId: match[2],
                            shortName: match[3]
                        })
                    }
                }

                if (providers.length > 0) {
                    resolve({ success: true, providers })
                } else {
                    // 尝试另一种解析方式
                    const altMatch = stdout.match(/ProviderShortName:\s*(\S+)/g)
                    if (altMatch) {
                        altMatch.forEach((m, index) => {
                            const shortName = m.replace('ProviderShortName:', '').trim()
                            providers.push({
                                teamName: `Team ${index + 1}`,
                                teamId: '',
                                shortName
                            })
                        })
                        resolve({ success: true, providers })
                    } else {
                        resolve({ success: false, errorMessage: '未能解析 Provider 列表' })
                    }
                }
            } else {
                resolve({
                    success: false,
                    errorMessage: stderr || `获取 Provider 失败 (退出码: ${code})`
                })
            }
        })

        process.on('error', (error: Error) => {
            resolve({ success: false, errorMessage: error.message })
        })
    })
}

/**
 * 解析日志行获取上传进度
 */
function parseProgress(text: string, fileName: string): UploadProgress | null {
    // 匹配: Package upload progress: XX.XX% completed
    const progressMatch = text.match(/Package upload progress:\s*([\d.]+)%\s*completed/)
    if (progressMatch) {
        const progress = parseFloat(progressMatch[1])
        return {
            phase: 'uploading',
            phaseText: '上传中',
            progress,
            fileName
        }
    }

    // 匹配: File: a.ipa 647498011/647596315, 99.98% completed
    const fileProgressMatch = text.match(/File:\s*\S+\s+(\d+)\/(\d+),\s*([\d.]+)%\s*completed/)
    if (fileProgressMatch) {
        const bytesUploaded = parseInt(fileProgressMatch[1])
        const totalBytes = parseInt(fileProgressMatch[2])
        const progress = parseFloat(fileProgressMatch[3])
        return {
            phase: 'uploading',
            phaseText: '上传中',
            progress,
            fileName,
            bytesUploaded,
            totalBytes
        }
    }

    // 匹配: Finished part upload for: (a.ipa/8) 4.388 MB/s in 15.293 secs
    const finishedMatch = text.match(/Finished part upload.*?([\d.]+)\s*MB\/s/)
    if (finishedMatch) {
        return {
            phase: 'uploading',
            phaseText: '上传中',
            progress: 100,
            fileName,
            speed: `${finishedMatch[1]} MB/s`
        }
    }

    return null
}

/**
 * 解析日志行获取上传阶段
 */
function parsePhase(text: string, fileName: string): UploadProgress | null {
    // 认证阶段
    if (text.includes('authenticateForSession') || text.includes('Configuring logging')) {
        return {
            phase: 'authenticating',
            phaseText: '认证中',
            progress: 0,
            fileName
        }
    }

    // 分析阶段
    if (text.includes('Performing analysis') || text.includes('Configuring the Software Uploader')) {
        return {
            phase: 'analyzing',
            phaseText: '分析包中',
            progress: 0,
            fileName
        }
    }

    // 开始上传
    if (text.includes('Starting upload for package') || text.includes('Computing total size')) {
        return {
            phase: 'uploading',
            phaseText: '准备上传',
            progress: 0,
            fileName
        }
    }

    // 提交阶段
    if (text.includes('Committing reservation') || text.includes('Transfer Metrics Summary')) {
        return {
            phase: 'committing',
            phaseText: '提交中',
            progress: 100,
            fileName
        }
    }

    // 上传成功
    if (text.includes('package was uploaded successfully') || text.includes('Package Summary')) {
        return {
            phase: 'completed',
            phaseText: '上传完成',
            progress: 100,
            fileName
        }
    }

    // 错误检测
    if (text.includes('ERROR:') || text.includes('Upload Failed') || text.includes('Could not upload')) {
        return {
            phase: 'failed',
            phaseText: '上传失败',
            progress: 0,
            fileName
        }
    }

    return null
}

/**
 * 开始上传 IPA 文件
 */
export function startUpload(
    config: UploadConfig,
    mainWindow: BrowserWindow
): Promise<UploadResult> {
    return new Promise((resolve) => {
        const iTMSTransporterPath = getITMSTransporterPath()
        const fileName = path.basename(config.ipaPath)

        uploadStartTime = new Date().toISOString()
        currentUploadConfig = config

        // 发送初始进度状态
        sendProgress(mainWindow, {
            phase: 'preparing',
            phaseText: '准备中',
            progress: 0,
            fileName
        })

        // 发送开始日志
        sendLog(mainWindow, `[INFO] 开始上传: ${fileName}`)
        sendLog(mainWindow, `[INFO] Apple ID: ${config.appleId}`)
        if (config.ascProvider) {
            sendLog(mainWindow, `[INFO] Provider: ${config.ascProvider}`)
        }
        sendLog(mainWindow, `[INFO] 使用 iTMSTransporter: ${iTMSTransporterPath}`)
        sendLog(mainWindow, '---')

        // 构建命令参数
        const args = [
            '-m', 'upload',
            '-assetFile', config.ipaPath,
            '-u', config.appleId,
            '-p', config.appSpecificPassword
        ]

        // 如果有 provider，添加 -asc_provider 参数
        if (config.ascProvider) {
            args.push('-asc_provider', config.ascProvider)
        }

        // 启动 iTMSTransporter 进程
        currentUploadProcess = spawn(iTMSTransporterPath, args)

        let errorOutput = ''
        let lastProgress: UploadProgress | null = null

        // 处理输出并解析进度
        const handleOutput = (text: string, isError: boolean = false) => {
            // 发送日志
            if (isError) {
                sendLog(mainWindow, `[ERROR] ${text}`)
            } else {
                sendLog(mainWindow, text)
            }

            // 解析进度
            const progress = parseProgress(text, fileName)
            if (progress) {
                lastProgress = progress
                sendProgress(mainWindow, progress)
                return
            }

            // 解析阶段
            const phase = parsePhase(text, fileName)
            if (phase) {
                // 保持上一次的进度百分比（如果是同一阶段）
                if (lastProgress && phase.phase === 'uploading' && lastProgress.phase === 'uploading') {
                    phase.progress = lastProgress.progress
                }
                lastProgress = phase
                sendProgress(mainWindow, phase)
            }
        }

        // 监听 stdout
        currentUploadProcess.stdout?.on('data', (data: Buffer) => {
            const text = data.toString()
            // 按行分割处理
            const lines = text.split('\n').filter(line => line.trim())
            lines.forEach(line => handleOutput(line))
        })

        // 监听 stderr
        currentUploadProcess.stderr?.on('data', (data: Buffer) => {
            const text = data.toString()
            errorOutput += text
            const lines = text.split('\n').filter(line => line.trim())
            lines.forEach(line => handleOutput(line, true))
        })

        // 监听进程结束
        currentUploadProcess.on('close', (code: number | null) => {
            const endTime = new Date().toISOString()

            if (code === 0) {
                sendLog(mainWindow, '---')
                sendLog(mainWindow, '[SUCCESS] 上传完成!')

                sendProgress(mainWindow, {
                    phase: 'completed',
                    phaseText: '上传完成',
                    progress: 100,
                    fileName
                })

                // 保存凭证（上传成功）
                saveCredential(config.appleId, config.appSpecificPassword)

                // 添加上传历史
                addUploadHistory({
                    fileName,
                    filePath: config.ipaPath,
                    appleId: config.appleId,
                    status: 'success',
                    startTime: uploadStartTime,
                    endTime
                })

                mainWindow.webContents.send('upload-complete', { success: true })
                resolve({ success: true })
            } else {
                sendLog(mainWindow, '---')
                sendLog(mainWindow, `[FAILED] 上传失败 (退出码: ${code})`)

                sendProgress(mainWindow, {
                    phase: 'failed',
                    phaseText: '上传失败',
                    progress: lastProgress?.progress || 0,
                    fileName
                })

                // 添加上传历史（失败）
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
                resolve({ success: false, errorMessage: errorOutput || `Exit code: ${code}` })
            }

            currentUploadProcess = null
            currentUploadConfig = null
        })

        // 监听进程错误
        currentUploadProcess.on('error', (error: Error) => {
            const endTime = new Date().toISOString()

            sendLog(mainWindow, `[ERROR] 进程启动失败: ${error.message}`)

            sendProgress(mainWindow, {
                phase: 'failed',
                phaseText: '启动失败',
                progress: 0,
                fileName
            })

            // 添加上传历史（失败）
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
            resolve({ success: false, errorMessage: error.message })

            currentUploadProcess = null
            currentUploadConfig = null
        })
    })
}

/**
 * 取消上传
 */
export function cancelUpload(mainWindow: BrowserWindow): boolean {
    if (currentUploadProcess && currentUploadConfig) {
        const fileName = path.basename(currentUploadConfig.ipaPath)

        sendLog(mainWindow, '[INFO] 正在取消上传...')

        sendProgress(mainWindow, {
            phase: 'failed',
            phaseText: '已取消',
            progress: 0,
            fileName
        })

        // 记录取消的上传历史
        const endTime = new Date().toISOString()
        addUploadHistory({
            fileName,
            filePath: currentUploadConfig.ipaPath,
            appleId: currentUploadConfig.appleId,
            status: 'cancelled',
            startTime: uploadStartTime,
            endTime,
            errorMessage: '用户取消上传'
        })

        currentUploadProcess.kill('SIGTERM')
        currentUploadProcess = null
        currentUploadConfig = null

        sendLog(mainWindow, '[INFO] 上传已取消')
        mainWindow.webContents.send('upload-complete', {
            success: false,
            errorMessage: '用户取消上传'
        })

        return true
    }
    return false
}

/**
 * 检查是否正在上传
 */
export function isUploading(): boolean {
    return currentUploadProcess !== null
}

/**
 * 发送日志到渲染进程
 */
function sendLog(mainWindow: BrowserWindow, message: string): void {
    mainWindow.webContents.send('upload-log', {
        timestamp: new Date().toISOString(),
        message
    })
}

/**
 * 发送进度到渲染进程
 */
function sendProgress(mainWindow: BrowserWindow, progress: UploadProgress): void {
    mainWindow.webContents.send('upload-progress', progress)
}
