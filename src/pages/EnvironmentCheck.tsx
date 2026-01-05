import { useState, useEffect } from 'react'
import { EnvironmentStatus } from '../types'
import { StatusCard } from '../components/StatusCard'
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

    if (loading) {
        return (
            <div className="environment-check animate-fade-in">
                <div className="check-header">
                    <span className="check-icon animate-spin">⟳</span>
                    <h2>正在检查环境...</h2>
                </div>
            </div>
        )
    }

    if (!status) {
        return (
            <div className="environment-check animate-fade-in">
                <div className="check-header">
                    <span className="check-icon">❌</span>
                    <h2>环境检查失败</h2>
                    <p>无法获取环境状态</p>
                </div>
                <button className="btn btn-primary" onClick={checkEnvironment}>
                    重新检查
                </button>
            </div>
        )
    }

    return (
        <div className="environment-check animate-fade-in">
            <div className="check-header">
                <span className="check-icon">{status.allReady ? '✅' : '⚙️'}</span>
                <h2>{status.allReady ? '环境就绪' : '环境检查'}</h2>
                <p>{status.allReady ? '所有必需组件已安装' : '请确保以下组件已安装'}</p>
            </div>

            <div className="check-list">
                <StatusCard
                    title="Transporter.app"
                    status={status.transporterInstalled ? 'success' : 'error'}
                    description={
                        status.transporterInstalled
                            ? status.transporterPath
                            : '未安装 - 从 Mac App Store 下载'
                    }
                    action={
                        !status.transporterInstalled
                            ? { label: '下载', onClick: openTransporterDownload }
                            : undefined
                    }
                />

                <StatusCard
                    title="iTMSTransporter"
                    status={status.iTMSTransporterExists ? 'success' : 'error'}
                    description={
                        status.iTMSTransporterExists
                            ? status.iTMSTransporterPath
                            : '未找到 - 请先安装 Transporter.app'
                    }
                />

                <StatusCard
                    title="Command Line Tools"
                    status={status.commandLineToolsInstalled ? 'success' : 'warning'}
                    description={
                        status.commandLineToolsInstalled
                            ? status.commandLineToolsPath
                            : '未安装 - 某些功能可能受限'
                    }
                    action={
                        !status.commandLineToolsInstalled
                            ? {
                                label: installing ? '安装中...' : '安装',
                                onClick: installCLT,
                            }
                            : undefined
                    }
                />
            </div>

            {installMessage && (
                <div className="install-message">
                    <p>{installMessage}</p>
                </div>
            )}

            <div className="check-actions">
                <button className="btn btn-secondary" onClick={checkEnvironment}>
                    重新检查
                </button>
                {status.transporterInstalled && status.iTMSTransporterExists && (
                    <button className="btn btn-primary" onClick={onReady}>
                        继续
                    </button>
                )}
            </div>
        </div>
    )
}
