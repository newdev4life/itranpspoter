import { useState, useEffect } from 'react'
import { CredentialListItem } from '../types'
import './Credentials.css'

export function Credentials() {
    const [credentials, setCredentials] = useState<CredentialListItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCredentials()
    }, [])

    const loadCredentials = async () => {
        setLoading(true)
        const data = await window.api.getCredentialsList()
        setCredentials(data)
        setLoading(false)
    }

    const handleDelete = async (appleId: string) => {
        if (confirm(`确定要删除凭证 "${appleId}" 吗？\n删除后需要重新输入密码。`)) {
            await window.api.deleteCredential(appleId)
            loadCredentials()
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

    if (loading) {
        return (
            <div className="credentials-page animate-fade-in">
                <div className="credentials-loading">
                    <span className="animate-spin">⟳</span>
                    <p>加载中...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="credentials-page animate-fade-in">
            <div className="credentials-header">
                <div>
                    <h2>已保存的凭证</h2>
                    <p>管理你的 Apple ID 和 App-Specific Password</p>
                </div>
            </div>

            <div className="credentials-notice">
                <span className="notice-icon">🔒</span>
                <p>
                    密码已加密存储在本地。凭证仅在上传成功后自动保存。
                </p>
            </div>

            {credentials.length === 0 ? (
                <div className="credentials-empty">
                    <span className="empty-icon">🔑</span>
                    <h3>暂无保存的凭证</h3>
                    <p>成功上传 IPA 后，凭证将自动保存到这里</p>
                </div>
            ) : (
                <div className="credentials-list">
                    {credentials.map((cred) => (
                        <div key={cred.appleId} className="credential-card">
                            <div className="credential-avatar">👤</div>
                            <div className="credential-details">
                                <div className="credential-primary">
                                    <span className="credential-email">{cred.appleId}</span>
                                </div>
                                <div className="credential-secondary">
                                    <span className="credential-stat">
                                        <span className="stat-icon">📤</span>
                                        成功上传 {cred.uploadCount} 次
                                    </span>
                                    <span className="credential-stat">
                                        <span className="stat-icon">🕐</span>
                                        上次使用: {formatDate(cred.lastUsed)}
                                    </span>
                                </div>
                            </div>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(cred.appleId)}
                            >
                                删除
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="credentials-help">
                <h4>关于 App-Specific Password</h4>
                <p>
                    App-Specific Password 是 Apple 为第三方应用提供的专用密码，与你的 Apple ID 密码不同。
                    你可以在 <a href="https://appleid.apple.com" target="_blank" rel="noopener noreferrer">appleid.apple.com</a> 的安全设置中生成。
                </p>
            </div>
        </div>
    )
}
