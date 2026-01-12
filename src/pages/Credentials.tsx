import { useState, useEffect } from 'react'
import { CredentialListItem } from '../types'
import { useTranslation } from '../i18n'
import './Credentials.css'

export function Credentials() {
    const { t } = useTranslation()
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
        if (confirm(t('cred.delete_confirm', { id: appleId }))) {
            await window.api.deleteCredential(appleId)
            loadCredentials()
        }
    }

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString('en-US', {
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
                    <p>{t('common.loading')}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="credentials-page animate-fade-in">
            <div className="credentials-header">
                <div>
                    <h2>{t('cred.title')}</h2>
                    <p>{t('cred.desc')}</p>
                </div>
            </div>

            <div className="credentials-notice">
                <span className="notice-icon">🔒</span>
                <p>
                    {t('cred.notice')}
                </p>
            </div>

            {credentials.length === 0 ? (
                <div className="credentials-empty">
                    <span className="empty-icon">🔑</span>
                    <h3>{t('cred.empty_title')}</h3>
                    <p>{t('cred.empty_desc')}</p>
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
                                        {t('cred.uploaded_count', { count: cred.uploadCount })}
                                    </span>
                                    <span className="credential-stat">
                                        <span className="stat-icon">🕐</span>
                                        {t('cred.last_used', { date: formatDate(cred.lastUsed) })}
                                    </span>
                                </div>
                            </div>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(cred.appleId)}
                            >
                                {t('common.delete')}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="credentials-help">
                <h4>{t('cred.about_password')}</h4>
                <p>
                    {t('cred.about_desc')}
                    {t('cred.generate_link')} <a href="#" onClick={(e) => { e.preventDefault(); window.api.openExternal('https://account.apple.com'); }}>account.apple.com</a>.
                </p>
            </div>
        </div>
    )
}
