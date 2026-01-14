import { useState, useEffect } from 'react'
import { EnvironmentStatus, IpInfo } from '../types'
import { useTranslation } from '../i18n'
import './StatusSidebar.css'

interface StatusSidebarProps {
    onEnvironmentReady?: (ready: boolean) => void
}

export function StatusSidebar({ onEnvironmentReady }: StatusSidebarProps) {
    const { t } = useTranslation()
    const [status, setStatus] = useState<EnvironmentStatus | null>(null)
    const [loading, setLoading] = useState(true)
    const [installing, setInstalling] = useState(false)
    const [ipInfo, setIpInfo] = useState<IpInfo | null>(null)
    const [ipLoading, setIpLoading] = useState(true)

    const checkEnvironment = async () => {
        setLoading(true)
        try {
            const result = await window.api.checkEnvironment()
            setStatus(result)
            onEnvironmentReady?.(result.allReady)
        } catch (error) {
            console.error('Environment check failed:', error)
        }
        setLoading(false)
    }

    const fetchIpInfo = async () => {
        setIpLoading(true)
        try {
            const info = await window.api.getIpInfo()
            setIpInfo(info)
        } catch (error) {
            console.error('Failed to fetch IP info:', error)
        }
        setIpLoading(false)
    }

    useEffect(() => {
        checkEnvironment()
        fetchIpInfo()
    }, [])

    const openTransporterDownload = () => {
        window.api.openExternal('https://apps.apple.com/app/transporter/id1450874784')
    }

    const openITMSDownload = () => {
        window.api.openExternal('https://help.apple.com/itc/transporteruserguide/en.lproj/static.html#apdAe41970bd')
    }

    const installCLT = async () => {
        setInstalling(true)
        try {
            const result = await window.api.installCommandLineTools()
            if (result.success) {
                setTimeout(() => {
                    checkEnvironment()
                }, 3000)
            }
        } catch (error) {
            console.error('Install failed:', error)
        }
        setInstalling(false)
    }

    const getStatusIcon = (isOk: boolean) => {
        if (isOk) {
            return <span className="status-icon status-ok">✓</span>
        }
        return <span className="status-icon status-pending">○</span>
    }

    // Get country flag emoji based on country code
    const getCountryFlag = (countryCode: string) => {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0))
        return String.fromCodePoint(...codePoints)
    }

    const transporterOk = status?.iTMSTransporterExists || status?.standaloneITMSTransporterExists
    const cltOk = status?.commandLineToolsInstalled

    return (
        <div className="status-sidebar">
            <div className="sidebar-header">
                <h3>{t('env.title')}</h3>
                <button
                    className="btn-recheck"
                    onClick={checkEnvironment}
                    disabled={loading}
                    title={t('env.recheck')}
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.67 2.33C10.47 1.13 8.84 0.5 7 0.5C3.41 0.5 0.51 3.41 0.51 7C0.51 10.59 3.41 13.5 7 13.5C10.01 13.5 12.49 11.47 13.17 8.75H11.67C11.03 10.66 9.18 12 7 12C4.24 12 2 9.76 2 7C2 4.24 4.24 2 7 2C8.38 2 9.61 2.57 10.53 3.47L8 6H14V0L11.67 2.33Z" fill="currentColor" />
                    </svg>
                </button>
            </div>

            {loading ? (
                <div className="sidebar-loading">
                    <div className="loading-spinner small"></div>
                    <span>{t('env.checking')}</span>
                </div>
            ) : (
                <div className="status-checklist">
                    {/* Transporter Status */}
                    <div className={`status-item ${transporterOk ? 'ok' : 'pending'}`}>
                        <div className="status-row">
                            {getStatusIcon(transporterOk || false)}
                            <span className="status-label">{t('env.transporter')}</span>
                        </div>
                        {!transporterOk && (
                            <div className="status-action">
                                <a href="#" onClick={(e) => { e.preventDefault(); openTransporterDownload(); }}>
                                    {t('env.download')}
                                </a>
                                <span className="or-divider">/</span>
                                <a href="#" onClick={(e) => { e.preventDefault(); openITMSDownload(); }}>
                                    iTMS
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Command Line Tools Status */}
                    <div className={`status-item ${cltOk ? 'ok' : 'pending'}`}>
                        <div className="status-row">
                            {getStatusIcon(cltOk || false)}
                            <span className="status-label">{t('env.clt')}</span>
                        </div>
                        {!cltOk && (
                            <div className="status-action">
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); installCLT(); }}
                                    className={installing ? 'disabled' : ''}
                                >
                                    {installing ? t('env.installing') : t('env.install_clt')}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Overall Status */}
            {status && (
                <div className={`overall-status ${status.allReady ? 'ready' : 'not-ready'}`}>
                    {status.allReady ? (
                        <>
                            <span className="overall-icon">✓</span>
                            <span>{t('env.passed')}</span>
                        </>
                    ) : (
                        <>
                            <span className="overall-icon">⚠</span>
                            <span>{t('env.failed')}</span>
                        </>
                    )}
                </div>
            )}

            {/* Network Info Section */}
            <div className="sidebar-section-divider"></div>
            <div className="sidebar-header">
                <h3>{t('ipinfo.title')}</h3>
            </div>

            {ipLoading ? (
                <div className="sidebar-loading compact">
                    <div className="loading-spinner small"></div>
                    <span>{t('ipinfo.loading')}</span>
                </div>
            ) : ipInfo ? (
                <div className="network-info-compact">
                    <div className="network-info-row">
                        <span className="network-flag">{getCountryFlag(ipInfo.countryCode)}</span>
                        <div className="network-location">
                            <span className="network-city">{ipInfo.city}, {ipInfo.country}</span>
                            <span className="network-ip">{ipInfo.query}</span>
                        </div>
                    </div>
                    <div className="network-isp">
                        <span className="isp-label">{t('ipinfo.org')}</span>
                        <span className="isp-value" title={ipInfo.isp}>{ipInfo.isp}</span>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
