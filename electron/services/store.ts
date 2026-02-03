import Store from 'electron-store'
import * as crypto from 'crypto'

// 加密密钥 - 用于加密 App-Specific Password
const ENCRYPTION_KEY = 'iTransporter-secure-key-2024'

export interface Credential {
    appleId: string
    password: string  // 加密存储
    lastUsed: string  // ISO 时间戳
    uploadCount: number  // 成功上传次数
}

export interface UploadHistoryRecord {
    id: string
    fileName: string
    filePath: string
    appleId: string
    status: 'success' | 'failed' | 'cancelled'
    startTime: string
    endTime: string
    errorMessage?: string
    ipRegion?: string      // IP region, e.g., "Taiwan, Taipei"
    duration?: string      // Upload duration, e.g., "2m 30s"
    uploadLog?: string[]   // Upload log lines
    appInfo?: {            // IPA app info
        bundleId: string
        appName: string
        version: string
        build: string
        minOSVersion?: string
    }
}

export interface WebhookSettings {
    url: string
    enabled: boolean
}

interface StoreSchema {
    credentials: Credential[]
    uploadHistory: UploadHistoryRecord[]
    webhookSettings: WebhookSettings
    retryAttempts: number
}

// 初始化 store
const store = new Store<StoreSchema>({
    name: 'iTransporter-data',
    defaults: {
        credentials: [],
        uploadHistory: [],
        webhookSettings: {
            url: '',
            enabled: false
        },
        retryAttempts: 3
    }
})

/**
 * 简单的 AES 加密
 */
function encrypt(text: string): string {
    const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32)
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return iv.toString('hex') + ':' + encrypted
}

/**
 * 简单的 AES 解密
 */
function decrypt(encryptedText: string): string {
    try {
        const [ivHex, encrypted] = encryptedText.split(':')
        const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32)
        const iv = Buffer.from(ivHex, 'hex')
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
        let decrypted = decipher.update(encrypted, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    } catch {
        return ''
    }
}

// ==================== 凭证管理 ====================

/**
 * 保存凭证（上传成功后调用）
 */
export function saveCredential(appleId: string, password: string): void {
    const credentials = store.get('credentials', [])
    const existingIndex = credentials.findIndex(c => c.appleId === appleId)

    const encryptedPassword = encrypt(password)
    const now = new Date().toISOString()

    if (existingIndex >= 0) {
        // 更新现有凭证
        credentials[existingIndex].password = encryptedPassword
        credentials[existingIndex].lastUsed = now
        credentials[existingIndex].uploadCount += 1
    } else {
        // 添加新凭证
        credentials.push({
            appleId,
            password: encryptedPassword,
            lastUsed: now,
            uploadCount: 1
        })
    }

    store.set('credentials', credentials)
}

/**
 * 获取所有已保存的凭证（密码已解密）
 */
export function getCredentials(): Credential[] {
    const credentials = store.get('credentials', [])
    return credentials.map(c => ({
        ...c,
        password: decrypt(c.password)
    }))
}

/**
 * 获取凭证列表（不包含密码，用于下拉选择）
 */
export function getCredentialsList(): Array<{ appleId: string; lastUsed: string; uploadCount: number }> {
    const credentials = store.get('credentials', [])
    return credentials.map(c => ({
        appleId: c.appleId,
        lastUsed: c.lastUsed,
        uploadCount: c.uploadCount
    }))
}

/**
 * 获取单个凭证（密码已解密）
 */
export function getCredential(appleId: string): Credential | null {
    const credentials = store.get('credentials', [])
    const credential = credentials.find(c => c.appleId === appleId)
    if (credential) {
        return {
            ...credential,
            password: decrypt(credential.password)
        }
    }
    return null
}

/**
 * 删除凭证
 */
export function deleteCredential(appleId: string): boolean {
    const credentials = store.get('credentials', [])
    const newCredentials = credentials.filter(c => c.appleId !== appleId)
    if (newCredentials.length !== credentials.length) {
        store.set('credentials', newCredentials)
        return true
    }
    return false
}

// ==================== 上传历史管理 ====================

/**
 * 添加上传历史记录
 */
export function addUploadHistory(record: Omit<UploadHistoryRecord, 'id'>): UploadHistoryRecord {
    const history = store.get('uploadHistory', [])
    const newRecord: UploadHistoryRecord = {
        ...record,
        id: crypto.randomUUID()
    }

    // 将新记录添加到开头
    history.unshift(newRecord)

    // 限制历史记录数量（最多保存100条）
    if (history.length > 100) {
        history.pop()
    }

    store.set('uploadHistory', history)
    return newRecord
}

/**
 * 获取上传历史
 */
export function getUploadHistory(): UploadHistoryRecord[] {
    return store.get('uploadHistory', [])
}

/**
 * 获取单条上传历史记录（用于查看日志）
 */
export function getUploadHistoryRecord(id: string): UploadHistoryRecord | null {
    const history = store.get('uploadHistory', [])
    return history.find(h => h.id === id) || null
}

/**
 * 清空上传历史
 */
export function clearUploadHistory(): void {
    store.set('uploadHistory', [])
}

/**
 * 删除单条上传历史
 */
export function deleteUploadHistory(id: string): boolean {
    const history = store.get('uploadHistory', [])
    const newHistory = history.filter(h => h.id !== id)
    if (newHistory.length !== history.length) {
        store.set('uploadHistory', newHistory)
        return true
    }
    return false
}

// ==================== Webhook Settings ====================

/**
 * Get webhook settings
 */
export function getWebhookSettings(): WebhookSettings {
    return store.get('webhookSettings', { url: '', enabled: false })
}

/**
 * Set webhook settings
 */
export function setWebhookSettings(settings: WebhookSettings): void {
    store.set('webhookSettings', settings)
}

/**
 * Clear webhook settings
 */
export function clearWebhookSettings(): void {
    store.set('webhookSettings', { url: '', enabled: false })
}

// ==================== Retry Attempts Settings ====================

/**
 * Get retry attempts setting
 */
export function getRetryAttempts(): number {
    return store.get('retryAttempts', 3)
}

/**
 * Set retry attempts setting
 */
export function setRetryAttempts(attempts: number): void {
    store.set('retryAttempts', Math.max(1, Math.min(attempts, 10)))
}
