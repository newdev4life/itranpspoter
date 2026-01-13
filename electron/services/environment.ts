import * as fs from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export interface EnvironmentStatus {
    transporterInstalled: boolean
    transporterPath: string
    iTMSTransporterPath: string
    iTMSTransporterExists: boolean
    // Standalone iTMSTransporter (installed separately without Transporter.app)
    standaloneITMSTransporterExists: boolean
    standaloneITMSTransporterPath: string
    commandLineToolsInstalled: boolean
    commandLineToolsPath: string
    allReady: boolean
}

const TRANSPORTER_PATH = '/Applications/Transporter.app'
const ITMS_TRANSPORTER_PATH = '/Applications/Transporter.app/Contents/itms/bin/iTMSTransporter'
const STANDALONE_ITMS_TRANSPORTER_PATH = '/usr/local/itms/bin/iTMSTransporter'

/**
 * 检查 Transporter.app 是否已安装
 */
export function checkTransporter(): boolean {
    return fs.existsSync(TRANSPORTER_PATH)
}

/**
 * 检查 iTMSTransporter 可执行文件是否存在 (from Transporter.app)
 */
export function checkITMSTransporter(): boolean {
    return fs.existsSync(ITMS_TRANSPORTER_PATH)
}

/**
 * 检查 standalone iTMSTransporter 是否存在 (installed separately)
 */
export function checkStandaloneITMSTransporter(): boolean {
    return fs.existsSync(STANDALONE_ITMS_TRANSPORTER_PATH)
}

/**
 * 检查 Command Line Tools 是否已安装
 */
export async function checkCommandLineTools(): Promise<{ installed: boolean; path: string }> {
    try {
        const { stdout } = await execAsync('xcode-select -p')
        const path = stdout.trim()
        // 检查路径是否实际存在
        if (fs.existsSync(path)) {
            return { installed: true, path }
        }
        return { installed: false, path: '' }
    } catch {
        return { installed: false, path: '' }
    }
}

/**
 * 获取完整的环境状态
 */
export async function getEnvironmentStatus(): Promise<EnvironmentStatus> {
    const transporterInstalled = checkTransporter()
    const iTMSTransporterExists = checkITMSTransporter()
    const standaloneITMSTransporterExists = checkStandaloneITMSTransporter()
    const cltStatus = await checkCommandLineTools()

    // Environment is ready if:
    // - Either Transporter.app with iTMSTransporter exists, OR standalone iTMSTransporter exists
    // - AND Command Line Tools are installed
    const hasAnyITMSTransporter = iTMSTransporterExists || standaloneITMSTransporterExists

    return {
        transporterInstalled,
        transporterPath: TRANSPORTER_PATH,
        iTMSTransporterPath: ITMS_TRANSPORTER_PATH,
        iTMSTransporterExists,
        standaloneITMSTransporterExists,
        standaloneITMSTransporterPath: STANDALONE_ITMS_TRANSPORTER_PATH,
        commandLineToolsInstalled: cltStatus.installed,
        commandLineToolsPath: cltStatus.path,
        allReady: hasAnyITMSTransporter && cltStatus.installed
    }
}

/**
 * 获取 iTMSTransporter 可执行文件路径
 * Prefers Transporter.app path, falls back to standalone installation
 * Throws error if no valid path is found
 */
export function getITMSTransporterPath(): string {
    if (fs.existsSync(ITMS_TRANSPORTER_PATH)) {
        return ITMS_TRANSPORTER_PATH
    }
    if (fs.existsSync(STANDALONE_ITMS_TRANSPORTER_PATH)) {
        return STANDALONE_ITMS_TRANSPORTER_PATH
    }
    throw new Error('iTMSTransporter not found. Please install Transporter from App Store or download standalone iTMSTransporter from Apple.')
}

/**
 * 安装 Command Line Tools
 * 执行 xcode-select --install 命令
 */
export async function installCommandLineTools(): Promise<{ success: boolean; message: string }> {
    try {
        // xcode-select --install 会弹出安装对话框
        await execAsync('xcode-select --install')
        return {
            success: true,
            message: 'Command Line Tools 安装程序已启动，请在弹出的对话框中点击"安装"。'
        }
    } catch (error: any) {
        // 如果已经安装，会返回错误
        if (error.message?.includes('already installed')) {
            return {
                success: true,
                message: 'Command Line Tools 已安装。'
            }
        }
        // xcode-select --install 即使成功也可能返回非零退出码
        // 因为它启动了一个后台安装进程
        if (error.code === 1) {
            return {
                success: true,
                message: 'Command Line Tools 安装程序已启动，请在弹出的对话框中点击"安装"。'
            }
        }
        return {
            success: false,
            message: `安装失败: ${error.message}`
        }
    }
}
