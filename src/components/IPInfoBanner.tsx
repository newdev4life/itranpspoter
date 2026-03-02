import { useState, useEffect } from 'react'
import { useTranslation } from '../i18n'
import { IpInfo } from '../types'
import './IPInfoBanner.css'

export function IPInfoBanner() {
    const { t } = useTranslation()
    const [ipInfo, setIpInfo] = useState<IpInfo | null>(null)
    const [loading, setLoading] = useState(true)
    const [expanded, setExpanded] = useState(false)
    const [ipChanged, setIpChanged] = useState(false)

    useEffect(() => {
        const fetchIpInfo = async () => {
            try {
                const info = await window.api.getIpInfo()
                setIpInfo(info)
            } catch (error) {
                console.error('Failed to fetch IP info:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchIpInfo()
    }, [])

    // Listen for IP changes from the monitor
    useEffect(() => {
        const handleIpChanged = (_event: any, newInfo: IpInfo) => {
            setIpInfo(newInfo)
            setIpChanged(true)
        }

        window.api.onIpChanged(handleIpChanged)
        return () => {
            window.api.offIpChanged(handleIpChanged)
        }
    }, [])

    // Auto-clear the "changed" indicator after 10 seconds
    useEffect(() => {
        if (!ipChanged) return
        const timer = setTimeout(() => setIpChanged(false), 10_000)
        return () => clearTimeout(timer)
    }, [ipChanged])

    if (loading) {
        return (
            <div className="ip-info-banner loading">
                <div className="ip-info-icon">🌐</div>
                <span className="ip-info-loading-text">{t('ipinfo.loading')}</span>
            </div>
        )
    }

    if (!ipInfo) {
        return null
    }

    // Get country flag emoji based on country code
    const getCountryFlag = (countryCode: string) => {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0))
        return String.fromCodePoint(...codePoints)
    }

    return (
        <div className={`ip-info-banner ${expanded ? 'expanded' : ''} ${ipChanged ? 'changed' : ''}`}>
            <div className="ip-info-header">
                <span className="ip-info-title">🌐 {t('ipinfo.title')}</span>
                {ipChanged ? (
                    <span className="ip-info-changed-badge">{t('ipinfo.changed')}</span>
                ) : (
                    <span className="ip-info-subtitle">{t('ipinfo.subtitle')}</span>
                )}
            </div>
            <div className="ip-info-main" onClick={() => setExpanded(!expanded)}>
                <div className="ip-info-left">
                    <span className="ip-info-flag">{getCountryFlag(ipInfo.countryCode)}</span>
                    <div className="ip-info-primary">
                        <span className="ip-info-location">
                            {ipInfo.city}, {ipInfo.regionName}, {ipInfo.country}
                        </span>
                        <span className="ip-info-ip">{ipInfo.query}</span>
                    </div>
                </div>
                <div className="ip-info-right">
                    <span className="ip-info-isp">{ipInfo.isp}</span>
                    <span className={`ip-info-expand-icon ${expanded ? 'rotated' : ''}`}>▾</span>
                </div>
            </div>

            {expanded && (
                <div className="ip-info-details">
                    <div className="ip-info-detail-row">
                        <span className="ip-info-detail-label">🌍 {t('ipinfo.region')}</span>
                        <span className="ip-info-detail-value">{ipInfo.regionName} ({ipInfo.region})</span>
                    </div>
                    <div className="ip-info-detail-row">
                        <span className="ip-info-detail-label">🏢 {t('ipinfo.org')}</span>
                        <span className="ip-info-detail-value">{ipInfo.org}</span>
                    </div>
                    <div className="ip-info-detail-row">
                        <span className="ip-info-detail-label">📍 {t('ipinfo.coordinates')}</span>
                        <span className="ip-info-detail-value">{ipInfo.lat}, {ipInfo.lon}</span>
                    </div>
                    <div className="ip-info-detail-row">
                        <span className="ip-info-detail-label">🕐 {t('ipinfo.timezone')}</span>
                        <span className="ip-info-detail-value">{ipInfo.timezone}</span>
                    </div>
                    <div className="ip-info-detail-row">
                        <span className="ip-info-detail-label">🔌 {t('ipinfo.as')}</span>
                        <span className="ip-info-detail-value">{ipInfo.as}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

