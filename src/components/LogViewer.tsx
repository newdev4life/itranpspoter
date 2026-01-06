import { useState, useRef, useEffect } from 'react'
import { LogMessage } from '../types'
import './LogViewer.css'

interface LogViewerProps {
    logs: LogMessage[]
    autoScroll?: boolean
}

export function LogViewer({ logs, autoScroll = true }: LogViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isAutoScroll, setIsAutoScroll] = useState(autoScroll)

    useEffect(() => {
        if (isAutoScroll && containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [logs, isAutoScroll])

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }

    const getLogType = (message: string): 'info' | 'error' | 'success' | 'default' => {
        if (message.includes('[ERROR]') || message.includes('[FAILED]')) return 'error'
        if (message.includes('[SUCCESS]')) return 'success'
        if (message.includes('[INFO]')) return 'info'
        return 'default'
    }

    const filteredLogs = searchTerm
        ? logs.filter(log =>
            log.message.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : logs

    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0
        }
    }

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current
            // Disable auto-scroll if user scrolls up
            const isAtBottom = scrollHeight - scrollTop - clientHeight < 50
            if (!isAtBottom && isAutoScroll) {
                setIsAutoScroll(false)
            }
        }
    }

    return (
        <div className={`log-container ${isExpanded ? 'expanded' : ''}`}>
            {/* Log Controls */}
            <div className="log-controls">
                <div className="log-search">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="搜尋日誌..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="log-search-input"
                    />
                    {searchTerm && (
                        <button className="log-search-clear" onClick={() => setSearchTerm('')}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    )}
                </div>
                <div className="log-actions">
                    <span className="log-count">{filteredLogs.length} 條</span>
                    <button
                        className={`log-action-btn ${isAutoScroll ? 'active' : ''}`}
                        onClick={() => setIsAutoScroll(!isAutoScroll)}
                        title={isAutoScroll ? '自動滾動：開' : '自動滾動：關'}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 2V12M7 12L4 9M7 12L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="log-action-btn" onClick={scrollToTop} title="滾動到頂部">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 12V2M7 2L4 5M7 2L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="log-action-btn" onClick={scrollToBottom} title="滾動到底部">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 2V12M7 12L4 9M7 12L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        className="log-action-btn"
                        onClick={() => setIsExpanded(!isExpanded)}
                        title={isExpanded ? '收縮視圖' : '展開視圖'}
                    >
                        {isExpanded ? (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 1H13V5M5 13H1V9M13 1L8 6M1 13L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 1H1V5M9 13H13V9M1 1L6 6M13 13L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Log Content */}
            <div className="log-viewer" ref={containerRef} onScroll={handleScroll}>
                {filteredLogs.length === 0 ? (
                    <div className="log-empty">
                        {logs.length === 0 ? (
                            <>
                                <span className="log-empty-icon">📋</span>
                                <p>等待日誌輸出...</p>
                            </>
                        ) : (
                            <>
                                <span className="log-empty-icon">🔍</span>
                                <p>無匹配結果</p>
                            </>
                        )}
                    </div>
                ) : (
                    filteredLogs.map((log, index) => (
                        <div key={index} className={`log-entry log-${getLogType(log.message)}`}>
                            <span className="log-time">{formatTimestamp(log.timestamp)}</span>
                            <span className="log-message">{log.message}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
