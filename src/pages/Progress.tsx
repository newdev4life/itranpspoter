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

    // Progress state
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
        phase: 'preparing',
        phaseText: 'Preparing',
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
    }, [])

    useEffect(() => {
        // Register event listeners
        window.api.onUploadLog(handleUploadLog)
        window.api.onUploadProgress(handleUploadProgress)
        window.api.onUploadComplete(handleUploadComplete)

        return () => {
            // Cleanup event listeners
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
                title: 'Upload Successful',
                description: 'Successfully uploaded to App Store Connect',
                color: 'success'
            }
        }
        if (status === 'failed') {
            return {
                icon: '❌',
                title: 'Upload Failed',
                description: errorMessage,
                color: 'error'
            }
        }
        if (status === 'cancelled') {
            return {
                icon: '⏹️',
                title: 'Upload Cancelled',
                description: 'You have cancelled this upload',
                color: 'warning'
            }
        }
        // uploading
        return {
            icon: getPhaseIcon(uploadProgress.phase),
            title: uploadProgress.phaseText,
            description: uploadProgress.phase === 'uploading'
                ? `${uploadProgress.progress.toFixed(1)}%`
                : 'Please do not close the app',
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
                {/* Status Card */}
                <div className={`progress-status-card status-${statusDisplay.color}`}>
                    <span className={`progress-icon ${status === 'uploading' && uploadProgress.phase !== 'completed' ? 'animate-pulse' : ''}`}>
                        {statusDisplay.icon}
                    </span>
                    <div className="progress-info">
                        <h2>{statusDisplay.title}</h2>
                        <p>{statusDisplay.description}</p>
                    </div>
                </div>

                {/* Progress Card */}
                {status === 'uploading' && (
                    <div className="progress-card">
                        <div className="progress-card-header">
                            <h3>Upload Progress</h3>
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
                    <h3 className="progress-card-title">Upload Steps</h3>
                    <div className="progress-steps">
                        <div className={`step ${uploadProgress.phase === 'preparing' ? 'active' : ''} ${['authenticating', 'analyzing', 'uploading', 'committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                            <div className="step-icon">1</div>
                            <span>Prepare</span>
                        </div>
                        <div className="step-line" />
                        <div className={`step ${uploadProgress.phase === 'authenticating' ? 'active' : ''} ${['analyzing', 'uploading', 'committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                            <div className="step-icon">2</div>
                            <span>Auth</span>
                        </div>
                        <div className="step-line" />
                        <div className={`step ${uploadProgress.phase === 'analyzing' ? 'active' : ''} ${['uploading', 'committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                            <div className="step-icon">3</div>
                            <span>Analyze</span>
                        </div>
                        <div className="step-line" />
                        <div className={`step ${uploadProgress.phase === 'uploading' ? 'active' : ''} ${['committing', 'completed'].includes(uploadProgress.phase) ? 'done' : ''}`}>
                            <div className="step-icon">4</div>
                            <span>Upload</span>
                        </div>
                        <div className="step-line" />
                        <div className={`step ${uploadProgress.phase === 'committing' || uploadProgress.phase === 'completed' ? 'active done' : ''}`}>
                            <div className="step-icon">5</div>
                            <span>Commit</span>
                        </div>
                    </div>
                </div>

                {/* File Info Card */}
                <div className="progress-card progress-meta-card">
                    <div className="meta-row">
                        <div className="meta-item">
                            <span className="meta-icon">📦</span>
                            <div className="meta-content">
                                <span className="meta-label">File</span>
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
                    <h3 className="progress-card-title">Upload Logs</h3>
                    <LogViewer logs={logs} />
                </div>

                {/* Actions */}
                <div className="progress-actions">
                    {status === 'uploading' ? (
                        <button className="btn btn-danger btn-lg" onClick={handleCancel}>
                            Cancel Upload
                        </button>
                    ) : (
                        <button className="btn btn-primary btn-lg" onClick={handleDone}>
                            Done
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
