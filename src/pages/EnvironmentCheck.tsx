import { useState, useEffect } from 'react'
import { EnvironmentStatus } from '../types'
import { useTranslation } from '../i18n'
import './EnvironmentCheck.css'

interface EnvironmentCheckProps {
    onReady: () => void
}

export function EnvironmentCheck({ onReady }: EnvironmentCheckProps) {
    const { t } = useTranslation()
    const [status, setStatus] = useState<EnvironmentStatus | null>(null)
    const [loading, setLoading] = useState(true)
    const [installing, setInstalling] = useState(false)
    const [installMessage, setInstallMessage] = useState('')

    const checkEnvironment = async () => {
        setLoading(true)
        setInstallMessage('')
        try {
            const result = await window.api.checkEnvironment()
            setStatus(result)
            if (result.allReady) {
                // Automatically redirect to upload page
                setTimeout(() => onReady(), 1000)
            }
        } catch (error) {
            console.error('Environment check failed:', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        checkEnvironment()
    }, [])

    const openTransporterDownload = () => {
        // Open Transporter page on Mac App Store
        window.api.openExternal('https://apps.apple.com/app/transporter/id1450874784')
    }

    const installCLT = async () => {
        setInstalling(true)
        setInstallMessage('')
        try {
            const result = await window.api.installCommandLineTools()
            setInstallMessage(result.message)
            if (result.success) {
                // Wait for a while and recheck
                setTimeout(() => {
                    checkEnvironment()
                }, 3000)
            }
        } catch (error) {
            setInstallMessage(t('env.install_fail'))
        }
        setInstalling(false)
    }

    // Render Helpers
    const renderStatusIcon = (isSuccess: boolean) => {
        return isSuccess ? (
            <div className="status-icon-check"></div>
        ) : (
            <div className="status-icon-pending"></div>
        )
    }

    // Main Content
    return (
        <div className="environment-check animate-fade-in">
            {/* Header */}
            <div className="check-header">
                {loading ? (
                    <div className="check-spinner-wrapper">
                        <div className="check-spinner"></div>
                    </div>
                ) : status?.allReady ? (
                    <span className="check-icon-large">✅</span>
                ) : (
                    <span className="check-icon-large" style={{ fontSize: '48px' }}>⚠️</span>
                )}

                <h2>{loading ? t('env.checking') : (status?.allReady ? t('env.passed') : t('env.failed'))}</h2>
                <p>{t('env.desc')}</p>
            </div>

            {/* List Card */}
            {status && (
                <div className="status-list-card">
                    {/* Transporter Item */}
                    <div className="status-list-item">
                        <div className="status-item-info">
                            <span className="status-item-title">{t('env.transporter')}</span>
                            <span className="status-item-desc">
                                {status.transporterInstalled
                                    ? t('env.installed')
                                    : <a href="#" onClick={(e) => { e.preventDefault(); openTransporterDownload(); }} style={{ color: 'var(--color-primary)' }}>{t('env.download')}</a>
                                }
                            </span>
                        </div>
                        <div className="status-item-icon">
                            {renderStatusIcon(status.transporterInstalled)}
                        </div>
                    </div>

                    {/* altool / xcrun Item */}
                    <div className="status-list-item">
                        <div className="status-item-info">
                            <span className="status-item-title">{t('env.clt')}</span>
                            <span className="status-item-desc">
                                {status.commandLineToolsInstalled
                                    ? t('env.ready')
                                    : (installing ? t('env.installing') : <a href="#" onClick={(e) => { e.preventDefault(); installCLT(); }} style={{ color: 'var(--color-primary)' }}>{t('env.install_clt')}</a>)
                                }
                            </span>
                        </div>
                        <div className="status-item-icon">
                            {renderStatusIcon(status.commandLineToolsInstalled)}
                        </div>
                    </div>
                </div>
            )}

            {/* Error/Install Messages */}
            {installMessage && (
                <div style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--color-text-secondary)' }}>
                    <p>{installMessage}</p>
                </div>
            )}

            {/* Actions (if failed) */}
            {!loading && status && !status.allReady && (
                <div className="check-actions">
                    <button className="btn btn-primary" onClick={checkEnvironment} disabled={installing}>
                        {t('env.recheck')}
                    </button>
                </div>
            )}
        </div>
    )
}
