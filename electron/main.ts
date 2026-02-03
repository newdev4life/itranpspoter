import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// 导入服务
import { getEnvironmentStatus, installCommandLineTools } from './services/environment'
import {
  getCredentialsList,
  getCredential,
  saveCredential,
  deleteCredential,
  getUploadHistory,
  getUploadHistoryRecord,
  clearUploadHistory,
  deleteUploadHistory,
  getWebhookSettings,
  setWebhookSettings,
  getRetryAttempts,
  setRetryAttempts
} from './services/store'
import { startUpload, cancelUpload, isUploading, fetchProviders } from './services/uploader'
import { getIpInfo } from './services/ipInfo'
import { testWebhook } from './services/webhook'
import { analyzeIpa } from './services/ipaAnalyzer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │

// 在打包后，__dirname 指向 app.asar/dist-electron
// 需要正确计算路径
const isDev = !!process.env['VITE_DEV_SERVER_URL']

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(__dirname)
export const RENDERER_DIST = path.join(__dirname, '../dist')

process.env.VITE_PUBLIC = isDev ? path.join(__dirname, '../public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {

  const isDev = !app.isPackaged;

  win = new BrowserWindow({
    width: 1200,
    height: 920,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    // icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
      devTools: isDev
    },
  })

  // Open DevTools for debugging
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' })
  }

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // 添加右键菜单 - 发送到渲染进程显示自定义菜单
  win.webContents.on('context-menu', (_event, params) => {
    const { isEditable, selectionText, editFlags, x, y } = params

    // 发送上下文菜单事件到渲染进程
    win?.webContents.send('show-context-menu', {
      isEditable,
      hasSelection: selectionText && selectionText.trim() !== '',
      editFlags,
      x,
      y
    })
  })
}

// ==================== IPC Handlers ====================

// 环境检查
ipcMain.handle('check-environment', async () => {
  return await getEnvironmentStatus()
})

// 安装 Command Line Tools
ipcMain.handle('install-clt', async () => {
  return await installCommandLineTools()
})

// 选择 IPA 文件
ipcMain.handle('select-ipa-file', async () => {
  if (!win) return null

  const result = await dialog.showOpenDialog(win, {
    title: '选择 IPA 文件',
    filters: [
      { name: 'iOS App', extensions: ['ipa'] }
    ],
    properties: ['openFile']
  })

  if (result.canceled || result.filePaths.length === 0) {
    return null
  }

  return result.filePaths[0]
})

// 开始上传
ipcMain.handle('start-upload', async (_event, config: { ipaPath: string; appleId: string; appSpecificPassword: string; ascProvider?: string; retryAttempts?: number }) => {
  if (!win) return { success: false, errorMessage: '窗口未初始化' }
  if (isUploading()) return { success: false, errorMessage: '已有上传任务进行中' }

  return await startUpload(config, win, config.retryAttempts || 1)
})

// 取消上传
ipcMain.handle('cancel-upload', async () => {
  if (!win) return false
  return cancelUpload(win)
})

// 获取上传状态
ipcMain.handle('is-uploading', () => {
  return isUploading()
})

// 获取 Providers 列表
ipcMain.handle('fetch-providers', async (_event, data: { appleId: string; password: string }) => {
  return await fetchProviders(data.appleId, data.password)
})

// Open External URL
ipcMain.handle('open-external', async (_event, url: string) => {
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    await shell.openExternal(url)
  }
})

// 获取凭证列表（不含密码）
ipcMain.handle('get-credentials-list', () => {
  return getCredentialsList()
})

// 获取完整凭证（含密码）
ipcMain.handle('get-credential', (_event, appleId: string) => {
  return getCredential(appleId)
})

// 保存凭证
ipcMain.handle('save-credential', (_event, data: { appleId: string; password: string }) => {
  saveCredential(data.appleId, data.password)
  return true
})

// 删除凭证
ipcMain.handle('delete-credential', (_event, appleId: string) => {
  return deleteCredential(appleId)
})

// 获取上传历史
ipcMain.handle('get-upload-history', () => {
  return getUploadHistory()
})

// 清空上传历史
ipcMain.handle('clear-upload-history', () => {
  clearUploadHistory()
  return true
})

// 删除单条上传历史
ipcMain.handle('delete-upload-history', (_event, id: string) => {
  return deleteUploadHistory(id)
})

// 获取单条上传历史记录（用于查看日志）
ipcMain.handle('get-upload-history-record', (_event, id: string) => {
  return getUploadHistoryRecord(id)
})

// IP Info - Fetch user's IP geolocation
ipcMain.handle('get-ip-info', async () => {
  return await getIpInfo()
})

// ==================== Webhook Settings ====================

// Get webhook settings
ipcMain.handle('get-webhook-settings', () => {
  return getWebhookSettings()
})

// Set webhook settings
ipcMain.handle('set-webhook-settings', (_event, settings: { url: string; enabled: boolean }) => {
  setWebhookSettings(settings)
  return true
})

// Test webhook
ipcMain.handle('test-webhook', async (_event, url: string) => {
  return await testWebhook(url)
})

// ==================== Retry Attempts Settings ====================

// Get retry attempts setting
ipcMain.handle('get-retry-attempts', () => {
  return getRetryAttempts()
})

// Set retry attempts setting
ipcMain.handle('set-retry-attempts', (_event, attempts: number) => {
  setRetryAttempts(attempts)
  return true
})

// ==================== IPA Analysis ====================

// Analyze IPA file
ipcMain.handle('analyze-ipa', async (_event, ipaPath: string) => {
  return await analyzeIpa(ipaPath)
})

// ==================== App Lifecycle ====================

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
