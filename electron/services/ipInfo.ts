import { net } from 'electron'

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
