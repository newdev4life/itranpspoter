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
                const providers: Provider[] = []
                const lines = stdout.split('\n')

                // 检测是否有 "Provider listing:" 标志
                let inProviderSection = false

                for (const line of lines) {
                    // 检测 Provider 列表开始
                    if (line.includes('Provider listing:')) {
                        inProviderSection = true
                        continue
                    }

                    // 跳过表头行 "- Long Name -" 或 "- Short Name -"
                    if (line.includes('- Long Name -') || line.includes('- Short Name -')) {
                        continue
                    }

                    // 在 Provider 区域内，尝试解析数据行
                    if (inProviderSection) {
                        // 格式: 数字  长名称(可能包含空格)  短名称(通常是代码)
                        // 例: 1  PLAY CAT NETWORK TECHNOLOGY CO., LIMITED  44FBZ3K49W
                        const tableMatch = line.match(/^\s*(\d+)\s+(.+?)\s{2,}(\S+)\s*$/)
                        if (tableMatch) {
                            providers.push({
                                teamName: tableMatch[2].trim(),
                                teamId: tableMatch[3], // 在表格格式中，shortName 就是 ID
                                shortName: tableMatch[3]
                            })
                            continue
                        }
                    }

                    // 尝试旧格式: 数字. TeamName (TeamId) - ProviderShortName: shortname
                    const oldMatch = line.match(/^\d+\.\s+(.+?)\s+\((\w+)\)\s+-\s+ProviderShortName:\s+(\S+)/)
                    if (oldMatch) {
                        providers.push({
                            teamName: oldMatch[1].trim(),
                            teamId: oldMatch[2],
                            shortName: oldMatch[3]
                        })
                    }

                    // 尝试 DBG-X 输出格式中的 provider 信息
                    // 例: parameter PLAY CAT NETWORK TECHNOLOGY CO., LIMITED = 44FBZ3K49W
                    const dbgMatch = line.match(/parameter\s+(.+?)\s+=\s+(\w+)/)
                    if (dbgMatch && !line.includes('Application') && !line.includes('Version') && !line.includes('OSIdentifier')) {
                        // 排除一些常见的非 provider 参数
                        const name = dbgMatch[1].trim()
                        const shortName = dbgMatch[2]
                        // 检查是否看起来像是 provider (shortName 通常是数字+字母组合)
                        if (/^[A-Z0-9]{8,12}$/.test(shortName)) {
                            // 避免重复添加
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
                    // 最后尝试: 搜索任何看起来像 provider shortName 的模式
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
                        resolve({ success: false, errorMessage: '未能解析 Provider 列表。请手动输入 Provider Shortname。' })
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
