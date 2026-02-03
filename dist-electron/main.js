import require$$1$2, { net, ipcMain as ipcMain$1, shell as shell$1, app as app$1, BrowserWindow, dialog } from "electron";
import { fileURLToPath } from "node:url";
import path$6 from "node:path";
import * as fs$3 from "fs";
import fs__default from "fs";
import { exec, execFile, spawn } from "child_process";
import require$$1$1, { promisify } from "util";
import * as require$$0 from "path";
import require$$0__default from "path";
import * as crypto from "crypto";
import crypto__default from "crypto";
import require$$4 from "assert";
import require$$5 from "events";
import require$$1 from "os";
const execAsync = promisify(exec);
const TRANSPORTER_PATH = "/Applications/Transporter.app";
const ITMS_TRANSPORTER_PATH = "/Applications/Transporter.app/Contents/itms/bin/iTMSTransporter";
const STANDALONE_ITMS_TRANSPORTER_PATH = "/usr/local/itms/bin/iTMSTransporter";
function checkTransporter() {
  return fs$3.existsSync(TRANSPORTER_PATH);
}
function checkITMSTransporter() {
  return fs$3.existsSync(ITMS_TRANSPORTER_PATH);
}
function checkStandaloneITMSTransporter() {
  return fs$3.existsSync(STANDALONE_ITMS_TRANSPORTER_PATH);
}
async function checkCommandLineTools() {
  try {
    const { stdout } = await execAsync("xcode-select -p");
    const path2 = stdout.trim();
    if (fs$3.existsSync(path2)) {
      return { installed: true, path: path2 };
    }
    return { installed: false, path: "" };
  } catch {
    return { installed: false, path: "" };
  }
}
async function getEnvironmentStatus() {
  const transporterInstalled = checkTransporter();
  const iTMSTransporterExists = checkITMSTransporter();
  const standaloneITMSTransporterExists = checkStandaloneITMSTransporter();
  const cltStatus = await checkCommandLineTools();
  const hasAnyITMSTransporter = iTMSTransporterExists || standaloneITMSTransporterExists;
  return {
    transporterInstalled,
    transporterPath: TRANSPORTER_PATH,
    iTMSTransporterPath: ITMS_TRANSPORTER_PATH,
    iTMSTransporterExists,
    standaloneITMSTransporterExists,
    standaloneITMSTransporterPath: STANDALONE_ITMS_TRANSPORTER_PATH,
    commandLineToolsInstalled: cltStatus.installed,
    commandLineToolsPath: cltStatus.path,
    allReady: hasAnyITMSTransporter && cltStatus.installed
  };
}
function getITMSTransporterPath() {
  if (fs$3.existsSync(ITMS_TRANSPORTER_PATH)) {
    return ITMS_TRANSPORTER_PATH;
  }
  if (fs$3.existsSync(STANDALONE_ITMS_TRANSPORTER_PATH)) {
    return STANDALONE_ITMS_TRANSPORTER_PATH;
  }
  throw new Error("iTMSTransporter not found. Please install Transporter from App Store or download standalone iTMSTransporter from Apple.");
}
async function installCommandLineTools() {
  var _a;
  try {
    await execAsync("xcode-select --install");
    return {
      success: true,
      message: 'Command Line Tools 安装程序已启动，请在弹出的对话框中点击"安装"。'
    };
  } catch (error2) {
    if ((_a = error2.message) == null ? void 0 : _a.includes("already installed")) {
      return {
        success: true,
        message: "Command Line Tools 已安装。"
      };
    }
    if (error2.code === 1) {
      return {
        success: true,
        message: 'Command Line Tools 安装程序已启动，请在弹出的对话框中点击"安装"。'
      };
    }
    return {
      success: false,
      message: `安装失败: ${error2.message}`
    };
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var source = { exports: {} };
var isObj$1 = (value) => {
  const type2 = typeof value;
  return value !== null && (type2 === "object" || type2 === "function");
};
const isObj = isObj$1;
const disallowedKeys = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]);
const isValidPath = (pathSegments) => !pathSegments.some((segment) => disallowedKeys.has(segment));
function getPathSegments(path2) {
  const pathArray = path2.split(".");
  const parts = [];
  for (let i = 0; i < pathArray.length; i++) {
    let p = pathArray[i];
    while (p[p.length - 1] === "\\" && pathArray[i + 1] !== void 0) {
      p = p.slice(0, -1) + ".";
      p += pathArray[++i];
    }
    parts.push(p);
  }
  if (!isValidPath(parts)) {
    return [];
  }
  return parts;
}
var dotProp = {
  get(object, path2, value) {
    if (!isObj(object) || typeof path2 !== "string") {
      return value === void 0 ? object : value;
    }
    const pathArray = getPathSegments(path2);
    if (pathArray.length === 0) {
      return;
    }
    for (let i = 0; i < pathArray.length; i++) {
      object = object[pathArray[i]];
      if (object === void 0 || object === null) {
        if (i !== pathArray.length - 1) {
          return value;
        }
        break;
      }
    }
    return object === void 0 ? value : object;
  },
  set(object, path2, value) {
    if (!isObj(object) || typeof path2 !== "string") {
      return object;
    }
    const root = object;
    const pathArray = getPathSegments(path2);
    for (let i = 0; i < pathArray.length; i++) {
      const p = pathArray[i];
      if (!isObj(object[p])) {
        object[p] = {};
      }
      if (i === pathArray.length - 1) {
        object[p] = value;
      }
      object = object[p];
    }
    return root;
  },
  delete(object, path2) {
    if (!isObj(object) || typeof path2 !== "string") {
      return false;
    }
    const pathArray = getPathSegments(path2);
    for (let i = 0; i < pathArray.length; i++) {
      const p = pathArray[i];
      if (i === pathArray.length - 1) {
        delete object[p];
        return true;
      }
      object = object[p];
      if (!isObj(object)) {
        return false;
      }
    }
  },
  has(object, path2) {
    if (!isObj(object) || typeof path2 !== "string") {
      return false;
    }
    const pathArray = getPathSegments(path2);
    if (pathArray.length === 0) {
      return false;
    }
    for (let i = 0; i < pathArray.length; i++) {
      if (isObj(object)) {
        if (!(pathArray[i] in object)) {
          return false;
        }
        object = object[pathArray[i]];
      } else {
        return false;
      }
    }
    return true;
  }
};
var pkgUp = { exports: {} };
var findUp$1 = { exports: {} };
var locatePath$1 = { exports: {} };
var pathExists$1 = { exports: {} };
const fs$2 = fs__default;
pathExists$1.exports = (fp) => new Promise((resolve2) => {
  fs$2.access(fp, (err) => {
    resolve2(!err);
  });
});
pathExists$1.exports.sync = (fp) => {
  try {
    fs$2.accessSync(fp);
    return true;
  } catch (err) {
    return false;
  }
};
var pathExistsExports = pathExists$1.exports;
var pLimit$2 = { exports: {} };
var pTry$2 = { exports: {} };
const pTry$1 = (fn, ...arguments_) => new Promise((resolve2) => {
  resolve2(fn(...arguments_));
});
pTry$2.exports = pTry$1;
pTry$2.exports.default = pTry$1;
var pTryExports = pTry$2.exports;
const pTry = pTryExports;
const pLimit$1 = (concurrency) => {
  if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  }
  const queue = [];
  let activeCount = 0;
  const next = () => {
    activeCount--;
    if (queue.length > 0) {
      queue.shift()();
    }
  };
  const run = (fn, resolve2, ...args) => {
    activeCount++;
    const result = pTry(fn, ...args);
    resolve2(result);
    result.then(next, next);
  };
  const enqueue = (fn, resolve2, ...args) => {
    if (activeCount < concurrency) {
      run(fn, resolve2, ...args);
    } else {
      queue.push(run.bind(null, fn, resolve2, ...args));
    }
  };
  const generator = (fn, ...args) => new Promise((resolve2) => enqueue(fn, resolve2, ...args));
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.length
    },
    clearQueue: {
      value: () => {
        queue.length = 0;
      }
    }
  });
  return generator;
};
pLimit$2.exports = pLimit$1;
pLimit$2.exports.default = pLimit$1;
var pLimitExports = pLimit$2.exports;
const pLimit = pLimitExports;
class EndError extends Error {
  constructor(value) {
    super();
    this.value = value;
  }
}
const testElement = (el, tester) => Promise.resolve(el).then(tester);
const finder = (el) => Promise.all(el).then((val) => val[1] === true && Promise.reject(new EndError(val[0])));
var pLocate$1 = (iterable, tester, opts) => {
  opts = Object.assign({
    concurrency: Infinity,
    preserveOrder: true
  }, opts);
  const limit2 = pLimit(opts.concurrency);
  const items2 = [...iterable].map((el) => [el, limit2(testElement, el, tester)]);
  const checkLimit = pLimit(opts.preserveOrder ? 1 : Infinity);
  return Promise.all(items2.map((el) => checkLimit(finder, el))).then(() => {
  }).catch((err) => err instanceof EndError ? err.value : Promise.reject(err));
};
const path$5 = require$$0__default;
const pathExists = pathExistsExports;
const pLocate = pLocate$1;
locatePath$1.exports = (iterable, options) => {
  options = Object.assign({
    cwd: process.cwd()
  }, options);
  return pLocate(iterable, (el) => pathExists(path$5.resolve(options.cwd, el)), options);
};
locatePath$1.exports.sync = (iterable, options) => {
  options = Object.assign({
    cwd: process.cwd()
  }, options);
  for (const el of iterable) {
    if (pathExists.sync(path$5.resolve(options.cwd, el))) {
      return el;
    }
  }
};
var locatePathExports = locatePath$1.exports;
const path$4 = require$$0__default;
const locatePath = locatePathExports;
findUp$1.exports = (filename, opts = {}) => {
  const startDir = path$4.resolve(opts.cwd || "");
  const { root } = path$4.parse(startDir);
  const filenames = [].concat(filename);
  return new Promise((resolve2) => {
    (function find2(dir) {
      locatePath(filenames, { cwd: dir }).then((file) => {
        if (file) {
          resolve2(path$4.join(dir, file));
        } else if (dir === root) {
          resolve2(null);
        } else {
          find2(path$4.dirname(dir));
        }
      });
    })(startDir);
  });
};
findUp$1.exports.sync = (filename, opts = {}) => {
  let dir = path$4.resolve(opts.cwd || "");
  const { root } = path$4.parse(dir);
  const filenames = [].concat(filename);
  while (true) {
    const file = locatePath.sync(filenames, { cwd: dir });
    if (file) {
      return path$4.join(dir, file);
    }
    if (dir === root) {
      return null;
    }
    dir = path$4.dirname(dir);
  }
};
var findUpExports = findUp$1.exports;
const findUp = findUpExports;
pkgUp.exports = async ({ cwd } = {}) => findUp("package.json", { cwd });
pkgUp.exports.sync = ({ cwd } = {}) => findUp.sync("package.json", { cwd });
var pkgUpExports = pkgUp.exports;
var envPaths$1 = { exports: {} };
const path$3 = require$$0__default;
const os = require$$1;
const homedir = os.homedir();
const tmpdir = os.tmpdir();
const { env } = process;
const macos = (name) => {
  const library = path$3.join(homedir, "Library");
  return {
    data: path$3.join(library, "Application Support", name),
    config: path$3.join(library, "Preferences", name),
    cache: path$3.join(library, "Caches", name),
    log: path$3.join(library, "Logs", name),
    temp: path$3.join(tmpdir, name)
  };
};
const windows = (name) => {
  const appData = env.APPDATA || path$3.join(homedir, "AppData", "Roaming");
  const localAppData = env.LOCALAPPDATA || path$3.join(homedir, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: path$3.join(localAppData, name, "Data"),
    config: path$3.join(appData, name, "Config"),
    cache: path$3.join(localAppData, name, "Cache"),
    log: path$3.join(localAppData, name, "Log"),
    temp: path$3.join(tmpdir, name)
  };
};
const linux = (name) => {
  const username = path$3.basename(homedir);
  return {
    data: path$3.join(env.XDG_DATA_HOME || path$3.join(homedir, ".local", "share"), name),
    config: path$3.join(env.XDG_CONFIG_HOME || path$3.join(homedir, ".config"), name),
    cache: path$3.join(env.XDG_CACHE_HOME || path$3.join(homedir, ".cache"), name),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: path$3.join(env.XDG_STATE_HOME || path$3.join(homedir, ".local", "state"), name),
    temp: path$3.join(tmpdir, username, name)
  };
};
const envPaths = (name, options) => {
  if (typeof name !== "string") {
    throw new TypeError(`Expected string, got ${typeof name}`);
  }
  options = Object.assign({ suffix: "nodejs" }, options);
  if (options.suffix) {
    name += `-${options.suffix}`;
  }
  if (process.platform === "darwin") {
    return macos(name);
  }
  if (process.platform === "win32") {
    return windows(name);
  }
  return linux(name);
};
envPaths$1.exports = envPaths;
envPaths$1.exports.default = envPaths;
var envPathsExports = envPaths$1.exports;
var dist$1 = {};
var consts = {};
Object.defineProperty(consts, "__esModule", { value: true });
consts.NOOP = consts.LIMIT_FILES_DESCRIPTORS = consts.LIMIT_BASENAME_LENGTH = consts.IS_USER_ROOT = consts.IS_POSIX = consts.DEFAULT_TIMEOUT_SYNC = consts.DEFAULT_TIMEOUT_ASYNC = consts.DEFAULT_WRITE_OPTIONS = consts.DEFAULT_READ_OPTIONS = consts.DEFAULT_FOLDER_MODE = consts.DEFAULT_FILE_MODE = consts.DEFAULT_ENCODING = void 0;
const DEFAULT_ENCODING = "utf8";
consts.DEFAULT_ENCODING = DEFAULT_ENCODING;
const DEFAULT_FILE_MODE = 438;
consts.DEFAULT_FILE_MODE = DEFAULT_FILE_MODE;
const DEFAULT_FOLDER_MODE = 511;
consts.DEFAULT_FOLDER_MODE = DEFAULT_FOLDER_MODE;
const DEFAULT_READ_OPTIONS = {};
consts.DEFAULT_READ_OPTIONS = DEFAULT_READ_OPTIONS;
const DEFAULT_WRITE_OPTIONS = {};
consts.DEFAULT_WRITE_OPTIONS = DEFAULT_WRITE_OPTIONS;
const DEFAULT_TIMEOUT_ASYNC = 5e3;
consts.DEFAULT_TIMEOUT_ASYNC = DEFAULT_TIMEOUT_ASYNC;
const DEFAULT_TIMEOUT_SYNC = 100;
consts.DEFAULT_TIMEOUT_SYNC = DEFAULT_TIMEOUT_SYNC;
const IS_POSIX = !!process.getuid;
consts.IS_POSIX = IS_POSIX;
const IS_USER_ROOT = process.getuid ? !process.getuid() : false;
consts.IS_USER_ROOT = IS_USER_ROOT;
const LIMIT_BASENAME_LENGTH = 128;
consts.LIMIT_BASENAME_LENGTH = LIMIT_BASENAME_LENGTH;
const LIMIT_FILES_DESCRIPTORS = 1e4;
consts.LIMIT_FILES_DESCRIPTORS = LIMIT_FILES_DESCRIPTORS;
const NOOP = () => {
};
consts.NOOP = NOOP;
var fs$1 = {};
var attemptify = {};
Object.defineProperty(attemptify, "__esModule", { value: true });
attemptify.attemptifySync = attemptify.attemptifyAsync = void 0;
const consts_1$4 = consts;
const attemptifyAsync = (fn, onError = consts_1$4.NOOP) => {
  return function() {
    return fn.apply(void 0, arguments).catch(onError);
  };
};
attemptify.attemptifyAsync = attemptifyAsync;
const attemptifySync = (fn, onError = consts_1$4.NOOP) => {
  return function() {
    try {
      return fn.apply(void 0, arguments);
    } catch (error2) {
      return onError(error2);
    }
  };
};
attemptify.attemptifySync = attemptifySync;
var fs_handlers = {};
Object.defineProperty(fs_handlers, "__esModule", { value: true });
const consts_1$3 = consts;
const Handlers = {
  isChangeErrorOk: (error2) => {
    const { code: code2 } = error2;
    if (code2 === "ENOSYS")
      return true;
    if (!consts_1$3.IS_USER_ROOT && (code2 === "EINVAL" || code2 === "EPERM"))
      return true;
    return false;
  },
  isRetriableError: (error2) => {
    const { code: code2 } = error2;
    if (code2 === "EMFILE" || code2 === "ENFILE" || code2 === "EAGAIN" || code2 === "EBUSY" || code2 === "EACCESS" || code2 === "EACCS" || code2 === "EPERM")
      return true;
    return false;
  },
  onChangeError: (error2) => {
    if (Handlers.isChangeErrorOk(error2))
      return;
    throw error2;
  }
};
fs_handlers.default = Handlers;
var retryify = {};
var retryify_queue = {};
Object.defineProperty(retryify_queue, "__esModule", { value: true });
const consts_1$2 = consts;
const RetryfyQueue = {
  interval: 25,
  intervalId: void 0,
  limit: consts_1$2.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    if (RetryfyQueue.intervalId)
      return;
    RetryfyQueue.intervalId = setInterval(RetryfyQueue.tick, RetryfyQueue.interval);
  },
  reset: () => {
    if (!RetryfyQueue.intervalId)
      return;
    clearInterval(RetryfyQueue.intervalId);
    delete RetryfyQueue.intervalId;
  },
  add: (fn) => {
    RetryfyQueue.queueWaiting.add(fn);
    if (RetryfyQueue.queueActive.size < RetryfyQueue.limit / 2) {
      RetryfyQueue.tick();
    } else {
      RetryfyQueue.init();
    }
  },
  remove: (fn) => {
    RetryfyQueue.queueWaiting.delete(fn);
    RetryfyQueue.queueActive.delete(fn);
  },
  schedule: () => {
    return new Promise((resolve2) => {
      const cleanup = () => RetryfyQueue.remove(resolver);
      const resolver = () => resolve2(cleanup);
      RetryfyQueue.add(resolver);
    });
  },
  tick: () => {
    if (RetryfyQueue.queueActive.size >= RetryfyQueue.limit)
      return;
    if (!RetryfyQueue.queueWaiting.size)
      return RetryfyQueue.reset();
    for (const fn of RetryfyQueue.queueWaiting) {
      if (RetryfyQueue.queueActive.size >= RetryfyQueue.limit)
        break;
      RetryfyQueue.queueWaiting.delete(fn);
      RetryfyQueue.queueActive.add(fn);
      fn();
    }
  }
};
retryify_queue.default = RetryfyQueue;
Object.defineProperty(retryify, "__esModule", { value: true });
retryify.retryifySync = retryify.retryifyAsync = void 0;
const retryify_queue_1 = retryify_queue;
const retryifyAsync = (fn, isRetriableError) => {
  return function(timestamp) {
    return function attempt() {
      return retryify_queue_1.default.schedule().then((cleanup) => {
        return fn.apply(void 0, arguments).then((result) => {
          cleanup();
          return result;
        }, (error2) => {
          cleanup();
          if (Date.now() >= timestamp)
            throw error2;
          if (isRetriableError(error2)) {
            const delay = Math.round(100 + 400 * Math.random()), delayPromise = new Promise((resolve2) => setTimeout(resolve2, delay));
            return delayPromise.then(() => attempt.apply(void 0, arguments));
          }
          throw error2;
        });
      });
    };
  };
};
retryify.retryifyAsync = retryifyAsync;
const retryifySync = (fn, isRetriableError) => {
  return function(timestamp) {
    return function attempt() {
      try {
        return fn.apply(void 0, arguments);
      } catch (error2) {
        if (Date.now() > timestamp)
          throw error2;
        if (isRetriableError(error2))
          return attempt.apply(void 0, arguments);
        throw error2;
      }
    };
  };
};
retryify.retryifySync = retryifySync;
Object.defineProperty(fs$1, "__esModule", { value: true });
const fs = fs__default;
const util_1$S = require$$1$1;
const attemptify_1 = attemptify;
const fs_handlers_1 = fs_handlers;
const retryify_1 = retryify;
const FS = {
  chmodAttempt: attemptify_1.attemptifyAsync(util_1$S.promisify(fs.chmod), fs_handlers_1.default.onChangeError),
  chownAttempt: attemptify_1.attemptifyAsync(util_1$S.promisify(fs.chown), fs_handlers_1.default.onChangeError),
  closeAttempt: attemptify_1.attemptifyAsync(util_1$S.promisify(fs.close)),
  fsyncAttempt: attemptify_1.attemptifyAsync(util_1$S.promisify(fs.fsync)),
  mkdirAttempt: attemptify_1.attemptifyAsync(util_1$S.promisify(fs.mkdir)),
  realpathAttempt: attemptify_1.attemptifyAsync(util_1$S.promisify(fs.realpath)),
  statAttempt: attemptify_1.attemptifyAsync(util_1$S.promisify(fs.stat)),
  unlinkAttempt: attemptify_1.attemptifyAsync(util_1$S.promisify(fs.unlink)),
  closeRetry: retryify_1.retryifyAsync(util_1$S.promisify(fs.close), fs_handlers_1.default.isRetriableError),
  fsyncRetry: retryify_1.retryifyAsync(util_1$S.promisify(fs.fsync), fs_handlers_1.default.isRetriableError),
  openRetry: retryify_1.retryifyAsync(util_1$S.promisify(fs.open), fs_handlers_1.default.isRetriableError),
  readFileRetry: retryify_1.retryifyAsync(util_1$S.promisify(fs.readFile), fs_handlers_1.default.isRetriableError),
  renameRetry: retryify_1.retryifyAsync(util_1$S.promisify(fs.rename), fs_handlers_1.default.isRetriableError),
  statRetry: retryify_1.retryifyAsync(util_1$S.promisify(fs.stat), fs_handlers_1.default.isRetriableError),
  writeRetry: retryify_1.retryifyAsync(util_1$S.promisify(fs.write), fs_handlers_1.default.isRetriableError),
  chmodSyncAttempt: attemptify_1.attemptifySync(fs.chmodSync, fs_handlers_1.default.onChangeError),
  chownSyncAttempt: attemptify_1.attemptifySync(fs.chownSync, fs_handlers_1.default.onChangeError),
  closeSyncAttempt: attemptify_1.attemptifySync(fs.closeSync),
  mkdirSyncAttempt: attemptify_1.attemptifySync(fs.mkdirSync),
  realpathSyncAttempt: attemptify_1.attemptifySync(fs.realpathSync),
  statSyncAttempt: attemptify_1.attemptifySync(fs.statSync),
  unlinkSyncAttempt: attemptify_1.attemptifySync(fs.unlinkSync),
  closeSyncRetry: retryify_1.retryifySync(fs.closeSync, fs_handlers_1.default.isRetriableError),
  fsyncSyncRetry: retryify_1.retryifySync(fs.fsyncSync, fs_handlers_1.default.isRetriableError),
  openSyncRetry: retryify_1.retryifySync(fs.openSync, fs_handlers_1.default.isRetriableError),
  readFileSyncRetry: retryify_1.retryifySync(fs.readFileSync, fs_handlers_1.default.isRetriableError),
  renameSyncRetry: retryify_1.retryifySync(fs.renameSync, fs_handlers_1.default.isRetriableError),
  statSyncRetry: retryify_1.retryifySync(fs.statSync, fs_handlers_1.default.isRetriableError),
  writeSyncRetry: retryify_1.retryifySync(fs.writeSync, fs_handlers_1.default.isRetriableError)
};
fs$1.default = FS;
var lang = {};
Object.defineProperty(lang, "__esModule", { value: true });
const Lang = {
  isFunction: (x) => {
    return typeof x === "function";
  },
  isString: (x) => {
    return typeof x === "string";
  },
  isUndefined: (x) => {
    return typeof x === "undefined";
  }
};
lang.default = Lang;
var scheduler = {};
Object.defineProperty(scheduler, "__esModule", { value: true });
const Queues = {};
const Scheduler = {
  next: (id2) => {
    const queue = Queues[id2];
    if (!queue)
      return;
    queue.shift();
    const job = queue[0];
    if (job) {
      job(() => Scheduler.next(id2));
    } else {
      delete Queues[id2];
    }
  },
  schedule: (id2) => {
    return new Promise((resolve2) => {
      let queue = Queues[id2];
      if (!queue)
        queue = Queues[id2] = [];
      queue.push(resolve2);
      if (queue.length > 1)
        return;
      resolve2(() => Scheduler.next(id2));
    });
  }
};
scheduler.default = Scheduler;
var temp = {};
Object.defineProperty(temp, "__esModule", { value: true });
const path$2 = require$$0__default;
const consts_1$1 = consts;
const fs_1$1 = fs$1;
const Temp = {
  store: {},
  create: (filePath) => {
    const randomness = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), timestamp = Date.now().toString().slice(-10), prefix = "tmp-", suffix = `.${prefix}${timestamp}${randomness}`, tempPath = `${filePath}${suffix}`;
    return tempPath;
  },
  get: (filePath, creator, purge = true) => {
    const tempPath = Temp.truncate(creator(filePath));
    if (tempPath in Temp.store)
      return Temp.get(filePath, creator, purge);
    Temp.store[tempPath] = purge;
    const disposer = () => delete Temp.store[tempPath];
    return [tempPath, disposer];
  },
  purge: (filePath) => {
    if (!Temp.store[filePath])
      return;
    delete Temp.store[filePath];
    fs_1$1.default.unlinkAttempt(filePath);
  },
  purgeSync: (filePath) => {
    if (!Temp.store[filePath])
      return;
    delete Temp.store[filePath];
    fs_1$1.default.unlinkSyncAttempt(filePath);
  },
  purgeSyncAll: () => {
    for (const filePath in Temp.store) {
      Temp.purgeSync(filePath);
    }
  },
  truncate: (filePath) => {
    const basename = path$2.basename(filePath);
    if (basename.length <= consts_1$1.LIMIT_BASENAME_LENGTH)
      return filePath;
    const truncable = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(basename);
    if (!truncable)
      return filePath;
    const truncationLength = basename.length - consts_1$1.LIMIT_BASENAME_LENGTH;
    return `${filePath.slice(0, -basename.length)}${truncable[1]}${truncable[2].slice(0, -truncationLength)}${truncable[3]}`;
  }
};
process.on("exit", Temp.purgeSyncAll);
temp.default = Temp;
Object.defineProperty(dist$1, "__esModule", { value: true });
dist$1.writeFileSync = dist$1.writeFile = dist$1.readFileSync = dist$1.readFile = void 0;
const path$1 = require$$0__default;
const consts_1 = consts;
const fs_1 = fs$1;
const lang_1 = lang;
const scheduler_1 = scheduler;
const temp_1 = temp;
function readFile(filePath, options = consts_1.DEFAULT_READ_OPTIONS) {
  var _a;
  if (lang_1.default.isString(options))
    return readFile(filePath, { encoding: options });
  const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_ASYNC);
  return fs_1.default.readFileRetry(timeout)(filePath, options);
}
dist$1.readFile = readFile;
function readFileSync(filePath, options = consts_1.DEFAULT_READ_OPTIONS) {
  var _a;
  if (lang_1.default.isString(options))
    return readFileSync(filePath, { encoding: options });
  const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_SYNC);
  return fs_1.default.readFileSyncRetry(timeout)(filePath, options);
}
dist$1.readFileSync = readFileSync;
const writeFile = (filePath, data, options, callback) => {
  if (lang_1.default.isFunction(options))
    return writeFile(filePath, data, consts_1.DEFAULT_WRITE_OPTIONS, options);
  const promise = writeFileAsync(filePath, data, options);
  if (callback)
    promise.then(callback, callback);
  return promise;
};
dist$1.writeFile = writeFile;
const writeFileAsync = async (filePath, data, options = consts_1.DEFAULT_WRITE_OPTIONS) => {
  var _a;
  if (lang_1.default.isString(options))
    return writeFileAsync(filePath, data, { encoding: options });
  const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_ASYNC);
  let schedulerCustomDisposer = null, schedulerDisposer = null, tempDisposer = null, tempPath = null, fd = null;
  try {
    if (options.schedule)
      schedulerCustomDisposer = await options.schedule(filePath);
    schedulerDisposer = await scheduler_1.default.schedule(filePath);
    filePath = await fs_1.default.realpathAttempt(filePath) || filePath;
    [tempPath, tempDisposer] = temp_1.default.get(filePath, options.tmpCreate || temp_1.default.create, !(options.tmpPurge === false));
    const useStatChown = consts_1.IS_POSIX && lang_1.default.isUndefined(options.chown), useStatMode = lang_1.default.isUndefined(options.mode);
    if (useStatChown || useStatMode) {
      const stat = await fs_1.default.statAttempt(filePath);
      if (stat) {
        options = { ...options };
        if (useStatChown)
          options.chown = { uid: stat.uid, gid: stat.gid };
        if (useStatMode)
          options.mode = stat.mode;
      }
    }
    const parentPath = path$1.dirname(filePath);
    await fs_1.default.mkdirAttempt(parentPath, {
      mode: consts_1.DEFAULT_FOLDER_MODE,
      recursive: true
    });
    fd = await fs_1.default.openRetry(timeout)(tempPath, "w", options.mode || consts_1.DEFAULT_FILE_MODE);
    if (options.tmpCreated)
      options.tmpCreated(tempPath);
    if (lang_1.default.isString(data)) {
      await fs_1.default.writeRetry(timeout)(fd, data, 0, options.encoding || consts_1.DEFAULT_ENCODING);
    } else if (!lang_1.default.isUndefined(data)) {
      await fs_1.default.writeRetry(timeout)(fd, data, 0, data.length, 0);
    }
    if (options.fsync !== false) {
      if (options.fsyncWait !== false) {
        await fs_1.default.fsyncRetry(timeout)(fd);
      } else {
        fs_1.default.fsyncAttempt(fd);
      }
    }
    await fs_1.default.closeRetry(timeout)(fd);
    fd = null;
    if (options.chown)
      await fs_1.default.chownAttempt(tempPath, options.chown.uid, options.chown.gid);
    if (options.mode)
      await fs_1.default.chmodAttempt(tempPath, options.mode);
    try {
      await fs_1.default.renameRetry(timeout)(tempPath, filePath);
    } catch (error2) {
      if (error2.code !== "ENAMETOOLONG")
        throw error2;
      await fs_1.default.renameRetry(timeout)(tempPath, temp_1.default.truncate(filePath));
    }
    tempDisposer();
    tempPath = null;
  } finally {
    if (fd)
      await fs_1.default.closeAttempt(fd);
    if (tempPath)
      temp_1.default.purge(tempPath);
    if (schedulerCustomDisposer)
      schedulerCustomDisposer();
    if (schedulerDisposer)
      schedulerDisposer();
  }
};
const writeFileSync = (filePath, data, options = consts_1.DEFAULT_WRITE_OPTIONS) => {
  var _a;
  if (lang_1.default.isString(options))
    return writeFileSync(filePath, data, { encoding: options });
  const timeout = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_SYNC);
  let tempDisposer = null, tempPath = null, fd = null;
  try {
    filePath = fs_1.default.realpathSyncAttempt(filePath) || filePath;
    [tempPath, tempDisposer] = temp_1.default.get(filePath, options.tmpCreate || temp_1.default.create, !(options.tmpPurge === false));
    const useStatChown = consts_1.IS_POSIX && lang_1.default.isUndefined(options.chown), useStatMode = lang_1.default.isUndefined(options.mode);
    if (useStatChown || useStatMode) {
      const stat = fs_1.default.statSyncAttempt(filePath);
      if (stat) {
        options = { ...options };
        if (useStatChown)
          options.chown = { uid: stat.uid, gid: stat.gid };
        if (useStatMode)
          options.mode = stat.mode;
      }
    }
    const parentPath = path$1.dirname(filePath);
    fs_1.default.mkdirSyncAttempt(parentPath, {
      mode: consts_1.DEFAULT_FOLDER_MODE,
      recursive: true
    });
    fd = fs_1.default.openSyncRetry(timeout)(tempPath, "w", options.mode || consts_1.DEFAULT_FILE_MODE);
    if (options.tmpCreated)
      options.tmpCreated(tempPath);
    if (lang_1.default.isString(data)) {
      fs_1.default.writeSyncRetry(timeout)(fd, data, 0, options.encoding || consts_1.DEFAULT_ENCODING);
    } else if (!lang_1.default.isUndefined(data)) {
      fs_1.default.writeSyncRetry(timeout)(fd, data, 0, data.length, 0);
    }
    if (options.fsync !== false) {
      if (options.fsyncWait !== false) {
        fs_1.default.fsyncSyncRetry(timeout)(fd);
      } else {
        fs_1.default.fsyncAttempt(fd);
      }
    }
    fs_1.default.closeSyncRetry(timeout)(fd);
    fd = null;
    if (options.chown)
      fs_1.default.chownSyncAttempt(tempPath, options.chown.uid, options.chown.gid);
    if (options.mode)
      fs_1.default.chmodSyncAttempt(tempPath, options.mode);
    try {
      fs_1.default.renameSyncRetry(timeout)(tempPath, filePath);
    } catch (error2) {
      if (error2.code !== "ENAMETOOLONG")
        throw error2;
      fs_1.default.renameSyncRetry(timeout)(tempPath, temp_1.default.truncate(filePath));
    }
    tempDisposer();
    tempPath = null;
  } finally {
    if (fd)
      fs_1.default.closeSyncAttempt(fd);
    if (tempPath)
      temp_1.default.purge(tempPath);
  }
};
dist$1.writeFileSync = writeFileSync;
var ajv$1 = { exports: {} };
var core$5 = {};
var validate$1 = {};
var boolSchema$1 = {};
var errors$1 = {};
var codegen$1 = {};
var code$4 = {};
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.regexpCode = exports$1.getEsmExportName = exports$1.getProperty = exports$1.safeStringify = exports$1.stringify = exports$1.strConcat = exports$1.addCodeArg = exports$1.str = exports$1._ = exports$1.nil = exports$1._Code = exports$1.Name = exports$1.IDENTIFIER = exports$1._CodeOrName = void 0;
  class _CodeOrName {
  }
  exports$1._CodeOrName = _CodeOrName;
  exports$1.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class Name extends _CodeOrName {
    constructor(s) {
      super();
      if (!exports$1.IDENTIFIER.test(s))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = s;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return false;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  exports$1.Name = Name;
  class _Code extends _CodeOrName {
    constructor(code2) {
      super();
      this._items = typeof code2 === "string" ? [code2] : code2;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return false;
      const item = this._items[0];
      return item === "" || item === '""';
    }
    get str() {
      var _a;
      return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
    }
    get names() {
      var _a;
      return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names2, c) => {
        if (c instanceof Name)
          names2[c.str] = (names2[c.str] || 0) + 1;
        return names2;
      }, {});
    }
  }
  exports$1._Code = _Code;
  exports$1.nil = new _Code("");
  function _(strs, ...args) {
    const code2 = [strs[0]];
    let i = 0;
    while (i < args.length) {
      addCodeArg(code2, args[i]);
      code2.push(strs[++i]);
    }
    return new _Code(code2);
  }
  exports$1._ = _;
  const plus = new _Code("+");
  function str(strs, ...args) {
    const expr = [safeStringify(strs[0])];
    let i = 0;
    while (i < args.length) {
      expr.push(plus);
      addCodeArg(expr, args[i]);
      expr.push(plus, safeStringify(strs[++i]));
    }
    optimize(expr);
    return new _Code(expr);
  }
  exports$1.str = str;
  function addCodeArg(code2, arg) {
    if (arg instanceof _Code)
      code2.push(...arg._items);
    else if (arg instanceof Name)
      code2.push(arg);
    else
      code2.push(interpolate(arg));
  }
  exports$1.addCodeArg = addCodeArg;
  function optimize(expr) {
    let i = 1;
    while (i < expr.length - 1) {
      if (expr[i] === plus) {
        const res = mergeExprItems(expr[i - 1], expr[i + 1]);
        if (res !== void 0) {
          expr.splice(i - 1, 3, res);
          continue;
        }
        expr[i++] = "+";
      }
      i++;
    }
  }
  function mergeExprItems(a, b) {
    if (b === '""')
      return a;
    if (a === '""')
      return b;
    if (typeof a == "string") {
      if (b instanceof Name || a[a.length - 1] !== '"')
        return;
      if (typeof b != "string")
        return `${a.slice(0, -1)}${b}"`;
      if (b[0] === '"')
        return a.slice(0, -1) + b.slice(1);
      return;
    }
    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
      return `"${a}${b.slice(1)}`;
    return;
  }
  function strConcat(c1, c2) {
    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
  }
  exports$1.strConcat = strConcat;
  function interpolate(x) {
    return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
  }
  function stringify(x) {
    return new _Code(safeStringify(x));
  }
  exports$1.stringify = stringify;
  function safeStringify(x) {
    return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  exports$1.safeStringify = safeStringify;
  function getProperty(key) {
    return typeof key == "string" && exports$1.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
  }
  exports$1.getProperty = getProperty;
  function getEsmExportName(key) {
    if (typeof key == "string" && exports$1.IDENTIFIER.test(key)) {
      return new _Code(`${key}`);
    }
    throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
  }
  exports$1.getEsmExportName = getEsmExportName;
  function regexpCode(rx) {
    return new _Code(rx.toString());
  }
  exports$1.regexpCode = regexpCode;
})(code$4);
var scope$1 = {};
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.ValueScope = exports$1.ValueScopeName = exports$1.Scope = exports$1.varKinds = exports$1.UsedValueState = void 0;
  const code_12 = code$4;
  class ValueError extends Error {
    constructor(name) {
      super(`CodeGen: "code" for ${name} not defined`);
      this.value = name.value;
    }
  }
  var UsedValueState;
  (function(UsedValueState2) {
    UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
    UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
  })(UsedValueState || (exports$1.UsedValueState = UsedValueState = {}));
  exports$1.varKinds = {
    const: new code_12.Name("const"),
    let: new code_12.Name("let"),
    var: new code_12.Name("var")
  };
  class Scope {
    constructor({ prefixes, parent } = {}) {
      this._names = {};
      this._prefixes = prefixes;
      this._parent = parent;
    }
    toName(nameOrPrefix) {
      return nameOrPrefix instanceof code_12.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
      return new code_12.Name(this._newName(prefix));
    }
    _newName(prefix) {
      const ng = this._names[prefix] || this._nameGroup(prefix);
      return `${prefix}${ng.index++}`;
    }
    _nameGroup(prefix) {
      var _a, _b;
      if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
        throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
      }
      return this._names[prefix] = { prefix, index: 0 };
    }
  }
  exports$1.Scope = Scope;
  class ValueScopeName extends code_12.Name {
    constructor(prefix, nameStr) {
      super(nameStr);
      this.prefix = prefix;
    }
    setValue(value, { property, itemIndex }) {
      this.value = value;
      this.scopePath = (0, code_12._)`.${new code_12.Name(property)}[${itemIndex}]`;
    }
  }
  exports$1.ValueScopeName = ValueScopeName;
  const line = (0, code_12._)`\n`;
  class ValueScope extends Scope {
    constructor(opts) {
      super(opts);
      this._values = {};
      this._scope = opts.scope;
      this.opts = { ...opts, _n: opts.lines ? line : code_12.nil };
    }
    get() {
      return this._scope;
    }
    name(prefix) {
      return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
      var _a;
      if (value.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const name = this.toName(nameOrPrefix);
      const { prefix } = name;
      const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
      let vs = this._values[prefix];
      if (vs) {
        const _name = vs.get(valueKey);
        if (_name)
          return _name;
      } else {
        vs = this._values[prefix] = /* @__PURE__ */ new Map();
      }
      vs.set(valueKey, name);
      const s = this._scope[prefix] || (this._scope[prefix] = []);
      const itemIndex = s.length;
      s[itemIndex] = value.ref;
      name.setValue(value, { property: prefix, itemIndex });
      return name;
    }
    getValue(prefix, keyOrRef) {
      const vs = this._values[prefix];
      if (!vs)
        return;
      return vs.get(keyOrRef);
    }
    scopeRefs(scopeName, values = this._values) {
      return this._reduceValues(values, (name) => {
        if (name.scopePath === void 0)
          throw new Error(`CodeGen: name "${name}" has no value`);
        return (0, code_12._)`${scopeName}${name.scopePath}`;
      });
    }
    scopeCode(values = this._values, usedValues, getCode) {
      return this._reduceValues(values, (name) => {
        if (name.value === void 0)
          throw new Error(`CodeGen: name "${name}" has no value`);
        return name.value.code;
      }, usedValues, getCode);
    }
    _reduceValues(values, valueCode, usedValues = {}, getCode) {
      let code2 = code_12.nil;
      for (const prefix in values) {
        const vs = values[prefix];
        if (!vs)
          continue;
        const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
        vs.forEach((name) => {
          if (nameSet.has(name))
            return;
          nameSet.set(name, UsedValueState.Started);
          let c = valueCode(name);
          if (c) {
            const def2 = this.opts.es5 ? exports$1.varKinds.var : exports$1.varKinds.const;
            code2 = (0, code_12._)`${code2}${def2} ${name} = ${c};${this.opts._n}`;
          } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
            code2 = (0, code_12._)`${code2}${c}${this.opts._n}`;
          } else {
            throw new ValueError(name);
          }
          nameSet.set(name, UsedValueState.Completed);
        });
      }
      return code2;
    }
  }
  exports$1.ValueScope = ValueScope;
})(scope$1);
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.or = exports$1.and = exports$1.not = exports$1.CodeGen = exports$1.operators = exports$1.varKinds = exports$1.ValueScopeName = exports$1.ValueScope = exports$1.Scope = exports$1.Name = exports$1.regexpCode = exports$1.stringify = exports$1.getProperty = exports$1.nil = exports$1.strConcat = exports$1.str = exports$1._ = void 0;
  const code_12 = code$4;
  const scope_1 = scope$1;
  var code_2 = code$4;
  Object.defineProperty(exports$1, "_", { enumerable: true, get: function() {
    return code_2._;
  } });
  Object.defineProperty(exports$1, "str", { enumerable: true, get: function() {
    return code_2.str;
  } });
  Object.defineProperty(exports$1, "strConcat", { enumerable: true, get: function() {
    return code_2.strConcat;
  } });
  Object.defineProperty(exports$1, "nil", { enumerable: true, get: function() {
    return code_2.nil;
  } });
  Object.defineProperty(exports$1, "getProperty", { enumerable: true, get: function() {
    return code_2.getProperty;
  } });
  Object.defineProperty(exports$1, "stringify", { enumerable: true, get: function() {
    return code_2.stringify;
  } });
  Object.defineProperty(exports$1, "regexpCode", { enumerable: true, get: function() {
    return code_2.regexpCode;
  } });
  Object.defineProperty(exports$1, "Name", { enumerable: true, get: function() {
    return code_2.Name;
  } });
  var scope_2 = scope$1;
  Object.defineProperty(exports$1, "Scope", { enumerable: true, get: function() {
    return scope_2.Scope;
  } });
  Object.defineProperty(exports$1, "ValueScope", { enumerable: true, get: function() {
    return scope_2.ValueScope;
  } });
  Object.defineProperty(exports$1, "ValueScopeName", { enumerable: true, get: function() {
    return scope_2.ValueScopeName;
  } });
  Object.defineProperty(exports$1, "varKinds", { enumerable: true, get: function() {
    return scope_2.varKinds;
  } });
  exports$1.operators = {
    GT: new code_12._Code(">"),
    GTE: new code_12._Code(">="),
    LT: new code_12._Code("<"),
    LTE: new code_12._Code("<="),
    EQ: new code_12._Code("==="),
    NEQ: new code_12._Code("!=="),
    NOT: new code_12._Code("!"),
    OR: new code_12._Code("||"),
    AND: new code_12._Code("&&"),
    ADD: new code_12._Code("+")
  };
  class Node2 {
    optimizeNodes() {
      return this;
    }
    optimizeNames(_names, _constants) {
      return this;
    }
  }
  class Def extends Node2 {
    constructor(varKind, name, rhs) {
      super();
      this.varKind = varKind;
      this.name = name;
      this.rhs = rhs;
    }
    render({ es5, _n }) {
      const varKind = es5 ? scope_1.varKinds.var : this.varKind;
      const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${varKind} ${this.name}${rhs};` + _n;
    }
    optimizeNames(names2, constants2) {
      if (!names2[this.name.str])
        return;
      if (this.rhs)
        this.rhs = optimizeExpr(this.rhs, names2, constants2);
      return this;
    }
    get names() {
      return this.rhs instanceof code_12._CodeOrName ? this.rhs.names : {};
    }
  }
  class Assign extends Node2 {
    constructor(lhs, rhs, sideEffects) {
      super();
      this.lhs = lhs;
      this.rhs = rhs;
      this.sideEffects = sideEffects;
    }
    render({ _n }) {
      return `${this.lhs} = ${this.rhs};` + _n;
    }
    optimizeNames(names2, constants2) {
      if (this.lhs instanceof code_12.Name && !names2[this.lhs.str] && !this.sideEffects)
        return;
      this.rhs = optimizeExpr(this.rhs, names2, constants2);
      return this;
    }
    get names() {
      const names2 = this.lhs instanceof code_12.Name ? {} : { ...this.lhs.names };
      return addExprNames(names2, this.rhs);
    }
  }
  class AssignOp extends Assign {
    constructor(lhs, op, rhs, sideEffects) {
      super(lhs, rhs, sideEffects);
      this.op = op;
    }
    render({ _n }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
    }
  }
  class Label extends Node2 {
    constructor(label) {
      super();
      this.label = label;
      this.names = {};
    }
    render({ _n }) {
      return `${this.label}:` + _n;
    }
  }
  class Break extends Node2 {
    constructor(label) {
      super();
      this.label = label;
      this.names = {};
    }
    render({ _n }) {
      const label = this.label ? ` ${this.label}` : "";
      return `break${label};` + _n;
    }
  }
  class Throw extends Node2 {
    constructor(error2) {
      super();
      this.error = error2;
    }
    render({ _n }) {
      return `throw ${this.error};` + _n;
    }
    get names() {
      return this.error.names;
    }
  }
  class AnyCode extends Node2 {
    constructor(code2) {
      super();
      this.code = code2;
    }
    render({ _n }) {
      return `${this.code};` + _n;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(names2, constants2) {
      this.code = optimizeExpr(this.code, names2, constants2);
      return this;
    }
    get names() {
      return this.code instanceof code_12._CodeOrName ? this.code.names : {};
    }
  }
  class ParentNode extends Node2 {
    constructor(nodes = []) {
      super();
      this.nodes = nodes;
    }
    render(opts) {
      return this.nodes.reduce((code2, n) => code2 + n.render(opts), "");
    }
    optimizeNodes() {
      const { nodes } = this;
      let i = nodes.length;
      while (i--) {
        const n = nodes[i].optimizeNodes();
        if (Array.isArray(n))
          nodes.splice(i, 1, ...n);
        else if (n)
          nodes[i] = n;
        else
          nodes.splice(i, 1);
      }
      return nodes.length > 0 ? this : void 0;
    }
    optimizeNames(names2, constants2) {
      const { nodes } = this;
      let i = nodes.length;
      while (i--) {
        const n = nodes[i];
        if (n.optimizeNames(names2, constants2))
          continue;
        subtractNames(names2, n.names);
        nodes.splice(i, 1);
      }
      return nodes.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((names2, n) => addNames(names2, n.names), {});
    }
  }
  class BlockNode extends ParentNode {
    render(opts) {
      return "{" + opts._n + super.render(opts) + "}" + opts._n;
    }
  }
  class Root extends ParentNode {
  }
  class Else extends BlockNode {
  }
  Else.kind = "else";
  class If extends BlockNode {
    constructor(condition, nodes) {
      super(nodes);
      this.condition = condition;
    }
    render(opts) {
      let code2 = `if(${this.condition})` + super.render(opts);
      if (this.else)
        code2 += "else " + this.else.render(opts);
      return code2;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const cond = this.condition;
      if (cond === true)
        return this.nodes;
      let e = this.else;
      if (e) {
        const ns = e.optimizeNodes();
        e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
      }
      if (e) {
        if (cond === false)
          return e instanceof If ? e : e.nodes;
        if (this.nodes.length)
          return this;
        return new If(not2(cond), e instanceof If ? [e] : e.nodes);
      }
      if (cond === false || !this.nodes.length)
        return void 0;
      return this;
    }
    optimizeNames(names2, constants2) {
      var _a;
      this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
      if (!(super.optimizeNames(names2, constants2) || this.else))
        return;
      this.condition = optimizeExpr(this.condition, names2, constants2);
      return this;
    }
    get names() {
      const names2 = super.names;
      addExprNames(names2, this.condition);
      if (this.else)
        addNames(names2, this.else.names);
      return names2;
    }
  }
  If.kind = "if";
  class For extends BlockNode {
  }
  For.kind = "for";
  class ForLoop extends For {
    constructor(iteration) {
      super();
      this.iteration = iteration;
    }
    render(opts) {
      return `for(${this.iteration})` + super.render(opts);
    }
    optimizeNames(names2, constants2) {
      if (!super.optimizeNames(names2, constants2))
        return;
      this.iteration = optimizeExpr(this.iteration, names2, constants2);
      return this;
    }
    get names() {
      return addNames(super.names, this.iteration.names);
    }
  }
  class ForRange extends For {
    constructor(varKind, name, from, to) {
      super();
      this.varKind = varKind;
      this.name = name;
      this.from = from;
      this.to = to;
    }
    render(opts) {
      const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
      const { name, from, to } = this;
      return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
    }
    get names() {
      const names2 = addExprNames(super.names, this.from);
      return addExprNames(names2, this.to);
    }
  }
  class ForIter extends For {
    constructor(loop, varKind, name, iterable) {
      super();
      this.loop = loop;
      this.varKind = varKind;
      this.name = name;
      this.iterable = iterable;
    }
    render(opts) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
    }
    optimizeNames(names2, constants2) {
      if (!super.optimizeNames(names2, constants2))
        return;
      this.iterable = optimizeExpr(this.iterable, names2, constants2);
      return this;
    }
    get names() {
      return addNames(super.names, this.iterable.names);
    }
  }
  class Func extends BlockNode {
    constructor(name, args, async) {
      super();
      this.name = name;
      this.args = args;
      this.async = async;
    }
    render(opts) {
      const _async = this.async ? "async " : "";
      return `${_async}function ${this.name}(${this.args})` + super.render(opts);
    }
  }
  Func.kind = "func";
  class Return extends ParentNode {
    render(opts) {
      return "return " + super.render(opts);
    }
  }
  Return.kind = "return";
  class Try extends BlockNode {
    render(opts) {
      let code2 = "try" + super.render(opts);
      if (this.catch)
        code2 += this.catch.render(opts);
      if (this.finally)
        code2 += this.finally.render(opts);
      return code2;
    }
    optimizeNodes() {
      var _a, _b;
      super.optimizeNodes();
      (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
      (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
      return this;
    }
    optimizeNames(names2, constants2) {
      var _a, _b;
      super.optimizeNames(names2, constants2);
      (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
      (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names2, constants2);
      return this;
    }
    get names() {
      const names2 = super.names;
      if (this.catch)
        addNames(names2, this.catch.names);
      if (this.finally)
        addNames(names2, this.finally.names);
      return names2;
    }
  }
  class Catch extends BlockNode {
    constructor(error2) {
      super();
      this.error = error2;
    }
    render(opts) {
      return `catch(${this.error})` + super.render(opts);
    }
  }
  Catch.kind = "catch";
  class Finally extends BlockNode {
    render(opts) {
      return "finally" + super.render(opts);
    }
  }
  Finally.kind = "finally";
  class CodeGen {
    constructor(extScope, opts = {}) {
      this._values = {};
      this._blockStarts = [];
      this._constants = {};
      this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
      this._extScope = extScope;
      this._scope = new scope_1.Scope({ parent: extScope });
      this._nodes = [new Root()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(prefix) {
      return this._scope.name(prefix);
    }
    // reserves unique name in the external scope
    scopeName(prefix) {
      return this._extScope.name(prefix);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(prefixOrName, value) {
      const name = this._extScope.value(prefixOrName, value);
      const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
      vs.add(name);
      return name;
    }
    getScopeValue(prefix, keyOrRef) {
      return this._extScope.getValue(prefix, keyOrRef);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(scopeName) {
      return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
      const name = this._scope.toName(nameOrPrefix);
      if (rhs !== void 0 && constant)
        this._constants[name.str] = rhs;
      this._leafNode(new Def(varKind, name, rhs));
      return name;
    }
    // `const` declaration (`var` in es5 mode)
    const(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    // `var` declaration with optional assignment
    var(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    // assignment code
    assign(lhs, rhs, sideEffects) {
      return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    // `+=` code
    add(lhs, rhs) {
      return this._leafNode(new AssignOp(lhs, exports$1.operators.ADD, rhs));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
      if (typeof c == "function")
        c();
      else if (c !== code_12.nil)
        this._leafNode(new AnyCode(c));
      return this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...keyValues) {
      const code2 = ["{"];
      for (const [key, value] of keyValues) {
        if (code2.length > 1)
          code2.push(",");
        code2.push(key);
        if (key !== value || this.opts.es5) {
          code2.push(":");
          (0, code_12.addCodeArg)(code2, value);
        }
      }
      code2.push("}");
      return new code_12._Code(code2);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(condition, thenBody, elseBody) {
      this._blockNode(new If(condition));
      if (thenBody && elseBody) {
        this.code(thenBody).else().code(elseBody).endIf();
      } else if (thenBody) {
        this.code(thenBody).endIf();
      } else if (elseBody) {
        throw new Error('CodeGen: "else" body without "then" body');
      }
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(condition) {
      return this._elseNode(new If(condition));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new Else());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
      this._blockNode(node);
      if (forBody)
        this.code(forBody).endFor();
      return this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(iteration, forBody) {
      return this._for(new ForLoop(iteration), forBody);
    }
    // `for` statement for a range of values
    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
      const name = this._scope.toName(nameOrPrefix);
      return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
      const name = this._scope.toName(nameOrPrefix);
      if (this.opts.es5) {
        const arr = iterable instanceof code_12.Name ? iterable : this.var("_arr", iterable);
        return this.forRange("_i", 0, (0, code_12._)`${arr}.length`, (i) => {
          this.var(name, (0, code_12._)`${arr}[${i}]`);
          forBody(name);
        });
      }
      return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
      if (this.opts.ownProperties) {
        return this.forOf(nameOrPrefix, (0, code_12._)`Object.keys(${obj})`, forBody);
      }
      const name = this._scope.toName(nameOrPrefix);
      return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(For);
    }
    // `label` statement
    label(label) {
      return this._leafNode(new Label(label));
    }
    // `break` statement
    break(label) {
      return this._leafNode(new Break(label));
    }
    // `return` statement
    return(value) {
      const node = new Return();
      this._blockNode(node);
      this.code(value);
      if (node.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Return);
    }
    // `try` statement
    try(tryBody, catchCode, finallyCode) {
      if (!catchCode && !finallyCode)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const node = new Try();
      this._blockNode(node);
      this.code(tryBody);
      if (catchCode) {
        const error2 = this.name("e");
        this._currNode = node.catch = new Catch(error2);
        catchCode(error2);
      }
      if (finallyCode) {
        this._currNode = node.finally = new Finally();
        this.code(finallyCode);
      }
      return this._endBlockNode(Catch, Finally);
    }
    // `throw` statement
    throw(error2) {
      return this._leafNode(new Throw(error2));
    }
    // start self-balancing block
    block(body, nodeCount) {
      this._blockStarts.push(this._nodes.length);
      if (body)
        this.code(body).endBlock(nodeCount);
      return this;
    }
    // end the current self-balancing block
    endBlock(nodeCount) {
      const len = this._blockStarts.pop();
      if (len === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const toClose = this._nodes.length - len;
      if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
        throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
      }
      this._nodes.length = len;
      return this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(name, args = code_12.nil, async, funcBody) {
      this._blockNode(new Func(name, args, async));
      if (funcBody)
        this.code(funcBody).endFunc();
      return this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(Func);
    }
    optimize(n = 1) {
      while (n-- > 0) {
        this._root.optimizeNodes();
        this._root.optimizeNames(this._root.names, this._constants);
      }
    }
    _leafNode(node) {
      this._currNode.nodes.push(node);
      return this;
    }
    _blockNode(node) {
      this._currNode.nodes.push(node);
      this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
      const n = this._currNode;
      if (n instanceof N1 || N2 && n instanceof N2) {
        this._nodes.pop();
        return this;
      }
      throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
    }
    _elseNode(node) {
      const n = this._currNode;
      if (!(n instanceof If)) {
        throw new Error('CodeGen: "else" without "if"');
      }
      this._currNode = n.else = node;
      return this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const ns = this._nodes;
      return ns[ns.length - 1];
    }
    set _currNode(node) {
      const ns = this._nodes;
      ns[ns.length - 1] = node;
    }
  }
  exports$1.CodeGen = CodeGen;
  function addNames(names2, from) {
    for (const n in from)
      names2[n] = (names2[n] || 0) + (from[n] || 0);
    return names2;
  }
  function addExprNames(names2, from) {
    return from instanceof code_12._CodeOrName ? addNames(names2, from.names) : names2;
  }
  function optimizeExpr(expr, names2, constants2) {
    if (expr instanceof code_12.Name)
      return replaceName(expr);
    if (!canOptimize(expr))
      return expr;
    return new code_12._Code(expr._items.reduce((items2, c) => {
      if (c instanceof code_12.Name)
        c = replaceName(c);
      if (c instanceof code_12._Code)
        items2.push(...c._items);
      else
        items2.push(c);
      return items2;
    }, []));
    function replaceName(n) {
      const c = constants2[n.str];
      if (c === void 0 || names2[n.str] !== 1)
        return n;
      delete names2[n.str];
      return c;
    }
    function canOptimize(e) {
      return e instanceof code_12._Code && e._items.some((c) => c instanceof code_12.Name && names2[c.str] === 1 && constants2[c.str] !== void 0);
    }
  }
  function subtractNames(names2, from) {
    for (const n in from)
      names2[n] = (names2[n] || 0) - (from[n] || 0);
  }
  function not2(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_12._)`!${par(x)}`;
  }
  exports$1.not = not2;
  const andCode = mappend(exports$1.operators.AND);
  function and(...args) {
    return args.reduce(andCode);
  }
  exports$1.and = and;
  const orCode = mappend(exports$1.operators.OR);
  function or(...args) {
    return args.reduce(orCode);
  }
  exports$1.or = or;
  function mappend(op) {
    return (x, y) => x === code_12.nil ? y : y === code_12.nil ? x : (0, code_12._)`${par(x)} ${op} ${par(y)}`;
  }
  function par(x) {
    return x instanceof code_12.Name ? x : (0, code_12._)`(${x})`;
  }
})(codegen$1);
var util$1 = {};
Object.defineProperty(util$1, "__esModule", { value: true });
util$1.checkStrictMode = util$1.getErrorPath = util$1.Type = util$1.useFunc = util$1.setEvaluated = util$1.evaluatedPropsToName = util$1.mergeEvaluated = util$1.eachItem = util$1.unescapeJsonPointer = util$1.escapeJsonPointer = util$1.escapeFragment = util$1.unescapeFragment = util$1.schemaRefOrVal = util$1.schemaHasRulesButRef = util$1.schemaHasRules = util$1.checkUnknownRules = util$1.alwaysValidSchema = util$1.toHash = void 0;
const codegen_1$$ = codegen$1;
const code_1$l = code$4;
function toHash$1(arr) {
  const hash = {};
  for (const item of arr)
    hash[item] = true;
  return hash;
}
util$1.toHash = toHash$1;
function alwaysValidSchema$1(it, schema) {
  if (typeof schema == "boolean")
    return schema;
  if (Object.keys(schema).length === 0)
    return true;
  checkUnknownRules$1(it, schema);
  return !schemaHasRules$1(schema, it.self.RULES.all);
}
util$1.alwaysValidSchema = alwaysValidSchema$1;
function checkUnknownRules$1(it, schema = it.schema) {
  const { opts, self: self2 } = it;
  if (!opts.strictSchema)
    return;
  if (typeof schema === "boolean")
    return;
  const rules2 = self2.RULES.keywords;
  for (const key in schema) {
    if (!rules2[key])
      checkStrictMode$1(it, `unknown keyword: "${key}"`);
  }
}
util$1.checkUnknownRules = checkUnknownRules$1;
function schemaHasRules$1(schema, rules2) {
  if (typeof schema == "boolean")
    return !schema;
  for (const key in schema)
    if (rules2[key])
      return true;
  return false;
}
util$1.schemaHasRules = schemaHasRules$1;
function schemaHasRulesButRef$1(schema, RULES) {
  if (typeof schema == "boolean")
    return !schema;
  for (const key in schema)
    if (key !== "$ref" && RULES.all[key])
      return true;
  return false;
}
util$1.schemaHasRulesButRef = schemaHasRulesButRef$1;
function schemaRefOrVal$1({ topSchemaRef, schemaPath }, schema, keyword2, $data) {
  if (!$data) {
    if (typeof schema == "number" || typeof schema == "boolean")
      return schema;
    if (typeof schema == "string")
      return (0, codegen_1$$._)`${schema}`;
  }
  return (0, codegen_1$$._)`${topSchemaRef}${schemaPath}${(0, codegen_1$$.getProperty)(keyword2)}`;
}
util$1.schemaRefOrVal = schemaRefOrVal$1;
function unescapeFragment$1(str) {
  return unescapeJsonPointer$1(decodeURIComponent(str));
}
util$1.unescapeFragment = unescapeFragment$1;
function escapeFragment$1(str) {
  return encodeURIComponent(escapeJsonPointer$1(str));
}
util$1.escapeFragment = escapeFragment$1;
function escapeJsonPointer$1(str) {
  if (typeof str == "number")
    return `${str}`;
  return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
util$1.escapeJsonPointer = escapeJsonPointer$1;
function unescapeJsonPointer$1(str) {
  return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
util$1.unescapeJsonPointer = unescapeJsonPointer$1;
function eachItem$1(xs, f) {
  if (Array.isArray(xs)) {
    for (const x of xs)
      f(x);
  } else {
    f(xs);
  }
}
util$1.eachItem = eachItem$1;
function makeMergeEvaluated$1({ mergeNames, mergeToName, mergeValues, resultToName }) {
  return (gen, from, to, toName) => {
    const res = to === void 0 ? from : to instanceof codegen_1$$.Name ? (from instanceof codegen_1$$.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1$$.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
    return toName === codegen_1$$.Name && !(res instanceof codegen_1$$.Name) ? resultToName(gen, res) : res;
  };
}
util$1.mergeEvaluated = {
  props: makeMergeEvaluated$1({
    mergeNames: (gen, from, to) => gen.if((0, codegen_1$$._)`${to} !== true && ${from} !== undefined`, () => {
      gen.if((0, codegen_1$$._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1$$._)`${to} || {}`).code((0, codegen_1$$._)`Object.assign(${to}, ${from})`));
    }),
    mergeToName: (gen, from, to) => gen.if((0, codegen_1$$._)`${to} !== true`, () => {
      if (from === true) {
        gen.assign(to, true);
      } else {
        gen.assign(to, (0, codegen_1$$._)`${to} || {}`);
        setEvaluated$1(gen, to, from);
      }
    }),
    mergeValues: (from, to) => from === true ? true : { ...from, ...to },
    resultToName: evaluatedPropsToName$1
  }),
  items: makeMergeEvaluated$1({
    mergeNames: (gen, from, to) => gen.if((0, codegen_1$$._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1$$._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
    mergeToName: (gen, from, to) => gen.if((0, codegen_1$$._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1$$._)`${to} > ${from} ? ${to} : ${from}`)),
    mergeValues: (from, to) => from === true ? true : Math.max(from, to),
    resultToName: (gen, items2) => gen.var("items", items2)
  })
};
function evaluatedPropsToName$1(gen, ps) {
  if (ps === true)
    return gen.var("props", true);
  const props = gen.var("props", (0, codegen_1$$._)`{}`);
  if (ps !== void 0)
    setEvaluated$1(gen, props, ps);
  return props;
}
util$1.evaluatedPropsToName = evaluatedPropsToName$1;
function setEvaluated$1(gen, props, ps) {
  Object.keys(ps).forEach((p) => gen.assign((0, codegen_1$$._)`${props}${(0, codegen_1$$.getProperty)(p)}`, true));
}
util$1.setEvaluated = setEvaluated$1;
const snippets$1 = {};
function useFunc$1(gen, f) {
  return gen.scopeValue("func", {
    ref: f,
    code: snippets$1[f.code] || (snippets$1[f.code] = new code_1$l._Code(f.code))
  });
}
util$1.useFunc = useFunc$1;
var Type$1;
(function(Type2) {
  Type2[Type2["Num"] = 0] = "Num";
  Type2[Type2["Str"] = 1] = "Str";
})(Type$1 || (util$1.Type = Type$1 = {}));
function getErrorPath$1(dataProp, dataPropType, jsPropertySyntax) {
  if (dataProp instanceof codegen_1$$.Name) {
    const isNumber = dataPropType === Type$1.Num;
    return jsPropertySyntax ? isNumber ? (0, codegen_1$$._)`"[" + ${dataProp} + "]"` : (0, codegen_1$$._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1$$._)`"/" + ${dataProp}` : (0, codegen_1$$._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return jsPropertySyntax ? (0, codegen_1$$.getProperty)(dataProp).toString() : "/" + escapeJsonPointer$1(dataProp);
}
util$1.getErrorPath = getErrorPath$1;
function checkStrictMode$1(it, msg, mode = it.opts.strictSchema) {
  if (!mode)
    return;
  msg = `strict mode: ${msg}`;
  if (mode === true)
    throw new Error(msg);
  it.self.logger.warn(msg);
}
util$1.checkStrictMode = checkStrictMode$1;
var names$3 = {};
Object.defineProperty(names$3, "__esModule", { value: true });
const codegen_1$_ = codegen$1;
const names$2 = {
  // validation function arguments
  data: new codegen_1$_.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new codegen_1$_.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new codegen_1$_.Name("instancePath"),
  parentData: new codegen_1$_.Name("parentData"),
  parentDataProperty: new codegen_1$_.Name("parentDataProperty"),
  rootData: new codegen_1$_.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new codegen_1$_.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new codegen_1$_.Name("vErrors"),
  // null or array of validation errors
  errors: new codegen_1$_.Name("errors"),
  // counter of validation errors
  this: new codegen_1$_.Name("this"),
  // "globals"
  self: new codegen_1$_.Name("self"),
  scope: new codegen_1$_.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new codegen_1$_.Name("json"),
  jsonPos: new codegen_1$_.Name("jsonPos"),
  jsonLen: new codegen_1$_.Name("jsonLen"),
  jsonPart: new codegen_1$_.Name("jsonPart")
};
names$3.default = names$2;
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.extendErrors = exports$1.resetErrorsCount = exports$1.reportExtraError = exports$1.reportError = exports$1.keyword$DataError = exports$1.keywordError = void 0;
  const codegen_12 = codegen$1;
  const util_12 = util$1;
  const names_12 = names$3;
  exports$1.keywordError = {
    message: ({ keyword: keyword2 }) => (0, codegen_12.str)`must pass "${keyword2}" keyword validation`
  };
  exports$1.keyword$DataError = {
    message: ({ keyword: keyword2, schemaType }) => schemaType ? (0, codegen_12.str)`"${keyword2}" keyword must be ${schemaType} ($data)` : (0, codegen_12.str)`"${keyword2}" keyword is invalid ($data)`
  };
  function reportError(cxt, error2 = exports$1.keywordError, errorPaths, overrideAllErrors) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error2, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
      addError(gen, errObj);
    } else {
      returnErrors(it, (0, codegen_12._)`[${errObj}]`);
    }
  }
  exports$1.reportError = reportError;
  function reportExtraError(cxt, error2 = exports$1.keywordError, errorPaths) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error2, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
      returnErrors(it, names_12.default.vErrors);
    }
  }
  exports$1.reportExtraError = reportExtraError;
  function resetErrorsCount(gen, errsCount) {
    gen.assign(names_12.default.errors, errsCount);
    gen.if((0, codegen_12._)`${names_12.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_12._)`${names_12.default.vErrors}.length`, errsCount), () => gen.assign(names_12.default.vErrors, null)));
  }
  exports$1.resetErrorsCount = resetErrorsCount;
  function extendErrors({ gen, keyword: keyword2, schemaValue, data, errsCount, it }) {
    if (errsCount === void 0)
      throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_12.default.errors, (i) => {
      gen.const(err, (0, codegen_12._)`${names_12.default.vErrors}[${i}]`);
      gen.if((0, codegen_12._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_12._)`${err}.instancePath`, (0, codegen_12.strConcat)(names_12.default.instancePath, it.errorPath)));
      gen.assign((0, codegen_12._)`${err}.schemaPath`, (0, codegen_12.str)`${it.errSchemaPath}/${keyword2}`);
      if (it.opts.verbose) {
        gen.assign((0, codegen_12._)`${err}.schema`, schemaValue);
        gen.assign((0, codegen_12._)`${err}.data`, data);
      }
    });
  }
  exports$1.extendErrors = extendErrors;
  function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if((0, codegen_12._)`${names_12.default.vErrors} === null`, () => gen.assign(names_12.default.vErrors, (0, codegen_12._)`[${err}]`), (0, codegen_12._)`${names_12.default.vErrors}.push(${err})`);
    gen.code((0, codegen_12._)`${names_12.default.errors}++`);
  }
  function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
      gen.throw((0, codegen_12._)`new ${it.ValidationError}(${errs})`);
    } else {
      gen.assign((0, codegen_12._)`${validateName}.errors`, errs);
      gen.return(false);
    }
  }
  const E = {
    keyword: new codegen_12.Name("keyword"),
    schemaPath: new codegen_12.Name("schemaPath"),
    // also used in JTD errors
    params: new codegen_12.Name("params"),
    propertyName: new codegen_12.Name("propertyName"),
    message: new codegen_12.Name("message"),
    schema: new codegen_12.Name("schema"),
    parentSchema: new codegen_12.Name("parentSchema")
  };
  function errorObjectCode(cxt, error2, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false)
      return (0, codegen_12._)`{}`;
    return errorObject(cxt, error2, errorPaths);
  }
  function errorObject(cxt, error2, errorPaths = {}) {
    const { gen, it } = cxt;
    const keyValues = [
      errorInstancePath(it, errorPaths),
      errorSchemaPath(cxt, errorPaths)
    ];
    extraErrorProps(cxt, error2, keyValues);
    return gen.object(...keyValues);
  }
  function errorInstancePath({ errorPath }, { instancePath }) {
    const instPath = instancePath ? (0, codegen_12.str)`${errorPath}${(0, util_12.getErrorPath)(instancePath, util_12.Type.Str)}` : errorPath;
    return [names_12.default.instancePath, (0, codegen_12.strConcat)(names_12.default.instancePath, instPath)];
  }
  function errorSchemaPath({ keyword: keyword2, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
    let schPath = parentSchema ? errSchemaPath : (0, codegen_12.str)`${errSchemaPath}/${keyword2}`;
    if (schemaPath) {
      schPath = (0, codegen_12.str)`${schPath}${(0, util_12.getErrorPath)(schemaPath, util_12.Type.Str)}`;
    }
    return [E.schemaPath, schPath];
  }
  function extraErrorProps(cxt, { params, message }, keyValues) {
    const { keyword: keyword2, data, schemaValue, it } = cxt;
    const { opts, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([E.keyword, keyword2], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_12._)`{}`]);
    if (opts.messages) {
      keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
    }
    if (opts.verbose) {
      keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_12._)`${topSchemaRef}${schemaPath}`], [names_12.default.data, data]);
    }
    if (propertyName)
      keyValues.push([E.propertyName, propertyName]);
  }
})(errors$1);
Object.defineProperty(boolSchema$1, "__esModule", { value: true });
boolSchema$1.boolOrEmptySchema = boolSchema$1.topBoolOrEmptySchema = void 0;
const errors_1$7 = errors$1;
const codegen_1$Z = codegen$1;
const names_1$d = names$3;
const boolError$1 = {
  message: "boolean schema is false"
};
function topBoolOrEmptySchema$1(it) {
  const { gen, schema, validateName } = it;
  if (schema === false) {
    falseSchemaError$1(it, false);
  } else if (typeof schema == "object" && schema.$async === true) {
    gen.return(names_1$d.default.data);
  } else {
    gen.assign((0, codegen_1$Z._)`${validateName}.errors`, null);
    gen.return(true);
  }
}
boolSchema$1.topBoolOrEmptySchema = topBoolOrEmptySchema$1;
function boolOrEmptySchema$1(it, valid2) {
  const { gen, schema } = it;
  if (schema === false) {
    gen.var(valid2, false);
    falseSchemaError$1(it);
  } else {
    gen.var(valid2, true);
  }
}
boolSchema$1.boolOrEmptySchema = boolOrEmptySchema$1;
function falseSchemaError$1(it, overrideAllErrors) {
  const { gen, data } = it;
  const cxt = {
    gen,
    keyword: "false schema",
    data,
    schema: false,
    schemaCode: false,
    schemaValue: false,
    params: {},
    it
  };
  (0, errors_1$7.reportError)(cxt, boolError$1, void 0, overrideAllErrors);
}
var dataType$1 = {};
var rules$1 = {};
Object.defineProperty(rules$1, "__esModule", { value: true });
rules$1.getRules = rules$1.isJSONType = void 0;
const _jsonTypes$1 = ["string", "number", "integer", "boolean", "null", "object", "array"];
const jsonTypes$1 = new Set(_jsonTypes$1);
function isJSONType$1(x) {
  return typeof x == "string" && jsonTypes$1.has(x);
}
rules$1.isJSONType = isJSONType$1;
function getRules$1() {
  const groups = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...groups, integer: true, boolean: true, null: true },
    rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
rules$1.getRules = getRules$1;
var applicability$1 = {};
Object.defineProperty(applicability$1, "__esModule", { value: true });
applicability$1.shouldUseRule = applicability$1.shouldUseGroup = applicability$1.schemaHasRulesForType = void 0;
function schemaHasRulesForType$1({ schema, self: self2 }, type2) {
  const group = self2.RULES.types[type2];
  return group && group !== true && shouldUseGroup$1(schema, group);
}
applicability$1.schemaHasRulesForType = schemaHasRulesForType$1;
function shouldUseGroup$1(schema, group) {
  return group.rules.some((rule) => shouldUseRule$1(schema, rule));
}
applicability$1.shouldUseGroup = shouldUseGroup$1;
function shouldUseRule$1(schema, rule) {
  var _a;
  return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
}
applicability$1.shouldUseRule = shouldUseRule$1;
Object.defineProperty(dataType$1, "__esModule", { value: true });
dataType$1.reportTypeError = dataType$1.checkDataTypes = dataType$1.checkDataType = dataType$1.coerceAndCheckDataType = dataType$1.getJSONTypes = dataType$1.getSchemaTypes = dataType$1.DataType = void 0;
const rules_1$1 = rules$1;
const applicability_1$3 = applicability$1;
const errors_1$6 = errors$1;
const codegen_1$Y = codegen$1;
const util_1$R = util$1;
var DataType$1;
(function(DataType2) {
  DataType2[DataType2["Correct"] = 0] = "Correct";
  DataType2[DataType2["Wrong"] = 1] = "Wrong";
})(DataType$1 || (dataType$1.DataType = DataType$1 = {}));
function getSchemaTypes$1(schema) {
  const types2 = getJSONTypes$1(schema.type);
  const hasNull = types2.includes("null");
  if (hasNull) {
    if (schema.nullable === false)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!types2.length && schema.nullable !== void 0) {
      throw new Error('"nullable" cannot be used without "type"');
    }
    if (schema.nullable === true)
      types2.push("null");
  }
  return types2;
}
dataType$1.getSchemaTypes = getSchemaTypes$1;
function getJSONTypes$1(ts) {
  const types2 = Array.isArray(ts) ? ts : ts ? [ts] : [];
  if (types2.every(rules_1$1.isJSONType))
    return types2;
  throw new Error("type must be JSONType or JSONType[]: " + types2.join(","));
}
dataType$1.getJSONTypes = getJSONTypes$1;
function coerceAndCheckDataType$1(it, types2) {
  const { gen, data, opts } = it;
  const coerceTo = coerceToTypes$1(types2, opts.coerceTypes);
  const checkTypes = types2.length > 0 && !(coerceTo.length === 0 && types2.length === 1 && (0, applicability_1$3.schemaHasRulesForType)(it, types2[0]));
  if (checkTypes) {
    const wrongType = checkDataTypes$1(types2, data, opts.strictNumbers, DataType$1.Wrong);
    gen.if(wrongType, () => {
      if (coerceTo.length)
        coerceData$1(it, types2, coerceTo);
      else
        reportTypeError$1(it);
    });
  }
  return checkTypes;
}
dataType$1.coerceAndCheckDataType = coerceAndCheckDataType$1;
const COERCIBLE$1 = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function coerceToTypes$1(types2, coerceTypes) {
  return coerceTypes ? types2.filter((t2) => COERCIBLE$1.has(t2) || coerceTypes === "array" && t2 === "array") : [];
}
function coerceData$1(it, types2, coerceTo) {
  const { gen, data, opts } = it;
  const dataType2 = gen.let("dataType", (0, codegen_1$Y._)`typeof ${data}`);
  const coerced = gen.let("coerced", (0, codegen_1$Y._)`undefined`);
  if (opts.coerceTypes === "array") {
    gen.if((0, codegen_1$Y._)`${dataType2} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1$Y._)`${data}[0]`).assign(dataType2, (0, codegen_1$Y._)`typeof ${data}`).if(checkDataTypes$1(types2, data, opts.strictNumbers), () => gen.assign(coerced, data)));
  }
  gen.if((0, codegen_1$Y._)`${coerced} !== undefined`);
  for (const t2 of coerceTo) {
    if (COERCIBLE$1.has(t2) || t2 === "array" && opts.coerceTypes === "array") {
      coerceSpecificType(t2);
    }
  }
  gen.else();
  reportTypeError$1(it);
  gen.endIf();
  gen.if((0, codegen_1$Y._)`${coerced} !== undefined`, () => {
    gen.assign(data, coerced);
    assignParentData$1(it, coerced);
  });
  function coerceSpecificType(t2) {
    switch (t2) {
      case "string":
        gen.elseIf((0, codegen_1$Y._)`${dataType2} == "number" || ${dataType2} == "boolean"`).assign(coerced, (0, codegen_1$Y._)`"" + ${data}`).elseIf((0, codegen_1$Y._)`${data} === null`).assign(coerced, (0, codegen_1$Y._)`""`);
        return;
      case "number":
        gen.elseIf((0, codegen_1$Y._)`${dataType2} == "boolean" || ${data} === null
              || (${dataType2} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1$Y._)`+${data}`);
        return;
      case "integer":
        gen.elseIf((0, codegen_1$Y._)`${dataType2} === "boolean" || ${data} === null
              || (${dataType2} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1$Y._)`+${data}`);
        return;
      case "boolean":
        gen.elseIf((0, codegen_1$Y._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1$Y._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
        return;
      case "null":
        gen.elseIf((0, codegen_1$Y._)`${data} === "" || ${data} === 0 || ${data} === false`);
        gen.assign(coerced, null);
        return;
      case "array":
        gen.elseIf((0, codegen_1$Y._)`${dataType2} === "string" || ${dataType2} === "number"
              || ${dataType2} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1$Y._)`[${data}]`);
    }
  }
}
function assignParentData$1({ gen, parentData, parentDataProperty }, expr) {
  gen.if((0, codegen_1$Y._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1$Y._)`${parentData}[${parentDataProperty}]`, expr));
}
function checkDataType$1(dataType2, data, strictNums, correct = DataType$1.Correct) {
  const EQ = correct === DataType$1.Correct ? codegen_1$Y.operators.EQ : codegen_1$Y.operators.NEQ;
  let cond;
  switch (dataType2) {
    case "null":
      return (0, codegen_1$Y._)`${data} ${EQ} null`;
    case "array":
      cond = (0, codegen_1$Y._)`Array.isArray(${data})`;
      break;
    case "object":
      cond = (0, codegen_1$Y._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
      break;
    case "integer":
      cond = numCond((0, codegen_1$Y._)`!(${data} % 1) && !isNaN(${data})`);
      break;
    case "number":
      cond = numCond();
      break;
    default:
      return (0, codegen_1$Y._)`typeof ${data} ${EQ} ${dataType2}`;
  }
  return correct === DataType$1.Correct ? cond : (0, codegen_1$Y.not)(cond);
  function numCond(_cond = codegen_1$Y.nil) {
    return (0, codegen_1$Y.and)((0, codegen_1$Y._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1$Y._)`isFinite(${data})` : codegen_1$Y.nil);
  }
}
dataType$1.checkDataType = checkDataType$1;
function checkDataTypes$1(dataTypes, data, strictNums, correct) {
  if (dataTypes.length === 1) {
    return checkDataType$1(dataTypes[0], data, strictNums, correct);
  }
  let cond;
  const types2 = (0, util_1$R.toHash)(dataTypes);
  if (types2.array && types2.object) {
    const notObj = (0, codegen_1$Y._)`typeof ${data} != "object"`;
    cond = types2.null ? notObj : (0, codegen_1$Y._)`!${data} || ${notObj}`;
    delete types2.null;
    delete types2.array;
    delete types2.object;
  } else {
    cond = codegen_1$Y.nil;
  }
  if (types2.number)
    delete types2.integer;
  for (const t2 in types2)
    cond = (0, codegen_1$Y.and)(cond, checkDataType$1(t2, data, strictNums, correct));
  return cond;
}
dataType$1.checkDataTypes = checkDataTypes$1;
const typeError$1 = {
  message: ({ schema }) => `must be ${schema}`,
  params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1$Y._)`{type: ${schema}}` : (0, codegen_1$Y._)`{type: ${schemaValue}}`
};
function reportTypeError$1(it) {
  const cxt = getTypeErrorContext$1(it);
  (0, errors_1$6.reportError)(cxt, typeError$1);
}
dataType$1.reportTypeError = reportTypeError$1;
function getTypeErrorContext$1(it) {
  const { gen, data, schema } = it;
  const schemaCode = (0, util_1$R.schemaRefOrVal)(it, schema, "type");
  return {
    gen,
    keyword: "type",
    data,
    schema: schema.type,
    schemaCode,
    schemaValue: schemaCode,
    parentSchema: schema,
    params: {},
    it
  };
}
var defaults$1 = {};
Object.defineProperty(defaults$1, "__esModule", { value: true });
defaults$1.assignDefaults = void 0;
const codegen_1$X = codegen$1;
const util_1$Q = util$1;
function assignDefaults$1(it, ty) {
  const { properties: properties2, items: items2 } = it.schema;
  if (ty === "object" && properties2) {
    for (const key in properties2) {
      assignDefault$1(it, key, properties2[key].default);
    }
  } else if (ty === "array" && Array.isArray(items2)) {
    items2.forEach((sch, i) => assignDefault$1(it, i, sch.default));
  }
}
defaults$1.assignDefaults = assignDefaults$1;
function assignDefault$1(it, prop, defaultValue) {
  const { gen, compositeRule, data, opts } = it;
  if (defaultValue === void 0)
    return;
  const childData = (0, codegen_1$X._)`${data}${(0, codegen_1$X.getProperty)(prop)}`;
  if (compositeRule) {
    (0, util_1$Q.checkStrictMode)(it, `default is ignored for: ${childData}`);
    return;
  }
  let condition = (0, codegen_1$X._)`${childData} === undefined`;
  if (opts.useDefaults === "empty") {
    condition = (0, codegen_1$X._)`${condition} || ${childData} === null || ${childData} === ""`;
  }
  gen.if(condition, (0, codegen_1$X._)`${childData} = ${(0, codegen_1$X.stringify)(defaultValue)}`);
}
var keyword$1 = {};
var code$3 = {};
Object.defineProperty(code$3, "__esModule", { value: true });
code$3.validateUnion = code$3.validateArray = code$3.usePattern = code$3.callValidateCode = code$3.schemaProperties = code$3.allSchemaProperties = code$3.noPropertyInData = code$3.propertyInData = code$3.isOwnProperty = code$3.hasPropFunc = code$3.reportMissingProp = code$3.checkMissingProp = code$3.checkReportMissingProp = void 0;
const codegen_1$W = codegen$1;
const util_1$P = util$1;
const names_1$c = names$3;
const util_2$3 = util$1;
function checkReportMissingProp$1(cxt, prop) {
  const { gen, data, it } = cxt;
  gen.if(noPropertyInData$1(gen, data, prop, it.opts.ownProperties), () => {
    cxt.setParams({ missingProperty: (0, codegen_1$W._)`${prop}` }, true);
    cxt.error();
  });
}
code$3.checkReportMissingProp = checkReportMissingProp$1;
function checkMissingProp$1({ gen, data, it: { opts } }, properties2, missing) {
  return (0, codegen_1$W.or)(...properties2.map((prop) => (0, codegen_1$W.and)(noPropertyInData$1(gen, data, prop, opts.ownProperties), (0, codegen_1$W._)`${missing} = ${prop}`)));
}
code$3.checkMissingProp = checkMissingProp$1;
function reportMissingProp$1(cxt, missing) {
  cxt.setParams({ missingProperty: missing }, true);
  cxt.error();
}
code$3.reportMissingProp = reportMissingProp$1;
function hasPropFunc$1(gen) {
  return gen.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, codegen_1$W._)`Object.prototype.hasOwnProperty`
  });
}
code$3.hasPropFunc = hasPropFunc$1;
function isOwnProperty$1(gen, data, property) {
  return (0, codegen_1$W._)`${hasPropFunc$1(gen)}.call(${data}, ${property})`;
}
code$3.isOwnProperty = isOwnProperty$1;
function propertyInData$1(gen, data, property, ownProperties) {
  const cond = (0, codegen_1$W._)`${data}${(0, codegen_1$W.getProperty)(property)} !== undefined`;
  return ownProperties ? (0, codegen_1$W._)`${cond} && ${isOwnProperty$1(gen, data, property)}` : cond;
}
code$3.propertyInData = propertyInData$1;
function noPropertyInData$1(gen, data, property, ownProperties) {
  const cond = (0, codegen_1$W._)`${data}${(0, codegen_1$W.getProperty)(property)} === undefined`;
  return ownProperties ? (0, codegen_1$W.or)(cond, (0, codegen_1$W.not)(isOwnProperty$1(gen, data, property))) : cond;
}
code$3.noPropertyInData = noPropertyInData$1;
function allSchemaProperties$1(schemaMap) {
  return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
}
code$3.allSchemaProperties = allSchemaProperties$1;
function schemaProperties$1(it, schemaMap) {
  return allSchemaProperties$1(schemaMap).filter((p) => !(0, util_1$P.alwaysValidSchema)(it, schemaMap[p]));
}
code$3.schemaProperties = schemaProperties$1;
function callValidateCode$1({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
  const dataAndSchema = passSchema ? (0, codegen_1$W._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
  const valCxt = [
    [names_1$c.default.instancePath, (0, codegen_1$W.strConcat)(names_1$c.default.instancePath, errorPath)],
    [names_1$c.default.parentData, it.parentData],
    [names_1$c.default.parentDataProperty, it.parentDataProperty],
    [names_1$c.default.rootData, names_1$c.default.rootData]
  ];
  if (it.opts.dynamicRef)
    valCxt.push([names_1$c.default.dynamicAnchors, names_1$c.default.dynamicAnchors]);
  const args = (0, codegen_1$W._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
  return context !== codegen_1$W.nil ? (0, codegen_1$W._)`${func}.call(${context}, ${args})` : (0, codegen_1$W._)`${func}(${args})`;
}
code$3.callValidateCode = callValidateCode$1;
const newRegExp$1 = (0, codegen_1$W._)`new RegExp`;
function usePattern$1({ gen, it: { opts } }, pattern2) {
  const u = opts.unicodeRegExp ? "u" : "";
  const { regExp } = opts.code;
  const rx = regExp(pattern2, u);
  return gen.scopeValue("pattern", {
    key: rx.toString(),
    ref: rx,
    code: (0, codegen_1$W._)`${regExp.code === "new RegExp" ? newRegExp$1 : (0, util_2$3.useFunc)(gen, regExp)}(${pattern2}, ${u})`
  });
}
code$3.usePattern = usePattern$1;
function validateArray$1(cxt) {
  const { gen, data, keyword: keyword2, it } = cxt;
  const valid2 = gen.name("valid");
  if (it.allErrors) {
    const validArr = gen.let("valid", true);
    validateItems(() => gen.assign(validArr, false));
    return validArr;
  }
  gen.var(valid2, true);
  validateItems(() => gen.break());
  return valid2;
  function validateItems(notValid) {
    const len = gen.const("len", (0, codegen_1$W._)`${data}.length`);
    gen.forRange("i", 0, len, (i) => {
      cxt.subschema({
        keyword: keyword2,
        dataProp: i,
        dataPropType: util_1$P.Type.Num
      }, valid2);
      gen.if((0, codegen_1$W.not)(valid2), notValid);
    });
  }
}
code$3.validateArray = validateArray$1;
function validateUnion$1(cxt) {
  const { gen, schema, keyword: keyword2, it } = cxt;
  if (!Array.isArray(schema))
    throw new Error("ajv implementation error");
  const alwaysValid = schema.some((sch) => (0, util_1$P.alwaysValidSchema)(it, sch));
  if (alwaysValid && !it.opts.unevaluated)
    return;
  const valid2 = gen.let("valid", false);
  const schValid = gen.name("_valid");
  gen.block(() => schema.forEach((_sch, i) => {
    const schCxt = cxt.subschema({
      keyword: keyword2,
      schemaProp: i,
      compositeRule: true
    }, schValid);
    gen.assign(valid2, (0, codegen_1$W._)`${valid2} || ${schValid}`);
    const merged = cxt.mergeValidEvaluated(schCxt, schValid);
    if (!merged)
      gen.if((0, codegen_1$W.not)(valid2));
  }));
  cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
}
code$3.validateUnion = validateUnion$1;
Object.defineProperty(keyword$1, "__esModule", { value: true });
keyword$1.validateKeywordUsage = keyword$1.validSchemaType = keyword$1.funcKeywordCode = keyword$1.macroKeywordCode = void 0;
const codegen_1$V = codegen$1;
const names_1$b = names$3;
const code_1$k = code$3;
const errors_1$5 = errors$1;
function macroKeywordCode$1(cxt, def2) {
  const { gen, keyword: keyword2, schema, parentSchema, it } = cxt;
  const macroSchema = def2.macro.call(it.self, schema, parentSchema, it);
  const schemaRef = useKeyword$1(gen, keyword2, macroSchema);
  if (it.opts.validateSchema !== false)
    it.self.validateSchema(macroSchema, true);
  const valid2 = gen.name("valid");
  cxt.subschema({
    schema: macroSchema,
    schemaPath: codegen_1$V.nil,
    errSchemaPath: `${it.errSchemaPath}/${keyword2}`,
    topSchemaRef: schemaRef,
    compositeRule: true
  }, valid2);
  cxt.pass(valid2, () => cxt.error(true));
}
keyword$1.macroKeywordCode = macroKeywordCode$1;
function funcKeywordCode$1(cxt, def2) {
  var _a;
  const { gen, keyword: keyword2, schema, parentSchema, $data, it } = cxt;
  checkAsyncKeyword$1(it, def2);
  const validate2 = !$data && def2.compile ? def2.compile.call(it.self, schema, parentSchema, it) : def2.validate;
  const validateRef = useKeyword$1(gen, keyword2, validate2);
  const valid2 = gen.let("valid");
  cxt.block$data(valid2, validateKeyword);
  cxt.ok((_a = def2.valid) !== null && _a !== void 0 ? _a : valid2);
  function validateKeyword() {
    if (def2.errors === false) {
      assignValid();
      if (def2.modifying)
        modifyData$1(cxt);
      reportErrs(() => cxt.error());
    } else {
      const ruleErrs = def2.async ? validateAsync() : validateSync();
      if (def2.modifying)
        modifyData$1(cxt);
      reportErrs(() => addErrs$1(cxt, ruleErrs));
    }
  }
  function validateAsync() {
    const ruleErrs = gen.let("ruleErrs", null);
    gen.try(() => assignValid((0, codegen_1$V._)`await `), (e) => gen.assign(valid2, false).if((0, codegen_1$V._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1$V._)`${e}.errors`), () => gen.throw(e)));
    return ruleErrs;
  }
  function validateSync() {
    const validateErrs = (0, codegen_1$V._)`${validateRef}.errors`;
    gen.assign(validateErrs, null);
    assignValid(codegen_1$V.nil);
    return validateErrs;
  }
  function assignValid(_await = def2.async ? (0, codegen_1$V._)`await ` : codegen_1$V.nil) {
    const passCxt = it.opts.passContext ? names_1$b.default.this : names_1$b.default.self;
    const passSchema = !("compile" in def2 && !$data || def2.schema === false);
    gen.assign(valid2, (0, codegen_1$V._)`${_await}${(0, code_1$k.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def2.modifying);
  }
  function reportErrs(errors2) {
    var _a2;
    gen.if((0, codegen_1$V.not)((_a2 = def2.valid) !== null && _a2 !== void 0 ? _a2 : valid2), errors2);
  }
}
keyword$1.funcKeywordCode = funcKeywordCode$1;
function modifyData$1(cxt) {
  const { gen, data, it } = cxt;
  gen.if(it.parentData, () => gen.assign(data, (0, codegen_1$V._)`${it.parentData}[${it.parentDataProperty}]`));
}
function addErrs$1(cxt, errs) {
  const { gen } = cxt;
  gen.if((0, codegen_1$V._)`Array.isArray(${errs})`, () => {
    gen.assign(names_1$b.default.vErrors, (0, codegen_1$V._)`${names_1$b.default.vErrors} === null ? ${errs} : ${names_1$b.default.vErrors}.concat(${errs})`).assign(names_1$b.default.errors, (0, codegen_1$V._)`${names_1$b.default.vErrors}.length`);
    (0, errors_1$5.extendErrors)(cxt);
  }, () => cxt.error());
}
function checkAsyncKeyword$1({ schemaEnv }, def2) {
  if (def2.async && !schemaEnv.$async)
    throw new Error("async keyword in sync schema");
}
function useKeyword$1(gen, keyword2, result) {
  if (result === void 0)
    throw new Error(`keyword "${keyword2}" failed to compile`);
  return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1$V.stringify)(result) });
}
function validSchemaType$1(schema, schemaType, allowUndefined = false) {
  return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
}
keyword$1.validSchemaType = validSchemaType$1;
function validateKeywordUsage$1({ schema, opts, self: self2, errSchemaPath }, def2, keyword2) {
  if (Array.isArray(def2.keyword) ? !def2.keyword.includes(keyword2) : def2.keyword !== keyword2) {
    throw new Error("ajv implementation error");
  }
  const deps = def2.dependencies;
  if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
    throw new Error(`parent schema must have dependencies of ${keyword2}: ${deps.join(",")}`);
  }
  if (def2.validateSchema) {
    const valid2 = def2.validateSchema(schema[keyword2]);
    if (!valid2) {
      const msg = `keyword "${keyword2}" value is invalid at path "${errSchemaPath}": ` + self2.errorsText(def2.validateSchema.errors);
      if (opts.validateSchema === "log")
        self2.logger.error(msg);
      else
        throw new Error(msg);
    }
  }
}
keyword$1.validateKeywordUsage = validateKeywordUsage$1;
var subschema$1 = {};
Object.defineProperty(subschema$1, "__esModule", { value: true });
subschema$1.extendSubschemaMode = subschema$1.extendSubschemaData = subschema$1.getSubschema = void 0;
const codegen_1$U = codegen$1;
const util_1$O = util$1;
function getSubschema$1(it, { keyword: keyword2, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
  if (keyword2 !== void 0 && schema !== void 0) {
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  }
  if (keyword2 !== void 0) {
    const sch = it.schema[keyword2];
    return schemaProp === void 0 ? {
      schema: sch,
      schemaPath: (0, codegen_1$U._)`${it.schemaPath}${(0, codegen_1$U.getProperty)(keyword2)}`,
      errSchemaPath: `${it.errSchemaPath}/${keyword2}`
    } : {
      schema: sch[schemaProp],
      schemaPath: (0, codegen_1$U._)`${it.schemaPath}${(0, codegen_1$U.getProperty)(keyword2)}${(0, codegen_1$U.getProperty)(schemaProp)}`,
      errSchemaPath: `${it.errSchemaPath}/${keyword2}/${(0, util_1$O.escapeFragment)(schemaProp)}`
    };
  }
  if (schema !== void 0) {
    if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    }
    return {
      schema,
      schemaPath,
      topSchemaRef,
      errSchemaPath
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
subschema$1.getSubschema = getSubschema$1;
function extendSubschemaData$1(subschema2, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
  if (data !== void 0 && dataProp !== void 0) {
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  }
  const { gen } = it;
  if (dataProp !== void 0) {
    const { errorPath, dataPathArr, opts } = it;
    const nextData = gen.let("data", (0, codegen_1$U._)`${it.data}${(0, codegen_1$U.getProperty)(dataProp)}`, true);
    dataContextProps(nextData);
    subschema2.errorPath = (0, codegen_1$U.str)`${errorPath}${(0, util_1$O.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
    subschema2.parentDataProperty = (0, codegen_1$U._)`${dataProp}`;
    subschema2.dataPathArr = [...dataPathArr, subschema2.parentDataProperty];
  }
  if (data !== void 0) {
    const nextData = data instanceof codegen_1$U.Name ? data : gen.let("data", data, true);
    dataContextProps(nextData);
    if (propertyName !== void 0)
      subschema2.propertyName = propertyName;
  }
  if (dataTypes)
    subschema2.dataTypes = dataTypes;
  function dataContextProps(_nextData) {
    subschema2.data = _nextData;
    subschema2.dataLevel = it.dataLevel + 1;
    subschema2.dataTypes = [];
    it.definedProperties = /* @__PURE__ */ new Set();
    subschema2.parentData = it.data;
    subschema2.dataNames = [...it.dataNames, _nextData];
  }
}
subschema$1.extendSubschemaData = extendSubschemaData$1;
function extendSubschemaMode$1(subschema2, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
  if (compositeRule !== void 0)
    subschema2.compositeRule = compositeRule;
  if (createErrors !== void 0)
    subschema2.createErrors = createErrors;
  if (allErrors !== void 0)
    subschema2.allErrors = allErrors;
  subschema2.jtdDiscriminator = jtdDiscriminator;
  subschema2.jtdMetadata = jtdMetadata;
}
subschema$1.extendSubschemaMode = extendSubschemaMode$1;
var resolve$4 = {};
var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; )
        if (!equal(a[i], b[i])) return false;
      return true;
    }
    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = length; i-- !== 0; ) {
      var key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }
    return true;
  }
  return a !== a && b !== b;
};
var jsonSchemaTraverse$1 = { exports: {} };
var traverse$3 = jsonSchemaTraverse$1.exports = function(schema, opts, cb) {
  if (typeof opts == "function") {
    cb = opts;
    opts = {};
  }
  cb = opts.cb || cb;
  var pre = typeof cb == "function" ? cb : cb.pre || function() {
  };
  var post = cb.post || function() {
  };
  _traverse$1(opts, pre, post, schema, "", schema);
};
traverse$3.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};
traverse$3.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};
traverse$3.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};
traverse$3.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};
function _traverse$1(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == "object" && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse$3.arrayKeywords) {
          for (var i = 0; i < sch.length; i++)
            _traverse$1(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse$3.propsKeywords) {
        if (sch && typeof sch == "object") {
          for (var prop in sch)
            _traverse$1(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr$1(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse$3.keywords || opts.allKeys && !(key in traverse$3.skipKeywords)) {
        _traverse$1(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}
function escapeJsonPtr$1(str) {
  return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
var jsonSchemaTraverseExports$1 = jsonSchemaTraverse$1.exports;
Object.defineProperty(resolve$4, "__esModule", { value: true });
resolve$4.getSchemaRefs = resolve$4.resolveUrl = resolve$4.normalizeId = resolve$4._getFullPath = resolve$4.getFullPath = resolve$4.inlineRef = void 0;
const util_1$N = util$1;
const equal$6 = fastDeepEqual;
const traverse$2 = jsonSchemaTraverseExports$1;
const SIMPLE_INLINED$1 = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function inlineRef$1(schema, limit2 = true) {
  if (typeof schema == "boolean")
    return true;
  if (limit2 === true)
    return !hasRef$1(schema);
  if (!limit2)
    return false;
  return countKeys$1(schema) <= limit2;
}
resolve$4.inlineRef = inlineRef$1;
const REF_KEYWORDS$1 = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function hasRef$1(schema) {
  for (const key in schema) {
    if (REF_KEYWORDS$1.has(key))
      return true;
    const sch = schema[key];
    if (Array.isArray(sch) && sch.some(hasRef$1))
      return true;
    if (typeof sch == "object" && hasRef$1(sch))
      return true;
  }
  return false;
}
function countKeys$1(schema) {
  let count = 0;
  for (const key in schema) {
    if (key === "$ref")
      return Infinity;
    count++;
    if (SIMPLE_INLINED$1.has(key))
      continue;
    if (typeof schema[key] == "object") {
      (0, util_1$N.eachItem)(schema[key], (sch) => count += countKeys$1(sch));
    }
    if (count === Infinity)
      return Infinity;
  }
  return count;
}
function getFullPath$1(resolver, id2 = "", normalize2) {
  if (normalize2 !== false)
    id2 = normalizeId$1(id2);
  const p = resolver.parse(id2);
  return _getFullPath$1(resolver, p);
}
resolve$4.getFullPath = getFullPath$1;
function _getFullPath$1(resolver, p) {
  const serialized = resolver.serialize(p);
  return serialized.split("#")[0] + "#";
}
resolve$4._getFullPath = _getFullPath$1;
const TRAILING_SLASH_HASH$1 = /#\/?$/;
function normalizeId$1(id2) {
  return id2 ? id2.replace(TRAILING_SLASH_HASH$1, "") : "";
}
resolve$4.normalizeId = normalizeId$1;
function resolveUrl$1(resolver, baseId, id2) {
  id2 = normalizeId$1(id2);
  return resolver.resolve(baseId, id2);
}
resolve$4.resolveUrl = resolveUrl$1;
const ANCHOR$1 = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs$1(schema, baseId) {
  if (typeof schema == "boolean")
    return {};
  const { schemaId, uriResolver } = this.opts;
  const schId = normalizeId$1(schema[schemaId] || baseId);
  const baseIds = { "": schId };
  const pathPrefix = getFullPath$1(uriResolver, schId, false);
  const localRefs = {};
  const schemaRefs = /* @__PURE__ */ new Set();
  traverse$2(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
    if (parentJsonPtr === void 0)
      return;
    const fullPath = pathPrefix + jsonPtr;
    let innerBaseId = baseIds[parentJsonPtr];
    if (typeof sch[schemaId] == "string")
      innerBaseId = addRef.call(this, sch[schemaId]);
    addAnchor.call(this, sch.$anchor);
    addAnchor.call(this, sch.$dynamicAnchor);
    baseIds[jsonPtr] = innerBaseId;
    function addRef(ref2) {
      const _resolve = this.opts.uriResolver.resolve;
      ref2 = normalizeId$1(innerBaseId ? _resolve(innerBaseId, ref2) : ref2);
      if (schemaRefs.has(ref2))
        throw ambiguos(ref2);
      schemaRefs.add(ref2);
      let schOrRef = this.refs[ref2];
      if (typeof schOrRef == "string")
        schOrRef = this.refs[schOrRef];
      if (typeof schOrRef == "object") {
        checkAmbiguosRef(sch, schOrRef.schema, ref2);
      } else if (ref2 !== normalizeId$1(fullPath)) {
        if (ref2[0] === "#") {
          checkAmbiguosRef(sch, localRefs[ref2], ref2);
          localRefs[ref2] = sch;
        } else {
          this.refs[ref2] = fullPath;
        }
      }
      return ref2;
    }
    function addAnchor(anchor) {
      if (typeof anchor == "string") {
        if (!ANCHOR$1.test(anchor))
          throw new Error(`invalid anchor "${anchor}"`);
        addRef.call(this, `#${anchor}`);
      }
    }
  });
  return localRefs;
  function checkAmbiguosRef(sch1, sch2, ref2) {
    if (sch2 !== void 0 && !equal$6(sch1, sch2))
      throw ambiguos(ref2);
  }
  function ambiguos(ref2) {
    return new Error(`reference "${ref2}" resolves to more than one schema`);
  }
}
resolve$4.getSchemaRefs = getSchemaRefs$1;
Object.defineProperty(validate$1, "__esModule", { value: true });
validate$1.getData = validate$1.KeywordCxt = validate$1.validateFunctionCode = void 0;
const boolSchema_1$1 = boolSchema$1;
const dataType_1$3 = dataType$1;
const applicability_1$2 = applicability$1;
const dataType_2$1 = dataType$1;
const defaults_1$1 = defaults$1;
const keyword_1$1 = keyword$1;
const subschema_1$1 = subschema$1;
const codegen_1$T = codegen$1;
const names_1$a = names$3;
const resolve_1$5 = resolve$4;
const util_1$M = util$1;
const errors_1$4 = errors$1;
function validateFunctionCode$1(it) {
  if (isSchemaObj$1(it)) {
    checkKeywords$1(it);
    if (schemaCxtHasRules$1(it)) {
      topSchemaObjCode$1(it);
      return;
    }
  }
  validateFunction$1(it, () => (0, boolSchema_1$1.topBoolOrEmptySchema)(it));
}
validate$1.validateFunctionCode = validateFunctionCode$1;
function validateFunction$1({ gen, validateName, schema, schemaEnv, opts }, body) {
  if (opts.code.es5) {
    gen.func(validateName, (0, codegen_1$T._)`${names_1$a.default.data}, ${names_1$a.default.valCxt}`, schemaEnv.$async, () => {
      gen.code((0, codegen_1$T._)`"use strict"; ${funcSourceUrl$1(schema, opts)}`);
      destructureValCxtES5$1(gen, opts);
      gen.code(body);
    });
  } else {
    gen.func(validateName, (0, codegen_1$T._)`${names_1$a.default.data}, ${destructureValCxt$1(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl$1(schema, opts)).code(body));
  }
}
function destructureValCxt$1(opts) {
  return (0, codegen_1$T._)`{${names_1$a.default.instancePath}="", ${names_1$a.default.parentData}, ${names_1$a.default.parentDataProperty}, ${names_1$a.default.rootData}=${names_1$a.default.data}${opts.dynamicRef ? (0, codegen_1$T._)`, ${names_1$a.default.dynamicAnchors}={}` : codegen_1$T.nil}}={}`;
}
function destructureValCxtES5$1(gen, opts) {
  gen.if(names_1$a.default.valCxt, () => {
    gen.var(names_1$a.default.instancePath, (0, codegen_1$T._)`${names_1$a.default.valCxt}.${names_1$a.default.instancePath}`);
    gen.var(names_1$a.default.parentData, (0, codegen_1$T._)`${names_1$a.default.valCxt}.${names_1$a.default.parentData}`);
    gen.var(names_1$a.default.parentDataProperty, (0, codegen_1$T._)`${names_1$a.default.valCxt}.${names_1$a.default.parentDataProperty}`);
    gen.var(names_1$a.default.rootData, (0, codegen_1$T._)`${names_1$a.default.valCxt}.${names_1$a.default.rootData}`);
    if (opts.dynamicRef)
      gen.var(names_1$a.default.dynamicAnchors, (0, codegen_1$T._)`${names_1$a.default.valCxt}.${names_1$a.default.dynamicAnchors}`);
  }, () => {
    gen.var(names_1$a.default.instancePath, (0, codegen_1$T._)`""`);
    gen.var(names_1$a.default.parentData, (0, codegen_1$T._)`undefined`);
    gen.var(names_1$a.default.parentDataProperty, (0, codegen_1$T._)`undefined`);
    gen.var(names_1$a.default.rootData, names_1$a.default.data);
    if (opts.dynamicRef)
      gen.var(names_1$a.default.dynamicAnchors, (0, codegen_1$T._)`{}`);
  });
}
function topSchemaObjCode$1(it) {
  const { schema, opts, gen } = it;
  validateFunction$1(it, () => {
    if (opts.$comment && schema.$comment)
      commentKeyword$1(it);
    checkNoDefault$1(it);
    gen.let(names_1$a.default.vErrors, null);
    gen.let(names_1$a.default.errors, 0);
    if (opts.unevaluated)
      resetEvaluated$1(it);
    typeAndKeywords$1(it);
    returnResults$1(it);
  });
  return;
}
function resetEvaluated$1(it) {
  const { gen, validateName } = it;
  it.evaluated = gen.const("evaluated", (0, codegen_1$T._)`${validateName}.evaluated`);
  gen.if((0, codegen_1$T._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1$T._)`${it.evaluated}.props`, (0, codegen_1$T._)`undefined`));
  gen.if((0, codegen_1$T._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1$T._)`${it.evaluated}.items`, (0, codegen_1$T._)`undefined`));
}
function funcSourceUrl$1(schema, opts) {
  const schId = typeof schema == "object" && schema[opts.schemaId];
  return schId && (opts.code.source || opts.code.process) ? (0, codegen_1$T._)`/*# sourceURL=${schId} */` : codegen_1$T.nil;
}
function subschemaCode$1(it, valid2) {
  if (isSchemaObj$1(it)) {
    checkKeywords$1(it);
    if (schemaCxtHasRules$1(it)) {
      subSchemaObjCode$1(it, valid2);
      return;
    }
  }
  (0, boolSchema_1$1.boolOrEmptySchema)(it, valid2);
}
function schemaCxtHasRules$1({ schema, self: self2 }) {
  if (typeof schema == "boolean")
    return !schema;
  for (const key in schema)
    if (self2.RULES.all[key])
      return true;
  return false;
}
function isSchemaObj$1(it) {
  return typeof it.schema != "boolean";
}
function subSchemaObjCode$1(it, valid2) {
  const { schema, gen, opts } = it;
  if (opts.$comment && schema.$comment)
    commentKeyword$1(it);
  updateContext$1(it);
  checkAsyncSchema$1(it);
  const errsCount = gen.const("_errs", names_1$a.default.errors);
  typeAndKeywords$1(it, errsCount);
  gen.var(valid2, (0, codegen_1$T._)`${errsCount} === ${names_1$a.default.errors}`);
}
function checkKeywords$1(it) {
  (0, util_1$M.checkUnknownRules)(it);
  checkRefsAndKeywords$1(it);
}
function typeAndKeywords$1(it, errsCount) {
  if (it.opts.jtd)
    return schemaKeywords$1(it, [], false, errsCount);
  const types2 = (0, dataType_1$3.getSchemaTypes)(it.schema);
  const checkedTypes = (0, dataType_1$3.coerceAndCheckDataType)(it, types2);
  schemaKeywords$1(it, types2, !checkedTypes, errsCount);
}
function checkRefsAndKeywords$1(it) {
  const { schema, errSchemaPath, opts, self: self2 } = it;
  if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1$M.schemaHasRulesButRef)(schema, self2.RULES)) {
    self2.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
  }
}
function checkNoDefault$1(it) {
  const { schema, opts } = it;
  if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
    (0, util_1$M.checkStrictMode)(it, "default is ignored in the schema root");
  }
}
function updateContext$1(it) {
  const schId = it.schema[it.opts.schemaId];
  if (schId)
    it.baseId = (0, resolve_1$5.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
}
function checkAsyncSchema$1(it) {
  if (it.schema.$async && !it.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function commentKeyword$1({ gen, schemaEnv, schema, errSchemaPath, opts }) {
  const msg = schema.$comment;
  if (opts.$comment === true) {
    gen.code((0, codegen_1$T._)`${names_1$a.default.self}.logger.log(${msg})`);
  } else if (typeof opts.$comment == "function") {
    const schemaPath = (0, codegen_1$T.str)`${errSchemaPath}/$comment`;
    const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
    gen.code((0, codegen_1$T._)`${names_1$a.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
  }
}
function returnResults$1(it) {
  const { gen, schemaEnv, validateName, ValidationError: ValidationError3, opts } = it;
  if (schemaEnv.$async) {
    gen.if((0, codegen_1$T._)`${names_1$a.default.errors} === 0`, () => gen.return(names_1$a.default.data), () => gen.throw((0, codegen_1$T._)`new ${ValidationError3}(${names_1$a.default.vErrors})`));
  } else {
    gen.assign((0, codegen_1$T._)`${validateName}.errors`, names_1$a.default.vErrors);
    if (opts.unevaluated)
      assignEvaluated$1(it);
    gen.return((0, codegen_1$T._)`${names_1$a.default.errors} === 0`);
  }
}
function assignEvaluated$1({ gen, evaluated, props, items: items2 }) {
  if (props instanceof codegen_1$T.Name)
    gen.assign((0, codegen_1$T._)`${evaluated}.props`, props);
  if (items2 instanceof codegen_1$T.Name)
    gen.assign((0, codegen_1$T._)`${evaluated}.items`, items2);
}
function schemaKeywords$1(it, types2, typeErrors, errsCount) {
  const { gen, schema, data, allErrors, opts, self: self2 } = it;
  const { RULES } = self2;
  if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1$M.schemaHasRulesButRef)(schema, RULES))) {
    gen.block(() => keywordCode$1(it, "$ref", RULES.all.$ref.definition));
    return;
  }
  if (!opts.jtd)
    checkStrictTypes$1(it, types2);
  gen.block(() => {
    for (const group of RULES.rules)
      groupKeywords(group);
    groupKeywords(RULES.post);
  });
  function groupKeywords(group) {
    if (!(0, applicability_1$2.shouldUseGroup)(schema, group))
      return;
    if (group.type) {
      gen.if((0, dataType_2$1.checkDataType)(group.type, data, opts.strictNumbers));
      iterateKeywords$1(it, group);
      if (types2.length === 1 && types2[0] === group.type && typeErrors) {
        gen.else();
        (0, dataType_2$1.reportTypeError)(it);
      }
      gen.endIf();
    } else {
      iterateKeywords$1(it, group);
    }
    if (!allErrors)
      gen.if((0, codegen_1$T._)`${names_1$a.default.errors} === ${errsCount || 0}`);
  }
}
function iterateKeywords$1(it, group) {
  const { gen, schema, opts: { useDefaults } } = it;
  if (useDefaults)
    (0, defaults_1$1.assignDefaults)(it, group.type);
  gen.block(() => {
    for (const rule of group.rules) {
      if ((0, applicability_1$2.shouldUseRule)(schema, rule)) {
        keywordCode$1(it, rule.keyword, rule.definition, group.type);
      }
    }
  });
}
function checkStrictTypes$1(it, types2) {
  if (it.schemaEnv.meta || !it.opts.strictTypes)
    return;
  checkContextTypes$1(it, types2);
  if (!it.opts.allowUnionTypes)
    checkMultipleTypes$1(it, types2);
  checkKeywordTypes$1(it, it.dataTypes);
}
function checkContextTypes$1(it, types2) {
  if (!types2.length)
    return;
  if (!it.dataTypes.length) {
    it.dataTypes = types2;
    return;
  }
  types2.forEach((t2) => {
    if (!includesType$1(it.dataTypes, t2)) {
      strictTypesError$1(it, `type "${t2}" not allowed by context "${it.dataTypes.join(",")}"`);
    }
  });
  narrowSchemaTypes$1(it, types2);
}
function checkMultipleTypes$1(it, ts) {
  if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
    strictTypesError$1(it, "use allowUnionTypes to allow union type keyword");
  }
}
function checkKeywordTypes$1(it, ts) {
  const rules2 = it.self.RULES.all;
  for (const keyword2 in rules2) {
    const rule = rules2[keyword2];
    if (typeof rule == "object" && (0, applicability_1$2.shouldUseRule)(it.schema, rule)) {
      const { type: type2 } = rule.definition;
      if (type2.length && !type2.some((t2) => hasApplicableType$1(ts, t2))) {
        strictTypesError$1(it, `missing type "${type2.join(",")}" for keyword "${keyword2}"`);
      }
    }
  }
}
function hasApplicableType$1(schTs, kwdT) {
  return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
}
function includesType$1(ts, t2) {
  return ts.includes(t2) || t2 === "integer" && ts.includes("number");
}
function narrowSchemaTypes$1(it, withTypes) {
  const ts = [];
  for (const t2 of it.dataTypes) {
    if (includesType$1(withTypes, t2))
      ts.push(t2);
    else if (withTypes.includes("integer") && t2 === "number")
      ts.push("integer");
  }
  it.dataTypes = ts;
}
function strictTypesError$1(it, msg) {
  const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
  msg += ` at "${schemaPath}" (strictTypes)`;
  (0, util_1$M.checkStrictMode)(it, msg, it.opts.strictTypes);
}
let KeywordCxt$1 = class KeywordCxt {
  constructor(it, def2, keyword2) {
    (0, keyword_1$1.validateKeywordUsage)(it, def2, keyword2);
    this.gen = it.gen;
    this.allErrors = it.allErrors;
    this.keyword = keyword2;
    this.data = it.data;
    this.schema = it.schema[keyword2];
    this.$data = def2.$data && it.opts.$data && this.schema && this.schema.$data;
    this.schemaValue = (0, util_1$M.schemaRefOrVal)(it, this.schema, keyword2, this.$data);
    this.schemaType = def2.schemaType;
    this.parentSchema = it.schema;
    this.params = {};
    this.it = it;
    this.def = def2;
    if (this.$data) {
      this.schemaCode = it.gen.const("vSchema", getData$1(this.$data, it));
    } else {
      this.schemaCode = this.schemaValue;
      if (!(0, keyword_1$1.validSchemaType)(this.schema, def2.schemaType, def2.allowUndefined)) {
        throw new Error(`${keyword2} value must be ${JSON.stringify(def2.schemaType)}`);
      }
    }
    if ("code" in def2 ? def2.trackErrors : def2.errors !== false) {
      this.errsCount = it.gen.const("_errs", names_1$a.default.errors);
    }
  }
  result(condition, successAction, failAction) {
    this.failResult((0, codegen_1$T.not)(condition), successAction, failAction);
  }
  failResult(condition, successAction, failAction) {
    this.gen.if(condition);
    if (failAction)
      failAction();
    else
      this.error();
    if (successAction) {
      this.gen.else();
      successAction();
      if (this.allErrors)
        this.gen.endIf();
    } else {
      if (this.allErrors)
        this.gen.endIf();
      else
        this.gen.else();
    }
  }
  pass(condition, failAction) {
    this.failResult((0, codegen_1$T.not)(condition), void 0, failAction);
  }
  fail(condition) {
    if (condition === void 0) {
      this.error();
      if (!this.allErrors)
        this.gen.if(false);
      return;
    }
    this.gen.if(condition);
    this.error();
    if (this.allErrors)
      this.gen.endIf();
    else
      this.gen.else();
  }
  fail$data(condition) {
    if (!this.$data)
      return this.fail(condition);
    const { schemaCode } = this;
    this.fail((0, codegen_1$T._)`${schemaCode} !== undefined && (${(0, codegen_1$T.or)(this.invalid$data(), condition)})`);
  }
  error(append, errorParams, errorPaths) {
    if (errorParams) {
      this.setParams(errorParams);
      this._error(append, errorPaths);
      this.setParams({});
      return;
    }
    this._error(append, errorPaths);
  }
  _error(append, errorPaths) {
    (append ? errors_1$4.reportExtraError : errors_1$4.reportError)(this, this.def.error, errorPaths);
  }
  $dataError() {
    (0, errors_1$4.reportError)(this, this.def.$dataError || errors_1$4.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, errors_1$4.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(cond) {
    if (!this.allErrors)
      this.gen.if(cond);
  }
  setParams(obj, assign2) {
    if (assign2)
      Object.assign(this.params, obj);
    else
      this.params = obj;
  }
  block$data(valid2, codeBlock, $dataValid = codegen_1$T.nil) {
    this.gen.block(() => {
      this.check$data(valid2, $dataValid);
      codeBlock();
    });
  }
  check$data(valid2 = codegen_1$T.nil, $dataValid = codegen_1$T.nil) {
    if (!this.$data)
      return;
    const { gen, schemaCode, schemaType, def: def2 } = this;
    gen.if((0, codegen_1$T.or)((0, codegen_1$T._)`${schemaCode} === undefined`, $dataValid));
    if (valid2 !== codegen_1$T.nil)
      gen.assign(valid2, true);
    if (schemaType.length || def2.validateSchema) {
      gen.elseIf(this.invalid$data());
      this.$dataError();
      if (valid2 !== codegen_1$T.nil)
        gen.assign(valid2, false);
    }
    gen.else();
  }
  invalid$data() {
    const { gen, schemaCode, schemaType, def: def2, it } = this;
    return (0, codegen_1$T.or)(wrong$DataType(), invalid$DataSchema());
    function wrong$DataType() {
      if (schemaType.length) {
        if (!(schemaCode instanceof codegen_1$T.Name))
          throw new Error("ajv implementation error");
        const st = Array.isArray(schemaType) ? schemaType : [schemaType];
        return (0, codegen_1$T._)`${(0, dataType_2$1.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2$1.DataType.Wrong)}`;
      }
      return codegen_1$T.nil;
    }
    function invalid$DataSchema() {
      if (def2.validateSchema) {
        const validateSchemaRef = gen.scopeValue("validate$data", { ref: def2.validateSchema });
        return (0, codegen_1$T._)`!${validateSchemaRef}(${schemaCode})`;
      }
      return codegen_1$T.nil;
    }
  }
  subschema(appl, valid2) {
    const subschema2 = (0, subschema_1$1.getSubschema)(this.it, appl);
    (0, subschema_1$1.extendSubschemaData)(subschema2, this.it, appl);
    (0, subschema_1$1.extendSubschemaMode)(subschema2, appl);
    const nextContext = { ...this.it, ...subschema2, items: void 0, props: void 0 };
    subschemaCode$1(nextContext, valid2);
    return nextContext;
  }
  mergeEvaluated(schemaCxt, toName) {
    const { it, gen } = this;
    if (!it.opts.unevaluated)
      return;
    if (it.props !== true && schemaCxt.props !== void 0) {
      it.props = util_1$M.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
    }
    if (it.items !== true && schemaCxt.items !== void 0) {
      it.items = util_1$M.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
    }
  }
  mergeValidEvaluated(schemaCxt, valid2) {
    const { it, gen } = this;
    if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
      gen.if(valid2, () => this.mergeEvaluated(schemaCxt, codegen_1$T.Name));
      return true;
    }
  }
};
validate$1.KeywordCxt = KeywordCxt$1;
function keywordCode$1(it, keyword2, def2, ruleType) {
  const cxt = new KeywordCxt$1(it, def2, keyword2);
  if ("code" in def2) {
    def2.code(cxt, ruleType);
  } else if (cxt.$data && def2.validate) {
    (0, keyword_1$1.funcKeywordCode)(cxt, def2);
  } else if ("macro" in def2) {
    (0, keyword_1$1.macroKeywordCode)(cxt, def2);
  } else if (def2.compile || def2.validate) {
    (0, keyword_1$1.funcKeywordCode)(cxt, def2);
  }
}
const JSON_POINTER$1 = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER$1 = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData$1($data, { dataLevel, dataNames, dataPathArr }) {
  let jsonPointer;
  let data;
  if ($data === "")
    return names_1$a.default.rootData;
  if ($data[0] === "/") {
    if (!JSON_POINTER$1.test($data))
      throw new Error(`Invalid JSON-pointer: ${$data}`);
    jsonPointer = $data;
    data = names_1$a.default.rootData;
  } else {
    const matches = RELATIVE_JSON_POINTER$1.exec($data);
    if (!matches)
      throw new Error(`Invalid JSON-pointer: ${$data}`);
    const up = +matches[1];
    jsonPointer = matches[2];
    if (jsonPointer === "#") {
      if (up >= dataLevel)
        throw new Error(errorMsg("property/index", up));
      return dataPathArr[dataLevel - up];
    }
    if (up > dataLevel)
      throw new Error(errorMsg("data", up));
    data = dataNames[dataLevel - up];
    if (!jsonPointer)
      return data;
  }
  let expr = data;
  const segments = jsonPointer.split("/");
  for (const segment of segments) {
    if (segment) {
      data = (0, codegen_1$T._)`${data}${(0, codegen_1$T.getProperty)((0, util_1$M.unescapeJsonPointer)(segment))}`;
      expr = (0, codegen_1$T._)`${expr} && ${data}`;
    }
  }
  return expr;
  function errorMsg(pointerType, up) {
    return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
  }
}
validate$1.getData = getData$1;
var validation_error$1 = {};
Object.defineProperty(validation_error$1, "__esModule", { value: true });
let ValidationError$1 = class ValidationError extends Error {
  constructor(errors2) {
    super("validation failed");
    this.errors = errors2;
    this.ajv = this.validation = true;
  }
};
validation_error$1.default = ValidationError$1;
var ref_error$1 = {};
Object.defineProperty(ref_error$1, "__esModule", { value: true });
const resolve_1$4 = resolve$4;
let MissingRefError$1 = class MissingRefError extends Error {
  constructor(resolver, baseId, ref2, msg) {
    super(msg || `can't resolve reference ${ref2} from id ${baseId}`);
    this.missingRef = (0, resolve_1$4.resolveUrl)(resolver, baseId, ref2);
    this.missingSchema = (0, resolve_1$4.normalizeId)((0, resolve_1$4.getFullPath)(resolver, this.missingRef));
  }
};
ref_error$1.default = MissingRefError$1;
var compile$1 = {};
Object.defineProperty(compile$1, "__esModule", { value: true });
compile$1.resolveSchema = compile$1.getCompilingSchema = compile$1.resolveRef = compile$1.compileSchema = compile$1.SchemaEnv = void 0;
const codegen_1$S = codegen$1;
const validation_error_1$1 = validation_error$1;
const names_1$9 = names$3;
const resolve_1$3 = resolve$4;
const util_1$L = util$1;
const validate_1$3 = validate$1;
let SchemaEnv$1 = class SchemaEnv {
  constructor(env2) {
    var _a;
    this.refs = {};
    this.dynamicAnchors = {};
    let schema;
    if (typeof env2.schema == "object")
      schema = env2.schema;
    this.schema = env2.schema;
    this.schemaId = env2.schemaId;
    this.root = env2.root || this;
    this.baseId = (_a = env2.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1$3.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env2.schemaId || "$id"]);
    this.schemaPath = env2.schemaPath;
    this.localRefs = env2.localRefs;
    this.meta = env2.meta;
    this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
    this.refs = {};
  }
};
compile$1.SchemaEnv = SchemaEnv$1;
function compileSchema$1(sch) {
  const _sch = getCompilingSchema$1.call(this, sch);
  if (_sch)
    return _sch;
  const rootId = (0, resolve_1$3.getFullPath)(this.opts.uriResolver, sch.root.baseId);
  const { es5, lines } = this.opts.code;
  const { ownProperties } = this.opts;
  const gen = new codegen_1$S.CodeGen(this.scope, { es5, lines, ownProperties });
  let _ValidationError;
  if (sch.$async) {
    _ValidationError = gen.scopeValue("Error", {
      ref: validation_error_1$1.default,
      code: (0, codegen_1$S._)`require("ajv/dist/runtime/validation_error").default`
    });
  }
  const validateName = gen.scopeName("validate");
  sch.validateName = validateName;
  const schemaCxt = {
    gen,
    allErrors: this.opts.allErrors,
    data: names_1$9.default.data,
    parentData: names_1$9.default.parentData,
    parentDataProperty: names_1$9.default.parentDataProperty,
    dataNames: [names_1$9.default.data],
    dataPathArr: [codegen_1$S.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1$S.stringify)(sch.schema) } : { ref: sch.schema }),
    validateName,
    ValidationError: _ValidationError,
    schema: sch.schema,
    schemaEnv: sch,
    rootId,
    baseId: sch.baseId || rootId,
    schemaPath: codegen_1$S.nil,
    errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, codegen_1$S._)`""`,
    opts: this.opts,
    self: this
  };
  let sourceCode;
  try {
    this._compilations.add(sch);
    (0, validate_1$3.validateFunctionCode)(schemaCxt);
    gen.optimize(this.opts.code.optimize);
    const validateCode = gen.toString();
    sourceCode = `${gen.scopeRefs(names_1$9.default.scope)}return ${validateCode}`;
    if (this.opts.code.process)
      sourceCode = this.opts.code.process(sourceCode, sch);
    const makeValidate = new Function(`${names_1$9.default.self}`, `${names_1$9.default.scope}`, sourceCode);
    const validate2 = makeValidate(this, this.scope.get());
    this.scope.value(validateName, { ref: validate2 });
    validate2.errors = null;
    validate2.schema = sch.schema;
    validate2.schemaEnv = sch;
    if (sch.$async)
      validate2.$async = true;
    if (this.opts.code.source === true) {
      validate2.source = { validateName, validateCode, scopeValues: gen._values };
    }
    if (this.opts.unevaluated) {
      const { props, items: items2 } = schemaCxt;
      validate2.evaluated = {
        props: props instanceof codegen_1$S.Name ? void 0 : props,
        items: items2 instanceof codegen_1$S.Name ? void 0 : items2,
        dynamicProps: props instanceof codegen_1$S.Name,
        dynamicItems: items2 instanceof codegen_1$S.Name
      };
      if (validate2.source)
        validate2.source.evaluated = (0, codegen_1$S.stringify)(validate2.evaluated);
    }
    sch.validate = validate2;
    return sch;
  } catch (e) {
    delete sch.validate;
    delete sch.validateName;
    if (sourceCode)
      this.logger.error("Error compiling schema, function code:", sourceCode);
    throw e;
  } finally {
    this._compilations.delete(sch);
  }
}
compile$1.compileSchema = compileSchema$1;
function resolveRef$1(root, baseId, ref2) {
  var _a;
  ref2 = (0, resolve_1$3.resolveUrl)(this.opts.uriResolver, baseId, ref2);
  const schOrFunc = root.refs[ref2];
  if (schOrFunc)
    return schOrFunc;
  let _sch = resolve$3.call(this, root, ref2);
  if (_sch === void 0) {
    const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref2];
    const { schemaId } = this.opts;
    if (schema)
      _sch = new SchemaEnv$1({ schema, schemaId, root, baseId });
  }
  if (_sch === void 0)
    return;
  return root.refs[ref2] = inlineOrCompile$1.call(this, _sch);
}
compile$1.resolveRef = resolveRef$1;
function inlineOrCompile$1(sch) {
  if ((0, resolve_1$3.inlineRef)(sch.schema, this.opts.inlineRefs))
    return sch.schema;
  return sch.validate ? sch : compileSchema$1.call(this, sch);
}
function getCompilingSchema$1(schEnv) {
  for (const sch of this._compilations) {
    if (sameSchemaEnv$1(sch, schEnv))
      return sch;
  }
}
compile$1.getCompilingSchema = getCompilingSchema$1;
function sameSchemaEnv$1(s1, s2) {
  return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
function resolve$3(root, ref2) {
  let sch;
  while (typeof (sch = this.refs[ref2]) == "string")
    ref2 = sch;
  return sch || this.schemas[ref2] || resolveSchema$1.call(this, root, ref2);
}
function resolveSchema$1(root, ref2) {
  const p = this.opts.uriResolver.parse(ref2);
  const refPath = (0, resolve_1$3._getFullPath)(this.opts.uriResolver, p);
  let baseId = (0, resolve_1$3.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
  if (Object.keys(root.schema).length > 0 && refPath === baseId) {
    return getJsonPointer$1.call(this, p, root);
  }
  const id2 = (0, resolve_1$3.normalizeId)(refPath);
  const schOrRef = this.refs[id2] || this.schemas[id2];
  if (typeof schOrRef == "string") {
    const sch = resolveSchema$1.call(this, root, schOrRef);
    if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
      return;
    return getJsonPointer$1.call(this, p, sch);
  }
  if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
    return;
  if (!schOrRef.validate)
    compileSchema$1.call(this, schOrRef);
  if (id2 === (0, resolve_1$3.normalizeId)(ref2)) {
    const { schema } = schOrRef;
    const { schemaId } = this.opts;
    const schId = schema[schemaId];
    if (schId)
      baseId = (0, resolve_1$3.resolveUrl)(this.opts.uriResolver, baseId, schId);
    return new SchemaEnv$1({ schema, schemaId, root, baseId });
  }
  return getJsonPointer$1.call(this, p, schOrRef);
}
compile$1.resolveSchema = resolveSchema$1;
const PREVENT_SCOPE_CHANGE$1 = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function getJsonPointer$1(parsedRef, { baseId, schema, root }) {
  var _a;
  if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
    return;
  for (const part of parsedRef.fragment.slice(1).split("/")) {
    if (typeof schema === "boolean")
      return;
    const partSchema = schema[(0, util_1$L.unescapeFragment)(part)];
    if (partSchema === void 0)
      return;
    schema = partSchema;
    const schId = typeof schema === "object" && schema[this.opts.schemaId];
    if (!PREVENT_SCOPE_CHANGE$1.has(part) && schId) {
      baseId = (0, resolve_1$3.resolveUrl)(this.opts.uriResolver, baseId, schId);
    }
  }
  let env2;
  if (typeof schema != "boolean" && schema.$ref && !(0, util_1$L.schemaHasRulesButRef)(schema, this.RULES)) {
    const $ref = (0, resolve_1$3.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
    env2 = resolveSchema$1.call(this, root, $ref);
  }
  const { schemaId } = this.opts;
  env2 = env2 || new SchemaEnv$1({ schema, schemaId, root, baseId });
  if (env2.schema !== env2.root.schema)
    return env2;
  return void 0;
}
const $id$3 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
const description$1 = "Meta-schema for $data reference (JSON AnySchema extension proposal)";
const type$4 = "object";
const required$3 = [
  "$data"
];
const properties$5 = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
};
const additionalProperties$3 = false;
const require$$9$1 = {
  $id: $id$3,
  description: description$1,
  type: type$4,
  required: required$3,
  properties: properties$5,
  additionalProperties: additionalProperties$3
};
var uri$3 = {};
var fastUri$1 = { exports: {} };
const isUUID$1 = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu);
const isIPv4$1 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function stringArrayToHexStripped(input) {
  let acc = "";
  let code2 = 0;
  let i = 0;
  for (i = 0; i < input.length; i++) {
    code2 = input[i].charCodeAt(0);
    if (code2 === 48) {
      continue;
    }
    if (!(code2 >= 48 && code2 <= 57 || code2 >= 65 && code2 <= 70 || code2 >= 97 && code2 <= 102)) {
      return "";
    }
    acc += input[i];
    break;
  }
  for (i += 1; i < input.length; i++) {
    code2 = input[i].charCodeAt(0);
    if (!(code2 >= 48 && code2 <= 57 || code2 >= 65 && code2 <= 70 || code2 >= 97 && code2 <= 102)) {
      return "";
    }
    acc += input[i];
  }
  return acc;
}
const nonSimpleDomain$1 = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function consumeIsZone(buffer) {
  buffer.length = 0;
  return true;
}
function consumeHextets(buffer, address, output) {
  if (buffer.length) {
    const hex = stringArrayToHexStripped(buffer);
    if (hex !== "") {
      address.push(hex);
    } else {
      output.error = true;
      return false;
    }
    buffer.length = 0;
  }
  return true;
}
function getIPV6(input) {
  let tokenCount = 0;
  const output = { error: false, address: "", zone: "" };
  const address = [];
  const buffer = [];
  let endipv6Encountered = false;
  let endIpv6 = false;
  let consume = consumeHextets;
  for (let i = 0; i < input.length; i++) {
    const cursor = input[i];
    if (cursor === "[" || cursor === "]") {
      continue;
    }
    if (cursor === ":") {
      if (endipv6Encountered === true) {
        endIpv6 = true;
      }
      if (!consume(buffer, address, output)) {
        break;
      }
      if (++tokenCount > 7) {
        output.error = true;
        break;
      }
      if (i > 0 && input[i - 1] === ":") {
        endipv6Encountered = true;
      }
      address.push(":");
      continue;
    } else if (cursor === "%") {
      if (!consume(buffer, address, output)) {
        break;
      }
      consume = consumeIsZone;
    } else {
      buffer.push(cursor);
      continue;
    }
  }
  if (buffer.length) {
    if (consume === consumeIsZone) {
      output.zone = buffer.join("");
    } else if (endIpv6) {
      address.push(buffer.join(""));
    } else {
      address.push(stringArrayToHexStripped(buffer));
    }
  }
  output.address = address.join("");
  return output;
}
function normalizeIPv6$1(host) {
  if (findToken(host, ":") < 2) {
    return { host, isIPV6: false };
  }
  const ipv6 = getIPV6(host);
  if (!ipv6.error) {
    let newHost = ipv6.address;
    let escapedHost = ipv6.address;
    if (ipv6.zone) {
      newHost += "%" + ipv6.zone;
      escapedHost += "%25" + ipv6.zone;
    }
    return { host: newHost, isIPV6: true, escapedHost };
  } else {
    return { host, isIPV6: false };
  }
}
function findToken(str, token) {
  let ind = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === token) ind++;
  }
  return ind;
}
function removeDotSegments$1(path2) {
  let input = path2;
  const output = [];
  let nextSlash = -1;
  let len = 0;
  while (len = input.length) {
    if (len === 1) {
      if (input === ".") {
        break;
      } else if (input === "/") {
        output.push("/");
        break;
      } else {
        output.push(input);
        break;
      }
    } else if (len === 2) {
      if (input[0] === ".") {
        if (input[1] === ".") {
          break;
        } else if (input[1] === "/") {
          input = input.slice(2);
          continue;
        }
      } else if (input[0] === "/") {
        if (input[1] === "." || input[1] === "/") {
          output.push("/");
          break;
        }
      }
    } else if (len === 3) {
      if (input === "/..") {
        if (output.length !== 0) {
          output.pop();
        }
        output.push("/");
        break;
      }
    }
    if (input[0] === ".") {
      if (input[1] === ".") {
        if (input[2] === "/") {
          input = input.slice(3);
          continue;
        }
      } else if (input[1] === "/") {
        input = input.slice(2);
        continue;
      }
    } else if (input[0] === "/") {
      if (input[1] === ".") {
        if (input[2] === "/") {
          input = input.slice(2);
          continue;
        } else if (input[2] === ".") {
          if (input[3] === "/") {
            input = input.slice(3);
            if (output.length !== 0) {
              output.pop();
            }
            continue;
          }
        }
      }
    }
    if ((nextSlash = input.indexOf("/", 1)) === -1) {
      output.push(input);
      break;
    } else {
      output.push(input.slice(0, nextSlash));
      input = input.slice(nextSlash);
    }
  }
  return output.join("");
}
function normalizeComponentEncoding$1(component, esc) {
  const func = esc !== true ? escape : unescape;
  if (component.scheme !== void 0) {
    component.scheme = func(component.scheme);
  }
  if (component.userinfo !== void 0) {
    component.userinfo = func(component.userinfo);
  }
  if (component.host !== void 0) {
    component.host = func(component.host);
  }
  if (component.path !== void 0) {
    component.path = func(component.path);
  }
  if (component.query !== void 0) {
    component.query = func(component.query);
  }
  if (component.fragment !== void 0) {
    component.fragment = func(component.fragment);
  }
  return component;
}
function recomposeAuthority$1(component) {
  const uriTokens = [];
  if (component.userinfo !== void 0) {
    uriTokens.push(component.userinfo);
    uriTokens.push("@");
  }
  if (component.host !== void 0) {
    let host = unescape(component.host);
    if (!isIPv4$1(host)) {
      const ipV6res = normalizeIPv6$1(host);
      if (ipV6res.isIPV6 === true) {
        host = `[${ipV6res.escapedHost}]`;
      } else {
        host = component.host;
      }
    }
    uriTokens.push(host);
  }
  if (typeof component.port === "number" || typeof component.port === "string") {
    uriTokens.push(":");
    uriTokens.push(String(component.port));
  }
  return uriTokens.length ? uriTokens.join("") : void 0;
}
var utils = {
  nonSimpleDomain: nonSimpleDomain$1,
  recomposeAuthority: recomposeAuthority$1,
  normalizeComponentEncoding: normalizeComponentEncoding$1,
  removeDotSegments: removeDotSegments$1,
  isIPv4: isIPv4$1,
  isUUID: isUUID$1,
  normalizeIPv6: normalizeIPv6$1
};
const { isUUID } = utils;
const URN_REG = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function wsIsSecure(wsComponent) {
  if (wsComponent.secure === true) {
    return true;
  } else if (wsComponent.secure === false) {
    return false;
  } else if (wsComponent.scheme) {
    return wsComponent.scheme.length === 3 && (wsComponent.scheme[0] === "w" || wsComponent.scheme[0] === "W") && (wsComponent.scheme[1] === "s" || wsComponent.scheme[1] === "S") && (wsComponent.scheme[2] === "s" || wsComponent.scheme[2] === "S");
  } else {
    return false;
  }
}
function httpParse(component) {
  if (!component.host) {
    component.error = component.error || "HTTP URIs must have a host.";
  }
  return component;
}
function httpSerialize(component) {
  const secure = String(component.scheme).toLowerCase() === "https";
  if (component.port === (secure ? 443 : 80) || component.port === "") {
    component.port = void 0;
  }
  if (!component.path) {
    component.path = "/";
  }
  return component;
}
function wsParse(wsComponent) {
  wsComponent.secure = wsIsSecure(wsComponent);
  wsComponent.resourceName = (wsComponent.path || "/") + (wsComponent.query ? "?" + wsComponent.query : "");
  wsComponent.path = void 0;
  wsComponent.query = void 0;
  return wsComponent;
}
function wsSerialize(wsComponent) {
  if (wsComponent.port === (wsIsSecure(wsComponent) ? 443 : 80) || wsComponent.port === "") {
    wsComponent.port = void 0;
  }
  if (typeof wsComponent.secure === "boolean") {
    wsComponent.scheme = wsComponent.secure ? "wss" : "ws";
    wsComponent.secure = void 0;
  }
  if (wsComponent.resourceName) {
    const [path2, query] = wsComponent.resourceName.split("?");
    wsComponent.path = path2 && path2 !== "/" ? path2 : void 0;
    wsComponent.query = query;
    wsComponent.resourceName = void 0;
  }
  wsComponent.fragment = void 0;
  return wsComponent;
}
function urnParse(urnComponent, options) {
  if (!urnComponent.path) {
    urnComponent.error = "URN can not be parsed";
    return urnComponent;
  }
  const matches = urnComponent.path.match(URN_REG);
  if (matches) {
    const scheme = options.scheme || urnComponent.scheme || "urn";
    urnComponent.nid = matches[1].toLowerCase();
    urnComponent.nss = matches[2];
    const urnScheme = `${scheme}:${options.nid || urnComponent.nid}`;
    const schemeHandler = getSchemeHandler$1(urnScheme);
    urnComponent.path = void 0;
    if (schemeHandler) {
      urnComponent = schemeHandler.parse(urnComponent, options);
    }
  } else {
    urnComponent.error = urnComponent.error || "URN can not be parsed.";
  }
  return urnComponent;
}
function urnSerialize(urnComponent, options) {
  if (urnComponent.nid === void 0) {
    throw new Error("URN without nid cannot be serialized");
  }
  const scheme = options.scheme || urnComponent.scheme || "urn";
  const nid = urnComponent.nid.toLowerCase();
  const urnScheme = `${scheme}:${options.nid || nid}`;
  const schemeHandler = getSchemeHandler$1(urnScheme);
  if (schemeHandler) {
    urnComponent = schemeHandler.serialize(urnComponent, options);
  }
  const uriComponent = urnComponent;
  const nss = urnComponent.nss;
  uriComponent.path = `${nid || options.nid}:${nss}`;
  options.skipEscape = true;
  return uriComponent;
}
function urnuuidParse(urnComponent, options) {
  const uuidComponent = urnComponent;
  uuidComponent.uuid = uuidComponent.nss;
  uuidComponent.nss = void 0;
  if (!options.tolerant && (!uuidComponent.uuid || !isUUID(uuidComponent.uuid))) {
    uuidComponent.error = uuidComponent.error || "UUID is not valid.";
  }
  return uuidComponent;
}
function urnuuidSerialize(uuidComponent) {
  const urnComponent = uuidComponent;
  urnComponent.nss = (uuidComponent.uuid || "").toLowerCase();
  return urnComponent;
}
const http = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: true,
    parse: httpParse,
    serialize: httpSerialize
  }
);
const https = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: http.domainHost,
    parse: httpParse,
    serialize: httpSerialize
  }
);
const ws = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: true,
    parse: wsParse,
    serialize: wsSerialize
  }
);
const wss = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: ws.domainHost,
    parse: ws.parse,
    serialize: ws.serialize
  }
);
const urn = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: urnParse,
    serialize: urnSerialize,
    skipNormalize: true
  }
);
const urnuuid = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: urnuuidParse,
    serialize: urnuuidSerialize,
    skipNormalize: true
  }
);
const SCHEMES$1 = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http,
    https,
    ws,
    wss,
    urn,
    "urn:uuid": urnuuid
  }
);
Object.setPrototypeOf(SCHEMES$1, null);
function getSchemeHandler$1(scheme) {
  return scheme && (SCHEMES$1[
    /** @type {SchemeName} */
    scheme
  ] || SCHEMES$1[
    /** @type {SchemeName} */
    scheme.toLowerCase()
  ]) || void 0;
}
var schemes = {
  SCHEMES: SCHEMES$1,
  getSchemeHandler: getSchemeHandler$1
};
const { normalizeIPv6, removeDotSegments, recomposeAuthority, normalizeComponentEncoding, isIPv4, nonSimpleDomain } = utils;
const { SCHEMES, getSchemeHandler } = schemes;
function normalize(uri2, options) {
  if (typeof uri2 === "string") {
    uri2 = /** @type {T} */
    serialize(parse$a(uri2, options), options);
  } else if (typeof uri2 === "object") {
    uri2 = /** @type {T} */
    parse$a(serialize(uri2, options), options);
  }
  return uri2;
}
function resolve$2(baseURI, relativeURI, options) {
  const schemelessOptions = options ? Object.assign({ scheme: "null" }, options) : { scheme: "null" };
  const resolved = resolveComponent(parse$a(baseURI, schemelessOptions), parse$a(relativeURI, schemelessOptions), schemelessOptions, true);
  schemelessOptions.skipEscape = true;
  return serialize(resolved, schemelessOptions);
}
function resolveComponent(base, relative, options, skipNormalization) {
  const target = {};
  if (!skipNormalization) {
    base = parse$a(serialize(base, options), options);
    relative = parse$a(serialize(relative, options), options);
  }
  options = options || {};
  if (!options.tolerant && relative.scheme) {
    target.scheme = relative.scheme;
    target.userinfo = relative.userinfo;
    target.host = relative.host;
    target.port = relative.port;
    target.path = removeDotSegments(relative.path || "");
    target.query = relative.query;
  } else {
    if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
      target.userinfo = relative.userinfo;
      target.host = relative.host;
      target.port = relative.port;
      target.path = removeDotSegments(relative.path || "");
      target.query = relative.query;
    } else {
      if (!relative.path) {
        target.path = base.path;
        if (relative.query !== void 0) {
          target.query = relative.query;
        } else {
          target.query = base.query;
        }
      } else {
        if (relative.path[0] === "/") {
          target.path = removeDotSegments(relative.path);
        } else {
          if ((base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0) && !base.path) {
            target.path = "/" + relative.path;
          } else if (!base.path) {
            target.path = relative.path;
          } else {
            target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
          }
          target.path = removeDotSegments(target.path);
        }
        target.query = relative.query;
      }
      target.userinfo = base.userinfo;
      target.host = base.host;
      target.port = base.port;
    }
    target.scheme = base.scheme;
  }
  target.fragment = relative.fragment;
  return target;
}
function equal$5(uriA, uriB, options) {
  if (typeof uriA === "string") {
    uriA = unescape(uriA);
    uriA = serialize(normalizeComponentEncoding(parse$a(uriA, options), true), { ...options, skipEscape: true });
  } else if (typeof uriA === "object") {
    uriA = serialize(normalizeComponentEncoding(uriA, true), { ...options, skipEscape: true });
  }
  if (typeof uriB === "string") {
    uriB = unescape(uriB);
    uriB = serialize(normalizeComponentEncoding(parse$a(uriB, options), true), { ...options, skipEscape: true });
  } else if (typeof uriB === "object") {
    uriB = serialize(normalizeComponentEncoding(uriB, true), { ...options, skipEscape: true });
  }
  return uriA.toLowerCase() === uriB.toLowerCase();
}
function serialize(cmpts, opts) {
  const component = {
    host: cmpts.host,
    scheme: cmpts.scheme,
    userinfo: cmpts.userinfo,
    port: cmpts.port,
    path: cmpts.path,
    query: cmpts.query,
    nid: cmpts.nid,
    nss: cmpts.nss,
    uuid: cmpts.uuid,
    fragment: cmpts.fragment,
    reference: cmpts.reference,
    resourceName: cmpts.resourceName,
    secure: cmpts.secure,
    error: ""
  };
  const options = Object.assign({}, opts);
  const uriTokens = [];
  const schemeHandler = getSchemeHandler(options.scheme || component.scheme);
  if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(component, options);
  if (component.path !== void 0) {
    if (!options.skipEscape) {
      component.path = escape(component.path);
      if (component.scheme !== void 0) {
        component.path = component.path.split("%3A").join(":");
      }
    } else {
      component.path = unescape(component.path);
    }
  }
  if (options.reference !== "suffix" && component.scheme) {
    uriTokens.push(component.scheme, ":");
  }
  const authority = recomposeAuthority(component);
  if (authority !== void 0) {
    if (options.reference !== "suffix") {
      uriTokens.push("//");
    }
    uriTokens.push(authority);
    if (component.path && component.path[0] !== "/") {
      uriTokens.push("/");
    }
  }
  if (component.path !== void 0) {
    let s = component.path;
    if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
      s = removeDotSegments(s);
    }
    if (authority === void 0 && s[0] === "/" && s[1] === "/") {
      s = "/%2F" + s.slice(2);
    }
    uriTokens.push(s);
  }
  if (component.query !== void 0) {
    uriTokens.push("?", component.query);
  }
  if (component.fragment !== void 0) {
    uriTokens.push("#", component.fragment);
  }
  return uriTokens.join("");
}
const URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function parse$a(uri2, opts) {
  const options = Object.assign({}, opts);
  const parsed = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  };
  let isIP = false;
  if (options.reference === "suffix") {
    if (options.scheme) {
      uri2 = options.scheme + ":" + uri2;
    } else {
      uri2 = "//" + uri2;
    }
  }
  const matches = uri2.match(URI_PARSE);
  if (matches) {
    parsed.scheme = matches[1];
    parsed.userinfo = matches[3];
    parsed.host = matches[4];
    parsed.port = parseInt(matches[5], 10);
    parsed.path = matches[6] || "";
    parsed.query = matches[7];
    parsed.fragment = matches[8];
    if (isNaN(parsed.port)) {
      parsed.port = matches[5];
    }
    if (parsed.host) {
      const ipv4result = isIPv4(parsed.host);
      if (ipv4result === false) {
        const ipv6result = normalizeIPv6(parsed.host);
        parsed.host = ipv6result.host.toLowerCase();
        isIP = ipv6result.isIPV6;
      } else {
        isIP = true;
      }
    }
    if (parsed.scheme === void 0 && parsed.userinfo === void 0 && parsed.host === void 0 && parsed.port === void 0 && parsed.query === void 0 && !parsed.path) {
      parsed.reference = "same-document";
    } else if (parsed.scheme === void 0) {
      parsed.reference = "relative";
    } else if (parsed.fragment === void 0) {
      parsed.reference = "absolute";
    } else {
      parsed.reference = "uri";
    }
    if (options.reference && options.reference !== "suffix" && options.reference !== parsed.reference) {
      parsed.error = parsed.error || "URI is not a " + options.reference + " reference.";
    }
    const schemeHandler = getSchemeHandler(options.scheme || parsed.scheme);
    if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
      if (parsed.host && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP === false && nonSimpleDomain(parsed.host)) {
        try {
          parsed.host = URL.domainToASCII(parsed.host.toLowerCase());
        } catch (e) {
          parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e;
        }
      }
    }
    if (!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) {
      if (uri2.indexOf("%") !== -1) {
        if (parsed.scheme !== void 0) {
          parsed.scheme = unescape(parsed.scheme);
        }
        if (parsed.host !== void 0) {
          parsed.host = unescape(parsed.host);
        }
      }
      if (parsed.path) {
        parsed.path = escape(unescape(parsed.path));
      }
      if (parsed.fragment) {
        parsed.fragment = encodeURI(decodeURIComponent(parsed.fragment));
      }
    }
    if (schemeHandler && schemeHandler.parse) {
      schemeHandler.parse(parsed, options);
    }
  } else {
    parsed.error = parsed.error || "URI can not be parsed.";
  }
  return parsed;
}
const fastUri = {
  SCHEMES,
  normalize,
  resolve: resolve$2,
  resolveComponent,
  equal: equal$5,
  serialize,
  parse: parse$a
};
fastUri$1.exports = fastUri;
fastUri$1.exports.default = fastUri;
fastUri$1.exports.fastUri = fastUri;
var fastUriExports = fastUri$1.exports;
Object.defineProperty(uri$3, "__esModule", { value: true });
const uri$2 = fastUriExports;
uri$2.code = 'require("ajv/dist/runtime/uri").default';
uri$3.default = uri$2;
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.CodeGen = exports$1.Name = exports$1.nil = exports$1.stringify = exports$1.str = exports$1._ = exports$1.KeywordCxt = void 0;
  var validate_12 = validate$1;
  Object.defineProperty(exports$1, "KeywordCxt", { enumerable: true, get: function() {
    return validate_12.KeywordCxt;
  } });
  var codegen_12 = codegen$1;
  Object.defineProperty(exports$1, "_", { enumerable: true, get: function() {
    return codegen_12._;
  } });
  Object.defineProperty(exports$1, "str", { enumerable: true, get: function() {
    return codegen_12.str;
  } });
  Object.defineProperty(exports$1, "stringify", { enumerable: true, get: function() {
    return codegen_12.stringify;
  } });
  Object.defineProperty(exports$1, "nil", { enumerable: true, get: function() {
    return codegen_12.nil;
  } });
  Object.defineProperty(exports$1, "Name", { enumerable: true, get: function() {
    return codegen_12.Name;
  } });
  Object.defineProperty(exports$1, "CodeGen", { enumerable: true, get: function() {
    return codegen_12.CodeGen;
  } });
  const validation_error_12 = validation_error$1;
  const ref_error_12 = ref_error$1;
  const rules_12 = rules$1;
  const compile_12 = compile$1;
  const codegen_2 = codegen$1;
  const resolve_12 = resolve$4;
  const dataType_12 = dataType$1;
  const util_12 = util$1;
  const $dataRefSchema = require$$9$1;
  const uri_1 = uri$3;
  const defaultRegExp = (str, flags) => new RegExp(str, flags);
  defaultRegExp.code = "new RegExp";
  const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
  const EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]);
  const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  };
  const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  };
  const MAX_EXPRESSION = 200;
  function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    const s = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
    const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
    const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
    return {
      strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
      strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
      strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
      strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
      strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
      code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
      loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
      loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
      meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
      messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
      inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
      schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
      addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
      validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
      validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
      unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
      int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
      uriResolver
    };
  }
  class Ajv {
    constructor(opts = {}) {
      this.schemas = {};
      this.refs = {};
      this.formats = {};
      this._compilations = /* @__PURE__ */ new Set();
      this._loading = {};
      this._cache = /* @__PURE__ */ new Map();
      opts = this.opts = { ...opts, ...requiredOptions(opts) };
      const { es5, lines } = this.opts.code;
      this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
      this.logger = getLogger(opts.logger);
      const formatOpt = opts.validateFormats;
      opts.validateFormats = false;
      this.RULES = (0, rules_12.getRules)();
      checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
      checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
      this._metaOpts = getMetaSchemaOptions.call(this);
      if (opts.formats)
        addInitialFormats.call(this);
      this._addVocabularies();
      this._addDefaultMetaSchema();
      if (opts.keywords)
        addInitialKeywords.call(this, opts.keywords);
      if (typeof opts.meta == "object")
        this.addMetaSchema(opts.meta);
      addInitialSchemas.call(this);
      opts.validateFormats = formatOpt;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data, meta, schemaId } = this.opts;
      let _dataRefSchema = $dataRefSchema;
      if (schemaId === "id") {
        _dataRefSchema = { ...$dataRefSchema };
        _dataRefSchema.id = _dataRefSchema.$id;
        delete _dataRefSchema.$id;
      }
      if (meta && $data)
        this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
      const { meta, schemaId } = this.opts;
      return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
    }
    validate(schemaKeyRef, data) {
      let v;
      if (typeof schemaKeyRef == "string") {
        v = this.getSchema(schemaKeyRef);
        if (!v)
          throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
      } else {
        v = this.compile(schemaKeyRef);
      }
      const valid2 = v(data);
      if (!("$async" in v))
        this.errors = v.errors;
      return valid2;
    }
    compile(schema, _meta) {
      const sch = this._addSchema(schema, _meta);
      return sch.validate || this._compileSchemaEnv(sch);
    }
    compileAsync(schema, meta) {
      if (typeof this.opts.loadSchema != "function") {
        throw new Error("options.loadSchema should be a function");
      }
      const { loadSchema } = this.opts;
      return runCompileAsync.call(this, schema, meta);
      async function runCompileAsync(_schema, _meta) {
        await loadMetaSchema.call(this, _schema.$schema);
        const sch = this._addSchema(_schema, _meta);
        return sch.validate || _compileAsync.call(this, sch);
      }
      async function loadMetaSchema($ref) {
        if ($ref && !this.getSchema($ref)) {
          await runCompileAsync.call(this, { $ref }, true);
        }
      }
      async function _compileAsync(sch) {
        try {
          return this._compileSchemaEnv(sch);
        } catch (e) {
          if (!(e instanceof ref_error_12.default))
            throw e;
          checkLoaded.call(this, e);
          await loadMissingSchema.call(this, e.missingSchema);
          return _compileAsync.call(this, sch);
        }
      }
      function checkLoaded({ missingSchema: ref2, missingRef }) {
        if (this.refs[ref2]) {
          throw new Error(`AnySchema ${ref2} is loaded but ${missingRef} cannot be resolved`);
        }
      }
      async function loadMissingSchema(ref2) {
        const _schema = await _loadSchema.call(this, ref2);
        if (!this.refs[ref2])
          await loadMetaSchema.call(this, _schema.$schema);
        if (!this.refs[ref2])
          this.addSchema(_schema, ref2, meta);
      }
      async function _loadSchema(ref2) {
        const p = this._loading[ref2];
        if (p)
          return p;
        try {
          return await (this._loading[ref2] = loadSchema(ref2));
        } finally {
          delete this._loading[ref2];
        }
      }
    }
    // Adds schema to the instance
    addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
      if (Array.isArray(schema)) {
        for (const sch of schema)
          this.addSchema(sch, void 0, _meta, _validateSchema);
        return this;
      }
      let id2;
      if (typeof schema === "object") {
        const { schemaId } = this.opts;
        id2 = schema[schemaId];
        if (id2 !== void 0 && typeof id2 != "string") {
          throw new Error(`schema ${schemaId} must be string`);
        }
      }
      key = (0, resolve_12.normalizeId)(key || id2);
      this._checkUnique(key);
      this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
      return this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
      this.addSchema(schema, key, true, _validateSchema);
      return this;
    }
    //  Validate schema against its meta-schema
    validateSchema(schema, throwOrLogError) {
      if (typeof schema == "boolean")
        return true;
      let $schema2;
      $schema2 = schema.$schema;
      if ($schema2 !== void 0 && typeof $schema2 != "string") {
        throw new Error("$schema must be a string");
      }
      $schema2 = $schema2 || this.opts.defaultMeta || this.defaultMeta();
      if (!$schema2) {
        this.logger.warn("meta-schema not available");
        this.errors = null;
        return true;
      }
      const valid2 = this.validate($schema2, schema);
      if (!valid2 && throwOrLogError) {
        const message = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(message);
        else
          throw new Error(message);
      }
      return valid2;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(keyRef) {
      let sch;
      while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
        keyRef = sch;
      if (sch === void 0) {
        const { schemaId } = this.opts;
        const root = new compile_12.SchemaEnv({ schema: {}, schemaId });
        sch = compile_12.resolveSchema.call(this, root, keyRef);
        if (!sch)
          return;
        this.refs[keyRef] = sch;
      }
      return sch.validate || this._compileSchemaEnv(sch);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(schemaKeyRef) {
      if (schemaKeyRef instanceof RegExp) {
        this._removeAllSchemas(this.schemas, schemaKeyRef);
        this._removeAllSchemas(this.refs, schemaKeyRef);
        return this;
      }
      switch (typeof schemaKeyRef) {
        case "undefined":
          this._removeAllSchemas(this.schemas);
          this._removeAllSchemas(this.refs);
          this._cache.clear();
          return this;
        case "string": {
          const sch = getSchEnv.call(this, schemaKeyRef);
          if (typeof sch == "object")
            this._cache.delete(sch.schema);
          delete this.schemas[schemaKeyRef];
          delete this.refs[schemaKeyRef];
          return this;
        }
        case "object": {
          const cacheKey = schemaKeyRef;
          this._cache.delete(cacheKey);
          let id2 = schemaKeyRef[this.opts.schemaId];
          if (id2) {
            id2 = (0, resolve_12.normalizeId)(id2);
            delete this.schemas[id2];
            delete this.refs[id2];
          }
          return this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(definitions2) {
      for (const def2 of definitions2)
        this.addKeyword(def2);
      return this;
    }
    addKeyword(kwdOrDef, def2) {
      let keyword2;
      if (typeof kwdOrDef == "string") {
        keyword2 = kwdOrDef;
        if (typeof def2 == "object") {
          this.logger.warn("these parameters are deprecated, see docs for addKeyword");
          def2.keyword = keyword2;
        }
      } else if (typeof kwdOrDef == "object" && def2 === void 0) {
        def2 = kwdOrDef;
        keyword2 = def2.keyword;
        if (Array.isArray(keyword2) && !keyword2.length) {
          throw new Error("addKeywords: keyword must be string or non-empty array");
        }
      } else {
        throw new Error("invalid addKeywords parameters");
      }
      checkKeyword.call(this, keyword2, def2);
      if (!def2) {
        (0, util_12.eachItem)(keyword2, (kwd) => addRule.call(this, kwd));
        return this;
      }
      keywordMetaschema.call(this, def2);
      const definition = {
        ...def2,
        type: (0, dataType_12.getJSONTypes)(def2.type),
        schemaType: (0, dataType_12.getJSONTypes)(def2.schemaType)
      };
      (0, util_12.eachItem)(keyword2, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t2) => addRule.call(this, k, definition, t2)));
      return this;
    }
    getKeyword(keyword2) {
      const rule = this.RULES.all[keyword2];
      return typeof rule == "object" ? rule.definition : !!rule;
    }
    // Remove keyword
    removeKeyword(keyword2) {
      const { RULES } = this;
      delete RULES.keywords[keyword2];
      delete RULES.all[keyword2];
      for (const group of RULES.rules) {
        const i = group.rules.findIndex((rule) => rule.keyword === keyword2);
        if (i >= 0)
          group.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(name, format2) {
      if (typeof format2 == "string")
        format2 = new RegExp(format2);
      this.formats[name] = format2;
      return this;
    }
    errorsText(errors2 = this.errors, { separator = ", ", dataVar = "data" } = {}) {
      if (!errors2 || errors2.length === 0)
        return "No errors";
      return errors2.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
      const rules2 = this.RULES.all;
      metaSchema = JSON.parse(JSON.stringify(metaSchema));
      for (const jsonPointer of keywordsJsonPointers) {
        const segments = jsonPointer.split("/").slice(1);
        let keywords = metaSchema;
        for (const seg of segments)
          keywords = keywords[seg];
        for (const key in rules2) {
          const rule = rules2[key];
          if (typeof rule != "object")
            continue;
          const { $data } = rule.definition;
          const schema = keywords[key];
          if ($data && schema)
            keywords[key] = schemaOrData(schema);
        }
      }
      return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
      for (const keyRef in schemas) {
        const sch = schemas[keyRef];
        if (!regex || regex.test(keyRef)) {
          if (typeof sch == "string") {
            delete schemas[keyRef];
          } else if (sch && !sch.meta) {
            this._cache.delete(sch.schema);
            delete schemas[keyRef];
          }
        }
      }
    }
    _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
      let id2;
      const { schemaId } = this.opts;
      if (typeof schema == "object") {
        id2 = schema[schemaId];
      } else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        else if (typeof schema != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let sch = this._cache.get(schema);
      if (sch !== void 0)
        return sch;
      baseId = (0, resolve_12.normalizeId)(id2 || baseId);
      const localRefs = resolve_12.getSchemaRefs.call(this, schema, baseId);
      sch = new compile_12.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
      this._cache.set(sch.schema, sch);
      if (addSchema && !baseId.startsWith("#")) {
        if (baseId)
          this._checkUnique(baseId);
        this.refs[baseId] = sch;
      }
      if (validateSchema)
        this.validateSchema(schema, true);
      return sch;
    }
    _checkUnique(id2) {
      if (this.schemas[id2] || this.refs[id2]) {
        throw new Error(`schema with key or id "${id2}" already exists`);
      }
    }
    _compileSchemaEnv(sch) {
      if (sch.meta)
        this._compileMetaSchema(sch);
      else
        compile_12.compileSchema.call(this, sch);
      if (!sch.validate)
        throw new Error("ajv implementation error");
      return sch.validate;
    }
    _compileMetaSchema(sch) {
      const currentOpts = this.opts;
      this.opts = this._metaOpts;
      try {
        compile_12.compileSchema.call(this, sch);
      } finally {
        this.opts = currentOpts;
      }
    }
  }
  Ajv.ValidationError = validation_error_12.default;
  Ajv.MissingRefError = ref_error_12.default;
  exports$1.default = Ajv;
  function checkOptions(checkOpts, options, msg, log = "error") {
    for (const key in checkOpts) {
      const opt = key;
      if (opt in options)
        this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
    }
  }
  function getSchEnv(keyRef) {
    keyRef = (0, resolve_12.normalizeId)(keyRef);
    return this.schemas[keyRef] || this.refs[keyRef];
  }
  function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas)
      return;
    if (Array.isArray(optsSchemas))
      this.addSchema(optsSchemas);
    else
      for (const key in optsSchemas)
        this.addSchema(optsSchemas[key], key);
  }
  function addInitialFormats() {
    for (const name in this.opts.formats) {
      const format2 = this.opts.formats[name];
      if (format2)
        this.addFormat(name, format2);
    }
  }
  function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
      this.addVocabulary(defs);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const keyword2 in defs) {
      const def2 = defs[keyword2];
      if (!def2.keyword)
        def2.keyword = keyword2;
      this.addKeyword(def2);
    }
  }
  function getMetaSchemaOptions() {
    const metaOpts = { ...this.opts };
    for (const opt of META_IGNORE_OPTIONS)
      delete metaOpts[opt];
    return metaOpts;
  }
  const noLogs = { log() {
  }, warn() {
  }, error() {
  } };
  function getLogger(logger) {
    if (logger === false)
      return noLogs;
    if (logger === void 0)
      return console;
    if (logger.log && logger.warn && logger.error)
      return logger;
    throw new Error("logger must implement log, warn and error methods");
  }
  const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
  function checkKeyword(keyword2, def2) {
    const { RULES } = this;
    (0, util_12.eachItem)(keyword2, (kwd) => {
      if (RULES.keywords[kwd])
        throw new Error(`Keyword ${kwd} is already defined`);
      if (!KEYWORD_NAME.test(kwd))
        throw new Error(`Keyword ${kwd} has invalid name`);
    });
    if (!def2)
      return;
    if (def2.$data && !("code" in def2 || "validate" in def2)) {
      throw new Error('$data keyword must have "code" or "validate" function');
    }
  }
  function addRule(keyword2, definition, dataType2) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType2 && post)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t2 }) => t2 === dataType2);
    if (!ruleGroup) {
      ruleGroup = { type: dataType2, rules: [] };
      RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword2] = true;
    if (!definition)
      return;
    const rule = {
      keyword: keyword2,
      definition: {
        ...definition,
        type: (0, dataType_12.getJSONTypes)(definition.type),
        schemaType: (0, dataType_12.getJSONTypes)(definition.schemaType)
      }
    };
    if (definition.before)
      addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else
      ruleGroup.rules.push(rule);
    RULES.all[keyword2] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
  }
  function addBeforeRule(ruleGroup, rule, before) {
    const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
    if (i >= 0) {
      ruleGroup.rules.splice(i, 0, rule);
    } else {
      ruleGroup.rules.push(rule);
      this.logger.warn(`rule ${before} is not defined`);
    }
  }
  function keywordMetaschema(def2) {
    let { metaSchema } = def2;
    if (metaSchema === void 0)
      return;
    if (def2.$data && this.opts.$data)
      metaSchema = schemaOrData(metaSchema);
    def2.validateSchema = this.compile(metaSchema, true);
  }
  const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function schemaOrData(schema) {
    return { anyOf: [schema, $dataRef] };
  }
})(core$5);
var draft7$1 = {};
var core$4 = {};
var id$1 = {};
Object.defineProperty(id$1, "__esModule", { value: true });
const def$V = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
id$1.default = def$V;
var ref$1 = {};
Object.defineProperty(ref$1, "__esModule", { value: true });
ref$1.callRef = ref$1.getValidate = void 0;
const ref_error_1$3 = ref_error$1;
const code_1$j = code$3;
const codegen_1$R = codegen$1;
const names_1$8 = names$3;
const compile_1$3 = compile$1;
const util_1$K = util$1;
const def$U = {
  keyword: "$ref",
  schemaType: "string",
  code(cxt) {
    const { gen, schema: $ref, it } = cxt;
    const { baseId, schemaEnv: env2, validateName, opts, self: self2 } = it;
    const { root } = env2;
    if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
      return callRootRef();
    const schOrEnv = compile_1$3.resolveRef.call(self2, root, baseId, $ref);
    if (schOrEnv === void 0)
      throw new ref_error_1$3.default(it.opts.uriResolver, baseId, $ref);
    if (schOrEnv instanceof compile_1$3.SchemaEnv)
      return callValidate(schOrEnv);
    return inlineRefSchema(schOrEnv);
    function callRootRef() {
      if (env2 === root)
        return callRef$1(cxt, validateName, env2, env2.$async);
      const rootName = gen.scopeValue("root", { ref: root });
      return callRef$1(cxt, (0, codegen_1$R._)`${rootName}.validate`, root, root.$async);
    }
    function callValidate(sch) {
      const v = getValidate$1(cxt, sch);
      callRef$1(cxt, v, sch, sch.$async);
    }
    function inlineRefSchema(sch) {
      const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1$R.stringify)(sch) } : { ref: sch });
      const valid2 = gen.name("valid");
      const schCxt = cxt.subschema({
        schema: sch,
        dataTypes: [],
        schemaPath: codegen_1$R.nil,
        topSchemaRef: schName,
        errSchemaPath: $ref
      }, valid2);
      cxt.mergeEvaluated(schCxt);
      cxt.ok(valid2);
    }
  }
};
function getValidate$1(cxt, sch) {
  const { gen } = cxt;
  return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1$R._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
}
ref$1.getValidate = getValidate$1;
function callRef$1(cxt, v, sch, $async) {
  const { gen, it } = cxt;
  const { allErrors, schemaEnv: env2, opts } = it;
  const passCxt = opts.passContext ? names_1$8.default.this : codegen_1$R.nil;
  if ($async)
    callAsyncRef();
  else
    callSyncRef();
  function callAsyncRef() {
    if (!env2.$async)
      throw new Error("async schema referenced by sync schema");
    const valid2 = gen.let("valid");
    gen.try(() => {
      gen.code((0, codegen_1$R._)`await ${(0, code_1$j.callValidateCode)(cxt, v, passCxt)}`);
      addEvaluatedFrom(v);
      if (!allErrors)
        gen.assign(valid2, true);
    }, (e) => {
      gen.if((0, codegen_1$R._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
      addErrorsFrom(e);
      if (!allErrors)
        gen.assign(valid2, false);
    });
    cxt.ok(valid2);
  }
  function callSyncRef() {
    cxt.result((0, code_1$j.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
  }
  function addErrorsFrom(source2) {
    const errs = (0, codegen_1$R._)`${source2}.errors`;
    gen.assign(names_1$8.default.vErrors, (0, codegen_1$R._)`${names_1$8.default.vErrors} === null ? ${errs} : ${names_1$8.default.vErrors}.concat(${errs})`);
    gen.assign(names_1$8.default.errors, (0, codegen_1$R._)`${names_1$8.default.vErrors}.length`);
  }
  function addEvaluatedFrom(source2) {
    var _a;
    if (!it.opts.unevaluated)
      return;
    const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
    if (it.props !== true) {
      if (schEvaluated && !schEvaluated.dynamicProps) {
        if (schEvaluated.props !== void 0) {
          it.props = util_1$K.mergeEvaluated.props(gen, schEvaluated.props, it.props);
        }
      } else {
        const props = gen.var("props", (0, codegen_1$R._)`${source2}.evaluated.props`);
        it.props = util_1$K.mergeEvaluated.props(gen, props, it.props, codegen_1$R.Name);
      }
    }
    if (it.items !== true) {
      if (schEvaluated && !schEvaluated.dynamicItems) {
        if (schEvaluated.items !== void 0) {
          it.items = util_1$K.mergeEvaluated.items(gen, schEvaluated.items, it.items);
        }
      } else {
        const items2 = gen.var("items", (0, codegen_1$R._)`${source2}.evaluated.items`);
        it.items = util_1$K.mergeEvaluated.items(gen, items2, it.items, codegen_1$R.Name);
      }
    }
  }
}
ref$1.callRef = callRef$1;
ref$1.default = def$U;
Object.defineProperty(core$4, "__esModule", { value: true });
const id_1$1 = id$1;
const ref_1$1 = ref$1;
const core$3 = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  id_1$1.default,
  ref_1$1.default
];
core$4.default = core$3;
var validation$3 = {};
var limitNumber$1 = {};
Object.defineProperty(limitNumber$1, "__esModule", { value: true });
const codegen_1$Q = codegen$1;
const ops$1 = codegen_1$Q.operators;
const KWDs$1 = {
  maximum: { okStr: "<=", ok: ops$1.LTE, fail: ops$1.GT },
  minimum: { okStr: ">=", ok: ops$1.GTE, fail: ops$1.LT },
  exclusiveMaximum: { okStr: "<", ok: ops$1.LT, fail: ops$1.GTE },
  exclusiveMinimum: { okStr: ">", ok: ops$1.GT, fail: ops$1.LTE }
};
const error$B = {
  message: ({ keyword: keyword2, schemaCode }) => (0, codegen_1$Q.str)`must be ${KWDs$1[keyword2].okStr} ${schemaCode}`,
  params: ({ keyword: keyword2, schemaCode }) => (0, codegen_1$Q._)`{comparison: ${KWDs$1[keyword2].okStr}, limit: ${schemaCode}}`
};
const def$T = {
  keyword: Object.keys(KWDs$1),
  type: "number",
  schemaType: "number",
  $data: true,
  error: error$B,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    cxt.fail$data((0, codegen_1$Q._)`${data} ${KWDs$1[keyword2].fail} ${schemaCode} || isNaN(${data})`);
  }
};
limitNumber$1.default = def$T;
var multipleOf$1 = {};
Object.defineProperty(multipleOf$1, "__esModule", { value: true });
const codegen_1$P = codegen$1;
const error$A = {
  message: ({ schemaCode }) => (0, codegen_1$P.str)`must be multiple of ${schemaCode}`,
  params: ({ schemaCode }) => (0, codegen_1$P._)`{multipleOf: ${schemaCode}}`
};
const def$S = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: true,
  error: error$A,
  code(cxt) {
    const { gen, data, schemaCode, it } = cxt;
    const prec = it.opts.multipleOfPrecision;
    const res = gen.let("res");
    const invalid = prec ? (0, codegen_1$P._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1$P._)`${res} !== parseInt(${res})`;
    cxt.fail$data((0, codegen_1$P._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
  }
};
multipleOf$1.default = def$S;
var limitLength$1 = {};
var ucs2length$3 = {};
Object.defineProperty(ucs2length$3, "__esModule", { value: true });
function ucs2length$2(str) {
  const len = str.length;
  let length = 0;
  let pos = 0;
  let value;
  while (pos < len) {
    length++;
    value = str.charCodeAt(pos++);
    if (value >= 55296 && value <= 56319 && pos < len) {
      value = str.charCodeAt(pos);
      if ((value & 64512) === 56320)
        pos++;
    }
  }
  return length;
}
ucs2length$3.default = ucs2length$2;
ucs2length$2.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(limitLength$1, "__esModule", { value: true });
const codegen_1$O = codegen$1;
const util_1$J = util$1;
const ucs2length_1$1 = ucs2length$3;
const error$z = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxLength" ? "more" : "fewer";
    return (0, codegen_1$O.str)`must NOT have ${comp} than ${schemaCode} characters`;
  },
  params: ({ schemaCode }) => (0, codegen_1$O._)`{limit: ${schemaCode}}`
};
const def$R = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: true,
  error: error$z,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode, it } = cxt;
    const op = keyword2 === "maxLength" ? codegen_1$O.operators.GT : codegen_1$O.operators.LT;
    const len = it.opts.unicode === false ? (0, codegen_1$O._)`${data}.length` : (0, codegen_1$O._)`${(0, util_1$J.useFunc)(cxt.gen, ucs2length_1$1.default)}(${data})`;
    cxt.fail$data((0, codegen_1$O._)`${len} ${op} ${schemaCode}`);
  }
};
limitLength$1.default = def$R;
var pattern$1 = {};
Object.defineProperty(pattern$1, "__esModule", { value: true });
const code_1$i = code$3;
const codegen_1$N = codegen$1;
const error$y = {
  message: ({ schemaCode }) => (0, codegen_1$N.str)`must match pattern "${schemaCode}"`,
  params: ({ schemaCode }) => (0, codegen_1$N._)`{pattern: ${schemaCode}}`
};
const def$Q = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: true,
  error: error$y,
  code(cxt) {
    const { data, $data, schema, schemaCode, it } = cxt;
    const u = it.opts.unicodeRegExp ? "u" : "";
    const regExp = $data ? (0, codegen_1$N._)`(new RegExp(${schemaCode}, ${u}))` : (0, code_1$i.usePattern)(cxt, schema);
    cxt.fail$data((0, codegen_1$N._)`!${regExp}.test(${data})`);
  }
};
pattern$1.default = def$Q;
var limitProperties$1 = {};
Object.defineProperty(limitProperties$1, "__esModule", { value: true });
const codegen_1$M = codegen$1;
const error$x = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxProperties" ? "more" : "fewer";
    return (0, codegen_1$M.str)`must NOT have ${comp} than ${schemaCode} properties`;
  },
  params: ({ schemaCode }) => (0, codegen_1$M._)`{limit: ${schemaCode}}`
};
const def$P = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: true,
  error: error$x,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    const op = keyword2 === "maxProperties" ? codegen_1$M.operators.GT : codegen_1$M.operators.LT;
    cxt.fail$data((0, codegen_1$M._)`Object.keys(${data}).length ${op} ${schemaCode}`);
  }
};
limitProperties$1.default = def$P;
var required$2 = {};
Object.defineProperty(required$2, "__esModule", { value: true });
const code_1$h = code$3;
const codegen_1$L = codegen$1;
const util_1$I = util$1;
const error$w = {
  message: ({ params: { missingProperty } }) => (0, codegen_1$L.str)`must have required property '${missingProperty}'`,
  params: ({ params: { missingProperty } }) => (0, codegen_1$L._)`{missingProperty: ${missingProperty}}`
};
const def$O = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: true,
  error: error$w,
  code(cxt) {
    const { gen, schema, schemaCode, data, $data, it } = cxt;
    const { opts } = it;
    if (!$data && schema.length === 0)
      return;
    const useLoop = schema.length >= opts.loopRequired;
    if (it.allErrors)
      allErrorsMode();
    else
      exitOnErrorMode();
    if (opts.strictRequired) {
      const props = cxt.parentSchema.properties;
      const { definedProperties } = cxt.it;
      for (const requiredKey of schema) {
        if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
          const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
          const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
          (0, util_1$I.checkStrictMode)(it, msg, it.opts.strictRequired);
        }
      }
    }
    function allErrorsMode() {
      if (useLoop || $data) {
        cxt.block$data(codegen_1$L.nil, loopAllRequired);
      } else {
        for (const prop of schema) {
          (0, code_1$h.checkReportMissingProp)(cxt, prop);
        }
      }
    }
    function exitOnErrorMode() {
      const missing = gen.let("missing");
      if (useLoop || $data) {
        const valid2 = gen.let("valid", true);
        cxt.block$data(valid2, () => loopUntilMissing(missing, valid2));
        cxt.ok(valid2);
      } else {
        gen.if((0, code_1$h.checkMissingProp)(cxt, schema, missing));
        (0, code_1$h.reportMissingProp)(cxt, missing);
        gen.else();
      }
    }
    function loopAllRequired() {
      gen.forOf("prop", schemaCode, (prop) => {
        cxt.setParams({ missingProperty: prop });
        gen.if((0, code_1$h.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
      });
    }
    function loopUntilMissing(missing, valid2) {
      cxt.setParams({ missingProperty: missing });
      gen.forOf(missing, schemaCode, () => {
        gen.assign(valid2, (0, code_1$h.propertyInData)(gen, data, missing, opts.ownProperties));
        gen.if((0, codegen_1$L.not)(valid2), () => {
          cxt.error();
          gen.break();
        });
      }, codegen_1$L.nil);
    }
  }
};
required$2.default = def$O;
var limitItems$1 = {};
Object.defineProperty(limitItems$1, "__esModule", { value: true });
const codegen_1$K = codegen$1;
const error$v = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxItems" ? "more" : "fewer";
    return (0, codegen_1$K.str)`must NOT have ${comp} than ${schemaCode} items`;
  },
  params: ({ schemaCode }) => (0, codegen_1$K._)`{limit: ${schemaCode}}`
};
const def$N = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: true,
  error: error$v,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    const op = keyword2 === "maxItems" ? codegen_1$K.operators.GT : codegen_1$K.operators.LT;
    cxt.fail$data((0, codegen_1$K._)`${data}.length ${op} ${schemaCode}`);
  }
};
limitItems$1.default = def$N;
var uniqueItems$1 = {};
var equal$4 = {};
Object.defineProperty(equal$4, "__esModule", { value: true });
const equal$3 = fastDeepEqual;
equal$3.code = 'require("ajv/dist/runtime/equal").default';
equal$4.default = equal$3;
Object.defineProperty(uniqueItems$1, "__esModule", { value: true });
const dataType_1$2 = dataType$1;
const codegen_1$J = codegen$1;
const util_1$H = util$1;
const equal_1$5 = equal$4;
const error$u = {
  message: ({ params: { i, j } }) => (0, codegen_1$J.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
  params: ({ params: { i, j } }) => (0, codegen_1$J._)`{i: ${i}, j: ${j}}`
};
const def$M = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: true,
  error: error$u,
  code(cxt) {
    const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
    if (!$data && !schema)
      return;
    const valid2 = gen.let("valid");
    const itemTypes = parentSchema.items ? (0, dataType_1$2.getSchemaTypes)(parentSchema.items) : [];
    cxt.block$data(valid2, validateUniqueItems, (0, codegen_1$J._)`${schemaCode} === false`);
    cxt.ok(valid2);
    function validateUniqueItems() {
      const i = gen.let("i", (0, codegen_1$J._)`${data}.length`);
      const j = gen.let("j");
      cxt.setParams({ i, j });
      gen.assign(valid2, true);
      gen.if((0, codegen_1$J._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
    }
    function canOptimize() {
      return itemTypes.length > 0 && !itemTypes.some((t2) => t2 === "object" || t2 === "array");
    }
    function loopN(i, j) {
      const item = gen.name("item");
      const wrongType = (0, dataType_1$2.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1$2.DataType.Wrong);
      const indices = gen.const("indices", (0, codegen_1$J._)`{}`);
      gen.for((0, codegen_1$J._)`;${i}--;`, () => {
        gen.let(item, (0, codegen_1$J._)`${data}[${i}]`);
        gen.if(wrongType, (0, codegen_1$J._)`continue`);
        if (itemTypes.length > 1)
          gen.if((0, codegen_1$J._)`typeof ${item} == "string"`, (0, codegen_1$J._)`${item} += "_"`);
        gen.if((0, codegen_1$J._)`typeof ${indices}[${item}] == "number"`, () => {
          gen.assign(j, (0, codegen_1$J._)`${indices}[${item}]`);
          cxt.error();
          gen.assign(valid2, false).break();
        }).code((0, codegen_1$J._)`${indices}[${item}] = ${i}`);
      });
    }
    function loopN2(i, j) {
      const eql = (0, util_1$H.useFunc)(gen, equal_1$5.default);
      const outer = gen.name("outer");
      gen.label(outer).for((0, codegen_1$J._)`;${i}--;`, () => gen.for((0, codegen_1$J._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1$J._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
        cxt.error();
        gen.assign(valid2, false).break(outer);
      })));
    }
  }
};
uniqueItems$1.default = def$M;
var _const$1 = {};
Object.defineProperty(_const$1, "__esModule", { value: true });
const codegen_1$I = codegen$1;
const util_1$G = util$1;
const equal_1$4 = equal$4;
const error$t = {
  message: "must be equal to constant",
  params: ({ schemaCode }) => (0, codegen_1$I._)`{allowedValue: ${schemaCode}}`
};
const def$L = {
  keyword: "const",
  $data: true,
  error: error$t,
  code(cxt) {
    const { gen, data, $data, schemaCode, schema } = cxt;
    if ($data || schema && typeof schema == "object") {
      cxt.fail$data((0, codegen_1$I._)`!${(0, util_1$G.useFunc)(gen, equal_1$4.default)}(${data}, ${schemaCode})`);
    } else {
      cxt.fail((0, codegen_1$I._)`${schema} !== ${data}`);
    }
  }
};
_const$1.default = def$L;
var _enum$1 = {};
Object.defineProperty(_enum$1, "__esModule", { value: true });
const codegen_1$H = codegen$1;
const util_1$F = util$1;
const equal_1$3 = equal$4;
const error$s = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode }) => (0, codegen_1$H._)`{allowedValues: ${schemaCode}}`
};
const def$K = {
  keyword: "enum",
  schemaType: "array",
  $data: true,
  error: error$s,
  code(cxt) {
    const { gen, data, $data, schema, schemaCode, it } = cxt;
    if (!$data && schema.length === 0)
      throw new Error("enum must have non-empty array");
    const useLoop = schema.length >= it.opts.loopEnum;
    let eql;
    const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1$F.useFunc)(gen, equal_1$3.default);
    let valid2;
    if (useLoop || $data) {
      valid2 = gen.let("valid");
      cxt.block$data(valid2, loopEnum);
    } else {
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const vSchema = gen.const("vSchema", schemaCode);
      valid2 = (0, codegen_1$H.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
    }
    cxt.pass(valid2);
    function loopEnum() {
      gen.assign(valid2, false);
      gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1$H._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid2, true).break()));
    }
    function equalCode(vSchema, i) {
      const sch = schema[i];
      return typeof sch === "object" && sch !== null ? (0, codegen_1$H._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1$H._)`${data} === ${sch}`;
    }
  }
};
_enum$1.default = def$K;
Object.defineProperty(validation$3, "__esModule", { value: true });
const limitNumber_1$1 = limitNumber$1;
const multipleOf_1$1 = multipleOf$1;
const limitLength_1$1 = limitLength$1;
const pattern_1$1 = pattern$1;
const limitProperties_1$1 = limitProperties$1;
const required_1$1 = required$2;
const limitItems_1$1 = limitItems$1;
const uniqueItems_1$1 = uniqueItems$1;
const const_1$1 = _const$1;
const enum_1$1 = _enum$1;
const validation$2 = [
  // number
  limitNumber_1$1.default,
  multipleOf_1$1.default,
  // string
  limitLength_1$1.default,
  pattern_1$1.default,
  // object
  limitProperties_1$1.default,
  required_1$1.default,
  // array
  limitItems_1$1.default,
  uniqueItems_1$1.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  const_1$1.default,
  enum_1$1.default
];
validation$3.default = validation$2;
var applicator$1 = {};
var additionalItems$1 = {};
Object.defineProperty(additionalItems$1, "__esModule", { value: true });
additionalItems$1.validateAdditionalItems = void 0;
const codegen_1$G = codegen$1;
const util_1$E = util$1;
const error$r = {
  message: ({ params: { len } }) => (0, codegen_1$G.str)`must NOT have more than ${len} items`,
  params: ({ params: { len } }) => (0, codegen_1$G._)`{limit: ${len}}`
};
const def$J = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: error$r,
  code(cxt) {
    const { parentSchema, it } = cxt;
    const { items: items2 } = parentSchema;
    if (!Array.isArray(items2)) {
      (0, util_1$E.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    validateAdditionalItems$1(cxt, items2);
  }
};
function validateAdditionalItems$1(cxt, items2) {
  const { gen, schema, data, keyword: keyword2, it } = cxt;
  it.items = true;
  const len = gen.const("len", (0, codegen_1$G._)`${data}.length`);
  if (schema === false) {
    cxt.setParams({ len: items2.length });
    cxt.pass((0, codegen_1$G._)`${len} <= ${items2.length}`);
  } else if (typeof schema == "object" && !(0, util_1$E.alwaysValidSchema)(it, schema)) {
    const valid2 = gen.var("valid", (0, codegen_1$G._)`${len} <= ${items2.length}`);
    gen.if((0, codegen_1$G.not)(valid2), () => validateItems(valid2));
    cxt.ok(valid2);
  }
  function validateItems(valid2) {
    gen.forRange("i", items2.length, len, (i) => {
      cxt.subschema({ keyword: keyword2, dataProp: i, dataPropType: util_1$E.Type.Num }, valid2);
      if (!it.allErrors)
        gen.if((0, codegen_1$G.not)(valid2), () => gen.break());
    });
  }
}
additionalItems$1.validateAdditionalItems = validateAdditionalItems$1;
additionalItems$1.default = def$J;
var prefixItems$1 = {};
var items$1 = {};
Object.defineProperty(items$1, "__esModule", { value: true });
items$1.validateTuple = void 0;
const codegen_1$F = codegen$1;
const util_1$D = util$1;
const code_1$g = code$3;
const def$I = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(cxt) {
    const { schema, it } = cxt;
    if (Array.isArray(schema))
      return validateTuple$1(cxt, "additionalItems", schema);
    it.items = true;
    if ((0, util_1$D.alwaysValidSchema)(it, schema))
      return;
    cxt.ok((0, code_1$g.validateArray)(cxt));
  }
};
function validateTuple$1(cxt, extraItems, schArr = cxt.schema) {
  const { gen, parentSchema, data, keyword: keyword2, it } = cxt;
  checkStrictTuple(parentSchema);
  if (it.opts.unevaluated && schArr.length && it.items !== true) {
    it.items = util_1$D.mergeEvaluated.items(gen, schArr.length, it.items);
  }
  const valid2 = gen.name("valid");
  const len = gen.const("len", (0, codegen_1$F._)`${data}.length`);
  schArr.forEach((sch, i) => {
    if ((0, util_1$D.alwaysValidSchema)(it, sch))
      return;
    gen.if((0, codegen_1$F._)`${len} > ${i}`, () => cxt.subschema({
      keyword: keyword2,
      schemaProp: i,
      dataProp: i
    }, valid2));
    cxt.ok(valid2);
  });
  function checkStrictTuple(sch) {
    const { opts, errSchemaPath } = it;
    const l = schArr.length;
    const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
    if (opts.strictTuples && !fullTuple) {
      const msg = `"${keyword2}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
      (0, util_1$D.checkStrictMode)(it, msg, opts.strictTuples);
    }
  }
}
items$1.validateTuple = validateTuple$1;
items$1.default = def$I;
Object.defineProperty(prefixItems$1, "__esModule", { value: true });
const items_1$3 = items$1;
const def$H = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (cxt) => (0, items_1$3.validateTuple)(cxt, "items")
};
prefixItems$1.default = def$H;
var items2020$1 = {};
Object.defineProperty(items2020$1, "__esModule", { value: true });
const codegen_1$E = codegen$1;
const util_1$C = util$1;
const code_1$f = code$3;
const additionalItems_1$3 = additionalItems$1;
const error$q = {
  message: ({ params: { len } }) => (0, codegen_1$E.str)`must NOT have more than ${len} items`,
  params: ({ params: { len } }) => (0, codegen_1$E._)`{limit: ${len}}`
};
const def$G = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: error$q,
  code(cxt) {
    const { schema, parentSchema, it } = cxt;
    const { prefixItems: prefixItems2 } = parentSchema;
    it.items = true;
    if ((0, util_1$C.alwaysValidSchema)(it, schema))
      return;
    if (prefixItems2)
      (0, additionalItems_1$3.validateAdditionalItems)(cxt, prefixItems2);
    else
      cxt.ok((0, code_1$f.validateArray)(cxt));
  }
};
items2020$1.default = def$G;
var contains$1 = {};
Object.defineProperty(contains$1, "__esModule", { value: true });
const codegen_1$D = codegen$1;
const util_1$B = util$1;
const error$p = {
  message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1$D.str)`must contain at least ${min} valid item(s)` : (0, codegen_1$D.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
  params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1$D._)`{minContains: ${min}}` : (0, codegen_1$D._)`{minContains: ${min}, maxContains: ${max}}`
};
const def$F = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: true,
  error: error$p,
  code(cxt) {
    const { gen, schema, parentSchema, data, it } = cxt;
    let min;
    let max;
    const { minContains, maxContains } = parentSchema;
    if (it.opts.next) {
      min = minContains === void 0 ? 1 : minContains;
      max = maxContains;
    } else {
      min = 1;
    }
    const len = gen.const("len", (0, codegen_1$D._)`${data}.length`);
    cxt.setParams({ min, max });
    if (max === void 0 && min === 0) {
      (0, util_1$B.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
      return;
    }
    if (max !== void 0 && min > max) {
      (0, util_1$B.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
      cxt.fail();
      return;
    }
    if ((0, util_1$B.alwaysValidSchema)(it, schema)) {
      let cond = (0, codegen_1$D._)`${len} >= ${min}`;
      if (max !== void 0)
        cond = (0, codegen_1$D._)`${cond} && ${len} <= ${max}`;
      cxt.pass(cond);
      return;
    }
    it.items = true;
    const valid2 = gen.name("valid");
    if (max === void 0 && min === 1) {
      validateItems(valid2, () => gen.if(valid2, () => gen.break()));
    } else if (min === 0) {
      gen.let(valid2, true);
      if (max !== void 0)
        gen.if((0, codegen_1$D._)`${data}.length > 0`, validateItemsWithCount);
    } else {
      gen.let(valid2, false);
      validateItemsWithCount();
    }
    cxt.result(valid2, () => cxt.reset());
    function validateItemsWithCount() {
      const schValid = gen.name("_valid");
      const count = gen.let("count", 0);
      validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
    }
    function validateItems(_valid, block) {
      gen.forRange("i", 0, len, (i) => {
        cxt.subschema({
          keyword: "contains",
          dataProp: i,
          dataPropType: util_1$B.Type.Num,
          compositeRule: true
        }, _valid);
        block();
      });
    }
    function checkLimits(count) {
      gen.code((0, codegen_1$D._)`${count}++`);
      if (max === void 0) {
        gen.if((0, codegen_1$D._)`${count} >= ${min}`, () => gen.assign(valid2, true).break());
      } else {
        gen.if((0, codegen_1$D._)`${count} > ${max}`, () => gen.assign(valid2, false).break());
        if (min === 1)
          gen.assign(valid2, true);
        else
          gen.if((0, codegen_1$D._)`${count} >= ${min}`, () => gen.assign(valid2, true));
      }
    }
  }
};
contains$1.default = def$F;
var dependencies$1 = {};
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.validateSchemaDeps = exports$1.validatePropertyDeps = exports$1.error = void 0;
  const codegen_12 = codegen$1;
  const util_12 = util$1;
  const code_12 = code$3;
  exports$1.error = {
    message: ({ params: { property, depsCount, deps } }) => {
      const property_ies = depsCount === 1 ? "property" : "properties";
      return (0, codegen_12.str)`must have ${property_ies} ${deps} when property ${property} is present`;
    },
    params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_12._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
    // TODO change to reference
  };
  const def2 = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports$1.error,
    code(cxt) {
      const [propDeps, schDeps] = splitDependencies(cxt);
      validatePropertyDeps(cxt, propDeps);
      validateSchemaDeps(cxt, schDeps);
    }
  };
  function splitDependencies({ schema }) {
    const propertyDeps = {};
    const schemaDeps = {};
    for (const key in schema) {
      if (key === "__proto__")
        continue;
      const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
      deps[key] = schema[key];
    }
    return [propertyDeps, schemaDeps];
  }
  function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0)
      return;
    const missing = gen.let("missing");
    for (const prop in propertyDeps) {
      const deps = propertyDeps[prop];
      if (deps.length === 0)
        continue;
      const hasProperty = (0, code_12.propertyInData)(gen, data, prop, it.opts.ownProperties);
      cxt.setParams({
        property: prop,
        depsCount: deps.length,
        deps: deps.join(", ")
      });
      if (it.allErrors) {
        gen.if(hasProperty, () => {
          for (const depProp of deps) {
            (0, code_12.checkReportMissingProp)(cxt, depProp);
          }
        });
      } else {
        gen.if((0, codegen_12._)`${hasProperty} && (${(0, code_12.checkMissingProp)(cxt, deps, missing)})`);
        (0, code_12.reportMissingProp)(cxt, missing);
        gen.else();
      }
    }
  }
  exports$1.validatePropertyDeps = validatePropertyDeps;
  function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
    const { gen, data, keyword: keyword2, it } = cxt;
    const valid2 = gen.name("valid");
    for (const prop in schemaDeps) {
      if ((0, util_12.alwaysValidSchema)(it, schemaDeps[prop]))
        continue;
      gen.if(
        (0, code_12.propertyInData)(gen, data, prop, it.opts.ownProperties),
        () => {
          const schCxt = cxt.subschema({ keyword: keyword2, schemaProp: prop }, valid2);
          cxt.mergeValidEvaluated(schCxt, valid2);
        },
        () => gen.var(valid2, true)
        // TODO var
      );
      cxt.ok(valid2);
    }
  }
  exports$1.validateSchemaDeps = validateSchemaDeps;
  exports$1.default = def2;
})(dependencies$1);
var propertyNames$1 = {};
Object.defineProperty(propertyNames$1, "__esModule", { value: true });
const codegen_1$C = codegen$1;
const util_1$A = util$1;
const error$o = {
  message: "property name must be valid",
  params: ({ params }) => (0, codegen_1$C._)`{propertyName: ${params.propertyName}}`
};
const def$E = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: error$o,
  code(cxt) {
    const { gen, schema, data, it } = cxt;
    if ((0, util_1$A.alwaysValidSchema)(it, schema))
      return;
    const valid2 = gen.name("valid");
    gen.forIn("key", data, (key) => {
      cxt.setParams({ propertyName: key });
      cxt.subschema({
        keyword: "propertyNames",
        data: key,
        dataTypes: ["string"],
        propertyName: key,
        compositeRule: true
      }, valid2);
      gen.if((0, codegen_1$C.not)(valid2), () => {
        cxt.error(true);
        if (!it.allErrors)
          gen.break();
      });
    });
    cxt.ok(valid2);
  }
};
propertyNames$1.default = def$E;
var additionalProperties$2 = {};
Object.defineProperty(additionalProperties$2, "__esModule", { value: true });
const code_1$e = code$3;
const codegen_1$B = codegen$1;
const names_1$7 = names$3;
const util_1$z = util$1;
const error$n = {
  message: "must NOT have additional properties",
  params: ({ params }) => (0, codegen_1$B._)`{additionalProperty: ${params.additionalProperty}}`
};
const def$D = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: true,
  trackErrors: true,
  error: error$n,
  code(cxt) {
    const { gen, schema, parentSchema, data, errsCount, it } = cxt;
    if (!errsCount)
      throw new Error("ajv implementation error");
    const { allErrors, opts } = it;
    it.props = true;
    if (opts.removeAdditional !== "all" && (0, util_1$z.alwaysValidSchema)(it, schema))
      return;
    const props = (0, code_1$e.allSchemaProperties)(parentSchema.properties);
    const patProps = (0, code_1$e.allSchemaProperties)(parentSchema.patternProperties);
    checkAdditionalProperties();
    cxt.ok((0, codegen_1$B._)`${errsCount} === ${names_1$7.default.errors}`);
    function checkAdditionalProperties() {
      gen.forIn("key", data, (key) => {
        if (!props.length && !patProps.length)
          additionalPropertyCode(key);
        else
          gen.if(isAdditional(key), () => additionalPropertyCode(key));
      });
    }
    function isAdditional(key) {
      let definedProp;
      if (props.length > 8) {
        const propsSchema = (0, util_1$z.schemaRefOrVal)(it, parentSchema.properties, "properties");
        definedProp = (0, code_1$e.isOwnProperty)(gen, propsSchema, key);
      } else if (props.length) {
        definedProp = (0, codegen_1$B.or)(...props.map((p) => (0, codegen_1$B._)`${key} === ${p}`));
      } else {
        definedProp = codegen_1$B.nil;
      }
      if (patProps.length) {
        definedProp = (0, codegen_1$B.or)(definedProp, ...patProps.map((p) => (0, codegen_1$B._)`${(0, code_1$e.usePattern)(cxt, p)}.test(${key})`));
      }
      return (0, codegen_1$B.not)(definedProp);
    }
    function deleteAdditional(key) {
      gen.code((0, codegen_1$B._)`delete ${data}[${key}]`);
    }
    function additionalPropertyCode(key) {
      if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
        deleteAdditional(key);
        return;
      }
      if (schema === false) {
        cxt.setParams({ additionalProperty: key });
        cxt.error();
        if (!allErrors)
          gen.break();
        return;
      }
      if (typeof schema == "object" && !(0, util_1$z.alwaysValidSchema)(it, schema)) {
        const valid2 = gen.name("valid");
        if (opts.removeAdditional === "failing") {
          applyAdditionalSchema(key, valid2, false);
          gen.if((0, codegen_1$B.not)(valid2), () => {
            cxt.reset();
            deleteAdditional(key);
          });
        } else {
          applyAdditionalSchema(key, valid2);
          if (!allErrors)
            gen.if((0, codegen_1$B.not)(valid2), () => gen.break());
        }
      }
    }
    function applyAdditionalSchema(key, valid2, errors2) {
      const subschema2 = {
        keyword: "additionalProperties",
        dataProp: key,
        dataPropType: util_1$z.Type.Str
      };
      if (errors2 === false) {
        Object.assign(subschema2, {
          compositeRule: true,
          createErrors: false,
          allErrors: false
        });
      }
      cxt.subschema(subschema2, valid2);
    }
  }
};
additionalProperties$2.default = def$D;
var properties$4 = {};
Object.defineProperty(properties$4, "__esModule", { value: true });
const validate_1$2 = validate$1;
const code_1$d = code$3;
const util_1$y = util$1;
const additionalProperties_1$3 = additionalProperties$2;
const def$C = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(cxt) {
    const { gen, schema, parentSchema, data, it } = cxt;
    if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
      additionalProperties_1$3.default.code(new validate_1$2.KeywordCxt(it, additionalProperties_1$3.default, "additionalProperties"));
    }
    const allProps = (0, code_1$d.allSchemaProperties)(schema);
    for (const prop of allProps) {
      it.definedProperties.add(prop);
    }
    if (it.opts.unevaluated && allProps.length && it.props !== true) {
      it.props = util_1$y.mergeEvaluated.props(gen, (0, util_1$y.toHash)(allProps), it.props);
    }
    const properties2 = allProps.filter((p) => !(0, util_1$y.alwaysValidSchema)(it, schema[p]));
    if (properties2.length === 0)
      return;
    const valid2 = gen.name("valid");
    for (const prop of properties2) {
      if (hasDefault(prop)) {
        applyPropertySchema(prop);
      } else {
        gen.if((0, code_1$d.propertyInData)(gen, data, prop, it.opts.ownProperties));
        applyPropertySchema(prop);
        if (!it.allErrors)
          gen.else().var(valid2, true);
        gen.endIf();
      }
      cxt.it.definedProperties.add(prop);
      cxt.ok(valid2);
    }
    function hasDefault(prop) {
      return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
    }
    function applyPropertySchema(prop) {
      cxt.subschema({
        keyword: "properties",
        schemaProp: prop,
        dataProp: prop
      }, valid2);
    }
  }
};
properties$4.default = def$C;
var patternProperties$1 = {};
Object.defineProperty(patternProperties$1, "__esModule", { value: true });
const code_1$c = code$3;
const codegen_1$A = codegen$1;
const util_1$x = util$1;
const util_2$2 = util$1;
const def$B = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(cxt) {
    const { gen, schema, data, parentSchema, it } = cxt;
    const { opts } = it;
    const patterns = (0, code_1$c.allSchemaProperties)(schema);
    const alwaysValidPatterns = patterns.filter((p) => (0, util_1$x.alwaysValidSchema)(it, schema[p]));
    if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
      return;
    }
    const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
    const valid2 = gen.name("valid");
    if (it.props !== true && !(it.props instanceof codegen_1$A.Name)) {
      it.props = (0, util_2$2.evaluatedPropsToName)(gen, it.props);
    }
    const { props } = it;
    validatePatternProperties();
    function validatePatternProperties() {
      for (const pat of patterns) {
        if (checkProperties)
          checkMatchingProperties(pat);
        if (it.allErrors) {
          validateProperties(pat);
        } else {
          gen.var(valid2, true);
          validateProperties(pat);
          gen.if(valid2);
        }
      }
    }
    function checkMatchingProperties(pat) {
      for (const prop in checkProperties) {
        if (new RegExp(pat).test(prop)) {
          (0, util_1$x.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
        }
      }
    }
    function validateProperties(pat) {
      gen.forIn("key", data, (key) => {
        gen.if((0, codegen_1$A._)`${(0, code_1$c.usePattern)(cxt, pat)}.test(${key})`, () => {
          const alwaysValid = alwaysValidPatterns.includes(pat);
          if (!alwaysValid) {
            cxt.subschema({
              keyword: "patternProperties",
              schemaProp: pat,
              dataProp: key,
              dataPropType: util_2$2.Type.Str
            }, valid2);
          }
          if (it.opts.unevaluated && props !== true) {
            gen.assign((0, codegen_1$A._)`${props}[${key}]`, true);
          } else if (!alwaysValid && !it.allErrors) {
            gen.if((0, codegen_1$A.not)(valid2), () => gen.break());
          }
        });
      });
    }
  }
};
patternProperties$1.default = def$B;
var not$1 = {};
Object.defineProperty(not$1, "__esModule", { value: true });
const util_1$w = util$1;
const def$A = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  code(cxt) {
    const { gen, schema, it } = cxt;
    if ((0, util_1$w.alwaysValidSchema)(it, schema)) {
      cxt.fail();
      return;
    }
    const valid2 = gen.name("valid");
    cxt.subschema({
      keyword: "not",
      compositeRule: true,
      createErrors: false,
      allErrors: false
    }, valid2);
    cxt.failResult(valid2, () => cxt.reset(), () => cxt.error());
  },
  error: { message: "must NOT be valid" }
};
not$1.default = def$A;
var anyOf$1 = {};
Object.defineProperty(anyOf$1, "__esModule", { value: true });
const code_1$b = code$3;
const def$z = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: true,
  code: code_1$b.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
anyOf$1.default = def$z;
var oneOf$1 = {};
Object.defineProperty(oneOf$1, "__esModule", { value: true });
const codegen_1$z = codegen$1;
const util_1$v = util$1;
const error$m = {
  message: "must match exactly one schema in oneOf",
  params: ({ params }) => (0, codegen_1$z._)`{passingSchemas: ${params.passing}}`
};
const def$y = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: true,
  error: error$m,
  code(cxt) {
    const { gen, schema, parentSchema, it } = cxt;
    if (!Array.isArray(schema))
      throw new Error("ajv implementation error");
    if (it.opts.discriminator && parentSchema.discriminator)
      return;
    const schArr = schema;
    const valid2 = gen.let("valid", false);
    const passing = gen.let("passing", null);
    const schValid = gen.name("_valid");
    cxt.setParams({ passing });
    gen.block(validateOneOf);
    cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
    function validateOneOf() {
      schArr.forEach((sch, i) => {
        let schCxt;
        if ((0, util_1$v.alwaysValidSchema)(it, sch)) {
          gen.var(schValid, true);
        } else {
          schCxt = cxt.subschema({
            keyword: "oneOf",
            schemaProp: i,
            compositeRule: true
          }, schValid);
        }
        if (i > 0) {
          gen.if((0, codegen_1$z._)`${schValid} && ${valid2}`).assign(valid2, false).assign(passing, (0, codegen_1$z._)`[${passing}, ${i}]`).else();
        }
        gen.if(schValid, () => {
          gen.assign(valid2, true);
          gen.assign(passing, i);
          if (schCxt)
            cxt.mergeEvaluated(schCxt, codegen_1$z.Name);
        });
      });
    }
  }
};
oneOf$1.default = def$y;
var allOf$1 = {};
Object.defineProperty(allOf$1, "__esModule", { value: true });
const util_1$u = util$1;
const def$x = {
  keyword: "allOf",
  schemaType: "array",
  code(cxt) {
    const { gen, schema, it } = cxt;
    if (!Array.isArray(schema))
      throw new Error("ajv implementation error");
    const valid2 = gen.name("valid");
    schema.forEach((sch, i) => {
      if ((0, util_1$u.alwaysValidSchema)(it, sch))
        return;
      const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid2);
      cxt.ok(valid2);
      cxt.mergeEvaluated(schCxt);
    });
  }
};
allOf$1.default = def$x;
var _if$1 = {};
Object.defineProperty(_if$1, "__esModule", { value: true });
const codegen_1$y = codegen$1;
const util_1$t = util$1;
const error$l = {
  message: ({ params }) => (0, codegen_1$y.str)`must match "${params.ifClause}" schema`,
  params: ({ params }) => (0, codegen_1$y._)`{failingKeyword: ${params.ifClause}}`
};
const def$w = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  error: error$l,
  code(cxt) {
    const { gen, parentSchema, it } = cxt;
    if (parentSchema.then === void 0 && parentSchema.else === void 0) {
      (0, util_1$t.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
    }
    const hasThen = hasSchema$1(it, "then");
    const hasElse = hasSchema$1(it, "else");
    if (!hasThen && !hasElse)
      return;
    const valid2 = gen.let("valid", true);
    const schValid = gen.name("_valid");
    validateIf();
    cxt.reset();
    if (hasThen && hasElse) {
      const ifClause = gen.let("ifClause");
      cxt.setParams({ ifClause });
      gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
    } else if (hasThen) {
      gen.if(schValid, validateClause("then"));
    } else {
      gen.if((0, codegen_1$y.not)(schValid), validateClause("else"));
    }
    cxt.pass(valid2, () => cxt.error(true));
    function validateIf() {
      const schCxt = cxt.subschema({
        keyword: "if",
        compositeRule: true,
        createErrors: false,
        allErrors: false
      }, schValid);
      cxt.mergeEvaluated(schCxt);
    }
    function validateClause(keyword2, ifClause) {
      return () => {
        const schCxt = cxt.subschema({ keyword: keyword2 }, schValid);
        gen.assign(valid2, schValid);
        cxt.mergeValidEvaluated(schCxt, valid2);
        if (ifClause)
          gen.assign(ifClause, (0, codegen_1$y._)`${keyword2}`);
        else
          cxt.setParams({ ifClause: keyword2 });
      };
    }
  }
};
function hasSchema$1(it, keyword2) {
  const schema = it.schema[keyword2];
  return schema !== void 0 && !(0, util_1$t.alwaysValidSchema)(it, schema);
}
_if$1.default = def$w;
var thenElse$1 = {};
Object.defineProperty(thenElse$1, "__esModule", { value: true });
const util_1$s = util$1;
const def$v = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: keyword2, parentSchema, it }) {
    if (parentSchema.if === void 0)
      (0, util_1$s.checkStrictMode)(it, `"${keyword2}" without "if" is ignored`);
  }
};
thenElse$1.default = def$v;
Object.defineProperty(applicator$1, "__esModule", { value: true });
const additionalItems_1$2 = additionalItems$1;
const prefixItems_1$1 = prefixItems$1;
const items_1$2 = items$1;
const items2020_1$1 = items2020$1;
const contains_1$1 = contains$1;
const dependencies_1$1 = dependencies$1;
const propertyNames_1$1 = propertyNames$1;
const additionalProperties_1$2 = additionalProperties$2;
const properties_1$1 = properties$4;
const patternProperties_1$1 = patternProperties$1;
const not_1$1 = not$1;
const anyOf_1$1 = anyOf$1;
const oneOf_1$1 = oneOf$1;
const allOf_1$1 = allOf$1;
const if_1$1 = _if$1;
const thenElse_1$1 = thenElse$1;
function getApplicator$1(draft2020 = false) {
  const applicator2 = [
    // any
    not_1$1.default,
    anyOf_1$1.default,
    oneOf_1$1.default,
    allOf_1$1.default,
    if_1$1.default,
    thenElse_1$1.default,
    // object
    propertyNames_1$1.default,
    additionalProperties_1$2.default,
    dependencies_1$1.default,
    properties_1$1.default,
    patternProperties_1$1.default
  ];
  if (draft2020)
    applicator2.push(prefixItems_1$1.default, items2020_1$1.default);
  else
    applicator2.push(additionalItems_1$2.default, items_1$2.default);
  applicator2.push(contains_1$1.default);
  return applicator2;
}
applicator$1.default = getApplicator$1;
var format$5 = {};
var format$4 = {};
Object.defineProperty(format$4, "__esModule", { value: true });
const codegen_1$x = codegen$1;
const error$k = {
  message: ({ schemaCode }) => (0, codegen_1$x.str)`must match format "${schemaCode}"`,
  params: ({ schemaCode }) => (0, codegen_1$x._)`{format: ${schemaCode}}`
};
const def$u = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: true,
  error: error$k,
  code(cxt, ruleType) {
    const { gen, data, $data, schema, schemaCode, it } = cxt;
    const { opts, errSchemaPath, schemaEnv, self: self2 } = it;
    if (!opts.validateFormats)
      return;
    if ($data)
      validate$DataFormat();
    else
      validateFormat();
    function validate$DataFormat() {
      const fmts = gen.scopeValue("formats", {
        ref: self2.formats,
        code: opts.code.formats
      });
      const fDef = gen.const("fDef", (0, codegen_1$x._)`${fmts}[${schemaCode}]`);
      const fType = gen.let("fType");
      const format2 = gen.let("format");
      gen.if((0, codegen_1$x._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1$x._)`${fDef}.type || "string"`).assign(format2, (0, codegen_1$x._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1$x._)`"string"`).assign(format2, fDef));
      cxt.fail$data((0, codegen_1$x.or)(unknownFmt(), invalidFmt()));
      function unknownFmt() {
        if (opts.strictSchema === false)
          return codegen_1$x.nil;
        return (0, codegen_1$x._)`${schemaCode} && !${format2}`;
      }
      function invalidFmt() {
        const callFormat = schemaEnv.$async ? (0, codegen_1$x._)`(${fDef}.async ? await ${format2}(${data}) : ${format2}(${data}))` : (0, codegen_1$x._)`${format2}(${data})`;
        const validData = (0, codegen_1$x._)`(typeof ${format2} == "function" ? ${callFormat} : ${format2}.test(${data}))`;
        return (0, codegen_1$x._)`${format2} && ${format2} !== true && ${fType} === ${ruleType} && !${validData}`;
      }
    }
    function validateFormat() {
      const formatDef = self2.formats[schema];
      if (!formatDef) {
        unknownFormat();
        return;
      }
      if (formatDef === true)
        return;
      const [fmtType, format2, fmtRef] = getFormat(formatDef);
      if (fmtType === ruleType)
        cxt.pass(validCondition());
      function unknownFormat() {
        if (opts.strictSchema === false) {
          self2.logger.warn(unknownMsg());
          return;
        }
        throw new Error(unknownMsg());
        function unknownMsg() {
          return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
        }
      }
      function getFormat(fmtDef) {
        const code2 = fmtDef instanceof RegExp ? (0, codegen_1$x.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1$x._)`${opts.code.formats}${(0, codegen_1$x.getProperty)(schema)}` : void 0;
        const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code: code2 });
        if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
          return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1$x._)`${fmt}.validate`];
        }
        return ["string", fmtDef, fmt];
      }
      function validCondition() {
        if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
          if (!schemaEnv.$async)
            throw new Error("async format in sync schema");
          return (0, codegen_1$x._)`await ${fmtRef}(${data})`;
        }
        return typeof format2 == "function" ? (0, codegen_1$x._)`${fmtRef}(${data})` : (0, codegen_1$x._)`${fmtRef}.test(${data})`;
      }
    }
  }
};
format$4.default = def$u;
Object.defineProperty(format$5, "__esModule", { value: true });
const format_1$3 = format$4;
const format$3 = [format_1$3.default];
format$5.default = format$3;
var metadata$1 = {};
Object.defineProperty(metadata$1, "__esModule", { value: true });
metadata$1.contentVocabulary = metadata$1.metadataVocabulary = void 0;
metadata$1.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
metadata$1.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(draft7$1, "__esModule", { value: true });
const core_1$1 = core$4;
const validation_1$1 = validation$3;
const applicator_1$1 = applicator$1;
const format_1$2 = format$5;
const metadata_1$1 = metadata$1;
const draft7Vocabularies$1 = [
  core_1$1.default,
  validation_1$1.default,
  (0, applicator_1$1.default)(),
  format_1$2.default,
  metadata_1$1.metadataVocabulary,
  metadata_1$1.contentVocabulary
];
draft7$1.default = draft7Vocabularies$1;
var discriminator$1 = {};
var types$1 = {};
Object.defineProperty(types$1, "__esModule", { value: true });
types$1.DiscrError = void 0;
var DiscrError$1;
(function(DiscrError2) {
  DiscrError2["Tag"] = "tag";
  DiscrError2["Mapping"] = "mapping";
})(DiscrError$1 || (types$1.DiscrError = DiscrError$1 = {}));
Object.defineProperty(discriminator$1, "__esModule", { value: true });
const codegen_1$w = codegen$1;
const types_1$1 = types$1;
const compile_1$2 = compile$1;
const ref_error_1$2 = ref_error$1;
const util_1$r = util$1;
const error$j = {
  message: ({ params: { discrError, tagName } }) => discrError === types_1$1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
  params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1$w._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
};
const def$t = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: error$j,
  code(cxt) {
    const { gen, data, schema, parentSchema, it } = cxt;
    const { oneOf: oneOf2 } = parentSchema;
    if (!it.opts.discriminator) {
      throw new Error("discriminator: requires discriminator option");
    }
    const tagName = schema.propertyName;
    if (typeof tagName != "string")
      throw new Error("discriminator: requires propertyName");
    if (schema.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!oneOf2)
      throw new Error("discriminator: requires oneOf keyword");
    const valid2 = gen.let("valid", false);
    const tag = gen.const("tag", (0, codegen_1$w._)`${data}${(0, codegen_1$w.getProperty)(tagName)}`);
    gen.if((0, codegen_1$w._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1$1.DiscrError.Tag, tag, tagName }));
    cxt.ok(valid2);
    function validateMapping() {
      const mapping = getMapping();
      gen.if(false);
      for (const tagValue in mapping) {
        gen.elseIf((0, codegen_1$w._)`${tag} === ${tagValue}`);
        gen.assign(valid2, applyTagSchema(mapping[tagValue]));
      }
      gen.else();
      cxt.error(false, { discrError: types_1$1.DiscrError.Mapping, tag, tagName });
      gen.endIf();
    }
    function applyTagSchema(schemaProp) {
      const _valid = gen.name("valid");
      const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
      cxt.mergeEvaluated(schCxt, codegen_1$w.Name);
      return _valid;
    }
    function getMapping() {
      var _a;
      const oneOfMapping = {};
      const topRequired = hasRequired(parentSchema);
      let tagRequired = true;
      for (let i = 0; i < oneOf2.length; i++) {
        let sch = oneOf2[i];
        if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1$r.schemaHasRulesButRef)(sch, it.self.RULES)) {
          const ref2 = sch.$ref;
          sch = compile_1$2.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref2);
          if (sch instanceof compile_1$2.SchemaEnv)
            sch = sch.schema;
          if (sch === void 0)
            throw new ref_error_1$2.default(it.opts.uriResolver, it.baseId, ref2);
        }
        const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
        if (typeof propSch != "object") {
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
        }
        tagRequired = tagRequired && (topRequired || hasRequired(sch));
        addMappings(propSch, i);
      }
      if (!tagRequired)
        throw new Error(`discriminator: "${tagName}" must be required`);
      return oneOfMapping;
      function hasRequired({ required: required2 }) {
        return Array.isArray(required2) && required2.includes(tagName);
      }
      function addMappings(sch, i) {
        if (sch.const) {
          addMapping(sch.const, i);
        } else if (sch.enum) {
          for (const tagValue of sch.enum) {
            addMapping(tagValue, i);
          }
        } else {
          throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
        }
      }
      function addMapping(tagValue, i) {
        if (typeof tagValue != "string" || tagValue in oneOfMapping) {
          throw new Error(`discriminator: "${tagName}" values must be unique strings`);
        }
        oneOfMapping[tagValue] = i;
      }
    }
  }
};
discriminator$1.default = def$t;
const $schema$1 = "http://json-schema.org/draft-07/schema#";
const $id$2 = "http://json-schema.org/draft-07/schema#";
const title$1 = "Core schema meta-schema";
const definitions$1 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        "default": 0
      }
    ]
  },
  simpleTypes: {
    "enum": [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: true,
    "default": []
  }
};
const type$3 = [
  "object",
  "boolean"
];
const properties$3 = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  "default": true,
  readOnly: {
    type: "boolean",
    "default": false
  },
  examples: {
    type: "array",
    items: true
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    "default": true
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    "default": false
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    "default": {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    "default": {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    "default": {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  "const": true,
  "enum": {
    type: "array",
    items: true,
    minItems: 1,
    uniqueItems: true
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: true
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  "if": {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  "else": {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
};
const require$$3$1 = {
  $schema: $schema$1,
  $id: $id$2,
  title: title$1,
  definitions: definitions$1,
  type: type$3,
  properties: properties$3,
  "default": true
};
(function(module, exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.MissingRefError = exports$1.ValidationError = exports$1.CodeGen = exports$1.Name = exports$1.nil = exports$1.stringify = exports$1.str = exports$1._ = exports$1.KeywordCxt = exports$1.Ajv = void 0;
  const core_12 = core$5;
  const draft7_1 = draft7$1;
  const discriminator_1 = discriminator$1;
  const draft7MetaSchema = require$$3$1;
  const META_SUPPORT_DATA = ["/properties"];
  const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
  class Ajv extends core_12.default {
    _addVocabularies() {
      super._addVocabularies();
      draft7_1.default.forEach((v) => this.addVocabulary(v));
      if (this.opts.discriminator)
        this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      if (!this.opts.meta)
        return;
      const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
      this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
      this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
    }
  }
  exports$1.Ajv = Ajv;
  module.exports = exports$1 = Ajv;
  module.exports.Ajv = Ajv;
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.default = Ajv;
  var validate_12 = validate$1;
  Object.defineProperty(exports$1, "KeywordCxt", { enumerable: true, get: function() {
    return validate_12.KeywordCxt;
  } });
  var codegen_12 = codegen$1;
  Object.defineProperty(exports$1, "_", { enumerable: true, get: function() {
    return codegen_12._;
  } });
  Object.defineProperty(exports$1, "str", { enumerable: true, get: function() {
    return codegen_12.str;
  } });
  Object.defineProperty(exports$1, "stringify", { enumerable: true, get: function() {
    return codegen_12.stringify;
  } });
  Object.defineProperty(exports$1, "nil", { enumerable: true, get: function() {
    return codegen_12.nil;
  } });
  Object.defineProperty(exports$1, "Name", { enumerable: true, get: function() {
    return codegen_12.Name;
  } });
  Object.defineProperty(exports$1, "CodeGen", { enumerable: true, get: function() {
    return codegen_12.CodeGen;
  } });
  var validation_error_12 = validation_error$1;
  Object.defineProperty(exports$1, "ValidationError", { enumerable: true, get: function() {
    return validation_error_12.default;
  } });
  var ref_error_12 = ref_error$1;
  Object.defineProperty(exports$1, "MissingRefError", { enumerable: true, get: function() {
    return ref_error_12.default;
  } });
})(ajv$1, ajv$1.exports);
var ajvExports$1 = ajv$1.exports;
var dist = { exports: {} };
var formats = {};
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.formatNames = exports$1.fastFormats = exports$1.fullFormats = void 0;
  function fmtDef(validate2, compare2) {
    return { validate: validate2, compare: compare2 };
  }
  exports$1.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: fmtDef(date, compareDate),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: fmtDef(time, compareTime),
    "date-time": fmtDef(date_time, compareDateTime),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: uri2,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte,
    // signed 32 bit integer
    int32: { type: "number", validate: validateInt32 },
    // signed 64 bit integer
    int64: { type: "number", validate: validateInt64 },
    // C-type float
    float: { type: "number", validate: validateNumber },
    // C-type double
    double: { type: "number", validate: validateNumber },
    // hint to the UI to hide input strings
    password: true,
    // unchecked string payload
    binary: true
  };
  exports$1.fastFormats = {
    ...exports$1.fullFormats,
    date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
    time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareTime),
    "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  };
  exports$1.formatNames = Object.keys(exports$1.fullFormats);
  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
  const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function date(str) {
    const matches = DATE.exec(str);
    if (!matches)
      return false;
    const year = +matches[1];
    const month = +matches[2];
    const day = +matches[3];
    return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
  }
  function compareDate(d1, d2) {
    if (!(d1 && d2))
      return void 0;
    if (d1 > d2)
      return 1;
    if (d1 < d2)
      return -1;
    return 0;
  }
  const TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function time(str, withTimeZone) {
    const matches = TIME.exec(str);
    if (!matches)
      return false;
    const hour = +matches[1];
    const minute = +matches[2];
    const second = +matches[3];
    const timeZone = matches[5];
    return (hour <= 23 && minute <= 59 && second <= 59 || hour === 23 && minute === 59 && second === 60) && (!withTimeZone || timeZone !== "");
  }
  function compareTime(t1, t2) {
    if (!(t1 && t2))
      return void 0;
    const a1 = TIME.exec(t1);
    const a2 = TIME.exec(t2);
    if (!(a1 && a2))
      return void 0;
    t1 = a1[1] + a1[2] + a1[3] + (a1[4] || "");
    t2 = a2[1] + a2[2] + a2[3] + (a2[4] || "");
    if (t1 > t2)
      return 1;
    if (t1 < t2)
      return -1;
    return 0;
  }
  const DATE_TIME_SEPARATOR = /t|\s/i;
  function date_time(str) {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], true);
  }
  function compareDateTime(dt1, dt2) {
    if (!(dt1 && dt2))
      return void 0;
    const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
    const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
    const res = compareDate(d1, d2);
    if (res === void 0)
      return void 0;
    return res || compareTime(t1, t2);
  }
  const NOT_URI_FRAGMENT = /\/|:/;
  const URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function uri2(str) {
    return NOT_URI_FRAGMENT.test(str) && URI.test(str);
  }
  const BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function byte(str) {
    BYTE.lastIndex = 0;
    return BYTE.test(str);
  }
  const MIN_INT32 = -2147483648;
  const MAX_INT32 = 2 ** 31 - 1;
  function validateInt32(value) {
    return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
  }
  function validateInt64(value) {
    return Number.isInteger(value);
  }
  function validateNumber() {
    return true;
  }
  const Z_ANCHOR = /[^\\]\\Z/;
  function regex(str) {
    if (Z_ANCHOR.test(str))
      return false;
    try {
      new RegExp(str);
      return true;
    } catch (e) {
      return false;
    }
  }
})(formats);
var limit = {};
var ajv = { exports: {} };
var core$2 = {};
var validate = {};
var boolSchema = {};
var errors = {};
var codegen = {};
var code$2 = {};
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.regexpCode = exports$1.getEsmExportName = exports$1.getProperty = exports$1.safeStringify = exports$1.stringify = exports$1.strConcat = exports$1.addCodeArg = exports$1.str = exports$1._ = exports$1.nil = exports$1._Code = exports$1.Name = exports$1.IDENTIFIER = exports$1._CodeOrName = void 0;
  class _CodeOrName {
  }
  exports$1._CodeOrName = _CodeOrName;
  exports$1.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class Name extends _CodeOrName {
    constructor(s) {
      super();
      if (!exports$1.IDENTIFIER.test(s))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = s;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return false;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  exports$1.Name = Name;
  class _Code extends _CodeOrName {
    constructor(code2) {
      super();
      this._items = typeof code2 === "string" ? [code2] : code2;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return false;
      const item = this._items[0];
      return item === "" || item === '""';
    }
    get str() {
      var _a;
      return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
    }
    get names() {
      var _a;
      return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names2, c) => {
        if (c instanceof Name)
          names2[c.str] = (names2[c.str] || 0) + 1;
        return names2;
      }, {});
    }
  }
  exports$1._Code = _Code;
  exports$1.nil = new _Code("");
  function _(strs, ...args) {
    const code2 = [strs[0]];
    let i = 0;
    while (i < args.length) {
      addCodeArg(code2, args[i]);
      code2.push(strs[++i]);
    }
    return new _Code(code2);
  }
  exports$1._ = _;
  const plus = new _Code("+");
  function str(strs, ...args) {
    const expr = [safeStringify(strs[0])];
    let i = 0;
    while (i < args.length) {
      expr.push(plus);
      addCodeArg(expr, args[i]);
      expr.push(plus, safeStringify(strs[++i]));
    }
    optimize(expr);
    return new _Code(expr);
  }
  exports$1.str = str;
  function addCodeArg(code2, arg) {
    if (arg instanceof _Code)
      code2.push(...arg._items);
    else if (arg instanceof Name)
      code2.push(arg);
    else
      code2.push(interpolate(arg));
  }
  exports$1.addCodeArg = addCodeArg;
  function optimize(expr) {
    let i = 1;
    while (i < expr.length - 1) {
      if (expr[i] === plus) {
        const res = mergeExprItems(expr[i - 1], expr[i + 1]);
        if (res !== void 0) {
          expr.splice(i - 1, 3, res);
          continue;
        }
        expr[i++] = "+";
      }
      i++;
    }
  }
  function mergeExprItems(a, b) {
    if (b === '""')
      return a;
    if (a === '""')
      return b;
    if (typeof a == "string") {
      if (b instanceof Name || a[a.length - 1] !== '"')
        return;
      if (typeof b != "string")
        return `${a.slice(0, -1)}${b}"`;
      if (b[0] === '"')
        return a.slice(0, -1) + b.slice(1);
      return;
    }
    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
      return `"${a}${b.slice(1)}`;
    return;
  }
  function strConcat(c1, c2) {
    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
  }
  exports$1.strConcat = strConcat;
  function interpolate(x) {
    return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
  }
  function stringify(x) {
    return new _Code(safeStringify(x));
  }
  exports$1.stringify = stringify;
  function safeStringify(x) {
    return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  exports$1.safeStringify = safeStringify;
  function getProperty(key) {
    return typeof key == "string" && exports$1.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
  }
  exports$1.getProperty = getProperty;
  function getEsmExportName(key) {
    if (typeof key == "string" && exports$1.IDENTIFIER.test(key)) {
      return new _Code(`${key}`);
    }
    throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
  }
  exports$1.getEsmExportName = getEsmExportName;
  function regexpCode(rx) {
    return new _Code(rx.toString());
  }
  exports$1.regexpCode = regexpCode;
})(code$2);
var scope = {};
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.ValueScope = exports$1.ValueScopeName = exports$1.Scope = exports$1.varKinds = exports$1.UsedValueState = void 0;
  const code_12 = code$2;
  class ValueError extends Error {
    constructor(name) {
      super(`CodeGen: "code" for ${name} not defined`);
      this.value = name.value;
    }
  }
  var UsedValueState;
  (function(UsedValueState2) {
    UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
    UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
  })(UsedValueState || (exports$1.UsedValueState = UsedValueState = {}));
  exports$1.varKinds = {
    const: new code_12.Name("const"),
    let: new code_12.Name("let"),
    var: new code_12.Name("var")
  };
  class Scope {
    constructor({ prefixes, parent } = {}) {
      this._names = {};
      this._prefixes = prefixes;
      this._parent = parent;
    }
    toName(nameOrPrefix) {
      return nameOrPrefix instanceof code_12.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
      return new code_12.Name(this._newName(prefix));
    }
    _newName(prefix) {
      const ng = this._names[prefix] || this._nameGroup(prefix);
      return `${prefix}${ng.index++}`;
    }
    _nameGroup(prefix) {
      var _a, _b;
      if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
        throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
      }
      return this._names[prefix] = { prefix, index: 0 };
    }
  }
  exports$1.Scope = Scope;
  class ValueScopeName extends code_12.Name {
    constructor(prefix, nameStr) {
      super(nameStr);
      this.prefix = prefix;
    }
    setValue(value, { property, itemIndex }) {
      this.value = value;
      this.scopePath = (0, code_12._)`.${new code_12.Name(property)}[${itemIndex}]`;
    }
  }
  exports$1.ValueScopeName = ValueScopeName;
  const line = (0, code_12._)`\n`;
  class ValueScope extends Scope {
    constructor(opts) {
      super(opts);
      this._values = {};
      this._scope = opts.scope;
      this.opts = { ...opts, _n: opts.lines ? line : code_12.nil };
    }
    get() {
      return this._scope;
    }
    name(prefix) {
      return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
      var _a;
      if (value.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const name = this.toName(nameOrPrefix);
      const { prefix } = name;
      const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
      let vs = this._values[prefix];
      if (vs) {
        const _name = vs.get(valueKey);
        if (_name)
          return _name;
      } else {
        vs = this._values[prefix] = /* @__PURE__ */ new Map();
      }
      vs.set(valueKey, name);
      const s = this._scope[prefix] || (this._scope[prefix] = []);
      const itemIndex = s.length;
      s[itemIndex] = value.ref;
      name.setValue(value, { property: prefix, itemIndex });
      return name;
    }
    getValue(prefix, keyOrRef) {
      const vs = this._values[prefix];
      if (!vs)
        return;
      return vs.get(keyOrRef);
    }
    scopeRefs(scopeName, values = this._values) {
      return this._reduceValues(values, (name) => {
        if (name.scopePath === void 0)
          throw new Error(`CodeGen: name "${name}" has no value`);
        return (0, code_12._)`${scopeName}${name.scopePath}`;
      });
    }
    scopeCode(values = this._values, usedValues, getCode) {
      return this._reduceValues(values, (name) => {
        if (name.value === void 0)
          throw new Error(`CodeGen: name "${name}" has no value`);
        return name.value.code;
      }, usedValues, getCode);
    }
    _reduceValues(values, valueCode, usedValues = {}, getCode) {
      let code2 = code_12.nil;
      for (const prefix in values) {
        const vs = values[prefix];
        if (!vs)
          continue;
        const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
        vs.forEach((name) => {
          if (nameSet.has(name))
            return;
          nameSet.set(name, UsedValueState.Started);
          let c = valueCode(name);
          if (c) {
            const def2 = this.opts.es5 ? exports$1.varKinds.var : exports$1.varKinds.const;
            code2 = (0, code_12._)`${code2}${def2} ${name} = ${c};${this.opts._n}`;
          } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
            code2 = (0, code_12._)`${code2}${c}${this.opts._n}`;
          } else {
            throw new ValueError(name);
          }
          nameSet.set(name, UsedValueState.Completed);
        });
      }
      return code2;
    }
  }
  exports$1.ValueScope = ValueScope;
})(scope);
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.or = exports$1.and = exports$1.not = exports$1.CodeGen = exports$1.operators = exports$1.varKinds = exports$1.ValueScopeName = exports$1.ValueScope = exports$1.Scope = exports$1.Name = exports$1.regexpCode = exports$1.stringify = exports$1.getProperty = exports$1.nil = exports$1.strConcat = exports$1.str = exports$1._ = void 0;
  const code_12 = code$2;
  const scope_1 = scope;
  var code_2 = code$2;
  Object.defineProperty(exports$1, "_", { enumerable: true, get: function() {
    return code_2._;
  } });
  Object.defineProperty(exports$1, "str", { enumerable: true, get: function() {
    return code_2.str;
  } });
  Object.defineProperty(exports$1, "strConcat", { enumerable: true, get: function() {
    return code_2.strConcat;
  } });
  Object.defineProperty(exports$1, "nil", { enumerable: true, get: function() {
    return code_2.nil;
  } });
  Object.defineProperty(exports$1, "getProperty", { enumerable: true, get: function() {
    return code_2.getProperty;
  } });
  Object.defineProperty(exports$1, "stringify", { enumerable: true, get: function() {
    return code_2.stringify;
  } });
  Object.defineProperty(exports$1, "regexpCode", { enumerable: true, get: function() {
    return code_2.regexpCode;
  } });
  Object.defineProperty(exports$1, "Name", { enumerable: true, get: function() {
    return code_2.Name;
  } });
  var scope_2 = scope;
  Object.defineProperty(exports$1, "Scope", { enumerable: true, get: function() {
    return scope_2.Scope;
  } });
  Object.defineProperty(exports$1, "ValueScope", { enumerable: true, get: function() {
    return scope_2.ValueScope;
  } });
  Object.defineProperty(exports$1, "ValueScopeName", { enumerable: true, get: function() {
    return scope_2.ValueScopeName;
  } });
  Object.defineProperty(exports$1, "varKinds", { enumerable: true, get: function() {
    return scope_2.varKinds;
  } });
  exports$1.operators = {
    GT: new code_12._Code(">"),
    GTE: new code_12._Code(">="),
    LT: new code_12._Code("<"),
    LTE: new code_12._Code("<="),
    EQ: new code_12._Code("==="),
    NEQ: new code_12._Code("!=="),
    NOT: new code_12._Code("!"),
    OR: new code_12._Code("||"),
    AND: new code_12._Code("&&"),
    ADD: new code_12._Code("+")
  };
  class Node2 {
    optimizeNodes() {
      return this;
    }
    optimizeNames(_names, _constants) {
      return this;
    }
  }
  class Def extends Node2 {
    constructor(varKind, name, rhs) {
      super();
      this.varKind = varKind;
      this.name = name;
      this.rhs = rhs;
    }
    render({ es5, _n }) {
      const varKind = es5 ? scope_1.varKinds.var : this.varKind;
      const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${varKind} ${this.name}${rhs};` + _n;
    }
    optimizeNames(names2, constants2) {
      if (!names2[this.name.str])
        return;
      if (this.rhs)
        this.rhs = optimizeExpr(this.rhs, names2, constants2);
      return this;
    }
    get names() {
      return this.rhs instanceof code_12._CodeOrName ? this.rhs.names : {};
    }
  }
  class Assign extends Node2 {
    constructor(lhs, rhs, sideEffects) {
      super();
      this.lhs = lhs;
      this.rhs = rhs;
      this.sideEffects = sideEffects;
    }
    render({ _n }) {
      return `${this.lhs} = ${this.rhs};` + _n;
    }
    optimizeNames(names2, constants2) {
      if (this.lhs instanceof code_12.Name && !names2[this.lhs.str] && !this.sideEffects)
        return;
      this.rhs = optimizeExpr(this.rhs, names2, constants2);
      return this;
    }
    get names() {
      const names2 = this.lhs instanceof code_12.Name ? {} : { ...this.lhs.names };
      return addExprNames(names2, this.rhs);
    }
  }
  class AssignOp extends Assign {
    constructor(lhs, op, rhs, sideEffects) {
      super(lhs, rhs, sideEffects);
      this.op = op;
    }
    render({ _n }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
    }
  }
  class Label extends Node2 {
    constructor(label) {
      super();
      this.label = label;
      this.names = {};
    }
    render({ _n }) {
      return `${this.label}:` + _n;
    }
  }
  class Break extends Node2 {
    constructor(label) {
      super();
      this.label = label;
      this.names = {};
    }
    render({ _n }) {
      const label = this.label ? ` ${this.label}` : "";
      return `break${label};` + _n;
    }
  }
  class Throw extends Node2 {
    constructor(error2) {
      super();
      this.error = error2;
    }
    render({ _n }) {
      return `throw ${this.error};` + _n;
    }
    get names() {
      return this.error.names;
    }
  }
  class AnyCode extends Node2 {
    constructor(code2) {
      super();
      this.code = code2;
    }
    render({ _n }) {
      return `${this.code};` + _n;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(names2, constants2) {
      this.code = optimizeExpr(this.code, names2, constants2);
      return this;
    }
    get names() {
      return this.code instanceof code_12._CodeOrName ? this.code.names : {};
    }
  }
  class ParentNode extends Node2 {
    constructor(nodes = []) {
      super();
      this.nodes = nodes;
    }
    render(opts) {
      return this.nodes.reduce((code2, n) => code2 + n.render(opts), "");
    }
    optimizeNodes() {
      const { nodes } = this;
      let i = nodes.length;
      while (i--) {
        const n = nodes[i].optimizeNodes();
        if (Array.isArray(n))
          nodes.splice(i, 1, ...n);
        else if (n)
          nodes[i] = n;
        else
          nodes.splice(i, 1);
      }
      return nodes.length > 0 ? this : void 0;
    }
    optimizeNames(names2, constants2) {
      const { nodes } = this;
      let i = nodes.length;
      while (i--) {
        const n = nodes[i];
        if (n.optimizeNames(names2, constants2))
          continue;
        subtractNames(names2, n.names);
        nodes.splice(i, 1);
      }
      return nodes.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((names2, n) => addNames(names2, n.names), {});
    }
  }
  class BlockNode extends ParentNode {
    render(opts) {
      return "{" + opts._n + super.render(opts) + "}" + opts._n;
    }
  }
  class Root extends ParentNode {
  }
  class Else extends BlockNode {
  }
  Else.kind = "else";
  class If extends BlockNode {
    constructor(condition, nodes) {
      super(nodes);
      this.condition = condition;
    }
    render(opts) {
      let code2 = `if(${this.condition})` + super.render(opts);
      if (this.else)
        code2 += "else " + this.else.render(opts);
      return code2;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const cond = this.condition;
      if (cond === true)
        return this.nodes;
      let e = this.else;
      if (e) {
        const ns = e.optimizeNodes();
        e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
      }
      if (e) {
        if (cond === false)
          return e instanceof If ? e : e.nodes;
        if (this.nodes.length)
          return this;
        return new If(not2(cond), e instanceof If ? [e] : e.nodes);
      }
      if (cond === false || !this.nodes.length)
        return void 0;
      return this;
    }
    optimizeNames(names2, constants2) {
      var _a;
      this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
      if (!(super.optimizeNames(names2, constants2) || this.else))
        return;
      this.condition = optimizeExpr(this.condition, names2, constants2);
      return this;
    }
    get names() {
      const names2 = super.names;
      addExprNames(names2, this.condition);
      if (this.else)
        addNames(names2, this.else.names);
      return names2;
    }
  }
  If.kind = "if";
  class For extends BlockNode {
  }
  For.kind = "for";
  class ForLoop extends For {
    constructor(iteration) {
      super();
      this.iteration = iteration;
    }
    render(opts) {
      return `for(${this.iteration})` + super.render(opts);
    }
    optimizeNames(names2, constants2) {
      if (!super.optimizeNames(names2, constants2))
        return;
      this.iteration = optimizeExpr(this.iteration, names2, constants2);
      return this;
    }
    get names() {
      return addNames(super.names, this.iteration.names);
    }
  }
  class ForRange extends For {
    constructor(varKind, name, from, to) {
      super();
      this.varKind = varKind;
      this.name = name;
      this.from = from;
      this.to = to;
    }
    render(opts) {
      const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
      const { name, from, to } = this;
      return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
    }
    get names() {
      const names2 = addExprNames(super.names, this.from);
      return addExprNames(names2, this.to);
    }
  }
  class ForIter extends For {
    constructor(loop, varKind, name, iterable) {
      super();
      this.loop = loop;
      this.varKind = varKind;
      this.name = name;
      this.iterable = iterable;
    }
    render(opts) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
    }
    optimizeNames(names2, constants2) {
      if (!super.optimizeNames(names2, constants2))
        return;
      this.iterable = optimizeExpr(this.iterable, names2, constants2);
      return this;
    }
    get names() {
      return addNames(super.names, this.iterable.names);
    }
  }
  class Func extends BlockNode {
    constructor(name, args, async) {
      super();
      this.name = name;
      this.args = args;
      this.async = async;
    }
    render(opts) {
      const _async = this.async ? "async " : "";
      return `${_async}function ${this.name}(${this.args})` + super.render(opts);
    }
  }
  Func.kind = "func";
  class Return extends ParentNode {
    render(opts) {
      return "return " + super.render(opts);
    }
  }
  Return.kind = "return";
  class Try extends BlockNode {
    render(opts) {
      let code2 = "try" + super.render(opts);
      if (this.catch)
        code2 += this.catch.render(opts);
      if (this.finally)
        code2 += this.finally.render(opts);
      return code2;
    }
    optimizeNodes() {
      var _a, _b;
      super.optimizeNodes();
      (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
      (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
      return this;
    }
    optimizeNames(names2, constants2) {
      var _a, _b;
      super.optimizeNames(names2, constants2);
      (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
      (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names2, constants2);
      return this;
    }
    get names() {
      const names2 = super.names;
      if (this.catch)
        addNames(names2, this.catch.names);
      if (this.finally)
        addNames(names2, this.finally.names);
      return names2;
    }
  }
  class Catch extends BlockNode {
    constructor(error2) {
      super();
      this.error = error2;
    }
    render(opts) {
      return `catch(${this.error})` + super.render(opts);
    }
  }
  Catch.kind = "catch";
  class Finally extends BlockNode {
    render(opts) {
      return "finally" + super.render(opts);
    }
  }
  Finally.kind = "finally";
  class CodeGen {
    constructor(extScope, opts = {}) {
      this._values = {};
      this._blockStarts = [];
      this._constants = {};
      this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
      this._extScope = extScope;
      this._scope = new scope_1.Scope({ parent: extScope });
      this._nodes = [new Root()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(prefix) {
      return this._scope.name(prefix);
    }
    // reserves unique name in the external scope
    scopeName(prefix) {
      return this._extScope.name(prefix);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(prefixOrName, value) {
      const name = this._extScope.value(prefixOrName, value);
      const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
      vs.add(name);
      return name;
    }
    getScopeValue(prefix, keyOrRef) {
      return this._extScope.getValue(prefix, keyOrRef);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(scopeName) {
      return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
      const name = this._scope.toName(nameOrPrefix);
      if (rhs !== void 0 && constant)
        this._constants[name.str] = rhs;
      this._leafNode(new Def(varKind, name, rhs));
      return name;
    }
    // `const` declaration (`var` in es5 mode)
    const(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    // `var` declaration with optional assignment
    var(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    // assignment code
    assign(lhs, rhs, sideEffects) {
      return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    // `+=` code
    add(lhs, rhs) {
      return this._leafNode(new AssignOp(lhs, exports$1.operators.ADD, rhs));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
      if (typeof c == "function")
        c();
      else if (c !== code_12.nil)
        this._leafNode(new AnyCode(c));
      return this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...keyValues) {
      const code2 = ["{"];
      for (const [key, value] of keyValues) {
        if (code2.length > 1)
          code2.push(",");
        code2.push(key);
        if (key !== value || this.opts.es5) {
          code2.push(":");
          (0, code_12.addCodeArg)(code2, value);
        }
      }
      code2.push("}");
      return new code_12._Code(code2);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(condition, thenBody, elseBody) {
      this._blockNode(new If(condition));
      if (thenBody && elseBody) {
        this.code(thenBody).else().code(elseBody).endIf();
      } else if (thenBody) {
        this.code(thenBody).endIf();
      } else if (elseBody) {
        throw new Error('CodeGen: "else" body without "then" body');
      }
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(condition) {
      return this._elseNode(new If(condition));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new Else());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
      this._blockNode(node);
      if (forBody)
        this.code(forBody).endFor();
      return this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(iteration, forBody) {
      return this._for(new ForLoop(iteration), forBody);
    }
    // `for` statement for a range of values
    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
      const name = this._scope.toName(nameOrPrefix);
      return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
      const name = this._scope.toName(nameOrPrefix);
      if (this.opts.es5) {
        const arr = iterable instanceof code_12.Name ? iterable : this.var("_arr", iterable);
        return this.forRange("_i", 0, (0, code_12._)`${arr}.length`, (i) => {
          this.var(name, (0, code_12._)`${arr}[${i}]`);
          forBody(name);
        });
      }
      return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
      if (this.opts.ownProperties) {
        return this.forOf(nameOrPrefix, (0, code_12._)`Object.keys(${obj})`, forBody);
      }
      const name = this._scope.toName(nameOrPrefix);
      return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(For);
    }
    // `label` statement
    label(label) {
      return this._leafNode(new Label(label));
    }
    // `break` statement
    break(label) {
      return this._leafNode(new Break(label));
    }
    // `return` statement
    return(value) {
      const node = new Return();
      this._blockNode(node);
      this.code(value);
      if (node.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Return);
    }
    // `try` statement
    try(tryBody, catchCode, finallyCode) {
      if (!catchCode && !finallyCode)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const node = new Try();
      this._blockNode(node);
      this.code(tryBody);
      if (catchCode) {
        const error2 = this.name("e");
        this._currNode = node.catch = new Catch(error2);
        catchCode(error2);
      }
      if (finallyCode) {
        this._currNode = node.finally = new Finally();
        this.code(finallyCode);
      }
      return this._endBlockNode(Catch, Finally);
    }
    // `throw` statement
    throw(error2) {
      return this._leafNode(new Throw(error2));
    }
    // start self-balancing block
    block(body, nodeCount) {
      this._blockStarts.push(this._nodes.length);
      if (body)
        this.code(body).endBlock(nodeCount);
      return this;
    }
    // end the current self-balancing block
    endBlock(nodeCount) {
      const len = this._blockStarts.pop();
      if (len === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const toClose = this._nodes.length - len;
      if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
        throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
      }
      this._nodes.length = len;
      return this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(name, args = code_12.nil, async, funcBody) {
      this._blockNode(new Func(name, args, async));
      if (funcBody)
        this.code(funcBody).endFunc();
      return this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(Func);
    }
    optimize(n = 1) {
      while (n-- > 0) {
        this._root.optimizeNodes();
        this._root.optimizeNames(this._root.names, this._constants);
      }
    }
    _leafNode(node) {
      this._currNode.nodes.push(node);
      return this;
    }
    _blockNode(node) {
      this._currNode.nodes.push(node);
      this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
      const n = this._currNode;
      if (n instanceof N1 || N2 && n instanceof N2) {
        this._nodes.pop();
        return this;
      }
      throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
    }
    _elseNode(node) {
      const n = this._currNode;
      if (!(n instanceof If)) {
        throw new Error('CodeGen: "else" without "if"');
      }
      this._currNode = n.else = node;
      return this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const ns = this._nodes;
      return ns[ns.length - 1];
    }
    set _currNode(node) {
      const ns = this._nodes;
      ns[ns.length - 1] = node;
    }
  }
  exports$1.CodeGen = CodeGen;
  function addNames(names2, from) {
    for (const n in from)
      names2[n] = (names2[n] || 0) + (from[n] || 0);
    return names2;
  }
  function addExprNames(names2, from) {
    return from instanceof code_12._CodeOrName ? addNames(names2, from.names) : names2;
  }
  function optimizeExpr(expr, names2, constants2) {
    if (expr instanceof code_12.Name)
      return replaceName(expr);
    if (!canOptimize(expr))
      return expr;
    return new code_12._Code(expr._items.reduce((items2, c) => {
      if (c instanceof code_12.Name)
        c = replaceName(c);
      if (c instanceof code_12._Code)
        items2.push(...c._items);
      else
        items2.push(c);
      return items2;
    }, []));
    function replaceName(n) {
      const c = constants2[n.str];
      if (c === void 0 || names2[n.str] !== 1)
        return n;
      delete names2[n.str];
      return c;
    }
    function canOptimize(e) {
      return e instanceof code_12._Code && e._items.some((c) => c instanceof code_12.Name && names2[c.str] === 1 && constants2[c.str] !== void 0);
    }
  }
  function subtractNames(names2, from) {
    for (const n in from)
      names2[n] = (names2[n] || 0) - (from[n] || 0);
  }
  function not2(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_12._)`!${par(x)}`;
  }
  exports$1.not = not2;
  const andCode = mappend(exports$1.operators.AND);
  function and(...args) {
    return args.reduce(andCode);
  }
  exports$1.and = and;
  const orCode = mappend(exports$1.operators.OR);
  function or(...args) {
    return args.reduce(orCode);
  }
  exports$1.or = or;
  function mappend(op) {
    return (x, y) => x === code_12.nil ? y : y === code_12.nil ? x : (0, code_12._)`${par(x)} ${op} ${par(y)}`;
  }
  function par(x) {
    return x instanceof code_12.Name ? x : (0, code_12._)`(${x})`;
  }
})(codegen);
var util = {};
Object.defineProperty(util, "__esModule", { value: true });
util.checkStrictMode = util.getErrorPath = util.Type = util.useFunc = util.setEvaluated = util.evaluatedPropsToName = util.mergeEvaluated = util.eachItem = util.unescapeJsonPointer = util.escapeJsonPointer = util.escapeFragment = util.unescapeFragment = util.schemaRefOrVal = util.schemaHasRulesButRef = util.schemaHasRules = util.checkUnknownRules = util.alwaysValidSchema = util.toHash = void 0;
const codegen_1$v = codegen;
const code_1$a = code$2;
function toHash(arr) {
  const hash = {};
  for (const item of arr)
    hash[item] = true;
  return hash;
}
util.toHash = toHash;
function alwaysValidSchema(it, schema) {
  if (typeof schema == "boolean")
    return schema;
  if (Object.keys(schema).length === 0)
    return true;
  checkUnknownRules(it, schema);
  return !schemaHasRules(schema, it.self.RULES.all);
}
util.alwaysValidSchema = alwaysValidSchema;
function checkUnknownRules(it, schema = it.schema) {
  const { opts, self: self2 } = it;
  if (!opts.strictSchema)
    return;
  if (typeof schema === "boolean")
    return;
  const rules2 = self2.RULES.keywords;
  for (const key in schema) {
    if (!rules2[key])
      checkStrictMode(it, `unknown keyword: "${key}"`);
  }
}
util.checkUnknownRules = checkUnknownRules;
function schemaHasRules(schema, rules2) {
  if (typeof schema == "boolean")
    return !schema;
  for (const key in schema)
    if (rules2[key])
      return true;
  return false;
}
util.schemaHasRules = schemaHasRules;
function schemaHasRulesButRef(schema, RULES) {
  if (typeof schema == "boolean")
    return !schema;
  for (const key in schema)
    if (key !== "$ref" && RULES.all[key])
      return true;
  return false;
}
util.schemaHasRulesButRef = schemaHasRulesButRef;
function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword2, $data) {
  if (!$data) {
    if (typeof schema == "number" || typeof schema == "boolean")
      return schema;
    if (typeof schema == "string")
      return (0, codegen_1$v._)`${schema}`;
  }
  return (0, codegen_1$v._)`${topSchemaRef}${schemaPath}${(0, codegen_1$v.getProperty)(keyword2)}`;
}
util.schemaRefOrVal = schemaRefOrVal;
function unescapeFragment(str) {
  return unescapeJsonPointer(decodeURIComponent(str));
}
util.unescapeFragment = unescapeFragment;
function escapeFragment(str) {
  return encodeURIComponent(escapeJsonPointer(str));
}
util.escapeFragment = escapeFragment;
function escapeJsonPointer(str) {
  if (typeof str == "number")
    return `${str}`;
  return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
util.escapeJsonPointer = escapeJsonPointer;
function unescapeJsonPointer(str) {
  return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
util.unescapeJsonPointer = unescapeJsonPointer;
function eachItem(xs, f) {
  if (Array.isArray(xs)) {
    for (const x of xs)
      f(x);
  } else {
    f(xs);
  }
}
util.eachItem = eachItem;
function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
  return (gen, from, to, toName) => {
    const res = to === void 0 ? from : to instanceof codegen_1$v.Name ? (from instanceof codegen_1$v.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1$v.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
    return toName === codegen_1$v.Name && !(res instanceof codegen_1$v.Name) ? resultToName(gen, res) : res;
  };
}
util.mergeEvaluated = {
  props: makeMergeEvaluated({
    mergeNames: (gen, from, to) => gen.if((0, codegen_1$v._)`${to} !== true && ${from} !== undefined`, () => {
      gen.if((0, codegen_1$v._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1$v._)`${to} || {}`).code((0, codegen_1$v._)`Object.assign(${to}, ${from})`));
    }),
    mergeToName: (gen, from, to) => gen.if((0, codegen_1$v._)`${to} !== true`, () => {
      if (from === true) {
        gen.assign(to, true);
      } else {
        gen.assign(to, (0, codegen_1$v._)`${to} || {}`);
        setEvaluated(gen, to, from);
      }
    }),
    mergeValues: (from, to) => from === true ? true : { ...from, ...to },
    resultToName: evaluatedPropsToName
  }),
  items: makeMergeEvaluated({
    mergeNames: (gen, from, to) => gen.if((0, codegen_1$v._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1$v._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
    mergeToName: (gen, from, to) => gen.if((0, codegen_1$v._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1$v._)`${to} > ${from} ? ${to} : ${from}`)),
    mergeValues: (from, to) => from === true ? true : Math.max(from, to),
    resultToName: (gen, items2) => gen.var("items", items2)
  })
};
function evaluatedPropsToName(gen, ps) {
  if (ps === true)
    return gen.var("props", true);
  const props = gen.var("props", (0, codegen_1$v._)`{}`);
  if (ps !== void 0)
    setEvaluated(gen, props, ps);
  return props;
}
util.evaluatedPropsToName = evaluatedPropsToName;
function setEvaluated(gen, props, ps) {
  Object.keys(ps).forEach((p) => gen.assign((0, codegen_1$v._)`${props}${(0, codegen_1$v.getProperty)(p)}`, true));
}
util.setEvaluated = setEvaluated;
const snippets = {};
function useFunc(gen, f) {
  return gen.scopeValue("func", {
    ref: f,
    code: snippets[f.code] || (snippets[f.code] = new code_1$a._Code(f.code))
  });
}
util.useFunc = useFunc;
var Type;
(function(Type2) {
  Type2[Type2["Num"] = 0] = "Num";
  Type2[Type2["Str"] = 1] = "Str";
})(Type || (util.Type = Type = {}));
function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
  if (dataProp instanceof codegen_1$v.Name) {
    const isNumber = dataPropType === Type.Num;
    return jsPropertySyntax ? isNumber ? (0, codegen_1$v._)`"[" + ${dataProp} + "]"` : (0, codegen_1$v._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1$v._)`"/" + ${dataProp}` : (0, codegen_1$v._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return jsPropertySyntax ? (0, codegen_1$v.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
}
util.getErrorPath = getErrorPath;
function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
  if (!mode)
    return;
  msg = `strict mode: ${msg}`;
  if (mode === true)
    throw new Error(msg);
  it.self.logger.warn(msg);
}
util.checkStrictMode = checkStrictMode;
var names$1 = {};
Object.defineProperty(names$1, "__esModule", { value: true });
const codegen_1$u = codegen;
const names = {
  // validation function arguments
  data: new codegen_1$u.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new codegen_1$u.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new codegen_1$u.Name("instancePath"),
  parentData: new codegen_1$u.Name("parentData"),
  parentDataProperty: new codegen_1$u.Name("parentDataProperty"),
  rootData: new codegen_1$u.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new codegen_1$u.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new codegen_1$u.Name("vErrors"),
  // null or array of validation errors
  errors: new codegen_1$u.Name("errors"),
  // counter of validation errors
  this: new codegen_1$u.Name("this"),
  // "globals"
  self: new codegen_1$u.Name("self"),
  scope: new codegen_1$u.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new codegen_1$u.Name("json"),
  jsonPos: new codegen_1$u.Name("jsonPos"),
  jsonLen: new codegen_1$u.Name("jsonLen"),
  jsonPart: new codegen_1$u.Name("jsonPart")
};
names$1.default = names;
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.extendErrors = exports$1.resetErrorsCount = exports$1.reportExtraError = exports$1.reportError = exports$1.keyword$DataError = exports$1.keywordError = void 0;
  const codegen_12 = codegen;
  const util_12 = util;
  const names_12 = names$1;
  exports$1.keywordError = {
    message: ({ keyword: keyword2 }) => (0, codegen_12.str)`must pass "${keyword2}" keyword validation`
  };
  exports$1.keyword$DataError = {
    message: ({ keyword: keyword2, schemaType }) => schemaType ? (0, codegen_12.str)`"${keyword2}" keyword must be ${schemaType} ($data)` : (0, codegen_12.str)`"${keyword2}" keyword is invalid ($data)`
  };
  function reportError(cxt, error2 = exports$1.keywordError, errorPaths, overrideAllErrors) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error2, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
      addError(gen, errObj);
    } else {
      returnErrors(it, (0, codegen_12._)`[${errObj}]`);
    }
  }
  exports$1.reportError = reportError;
  function reportExtraError(cxt, error2 = exports$1.keywordError, errorPaths) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error2, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
      returnErrors(it, names_12.default.vErrors);
    }
  }
  exports$1.reportExtraError = reportExtraError;
  function resetErrorsCount(gen, errsCount) {
    gen.assign(names_12.default.errors, errsCount);
    gen.if((0, codegen_12._)`${names_12.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_12._)`${names_12.default.vErrors}.length`, errsCount), () => gen.assign(names_12.default.vErrors, null)));
  }
  exports$1.resetErrorsCount = resetErrorsCount;
  function extendErrors({ gen, keyword: keyword2, schemaValue, data, errsCount, it }) {
    if (errsCount === void 0)
      throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_12.default.errors, (i) => {
      gen.const(err, (0, codegen_12._)`${names_12.default.vErrors}[${i}]`);
      gen.if((0, codegen_12._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_12._)`${err}.instancePath`, (0, codegen_12.strConcat)(names_12.default.instancePath, it.errorPath)));
      gen.assign((0, codegen_12._)`${err}.schemaPath`, (0, codegen_12.str)`${it.errSchemaPath}/${keyword2}`);
      if (it.opts.verbose) {
        gen.assign((0, codegen_12._)`${err}.schema`, schemaValue);
        gen.assign((0, codegen_12._)`${err}.data`, data);
      }
    });
  }
  exports$1.extendErrors = extendErrors;
  function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if((0, codegen_12._)`${names_12.default.vErrors} === null`, () => gen.assign(names_12.default.vErrors, (0, codegen_12._)`[${err}]`), (0, codegen_12._)`${names_12.default.vErrors}.push(${err})`);
    gen.code((0, codegen_12._)`${names_12.default.errors}++`);
  }
  function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
      gen.throw((0, codegen_12._)`new ${it.ValidationError}(${errs})`);
    } else {
      gen.assign((0, codegen_12._)`${validateName}.errors`, errs);
      gen.return(false);
    }
  }
  const E = {
    keyword: new codegen_12.Name("keyword"),
    schemaPath: new codegen_12.Name("schemaPath"),
    // also used in JTD errors
    params: new codegen_12.Name("params"),
    propertyName: new codegen_12.Name("propertyName"),
    message: new codegen_12.Name("message"),
    schema: new codegen_12.Name("schema"),
    parentSchema: new codegen_12.Name("parentSchema")
  };
  function errorObjectCode(cxt, error2, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false)
      return (0, codegen_12._)`{}`;
    return errorObject(cxt, error2, errorPaths);
  }
  function errorObject(cxt, error2, errorPaths = {}) {
    const { gen, it } = cxt;
    const keyValues = [
      errorInstancePath(it, errorPaths),
      errorSchemaPath(cxt, errorPaths)
    ];
    extraErrorProps(cxt, error2, keyValues);
    return gen.object(...keyValues);
  }
  function errorInstancePath({ errorPath }, { instancePath }) {
    const instPath = instancePath ? (0, codegen_12.str)`${errorPath}${(0, util_12.getErrorPath)(instancePath, util_12.Type.Str)}` : errorPath;
    return [names_12.default.instancePath, (0, codegen_12.strConcat)(names_12.default.instancePath, instPath)];
  }
  function errorSchemaPath({ keyword: keyword2, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
    let schPath = parentSchema ? errSchemaPath : (0, codegen_12.str)`${errSchemaPath}/${keyword2}`;
    if (schemaPath) {
      schPath = (0, codegen_12.str)`${schPath}${(0, util_12.getErrorPath)(schemaPath, util_12.Type.Str)}`;
    }
    return [E.schemaPath, schPath];
  }
  function extraErrorProps(cxt, { params, message }, keyValues) {
    const { keyword: keyword2, data, schemaValue, it } = cxt;
    const { opts, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([E.keyword, keyword2], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_12._)`{}`]);
    if (opts.messages) {
      keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
    }
    if (opts.verbose) {
      keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_12._)`${topSchemaRef}${schemaPath}`], [names_12.default.data, data]);
    }
    if (propertyName)
      keyValues.push([E.propertyName, propertyName]);
  }
})(errors);
Object.defineProperty(boolSchema, "__esModule", { value: true });
boolSchema.boolOrEmptySchema = boolSchema.topBoolOrEmptySchema = void 0;
const errors_1$3 = errors;
const codegen_1$t = codegen;
const names_1$6 = names$1;
const boolError = {
  message: "boolean schema is false"
};
function topBoolOrEmptySchema(it) {
  const { gen, schema, validateName } = it;
  if (schema === false) {
    falseSchemaError(it, false);
  } else if (typeof schema == "object" && schema.$async === true) {
    gen.return(names_1$6.default.data);
  } else {
    gen.assign((0, codegen_1$t._)`${validateName}.errors`, null);
    gen.return(true);
  }
}
boolSchema.topBoolOrEmptySchema = topBoolOrEmptySchema;
function boolOrEmptySchema(it, valid2) {
  const { gen, schema } = it;
  if (schema === false) {
    gen.var(valid2, false);
    falseSchemaError(it);
  } else {
    gen.var(valid2, true);
  }
}
boolSchema.boolOrEmptySchema = boolOrEmptySchema;
function falseSchemaError(it, overrideAllErrors) {
  const { gen, data } = it;
  const cxt = {
    gen,
    keyword: "false schema",
    data,
    schema: false,
    schemaCode: false,
    schemaValue: false,
    params: {},
    it
  };
  (0, errors_1$3.reportError)(cxt, boolError, void 0, overrideAllErrors);
}
var dataType = {};
var rules = {};
Object.defineProperty(rules, "__esModule", { value: true });
rules.getRules = rules.isJSONType = void 0;
const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
const jsonTypes = new Set(_jsonTypes);
function isJSONType(x) {
  return typeof x == "string" && jsonTypes.has(x);
}
rules.isJSONType = isJSONType;
function getRules() {
  const groups = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...groups, integer: true, boolean: true, null: true },
    rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
rules.getRules = getRules;
var applicability = {};
Object.defineProperty(applicability, "__esModule", { value: true });
applicability.shouldUseRule = applicability.shouldUseGroup = applicability.schemaHasRulesForType = void 0;
function schemaHasRulesForType({ schema, self: self2 }, type2) {
  const group = self2.RULES.types[type2];
  return group && group !== true && shouldUseGroup(schema, group);
}
applicability.schemaHasRulesForType = schemaHasRulesForType;
function shouldUseGroup(schema, group) {
  return group.rules.some((rule) => shouldUseRule(schema, rule));
}
applicability.shouldUseGroup = shouldUseGroup;
function shouldUseRule(schema, rule) {
  var _a;
  return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
}
applicability.shouldUseRule = shouldUseRule;
Object.defineProperty(dataType, "__esModule", { value: true });
dataType.reportTypeError = dataType.checkDataTypes = dataType.checkDataType = dataType.coerceAndCheckDataType = dataType.getJSONTypes = dataType.getSchemaTypes = dataType.DataType = void 0;
const rules_1 = rules;
const applicability_1$1 = applicability;
const errors_1$2 = errors;
const codegen_1$s = codegen;
const util_1$q = util;
var DataType;
(function(DataType2) {
  DataType2[DataType2["Correct"] = 0] = "Correct";
  DataType2[DataType2["Wrong"] = 1] = "Wrong";
})(DataType || (dataType.DataType = DataType = {}));
function getSchemaTypes(schema) {
  const types2 = getJSONTypes(schema.type);
  const hasNull = types2.includes("null");
  if (hasNull) {
    if (schema.nullable === false)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!types2.length && schema.nullable !== void 0) {
      throw new Error('"nullable" cannot be used without "type"');
    }
    if (schema.nullable === true)
      types2.push("null");
  }
  return types2;
}
dataType.getSchemaTypes = getSchemaTypes;
function getJSONTypes(ts) {
  const types2 = Array.isArray(ts) ? ts : ts ? [ts] : [];
  if (types2.every(rules_1.isJSONType))
    return types2;
  throw new Error("type must be JSONType or JSONType[]: " + types2.join(","));
}
dataType.getJSONTypes = getJSONTypes;
function coerceAndCheckDataType(it, types2) {
  const { gen, data, opts } = it;
  const coerceTo = coerceToTypes(types2, opts.coerceTypes);
  const checkTypes = types2.length > 0 && !(coerceTo.length === 0 && types2.length === 1 && (0, applicability_1$1.schemaHasRulesForType)(it, types2[0]));
  if (checkTypes) {
    const wrongType = checkDataTypes(types2, data, opts.strictNumbers, DataType.Wrong);
    gen.if(wrongType, () => {
      if (coerceTo.length)
        coerceData(it, types2, coerceTo);
      else
        reportTypeError(it);
    });
  }
  return checkTypes;
}
dataType.coerceAndCheckDataType = coerceAndCheckDataType;
const COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function coerceToTypes(types2, coerceTypes) {
  return coerceTypes ? types2.filter((t2) => COERCIBLE.has(t2) || coerceTypes === "array" && t2 === "array") : [];
}
function coerceData(it, types2, coerceTo) {
  const { gen, data, opts } = it;
  const dataType2 = gen.let("dataType", (0, codegen_1$s._)`typeof ${data}`);
  const coerced = gen.let("coerced", (0, codegen_1$s._)`undefined`);
  if (opts.coerceTypes === "array") {
    gen.if((0, codegen_1$s._)`${dataType2} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1$s._)`${data}[0]`).assign(dataType2, (0, codegen_1$s._)`typeof ${data}`).if(checkDataTypes(types2, data, opts.strictNumbers), () => gen.assign(coerced, data)));
  }
  gen.if((0, codegen_1$s._)`${coerced} !== undefined`);
  for (const t2 of coerceTo) {
    if (COERCIBLE.has(t2) || t2 === "array" && opts.coerceTypes === "array") {
      coerceSpecificType(t2);
    }
  }
  gen.else();
  reportTypeError(it);
  gen.endIf();
  gen.if((0, codegen_1$s._)`${coerced} !== undefined`, () => {
    gen.assign(data, coerced);
    assignParentData(it, coerced);
  });
  function coerceSpecificType(t2) {
    switch (t2) {
      case "string":
        gen.elseIf((0, codegen_1$s._)`${dataType2} == "number" || ${dataType2} == "boolean"`).assign(coerced, (0, codegen_1$s._)`"" + ${data}`).elseIf((0, codegen_1$s._)`${data} === null`).assign(coerced, (0, codegen_1$s._)`""`);
        return;
      case "number":
        gen.elseIf((0, codegen_1$s._)`${dataType2} == "boolean" || ${data} === null
              || (${dataType2} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1$s._)`+${data}`);
        return;
      case "integer":
        gen.elseIf((0, codegen_1$s._)`${dataType2} === "boolean" || ${data} === null
              || (${dataType2} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1$s._)`+${data}`);
        return;
      case "boolean":
        gen.elseIf((0, codegen_1$s._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1$s._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
        return;
      case "null":
        gen.elseIf((0, codegen_1$s._)`${data} === "" || ${data} === 0 || ${data} === false`);
        gen.assign(coerced, null);
        return;
      case "array":
        gen.elseIf((0, codegen_1$s._)`${dataType2} === "string" || ${dataType2} === "number"
              || ${dataType2} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1$s._)`[${data}]`);
    }
  }
}
function assignParentData({ gen, parentData, parentDataProperty }, expr) {
  gen.if((0, codegen_1$s._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1$s._)`${parentData}[${parentDataProperty}]`, expr));
}
function checkDataType(dataType2, data, strictNums, correct = DataType.Correct) {
  const EQ = correct === DataType.Correct ? codegen_1$s.operators.EQ : codegen_1$s.operators.NEQ;
  let cond;
  switch (dataType2) {
    case "null":
      return (0, codegen_1$s._)`${data} ${EQ} null`;
    case "array":
      cond = (0, codegen_1$s._)`Array.isArray(${data})`;
      break;
    case "object":
      cond = (0, codegen_1$s._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
      break;
    case "integer":
      cond = numCond((0, codegen_1$s._)`!(${data} % 1) && !isNaN(${data})`);
      break;
    case "number":
      cond = numCond();
      break;
    default:
      return (0, codegen_1$s._)`typeof ${data} ${EQ} ${dataType2}`;
  }
  return correct === DataType.Correct ? cond : (0, codegen_1$s.not)(cond);
  function numCond(_cond = codegen_1$s.nil) {
    return (0, codegen_1$s.and)((0, codegen_1$s._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1$s._)`isFinite(${data})` : codegen_1$s.nil);
  }
}
dataType.checkDataType = checkDataType;
function checkDataTypes(dataTypes, data, strictNums, correct) {
  if (dataTypes.length === 1) {
    return checkDataType(dataTypes[0], data, strictNums, correct);
  }
  let cond;
  const types2 = (0, util_1$q.toHash)(dataTypes);
  if (types2.array && types2.object) {
    const notObj = (0, codegen_1$s._)`typeof ${data} != "object"`;
    cond = types2.null ? notObj : (0, codegen_1$s._)`!${data} || ${notObj}`;
    delete types2.null;
    delete types2.array;
    delete types2.object;
  } else {
    cond = codegen_1$s.nil;
  }
  if (types2.number)
    delete types2.integer;
  for (const t2 in types2)
    cond = (0, codegen_1$s.and)(cond, checkDataType(t2, data, strictNums, correct));
  return cond;
}
dataType.checkDataTypes = checkDataTypes;
const typeError = {
  message: ({ schema }) => `must be ${schema}`,
  params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1$s._)`{type: ${schema}}` : (0, codegen_1$s._)`{type: ${schemaValue}}`
};
function reportTypeError(it) {
  const cxt = getTypeErrorContext(it);
  (0, errors_1$2.reportError)(cxt, typeError);
}
dataType.reportTypeError = reportTypeError;
function getTypeErrorContext(it) {
  const { gen, data, schema } = it;
  const schemaCode = (0, util_1$q.schemaRefOrVal)(it, schema, "type");
  return {
    gen,
    keyword: "type",
    data,
    schema: schema.type,
    schemaCode,
    schemaValue: schemaCode,
    parentSchema: schema,
    params: {},
    it
  };
}
var defaults = {};
Object.defineProperty(defaults, "__esModule", { value: true });
defaults.assignDefaults = void 0;
const codegen_1$r = codegen;
const util_1$p = util;
function assignDefaults(it, ty) {
  const { properties: properties2, items: items2 } = it.schema;
  if (ty === "object" && properties2) {
    for (const key in properties2) {
      assignDefault(it, key, properties2[key].default);
    }
  } else if (ty === "array" && Array.isArray(items2)) {
    items2.forEach((sch, i) => assignDefault(it, i, sch.default));
  }
}
defaults.assignDefaults = assignDefaults;
function assignDefault(it, prop, defaultValue) {
  const { gen, compositeRule, data, opts } = it;
  if (defaultValue === void 0)
    return;
  const childData = (0, codegen_1$r._)`${data}${(0, codegen_1$r.getProperty)(prop)}`;
  if (compositeRule) {
    (0, util_1$p.checkStrictMode)(it, `default is ignored for: ${childData}`);
    return;
  }
  let condition = (0, codegen_1$r._)`${childData} === undefined`;
  if (opts.useDefaults === "empty") {
    condition = (0, codegen_1$r._)`${condition} || ${childData} === null || ${childData} === ""`;
  }
  gen.if(condition, (0, codegen_1$r._)`${childData} = ${(0, codegen_1$r.stringify)(defaultValue)}`);
}
var keyword = {};
var code$1 = {};
Object.defineProperty(code$1, "__esModule", { value: true });
code$1.validateUnion = code$1.validateArray = code$1.usePattern = code$1.callValidateCode = code$1.schemaProperties = code$1.allSchemaProperties = code$1.noPropertyInData = code$1.propertyInData = code$1.isOwnProperty = code$1.hasPropFunc = code$1.reportMissingProp = code$1.checkMissingProp = code$1.checkReportMissingProp = void 0;
const codegen_1$q = codegen;
const util_1$o = util;
const names_1$5 = names$1;
const util_2$1 = util;
function checkReportMissingProp(cxt, prop) {
  const { gen, data, it } = cxt;
  gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
    cxt.setParams({ missingProperty: (0, codegen_1$q._)`${prop}` }, true);
    cxt.error();
  });
}
code$1.checkReportMissingProp = checkReportMissingProp;
function checkMissingProp({ gen, data, it: { opts } }, properties2, missing) {
  return (0, codegen_1$q.or)(...properties2.map((prop) => (0, codegen_1$q.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1$q._)`${missing} = ${prop}`)));
}
code$1.checkMissingProp = checkMissingProp;
function reportMissingProp(cxt, missing) {
  cxt.setParams({ missingProperty: missing }, true);
  cxt.error();
}
code$1.reportMissingProp = reportMissingProp;
function hasPropFunc(gen) {
  return gen.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, codegen_1$q._)`Object.prototype.hasOwnProperty`
  });
}
code$1.hasPropFunc = hasPropFunc;
function isOwnProperty(gen, data, property) {
  return (0, codegen_1$q._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
}
code$1.isOwnProperty = isOwnProperty;
function propertyInData(gen, data, property, ownProperties) {
  const cond = (0, codegen_1$q._)`${data}${(0, codegen_1$q.getProperty)(property)} !== undefined`;
  return ownProperties ? (0, codegen_1$q._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
}
code$1.propertyInData = propertyInData;
function noPropertyInData(gen, data, property, ownProperties) {
  const cond = (0, codegen_1$q._)`${data}${(0, codegen_1$q.getProperty)(property)} === undefined`;
  return ownProperties ? (0, codegen_1$q.or)(cond, (0, codegen_1$q.not)(isOwnProperty(gen, data, property))) : cond;
}
code$1.noPropertyInData = noPropertyInData;
function allSchemaProperties(schemaMap) {
  return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
}
code$1.allSchemaProperties = allSchemaProperties;
function schemaProperties(it, schemaMap) {
  return allSchemaProperties(schemaMap).filter((p) => !(0, util_1$o.alwaysValidSchema)(it, schemaMap[p]));
}
code$1.schemaProperties = schemaProperties;
function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
  const dataAndSchema = passSchema ? (0, codegen_1$q._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
  const valCxt = [
    [names_1$5.default.instancePath, (0, codegen_1$q.strConcat)(names_1$5.default.instancePath, errorPath)],
    [names_1$5.default.parentData, it.parentData],
    [names_1$5.default.parentDataProperty, it.parentDataProperty],
    [names_1$5.default.rootData, names_1$5.default.rootData]
  ];
  if (it.opts.dynamicRef)
    valCxt.push([names_1$5.default.dynamicAnchors, names_1$5.default.dynamicAnchors]);
  const args = (0, codegen_1$q._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
  return context !== codegen_1$q.nil ? (0, codegen_1$q._)`${func}.call(${context}, ${args})` : (0, codegen_1$q._)`${func}(${args})`;
}
code$1.callValidateCode = callValidateCode;
const newRegExp = (0, codegen_1$q._)`new RegExp`;
function usePattern({ gen, it: { opts } }, pattern2) {
  const u = opts.unicodeRegExp ? "u" : "";
  const { regExp } = opts.code;
  const rx = regExp(pattern2, u);
  return gen.scopeValue("pattern", {
    key: rx.toString(),
    ref: rx,
    code: (0, codegen_1$q._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2$1.useFunc)(gen, regExp)}(${pattern2}, ${u})`
  });
}
code$1.usePattern = usePattern;
function validateArray(cxt) {
  const { gen, data, keyword: keyword2, it } = cxt;
  const valid2 = gen.name("valid");
  if (it.allErrors) {
    const validArr = gen.let("valid", true);
    validateItems(() => gen.assign(validArr, false));
    return validArr;
  }
  gen.var(valid2, true);
  validateItems(() => gen.break());
  return valid2;
  function validateItems(notValid) {
    const len = gen.const("len", (0, codegen_1$q._)`${data}.length`);
    gen.forRange("i", 0, len, (i) => {
      cxt.subschema({
        keyword: keyword2,
        dataProp: i,
        dataPropType: util_1$o.Type.Num
      }, valid2);
      gen.if((0, codegen_1$q.not)(valid2), notValid);
    });
  }
}
code$1.validateArray = validateArray;
function validateUnion(cxt) {
  const { gen, schema, keyword: keyword2, it } = cxt;
  if (!Array.isArray(schema))
    throw new Error("ajv implementation error");
  const alwaysValid = schema.some((sch) => (0, util_1$o.alwaysValidSchema)(it, sch));
  if (alwaysValid && !it.opts.unevaluated)
    return;
  const valid2 = gen.let("valid", false);
  const schValid = gen.name("_valid");
  gen.block(() => schema.forEach((_sch, i) => {
    const schCxt = cxt.subschema({
      keyword: keyword2,
      schemaProp: i,
      compositeRule: true
    }, schValid);
    gen.assign(valid2, (0, codegen_1$q._)`${valid2} || ${schValid}`);
    const merged = cxt.mergeValidEvaluated(schCxt, schValid);
    if (!merged)
      gen.if((0, codegen_1$q.not)(valid2));
  }));
  cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
}
code$1.validateUnion = validateUnion;
Object.defineProperty(keyword, "__esModule", { value: true });
keyword.validateKeywordUsage = keyword.validSchemaType = keyword.funcKeywordCode = keyword.macroKeywordCode = void 0;
const codegen_1$p = codegen;
const names_1$4 = names$1;
const code_1$9 = code$1;
const errors_1$1 = errors;
function macroKeywordCode(cxt, def2) {
  const { gen, keyword: keyword2, schema, parentSchema, it } = cxt;
  const macroSchema = def2.macro.call(it.self, schema, parentSchema, it);
  const schemaRef = useKeyword(gen, keyword2, macroSchema);
  if (it.opts.validateSchema !== false)
    it.self.validateSchema(macroSchema, true);
  const valid2 = gen.name("valid");
  cxt.subschema({
    schema: macroSchema,
    schemaPath: codegen_1$p.nil,
    errSchemaPath: `${it.errSchemaPath}/${keyword2}`,
    topSchemaRef: schemaRef,
    compositeRule: true
  }, valid2);
  cxt.pass(valid2, () => cxt.error(true));
}
keyword.macroKeywordCode = macroKeywordCode;
function funcKeywordCode(cxt, def2) {
  var _a;
  const { gen, keyword: keyword2, schema, parentSchema, $data, it } = cxt;
  checkAsyncKeyword(it, def2);
  const validate2 = !$data && def2.compile ? def2.compile.call(it.self, schema, parentSchema, it) : def2.validate;
  const validateRef = useKeyword(gen, keyword2, validate2);
  const valid2 = gen.let("valid");
  cxt.block$data(valid2, validateKeyword);
  cxt.ok((_a = def2.valid) !== null && _a !== void 0 ? _a : valid2);
  function validateKeyword() {
    if (def2.errors === false) {
      assignValid();
      if (def2.modifying)
        modifyData(cxt);
      reportErrs(() => cxt.error());
    } else {
      const ruleErrs = def2.async ? validateAsync() : validateSync();
      if (def2.modifying)
        modifyData(cxt);
      reportErrs(() => addErrs(cxt, ruleErrs));
    }
  }
  function validateAsync() {
    const ruleErrs = gen.let("ruleErrs", null);
    gen.try(() => assignValid((0, codegen_1$p._)`await `), (e) => gen.assign(valid2, false).if((0, codegen_1$p._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1$p._)`${e}.errors`), () => gen.throw(e)));
    return ruleErrs;
  }
  function validateSync() {
    const validateErrs = (0, codegen_1$p._)`${validateRef}.errors`;
    gen.assign(validateErrs, null);
    assignValid(codegen_1$p.nil);
    return validateErrs;
  }
  function assignValid(_await = def2.async ? (0, codegen_1$p._)`await ` : codegen_1$p.nil) {
    const passCxt = it.opts.passContext ? names_1$4.default.this : names_1$4.default.self;
    const passSchema = !("compile" in def2 && !$data || def2.schema === false);
    gen.assign(valid2, (0, codegen_1$p._)`${_await}${(0, code_1$9.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def2.modifying);
  }
  function reportErrs(errors2) {
    var _a2;
    gen.if((0, codegen_1$p.not)((_a2 = def2.valid) !== null && _a2 !== void 0 ? _a2 : valid2), errors2);
  }
}
keyword.funcKeywordCode = funcKeywordCode;
function modifyData(cxt) {
  const { gen, data, it } = cxt;
  gen.if(it.parentData, () => gen.assign(data, (0, codegen_1$p._)`${it.parentData}[${it.parentDataProperty}]`));
}
function addErrs(cxt, errs) {
  const { gen } = cxt;
  gen.if((0, codegen_1$p._)`Array.isArray(${errs})`, () => {
    gen.assign(names_1$4.default.vErrors, (0, codegen_1$p._)`${names_1$4.default.vErrors} === null ? ${errs} : ${names_1$4.default.vErrors}.concat(${errs})`).assign(names_1$4.default.errors, (0, codegen_1$p._)`${names_1$4.default.vErrors}.length`);
    (0, errors_1$1.extendErrors)(cxt);
  }, () => cxt.error());
}
function checkAsyncKeyword({ schemaEnv }, def2) {
  if (def2.async && !schemaEnv.$async)
    throw new Error("async keyword in sync schema");
}
function useKeyword(gen, keyword2, result) {
  if (result === void 0)
    throw new Error(`keyword "${keyword2}" failed to compile`);
  return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1$p.stringify)(result) });
}
function validSchemaType(schema, schemaType, allowUndefined = false) {
  return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
}
keyword.validSchemaType = validSchemaType;
function validateKeywordUsage({ schema, opts, self: self2, errSchemaPath }, def2, keyword2) {
  if (Array.isArray(def2.keyword) ? !def2.keyword.includes(keyword2) : def2.keyword !== keyword2) {
    throw new Error("ajv implementation error");
  }
  const deps = def2.dependencies;
  if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
    throw new Error(`parent schema must have dependencies of ${keyword2}: ${deps.join(",")}`);
  }
  if (def2.validateSchema) {
    const valid2 = def2.validateSchema(schema[keyword2]);
    if (!valid2) {
      const msg = `keyword "${keyword2}" value is invalid at path "${errSchemaPath}": ` + self2.errorsText(def2.validateSchema.errors);
      if (opts.validateSchema === "log")
        self2.logger.error(msg);
      else
        throw new Error(msg);
    }
  }
}
keyword.validateKeywordUsage = validateKeywordUsage;
var subschema = {};
Object.defineProperty(subschema, "__esModule", { value: true });
subschema.extendSubschemaMode = subschema.extendSubschemaData = subschema.getSubschema = void 0;
const codegen_1$o = codegen;
const util_1$n = util;
function getSubschema(it, { keyword: keyword2, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
  if (keyword2 !== void 0 && schema !== void 0) {
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  }
  if (keyword2 !== void 0) {
    const sch = it.schema[keyword2];
    return schemaProp === void 0 ? {
      schema: sch,
      schemaPath: (0, codegen_1$o._)`${it.schemaPath}${(0, codegen_1$o.getProperty)(keyword2)}`,
      errSchemaPath: `${it.errSchemaPath}/${keyword2}`
    } : {
      schema: sch[schemaProp],
      schemaPath: (0, codegen_1$o._)`${it.schemaPath}${(0, codegen_1$o.getProperty)(keyword2)}${(0, codegen_1$o.getProperty)(schemaProp)}`,
      errSchemaPath: `${it.errSchemaPath}/${keyword2}/${(0, util_1$n.escapeFragment)(schemaProp)}`
    };
  }
  if (schema !== void 0) {
    if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    }
    return {
      schema,
      schemaPath,
      topSchemaRef,
      errSchemaPath
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
subschema.getSubschema = getSubschema;
function extendSubschemaData(subschema2, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
  if (data !== void 0 && dataProp !== void 0) {
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  }
  const { gen } = it;
  if (dataProp !== void 0) {
    const { errorPath, dataPathArr, opts } = it;
    const nextData = gen.let("data", (0, codegen_1$o._)`${it.data}${(0, codegen_1$o.getProperty)(dataProp)}`, true);
    dataContextProps(nextData);
    subschema2.errorPath = (0, codegen_1$o.str)`${errorPath}${(0, util_1$n.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
    subschema2.parentDataProperty = (0, codegen_1$o._)`${dataProp}`;
    subschema2.dataPathArr = [...dataPathArr, subschema2.parentDataProperty];
  }
  if (data !== void 0) {
    const nextData = data instanceof codegen_1$o.Name ? data : gen.let("data", data, true);
    dataContextProps(nextData);
    if (propertyName !== void 0)
      subschema2.propertyName = propertyName;
  }
  if (dataTypes)
    subschema2.dataTypes = dataTypes;
  function dataContextProps(_nextData) {
    subschema2.data = _nextData;
    subschema2.dataLevel = it.dataLevel + 1;
    subschema2.dataTypes = [];
    it.definedProperties = /* @__PURE__ */ new Set();
    subschema2.parentData = it.data;
    subschema2.dataNames = [...it.dataNames, _nextData];
  }
}
subschema.extendSubschemaData = extendSubschemaData;
function extendSubschemaMode(subschema2, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
  if (compositeRule !== void 0)
    subschema2.compositeRule = compositeRule;
  if (createErrors !== void 0)
    subschema2.createErrors = createErrors;
  if (allErrors !== void 0)
    subschema2.allErrors = allErrors;
  subschema2.jtdDiscriminator = jtdDiscriminator;
  subschema2.jtdMetadata = jtdMetadata;
}
subschema.extendSubschemaMode = extendSubschemaMode;
var resolve$1 = {};
var jsonSchemaTraverse = { exports: {} };
var traverse$1 = jsonSchemaTraverse.exports = function(schema, opts, cb) {
  if (typeof opts == "function") {
    cb = opts;
    opts = {};
  }
  cb = opts.cb || cb;
  var pre = typeof cb == "function" ? cb : cb.pre || function() {
  };
  var post = cb.post || function() {
  };
  _traverse(opts, pre, post, schema, "", schema);
};
traverse$1.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};
traverse$1.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};
traverse$1.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};
traverse$1.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};
function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == "object" && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse$1.arrayKeywords) {
          for (var i = 0; i < sch.length; i++)
            _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse$1.propsKeywords) {
        if (sch && typeof sch == "object") {
          for (var prop in sch)
            _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse$1.keywords || opts.allKeys && !(key in traverse$1.skipKeywords)) {
        _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}
function escapeJsonPtr(str) {
  return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
var jsonSchemaTraverseExports = jsonSchemaTraverse.exports;
Object.defineProperty(resolve$1, "__esModule", { value: true });
resolve$1.getSchemaRefs = resolve$1.resolveUrl = resolve$1.normalizeId = resolve$1._getFullPath = resolve$1.getFullPath = resolve$1.inlineRef = void 0;
const util_1$m = util;
const equal$2 = fastDeepEqual;
const traverse = jsonSchemaTraverseExports;
const SIMPLE_INLINED = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function inlineRef(schema, limit2 = true) {
  if (typeof schema == "boolean")
    return true;
  if (limit2 === true)
    return !hasRef(schema);
  if (!limit2)
    return false;
  return countKeys(schema) <= limit2;
}
resolve$1.inlineRef = inlineRef;
const REF_KEYWORDS = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function hasRef(schema) {
  for (const key in schema) {
    if (REF_KEYWORDS.has(key))
      return true;
    const sch = schema[key];
    if (Array.isArray(sch) && sch.some(hasRef))
      return true;
    if (typeof sch == "object" && hasRef(sch))
      return true;
  }
  return false;
}
function countKeys(schema) {
  let count = 0;
  for (const key in schema) {
    if (key === "$ref")
      return Infinity;
    count++;
    if (SIMPLE_INLINED.has(key))
      continue;
    if (typeof schema[key] == "object") {
      (0, util_1$m.eachItem)(schema[key], (sch) => count += countKeys(sch));
    }
    if (count === Infinity)
      return Infinity;
  }
  return count;
}
function getFullPath(resolver, id2 = "", normalize2) {
  if (normalize2 !== false)
    id2 = normalizeId(id2);
  const p = resolver.parse(id2);
  return _getFullPath(resolver, p);
}
resolve$1.getFullPath = getFullPath;
function _getFullPath(resolver, p) {
  const serialized = resolver.serialize(p);
  return serialized.split("#")[0] + "#";
}
resolve$1._getFullPath = _getFullPath;
const TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id2) {
  return id2 ? id2.replace(TRAILING_SLASH_HASH, "") : "";
}
resolve$1.normalizeId = normalizeId;
function resolveUrl(resolver, baseId, id2) {
  id2 = normalizeId(id2);
  return resolver.resolve(baseId, id2);
}
resolve$1.resolveUrl = resolveUrl;
const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs(schema, baseId) {
  if (typeof schema == "boolean")
    return {};
  const { schemaId, uriResolver } = this.opts;
  const schId = normalizeId(schema[schemaId] || baseId);
  const baseIds = { "": schId };
  const pathPrefix = getFullPath(uriResolver, schId, false);
  const localRefs = {};
  const schemaRefs = /* @__PURE__ */ new Set();
  traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
    if (parentJsonPtr === void 0)
      return;
    const fullPath = pathPrefix + jsonPtr;
    let innerBaseId = baseIds[parentJsonPtr];
    if (typeof sch[schemaId] == "string")
      innerBaseId = addRef.call(this, sch[schemaId]);
    addAnchor.call(this, sch.$anchor);
    addAnchor.call(this, sch.$dynamicAnchor);
    baseIds[jsonPtr] = innerBaseId;
    function addRef(ref2) {
      const _resolve = this.opts.uriResolver.resolve;
      ref2 = normalizeId(innerBaseId ? _resolve(innerBaseId, ref2) : ref2);
      if (schemaRefs.has(ref2))
        throw ambiguos(ref2);
      schemaRefs.add(ref2);
      let schOrRef = this.refs[ref2];
      if (typeof schOrRef == "string")
        schOrRef = this.refs[schOrRef];
      if (typeof schOrRef == "object") {
        checkAmbiguosRef(sch, schOrRef.schema, ref2);
      } else if (ref2 !== normalizeId(fullPath)) {
        if (ref2[0] === "#") {
          checkAmbiguosRef(sch, localRefs[ref2], ref2);
          localRefs[ref2] = sch;
        } else {
          this.refs[ref2] = fullPath;
        }
      }
      return ref2;
    }
    function addAnchor(anchor) {
      if (typeof anchor == "string") {
        if (!ANCHOR.test(anchor))
          throw new Error(`invalid anchor "${anchor}"`);
        addRef.call(this, `#${anchor}`);
      }
    }
  });
  return localRefs;
  function checkAmbiguosRef(sch1, sch2, ref2) {
    if (sch2 !== void 0 && !equal$2(sch1, sch2))
      throw ambiguos(ref2);
  }
  function ambiguos(ref2) {
    return new Error(`reference "${ref2}" resolves to more than one schema`);
  }
}
resolve$1.getSchemaRefs = getSchemaRefs;
Object.defineProperty(validate, "__esModule", { value: true });
validate.getData = validate.KeywordCxt = validate.validateFunctionCode = void 0;
const boolSchema_1 = boolSchema;
const dataType_1$1 = dataType;
const applicability_1 = applicability;
const dataType_2 = dataType;
const defaults_1 = defaults;
const keyword_1 = keyword;
const subschema_1 = subschema;
const codegen_1$n = codegen;
const names_1$3 = names$1;
const resolve_1$2 = resolve$1;
const util_1$l = util;
const errors_1 = errors;
function validateFunctionCode(it) {
  if (isSchemaObj(it)) {
    checkKeywords(it);
    if (schemaCxtHasRules(it)) {
      topSchemaObjCode(it);
      return;
    }
  }
  validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
}
validate.validateFunctionCode = validateFunctionCode;
function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
  if (opts.code.es5) {
    gen.func(validateName, (0, codegen_1$n._)`${names_1$3.default.data}, ${names_1$3.default.valCxt}`, schemaEnv.$async, () => {
      gen.code((0, codegen_1$n._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
      destructureValCxtES5(gen, opts);
      gen.code(body);
    });
  } else {
    gen.func(validateName, (0, codegen_1$n._)`${names_1$3.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
  }
}
function destructureValCxt(opts) {
  return (0, codegen_1$n._)`{${names_1$3.default.instancePath}="", ${names_1$3.default.parentData}, ${names_1$3.default.parentDataProperty}, ${names_1$3.default.rootData}=${names_1$3.default.data}${opts.dynamicRef ? (0, codegen_1$n._)`, ${names_1$3.default.dynamicAnchors}={}` : codegen_1$n.nil}}={}`;
}
function destructureValCxtES5(gen, opts) {
  gen.if(names_1$3.default.valCxt, () => {
    gen.var(names_1$3.default.instancePath, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.instancePath}`);
    gen.var(names_1$3.default.parentData, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.parentData}`);
    gen.var(names_1$3.default.parentDataProperty, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.parentDataProperty}`);
    gen.var(names_1$3.default.rootData, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.rootData}`);
    if (opts.dynamicRef)
      gen.var(names_1$3.default.dynamicAnchors, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.dynamicAnchors}`);
  }, () => {
    gen.var(names_1$3.default.instancePath, (0, codegen_1$n._)`""`);
    gen.var(names_1$3.default.parentData, (0, codegen_1$n._)`undefined`);
    gen.var(names_1$3.default.parentDataProperty, (0, codegen_1$n._)`undefined`);
    gen.var(names_1$3.default.rootData, names_1$3.default.data);
    if (opts.dynamicRef)
      gen.var(names_1$3.default.dynamicAnchors, (0, codegen_1$n._)`{}`);
  });
}
function topSchemaObjCode(it) {
  const { schema, opts, gen } = it;
  validateFunction(it, () => {
    if (opts.$comment && schema.$comment)
      commentKeyword(it);
    checkNoDefault(it);
    gen.let(names_1$3.default.vErrors, null);
    gen.let(names_1$3.default.errors, 0);
    if (opts.unevaluated)
      resetEvaluated(it);
    typeAndKeywords(it);
    returnResults(it);
  });
  return;
}
function resetEvaluated(it) {
  const { gen, validateName } = it;
  it.evaluated = gen.const("evaluated", (0, codegen_1$n._)`${validateName}.evaluated`);
  gen.if((0, codegen_1$n._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1$n._)`${it.evaluated}.props`, (0, codegen_1$n._)`undefined`));
  gen.if((0, codegen_1$n._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1$n._)`${it.evaluated}.items`, (0, codegen_1$n._)`undefined`));
}
function funcSourceUrl(schema, opts) {
  const schId = typeof schema == "object" && schema[opts.schemaId];
  return schId && (opts.code.source || opts.code.process) ? (0, codegen_1$n._)`/*# sourceURL=${schId} */` : codegen_1$n.nil;
}
function subschemaCode(it, valid2) {
  if (isSchemaObj(it)) {
    checkKeywords(it);
    if (schemaCxtHasRules(it)) {
      subSchemaObjCode(it, valid2);
      return;
    }
  }
  (0, boolSchema_1.boolOrEmptySchema)(it, valid2);
}
function schemaCxtHasRules({ schema, self: self2 }) {
  if (typeof schema == "boolean")
    return !schema;
  for (const key in schema)
    if (self2.RULES.all[key])
      return true;
  return false;
}
function isSchemaObj(it) {
  return typeof it.schema != "boolean";
}
function subSchemaObjCode(it, valid2) {
  const { schema, gen, opts } = it;
  if (opts.$comment && schema.$comment)
    commentKeyword(it);
  updateContext(it);
  checkAsyncSchema(it);
  const errsCount = gen.const("_errs", names_1$3.default.errors);
  typeAndKeywords(it, errsCount);
  gen.var(valid2, (0, codegen_1$n._)`${errsCount} === ${names_1$3.default.errors}`);
}
function checkKeywords(it) {
  (0, util_1$l.checkUnknownRules)(it);
  checkRefsAndKeywords(it);
}
function typeAndKeywords(it, errsCount) {
  if (it.opts.jtd)
    return schemaKeywords(it, [], false, errsCount);
  const types2 = (0, dataType_1$1.getSchemaTypes)(it.schema);
  const checkedTypes = (0, dataType_1$1.coerceAndCheckDataType)(it, types2);
  schemaKeywords(it, types2, !checkedTypes, errsCount);
}
function checkRefsAndKeywords(it) {
  const { schema, errSchemaPath, opts, self: self2 } = it;
  if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1$l.schemaHasRulesButRef)(schema, self2.RULES)) {
    self2.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
  }
}
function checkNoDefault(it) {
  const { schema, opts } = it;
  if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
    (0, util_1$l.checkStrictMode)(it, "default is ignored in the schema root");
  }
}
function updateContext(it) {
  const schId = it.schema[it.opts.schemaId];
  if (schId)
    it.baseId = (0, resolve_1$2.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
}
function checkAsyncSchema(it) {
  if (it.schema.$async && !it.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
  const msg = schema.$comment;
  if (opts.$comment === true) {
    gen.code((0, codegen_1$n._)`${names_1$3.default.self}.logger.log(${msg})`);
  } else if (typeof opts.$comment == "function") {
    const schemaPath = (0, codegen_1$n.str)`${errSchemaPath}/$comment`;
    const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
    gen.code((0, codegen_1$n._)`${names_1$3.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
  }
}
function returnResults(it) {
  const { gen, schemaEnv, validateName, ValidationError: ValidationError3, opts } = it;
  if (schemaEnv.$async) {
    gen.if((0, codegen_1$n._)`${names_1$3.default.errors} === 0`, () => gen.return(names_1$3.default.data), () => gen.throw((0, codegen_1$n._)`new ${ValidationError3}(${names_1$3.default.vErrors})`));
  } else {
    gen.assign((0, codegen_1$n._)`${validateName}.errors`, names_1$3.default.vErrors);
    if (opts.unevaluated)
      assignEvaluated(it);
    gen.return((0, codegen_1$n._)`${names_1$3.default.errors} === 0`);
  }
}
function assignEvaluated({ gen, evaluated, props, items: items2 }) {
  if (props instanceof codegen_1$n.Name)
    gen.assign((0, codegen_1$n._)`${evaluated}.props`, props);
  if (items2 instanceof codegen_1$n.Name)
    gen.assign((0, codegen_1$n._)`${evaluated}.items`, items2);
}
function schemaKeywords(it, types2, typeErrors, errsCount) {
  const { gen, schema, data, allErrors, opts, self: self2 } = it;
  const { RULES } = self2;
  if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1$l.schemaHasRulesButRef)(schema, RULES))) {
    gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
    return;
  }
  if (!opts.jtd)
    checkStrictTypes(it, types2);
  gen.block(() => {
    for (const group of RULES.rules)
      groupKeywords(group);
    groupKeywords(RULES.post);
  });
  function groupKeywords(group) {
    if (!(0, applicability_1.shouldUseGroup)(schema, group))
      return;
    if (group.type) {
      gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
      iterateKeywords(it, group);
      if (types2.length === 1 && types2[0] === group.type && typeErrors) {
        gen.else();
        (0, dataType_2.reportTypeError)(it);
      }
      gen.endIf();
    } else {
      iterateKeywords(it, group);
    }
    if (!allErrors)
      gen.if((0, codegen_1$n._)`${names_1$3.default.errors} === ${errsCount || 0}`);
  }
}
function iterateKeywords(it, group) {
  const { gen, schema, opts: { useDefaults } } = it;
  if (useDefaults)
    (0, defaults_1.assignDefaults)(it, group.type);
  gen.block(() => {
    for (const rule of group.rules) {
      if ((0, applicability_1.shouldUseRule)(schema, rule)) {
        keywordCode(it, rule.keyword, rule.definition, group.type);
      }
    }
  });
}
function checkStrictTypes(it, types2) {
  if (it.schemaEnv.meta || !it.opts.strictTypes)
    return;
  checkContextTypes(it, types2);
  if (!it.opts.allowUnionTypes)
    checkMultipleTypes(it, types2);
  checkKeywordTypes(it, it.dataTypes);
}
function checkContextTypes(it, types2) {
  if (!types2.length)
    return;
  if (!it.dataTypes.length) {
    it.dataTypes = types2;
    return;
  }
  types2.forEach((t2) => {
    if (!includesType(it.dataTypes, t2)) {
      strictTypesError(it, `type "${t2}" not allowed by context "${it.dataTypes.join(",")}"`);
    }
  });
  narrowSchemaTypes(it, types2);
}
function checkMultipleTypes(it, ts) {
  if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
    strictTypesError(it, "use allowUnionTypes to allow union type keyword");
  }
}
function checkKeywordTypes(it, ts) {
  const rules2 = it.self.RULES.all;
  for (const keyword2 in rules2) {
    const rule = rules2[keyword2];
    if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
      const { type: type2 } = rule.definition;
      if (type2.length && !type2.some((t2) => hasApplicableType(ts, t2))) {
        strictTypesError(it, `missing type "${type2.join(",")}" for keyword "${keyword2}"`);
      }
    }
  }
}
function hasApplicableType(schTs, kwdT) {
  return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
}
function includesType(ts, t2) {
  return ts.includes(t2) || t2 === "integer" && ts.includes("number");
}
function narrowSchemaTypes(it, withTypes) {
  const ts = [];
  for (const t2 of it.dataTypes) {
    if (includesType(withTypes, t2))
      ts.push(t2);
    else if (withTypes.includes("integer") && t2 === "number")
      ts.push("integer");
  }
  it.dataTypes = ts;
}
function strictTypesError(it, msg) {
  const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
  msg += ` at "${schemaPath}" (strictTypes)`;
  (0, util_1$l.checkStrictMode)(it, msg, it.opts.strictTypes);
}
class KeywordCxt2 {
  constructor(it, def2, keyword2) {
    (0, keyword_1.validateKeywordUsage)(it, def2, keyword2);
    this.gen = it.gen;
    this.allErrors = it.allErrors;
    this.keyword = keyword2;
    this.data = it.data;
    this.schema = it.schema[keyword2];
    this.$data = def2.$data && it.opts.$data && this.schema && this.schema.$data;
    this.schemaValue = (0, util_1$l.schemaRefOrVal)(it, this.schema, keyword2, this.$data);
    this.schemaType = def2.schemaType;
    this.parentSchema = it.schema;
    this.params = {};
    this.it = it;
    this.def = def2;
    if (this.$data) {
      this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
    } else {
      this.schemaCode = this.schemaValue;
      if (!(0, keyword_1.validSchemaType)(this.schema, def2.schemaType, def2.allowUndefined)) {
        throw new Error(`${keyword2} value must be ${JSON.stringify(def2.schemaType)}`);
      }
    }
    if ("code" in def2 ? def2.trackErrors : def2.errors !== false) {
      this.errsCount = it.gen.const("_errs", names_1$3.default.errors);
    }
  }
  result(condition, successAction, failAction) {
    this.failResult((0, codegen_1$n.not)(condition), successAction, failAction);
  }
  failResult(condition, successAction, failAction) {
    this.gen.if(condition);
    if (failAction)
      failAction();
    else
      this.error();
    if (successAction) {
      this.gen.else();
      successAction();
      if (this.allErrors)
        this.gen.endIf();
    } else {
      if (this.allErrors)
        this.gen.endIf();
      else
        this.gen.else();
    }
  }
  pass(condition, failAction) {
    this.failResult((0, codegen_1$n.not)(condition), void 0, failAction);
  }
  fail(condition) {
    if (condition === void 0) {
      this.error();
      if (!this.allErrors)
        this.gen.if(false);
      return;
    }
    this.gen.if(condition);
    this.error();
    if (this.allErrors)
      this.gen.endIf();
    else
      this.gen.else();
  }
  fail$data(condition) {
    if (!this.$data)
      return this.fail(condition);
    const { schemaCode } = this;
    this.fail((0, codegen_1$n._)`${schemaCode} !== undefined && (${(0, codegen_1$n.or)(this.invalid$data(), condition)})`);
  }
  error(append, errorParams, errorPaths) {
    if (errorParams) {
      this.setParams(errorParams);
      this._error(append, errorPaths);
      this.setParams({});
      return;
    }
    this._error(append, errorPaths);
  }
  _error(append, errorPaths) {
    (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
  }
  $dataError() {
    (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(cond) {
    if (!this.allErrors)
      this.gen.if(cond);
  }
  setParams(obj, assign2) {
    if (assign2)
      Object.assign(this.params, obj);
    else
      this.params = obj;
  }
  block$data(valid2, codeBlock, $dataValid = codegen_1$n.nil) {
    this.gen.block(() => {
      this.check$data(valid2, $dataValid);
      codeBlock();
    });
  }
  check$data(valid2 = codegen_1$n.nil, $dataValid = codegen_1$n.nil) {
    if (!this.$data)
      return;
    const { gen, schemaCode, schemaType, def: def2 } = this;
    gen.if((0, codegen_1$n.or)((0, codegen_1$n._)`${schemaCode} === undefined`, $dataValid));
    if (valid2 !== codegen_1$n.nil)
      gen.assign(valid2, true);
    if (schemaType.length || def2.validateSchema) {
      gen.elseIf(this.invalid$data());
      this.$dataError();
      if (valid2 !== codegen_1$n.nil)
        gen.assign(valid2, false);
    }
    gen.else();
  }
  invalid$data() {
    const { gen, schemaCode, schemaType, def: def2, it } = this;
    return (0, codegen_1$n.or)(wrong$DataType(), invalid$DataSchema());
    function wrong$DataType() {
      if (schemaType.length) {
        if (!(schemaCode instanceof codegen_1$n.Name))
          throw new Error("ajv implementation error");
        const st = Array.isArray(schemaType) ? schemaType : [schemaType];
        return (0, codegen_1$n._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
      }
      return codegen_1$n.nil;
    }
    function invalid$DataSchema() {
      if (def2.validateSchema) {
        const validateSchemaRef = gen.scopeValue("validate$data", { ref: def2.validateSchema });
        return (0, codegen_1$n._)`!${validateSchemaRef}(${schemaCode})`;
      }
      return codegen_1$n.nil;
    }
  }
  subschema(appl, valid2) {
    const subschema2 = (0, subschema_1.getSubschema)(this.it, appl);
    (0, subschema_1.extendSubschemaData)(subschema2, this.it, appl);
    (0, subschema_1.extendSubschemaMode)(subschema2, appl);
    const nextContext = { ...this.it, ...subschema2, items: void 0, props: void 0 };
    subschemaCode(nextContext, valid2);
    return nextContext;
  }
  mergeEvaluated(schemaCxt, toName) {
    const { it, gen } = this;
    if (!it.opts.unevaluated)
      return;
    if (it.props !== true && schemaCxt.props !== void 0) {
      it.props = util_1$l.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
    }
    if (it.items !== true && schemaCxt.items !== void 0) {
      it.items = util_1$l.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
    }
  }
  mergeValidEvaluated(schemaCxt, valid2) {
    const { it, gen } = this;
    if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
      gen.if(valid2, () => this.mergeEvaluated(schemaCxt, codegen_1$n.Name));
      return true;
    }
  }
}
validate.KeywordCxt = KeywordCxt2;
function keywordCode(it, keyword2, def2, ruleType) {
  const cxt = new KeywordCxt2(it, def2, keyword2);
  if ("code" in def2) {
    def2.code(cxt, ruleType);
  } else if (cxt.$data && def2.validate) {
    (0, keyword_1.funcKeywordCode)(cxt, def2);
  } else if ("macro" in def2) {
    (0, keyword_1.macroKeywordCode)(cxt, def2);
  } else if (def2.compile || def2.validate) {
    (0, keyword_1.funcKeywordCode)(cxt, def2);
  }
}
const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, { dataLevel, dataNames, dataPathArr }) {
  let jsonPointer;
  let data;
  if ($data === "")
    return names_1$3.default.rootData;
  if ($data[0] === "/") {
    if (!JSON_POINTER.test($data))
      throw new Error(`Invalid JSON-pointer: ${$data}`);
    jsonPointer = $data;
    data = names_1$3.default.rootData;
  } else {
    const matches = RELATIVE_JSON_POINTER.exec($data);
    if (!matches)
      throw new Error(`Invalid JSON-pointer: ${$data}`);
    const up = +matches[1];
    jsonPointer = matches[2];
    if (jsonPointer === "#") {
      if (up >= dataLevel)
        throw new Error(errorMsg("property/index", up));
      return dataPathArr[dataLevel - up];
    }
    if (up > dataLevel)
      throw new Error(errorMsg("data", up));
    data = dataNames[dataLevel - up];
    if (!jsonPointer)
      return data;
  }
  let expr = data;
  const segments = jsonPointer.split("/");
  for (const segment of segments) {
    if (segment) {
      data = (0, codegen_1$n._)`${data}${(0, codegen_1$n.getProperty)((0, util_1$l.unescapeJsonPointer)(segment))}`;
      expr = (0, codegen_1$n._)`${expr} && ${data}`;
    }
  }
  return expr;
  function errorMsg(pointerType, up) {
    return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
  }
}
validate.getData = getData;
var validation_error = {};
Object.defineProperty(validation_error, "__esModule", { value: true });
class ValidationError2 extends Error {
  constructor(errors2) {
    super("validation failed");
    this.errors = errors2;
    this.ajv = this.validation = true;
  }
}
validation_error.default = ValidationError2;
var ref_error = {};
Object.defineProperty(ref_error, "__esModule", { value: true });
const resolve_1$1 = resolve$1;
class MissingRefError2 extends Error {
  constructor(resolver, baseId, ref2, msg) {
    super(msg || `can't resolve reference ${ref2} from id ${baseId}`);
    this.missingRef = (0, resolve_1$1.resolveUrl)(resolver, baseId, ref2);
    this.missingSchema = (0, resolve_1$1.normalizeId)((0, resolve_1$1.getFullPath)(resolver, this.missingRef));
  }
}
ref_error.default = MissingRefError2;
var compile = {};
Object.defineProperty(compile, "__esModule", { value: true });
compile.resolveSchema = compile.getCompilingSchema = compile.resolveRef = compile.compileSchema = compile.SchemaEnv = void 0;
const codegen_1$m = codegen;
const validation_error_1 = validation_error;
const names_1$2 = names$1;
const resolve_1 = resolve$1;
const util_1$k = util;
const validate_1$1 = validate;
class SchemaEnv2 {
  constructor(env2) {
    var _a;
    this.refs = {};
    this.dynamicAnchors = {};
    let schema;
    if (typeof env2.schema == "object")
      schema = env2.schema;
    this.schema = env2.schema;
    this.schemaId = env2.schemaId;
    this.root = env2.root || this;
    this.baseId = (_a = env2.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env2.schemaId || "$id"]);
    this.schemaPath = env2.schemaPath;
    this.localRefs = env2.localRefs;
    this.meta = env2.meta;
    this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
    this.refs = {};
  }
}
compile.SchemaEnv = SchemaEnv2;
function compileSchema(sch) {
  const _sch = getCompilingSchema.call(this, sch);
  if (_sch)
    return _sch;
  const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
  const { es5, lines } = this.opts.code;
  const { ownProperties } = this.opts;
  const gen = new codegen_1$m.CodeGen(this.scope, { es5, lines, ownProperties });
  let _ValidationError;
  if (sch.$async) {
    _ValidationError = gen.scopeValue("Error", {
      ref: validation_error_1.default,
      code: (0, codegen_1$m._)`require("ajv/dist/runtime/validation_error").default`
    });
  }
  const validateName = gen.scopeName("validate");
  sch.validateName = validateName;
  const schemaCxt = {
    gen,
    allErrors: this.opts.allErrors,
    data: names_1$2.default.data,
    parentData: names_1$2.default.parentData,
    parentDataProperty: names_1$2.default.parentDataProperty,
    dataNames: [names_1$2.default.data],
    dataPathArr: [codegen_1$m.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1$m.stringify)(sch.schema) } : { ref: sch.schema }),
    validateName,
    ValidationError: _ValidationError,
    schema: sch.schema,
    schemaEnv: sch,
    rootId,
    baseId: sch.baseId || rootId,
    schemaPath: codegen_1$m.nil,
    errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, codegen_1$m._)`""`,
    opts: this.opts,
    self: this
  };
  let sourceCode;
  try {
    this._compilations.add(sch);
    (0, validate_1$1.validateFunctionCode)(schemaCxt);
    gen.optimize(this.opts.code.optimize);
    const validateCode = gen.toString();
    sourceCode = `${gen.scopeRefs(names_1$2.default.scope)}return ${validateCode}`;
    if (this.opts.code.process)
      sourceCode = this.opts.code.process(sourceCode, sch);
    const makeValidate = new Function(`${names_1$2.default.self}`, `${names_1$2.default.scope}`, sourceCode);
    const validate2 = makeValidate(this, this.scope.get());
    this.scope.value(validateName, { ref: validate2 });
    validate2.errors = null;
    validate2.schema = sch.schema;
    validate2.schemaEnv = sch;
    if (sch.$async)
      validate2.$async = true;
    if (this.opts.code.source === true) {
      validate2.source = { validateName, validateCode, scopeValues: gen._values };
    }
    if (this.opts.unevaluated) {
      const { props, items: items2 } = schemaCxt;
      validate2.evaluated = {
        props: props instanceof codegen_1$m.Name ? void 0 : props,
        items: items2 instanceof codegen_1$m.Name ? void 0 : items2,
        dynamicProps: props instanceof codegen_1$m.Name,
        dynamicItems: items2 instanceof codegen_1$m.Name
      };
      if (validate2.source)
        validate2.source.evaluated = (0, codegen_1$m.stringify)(validate2.evaluated);
    }
    sch.validate = validate2;
    return sch;
  } catch (e) {
    delete sch.validate;
    delete sch.validateName;
    if (sourceCode)
      this.logger.error("Error compiling schema, function code:", sourceCode);
    throw e;
  } finally {
    this._compilations.delete(sch);
  }
}
compile.compileSchema = compileSchema;
function resolveRef(root, baseId, ref2) {
  var _a;
  ref2 = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref2);
  const schOrFunc = root.refs[ref2];
  if (schOrFunc)
    return schOrFunc;
  let _sch = resolve.call(this, root, ref2);
  if (_sch === void 0) {
    const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref2];
    const { schemaId } = this.opts;
    if (schema)
      _sch = new SchemaEnv2({ schema, schemaId, root, baseId });
  }
  if (_sch === void 0)
    return;
  return root.refs[ref2] = inlineOrCompile.call(this, _sch);
}
compile.resolveRef = resolveRef;
function inlineOrCompile(sch) {
  if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
    return sch.schema;
  return sch.validate ? sch : compileSchema.call(this, sch);
}
function getCompilingSchema(schEnv) {
  for (const sch of this._compilations) {
    if (sameSchemaEnv(sch, schEnv))
      return sch;
  }
}
compile.getCompilingSchema = getCompilingSchema;
function sameSchemaEnv(s1, s2) {
  return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
function resolve(root, ref2) {
  let sch;
  while (typeof (sch = this.refs[ref2]) == "string")
    ref2 = sch;
  return sch || this.schemas[ref2] || resolveSchema.call(this, root, ref2);
}
function resolveSchema(root, ref2) {
  const p = this.opts.uriResolver.parse(ref2);
  const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
  let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
  if (Object.keys(root.schema).length > 0 && refPath === baseId) {
    return getJsonPointer.call(this, p, root);
  }
  const id2 = (0, resolve_1.normalizeId)(refPath);
  const schOrRef = this.refs[id2] || this.schemas[id2];
  if (typeof schOrRef == "string") {
    const sch = resolveSchema.call(this, root, schOrRef);
    if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
      return;
    return getJsonPointer.call(this, p, sch);
  }
  if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
    return;
  if (!schOrRef.validate)
    compileSchema.call(this, schOrRef);
  if (id2 === (0, resolve_1.normalizeId)(ref2)) {
    const { schema } = schOrRef;
    const { schemaId } = this.opts;
    const schId = schema[schemaId];
    if (schId)
      baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
    return new SchemaEnv2({ schema, schemaId, root, baseId });
  }
  return getJsonPointer.call(this, p, schOrRef);
}
compile.resolveSchema = resolveSchema;
const PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function getJsonPointer(parsedRef, { baseId, schema, root }) {
  var _a;
  if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
    return;
  for (const part of parsedRef.fragment.slice(1).split("/")) {
    if (typeof schema === "boolean")
      return;
    const partSchema = schema[(0, util_1$k.unescapeFragment)(part)];
    if (partSchema === void 0)
      return;
    schema = partSchema;
    const schId = typeof schema === "object" && schema[this.opts.schemaId];
    if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
      baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
    }
  }
  let env2;
  if (typeof schema != "boolean" && schema.$ref && !(0, util_1$k.schemaHasRulesButRef)(schema, this.RULES)) {
    const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
    env2 = resolveSchema.call(this, root, $ref);
  }
  const { schemaId } = this.opts;
  env2 = env2 || new SchemaEnv2({ schema, schemaId, root, baseId });
  if (env2.schema !== env2.root.schema)
    return env2;
  return void 0;
}
const $id$1 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
const description = "Meta-schema for $data reference (JSON AnySchema extension proposal)";
const type$2 = "object";
const required$1 = [
  "$data"
];
const properties$2 = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
};
const additionalProperties$1 = false;
const require$$9 = {
  $id: $id$1,
  description,
  type: type$2,
  required: required$1,
  properties: properties$2,
  additionalProperties: additionalProperties$1
};
var uri$1 = {};
Object.defineProperty(uri$1, "__esModule", { value: true });
const uri = fastUriExports;
uri.code = 'require("ajv/dist/runtime/uri").default';
uri$1.default = uri;
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.CodeGen = exports$1.Name = exports$1.nil = exports$1.stringify = exports$1.str = exports$1._ = exports$1.KeywordCxt = void 0;
  var validate_12 = validate;
  Object.defineProperty(exports$1, "KeywordCxt", { enumerable: true, get: function() {
    return validate_12.KeywordCxt;
  } });
  var codegen_12 = codegen;
  Object.defineProperty(exports$1, "_", { enumerable: true, get: function() {
    return codegen_12._;
  } });
  Object.defineProperty(exports$1, "str", { enumerable: true, get: function() {
    return codegen_12.str;
  } });
  Object.defineProperty(exports$1, "stringify", { enumerable: true, get: function() {
    return codegen_12.stringify;
  } });
  Object.defineProperty(exports$1, "nil", { enumerable: true, get: function() {
    return codegen_12.nil;
  } });
  Object.defineProperty(exports$1, "Name", { enumerable: true, get: function() {
    return codegen_12.Name;
  } });
  Object.defineProperty(exports$1, "CodeGen", { enumerable: true, get: function() {
    return codegen_12.CodeGen;
  } });
  const validation_error_12 = validation_error;
  const ref_error_12 = ref_error;
  const rules_12 = rules;
  const compile_12 = compile;
  const codegen_2 = codegen;
  const resolve_12 = resolve$1;
  const dataType_12 = dataType;
  const util_12 = util;
  const $dataRefSchema = require$$9;
  const uri_1 = uri$1;
  const defaultRegExp = (str, flags) => new RegExp(str, flags);
  defaultRegExp.code = "new RegExp";
  const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
  const EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]);
  const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  };
  const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  };
  const MAX_EXPRESSION = 200;
  function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    const s = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
    const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
    const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
    return {
      strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
      strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
      strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
      strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
      strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
      code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
      loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
      loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
      meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
      messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
      inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
      schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
      addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
      validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
      validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
      unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
      int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
      uriResolver
    };
  }
  class Ajv {
    constructor(opts = {}) {
      this.schemas = {};
      this.refs = {};
      this.formats = {};
      this._compilations = /* @__PURE__ */ new Set();
      this._loading = {};
      this._cache = /* @__PURE__ */ new Map();
      opts = this.opts = { ...opts, ...requiredOptions(opts) };
      const { es5, lines } = this.opts.code;
      this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
      this.logger = getLogger(opts.logger);
      const formatOpt = opts.validateFormats;
      opts.validateFormats = false;
      this.RULES = (0, rules_12.getRules)();
      checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
      checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
      this._metaOpts = getMetaSchemaOptions.call(this);
      if (opts.formats)
        addInitialFormats.call(this);
      this._addVocabularies();
      this._addDefaultMetaSchema();
      if (opts.keywords)
        addInitialKeywords.call(this, opts.keywords);
      if (typeof opts.meta == "object")
        this.addMetaSchema(opts.meta);
      addInitialSchemas.call(this);
      opts.validateFormats = formatOpt;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data, meta, schemaId } = this.opts;
      let _dataRefSchema = $dataRefSchema;
      if (schemaId === "id") {
        _dataRefSchema = { ...$dataRefSchema };
        _dataRefSchema.id = _dataRefSchema.$id;
        delete _dataRefSchema.$id;
      }
      if (meta && $data)
        this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
      const { meta, schemaId } = this.opts;
      return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
    }
    validate(schemaKeyRef, data) {
      let v;
      if (typeof schemaKeyRef == "string") {
        v = this.getSchema(schemaKeyRef);
        if (!v)
          throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
      } else {
        v = this.compile(schemaKeyRef);
      }
      const valid2 = v(data);
      if (!("$async" in v))
        this.errors = v.errors;
      return valid2;
    }
    compile(schema, _meta) {
      const sch = this._addSchema(schema, _meta);
      return sch.validate || this._compileSchemaEnv(sch);
    }
    compileAsync(schema, meta) {
      if (typeof this.opts.loadSchema != "function") {
        throw new Error("options.loadSchema should be a function");
      }
      const { loadSchema } = this.opts;
      return runCompileAsync.call(this, schema, meta);
      async function runCompileAsync(_schema, _meta) {
        await loadMetaSchema.call(this, _schema.$schema);
        const sch = this._addSchema(_schema, _meta);
        return sch.validate || _compileAsync.call(this, sch);
      }
      async function loadMetaSchema($ref) {
        if ($ref && !this.getSchema($ref)) {
          await runCompileAsync.call(this, { $ref }, true);
        }
      }
      async function _compileAsync(sch) {
        try {
          return this._compileSchemaEnv(sch);
        } catch (e) {
          if (!(e instanceof ref_error_12.default))
            throw e;
          checkLoaded.call(this, e);
          await loadMissingSchema.call(this, e.missingSchema);
          return _compileAsync.call(this, sch);
        }
      }
      function checkLoaded({ missingSchema: ref2, missingRef }) {
        if (this.refs[ref2]) {
          throw new Error(`AnySchema ${ref2} is loaded but ${missingRef} cannot be resolved`);
        }
      }
      async function loadMissingSchema(ref2) {
        const _schema = await _loadSchema.call(this, ref2);
        if (!this.refs[ref2])
          await loadMetaSchema.call(this, _schema.$schema);
        if (!this.refs[ref2])
          this.addSchema(_schema, ref2, meta);
      }
      async function _loadSchema(ref2) {
        const p = this._loading[ref2];
        if (p)
          return p;
        try {
          return await (this._loading[ref2] = loadSchema(ref2));
        } finally {
          delete this._loading[ref2];
        }
      }
    }
    // Adds schema to the instance
    addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
      if (Array.isArray(schema)) {
        for (const sch of schema)
          this.addSchema(sch, void 0, _meta, _validateSchema);
        return this;
      }
      let id2;
      if (typeof schema === "object") {
        const { schemaId } = this.opts;
        id2 = schema[schemaId];
        if (id2 !== void 0 && typeof id2 != "string") {
          throw new Error(`schema ${schemaId} must be string`);
        }
      }
      key = (0, resolve_12.normalizeId)(key || id2);
      this._checkUnique(key);
      this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
      return this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
      this.addSchema(schema, key, true, _validateSchema);
      return this;
    }
    //  Validate schema against its meta-schema
    validateSchema(schema, throwOrLogError) {
      if (typeof schema == "boolean")
        return true;
      let $schema2;
      $schema2 = schema.$schema;
      if ($schema2 !== void 0 && typeof $schema2 != "string") {
        throw new Error("$schema must be a string");
      }
      $schema2 = $schema2 || this.opts.defaultMeta || this.defaultMeta();
      if (!$schema2) {
        this.logger.warn("meta-schema not available");
        this.errors = null;
        return true;
      }
      const valid2 = this.validate($schema2, schema);
      if (!valid2 && throwOrLogError) {
        const message = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(message);
        else
          throw new Error(message);
      }
      return valid2;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(keyRef) {
      let sch;
      while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
        keyRef = sch;
      if (sch === void 0) {
        const { schemaId } = this.opts;
        const root = new compile_12.SchemaEnv({ schema: {}, schemaId });
        sch = compile_12.resolveSchema.call(this, root, keyRef);
        if (!sch)
          return;
        this.refs[keyRef] = sch;
      }
      return sch.validate || this._compileSchemaEnv(sch);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(schemaKeyRef) {
      if (schemaKeyRef instanceof RegExp) {
        this._removeAllSchemas(this.schemas, schemaKeyRef);
        this._removeAllSchemas(this.refs, schemaKeyRef);
        return this;
      }
      switch (typeof schemaKeyRef) {
        case "undefined":
          this._removeAllSchemas(this.schemas);
          this._removeAllSchemas(this.refs);
          this._cache.clear();
          return this;
        case "string": {
          const sch = getSchEnv.call(this, schemaKeyRef);
          if (typeof sch == "object")
            this._cache.delete(sch.schema);
          delete this.schemas[schemaKeyRef];
          delete this.refs[schemaKeyRef];
          return this;
        }
        case "object": {
          const cacheKey = schemaKeyRef;
          this._cache.delete(cacheKey);
          let id2 = schemaKeyRef[this.opts.schemaId];
          if (id2) {
            id2 = (0, resolve_12.normalizeId)(id2);
            delete this.schemas[id2];
            delete this.refs[id2];
          }
          return this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(definitions2) {
      for (const def2 of definitions2)
        this.addKeyword(def2);
      return this;
    }
    addKeyword(kwdOrDef, def2) {
      let keyword2;
      if (typeof kwdOrDef == "string") {
        keyword2 = kwdOrDef;
        if (typeof def2 == "object") {
          this.logger.warn("these parameters are deprecated, see docs for addKeyword");
          def2.keyword = keyword2;
        }
      } else if (typeof kwdOrDef == "object" && def2 === void 0) {
        def2 = kwdOrDef;
        keyword2 = def2.keyword;
        if (Array.isArray(keyword2) && !keyword2.length) {
          throw new Error("addKeywords: keyword must be string or non-empty array");
        }
      } else {
        throw new Error("invalid addKeywords parameters");
      }
      checkKeyword.call(this, keyword2, def2);
      if (!def2) {
        (0, util_12.eachItem)(keyword2, (kwd) => addRule.call(this, kwd));
        return this;
      }
      keywordMetaschema.call(this, def2);
      const definition = {
        ...def2,
        type: (0, dataType_12.getJSONTypes)(def2.type),
        schemaType: (0, dataType_12.getJSONTypes)(def2.schemaType)
      };
      (0, util_12.eachItem)(keyword2, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t2) => addRule.call(this, k, definition, t2)));
      return this;
    }
    getKeyword(keyword2) {
      const rule = this.RULES.all[keyword2];
      return typeof rule == "object" ? rule.definition : !!rule;
    }
    // Remove keyword
    removeKeyword(keyword2) {
      const { RULES } = this;
      delete RULES.keywords[keyword2];
      delete RULES.all[keyword2];
      for (const group of RULES.rules) {
        const i = group.rules.findIndex((rule) => rule.keyword === keyword2);
        if (i >= 0)
          group.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(name, format2) {
      if (typeof format2 == "string")
        format2 = new RegExp(format2);
      this.formats[name] = format2;
      return this;
    }
    errorsText(errors2 = this.errors, { separator = ", ", dataVar = "data" } = {}) {
      if (!errors2 || errors2.length === 0)
        return "No errors";
      return errors2.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
      const rules2 = this.RULES.all;
      metaSchema = JSON.parse(JSON.stringify(metaSchema));
      for (const jsonPointer of keywordsJsonPointers) {
        const segments = jsonPointer.split("/").slice(1);
        let keywords = metaSchema;
        for (const seg of segments)
          keywords = keywords[seg];
        for (const key in rules2) {
          const rule = rules2[key];
          if (typeof rule != "object")
            continue;
          const { $data } = rule.definition;
          const schema = keywords[key];
          if ($data && schema)
            keywords[key] = schemaOrData(schema);
        }
      }
      return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
      for (const keyRef in schemas) {
        const sch = schemas[keyRef];
        if (!regex || regex.test(keyRef)) {
          if (typeof sch == "string") {
            delete schemas[keyRef];
          } else if (sch && !sch.meta) {
            this._cache.delete(sch.schema);
            delete schemas[keyRef];
          }
        }
      }
    }
    _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
      let id2;
      const { schemaId } = this.opts;
      if (typeof schema == "object") {
        id2 = schema[schemaId];
      } else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        else if (typeof schema != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let sch = this._cache.get(schema);
      if (sch !== void 0)
        return sch;
      baseId = (0, resolve_12.normalizeId)(id2 || baseId);
      const localRefs = resolve_12.getSchemaRefs.call(this, schema, baseId);
      sch = new compile_12.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
      this._cache.set(sch.schema, sch);
      if (addSchema && !baseId.startsWith("#")) {
        if (baseId)
          this._checkUnique(baseId);
        this.refs[baseId] = sch;
      }
      if (validateSchema)
        this.validateSchema(schema, true);
      return sch;
    }
    _checkUnique(id2) {
      if (this.schemas[id2] || this.refs[id2]) {
        throw new Error(`schema with key or id "${id2}" already exists`);
      }
    }
    _compileSchemaEnv(sch) {
      if (sch.meta)
        this._compileMetaSchema(sch);
      else
        compile_12.compileSchema.call(this, sch);
      if (!sch.validate)
        throw new Error("ajv implementation error");
      return sch.validate;
    }
    _compileMetaSchema(sch) {
      const currentOpts = this.opts;
      this.opts = this._metaOpts;
      try {
        compile_12.compileSchema.call(this, sch);
      } finally {
        this.opts = currentOpts;
      }
    }
  }
  Ajv.ValidationError = validation_error_12.default;
  Ajv.MissingRefError = ref_error_12.default;
  exports$1.default = Ajv;
  function checkOptions(checkOpts, options, msg, log = "error") {
    for (const key in checkOpts) {
      const opt = key;
      if (opt in options)
        this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
    }
  }
  function getSchEnv(keyRef) {
    keyRef = (0, resolve_12.normalizeId)(keyRef);
    return this.schemas[keyRef] || this.refs[keyRef];
  }
  function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas)
      return;
    if (Array.isArray(optsSchemas))
      this.addSchema(optsSchemas);
    else
      for (const key in optsSchemas)
        this.addSchema(optsSchemas[key], key);
  }
  function addInitialFormats() {
    for (const name in this.opts.formats) {
      const format2 = this.opts.formats[name];
      if (format2)
        this.addFormat(name, format2);
    }
  }
  function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
      this.addVocabulary(defs);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const keyword2 in defs) {
      const def2 = defs[keyword2];
      if (!def2.keyword)
        def2.keyword = keyword2;
      this.addKeyword(def2);
    }
  }
  function getMetaSchemaOptions() {
    const metaOpts = { ...this.opts };
    for (const opt of META_IGNORE_OPTIONS)
      delete metaOpts[opt];
    return metaOpts;
  }
  const noLogs = { log() {
  }, warn() {
  }, error() {
  } };
  function getLogger(logger) {
    if (logger === false)
      return noLogs;
    if (logger === void 0)
      return console;
    if (logger.log && logger.warn && logger.error)
      return logger;
    throw new Error("logger must implement log, warn and error methods");
  }
  const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
  function checkKeyword(keyword2, def2) {
    const { RULES } = this;
    (0, util_12.eachItem)(keyword2, (kwd) => {
      if (RULES.keywords[kwd])
        throw new Error(`Keyword ${kwd} is already defined`);
      if (!KEYWORD_NAME.test(kwd))
        throw new Error(`Keyword ${kwd} has invalid name`);
    });
    if (!def2)
      return;
    if (def2.$data && !("code" in def2 || "validate" in def2)) {
      throw new Error('$data keyword must have "code" or "validate" function');
    }
  }
  function addRule(keyword2, definition, dataType2) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType2 && post)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t2 }) => t2 === dataType2);
    if (!ruleGroup) {
      ruleGroup = { type: dataType2, rules: [] };
      RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword2] = true;
    if (!definition)
      return;
    const rule = {
      keyword: keyword2,
      definition: {
        ...definition,
        type: (0, dataType_12.getJSONTypes)(definition.type),
        schemaType: (0, dataType_12.getJSONTypes)(definition.schemaType)
      }
    };
    if (definition.before)
      addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else
      ruleGroup.rules.push(rule);
    RULES.all[keyword2] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
  }
  function addBeforeRule(ruleGroup, rule, before) {
    const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
    if (i >= 0) {
      ruleGroup.rules.splice(i, 0, rule);
    } else {
      ruleGroup.rules.push(rule);
      this.logger.warn(`rule ${before} is not defined`);
    }
  }
  function keywordMetaschema(def2) {
    let { metaSchema } = def2;
    if (metaSchema === void 0)
      return;
    if (def2.$data && this.opts.$data)
      metaSchema = schemaOrData(metaSchema);
    def2.validateSchema = this.compile(metaSchema, true);
  }
  const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function schemaOrData(schema) {
    return { anyOf: [schema, $dataRef] };
  }
})(core$2);
var draft7 = {};
var core$1 = {};
var id = {};
Object.defineProperty(id, "__esModule", { value: true });
const def$s = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
id.default = def$s;
var ref = {};
Object.defineProperty(ref, "__esModule", { value: true });
ref.callRef = ref.getValidate = void 0;
const ref_error_1$1 = ref_error;
const code_1$8 = code$1;
const codegen_1$l = codegen;
const names_1$1 = names$1;
const compile_1$1 = compile;
const util_1$j = util;
const def$r = {
  keyword: "$ref",
  schemaType: "string",
  code(cxt) {
    const { gen, schema: $ref, it } = cxt;
    const { baseId, schemaEnv: env2, validateName, opts, self: self2 } = it;
    const { root } = env2;
    if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
      return callRootRef();
    const schOrEnv = compile_1$1.resolveRef.call(self2, root, baseId, $ref);
    if (schOrEnv === void 0)
      throw new ref_error_1$1.default(it.opts.uriResolver, baseId, $ref);
    if (schOrEnv instanceof compile_1$1.SchemaEnv)
      return callValidate(schOrEnv);
    return inlineRefSchema(schOrEnv);
    function callRootRef() {
      if (env2 === root)
        return callRef(cxt, validateName, env2, env2.$async);
      const rootName = gen.scopeValue("root", { ref: root });
      return callRef(cxt, (0, codegen_1$l._)`${rootName}.validate`, root, root.$async);
    }
    function callValidate(sch) {
      const v = getValidate(cxt, sch);
      callRef(cxt, v, sch, sch.$async);
    }
    function inlineRefSchema(sch) {
      const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1$l.stringify)(sch) } : { ref: sch });
      const valid2 = gen.name("valid");
      const schCxt = cxt.subschema({
        schema: sch,
        dataTypes: [],
        schemaPath: codegen_1$l.nil,
        topSchemaRef: schName,
        errSchemaPath: $ref
      }, valid2);
      cxt.mergeEvaluated(schCxt);
      cxt.ok(valid2);
    }
  }
};
function getValidate(cxt, sch) {
  const { gen } = cxt;
  return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1$l._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
}
ref.getValidate = getValidate;
function callRef(cxt, v, sch, $async) {
  const { gen, it } = cxt;
  const { allErrors, schemaEnv: env2, opts } = it;
  const passCxt = opts.passContext ? names_1$1.default.this : codegen_1$l.nil;
  if ($async)
    callAsyncRef();
  else
    callSyncRef();
  function callAsyncRef() {
    if (!env2.$async)
      throw new Error("async schema referenced by sync schema");
    const valid2 = gen.let("valid");
    gen.try(() => {
      gen.code((0, codegen_1$l._)`await ${(0, code_1$8.callValidateCode)(cxt, v, passCxt)}`);
      addEvaluatedFrom(v);
      if (!allErrors)
        gen.assign(valid2, true);
    }, (e) => {
      gen.if((0, codegen_1$l._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
      addErrorsFrom(e);
      if (!allErrors)
        gen.assign(valid2, false);
    });
    cxt.ok(valid2);
  }
  function callSyncRef() {
    cxt.result((0, code_1$8.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
  }
  function addErrorsFrom(source2) {
    const errs = (0, codegen_1$l._)`${source2}.errors`;
    gen.assign(names_1$1.default.vErrors, (0, codegen_1$l._)`${names_1$1.default.vErrors} === null ? ${errs} : ${names_1$1.default.vErrors}.concat(${errs})`);
    gen.assign(names_1$1.default.errors, (0, codegen_1$l._)`${names_1$1.default.vErrors}.length`);
  }
  function addEvaluatedFrom(source2) {
    var _a;
    if (!it.opts.unevaluated)
      return;
    const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
    if (it.props !== true) {
      if (schEvaluated && !schEvaluated.dynamicProps) {
        if (schEvaluated.props !== void 0) {
          it.props = util_1$j.mergeEvaluated.props(gen, schEvaluated.props, it.props);
        }
      } else {
        const props = gen.var("props", (0, codegen_1$l._)`${source2}.evaluated.props`);
        it.props = util_1$j.mergeEvaluated.props(gen, props, it.props, codegen_1$l.Name);
      }
    }
    if (it.items !== true) {
      if (schEvaluated && !schEvaluated.dynamicItems) {
        if (schEvaluated.items !== void 0) {
          it.items = util_1$j.mergeEvaluated.items(gen, schEvaluated.items, it.items);
        }
      } else {
        const items2 = gen.var("items", (0, codegen_1$l._)`${source2}.evaluated.items`);
        it.items = util_1$j.mergeEvaluated.items(gen, items2, it.items, codegen_1$l.Name);
      }
    }
  }
}
ref.callRef = callRef;
ref.default = def$r;
Object.defineProperty(core$1, "__esModule", { value: true });
const id_1 = id;
const ref_1 = ref;
const core = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  id_1.default,
  ref_1.default
];
core$1.default = core;
var validation$1 = {};
var limitNumber = {};
Object.defineProperty(limitNumber, "__esModule", { value: true });
const codegen_1$k = codegen;
const ops = codegen_1$k.operators;
const KWDs = {
  maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
  minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
  exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
  exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
};
const error$i = {
  message: ({ keyword: keyword2, schemaCode }) => (0, codegen_1$k.str)`must be ${KWDs[keyword2].okStr} ${schemaCode}`,
  params: ({ keyword: keyword2, schemaCode }) => (0, codegen_1$k._)`{comparison: ${KWDs[keyword2].okStr}, limit: ${schemaCode}}`
};
const def$q = {
  keyword: Object.keys(KWDs),
  type: "number",
  schemaType: "number",
  $data: true,
  error: error$i,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    cxt.fail$data((0, codegen_1$k._)`${data} ${KWDs[keyword2].fail} ${schemaCode} || isNaN(${data})`);
  }
};
limitNumber.default = def$q;
var multipleOf = {};
Object.defineProperty(multipleOf, "__esModule", { value: true });
const codegen_1$j = codegen;
const error$h = {
  message: ({ schemaCode }) => (0, codegen_1$j.str)`must be multiple of ${schemaCode}`,
  params: ({ schemaCode }) => (0, codegen_1$j._)`{multipleOf: ${schemaCode}}`
};
const def$p = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: true,
  error: error$h,
  code(cxt) {
    const { gen, data, schemaCode, it } = cxt;
    const prec = it.opts.multipleOfPrecision;
    const res = gen.let("res");
    const invalid = prec ? (0, codegen_1$j._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1$j._)`${res} !== parseInt(${res})`;
    cxt.fail$data((0, codegen_1$j._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
  }
};
multipleOf.default = def$p;
var limitLength = {};
var ucs2length$1 = {};
Object.defineProperty(ucs2length$1, "__esModule", { value: true });
function ucs2length(str) {
  const len = str.length;
  let length = 0;
  let pos = 0;
  let value;
  while (pos < len) {
    length++;
    value = str.charCodeAt(pos++);
    if (value >= 55296 && value <= 56319 && pos < len) {
      value = str.charCodeAt(pos);
      if ((value & 64512) === 56320)
        pos++;
    }
  }
  return length;
}
ucs2length$1.default = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(limitLength, "__esModule", { value: true });
const codegen_1$i = codegen;
const util_1$i = util;
const ucs2length_1 = ucs2length$1;
const error$g = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxLength" ? "more" : "fewer";
    return (0, codegen_1$i.str)`must NOT have ${comp} than ${schemaCode} characters`;
  },
  params: ({ schemaCode }) => (0, codegen_1$i._)`{limit: ${schemaCode}}`
};
const def$o = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: true,
  error: error$g,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode, it } = cxt;
    const op = keyword2 === "maxLength" ? codegen_1$i.operators.GT : codegen_1$i.operators.LT;
    const len = it.opts.unicode === false ? (0, codegen_1$i._)`${data}.length` : (0, codegen_1$i._)`${(0, util_1$i.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
    cxt.fail$data((0, codegen_1$i._)`${len} ${op} ${schemaCode}`);
  }
};
limitLength.default = def$o;
var pattern = {};
Object.defineProperty(pattern, "__esModule", { value: true });
const code_1$7 = code$1;
const codegen_1$h = codegen;
const error$f = {
  message: ({ schemaCode }) => (0, codegen_1$h.str)`must match pattern "${schemaCode}"`,
  params: ({ schemaCode }) => (0, codegen_1$h._)`{pattern: ${schemaCode}}`
};
const def$n = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: true,
  error: error$f,
  code(cxt) {
    const { data, $data, schema, schemaCode, it } = cxt;
    const u = it.opts.unicodeRegExp ? "u" : "";
    const regExp = $data ? (0, codegen_1$h._)`(new RegExp(${schemaCode}, ${u}))` : (0, code_1$7.usePattern)(cxt, schema);
    cxt.fail$data((0, codegen_1$h._)`!${regExp}.test(${data})`);
  }
};
pattern.default = def$n;
var limitProperties = {};
Object.defineProperty(limitProperties, "__esModule", { value: true });
const codegen_1$g = codegen;
const error$e = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxProperties" ? "more" : "fewer";
    return (0, codegen_1$g.str)`must NOT have ${comp} than ${schemaCode} properties`;
  },
  params: ({ schemaCode }) => (0, codegen_1$g._)`{limit: ${schemaCode}}`
};
const def$m = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: true,
  error: error$e,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    const op = keyword2 === "maxProperties" ? codegen_1$g.operators.GT : codegen_1$g.operators.LT;
    cxt.fail$data((0, codegen_1$g._)`Object.keys(${data}).length ${op} ${schemaCode}`);
  }
};
limitProperties.default = def$m;
var required = {};
Object.defineProperty(required, "__esModule", { value: true });
const code_1$6 = code$1;
const codegen_1$f = codegen;
const util_1$h = util;
const error$d = {
  message: ({ params: { missingProperty } }) => (0, codegen_1$f.str)`must have required property '${missingProperty}'`,
  params: ({ params: { missingProperty } }) => (0, codegen_1$f._)`{missingProperty: ${missingProperty}}`
};
const def$l = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: true,
  error: error$d,
  code(cxt) {
    const { gen, schema, schemaCode, data, $data, it } = cxt;
    const { opts } = it;
    if (!$data && schema.length === 0)
      return;
    const useLoop = schema.length >= opts.loopRequired;
    if (it.allErrors)
      allErrorsMode();
    else
      exitOnErrorMode();
    if (opts.strictRequired) {
      const props = cxt.parentSchema.properties;
      const { definedProperties } = cxt.it;
      for (const requiredKey of schema) {
        if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
          const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
          const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
          (0, util_1$h.checkStrictMode)(it, msg, it.opts.strictRequired);
        }
      }
    }
    function allErrorsMode() {
      if (useLoop || $data) {
        cxt.block$data(codegen_1$f.nil, loopAllRequired);
      } else {
        for (const prop of schema) {
          (0, code_1$6.checkReportMissingProp)(cxt, prop);
        }
      }
    }
    function exitOnErrorMode() {
      const missing = gen.let("missing");
      if (useLoop || $data) {
        const valid2 = gen.let("valid", true);
        cxt.block$data(valid2, () => loopUntilMissing(missing, valid2));
        cxt.ok(valid2);
      } else {
        gen.if((0, code_1$6.checkMissingProp)(cxt, schema, missing));
        (0, code_1$6.reportMissingProp)(cxt, missing);
        gen.else();
      }
    }
    function loopAllRequired() {
      gen.forOf("prop", schemaCode, (prop) => {
        cxt.setParams({ missingProperty: prop });
        gen.if((0, code_1$6.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
      });
    }
    function loopUntilMissing(missing, valid2) {
      cxt.setParams({ missingProperty: missing });
      gen.forOf(missing, schemaCode, () => {
        gen.assign(valid2, (0, code_1$6.propertyInData)(gen, data, missing, opts.ownProperties));
        gen.if((0, codegen_1$f.not)(valid2), () => {
          cxt.error();
          gen.break();
        });
      }, codegen_1$f.nil);
    }
  }
};
required.default = def$l;
var limitItems = {};
Object.defineProperty(limitItems, "__esModule", { value: true });
const codegen_1$e = codegen;
const error$c = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxItems" ? "more" : "fewer";
    return (0, codegen_1$e.str)`must NOT have ${comp} than ${schemaCode} items`;
  },
  params: ({ schemaCode }) => (0, codegen_1$e._)`{limit: ${schemaCode}}`
};
const def$k = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: true,
  error: error$c,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    const op = keyword2 === "maxItems" ? codegen_1$e.operators.GT : codegen_1$e.operators.LT;
    cxt.fail$data((0, codegen_1$e._)`${data}.length ${op} ${schemaCode}`);
  }
};
limitItems.default = def$k;
var uniqueItems = {};
var equal$1 = {};
Object.defineProperty(equal$1, "__esModule", { value: true });
const equal2 = fastDeepEqual;
equal2.code = 'require("ajv/dist/runtime/equal").default';
equal$1.default = equal2;
Object.defineProperty(uniqueItems, "__esModule", { value: true });
const dataType_1 = dataType;
const codegen_1$d = codegen;
const util_1$g = util;
const equal_1$2 = equal$1;
const error$b = {
  message: ({ params: { i, j } }) => (0, codegen_1$d.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
  params: ({ params: { i, j } }) => (0, codegen_1$d._)`{i: ${i}, j: ${j}}`
};
const def$j = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: true,
  error: error$b,
  code(cxt) {
    const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
    if (!$data && !schema)
      return;
    const valid2 = gen.let("valid");
    const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
    cxt.block$data(valid2, validateUniqueItems, (0, codegen_1$d._)`${schemaCode} === false`);
    cxt.ok(valid2);
    function validateUniqueItems() {
      const i = gen.let("i", (0, codegen_1$d._)`${data}.length`);
      const j = gen.let("j");
      cxt.setParams({ i, j });
      gen.assign(valid2, true);
      gen.if((0, codegen_1$d._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
    }
    function canOptimize() {
      return itemTypes.length > 0 && !itemTypes.some((t2) => t2 === "object" || t2 === "array");
    }
    function loopN(i, j) {
      const item = gen.name("item");
      const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
      const indices = gen.const("indices", (0, codegen_1$d._)`{}`);
      gen.for((0, codegen_1$d._)`;${i}--;`, () => {
        gen.let(item, (0, codegen_1$d._)`${data}[${i}]`);
        gen.if(wrongType, (0, codegen_1$d._)`continue`);
        if (itemTypes.length > 1)
          gen.if((0, codegen_1$d._)`typeof ${item} == "string"`, (0, codegen_1$d._)`${item} += "_"`);
        gen.if((0, codegen_1$d._)`typeof ${indices}[${item}] == "number"`, () => {
          gen.assign(j, (0, codegen_1$d._)`${indices}[${item}]`);
          cxt.error();
          gen.assign(valid2, false).break();
        }).code((0, codegen_1$d._)`${indices}[${item}] = ${i}`);
      });
    }
    function loopN2(i, j) {
      const eql = (0, util_1$g.useFunc)(gen, equal_1$2.default);
      const outer = gen.name("outer");
      gen.label(outer).for((0, codegen_1$d._)`;${i}--;`, () => gen.for((0, codegen_1$d._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1$d._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
        cxt.error();
        gen.assign(valid2, false).break(outer);
      })));
    }
  }
};
uniqueItems.default = def$j;
var _const = {};
Object.defineProperty(_const, "__esModule", { value: true });
const codegen_1$c = codegen;
const util_1$f = util;
const equal_1$1 = equal$1;
const error$a = {
  message: "must be equal to constant",
  params: ({ schemaCode }) => (0, codegen_1$c._)`{allowedValue: ${schemaCode}}`
};
const def$i = {
  keyword: "const",
  $data: true,
  error: error$a,
  code(cxt) {
    const { gen, data, $data, schemaCode, schema } = cxt;
    if ($data || schema && typeof schema == "object") {
      cxt.fail$data((0, codegen_1$c._)`!${(0, util_1$f.useFunc)(gen, equal_1$1.default)}(${data}, ${schemaCode})`);
    } else {
      cxt.fail((0, codegen_1$c._)`${schema} !== ${data}`);
    }
  }
};
_const.default = def$i;
var _enum = {};
Object.defineProperty(_enum, "__esModule", { value: true });
const codegen_1$b = codegen;
const util_1$e = util;
const equal_1 = equal$1;
const error$9 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode }) => (0, codegen_1$b._)`{allowedValues: ${schemaCode}}`
};
const def$h = {
  keyword: "enum",
  schemaType: "array",
  $data: true,
  error: error$9,
  code(cxt) {
    const { gen, data, $data, schema, schemaCode, it } = cxt;
    if (!$data && schema.length === 0)
      throw new Error("enum must have non-empty array");
    const useLoop = schema.length >= it.opts.loopEnum;
    let eql;
    const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1$e.useFunc)(gen, equal_1.default);
    let valid2;
    if (useLoop || $data) {
      valid2 = gen.let("valid");
      cxt.block$data(valid2, loopEnum);
    } else {
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const vSchema = gen.const("vSchema", schemaCode);
      valid2 = (0, codegen_1$b.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
    }
    cxt.pass(valid2);
    function loopEnum() {
      gen.assign(valid2, false);
      gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1$b._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid2, true).break()));
    }
    function equalCode(vSchema, i) {
      const sch = schema[i];
      return typeof sch === "object" && sch !== null ? (0, codegen_1$b._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1$b._)`${data} === ${sch}`;
    }
  }
};
_enum.default = def$h;
Object.defineProperty(validation$1, "__esModule", { value: true });
const limitNumber_1 = limitNumber;
const multipleOf_1 = multipleOf;
const limitLength_1 = limitLength;
const pattern_1 = pattern;
const limitProperties_1 = limitProperties;
const required_1 = required;
const limitItems_1 = limitItems;
const uniqueItems_1 = uniqueItems;
const const_1 = _const;
const enum_1 = _enum;
const validation = [
  // number
  limitNumber_1.default,
  multipleOf_1.default,
  // string
  limitLength_1.default,
  pattern_1.default,
  // object
  limitProperties_1.default,
  required_1.default,
  // array
  limitItems_1.default,
  uniqueItems_1.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  const_1.default,
  enum_1.default
];
validation$1.default = validation;
var applicator = {};
var additionalItems = {};
Object.defineProperty(additionalItems, "__esModule", { value: true });
additionalItems.validateAdditionalItems = void 0;
const codegen_1$a = codegen;
const util_1$d = util;
const error$8 = {
  message: ({ params: { len } }) => (0, codegen_1$a.str)`must NOT have more than ${len} items`,
  params: ({ params: { len } }) => (0, codegen_1$a._)`{limit: ${len}}`
};
const def$g = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: error$8,
  code(cxt) {
    const { parentSchema, it } = cxt;
    const { items: items2 } = parentSchema;
    if (!Array.isArray(items2)) {
      (0, util_1$d.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    validateAdditionalItems(cxt, items2);
  }
};
function validateAdditionalItems(cxt, items2) {
  const { gen, schema, data, keyword: keyword2, it } = cxt;
  it.items = true;
  const len = gen.const("len", (0, codegen_1$a._)`${data}.length`);
  if (schema === false) {
    cxt.setParams({ len: items2.length });
    cxt.pass((0, codegen_1$a._)`${len} <= ${items2.length}`);
  } else if (typeof schema == "object" && !(0, util_1$d.alwaysValidSchema)(it, schema)) {
    const valid2 = gen.var("valid", (0, codegen_1$a._)`${len} <= ${items2.length}`);
    gen.if((0, codegen_1$a.not)(valid2), () => validateItems(valid2));
    cxt.ok(valid2);
  }
  function validateItems(valid2) {
    gen.forRange("i", items2.length, len, (i) => {
      cxt.subschema({ keyword: keyword2, dataProp: i, dataPropType: util_1$d.Type.Num }, valid2);
      if (!it.allErrors)
        gen.if((0, codegen_1$a.not)(valid2), () => gen.break());
    });
  }
}
additionalItems.validateAdditionalItems = validateAdditionalItems;
additionalItems.default = def$g;
var prefixItems = {};
var items = {};
Object.defineProperty(items, "__esModule", { value: true });
items.validateTuple = void 0;
const codegen_1$9 = codegen;
const util_1$c = util;
const code_1$5 = code$1;
const def$f = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(cxt) {
    const { schema, it } = cxt;
    if (Array.isArray(schema))
      return validateTuple(cxt, "additionalItems", schema);
    it.items = true;
    if ((0, util_1$c.alwaysValidSchema)(it, schema))
      return;
    cxt.ok((0, code_1$5.validateArray)(cxt));
  }
};
function validateTuple(cxt, extraItems, schArr = cxt.schema) {
  const { gen, parentSchema, data, keyword: keyword2, it } = cxt;
  checkStrictTuple(parentSchema);
  if (it.opts.unevaluated && schArr.length && it.items !== true) {
    it.items = util_1$c.mergeEvaluated.items(gen, schArr.length, it.items);
  }
  const valid2 = gen.name("valid");
  const len = gen.const("len", (0, codegen_1$9._)`${data}.length`);
  schArr.forEach((sch, i) => {
    if ((0, util_1$c.alwaysValidSchema)(it, sch))
      return;
    gen.if((0, codegen_1$9._)`${len} > ${i}`, () => cxt.subschema({
      keyword: keyword2,
      schemaProp: i,
      dataProp: i
    }, valid2));
    cxt.ok(valid2);
  });
  function checkStrictTuple(sch) {
    const { opts, errSchemaPath } = it;
    const l = schArr.length;
    const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
    if (opts.strictTuples && !fullTuple) {
      const msg = `"${keyword2}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
      (0, util_1$c.checkStrictMode)(it, msg, opts.strictTuples);
    }
  }
}
items.validateTuple = validateTuple;
items.default = def$f;
Object.defineProperty(prefixItems, "__esModule", { value: true });
const items_1$1 = items;
const def$e = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (cxt) => (0, items_1$1.validateTuple)(cxt, "items")
};
prefixItems.default = def$e;
var items2020 = {};
Object.defineProperty(items2020, "__esModule", { value: true });
const codegen_1$8 = codegen;
const util_1$b = util;
const code_1$4 = code$1;
const additionalItems_1$1 = additionalItems;
const error$7 = {
  message: ({ params: { len } }) => (0, codegen_1$8.str)`must NOT have more than ${len} items`,
  params: ({ params: { len } }) => (0, codegen_1$8._)`{limit: ${len}}`
};
const def$d = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: error$7,
  code(cxt) {
    const { schema, parentSchema, it } = cxt;
    const { prefixItems: prefixItems2 } = parentSchema;
    it.items = true;
    if ((0, util_1$b.alwaysValidSchema)(it, schema))
      return;
    if (prefixItems2)
      (0, additionalItems_1$1.validateAdditionalItems)(cxt, prefixItems2);
    else
      cxt.ok((0, code_1$4.validateArray)(cxt));
  }
};
items2020.default = def$d;
var contains = {};
Object.defineProperty(contains, "__esModule", { value: true });
const codegen_1$7 = codegen;
const util_1$a = util;
const error$6 = {
  message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1$7.str)`must contain at least ${min} valid item(s)` : (0, codegen_1$7.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
  params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1$7._)`{minContains: ${min}}` : (0, codegen_1$7._)`{minContains: ${min}, maxContains: ${max}}`
};
const def$c = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: true,
  error: error$6,
  code(cxt) {
    const { gen, schema, parentSchema, data, it } = cxt;
    let min;
    let max;
    const { minContains, maxContains } = parentSchema;
    if (it.opts.next) {
      min = minContains === void 0 ? 1 : minContains;
      max = maxContains;
    } else {
      min = 1;
    }
    const len = gen.const("len", (0, codegen_1$7._)`${data}.length`);
    cxt.setParams({ min, max });
    if (max === void 0 && min === 0) {
      (0, util_1$a.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
      return;
    }
    if (max !== void 0 && min > max) {
      (0, util_1$a.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
      cxt.fail();
      return;
    }
    if ((0, util_1$a.alwaysValidSchema)(it, schema)) {
      let cond = (0, codegen_1$7._)`${len} >= ${min}`;
      if (max !== void 0)
        cond = (0, codegen_1$7._)`${cond} && ${len} <= ${max}`;
      cxt.pass(cond);
      return;
    }
    it.items = true;
    const valid2 = gen.name("valid");
    if (max === void 0 && min === 1) {
      validateItems(valid2, () => gen.if(valid2, () => gen.break()));
    } else if (min === 0) {
      gen.let(valid2, true);
      if (max !== void 0)
        gen.if((0, codegen_1$7._)`${data}.length > 0`, validateItemsWithCount);
    } else {
      gen.let(valid2, false);
      validateItemsWithCount();
    }
    cxt.result(valid2, () => cxt.reset());
    function validateItemsWithCount() {
      const schValid = gen.name("_valid");
      const count = gen.let("count", 0);
      validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
    }
    function validateItems(_valid, block) {
      gen.forRange("i", 0, len, (i) => {
        cxt.subschema({
          keyword: "contains",
          dataProp: i,
          dataPropType: util_1$a.Type.Num,
          compositeRule: true
        }, _valid);
        block();
      });
    }
    function checkLimits(count) {
      gen.code((0, codegen_1$7._)`${count}++`);
      if (max === void 0) {
        gen.if((0, codegen_1$7._)`${count} >= ${min}`, () => gen.assign(valid2, true).break());
      } else {
        gen.if((0, codegen_1$7._)`${count} > ${max}`, () => gen.assign(valid2, false).break());
        if (min === 1)
          gen.assign(valid2, true);
        else
          gen.if((0, codegen_1$7._)`${count} >= ${min}`, () => gen.assign(valid2, true));
      }
    }
  }
};
contains.default = def$c;
var dependencies = {};
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.validateSchemaDeps = exports$1.validatePropertyDeps = exports$1.error = void 0;
  const codegen_12 = codegen;
  const util_12 = util;
  const code_12 = code$1;
  exports$1.error = {
    message: ({ params: { property, depsCount, deps } }) => {
      const property_ies = depsCount === 1 ? "property" : "properties";
      return (0, codegen_12.str)`must have ${property_ies} ${deps} when property ${property} is present`;
    },
    params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_12._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
    // TODO change to reference
  };
  const def2 = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports$1.error,
    code(cxt) {
      const [propDeps, schDeps] = splitDependencies(cxt);
      validatePropertyDeps(cxt, propDeps);
      validateSchemaDeps(cxt, schDeps);
    }
  };
  function splitDependencies({ schema }) {
    const propertyDeps = {};
    const schemaDeps = {};
    for (const key in schema) {
      if (key === "__proto__")
        continue;
      const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
      deps[key] = schema[key];
    }
    return [propertyDeps, schemaDeps];
  }
  function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0)
      return;
    const missing = gen.let("missing");
    for (const prop in propertyDeps) {
      const deps = propertyDeps[prop];
      if (deps.length === 0)
        continue;
      const hasProperty = (0, code_12.propertyInData)(gen, data, prop, it.opts.ownProperties);
      cxt.setParams({
        property: prop,
        depsCount: deps.length,
        deps: deps.join(", ")
      });
      if (it.allErrors) {
        gen.if(hasProperty, () => {
          for (const depProp of deps) {
            (0, code_12.checkReportMissingProp)(cxt, depProp);
          }
        });
      } else {
        gen.if((0, codegen_12._)`${hasProperty} && (${(0, code_12.checkMissingProp)(cxt, deps, missing)})`);
        (0, code_12.reportMissingProp)(cxt, missing);
        gen.else();
      }
    }
  }
  exports$1.validatePropertyDeps = validatePropertyDeps;
  function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
    const { gen, data, keyword: keyword2, it } = cxt;
    const valid2 = gen.name("valid");
    for (const prop in schemaDeps) {
      if ((0, util_12.alwaysValidSchema)(it, schemaDeps[prop]))
        continue;
      gen.if(
        (0, code_12.propertyInData)(gen, data, prop, it.opts.ownProperties),
        () => {
          const schCxt = cxt.subschema({ keyword: keyword2, schemaProp: prop }, valid2);
          cxt.mergeValidEvaluated(schCxt, valid2);
        },
        () => gen.var(valid2, true)
        // TODO var
      );
      cxt.ok(valid2);
    }
  }
  exports$1.validateSchemaDeps = validateSchemaDeps;
  exports$1.default = def2;
})(dependencies);
var propertyNames = {};
Object.defineProperty(propertyNames, "__esModule", { value: true });
const codegen_1$6 = codegen;
const util_1$9 = util;
const error$5 = {
  message: "property name must be valid",
  params: ({ params }) => (0, codegen_1$6._)`{propertyName: ${params.propertyName}}`
};
const def$b = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: error$5,
  code(cxt) {
    const { gen, schema, data, it } = cxt;
    if ((0, util_1$9.alwaysValidSchema)(it, schema))
      return;
    const valid2 = gen.name("valid");
    gen.forIn("key", data, (key) => {
      cxt.setParams({ propertyName: key });
      cxt.subschema({
        keyword: "propertyNames",
        data: key,
        dataTypes: ["string"],
        propertyName: key,
        compositeRule: true
      }, valid2);
      gen.if((0, codegen_1$6.not)(valid2), () => {
        cxt.error(true);
        if (!it.allErrors)
          gen.break();
      });
    });
    cxt.ok(valid2);
  }
};
propertyNames.default = def$b;
var additionalProperties = {};
Object.defineProperty(additionalProperties, "__esModule", { value: true });
const code_1$3 = code$1;
const codegen_1$5 = codegen;
const names_1 = names$1;
const util_1$8 = util;
const error$4 = {
  message: "must NOT have additional properties",
  params: ({ params }) => (0, codegen_1$5._)`{additionalProperty: ${params.additionalProperty}}`
};
const def$a = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: true,
  trackErrors: true,
  error: error$4,
  code(cxt) {
    const { gen, schema, parentSchema, data, errsCount, it } = cxt;
    if (!errsCount)
      throw new Error("ajv implementation error");
    const { allErrors, opts } = it;
    it.props = true;
    if (opts.removeAdditional !== "all" && (0, util_1$8.alwaysValidSchema)(it, schema))
      return;
    const props = (0, code_1$3.allSchemaProperties)(parentSchema.properties);
    const patProps = (0, code_1$3.allSchemaProperties)(parentSchema.patternProperties);
    checkAdditionalProperties();
    cxt.ok((0, codegen_1$5._)`${errsCount} === ${names_1.default.errors}`);
    function checkAdditionalProperties() {
      gen.forIn("key", data, (key) => {
        if (!props.length && !patProps.length)
          additionalPropertyCode(key);
        else
          gen.if(isAdditional(key), () => additionalPropertyCode(key));
      });
    }
    function isAdditional(key) {
      let definedProp;
      if (props.length > 8) {
        const propsSchema = (0, util_1$8.schemaRefOrVal)(it, parentSchema.properties, "properties");
        definedProp = (0, code_1$3.isOwnProperty)(gen, propsSchema, key);
      } else if (props.length) {
        definedProp = (0, codegen_1$5.or)(...props.map((p) => (0, codegen_1$5._)`${key} === ${p}`));
      } else {
        definedProp = codegen_1$5.nil;
      }
      if (patProps.length) {
        definedProp = (0, codegen_1$5.or)(definedProp, ...patProps.map((p) => (0, codegen_1$5._)`${(0, code_1$3.usePattern)(cxt, p)}.test(${key})`));
      }
      return (0, codegen_1$5.not)(definedProp);
    }
    function deleteAdditional(key) {
      gen.code((0, codegen_1$5._)`delete ${data}[${key}]`);
    }
    function additionalPropertyCode(key) {
      if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
        deleteAdditional(key);
        return;
      }
      if (schema === false) {
        cxt.setParams({ additionalProperty: key });
        cxt.error();
        if (!allErrors)
          gen.break();
        return;
      }
      if (typeof schema == "object" && !(0, util_1$8.alwaysValidSchema)(it, schema)) {
        const valid2 = gen.name("valid");
        if (opts.removeAdditional === "failing") {
          applyAdditionalSchema(key, valid2, false);
          gen.if((0, codegen_1$5.not)(valid2), () => {
            cxt.reset();
            deleteAdditional(key);
          });
        } else {
          applyAdditionalSchema(key, valid2);
          if (!allErrors)
            gen.if((0, codegen_1$5.not)(valid2), () => gen.break());
        }
      }
    }
    function applyAdditionalSchema(key, valid2, errors2) {
      const subschema2 = {
        keyword: "additionalProperties",
        dataProp: key,
        dataPropType: util_1$8.Type.Str
      };
      if (errors2 === false) {
        Object.assign(subschema2, {
          compositeRule: true,
          createErrors: false,
          allErrors: false
        });
      }
      cxt.subschema(subschema2, valid2);
    }
  }
};
additionalProperties.default = def$a;
var properties$1 = {};
Object.defineProperty(properties$1, "__esModule", { value: true });
const validate_1 = validate;
const code_1$2 = code$1;
const util_1$7 = util;
const additionalProperties_1$1 = additionalProperties;
const def$9 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(cxt) {
    const { gen, schema, parentSchema, data, it } = cxt;
    if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
      additionalProperties_1$1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1$1.default, "additionalProperties"));
    }
    const allProps = (0, code_1$2.allSchemaProperties)(schema);
    for (const prop of allProps) {
      it.definedProperties.add(prop);
    }
    if (it.opts.unevaluated && allProps.length && it.props !== true) {
      it.props = util_1$7.mergeEvaluated.props(gen, (0, util_1$7.toHash)(allProps), it.props);
    }
    const properties2 = allProps.filter((p) => !(0, util_1$7.alwaysValidSchema)(it, schema[p]));
    if (properties2.length === 0)
      return;
    const valid2 = gen.name("valid");
    for (const prop of properties2) {
      if (hasDefault(prop)) {
        applyPropertySchema(prop);
      } else {
        gen.if((0, code_1$2.propertyInData)(gen, data, prop, it.opts.ownProperties));
        applyPropertySchema(prop);
        if (!it.allErrors)
          gen.else().var(valid2, true);
        gen.endIf();
      }
      cxt.it.definedProperties.add(prop);
      cxt.ok(valid2);
    }
    function hasDefault(prop) {
      return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
    }
    function applyPropertySchema(prop) {
      cxt.subschema({
        keyword: "properties",
        schemaProp: prop,
        dataProp: prop
      }, valid2);
    }
  }
};
properties$1.default = def$9;
var patternProperties = {};
Object.defineProperty(patternProperties, "__esModule", { value: true });
const code_1$1 = code$1;
const codegen_1$4 = codegen;
const util_1$6 = util;
const util_2 = util;
const def$8 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(cxt) {
    const { gen, schema, data, parentSchema, it } = cxt;
    const { opts } = it;
    const patterns = (0, code_1$1.allSchemaProperties)(schema);
    const alwaysValidPatterns = patterns.filter((p) => (0, util_1$6.alwaysValidSchema)(it, schema[p]));
    if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
      return;
    }
    const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
    const valid2 = gen.name("valid");
    if (it.props !== true && !(it.props instanceof codegen_1$4.Name)) {
      it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
    }
    const { props } = it;
    validatePatternProperties();
    function validatePatternProperties() {
      for (const pat of patterns) {
        if (checkProperties)
          checkMatchingProperties(pat);
        if (it.allErrors) {
          validateProperties(pat);
        } else {
          gen.var(valid2, true);
          validateProperties(pat);
          gen.if(valid2);
        }
      }
    }
    function checkMatchingProperties(pat) {
      for (const prop in checkProperties) {
        if (new RegExp(pat).test(prop)) {
          (0, util_1$6.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
        }
      }
    }
    function validateProperties(pat) {
      gen.forIn("key", data, (key) => {
        gen.if((0, codegen_1$4._)`${(0, code_1$1.usePattern)(cxt, pat)}.test(${key})`, () => {
          const alwaysValid = alwaysValidPatterns.includes(pat);
          if (!alwaysValid) {
            cxt.subschema({
              keyword: "patternProperties",
              schemaProp: pat,
              dataProp: key,
              dataPropType: util_2.Type.Str
            }, valid2);
          }
          if (it.opts.unevaluated && props !== true) {
            gen.assign((0, codegen_1$4._)`${props}[${key}]`, true);
          } else if (!alwaysValid && !it.allErrors) {
            gen.if((0, codegen_1$4.not)(valid2), () => gen.break());
          }
        });
      });
    }
  }
};
patternProperties.default = def$8;
var not = {};
Object.defineProperty(not, "__esModule", { value: true });
const util_1$5 = util;
const def$7 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  code(cxt) {
    const { gen, schema, it } = cxt;
    if ((0, util_1$5.alwaysValidSchema)(it, schema)) {
      cxt.fail();
      return;
    }
    const valid2 = gen.name("valid");
    cxt.subschema({
      keyword: "not",
      compositeRule: true,
      createErrors: false,
      allErrors: false
    }, valid2);
    cxt.failResult(valid2, () => cxt.reset(), () => cxt.error());
  },
  error: { message: "must NOT be valid" }
};
not.default = def$7;
var anyOf = {};
Object.defineProperty(anyOf, "__esModule", { value: true });
const code_1 = code$1;
const def$6 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: true,
  code: code_1.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
anyOf.default = def$6;
var oneOf = {};
Object.defineProperty(oneOf, "__esModule", { value: true });
const codegen_1$3 = codegen;
const util_1$4 = util;
const error$3 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params }) => (0, codegen_1$3._)`{passingSchemas: ${params.passing}}`
};
const def$5 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: true,
  error: error$3,
  code(cxt) {
    const { gen, schema, parentSchema, it } = cxt;
    if (!Array.isArray(schema))
      throw new Error("ajv implementation error");
    if (it.opts.discriminator && parentSchema.discriminator)
      return;
    const schArr = schema;
    const valid2 = gen.let("valid", false);
    const passing = gen.let("passing", null);
    const schValid = gen.name("_valid");
    cxt.setParams({ passing });
    gen.block(validateOneOf);
    cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
    function validateOneOf() {
      schArr.forEach((sch, i) => {
        let schCxt;
        if ((0, util_1$4.alwaysValidSchema)(it, sch)) {
          gen.var(schValid, true);
        } else {
          schCxt = cxt.subschema({
            keyword: "oneOf",
            schemaProp: i,
            compositeRule: true
          }, schValid);
        }
        if (i > 0) {
          gen.if((0, codegen_1$3._)`${schValid} && ${valid2}`).assign(valid2, false).assign(passing, (0, codegen_1$3._)`[${passing}, ${i}]`).else();
        }
        gen.if(schValid, () => {
          gen.assign(valid2, true);
          gen.assign(passing, i);
          if (schCxt)
            cxt.mergeEvaluated(schCxt, codegen_1$3.Name);
        });
      });
    }
  }
};
oneOf.default = def$5;
var allOf = {};
Object.defineProperty(allOf, "__esModule", { value: true });
const util_1$3 = util;
const def$4 = {
  keyword: "allOf",
  schemaType: "array",
  code(cxt) {
    const { gen, schema, it } = cxt;
    if (!Array.isArray(schema))
      throw new Error("ajv implementation error");
    const valid2 = gen.name("valid");
    schema.forEach((sch, i) => {
      if ((0, util_1$3.alwaysValidSchema)(it, sch))
        return;
      const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid2);
      cxt.ok(valid2);
      cxt.mergeEvaluated(schCxt);
    });
  }
};
allOf.default = def$4;
var _if = {};
Object.defineProperty(_if, "__esModule", { value: true });
const codegen_1$2 = codegen;
const util_1$2 = util;
const error$2 = {
  message: ({ params }) => (0, codegen_1$2.str)`must match "${params.ifClause}" schema`,
  params: ({ params }) => (0, codegen_1$2._)`{failingKeyword: ${params.ifClause}}`
};
const def$3 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  error: error$2,
  code(cxt) {
    const { gen, parentSchema, it } = cxt;
    if (parentSchema.then === void 0 && parentSchema.else === void 0) {
      (0, util_1$2.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
    }
    const hasThen = hasSchema(it, "then");
    const hasElse = hasSchema(it, "else");
    if (!hasThen && !hasElse)
      return;
    const valid2 = gen.let("valid", true);
    const schValid = gen.name("_valid");
    validateIf();
    cxt.reset();
    if (hasThen && hasElse) {
      const ifClause = gen.let("ifClause");
      cxt.setParams({ ifClause });
      gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
    } else if (hasThen) {
      gen.if(schValid, validateClause("then"));
    } else {
      gen.if((0, codegen_1$2.not)(schValid), validateClause("else"));
    }
    cxt.pass(valid2, () => cxt.error(true));
    function validateIf() {
      const schCxt = cxt.subschema({
        keyword: "if",
        compositeRule: true,
        createErrors: false,
        allErrors: false
      }, schValid);
      cxt.mergeEvaluated(schCxt);
    }
    function validateClause(keyword2, ifClause) {
      return () => {
        const schCxt = cxt.subschema({ keyword: keyword2 }, schValid);
        gen.assign(valid2, schValid);
        cxt.mergeValidEvaluated(schCxt, valid2);
        if (ifClause)
          gen.assign(ifClause, (0, codegen_1$2._)`${keyword2}`);
        else
          cxt.setParams({ ifClause: keyword2 });
      };
    }
  }
};
function hasSchema(it, keyword2) {
  const schema = it.schema[keyword2];
  return schema !== void 0 && !(0, util_1$2.alwaysValidSchema)(it, schema);
}
_if.default = def$3;
var thenElse = {};
Object.defineProperty(thenElse, "__esModule", { value: true });
const util_1$1 = util;
const def$2 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: keyword2, parentSchema, it }) {
    if (parentSchema.if === void 0)
      (0, util_1$1.checkStrictMode)(it, `"${keyword2}" without "if" is ignored`);
  }
};
thenElse.default = def$2;
Object.defineProperty(applicator, "__esModule", { value: true });
const additionalItems_1 = additionalItems;
const prefixItems_1 = prefixItems;
const items_1 = items;
const items2020_1 = items2020;
const contains_1 = contains;
const dependencies_1 = dependencies;
const propertyNames_1 = propertyNames;
const additionalProperties_1 = additionalProperties;
const properties_1 = properties$1;
const patternProperties_1 = patternProperties;
const not_1 = not;
const anyOf_1 = anyOf;
const oneOf_1 = oneOf;
const allOf_1 = allOf;
const if_1 = _if;
const thenElse_1 = thenElse;
function getApplicator(draft2020 = false) {
  const applicator2 = [
    // any
    not_1.default,
    anyOf_1.default,
    oneOf_1.default,
    allOf_1.default,
    if_1.default,
    thenElse_1.default,
    // object
    propertyNames_1.default,
    additionalProperties_1.default,
    dependencies_1.default,
    properties_1.default,
    patternProperties_1.default
  ];
  if (draft2020)
    applicator2.push(prefixItems_1.default, items2020_1.default);
  else
    applicator2.push(additionalItems_1.default, items_1.default);
  applicator2.push(contains_1.default);
  return applicator2;
}
applicator.default = getApplicator;
var format$2 = {};
var format$1 = {};
Object.defineProperty(format$1, "__esModule", { value: true });
const codegen_1$1 = codegen;
const error$1 = {
  message: ({ schemaCode }) => (0, codegen_1$1.str)`must match format "${schemaCode}"`,
  params: ({ schemaCode }) => (0, codegen_1$1._)`{format: ${schemaCode}}`
};
const def$1 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: true,
  error: error$1,
  code(cxt, ruleType) {
    const { gen, data, $data, schema, schemaCode, it } = cxt;
    const { opts, errSchemaPath, schemaEnv, self: self2 } = it;
    if (!opts.validateFormats)
      return;
    if ($data)
      validate$DataFormat();
    else
      validateFormat();
    function validate$DataFormat() {
      const fmts = gen.scopeValue("formats", {
        ref: self2.formats,
        code: opts.code.formats
      });
      const fDef = gen.const("fDef", (0, codegen_1$1._)`${fmts}[${schemaCode}]`);
      const fType = gen.let("fType");
      const format2 = gen.let("format");
      gen.if((0, codegen_1$1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1$1._)`${fDef}.type || "string"`).assign(format2, (0, codegen_1$1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1$1._)`"string"`).assign(format2, fDef));
      cxt.fail$data((0, codegen_1$1.or)(unknownFmt(), invalidFmt()));
      function unknownFmt() {
        if (opts.strictSchema === false)
          return codegen_1$1.nil;
        return (0, codegen_1$1._)`${schemaCode} && !${format2}`;
      }
      function invalidFmt() {
        const callFormat = schemaEnv.$async ? (0, codegen_1$1._)`(${fDef}.async ? await ${format2}(${data}) : ${format2}(${data}))` : (0, codegen_1$1._)`${format2}(${data})`;
        const validData = (0, codegen_1$1._)`(typeof ${format2} == "function" ? ${callFormat} : ${format2}.test(${data}))`;
        return (0, codegen_1$1._)`${format2} && ${format2} !== true && ${fType} === ${ruleType} && !${validData}`;
      }
    }
    function validateFormat() {
      const formatDef = self2.formats[schema];
      if (!formatDef) {
        unknownFormat();
        return;
      }
      if (formatDef === true)
        return;
      const [fmtType, format2, fmtRef] = getFormat(formatDef);
      if (fmtType === ruleType)
        cxt.pass(validCondition());
      function unknownFormat() {
        if (opts.strictSchema === false) {
          self2.logger.warn(unknownMsg());
          return;
        }
        throw new Error(unknownMsg());
        function unknownMsg() {
          return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
        }
      }
      function getFormat(fmtDef) {
        const code2 = fmtDef instanceof RegExp ? (0, codegen_1$1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1$1._)`${opts.code.formats}${(0, codegen_1$1.getProperty)(schema)}` : void 0;
        const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code: code2 });
        if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
          return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1$1._)`${fmt}.validate`];
        }
        return ["string", fmtDef, fmt];
      }
      function validCondition() {
        if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
          if (!schemaEnv.$async)
            throw new Error("async format in sync schema");
          return (0, codegen_1$1._)`await ${fmtRef}(${data})`;
        }
        return typeof format2 == "function" ? (0, codegen_1$1._)`${fmtRef}(${data})` : (0, codegen_1$1._)`${fmtRef}.test(${data})`;
      }
    }
  }
};
format$1.default = def$1;
Object.defineProperty(format$2, "__esModule", { value: true });
const format_1$1 = format$1;
const format = [format_1$1.default];
format$2.default = format;
var metadata = {};
Object.defineProperty(metadata, "__esModule", { value: true });
metadata.contentVocabulary = metadata.metadataVocabulary = void 0;
metadata.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
metadata.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(draft7, "__esModule", { value: true });
const core_1 = core$1;
const validation_1 = validation$1;
const applicator_1 = applicator;
const format_1 = format$2;
const metadata_1 = metadata;
const draft7Vocabularies = [
  core_1.default,
  validation_1.default,
  (0, applicator_1.default)(),
  format_1.default,
  metadata_1.metadataVocabulary,
  metadata_1.contentVocabulary
];
draft7.default = draft7Vocabularies;
var discriminator = {};
var types = {};
Object.defineProperty(types, "__esModule", { value: true });
types.DiscrError = void 0;
var DiscrError;
(function(DiscrError2) {
  DiscrError2["Tag"] = "tag";
  DiscrError2["Mapping"] = "mapping";
})(DiscrError || (types.DiscrError = DiscrError = {}));
Object.defineProperty(discriminator, "__esModule", { value: true });
const codegen_1 = codegen;
const types_1 = types;
const compile_1 = compile;
const ref_error_1 = ref_error;
const util_1 = util;
const error = {
  message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
  params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
};
const def = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error,
  code(cxt) {
    const { gen, data, schema, parentSchema, it } = cxt;
    const { oneOf: oneOf2 } = parentSchema;
    if (!it.opts.discriminator) {
      throw new Error("discriminator: requires discriminator option");
    }
    const tagName = schema.propertyName;
    if (typeof tagName != "string")
      throw new Error("discriminator: requires propertyName");
    if (schema.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!oneOf2)
      throw new Error("discriminator: requires oneOf keyword");
    const valid2 = gen.let("valid", false);
    const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
    gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
    cxt.ok(valid2);
    function validateMapping() {
      const mapping = getMapping();
      gen.if(false);
      for (const tagValue in mapping) {
        gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
        gen.assign(valid2, applyTagSchema(mapping[tagValue]));
      }
      gen.else();
      cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
      gen.endIf();
    }
    function applyTagSchema(schemaProp) {
      const _valid = gen.name("valid");
      const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
      cxt.mergeEvaluated(schCxt, codegen_1.Name);
      return _valid;
    }
    function getMapping() {
      var _a;
      const oneOfMapping = {};
      const topRequired = hasRequired(parentSchema);
      let tagRequired = true;
      for (let i = 0; i < oneOf2.length; i++) {
        let sch = oneOf2[i];
        if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
          const ref2 = sch.$ref;
          sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref2);
          if (sch instanceof compile_1.SchemaEnv)
            sch = sch.schema;
          if (sch === void 0)
            throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref2);
        }
        const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
        if (typeof propSch != "object") {
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
        }
        tagRequired = tagRequired && (topRequired || hasRequired(sch));
        addMappings(propSch, i);
      }
      if (!tagRequired)
        throw new Error(`discriminator: "${tagName}" must be required`);
      return oneOfMapping;
      function hasRequired({ required: required2 }) {
        return Array.isArray(required2) && required2.includes(tagName);
      }
      function addMappings(sch, i) {
        if (sch.const) {
          addMapping(sch.const, i);
        } else if (sch.enum) {
          for (const tagValue of sch.enum) {
            addMapping(tagValue, i);
          }
        } else {
          throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
        }
      }
      function addMapping(tagValue, i) {
        if (typeof tagValue != "string" || tagValue in oneOfMapping) {
          throw new Error(`discriminator: "${tagName}" values must be unique strings`);
        }
        oneOfMapping[tagValue] = i;
      }
    }
  }
};
discriminator.default = def;
const $schema = "http://json-schema.org/draft-07/schema#";
const $id = "http://json-schema.org/draft-07/schema#";
const title = "Core schema meta-schema";
const definitions = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        "default": 0
      }
    ]
  },
  simpleTypes: {
    "enum": [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: true,
    "default": []
  }
};
const type$1 = [
  "object",
  "boolean"
];
const properties = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  "default": true,
  readOnly: {
    type: "boolean",
    "default": false
  },
  examples: {
    type: "array",
    items: true
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    "default": true
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    "default": false
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    "default": {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    "default": {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    "default": {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  "const": true,
  "enum": {
    type: "array",
    items: true,
    minItems: 1,
    uniqueItems: true
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: true
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  "if": {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  "else": {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
};
const require$$3 = {
  $schema,
  $id,
  title,
  definitions,
  type: type$1,
  properties,
  "default": true
};
(function(module, exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.MissingRefError = exports$1.ValidationError = exports$1.CodeGen = exports$1.Name = exports$1.nil = exports$1.stringify = exports$1.str = exports$1._ = exports$1.KeywordCxt = exports$1.Ajv = void 0;
  const core_12 = core$2;
  const draft7_1 = draft7;
  const discriminator_1 = discriminator;
  const draft7MetaSchema = require$$3;
  const META_SUPPORT_DATA = ["/properties"];
  const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
  class Ajv extends core_12.default {
    _addVocabularies() {
      super._addVocabularies();
      draft7_1.default.forEach((v) => this.addVocabulary(v));
      if (this.opts.discriminator)
        this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      if (!this.opts.meta)
        return;
      const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
      this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
      this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
    }
  }
  exports$1.Ajv = Ajv;
  module.exports = exports$1 = Ajv;
  module.exports.Ajv = Ajv;
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.default = Ajv;
  var validate_12 = validate;
  Object.defineProperty(exports$1, "KeywordCxt", { enumerable: true, get: function() {
    return validate_12.KeywordCxt;
  } });
  var codegen_12 = codegen;
  Object.defineProperty(exports$1, "_", { enumerable: true, get: function() {
    return codegen_12._;
  } });
  Object.defineProperty(exports$1, "str", { enumerable: true, get: function() {
    return codegen_12.str;
  } });
  Object.defineProperty(exports$1, "stringify", { enumerable: true, get: function() {
    return codegen_12.stringify;
  } });
  Object.defineProperty(exports$1, "nil", { enumerable: true, get: function() {
    return codegen_12.nil;
  } });
  Object.defineProperty(exports$1, "Name", { enumerable: true, get: function() {
    return codegen_12.Name;
  } });
  Object.defineProperty(exports$1, "CodeGen", { enumerable: true, get: function() {
    return codegen_12.CodeGen;
  } });
  var validation_error_12 = validation_error;
  Object.defineProperty(exports$1, "ValidationError", { enumerable: true, get: function() {
    return validation_error_12.default;
  } });
  var ref_error_12 = ref_error;
  Object.defineProperty(exports$1, "MissingRefError", { enumerable: true, get: function() {
    return ref_error_12.default;
  } });
})(ajv, ajv.exports);
var ajvExports = ajv.exports;
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.formatLimitDefinition = void 0;
  const ajv_1 = ajvExports;
  const codegen_12 = codegen;
  const ops2 = codegen_12.operators;
  const KWDs2 = {
    formatMaximum: { okStr: "<=", ok: ops2.LTE, fail: ops2.GT },
    formatMinimum: { okStr: ">=", ok: ops2.GTE, fail: ops2.LT },
    formatExclusiveMaximum: { okStr: "<", ok: ops2.LT, fail: ops2.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: ops2.GT, fail: ops2.LTE }
  };
  const error2 = {
    message: ({ keyword: keyword2, schemaCode }) => codegen_12.str`should be ${KWDs2[keyword2].okStr} ${schemaCode}`,
    params: ({ keyword: keyword2, schemaCode }) => codegen_12._`{comparison: ${KWDs2[keyword2].okStr}, limit: ${schemaCode}}`
  };
  exports$1.formatLimitDefinition = {
    keyword: Object.keys(KWDs2),
    type: "string",
    schemaType: "string",
    $data: true,
    error: error2,
    code(cxt) {
      const { gen, data, schemaCode, keyword: keyword2, it } = cxt;
      const { opts, self: self2 } = it;
      if (!opts.validateFormats)
        return;
      const fCxt = new ajv_1.KeywordCxt(it, self2.RULES.all.format.definition, "format");
      if (fCxt.$data)
        validate$DataFormat();
      else
        validateFormat();
      function validate$DataFormat() {
        const fmts = gen.scopeValue("formats", {
          ref: self2.formats,
          code: opts.code.formats
        });
        const fmt = gen.const("fmt", codegen_12._`${fmts}[${fCxt.schemaCode}]`);
        cxt.fail$data(codegen_12.or(codegen_12._`typeof ${fmt} != "object"`, codegen_12._`${fmt} instanceof RegExp`, codegen_12._`typeof ${fmt}.compare != "function"`, compareCode(fmt)));
      }
      function validateFormat() {
        const format2 = fCxt.schema;
        const fmtDef = self2.formats[format2];
        if (!fmtDef || fmtDef === true)
          return;
        if (typeof fmtDef != "object" || fmtDef instanceof RegExp || typeof fmtDef.compare != "function") {
          throw new Error(`"${keyword2}": format "${format2}" does not define "compare" function`);
        }
        const fmt = gen.scopeValue("formats", {
          key: format2,
          ref: fmtDef,
          code: opts.code.formats ? codegen_12._`${opts.code.formats}${codegen_12.getProperty(format2)}` : void 0
        });
        cxt.fail$data(compareCode(fmt));
      }
      function compareCode(fmt) {
        return codegen_12._`${fmt}.compare(${data}, ${schemaCode}) ${KWDs2[keyword2].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const formatLimitPlugin = (ajv2) => {
    ajv2.addKeyword(exports$1.formatLimitDefinition);
    return ajv2;
  };
  exports$1.default = formatLimitPlugin;
})(limit);
(function(module, exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  const formats_1 = formats;
  const limit_1 = limit;
  const codegen_12 = codegen;
  const fullName = new codegen_12.Name("fullFormats");
  const fastName = new codegen_12.Name("fastFormats");
  const formatsPlugin = (ajv2, opts = { keywords: true }) => {
    if (Array.isArray(opts)) {
      addFormats(ajv2, opts, formats_1.fullFormats, fullName);
      return ajv2;
    }
    const [formats2, exportName] = opts.mode === "fast" ? [formats_1.fastFormats, fastName] : [formats_1.fullFormats, fullName];
    const list = opts.formats || formats_1.formatNames;
    addFormats(ajv2, list, formats2, exportName);
    if (opts.keywords)
      limit_1.default(ajv2);
    return ajv2;
  };
  formatsPlugin.get = (name, mode = "full") => {
    const formats2 = mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats;
    const f = formats2[name];
    if (!f)
      throw new Error(`Unknown format "${name}"`);
    return f;
  };
  function addFormats(ajv2, list, fs2, exportName) {
    var _a;
    var _b;
    (_a = (_b = ajv2.opts.code).formats) !== null && _a !== void 0 ? _a : _b.formats = codegen_12._`require("ajv-formats/dist/formats").${exportName}`;
    for (const f of list)
      ajv2.addFormat(f, fs2[f]);
  }
  module.exports = exports$1 = formatsPlugin;
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.default = formatsPlugin;
})(dist, dist.exports);
var distExports = dist.exports;
const copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
const canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
const changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
const wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
const changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  Object.defineProperty(to, "toString", { ...toStringDescriptor, value: newToString });
};
const mimicFn$4 = (to, from, { ignoreNonConfigurable = false } = {}) => {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
};
var mimicFn_1 = mimicFn$4;
const mimicFn$3 = mimicFn_1;
var debounceFn = (inputFunction, options = {}) => {
  if (typeof inputFunction !== "function") {
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof inputFunction}\``);
  }
  const {
    wait = 0,
    before = false,
    after = true
  } = options;
  if (!before && !after) {
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  }
  let timeout;
  let result;
  const debouncedFunction = function(...arguments_) {
    const context = this;
    const later = () => {
      timeout = void 0;
      if (after) {
        result = inputFunction.apply(context, arguments_);
      }
    };
    const shouldCallNow = before && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (shouldCallNow) {
      result = inputFunction.apply(context, arguments_);
    }
    return result;
  };
  mimicFn$3(debouncedFunction, inputFunction);
  debouncedFunction.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = void 0;
    }
  };
  return debouncedFunction;
};
var re$2 = { exports: {} };
const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH$1 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH$1 - 6;
const RELEASE_TYPES = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var constants$1 = {
  MAX_LENGTH: MAX_LENGTH$1,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const debug$1 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1 = debug$1;
(function(module, exports$1) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2,
    MAX_SAFE_BUILD_LENGTH: MAX_SAFE_BUILD_LENGTH2,
    MAX_LENGTH: MAX_LENGTH2
  } = constants$1;
  const debug2 = debug_1;
  exports$1 = module.exports = {};
  const re2 = exports$1.re = [];
  const safeRe = exports$1.safeRe = [];
  const src = exports$1.src = [];
  const safeSrc = exports$1.safeSrc = [];
  const t2 = exports$1.t = {};
  let R = 0;
  const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
  const safeRegexReplacements = [
    ["\\s", 1],
    ["\\d", MAX_LENGTH2],
    [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH2]
  ];
  const makeSafeRegex = (value) => {
    for (const [token, max] of safeRegexReplacements) {
      value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
    }
    return value;
  };
  const createToken = (name, value, isGlobal) => {
    const safe = makeSafeRegex(value);
    const index = R++;
    debug2(name, index, value);
    t2[name] = index;
    src[index] = value;
    safeSrc[index] = safe;
    re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
    safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
  createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NONNUMERICIDENTIFIER]}|${src[t2.NUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NONNUMERICIDENTIFIER]}|${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?`);
  createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
  createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports$1.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports$1.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports$1.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(re$2, re$2.exports);
var reExports = re$2.exports;
const looseOption = Object.freeze({ loose: true });
const emptyOpts = Object.freeze({});
const parseOptions$1 = (options) => {
  if (!options) {
    return emptyOpts;
  }
  if (typeof options !== "object") {
    return looseOption;
  }
  return options;
};
var parseOptions_1 = parseOptions$1;
const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  if (typeof a === "number" && typeof b === "number") {
    return a === b ? 0 : a < b ? -1 : 1;
  }
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
var identifiers$1 = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};
const debug = debug_1;
const { MAX_LENGTH, MAX_SAFE_INTEGER } = constants$1;
const { safeRe: re$1, t: t$1 } = reExports;
const parseOptions = parseOptions_1;
const { compareIdentifiers } = identifiers$1;
let SemVer$d = class SemVer {
  constructor(version, options) {
    options = parseOptions(options);
    if (version instanceof SemVer) {
      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
    }
    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      );
    }
    debug("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m = version.trim().match(options.loose ? re$1[t$1.LOOSE] : re$1[t$1.FULL]);
    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    this.raw = version;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map((id2) => {
        if (/^[0-9]+$/.test(id2)) {
          const num = +id2;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id2;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.major < other.major) {
      return -1;
    }
    if (this.major > other.major) {
      return 1;
    }
    if (this.minor < other.minor) {
      return -1;
    }
    if (this.minor > other.minor) {
      return 1;
    }
    if (this.patch < other.patch) {
      return -1;
    }
    if (this.patch > other.patch) {
      return 1;
    }
    return 0;
  }
  comparePre(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug("build compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(release, identifier, identifierBase) {
    if (release.startsWith("pre")) {
      if (!identifier && identifierBase === false) {
        throw new Error("invalid increment argument: identifier is empty");
      }
      if (identifier) {
        const match = `-${identifier}`.match(this.options.loose ? re$1[t$1.PRERELEASELOOSE] : re$1[t$1.PRERELEASE]);
        if (!match || match[1] !== identifier) {
          throw new Error(`invalid identifier: ${identifier}`);
        }
      }
    }
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier, identifierBase);
        this.inc("pre", identifier, identifierBase);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier, identifierBase);
        }
        this.inc("pre", identifier, identifierBase);
        break;
      case "release":
        if (this.prerelease.length === 0) {
          throw new Error(`version ${this.raw} is not a prerelease`);
        }
        this.prerelease.length = 0;
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre": {
        const base = Number(identifierBase) ? 1 : 0;
        if (this.prerelease.length === 0) {
          this.prerelease = [base];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            if (identifier === this.prerelease.join(".") && identifierBase === false) {
              throw new Error("invalid increment argument: identifier already exists");
            }
            this.prerelease.push(base);
          }
        }
        if (identifier) {
          let prerelease2 = [identifier, base];
          if (identifierBase === false) {
            prerelease2 = [identifier];
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease2;
            }
          } else {
            this.prerelease = prerelease2;
          }
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.raw = this.format();
    if (this.build.length) {
      this.raw += `+${this.build.join(".")}`;
    }
    return this;
  }
};
var semver$1 = SemVer$d;
const SemVer$c = semver$1;
const parse$9 = (version, options, throwErrors = false) => {
  if (version instanceof SemVer$c) {
    return version;
  }
  try {
    return new SemVer$c(version, options);
  } catch (er) {
    if (!throwErrors) {
      return null;
    }
    throw er;
  }
};
var parse_1 = parse$9;
const parse$8 = parse_1;
const valid$2 = (version, options) => {
  const v = parse$8(version, options);
  return v ? v.version : null;
};
var valid_1 = valid$2;
const parse$7 = parse_1;
const clean$1 = (version, options) => {
  const s = parse$7(version.trim().replace(/^[=v]+/, ""), options);
  return s ? s.version : null;
};
var clean_1 = clean$1;
const SemVer$b = semver$1;
const inc$1 = (version, release, options, identifier, identifierBase) => {
  if (typeof options === "string") {
    identifierBase = identifier;
    identifier = options;
    options = void 0;
  }
  try {
    return new SemVer$b(
      version instanceof SemVer$b ? version.version : version,
      options
    ).inc(release, identifier, identifierBase).version;
  } catch (er) {
    return null;
  }
};
var inc_1 = inc$1;
const parse$6 = parse_1;
const diff$1 = (version1, version2) => {
  const v1 = parse$6(version1, null, true);
  const v2 = parse$6(version2, null, true);
  const comparison = v1.compare(v2);
  if (comparison === 0) {
    return null;
  }
  const v1Higher = comparison > 0;
  const highVersion = v1Higher ? v1 : v2;
  const lowVersion = v1Higher ? v2 : v1;
  const highHasPre = !!highVersion.prerelease.length;
  const lowHasPre = !!lowVersion.prerelease.length;
  if (lowHasPre && !highHasPre) {
    if (!lowVersion.patch && !lowVersion.minor) {
      return "major";
    }
    if (lowVersion.compareMain(highVersion) === 0) {
      if (lowVersion.minor && !lowVersion.patch) {
        return "minor";
      }
      return "patch";
    }
  }
  const prefix = highHasPre ? "pre" : "";
  if (v1.major !== v2.major) {
    return prefix + "major";
  }
  if (v1.minor !== v2.minor) {
    return prefix + "minor";
  }
  if (v1.patch !== v2.patch) {
    return prefix + "patch";
  }
  return "prerelease";
};
var diff_1 = diff$1;
const SemVer$a = semver$1;
const major$1 = (a, loose) => new SemVer$a(a, loose).major;
var major_1 = major$1;
const SemVer$9 = semver$1;
const minor$1 = (a, loose) => new SemVer$9(a, loose).minor;
var minor_1 = minor$1;
const SemVer$8 = semver$1;
const patch$1 = (a, loose) => new SemVer$8(a, loose).patch;
var patch_1 = patch$1;
const parse$5 = parse_1;
const prerelease$1 = (version, options) => {
  const parsed = parse$5(version, options);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
var prerelease_1 = prerelease$1;
const SemVer$7 = semver$1;
const compare$b = (a, b, loose) => new SemVer$7(a, loose).compare(new SemVer$7(b, loose));
var compare_1 = compare$b;
const compare$a = compare_1;
const rcompare$1 = (a, b, loose) => compare$a(b, a, loose);
var rcompare_1 = rcompare$1;
const compare$9 = compare_1;
const compareLoose$1 = (a, b) => compare$9(a, b, true);
var compareLoose_1 = compareLoose$1;
const SemVer$6 = semver$1;
const compareBuild$3 = (a, b, loose) => {
  const versionA = new SemVer$6(a, loose);
  const versionB = new SemVer$6(b, loose);
  return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
var compareBuild_1 = compareBuild$3;
const compareBuild$2 = compareBuild_1;
const sort$1 = (list, loose) => list.sort((a, b) => compareBuild$2(a, b, loose));
var sort_1 = sort$1;
const compareBuild$1 = compareBuild_1;
const rsort$1 = (list, loose) => list.sort((a, b) => compareBuild$1(b, a, loose));
var rsort_1 = rsort$1;
const compare$8 = compare_1;
const gt$4 = (a, b, loose) => compare$8(a, b, loose) > 0;
var gt_1 = gt$4;
const compare$7 = compare_1;
const lt$3 = (a, b, loose) => compare$7(a, b, loose) < 0;
var lt_1 = lt$3;
const compare$6 = compare_1;
const eq$2 = (a, b, loose) => compare$6(a, b, loose) === 0;
var eq_1 = eq$2;
const compare$5 = compare_1;
const neq$2 = (a, b, loose) => compare$5(a, b, loose) !== 0;
var neq_1 = neq$2;
const compare$4 = compare_1;
const gte$3 = (a, b, loose) => compare$4(a, b, loose) >= 0;
var gte_1 = gte$3;
const compare$3 = compare_1;
const lte$3 = (a, b, loose) => compare$3(a, b, loose) <= 0;
var lte_1 = lte$3;
const eq$1 = eq_1;
const neq$1 = neq_1;
const gt$3 = gt_1;
const gte$2 = gte_1;
const lt$2 = lt_1;
const lte$2 = lte_1;
const cmp$1 = (a, op, b, loose) => {
  switch (op) {
    case "===":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a === b;
    case "!==":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a !== b;
    case "":
    case "=":
    case "==":
      return eq$1(a, b, loose);
    case "!=":
      return neq$1(a, b, loose);
    case ">":
      return gt$3(a, b, loose);
    case ">=":
      return gte$2(a, b, loose);
    case "<":
      return lt$2(a, b, loose);
    case "<=":
      return lte$2(a, b, loose);
    default:
      throw new TypeError(`Invalid operator: ${op}`);
  }
};
var cmp_1 = cmp$1;
const SemVer$5 = semver$1;
const parse$4 = parse_1;
const { safeRe: re, t } = reExports;
const coerce$1 = (version, options) => {
  if (version instanceof SemVer$5) {
    return version;
  }
  if (typeof version === "number") {
    version = String(version);
  }
  if (typeof version !== "string") {
    return null;
  }
  options = options || {};
  let match = null;
  if (!options.rtl) {
    match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
  } else {
    const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
    let next;
    while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
      if (!match || next.index + next[0].length !== match.index + match[0].length) {
        match = next;
      }
      coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
    }
    coerceRtlRegex.lastIndex = -1;
  }
  if (match === null) {
    return null;
  }
  const major2 = match[2];
  const minor2 = match[3] || "0";
  const patch2 = match[4] || "0";
  const prerelease2 = options.includePrerelease && match[5] ? `-${match[5]}` : "";
  const build2 = options.includePrerelease && match[6] ? `+${match[6]}` : "";
  return parse$4(`${major2}.${minor2}.${patch2}${prerelease2}${build2}`, options);
};
var coerce_1 = coerce$1;
class LRUCache {
  constructor() {
    this.max = 1e3;
    this.map = /* @__PURE__ */ new Map();
  }
  get(key) {
    const value = this.map.get(key);
    if (value === void 0) {
      return void 0;
    } else {
      this.map.delete(key);
      this.map.set(key, value);
      return value;
    }
  }
  delete(key) {
    return this.map.delete(key);
  }
  set(key, value) {
    const deleted = this.delete(key);
    if (!deleted && value !== void 0) {
      if (this.map.size >= this.max) {
        const firstKey = this.map.keys().next().value;
        this.delete(firstKey);
      }
      this.map.set(key, value);
    }
    return this;
  }
}
var lrucache = LRUCache;
var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  const SPACE_CHARACTERS = /\s+/g;
  class Range2 {
    constructor(range2, options) {
      options = parseOptions2(options);
      if (range2 instanceof Range2) {
        if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
          return range2;
        } else {
          return new Range2(range2.raw, options);
        }
      }
      if (range2 instanceof Comparator2) {
        this.raw = range2.value;
        this.set = [[range2]];
        this.formatted = void 0;
        return this;
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range2.trim().replace(SPACE_CHARACTERS, " ");
      this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      }
      if (this.set.length > 1) {
        const first = this.set[0];
        this.set = this.set.filter((c) => !isNullSet(c[0]));
        if (this.set.length === 0) {
          this.set = [first];
        } else if (this.set.length > 1) {
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
          }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let i = 0; i < this.set.length; i++) {
          if (i > 0) {
            this.formatted += "||";
          }
          const comps = this.set[i];
          for (let k = 0; k < comps.length; k++) {
            if (k > 0) {
              this.formatted += " ";
            }
            this.formatted += comps[k].toString().trim();
          }
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range2) {
      const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
      const memoKey = memoOpts + ":" + range2;
      const cached = cache.get(memoKey);
      if (cached) {
        return cached;
      }
      const loose = this.options.loose;
      const hr = loose ? re2[t2.HYPHENRANGELOOSE] : re2[t2.HYPHENRANGE];
      range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug2("hyphen replace", range2);
      range2 = range2.replace(re2[t2.COMPARATORTRIM], comparatorTrimReplace);
      debug2("comparator trim", range2);
      range2 = range2.replace(re2[t2.TILDETRIM], tildeTrimReplace);
      debug2("tilde trim", range2);
      range2 = range2.replace(re2[t2.CARETTRIM], caretTrimReplace);
      debug2("caret trim", range2);
      let rangeList = range2.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
      if (loose) {
        rangeList = rangeList.filter((comp) => {
          debug2("loose invalid filter", comp, this.options);
          return !!comp.match(re2[t2.COMPARATORLOOSE]);
        });
      }
      debug2("range list", rangeList);
      const rangeMap = /* @__PURE__ */ new Map();
      const comparators = rangeList.map((comp) => new Comparator2(comp, this.options));
      for (const comp of comparators) {
        if (isNullSet(comp)) {
          return [comp];
        }
        rangeMap.set(comp.value, comp);
      }
      if (rangeMap.size > 1 && rangeMap.has("")) {
        rangeMap.delete("");
      }
      const result = [...rangeMap.values()];
      cache.set(memoKey, result);
      return result;
    }
    intersects(range2, options) {
      if (!(range2 instanceof Range2)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some((thisComparators) => {
        return isSatisfiable(thisComparators, options) && range2.set.some((rangeComparators) => {
          return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
            return rangeComparators.every((rangeComparator) => {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer3(version, this.options);
        } catch (er) {
          return false;
        }
      }
      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true;
        }
      }
      return false;
    }
  }
  range = Range2;
  const LRU = lrucache;
  const cache = new LRU();
  const parseOptions2 = parseOptions_1;
  const Comparator2 = requireComparator();
  const debug2 = debug_1;
  const SemVer3 = semver$1;
  const {
    safeRe: re2,
    t: t2,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = reExports;
  const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = constants$1;
  const isNullSet = (c) => c.value === "<0.0.0-0";
  const isAny = (c) => c.value === "";
  const isSatisfiable = (comparators, options) => {
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every((otherComparator) => {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  };
  const parseComparator = (comp, options) => {
    comp = comp.replace(re2[t2.BUILD], "");
    debug2("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug2("caret", comp);
    comp = replaceTildes(comp, options);
    debug2("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug2("xrange", comp);
    comp = replaceStars(comp, options);
    debug2("stars", comp);
    return comp;
  };
  const isX = (id2) => !id2 || id2.toLowerCase() === "x" || id2 === "*";
  const replaceTildes = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
  };
  const replaceTilde = (comp, options) => {
    const r = options.loose ? re2[t2.TILDELOOSE] : re2[t2.TILDE];
    return comp.replace(r, (_, M, m, p, pr) => {
      debug2("tilde", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
      } else if (pr) {
        debug2("replaceTilde pr", pr);
        ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
      } else {
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
      }
      debug2("tilde return", ret);
      return ret;
    });
  };
  const replaceCarets = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
  };
  const replaceCaret = (comp, options) => {
    debug2("caret", comp, options);
    const r = options.loose ? re2[t2.CARETLOOSE] : re2[t2.CARET];
    const z = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_, M, m, p, pr) => {
      debug2("caret", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        if (M === "0") {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        }
      } else if (pr) {
        debug2("replaceCaret pr", pr);
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        }
      } else {
        debug2("no pr");
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
      }
      debug2("caret return", ret);
      return ret;
    });
  };
  const replaceXRanges = (comp, options) => {
    debug2("replaceXRanges", comp, options);
    return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
  };
  const replaceXRange = (comp, options) => {
    comp = comp.trim();
    const r = options.loose ? re2[t2.XRANGELOOSE] : re2[t2.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug2("xRange", comp, ret, gtlt, M, m, p, pr);
      const xM = isX(M);
      const xm = xM || isX(m);
      const xp = xm || isX(p);
      const anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      pr = options.includePrerelease ? "-0" : "";
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0-0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        if (gtlt === "<") {
          pr = "-0";
        }
        ret = `${gtlt + M}.${m}.${p}${pr}`;
      } else if (xm) {
        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
      } else if (xp) {
        ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
      }
      debug2("xRange return", ret);
      return ret;
    });
  };
  const replaceStars = (comp, options) => {
    debug2("replaceStars", comp, options);
    return comp.trim().replace(re2[t2.STAR], "");
  };
  const replaceGTE0 = (comp, options) => {
    debug2("replaceGTE0", comp, options);
    return comp.trim().replace(re2[options.includePrerelease ? t2.GTE0PRE : t2.GTE0], "");
  };
  const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
    if (isX(fM)) {
      from = "";
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
    } else if (fpr) {
      from = `>=${from}`;
    } else {
      from = `>=${from}${incPr ? "-0" : ""}`;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }
    return `${from} ${to}`.trim();
  };
  const testSet = (set, version, options) => {
    for (let i = 0; i < set.length; i++) {
      if (!set[i].test(version)) {
        return false;
      }
    }
    if (version.prerelease.length && !options.includePrerelease) {
      for (let i = 0; i < set.length; i++) {
        debug2(set[i].semver);
        if (set[i].semver === Comparator2.ANY) {
          continue;
        }
        if (set[i].semver.prerelease.length > 0) {
          const allowed = set[i].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  };
  return range;
}
var comparator;
var hasRequiredComparator;
function requireComparator() {
  if (hasRequiredComparator) return comparator;
  hasRequiredComparator = 1;
  const ANY2 = Symbol("SemVer ANY");
  class Comparator2 {
    static get ANY() {
      return ANY2;
    }
    constructor(comp, options) {
      options = parseOptions2(options);
      if (comp instanceof Comparator2) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      comp = comp.trim().split(/\s+/).join(" ");
      debug2("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY2) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug2("comp", this);
    }
    parse(comp) {
      const r = this.options.loose ? re2[t2.COMPARATORLOOSE] : re2[t2.COMPARATOR];
      const m = comp.match(r);
      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`);
      }
      this.operator = m[1] !== void 0 ? m[1] : "";
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY2;
      } else {
        this.semver = new SemVer3(m[2], this.options.loose);
      }
    }
    toString() {
      return this.value;
    }
    test(version) {
      debug2("Comparator.test", version, this.options.loose);
      if (this.semver === ANY2 || version === ANY2) {
        return true;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer3(version, this.options);
        } catch (er) {
          return false;
        }
      }
      return cmp2(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator2)) {
        throw new TypeError("a Comparator is required");
      }
      if (this.operator === "") {
        if (this.value === "") {
          return true;
        }
        return new Range2(comp.value, options).test(this.value);
      } else if (comp.operator === "") {
        if (comp.value === "") {
          return true;
        }
        return new Range2(this.value, options).test(comp.semver);
      }
      options = parseOptions2(options);
      if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
        return false;
      }
      if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
        return false;
      }
      if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
        return true;
      }
      if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
        return true;
      }
      if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
        return true;
      }
      if (cmp2(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
        return true;
      }
      if (cmp2(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
        return true;
      }
      return false;
    }
  }
  comparator = Comparator2;
  const parseOptions2 = parseOptions_1;
  const { safeRe: re2, t: t2 } = reExports;
  const cmp2 = cmp_1;
  const debug2 = debug_1;
  const SemVer3 = semver$1;
  const Range2 = requireRange();
  return comparator;
}
const Range$9 = requireRange();
const satisfies$4 = (version, range2, options) => {
  try {
    range2 = new Range$9(range2, options);
  } catch (er) {
    return false;
  }
  return range2.test(version);
};
var satisfies_1 = satisfies$4;
const Range$8 = requireRange();
const toComparators$1 = (range2, options) => new Range$8(range2, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
var toComparators_1 = toComparators$1;
const SemVer$4 = semver$1;
const Range$7 = requireRange();
const maxSatisfying$1 = (versions, range2, options) => {
  let max = null;
  let maxSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$7(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!max || maxSV.compare(v) === -1) {
        max = v;
        maxSV = new SemVer$4(max, options);
      }
    }
  });
  return max;
};
var maxSatisfying_1 = maxSatisfying$1;
const SemVer$3 = semver$1;
const Range$6 = requireRange();
const minSatisfying$1 = (versions, range2, options) => {
  let min = null;
  let minSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$6(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!min || minSV.compare(v) === 1) {
        min = v;
        minSV = new SemVer$3(min, options);
      }
    }
  });
  return min;
};
var minSatisfying_1 = minSatisfying$1;
const SemVer$2 = semver$1;
const Range$5 = requireRange();
const gt$2 = gt_1;
const minVersion$1 = (range2, loose) => {
  range2 = new Range$5(range2, loose);
  let minver = new SemVer$2("0.0.0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = new SemVer$2("0.0.0-0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = null;
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i];
    let setMin = null;
    comparators.forEach((comparator2) => {
      const compver = new SemVer$2(comparator2.semver.version);
      switch (comparator2.operator) {
        case ">":
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }
          compver.raw = compver.format();
        case "":
        case ">=":
          if (!setMin || gt$2(compver, setMin)) {
            setMin = compver;
          }
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${comparator2.operator}`);
      }
    });
    if (setMin && (!minver || gt$2(minver, setMin))) {
      minver = setMin;
    }
  }
  if (minver && range2.test(minver)) {
    return minver;
  }
  return null;
};
var minVersion_1 = minVersion$1;
const Range$4 = requireRange();
const validRange$1 = (range2, options) => {
  try {
    return new Range$4(range2, options).range || "*";
  } catch (er) {
    return null;
  }
};
var valid$1 = validRange$1;
const SemVer$1 = semver$1;
const Comparator$2 = requireComparator();
const { ANY: ANY$1 } = Comparator$2;
const Range$3 = requireRange();
const satisfies$3 = satisfies_1;
const gt$1 = gt_1;
const lt$1 = lt_1;
const lte$1 = lte_1;
const gte$1 = gte_1;
const outside$3 = (version, range2, hilo, options) => {
  version = new SemVer$1(version, options);
  range2 = new Range$3(range2, options);
  let gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case ">":
      gtfn = gt$1;
      ltefn = lte$1;
      ltfn = lt$1;
      comp = ">";
      ecomp = ">=";
      break;
    case "<":
      gtfn = lt$1;
      ltefn = gte$1;
      ltfn = gt$1;
      comp = "<";
      ecomp = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (satisfies$3(version, range2, options)) {
    return false;
  }
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i];
    let high = null;
    let low = null;
    comparators.forEach((comparator2) => {
      if (comparator2.semver === ANY$1) {
        comparator2 = new Comparator$2(">=0.0.0");
      }
      high = high || comparator2;
      low = low || comparator2;
      if (gtfn(comparator2.semver, high.semver, options)) {
        high = comparator2;
      } else if (ltfn(comparator2.semver, low.semver, options)) {
        low = comparator2;
      }
    });
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }
    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
};
var outside_1 = outside$3;
const outside$2 = outside_1;
const gtr$1 = (version, range2, options) => outside$2(version, range2, ">", options);
var gtr_1 = gtr$1;
const outside$1 = outside_1;
const ltr$1 = (version, range2, options) => outside$1(version, range2, "<", options);
var ltr_1 = ltr$1;
const Range$2 = requireRange();
const intersects$1 = (r1, r2, options) => {
  r1 = new Range$2(r1, options);
  r2 = new Range$2(r2, options);
  return r1.intersects(r2, options);
};
var intersects_1 = intersects$1;
const satisfies$2 = satisfies_1;
const compare$2 = compare_1;
var simplify = (versions, range2, options) => {
  const set = [];
  let first = null;
  let prev = null;
  const v = versions.sort((a, b) => compare$2(a, b, options));
  for (const version of v) {
    const included = satisfies$2(version, range2, options);
    if (included) {
      prev = version;
      if (!first) {
        first = version;
      }
    } else {
      if (prev) {
        set.push([first, prev]);
      }
      prev = null;
      first = null;
    }
  }
  if (first) {
    set.push([first, null]);
  }
  const ranges = [];
  for (const [min, max] of set) {
    if (min === max) {
      ranges.push(min);
    } else if (!max && min === v[0]) {
      ranges.push("*");
    } else if (!max) {
      ranges.push(`>=${min}`);
    } else if (min === v[0]) {
      ranges.push(`<=${max}`);
    } else {
      ranges.push(`${min} - ${max}`);
    }
  }
  const simplified = ranges.join(" || ");
  const original = typeof range2.raw === "string" ? range2.raw : String(range2);
  return simplified.length < original.length ? simplified : range2;
};
const Range$1 = requireRange();
const Comparator$1 = requireComparator();
const { ANY } = Comparator$1;
const satisfies$1 = satisfies_1;
const compare$1 = compare_1;
const subset$1 = (sub, dom2, options = {}) => {
  if (sub === dom2) {
    return true;
  }
  sub = new Range$1(sub, options);
  dom2 = new Range$1(dom2, options);
  let sawNonNull = false;
  OUTER: for (const simpleSub of sub.set) {
    for (const simpleDom of dom2.set) {
      const isSub = simpleSubset(simpleSub, simpleDom, options);
      sawNonNull = sawNonNull || isSub !== null;
      if (isSub) {
        continue OUTER;
      }
    }
    if (sawNonNull) {
      return false;
    }
  }
  return true;
};
const minimumVersionWithPreRelease = [new Comparator$1(">=0.0.0-0")];
const minimumVersion = [new Comparator$1(">=0.0.0")];
const simpleSubset = (sub, dom2, options) => {
  if (sub === dom2) {
    return true;
  }
  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom2.length === 1 && dom2[0].semver === ANY) {
      return true;
    } else if (options.includePrerelease) {
      sub = minimumVersionWithPreRelease;
    } else {
      sub = minimumVersion;
    }
  }
  if (dom2.length === 1 && dom2[0].semver === ANY) {
    if (options.includePrerelease) {
      return true;
    } else {
      dom2 = minimumVersion;
    }
  }
  const eqSet = /* @__PURE__ */ new Set();
  let gt2, lt2;
  for (const c of sub) {
    if (c.operator === ">" || c.operator === ">=") {
      gt2 = higherGT(gt2, c, options);
    } else if (c.operator === "<" || c.operator === "<=") {
      lt2 = lowerLT(lt2, c, options);
    } else {
      eqSet.add(c.semver);
    }
  }
  if (eqSet.size > 1) {
    return null;
  }
  let gtltComp;
  if (gt2 && lt2) {
    gtltComp = compare$1(gt2.semver, lt2.semver, options);
    if (gtltComp > 0) {
      return null;
    } else if (gtltComp === 0 && (gt2.operator !== ">=" || lt2.operator !== "<=")) {
      return null;
    }
  }
  for (const eq2 of eqSet) {
    if (gt2 && !satisfies$1(eq2, String(gt2), options)) {
      return null;
    }
    if (lt2 && !satisfies$1(eq2, String(lt2), options)) {
      return null;
    }
    for (const c of dom2) {
      if (!satisfies$1(eq2, String(c), options)) {
        return false;
      }
    }
    return true;
  }
  let higher, lower;
  let hasDomLT, hasDomGT;
  let needDomLTPre = lt2 && !options.includePrerelease && lt2.semver.prerelease.length ? lt2.semver : false;
  let needDomGTPre = gt2 && !options.includePrerelease && gt2.semver.prerelease.length ? gt2.semver : false;
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt2.operator === "<" && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false;
  }
  for (const c of dom2) {
    hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
    hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
    if (gt2) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false;
        }
      }
      if (c.operator === ">" || c.operator === ">=") {
        higher = higherGT(gt2, c, options);
        if (higher === c && higher !== gt2) {
          return false;
        }
      } else if (gt2.operator === ">=" && !satisfies$1(gt2.semver, String(c), options)) {
        return false;
      }
    }
    if (lt2) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false;
        }
      }
      if (c.operator === "<" || c.operator === "<=") {
        lower = lowerLT(lt2, c, options);
        if (lower === c && lower !== lt2) {
          return false;
        }
      } else if (lt2.operator === "<=" && !satisfies$1(lt2.semver, String(c), options)) {
        return false;
      }
    }
    if (!c.operator && (lt2 || gt2) && gtltComp !== 0) {
      return false;
    }
  }
  if (gt2 && hasDomLT && !lt2 && gtltComp !== 0) {
    return false;
  }
  if (lt2 && hasDomGT && !gt2 && gtltComp !== 0) {
    return false;
  }
  if (needDomGTPre || needDomLTPre) {
    return false;
  }
  return true;
};
const higherGT = (a, b, options) => {
  if (!a) {
    return b;
  }
  const comp = compare$1(a.semver, b.semver, options);
  return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
};
const lowerLT = (a, b, options) => {
  if (!a) {
    return b;
  }
  const comp = compare$1(a.semver, b.semver, options);
  return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
};
var subset_1 = subset$1;
const internalRe = reExports;
const constants = constants$1;
const SemVer2 = semver$1;
const identifiers = identifiers$1;
const parse$3 = parse_1;
const valid = valid_1;
const clean = clean_1;
const inc = inc_1;
const diff = diff_1;
const major = major_1;
const minor = minor_1;
const patch = patch_1;
const prerelease = prerelease_1;
const compare = compare_1;
const rcompare = rcompare_1;
const compareLoose = compareLoose_1;
const compareBuild = compareBuild_1;
const sort = sort_1;
const rsort = rsort_1;
const gt = gt_1;
const lt = lt_1;
const eq = eq_1;
const neq = neq_1;
const gte = gte_1;
const lte = lte_1;
const cmp = cmp_1;
const coerce = coerce_1;
const Comparator = requireComparator();
const Range = requireRange();
const satisfies = satisfies_1;
const toComparators = toComparators_1;
const maxSatisfying = maxSatisfying_1;
const minSatisfying = minSatisfying_1;
const minVersion = minVersion_1;
const validRange = valid$1;
const outside = outside_1;
const gtr = gtr_1;
const ltr = ltr_1;
const intersects = intersects_1;
const simplifyRange = simplify;
const subset = subset_1;
var semver = {
  parse: parse$3,
  valid,
  clean,
  inc,
  diff,
  major,
  minor,
  patch,
  prerelease,
  compare,
  rcompare,
  compareLoose,
  compareBuild,
  sort,
  rsort,
  gt,
  lt,
  eq,
  neq,
  gte,
  lte,
  cmp,
  coerce,
  Comparator,
  Range,
  satisfies,
  toComparators,
  maxSatisfying,
  minSatisfying,
  minVersion,
  validRange,
  outside,
  gtr,
  ltr,
  intersects,
  simplifyRange,
  subset,
  SemVer: SemVer2,
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: constants.RELEASE_TYPES,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers
};
var onetime$1 = { exports: {} };
var mimicFn$2 = { exports: {} };
const mimicFn$1 = (to, from) => {
  for (const prop of Reflect.ownKeys(from)) {
    Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
  }
  return to;
};
mimicFn$2.exports = mimicFn$1;
mimicFn$2.exports.default = mimicFn$1;
var mimicFnExports = mimicFn$2.exports;
const mimicFn = mimicFnExports;
const calledFunctions = /* @__PURE__ */ new WeakMap();
const onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = null;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFn(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime$1.exports = onetime;
onetime$1.exports.default = onetime;
onetime$1.exports.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
var onetimeExports = onetime$1.exports;
(function(module, exports$1) {
  var __classPrivateFieldSet = commonjsGlobal && commonjsGlobal.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = commonjsGlobal && commonjsGlobal.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _a, _b;
  var _Conf_validator, _Conf_encryptionKey, _Conf_options, _Conf_defaultValues;
  Object.defineProperty(exports$1, "__esModule", { value: true });
  const util_12 = require$$1$1;
  const fs2 = fs__default;
  const path2 = require$$0__default;
  const crypto2 = crypto__default;
  const assert = require$$4;
  const events_1 = require$$5;
  const dotProp$1 = dotProp;
  const pkgUp2 = pkgUpExports;
  const envPaths2 = envPathsExports;
  const atomically = dist$1;
  const ajv_1 = ajvExports$1;
  const ajv_formats_1 = distExports;
  const debounceFn$1 = debounceFn;
  const semver$12 = semver;
  const onetime2 = onetimeExports;
  const encryptionAlgorithm = "aes-256-cbc";
  const createPlainObject = () => {
    return /* @__PURE__ */ Object.create(null);
  };
  const isExist = (data) => {
    return data !== void 0 && data !== null;
  };
  let parentDir = "";
  try {
    delete require.cache[__filename];
    parentDir = path2.dirname((_b = (_a = module.parent) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : ".");
  } catch (_c) {
  }
  const checkValueType = (key, value) => {
    const nonJsonTypes = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]);
    const type2 = typeof value;
    if (nonJsonTypes.has(type2)) {
      throw new TypeError(`Setting a value of type \`${type2}\` for key \`${key}\` is not allowed as it's not supported by JSON`);
    }
  };
  const INTERNAL_KEY = "__internal__";
  const MIGRATION_KEY = `${INTERNAL_KEY}.migrations.version`;
  class Conf2 {
    constructor(partialOptions = {}) {
      var _a2;
      _Conf_validator.set(this, void 0);
      _Conf_encryptionKey.set(this, void 0);
      _Conf_options.set(this, void 0);
      _Conf_defaultValues.set(this, {});
      this._deserialize = (value) => JSON.parse(value);
      this._serialize = (value) => JSON.stringify(value, void 0, "	");
      const options = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: false,
        accessPropertiesByDotNotation: true,
        configFileMode: 438,
        ...partialOptions
      };
      const getPackageData = onetime2(() => {
        const packagePath = pkgUp2.sync({ cwd: parentDir });
        const packageData = packagePath && JSON.parse(fs2.readFileSync(packagePath, "utf8"));
        return packageData !== null && packageData !== void 0 ? packageData : {};
      });
      if (!options.cwd) {
        if (!options.projectName) {
          options.projectName = getPackageData().name;
        }
        if (!options.projectName) {
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        }
        options.cwd = envPaths2(options.projectName, { suffix: options.projectSuffix }).config;
      }
      __classPrivateFieldSet(this, _Conf_options, options, "f");
      if (options.schema) {
        if (typeof options.schema !== "object") {
          throw new TypeError("The `schema` option must be an object.");
        }
        const ajv2 = new ajv_1.default({
          allErrors: true,
          useDefaults: true
        });
        (0, ajv_formats_1.default)(ajv2);
        const schema = {
          type: "object",
          properties: options.schema
        };
        __classPrivateFieldSet(this, _Conf_validator, ajv2.compile(schema), "f");
        for (const [key, value] of Object.entries(options.schema)) {
          if (value === null || value === void 0 ? void 0 : value.default) {
            __classPrivateFieldGet(this, _Conf_defaultValues, "f")[key] = value.default;
          }
        }
      }
      if (options.defaults) {
        __classPrivateFieldSet(this, _Conf_defaultValues, {
          ...__classPrivateFieldGet(this, _Conf_defaultValues, "f"),
          ...options.defaults
        }, "f");
      }
      if (options.serialize) {
        this._serialize = options.serialize;
      }
      if (options.deserialize) {
        this._deserialize = options.deserialize;
      }
      this.events = new events_1.EventEmitter();
      __classPrivateFieldSet(this, _Conf_encryptionKey, options.encryptionKey, "f");
      const fileExtension = options.fileExtension ? `.${options.fileExtension}` : "";
      this.path = path2.resolve(options.cwd, `${(_a2 = options.configName) !== null && _a2 !== void 0 ? _a2 : "config"}${fileExtension}`);
      const fileStore = this.store;
      const store2 = Object.assign(createPlainObject(), options.defaults, fileStore);
      this._validate(store2);
      try {
        assert.deepEqual(fileStore, store2);
      } catch (_b2) {
        this.store = store2;
      }
      if (options.watch) {
        this._watch();
      }
      if (options.migrations) {
        if (!options.projectVersion) {
          options.projectVersion = getPackageData().version;
        }
        if (!options.projectVersion) {
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        }
        this._migrate(options.migrations, options.projectVersion, options.beforeEachMigration);
      }
    }
    get(key, defaultValue) {
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        return this._get(key, defaultValue);
      }
      const { store: store2 } = this;
      return key in store2 ? store2[key] : defaultValue;
    }
    set(key, value) {
      if (typeof key !== "string" && typeof key !== "object") {
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof key}`);
      }
      if (typeof key !== "object" && value === void 0) {
        throw new TypeError("Use `delete()` to clear values");
      }
      if (this._containsReservedKey(key)) {
        throw new TypeError(`Please don't use the ${INTERNAL_KEY} key, as it's used to manage this module internal operations.`);
      }
      const { store: store2 } = this;
      const set = (key2, value2) => {
        checkValueType(key2, value2);
        if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
          dotProp$1.set(store2, key2, value2);
        } else {
          store2[key2] = value2;
        }
      };
      if (typeof key === "object") {
        const object = key;
        for (const [key2, value2] of Object.entries(object)) {
          set(key2, value2);
        }
      } else {
        set(key, value);
      }
      this.store = store2;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(key) {
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        return dotProp$1.has(this.store, key);
      }
      return key in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...keys) {
      for (const key of keys) {
        if (isExist(__classPrivateFieldGet(this, _Conf_defaultValues, "f")[key])) {
          this.set(key, __classPrivateFieldGet(this, _Conf_defaultValues, "f")[key]);
        }
      }
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(key) {
      const { store: store2 } = this;
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        dotProp$1.delete(store2, key);
      } else {
        delete store2[key];
      }
      this.store = store2;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = createPlainObject();
      for (const key of Object.keys(__classPrivateFieldGet(this, _Conf_defaultValues, "f"))) {
        this.reset(key);
      }
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(key, callback) {
      if (typeof key !== "string") {
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof key}`);
      }
      if (typeof callback !== "function") {
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof callback}`);
      }
      return this._handleChange(() => this.get(key), callback);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(callback) {
      if (typeof callback !== "function") {
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof callback}`);
      }
      return this._handleChange(() => this.store, callback);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const data = fs2.readFileSync(this.path, __classPrivateFieldGet(this, _Conf_encryptionKey, "f") ? null : "utf8");
        const dataString = this._encryptData(data);
        const deserializedData = this._deserialize(dataString);
        this._validate(deserializedData);
        return Object.assign(createPlainObject(), deserializedData);
      } catch (error2) {
        if ((error2 === null || error2 === void 0 ? void 0 : error2.code) === "ENOENT") {
          this._ensureDirectory();
          return createPlainObject();
        }
        if (__classPrivateFieldGet(this, _Conf_options, "f").clearInvalidConfig && error2.name === "SyntaxError") {
          return createPlainObject();
        }
        throw error2;
      }
    }
    set store(value) {
      this._ensureDirectory();
      this._validate(value);
      this._write(value);
      this.events.emit("change");
    }
    *[(_Conf_validator = /* @__PURE__ */ new WeakMap(), _Conf_encryptionKey = /* @__PURE__ */ new WeakMap(), _Conf_options = /* @__PURE__ */ new WeakMap(), _Conf_defaultValues = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [key, value] of Object.entries(this.store)) {
        yield [key, value];
      }
    }
    _encryptData(data) {
      if (!__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
        return data.toString();
      }
      try {
        if (__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
          try {
            if (data.slice(16, 17).toString() === ":") {
              const initializationVector = data.slice(0, 16);
              const password = crypto2.pbkdf2Sync(__classPrivateFieldGet(this, _Conf_encryptionKey, "f"), initializationVector.toString(), 1e4, 32, "sha512");
              const decipher = crypto2.createDecipheriv(encryptionAlgorithm, password, initializationVector);
              data = Buffer.concat([decipher.update(Buffer.from(data.slice(17))), decipher.final()]).toString("utf8");
            } else {
              const decipher = crypto2.createDecipher(encryptionAlgorithm, __classPrivateFieldGet(this, _Conf_encryptionKey, "f"));
              data = Buffer.concat([decipher.update(Buffer.from(data)), decipher.final()]).toString("utf8");
            }
          } catch (_a2) {
          }
        }
      } catch (_b2) {
      }
      return data.toString();
    }
    _handleChange(getter, callback) {
      let currentValue = getter();
      const onChange = () => {
        const oldValue = currentValue;
        const newValue = getter();
        if ((0, util_12.isDeepStrictEqual)(newValue, oldValue)) {
          return;
        }
        currentValue = newValue;
        callback.call(this, newValue, oldValue);
      };
      this.events.on("change", onChange);
      return () => this.events.removeListener("change", onChange);
    }
    _validate(data) {
      if (!__classPrivateFieldGet(this, _Conf_validator, "f")) {
        return;
      }
      const valid2 = __classPrivateFieldGet(this, _Conf_validator, "f").call(this, data);
      if (valid2 || !__classPrivateFieldGet(this, _Conf_validator, "f").errors) {
        return;
      }
      const errors2 = __classPrivateFieldGet(this, _Conf_validator, "f").errors.map(({ instancePath, message = "" }) => `\`${instancePath.slice(1)}\` ${message}`);
      throw new Error("Config schema violation: " + errors2.join("; "));
    }
    _ensureDirectory() {
      fs2.mkdirSync(path2.dirname(this.path), { recursive: true });
    }
    _write(value) {
      let data = this._serialize(value);
      if (__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
        const initializationVector = crypto2.randomBytes(16);
        const password = crypto2.pbkdf2Sync(__classPrivateFieldGet(this, _Conf_encryptionKey, "f"), initializationVector.toString(), 1e4, 32, "sha512");
        const cipher = crypto2.createCipheriv(encryptionAlgorithm, password, initializationVector);
        data = Buffer.concat([initializationVector, Buffer.from(":"), cipher.update(Buffer.from(data)), cipher.final()]);
      }
      if (process.env.SNAP) {
        fs2.writeFileSync(this.path, data, { mode: __classPrivateFieldGet(this, _Conf_options, "f").configFileMode });
      } else {
        try {
          atomically.writeFileSync(this.path, data, { mode: __classPrivateFieldGet(this, _Conf_options, "f").configFileMode });
        } catch (error2) {
          if ((error2 === null || error2 === void 0 ? void 0 : error2.code) === "EXDEV") {
            fs2.writeFileSync(this.path, data, { mode: __classPrivateFieldGet(this, _Conf_options, "f").configFileMode });
            return;
          }
          throw error2;
        }
      }
    }
    _watch() {
      this._ensureDirectory();
      if (!fs2.existsSync(this.path)) {
        this._write(createPlainObject());
      }
      if (process.platform === "win32") {
        fs2.watch(this.path, { persistent: false }, debounceFn$1(() => {
          this.events.emit("change");
        }, { wait: 100 }));
      } else {
        fs2.watchFile(this.path, { persistent: false }, debounceFn$1(() => {
          this.events.emit("change");
        }, { wait: 5e3 }));
      }
    }
    _migrate(migrations, versionToMigrate, beforeEachMigration) {
      let previousMigratedVersion = this._get(MIGRATION_KEY, "0.0.0");
      const newerVersions = Object.keys(migrations).filter((candidateVersion) => this._shouldPerformMigration(candidateVersion, previousMigratedVersion, versionToMigrate));
      let storeBackup = { ...this.store };
      for (const version of newerVersions) {
        try {
          if (beforeEachMigration) {
            beforeEachMigration(this, {
              fromVersion: previousMigratedVersion,
              toVersion: version,
              finalVersion: versionToMigrate,
              versions: newerVersions
            });
          }
          const migration = migrations[version];
          migration(this);
          this._set(MIGRATION_KEY, version);
          previousMigratedVersion = version;
          storeBackup = { ...this.store };
        } catch (error2) {
          this.store = storeBackup;
          throw new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${error2}`);
        }
      }
      if (this._isVersionInRangeFormat(previousMigratedVersion) || !semver$12.eq(previousMigratedVersion, versionToMigrate)) {
        this._set(MIGRATION_KEY, versionToMigrate);
      }
    }
    _containsReservedKey(key) {
      if (typeof key === "object") {
        const firsKey = Object.keys(key)[0];
        if (firsKey === INTERNAL_KEY) {
          return true;
        }
      }
      if (typeof key !== "string") {
        return false;
      }
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        if (key.startsWith(`${INTERNAL_KEY}.`)) {
          return true;
        }
        return false;
      }
      return false;
    }
    _isVersionInRangeFormat(version) {
      return semver$12.clean(version) === null;
    }
    _shouldPerformMigration(candidateVersion, previousMigratedVersion, versionToMigrate) {
      if (this._isVersionInRangeFormat(candidateVersion)) {
        if (previousMigratedVersion !== "0.0.0" && semver$12.satisfies(previousMigratedVersion, candidateVersion)) {
          return false;
        }
        return semver$12.satisfies(versionToMigrate, candidateVersion);
      }
      if (semver$12.lte(candidateVersion, previousMigratedVersion)) {
        return false;
      }
      if (semver$12.gt(candidateVersion, versionToMigrate)) {
        return false;
      }
      return true;
    }
    _get(key, defaultValue) {
      return dotProp$1.get(this.store, key, defaultValue);
    }
    _set(key, value) {
      const { store: store2 } = this;
      dotProp$1.set(store2, key, value);
      this.store = store2;
    }
  }
  exports$1.default = Conf2;
  module.exports = Conf2;
  module.exports.default = Conf2;
})(source, source.exports);
var sourceExports = source.exports;
const path = require$$0__default;
const { app, ipcMain, ipcRenderer, shell } = require$$1$2;
const Conf = sourceExports;
let isInitialized = false;
const initDataListener = () => {
  if (!ipcMain || !app) {
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  }
  const appData = {
    defaultCwd: app.getPath("userData"),
    appVersion: app.getVersion()
  };
  if (isInitialized) {
    return appData;
  }
  ipcMain.on("electron-store-get-data", (event) => {
    event.returnValue = appData;
  });
  isInitialized = true;
  return appData;
};
class ElectronStore extends Conf {
  constructor(options) {
    let defaultCwd;
    let appVersion;
    if (ipcRenderer) {
      const appData = ipcRenderer.sendSync("electron-store-get-data");
      if (!appData) {
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      }
      ({ defaultCwd, appVersion } = appData);
    } else if (ipcMain && app) {
      ({ defaultCwd, appVersion } = initDataListener());
    }
    options = {
      name: "config",
      ...options
    };
    if (!options.projectVersion) {
      options.projectVersion = appVersion;
    }
    if (options.cwd) {
      options.cwd = path.isAbsolute(options.cwd) ? options.cwd : path.join(defaultCwd, options.cwd);
    } else {
      options.cwd = defaultCwd;
    }
    options.configName = options.name;
    delete options.name;
    super(options);
  }
  static initRenderer() {
    initDataListener();
  }
  async openInEditor() {
    const error2 = await shell.openPath(this.path);
    if (error2) {
      throw new Error(error2);
    }
  }
}
var electronStore = ElectronStore;
const Store = /* @__PURE__ */ getDefaultExportFromCjs(electronStore);
const ENCRYPTION_KEY = "iTransporter-secure-key-2024";
const store = new Store({
  name: "iTransporter-data",
  defaults: {
    credentials: [],
    uploadHistory: [],
    webhookSettings: {
      url: "",
      enabled: false
    },
    retryAttempts: 3
  }
});
function encrypt(text) {
  const key = crypto.scryptSync(ENCRYPTION_KEY, "salt", 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}
function decrypt(encryptedText) {
  try {
    const [ivHex, encrypted] = encryptedText.split(":");
    const key = crypto.scryptSync(ENCRYPTION_KEY, "salt", 32);
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch {
    return "";
  }
}
function saveCredential(appleId, password) {
  const credentials = store.get("credentials", []);
  const existingIndex = credentials.findIndex((c) => c.appleId === appleId);
  const encryptedPassword = encrypt(password);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  if (existingIndex >= 0) {
    credentials[existingIndex].password = encryptedPassword;
    credentials[existingIndex].lastUsed = now;
    credentials[existingIndex].uploadCount += 1;
  } else {
    credentials.push({
      appleId,
      password: encryptedPassword,
      lastUsed: now,
      uploadCount: 1
    });
  }
  store.set("credentials", credentials);
}
function getCredentialsList() {
  const credentials = store.get("credentials", []);
  return credentials.map((c) => ({
    appleId: c.appleId,
    lastUsed: c.lastUsed,
    uploadCount: c.uploadCount
  }));
}
function getCredential(appleId) {
  const credentials = store.get("credentials", []);
  const credential = credentials.find((c) => c.appleId === appleId);
  if (credential) {
    return {
      ...credential,
      password: decrypt(credential.password)
    };
  }
  return null;
}
function deleteCredential(appleId) {
  const credentials = store.get("credentials", []);
  const newCredentials = credentials.filter((c) => c.appleId !== appleId);
  if (newCredentials.length !== credentials.length) {
    store.set("credentials", newCredentials);
    return true;
  }
  return false;
}
function addUploadHistory(record) {
  const history = store.get("uploadHistory", []);
  const newRecord = {
    ...record,
    id: crypto.randomUUID()
  };
  history.unshift(newRecord);
  if (history.length > 100) {
    history.pop();
  }
  store.set("uploadHistory", history);
  return newRecord;
}
function getUploadHistory() {
  return store.get("uploadHistory", []);
}
function getUploadHistoryRecord(id2) {
  const history = store.get("uploadHistory", []);
  return history.find((h) => h.id === id2) || null;
}
function clearUploadHistory() {
  store.set("uploadHistory", []);
}
function deleteUploadHistory(id2) {
  const history = store.get("uploadHistory", []);
  const newHistory = history.filter((h) => h.id !== id2);
  if (newHistory.length !== history.length) {
    store.set("uploadHistory", newHistory);
    return true;
  }
  return false;
}
function getWebhookSettings() {
  return store.get("webhookSettings", { url: "", enabled: false });
}
function setWebhookSettings(settings) {
  store.set("webhookSettings", settings);
}
function getRetryAttempts() {
  return store.get("retryAttempts", 3);
}
function setRetryAttempts(attempts) {
  store.set("retryAttempts", Math.max(1, Math.min(attempts, 10)));
}
function formatDuration$1(ms) {
  const seconds = Math.floor(ms / 1e3);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (remainingMinutes > 0) parts.push(`${remainingMinutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);
  return parts.join(" ");
}
function buildMessageText(payload) {
  const statusEmoji = {
    success: "✅",
    failed: "❌",
    cancelled: "⚠️"
  };
  const statusText = {
    success: "上傳成功",
    failed: "上傳失敗",
    cancelled: "上傳已取消"
  };
  let message = `${statusEmoji[payload.status]} ${statusText[payload.status]}
`;
  if (payload.appInfo) {
    message += `📱 應用程式：${payload.appInfo.appName}
`;
    message += `🔖 Bundle ID：${payload.appInfo.bundleId}
`;
    message += `📌 版本：${payload.appInfo.version} (${payload.appInfo.build})
`;
  }
  message += `📦 文件：${payload.fileName}
`;
  message += `👤 Apple ID：${payload.appleId}
`;
  if (payload.ipRegion) {
    message += `🌍 區域：${payload.ipRegion}
`;
  }
  if (payload.status === "success" && payload.duration) {
    message += `⏱️ 耗時：${payload.duration}
`;
  }
  if (payload.errorMessage) {
    message += `❗ 錯誤：${payload.errorMessage}
`;
  }
  message += `🕐 時間：${new Date(payload.endTime).toLocaleString()}`;
  return message;
}
async function sendWebhookNotification(payload) {
  const settings = getWebhookSettings();
  if (!settings.enabled || !settings.url) {
    return { success: false, message: "Webhook not enabled or URL not set" };
  }
  if (payload.status === "success" && payload.startTime && payload.endTime) {
    const startMs = new Date(payload.startTime).getTime();
    const endMs = new Date(payload.endTime).getTime();
    payload.duration = formatDuration$1(endMs - startMs);
  }
  const messageText = buildMessageText(payload);
  const requestBody = {
    msg_type: "text",
    content: {
      text: messageText
    }
  };
  try {
    const response = await fetch(settings.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    if (data.code === 0 || data.StatusCode === 0) {
      return { success: true, code: 0, message: data.msg || "success" };
    } else {
      return { success: false, code: data.code, message: data.msg || "Unknown error" };
    }
  } catch (error2) {
    const errorMessage = error2 instanceof Error ? error2.message : "Unknown error";
    return { success: false, message: errorMessage };
  }
}
async function testWebhook(url) {
  const requestBody = {
    msg_type: "text",
    content: {
      text: "🔔 iTransporter Webhook 測試\n\n您的 Webhook 配置正确！上傳完成時您將收到通知。"
    }
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    if (data.code === 0 || data.StatusCode === 0) {
      return { success: true, code: 0, message: "Test successful" };
    } else {
      return { success: false, code: data.code, message: data.msg || "Bad Request" };
    }
  } catch (error2) {
    const errorMessage = error2 instanceof Error ? error2.message : "Failed to connect";
    return { success: false, message: errorMessage };
  }
}
async function getIpInfo() {
  return new Promise((resolve2) => {
    const request = net.request({
      method: "GET",
      url: "http://ip-api.com/json"
    });
    let responseData = "";
    request.on("response", (response) => {
      response.on("data", (chunk) => {
        responseData += chunk.toString();
      });
      response.on("end", () => {
        try {
          const data = JSON.parse(responseData);
          if (data.status === "success") {
            resolve2(data);
          } else {
            resolve2(null);
          }
        } catch {
          resolve2(null);
        }
      });
      response.on("error", () => {
        resolve2(null);
      });
    });
    request.on("error", () => {
      resolve2(null);
    });
    setTimeout(() => {
      request.abort();
      resolve2(null);
    }, 1e4);
    request.end();
  });
}
var plist = {};
var parse$2 = {};
var lib$1 = {};
var dom$2 = {};
var conventions$2 = {};
function find$1(list, predicate, ac) {
  if (ac === void 0) {
    ac = Array.prototype;
  }
  if (list && typeof ac.find === "function") {
    return ac.find.call(list, predicate);
  }
  for (var i = 0; i < list.length; i++) {
    if (Object.prototype.hasOwnProperty.call(list, i)) {
      var item = list[i];
      if (predicate.call(void 0, item, i, list)) {
        return item;
      }
    }
  }
}
function freeze(object, oc) {
  if (oc === void 0) {
    oc = Object;
  }
  return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
}
function assign(target, source2) {
  if (target === null || typeof target !== "object") {
    throw new TypeError("target is not an object");
  }
  for (var key in source2) {
    if (Object.prototype.hasOwnProperty.call(source2, key)) {
      target[key] = source2[key];
    }
  }
  return target;
}
var MIME_TYPE = freeze({
  /**
   * `text/html`, the only mime type that triggers treating an XML document as HTML.
   *
   * @see DOMParser.SupportedType.isHTML
   * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/HTML Wikipedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
   * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
   */
  HTML: "text/html",
  /**
   * Helper method to check a mime type if it indicates an HTML document
   *
   * @param {string} [value]
   * @returns {boolean}
   *
   * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/HTML Wikipedia
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
   * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
  isHTML: function(value) {
    return value === MIME_TYPE.HTML;
  },
  /**
   * `application/xml`, the standard mime type for XML documents.
   *
   * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
   * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
   * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
   */
  XML_APPLICATION: "application/xml",
  /**
   * `text/html`, an alias for `application/xml`.
   *
   * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
   * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
   * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
   */
  XML_TEXT: "text/xml",
  /**
   * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
   * but is parsed as an XML document.
   *
   * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
   * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
   */
  XML_XHTML_APPLICATION: "application/xhtml+xml",
  /**
   * `image/svg+xml`,
   *
   * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
   * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
   * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
   */
  XML_SVG_IMAGE: "image/svg+xml"
});
var NAMESPACE$3 = freeze({
  /**
   * The XHTML namespace.
   *
   * @see http://www.w3.org/1999/xhtml
   */
  HTML: "http://www.w3.org/1999/xhtml",
  /**
   * Checks if `uri` equals `NAMESPACE.HTML`.
   *
   * @param {string} [uri]
   *
   * @see NAMESPACE.HTML
   */
  isHTML: function(uri2) {
    return uri2 === NAMESPACE$3.HTML;
  },
  /**
   * The SVG namespace.
   *
   * @see http://www.w3.org/2000/svg
   */
  SVG: "http://www.w3.org/2000/svg",
  /**
   * The `xml:` namespace.
   *
   * @see http://www.w3.org/XML/1998/namespace
   */
  XML: "http://www.w3.org/XML/1998/namespace",
  /**
   * The `xmlns:` namespace
   *
   * @see https://www.w3.org/2000/xmlns/
   */
  XMLNS: "http://www.w3.org/2000/xmlns/"
});
conventions$2.assign = assign;
conventions$2.find = find$1;
conventions$2.freeze = freeze;
conventions$2.MIME_TYPE = MIME_TYPE;
conventions$2.NAMESPACE = NAMESPACE$3;
var conventions$1 = conventions$2;
var find = conventions$1.find;
var NAMESPACE$2 = conventions$1.NAMESPACE;
function notEmptyString(input) {
  return input !== "";
}
function splitOnASCIIWhitespace(input) {
  return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
}
function orderedSetReducer(current, element) {
  if (!current.hasOwnProperty(element)) {
    current[element] = true;
  }
  return current;
}
function toOrderedSet(input) {
  if (!input) return [];
  var list = splitOnASCIIWhitespace(input);
  return Object.keys(list.reduce(orderedSetReducer, {}));
}
function arrayIncludes(list) {
  return function(element) {
    return list && list.indexOf(element) !== -1;
  };
}
function copy(src, dest) {
  for (var p in src) {
    if (Object.prototype.hasOwnProperty.call(src, p)) {
      dest[p] = src[p];
    }
  }
}
function _extends(Class, Super) {
  var pt = Class.prototype;
  if (!(pt instanceof Super)) {
    let t2 = function() {
    };
    t2.prototype = Super.prototype;
    t2 = new t2();
    copy(pt, t2);
    Class.prototype = pt = t2;
  }
  if (pt.constructor != Class) {
    if (typeof Class != "function") {
      console.error("unknown Class:" + Class);
    }
    pt.constructor = Class;
  }
}
var NodeType$1 = {};
var ELEMENT_NODE = NodeType$1.ELEMENT_NODE = 1;
var ATTRIBUTE_NODE = NodeType$1.ATTRIBUTE_NODE = 2;
var TEXT_NODE$1 = NodeType$1.TEXT_NODE = 3;
var CDATA_SECTION_NODE = NodeType$1.CDATA_SECTION_NODE = 4;
var ENTITY_REFERENCE_NODE = NodeType$1.ENTITY_REFERENCE_NODE = 5;
var ENTITY_NODE = NodeType$1.ENTITY_NODE = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType$1.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE$1 = NodeType$1.COMMENT_NODE = 8;
var DOCUMENT_NODE = NodeType$1.DOCUMENT_NODE = 9;
var DOCUMENT_TYPE_NODE = NodeType$1.DOCUMENT_TYPE_NODE = 10;
var DOCUMENT_FRAGMENT_NODE = NodeType$1.DOCUMENT_FRAGMENT_NODE = 11;
var NOTATION_NODE = NodeType$1.NOTATION_NODE = 12;
var ExceptionCode = {};
var ExceptionMessage = {};
ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
function DOMException(code2, message) {
  if (message instanceof Error) {
    var error2 = message;
  } else {
    error2 = this;
    Error.call(this, ExceptionMessage[code2]);
    this.message = ExceptionMessage[code2];
    if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
  }
  error2.code = code2;
  if (message) this.message = this.message + ": " + message;
  return error2;
}
DOMException.prototype = Error.prototype;
copy(ExceptionCode, DOMException);
function NodeList() {
}
NodeList.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
  length: 0,
  /**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
   */
  item: function(index) {
    return index >= 0 && index < this.length ? this[index] : null;
  },
  toString: function(isHTML, nodeFilter) {
    for (var buf = [], i = 0; i < this.length; i++) {
      serializeToString(this[i], buf, isHTML, nodeFilter);
    }
    return buf.join("");
  },
  /**
   * @private
   * @param {function (Node):boolean} predicate
   * @returns {Node[]}
   */
  filter: function(predicate) {
    return Array.prototype.filter.call(this, predicate);
  },
  /**
   * @private
   * @param {Node} item
   * @returns {number}
   */
  indexOf: function(item) {
    return Array.prototype.indexOf.call(this, item);
  }
};
function LiveNodeList(node, refresh) {
  this._node = node;
  this._refresh = refresh;
  _updateLiveList(this);
}
function _updateLiveList(list) {
  var inc2 = list._node._inc || list._node.ownerDocument._inc;
  if (list._inc !== inc2) {
    var ls = list._refresh(list._node);
    __set__(list, "length", ls.length);
    if (!list.$$length || ls.length < list.$$length) {
      for (var i = ls.length; i in list; i++) {
        if (Object.prototype.hasOwnProperty.call(list, i)) {
          delete list[i];
        }
      }
    }
    copy(ls, list);
    list._inc = inc2;
  }
}
LiveNodeList.prototype.item = function(i) {
  _updateLiveList(this);
  return this[i] || null;
};
_extends(LiveNodeList, NodeList);
function NamedNodeMap() {
}
function _findNodeIndex(list, node) {
  var i = list.length;
  while (i--) {
    if (list[i] === node) {
      return i;
    }
  }
}
function _addNamedNode(el, list, newAttr, oldAttr) {
  if (oldAttr) {
    list[_findNodeIndex(list, oldAttr)] = newAttr;
  } else {
    list[list.length++] = newAttr;
  }
  if (el) {
    newAttr.ownerElement = el;
    var doc = el.ownerDocument;
    if (doc) {
      oldAttr && _onRemoveAttribute(doc, el, oldAttr);
      _onAddAttribute(doc, el, newAttr);
    }
  }
}
function _removeNamedNode(el, list, attr) {
  var i = _findNodeIndex(list, attr);
  if (i >= 0) {
    var lastIndex = list.length - 1;
    while (i < lastIndex) {
      list[i] = list[++i];
    }
    list.length = lastIndex;
    if (el) {
      var doc = el.ownerDocument;
      if (doc) {
        _onRemoveAttribute(doc, el, attr);
        attr.ownerElement = null;
      }
    }
  } else {
    throw new DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
  }
}
NamedNodeMap.prototype = {
  length: 0,
  item: NodeList.prototype.item,
  getNamedItem: function(key) {
    var i = this.length;
    while (i--) {
      var attr = this[i];
      if (attr.nodeName == key) {
        return attr;
      }
    }
  },
  setNamedItem: function(attr) {
    var el = attr.ownerElement;
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }
    var oldAttr = this.getNamedItem(attr.nodeName);
    _addNamedNode(this._ownerElement, this, attr, oldAttr);
    return oldAttr;
  },
  /* returns Node */
  setNamedItemNS: function(attr) {
    var el = attr.ownerElement, oldAttr;
    if (el && el != this._ownerElement) {
      throw new DOMException(INUSE_ATTRIBUTE_ERR);
    }
    oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
    _addNamedNode(this._ownerElement, this, attr, oldAttr);
    return oldAttr;
  },
  /* returns Node */
  removeNamedItem: function(key) {
    var attr = this.getNamedItem(key);
    _removeNamedNode(this._ownerElement, this, attr);
    return attr;
  },
  // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
  //for level2
  removeNamedItemNS: function(namespaceURI, localName) {
    var attr = this.getNamedItemNS(namespaceURI, localName);
    _removeNamedNode(this._ownerElement, this, attr);
    return attr;
  },
  getNamedItemNS: function(namespaceURI, localName) {
    var i = this.length;
    while (i--) {
      var node = this[i];
      if (node.localName == localName && node.namespaceURI == namespaceURI) {
        return node;
      }
    }
    return null;
  }
};
function DOMImplementation$1() {
}
DOMImplementation$1.prototype = {
  /**
   * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
   * The different implementations fairly diverged in what kind of features were reported.
   * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
   *
   * @deprecated It is deprecated and modern browsers return true in all cases.
   *
   * @param {string} feature
   * @param {string} [version]
   * @returns {boolean} always true
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
   * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
   */
  hasFeature: function(feature, version) {
    return true;
  },
  /**
   * Creates an XML Document object of the specified type with its document element.
   *
   * __It behaves slightly different from the description in the living standard__:
   * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
   * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
   * - this implementation is not validating names or qualified names
   *   (when parsing XML strings, the SAX parser takes care of that)
   *
   * @param {string|null} namespaceURI
   * @param {string} qualifiedName
   * @param {DocumentType=null} doctype
   * @returns {Document}
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
   *
   * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
   * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
   * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
   */
  createDocument: function(namespaceURI, qualifiedName, doctype) {
    var doc = new Document();
    doc.implementation = this;
    doc.childNodes = new NodeList();
    doc.doctype = doctype || null;
    if (doctype) {
      doc.appendChild(doctype);
    }
    if (qualifiedName) {
      var root = doc.createElementNS(namespaceURI, qualifiedName);
      doc.appendChild(root);
    }
    return doc;
  },
  /**
   * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
   *
   * __This behavior is slightly different from the in the specs__:
   * - this implementation is not validating names or qualified names
   *   (when parsing XML strings, the SAX parser takes care of that)
   *
   * @param {string} qualifiedName
   * @param {string} [publicId]
   * @param {string} [systemId]
   * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
   * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
   * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
   * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
   *
   * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
   * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
   * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
   */
  createDocumentType: function(qualifiedName, publicId, systemId) {
    var node = new DocumentType();
    node.name = qualifiedName;
    node.nodeName = qualifiedName;
    node.publicId = publicId || "";
    node.systemId = systemId || "";
    return node;
  }
};
function Node() {
}
Node.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore: function(newChild, refChild) {
    return _insertBefore(this, newChild, refChild);
  },
  replaceChild: function(newChild, oldChild) {
    _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
    if (oldChild) {
      this.removeChild(oldChild);
    }
  },
  removeChild: function(oldChild) {
    return _removeChild(this, oldChild);
  },
  appendChild: function(newChild) {
    return this.insertBefore(newChild, null);
  },
  hasChildNodes: function() {
    return this.firstChild != null;
  },
  cloneNode: function(deep) {
    return cloneNode(this.ownerDocument || this, this, deep);
  },
  // Modified in DOM Level 2:
  normalize: function() {
    var child = this.firstChild;
    while (child) {
      var next = child.nextSibling;
      if (next && next.nodeType == TEXT_NODE$1 && child.nodeType == TEXT_NODE$1) {
        this.removeChild(next);
        child.appendData(next.data);
      } else {
        child.normalize();
        child = next;
      }
    }
  },
  // Introduced in DOM Level 2:
  isSupported: function(feature, version) {
    return this.ownerDocument.implementation.hasFeature(feature, version);
  },
  // Introduced in DOM Level 2:
  hasAttributes: function() {
    return this.attributes.length > 0;
  },
  /**
   * Look up the prefix associated to the given namespace URI, starting from this node.
   * **The default namespace declarations are ignored by this method.**
   * See Namespace Prefix Lookup for details on the algorithm used by this method.
   *
   * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
   *
   * @param {string | null} namespaceURI
   * @returns {string | null}
   * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
   * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
   * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
   * @see https://github.com/xmldom/xmldom/issues/322
   */
  lookupPrefix: function(namespaceURI) {
    var el = this;
    while (el) {
      var map = el._nsMap;
      if (map) {
        for (var n in map) {
          if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) {
            return n;
          }
        }
      }
      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI: function(prefix) {
    var el = this;
    while (el) {
      var map = el._nsMap;
      if (map) {
        if (Object.prototype.hasOwnProperty.call(map, prefix)) {
          return map[prefix];
        }
      }
      el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace: function(namespaceURI) {
    var prefix = this.lookupPrefix(namespaceURI);
    return prefix == null;
  }
};
function _xmlEncoder(c) {
  return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
}
copy(NodeType$1, Node);
copy(NodeType$1, Node.prototype);
function _visitNode(node, callback) {
  if (callback(node)) {
    return true;
  }
  if (node = node.firstChild) {
    do {
      if (_visitNode(node, callback)) {
        return true;
      }
    } while (node = node.nextSibling);
  }
}
function Document() {
  this.ownerDocument = this;
}
function _onAddAttribute(doc, el, newAttr) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;
  if (ns === NAMESPACE$2.XMLNS) {
    el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
  }
}
function _onRemoveAttribute(doc, el, newAttr, remove) {
  doc && doc._inc++;
  var ns = newAttr.namespaceURI;
  if (ns === NAMESPACE$2.XMLNS) {
    delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
  }
}
function _onUpdateChild(doc, el, newChild) {
  if (doc && doc._inc) {
    doc._inc++;
    var cs = el.childNodes;
    if (newChild) {
      cs[cs.length++] = newChild;
    } else {
      var child = el.firstChild;
      var i = 0;
      while (child) {
        cs[i++] = child;
        child = child.nextSibling;
      }
      cs.length = i;
      delete cs[cs.length];
    }
  }
}
function _removeChild(parentNode, child) {
  var previous = child.previousSibling;
  var next = child.nextSibling;
  if (previous) {
    previous.nextSibling = next;
  } else {
    parentNode.firstChild = next;
  }
  if (next) {
    next.previousSibling = previous;
  } else {
    parentNode.lastChild = previous;
  }
  child.parentNode = null;
  child.previousSibling = null;
  child.nextSibling = null;
  _onUpdateChild(parentNode.ownerDocument, parentNode);
  return child;
}
function hasValidParentNodeType(node) {
  return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
}
function hasInsertableNodeType(node) {
  return node && (isElementNode(node) || isTextNode(node) || isDocTypeNode(node) || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE);
}
function isDocTypeNode(node) {
  return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
}
function isElementNode(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}
function isTextNode(node) {
  return node && node.nodeType === Node.TEXT_NODE;
}
function isElementInsertionPossible(doc, child) {
  var parentChildNodes = doc.childNodes || [];
  if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
    return false;
  }
  var docTypeNode = find(parentChildNodes, isDocTypeNode);
  return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}
function isElementReplacementPossible(doc, child) {
  var parentChildNodes = doc.childNodes || [];
  function hasElementChildThatIsNotChild(node) {
    return isElementNode(node) && node !== child;
  }
  if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
    return false;
  }
  var docTypeNode = find(parentChildNodes, isDocTypeNode);
  return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}
function assertPreInsertionValidity1to5(parent, node, child) {
  if (!hasValidParentNodeType(parent)) {
    throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
  }
  if (child && child.parentNode !== parent) {
    throw new DOMException(NOT_FOUND_ERR, "child not in parent");
  }
  if (
    // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
    !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
    // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
    // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
    // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
    isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE
  ) {
    throw new DOMException(
      HIERARCHY_REQUEST_ERR,
      "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
    );
  }
}
function assertPreInsertionValidityInDocument(parent, node, child) {
  var parentChildNodes = parent.childNodes || [];
  var nodeChildNodes = node.childNodes || [];
  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    var nodeChildElements = nodeChildNodes.filter(isElementNode);
    if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
    }
    if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
  }
  if (isElementNode(node)) {
    if (!isElementInsertionPossible(parent, child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    }
  }
  if (isDocTypeNode(node)) {
    if (find(parentChildNodes, isDocTypeNode)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
    }
    var parentElementChild = find(parentChildNodes, isElementNode);
    if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
    if (!child && parentElementChild) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
    }
  }
}
function assertPreReplacementValidityInDocument(parent, node, child) {
  var parentChildNodes = parent.childNodes || [];
  var nodeChildNodes = node.childNodes || [];
  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    var nodeChildElements = nodeChildNodes.filter(isElementNode);
    if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
    }
    if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
    }
  }
  if (isElementNode(node)) {
    if (!isElementReplacementPossible(parent, child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
    }
  }
  if (isDocTypeNode(node)) {
    let hasDoctypeChildThatIsNotChild = function(node2) {
      return isDocTypeNode(node2) && node2 !== child;
    };
    if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
    }
    var parentElementChild = find(parentChildNodes, isElementNode);
    if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
      throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
    }
  }
}
function _insertBefore(parent, node, child, _inDocumentAssertion) {
  assertPreInsertionValidity1to5(parent, node, child);
  if (parent.nodeType === Node.DOCUMENT_NODE) {
    (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
  }
  var cp = node.parentNode;
  if (cp) {
    cp.removeChild(node);
  }
  if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
    var newFirst = node.firstChild;
    if (newFirst == null) {
      return node;
    }
    var newLast = node.lastChild;
  } else {
    newFirst = newLast = node;
  }
  var pre = child ? child.previousSibling : parent.lastChild;
  newFirst.previousSibling = pre;
  newLast.nextSibling = child;
  if (pre) {
    pre.nextSibling = newFirst;
  } else {
    parent.firstChild = newFirst;
  }
  if (child == null) {
    parent.lastChild = newLast;
  } else {
    child.previousSibling = newLast;
  }
  do {
    newFirst.parentNode = parent;
    var targetDoc = parent.ownerDocument || parent;
    _updateOwnerDocument(newFirst, targetDoc);
  } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
  _onUpdateChild(parent.ownerDocument || parent, parent);
  if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
    node.firstChild = node.lastChild = null;
  }
  return node;
}
function _updateOwnerDocument(node, newOwnerDocument) {
  if (node.ownerDocument === newOwnerDocument) {
    return;
  }
  node.ownerDocument = newOwnerDocument;
  if (node.nodeType === ELEMENT_NODE && node.attributes) {
    for (var i = 0; i < node.attributes.length; i++) {
      var attr = node.attributes.item(i);
      if (attr) {
        attr.ownerDocument = newOwnerDocument;
      }
    }
  }
  var child = node.firstChild;
  while (child) {
    _updateOwnerDocument(child, newOwnerDocument);
    child = child.nextSibling;
  }
}
function _appendSingleChild(parentNode, newChild) {
  if (newChild.parentNode) {
    newChild.parentNode.removeChild(newChild);
  }
  newChild.parentNode = parentNode;
  newChild.previousSibling = parentNode.lastChild;
  newChild.nextSibling = null;
  if (newChild.previousSibling) {
    newChild.previousSibling.nextSibling = newChild;
  } else {
    parentNode.firstChild = newChild;
  }
  parentNode.lastChild = newChild;
  _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
  var targetDoc = parentNode.ownerDocument || parentNode;
  _updateOwnerDocument(newChild, targetDoc);
  return newChild;
}
Document.prototype = {
  //implementation : null,
  nodeName: "#document",
  nodeType: DOCUMENT_NODE,
  /**
   * The DocumentType node of the document.
   *
   * @readonly
   * @type DocumentType
   */
  doctype: null,
  documentElement: null,
  _inc: 1,
  insertBefore: function(newChild, refChild) {
    if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
      var child = newChild.firstChild;
      while (child) {
        var next = child.nextSibling;
        this.insertBefore(child, refChild);
        child = next;
      }
      return newChild;
    }
    _insertBefore(this, newChild, refChild);
    _updateOwnerDocument(newChild, this);
    if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
      this.documentElement = newChild;
    }
    return newChild;
  },
  removeChild: function(oldChild) {
    if (this.documentElement == oldChild) {
      this.documentElement = null;
    }
    return _removeChild(this, oldChild);
  },
  replaceChild: function(newChild, oldChild) {
    _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
    _updateOwnerDocument(newChild, this);
    if (oldChild) {
      this.removeChild(oldChild);
    }
    if (isElementNode(newChild)) {
      this.documentElement = newChild;
    }
  },
  // Introduced in DOM Level 2:
  importNode: function(importedNode, deep) {
    return importNode(this, importedNode, deep);
  },
  // Introduced in DOM Level 2:
  getElementById: function(id2) {
    var rtv = null;
    _visitNode(this.documentElement, function(node) {
      if (node.nodeType == ELEMENT_NODE) {
        if (node.getAttribute("id") == id2) {
          rtv = node;
          return true;
        }
      }
    });
    return rtv;
  },
  /**
   * The `getElementsByClassName` method of `Document` interface returns an array-like object
   * of all child elements which have **all** of the given class name(s).
   *
   * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
   *
   *
   * Warning: This is a live LiveNodeList.
   * Changes in the DOM will reflect in the array as the changes occur.
   * If an element selected by this array no longer qualifies for the selector,
   * it will automatically be removed. Be aware of this for iteration purposes.
   *
   * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
   * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
   */
  getElementsByClassName: function(classNames) {
    var classNamesSet = toOrderedSet(classNames);
    return new LiveNodeList(this, function(base) {
      var ls = [];
      if (classNamesSet.length > 0) {
        _visitNode(base.documentElement, function(node) {
          if (node !== base && node.nodeType === ELEMENT_NODE) {
            var nodeClassNames = node.getAttribute("class");
            if (nodeClassNames) {
              var matches = classNames === nodeClassNames;
              if (!matches) {
                var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
              }
              if (matches) {
                ls.push(node);
              }
            }
          }
        });
      }
      return ls;
    });
  },
  //document factory method:
  createElement: function(tagName) {
    var node = new Element();
    node.ownerDocument = this;
    node.nodeName = tagName;
    node.tagName = tagName;
    node.localName = tagName;
    node.childNodes = new NodeList();
    var attrs = node.attributes = new NamedNodeMap();
    attrs._ownerElement = node;
    return node;
  },
  createDocumentFragment: function() {
    var node = new DocumentFragment();
    node.ownerDocument = this;
    node.childNodes = new NodeList();
    return node;
  },
  createTextNode: function(data) {
    var node = new Text();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createComment: function(data) {
    var node = new Comment();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createCDATASection: function(data) {
    var node = new CDATASection();
    node.ownerDocument = this;
    node.appendData(data);
    return node;
  },
  createProcessingInstruction: function(target, data) {
    var node = new ProcessingInstruction();
    node.ownerDocument = this;
    node.tagName = node.nodeName = node.target = target;
    node.nodeValue = node.data = data;
    return node;
  },
  createAttribute: function(name) {
    var node = new Attr();
    node.ownerDocument = this;
    node.name = name;
    node.nodeName = name;
    node.localName = name;
    node.specified = true;
    return node;
  },
  createEntityReference: function(name) {
    var node = new EntityReference();
    node.ownerDocument = this;
    node.nodeName = name;
    return node;
  },
  // Introduced in DOM Level 2:
  createElementNS: function(namespaceURI, qualifiedName) {
    var node = new Element();
    var pl = qualifiedName.split(":");
    var attrs = node.attributes = new NamedNodeMap();
    node.childNodes = new NodeList();
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.tagName = qualifiedName;
    node.namespaceURI = namespaceURI;
    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      node.localName = qualifiedName;
    }
    attrs._ownerElement = node;
    return node;
  },
  // Introduced in DOM Level 2:
  createAttributeNS: function(namespaceURI, qualifiedName) {
    var node = new Attr();
    var pl = qualifiedName.split(":");
    node.ownerDocument = this;
    node.nodeName = qualifiedName;
    node.name = qualifiedName;
    node.namespaceURI = namespaceURI;
    node.specified = true;
    if (pl.length == 2) {
      node.prefix = pl[0];
      node.localName = pl[1];
    } else {
      node.localName = qualifiedName;
    }
    return node;
  }
};
_extends(Document, Node);
function Element() {
  this._nsMap = {};
}
Element.prototype = {
  nodeType: ELEMENT_NODE,
  hasAttribute: function(name) {
    return this.getAttributeNode(name) != null;
  },
  getAttribute: function(name) {
    var attr = this.getAttributeNode(name);
    return attr && attr.value || "";
  },
  getAttributeNode: function(name) {
    return this.attributes.getNamedItem(name);
  },
  setAttribute: function(name, value) {
    var attr = this.ownerDocument.createAttribute(name);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  removeAttribute: function(name) {
    var attr = this.getAttributeNode(name);
    attr && this.removeAttributeNode(attr);
  },
  //four real opeartion method
  appendChild: function(newChild) {
    if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return this.insertBefore(newChild, null);
    } else {
      return _appendSingleChild(this, newChild);
    }
  },
  setAttributeNode: function(newAttr) {
    return this.attributes.setNamedItem(newAttr);
  },
  setAttributeNodeNS: function(newAttr) {
    return this.attributes.setNamedItemNS(newAttr);
  },
  removeAttributeNode: function(oldAttr) {
    return this.attributes.removeNamedItem(oldAttr.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function(namespaceURI, localName) {
    var old = this.getAttributeNodeNS(namespaceURI, localName);
    old && this.removeAttributeNode(old);
  },
  hasAttributeNS: function(namespaceURI, localName) {
    return this.getAttributeNodeNS(namespaceURI, localName) != null;
  },
  getAttributeNS: function(namespaceURI, localName) {
    var attr = this.getAttributeNodeNS(namespaceURI, localName);
    return attr && attr.value || "";
  },
  setAttributeNS: function(namespaceURI, qualifiedName, value) {
    var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
    attr.value = attr.nodeValue = "" + value;
    this.setAttributeNode(attr);
  },
  getAttributeNodeNS: function(namespaceURI, localName) {
    return this.attributes.getNamedItemNS(namespaceURI, localName);
  },
  getElementsByTagName: function(tagName) {
    return new LiveNodeList(this, function(base) {
      var ls = [];
      _visitNode(base, function(node) {
        if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
          ls.push(node);
        }
      });
      return ls;
    });
  },
  getElementsByTagNameNS: function(namespaceURI, localName) {
    return new LiveNodeList(this, function(base) {
      var ls = [];
      _visitNode(base, function(node) {
        if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
          ls.push(node);
        }
      });
      return ls;
    });
  }
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
_extends(Element, Node);
function Attr() {
}
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr, Node);
function CharacterData() {
}
CharacterData.prototype = {
  data: "",
  substringData: function(offset, count) {
    return this.data.substring(offset, offset + count);
  },
  appendData: function(text) {
    text = this.data + text;
    this.nodeValue = this.data = text;
    this.length = text.length;
  },
  insertData: function(offset, text) {
    this.replaceData(offset, 0, text);
  },
  appendChild: function(newChild) {
    throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
  },
  deleteData: function(offset, count) {
    this.replaceData(offset, count, "");
  },
  replaceData: function(offset, count, text) {
    var start = this.data.substring(0, offset);
    var end = this.data.substring(offset + count);
    text = start + text + end;
    this.nodeValue = this.data = text;
    this.length = text.length;
  }
};
_extends(CharacterData, Node);
function Text() {
}
Text.prototype = {
  nodeName: "#text",
  nodeType: TEXT_NODE$1,
  splitText: function(offset) {
    var text = this.data;
    var newText = text.substring(offset);
    text = text.substring(0, offset);
    this.data = this.nodeValue = text;
    this.length = text.length;
    var newNode = this.ownerDocument.createTextNode(newText);
    if (this.parentNode) {
      this.parentNode.insertBefore(newNode, this.nextSibling);
    }
    return newNode;
  }
};
_extends(Text, CharacterData);
function Comment() {
}
Comment.prototype = {
  nodeName: "#comment",
  nodeType: COMMENT_NODE$1
};
_extends(Comment, CharacterData);
function CDATASection() {
}
CDATASection.prototype = {
  nodeName: "#cdata-section",
  nodeType: CDATA_SECTION_NODE
};
_extends(CDATASection, CharacterData);
function DocumentType() {
}
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType, Node);
function Notation() {
}
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation, Node);
function Entity() {
}
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity, Node);
function EntityReference() {
}
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference, Node);
function DocumentFragment() {
}
DocumentFragment.prototype.nodeName = "#document-fragment";
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment, Node);
function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction, Node);
function XMLSerializer() {
}
XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
  return nodeSerializeToString.call(node, isHtml, nodeFilter);
};
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml, nodeFilter) {
  var buf = [];
  var refNode = this.nodeType == 9 && this.documentElement || this;
  var prefix = refNode.prefix;
  var uri2 = refNode.namespaceURI;
  if (uri2 && prefix == null) {
    var prefix = refNode.lookupPrefix(uri2);
    if (prefix == null) {
      var visibleNamespaces = [
        { namespace: uri2, prefix: null }
        //{namespace:uri,prefix:''}
      ];
    }
  }
  serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
  return buf.join("");
}
function needNamespaceDefine(node, isHTML, visibleNamespaces) {
  var prefix = node.prefix || "";
  var uri2 = node.namespaceURI;
  if (!uri2) {
    return false;
  }
  if (prefix === "xml" && uri2 === NAMESPACE$2.XML || uri2 === NAMESPACE$2.XMLNS) {
    return false;
  }
  var i = visibleNamespaces.length;
  while (i--) {
    var ns = visibleNamespaces[i];
    if (ns.prefix === prefix) {
      return ns.namespace !== uri2;
    }
  }
  return true;
}
function addSerializedAttribute(buf, qualifiedName, value) {
  buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
}
function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
  if (!visibleNamespaces) {
    visibleNamespaces = [];
  }
  if (nodeFilter) {
    node = nodeFilter(node);
    if (node) {
      if (typeof node == "string") {
        buf.push(node);
        return;
      }
    } else {
      return;
    }
  }
  switch (node.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes;
      var len = attrs.length;
      var child = node.firstChild;
      var nodeName = node.tagName;
      isHTML = NAMESPACE$2.isHTML(node.namespaceURI) || isHTML;
      var prefixedNodeName = nodeName;
      if (!isHTML && !node.prefix && node.namespaceURI) {
        var defaultNS;
        for (var ai = 0; ai < attrs.length; ai++) {
          if (attrs.item(ai).name === "xmlns") {
            defaultNS = attrs.item(ai).value;
            break;
          }
        }
        if (!defaultNS) {
          for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
            var namespace = visibleNamespaces[nsi];
            if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
              defaultNS = namespace.namespace;
              break;
            }
          }
        }
        if (defaultNS !== node.namespaceURI) {
          for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
            var namespace = visibleNamespaces[nsi];
            if (namespace.namespace === node.namespaceURI) {
              if (namespace.prefix) {
                prefixedNodeName = namespace.prefix + ":" + nodeName;
              }
              break;
            }
          }
        }
      }
      buf.push("<", prefixedNodeName);
      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i);
        if (attr.prefix == "xmlns") {
          visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
        } else if (attr.nodeName == "xmlns") {
          visibleNamespaces.push({ prefix: "", namespace: attr.value });
        }
      }
      for (var i = 0; i < len; i++) {
        var attr = attrs.item(i);
        if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
          var prefix = attr.prefix || "";
          var uri2 = attr.namespaceURI;
          addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri2);
          visibleNamespaces.push({ prefix, namespace: uri2 });
        }
        serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
      }
      if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
        var prefix = node.prefix || "";
        var uri2 = node.namespaceURI;
        addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri2);
        visibleNamespaces.push({ prefix, namespace: uri2 });
      }
      if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
        buf.push(">");
        if (isHTML && /^script$/i.test(nodeName)) {
          while (child) {
            if (child.data) {
              buf.push(child.data);
            } else {
              serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
            }
            child = child.nextSibling;
          }
        } else {
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
            child = child.nextSibling;
          }
        }
        buf.push("</", prefixedNodeName, ">");
      } else {
        buf.push("/>");
      }
      return;
    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      var child = node.firstChild;
      while (child) {
        serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
        child = child.nextSibling;
      }
      return;
    case ATTRIBUTE_NODE:
      return addSerializedAttribute(buf, node.name, node.value);
    case TEXT_NODE$1:
      return buf.push(
        node.data.replace(/[<&>]/g, _xmlEncoder)
      );
    case CDATA_SECTION_NODE:
      return buf.push("<![CDATA[", node.data, "]]>");
    case COMMENT_NODE$1:
      return buf.push("<!--", node.data, "-->");
    case DOCUMENT_TYPE_NODE:
      var pubid = node.publicId;
      var sysid = node.systemId;
      buf.push("<!DOCTYPE ", node.name);
      if (pubid) {
        buf.push(" PUBLIC ", pubid);
        if (sysid && sysid != ".") {
          buf.push(" ", sysid);
        }
        buf.push(">");
      } else if (sysid && sysid != ".") {
        buf.push(" SYSTEM ", sysid, ">");
      } else {
        var sub = node.internalSubset;
        if (sub) {
          buf.push(" [", sub, "]");
        }
        buf.push(">");
      }
      return;
    case PROCESSING_INSTRUCTION_NODE:
      return buf.push("<?", node.target, " ", node.data, "?>");
    case ENTITY_REFERENCE_NODE:
      return buf.push("&", node.nodeName, ";");
    default:
      buf.push("??", node.nodeName);
  }
}
function importNode(doc, node, deep) {
  var node2;
  switch (node.nodeType) {
    case ELEMENT_NODE:
      node2 = node.cloneNode(false);
      node2.ownerDocument = doc;
    case DOCUMENT_FRAGMENT_NODE:
      break;
    case ATTRIBUTE_NODE:
      deep = true;
      break;
  }
  if (!node2) {
    node2 = node.cloneNode(false);
  }
  node2.ownerDocument = doc;
  node2.parentNode = null;
  if (deep) {
    var child = node.firstChild;
    while (child) {
      node2.appendChild(importNode(doc, child, deep));
      child = child.nextSibling;
    }
  }
  return node2;
}
function cloneNode(doc, node, deep) {
  var node2 = new node.constructor();
  for (var n in node) {
    if (Object.prototype.hasOwnProperty.call(node, n)) {
      var v = node[n];
      if (typeof v != "object") {
        if (v != node2[n]) {
          node2[n] = v;
        }
      }
    }
  }
  if (node.childNodes) {
    node2.childNodes = new NodeList();
  }
  node2.ownerDocument = doc;
  switch (node2.nodeType) {
    case ELEMENT_NODE:
      var attrs = node.attributes;
      var attrs2 = node2.attributes = new NamedNodeMap();
      var len = attrs.length;
      attrs2._ownerElement = node2;
      for (var i = 0; i < len; i++) {
        node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
      }
      break;
    case ATTRIBUTE_NODE:
      deep = true;
  }
  if (deep) {
    var child = node.firstChild;
    while (child) {
      node2.appendChild(cloneNode(doc, child, deep));
      child = child.nextSibling;
    }
  }
  return node2;
}
function __set__(object, key, value) {
  object[key] = value;
}
try {
  if (Object.defineProperty) {
    let getTextContent = function(node) {
      switch (node.nodeType) {
        case ELEMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var buf = [];
          node = node.firstChild;
          while (node) {
            if (node.nodeType !== 7 && node.nodeType !== 8) {
              buf.push(getTextContent(node));
            }
            node = node.nextSibling;
          }
          return buf.join("");
        default:
          return node.nodeValue;
      }
    };
    Object.defineProperty(LiveNodeList.prototype, "length", {
      get: function() {
        _updateLiveList(this);
        return this.$$length;
      }
    });
    Object.defineProperty(Node.prototype, "textContent", {
      get: function() {
        return getTextContent(this);
      },
      set: function(data) {
        switch (this.nodeType) {
          case ELEMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            while (this.firstChild) {
              this.removeChild(this.firstChild);
            }
            if (data || String(data)) {
              this.appendChild(this.ownerDocument.createTextNode(data));
            }
            break;
          default:
            this.data = data;
            this.value = data;
            this.nodeValue = data;
        }
      }
    });
    __set__ = function(object, key, value) {
      object["$$" + key] = value;
    };
  }
} catch (e) {
}
dom$2.DocumentType = DocumentType;
dom$2.DOMException = DOMException;
dom$2.DOMImplementation = DOMImplementation$1;
dom$2.Element = Element;
dom$2.Node = Node;
dom$2.NodeList = NodeList;
dom$2.XMLSerializer = XMLSerializer;
var domParser = {};
var entities$1 = {};
(function(exports$1) {
  var freeze2 = conventions$2.freeze;
  exports$1.XML_ENTITIES = freeze2({
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"'
  });
  exports$1.HTML_ENTITIES = freeze2({
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "⁡",
    Afr: "𝔄",
    afr: "𝔞",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    AMP: "&",
    amp: "&",
    And: "⩓",
    and: "∧",
    andand: "⩕",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsd: "∡",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "𝔸",
    aopf: "𝕒",
    ap: "≈",
    apacir: "⩯",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "⁡",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "𝒜",
    ascr: "𝒶",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    Barwed: "⌆",
    barwed: "⌅",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    Because: "∵",
    because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "𝔅",
    bfr: "𝔟",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "𝔹",
    bopf: "𝕓",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxDL: "╗",
    boxDl: "╖",
    boxdL: "╕",
    boxdl: "┐",
    boxDR: "╔",
    boxDr: "╓",
    boxdR: "╒",
    boxdr: "┌",
    boxH: "═",
    boxh: "─",
    boxHD: "╦",
    boxHd: "╤",
    boxhD: "╥",
    boxhd: "┬",
    boxHU: "╩",
    boxHu: "╧",
    boxhU: "╨",
    boxhu: "┴",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxUL: "╝",
    boxUl: "╜",
    boxuL: "╛",
    boxul: "┘",
    boxUR: "╚",
    boxUr: "╙",
    boxuR: "╘",
    boxur: "└",
    boxV: "║",
    boxv: "│",
    boxVH: "╬",
    boxVh: "╫",
    boxvH: "╪",
    boxvh: "┼",
    boxVL: "╣",
    boxVl: "╢",
    boxvL: "╡",
    boxvl: "┤",
    boxVR: "╠",
    boxVr: "╟",
    boxvR: "╞",
    boxvr: "├",
    bprime: "‵",
    Breve: "˘",
    breve: "˘",
    brvbar: "¦",
    Bscr: "ℬ",
    bscr: "𝒷",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsol: "\\",
    bsolb: "⧅",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    Cap: "⋒",
    cap: "∩",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    CenterDot: "·",
    centerdot: "·",
    Cfr: "ℭ",
    cfr: "𝔠",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    cir: "○",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    Colon: "∷",
    colon: ":",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    Conint: "∯",
    conint: "∮",
    ContourIntegral: "∮",
    Copf: "ℂ",
    copf: "𝕔",
    coprod: "∐",
    Coproduct: "∐",
    COPY: "©",
    copy: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    Cross: "⨯",
    cross: "✗",
    Cscr: "𝒞",
    cscr: "𝒸",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    Cup: "⋓",
    cup: "∪",
    cupbrcap: "⩈",
    CupCap: "≍",
    cupcap: "⩆",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    Dagger: "‡",
    dagger: "†",
    daleth: "ℸ",
    Darr: "↡",
    dArr: "⇓",
    darr: "↓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    DD: "ⅅ",
    dd: "ⅆ",
    ddagger: "‡",
    ddarr: "⇊",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "𝔇",
    dfr: "𝔡",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    Diamond: "⋄",
    diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "𝔻",
    dopf: "𝕕",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrow: "↓",
    Downarrow: "⇓",
    downarrow: "↓",
    DownArrowBar: "⤓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVector: "↽",
    DownLeftVectorBar: "⥖",
    DownRightTeeVector: "⥟",
    DownRightVector: "⇁",
    DownRightVectorBar: "⥗",
    DownTee: "⊤",
    DownTeeArrow: "↧",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "𝒟",
    dscr: "𝒹",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    ecir: "≖",
    Ecirc: "Ê",
    ecirc: "ê",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    eDot: "≑",
    edot: "ė",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "𝔈",
    efr: "𝔢",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp: " ",
    emsp13: " ",
    emsp14: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "𝔼",
    eopf: "𝕖",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    Escr: "ℰ",
    escr: "ℯ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    ExponentialE: "ⅇ",
    exponentiale: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "𝔉",
    ffr: "𝔣",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "𝔽",
    fopf: "𝕗",
    ForAll: "∀",
    forall: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    Fscr: "ℱ",
    fscr: "𝒻",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    gE: "≧",
    ge: "≥",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    ges: "⩾",
    gescc: "⪩",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "𝔊",
    gfr: "𝔤",
    Gg: "⋙",
    gg: "≫",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gl: "≷",
    gla: "⪥",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gnE: "≩",
    gne: "⪈",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "𝔾",
    gopf: "𝕘",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "𝒢",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    Gt: "≫",
    GT: ">",
    gt: ">",
    gtcc: "⪧",
    gtcir: "⩺",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    hArr: "⇔",
    harr: "↔",
    harrcir: "⥈",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    Hfr: "ℌ",
    hfr: "𝔥",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    Hopf: "ℍ",
    hopf: "𝕙",
    horbar: "―",
    HorizontalLine: "─",
    Hscr: "ℋ",
    hscr: "𝒽",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "⁣",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    Ifr: "ℑ",
    ifr: "𝔦",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Im: "ℑ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    in: "∈",
    incare: "℅",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    Int: "∬",
    int: "∫",
    intcal: "⊺",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "⁣",
    InvisibleTimes: "⁢",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "𝕀",
    iopf: "𝕚",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    Iscr: "ℐ",
    iscr: "𝒾",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "⁢",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "𝔍",
    jfr: "𝔧",
    jmath: "ȷ",
    Jopf: "𝕁",
    jopf: "𝕛",
    Jscr: "𝒥",
    jscr: "𝒿",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "𝔎",
    kfr: "𝔨",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "𝕂",
    kopf: "𝕜",
    Kscr: "𝒦",
    kscr: "𝓀",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    Lang: "⟪",
    lang: "⟨",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    Larr: "↞",
    lArr: "⇐",
    larr: "←",
    larrb: "⇤",
    larrbfs: "⤟",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    lat: "⪫",
    lAtail: "⤛",
    latail: "⤙",
    late: "⪭",
    lates: "⪭︀",
    lBarr: "⤎",
    lbarr: "⤌",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    lE: "≦",
    le: "≤",
    LeftAngleBracket: "⟨",
    LeftArrow: "←",
    Leftarrow: "⇐",
    leftarrow: "←",
    LeftArrowBar: "⇤",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVector: "⇃",
    LeftDownVectorBar: "⥙",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrow: "↔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTee: "⊣",
    LeftTeeArrow: "↤",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangle: "⊲",
    LeftTriangleBar: "⧏",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVector: "↿",
    LeftUpVectorBar: "⥘",
    LeftVector: "↼",
    LeftVectorBar: "⥒",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    les: "⩽",
    lescc: "⪨",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "𝔏",
    lfr: "𝔩",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    Ll: "⋘",
    ll: "≪",
    llarr: "⇇",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoust: "⎰",
    lmoustache: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lnE: "≨",
    lne: "⪇",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftarrow: "⟵",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longleftrightarrow: "⟷",
    longmapsto: "⟼",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    longrightarrow: "⟶",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "𝕃",
    lopf: "𝕝",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "‎",
    lrtri: "⊿",
    lsaquo: "‹",
    Lscr: "ℒ",
    lscr: "𝓁",
    Lsh: "↰",
    lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    Lt: "≪",
    LT: "<",
    lt: "<",
    ltcc: "⪦",
    ltcir: "⩹",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    Map: "⤅",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "𝔐",
    mfr: "𝔪",
    mho: "℧",
    micro: "µ",
    mid: "∣",
    midast: "*",
    midcir: "⫰",
    middot: "·",
    minus: "−",
    minusb: "⊟",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "𝕄",
    mopf: "𝕞",
    mp: "∓",
    Mscr: "ℳ",
    mscr: "𝓂",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natur: "♮",
    natural: "♮",
    naturals: "ℕ",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    ne: "≠",
    nearhk: "⤤",
    neArr: "⇗",
    nearr: "↗",
    nearrow: "↗",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: "\n",
    nexist: "∄",
    nexists: "∄",
    Nfr: "𝔑",
    nfr: "𝔫",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nhArr: "⇎",
    nharr: "↮",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlArr: "⇍",
    nlarr: "↚",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nLeftarrow: "⇍",
    nleftarrow: "↚",
    nLeftrightarrow: "⇎",
    nleftrightarrow: "↮",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "⁠",
    NonBreakingSpace: " ",
    Nopf: "ℕ",
    nopf: "𝕟",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangle: "⋪",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangle: "⋫",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    npar: "∦",
    nparallel: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    npre: "⪯̸",
    nprec: "⊀",
    npreceq: "⪯̸",
    nrArr: "⇏",
    nrarr: "↛",
    nrarrc: "⤳̸",
    nrarrw: "↝̸",
    nRightarrow: "⇏",
    nrightarrow: "↛",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "𝒩",
    nscr: "𝓃",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nVDash: "⊯",
    nVdash: "⊮",
    nvDash: "⊭",
    nvdash: "⊬",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwArr: "⇖",
    nwarr: "↖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    ocir: "⊚",
    Ocirc: "Ô",
    ocirc: "ô",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "𝔒",
    ofr: "𝔬",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "𝕆",
    oopf: "𝕠",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    Or: "⩔",
    or: "∨",
    orarr: "↻",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "𝒪",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    Otimes: "⨷",
    otimes: "⊗",
    otimesas: "⨶",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    par: "∥",
    para: "¶",
    parallel: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "𝔓",
    pfr: "𝔭",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plus: "+",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    Popf: "ℙ",
    popf: "𝕡",
    pound: "£",
    Pr: "⪻",
    pr: "≺",
    prap: "⪷",
    prcue: "≼",
    prE: "⪳",
    pre: "⪯",
    prec: "≺",
    precapprox: "⪷",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    precsim: "≾",
    Prime: "″",
    prime: "′",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportion: "∷",
    Proportional: "∝",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "𝒫",
    pscr: "𝓅",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "𝔔",
    qfr: "𝔮",
    qint: "⨌",
    Qopf: "ℚ",
    qopf: "𝕢",
    qprime: "⁗",
    Qscr: "𝒬",
    qscr: "𝓆",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    QUOT: '"',
    quot: '"',
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    Rang: "⟫",
    rang: "⟩",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    Rarr: "↠",
    rArr: "⇒",
    rarr: "→",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    rAtail: "⤜",
    ratail: "⤚",
    ratio: "∶",
    rationals: "ℚ",
    RBarr: "⤐",
    rBarr: "⤏",
    rbarr: "⤍",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    Re: "ℜ",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    rect: "▭",
    REG: "®",
    reg: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    Rfr: "ℜ",
    rfr: "𝔯",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrow: "→",
    Rightarrow: "⇒",
    rightarrow: "→",
    RightArrowBar: "⇥",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVector: "⇂",
    RightDownVectorBar: "⥕",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTee: "⊢",
    RightTeeArrow: "↦",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangle: "⊳",
    RightTriangleBar: "⧐",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVector: "↾",
    RightUpVectorBar: "⥔",
    RightVector: "⇀",
    RightVectorBar: "⥓",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "‏",
    rmoust: "⎱",
    rmoustache: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    Ropf: "ℝ",
    ropf: "𝕣",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    Rscr: "ℛ",
    rscr: "𝓇",
    Rsh: "↱",
    rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    Sc: "⪼",
    sc: "≻",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    sccue: "≽",
    scE: "⪴",
    sce: "⪰",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdot: "⋅",
    sdotb: "⊡",
    sdote: "⩦",
    searhk: "⤥",
    seArr: "⇘",
    searr: "↘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "𝔖",
    sfr: "𝔰",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "­",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    sol: "/",
    solb: "⧄",
    solbar: "⌿",
    Sopf: "𝕊",
    sopf: "𝕤",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    squ: "□",
    Square: "□",
    square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squf: "▪",
    srarr: "→",
    Sscr: "𝒮",
    sscr: "𝓈",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    Sub: "⋐",
    sub: "⊂",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    Subset: "⋐",
    subset: "⊂",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succ: "≻",
    succapprox: "⪸",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    Sum: "∑",
    sum: "∑",
    sung: "♪",
    Sup: "⋑",
    sup: "⊃",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    Supset: "⋑",
    supset: "⊃",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swArr: "⇙",
    swarr: "↙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "	",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "𝔗",
    tfr: "𝔱",
    there4: "∴",
    Therefore: "∴",
    therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    thinsp: " ",
    ThinSpace: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    Tilde: "∼",
    tilde: "˜",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    times: "×",
    timesb: "⊠",
    timesbar: "⨱",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    top: "⊤",
    topbot: "⌶",
    topcir: "⫱",
    Topf: "𝕋",
    topf: "𝕥",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    TRADE: "™",
    trade: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "𝒯",
    tscr: "𝓉",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    Uarr: "↟",
    uArr: "⇑",
    uarr: "↑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "𝔘",
    ufr: "𝔲",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "𝕌",
    uopf: "𝕦",
    UpArrow: "↑",
    Uparrow: "⇑",
    uparrow: "↑",
    UpArrowBar: "⤒",
    UpArrowDownArrow: "⇅",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    updownarrow: "↕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    Upsi: "ϒ",
    upsi: "υ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTee: "⊥",
    UpTeeArrow: "↥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "𝒰",
    uscr: "𝓊",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    vArr: "⇕",
    varr: "↕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    Vbar: "⫫",
    vBar: "⫨",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    VDash: "⊫",
    Vdash: "⊩",
    vDash: "⊨",
    vdash: "⊢",
    Vdashl: "⫦",
    Vee: "⋁",
    vee: "∨",
    veebar: "⊻",
    veeeq: "≚",
    vellip: "⋮",
    Verbar: "‖",
    verbar: "|",
    Vert: "‖",
    vert: "|",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "𝔙",
    vfr: "𝔳",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "𝕍",
    vopf: "𝕧",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "𝒱",
    vscr: "𝓋",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    Wedge: "⋀",
    wedge: "∧",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "𝔚",
    wfr: "𝔴",
    Wopf: "𝕎",
    wopf: "𝕨",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "𝒲",
    wscr: "𝓌",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "𝔛",
    xfr: "𝔵",
    xhArr: "⟺",
    xharr: "⟷",
    Xi: "Ξ",
    xi: "ξ",
    xlArr: "⟸",
    xlarr: "⟵",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "𝕏",
    xopf: "𝕩",
    xoplus: "⨁",
    xotime: "⨂",
    xrArr: "⟹",
    xrarr: "⟶",
    Xscr: "𝒳",
    xscr: "𝓍",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "𝔜",
    yfr: "𝔶",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "𝕐",
    yopf: "𝕪",
    Yscr: "𝒴",
    yscr: "𝓎",
    YUcy: "Ю",
    yucy: "ю",
    Yuml: "Ÿ",
    yuml: "ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    Zfr: "ℨ",
    zfr: "𝔷",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    Zopf: "ℤ",
    zopf: "𝕫",
    Zscr: "𝒵",
    zscr: "𝓏",
    zwj: "‍",
    zwnj: "‌"
  });
  exports$1.entityMap = exports$1.HTML_ENTITIES;
})(entities$1);
var sax$1 = {};
var NAMESPACE$1 = conventions$2.NAMESPACE;
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
var S_TAG = 0;
var S_ATTR = 1;
var S_ATTR_SPACE = 2;
var S_EQ = 3;
var S_ATTR_NOQUOT_VALUE = 4;
var S_ATTR_END = 5;
var S_TAG_SPACE = 6;
var S_TAG_CLOSE = 7;
function ParseError$1(message, locator) {
  this.message = message;
  this.locator = locator;
  if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError$1);
}
ParseError$1.prototype = new Error();
ParseError$1.prototype.name = ParseError$1.name;
function XMLReader$1() {
}
XMLReader$1.prototype = {
  parse: function(source2, defaultNSMap, entityMap) {
    var domBuilder = this.domBuilder;
    domBuilder.startDocument();
    _copy(defaultNSMap, defaultNSMap = {});
    parse$1(
      source2,
      defaultNSMap,
      entityMap,
      domBuilder,
      this.errorHandler
    );
    domBuilder.endDocument();
  }
};
function parse$1(source2, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
  function fixedFromCharCode(code2) {
    if (code2 > 65535) {
      code2 -= 65536;
      var surrogate1 = 55296 + (code2 >> 10), surrogate2 = 56320 + (code2 & 1023);
      return String.fromCharCode(surrogate1, surrogate2);
    } else {
      return String.fromCharCode(code2);
    }
  }
  function entityReplacer(a2) {
    var k = a2.slice(1, -1);
    if (Object.hasOwnProperty.call(entityMap, k)) {
      return entityMap[k];
    } else if (k.charAt(0) === "#") {
      return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
    } else {
      errorHandler.error("entity not found:" + a2);
      return a2;
    }
  }
  function appendText(end2) {
    if (end2 > start) {
      var xt = source2.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
      locator && position2(start);
      domBuilder.characters(xt, 0, end2 - start);
      start = end2;
    }
  }
  function position2(p, m) {
    while (p >= lineEnd && (m = linePattern.exec(source2))) {
      lineStart = m.index;
      lineEnd = lineStart + m[0].length;
      locator.lineNumber++;
    }
    locator.columnNumber = p - lineStart + 1;
  }
  var lineStart = 0;
  var lineEnd = 0;
  var linePattern = /.*(?:\r\n?|\n)|.*$/g;
  var locator = domBuilder.locator;
  var parseStack = [{ currentNSMap: defaultNSMapCopy }];
  var closeMap = {};
  var start = 0;
  while (true) {
    try {
      var tagStart = source2.indexOf("<", start);
      if (tagStart < 0) {
        if (!source2.substr(start).match(/^\s*$/)) {
          var doc = domBuilder.doc;
          var text = doc.createTextNode(source2.substr(start));
          doc.appendChild(text);
          domBuilder.currentElement = text;
        }
        return;
      }
      if (tagStart > start) {
        appendText(tagStart);
      }
      switch (source2.charAt(tagStart + 1)) {
        case "/":
          var end = source2.indexOf(">", tagStart + 3);
          var tagName = source2.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
          var config = parseStack.pop();
          if (end < 0) {
            tagName = source2.substring(tagStart + 2).replace(/[\s<].*/, "");
            errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
            end = tagStart + 1 + tagName.length;
          } else if (tagName.match(/\s</)) {
            tagName = tagName.replace(/[\s<].*/, "");
            errorHandler.error("end tag name: " + tagName + " maybe not complete");
            end = tagStart + 1 + tagName.length;
          }
          var localNSMap = config.localNSMap;
          var endMatch = config.tagName == tagName;
          var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
          if (endIgnoreCaseMach) {
            domBuilder.endElement(config.uri, config.localName, tagName);
            if (localNSMap) {
              for (var prefix in localNSMap) {
                if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                  domBuilder.endPrefixMapping(prefix);
                }
              }
            }
            if (!endMatch) {
              errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
            }
          } else {
            parseStack.push(config);
          }
          end++;
          break;
        case "?":
          locator && position2(tagStart);
          end = parseInstruction(source2, tagStart, domBuilder);
          break;
        case "!":
          locator && position2(tagStart);
          end = parseDCC(source2, tagStart, domBuilder, errorHandler);
          break;
        default:
          locator && position2(tagStart);
          var el = new ElementAttributes();
          var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
          var end = parseElementStartPart(source2, tagStart, el, currentNSMap, entityReplacer, errorHandler);
          var len = el.length;
          if (!el.closed && fixSelfClosed(source2, end, el.tagName, closeMap)) {
            el.closed = true;
            if (!entityMap.nbsp) {
              errorHandler.warning("unclosed xml attribute");
            }
          }
          if (locator && len) {
            var locator2 = copyLocator(locator, {});
            for (var i = 0; i < len; i++) {
              var a = el[i];
              position2(a.offset);
              a.locator = copyLocator(locator, {});
            }
            domBuilder.locator = locator2;
            if (appendElement$1(el, domBuilder, currentNSMap)) {
              parseStack.push(el);
            }
            domBuilder.locator = locator;
          } else {
            if (appendElement$1(el, domBuilder, currentNSMap)) {
              parseStack.push(el);
            }
          }
          if (NAMESPACE$1.isHTML(el.uri) && !el.closed) {
            end = parseHtmlSpecialContent(source2, end, el.tagName, entityReplacer, domBuilder);
          } else {
            end++;
          }
      }
    } catch (e) {
      if (e instanceof ParseError$1) {
        throw e;
      }
      errorHandler.error("element parse error: " + e);
      end = -1;
    }
    if (end > start) {
      start = end;
    } else {
      appendText(Math.max(tagStart, start) + 1);
    }
  }
}
function copyLocator(f, t2) {
  t2.lineNumber = f.lineNumber;
  t2.columnNumber = f.columnNumber;
  return t2;
}
function parseElementStartPart(source2, start, el, currentNSMap, entityReplacer, errorHandler) {
  function addAttribute(qname, value2, startIndex) {
    if (el.attributeNames.hasOwnProperty(qname)) {
      errorHandler.fatalError("Attribute " + qname + " redefined");
    }
    el.addValue(
      qname,
      // @see https://www.w3.org/TR/xml/#AVNormalize
      // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
      // - recursive replacement of (DTD) entity references
      // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
      value2.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer),
      startIndex
    );
  }
  var attrName;
  var value;
  var p = ++start;
  var s = S_TAG;
  while (true) {
    var c = source2.charAt(p);
    switch (c) {
      case "=":
        if (s === S_ATTR) {
          attrName = source2.slice(start, p);
          s = S_EQ;
        } else if (s === S_ATTR_SPACE) {
          s = S_EQ;
        } else {
          throw new Error("attribute equal must after attrName");
        }
        break;
      case "'":
      case '"':
        if (s === S_EQ || s === S_ATTR) {
          if (s === S_ATTR) {
            errorHandler.warning('attribute value must after "="');
            attrName = source2.slice(start, p);
          }
          start = p + 1;
          p = source2.indexOf(c, start);
          if (p > 0) {
            value = source2.slice(start, p);
            addAttribute(attrName, value, start - 1);
            s = S_ATTR_END;
          } else {
            throw new Error("attribute value no end '" + c + "' match");
          }
        } else if (s == S_ATTR_NOQUOT_VALUE) {
          value = source2.slice(start, p);
          addAttribute(attrName, value, start);
          errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
          start = p + 1;
          s = S_ATTR_END;
        } else {
          throw new Error('attribute value must after "="');
        }
        break;
      case "/":
        switch (s) {
          case S_TAG:
            el.setTagName(source2.slice(start, p));
          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            s = S_TAG_CLOSE;
            el.closed = true;
          case S_ATTR_NOQUOT_VALUE:
          case S_ATTR:
            break;
          case S_ATTR_SPACE:
            el.closed = true;
            break;
          default:
            throw new Error("attribute invalid close char('/')");
        }
        break;
      case "":
        errorHandler.error("unexpected end of input");
        if (s == S_TAG) {
          el.setTagName(source2.slice(start, p));
        }
        return p;
      case ">":
        switch (s) {
          case S_TAG:
            el.setTagName(source2.slice(start, p));
          case S_ATTR_END:
          case S_TAG_SPACE:
          case S_TAG_CLOSE:
            break;
          case S_ATTR_NOQUOT_VALUE:
          case S_ATTR:
            value = source2.slice(start, p);
            if (value.slice(-1) === "/") {
              el.closed = true;
              value = value.slice(0, -1);
            }
          case S_ATTR_SPACE:
            if (s === S_ATTR_SPACE) {
              value = attrName;
            }
            if (s == S_ATTR_NOQUOT_VALUE) {
              errorHandler.warning('attribute "' + value + '" missed quot(")!');
              addAttribute(attrName, value, start);
            } else {
              if (!NAMESPACE$1.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
              }
              addAttribute(value, value, start);
            }
            break;
          case S_EQ:
            throw new Error("attribute value missed!!");
        }
        return p;
      case "":
        c = " ";
      default:
        if (c <= " ") {
          switch (s) {
            case S_TAG:
              el.setTagName(source2.slice(start, p));
              s = S_TAG_SPACE;
              break;
            case S_ATTR:
              attrName = source2.slice(start, p);
              s = S_ATTR_SPACE;
              break;
            case S_ATTR_NOQUOT_VALUE:
              var value = source2.slice(start, p);
              errorHandler.warning('attribute "' + value + '" missed quot(")!!');
              addAttribute(attrName, value, start);
            case S_ATTR_END:
              s = S_TAG_SPACE;
              break;
          }
        } else {
          switch (s) {
            case S_ATTR_SPACE:
              el.tagName;
              if (!NAMESPACE$1.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
              }
              addAttribute(attrName, attrName, start);
              start = p;
              s = S_ATTR;
              break;
            case S_ATTR_END:
              errorHandler.warning('attribute space is required"' + attrName + '"!!');
            case S_TAG_SPACE:
              s = S_ATTR;
              start = p;
              break;
            case S_EQ:
              s = S_ATTR_NOQUOT_VALUE;
              start = p;
              break;
            case S_TAG_CLOSE:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
        }
    }
    p++;
  }
}
function appendElement$1(el, domBuilder, currentNSMap) {
  var tagName = el.tagName;
  var localNSMap = null;
  var i = el.length;
  while (i--) {
    var a = el[i];
    var qName = a.qName;
    var value = a.value;
    var nsp = qName.indexOf(":");
    if (nsp > 0) {
      var prefix = a.prefix = qName.slice(0, nsp);
      var localName = qName.slice(nsp + 1);
      var nsPrefix = prefix === "xmlns" && localName;
    } else {
      localName = qName;
      prefix = null;
      nsPrefix = qName === "xmlns" && "";
    }
    a.localName = localName;
    if (nsPrefix !== false) {
      if (localNSMap == null) {
        localNSMap = {};
        _copy(currentNSMap, currentNSMap = {});
      }
      currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
      a.uri = NAMESPACE$1.XMLNS;
      domBuilder.startPrefixMapping(nsPrefix, value);
    }
  }
  var i = el.length;
  while (i--) {
    a = el[i];
    var prefix = a.prefix;
    if (prefix) {
      if (prefix === "xml") {
        a.uri = NAMESPACE$1.XML;
      }
      if (prefix !== "xmlns") {
        a.uri = currentNSMap[prefix || ""];
      }
    }
  }
  var nsp = tagName.indexOf(":");
  if (nsp > 0) {
    prefix = el.prefix = tagName.slice(0, nsp);
    localName = el.localName = tagName.slice(nsp + 1);
  } else {
    prefix = null;
    localName = el.localName = tagName;
  }
  var ns = el.uri = currentNSMap[prefix || ""];
  domBuilder.startElement(ns, localName, tagName, el);
  if (el.closed) {
    domBuilder.endElement(ns, localName, tagName);
    if (localNSMap) {
      for (prefix in localNSMap) {
        if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
          domBuilder.endPrefixMapping(prefix);
        }
      }
    }
  } else {
    el.currentNSMap = currentNSMap;
    el.localNSMap = localNSMap;
    return true;
  }
}
function parseHtmlSpecialContent(source2, elStartEnd, tagName, entityReplacer, domBuilder) {
  if (/^(?:script|textarea)$/i.test(tagName)) {
    var elEndStart = source2.indexOf("</" + tagName + ">", elStartEnd);
    var text = source2.substring(elStartEnd + 1, elEndStart);
    if (/[&<]/.test(text)) {
      if (/^script$/i.test(tagName)) {
        domBuilder.characters(text, 0, text.length);
        return elEndStart;
      }
      text = text.replace(/&#?\w+;/g, entityReplacer);
      domBuilder.characters(text, 0, text.length);
      return elEndStart;
    }
  }
  return elStartEnd + 1;
}
function fixSelfClosed(source2, elStartEnd, tagName, closeMap) {
  var pos = closeMap[tagName];
  if (pos == null) {
    pos = source2.lastIndexOf("</" + tagName + ">");
    if (pos < elStartEnd) {
      pos = source2.lastIndexOf("</" + tagName);
    }
    closeMap[tagName] = pos;
  }
  return pos < elStartEnd;
}
function _copy(source2, target) {
  for (var n in source2) {
    if (Object.prototype.hasOwnProperty.call(source2, n)) {
      target[n] = source2[n];
    }
  }
}
function parseDCC(source2, start, domBuilder, errorHandler) {
  var next = source2.charAt(start + 2);
  switch (next) {
    case "-":
      if (source2.charAt(start + 3) === "-") {
        var end = source2.indexOf("-->", start + 4);
        if (end > start) {
          domBuilder.comment(source2, start + 4, end - start - 4);
          return end + 3;
        } else {
          errorHandler.error("Unclosed comment");
          return -1;
        }
      } else {
        return -1;
      }
    default:
      if (source2.substr(start + 3, 6) == "CDATA[") {
        var end = source2.indexOf("]]>", start + 9);
        domBuilder.startCDATA();
        domBuilder.characters(source2, start + 9, end - start - 9);
        domBuilder.endCDATA();
        return end + 3;
      }
      var matchs = split(source2, start);
      var len = matchs.length;
      if (len > 1 && /!doctype/i.test(matchs[0][0])) {
        var name = matchs[1][0];
        var pubid = false;
        var sysid = false;
        if (len > 3) {
          if (/^public$/i.test(matchs[2][0])) {
            pubid = matchs[3][0];
            sysid = len > 4 && matchs[4][0];
          } else if (/^system$/i.test(matchs[2][0])) {
            sysid = matchs[3][0];
          }
        }
        var lastMatch = matchs[len - 1];
        domBuilder.startDTD(name, pubid, sysid);
        domBuilder.endDTD();
        return lastMatch.index + lastMatch[0].length;
      }
  }
  return -1;
}
function parseInstruction(source2, start, domBuilder) {
  var end = source2.indexOf("?>", start);
  if (end) {
    var match = source2.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
    if (match) {
      match[0].length;
      domBuilder.processingInstruction(match[1], match[2]);
      return end + 2;
    } else {
      return -1;
    }
  }
  return -1;
}
function ElementAttributes() {
  this.attributeNames = {};
}
ElementAttributes.prototype = {
  setTagName: function(tagName) {
    if (!tagNamePattern.test(tagName)) {
      throw new Error("invalid tagName:" + tagName);
    }
    this.tagName = tagName;
  },
  addValue: function(qName, value, offset) {
    if (!tagNamePattern.test(qName)) {
      throw new Error("invalid attribute:" + qName);
    }
    this.attributeNames[qName] = this.length;
    this[this.length++] = { qName, value, offset };
  },
  length: 0,
  getLocalName: function(i) {
    return this[i].localName;
  },
  getLocator: function(i) {
    return this[i].locator;
  },
  getQName: function(i) {
    return this[i].qName;
  },
  getURI: function(i) {
    return this[i].uri;
  },
  getValue: function(i) {
    return this[i].value;
  }
  //	,getIndex:function(uri, localName)){
  //		if(localName){
  //
  //		}else{
  //			var qName = uri
  //		}
  //	},
  //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
  //	getType:function(uri,localName){}
  //	getType:function(i){},
};
function split(source2, start) {
  var match;
  var buf = [];
  var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  reg.lastIndex = start;
  reg.exec(source2);
  while (match = reg.exec(source2)) {
    buf.push(match);
    if (match[1]) return buf;
  }
}
sax$1.XMLReader = XMLReader$1;
sax$1.ParseError = ParseError$1;
var conventions = conventions$2;
var dom$1 = dom$2;
var entities = entities$1;
var sax = sax$1;
var DOMImplementation = dom$1.DOMImplementation;
var NAMESPACE = conventions.NAMESPACE;
var ParseError = sax.ParseError;
var XMLReader = sax.XMLReader;
function normalizeLineEndings(input) {
  return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
}
function DOMParser$1(options) {
  this.options = options || { locator: {} };
}
DOMParser$1.prototype.parseFromString = function(source2, mimeType) {
  var options = this.options;
  var sax2 = new XMLReader();
  var domBuilder = options.domBuilder || new DOMHandler();
  var errorHandler = options.errorHandler;
  var locator = options.locator;
  var defaultNSMap = options.xmlns || {};
  var isHTML = /\/x?html?$/.test(mimeType);
  var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
  if (locator) {
    domBuilder.setDocumentLocator(locator);
  }
  sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
  sax2.domBuilder = options.domBuilder || domBuilder;
  if (isHTML) {
    defaultNSMap[""] = NAMESPACE.HTML;
  }
  defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
  var normalize2 = options.normalizeLineEndings || normalizeLineEndings;
  if (source2 && typeof source2 === "string") {
    sax2.parse(
      normalize2(source2),
      defaultNSMap,
      entityMap
    );
  } else {
    sax2.errorHandler.error("invalid doc source");
  }
  return domBuilder.doc;
};
function buildErrorHandler(errorImpl, domBuilder, locator) {
  if (!errorImpl) {
    if (domBuilder instanceof DOMHandler) {
      return domBuilder;
    }
    errorImpl = domBuilder;
  }
  var errorHandler = {};
  var isCallback = errorImpl instanceof Function;
  locator = locator || {};
  function build2(key) {
    var fn = errorImpl[key];
    if (!fn && isCallback) {
      fn = errorImpl.length == 2 ? function(msg) {
        errorImpl(key, msg);
      } : errorImpl;
    }
    errorHandler[key] = fn && function(msg) {
      fn("[xmldom " + key + "]	" + msg + _locator(locator));
    } || function() {
    };
  }
  build2("warning");
  build2("error");
  build2("fatalError");
  return errorHandler;
}
function DOMHandler() {
  this.cdata = false;
}
function position(locator, node) {
  node.lineNumber = locator.lineNumber;
  node.columnNumber = locator.columnNumber;
}
DOMHandler.prototype = {
  startDocument: function() {
    this.doc = new DOMImplementation().createDocument(null, null, null);
    if (this.locator) {
      this.doc.documentURI = this.locator.systemId;
    }
  },
  startElement: function(namespaceURI, localName, qName, attrs) {
    var doc = this.doc;
    var el = doc.createElementNS(namespaceURI, qName || localName);
    var len = attrs.length;
    appendElement(this, el);
    this.currentElement = el;
    this.locator && position(this.locator, el);
    for (var i = 0; i < len; i++) {
      var namespaceURI = attrs.getURI(i);
      var value = attrs.getValue(i);
      var qName = attrs.getQName(i);
      var attr = doc.createAttributeNS(namespaceURI, qName);
      this.locator && position(attrs.getLocator(i), attr);
      attr.value = attr.nodeValue = value;
      el.setAttributeNode(attr);
    }
  },
  endElement: function(namespaceURI, localName, qName) {
    var current = this.currentElement;
    current.tagName;
    this.currentElement = current.parentNode;
  },
  startPrefixMapping: function(prefix, uri2) {
  },
  endPrefixMapping: function(prefix) {
  },
  processingInstruction: function(target, data) {
    var ins = this.doc.createProcessingInstruction(target, data);
    this.locator && position(this.locator, ins);
    appendElement(this, ins);
  },
  ignorableWhitespace: function(ch, start, length) {
  },
  characters: function(chars, start, length) {
    chars = _toString.apply(this, arguments);
    if (chars) {
      if (this.cdata) {
        var charNode = this.doc.createCDATASection(chars);
      } else {
        var charNode = this.doc.createTextNode(chars);
      }
      if (this.currentElement) {
        this.currentElement.appendChild(charNode);
      } else if (/^\s*$/.test(chars)) {
        this.doc.appendChild(charNode);
      }
      this.locator && position(this.locator, charNode);
    }
  },
  skippedEntity: function(name) {
  },
  endDocument: function() {
    this.doc.normalize();
  },
  setDocumentLocator: function(locator) {
    if (this.locator = locator) {
      locator.lineNumber = 0;
    }
  },
  //LexicalHandler
  comment: function(chars, start, length) {
    chars = _toString.apply(this, arguments);
    var comm = this.doc.createComment(chars);
    this.locator && position(this.locator, comm);
    appendElement(this, comm);
  },
  startCDATA: function() {
    this.cdata = true;
  },
  endCDATA: function() {
    this.cdata = false;
  },
  startDTD: function(name, publicId, systemId) {
    var impl = this.doc.implementation;
    if (impl && impl.createDocumentType) {
      var dt = impl.createDocumentType(name, publicId, systemId);
      this.locator && position(this.locator, dt);
      appendElement(this, dt);
      this.doc.doctype = dt;
    }
  },
  /**
   * @see org.xml.sax.ErrorHandler
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
   */
  warning: function(error2) {
    console.warn("[xmldom warning]	" + error2, _locator(this.locator));
  },
  error: function(error2) {
    console.error("[xmldom error]	" + error2, _locator(this.locator));
  },
  fatalError: function(error2) {
    throw new ParseError(error2, this.locator);
  }
};
function _locator(l) {
  if (l) {
    return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
  }
}
function _toString(chars, start, length) {
  if (typeof chars == "string") {
    return chars.substr(start, length);
  } else {
    if (chars.length >= start + length || start) {
      return new java.lang.String(chars, start, length) + "";
    }
    return chars;
  }
}
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
  DOMHandler.prototype[key] = function() {
    return null;
  };
});
function appendElement(hander, node) {
  if (!hander.currentElement) {
    hander.doc.appendChild(node);
  } else {
    hander.currentElement.appendChild(node);
  }
}
domParser.__DOMHandler = DOMHandler;
domParser.normalizeLineEndings = normalizeLineEndings;
domParser.DOMParser = DOMParser$1;
var dom = dom$2;
lib$1.DOMImplementation = dom.DOMImplementation;
lib$1.XMLSerializer = dom.XMLSerializer;
lib$1.DOMParser = domParser.DOMParser;
const { DOMParser } = lib$1;
parse$2.parse = parse;
var TEXT_NODE = 3;
var CDATA_NODE = 4;
var COMMENT_NODE = 8;
function shouldIgnoreNode(node) {
  return node.nodeType === TEXT_NODE || node.nodeType === COMMENT_NODE || node.nodeType === CDATA_NODE;
}
function isEmptyNode(node) {
  if (!node.childNodes || node.childNodes.length === 0) {
    return true;
  } else {
    return false;
  }
}
function invariant(test, message) {
  if (!test) {
    throw new Error(message);
  }
}
function parse(xml) {
  var doc = new DOMParser().parseFromString(xml);
  invariant(
    doc.documentElement.nodeName === "plist",
    "malformed document. First element should be <plist>"
  );
  var plist2 = parsePlistXML(doc.documentElement);
  if (plist2.length == 1) plist2 = plist2[0];
  return plist2;
}
function parsePlistXML(node) {
  var i, new_obj, key, new_arr, res, counter, type2;
  if (!node)
    return null;
  if (node.nodeName === "plist") {
    new_arr = [];
    if (isEmptyNode(node)) {
      return new_arr;
    }
    for (i = 0; i < node.childNodes.length; i++) {
      if (!shouldIgnoreNode(node.childNodes[i])) {
        new_arr.push(parsePlistXML(node.childNodes[i]));
      }
    }
    return new_arr;
  } else if (node.nodeName === "dict") {
    new_obj = {};
    key = null;
    counter = 0;
    if (isEmptyNode(node)) {
      return new_obj;
    }
    for (i = 0; i < node.childNodes.length; i++) {
      if (shouldIgnoreNode(node.childNodes[i])) continue;
      if (counter % 2 === 0) {
        invariant(
          node.childNodes[i].nodeName === "key",
          "Missing key while parsing <dict/>."
        );
        key = parsePlistXML(node.childNodes[i]);
      } else {
        invariant(
          node.childNodes[i].nodeName !== "key",
          'Unexpected key "' + parsePlistXML(node.childNodes[i]) + '" while parsing <dict/>.'
        );
        new_obj[key] = parsePlistXML(node.childNodes[i]);
      }
      counter += 1;
    }
    if (counter % 2 === 1) {
      new_obj[key] = "";
    }
    return new_obj;
  } else if (node.nodeName === "array") {
    new_arr = [];
    if (isEmptyNode(node)) {
      return new_arr;
    }
    for (i = 0; i < node.childNodes.length; i++) {
      if (!shouldIgnoreNode(node.childNodes[i])) {
        res = parsePlistXML(node.childNodes[i]);
        if (null != res) new_arr.push(res);
      }
    }
    return new_arr;
  } else if (node.nodeName === "#text") ;
  else if (node.nodeName === "key") {
    if (isEmptyNode(node)) {
      return "";
    }
    invariant(
      node.childNodes[0].nodeValue !== "__proto__",
      "__proto__ keys can lead to prototype pollution. More details on CVE-2022-22912"
    );
    return node.childNodes[0].nodeValue;
  } else if (node.nodeName === "string") {
    res = "";
    if (isEmptyNode(node)) {
      return res;
    }
    for (i = 0; i < node.childNodes.length; i++) {
      var type2 = node.childNodes[i].nodeType;
      if (type2 === TEXT_NODE || type2 === CDATA_NODE) {
        res += node.childNodes[i].nodeValue;
      }
    }
    return res;
  } else if (node.nodeName === "integer") {
    invariant(
      !isEmptyNode(node),
      'Cannot parse "" as integer.'
    );
    return parseInt(node.childNodes[0].nodeValue, 10);
  } else if (node.nodeName === "real") {
    invariant(
      !isEmptyNode(node),
      'Cannot parse "" as real.'
    );
    res = "";
    for (i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].nodeType === TEXT_NODE) {
        res += node.childNodes[i].nodeValue;
      }
    }
    return parseFloat(res);
  } else if (node.nodeName === "data") {
    res = "";
    if (isEmptyNode(node)) {
      return Buffer.from(res, "base64");
    }
    for (i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].nodeType === TEXT_NODE) {
        res += node.childNodes[i].nodeValue.replace(/\s+/g, "");
      }
    }
    return Buffer.from(res, "base64");
  } else if (node.nodeName === "date") {
    invariant(
      !isEmptyNode(node),
      'Cannot parse "" as Date.'
    );
    return new Date(node.childNodes[0].nodeValue);
  } else if (node.nodeName === "null") {
    return null;
  } else if (node.nodeName === "true") {
    return true;
  } else if (node.nodeName === "false") {
    return false;
  } else {
    throw new Error("Invalid PLIST tag " + node.nodeName);
  }
}
var build$1 = {};
var base64Js = {};
base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
    );
  }
  return parts.join("");
}
var lib = {};
var Utility = {};
var hasRequiredUtility;
function requireUtility() {
  if (hasRequiredUtility) return Utility;
  hasRequiredUtility = 1;
  (function() {
    var assign2, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject, hasProp = {}.hasOwnProperty;
    assign2 = function(target, ...sources) {
      var i, key, len, source2;
      if (isFunction(Object.assign)) {
        Object.assign.apply(null, arguments);
      } else {
        for (i = 0, len = sources.length; i < len; i++) {
          source2 = sources[i];
          if (source2 != null) {
            for (key in source2) {
              if (!hasProp.call(source2, key)) continue;
              target[key] = source2[key];
            }
          }
        }
      }
      return target;
    };
    isFunction = function(val) {
      return !!val && Object.prototype.toString.call(val) === "[object Function]";
    };
    isObject = function(val) {
      var ref2;
      return !!val && ((ref2 = typeof val) === "function" || ref2 === "object");
    };
    isArray = function(val) {
      if (isFunction(Array.isArray)) {
        return Array.isArray(val);
      } else {
        return Object.prototype.toString.call(val) === "[object Array]";
      }
    };
    isEmpty = function(val) {
      var key;
      if (isArray(val)) {
        return !val.length;
      } else {
        for (key in val) {
          if (!hasProp.call(val, key)) continue;
          return false;
        }
        return true;
      }
    };
    isPlainObject = function(val) {
      var ctor, proto;
      return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && typeof ctor === "function" && ctor instanceof ctor && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
    };
    getValue = function(obj) {
      if (isFunction(obj.valueOf)) {
        return obj.valueOf();
      } else {
        return obj;
      }
    };
    Utility.assign = assign2;
    Utility.isFunction = isFunction;
    Utility.isObject = isObject;
    Utility.isArray = isArray;
    Utility.isEmpty = isEmpty;
    Utility.isPlainObject = isPlainObject;
    Utility.getValue = getValue;
  }).call(commonjsGlobal);
  return Utility;
}
var XMLDOMImplementation = { exports: {} };
var hasRequiredXMLDOMImplementation;
function requireXMLDOMImplementation() {
  if (hasRequiredXMLDOMImplementation) return XMLDOMImplementation.exports;
  hasRequiredXMLDOMImplementation = 1;
  (function() {
    XMLDOMImplementation.exports = class XMLDOMImplementation {
      // Tests if the DOM implementation implements a specific feature.
      // `feature` package name of the feature to test. In Level 1, the
      //           legal values are "HTML" and "XML" (case-insensitive).
      // `version` version number of the package name to test. 
      //           In Level 1, this is the string "1.0". If the version is 
      //           not specified, supporting any version of the feature will 
      //           cause the method to return true.
      hasFeature(feature, version) {
        return true;
      }
      // Creates a new document type declaration.
      // `qualifiedName` qualified name of the document type to be created
      // `publicId` public identifier of the external subset
      // `systemId` system identifier of the external subset
      createDocumentType(qualifiedName, publicId, systemId) {
        throw new Error("This DOM method is not implemented.");
      }
      // Creates a new document.
      // `namespaceURI` namespace URI of the document element to create
      // `qualifiedName` the qualified name of the document to be created
      // `doctype` the type of document to be created or null
      createDocument(namespaceURI, qualifiedName, doctype) {
        throw new Error("This DOM method is not implemented.");
      }
      // Creates a new HTML document.
      // `title` document title
      createHTMLDocument(title2) {
        throw new Error("This DOM method is not implemented.");
      }
      // Returns a specialized object which implements the specialized APIs 
      // of the specified feature and version.
      // `feature` name of the feature requested.
      // `version` version number of the feature to test
      getFeature(feature, version) {
        throw new Error("This DOM method is not implemented.");
      }
    };
  }).call(commonjsGlobal);
  return XMLDOMImplementation.exports;
}
var XMLDocument = { exports: {} };
var XMLDOMConfiguration = { exports: {} };
var XMLDOMErrorHandler = { exports: {} };
var hasRequiredXMLDOMErrorHandler;
function requireXMLDOMErrorHandler() {
  if (hasRequiredXMLDOMErrorHandler) return XMLDOMErrorHandler.exports;
  hasRequiredXMLDOMErrorHandler = 1;
  (function() {
    XMLDOMErrorHandler.exports = class XMLDOMErrorHandler {
      // Initializes a new instance of `XMLDOMErrorHandler`
      constructor() {
      }
      // Called on the error handler when an error occurs.
      // `error` the error message as a string
      handleError(error2) {
        throw new Error(error2);
      }
    };
  }).call(commonjsGlobal);
  return XMLDOMErrorHandler.exports;
}
var XMLDOMStringList = { exports: {} };
var hasRequiredXMLDOMStringList;
function requireXMLDOMStringList() {
  if (hasRequiredXMLDOMStringList) return XMLDOMStringList.exports;
  hasRequiredXMLDOMStringList = 1;
  (function() {
    XMLDOMStringList.exports = (function() {
      class XMLDOMStringList2 {
        // Initializes a new instance of `XMLDOMStringList`
        // This is just a wrapper around an ordinary
        // JS array.
        // `arr` the array of string values
        constructor(arr) {
          this.arr = arr || [];
        }
        // Returns the indexth item in the collection.
        // `index` index into the collection
        item(index) {
          return this.arr[index] || null;
        }
        // Test if a string is part of this DOMStringList.
        // `str` the string to look for
        contains(str) {
          return this.arr.indexOf(str) !== -1;
        }
      }
      Object.defineProperty(XMLDOMStringList2.prototype, "length", {
        get: function() {
          return this.arr.length;
        }
      });
      return XMLDOMStringList2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLDOMStringList.exports;
}
var hasRequiredXMLDOMConfiguration;
function requireXMLDOMConfiguration() {
  if (hasRequiredXMLDOMConfiguration) return XMLDOMConfiguration.exports;
  hasRequiredXMLDOMConfiguration = 1;
  (function() {
    var XMLDOMErrorHandler2, XMLDOMStringList2;
    XMLDOMErrorHandler2 = requireXMLDOMErrorHandler();
    XMLDOMStringList2 = requireXMLDOMStringList();
    XMLDOMConfiguration.exports = (function() {
      class XMLDOMConfiguration2 {
        constructor() {
          this.defaultParams = {
            "canonical-form": false,
            "cdata-sections": false,
            "comments": false,
            "datatype-normalization": false,
            "element-content-whitespace": true,
            "entities": true,
            "error-handler": new XMLDOMErrorHandler2(),
            "infoset": true,
            "validate-if-schema": false,
            "namespaces": true,
            "namespace-declarations": true,
            "normalize-characters": false,
            "schema-location": "",
            "schema-type": "",
            "split-cdata-sections": true,
            "validate": false,
            "well-formed": true
          };
          this.params = Object.create(this.defaultParams);
        }
        // Gets the value of a parameter.
        // `name` name of the parameter
        getParameter(name) {
          if (this.params.hasOwnProperty(name)) {
            return this.params[name];
          } else {
            return null;
          }
        }
        // Checks if setting a parameter to a specific value is supported.
        // `name` name of the parameter
        // `value` parameter value
        canSetParameter(name, value) {
          return true;
        }
        // Sets the value of a parameter.
        // `name` name of the parameter
        // `value` new value or null if the user wishes to unset the parameter
        setParameter(name, value) {
          if (value != null) {
            return this.params[name] = value;
          } else {
            return delete this.params[name];
          }
        }
      }
      Object.defineProperty(XMLDOMConfiguration2.prototype, "parameterNames", {
        get: function() {
          return new XMLDOMStringList2(Object.keys(this.defaultParams));
        }
      });
      return XMLDOMConfiguration2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLDOMConfiguration.exports;
}
var XMLNode = { exports: {} };
var XMLElement = { exports: {} };
var NodeType = { exports: {} };
var hasRequiredNodeType;
function requireNodeType() {
  if (hasRequiredNodeType) return NodeType.exports;
  hasRequiredNodeType = 1;
  (function() {
    NodeType.exports = {
      Element: 1,
      Attribute: 2,
      Text: 3,
      CData: 4,
      EntityReference: 5,
      EntityDeclaration: 6,
      ProcessingInstruction: 7,
      Comment: 8,
      Document: 9,
      DocType: 10,
      DocumentFragment: 11,
      NotationDeclaration: 12,
      // Numeric codes up to 200 are reserved to W3C for possible future use.
      // Following are types internal to this library:
      Declaration: 201,
      Raw: 202,
      AttributeDeclaration: 203,
      ElementDeclaration: 204,
      Dummy: 205
    };
  }).call(commonjsGlobal);
  return NodeType.exports;
}
var XMLAttribute = { exports: {} };
var hasRequiredXMLAttribute;
function requireXMLAttribute() {
  if (hasRequiredXMLAttribute) return XMLAttribute.exports;
  hasRequiredXMLAttribute = 1;
  (function() {
    var NodeType2;
    NodeType2 = requireNodeType();
    requireXMLNode();
    XMLAttribute.exports = (function() {
      class XMLAttribute2 {
        // Initializes a new instance of `XMLAttribute`
        // `parent` the parent node
        // `name` attribute target
        // `value` attribute value
        constructor(parent, name, value) {
          this.parent = parent;
          if (this.parent) {
            this.options = this.parent.options;
            this.stringify = this.parent.stringify;
          }
          if (name == null) {
            throw new Error("Missing attribute name. " + this.debugInfo(name));
          }
          this.name = this.stringify.name(name);
          this.value = this.stringify.attValue(value);
          this.type = NodeType2.Attribute;
          this.isId = false;
          this.schemaTypeInfo = null;
        }
        // Creates and returns a deep clone of `this`
        clone() {
          return Object.create(this);
        }
        // Converts the XML fragment to string
        // `options.pretty` pretty prints the result
        // `options.indent` indentation for pretty print
        // `options.offset` how many indentations to add to every line for pretty print
        // `options.newline` newline sequence for pretty print
        toString(options) {
          return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
        }
        // Returns debug string for this node
        debugInfo(name) {
          name = name || this.name;
          if (name == null) {
            return "parent: <" + this.parent.name + ">";
          } else {
            return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
          }
        }
        isEqualNode(node) {
          if (node.namespaceURI !== this.namespaceURI) {
            return false;
          }
          if (node.prefix !== this.prefix) {
            return false;
          }
          if (node.localName !== this.localName) {
            return false;
          }
          if (node.value !== this.value) {
            return false;
          }
          return true;
        }
      }
      Object.defineProperty(XMLAttribute2.prototype, "nodeType", {
        get: function() {
          return this.type;
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "ownerElement", {
        get: function() {
          return this.parent;
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "textContent", {
        get: function() {
          return this.value;
        },
        set: function(value) {
          return this.value = value || "";
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "namespaceURI", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "prefix", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "localName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "specified", {
        get: function() {
          return true;
        }
      });
      return XMLAttribute2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLAttribute.exports;
}
var XMLNamedNodeMap = { exports: {} };
var hasRequiredXMLNamedNodeMap;
function requireXMLNamedNodeMap() {
  if (hasRequiredXMLNamedNodeMap) return XMLNamedNodeMap.exports;
  hasRequiredXMLNamedNodeMap = 1;
  (function() {
    XMLNamedNodeMap.exports = (function() {
      class XMLNamedNodeMap2 {
        // Initializes a new instance of `XMLNamedNodeMap`
        // This is just a wrapper around an ordinary
        // JS object.
        // `nodes` the object containing nodes.
        constructor(nodes) {
          this.nodes = nodes;
        }
        // Creates and returns a deep clone of `this`
        clone() {
          return this.nodes = null;
        }
        // DOM Level 1
        getNamedItem(name) {
          return this.nodes[name];
        }
        setNamedItem(node) {
          var oldNode;
          oldNode = this.nodes[node.nodeName];
          this.nodes[node.nodeName] = node;
          return oldNode || null;
        }
        removeNamedItem(name) {
          var oldNode;
          oldNode = this.nodes[name];
          delete this.nodes[name];
          return oldNode || null;
        }
        item(index) {
          return this.nodes[Object.keys(this.nodes)[index]] || null;
        }
        // DOM level 2 functions to be implemented later
        getNamedItemNS(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented.");
        }
        setNamedItemNS(node) {
          throw new Error("This DOM method is not implemented.");
        }
        removeNamedItemNS(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented.");
        }
      }
      Object.defineProperty(XMLNamedNodeMap2.prototype, "length", {
        get: function() {
          return Object.keys(this.nodes).length || 0;
        }
      });
      return XMLNamedNodeMap2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLNamedNodeMap.exports;
}
var hasRequiredXMLElement;
function requireXMLElement() {
  if (hasRequiredXMLElement) return XMLElement.exports;
  hasRequiredXMLElement = 1;
  (function() {
    var NodeType2, XMLAttribute2, XMLNamedNodeMap2, XMLNode2, getValue, isFunction, isObject, hasProp = {}.hasOwnProperty;
    ({ isObject, isFunction, getValue } = requireUtility());
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLAttribute2 = requireXMLAttribute();
    XMLNamedNodeMap2 = requireXMLNamedNodeMap();
    XMLElement.exports = (function() {
      class XMLElement2 extends XMLNode2 {
        // Initializes a new instance of `XMLElement`
        // `parent` the parent node
        // `name` element name
        // `attributes` an object containing name/value pairs of attributes
        constructor(parent, name, attributes) {
          var child, j, len, ref2;
          super(parent);
          if (name == null) {
            throw new Error("Missing element name. " + this.debugInfo());
          }
          this.name = this.stringify.name(name);
          this.type = NodeType2.Element;
          this.attribs = {};
          this.schemaTypeInfo = null;
          if (attributes != null) {
            this.attribute(attributes);
          }
          if (parent.type === NodeType2.Document) {
            this.isRoot = true;
            this.documentObject = parent;
            parent.rootObject = this;
            if (parent.children) {
              ref2 = parent.children;
              for (j = 0, len = ref2.length; j < len; j++) {
                child = ref2[j];
                if (child.type === NodeType2.DocType) {
                  child.name = this.name;
                  break;
                }
              }
            }
          }
        }
        // Creates and returns a deep clone of `this`
        clone() {
          var att, attName, clonedSelf, ref2;
          clonedSelf = Object.create(this);
          if (clonedSelf.isRoot) {
            clonedSelf.documentObject = null;
          }
          clonedSelf.attribs = {};
          ref2 = this.attribs;
          for (attName in ref2) {
            if (!hasProp.call(ref2, attName)) continue;
            att = ref2[attName];
            clonedSelf.attribs[attName] = att.clone();
          }
          clonedSelf.children = [];
          this.children.forEach(function(child) {
            var clonedChild;
            clonedChild = child.clone();
            clonedChild.parent = clonedSelf;
            return clonedSelf.children.push(clonedChild);
          });
          return clonedSelf;
        }
        // Adds or modifies an attribute
        // `name` attribute name
        // `value` attribute value
        attribute(name, value) {
          var attName, attValue;
          if (name != null) {
            name = getValue(name);
          }
          if (isObject(name)) {
            for (attName in name) {
              if (!hasProp.call(name, attName)) continue;
              attValue = name[attName];
              this.attribute(attName, attValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            if (this.options.keepNullAttributes && value == null) {
              this.attribs[name] = new XMLAttribute2(this, name, "");
            } else if (value != null) {
              this.attribs[name] = new XMLAttribute2(this, name, value);
            }
          }
          return this;
        }
        // Removes an attribute
        // `name` attribute name
        removeAttribute(name) {
          var attName, j, len;
          if (name == null) {
            throw new Error("Missing attribute name. " + this.debugInfo());
          }
          name = getValue(name);
          if (Array.isArray(name)) {
            for (j = 0, len = name.length; j < len; j++) {
              attName = name[j];
              delete this.attribs[attName];
            }
          } else {
            delete this.attribs[name];
          }
          return this;
        }
        // Converts the XML fragment to string
        // `options.pretty` pretty prints the result
        // `options.indent` indentation for pretty print
        // `options.offset` how many indentations to add to every line for pretty print
        // `options.newline` newline sequence for pretty print
        // `options.allowEmpty` do not self close empty element tags
        toString(options) {
          return this.options.writer.element(this, this.options.writer.filterOptions(options));
        }
        // Aliases
        att(name, value) {
          return this.attribute(name, value);
        }
        a(name, value) {
          return this.attribute(name, value);
        }
        // DOM Level 1
        getAttribute(name) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name].value;
          } else {
            return null;
          }
        }
        setAttribute(name, value) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        getAttributeNode(name) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name];
          } else {
            return null;
          }
        }
        setAttributeNode(newAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        removeAttributeNode(oldAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        getElementsByTagName(name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        // DOM Level 2
        getAttributeNS(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        setAttributeNS(namespaceURI, qualifiedName, value) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        removeAttributeNS(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        getAttributeNodeNS(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        setAttributeNodeNS(newAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        getElementsByTagNameNS(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        hasAttribute(name) {
          return this.attribs.hasOwnProperty(name);
        }
        hasAttributeNS(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        // DOM Level 3
        setIdAttribute(name, isId) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name].isId;
          } else {
            return isId;
          }
        }
        setIdAttributeNS(namespaceURI, localName, isId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        setIdAttributeNode(idAttr, isId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        // DOM Level 4
        getElementsByTagName(tagname) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        getElementsByTagNameNS(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        getElementsByClassName(classNames) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        isEqualNode(node) {
          var i, j, ref2;
          if (!super.isEqualNode(node)) {
            return false;
          }
          if (node.namespaceURI !== this.namespaceURI) {
            return false;
          }
          if (node.prefix !== this.prefix) {
            return false;
          }
          if (node.localName !== this.localName) {
            return false;
          }
          if (node.attribs.length !== this.attribs.length) {
            return false;
          }
          for (i = j = 0, ref2 = this.attribs.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
            if (!this.attribs[i].isEqualNode(node.attribs[i])) {
              return false;
            }
          }
          return true;
        }
      }
      Object.defineProperty(XMLElement2.prototype, "tagName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLElement2.prototype, "namespaceURI", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLElement2.prototype, "prefix", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLElement2.prototype, "localName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLElement2.prototype, "id", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLElement2.prototype, "className", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLElement2.prototype, "classList", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLElement2.prototype, "attributes", {
        get: function() {
          if (!this.attributeMap || !this.attributeMap.nodes) {
            this.attributeMap = new XMLNamedNodeMap2(this.attribs);
          }
          return this.attributeMap;
        }
      });
      return XMLElement2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLElement.exports;
}
var XMLCData = { exports: {} };
var XMLCharacterData = { exports: {} };
var hasRequiredXMLCharacterData;
function requireXMLCharacterData() {
  if (hasRequiredXMLCharacterData) return XMLCharacterData.exports;
  hasRequiredXMLCharacterData = 1;
  (function() {
    var XMLNode2;
    XMLNode2 = requireXMLNode();
    XMLCharacterData.exports = (function() {
      class XMLCharacterData2 extends XMLNode2 {
        // Initializes a new instance of `XMLCharacterData`
        constructor(parent) {
          super(parent);
          this.value = "";
        }
        // Creates and returns a deep clone of `this`
        clone() {
          return Object.create(this);
        }
        // DOM level 1 functions to be implemented later
        substringData(offset, count) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        appendData(arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        insertData(offset, arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        deleteData(offset, count) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        replaceData(offset, count, arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        isEqualNode(node) {
          if (!super.isEqualNode(node)) {
            return false;
          }
          if (node.data !== this.data) {
            return false;
          }
          return true;
        }
      }
      Object.defineProperty(XMLCharacterData2.prototype, "data", {
        get: function() {
          return this.value;
        },
        set: function(value) {
          return this.value = value || "";
        }
      });
      Object.defineProperty(XMLCharacterData2.prototype, "length", {
        get: function() {
          return this.value.length;
        }
      });
      Object.defineProperty(XMLCharacterData2.prototype, "textContent", {
        get: function() {
          return this.value;
        },
        set: function(value) {
          return this.value = value || "";
        }
      });
      return XMLCharacterData2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLCharacterData.exports;
}
var hasRequiredXMLCData;
function requireXMLCData() {
  if (hasRequiredXMLCData) return XMLCData.exports;
  hasRequiredXMLCData = 1;
  (function() {
    var NodeType2, XMLCharacterData2;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLCData.exports = class XMLCData extends XMLCharacterData2 {
      // Initializes a new instance of `XMLCData`
      // `text` CDATA text
      constructor(parent, text) {
        super(parent);
        if (text == null) {
          throw new Error("Missing CDATA text. " + this.debugInfo());
        }
        this.name = "#cdata-section";
        this.type = NodeType2.CData;
        this.value = this.stringify.cdata(text);
      }
      // Creates and returns a deep clone of `this`
      clone() {
        return Object.create(this);
      }
      // Converts the XML fragment to string
      // `options.pretty` pretty prints the result
      // `options.indent` indentation for pretty print
      // `options.offset` how many indentations to add to every line for pretty print
      // `options.newline` newline sequence for pretty print
      toString(options) {
        return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
      }
    };
  }).call(commonjsGlobal);
  return XMLCData.exports;
}
var XMLComment = { exports: {} };
var hasRequiredXMLComment;
function requireXMLComment() {
  if (hasRequiredXMLComment) return XMLComment.exports;
  hasRequiredXMLComment = 1;
  (function() {
    var NodeType2, XMLCharacterData2;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLComment.exports = class XMLComment extends XMLCharacterData2 {
      // Initializes a new instance of `XMLComment`
      // `text` comment text
      constructor(parent, text) {
        super(parent);
        if (text == null) {
          throw new Error("Missing comment text. " + this.debugInfo());
        }
        this.name = "#comment";
        this.type = NodeType2.Comment;
        this.value = this.stringify.comment(text);
      }
      // Creates and returns a deep clone of `this`
      clone() {
        return Object.create(this);
      }
      // Converts the XML fragment to string
      // `options.pretty` pretty prints the result
      // `options.indent` indentation for pretty print
      // `options.offset` how many indentations to add to every line for pretty print
      // `options.newline` newline sequence for pretty print
      toString(options) {
        return this.options.writer.comment(this, this.options.writer.filterOptions(options));
      }
    };
  }).call(commonjsGlobal);
  return XMLComment.exports;
}
var XMLDeclaration = { exports: {} };
var hasRequiredXMLDeclaration;
function requireXMLDeclaration() {
  if (hasRequiredXMLDeclaration) return XMLDeclaration.exports;
  hasRequiredXMLDeclaration = 1;
  (function() {
    var NodeType2, XMLNode2, isObject;
    ({ isObject } = requireUtility());
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDeclaration.exports = class XMLDeclaration extends XMLNode2 {
      // Initializes a new instance of `XMLDeclaration`
      // `parent` the document object
      // `version` A version number string, e.g. 1.0
      // `encoding` Encoding declaration, e.g. UTF-8
      // `standalone` standalone document declaration: true or false
      constructor(parent, version, encoding, standalone) {
        super(parent);
        if (isObject(version)) {
          ({ version, encoding, standalone } = version);
        }
        if (!version) {
          version = "1.0";
        }
        this.type = NodeType2.Declaration;
        this.version = this.stringify.xmlVersion(version);
        if (encoding != null) {
          this.encoding = this.stringify.xmlEncoding(encoding);
        }
        if (standalone != null) {
          this.standalone = this.stringify.xmlStandalone(standalone);
        }
      }
      // Converts to string
      // `options.pretty` pretty prints the result
      // `options.indent` indentation for pretty print
      // `options.offset` how many indentations to add to every line for pretty print
      // `options.newline` newline sequence for pretty print
      toString(options) {
        return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
      }
    };
  }).call(commonjsGlobal);
  return XMLDeclaration.exports;
}
var XMLDocType = { exports: {} };
var XMLDTDAttList = { exports: {} };
var hasRequiredXMLDTDAttList;
function requireXMLDTDAttList() {
  if (hasRequiredXMLDTDAttList) return XMLDTDAttList.exports;
  hasRequiredXMLDTDAttList = 1;
  (function() {
    var NodeType2, XMLNode2;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDAttList.exports = class XMLDTDAttList extends XMLNode2 {
      // Initializes a new instance of `XMLDTDAttList`
      // `parent` the parent `XMLDocType` element
      // `elementName` the name of the element containing this attribute
      // `attributeName` attribute name
      // `attributeType` type of the attribute
      // `defaultValueType` default value type (either #REQUIRED, #IMPLIED,
      //                    #FIXED or #DEFAULT)
      // `defaultValue` default value of the attribute
      //                (only used for #FIXED or #DEFAULT)
      constructor(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        super(parent);
        if (elementName == null) {
          throw new Error("Missing DTD element name. " + this.debugInfo());
        }
        if (attributeName == null) {
          throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
        }
        if (!attributeType) {
          throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
        }
        if (!defaultValueType) {
          throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
        }
        if (defaultValueType.indexOf("#") !== 0) {
          defaultValueType = "#" + defaultValueType;
        }
        if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
          throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
        }
        if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
          throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
        }
        this.elementName = this.stringify.name(elementName);
        this.type = NodeType2.AttributeDeclaration;
        this.attributeName = this.stringify.name(attributeName);
        this.attributeType = this.stringify.dtdAttType(attributeType);
        if (defaultValue) {
          this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
        }
        this.defaultValueType = defaultValueType;
      }
      // Converts the XML fragment to string
      // `options.pretty` pretty prints the result
      // `options.indent` indentation for pretty print
      // `options.offset` how many indentations to add to every line for pretty print
      // `options.newline` newline sequence for pretty print
      toString(options) {
        return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
      }
    };
  }).call(commonjsGlobal);
  return XMLDTDAttList.exports;
}
var XMLDTDEntity = { exports: {} };
var hasRequiredXMLDTDEntity;
function requireXMLDTDEntity() {
  if (hasRequiredXMLDTDEntity) return XMLDTDEntity.exports;
  hasRequiredXMLDTDEntity = 1;
  (function() {
    var NodeType2, XMLNode2, isObject;
    ({ isObject } = requireUtility());
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDEntity.exports = (function() {
      class XMLDTDEntity2 extends XMLNode2 {
        // Initializes a new instance of `XMLDTDEntity`
        // `parent` the parent `XMLDocType` element
        // `pe` whether this is a parameter entity or a general entity
        //      defaults to `false` (general entity)
        // `name` the name of the entity
        // `value` internal entity value or an object with external entity details
        // `value.pubID` public identifier
        // `value.sysID` system identifier
        // `value.nData` notation declaration
        constructor(parent, pe, name, value) {
          super(parent);
          if (name == null) {
            throw new Error("Missing DTD entity name. " + this.debugInfo(name));
          }
          if (value == null) {
            throw new Error("Missing DTD entity value. " + this.debugInfo(name));
          }
          this.pe = !!pe;
          this.name = this.stringify.name(name);
          this.type = NodeType2.EntityDeclaration;
          if (!isObject(value)) {
            this.value = this.stringify.dtdEntityValue(value);
            this.internal = true;
          } else {
            if (!value.pubID && !value.sysID) {
              throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
            }
            if (value.pubID && !value.sysID) {
              throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
            }
            this.internal = false;
            if (value.pubID != null) {
              this.pubID = this.stringify.dtdPubID(value.pubID);
            }
            if (value.sysID != null) {
              this.sysID = this.stringify.dtdSysID(value.sysID);
            }
            if (value.nData != null) {
              this.nData = this.stringify.dtdNData(value.nData);
            }
            if (this.pe && this.nData) {
              throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
            }
          }
        }
        // Converts the XML fragment to string
        // `options.pretty` pretty prints the result
        // `options.indent` indentation for pretty print
        // `options.offset` how many indentations to add to every line for pretty print
        // `options.newline` newline sequence for pretty print
        toString(options) {
          return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
        }
      }
      Object.defineProperty(XMLDTDEntity2.prototype, "publicId", {
        get: function() {
          return this.pubID;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "systemId", {
        get: function() {
          return this.sysID;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "notationName", {
        get: function() {
          return this.nData || null;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "inputEncoding", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "xmlEncoding", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "xmlVersion", {
        get: function() {
          return null;
        }
      });
      return XMLDTDEntity2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLDTDEntity.exports;
}
var XMLDTDElement = { exports: {} };
var hasRequiredXMLDTDElement;
function requireXMLDTDElement() {
  if (hasRequiredXMLDTDElement) return XMLDTDElement.exports;
  hasRequiredXMLDTDElement = 1;
  (function() {
    var NodeType2, XMLNode2;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDElement.exports = class XMLDTDElement extends XMLNode2 {
      // Initializes a new instance of `XMLDTDElement`
      // `parent` the parent `XMLDocType` element
      // `name` element name
      // `value` element content (defaults to #PCDATA)
      constructor(parent, name, value) {
        super(parent);
        if (name == null) {
          throw new Error("Missing DTD element name. " + this.debugInfo());
        }
        if (!value) {
          value = "(#PCDATA)";
        }
        if (Array.isArray(value)) {
          value = "(" + value.join(",") + ")";
        }
        this.name = this.stringify.name(name);
        this.type = NodeType2.ElementDeclaration;
        this.value = this.stringify.dtdElementValue(value);
      }
      // Converts the XML fragment to string
      // `options.pretty` pretty prints the result
      // `options.indent` indentation for pretty print
      // `options.offset` how many indentations to add to every line for pretty print
      // `options.newline` newline sequence for pretty print
      toString(options) {
        return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
      }
    };
  }).call(commonjsGlobal);
  return XMLDTDElement.exports;
}
var XMLDTDNotation = { exports: {} };
var hasRequiredXMLDTDNotation;
function requireXMLDTDNotation() {
  if (hasRequiredXMLDTDNotation) return XMLDTDNotation.exports;
  hasRequiredXMLDTDNotation = 1;
  (function() {
    var NodeType2, XMLNode2;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDNotation.exports = (function() {
      class XMLDTDNotation2 extends XMLNode2 {
        // Initializes a new instance of `XMLDTDNotation`
        // `parent` the parent `XMLDocType` element
        // `name` the name of the notation
        // `value` an object with external entity details
        // `value.pubID` public identifier
        // `value.sysID` system identifier
        constructor(parent, name, value) {
          super(parent);
          if (name == null) {
            throw new Error("Missing DTD notation name. " + this.debugInfo(name));
          }
          if (!value.pubID && !value.sysID) {
            throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
          }
          this.name = this.stringify.name(name);
          this.type = NodeType2.NotationDeclaration;
          if (value.pubID != null) {
            this.pubID = this.stringify.dtdPubID(value.pubID);
          }
          if (value.sysID != null) {
            this.sysID = this.stringify.dtdSysID(value.sysID);
          }
        }
        // Converts the XML fragment to string
        // `options.pretty` pretty prints the result
        // `options.indent` indentation for pretty print
        // `options.offset` how many indentations to add to every line for pretty print
        // `options.newline` newline sequence for pretty print
        toString(options) {
          return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
        }
      }
      Object.defineProperty(XMLDTDNotation2.prototype, "publicId", {
        get: function() {
          return this.pubID;
        }
      });
      Object.defineProperty(XMLDTDNotation2.prototype, "systemId", {
        get: function() {
          return this.sysID;
        }
      });
      return XMLDTDNotation2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLDTDNotation.exports;
}
var hasRequiredXMLDocType;
function requireXMLDocType() {
  if (hasRequiredXMLDocType) return XMLDocType.exports;
  hasRequiredXMLDocType = 1;
  (function() {
    var NodeType2, XMLDTDAttList2, XMLDTDElement2, XMLDTDEntity2, XMLDTDNotation2, XMLNamedNodeMap2, XMLNode2, isObject;
    ({ isObject } = requireUtility());
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDAttList2 = requireXMLDTDAttList();
    XMLDTDEntity2 = requireXMLDTDEntity();
    XMLDTDElement2 = requireXMLDTDElement();
    XMLDTDNotation2 = requireXMLDTDNotation();
    XMLNamedNodeMap2 = requireXMLNamedNodeMap();
    XMLDocType.exports = (function() {
      class XMLDocType2 extends XMLNode2 {
        // Initializes a new instance of `XMLDocType`
        // `parent` the document object
        // `pubID` public identifier of the external subset
        // `sysID` system identifier of the external subset
        constructor(parent, pubID, sysID) {
          var child, i, len, ref2;
          super(parent);
          this.type = NodeType2.DocType;
          if (parent.children) {
            ref2 = parent.children;
            for (i = 0, len = ref2.length; i < len; i++) {
              child = ref2[i];
              if (child.type === NodeType2.Element) {
                this.name = child.name;
                break;
              }
            }
          }
          this.documentObject = parent;
          if (isObject(pubID)) {
            ({ pubID, sysID } = pubID);
          }
          if (sysID == null) {
            [sysID, pubID] = [pubID, sysID];
          }
          if (pubID != null) {
            this.pubID = this.stringify.dtdPubID(pubID);
          }
          if (sysID != null) {
            this.sysID = this.stringify.dtdSysID(sysID);
          }
        }
        // Creates an element type declaration
        // `name` element name
        // `value` element content (defaults to #PCDATA)
        element(name, value) {
          var child;
          child = new XMLDTDElement2(this, name, value);
          this.children.push(child);
          return this;
        }
        // Creates an attribute declaration
        // `elementName` the name of the element containing this attribute
        // `attributeName` attribute name
        // `attributeType` type of the attribute (defaults to CDATA)
        // `defaultValueType` default value type (either #REQUIRED, #IMPLIED, #FIXED or
        //                    #DEFAULT) (defaults to #IMPLIED)
        // `defaultValue` default value of the attribute
        //                (only used for #FIXED or #DEFAULT)
        attList(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          var child;
          child = new XMLDTDAttList2(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
          this.children.push(child);
          return this;
        }
        // Creates a general entity declaration
        // `name` the name of the entity
        // `value` internal entity value or an object with external entity details
        // `value.pubID` public identifier
        // `value.sysID` system identifier
        // `value.nData` notation declaration
        entity(name, value) {
          var child;
          child = new XMLDTDEntity2(this, false, name, value);
          this.children.push(child);
          return this;
        }
        // Creates a parameter entity declaration
        // `name` the name of the entity
        // `value` internal entity value or an object with external entity details
        // `value.pubID` public identifier
        // `value.sysID` system identifier
        pEntity(name, value) {
          var child;
          child = new XMLDTDEntity2(this, true, name, value);
          this.children.push(child);
          return this;
        }
        // Creates a NOTATION declaration
        // `name` the name of the notation
        // `value` an object with external entity details
        // `value.pubID` public identifier
        // `value.sysID` system identifier
        notation(name, value) {
          var child;
          child = new XMLDTDNotation2(this, name, value);
          this.children.push(child);
          return this;
        }
        // Converts to string
        // `options.pretty` pretty prints the result
        // `options.indent` indentation for pretty print
        // `options.offset` how many indentations to add to every line for pretty print
        // `options.newline` newline sequence for pretty print
        toString(options) {
          return this.options.writer.docType(this, this.options.writer.filterOptions(options));
        }
        // Aliases
        ele(name, value) {
          return this.element(name, value);
        }
        att(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
        }
        ent(name, value) {
          return this.entity(name, value);
        }
        pent(name, value) {
          return this.pEntity(name, value);
        }
        not(name, value) {
          return this.notation(name, value);
        }
        up() {
          return this.root() || this.documentObject;
        }
        isEqualNode(node) {
          if (!super.isEqualNode(node)) {
            return false;
          }
          if (node.name !== this.name) {
            return false;
          }
          if (node.publicId !== this.publicId) {
            return false;
          }
          if (node.systemId !== this.systemId) {
            return false;
          }
          return true;
        }
      }
      Object.defineProperty(XMLDocType2.prototype, "entities", {
        get: function() {
          var child, i, len, nodes, ref2;
          nodes = {};
          ref2 = this.children;
          for (i = 0, len = ref2.length; i < len; i++) {
            child = ref2[i];
            if (child.type === NodeType2.EntityDeclaration && !child.pe) {
              nodes[child.name] = child;
            }
          }
          return new XMLNamedNodeMap2(nodes);
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "notations", {
        get: function() {
          var child, i, len, nodes, ref2;
          nodes = {};
          ref2 = this.children;
          for (i = 0, len = ref2.length; i < len; i++) {
            child = ref2[i];
            if (child.type === NodeType2.NotationDeclaration) {
              nodes[child.name] = child;
            }
          }
          return new XMLNamedNodeMap2(nodes);
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "publicId", {
        get: function() {
          return this.pubID;
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "systemId", {
        get: function() {
          return this.sysID;
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "internalSubset", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      return XMLDocType2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLDocType.exports;
}
var XMLRaw = { exports: {} };
var hasRequiredXMLRaw;
function requireXMLRaw() {
  if (hasRequiredXMLRaw) return XMLRaw.exports;
  hasRequiredXMLRaw = 1;
  (function() {
    var NodeType2, XMLNode2;
    NodeType2 = requireNodeType();
    XMLNode2 = requireXMLNode();
    XMLRaw.exports = class XMLRaw extends XMLNode2 {
      // Initializes a new instance of `XMLRaw`
      // `text` raw text
      constructor(parent, text) {
        super(parent);
        if (text == null) {
          throw new Error("Missing raw text. " + this.debugInfo());
        }
        this.type = NodeType2.Raw;
        this.value = this.stringify.raw(text);
      }
      // Creates and returns a deep clone of `this`
      clone() {
        return Object.create(this);
      }
      // Converts the XML fragment to string
      // `options.pretty` pretty prints the result
      // `options.indent` indentation for pretty print
      // `options.offset` how many indentations to add to every line for pretty print
      // `options.newline` newline sequence for pretty print
      toString(options) {
        return this.options.writer.raw(this, this.options.writer.filterOptions(options));
      }
    };
  }).call(commonjsGlobal);
  return XMLRaw.exports;
}
var XMLText = { exports: {} };
var hasRequiredXMLText;
function requireXMLText() {
  if (hasRequiredXMLText) return XMLText.exports;
  hasRequiredXMLText = 1;
  (function() {
    var NodeType2, XMLCharacterData2;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLText.exports = (function() {
      class XMLText2 extends XMLCharacterData2 {
        // Initializes a new instance of `XMLText`
        // `text` element text
        constructor(parent, text) {
          super(parent);
          if (text == null) {
            throw new Error("Missing element text. " + this.debugInfo());
          }
          this.name = "#text";
          this.type = NodeType2.Text;
          this.value = this.stringify.text(text);
        }
        // Creates and returns a deep clone of `this`
        clone() {
          return Object.create(this);
        }
        // Converts the XML fragment to string
        // `options.pretty` pretty prints the result
        // `options.indent` indentation for pretty print
        // `options.offset` how many indentations to add to every line for pretty print
        // `options.newline` newline sequence for pretty print
        toString(options) {
          return this.options.writer.text(this, this.options.writer.filterOptions(options));
        }
        // DOM level 1 functions to be implemented later
        splitText(offset) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        // DOM level 3 functions to be implemented later
        replaceWholeText(content) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      }
      Object.defineProperty(XMLText2.prototype, "isElementContentWhitespace", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLText2.prototype, "wholeText", {
        get: function() {
          var next, prev, str;
          str = "";
          prev = this.previousSibling;
          while (prev) {
            str = prev.data + str;
            prev = prev.previousSibling;
          }
          str += this.data;
          next = this.nextSibling;
          while (next) {
            str = str + next.data;
            next = next.nextSibling;
          }
          return str;
        }
      });
      return XMLText2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLText.exports;
}
var XMLProcessingInstruction = { exports: {} };
var hasRequiredXMLProcessingInstruction;
function requireXMLProcessingInstruction() {
  if (hasRequiredXMLProcessingInstruction) return XMLProcessingInstruction.exports;
  hasRequiredXMLProcessingInstruction = 1;
  (function() {
    var NodeType2, XMLCharacterData2;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLProcessingInstruction.exports = class XMLProcessingInstruction extends XMLCharacterData2 {
      // Initializes a new instance of `XMLProcessingInstruction`
      // `parent` the parent node
      // `target` instruction target
      // `value` instruction value
      constructor(parent, target, value) {
        super(parent);
        if (target == null) {
          throw new Error("Missing instruction target. " + this.debugInfo());
        }
        this.type = NodeType2.ProcessingInstruction;
        this.target = this.stringify.insTarget(target);
        this.name = this.target;
        if (value) {
          this.value = this.stringify.insValue(value);
        }
      }
      // Creates and returns a deep clone of `this`
      clone() {
        return Object.create(this);
      }
      // Converts the XML fragment to string
      // `options.pretty` pretty prints the result
      // `options.indent` indentation for pretty print
      // `options.offset` how many indentations to add to every line for pretty print
      // `options.newline` newline sequence for pretty print
      toString(options) {
        return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
      }
      isEqualNode(node) {
        if (!super.isEqualNode(node)) {
          return false;
        }
        if (node.target !== this.target) {
          return false;
        }
        return true;
      }
    };
  }).call(commonjsGlobal);
  return XMLProcessingInstruction.exports;
}
var XMLDummy = { exports: {} };
var hasRequiredXMLDummy;
function requireXMLDummy() {
  if (hasRequiredXMLDummy) return XMLDummy.exports;
  hasRequiredXMLDummy = 1;
  (function() {
    var NodeType2, XMLNode2;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDummy.exports = class XMLDummy extends XMLNode2 {
      // Initializes a new instance of `XMLDummy`
      // `XMLDummy` is a special node representing a node with 
      // a null value. Dummy nodes are created while recursively
      // building the XML tree. Simply skipping null values doesn't
      // work because that would break the recursive chain.
      constructor(parent) {
        super(parent);
        this.type = NodeType2.Dummy;
      }
      // Creates and returns a deep clone of `this`
      clone() {
        return Object.create(this);
      }
      // Converts the XML fragment to string
      // `options.pretty` pretty prints the result
      // `options.indent` indentation for pretty print
      // `options.offset` how many indentations to add to every line for pretty print
      // `options.newline` newline sequence for pretty print
      toString(options) {
        return "";
      }
    };
  }).call(commonjsGlobal);
  return XMLDummy.exports;
}
var XMLNodeList = { exports: {} };
var hasRequiredXMLNodeList;
function requireXMLNodeList() {
  if (hasRequiredXMLNodeList) return XMLNodeList.exports;
  hasRequiredXMLNodeList = 1;
  (function() {
    XMLNodeList.exports = (function() {
      class XMLNodeList2 {
        // Initializes a new instance of `XMLNodeList`
        // This is just a wrapper around an ordinary
        // JS array.
        // `nodes` the array containing nodes.
        constructor(nodes) {
          this.nodes = nodes;
        }
        // Creates and returns a deep clone of `this`
        clone() {
          return this.nodes = null;
        }
        // DOM Level 1
        item(index) {
          return this.nodes[index] || null;
        }
      }
      Object.defineProperty(XMLNodeList2.prototype, "length", {
        get: function() {
          return this.nodes.length || 0;
        }
      });
      return XMLNodeList2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLNodeList.exports;
}
var DocumentPosition = { exports: {} };
var hasRequiredDocumentPosition;
function requireDocumentPosition() {
  if (hasRequiredDocumentPosition) return DocumentPosition.exports;
  hasRequiredDocumentPosition = 1;
  (function() {
    DocumentPosition.exports = {
      Disconnected: 1,
      Preceding: 2,
      Following: 4,
      Contains: 8,
      ContainedBy: 16,
      ImplementationSpecific: 32
    };
  }).call(commonjsGlobal);
  return DocumentPosition.exports;
}
var hasRequiredXMLNode;
function requireXMLNode() {
  if (hasRequiredXMLNode) return XMLNode.exports;
  hasRequiredXMLNode = 1;
  (function() {
    var DocumentPosition2, NodeType2, XMLCData2, XMLComment2, XMLDeclaration2, XMLDocType2, XMLDummy2, XMLElement2, XMLNodeList2, XMLProcessingInstruction2, XMLRaw2, XMLText2, getValue, isEmpty, isFunction, isObject, hasProp = {}.hasOwnProperty, splice = [].splice;
    ({ isObject, isFunction, isEmpty, getValue } = requireUtility());
    XMLElement2 = null;
    XMLCData2 = null;
    XMLComment2 = null;
    XMLDeclaration2 = null;
    XMLDocType2 = null;
    XMLRaw2 = null;
    XMLText2 = null;
    XMLProcessingInstruction2 = null;
    XMLDummy2 = null;
    NodeType2 = null;
    XMLNodeList2 = null;
    DocumentPosition2 = null;
    XMLNode.exports = (function() {
      class XMLNode2 {
        // Initializes a new instance of `XMLNode`
        // `parent` the parent node
        constructor(parent1) {
          this.parent = parent1;
          if (this.parent) {
            this.options = this.parent.options;
            this.stringify = this.parent.stringify;
          }
          this.value = null;
          this.children = [];
          this.baseURI = null;
          if (!XMLElement2) {
            XMLElement2 = requireXMLElement();
            XMLCData2 = requireXMLCData();
            XMLComment2 = requireXMLComment();
            XMLDeclaration2 = requireXMLDeclaration();
            XMLDocType2 = requireXMLDocType();
            XMLRaw2 = requireXMLRaw();
            XMLText2 = requireXMLText();
            XMLProcessingInstruction2 = requireXMLProcessingInstruction();
            XMLDummy2 = requireXMLDummy();
            NodeType2 = requireNodeType();
            XMLNodeList2 = requireXMLNodeList();
            requireXMLNamedNodeMap();
            DocumentPosition2 = requireDocumentPosition();
          }
        }
        // Sets the parent node of this node and its children recursively
        // `parent` the parent node
        setParent(parent) {
          var child, j, len, ref1, results;
          this.parent = parent;
          if (parent) {
            this.options = parent.options;
            this.stringify = parent.stringify;
          }
          ref1 = this.children;
          results = [];
          for (j = 0, len = ref1.length; j < len; j++) {
            child = ref1[j];
            results.push(child.setParent(this));
          }
          return results;
        }
        // Creates a child element node
        // `name` node name or an object describing the XML tree
        // `attributes` an object containing name/value pairs of attributes
        // `text` element text
        element(name, attributes, text) {
          var childNode, item, j, k, key, lastChild, len, len1, val;
          lastChild = null;
          if (attributes === null && text == null) {
            [attributes, text] = [{}, null];
          }
          if (attributes == null) {
            attributes = {};
          }
          attributes = getValue(attributes);
          if (!isObject(attributes)) {
            [text, attributes] = [attributes, text];
          }
          if (name != null) {
            name = getValue(name);
          }
          if (Array.isArray(name)) {
            for (j = 0, len = name.length; j < len; j++) {
              item = name[j];
              lastChild = this.element(item);
            }
          } else if (isFunction(name)) {
            lastChild = this.element(name.apply());
          } else if (isObject(name)) {
            for (key in name) {
              if (!hasProp.call(name, key)) continue;
              val = name[key];
              if (isFunction(val)) {
                val = val.apply();
              }
              if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
                lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
              } else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) {
                lastChild = this.dummy();
              } else if (isObject(val) && isEmpty(val)) {
                lastChild = this.element(key);
              } else if (!this.options.keepNullNodes && val == null) {
                lastChild = this.dummy();
              } else if (!this.options.separateArrayItems && Array.isArray(val)) {
                for (k = 0, len1 = val.length; k < len1; k++) {
                  item = val[k];
                  childNode = {};
                  childNode[key] = item;
                  lastChild = this.element(childNode);
                }
              } else if (isObject(val)) {
                if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key.indexOf(this.stringify.convertTextKey) === 0) {
                  lastChild = this.element(val);
                } else {
                  lastChild = this.element(key);
                  lastChild.element(val);
                }
              } else {
                lastChild = this.element(key, val);
              }
            }
          } else if (!this.options.keepNullNodes && text === null) {
            lastChild = this.dummy();
          } else {
            if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
              lastChild = this.text(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
              lastChild = this.cdata(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
              lastChild = this.comment(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
              lastChild = this.raw(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
              lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
            } else {
              lastChild = this.node(name, attributes, text);
            }
          }
          if (lastChild == null) {
            throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
          }
          return lastChild;
        }
        // Creates a child element node before the current node
        // `name` node name or an object describing the XML tree
        // `attributes` an object containing name/value pairs of attributes
        // `text` element text
        insertBefore(name, attributes, text) {
          var child, i, newChild, refChild, removed;
          if (name != null ? name.type : void 0) {
            newChild = name;
            refChild = attributes;
            newChild.setParent(this);
            if (refChild) {
              i = children.indexOf(refChild);
              removed = children.splice(i);
              children.push(newChild);
              Array.prototype.push.apply(children, removed);
            } else {
              children.push(newChild);
            }
            return newChild;
          } else {
            if (this.isRoot) {
              throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
            }
            i = this.parent.children.indexOf(this);
            removed = this.parent.children.splice(i);
            child = this.parent.element(name, attributes, text);
            Array.prototype.push.apply(this.parent.children, removed);
            return child;
          }
        }
        // Creates a child element node after the current node
        // `name` node name or an object describing the XML tree
        // `attributes` an object containing name/value pairs of attributes
        // `text` element text
        insertAfter(name, attributes, text) {
          var child, i, removed;
          if (this.isRoot) {
            throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
          }
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i + 1);
          child = this.parent.element(name, attributes, text);
          Array.prototype.push.apply(this.parent.children, removed);
          return child;
        }
        // Deletes a child element node
        remove() {
          var i;
          if (this.isRoot) {
            throw new Error("Cannot remove the root element. " + this.debugInfo());
          }
          i = this.parent.children.indexOf(this);
          splice.apply(this.parent.children, [i, i - i + 1].concat([]));
          return this.parent;
        }
        // Creates a node
        // `name` name of the node
        // `attributes` an object containing name/value pairs of attributes
        // `text` element text
        node(name, attributes, text) {
          var child;
          if (name != null) {
            name = getValue(name);
          }
          attributes || (attributes = {});
          attributes = getValue(attributes);
          if (!isObject(attributes)) {
            [text, attributes] = [attributes, text];
          }
          child = new XMLElement2(this, name, attributes);
          if (text != null) {
            child.text(text);
          }
          this.children.push(child);
          return child;
        }
        // Creates a text node
        // `value` element text
        text(value) {
          var child;
          if (isObject(value)) {
            this.element(value);
          }
          child = new XMLText2(this, value);
          this.children.push(child);
          return this;
        }
        // Creates a CDATA node
        // `value` element text without CDATA delimiters
        cdata(value) {
          var child;
          child = new XMLCData2(this, value);
          this.children.push(child);
          return this;
        }
        // Creates a comment node
        // `value` comment text
        comment(value) {
          var child;
          child = new XMLComment2(this, value);
          this.children.push(child);
          return this;
        }
        // Creates a comment node before the current node
        // `value` comment text
        commentBefore(value) {
          var i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i);
          this.parent.comment(value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        }
        // Creates a comment node after the current node
        // `value` comment text
        commentAfter(value) {
          var i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i + 1);
          this.parent.comment(value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        }
        // Adds unescaped raw text
        // `value` text
        raw(value) {
          var child;
          child = new XMLRaw2(this, value);
          this.children.push(child);
          return this;
        }
        // Adds a dummy node
        dummy() {
          var child;
          child = new XMLDummy2(this);
          return child;
        }
        // Adds a processing instruction
        // `target` instruction target
        // `value` instruction value
        instruction(target, value) {
          var insTarget, insValue, instruction, j, len;
          if (target != null) {
            target = getValue(target);
          }
          if (value != null) {
            value = getValue(value);
          }
          if (Array.isArray(target)) {
            for (j = 0, len = target.length; j < len; j++) {
              insTarget = target[j];
              this.instruction(insTarget);
            }
          } else if (isObject(target)) {
            for (insTarget in target) {
              if (!hasProp.call(target, insTarget)) continue;
              insValue = target[insTarget];
              this.instruction(insTarget, insValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            instruction = new XMLProcessingInstruction2(this, target, value);
            this.children.push(instruction);
          }
          return this;
        }
        // Creates a processing instruction node before the current node
        // `target` instruction target
        // `value` instruction value
        instructionBefore(target, value) {
          var i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i);
          this.parent.instruction(target, value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        }
        // Creates a processing instruction node after the current node
        // `target` instruction target
        // `value` instruction value
        instructionAfter(target, value) {
          var i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i + 1);
          this.parent.instruction(target, value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        }
        // Creates the xml declaration
        // `version` A version number string, e.g. 1.0
        // `encoding` Encoding declaration, e.g. UTF-8
        // `standalone` standalone document declaration: true or false
        declaration(version, encoding, standalone) {
          var doc, xmldec;
          doc = this.document();
          xmldec = new XMLDeclaration2(doc, version, encoding, standalone);
          if (doc.children.length === 0) {
            doc.children.unshift(xmldec);
          } else if (doc.children[0].type === NodeType2.Declaration) {
            doc.children[0] = xmldec;
          } else {
            doc.children.unshift(xmldec);
          }
          return doc.root() || doc;
        }
        // Creates the document type declaration
        // `pubID` the public identifier of the external subset
        // `sysID` the system identifier of the external subset
        dtd(pubID, sysID) {
          var child, doc, doctype, i, j, k, len, len1, ref1, ref2;
          doc = this.document();
          doctype = new XMLDocType2(doc, pubID, sysID);
          ref1 = doc.children;
          for (i = j = 0, len = ref1.length; j < len; i = ++j) {
            child = ref1[i];
            if (child.type === NodeType2.DocType) {
              doc.children[i] = doctype;
              return doctype;
            }
          }
          ref2 = doc.children;
          for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
            child = ref2[i];
            if (child.isRoot) {
              doc.children.splice(i, 0, doctype);
              return doctype;
            }
          }
          doc.children.push(doctype);
          return doctype;
        }
        // Gets the parent node
        up() {
          if (this.isRoot) {
            throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
          }
          return this.parent;
        }
        // Gets the root node
        root() {
          var node;
          node = this;
          while (node) {
            if (node.type === NodeType2.Document) {
              return node.rootObject;
            } else if (node.isRoot) {
              return node;
            } else {
              node = node.parent;
            }
          }
        }
        // Gets the node representing the XML document
        document() {
          var node;
          node = this;
          while (node) {
            if (node.type === NodeType2.Document) {
              return node;
            } else {
              node = node.parent;
            }
          }
        }
        // Ends the document and converts string
        end(options) {
          return this.document().end(options);
        }
        // Gets the previous node
        prev() {
          var i;
          i = this.parent.children.indexOf(this);
          if (i < 1) {
            throw new Error("Already at the first node. " + this.debugInfo());
          }
          return this.parent.children[i - 1];
        }
        // Gets the next node
        next() {
          var i;
          i = this.parent.children.indexOf(this);
          if (i === -1 || i === this.parent.children.length - 1) {
            throw new Error("Already at the last node. " + this.debugInfo());
          }
          return this.parent.children[i + 1];
        }
        // Imports cloned root from another XML document
        // `doc` the XML document to insert nodes from
        importDocument(doc) {
          var child, clonedRoot, j, len, ref1;
          clonedRoot = doc.root().clone();
          clonedRoot.parent = this;
          clonedRoot.isRoot = false;
          this.children.push(clonedRoot);
          if (this.type === NodeType2.Document) {
            clonedRoot.isRoot = true;
            clonedRoot.documentObject = this;
            this.rootObject = clonedRoot;
            if (this.children) {
              ref1 = this.children;
              for (j = 0, len = ref1.length; j < len; j++) {
                child = ref1[j];
                if (child.type === NodeType2.DocType) {
                  child.name = clonedRoot.name;
                  break;
                }
              }
            }
          }
          return this;
        }
        // Returns debug string for this node
        debugInfo(name) {
          var ref1, ref2;
          name = name || this.name;
          if (name == null && !((ref1 = this.parent) != null ? ref1.name : void 0)) {
            return "";
          } else if (name == null) {
            return "parent: <" + this.parent.name + ">";
          } else if (!((ref2 = this.parent) != null ? ref2.name : void 0)) {
            return "node: <" + name + ">";
          } else {
            return "node: <" + name + ">, parent: <" + this.parent.name + ">";
          }
        }
        // Aliases
        ele(name, attributes, text) {
          return this.element(name, attributes, text);
        }
        nod(name, attributes, text) {
          return this.node(name, attributes, text);
        }
        txt(value) {
          return this.text(value);
        }
        dat(value) {
          return this.cdata(value);
        }
        com(value) {
          return this.comment(value);
        }
        ins(target, value) {
          return this.instruction(target, value);
        }
        doc() {
          return this.document();
        }
        dec(version, encoding, standalone) {
          return this.declaration(version, encoding, standalone);
        }
        e(name, attributes, text) {
          return this.element(name, attributes, text);
        }
        n(name, attributes, text) {
          return this.node(name, attributes, text);
        }
        t(value) {
          return this.text(value);
        }
        d(value) {
          return this.cdata(value);
        }
        c(value) {
          return this.comment(value);
        }
        r(value) {
          return this.raw(value);
        }
        i(target, value) {
          return this.instruction(target, value);
        }
        u() {
          return this.up();
        }
        // can be deprecated in a future release
        importXMLBuilder(doc) {
          return this.importDocument(doc);
        }
        // Adds or modifies an attribute.
        // `name` attribute name
        // `value` attribute value
        attribute(name, value) {
          throw new Error("attribute() applies to element nodes only.");
        }
        att(name, value) {
          return this.attribute(name, value);
        }
        a(name, value) {
          return this.attribute(name, value);
        }
        // Removes an attribute
        // `name` attribute name
        removeAttribute(name) {
          throw new Error("attribute() applies to element nodes only.");
        }
        // DOM level 1 functions to be implemented later
        replaceChild(newChild, oldChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        removeChild(oldChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        appendChild(newChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        hasChildNodes() {
          return this.children.length !== 0;
        }
        cloneNode(deep) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        normalize() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        // DOM level 2
        isSupported(feature, version) {
          return true;
        }
        hasAttributes() {
          return this.attribs.length !== 0;
        }
        // DOM level 3 functions to be implemented later
        compareDocumentPosition(other) {
          var ref2, res;
          ref2 = this;
          if (ref2 === other) {
            return 0;
          } else if (this.document() !== other.document()) {
            res = DocumentPosition2.Disconnected | DocumentPosition2.ImplementationSpecific;
            if (Math.random() < 0.5) {
              res |= DocumentPosition2.Preceding;
            } else {
              res |= DocumentPosition2.Following;
            }
            return res;
          } else if (ref2.isAncestor(other)) {
            return DocumentPosition2.Contains | DocumentPosition2.Preceding;
          } else if (ref2.isDescendant(other)) {
            return DocumentPosition2.Contains | DocumentPosition2.Following;
          } else if (ref2.isPreceding(other)) {
            return DocumentPosition2.Preceding;
          } else {
            return DocumentPosition2.Following;
          }
        }
        isSameNode(other) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        lookupPrefix(namespaceURI) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        isDefaultNamespace(namespaceURI) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        lookupNamespaceURI(prefix) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        isEqualNode(node) {
          var i, j, ref1;
          if (node.nodeType !== this.nodeType) {
            return false;
          }
          if (node.children.length !== this.children.length) {
            return false;
          }
          for (i = j = 0, ref1 = this.children.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
            if (!this.children[i].isEqualNode(node.children[i])) {
              return false;
            }
          }
          return true;
        }
        getFeature(feature, version) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        setUserData(key, data, handler) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        getUserData(key) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        // Returns true if other is an inclusive descendant of node,
        // and false otherwise.
        contains(other) {
          if (!other) {
            return false;
          }
          return other === this || this.isDescendant(other);
        }
        // An object A is called a descendant of an object B, if either A is 
        // a child of B or A is a child of an object C that is a descendant of B.
        isDescendant(node) {
          var child, isDescendantChild, j, len, ref1;
          ref1 = this.children;
          for (j = 0, len = ref1.length; j < len; j++) {
            child = ref1[j];
            if (node === child) {
              return true;
            }
            isDescendantChild = child.isDescendant(node);
            if (isDescendantChild) {
              return true;
            }
          }
          return false;
        }
        // An object A is called an ancestor of an object B if and only if
        // B is a descendant of A.
        isAncestor(node) {
          return node.isDescendant(this);
        }
        // An object A is preceding an object B if A and B are in the 
        // same tree and A comes before B in tree order.
        isPreceding(node) {
          var nodePos, thisPos;
          nodePos = this.treePosition(node);
          thisPos = this.treePosition(this);
          if (nodePos === -1 || thisPos === -1) {
            return false;
          } else {
            return nodePos < thisPos;
          }
        }
        // An object A is folllowing an object B if A and B are in the 
        // same tree and A comes after B in tree order.
        isFollowing(node) {
          var nodePos, thisPos;
          nodePos = this.treePosition(node);
          thisPos = this.treePosition(this);
          if (nodePos === -1 || thisPos === -1) {
            return false;
          } else {
            return nodePos > thisPos;
          }
        }
        // Returns the preorder position of the given node in the tree, or -1
        // if the node is not in the tree.
        treePosition(node) {
          var found, pos;
          pos = 0;
          found = false;
          this.foreachTreeNode(this.document(), function(childNode) {
            pos++;
            if (!found && childNode === node) {
              return found = true;
            }
          });
          if (found) {
            return pos;
          } else {
            return -1;
          }
        }
        // Depth-first preorder traversal through the XML tree
        foreachTreeNode(node, func) {
          var child, j, len, ref1, res;
          node || (node = this.document());
          ref1 = node.children;
          for (j = 0, len = ref1.length; j < len; j++) {
            child = ref1[j];
            if (res = func(child)) {
              return res;
            } else {
              res = this.foreachTreeNode(child, func);
              if (res) {
                return res;
              }
            }
          }
        }
      }
      Object.defineProperty(XMLNode2.prototype, "nodeName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "nodeType", {
        get: function() {
          return this.type;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "nodeValue", {
        get: function() {
          return this.value;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "parentNode", {
        get: function() {
          return this.parent;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "childNodes", {
        get: function() {
          if (!this.childNodeList || !this.childNodeList.nodes) {
            this.childNodeList = new XMLNodeList2(this.children);
          }
          return this.childNodeList;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "firstChild", {
        get: function() {
          return this.children[0] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "lastChild", {
        get: function() {
          return this.children[this.children.length - 1] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "previousSibling", {
        get: function() {
          var i;
          i = this.parent.children.indexOf(this);
          return this.parent.children[i - 1] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "nextSibling", {
        get: function() {
          var i;
          i = this.parent.children.indexOf(this);
          return this.parent.children[i + 1] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "ownerDocument", {
        get: function() {
          return this.document() || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "textContent", {
        get: function() {
          var child, j, len, ref1, str;
          if (this.nodeType === NodeType2.Element || this.nodeType === NodeType2.DocumentFragment) {
            str = "";
            ref1 = this.children;
            for (j = 0, len = ref1.length; j < len; j++) {
              child = ref1[j];
              if (child.textContent) {
                str += child.textContent;
              }
            }
            return str;
          } else {
            return null;
          }
        },
        set: function(value) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      return XMLNode2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLNode.exports;
}
var XMLStringifier = { exports: {} };
var hasRequiredXMLStringifier;
function requireXMLStringifier() {
  if (hasRequiredXMLStringifier) return XMLStringifier.exports;
  hasRequiredXMLStringifier = 1;
  (function() {
    var hasProp = {}.hasOwnProperty;
    XMLStringifier.exports = (function() {
      class XMLStringifier2 {
        // Initializes a new instance of `XMLStringifier`
        // `options.version` The version number string of the XML spec to validate against, e.g. 1.0
        // `options.noDoubleEncoding` whether existing html entities are encoded: true or false
        // `options.stringify` a set of functions to use for converting values to strings
        // `options.noValidation` whether values will be validated and escaped or returned as is
        // `options.invalidCharReplacement` a character to replace invalid characters and disable character validation
        constructor(options) {
          var key, ref2, value;
          this.assertLegalChar = this.assertLegalChar.bind(this);
          this.assertLegalName = this.assertLegalName.bind(this);
          options || (options = {});
          this.options = options;
          if (!this.options.version) {
            this.options.version = "1.0";
          }
          ref2 = options.stringify || {};
          for (key in ref2) {
            if (!hasProp.call(ref2, key)) continue;
            value = ref2[key];
            this[key] = value;
          }
        }
        // Defaults
        name(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalName("" + val || "");
        }
        text(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar(this.textEscape("" + val || ""));
        }
        cdata(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          val = val.replace("]]>", "]]]]><![CDATA[>");
          return this.assertLegalChar(val);
        }
        comment(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (val.match(/--/)) {
            throw new Error("Comment text cannot contain double-hypen: " + val);
          }
          return this.assertLegalChar(val);
        }
        raw(val) {
          if (this.options.noValidation) {
            return val;
          }
          return "" + val || "";
        }
        attValue(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar(this.attEscape(val = "" + val || ""));
        }
        insTarget(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        }
        insValue(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (val.match(/\?>/)) {
            throw new Error("Invalid processing instruction value: " + val);
          }
          return this.assertLegalChar(val);
        }
        xmlVersion(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (!val.match(/1\.[0-9]+/)) {
            throw new Error("Invalid version number: " + val);
          }
          return val;
        }
        xmlEncoding(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
            throw new Error("Invalid encoding: " + val);
          }
          return this.assertLegalChar(val);
        }
        xmlStandalone(val) {
          if (this.options.noValidation) {
            return val;
          }
          if (val) {
            return "yes";
          } else {
            return "no";
          }
        }
        dtdPubID(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        }
        dtdSysID(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        }
        dtdElementValue(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        }
        dtdAttType(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        }
        dtdAttDefault(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        }
        dtdEntityValue(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        }
        dtdNData(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        }
        assertLegalChar(str) {
          var regex, res;
          if (this.options.noValidation) {
            return str;
          }
          if (this.options.version === "1.0") {
            regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g;
            if (this.options.invalidCharReplacement !== void 0) {
              str = str.replace(regex, this.options.invalidCharReplacement);
            } else if (res = str.match(regex)) {
              throw new Error(`Invalid character in string: ${str} at index ${res.index}`);
            }
          } else if (this.options.version === "1.1") {
            regex = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g;
            if (this.options.invalidCharReplacement !== void 0) {
              str = str.replace(regex, this.options.invalidCharReplacement);
            } else if (res = str.match(regex)) {
              throw new Error(`Invalid character in string: ${str} at index ${res.index}`);
            }
          }
          return str;
        }
        assertLegalName(str) {
          var regex;
          if (this.options.noValidation) {
            return str;
          }
          str = this.assertLegalChar(str);
          regex = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
          if (!str.match(regex)) {
            throw new Error(`Invalid character in name: ${str}`);
          }
          return str;
        }
        // Escapes special characters in text
        // See http://www.w3.org/TR/2000/WD-xml-c14n-20000119.html#charescaping
        // `str` the string to escape
        textEscape(str) {
          var ampregex;
          if (this.options.noValidation) {
            return str;
          }
          ampregex = this.options.noDoubleEncoding ? /(?!&(lt|gt|amp|apos|quot);)&/g : /&/g;
          return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
        }
        // Escapes special characters in attribute values
        // See http://www.w3.org/TR/2000/WD-xml-c14n-20000119.html#charescaping
        // `str` the string to escape
        attEscape(str) {
          var ampregex;
          if (this.options.noValidation) {
            return str;
          }
          ampregex = this.options.noDoubleEncoding ? /(?!&(lt|gt|amp|apos|quot);)&/g : /&/g;
          return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
        }
      }
      XMLStringifier2.prototype.convertAttKey = "@";
      XMLStringifier2.prototype.convertPIKey = "?";
      XMLStringifier2.prototype.convertTextKey = "#text";
      XMLStringifier2.prototype.convertCDataKey = "#cdata";
      XMLStringifier2.prototype.convertCommentKey = "#comment";
      XMLStringifier2.prototype.convertRawKey = "#raw";
      return XMLStringifier2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLStringifier.exports;
}
var XMLStringWriter = { exports: {} };
var XMLWriterBase = { exports: {} };
var WriterState = { exports: {} };
var hasRequiredWriterState;
function requireWriterState() {
  if (hasRequiredWriterState) return WriterState.exports;
  hasRequiredWriterState = 1;
  (function() {
    WriterState.exports = {
      None: 0,
      OpenTag: 1,
      InsideTag: 2,
      CloseTag: 3
    };
  }).call(commonjsGlobal);
  return WriterState.exports;
}
var hasRequiredXMLWriterBase;
function requireXMLWriterBase() {
  if (hasRequiredXMLWriterBase) return XMLWriterBase.exports;
  hasRequiredXMLWriterBase = 1;
  (function() {
    var NodeType2, WriterState2, assign2, hasProp = {}.hasOwnProperty;
    ({ assign: assign2 } = requireUtility());
    NodeType2 = requireNodeType();
    requireXMLDeclaration();
    requireXMLDocType();
    requireXMLCData();
    requireXMLComment();
    requireXMLElement();
    requireXMLRaw();
    requireXMLText();
    requireXMLProcessingInstruction();
    requireXMLDummy();
    requireXMLDTDAttList();
    requireXMLDTDElement();
    requireXMLDTDEntity();
    requireXMLDTDNotation();
    WriterState2 = requireWriterState();
    XMLWriterBase.exports = class XMLWriterBase {
      // Initializes a new instance of `XMLWriterBase`
      // `options.pretty` pretty prints the result
      // `options.indent` indentation string
      // `options.newline` newline sequence
      // `options.offset` a fixed number of indentations to add to every line
      // `options.width` maximum column width
      // `options.allowEmpty` do not self close empty element tags
      // 'options.dontPrettyTextNodes' if any text is present in node, don't indent or LF
      // `options.spaceBeforeSlash` add a space before the closing slash of empty elements
      constructor(options) {
        var key, ref2, value;
        options || (options = {});
        this.options = options;
        ref2 = options.writer || {};
        for (key in ref2) {
          if (!hasProp.call(ref2, key)) continue;
          value = ref2[key];
          this["_" + key] = this[key];
          this[key] = value;
        }
      }
      // Filters writer options and provides defaults
      // `options` writer options
      filterOptions(options) {
        var filteredOptions, ref2, ref1, ref22, ref3, ref4, ref5, ref6, ref7;
        options || (options = {});
        options = assign2({}, this.options, options);
        filteredOptions = {
          writer: this
        };
        filteredOptions.pretty = options.pretty || false;
        filteredOptions.allowEmpty = options.allowEmpty || false;
        filteredOptions.indent = (ref2 = options.indent) != null ? ref2 : "  ";
        filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : "\n";
        filteredOptions.offset = (ref22 = options.offset) != null ? ref22 : 0;
        filteredOptions.width = (ref3 = options.width) != null ? ref3 : 0;
        filteredOptions.dontPrettyTextNodes = (ref4 = (ref5 = options.dontPrettyTextNodes) != null ? ref5 : options.dontprettytextnodes) != null ? ref4 : 0;
        filteredOptions.spaceBeforeSlash = (ref6 = (ref7 = options.spaceBeforeSlash) != null ? ref7 : options.spacebeforeslash) != null ? ref6 : "";
        if (filteredOptions.spaceBeforeSlash === true) {
          filteredOptions.spaceBeforeSlash = " ";
        }
        filteredOptions.suppressPrettyCount = 0;
        filteredOptions.user = {};
        filteredOptions.state = WriterState2.None;
        return filteredOptions;
      }
      // Returns the indentation string for the current level
      // `node` current node
      // `options` writer options
      // `level` current indentation level
      indent(node, options, level) {
        var indentLevel;
        if (!options.pretty || options.suppressPrettyCount) {
          return "";
        } else if (options.pretty) {
          indentLevel = (level || 0) + options.offset + 1;
          if (indentLevel > 0) {
            return new Array(indentLevel).join(options.indent);
          }
        }
        return "";
      }
      // Returns the newline string
      // `node` current node
      // `options` writer options
      // `level` current indentation level
      endline(node, options, level) {
        if (!options.pretty || options.suppressPrettyCount) {
          return "";
        } else {
          return options.newline;
        }
      }
      attribute(att, options, level) {
        var r;
        this.openAttribute(att, options, level);
        if (options.pretty && options.width > 0) {
          r = att.name + '="' + att.value + '"';
        } else {
          r = " " + att.name + '="' + att.value + '"';
        }
        this.closeAttribute(att, options, level);
        return r;
      }
      cdata(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<![CDATA[";
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += "]]>" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      }
      comment(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!-- ";
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += " -->" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      }
      declaration(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<?xml";
        options.state = WriterState2.InsideTag;
        r += ' version="' + node.version + '"';
        if (node.encoding != null) {
          r += ' encoding="' + node.encoding + '"';
        }
        if (node.standalone != null) {
          r += ' standalone="' + node.standalone + '"';
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + "?>";
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      }
      docType(node, options, level) {
        var child, i, len1, r, ref2;
        level || (level = 0);
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level);
        r += "<!DOCTYPE " + node.root().name;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        if (node.children.length > 0) {
          r += " [";
          r += this.endline(node, options, level);
          options.state = WriterState2.InsideTag;
          ref2 = node.children;
          for (i = 0, len1 = ref2.length; i < len1; i++) {
            child = ref2[i];
            r += this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          r += "]";
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">";
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      }
      element(node, options, level) {
        var att, attLen, child, childNodeCount, firstChildNode, i, j, len, len1, len2, name, prettySuppressed, r, ratt, ref2, ref1, ref22, ref3, rline;
        level || (level = 0);
        prettySuppressed = false;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<" + node.name;
        if (options.pretty && options.width > 0) {
          len = r.length;
          ref2 = node.attribs;
          for (name in ref2) {
            if (!hasProp.call(ref2, name)) continue;
            att = ref2[name];
            ratt = this.attribute(att, options, level);
            attLen = ratt.length;
            if (len + attLen > options.width) {
              rline = this.indent(node, options, level + 1) + ratt;
              r += this.endline(node, options, level) + rline;
              len = rline.length;
            } else {
              rline = " " + ratt;
              r += rline;
              len += rline.length;
            }
          }
        } else {
          ref1 = node.attribs;
          for (name in ref1) {
            if (!hasProp.call(ref1, name)) continue;
            att = ref1[name];
            r += this.attribute(att, options, level);
          }
        }
        childNodeCount = node.children.length;
        firstChildNode = childNodeCount === 0 ? null : node.children[0];
        if (childNodeCount === 0 || node.children.every(function(e) {
          return (e.type === NodeType2.Text || e.type === NodeType2.Raw || e.type === NodeType2.CData) && e.value === "";
        })) {
          if (options.allowEmpty) {
            r += ">";
            options.state = WriterState2.CloseTag;
            r += "</" + node.name + ">" + this.endline(node, options, level);
          } else {
            options.state = WriterState2.CloseTag;
            r += options.spaceBeforeSlash + "/>" + this.endline(node, options, level);
          }
        } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType2.Text || firstChildNode.type === NodeType2.Raw || firstChildNode.type === NodeType2.CData) && firstChildNode.value != null) {
          r += ">";
          options.state = WriterState2.InsideTag;
          options.suppressPrettyCount++;
          prettySuppressed = true;
          r += this.writeChildNode(firstChildNode, options, level + 1);
          options.suppressPrettyCount--;
          prettySuppressed = false;
          options.state = WriterState2.CloseTag;
          r += "</" + node.name + ">" + this.endline(node, options, level);
        } else {
          if (options.dontPrettyTextNodes) {
            ref22 = node.children;
            for (i = 0, len1 = ref22.length; i < len1; i++) {
              child = ref22[i];
              if ((child.type === NodeType2.Text || child.type === NodeType2.Raw || child.type === NodeType2.CData) && child.value != null) {
                options.suppressPrettyCount++;
                prettySuppressed = true;
                break;
              }
            }
          }
          r += ">" + this.endline(node, options, level);
          options.state = WriterState2.InsideTag;
          ref3 = node.children;
          for (j = 0, len2 = ref3.length; j < len2; j++) {
            child = ref3[j];
            r += this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          r += this.indent(node, options, level) + "</" + node.name + ">";
          if (prettySuppressed) {
            options.suppressPrettyCount--;
          }
          r += this.endline(node, options, level);
          options.state = WriterState2.None;
        }
        this.closeNode(node, options, level);
        return r;
      }
      writeChildNode(node, options, level) {
        switch (node.type) {
          case NodeType2.CData:
            return this.cdata(node, options, level);
          case NodeType2.Comment:
            return this.comment(node, options, level);
          case NodeType2.Element:
            return this.element(node, options, level);
          case NodeType2.Raw:
            return this.raw(node, options, level);
          case NodeType2.Text:
            return this.text(node, options, level);
          case NodeType2.ProcessingInstruction:
            return this.processingInstruction(node, options, level);
          case NodeType2.Dummy:
            return "";
          case NodeType2.Declaration:
            return this.declaration(node, options, level);
          case NodeType2.DocType:
            return this.docType(node, options, level);
          case NodeType2.AttributeDeclaration:
            return this.dtdAttList(node, options, level);
          case NodeType2.ElementDeclaration:
            return this.dtdElement(node, options, level);
          case NodeType2.EntityDeclaration:
            return this.dtdEntity(node, options, level);
          case NodeType2.NotationDeclaration:
            return this.dtdNotation(node, options, level);
          default:
            throw new Error("Unknown XML node type: " + node.constructor.name);
        }
      }
      processingInstruction(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<?";
        options.state = WriterState2.InsideTag;
        r += node.target;
        if (node.value) {
          r += " " + node.value;
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + "?>";
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      }
      raw(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level);
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      }
      text(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level);
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      }
      dtdAttList(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!ATTLIST";
        options.state = WriterState2.InsideTag;
        r += " " + node.elementName + " " + node.attributeName + " " + node.attributeType;
        if (node.defaultValueType !== "#DEFAULT") {
          r += " " + node.defaultValueType;
        }
        if (node.defaultValue) {
          r += ' "' + node.defaultValue + '"';
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      }
      dtdElement(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!ELEMENT";
        options.state = WriterState2.InsideTag;
        r += " " + node.name + " " + node.value;
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      }
      dtdEntity(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!ENTITY";
        options.state = WriterState2.InsideTag;
        if (node.pe) {
          r += " %";
        }
        r += " " + node.name;
        if (node.value) {
          r += ' "' + node.value + '"';
        } else {
          if (node.pubID && node.sysID) {
            r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.sysID) {
            r += ' SYSTEM "' + node.sysID + '"';
          }
          if (node.nData) {
            r += " NDATA " + node.nData;
          }
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      }
      dtdNotation(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!NOTATION";
        options.state = WriterState2.InsideTag;
        r += " " + node.name;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.pubID) {
          r += ' PUBLIC "' + node.pubID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      }
      openNode(node, options, level) {
      }
      closeNode(node, options, level) {
      }
      openAttribute(att, options, level) {
      }
      closeAttribute(att, options, level) {
      }
    };
  }).call(commonjsGlobal);
  return XMLWriterBase.exports;
}
var hasRequiredXMLStringWriter;
function requireXMLStringWriter() {
  if (hasRequiredXMLStringWriter) return XMLStringWriter.exports;
  hasRequiredXMLStringWriter = 1;
  (function() {
    var XMLWriterBase2;
    XMLWriterBase2 = requireXMLWriterBase();
    XMLStringWriter.exports = class XMLStringWriter extends XMLWriterBase2 {
      // Initializes a new instance of `XMLStringWriter`
      // `options.pretty` pretty prints the result
      // `options.indent` indentation string
      // `options.newline` newline sequence
      // `options.offset` a fixed number of indentations to add to every line
      // `options.allowEmpty` do not self close empty element tags
      // 'options.dontPrettyTextNodes' if any text is present in node, don't indent or LF
      // `options.spaceBeforeSlash` add a space before the closing slash of empty elements
      constructor(options) {
        super(options);
      }
      document(doc, options) {
        var child, i, len, r, ref2;
        options = this.filterOptions(options);
        r = "";
        ref2 = doc.children;
        for (i = 0, len = ref2.length; i < len; i++) {
          child = ref2[i];
          r += this.writeChildNode(child, options, 0);
        }
        if (options.pretty && r.slice(-options.newline.length) === options.newline) {
          r = r.slice(0, -options.newline.length);
        }
        return r;
      }
    };
  }).call(commonjsGlobal);
  return XMLStringWriter.exports;
}
var hasRequiredXMLDocument;
function requireXMLDocument() {
  if (hasRequiredXMLDocument) return XMLDocument.exports;
  hasRequiredXMLDocument = 1;
  (function() {
    var NodeType2, XMLDOMConfiguration2, XMLDOMImplementation2, XMLNode2, XMLStringWriter2, XMLStringifier2, isPlainObject;
    ({ isPlainObject } = requireUtility());
    XMLDOMImplementation2 = requireXMLDOMImplementation();
    XMLDOMConfiguration2 = requireXMLDOMConfiguration();
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLStringifier2 = requireXMLStringifier();
    XMLStringWriter2 = requireXMLStringWriter();
    XMLDocument.exports = (function() {
      class XMLDocument2 extends XMLNode2 {
        // Initializes a new instance of `XMLDocument`
        // `options.keepNullNodes` whether nodes with null values will be kept
        //     or ignored: true or false
        // `options.keepNullAttributes` whether attributes with null values will be
        //     kept or ignored: true or false
        // `options.ignoreDecorators` whether decorator strings will be ignored when
        //     converting JS objects: true or false
        // `options.separateArrayItems` whether array items are created as separate
        //     nodes when passed as an object value: true or false
        // `options.noDoubleEncoding` whether existing html entities are encoded:
        //     true or false
        // `options.stringify` a set of functions to use for converting values to
        //     strings
        // `options.writer` the default XML writer to use for converting nodes to
        //     string. If the default writer is not set, the built-in XMLStringWriter
        //     will be used instead.
        constructor(options) {
          super(null);
          this.name = "#document";
          this.type = NodeType2.Document;
          this.documentURI = null;
          this.domConfig = new XMLDOMConfiguration2();
          options || (options = {});
          if (!options.writer) {
            options.writer = new XMLStringWriter2();
          }
          this.options = options;
          this.stringify = new XMLStringifier2(options);
        }
        // Ends the document and passes it to the given XML writer
        // `writer` is either an XML writer or a plain object to pass to the
        // constructor of the default XML writer. The default writer is assigned when
        // creating the XML document. Following flags are recognized by the
        // built-in XMLStringWriter:
        //   `writer.pretty` pretty prints the result
        //   `writer.indent` indentation for pretty print
        //   `writer.offset` how many indentations to add to every line for pretty print
        //   `writer.newline` newline sequence for pretty print
        end(writer) {
          var writerOptions;
          writerOptions = {};
          if (!writer) {
            writer = this.options.writer;
          } else if (isPlainObject(writer)) {
            writerOptions = writer;
            writer = this.options.writer;
          }
          return writer.document(this, writer.filterOptions(writerOptions));
        }
        // Converts the XML document to string
        // `options.pretty` pretty prints the result
        // `options.indent` indentation for pretty print
        // `options.offset` how many indentations to add to every line for pretty print
        // `options.newline` newline sequence for pretty print
        toString(options) {
          return this.options.writer.document(this, this.options.writer.filterOptions(options));
        }
        // DOM level 1 functions to be implemented later
        createElement(tagName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createDocumentFragment() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createTextNode(data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createComment(data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createCDATASection(data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createProcessingInstruction(target, data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createAttribute(name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createEntityReference(name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        getElementsByTagName(tagname) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        // DOM level 2 functions to be implemented later
        importNode(importedNode, deep) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createElementNS(namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createAttributeNS(namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        getElementsByTagNameNS(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        getElementById(elementId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        // DOM level 3 functions to be implemented later
        adoptNode(source2) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        normalizeDocument() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        renameNode(node, namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        // DOM level 4 functions to be implemented later
        getElementsByClassName(classNames) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createEvent(eventInterface) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createRange() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createNodeIterator(root, whatToShow, filter) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
        createTreeWalker(root, whatToShow, filter) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      }
      Object.defineProperty(XMLDocument2.prototype, "implementation", {
        value: new XMLDOMImplementation2()
      });
      Object.defineProperty(XMLDocument2.prototype, "doctype", {
        get: function() {
          var child, i, len, ref2;
          ref2 = this.children;
          for (i = 0, len = ref2.length; i < len; i++) {
            child = ref2[i];
            if (child.type === NodeType2.DocType) {
              return child;
            }
          }
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "documentElement", {
        get: function() {
          return this.rootObject || null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "inputEncoding", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "strictErrorChecking", {
        get: function() {
          return false;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "xmlEncoding", {
        get: function() {
          if (this.children.length !== 0 && this.children[0].type === NodeType2.Declaration) {
            return this.children[0].encoding;
          } else {
            return null;
          }
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "xmlStandalone", {
        get: function() {
          if (this.children.length !== 0 && this.children[0].type === NodeType2.Declaration) {
            return this.children[0].standalone === "yes";
          } else {
            return false;
          }
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "xmlVersion", {
        get: function() {
          if (this.children.length !== 0 && this.children[0].type === NodeType2.Declaration) {
            return this.children[0].version;
          } else {
            return "1.0";
          }
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "URL", {
        get: function() {
          return this.documentURI;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "origin", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "compatMode", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "characterSet", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "contentType", {
        get: function() {
          return null;
        }
      });
      return XMLDocument2;
    }).call(this);
  }).call(commonjsGlobal);
  return XMLDocument.exports;
}
var XMLDocumentCB = { exports: {} };
var hasRequiredXMLDocumentCB;
function requireXMLDocumentCB() {
  if (hasRequiredXMLDocumentCB) return XMLDocumentCB.exports;
  hasRequiredXMLDocumentCB = 1;
  (function() {
    var NodeType2, WriterState2, XMLAttribute2, XMLCData2, XMLComment2, XMLDTDAttList2, XMLDTDElement2, XMLDTDEntity2, XMLDTDNotation2, XMLDeclaration2, XMLDocType2, XMLDocument2, XMLElement2, XMLProcessingInstruction2, XMLRaw2, XMLStringWriter2, XMLStringifier2, XMLText2, getValue, isFunction, isObject, isPlainObject, hasProp = {}.hasOwnProperty;
    ({ isObject, isFunction, isPlainObject, getValue } = requireUtility());
    NodeType2 = requireNodeType();
    XMLDocument2 = requireXMLDocument();
    XMLElement2 = requireXMLElement();
    XMLCData2 = requireXMLCData();
    XMLComment2 = requireXMLComment();
    XMLRaw2 = requireXMLRaw();
    XMLText2 = requireXMLText();
    XMLProcessingInstruction2 = requireXMLProcessingInstruction();
    XMLDeclaration2 = requireXMLDeclaration();
    XMLDocType2 = requireXMLDocType();
    XMLDTDAttList2 = requireXMLDTDAttList();
    XMLDTDEntity2 = requireXMLDTDEntity();
    XMLDTDElement2 = requireXMLDTDElement();
    XMLDTDNotation2 = requireXMLDTDNotation();
    XMLAttribute2 = requireXMLAttribute();
    XMLStringifier2 = requireXMLStringifier();
    XMLStringWriter2 = requireXMLStringWriter();
    WriterState2 = requireWriterState();
    XMLDocumentCB.exports = class XMLDocumentCB {
      // Initializes a new instance of `XMLDocumentCB`
      // `options.keepNullNodes` whether nodes with null values will be kept
      //     or ignored: true or false
      // `options.keepNullAttributes` whether attributes with null values will be
      //     kept or ignored: true or false
      // `options.ignoreDecorators` whether decorator strings will be ignored when
      //     converting JS objects: true or false
      // `options.separateArrayItems` whether array items are created as separate
      //     nodes when passed as an object value: true or false
      // `options.noDoubleEncoding` whether existing html entities are encoded:
      //     true or false
      // `options.stringify` a set of functions to use for converting values to
      //     strings
      // `options.writer` the default XML writer to use for converting nodes to
      //     string. If the default writer is not set, the built-in XMLStringWriter
      //     will be used instead.
      // `onData` the function to be called when a new chunk of XML is output. The
      //          string containing the XML chunk is passed to `onData` as its first
      //          argument, and the current indentation level as its second argument.
      // `onEnd`  the function to be called when the XML document is completed with
      //          `end`. `onEnd` does not receive any arguments.
      constructor(options, onData, onEnd) {
        var writerOptions;
        this.name = "?xml";
        this.type = NodeType2.Document;
        options || (options = {});
        writerOptions = {};
        if (!options.writer) {
          options.writer = new XMLStringWriter2();
        } else if (isPlainObject(options.writer)) {
          writerOptions = options.writer;
          options.writer = new XMLStringWriter2();
        }
        this.options = options;
        this.writer = options.writer;
        this.writerOptions = this.writer.filterOptions(writerOptions);
        this.stringify = new XMLStringifier2(options);
        this.onDataCallback = onData || function() {
        };
        this.onEndCallback = onEnd || function() {
        };
        this.currentNode = null;
        this.currentLevel = -1;
        this.openTags = {};
        this.documentStarted = false;
        this.documentCompleted = false;
        this.root = null;
      }
      // Creates a child element node from the given XMLNode
      // `node` the child node
      createChildNode(node) {
        var att, attName, attributes, child, i, len, ref2, ref1;
        switch (node.type) {
          case NodeType2.CData:
            this.cdata(node.value);
            break;
          case NodeType2.Comment:
            this.comment(node.value);
            break;
          case NodeType2.Element:
            attributes = {};
            ref2 = node.attribs;
            for (attName in ref2) {
              if (!hasProp.call(ref2, attName)) continue;
              att = ref2[attName];
              attributes[attName] = att.value;
            }
            this.node(node.name, attributes);
            break;
          case NodeType2.Dummy:
            this.dummy();
            break;
          case NodeType2.Raw:
            this.raw(node.value);
            break;
          case NodeType2.Text:
            this.text(node.value);
            break;
          case NodeType2.ProcessingInstruction:
            this.instruction(node.target, node.value);
            break;
          default:
            throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
        }
        ref1 = node.children;
        for (i = 0, len = ref1.length; i < len; i++) {
          child = ref1[i];
          this.createChildNode(child);
          if (child.type === NodeType2.Element) {
            this.up();
          }
        }
        return this;
      }
      // Creates a dummy node
      dummy() {
        return this;
      }
      // Creates a node
      // `name` name of the node
      // `attributes` an object containing name/value pairs of attributes
      // `text` element text
      node(name, attributes, text) {
        if (name == null) {
          throw new Error("Missing node name.");
        }
        if (this.root && this.currentLevel === -1) {
          throw new Error("Document can only have one root node. " + this.debugInfo(name));
        }
        this.openCurrent();
        name = getValue(name);
        if (attributes == null) {
          attributes = {};
        }
        attributes = getValue(attributes);
        if (!isObject(attributes)) {
          [text, attributes] = [attributes, text];
        }
        this.currentNode = new XMLElement2(this, name, attributes);
        this.currentNode.children = false;
        this.currentLevel++;
        this.openTags[this.currentLevel] = this.currentNode;
        if (text != null) {
          this.text(text);
        }
        return this;
      }
      // Creates a child element node or an element type declaration when called
      // inside the DTD
      // `name` name of the node
      // `attributes` an object containing name/value pairs of attributes
      // `text` element text
      element(name, attributes, text) {
        var child, i, len, oldValidationFlag, ref2, root;
        if (this.currentNode && this.currentNode.type === NodeType2.DocType) {
          this.dtdElement(...arguments);
        } else {
          if (Array.isArray(name) || isObject(name) || isFunction(name)) {
            oldValidationFlag = this.options.noValidation;
            this.options.noValidation = true;
            root = new XMLDocument2(this.options).element("TEMP_ROOT");
            root.element(name);
            this.options.noValidation = oldValidationFlag;
            ref2 = root.children;
            for (i = 0, len = ref2.length; i < len; i++) {
              child = ref2[i];
              this.createChildNode(child);
              if (child.type === NodeType2.Element) {
                this.up();
              }
            }
          } else {
            this.node(name, attributes, text);
          }
        }
        return this;
      }
      // Adds or modifies an attribute
      // `name` attribute name
      // `value` attribute value
      attribute(name, value) {
        var attName, attValue;
        if (!this.currentNode || this.currentNode.children) {
          throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
        }
        if (name != null) {
          name = getValue(name);
        }
        if (isObject(name)) {
          for (attName in name) {
            if (!hasProp.call(name, attName)) continue;
            attValue = name[attName];
            this.attribute(attName, attValue);
          }
        } else {
          if (isFunction(value)) {
            value = value.apply();
          }
          if (this.options.keepNullAttributes && value == null) {
            this.currentNode.attribs[name] = new XMLAttribute2(this, name, "");
          } else if (value != null) {
            this.currentNode.attribs[name] = new XMLAttribute2(this, name, value);
          }
        }
        return this;
      }
      // Creates a text node
      // `value` element text
      text(value) {
        var node;
        this.openCurrent();
        node = new XMLText2(this, value);
        this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }
      // Creates a CDATA node
      // `value` element text without CDATA delimiters
      cdata(value) {
        var node;
        this.openCurrent();
        node = new XMLCData2(this, value);
        this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }
      // Creates a comment node
      // `value` comment text
      comment(value) {
        var node;
        this.openCurrent();
        node = new XMLComment2(this, value);
        this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }
      // Adds unescaped raw text
      // `value` text
      raw(value) {
        var node;
        this.openCurrent();
        node = new XMLRaw2(this, value);
        this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }
      // Adds a processing instruction
      // `target` instruction target
      // `value` instruction value
      instruction(target, value) {
        var i, insTarget, insValue, len, node;
        this.openCurrent();
        if (target != null) {
          target = getValue(target);
        }
        if (value != null) {
          value = getValue(value);
        }
        if (Array.isArray(target)) {
          for (i = 0, len = target.length; i < len; i++) {
            insTarget = target[i];
            this.instruction(insTarget);
          }
        } else if (isObject(target)) {
          for (insTarget in target) {
            if (!hasProp.call(target, insTarget)) continue;
            insValue = target[insTarget];
            this.instruction(insTarget, insValue);
          }
        } else {
          if (isFunction(value)) {
            value = value.apply();
          }
          node = new XMLProcessingInstruction2(this, target, value);
          this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        }
        return this;
      }
      // Creates the xml declaration
      // `version` A version number string, e.g. 1.0
      // `encoding` Encoding declaration, e.g. UTF-8
      // `standalone` standalone document declaration: true or false
      declaration(version, encoding, standalone) {
        var node;
        this.openCurrent();
        if (this.documentStarted) {
          throw new Error("declaration() must be the first node.");
        }
        node = new XMLDeclaration2(this, version, encoding, standalone);
        this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }
      // Creates the document type declaration
      // `root`  the name of the root node
      // `pubID` the public identifier of the external subset
      // `sysID` the system identifier of the external subset
      doctype(root, pubID, sysID) {
        this.openCurrent();
        if (root == null) {
          throw new Error("Missing root node name.");
        }
        if (this.root) {
          throw new Error("dtd() must come before the root node.");
        }
        this.currentNode = new XMLDocType2(this, pubID, sysID);
        this.currentNode.rootNodeName = root;
        this.currentNode.children = false;
        this.currentLevel++;
        this.openTags[this.currentLevel] = this.currentNode;
        return this;
      }
      // Creates an element type declaration
      // `name` element name
      // `value` element content (defaults to #PCDATA)
      dtdElement(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDElement2(this, name, value);
        this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }
      // Creates an attribute declaration
      // `elementName` the name of the element containing this attribute
      // `attributeName` attribute name
      // `attributeType` type of the attribute (defaults to CDATA)
      // `defaultValueType` default value type (either #REQUIRED, #IMPLIED, #FIXED or
      //                    #DEFAULT) (defaults to #IMPLIED)
      // `defaultValue` default value of the attribute
      //                (only used for #FIXED or #DEFAULT)
      attList(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        var node;
        this.openCurrent();
        node = new XMLDTDAttList2(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
        this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }
      // Creates a general entity declaration
      // `name` the name of the entity
      // `value` internal entity value or an object with external entity details
      // `value.pubID` public identifier
      // `value.sysID` system identifier
      // `value.nData` notation declaration
      entity(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDEntity2(this, false, name, value);
        this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }
      // Creates a parameter entity declaration
      // `name` the name of the entity
      // `value` internal entity value or an object with external entity details
      // `value.pubID` public identifier
      // `value.sysID` system identifier
      pEntity(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDEntity2(this, true, name, value);
        this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }
      // Creates a NOTATION declaration
      // `name` the name of the notation
      // `value` an object with external entity details
      // `value.pubID` public identifier
      // `value.sysID` system identifier
      notation(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDNotation2(this, name, value);
        this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      }
      // Gets the parent node
      up() {
        if (this.currentLevel < 0) {
          throw new Error("The document node has no parent.");
        }
        if (this.currentNode) {
          if (this.currentNode.children) {
            this.closeNode(this.currentNode);
          } else {
            this.openNode(this.currentNode);
          }
          this.currentNode = null;
        } else {
          this.closeNode(this.openTags[this.currentLevel]);
        }
        delete this.openTags[this.currentLevel];
        this.currentLevel--;
        return this;
      }
      // Ends the document
      end() {
        while (this.currentLevel >= 0) {
          this.up();
        }
        return this.onEnd();
      }
      // Opens the current parent node
      openCurrent() {
        if (this.currentNode) {
          this.currentNode.children = true;
          return this.openNode(this.currentNode);
        }
      }
      // Writes the opening tag of the current node or the entire node if it has
      // no child nodes
      openNode(node) {
        var att, chunk, name, ref2;
        if (!node.isOpen) {
          if (!this.root && this.currentLevel === 0 && node.type === NodeType2.Element) {
            this.root = node;
          }
          chunk = "";
          if (node.type === NodeType2.Element) {
            this.writerOptions.state = WriterState2.OpenTag;
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<" + node.name;
            ref2 = node.attribs;
            for (name in ref2) {
              if (!hasProp.call(ref2, name)) continue;
              att = ref2[name];
              chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
            }
            chunk += (node.children ? ">" : "/>") + this.writer.endline(node, this.writerOptions, this.currentLevel);
            this.writerOptions.state = WriterState2.InsideTag;
          } else {
            this.writerOptions.state = WriterState2.OpenTag;
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<!DOCTYPE " + node.rootNodeName;
            if (node.pubID && node.sysID) {
              chunk += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
            } else if (node.sysID) {
              chunk += ' SYSTEM "' + node.sysID + '"';
            }
            if (node.children) {
              chunk += " [";
              this.writerOptions.state = WriterState2.InsideTag;
            } else {
              this.writerOptions.state = WriterState2.CloseTag;
              chunk += ">";
            }
            chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
          }
          this.onData(chunk, this.currentLevel);
          return node.isOpen = true;
        }
      }
      // Writes the closing tag of the current node
      closeNode(node) {
        var chunk;
        if (!node.isClosed) {
          chunk = "";
          this.writerOptions.state = WriterState2.CloseTag;
          if (node.type === NodeType2.Element) {
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "</" + node.name + ">" + this.writer.endline(node, this.writerOptions, this.currentLevel);
          } else {
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "]>" + this.writer.endline(node, this.writerOptions, this.currentLevel);
          }
          this.writerOptions.state = WriterState2.None;
          this.onData(chunk, this.currentLevel);
          return node.isClosed = true;
        }
      }
      // Called when a new chunk of XML is output
      // `chunk` a string containing the XML chunk
      // `level` current indentation level
      onData(chunk, level) {
        this.documentStarted = true;
        return this.onDataCallback(chunk, level + 1);
      }
      // Called when the XML document is completed
      onEnd() {
        this.documentCompleted = true;
        return this.onEndCallback();
      }
      // Returns debug string
      debugInfo(name) {
        if (name == null) {
          return "";
        } else {
          return "node: <" + name + ">";
        }
      }
      // Node aliases
      ele() {
        return this.element(...arguments);
      }
      nod(name, attributes, text) {
        return this.node(name, attributes, text);
      }
      txt(value) {
        return this.text(value);
      }
      dat(value) {
        return this.cdata(value);
      }
      com(value) {
        return this.comment(value);
      }
      ins(target, value) {
        return this.instruction(target, value);
      }
      dec(version, encoding, standalone) {
        return this.declaration(version, encoding, standalone);
      }
      dtd(root, pubID, sysID) {
        return this.doctype(root, pubID, sysID);
      }
      e(name, attributes, text) {
        return this.element(name, attributes, text);
      }
      n(name, attributes, text) {
        return this.node(name, attributes, text);
      }
      t(value) {
        return this.text(value);
      }
      d(value) {
        return this.cdata(value);
      }
      c(value) {
        return this.comment(value);
      }
      r(value) {
        return this.raw(value);
      }
      i(target, value) {
        return this.instruction(target, value);
      }
      // Attribute aliases
      att() {
        if (this.currentNode && this.currentNode.type === NodeType2.DocType) {
          return this.attList(...arguments);
        } else {
          return this.attribute(...arguments);
        }
      }
      a() {
        if (this.currentNode && this.currentNode.type === NodeType2.DocType) {
          return this.attList(...arguments);
        } else {
          return this.attribute(...arguments);
        }
      }
      // DTD aliases
      // att() and ele() are defined above
      ent(name, value) {
        return this.entity(name, value);
      }
      pent(name, value) {
        return this.pEntity(name, value);
      }
      not(name, value) {
        return this.notation(name, value);
      }
    };
  }).call(commonjsGlobal);
  return XMLDocumentCB.exports;
}
var XMLStreamWriter = { exports: {} };
var hasRequiredXMLStreamWriter;
function requireXMLStreamWriter() {
  if (hasRequiredXMLStreamWriter) return XMLStreamWriter.exports;
  hasRequiredXMLStreamWriter = 1;
  (function() {
    var NodeType2, WriterState2, XMLWriterBase2, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLWriterBase2 = requireXMLWriterBase();
    WriterState2 = requireWriterState();
    XMLStreamWriter.exports = class XMLStreamWriter extends XMLWriterBase2 {
      // Initializes a new instance of `XMLStreamWriter`
      // `stream` output stream
      // `options.pretty` pretty prints the result
      // `options.indent` indentation string
      // `options.newline` newline sequence
      // `options.offset` a fixed number of indentations to add to every line
      // `options.allowEmpty` do not self close empty element tags
      // 'options.dontPrettyTextNodes' if any text is present in node, don't indent or LF
      // `options.spaceBeforeSlash` add a space before the closing slash of empty elements
      constructor(stream, options) {
        super(options);
        this.stream = stream;
      }
      endline(node, options, level) {
        if (node.isLastRootNode && options.state === WriterState2.CloseTag) {
          return "";
        } else {
          return super.endline(node, options, level);
        }
      }
      document(doc, options) {
        var child, i, j, k, len1, len2, ref2, ref1, results;
        ref2 = doc.children;
        for (i = j = 0, len1 = ref2.length; j < len1; i = ++j) {
          child = ref2[i];
          child.isLastRootNode = i === doc.children.length - 1;
        }
        options = this.filterOptions(options);
        ref1 = doc.children;
        results = [];
        for (k = 0, len2 = ref1.length; k < len2; k++) {
          child = ref1[k];
          results.push(this.writeChildNode(child, options, 0));
        }
        return results;
      }
      cdata(node, options, level) {
        return this.stream.write(super.cdata(node, options, level));
      }
      comment(node, options, level) {
        return this.stream.write(super.comment(node, options, level));
      }
      declaration(node, options, level) {
        return this.stream.write(super.declaration(node, options, level));
      }
      docType(node, options, level) {
        var child, j, len1, ref2;
        level || (level = 0);
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        this.stream.write(this.indent(node, options, level));
        this.stream.write("<!DOCTYPE " + node.root().name);
        if (node.pubID && node.sysID) {
          this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
        } else if (node.sysID) {
          this.stream.write(' SYSTEM "' + node.sysID + '"');
        }
        if (node.children.length > 0) {
          this.stream.write(" [");
          this.stream.write(this.endline(node, options, level));
          options.state = WriterState2.InsideTag;
          ref2 = node.children;
          for (j = 0, len1 = ref2.length; j < len1; j++) {
            child = ref2[j];
            this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          this.stream.write("]");
        }
        options.state = WriterState2.CloseTag;
        this.stream.write(options.spaceBeforeSlash + ">");
        this.stream.write(this.endline(node, options, level));
        options.state = WriterState2.None;
        return this.closeNode(node, options, level);
      }
      element(node, options, level) {
        var att, attLen, child, childNodeCount, firstChildNode, j, len, len1, name, r, ratt, ref2, ref1, ref22, rline;
        level || (level = 0);
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<" + node.name;
        if (options.pretty && options.width > 0) {
          len = r.length;
          ref2 = node.attribs;
          for (name in ref2) {
            if (!hasProp.call(ref2, name)) continue;
            att = ref2[name];
            ratt = this.attribute(att, options, level);
            attLen = ratt.length;
            if (len + attLen > options.width) {
              rline = this.indent(node, options, level + 1) + ratt;
              r += this.endline(node, options, level) + rline;
              len = rline.length;
            } else {
              rline = " " + ratt;
              r += rline;
              len += rline.length;
            }
          }
        } else {
          ref1 = node.attribs;
          for (name in ref1) {
            if (!hasProp.call(ref1, name)) continue;
            att = ref1[name];
            r += this.attribute(att, options, level);
          }
        }
        this.stream.write(r);
        childNodeCount = node.children.length;
        firstChildNode = childNodeCount === 0 ? null : node.children[0];
        if (childNodeCount === 0 || node.children.every(function(e) {
          return (e.type === NodeType2.Text || e.type === NodeType2.Raw || e.type === NodeType2.CData) && e.value === "";
        })) {
          if (options.allowEmpty) {
            this.stream.write(">");
            options.state = WriterState2.CloseTag;
            this.stream.write("</" + node.name + ">");
          } else {
            options.state = WriterState2.CloseTag;
            this.stream.write(options.spaceBeforeSlash + "/>");
          }
        } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType2.Text || firstChildNode.type === NodeType2.Raw || firstChildNode.type === NodeType2.CData) && firstChildNode.value != null) {
          this.stream.write(">");
          options.state = WriterState2.InsideTag;
          options.suppressPrettyCount++;
          this.writeChildNode(firstChildNode, options, level + 1);
          options.suppressPrettyCount--;
          options.state = WriterState2.CloseTag;
          this.stream.write("</" + node.name + ">");
        } else {
          this.stream.write(">" + this.endline(node, options, level));
          options.state = WriterState2.InsideTag;
          ref22 = node.children;
          for (j = 0, len1 = ref22.length; j < len1; j++) {
            child = ref22[j];
            this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          this.stream.write(this.indent(node, options, level) + "</" + node.name + ">");
        }
        this.stream.write(this.endline(node, options, level));
        options.state = WriterState2.None;
        return this.closeNode(node, options, level);
      }
      processingInstruction(node, options, level) {
        return this.stream.write(super.processingInstruction(node, options, level));
      }
      raw(node, options, level) {
        return this.stream.write(super.raw(node, options, level));
      }
      text(node, options, level) {
        return this.stream.write(super.text(node, options, level));
      }
      dtdAttList(node, options, level) {
        return this.stream.write(super.dtdAttList(node, options, level));
      }
      dtdElement(node, options, level) {
        return this.stream.write(super.dtdElement(node, options, level));
      }
      dtdEntity(node, options, level) {
        return this.stream.write(super.dtdEntity(node, options, level));
      }
      dtdNotation(node, options, level) {
        return this.stream.write(super.dtdNotation(node, options, level));
      }
    };
  }).call(commonjsGlobal);
  return XMLStreamWriter.exports;
}
(function() {
  var NodeType2, WriterState2, XMLDOMImplementation2, XMLDocument2, XMLDocumentCB2, XMLStreamWriter2, XMLStringWriter2, assign2, isFunction;
  ({ assign: assign2, isFunction } = requireUtility());
  XMLDOMImplementation2 = requireXMLDOMImplementation();
  XMLDocument2 = requireXMLDocument();
  XMLDocumentCB2 = requireXMLDocumentCB();
  XMLStringWriter2 = requireXMLStringWriter();
  XMLStreamWriter2 = requireXMLStreamWriter();
  NodeType2 = requireNodeType();
  WriterState2 = requireWriterState();
  lib.create = function(name, xmldec, doctype, options) {
    var doc, root;
    if (name == null) {
      throw new Error("Root element needs a name.");
    }
    options = assign2({}, xmldec, doctype, options);
    doc = new XMLDocument2(options);
    root = doc.element(name);
    if (!options.headless) {
      doc.declaration(options);
      if (options.pubID != null || options.sysID != null) {
        doc.dtd(options);
      }
    }
    return root;
  };
  lib.begin = function(options, onData, onEnd) {
    if (isFunction(options)) {
      [onData, onEnd] = [options, onData];
      options = {};
    }
    if (onData) {
      return new XMLDocumentCB2(options, onData, onEnd);
    } else {
      return new XMLDocument2(options);
    }
  };
  lib.stringWriter = function(options) {
    return new XMLStringWriter2(options);
  };
  lib.streamWriter = function(stream, options) {
    return new XMLStreamWriter2(stream, options);
  };
  lib.implementation = new XMLDOMImplementation2();
  lib.nodeType = NodeType2;
  lib.writerState = WriterState2;
}).call(commonjsGlobal);
var base64 = base64Js;
var xmlbuilder = lib;
build$1.build = build;
function ISODateString(d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
}
var toString = Object.prototype.toString;
function type(obj) {
  var m = toString.call(obj).match(/\[object (.*)\]/);
  return m ? m[1] : m;
}
function build(obj, opts) {
  var XMLHDR = {
    version: "1.0",
    encoding: "UTF-8"
  };
  var XMLDTD = {
    pubid: "-//Apple//DTD PLIST 1.0//EN",
    sysid: "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
  };
  var doc = xmlbuilder.create("plist");
  doc.dec(XMLHDR.version, XMLHDR.encoding, XMLHDR.standalone);
  doc.dtd(XMLDTD.pubid, XMLDTD.sysid);
  doc.att("version", "1.0");
  walk_obj(obj, doc);
  if (!opts) opts = {};
  opts.pretty = opts.pretty !== false;
  return doc.end(opts);
}
function walk_obj(next, next_child) {
  var tag_type, i, prop;
  var name = type(next);
  if ("Undefined" == name) {
    return;
  } else if (Array.isArray(next)) {
    next_child = next_child.ele("array");
    for (i = 0; i < next.length; i++) {
      walk_obj(next[i], next_child);
    }
  } else if (Buffer.isBuffer(next)) {
    next_child.ele("data").raw(next.toString("base64"));
  } else if ("Object" == name) {
    next_child = next_child.ele("dict");
    for (prop in next) {
      if (next.hasOwnProperty(prop)) {
        next_child.ele("key").txt(prop);
        walk_obj(next[prop], next_child);
      }
    }
  } else if ("Number" == name) {
    tag_type = next % 1 === 0 ? "integer" : "real";
    next_child.ele(tag_type).txt(next.toString());
  } else if ("BigInt" == name) {
    next_child.ele("integer").txt(next);
  } else if ("Date" == name) {
    next_child.ele("date").txt(ISODateString(new Date(next)));
  } else if ("Boolean" == name) {
    next_child.ele(next ? "true" : "false");
  } else if ("String" == name) {
    next_child.ele("string").txt(next);
  } else if ("ArrayBuffer" == name) {
    next_child.ele("data").raw(base64.fromByteArray(next));
  } else if (next && next.buffer && "ArrayBuffer" == type(next.buffer)) {
    next_child.ele("data").raw(base64.fromByteArray(new Uint8Array(next.buffer), next_child));
  } else if ("Null" === name) {
    next_child.ele("null").txt("");
  }
}
(function(exports$1) {
  var parserFunctions = parse$2;
  Object.keys(parserFunctions).forEach(function(k) {
    exports$1[k] = parserFunctions[k];
  });
  var builderFunctions = build$1;
  Object.keys(builderFunctions).forEach(function(k) {
    exports$1[k] = builderFunctions[k];
  });
})(plist);
var bplistParser = {};
var BigInteger = { exports: {} };
(function(module) {
  var bigInt = function(undefined$1) {
    var BASE = 1e7, LOG_BASE = 7, MAX_INT = 9007199254740992, MAX_INT_ARR = smallToArray(MAX_INT), DEFAULT_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
    var supportsNativeBigInt = typeof BigInt === "function";
    function Integer(v, radix, alphabet, caseSensitive) {
      if (typeof v === "undefined") return Integer[0];
      if (typeof radix !== "undefined") return +radix === 10 && !alphabet ? parseValue(v) : parseBase(v, radix, alphabet, caseSensitive);
      return parseValue(v);
    }
    function BigInteger2(value, sign) {
      this.value = value;
      this.sign = sign;
      this.isSmall = false;
    }
    BigInteger2.prototype = Object.create(Integer.prototype);
    function SmallInteger(value) {
      this.value = value;
      this.sign = value < 0;
      this.isSmall = true;
    }
    SmallInteger.prototype = Object.create(Integer.prototype);
    function NativeBigInt(value) {
      this.value = value;
    }
    NativeBigInt.prototype = Object.create(Integer.prototype);
    function isPrecise(n) {
      return -MAX_INT < n && n < MAX_INT;
    }
    function smallToArray(n) {
      if (n < 1e7)
        return [n];
      if (n < 1e14)
        return [n % 1e7, Math.floor(n / 1e7)];
      return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
    }
    function arrayToSmall(arr) {
      trim(arr);
      var length = arr.length;
      if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
        switch (length) {
          case 0:
            return 0;
          case 1:
            return arr[0];
          case 2:
            return arr[0] + arr[1] * BASE;
          default:
            return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
        }
      }
      return arr;
    }
    function trim(v) {
      var i2 = v.length;
      while (v[--i2] === 0) ;
      v.length = i2 + 1;
    }
    function createArray(length) {
      var x = new Array(length);
      var i2 = -1;
      while (++i2 < length) {
        x[i2] = 0;
      }
      return x;
    }
    function truncate(n) {
      if (n > 0) return Math.floor(n);
      return Math.ceil(n);
    }
    function add(a, b) {
      var l_a = a.length, l_b = b.length, r = new Array(l_a), carry = 0, base = BASE, sum, i2;
      for (i2 = 0; i2 < l_b; i2++) {
        sum = a[i2] + b[i2] + carry;
        carry = sum >= base ? 1 : 0;
        r[i2] = sum - carry * base;
      }
      while (i2 < l_a) {
        sum = a[i2] + carry;
        carry = sum === base ? 1 : 0;
        r[i2++] = sum - carry * base;
      }
      if (carry > 0) r.push(carry);
      return r;
    }
    function addAny(a, b) {
      if (a.length >= b.length) return add(a, b);
      return add(b, a);
    }
    function addSmall(a, carry) {
      var l = a.length, r = new Array(l), base = BASE, sum, i2;
      for (i2 = 0; i2 < l; i2++) {
        sum = a[i2] - base + carry;
        carry = Math.floor(sum / base);
        r[i2] = sum - carry * base;
        carry += 1;
      }
      while (carry > 0) {
        r[i2++] = carry % base;
        carry = Math.floor(carry / base);
      }
      return r;
    }
    BigInteger2.prototype.add = function(v) {
      var n = parseValue(v);
      if (this.sign !== n.sign) {
        return this.subtract(n.negate());
      }
      var a = this.value, b = n.value;
      if (n.isSmall) {
        return new BigInteger2(addSmall(a, Math.abs(b)), this.sign);
      }
      return new BigInteger2(addAny(a, b), this.sign);
    };
    BigInteger2.prototype.plus = BigInteger2.prototype.add;
    SmallInteger.prototype.add = function(v) {
      var n = parseValue(v);
      var a = this.value;
      if (a < 0 !== n.sign) {
        return this.subtract(n.negate());
      }
      var b = n.value;
      if (n.isSmall) {
        if (isPrecise(a + b)) return new SmallInteger(a + b);
        b = smallToArray(Math.abs(b));
      }
      return new BigInteger2(addSmall(b, Math.abs(a)), a < 0);
    };
    SmallInteger.prototype.plus = SmallInteger.prototype.add;
    NativeBigInt.prototype.add = function(v) {
      return new NativeBigInt(this.value + parseValue(v).value);
    };
    NativeBigInt.prototype.plus = NativeBigInt.prototype.add;
    function subtract(a, b) {
      var a_l = a.length, b_l = b.length, r = new Array(a_l), borrow = 0, base = BASE, i2, difference;
      for (i2 = 0; i2 < b_l; i2++) {
        difference = a[i2] - borrow - b[i2];
        if (difference < 0) {
          difference += base;
          borrow = 1;
        } else borrow = 0;
        r[i2] = difference;
      }
      for (i2 = b_l; i2 < a_l; i2++) {
        difference = a[i2] - borrow;
        if (difference < 0) difference += base;
        else {
          r[i2++] = difference;
          break;
        }
        r[i2] = difference;
      }
      for (; i2 < a_l; i2++) {
        r[i2] = a[i2];
      }
      trim(r);
      return r;
    }
    function subtractAny(a, b, sign) {
      var value;
      if (compareAbs(a, b) >= 0) {
        value = subtract(a, b);
      } else {
        value = subtract(b, a);
        sign = !sign;
      }
      value = arrayToSmall(value);
      if (typeof value === "number") {
        if (sign) value = -value;
        return new SmallInteger(value);
      }
      return new BigInteger2(value, sign);
    }
    function subtractSmall(a, b, sign) {
      var l = a.length, r = new Array(l), carry = -b, base = BASE, i2, difference;
      for (i2 = 0; i2 < l; i2++) {
        difference = a[i2] + carry;
        carry = Math.floor(difference / base);
        difference %= base;
        r[i2] = difference < 0 ? difference + base : difference;
      }
      r = arrayToSmall(r);
      if (typeof r === "number") {
        if (sign) r = -r;
        return new SmallInteger(r);
      }
      return new BigInteger2(r, sign);
    }
    BigInteger2.prototype.subtract = function(v) {
      var n = parseValue(v);
      if (this.sign !== n.sign) {
        return this.add(n.negate());
      }
      var a = this.value, b = n.value;
      if (n.isSmall)
        return subtractSmall(a, Math.abs(b), this.sign);
      return subtractAny(a, b, this.sign);
    };
    BigInteger2.prototype.minus = BigInteger2.prototype.subtract;
    SmallInteger.prototype.subtract = function(v) {
      var n = parseValue(v);
      var a = this.value;
      if (a < 0 !== n.sign) {
        return this.add(n.negate());
      }
      var b = n.value;
      if (n.isSmall) {
        return new SmallInteger(a - b);
      }
      return subtractSmall(b, Math.abs(a), a >= 0);
    };
    SmallInteger.prototype.minus = SmallInteger.prototype.subtract;
    NativeBigInt.prototype.subtract = function(v) {
      return new NativeBigInt(this.value - parseValue(v).value);
    };
    NativeBigInt.prototype.minus = NativeBigInt.prototype.subtract;
    BigInteger2.prototype.negate = function() {
      return new BigInteger2(this.value, !this.sign);
    };
    SmallInteger.prototype.negate = function() {
      var sign = this.sign;
      var small = new SmallInteger(-this.value);
      small.sign = !sign;
      return small;
    };
    NativeBigInt.prototype.negate = function() {
      return new NativeBigInt(-this.value);
    };
    BigInteger2.prototype.abs = function() {
      return new BigInteger2(this.value, false);
    };
    SmallInteger.prototype.abs = function() {
      return new SmallInteger(Math.abs(this.value));
    };
    NativeBigInt.prototype.abs = function() {
      return new NativeBigInt(this.value >= 0 ? this.value : -this.value);
    };
    function multiplyLong(a, b) {
      var a_l = a.length, b_l = b.length, l = a_l + b_l, r = createArray(l), base = BASE, product, carry, i2, a_i, b_j;
      for (i2 = 0; i2 < a_l; ++i2) {
        a_i = a[i2];
        for (var j = 0; j < b_l; ++j) {
          b_j = b[j];
          product = a_i * b_j + r[i2 + j];
          carry = Math.floor(product / base);
          r[i2 + j] = product - carry * base;
          r[i2 + j + 1] += carry;
        }
      }
      trim(r);
      return r;
    }
    function multiplySmall(a, b) {
      var l = a.length, r = new Array(l), base = BASE, carry = 0, product, i2;
      for (i2 = 0; i2 < l; i2++) {
        product = a[i2] * b + carry;
        carry = Math.floor(product / base);
        r[i2] = product - carry * base;
      }
      while (carry > 0) {
        r[i2++] = carry % base;
        carry = Math.floor(carry / base);
      }
      return r;
    }
    function shiftLeft(x, n) {
      var r = [];
      while (n-- > 0) r.push(0);
      return r.concat(x);
    }
    function multiplyKaratsuba(x, y) {
      var n = Math.max(x.length, y.length);
      if (n <= 30) return multiplyLong(x, y);
      n = Math.ceil(n / 2);
      var b = x.slice(n), a = x.slice(0, n), d = y.slice(n), c = y.slice(0, n);
      var ac = multiplyKaratsuba(a, c), bd = multiplyKaratsuba(b, d), abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));
      var product = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));
      trim(product);
      return product;
    }
    function useKaratsuba(l1, l2) {
      return -0.012 * l1 - 0.012 * l2 + 15e-6 * l1 * l2 > 0;
    }
    BigInteger2.prototype.multiply = function(v) {
      var n = parseValue(v), a = this.value, b = n.value, sign = this.sign !== n.sign, abs;
      if (n.isSmall) {
        if (b === 0) return Integer[0];
        if (b === 1) return this;
        if (b === -1) return this.negate();
        abs = Math.abs(b);
        if (abs < BASE) {
          return new BigInteger2(multiplySmall(a, abs), sign);
        }
        b = smallToArray(abs);
      }
      if (useKaratsuba(a.length, b.length))
        return new BigInteger2(multiplyKaratsuba(a, b), sign);
      return new BigInteger2(multiplyLong(a, b), sign);
    };
    BigInteger2.prototype.times = BigInteger2.prototype.multiply;
    function multiplySmallAndArray(a, b, sign) {
      if (a < BASE) {
        return new BigInteger2(multiplySmall(b, a), sign);
      }
      return new BigInteger2(multiplyLong(b, smallToArray(a)), sign);
    }
    SmallInteger.prototype._multiplyBySmall = function(a) {
      if (isPrecise(a.value * this.value)) {
        return new SmallInteger(a.value * this.value);
      }
      return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
    };
    BigInteger2.prototype._multiplyBySmall = function(a) {
      if (a.value === 0) return Integer[0];
      if (a.value === 1) return this;
      if (a.value === -1) return this.negate();
      return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
    };
    SmallInteger.prototype.multiply = function(v) {
      return parseValue(v)._multiplyBySmall(this);
    };
    SmallInteger.prototype.times = SmallInteger.prototype.multiply;
    NativeBigInt.prototype.multiply = function(v) {
      return new NativeBigInt(this.value * parseValue(v).value);
    };
    NativeBigInt.prototype.times = NativeBigInt.prototype.multiply;
    function square(a) {
      var l = a.length, r = createArray(l + l), base = BASE, product, carry, i2, a_i, a_j;
      for (i2 = 0; i2 < l; i2++) {
        a_i = a[i2];
        carry = 0 - a_i * a_i;
        for (var j = i2; j < l; j++) {
          a_j = a[j];
          product = 2 * (a_i * a_j) + r[i2 + j] + carry;
          carry = Math.floor(product / base);
          r[i2 + j] = product - carry * base;
        }
        r[i2 + l] = carry;
      }
      trim(r);
      return r;
    }
    BigInteger2.prototype.square = function() {
      return new BigInteger2(square(this.value), false);
    };
    SmallInteger.prototype.square = function() {
      var value = this.value * this.value;
      if (isPrecise(value)) return new SmallInteger(value);
      return new BigInteger2(square(smallToArray(Math.abs(this.value))), false);
    };
    NativeBigInt.prototype.square = function(v) {
      return new NativeBigInt(this.value * this.value);
    };
    function divMod1(a, b) {
      var a_l = a.length, b_l = b.length, base = BASE, result = createArray(b.length), divisorMostSignificantDigit = b[b_l - 1], lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)), remainder = multiplySmall(a, lambda), divisor = multiplySmall(b, lambda), quotientDigit, shift, carry, borrow, i2, l, q;
      if (remainder.length <= a_l) remainder.push(0);
      divisor.push(0);
      divisorMostSignificantDigit = divisor[b_l - 1];
      for (shift = a_l - b_l; shift >= 0; shift--) {
        quotientDigit = base - 1;
        if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
          quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
        }
        carry = 0;
        borrow = 0;
        l = divisor.length;
        for (i2 = 0; i2 < l; i2++) {
          carry += quotientDigit * divisor[i2];
          q = Math.floor(carry / base);
          borrow += remainder[shift + i2] - (carry - q * base);
          carry = q;
          if (borrow < 0) {
            remainder[shift + i2] = borrow + base;
            borrow = -1;
          } else {
            remainder[shift + i2] = borrow;
            borrow = 0;
          }
        }
        while (borrow !== 0) {
          quotientDigit -= 1;
          carry = 0;
          for (i2 = 0; i2 < l; i2++) {
            carry += remainder[shift + i2] - base + divisor[i2];
            if (carry < 0) {
              remainder[shift + i2] = carry + base;
              carry = 0;
            } else {
              remainder[shift + i2] = carry;
              carry = 1;
            }
          }
          borrow += carry;
        }
        result[shift] = quotientDigit;
      }
      remainder = divModSmall(remainder, lambda)[0];
      return [arrayToSmall(result), arrayToSmall(remainder)];
    }
    function divMod2(a, b) {
      var a_l = a.length, b_l = b.length, result = [], part = [], base = BASE, guess, xlen, highx, highy, check;
      while (a_l) {
        part.unshift(a[--a_l]);
        trim(part);
        if (compareAbs(part, b) < 0) {
          result.push(0);
          continue;
        }
        xlen = part.length;
        highx = part[xlen - 1] * base + part[xlen - 2];
        highy = b[b_l - 1] * base + b[b_l - 2];
        if (xlen > b_l) {
          highx = (highx + 1) * base;
        }
        guess = Math.ceil(highx / highy);
        do {
          check = multiplySmall(b, guess);
          if (compareAbs(check, part) <= 0) break;
          guess--;
        } while (guess);
        result.push(guess);
        part = subtract(part, check);
      }
      result.reverse();
      return [arrayToSmall(result), arrayToSmall(part)];
    }
    function divModSmall(value, lambda) {
      var length = value.length, quotient = createArray(length), base = BASE, i2, q, remainder, divisor;
      remainder = 0;
      for (i2 = length - 1; i2 >= 0; --i2) {
        divisor = remainder * base + value[i2];
        q = truncate(divisor / lambda);
        remainder = divisor - q * lambda;
        quotient[i2] = q | 0;
      }
      return [quotient, remainder | 0];
    }
    function divModAny(self2, v) {
      var value, n = parseValue(v);
      if (supportsNativeBigInt) {
        return [new NativeBigInt(self2.value / n.value), new NativeBigInt(self2.value % n.value)];
      }
      var a = self2.value, b = n.value;
      var quotient;
      if (b === 0) throw new Error("Cannot divide by zero");
      if (self2.isSmall) {
        if (n.isSmall) {
          return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
        }
        return [Integer[0], self2];
      }
      if (n.isSmall) {
        if (b === 1) return [self2, Integer[0]];
        if (b == -1) return [self2.negate(), Integer[0]];
        var abs = Math.abs(b);
        if (abs < BASE) {
          value = divModSmall(a, abs);
          quotient = arrayToSmall(value[0]);
          var remainder = value[1];
          if (self2.sign) remainder = -remainder;
          if (typeof quotient === "number") {
            if (self2.sign !== n.sign) quotient = -quotient;
            return [new SmallInteger(quotient), new SmallInteger(remainder)];
          }
          return [new BigInteger2(quotient, self2.sign !== n.sign), new SmallInteger(remainder)];
        }
        b = smallToArray(abs);
      }
      var comparison = compareAbs(a, b);
      if (comparison === -1) return [Integer[0], self2];
      if (comparison === 0) return [Integer[self2.sign === n.sign ? 1 : -1], Integer[0]];
      if (a.length + b.length <= 200)
        value = divMod1(a, b);
      else value = divMod2(a, b);
      quotient = value[0];
      var qSign = self2.sign !== n.sign, mod = value[1], mSign = self2.sign;
      if (typeof quotient === "number") {
        if (qSign) quotient = -quotient;
        quotient = new SmallInteger(quotient);
      } else quotient = new BigInteger2(quotient, qSign);
      if (typeof mod === "number") {
        if (mSign) mod = -mod;
        mod = new SmallInteger(mod);
      } else mod = new BigInteger2(mod, mSign);
      return [quotient, mod];
    }
    BigInteger2.prototype.divmod = function(v) {
      var result = divModAny(this, v);
      return {
        quotient: result[0],
        remainder: result[1]
      };
    };
    NativeBigInt.prototype.divmod = SmallInteger.prototype.divmod = BigInteger2.prototype.divmod;
    BigInteger2.prototype.divide = function(v) {
      return divModAny(this, v)[0];
    };
    NativeBigInt.prototype.over = NativeBigInt.prototype.divide = function(v) {
      return new NativeBigInt(this.value / parseValue(v).value);
    };
    SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger2.prototype.over = BigInteger2.prototype.divide;
    BigInteger2.prototype.mod = function(v) {
      return divModAny(this, v)[1];
    };
    NativeBigInt.prototype.mod = NativeBigInt.prototype.remainder = function(v) {
      return new NativeBigInt(this.value % parseValue(v).value);
    };
    SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger2.prototype.remainder = BigInteger2.prototype.mod;
    BigInteger2.prototype.pow = function(v) {
      var n = parseValue(v), a = this.value, b = n.value, value, x, y;
      if (b === 0) return Integer[1];
      if (a === 0) return Integer[0];
      if (a === 1) return Integer[1];
      if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];
      if (n.sign) {
        return Integer[0];
      }
      if (!n.isSmall) throw new Error("The exponent " + n.toString() + " is too large.");
      if (this.isSmall) {
        if (isPrecise(value = Math.pow(a, b)))
          return new SmallInteger(truncate(value));
      }
      x = this;
      y = Integer[1];
      while (true) {
        if (b & true) {
          y = y.times(x);
          --b;
        }
        if (b === 0) break;
        b /= 2;
        x = x.square();
      }
      return y;
    };
    SmallInteger.prototype.pow = BigInteger2.prototype.pow;
    NativeBigInt.prototype.pow = function(v) {
      var n = parseValue(v);
      var a = this.value, b = n.value;
      var _0 = BigInt(0), _1 = BigInt(1), _2 = BigInt(2);
      if (b === _0) return Integer[1];
      if (a === _0) return Integer[0];
      if (a === _1) return Integer[1];
      if (a === BigInt(-1)) return n.isEven() ? Integer[1] : Integer[-1];
      if (n.isNegative()) return new NativeBigInt(_0);
      var x = this;
      var y = Integer[1];
      while (true) {
        if ((b & _1) === _1) {
          y = y.times(x);
          --b;
        }
        if (b === _0) break;
        b /= _2;
        x = x.square();
      }
      return y;
    };
    BigInteger2.prototype.modPow = function(exp, mod) {
      exp = parseValue(exp);
      mod = parseValue(mod);
      if (mod.isZero()) throw new Error("Cannot take modPow with modulus 0");
      var r = Integer[1], base = this.mod(mod);
      if (exp.isNegative()) {
        exp = exp.multiply(Integer[-1]);
        base = base.modInv(mod);
      }
      while (exp.isPositive()) {
        if (base.isZero()) return Integer[0];
        if (exp.isOdd()) r = r.multiply(base).mod(mod);
        exp = exp.divide(2);
        base = base.square().mod(mod);
      }
      return r;
    };
    NativeBigInt.prototype.modPow = SmallInteger.prototype.modPow = BigInteger2.prototype.modPow;
    function compareAbs(a, b) {
      if (a.length !== b.length) {
        return a.length > b.length ? 1 : -1;
      }
      for (var i2 = a.length - 1; i2 >= 0; i2--) {
        if (a[i2] !== b[i2]) return a[i2] > b[i2] ? 1 : -1;
      }
      return 0;
    }
    BigInteger2.prototype.compareAbs = function(v) {
      var n = parseValue(v), a = this.value, b = n.value;
      if (n.isSmall) return 1;
      return compareAbs(a, b);
    };
    SmallInteger.prototype.compareAbs = function(v) {
      var n = parseValue(v), a = Math.abs(this.value), b = n.value;
      if (n.isSmall) {
        b = Math.abs(b);
        return a === b ? 0 : a > b ? 1 : -1;
      }
      return -1;
    };
    NativeBigInt.prototype.compareAbs = function(v) {
      var a = this.value;
      var b = parseValue(v).value;
      a = a >= 0 ? a : -a;
      b = b >= 0 ? b : -b;
      return a === b ? 0 : a > b ? 1 : -1;
    };
    BigInteger2.prototype.compare = function(v) {
      if (v === Infinity) {
        return -1;
      }
      if (v === -Infinity) {
        return 1;
      }
      var n = parseValue(v), a = this.value, b = n.value;
      if (this.sign !== n.sign) {
        return n.sign ? 1 : -1;
      }
      if (n.isSmall) {
        return this.sign ? -1 : 1;
      }
      return compareAbs(a, b) * (this.sign ? -1 : 1);
    };
    BigInteger2.prototype.compareTo = BigInteger2.prototype.compare;
    SmallInteger.prototype.compare = function(v) {
      if (v === Infinity) {
        return -1;
      }
      if (v === -Infinity) {
        return 1;
      }
      var n = parseValue(v), a = this.value, b = n.value;
      if (n.isSmall) {
        return a == b ? 0 : a > b ? 1 : -1;
      }
      if (a < 0 !== n.sign) {
        return a < 0 ? -1 : 1;
      }
      return a < 0 ? 1 : -1;
    };
    SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;
    NativeBigInt.prototype.compare = function(v) {
      if (v === Infinity) {
        return -1;
      }
      if (v === -Infinity) {
        return 1;
      }
      var a = this.value;
      var b = parseValue(v).value;
      return a === b ? 0 : a > b ? 1 : -1;
    };
    NativeBigInt.prototype.compareTo = NativeBigInt.prototype.compare;
    BigInteger2.prototype.equals = function(v) {
      return this.compare(v) === 0;
    };
    NativeBigInt.prototype.eq = NativeBigInt.prototype.equals = SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger2.prototype.eq = BigInteger2.prototype.equals;
    BigInteger2.prototype.notEquals = function(v) {
      return this.compare(v) !== 0;
    };
    NativeBigInt.prototype.neq = NativeBigInt.prototype.notEquals = SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger2.prototype.neq = BigInteger2.prototype.notEquals;
    BigInteger2.prototype.greater = function(v) {
      return this.compare(v) > 0;
    };
    NativeBigInt.prototype.gt = NativeBigInt.prototype.greater = SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger2.prototype.gt = BigInteger2.prototype.greater;
    BigInteger2.prototype.lesser = function(v) {
      return this.compare(v) < 0;
    };
    NativeBigInt.prototype.lt = NativeBigInt.prototype.lesser = SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger2.prototype.lt = BigInteger2.prototype.lesser;
    BigInteger2.prototype.greaterOrEquals = function(v) {
      return this.compare(v) >= 0;
    };
    NativeBigInt.prototype.geq = NativeBigInt.prototype.greaterOrEquals = SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger2.prototype.geq = BigInteger2.prototype.greaterOrEquals;
    BigInteger2.prototype.lesserOrEquals = function(v) {
      return this.compare(v) <= 0;
    };
    NativeBigInt.prototype.leq = NativeBigInt.prototype.lesserOrEquals = SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger2.prototype.leq = BigInteger2.prototype.lesserOrEquals;
    BigInteger2.prototype.isEven = function() {
      return (this.value[0] & 1) === 0;
    };
    SmallInteger.prototype.isEven = function() {
      return (this.value & 1) === 0;
    };
    NativeBigInt.prototype.isEven = function() {
      return (this.value & BigInt(1)) === BigInt(0);
    };
    BigInteger2.prototype.isOdd = function() {
      return (this.value[0] & 1) === 1;
    };
    SmallInteger.prototype.isOdd = function() {
      return (this.value & 1) === 1;
    };
    NativeBigInt.prototype.isOdd = function() {
      return (this.value & BigInt(1)) === BigInt(1);
    };
    BigInteger2.prototype.isPositive = function() {
      return !this.sign;
    };
    SmallInteger.prototype.isPositive = function() {
      return this.value > 0;
    };
    NativeBigInt.prototype.isPositive = SmallInteger.prototype.isPositive;
    BigInteger2.prototype.isNegative = function() {
      return this.sign;
    };
    SmallInteger.prototype.isNegative = function() {
      return this.value < 0;
    };
    NativeBigInt.prototype.isNegative = SmallInteger.prototype.isNegative;
    BigInteger2.prototype.isUnit = function() {
      return false;
    };
    SmallInteger.prototype.isUnit = function() {
      return Math.abs(this.value) === 1;
    };
    NativeBigInt.prototype.isUnit = function() {
      return this.abs().value === BigInt(1);
    };
    BigInteger2.prototype.isZero = function() {
      return false;
    };
    SmallInteger.prototype.isZero = function() {
      return this.value === 0;
    };
    NativeBigInt.prototype.isZero = function() {
      return this.value === BigInt(0);
    };
    BigInteger2.prototype.isDivisibleBy = function(v) {
      var n = parseValue(v);
      if (n.isZero()) return false;
      if (n.isUnit()) return true;
      if (n.compareAbs(2) === 0) return this.isEven();
      return this.mod(n).isZero();
    };
    NativeBigInt.prototype.isDivisibleBy = SmallInteger.prototype.isDivisibleBy = BigInteger2.prototype.isDivisibleBy;
    function isBasicPrime(v) {
      var n = v.abs();
      if (n.isUnit()) return false;
      if (n.equals(2) || n.equals(3) || n.equals(5)) return true;
      if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;
      if (n.lesser(49)) return true;
    }
    function millerRabinTest(n, a) {
      var nPrev = n.prev(), b = nPrev, r = 0, d, i2, x;
      while (b.isEven()) b = b.divide(2), r++;
      next: for (i2 = 0; i2 < a.length; i2++) {
        if (n.lesser(a[i2])) continue;
        x = bigInt(a[i2]).modPow(b, n);
        if (x.isUnit() || x.equals(nPrev)) continue;
        for (d = r - 1; d != 0; d--) {
          x = x.square().mod(n);
          if (x.isUnit()) return false;
          if (x.equals(nPrev)) continue next;
        }
        return false;
      }
      return true;
    }
    BigInteger2.prototype.isPrime = function(strict) {
      var isPrime = isBasicPrime(this);
      if (isPrime !== undefined$1) return isPrime;
      var n = this.abs();
      var bits = n.bitLength();
      if (bits <= 64)
        return millerRabinTest(n, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
      var logN = Math.log(2) * bits.toJSNumber();
      var t2 = Math.ceil(strict === true ? 2 * Math.pow(logN, 2) : logN);
      for (var a = [], i2 = 0; i2 < t2; i2++) {
        a.push(bigInt(i2 + 2));
      }
      return millerRabinTest(n, a);
    };
    NativeBigInt.prototype.isPrime = SmallInteger.prototype.isPrime = BigInteger2.prototype.isPrime;
    BigInteger2.prototype.isProbablePrime = function(iterations, rng) {
      var isPrime = isBasicPrime(this);
      if (isPrime !== undefined$1) return isPrime;
      var n = this.abs();
      var t2 = iterations === undefined$1 ? 5 : iterations;
      for (var a = [], i2 = 0; i2 < t2; i2++) {
        a.push(bigInt.randBetween(2, n.minus(2), rng));
      }
      return millerRabinTest(n, a);
    };
    NativeBigInt.prototype.isProbablePrime = SmallInteger.prototype.isProbablePrime = BigInteger2.prototype.isProbablePrime;
    BigInteger2.prototype.modInv = function(n) {
      var t2 = bigInt.zero, newT = bigInt.one, r = parseValue(n), newR = this.abs(), q, lastT, lastR;
      while (!newR.isZero()) {
        q = r.divide(newR);
        lastT = t2;
        lastR = r;
        t2 = newT;
        r = newR;
        newT = lastT.subtract(q.multiply(newT));
        newR = lastR.subtract(q.multiply(newR));
      }
      if (!r.isUnit()) throw new Error(this.toString() + " and " + n.toString() + " are not co-prime");
      if (t2.compare(0) === -1) {
        t2 = t2.add(n);
      }
      if (this.isNegative()) {
        return t2.negate();
      }
      return t2;
    };
    NativeBigInt.prototype.modInv = SmallInteger.prototype.modInv = BigInteger2.prototype.modInv;
    BigInteger2.prototype.next = function() {
      var value = this.value;
      if (this.sign) {
        return subtractSmall(value, 1, this.sign);
      }
      return new BigInteger2(addSmall(value, 1), this.sign);
    };
    SmallInteger.prototype.next = function() {
      var value = this.value;
      if (value + 1 < MAX_INT) return new SmallInteger(value + 1);
      return new BigInteger2(MAX_INT_ARR, false);
    };
    NativeBigInt.prototype.next = function() {
      return new NativeBigInt(this.value + BigInt(1));
    };
    BigInteger2.prototype.prev = function() {
      var value = this.value;
      if (this.sign) {
        return new BigInteger2(addSmall(value, 1), true);
      }
      return subtractSmall(value, 1, this.sign);
    };
    SmallInteger.prototype.prev = function() {
      var value = this.value;
      if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);
      return new BigInteger2(MAX_INT_ARR, true);
    };
    NativeBigInt.prototype.prev = function() {
      return new NativeBigInt(this.value - BigInt(1));
    };
    var powersOfTwo = [1];
    while (2 * powersOfTwo[powersOfTwo.length - 1] <= BASE) powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
    var powers2Length = powersOfTwo.length, highestPower2 = powersOfTwo[powers2Length - 1];
    function shift_isSmall(n) {
      return Math.abs(n) <= BASE;
    }
    BigInteger2.prototype.shiftLeft = function(v) {
      var n = parseValue(v).toJSNumber();
      if (!shift_isSmall(n)) {
        throw new Error(String(n) + " is too large for shifting.");
      }
      if (n < 0) return this.shiftRight(-n);
      var result = this;
      if (result.isZero()) return result;
      while (n >= powers2Length) {
        result = result.multiply(highestPower2);
        n -= powers2Length - 1;
      }
      return result.multiply(powersOfTwo[n]);
    };
    NativeBigInt.prototype.shiftLeft = SmallInteger.prototype.shiftLeft = BigInteger2.prototype.shiftLeft;
    BigInteger2.prototype.shiftRight = function(v) {
      var remQuo;
      var n = parseValue(v).toJSNumber();
      if (!shift_isSmall(n)) {
        throw new Error(String(n) + " is too large for shifting.");
      }
      if (n < 0) return this.shiftLeft(-n);
      var result = this;
      while (n >= powers2Length) {
        if (result.isZero() || result.isNegative() && result.isUnit()) return result;
        remQuo = divModAny(result, highestPower2);
        result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
        n -= powers2Length - 1;
      }
      remQuo = divModAny(result, powersOfTwo[n]);
      return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
    };
    NativeBigInt.prototype.shiftRight = SmallInteger.prototype.shiftRight = BigInteger2.prototype.shiftRight;
    function bitwise(x, y, fn) {
      y = parseValue(y);
      var xSign = x.isNegative(), ySign = y.isNegative();
      var xRem = xSign ? x.not() : x, yRem = ySign ? y.not() : y;
      var xDigit = 0, yDigit = 0;
      var xDivMod = null, yDivMod = null;
      var result = [];
      while (!xRem.isZero() || !yRem.isZero()) {
        xDivMod = divModAny(xRem, highestPower2);
        xDigit = xDivMod[1].toJSNumber();
        if (xSign) {
          xDigit = highestPower2 - 1 - xDigit;
        }
        yDivMod = divModAny(yRem, highestPower2);
        yDigit = yDivMod[1].toJSNumber();
        if (ySign) {
          yDigit = highestPower2 - 1 - yDigit;
        }
        xRem = xDivMod[0];
        yRem = yDivMod[0];
        result.push(fn(xDigit, yDigit));
      }
      var sum = fn(xSign ? 1 : 0, ySign ? 1 : 0) !== 0 ? bigInt(-1) : bigInt(0);
      for (var i2 = result.length - 1; i2 >= 0; i2 -= 1) {
        sum = sum.multiply(highestPower2).add(bigInt(result[i2]));
      }
      return sum;
    }
    BigInteger2.prototype.not = function() {
      return this.negate().prev();
    };
    NativeBigInt.prototype.not = SmallInteger.prototype.not = BigInteger2.prototype.not;
    BigInteger2.prototype.and = function(n) {
      return bitwise(this, n, function(a, b) {
        return a & b;
      });
    };
    NativeBigInt.prototype.and = SmallInteger.prototype.and = BigInteger2.prototype.and;
    BigInteger2.prototype.or = function(n) {
      return bitwise(this, n, function(a, b) {
        return a | b;
      });
    };
    NativeBigInt.prototype.or = SmallInteger.prototype.or = BigInteger2.prototype.or;
    BigInteger2.prototype.xor = function(n) {
      return bitwise(this, n, function(a, b) {
        return a ^ b;
      });
    };
    NativeBigInt.prototype.xor = SmallInteger.prototype.xor = BigInteger2.prototype.xor;
    var LOBMASK_I = 1 << 30, LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
    function roughLOB(n) {
      var v = n.value, x = typeof v === "number" ? v | LOBMASK_I : typeof v === "bigint" ? v | BigInt(LOBMASK_I) : v[0] + v[1] * BASE | LOBMASK_BI;
      return x & -x;
    }
    function integerLogarithm(value, base) {
      if (base.compareTo(value) <= 0) {
        var tmp = integerLogarithm(value, base.square(base));
        var p = tmp.p;
        var e = tmp.e;
        var t2 = p.multiply(base);
        return t2.compareTo(value) <= 0 ? { p: t2, e: e * 2 + 1 } : { p, e: e * 2 };
      }
      return { p: bigInt(1), e: 0 };
    }
    BigInteger2.prototype.bitLength = function() {
      var n = this;
      if (n.compareTo(bigInt(0)) < 0) {
        n = n.negate().subtract(bigInt(1));
      }
      if (n.compareTo(bigInt(0)) === 0) {
        return bigInt(0);
      }
      return bigInt(integerLogarithm(n, bigInt(2)).e).add(bigInt(1));
    };
    NativeBigInt.prototype.bitLength = SmallInteger.prototype.bitLength = BigInteger2.prototype.bitLength;
    function max(a, b) {
      a = parseValue(a);
      b = parseValue(b);
      return a.greater(b) ? a : b;
    }
    function min(a, b) {
      a = parseValue(a);
      b = parseValue(b);
      return a.lesser(b) ? a : b;
    }
    function gcd(a, b) {
      a = parseValue(a).abs();
      b = parseValue(b).abs();
      if (a.equals(b)) return a;
      if (a.isZero()) return b;
      if (b.isZero()) return a;
      var c = Integer[1], d, t2;
      while (a.isEven() && b.isEven()) {
        d = min(roughLOB(a), roughLOB(b));
        a = a.divide(d);
        b = b.divide(d);
        c = c.multiply(d);
      }
      while (a.isEven()) {
        a = a.divide(roughLOB(a));
      }
      do {
        while (b.isEven()) {
          b = b.divide(roughLOB(b));
        }
        if (a.greater(b)) {
          t2 = b;
          b = a;
          a = t2;
        }
        b = b.subtract(a);
      } while (!b.isZero());
      return c.isUnit() ? a : a.multiply(c);
    }
    function lcm(a, b) {
      a = parseValue(a).abs();
      b = parseValue(b).abs();
      return a.divide(gcd(a, b)).multiply(b);
    }
    function randBetween(a, b, rng) {
      a = parseValue(a);
      b = parseValue(b);
      var usedRNG = rng || Math.random;
      var low = min(a, b), high = max(a, b);
      var range2 = high.subtract(low).add(1);
      if (range2.isSmall) return low.add(Math.floor(usedRNG() * range2));
      var digits = toBase(range2, BASE).value;
      var result = [], restricted = true;
      for (var i2 = 0; i2 < digits.length; i2++) {
        var top = restricted ? digits[i2] + (i2 + 1 < digits.length ? digits[i2 + 1] / BASE : 0) : BASE;
        var digit = truncate(usedRNG() * top);
        result.push(digit);
        if (digit < digits[i2]) restricted = false;
      }
      return low.add(Integer.fromArray(result, BASE, false));
    }
    var parseBase = function(text, base, alphabet, caseSensitive) {
      alphabet = alphabet || DEFAULT_ALPHABET;
      text = String(text);
      if (!caseSensitive) {
        text = text.toLowerCase();
        alphabet = alphabet.toLowerCase();
      }
      var length = text.length;
      var i2;
      var absBase = Math.abs(base);
      var alphabetValues = {};
      for (i2 = 0; i2 < alphabet.length; i2++) {
        alphabetValues[alphabet[i2]] = i2;
      }
      for (i2 = 0; i2 < length; i2++) {
        var c = text[i2];
        if (c === "-") continue;
        if (c in alphabetValues) {
          if (alphabetValues[c] >= absBase) {
            if (c === "1" && absBase === 1) continue;
            throw new Error(c + " is not a valid digit in base " + base + ".");
          }
        }
      }
      base = parseValue(base);
      var digits = [];
      var isNegative = text[0] === "-";
      for (i2 = isNegative ? 1 : 0; i2 < text.length; i2++) {
        var c = text[i2];
        if (c in alphabetValues) digits.push(parseValue(alphabetValues[c]));
        else if (c === "<") {
          var start = i2;
          do {
            i2++;
          } while (text[i2] !== ">" && i2 < text.length);
          digits.push(parseValue(text.slice(start + 1, i2)));
        } else throw new Error(c + " is not a valid character");
      }
      return parseBaseFromArray(digits, base, isNegative);
    };
    function parseBaseFromArray(digits, base, isNegative) {
      var val = Integer[0], pow = Integer[1], i2;
      for (i2 = digits.length - 1; i2 >= 0; i2--) {
        val = val.add(digits[i2].times(pow));
        pow = pow.times(base);
      }
      return isNegative ? val.negate() : val;
    }
    function stringify(digit, alphabet) {
      alphabet = alphabet || DEFAULT_ALPHABET;
      if (digit < alphabet.length) {
        return alphabet[digit];
      }
      return "<" + digit + ">";
    }
    function toBase(n, base) {
      base = bigInt(base);
      if (base.isZero()) {
        if (n.isZero()) return { value: [0], isNegative: false };
        throw new Error("Cannot convert nonzero numbers to base 0.");
      }
      if (base.equals(-1)) {
        if (n.isZero()) return { value: [0], isNegative: false };
        if (n.isNegative())
          return {
            value: [].concat.apply(
              [],
              Array.apply(null, Array(-n.toJSNumber())).map(Array.prototype.valueOf, [1, 0])
            ),
            isNegative: false
          };
        var arr = Array.apply(null, Array(n.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
        arr.unshift([1]);
        return {
          value: [].concat.apply([], arr),
          isNegative: false
        };
      }
      var neg = false;
      if (n.isNegative() && base.isPositive()) {
        neg = true;
        n = n.abs();
      }
      if (base.isUnit()) {
        if (n.isZero()) return { value: [0], isNegative: false };
        return {
          value: Array.apply(null, Array(n.toJSNumber())).map(Number.prototype.valueOf, 1),
          isNegative: neg
        };
      }
      var out = [];
      var left = n, divmod;
      while (left.isNegative() || left.compareAbs(base) >= 0) {
        divmod = left.divmod(base);
        left = divmod.quotient;
        var digit = divmod.remainder;
        if (digit.isNegative()) {
          digit = base.minus(digit).abs();
          left = left.next();
        }
        out.push(digit.toJSNumber());
      }
      out.push(left.toJSNumber());
      return { value: out.reverse(), isNegative: neg };
    }
    function toBaseString(n, base, alphabet) {
      var arr = toBase(n, base);
      return (arr.isNegative ? "-" : "") + arr.value.map(function(x) {
        return stringify(x, alphabet);
      }).join("");
    }
    BigInteger2.prototype.toArray = function(radix) {
      return toBase(this, radix);
    };
    SmallInteger.prototype.toArray = function(radix) {
      return toBase(this, radix);
    };
    NativeBigInt.prototype.toArray = function(radix) {
      return toBase(this, radix);
    };
    BigInteger2.prototype.toString = function(radix, alphabet) {
      if (radix === undefined$1) radix = 10;
      if (radix !== 10 || alphabet) return toBaseString(this, radix, alphabet);
      var v = this.value, l = v.length, str = String(v[--l]), zeros = "0000000", digit;
      while (--l >= 0) {
        digit = String(v[l]);
        str += zeros.slice(digit.length) + digit;
      }
      var sign = this.sign ? "-" : "";
      return sign + str;
    };
    SmallInteger.prototype.toString = function(radix, alphabet) {
      if (radix === undefined$1) radix = 10;
      if (radix != 10 || alphabet) return toBaseString(this, radix, alphabet);
      return String(this.value);
    };
    NativeBigInt.prototype.toString = SmallInteger.prototype.toString;
    NativeBigInt.prototype.toJSON = BigInteger2.prototype.toJSON = SmallInteger.prototype.toJSON = function() {
      return this.toString();
    };
    BigInteger2.prototype.valueOf = function() {
      return parseInt(this.toString(), 10);
    };
    BigInteger2.prototype.toJSNumber = BigInteger2.prototype.valueOf;
    SmallInteger.prototype.valueOf = function() {
      return this.value;
    };
    SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;
    NativeBigInt.prototype.valueOf = NativeBigInt.prototype.toJSNumber = function() {
      return parseInt(this.toString(), 10);
    };
    function parseStringValue(v) {
      if (isPrecise(+v)) {
        var x = +v;
        if (x === truncate(x))
          return supportsNativeBigInt ? new NativeBigInt(BigInt(x)) : new SmallInteger(x);
        throw new Error("Invalid integer: " + v);
      }
      var sign = v[0] === "-";
      if (sign) v = v.slice(1);
      var split2 = v.split(/e/i);
      if (split2.length > 2) throw new Error("Invalid integer: " + split2.join("e"));
      if (split2.length === 2) {
        var exp = split2[1];
        if (exp[0] === "+") exp = exp.slice(1);
        exp = +exp;
        if (exp !== truncate(exp) || !isPrecise(exp)) throw new Error("Invalid integer: " + exp + " is not a valid exponent.");
        var text = split2[0];
        var decimalPlace = text.indexOf(".");
        if (decimalPlace >= 0) {
          exp -= text.length - decimalPlace - 1;
          text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
        }
        if (exp < 0) throw new Error("Cannot include negative exponent part for integers");
        text += new Array(exp + 1).join("0");
        v = text;
      }
      var isValid = /^([0-9][0-9]*)$/.test(v);
      if (!isValid) throw new Error("Invalid integer: " + v);
      if (supportsNativeBigInt) {
        return new NativeBigInt(BigInt(sign ? "-" + v : v));
      }
      var r = [], max2 = v.length, l = LOG_BASE, min2 = max2 - l;
      while (max2 > 0) {
        r.push(+v.slice(min2, max2));
        min2 -= l;
        if (min2 < 0) min2 = 0;
        max2 -= l;
      }
      trim(r);
      return new BigInteger2(r, sign);
    }
    function parseNumberValue(v) {
      if (supportsNativeBigInt) {
        return new NativeBigInt(BigInt(v));
      }
      if (isPrecise(v)) {
        if (v !== truncate(v)) throw new Error(v + " is not an integer.");
        return new SmallInteger(v);
      }
      return parseStringValue(v.toString());
    }
    function parseValue(v) {
      if (typeof v === "number") {
        return parseNumberValue(v);
      }
      if (typeof v === "string") {
        return parseStringValue(v);
      }
      if (typeof v === "bigint") {
        return new NativeBigInt(v);
      }
      return v;
    }
    for (var i = 0; i < 1e3; i++) {
      Integer[i] = parseValue(i);
      if (i > 0) Integer[-i] = parseValue(-i);
    }
    Integer.one = Integer[1];
    Integer.zero = Integer[0];
    Integer.minusOne = Integer[-1];
    Integer.max = max;
    Integer.min = min;
    Integer.gcd = gcd;
    Integer.lcm = lcm;
    Integer.isInstance = function(x) {
      return x instanceof BigInteger2 || x instanceof SmallInteger || x instanceof NativeBigInt;
    };
    Integer.randBetween = randBetween;
    Integer.fromArray = function(digits, base, isNegative) {
      return parseBaseFromArray(digits.map(parseValue), parseValue(base || 10), isNegative);
    };
    return Integer;
  }();
  if (module.hasOwnProperty("exports")) {
    module.exports = bigInt;
  }
})(BigInteger);
var BigIntegerExports = BigInteger.exports;
(function(exports$1) {
  const fs2 = fs__default;
  const bigInt = BigIntegerExports;
  exports$1.maxObjectSize = 100 * 1e3 * 1e3;
  exports$1.maxObjectCount = 32768;
  const EPOCH = 9783072e5;
  const UID = exports$1.UID = function(id2) {
    this.UID = id2;
  };
  exports$1.parseFile = function(fileNameOrBuffer, callback) {
    return new Promise(function(resolve2, reject) {
      function tryParseBuffer(buffer) {
        let err = null;
        let result;
        try {
          result = parseBuffer(buffer);
          resolve2(result);
        } catch (ex) {
          err = ex;
          reject(err);
        } finally {
          if (callback) callback(err, result);
        }
      }
      if (Buffer.isBuffer(fileNameOrBuffer)) {
        return tryParseBuffer(fileNameOrBuffer);
      }
      fs2.readFile(fileNameOrBuffer, function(err, data) {
        if (err) {
          reject(err);
          return callback(err);
        }
        tryParseBuffer(data);
      });
    });
  };
  exports$1.parseFileSync = function(fileNameOrBuffer) {
    if (!Buffer.isBuffer(fileNameOrBuffer)) {
      fileNameOrBuffer = fs2.readFileSync(fileNameOrBuffer);
    }
    return parseBuffer(fileNameOrBuffer);
  };
  const parseBuffer = exports$1.parseBuffer = function(buffer) {
    const header = buffer.slice(0, "bplist".length).toString("utf8");
    if (header !== "bplist") {
      throw new Error("Invalid binary plist. Expected 'bplist' at offset 0.");
    }
    const trailer = buffer.slice(buffer.length - 32, buffer.length);
    const offsetSize = trailer.readUInt8(6);
    const objectRefSize = trailer.readUInt8(7);
    const numObjects = readUInt64BE(trailer, 8);
    const topObject = readUInt64BE(trailer, 16);
    const offsetTableOffset = readUInt64BE(trailer, 24);
    if (numObjects > exports$1.maxObjectCount) {
      throw new Error("maxObjectCount exceeded");
    }
    const offsetTable = [];
    for (let i = 0; i < numObjects; i++) {
      const offsetBytes = buffer.slice(offsetTableOffset + i * offsetSize, offsetTableOffset + (i + 1) * offsetSize);
      offsetTable[i] = readUInt(offsetBytes, 0);
    }
    function parseObject(tableOffset) {
      const offset = offsetTable[tableOffset];
      const type2 = buffer[offset];
      const objType = (type2 & 240) >> 4;
      const objInfo = type2 & 15;
      switch (objType) {
        case 0:
          return parseSimple();
        case 1:
          return parseInteger();
        case 8:
          return parseUID();
        case 2:
          return parseReal();
        case 3:
          return parseDate();
        case 4:
          return parseData();
        case 5:
          return parsePlistString();
        case 6:
          return parsePlistString(true);
        case 10:
          return parseArray();
        case 13:
          return parseDictionary();
        default:
          throw new Error("Unhandled type 0x" + objType.toString(16));
      }
      function parseSimple() {
        switch (objInfo) {
          case 0:
            return null;
          case 8:
            return false;
          case 9:
            return true;
          case 15:
            return null;
          default:
            throw new Error("Unhandled simple type 0x" + objType.toString(16));
        }
      }
      function bufferToHexString(buffer2) {
        let str = "";
        let i;
        for (i = 0; i < buffer2.length; i++) {
          if (buffer2[i] != 0) {
            break;
          }
        }
        for (; i < buffer2.length; i++) {
          const part = "00" + buffer2[i].toString(16);
          str += part.substr(part.length - 2);
        }
        return str;
      }
      function parseInteger() {
        const length = Math.pow(2, objInfo);
        if (length < exports$1.maxObjectSize) {
          const data = buffer.slice(offset + 1, offset + 1 + length);
          if (length === 16) {
            const str = bufferToHexString(data);
            return bigInt(str, 16);
          }
          return data.reduce((acc, curr) => {
            acc <<= 8;
            acc |= curr & 255;
            return acc;
          });
        }
        throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + exports$1.maxObjectSize + " are available.");
      }
      function parseUID() {
        const length = objInfo + 1;
        if (length < exports$1.maxObjectSize) {
          return new UID(readUInt(buffer.slice(offset + 1, offset + 1 + length)));
        }
        throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + exports$1.maxObjectSize + " are available.");
      }
      function parseReal() {
        const length = Math.pow(2, objInfo);
        if (length < exports$1.maxObjectSize) {
          const realBuffer = buffer.slice(offset + 1, offset + 1 + length);
          if (length === 4) {
            return realBuffer.readFloatBE(0);
          }
          if (length === 8) {
            return realBuffer.readDoubleBE(0);
          }
        } else {
          throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + exports$1.maxObjectSize + " are available.");
        }
      }
      function parseDate() {
        if (objInfo != 3) {
          console.error("Unknown date type :" + objInfo + ". Parsing anyway...");
        }
        const dateBuffer = buffer.slice(offset + 1, offset + 9);
        return new Date(EPOCH + 1e3 * dateBuffer.readDoubleBE(0));
      }
      function parseData() {
        let dataoffset = 1;
        let length = objInfo;
        if (objInfo == 15) {
          const int_type = buffer[offset + 1];
          const intType = (int_type & 240) / 16;
          if (intType != 1) {
            console.error("0x4: UNEXPECTED LENGTH-INT TYPE! " + intType);
          }
          const intInfo = int_type & 15;
          const intLength = Math.pow(2, intInfo);
          dataoffset = 2 + intLength;
          if (intLength < 3) {
            length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
          } else {
            length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
          }
        }
        if (length < exports$1.maxObjectSize) {
          return buffer.slice(offset + dataoffset, offset + dataoffset + length);
        }
        throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + exports$1.maxObjectSize + " are available.");
      }
      function parsePlistString(isUtf16) {
        isUtf16 = isUtf16 || 0;
        let enc = "utf8";
        let length = objInfo;
        let stroffset = 1;
        if (objInfo == 15) {
          const int_type = buffer[offset + 1];
          const intType = (int_type & 240) / 16;
          if (intType != 1) {
            console.error("UNEXPECTED LENGTH-INT TYPE! " + intType);
          }
          const intInfo = int_type & 15;
          const intLength = Math.pow(2, intInfo);
          stroffset = 2 + intLength;
          if (intLength < 3) {
            length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
          } else {
            length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
          }
        }
        length *= isUtf16 + 1;
        if (length < exports$1.maxObjectSize) {
          let plistString = Buffer.from(buffer.slice(offset + stroffset, offset + stroffset + length));
          if (isUtf16) {
            plistString = swapBytes(plistString);
            enc = "ucs2";
          }
          return plistString.toString(enc);
        }
        throw new Error("Too little heap space available! Wanted to read " + length + " bytes, but only " + exports$1.maxObjectSize + " are available.");
      }
      function parseArray() {
        let length = objInfo;
        let arrayoffset = 1;
        if (objInfo == 15) {
          const int_type = buffer[offset + 1];
          const intType = (int_type & 240) / 16;
          if (intType != 1) {
            console.error("0xa: UNEXPECTED LENGTH-INT TYPE! " + intType);
          }
          const intInfo = int_type & 15;
          const intLength = Math.pow(2, intInfo);
          arrayoffset = 2 + intLength;
          if (intLength < 3) {
            length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
          } else {
            length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
          }
        }
        if (length * objectRefSize > exports$1.maxObjectSize) {
          throw new Error("Too little heap space available!");
        }
        const array = [];
        for (let i = 0; i < length; i++) {
          const objRef = readUInt(buffer.slice(offset + arrayoffset + i * objectRefSize, offset + arrayoffset + (i + 1) * objectRefSize));
          array[i] = parseObject(objRef);
        }
        return array;
      }
      function parseDictionary() {
        let length = objInfo;
        let dictoffset = 1;
        if (objInfo == 15) {
          const int_type = buffer[offset + 1];
          const intType = (int_type & 240) / 16;
          if (intType != 1) {
            console.error("0xD: UNEXPECTED LENGTH-INT TYPE! " + intType);
          }
          const intInfo = int_type & 15;
          const intLength = Math.pow(2, intInfo);
          dictoffset = 2 + intLength;
          if (intLength < 3) {
            length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
          } else {
            length = readUInt(buffer.slice(offset + 2, offset + 2 + intLength));
          }
        }
        if (length * 2 * objectRefSize > exports$1.maxObjectSize) {
          throw new Error("Too little heap space available!");
        }
        const dict = {};
        for (let i = 0; i < length; i++) {
          const keyRef = readUInt(buffer.slice(offset + dictoffset + i * objectRefSize, offset + dictoffset + (i + 1) * objectRefSize));
          const valRef = readUInt(buffer.slice(offset + dictoffset + length * objectRefSize + i * objectRefSize, offset + dictoffset + length * objectRefSize + (i + 1) * objectRefSize));
          const key = parseObject(keyRef);
          const val = parseObject(valRef);
          dict[key] = val;
        }
        return dict;
      }
    }
    return [parseObject(topObject)];
  };
  function readUInt(buffer, start) {
    start = start || 0;
    let l = 0;
    for (let i = start; i < buffer.length; i++) {
      l <<= 8;
      l |= buffer[i] & 255;
    }
    return l;
  }
  function readUInt64BE(buffer, start) {
    const data = buffer.slice(start, start + 8);
    return data.readUInt32BE(4, 8);
  }
  function swapBytes(buffer) {
    const len = buffer.length;
    for (let i = 0; i < len; i += 2) {
      const a = buffer[i];
      buffer[i] = buffer[i + 1];
      buffer[i + 1] = a;
    }
    return buffer;
  }
})(bplistParser);
const execFileAsync = promisify(execFile);
function parsePlistBuffer(buf) {
  var _a;
  if (buf.slice(0, 6).toString("utf8") === "bplist") {
    return ((_a = bplistParser.parseBuffer(buf)) == null ? void 0 : _a[0]) ?? {};
  }
  return plist.parse(buf.toString("utf8"));
}
async function analyzeIpa(ipaPath) {
  if (!fs$3.existsSync(ipaPath)) {
    console.error("IPA file not found:", ipaPath);
    return null;
  }
  const { stdout } = await execFileAsync(
    "unzip",
    ["-p", ipaPath, "Payload/*.app/Info.plist"],
    { encoding: "buffer", maxBuffer: 50 * 1024 * 1024 }
  );
  const plistData = parsePlistBuffer(stdout);
  const ipaInfo = {
    bundleId: plistData.CFBundleIdentifier || "",
    appName: plistData.CFBundleDisplayName || plistData.CFBundleName || "",
    version: plistData.CFBundleShortVersionString || "",
    build: plistData.CFBundleVersion || "",
    minOSVersion: plistData.MinimumOSVersion || void 0
  };
  console.log("Parsed IPA info:", ipaInfo);
  return ipaInfo;
}
let currentUploadProcess = null;
let currentUploadConfig = null;
let uploadStartTime = "";
let currentRetryAttempt = 0;
let maxRetryAttempts = 3;
let isCancelledByUser = false;
let currentIpRegion = "";
let currentUploadLogs = [];
let currentAppInfo = null;
function formatDuration(ms) {
  const seconds = Math.floor(ms / 1e3);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (remainingMinutes > 0) parts.push(`${remainingMinutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);
  return parts.join(" ");
}
async function fetchProviders(appleId, password) {
  return new Promise((resolve2) => {
    var _a, _b;
    const iTMSTransporterPath = getITMSTransporterPath();
    const process2 = spawn(iTMSTransporterPath, [
      "-m",
      "provider",
      "-u",
      appleId,
      "-p",
      password
    ]);
    let stdout = "";
    let stderr = "";
    (_a = process2.stdout) == null ? void 0 : _a.on("data", (data) => {
      stdout += data.toString();
    });
    (_b = process2.stderr) == null ? void 0 : _b.on("data", (data) => {
      stderr += data.toString();
    });
    process2.on("close", (code2) => {
      if (code2 === 0) {
        const providers = [];
        const lines = stdout.split("\n");
        let inProviderSection = false;
        for (const line of lines) {
          if (line.includes("Provider listing:")) {
            inProviderSection = true;
            continue;
          }
          if (line.includes("- Long Name -") || line.includes("- Short Name -")) {
            continue;
          }
          if (inProviderSection) {
            const tableMatch = line.match(/^\s*(\d+)\s+(.+?)\s{2,}(\S+)\s*$/);
            if (tableMatch) {
              providers.push({
                teamName: tableMatch[2].trim(),
                teamId: tableMatch[3],
                // In table format, shortName is ID
                shortName: tableMatch[3]
              });
              continue;
            }
          }
          const oldMatch = line.match(/^\d+\.\s+(.+?)\s+\((\w+)\)\s+-\s+ProviderShortName:\s+(\S+)/);
          if (oldMatch) {
            providers.push({
              teamName: oldMatch[1].trim(),
              teamId: oldMatch[2],
              shortName: oldMatch[3]
            });
          }
          const dbgMatch = line.match(/parameter\s+(.+?)\s+=\s+(\w+)/);
          if (dbgMatch && !line.includes("Application") && !line.includes("Version") && !line.includes("OSIdentifier")) {
            const name = dbgMatch[1].trim();
            const shortName = dbgMatch[2];
            if (/^[A-Z0-9]{8,12}$/.test(shortName)) {
              if (!providers.find((p) => p.shortName === shortName)) {
                providers.push({
                  teamName: name,
                  teamId: shortName,
                  shortName
                });
              }
            }
          }
        }
        if (providers.length > 0) {
          resolve2({ success: true, providers });
        } else {
          const shortNameMatch = stdout.match(/ProviderShortName[:\s]+(\S+)/g);
          if (shortNameMatch) {
            shortNameMatch.forEach((m, index) => {
              const shortName = m.replace(/ProviderShortName[:\s]+/, "").trim();
              providers.push({
                teamName: `Team ${index + 1}`,
                teamId: shortName,
                shortName
              });
            });
            resolve2({ success: true, providers });
          } else {
            resolve2({ success: false, errorMessage: "Failed to parse Provider list. Please enter Provider Shortname manually." });
          }
        }
      } else {
        resolve2({
          success: false,
          errorMessage: stderr || `Failed to get Provider (Exit code: ${code2})`
        });
      }
    });
    process2.on("error", (error2) => {
      resolve2({ success: false, errorMessage: error2.message });
    });
  });
}
function parseProgress(text, fileName) {
  const progressMatch = text.match(/Package upload progress:\s*([\d.]+)%\s*completed/);
  if (progressMatch) {
    const progress = parseFloat(progressMatch[1]);
    return {
      phase: "uploading",
      phaseText: "Uploading",
      progress,
      fileName
    };
  }
  const fileProgressMatch = text.match(/File:\s*\S+\s+(\d+)\/(\d+),\s*([\d.]+)%\s*completed/);
  if (fileProgressMatch) {
    const bytesUploaded = parseInt(fileProgressMatch[1]);
    const totalBytes = parseInt(fileProgressMatch[2]);
    const progress = parseFloat(fileProgressMatch[3]);
    return {
      phase: "uploading",
      phaseText: "Uploading",
      progress,
      fileName,
      bytesUploaded,
      totalBytes
    };
  }
  const finishedMatch = text.match(/Finished part upload.*?([\d.]+)\s*MB\/s/);
  if (finishedMatch) {
    return {
      phase: "uploading",
      phaseText: "Uploading",
      progress: 100,
      fileName,
      speed: `${finishedMatch[1]} MB/s`
    };
  }
  return null;
}
function parsePhase(text, fileName) {
  if (text.includes("authenticateForSession") || text.includes("Configuring logging")) {
    return {
      phase: "authenticating",
      phaseText: "Authenticating",
      progress: 0,
      fileName
    };
  }
  if (text.includes("Performing analysis") || text.includes("Configuring the Software Uploader")) {
    return {
      phase: "analyzing",
      phaseText: "Analyzing",
      progress: 0,
      fileName
    };
  }
  if (text.includes("Starting upload for package") || text.includes("Computing total size")) {
    return {
      phase: "uploading",
      phaseText: "Preparing upload",
      progress: 0,
      fileName
    };
  }
  if (text.includes("Committing reservation") || text.includes("Transfer Metrics Summary")) {
    return {
      phase: "committing",
      phaseText: "Committing",
      progress: 100,
      fileName
    };
  }
  if (text.includes("package was uploaded successfully") || text.includes("Package Summary")) {
    return {
      phase: "completed",
      phaseText: "Completed",
      progress: 100,
      fileName
    };
  }
  if (text.includes("ERROR:") || text.includes("Upload Failed") || text.includes("Could not upload")) {
    return {
      phase: "failed",
      phaseText: "Failed",
      progress: 0,
      fileName
    };
  }
  return null;
}
async function startUpload(config, mainWindow, retryAttempts = 3) {
  maxRetryAttempts = retryAttempts;
  currentRetryAttempt = 0;
  isCancelledByUser = false;
  uploadStartTime = (/* @__PURE__ */ new Date()).toISOString();
  currentUploadLogs = [];
  try {
    const ipInfo = await getIpInfo();
    if (ipInfo) {
      currentIpRegion = `${ipInfo.country}, ${ipInfo.city}`;
    } else {
      currentIpRegion = "";
    }
  } catch {
    currentIpRegion = "";
  }
  try {
    currentAppInfo = await analyzeIpa(config.ipaPath);
  } catch {
    currentAppInfo = null;
  }
  const fileName = require$$0.basename(config.ipaPath);
  let lastResult = { success: false, errorMessage: "Unknown error" };
  while (currentRetryAttempt < maxRetryAttempts) {
    currentRetryAttempt++;
    if (isCancelledByUser) {
      return { success: false, errorMessage: "User cancelled upload" };
    }
    if (currentRetryAttempt > 1) {
      sendLog(mainWindow, `---`);
      sendLog(mainWindow, `[RETRY] Attempt ${currentRetryAttempt} of ${maxRetryAttempts}...`);
      sendProgress(mainWindow, {
        phase: "retrying",
        phaseText: `Retrying (${currentRetryAttempt}/${maxRetryAttempts})`,
        progress: 0,
        fileName
      });
      mainWindow.webContents.send("upload-retry", {
        attempt: currentRetryAttempt,
        maxAttempts: maxRetryAttempts
      });
      await new Promise((resolve2) => setTimeout(resolve2, 2e3));
    }
    lastResult = await performSingleUpload(config, mainWindow);
    if (lastResult.success || isCancelledByUser) {
      return lastResult;
    }
    if (currentRetryAttempt < maxRetryAttempts) {
      sendLog(mainWindow, `[INFO] Upload failed, will retry (${maxRetryAttempts - currentRetryAttempt} attempts remaining)...`);
    }
  }
  const endTime = (/* @__PURE__ */ new Date()).toISOString();
  sendProgress(mainWindow, {
    phase: "failed",
    phaseText: "Failed",
    progress: 0,
    fileName
  });
  const startMs = new Date(uploadStartTime).getTime();
  const endMs = new Date(endTime).getTime();
  const duration = formatDuration(endMs - startMs);
  addUploadHistory({
    fileName,
    filePath: config.ipaPath,
    appleId: config.appleId,
    status: "failed",
    startTime: uploadStartTime,
    endTime,
    errorMessage: lastResult.errorMessage || "Upload failed after all retries",
    ipRegion: currentIpRegion || void 0,
    duration,
    uploadLog: currentUploadLogs.slice(-500),
    // Keep last 500 lines
    appInfo: currentAppInfo || void 0
  });
  mainWindow.webContents.send("upload-complete", {
    success: false,
    errorMessage: lastResult.errorMessage
  });
  sendWebhookNotification({
    fileName,
    status: "failed",
    appleId: config.appleId,
    startTime: uploadStartTime,
    endTime,
    errorMessage: lastResult.errorMessage || "Upload failed after all retries",
    ipRegion: currentIpRegion || void 0,
    duration,
    appInfo: currentAppInfo || void 0
  });
  return lastResult;
}
function performSingleUpload(config, mainWindow) {
  return new Promise((resolve2) => {
    var _a, _b;
    const iTMSTransporterPath = getITMSTransporterPath();
    const fileName = require$$0.basename(config.ipaPath);
    currentUploadConfig = config;
    if (currentRetryAttempt === 1) {
      sendProgress(mainWindow, {
        phase: "preparing",
        phaseText: "Preparing",
        progress: 0,
        fileName
      });
    }
    sendLog(mainWindow, `[INFO] Start upload: ${fileName}`);
    sendLog(mainWindow, `[INFO] Apple ID: ${config.appleId}`);
    if (config.ascProvider) {
      sendLog(mainWindow, `[INFO] Provider: ${config.ascProvider}`);
    }
    sendLog(mainWindow, `[INFO] Using iTMSTransporter: ${iTMSTransporterPath}`);
    sendLog(mainWindow, "---");
    const args = [
      "-m",
      "upload",
      "-assetFile",
      config.ipaPath,
      "-u",
      config.appleId,
      "-p",
      config.appSpecificPassword
    ];
    if (config.ascProvider) {
      args.push("-asc_provider", config.ascProvider);
    }
    currentUploadProcess = spawn(iTMSTransporterPath, args);
    let errorOutput = "";
    let lastProgress = null;
    const handleOutput = (text, isError = false) => {
      if (isError) {
        sendLog(mainWindow, `[ERROR] ${text}`);
      } else {
        sendLog(mainWindow, text);
      }
      const progress = parseProgress(text, fileName);
      if (progress) {
        lastProgress = progress;
        sendProgress(mainWindow, progress);
        return;
      }
      const phase = parsePhase(text, fileName);
      if (phase && phase.phase !== "failed") {
        if (lastProgress && phase.phase === "uploading" && lastProgress.phase === "uploading") {
          phase.progress = lastProgress.progress;
        }
        lastProgress = phase;
        sendProgress(mainWindow, phase);
      }
    };
    (_a = currentUploadProcess.stdout) == null ? void 0 : _a.on("data", (data) => {
      const text = data.toString();
      const lines = text.split("\n").filter((line) => line.trim());
      lines.forEach((line) => handleOutput(line));
    });
    (_b = currentUploadProcess.stderr) == null ? void 0 : _b.on("data", (data) => {
      const text = data.toString();
      errorOutput += text;
      const lines = text.split("\n").filter((line) => line.trim());
      lines.forEach((line) => handleOutput(line, true));
    });
    currentUploadProcess.on("close", (code2) => {
      const endTime = (/* @__PURE__ */ new Date()).toISOString();
      if (code2 === 0) {
        sendLog(mainWindow, "---");
        sendLog(mainWindow, "[SUCCESS] Upload Completed!");
        sendProgress(mainWindow, {
          phase: "completed",
          phaseText: "Completed",
          progress: 100,
          fileName
        });
        saveCredential(config.appleId, config.appSpecificPassword);
        const startMs = new Date(uploadStartTime).getTime();
        const endMs = new Date(endTime).getTime();
        const duration = formatDuration(endMs - startMs);
        addUploadHistory({
          fileName,
          filePath: config.ipaPath,
          appleId: config.appleId,
          status: "success",
          startTime: uploadStartTime,
          endTime,
          ipRegion: currentIpRegion || void 0,
          duration,
          uploadLog: currentUploadLogs.slice(-500),
          // Keep last 500 lines
          appInfo: currentAppInfo || void 0
        });
        mainWindow.webContents.send("upload-complete", { success: true });
        sendWebhookNotification({
          fileName,
          status: "success",
          appleId: config.appleId,
          startTime: uploadStartTime,
          endTime,
          ipRegion: currentIpRegion || void 0,
          duration,
          appInfo: currentAppInfo || void 0
        });
        resolve2({ success: true });
      } else {
        sendLog(mainWindow, "---");
        sendLog(mainWindow, `[FAILED] Upload Failed (Exit code: ${code2})`);
        resolve2({ success: false, errorMessage: errorOutput || `Exit code: ${code2}` });
      }
      currentUploadProcess = null;
      currentUploadConfig = null;
    });
    currentUploadProcess.on("error", (error2) => {
      sendLog(mainWindow, `[ERROR] Process failed to start: ${error2.message}`);
      resolve2({ success: false, errorMessage: error2.message });
      currentUploadProcess = null;
      currentUploadConfig = null;
    });
  });
}
function cancelUpload(mainWindow) {
  isCancelledByUser = true;
  if (currentUploadProcess && currentUploadConfig) {
    const fileName = require$$0.basename(currentUploadConfig.ipaPath);
    sendLog(mainWindow, "[INFO] Cancelling upload...");
    sendProgress(mainWindow, {
      phase: "failed",
      phaseText: "Cancelled",
      progress: 0,
      fileName
    });
    const endTime = (/* @__PURE__ */ new Date()).toISOString();
    const appleId = currentUploadConfig.appleId;
    const ipaPath = currentUploadConfig.ipaPath;
    const startMs = new Date(uploadStartTime).getTime();
    const endMs = new Date(endTime).getTime();
    const duration = formatDuration(endMs - startMs);
    addUploadHistory({
      fileName,
      filePath: ipaPath,
      appleId,
      status: "cancelled",
      startTime: uploadStartTime,
      endTime,
      errorMessage: "User cancelled upload",
      ipRegion: currentIpRegion || void 0,
      duration,
      uploadLog: currentUploadLogs.slice(-500),
      // Keep last 500 lines
      appInfo: currentAppInfo || void 0
    });
    sendWebhookNotification({
      fileName,
      status: "cancelled",
      appleId,
      startTime: uploadStartTime,
      endTime,
      errorMessage: "User cancelled upload",
      ipRegion: currentIpRegion || void 0,
      duration,
      appInfo: currentAppInfo || void 0
    });
    currentUploadProcess.kill("SIGTERM");
    currentUploadProcess = null;
    currentUploadConfig = null;
    sendLog(mainWindow, "[INFO] Upload cancelled");
    mainWindow.webContents.send("upload-complete", {
      success: false,
      errorMessage: "User cancelled upload"
    });
    return true;
  }
  return false;
}
function isUploading() {
  return currentUploadProcess !== null;
}
function sendLog(mainWindow, message) {
  currentUploadLogs.push(message);
  mainWindow.webContents.send("upload-log", {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    message
  });
}
function sendProgress(mainWindow, progress) {
  mainWindow.webContents.send("upload-progress", progress);
}
const __dirname$1 = path$6.dirname(fileURLToPath(import.meta.url));
const isDev = !!process.env["VITE_DEV_SERVER_URL"];
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$6.join(__dirname$1);
const RENDERER_DIST = path$6.join(__dirname$1, "../dist");
process.env.VITE_PUBLIC = isDev ? path$6.join(__dirname$1, "../public") : RENDERER_DIST;
let win;
function createWindow() {
  const isDev2 = !app$1.isPackaged;
  win = new BrowserWindow({
    width: 1200,
    height: 920,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    // icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: path$6.join(__dirname$1, "preload.mjs"),
      nodeIntegration: false,
      contextIsolation: true,
      devTools: isDev2
    }
  });
  if (isDev2) {
    win.webContents.openDevTools({ mode: "detach" });
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$6.join(RENDERER_DIST, "index.html"));
  }
  win.webContents.on("context-menu", (_event, params) => {
    const { isEditable, selectionText, editFlags, x, y } = params;
    win == null ? void 0 : win.webContents.send("show-context-menu", {
      isEditable,
      hasSelection: selectionText && selectionText.trim() !== "",
      editFlags,
      x,
      y
    });
  });
}
ipcMain$1.handle("check-environment", async () => {
  return await getEnvironmentStatus();
});
ipcMain$1.handle("install-clt", async () => {
  return await installCommandLineTools();
});
ipcMain$1.handle("select-ipa-file", async () => {
  if (!win) return null;
  const result = await dialog.showOpenDialog(win, {
    title: "选择 IPA 文件",
    filters: [
      { name: "iOS App", extensions: ["ipa"] }
    ],
    properties: ["openFile"]
  });
  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }
  return result.filePaths[0];
});
ipcMain$1.handle("start-upload", async (_event, config) => {
  if (!win) return { success: false, errorMessage: "窗口未初始化" };
  if (isUploading()) return { success: false, errorMessage: "已有上传任务进行中" };
  return await startUpload(config, win, config.retryAttempts || 1);
});
ipcMain$1.handle("cancel-upload", async () => {
  if (!win) return false;
  return cancelUpload(win);
});
ipcMain$1.handle("is-uploading", () => {
  return isUploading();
});
ipcMain$1.handle("fetch-providers", async (_event, data) => {
  return await fetchProviders(data.appleId, data.password);
});
ipcMain$1.handle("open-external", async (_event, url) => {
  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    await shell$1.openExternal(url);
  }
});
ipcMain$1.handle("get-credentials-list", () => {
  return getCredentialsList();
});
ipcMain$1.handle("get-credential", (_event, appleId) => {
  return getCredential(appleId);
});
ipcMain$1.handle("save-credential", (_event, data) => {
  saveCredential(data.appleId, data.password);
  return true;
});
ipcMain$1.handle("delete-credential", (_event, appleId) => {
  return deleteCredential(appleId);
});
ipcMain$1.handle("get-upload-history", () => {
  return getUploadHistory();
});
ipcMain$1.handle("clear-upload-history", () => {
  clearUploadHistory();
  return true;
});
ipcMain$1.handle("delete-upload-history", (_event, id2) => {
  return deleteUploadHistory(id2);
});
ipcMain$1.handle("get-upload-history-record", (_event, id2) => {
  return getUploadHistoryRecord(id2);
});
ipcMain$1.handle("get-ip-info", async () => {
  return await getIpInfo();
});
ipcMain$1.handle("get-webhook-settings", () => {
  return getWebhookSettings();
});
ipcMain$1.handle("set-webhook-settings", (_event, settings) => {
  setWebhookSettings(settings);
  return true;
});
ipcMain$1.handle("test-webhook", async (_event, url) => {
  return await testWebhook(url);
});
ipcMain$1.handle("get-retry-attempts", () => {
  return getRetryAttempts();
});
ipcMain$1.handle("set-retry-attempts", (_event, attempts) => {
  setRetryAttempts(attempts);
  return true;
});
ipcMain$1.handle("analyze-ipa", async (_event, ipaPath) => {
  return await analyzeIpa(ipaPath);
});
app$1.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app$1.quit();
    win = null;
  }
});
app$1.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app$1.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
