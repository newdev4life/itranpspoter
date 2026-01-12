import { useState, useEffect, useCallback } from 'react'
import { LogMessage, UploadResult, UploadProgress, UploadPhase } from '../types'
import { LogViewer } from '../components/LogViewer'
import { IPInfoBanner } from '../components/IPInfoBanner'
import { useTranslation } from '../i18n'
import './Progress.css'

interface ProgressProps {
    ipaFileName: string
    appleId: string
    onComplete: (success: boolean) => void
    onCancel: () => void
    onRetry: () => void
}

export function Progress({ ipaFileName, appleId, onComplete, onRetry }: ProgressProps) {
    const { t } = useTranslation()
    const [logs, setLogs] = useState<LogMessage[]>([])
    const [status, setStatus] = useState<'uploading' | 'success' | 'failed' | 'cancelled'>('uploading')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [retryInfo, setRetryInfo] = useState<{ attempt: number; maxAttempts: number } | null>(null)

    // Progress state
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
        phase: 'preparing',
        phaseText: t('progress.preparing'),
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
            setErrorMessage(data.errorMessage || 'Unknown error')
        }
        setRetryInfo(null)
    }, [])

    const handleUploadRetry = useCallback((_event: any, data: { attempt: number; maxAttempts: number }) => {
        setRetryInfo(data)
        // Reset status to uploading for retry attempt
        setStatus('uploading')
    }, [])

    useEffect(() => {
        // Register event listeners
        window.api.onUploadLog(handleUploadLog)
        window.api.onUploadProgress(handleUploadProgress)
        window.api.onUploadComplete(handleUploadComplete)
        window.api.onUploadRetry(handleUploadRetry)

        return () => {
            // Cleanup event listeners
            window.api.offUploadLog(handleUploadLog)
            window.api.offUploadProgress(handleUploadProgress)
            window.api.offUploadComplete(handleUploadComplete)
            window.api.offUploadRetry(handleUploadRetry)
        }
    }, [handleUploadLog, handleUploadProgress, handleUploadComplete, handleUploadRetry])

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
                title: t('progress.success_title'),
                description: t('progress.success_desc'),
                color: 'success'
            }
        }
        if (status === 'failed') {
            return {
                icon: '❌',
                title: t('progress.failed_title'),
                description: errorMessage,
                color: 'error'
            }
        }
        if (status === 'cancelled') {
            return {
                icon: '⏹️',
                title: t('progress.cancelled_title'),
                description: t('progress.cancelled_desc'),
                color: 'warning'
            }
        }
        // uploading
        return {
            icon: getPhaseIcon(uploadProgress.phase),
            title: uploadProgress.phaseText, // phaseText usually comes from backend, but initial one is 'Preparing' which we handled. Backend might send English. If so, we might need to map it.
            description: uploadProgress.phase === 'uploading'
                ? `${uploadProgress.progress.toFixed(1)}%`
                : t('progress.dont_close'),
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
                <IPInfoBanner />

                {/* Status Card */}
                <div className={`progress-status-card status-${statusDisplay.color}`}>
                    <span className={`progress-icon ${status === 'uploading' && uploadProgress.phase !== 'completed' ? 'animate-pulse' : ''}`}>
                        {statusDisplay.icon}
                    </span>
                    <div className="progress-info">
                        <h2>{statusDisplay.title}</h2>
                        <p>{statusDisplay.description}</p>
                        {retryInfo && retryInfo.attempt > 1 && (
                            <span className="retry-badge">
                                🔄 {t('progress.retry_attempt', { attempt: retryInfo.attempt, maxAttempts: retryInfo.maxAttempts })}
                            </span>
                        )}
                    </div>
                </div>

                {/* Progress Card */}
                {status === 'uploading' && (
                    <div className="progress-card">
                        <div className="progress-card-header">
                            <h3>{t('progress.upload_progress')}</h3>
                            <span className="progress-percentage">{uploadProgress.progress.toFixed(1)}%</span>
                        </div>
                        <div className="progress-bar-wrapper">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${uploadProgress.progress}%` }}
                            />
                        </div>
                        <div className="progress-bar-stats">
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

                {/* Steps Card */}
                <div className="progress-card">
                    <h3 className="progress-card-title">{t('progress.upload_steps')}</h3>
                    <div className="progress-steps">
                        <div className={`step ${uploadProgress.phase === 'preparing' ? 'active' : ''} ${['authenticating', 'analyzing', 'uploading', 'committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                            <div className="step-icon">1</div>
                            <span>{t('progress.step.prepare')}</span>
                        </div>
                        <div className="step-line" />
                        <div className={`step ${uploadProgress.phase === 'authenticating' ? 'active' : ''} ${['analyzing', 'uploading', 'committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                            <div className="step-icon">2</div>
                            <span>{t('progress.step.auth')}</span>
                        </div>
                        <div className="step-line" />
                        <div className={`step ${uploadProgress.phase === 'analyzing' ? 'active' : ''} ${['uploading', 'committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                            <div className="step-icon">3</div>
                            <span>{t('progress.step.analyze')}</span>
                        </div>
                        <div className="step-line" />
                        <div className={`step ${uploadProgress.phase === 'uploading' ? 'active' : ''} ${['committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                            <div className="step-icon">4</div>
                            <span>{t('progress.step.upload')}</span>
                        </div>
                        <div className="step-line" />
                        <div className={`step ${uploadProgress.phase === 'committing' || uploadProgress.phase === 'completed' ? 'active done' : ''}`}>
                            <div className="step-icon">5</div>
                            <span>{t('progress.step.commit')}</span>
                        </div>
                    </div>
                </div>

                {/* File Info Card */}
                <div className="progress-card progress-meta-card">
                    <div className="meta-row">
                        <div className="meta-item">
                            <span className="meta-icon">📦</span>
                            <div className="meta-content">
                                <span className="meta-label">{t('progress.file')}</span>
                                <span className="meta-value">{ipaFileName}</span>
                            </div>
                        </div>
                        <div className="meta-item">
                            <span className="meta-icon">👤</span>
                            <div className="meta-content">
                                <span className="meta-label">Apple ID</span>
                                <span className="meta-value">{appleId}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Log Viewer Card */}
                <div className="progress-card progress-logs-card">
                    <h3 className="progress-card-title">{t('progress.logs')}</h3>
                    <LogViewer logs={logs} />
                </div>

                {/* Actions */}
                <div className="progress-actions">
                    {status === 'uploading' ? (
                        <button className="btn btn-danger btn-lg" onClick={handleCancel}>
                            {t('progress.cancel_upload')}
                        </button>
                    ) : status === 'failed' ? (
                        <>
                            <button className="btn btn-primary btn-lg" onClick={onRetry}>
                                {t('progress.manual_retry')}
                            </button>
                            <button className="btn btn-secondary btn-lg" onClick={handleDone}>
                                {t('common.done')}
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-primary btn-lg" onClick={handleDone}>
                            {t('common.done')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
