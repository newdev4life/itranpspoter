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
        if (confirm(`Are you sure you want to delete credential "${appleId}"?\nYou will need to re-enter the password after deletion.`)) {
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
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="credentials-page animate-fade-in">
            <div className="credentials-header">
                <div>
                    <h2>Saved Credentials</h2>
                    <p>Manage your Apple ID and App-Specific Passwords</p>
                </div>
            </div>

            <div className="credentials-notice">
                <span className="notice-icon">🔒</span>
                <p>
                    Passwords are encrypted and stored locally. Credentials are saved automatically after successful upload.
                </p>
            </div>

            {credentials.length === 0 ? (
                <div className="credentials-empty">
                    <span className="empty-icon">🔑</span>
                    <h3>No saved credentials</h3>
                    <p>Credentials will be automatically saved here after successful IPA upload</p>
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
                                        Uploaded {cred.uploadCount} times
                                    </span>
                                    <span className="credential-stat">
                                        <span className="stat-icon">🕐</span>
                                        Last used: {formatDate(cred.lastUsed)}
                                    </span>
                                </div>
                            </div>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(cred.appleId)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="credentials-help">
                <h4>About App-Specific Password</h4>
                <p>
                    App-Specific Password is a dedicated password provided by Apple for third-party apps, distinct from your Apple ID password.
                    You can generate it in the security settings at <a href="#" onClick={(e) => { e.preventDefault(); window.api.openExternal('https://account.apple.com'); }}>account.apple.com</a>.
                </p>
            </div>
        </div>
    )
}
