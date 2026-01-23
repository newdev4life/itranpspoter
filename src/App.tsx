import { useState, useEffect } from 'react'
import { Page, UploadConfig } from './types'
import { Header } from './components/Header'
import { WorkspaceLayout } from './components/WorkspaceLayout'
import { StatusSidebar } from './components/StatusSidebar'
import { BottomPanel } from './components/BottomPanel'
import { ContextMenu } from './components/ContextMenu'
import { Upload } from './pages/Upload'
import { History } from './pages/History'
import { Settings } from './pages/Settings'
import './App.css'

export default function App() {
    const [currentPage, setCurrentPage] = useState<Page>('workspace')
    const [isUploading, setIsUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'failed' | 'cancelled'>('idle')
    const [_environmentReady, setEnvironmentReady] = useState(false)
    const [currentUploadConfig, setCurrentUploadConfig] = useState<UploadConfig | null>(null)

    // Check if currently uploading on mount
    useEffect(() => {
        window.api.isUploading().then(uploading => {
            if (uploading) {
                setIsUploading(true)
                setUploadStatus('uploading')
            }
        })
    }, [])

    // Listen for upload completion
    useEffect(() => {
        const handleComplete = (_event: any, data: { success: boolean }) => {
            setIsUploading(false)
            setUploadStatus(data.success ? 'success' : 'failed')
        }

        window.api.onUploadComplete(handleComplete)
        return () => {
            window.api.offUploadComplete(handleComplete)
        }
    }, [])

    const handleNavigate = (page: Page) => {
        if (isUploading && page !== 'workspace') {
            // Don't allow navigation away during upload
            return
        }
        setCurrentPage(page)
    }

    const handleStartUpload = async (config: UploadConfig) => {
        setCurrentUploadConfig(config)
        setIsUploading(true)
        setUploadStatus('uploading')

        try {
            await window.api.startUpload(config)
        } catch (error) {
            console.error('Upload failed:', error)
        }
    }

    const handleUploadRetry = () => {
        if (currentUploadConfig) {
            handleStartUpload(currentUploadConfig)
        }
    }

    const handleEnvironmentReady = (ready: boolean) => {
        setEnvironmentReady(ready)
    }

    const handleBackFromSettings = () => {
        setCurrentPage('workspace')
    }

    return (
        <div className="app-container">
            <Header
                currentPage={currentPage}
                onNavigate={handleNavigate}
                isUploading={isUploading}
            />
            <main className="app-content">
                {/* Workspace - always mounted, use CSS to hide */}
                <div className={`page-container ${currentPage === 'workspace' ? 'active' : 'hidden'}`}>
                    <WorkspaceLayout
                        sidebar={
                            <StatusSidebar onEnvironmentReady={handleEnvironmentReady} />
                        }
                        main={
                            <Upload
                                onStartUpload={handleStartUpload}
                                isUploading={isUploading}
                            />
                        }
                        bottom={
                            <BottomPanel
                                isUploading={isUploading}
                                uploadStatus={uploadStatus}
                                onRetry={handleUploadRetry}
                            />
                        }
                    />
                </div>

                {/* History - mounted on demand but kept alive once shown */}
                <div className={`page-container ${currentPage === 'history' ? 'active' : 'hidden'}`}>
                    <History />
                </div>

                {/* Settings - mounted when shown */}
                {currentPage === 'settings' && (
                    <div className="page-container active">
                        <Settings onBack={handleBackFromSettings} />
                    </div>
                )}
            </main>
            <ContextMenu />
        </div>
    )
}

