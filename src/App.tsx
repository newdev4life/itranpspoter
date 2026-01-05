import { useState, useEffect } from 'react'
import { Page, UploadConfig, EnvironmentStatus } from './types'
import { Header } from './components/Header'
import { EnvironmentCheck } from './pages/EnvironmentCheck'
import { Upload } from './pages/Upload'
import { Progress } from './pages/Progress'
import { History } from './pages/History'
import { Credentials } from './pages/Credentials'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('environment')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadConfig, setUploadConfig] = useState<UploadConfig | null>(null)
  const [environmentReady, setEnvironmentReady] = useState(false)

  // 检查是否有正在进行的上传
  useEffect(() => {
    const checkUploading = async () => {
      const uploading = await window.api.isUploading()
      setIsUploading(uploading)
      if (uploading) {
        setCurrentPage('progress')
      }
    }
    checkUploading()
  }, [])

  // 检查环境是否就绪
  useEffect(() => {
    const checkEnvironment = async () => {
      const status: EnvironmentStatus = await window.api.checkEnvironment()
      if (status.allReady) {
        setEnvironmentReady(true)
        if (currentPage === 'environment') {
          setCurrentPage('upload')
        }
      }
    }
    checkEnvironment()
  }, [])

  const handleNavigate = (page: Page) => {
    // 如果正在上传，只能查看 progress 页面
    if (isUploading && page !== 'progress') {
      return
    }

    // 如果环境未就绪且尝试访问非环境检查页面
    if (!environmentReady && page !== 'environment') {
      setCurrentPage('environment')
      return
    }

    setCurrentPage(page)
  }

  const handleEnvironmentReady = () => {
    setEnvironmentReady(true)
    setCurrentPage('upload')
  }

  const handleStartUpload = async (config: UploadConfig) => {
    setUploadConfig(config)
    setIsUploading(true)
    setCurrentPage('progress')

    // 开始上传
    await window.api.startUpload(config)
  }

  const handleUploadComplete = (_success: boolean) => {
    setIsUploading(false)
    setUploadConfig(null)
    // 返回上传页面
    setCurrentPage('upload')
  }

  const handleUploadCancel = () => {
    setIsUploading(false)
    setUploadConfig(null)
    setCurrentPage('upload')
  }

  const getFileName = (path: string) => {
    return path.split('/').pop() || path
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'environment':
        return <EnvironmentCheck onReady={handleEnvironmentReady} />

      case 'upload':
        return <Upload onStartUpload={handleStartUpload} />

      case 'progress':
        if (!uploadConfig) {
          return <Upload onStartUpload={handleStartUpload} />
        }
        return (
          <Progress
            ipaFileName={getFileName(uploadConfig.ipaPath)}
            appleId={uploadConfig.appleId}
            onComplete={handleUploadComplete}
            onCancel={handleUploadCancel}
          />
        )

      case 'history':
        return <History />

      case 'credentials':
        return <Credentials />

      default:
        return <Upload onStartUpload={handleStartUpload} />
    }
  }

  return (
    <div className="app-container">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isUploading={isUploading}
      />
      <main className="app-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
