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
            // Trigger load for the first one automatically
            await handleCredentialSelect(list[0].appleId)
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

    // Helper to save credential
    const saveCurrentCredential = async () => {
        if (!appleId || !password) return
        try {
            await window.api.saveCredential({ appleId, password })
            // Refresh list
            loadCredentials()
            alert('凭证已保存')
        } catch (e) {
            console.error(e)
            alert('保存失败')
        }
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
            if (providers.length === 0) {
                await handleFetchProviders()
                return
            } else {
                alert('请选择 Provider')
                return
            }
        }

        setLoading(true)
        onStartUpload({
            ipaPath,
            appleId: finalAppleId,
            appSpecificPassword: finalPassword!,
            ascProvider: selectedProvider
        })
    }

    return (
        <div className="upload-page">
            <div className="upload-header">
                <div className="header-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#4B6EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.74197 9.96512 4.01127 9.77251C4.28057 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#4B6EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div>
                    <h2>上傳配置</h2>
                    <p>設定您的 Apple ID 與 IPA 檔案</p>
                </div>
            </div>

            <div className="upload-card">
                {/* IPA Path */}
                <div className="form-group">
                    <div className="form-label-row">
                        <label className="form-label">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="#4B5563" strokeWidth="2" />
                                <circle cx="12" cy="12" r="3" stroke="#4B5563" strokeWidth="2" />
                                <path d="M12 2V5M12 19V22M22 12H19M5 12H2" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            IPA 檔案路徑
                        </label>
                    </div>
                    <div className="input-row">
                        <input
                            type="text"
                            className="form-input"
                            value={ipaPath}
                            placeholder="請點擊瀏覽選擇 .ipa 檔案"
                            readOnly
                            onClick={handleSelectIpa}
                        />
                        <button type="button" className="btn-browse" onClick={handleSelectIpa}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 12V4M8 4L5 7M8 4L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            瀏覽
                        </button>
                    </div>
                </div>

                {/* Apple ID */}
                <div className="form-group">
                    <div className="form-label-row">
                        <label className="form-label">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="8" r="4" stroke="#4B5563" strokeWidth="2" />
                                <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Apple ID
                        </label>
                        {credentials.length > 0 && (
                            <a
                                className="label-action"
                                onClick={() => {
                                    const nextUseNew = !useNewCredential
                                    setUseNewCredential(nextUseNew)
                                    if (!nextUseNew && credentials.length > 0) {
                                        // Valid selection from saved
                                        handleCredentialSelect(credentials[0].appleId)
                                    } else {
                                        // Reset to new
                                        setAppleId('')
                                        setPassword('')
                                        setSelectedCredential('')
                                    }
                                    setProviders([])
                                    setSelectedProvider('')
                                    setProviderError('')
                                }}
                            >
                                {useNewCredential ? '選取已儲存憑證 ∨' : '使用新憑證'}
                            </a>
                        )}
                    </div>

                    {!useNewCredential && credentials.length > 0 ? (
                        <div className="credential-list">
                            {credentials.map(c => (
                                <div
                                    key={c.appleId}
                                    onClick={() => handleCredentialSelect(c.appleId)}
                                    className={`credential-item ${selectedCredential === c.appleId ? 'selected' : ''}`}
                                >
                                    <span className="credential-email">{c.appleId}</span>
                                    {selectedCredential === c.appleId && <span className="credential-check">✓</span>}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="input-row">
                            <input
                                type="email"
                                className="form-input"
                                value={appleId}
                                onChange={(e) => setAppleId(e.target.value)}
                                placeholder="example@icloud.com"
                            />
                        </div>
                    )}
                </div>

                {/* Password / App Specific Password */}
                {(useNewCredential || selectedCredential) && (
                    <div className="form-group">
                        <div className="form-label-row">
                            <label className="form-label">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 2L19 4M19 4L22 7L18.5 10.5L15.5 7.5M19 4L15.5 7.5M12.39 10.61C13.3644 11.5749 13.9797 12.8443 14.1385 14.2087C14.2974 15.573 13.9906 16.9518 13.2689 18.1177C12.5472 19.2836 11.4539 20.1695 10.1668 20.6321C8.8797 21.0947 7.47468 21.1068 6.17992 20.6666C4.88517 20.2264 3.77655 19.3595 3.03407 18.2059C2.29159 17.0523 1.96051 15.6784 2.09566 14.3109C2.23082 12.9435 2.82366 11.6629 3.78041 10.6799C4.73717 9.69692 5.99993 9.06993 7.36 8.9L7.5 8.88" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                App 專用密碼
                            </label>
                            <a
                                className="label-action"
                                onClick={() => window.open('https://appleid.apple.com', '_blank')}
                            >
                                管理 Apple ID ↗
                            </a>
                        </div>
                        <div className="input-row">
                            <input
                                type="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="xxxx-xxxx-xxxx-xxxx"
                                readOnly={!useNewCredential}
                            />
                            {/* Save Credential Button (only if using new credential and fields are filled) */}
                            {useNewCredential && appleId && password && (
                                <button
                                    className="btn-icon-action"
                                    onClick={saveCurrentCredential}
                                    title="保存憑證"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17 21V13H7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7 3V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Fetch Provider Button - Always Visible */}
                <div className="form-group">
                    <div className="form-label-row">
                        <label className="form-label">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 21H21M6 18V11M10 18V11M14 18V11M18 18V11M12 7L21 12M12 7L3 12M12 7V3" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            發佈團隊 (Provider)
                        </label>
                    </div>

                    {providers.length === 0 && !fetchingProviders && (
                        <button
                            className="btn-fetch-providers"
                            onClick={handleFetchProviders}
                            disabled={fetchingProviders || (!useNewCredential && !selectedCredential) || (useNewCredential && (!appleId || !password))}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.65 2.35C12.2 0.9 10.21 0 8 0C3.58 0 0.01 3.58 0.01 8C0.01 12.42 3.58 16 8 16C11.73 16 14.84 13.45 15.73 10H13.65C12.83 12.33 10.61 14 8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C9.66 2 11.14 2.69 12.22 3.78L9 7H16V0L13.65 2.35Z" fill="currentColor" />
                            </svg>
                            獲取團隊列表
                        </button>
                    )}

                    {fetchingProviders && (
                        <div className="provider-loading">
                            <div className="loading-spinner"></div>
                            正在獲取團隊列表...
                        </div>
                    )}

                    {providers.length > 0 && (
                        <select
                            className="form-input provider-select"
                            value={selectedProvider}
                            onChange={(e) => setSelectedProvider(e.target.value)}
                        >
                            <option value="">請選擇團隊</option>
                            {providers.map(p => (
                                <option key={p.teamId} value={p.teamId}>
                                    {p.teamName} ({p.teamId})
                                </option>
                            ))}
                        </select>
                    )}

                    {providerError && (
                        <div className="provider-error">
                            {providerError}
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <button
                    className="btn-submit"
                    onClick={handleSubmit}
                    disabled={
                        loading ||
                        !ipaPath ||
                        (!useNewCredential && !selectedCredential) ||
                        (useNewCredential && (!appleId || !password)) ||
                        !selectedProvider
                    }
                >
                    {loading ? '正在處理...' : '開始執行上傳'}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
