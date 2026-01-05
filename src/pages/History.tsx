import { useState, useEffect } from 'react'
import { UploadHistoryRecord } from '../types'
import './History.css'

export function History() {
    const [history, setHistory] = useState<UploadHistoryRecord[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadHistory()
    }, [])

    const loadHistory = async () => {
        setLoading(true)
        const data = await window.api.getUploadHistory()
        setHistory(data)
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (confirm('确定要删除这条记录吗？')) {
            await window.api.deleteUploadHistory(id)
            loadHistory()
        }
    }

    const handleClearAll = async () => {
        if (confirm('确定要清空所有上传历史吗？此操作不可撤销。')) {
            await window.api.clearUploadHistory()
            loadHistory()
        }
    }

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusBadge = (status: UploadHistoryRecord['status']) => {
        switch (status) {
            case 'success':
                return <span className="status-badge status-success">成功</span>
            case 'failed':
                return <span className="status-badge status-error">失败</span>
            case 'cancelled':
                return <span className="status-badge status-warning">已取消</span>
        }
    }

    const getDuration = (start: string, end: string) => {
        const startTime = new Date(start).getTime()
        const endTime = new Date(end).getTime()
        const seconds = Math.round((endTime - startTime) / 1000)

        if (seconds < 60) return `${seconds}秒`
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}分${remainingSeconds}秒`
    }

    if (loading) {
        return (
            <div className="history-page animate-fade-in">
                <div className="history-loading">
                    <span className="animate-spin">⟳</span>
                    <p>加载中...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="history-page animate-fade-in">
            <div className="history-header">
                <div>
                    <h2>上传历史</h2>
                    <p>查看你的 IPA 上传记录</p>
                </div>
                {history.length > 0 && (
                    <button className="btn btn-ghost" onClick={handleClearAll}>
                        清空历史
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="history-empty">
                    <span className="empty-icon">📭</span>
                    <h3>暂无上传记录</h3>
                    <p>上传 IPA 文件后，记录将显示在这里</p>
                </div>
            ) : (
                <div className="history-list">
                    {history.map((record) => (
                        <div key={record.id} className="history-item">
                            <div className="history-icon">
                                {record.status === 'success' ? '✅' : record.status === 'failed' ? '❌' : '⏹️'}
                            </div>
                            <div className="history-content">
                                <div className="history-main">
                                    <span className="history-filename">{record.fileName}</span>
                                    {getStatusBadge(record.status)}
                                </div>
                                <div className="history-meta">
                                    <span>{formatDate(record.startTime)}</span>
                                    <span>·</span>
                                    <span>{getDuration(record.startTime, record.endTime)}</span>
                                    <span>·</span>
                                    <span>{record.appleId}</span>
                                </div>
                                {record.errorMessage && (
                                    <div className="history-error">
                                        {record.errorMessage}
                                    </div>
                                )}
                            </div>
                            <button
                                className="btn btn-icon btn-ghost"
                                onClick={() => handleDelete(record.id)}
                                title="删除"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
