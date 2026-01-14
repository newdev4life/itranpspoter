import { useState, useCallback, useEffect } from 'react'
import { LogMessage, UploadProgress, UploadResult, UploadPhase } from '../types'
import { LogViewer } from './LogViewer'
import { useTranslation } from '../i18n'
import './BottomPanel.css'

interface BottomPanelProps {
    isUploading: boolean
    uploadStatus: 'idle' | 'uploading' | 'success' | 'failed' | 'cancelled'
    onRetry?: () => void
}

export function BottomPanel({ isUploading, uploadStatus, onRetry }: BottomPanelProps) {
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState<'progress' | 'logs'>('progress')
    const [logs, setLogs] = useState<LogMessage[]>([])
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
        phase: 'preparing',
        phaseText: t('progress.preparing'),
        progress: 0,
        fileName: ''
    })
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [retryInfo, setRetryInfo] = useState<{ attempt: number; maxAttempts: number } | null>(null)

    const handleUploadLog = useCallback((_event: any, data: LogMessage) => {
        setLogs(prev => [...prev, data])
    }, [])

    const handleUploadProgress = useCallback((_event: any, data: UploadProgress) => {
        setUploadProgress(data)
    }, [])

    const handleUploadComplete = useCallback((_event: any, data: UploadResult) => {
        if (!data.success) {
            setErrorMessage(data.errorMessage || 'Unknown error')
        }
        setRetryInfo(null)
    }, [])

    const handleUploadRetry = useCallback((_event: any, data: { attempt: number; maxAttempts: number }) => {
        setRetryInfo(data)
    }, [])

    useEffect(() => {
        window.api.onUploadLog(handleUploadLog)
        window.api.onUploadProgress(handleUploadProgress)
        window.api.onUploadComplete(handleUploadComplete)
        window.api.onUploadRetry(handleUploadRetry)

        return () => {
            window.api.offUploadLog(handleUploadLog)
            window.api.offUploadProgress(handleUploadProgress)
            window.api.offUploadComplete(handleUploadComplete)
            window.api.offUploadRetry(handleUploadRetry)
        }
    }, [handleUploadLog, handleUploadProgress, handleUploadComplete, handleUploadRetry])

    // Clear logs when starting new upload
    useEffect(() => {
        if (isUploading && uploadStatus === 'uploading') {
            setLogs([])
            setErrorMessage('')
            setUploadProgress({
                phase: 'preparing',
                phaseText: t('progress.preparing'),
                progress: 0,
                fileName: ''
            })
        }
    }, [isUploading, uploadStatus])

    const getPhaseIcon = (phase: UploadPhase) => {
        switch (phase) {
            case 'preparing': return '⏳'
            case 'authenticating': return '🔐'
            case 'analyzing': return '🔍'
            case 'uploading': return '📤'
            case 'committing': return '✅'
            case 'completed': return '🎉'
            case 'failed': return '❌'
        }
    }

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
    }

    const renderProgressContent = () => {
        if (uploadStatus === 'idle') {
            return (
                <div className="panel-empty">
                    <span className="empty-icon">📋</span>
                    <p>{t('progress.idle')}</p>
                </div>
            )
        }

        if (uploadStatus === 'success') {
            return (
                <div className="panel-result success">
                    <span className="result-icon">✅</span>
                    <div className="result-info">
                        <h4>{t('progress.success_title')}</h4>
                        <p>{t('progress.success_desc')}</p>
                    </div>
                </div>
            )
        }

        if (uploadStatus === 'failed') {
            return (
                <div className="panel-result error">
                    <span className="result-icon">❌</span>
                    <div className="result-info">
                        <h4>{t('progress.failed_title')}</h4>
                        <p>{errorMessage}</p>
                    </div>
                    {onRetry && (
                        <button className="btn btn-primary" onClick={onRetry}>
                            {t('progress.manual_retry')}
                        </button>
                    )}
                </div>
            )
        }

        if (uploadStatus === 'cancelled') {
            return (
                <div className="panel-result warning">
                    <span className="result-icon">⏹️</span>
                    <div className="result-info">
                        <h4>{t('progress.cancelled_title')}</h4>
                        <p>{t('progress.cancelled_desc')}</p>
                    </div>
                </div>
            )
        }

        // Uploading state
        return (
            <div className="panel-progress">
                <div className="progress-header">
                    <div className="progress-phase">
                        <span className="phase-icon">{getPhaseIcon(uploadProgress.phase)}</span>
                        <span className="phase-text">{uploadProgress.phaseText}</span>
                        {retryInfo && retryInfo.attempt > 1 && (
                            <span className="retry-badge">
                                🔄 {t('progress.retry_attempt', { attempt: retryInfo.attempt, maxAttempts: retryInfo.maxAttempts })}
                            </span>
                        )}
                    </div>
                    <span className="progress-percentage">{uploadProgress.progress.toFixed(1)}%</span>
                </div>
                <div className="progress-bar-wrapper">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${uploadProgress.progress}%` }}
                    />
                </div>
                <div className="progress-stats">
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
        )
    }

    return (
        <div className="bottom-panel">
            <div className="panel-tabs">
                <button
                    className={`panel-tab ${activeTab === 'progress' ? 'active' : ''}`}
                    onClick={() => setActiveTab('progress')}
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="5" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="2" y="6" width="4" height="2" rx="0.5" fill="currentColor" />
                    </svg>
                    {t('progress.tab_progress')}
                </button>
                <button
                    className={`panel-tab ${activeTab === 'logs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('logs')}
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 4H11M3 7H11M3 10H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {t('progress.tab_logs')}
                    {logs.length > 0 && <span className="log-count">{logs.length}</span>}
                </button>
            </div>
            <div className="panel-content">
                {activeTab === 'progress' ? (
                    <div className="progress-tab-content">
                        {renderProgressContent()}
                    </div>
                ) : (
                    <div className="logs-tab-content">
                        <LogViewer logs={logs} />
                    </div>
                )}
            </div>
        </div>
    )
}
