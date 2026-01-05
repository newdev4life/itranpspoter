import { useState, useEffect, useCallback } from 'react'
import { LogMessage, UploadResult, UploadProgress, UploadPhase } from '../types'
import { LogViewer } from '../components/LogViewer'
import './Progress.css'

interface ProgressProps {
    ipaFileName: string
    appleId: string
    onComplete: (success: boolean) => void
    onCancel: () => void
}

export function Progress({ ipaFileName, appleId, onComplete }: ProgressProps) {
    const [logs, setLogs] = useState<LogMessage[]>([])
    const [status, setStatus] = useState<'uploading' | 'success' | 'failed' | 'cancelled'>('uploading')
    const [errorMessage, setErrorMessage] = useState<string>('')

    // 进度状态
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
        phase: 'preparing',
        phaseText: '准备中',
        progress: 0,
        fileName: ipaFileName
    })

    const handleUploadLog = useCallback((_event: any, data: LogMessage) => {
        setLogs(prev => [...prev, data])
    }, [])

    const handleUploadProgress = useCallback((_event: any, data: UploadProgress) => {
        setUploadProgress(data)
    }, [])

    const handleUploadComplete = useCallback((_event: any, data: UploadResult) => {
        if (data.success) {
            setStatus('success')
        } else {
            setStatus('failed')
            setErrorMessage(data.errorMessage || '未知错误')
        }
    }, [])

    useEffect(() => {
        // 注册事件监听
        window.api.onUploadLog(handleUploadLog)
        window.api.onUploadProgress(handleUploadProgress)
        window.api.onUploadComplete(handleUploadComplete)

        return () => {
            // 清理事件监听
            window.api.offUploadLog(handleUploadLog)
            window.api.offUploadProgress(handleUploadProgress)
            window.api.offUploadComplete(handleUploadComplete)
        }
    }, [handleUploadLog, handleUploadProgress, handleUploadComplete])

    const handleCancel = async () => {
        const cancelled = await window.api.cancelUpload()
        if (cancelled) {
            setStatus('cancelled')
        }
    }

    const handleDone = () => {
        onComplete(status === 'success')
    }

    const getPhaseIcon = (phase: UploadPhase) => {
        switch (phase) {
            case 'preparing':
                return '⏳'
            case 'authenticating':
                return '🔐'
            case 'analyzing':
                return '🔍'
            case 'uploading':
                return '📤'
            case 'committing':
                return '✅'
            case 'completed':
                return '🎉'
            case 'failed':
                return '❌'
        }
    }

    const getStatusDisplay = () => {
        if (status === 'success') {
            return {
                icon: '✅',
                title: '上传成功',
                description: '已成功上传到 App Store Connect',
                color: 'success'
            }
        }
        if (status === 'failed') {
            return {
                icon: '❌',
                title: '上传失败',
                description: errorMessage,
                color: 'error'
            }
        }
        if (status === 'cancelled') {
            return {
                icon: '⏹️',
                title: '上传已取消',
                description: '你已取消此次上传',
                color: 'warning'
            }
        }
        // uploading
        return {
            icon: getPhaseIcon(uploadProgress.phase),
            title: uploadProgress.phaseText,
            description: uploadProgress.phase === 'uploading'
                ? `${uploadProgress.progress.toFixed(1)}%`
                : '请勿关闭应用',
            color: 'primary'
        }
    }

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
    }

    const statusDisplay = getStatusDisplay()

    return (
        <div className="progress-page animate-fade-in">
            <div className="progress-container">
                {/* Status Header */}
                <div className={`progress-header status-${statusDisplay.color}`}>
                    <span className={`progress-icon ${status === 'uploading' && uploadProgress.phase !== 'completed' ? 'animate-pulse' : ''}`}>
                        {statusDisplay.icon}
                    </span>
                    <div className="progress-info">
                        <h2>{statusDisplay.title}</h2>
                        <p>{statusDisplay.description}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                {status === 'uploading' && (
                    <div className="progress-bar-container">
                        <div className="progress-bar-wrapper">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${uploadProgress.progress}%` }}
                            />
                        </div>
                        <div className="progress-bar-info">
                            <span className="progress-percentage">{uploadProgress.progress.toFixed(1)}%</span>
                            {uploadProgress.bytesUploaded && uploadProgress.totalBytes && (
                                <span className="progress-bytes">
                                    {formatBytes(uploadProgress.bytesUploaded)} / {formatBytes(uploadProgress.totalBytes)}
                                </span>
                            )}
                            {uploadProgress.speed && (
                                <span className="progress-speed">{uploadProgress.speed}</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Phase Steps */}
                <div className="progress-steps">
                    <div className={`step ${uploadProgress.phase === 'preparing' ? 'active' : ''} ${['authenticating', 'analyzing', 'uploading', 'committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                        <div className="step-icon">1</div>
                        <span>准备</span>
                    </div>
                    <div className="step-line" />
                    <div className={`step ${uploadProgress.phase === 'authenticating' ? 'active' : ''} ${['analyzing', 'uploading', 'committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                        <div className="step-icon">2</div>
                        <span>认证</span>
                    </div>
                    <div className="step-line" />
                    <div className={`step ${uploadProgress.phase === 'analyzing' ? 'active' : ''} ${['uploading', 'committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                        <div className="step-icon">3</div>
                        <span>分析</span>
                    </div>
                    <div className="step-line" />
                    <div className={`step ${uploadProgress.phase === 'uploading' ? 'active' : ''} ${['committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                        <div className="step-icon">4</div>
                        <span>上传</span>
                    </div>
                    <div className="step-line" />
                    <div className={`step ${uploadProgress.phase === 'committing' || uploadProgress.phase === 'completed' ? 'active done' : ''}`}>
                        <div className="step-icon">5</div>
                        <span>提交</span>
                    </div>
                </div>

                {/* File Info */}
                <div className="progress-meta">
                    <div className="meta-item">
                        <span className="meta-label">文件</span>
                        <span className="meta-value">{ipaFileName}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Apple ID</span>
                        <span className="meta-value">{appleId}</span>
                    </div>
                </div>

                {/* Log Viewer */}
                <div className="progress-logs">
                    <h3>上传日志</h3>
                    <LogViewer logs={logs} />
                </div>

                {/* Actions */}
                <div className="progress-actions">
                    {status === 'uploading' ? (
                        <button className="btn btn-danger btn-lg" onClick={handleCancel}>
                            取消上传
                        </button>
                    ) : (
                        <button className="btn btn-primary btn-lg" onClick={handleDone}>
                            完成
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
