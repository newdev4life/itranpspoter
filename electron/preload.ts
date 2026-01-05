import { ipcRenderer, contextBridge } from 'electron'

// 定义 API 类型
export interface ElectronAPI {
  // 环境检查
  checkEnvironment: () => Promise<{
    transporterInstalled: boolean
    transporterPath: string
    iTMSTransporterPath: string
    iTMSTransporterExists: boolean
    commandLineToolsInstalled: boolean
    commandLineToolsPath: string
    allReady: boolean
  }>

  // 文件操作
  selectIpaFile: () => Promise<string | null>

  // 上传操作
  startUpload: (config: {
    ipaPath: string
    appleId: string
    appSpecificPassword: string
  }) => Promise<{ success: boolean; errorMessage?: string }>
  cancelUpload: () => Promise<boolean>
  isUploading: () => Promise<boolean>
  onUploadLog: (callback: (event: any, data: { timestamp: string; message: string }) => void) => void
  offUploadLog: (callback: (event: any, data: { timestamp: string; message: string }) => void) => void
  onUploadComplete: (callback: (event: any, data: { success: boolean; errorMessage?: string }) => void) => void
  offUploadComplete: (callback: (event: any, data: { success: boolean; errorMessage?: string }) => void) => void

  // 凭证管理
  getCredentialsList: () => Promise<Array<{ appleId: string; lastUsed: string; uploadCount: number }>>
  getCredential: (appleId: string) => Promise<{ appleId: string; password: string; lastUsed: string; uploadCount: number } | null>
  saveCredential: (data: { appleId: string; password: string }) => Promise<boolean>
  deleteCredential: (appleId: string) => Promise<boolean>

  // 历史记录
  getUploadHistory: () => Promise<Array<{
    id: string
    fileName: string
    filePath: string
    appleId: string
    status: 'success' | 'failed' | 'cancelled'
    startTime: string
    endTime: string
    errorMessage?: string
  }>>
  clearUploadHistory: () => Promise<boolean>
  deleteUploadHistory: (id: string) => Promise<boolean>
}

// 暴露 API 给渲染进程
contextBridge.exposeInMainWorld('api', {
  // 环境检查
  checkEnvironment: () => ipcRenderer.invoke('check-environment'),
  installCommandLineTools: () => ipcRenderer.invoke('install-clt'),

  // 文件操作
  selectIpaFile: () => ipcRenderer.invoke('select-ipa-file'),

  // 上传操作
  startUpload: (config: { ipaPath: string; appleId: string; appSpecificPassword: string; ascProvider?: string }) =>
    ipcRenderer.invoke('start-upload', config),
  cancelUpload: () => ipcRenderer.invoke('cancel-upload'),
  isUploading: () => ipcRenderer.invoke('is-uploading'),
  fetchProviders: (data: { appleId: string; password: string }) =>
    ipcRenderer.invoke('fetch-providers', data),
  onUploadLog: (callback: (event: any, data: { timestamp: string; message: string }) => void) =>
    ipcRenderer.on('upload-log', callback),
  offUploadLog: (callback: (event: any, data: { timestamp: string; message: string }) => void) =>
    ipcRenderer.off('upload-log', callback),
  onUploadProgress: (callback: (event: any, data: any) => void) =>
    ipcRenderer.on('upload-progress', callback),
  offUploadProgress: (callback: (event: any, data: any) => void) =>
    ipcRenderer.off('upload-progress', callback),
  onUploadComplete: (callback: (event: any, data: { success: boolean; errorMessage?: string }) => void) =>
    ipcRenderer.on('upload-complete', callback),
  offUploadComplete: (callback: (event: any, data: { success: boolean; errorMessage?: string }) => void) =>
    ipcRenderer.off('upload-complete', callback),

  // 凭证管理
  getCredentialsList: () => ipcRenderer.invoke('get-credentials-list'),
  getCredential: (appleId: string) => ipcRenderer.invoke('get-credential', appleId),
  saveCredential: (data: { appleId: string; password: string }) => ipcRenderer.invoke('save-credential', data),
  deleteCredential: (appleId: string) => ipcRenderer.invoke('delete-credential', appleId),

  // 历史记录
  getUploadHistory: () => ipcRenderer.invoke('get-upload-history'),
  clearUploadHistory: () => ipcRenderer.invoke('clear-upload-history'),
  deleteUploadHistory: (id: string) => ipcRenderer.invoke('delete-upload-history', id),
} as ElectronAPI)

// 保留原有的 ipcRenderer 暴露（兼容性）
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
})
