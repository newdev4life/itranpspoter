import { Page } from '../types'
import './Header.css'

interface HeaderProps {
    currentPage: Page
    onNavigate: (page: Page) => void
    isUploading: boolean
}

export function Header({ currentPage, onNavigate, isUploading }: HeaderProps) {
    const navItems: { page: Page; label: string; emoji: string }[] = [
        { page: 'upload', label: '上传', emoji: '📤' },
        { page: 'history', label: '历史', emoji: '📋' },
        { page: 'credentials', label: '凭证', emoji: '🔑' },
    ]

    return (
        <header className="app-header">
            <div className="header-content">
                <div className="header-title drag-region">
                    <span className="app-icon">📦</span>
                    <h1>iTransporter</h1>
                </div>
                <nav className="app-nav">
                    {navItems.map(({ page, label, emoji }) => (
                        <button
                            key={page}
                            className={`nav-item ${currentPage === page ? 'active' : ''}`}
                            onClick={() => onNavigate(page)}
                            disabled={isUploading && page !== 'progress'}
                        >
                            <span className="nav-emoji">{emoji}</span>
                            {label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    )
}
