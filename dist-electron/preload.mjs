"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  // 环境检查
  checkEnvironment: () => electron.ipcRenderer.invoke("check-environment"),
  installCommandLineTools: () => electron.ipcRenderer.invoke("install-clt"),
  // 文件操作
  selectIpaFile: () => electron.ipcRenderer.invoke("select-ipa-file"),
  // 上传操作
  startUpload: (config) => electron.ipcRenderer.invoke("start-upload", config),
  cancelUpload: () => electron.ipcRenderer.invoke("cancel-upload"),
  isUploading: () => electron.ipcRenderer.invoke("is-uploading"),
  fetchProviders: (data) => electron.ipcRenderer.invoke("fetch-providers", data),
  onUploadLog: (callback) => electron.ipcRenderer.on("upload-log", callback),
  offUploadLog: (callback) => electron.ipcRenderer.off("upload-log", callback),
  onUploadProgress: (callback) => electron.ipcRenderer.on("upload-progress", callback),
  offUploadProgress: (callback) => electron.ipcRenderer.off("upload-progress", callback),
  onUploadComplete: (callback) => electron.ipcRenderer.on("upload-complete", callback),
  offUploadComplete: (callback) => electron.ipcRenderer.off("upload-complete", callback),
  // 凭证管理
  getCredentialsList: () => electron.ipcRenderer.invoke("get-credentials-list"),
  getCredential: (appleId) => electron.ipcRenderer.invoke("get-credential", appleId),
  saveCredential: (data) => electron.ipcRenderer.invoke("save-credential", data),
  deleteCredential: (appleId) => electron.ipcRenderer.invoke("delete-credential", appleId),
  // 历史记录
  getUploadHistory: () => electron.ipcRenderer.invoke("get-upload-history"),
  clearUploadHistory: () => electron.ipcRenderer.invoke("clear-upload-history"),
  deleteUploadHistory: (id) => electron.ipcRenderer.invoke("delete-upload-history", id),
  // 上下文菜单
  onContextMenu: (callback) => electron.ipcRenderer.on("show-context-menu", callback),
  offContextMenu: (callback) => electron.ipcRenderer.off("show-context-menu", callback),
  // 执行编辑命令
  execCommand: (command) => {
    document.execCommand(command);
  }
});
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
});
