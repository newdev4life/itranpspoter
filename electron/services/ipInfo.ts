import { net, BrowserWindow } from 'electron'

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
    query: string // IP address
}

/**
 * Fetch IP information from ip-api.com
 * This is a free API that provides IP geolocation data
 */
export async function getIpInfo(): Promise<IpInfo | null> {
    return new Promise((resolve) => {
        const request = net.request({
            method: 'GET',
            url: 'http://ip-api.com/json'
        })

        let responseData = ''

        request.on('response', (response) => {
            response.on('data', (chunk) => {
                responseData += chunk.toString()
            })

            response.on('end', () => {
                try {
                    const data = JSON.parse(responseData) as IpInfo
                    if (data.status === 'success') {
                        resolve(data)
                    } else {
                        resolve(null)
                    }
                } catch {
                    resolve(null)
                }
            })

            response.on('error', () => {
                resolve(null)
            })
        })

        request.on('error', () => {
            resolve(null)
        })

        // Set timeout to 10 seconds
        setTimeout(() => {
            request.abort()
            resolve(null)
        }, 10000)

        request.end()
    })
}

// ==================== IP Monitor ====================

const POLL_INTERVAL_MS = 30_000 // 30 seconds

let monitorTimer: ReturnType<typeof setInterval> | null = null
let lastIpInfo: IpInfo | null = null

/**
 * Returns the last known IP info from the monitor cache.
 * Falls back to a fresh fetch if the cache is empty.
 */
export async function getLastIpInfo(): Promise<IpInfo | null> {
    if (lastIpInfo) return lastIpInfo
    const info = await getIpInfo()
    if (info) lastIpInfo = info
    return info
}

/**
 * Start periodic IP monitoring.
 * Polls ip-api.com every 30s and sends 'ip-changed' to all BrowserWindows
 * when the IP address changes.
 */
export function startIpMonitor(): void {
    // Do an initial fetch to populate cache
    getIpInfo().then(info => {
        if (info) lastIpInfo = info
    })

    if (monitorTimer) return // already running

    monitorTimer = setInterval(async () => {
        const newInfo = await getIpInfo()
        if (!newInfo) return // network error — keep previous value

        const ipChanged = lastIpInfo && lastIpInfo.query !== newInfo.query
        lastIpInfo = newInfo

        if (ipChanged) {
            // Push change to all renderer windows
            for (const win of BrowserWindow.getAllWindows()) {
                win.webContents.send('ip-changed', newInfo)
            }
        }
    }, POLL_INTERVAL_MS)
}

/**
 * Stop the IP monitor polling.
 */
export function stopIpMonitor(): void {
    if (monitorTimer) {
        clearInterval(monitorTimer)
        monitorTimer = null
    }
}
