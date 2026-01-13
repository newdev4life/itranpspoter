import { getWebhookSettings } from './store'

export interface WebhookPayload {
    fileName: string
    status: 'success' | 'failed' | 'cancelled'
    appleId: string
    startTime: string
    endTime: string
    duration?: string  // Human-readable duration for success status
    errorMessage?: string
}

export interface WebhookResult {
    success: boolean
    code?: number
    message?: string
}

/**
 * Format duration from milliseconds to human-readable string
 * e.g., "2m 30s", "1h 5m 20s", "45s"
 */
function formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    const remainingMinutes = minutes % 60
    const remainingSeconds = seconds % 60

    const parts: string[] = []
    if (hours > 0) parts.push(`${hours}h`)
    if (remainingMinutes > 0) parts.push(`${remainingMinutes}m`)
    if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`)

    return parts.join(' ')
}

/**
 * Build the notification message text
 */
function buildMessageText(payload: WebhookPayload): string {
    const statusEmoji = {
        success: '✅',
        failed: '❌',
        cancelled: '⚠️'
    }

    const statusText = {
        success: 'Upload Successful',
        failed: 'Upload Failed',
        cancelled: 'Upload Cancelled'
    }

    let message = `${statusEmoji[payload.status]} ${statusText[payload.status]}\n`
    message += `📦 File: ${payload.fileName}\n`
    message += `👤 Apple ID: ${payload.appleId}\n`

    if (payload.status === 'success' && payload.duration) {
        message += `⏱️ Duration: ${payload.duration}\n`
    }

    if (payload.errorMessage) {
        message += `❗ Error: ${payload.errorMessage}\n`
    }

    message += `🕐 Time: ${new Date(payload.endTime).toLocaleString()}`

    return message
}

/**
 * Send webhook notification
 * Uses Feishu bot webhook format:
 * POST with body: {"msg_type": "text", "content": {"text": "message"}}
 */
export async function sendWebhookNotification(payload: WebhookPayload): Promise<WebhookResult> {
    const settings = getWebhookSettings()

    if (!settings.enabled || !settings.url) {
        return { success: false, message: 'Webhook not enabled or URL not set' }
    }

    // Calculate duration for success status
    if (payload.status === 'success' && payload.startTime && payload.endTime) {
        const startMs = new Date(payload.startTime).getTime()
        const endMs = new Date(payload.endTime).getTime()
        payload.duration = formatDuration(endMs - startMs)
    }

    const messageText = buildMessageText(payload)

    const requestBody = {
        msg_type: 'text',
        content: {
            text: messageText
        }
    }

    try {
        const response = await fetch(settings.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        const data = await response.json()

        // Feishu returns code: 0 for success
        if (data.code === 0 || data.StatusCode === 0) {
            return { success: true, code: 0, message: data.msg || 'success' }
        } else {
            return { success: false, code: data.code, message: data.msg || 'Unknown error' }
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        return { success: false, message: errorMessage }
    }
}

/**
 * Test webhook by sending a test message
 */
export async function testWebhook(url: string): Promise<WebhookResult> {
    const requestBody = {
        msg_type: 'text',
        content: {
            text: '🔔 iTransporter Webhook Test\n\nYour webhook is configured correctly! You will receive notifications when uploads complete.'
        }
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        const data = await response.json()

        if (data.code === 0 || data.StatusCode === 0) {
            return { success: true, code: 0, message: 'Test successful' }
        } else {
            return { success: false, code: data.code, message: data.msg || 'Bad Request' }
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to connect'
        return { success: false, message: errorMessage }
    }
}
