import { useState, useEffect } from 'react'
import { EnvironmentStatus } from '../types'
import './EnvironmentCheck.css'

interface EnvironmentCheckProps {
    onReady: () => void
}

export function EnvironmentCheck({ onReady }: EnvironmentCheckProps) {
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
            setInstallMessage('Install command failed')
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

                <h2>{loading ? 'Checking Environment' : (status?.allReady ? 'Environment Check Passed' : 'Environment Check Failed')}</h2>
                <p>Ensure Xcode CLT and Transporter are installed on your Mac</p>
            </div>

            {/* List Card */}
            {status && (
                <div className="status-list-card">
                    {/* Transporter Item */}
                    <div className="status-list-item">
                        <div className="status-item-info">
                            <span className="status-item-title">Transporter.app</span>
                            <span className="status-item-desc">
                                {status.transporterInstalled
                                    ? 'Installed'
                                    : <a href="#" onClick={(e) => { e.preventDefault(); openTransporterDownload(); }} style={{ color: 'var(--color-primary)' }}>Click to download</a>
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
                            <span className="status-item-title">Command Line Tools</span>
                            <span className="status-item-desc">
                                {status.commandLineToolsInstalled
                                    ? 'Ready'
                                    : (installing ? 'Installing...' : <a href="#" onClick={(e) => { e.preventDefault(); installCLT(); }} style={{ color: 'var(--color-primary)' }}>Click to install CLT</a>)
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
                        Recheck
                    </button>
                </div>
            )}
        </div>
    )
}
