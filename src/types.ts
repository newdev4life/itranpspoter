// 环境状态
export interface EnvironmentStatus {
    transporterInstalled: boolean
    transporterPath: string
    iTMSTransporterPath: string
    iTMSTransporterExists: boolean
    commandLineToolsInstalled: boolean
    commandLineToolsPath: string
    allReady: boolean
}

// 凭证
export interface Credential {
    appleId: string
    password: string
    lastUsed: string
    uploadCount: number
}

// 凭证列表项（不含密码）
export interface CredentialListItem {
    appleId: string
    lastUsed: string
    uploadCount: number
}

// Provider (团队)
export interface Provider {
    teamName: string
    teamId: string
    shortName: string
}

// 上传历史记录
export interface UploadHistoryRecord {
    id: string
    fileName: string
    filePath: string
    appleId: string
    status: 'success' | 'failed' | 'cancelled'
    startTime: string
    endTime: string
    errorMessage?: string
}

// 上传配置
export interface UploadConfig {
    ipaPath: string
    appleId: string
    appSpecificPassword: string
    ascProvider?: string
}

// 上传结果
export interface UploadResult {
    success: boolean
    errorMessage?: string
}

// Provider 获取结果
export interface FetchProvidersResult {
    success: boolean
    providers?: Provider[]
    errorMessage?: string
}

// 日志消息
export interface LogMessage {
    timestamp: string
    message: string
}

// 上传进度阶段
export type UploadPhase =
    | 'preparing'      // 准备中
    | 'authenticating' // 认证中
    | 'analyzing'      // 分析包
    | 'uploading'      // 上传中
    | 'committing'     // 提交中
    | 'completed'      // 完成
    | 'failed'         // 失败

// 上传进度
export interface UploadProgress {
    phase: UploadPhase
    phaseText: string
    progress: number      // 0-100
    fileName: string
    bytesUploaded?: number
    totalBytes?: number
    speed?: string
}

// 页面类型
export type Page = 'environment' | 'upload' | 'progress' | 'history' | 'credentials'

// 声明全局 API 类型
declare global {
    interface Window {
        api: {
            checkEnvironment: () => Promise<EnvironmentStatus>
            installCommandLineTools: () => Promise<{ success: boolean; message: string }>
            selectIpaFile: () => Promise<string | null>
            startUpload: (config: UploadConfig) => Promise<UploadResult>
            cancelUpload: () => Promise<boolean>
            isUploading: () => Promise<boolean>
            fetchProviders: (data: { appleId: string; password: string }) => Promise<FetchProvidersResult>
            onUploadLog: (callback: (event: any, data: LogMessage) => void) => void
            offUploadLog: (callback: (event: any, data: LogMessage) => void) => void
            onUploadProgress: (callback: (event: any, data: UploadProgress) => void) => void
            offUploadProgress: (callback: (event: any, data: UploadProgress) => void) => void
            onUploadComplete: (callback: (event: any, data: UploadResult) => void) => void
            offUploadComplete: (callback: (event: any, data: UploadResult) => void) => void
            getCredentialsList: () => Promise<CredentialListItem[]>
            getCredential: (appleId: string) => Promise<Credential | null>
            saveCredential: (data: { appleId: string; password: string }) => Promise<boolean>
            deleteCredential: (appleId: string) => Promise<boolean>
            getUploadHistory: () => Promise<UploadHistoryRecord[]>
            clearUploadHistory: () => Promise<boolean>
            deleteUploadHistory: (id: string) => Promise<boolean>
            // 上下文菜单
            onContextMenu: (callback: (event: any, data: { isEditable: boolean; hasSelection: boolean; editFlags: any; x: number; y: number }) => void) => void
            offContextMenu: (callback: (event: any, data: any) => void) => void
            execCommand: (command: string) => void
        }
    }
}


export { }
