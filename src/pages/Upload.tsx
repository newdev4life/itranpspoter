import { useState, useEffect } from 'react'
import { CredentialListItem, UploadConfig, Provider } from '../types'
import './Upload.css'

interface UploadProps {
    onStartUpload: (config: UploadConfig) => void
}

export function Upload({ onStartUpload }: UploadProps) {
    const [credentials, setCredentials] = useState<CredentialListItem[]>([])
    const [selectedCredential, setSelectedCredential] = useState<string>('')
    const [appleId, setAppleId] = useState('')
    const [password, setPassword] = useState('')
    const [ipaPath, setIpaPath] = useState('')
    const [useNewCredential, setUseNewCredential] = useState(true)
    const [loading, setLoading] = useState(false)

    // Provider 相关状态
    const [providers, setProviders] = useState<Provider[]>([])
    const [selectedProvider, setSelectedProvider] = useState<string>('')
    const [fetchingProviders, setFetchingProviders] = useState(false)
    const [providerError, setProviderError] = useState<string>('')

    useEffect(() => {
        loadCredentials()
    }, [])

    const loadCredentials = async () => {
        const list = await window.api.getCredentialsList()
        setCredentials(list)
        // 如果有保存的凭证，默认选择最近使用的
        if (list.length > 0) {
            setUseNewCredential(false)
            setSelectedCredential(list[0].appleId)
        }
    }

    const handleCredentialSelect = async (appleIdValue: string) => {
        setSelectedCredential(appleIdValue)
        setProviders([])
        setSelectedProvider('')
        setProviderError('')

        if (appleIdValue) {
            const credential = await window.api.getCredential(appleIdValue)
            if (credential) {
                setAppleId(credential.appleId)
                setPassword(credential.password)
            }
        }
    }

    const handleSelectIpa = async () => {
        const path = await window.api.selectIpaFile()
        if (path) {
            setIpaPath(path)
        }
    }

    const handleFetchProviders = async () => {
        const currentAppleId = useNewCredential ? appleId : selectedCredential
        const currentPassword = useNewCredential ? password : (await window.api.getCredential(selectedCredential))?.password

        if (!currentAppleId || !currentPassword) {
            setProviderError('请先填写 Apple ID 和 App-Specific Password')
            return
        }

        setFetchingProviders(true)
        setProviderError('')
        setProviders([])
        setSelectedProvider('')

        try {
            const result = await window.api.fetchProviders({
                appleId: currentAppleId,
                password: currentPassword
            })

            if (result.success && result.providers) {
                setProviders(result.providers)
                // 如果只有一个 provider，自动选择
                if (result.providers.length === 1) {
                    setSelectedProvider(result.providers[0].shortName)
                }
            } else {
                setProviderError(result.errorMessage || '获取 Provider 列表失败')
            }
        } catch (error) {
            setProviderError('获取 Provider 列表时发生错误')
        }

        setFetchingProviders(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!ipaPath) {
            alert('请选择 IPA 文件')
            return
        }

        const finalAppleId = useNewCredential ? appleId : selectedCredential
        const finalPassword = useNewCredential ? password : (await window.api.getCredential(selectedCredential))?.password

        if (!finalAppleId || !finalPassword) {
            alert('请填写完整的凭证信息')
            return
        }

        if (!selectedProvider) {
            alert('请先获取并选择 Provider')
            return
        }

        setLoading(true)
        onStartUpload({
            ipaPath,
            appleId: finalAppleId,
            appSpecificPassword: finalPassword,
            ascProvider: selectedProvider
        })
    }

    const getFileName = (path: string) => {
        return path.split('/').pop() || path
    }

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString('zh-CN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="upload-page animate-fade-in">
            <div className="upload-container">
                <div className="upload-header">
                    <h2>上传 IPA</h2>
                    <p>将你的 iOS 应用上传到 App Store Connect</p>
                </div>

                <form onSubmit={handleSubmit} className="upload-form">
                    {/* IPA 文件选择 */}
                    <div className="form-section">
                        <h3>选择 IPA 文件</h3>
                        <div className="file-picker" onClick={handleSelectIpa}>
                            {ipaPath ? (
                                <div className="file-selected">
                                    <span className="file-icon">📦</span>
                                    <div className="file-info">
                                        <span className="file-name">{getFileName(ipaPath)}</span>
                                        <span className="file-path">{ipaPath}</span>
                                    </div>
                                    <button type="button" className="btn btn-sm btn-ghost">
                                        更换
                                    </button>
                                </div>
                            ) : (
                                <div className="file-placeholder">
                                    <span className="file-icon">📁</span>
                                    <span>点击选择 IPA 文件</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 凭证选择 */}
                    <div className="form-section">
                        <h3>Apple ID 凭证</h3>

                        {credentials.length > 0 && (
                            <div className="credential-toggle">
                                <button
                                    type="button"
                                    className={`toggle-btn ${!useNewCredential ? 'active' : ''}`}
                                    onClick={() => {
                                        setUseNewCredential(false)
                                        setProviders([])
                                        setSelectedProvider('')
                                    }}
                                >
                                    使用已保存的凭证
                                </button>
                                <button
                                    type="button"
                                    className={`toggle-btn ${useNewCredential ? 'active' : ''}`}
                                    onClick={() => {
                                        setUseNewCredential(true)
                                        setProviders([])
                                        setSelectedProvider('')
                                    }}
                                >
                                    输入新凭证
                                </button>
                            </div>
                        )}

                        {!useNewCredential && credentials.length > 0 ? (
                            <div className="credential-list">
                                {credentials.map((cred) => (
                                    <div
                                        key={cred.appleId}
                                        className={`credential-item ${selectedCredential === cred.appleId ? 'selected' : ''}`}
                                        onClick={() => handleCredentialSelect(cred.appleId)}
                                    >
                                        <div className="credential-icon">👤</div>
                                        <div className="credential-info">
                                            <span className="credential-email">{cred.appleId}</span>
                                            <span className="credential-meta">
                                                上次使用: {formatDate(cred.lastUsed)} · 上传 {cred.uploadCount} 次
                                            </span>
                                        </div>
                                        {selectedCredential === cred.appleId && (
                                            <span className="credential-check">✓</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="credential-form">
                                <div className="form-group">
                                    <label className="form-label">Apple ID</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        placeholder="your_apple_id@email.com"
                                        value={appleId}
                                        onChange={(e) => {
                                            setAppleId(e.target.value)
                                            setProviders([])
                                            setSelectedProvider('')
                                        }}
                                        required={useNewCredential}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">App-Specific Password</label>
                                    <input
                                        type="password"
                                        className="form-input"
                                        placeholder="xxxx-xxxx-xxxx-xxxx"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            setProviders([])
                                            setSelectedProvider('')
                                        }}
                                        required={useNewCredential}
                                    />
                                    <span className="form-hint">
                                        在 <a href="https://appleid.apple.com" target="_blank" rel="noopener noreferrer">appleid.apple.com</a> 生成 App 专用密码
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Provider 选择 */}
                    <div className="form-section">
                        <h3>选择 Provider (团队)</h3>

                        {providers.length === 0 ? (
                            <div className="provider-fetch">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleFetchProviders}
                                    disabled={fetchingProviders}
                                >
                                    {fetchingProviders ? '获取中...' : '获取 Provider 列表'}
                                </button>
                                {providerError && (
                                    <p className="provider-error">{providerError}</p>
                                )}
                                <p className="form-hint">
                                    点击获取你的 Apple Developer 账户下的团队列表
                                </p>
                            </div>
                        ) : (
                            <div className="provider-list">
                                {providers.map((provider) => (
                                    <div
                                        key={provider.shortName}
                                        className={`provider-item ${selectedProvider === provider.shortName ? 'selected' : ''}`}
                                        onClick={() => setSelectedProvider(provider.shortName)}
                                    >
                                        <div className="provider-icon">🏢</div>
                                        <div className="provider-info">
                                            <span className="provider-name">{provider.teamName}</span>
                                            <span className="provider-meta">
                                                {provider.teamId && `ID: ${provider.teamId} · `}
                                                {provider.shortName}
                                            </span>
                                        </div>
                                        {selectedProvider === provider.shortName && (
                                            <span className="provider-check">✓</span>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-ghost"
                                    onClick={() => {
                                        setProviders([])
                                        setSelectedProvider('')
                                    }}
                                    style={{ marginTop: '8px' }}
                                >
                                    重新获取
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 提交按钮 */}
                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-full"
                            disabled={!ipaPath || !selectedProvider || loading}
                        >
                            {loading ? '准备中...' : '开始上传'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
