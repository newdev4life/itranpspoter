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
                // 自动跳转到上传页面
                setTimeout(() => onReady(), 1000)
            }
        } catch (error) {
            console.error('环境检查失败:', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        checkEnvironment()
    }, [])

    const openTransporterDownload = () => {
        // 打开 Mac App Store 的 Transporter 页面
        window.open('https://apps.apple.com/app/transporter/id1450874784', '_blank')
    }

    const installCLT = async () => {
        setInstalling(true)
        setInstallMessage('')
        try {
            const result = await window.api.installCommandLineTools()
            setInstallMessage(result.message)
            if (result.success) {
                // 等待一段时间后重新检查
                setTimeout(() => {
                    checkEnvironment()
                }, 3000)
            }
        } catch (error) {
            setInstallMessage('安装命令执行失败')
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

                <h2>{loading ? '正在检查运行环境' : (status?.allReady ? '环境检查通过' : '环境检查未通过')}</h2>
                <p>确保您的 Mac 已安装 Xcode CLT 和 Transporter</p>
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
                                    ? '已安装'
                                    : <a href="#" onClick={(e) => { e.preventDefault(); openTransporterDownload(); }} style={{ color: 'var(--color-primary)' }}>点击下载</a>
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
                                    ? '已就绪'
                                    : (installing ? '安装中...' : <a href="#" onClick={(e) => { e.preventDefault(); installCLT(); }} style={{ color: 'var(--color-primary)' }}>点击安装 CLT</a>)
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
                        重新检查
                    </button>
                </div>
            )}
        </div>
    )
}
