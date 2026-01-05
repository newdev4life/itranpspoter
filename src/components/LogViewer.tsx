import { useRef, useEffect } from 'react'
import { LogMessage } from '../types'
import './LogViewer.css'

interface LogViewerProps {
    logs: LogMessage[]
    autoScroll?: boolean
}

export function LogViewer({ logs, autoScroll = true }: LogViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (autoScroll && containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [logs, autoScroll])

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

    return (
        <div className="log-viewer" ref={containerRef}>
            {logs.length === 0 ? (
                <div className="log-empty">
                    <span className="log-empty-icon">📋</span>
                    <p>等待日志输出...</p>
                </div>
            ) : (
                logs.map((log, index) => (
                    <div key={index} className={`log-entry log-${getLogType(log.message)}`}>
                        <span className="log-time">{formatTimestamp(log.timestamp)}</span>
                        <span className="log-message">{log.message}</span>
                    </div>
                ))
            )}
        </div>
    )
}
