// Environment Status
export interface EnvironmentStatus {
    transporterInstalled: boolean
    transporterPath: string
    iTMSTransporterPath: string
    iTMSTransporterExists: boolean
    standaloneITMSTransporterExists: boolean
    standaloneITMSTransporterPath: string
    commandLineToolsInstalled: boolean
    commandLineToolsPath: string
    allReady: boolean
}

// Credential
export interface Credential {
    appleId: string
    password: string
    lastUsed: string
    uploadCount: number
}

// Credential List Item (No Password)
export interface CredentialListItem {
    appleId: string
    lastUsed: string
    uploadCount: number
}

// Provider (Team)
export interface Provider {
    teamName: string
    teamId: string
    shortName: string
}

// Upload History Record
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

// Upload Config
export interface UploadConfig {
    ipaPath: string
    appleId: string
    appSpecificPassword: string
    ascProvider?: string
    retryAttempts?: number
}

// Upload Result
export interface UploadResult {
    success: boolean
    errorMessage?: string
}

// Provider Fetch Result
export interface FetchProvidersResult {
    success: boolean
    providers?: Provider[]
    errorMessage?: string
}

// Log Message
export interface LogMessage {
    timestamp: string
    message: string
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

// Upload Progress
export interface UploadProgress {
    phase: UploadPhase
    phaseText: string
    progress: number      // 0-100
    fileName: string
    bytesUploaded?: number
    totalBytes?: number
    speed?: string
}

// Page Type
export type Page = 'environment' | 'upload' | 'progress' | 'history' | 'credentials' | 'settings'

// IP Info
export interface IpInfo {
    status: string
    country: string
    countryCode: string
    region: string
    regionName: string
    city: string
    zip: string
    lat: number
    lon: number
    timezone: string
    isp: string
    org: string
    as: string
    query: string
}

// Webhook Settings
export interface WebhookSettings {
    url: string
    enabled: boolean
}

// Webhook Test Result
export interface WebhookTestResult {
    success: boolean
    code?: number
    message?: string
}

// Declare Global API Types
declare global {
    interface Window {
        api: {
            checkEnvironment: () => Promise<EnvironmentStatus>
            installCommandLineTools: () => Promise<{ success: boolean; message: string }>
            openExternal: (url: string) => Promise<void>
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
            onUploadRetry: (callback: (event: any, data: { attempt: number; maxAttempts: number }) => void) => void
            offUploadRetry: (callback: (event: any, data: { attempt: number; maxAttempts: number }) => void) => void
            getCredentialsList: () => Promise<CredentialListItem[]>
            getCredential: (appleId: string) => Promise<Credential | null>
            saveCredential: (data: { appleId: string; password: string }) => Promise<boolean>
            deleteCredential: (appleId: string) => Promise<boolean>
            getUploadHistory: () => Promise<UploadHistoryRecord[]>
            clearUploadHistory: () => Promise<boolean>
            deleteUploadHistory: (id: string) => Promise<boolean>
            // IP Info
            getIpInfo: () => Promise<IpInfo | null>
            // Webhook Settings
            getWebhookSettings: () => Promise<WebhookSettings>
            setWebhookSettings: (settings: WebhookSettings) => Promise<boolean>
            testWebhook: (url: string) => Promise<WebhookTestResult>
            // Context Menu
            onContextMenu: (callback: (event: any, data: { isEditable: boolean; hasSelection: boolean; editFlags: any; x: number; y: number }) => void) => void
            offContextMenu: (callback: (event: any, data: any) => void) => void
            execCommand: (command: string) => void
        }
    }
}


export { }
