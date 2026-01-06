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

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        if (confirm('確定要刪除這條記錄嗎？')) {
            await window.api.deleteUploadHistory(id)
            loadHistory()
        }
    }

    const handleClearAll = async () => {
        if (confirm('確定要清空所有上傳歷史嗎？此操作不可撤銷。')) {
            await window.api.clearUploadHistory()
            loadHistory()
        }
    }

    const formatDate = (isoString: string) => {
        // Format: 2024-05-20 14:30
        const date = new Date(isoString)
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        const h = String(date.getHours()).padStart(2, '0')
        const min = String(date.getMinutes()).padStart(2, '0')
        return `${y}-${m}-${d} ${h}:${min}`
    }

    const getStatusBadge = (status: UploadHistoryRecord['status']) => {
        switch (status) {
            case 'success':
                return (
                    <span className="status-badge status-success">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        成功
                    </span>
                )
            case 'failed':
                return (
                    <span className="status-badge status-error">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M4 4L8 8M8 4L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        失敗
                    </span>
                )
            case 'cancelled':
                return (
                    <span className="status-badge status-warning">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 4V6.5M6 8.5H6.005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        已取消
                    </span>
                )
        }
    }

    if (loading) {
        return (
            <div className="history-page">
                <div className="history-loading">
                    <div className="loading-spinner"></div>
                    <span>載入中...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="history-page">
            <div className="history-header">
                <div className="history-header-title">
                    <div className="history-header-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="9" stroke="#4B6EFF" strokeWidth="2" />
                            <path d="M12 7V12L15 15" stroke="#4B6EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 12C3 10.22 3.52 8.48 4.46 7M7 4.46C8.48 3.52 10.22 3 12 3" stroke="#4B6EFF" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="history-text">
                        <h2>上傳歷史紀錄</h2>
                        <p>追蹤過去的上傳狀態與檔案</p>
                    </div>
                </div>
                {history.length > 0 && (
                    <button className="btn-clear" onClick={handleClearAll}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.75 3.5H12.25M5.25 3.5V2.33333C5.25 1.97971 5.39048 1.64057 5.64052 1.39052C5.89057 1.14048 6.22971 1 6.58333 1H7.41667C7.77029 1 8.10943 1.14048 8.35948 1.39052C8.60952 1.64057 8.75 1.97971 8.75 2.33333V3.5M10.5 3.5V11.6667C10.5 12.0203 10.3595 12.3594 10.1095 12.6095C9.85943 12.8595 9.52029 13 9.16667 13H4.83333C4.47971 13 4.14057 12.8595 3.89052 12.6095C3.64048 12.3594 3.5 12.0203 3.5 11.6667V3.5H10.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        清除全部
                    </button>
                )}
            </div>

            <div className="history-card">
                {/* Table Header */}
                <div className="history-table-header">
                    <div className="col-status">狀態</div>
                    <div className="col-filename">檔案名稱</div>
                    <div className="col-apple-id">APPLE ID</div>
                    <div className="col-date">日期</div>
                </div>

                {/* Table Body */}
                <div className="history-table-body">
                    {history.length === 0 ? (
                        <div className="history-empty">
                            <div className="empty-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="8" y="12" width="32" height="28" rx="3" stroke="#D1D5DB" strokeWidth="2" />
                                    <path d="M8 20H40" stroke="#D1D5DB" strokeWidth="2" />
                                    <path d="M16 8V14M32 8V14" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3>暫無上傳記錄</h3>
                            <p>上傳的檔案將會顯示在這裡</p>
                        </div>
                    ) : (
                        history.map((record) => (
                            <div key={record.id} className="history-row">
                                <div className="col-status">
                                    {getStatusBadge(record.status)}
                                </div>
                                <div className="col-filename">
                                    {record.fileName}
                                </div>
                                <div className="col-apple-id">
                                    {record.appleId}
                                </div>
                                <div className="col-date">
                                    <span className="date-text">{formatDate(record.startTime)}</span>
                                    <button
                                        className="btn-delete"
                                        onClick={(e) => handleDelete(record.id, e)}
                                        title="刪除"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.75 3.5H12.25M5.25 3.5V2.33333C5.25 1.97971 5.39048 1.64057 5.64052 1.39052C5.89057 1.14048 6.22971 1 6.58333 1H7.41667C7.77029 1 8.10943 1.14048 8.35948 1.39052C8.60952 1.64057 8.75 1.97971 8.75 2.33333V3.5M10.5 3.5V11.6667C10.5 12.0203 10.3595 12.3594 10.1095 12.6095C9.85943 12.8595 9.52029 13 9.16667 13H4.83333C4.47971 13 4.14057 12.8595 3.89052 12.6095C3.64048 12.3594 3.5 12.0203 3.5 11.6667V3.5H10.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
