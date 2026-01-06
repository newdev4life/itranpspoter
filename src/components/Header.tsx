import { Page } from '../types'
import './Header.css'

interface HeaderProps {
    currentPage: Page
    onNavigate: (page: Page) => void
    isUploading: boolean
}

export function Header({ currentPage, onNavigate, isUploading }: HeaderProps) {
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="header-brand">
                    <div className="brand-icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="48" height="48" rx="12" fill="#4B6EFF" />
                            <path d="M24 32V16M24 16L18 22M24 16L30 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="brand-text">
                        <h1>ITRANSPORTER</h1>
                        <div className="brand-status">
                            <span className="status-dot"></span>
                            <span className="status-text">IPA TRANSPORTER HELPER</span>
                        </div>
                    </div>
                </div>

                <div className="header-nav">
                    <div className="nav-toggle">
                        <button
                            className={`toggle-item ${currentPage === 'upload' || currentPage === 'progress' || currentPage === 'environment' ? 'active' : ''}`}
                            onClick={() => onNavigate('upload')}
                            disabled={isUploading && currentPage !== 'progress'}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 12V4M8 4L5 7M8 4L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            上傳
                        </button>
                        <button
                            className={`toggle-item ${currentPage === 'history' ? 'active' : ''}`}
                            onClick={() => onNavigate('history')}
                            disabled={isUploading}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 4V8L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            歷史
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
