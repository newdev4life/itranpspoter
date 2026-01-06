import { app, BrowserWindow, ipcMain, dialog } from 'electron'
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
  clearUploadHistory,
  deleteUploadHistory
} from './services/store'
import { startUpload, cancelUpload, isUploading, fetchProviders } from './services/uploader'

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
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 900,
    minHeight: 700,
    // icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  // Open DevTools for debugging
  // win.webContents.openDevTools()

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
ipcMain.handle('start-upload', async (_event, config: { ipaPath: string; appleId: string; appSpecificPassword: string; ascProvider?: string }) => {
  if (!win) return { success: false, errorMessage: '窗口未初始化' }
  if (isUploading()) return { success: false, errorMessage: '已有上传任务进行中' }

  return await startUpload(config, win)
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
