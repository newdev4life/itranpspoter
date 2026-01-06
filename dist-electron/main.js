import Yu, { ipcMain as Ve, app as Vn, BrowserWindow as bc, dialog as Qu } from "electron";
import { fileURLToPath as Zu } from "node:url";
import $r from "node:path";
import * as ra from "fs";
import na from "fs";
import { exec as xu, spawn as Pc } from "child_process";
import Nc, { promisify as ed } from "util";
import * as Oc from "path";
import sr from "path";
import * as fr from "crypto";
import td from "crypto";
import rd from "assert";
import nd from "events";
import sd from "os";
const Rc = ed(xu), Tc = "/Applications/Transporter.app", sa = "/Applications/Transporter.app/Contents/itms/bin/iTMSTransporter";
function ad() {
  return ra.existsSync(Tc);
}
function od() {
  return ra.existsSync(sa);
}
async function id() {
  try {
    const { stdout: e } = await Rc("xcode-select -p"), t = e.trim();
    return ra.existsSync(t) ? { installed: !0, path: t } : { installed: !1, path: "" };
  } catch {
    return { installed: !1, path: "" };
  }
}
async function cd() {
  const e = ad(), t = od(), r = await id();
  return {
    transporterInstalled: e,
    transporterPath: Tc,
    iTMSTransporterPath: sa,
    iTMSTransporterExists: t,
    commandLineToolsInstalled: r.installed,
    commandLineToolsPath: r.path,
    allReady: e && t && r.installed
  };
}
function Ic() {
  return sa;
}
async function ld() {
  var e;
  try {
    return await Rc("xcode-select --install"), {
      success: !0,
      message: 'Command Line Tools 安装程序已启动，请在弹出的对话框中点击"安装"。'
    };
  } catch (t) {
    return (e = t.message) != null && e.includes("already installed") ? {
      success: !0,
      message: "Command Line Tools 已安装。"
    } : t.code === 1 ? {
      success: !0,
      message: 'Command Line Tools 安装程序已启动，请在弹出的对话框中点击"安装"。'
    } : {
      success: !1,
      message: `安装失败: ${t.message}`
    };
  }
}
var cn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ud(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ds = { exports: {} }, dd = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Gt = dd, fd = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), hd = (e) => !e.some((t) => fd.has(t));
function ln(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return hd(r) ? r : [];
}
var pd = {
  get(e, t, r) {
    if (!Gt(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = ln(t);
    if (n.length !== 0) {
      for (let s = 0; s < n.length; s++)
        if (e = e[n[s]], e == null) {
          if (s !== n.length - 1)
            return r;
          break;
        }
      return e === void 0 ? r : e;
    }
  },
  set(e, t, r) {
    if (!Gt(e) || typeof t != "string")
      return e;
    const n = e, s = ln(t);
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      Gt(e[i]) || (e[i] = {}), a === s.length - 1 && (e[i] = r), e = e[i];
    }
    return n;
  },
  delete(e, t) {
    if (!Gt(e) || typeof t != "string")
      return !1;
    const r = ln(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Gt(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Gt(e) || typeof t != "string")
      return !1;
    const r = ln(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Gt(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, aa = { exports: {} }, oa = { exports: {} }, ia = { exports: {} }, ca = { exports: {} };
const jc = na;
ca.exports = (e) => new Promise((t) => {
  jc.access(e, (r) => {
    t(!r);
  });
});
ca.exports.sync = (e) => {
  try {
    return jc.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var md = ca.exports, la = { exports: {} }, ua = { exports: {} };
const Ac = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ua.exports = Ac;
ua.exports.default = Ac;
var yd = ua.exports;
const $d = yd, kc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (u, c, ...d) => {
    r++;
    const l = $d(u, ...d);
    c(l), l.then(n, n);
  }, a = (u, c, ...d) => {
    r < e ? s(u, c, ...d) : t.push(s.bind(null, u, c, ...d));
  }, i = (u, ...c) => new Promise((d) => a(u, d, ...c));
  return Object.defineProperties(i, {
    activeCount: {
      get: () => r
    },
    pendingCount: {
      get: () => t.length
    },
    clearQueue: {
      value: () => {
        t.length = 0;
      }
    }
  }), i;
};
la.exports = kc;
la.exports.default = kc;
var _d = la.exports;
const oi = _d;
class Cc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const gd = (e, t) => Promise.resolve(e).then(t), vd = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new Cc(t[0])));
var Ed = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = oi(r.concurrency), s = [...e].map((i) => [i, n(gd, i, t)]), a = oi(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((i) => a(vd, i))).then(() => {
  }).catch((i) => i instanceof Cc ? i.value : Promise.reject(i));
};
const Dc = sr, Mc = md, wd = Ed;
ia.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), wd(e, (r) => Mc(Dc.resolve(t.cwd, r)), t));
ia.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (Mc.sync(Dc.resolve(t.cwd, r)))
      return r;
};
var Sd = ia.exports;
const bt = sr, Lc = Sd;
oa.exports = (e, t = {}) => {
  const r = bt.resolve(t.cwd || ""), { root: n } = bt.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function i(u) {
      Lc(s, { cwd: u }).then((c) => {
        c ? a(bt.join(u, c)) : u === n ? a(null) : i(bt.dirname(u));
      });
    })(r);
  });
};
oa.exports.sync = (e, t = {}) => {
  let r = bt.resolve(t.cwd || "");
  const { root: n } = bt.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = Lc.sync(s, { cwd: r });
    if (a)
      return bt.join(r, a);
    if (r === n)
      return null;
    r = bt.dirname(r);
  }
};
var bd = oa.exports;
const Fc = bd;
aa.exports = async ({ cwd: e } = {}) => Fc("package.json", { cwd: e });
aa.exports.sync = ({ cwd: e } = {}) => Fc.sync("package.json", { cwd: e });
var Pd = aa.exports, da = { exports: {} };
const pe = sr, Vc = sd, wt = Vc.homedir(), fa = Vc.tmpdir(), { env: dr } = process, Nd = (e) => {
  const t = pe.join(wt, "Library");
  return {
    data: pe.join(t, "Application Support", e),
    config: pe.join(t, "Preferences", e),
    cache: pe.join(t, "Caches", e),
    log: pe.join(t, "Logs", e),
    temp: pe.join(fa, e)
  };
}, Od = (e) => {
  const t = dr.APPDATA || pe.join(wt, "AppData", "Roaming"), r = dr.LOCALAPPDATA || pe.join(wt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: pe.join(r, e, "Data"),
    config: pe.join(t, e, "Config"),
    cache: pe.join(r, e, "Cache"),
    log: pe.join(r, e, "Log"),
    temp: pe.join(fa, e)
  };
}, Rd = (e) => {
  const t = pe.basename(wt);
  return {
    data: pe.join(dr.XDG_DATA_HOME || pe.join(wt, ".local", "share"), e),
    config: pe.join(dr.XDG_CONFIG_HOME || pe.join(wt, ".config"), e),
    cache: pe.join(dr.XDG_CACHE_HOME || pe.join(wt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: pe.join(dr.XDG_STATE_HOME || pe.join(wt, ".local", "state"), e),
    temp: pe.join(fa, t, e)
  };
}, Uc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? Nd(e) : process.platform === "win32" ? Od(e) : Rd(e);
};
da.exports = Uc;
da.exports.default = Uc;
var Td = da.exports, it = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.NOOP = ae.LIMIT_FILES_DESCRIPTORS = ae.LIMIT_BASENAME_LENGTH = ae.IS_USER_ROOT = ae.IS_POSIX = ae.DEFAULT_TIMEOUT_SYNC = ae.DEFAULT_TIMEOUT_ASYNC = ae.DEFAULT_WRITE_OPTIONS = ae.DEFAULT_READ_OPTIONS = ae.DEFAULT_FOLDER_MODE = ae.DEFAULT_FILE_MODE = ae.DEFAULT_ENCODING = void 0;
const Id = "utf8";
ae.DEFAULT_ENCODING = Id;
const jd = 438;
ae.DEFAULT_FILE_MODE = jd;
const Ad = 511;
ae.DEFAULT_FOLDER_MODE = Ad;
const kd = {};
ae.DEFAULT_READ_OPTIONS = kd;
const Cd = {};
ae.DEFAULT_WRITE_OPTIONS = Cd;
const Dd = 5e3;
ae.DEFAULT_TIMEOUT_ASYNC = Dd;
const Md = 100;
ae.DEFAULT_TIMEOUT_SYNC = Md;
const Ld = !!process.getuid;
ae.IS_POSIX = Ld;
const Fd = process.getuid ? !process.getuid() : !1;
ae.IS_USER_ROOT = Fd;
const Vd = 128;
ae.LIMIT_BASENAME_LENGTH = Vd;
const Ud = 1e4;
ae.LIMIT_FILES_DESCRIPTORS = Ud;
const zd = () => {
};
ae.NOOP = zd;
var Zn = {}, _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.attemptifySync = _r.attemptifyAsync = void 0;
const zc = ae, qd = (e, t = zc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
_r.attemptifyAsync = qd;
const Kd = (e, t = zc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
_r.attemptifySync = Kd;
var ha = {};
Object.defineProperty(ha, "__esModule", { value: !0 });
const Gd = ae, qc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !Gd.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!qc.isChangeErrorOk(e))
      throw e;
  }
};
ha.default = qc;
var gr = {}, pa = {};
Object.defineProperty(pa, "__esModule", { value: !0 });
const Hd = ae, le = {
  interval: 25,
  intervalId: void 0,
  limit: Hd.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    le.intervalId || (le.intervalId = setInterval(le.tick, le.interval));
  },
  reset: () => {
    le.intervalId && (clearInterval(le.intervalId), delete le.intervalId);
  },
  add: (e) => {
    le.queueWaiting.add(e), le.queueActive.size < le.limit / 2 ? le.tick() : le.init();
  },
  remove: (e) => {
    le.queueWaiting.delete(e), le.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => le.remove(r), r = () => e(t);
    le.add(r);
  }),
  tick: () => {
    if (!(le.queueActive.size >= le.limit)) {
      if (!le.queueWaiting.size)
        return le.reset();
      for (const e of le.queueWaiting) {
        if (le.queueActive.size >= le.limit)
          break;
        le.queueWaiting.delete(e), le.queueActive.add(e), e();
      }
    }
  }
};
pa.default = le;
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.retryifySync = gr.retryifyAsync = void 0;
const Bd = pa, Jd = (e, t) => function(r) {
  return function n() {
    return Bd.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
      if (s(), Date.now() >= r)
        throw a;
      if (t(a)) {
        const i = Math.round(100 + 400 * Math.random());
        return new Promise((c) => setTimeout(c, i)).then(() => n.apply(void 0, arguments));
      }
      throw a;
    }));
  };
};
gr.retryifyAsync = Jd;
const Xd = (e, t) => function(r) {
  return function n() {
    try {
      return e.apply(void 0, arguments);
    } catch (s) {
      if (Date.now() > r)
        throw s;
      if (t(s))
        return n.apply(void 0, arguments);
      throw s;
    }
  };
};
gr.retryifySync = Xd;
Object.defineProperty(Zn, "__esModule", { value: !0 });
const oe = na, Re = Nc, Te = _r, ge = ha, ke = gr, Wd = {
  chmodAttempt: Te.attemptifyAsync(Re.promisify(oe.chmod), ge.default.onChangeError),
  chownAttempt: Te.attemptifyAsync(Re.promisify(oe.chown), ge.default.onChangeError),
  closeAttempt: Te.attemptifyAsync(Re.promisify(oe.close)),
  fsyncAttempt: Te.attemptifyAsync(Re.promisify(oe.fsync)),
  mkdirAttempt: Te.attemptifyAsync(Re.promisify(oe.mkdir)),
  realpathAttempt: Te.attemptifyAsync(Re.promisify(oe.realpath)),
  statAttempt: Te.attemptifyAsync(Re.promisify(oe.stat)),
  unlinkAttempt: Te.attemptifyAsync(Re.promisify(oe.unlink)),
  closeRetry: ke.retryifyAsync(Re.promisify(oe.close), ge.default.isRetriableError),
  fsyncRetry: ke.retryifyAsync(Re.promisify(oe.fsync), ge.default.isRetriableError),
  openRetry: ke.retryifyAsync(Re.promisify(oe.open), ge.default.isRetriableError),
  readFileRetry: ke.retryifyAsync(Re.promisify(oe.readFile), ge.default.isRetriableError),
  renameRetry: ke.retryifyAsync(Re.promisify(oe.rename), ge.default.isRetriableError),
  statRetry: ke.retryifyAsync(Re.promisify(oe.stat), ge.default.isRetriableError),
  writeRetry: ke.retryifyAsync(Re.promisify(oe.write), ge.default.isRetriableError),
  chmodSyncAttempt: Te.attemptifySync(oe.chmodSync, ge.default.onChangeError),
  chownSyncAttempt: Te.attemptifySync(oe.chownSync, ge.default.onChangeError),
  closeSyncAttempt: Te.attemptifySync(oe.closeSync),
  mkdirSyncAttempt: Te.attemptifySync(oe.mkdirSync),
  realpathSyncAttempt: Te.attemptifySync(oe.realpathSync),
  statSyncAttempt: Te.attemptifySync(oe.statSync),
  unlinkSyncAttempt: Te.attemptifySync(oe.unlinkSync),
  closeSyncRetry: ke.retryifySync(oe.closeSync, ge.default.isRetriableError),
  fsyncSyncRetry: ke.retryifySync(oe.fsyncSync, ge.default.isRetriableError),
  openSyncRetry: ke.retryifySync(oe.openSync, ge.default.isRetriableError),
  readFileSyncRetry: ke.retryifySync(oe.readFileSync, ge.default.isRetriableError),
  renameSyncRetry: ke.retryifySync(oe.renameSync, ge.default.isRetriableError),
  statSyncRetry: ke.retryifySync(oe.statSync, ge.default.isRetriableError),
  writeSyncRetry: ke.retryifySync(oe.writeSync, ge.default.isRetriableError)
};
Zn.default = Wd;
var ma = {};
Object.defineProperty(ma, "__esModule", { value: !0 });
const Yd = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
ma.default = Yd;
var ya = {};
Object.defineProperty(ya, "__esModule", { value: !0 });
const un = {}, Ms = {
  next: (e) => {
    const t = un[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Ms.next(e)) : delete un[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = un[e];
    r || (r = un[e] = []), r.push(t), !(r.length > 1) && t(() => Ms.next(e));
  })
};
ya.default = Ms;
var $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
const Qd = sr, ii = ae, ci = Zn, ze = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = ze.truncate(t(e));
    return n in ze.store ? ze.get(e, t, r) : (ze.store[n] = r, [n, () => delete ze.store[n]]);
  },
  purge: (e) => {
    ze.store[e] && (delete ze.store[e], ci.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    ze.store[e] && (delete ze.store[e], ci.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in ze.store)
      ze.purgeSync(e);
  },
  truncate: (e) => {
    const t = Qd.basename(e);
    if (t.length <= ii.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - ii.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", ze.purgeSyncAll);
$a.default = ze;
Object.defineProperty(it, "__esModule", { value: !0 });
it.writeFileSync = it.writeFile = it.readFileSync = it.readFile = void 0;
const Kc = sr, Se = ae, se = Zn, qe = ma, Zd = ya, Pt = $a;
function Gc(e, t = Se.DEFAULT_READ_OPTIONS) {
  var r;
  if (qe.default.isString(t))
    return Gc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Se.DEFAULT_TIMEOUT_ASYNC);
  return se.default.readFileRetry(n)(e, t);
}
it.readFile = Gc;
function Hc(e, t = Se.DEFAULT_READ_OPTIONS) {
  var r;
  if (qe.default.isString(t))
    return Hc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Se.DEFAULT_TIMEOUT_SYNC);
  return se.default.readFileSyncRetry(n)(e, t);
}
it.readFileSync = Hc;
const Bc = (e, t, r, n) => {
  if (qe.default.isFunction(r))
    return Bc(e, t, Se.DEFAULT_WRITE_OPTIONS, r);
  const s = Jc(e, t, r);
  return n && s.then(n, n), s;
};
it.writeFile = Bc;
const Jc = async (e, t, r = Se.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (qe.default.isString(r))
    return Jc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Se.DEFAULT_TIMEOUT_ASYNC);
  let a = null, i = null, u = null, c = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), i = await Zd.default.schedule(e), e = await se.default.realpathAttempt(e) || e, [c, u] = Pt.default.get(e, r.tmpCreate || Pt.default.create, r.tmpPurge !== !1);
    const l = Se.IS_POSIX && qe.default.isUndefined(r.chown), h = qe.default.isUndefined(r.mode);
    if (l || h) {
      const _ = await se.default.statAttempt(e);
      _ && (r = { ...r }, l && (r.chown = { uid: _.uid, gid: _.gid }), h && (r.mode = _.mode));
    }
    const b = Kc.dirname(e);
    await se.default.mkdirAttempt(b, {
      mode: Se.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await se.default.openRetry(s)(c, "w", r.mode || Se.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), qe.default.isString(t) ? await se.default.writeRetry(s)(d, t, 0, r.encoding || Se.DEFAULT_ENCODING) : qe.default.isUndefined(t) || await se.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await se.default.fsyncRetry(s)(d) : se.default.fsyncAttempt(d)), await se.default.closeRetry(s)(d), d = null, r.chown && await se.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await se.default.chmodAttempt(c, r.mode);
    try {
      await se.default.renameRetry(s)(c, e);
    } catch (_) {
      if (_.code !== "ENAMETOOLONG")
        throw _;
      await se.default.renameRetry(s)(c, Pt.default.truncate(e));
    }
    u(), c = null;
  } finally {
    d && await se.default.closeAttempt(d), c && Pt.default.purge(c), a && a(), i && i();
  }
}, Xc = (e, t, r = Se.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (qe.default.isString(r))
    return Xc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Se.DEFAULT_TIMEOUT_SYNC);
  let a = null, i = null, u = null;
  try {
    e = se.default.realpathSyncAttempt(e) || e, [i, a] = Pt.default.get(e, r.tmpCreate || Pt.default.create, r.tmpPurge !== !1);
    const c = Se.IS_POSIX && qe.default.isUndefined(r.chown), d = qe.default.isUndefined(r.mode);
    if (c || d) {
      const h = se.default.statSyncAttempt(e);
      h && (r = { ...r }, c && (r.chown = { uid: h.uid, gid: h.gid }), d && (r.mode = h.mode));
    }
    const l = Kc.dirname(e);
    se.default.mkdirSyncAttempt(l, {
      mode: Se.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), u = se.default.openSyncRetry(s)(i, "w", r.mode || Se.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), qe.default.isString(t) ? se.default.writeSyncRetry(s)(u, t, 0, r.encoding || Se.DEFAULT_ENCODING) : qe.default.isUndefined(t) || se.default.writeSyncRetry(s)(u, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? se.default.fsyncSyncRetry(s)(u) : se.default.fsyncAttempt(u)), se.default.closeSyncRetry(s)(u), u = null, r.chown && se.default.chownSyncAttempt(i, r.chown.uid, r.chown.gid), r.mode && se.default.chmodSyncAttempt(i, r.mode);
    try {
      se.default.renameSyncRetry(s)(i, e);
    } catch (h) {
      if (h.code !== "ENAMETOOLONG")
        throw h;
      se.default.renameSyncRetry(s)(i, Pt.default.truncate(e));
    }
    a(), i = null;
  } finally {
    u && se.default.closeSyncAttempt(u), i && Pt.default.purge(i);
  }
};
it.writeFileSync = Xc;
var Ls = { exports: {} }, Wc = {}, et = {}, vr = {}, en = {}, te = {}, Zr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...w) {
    const N = [p[0]];
    let R = 0;
    for (; R < w.length; )
      u(N, w[R]), N.push(p[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(p, ...w) {
    const N = [_(p[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(a), u(N, w[R]), N.push(a, _(p[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(p, w) {
    w instanceof n ? p.push(...w._items) : w instanceof r ? p.push(w) : p.push(h(w));
  }
  e.addCodeArg = u;
  function c(p) {
    let w = 1;
    for (; w < p.length - 1; ) {
      if (p[w] === a) {
        const N = d(p[w - 1], p[w + 1]);
        if (N !== void 0) {
          p.splice(w - 1, 3, N);
          continue;
        }
        p[w++] = "+";
      }
      w++;
    }
  }
  function d(p, w) {
    if (w === '""')
      return p;
    if (p === '""')
      return w;
    if (typeof p == "string")
      return w instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${p.slice(0, -1)}${w}"` : w[0] === '"' ? p.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(p instanceof r))
      return `"${p}${w.slice(1)}`;
  }
  function l(p, w) {
    return w.emptyStr() ? p : p.emptyStr() ? w : i`${p}${w}`;
  }
  e.strConcat = l;
  function h(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : _(Array.isArray(p) ? p.join(",") : p);
  }
  function b(p) {
    return new n(_(p));
  }
  e.stringify = b;
  function _(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function v(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = v;
  function g(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function $(p) {
    return new n(p.toString());
  }
  e.regexpCode = $;
})(Zr);
var Fs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Zr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: l } = {}) {
      this._names = {}, this._prefixes = d, this._parent = l;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const l = this._names[d] || this._nameGroup(d);
      return `${d}${l.index++}`;
    }
    _nameGroup(d) {
      var l, h;
      if (!((h = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class u extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, l) {
      var h;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const b = this.toName(d), { prefix: _ } = b, v = (h = l.key) !== null && h !== void 0 ? h : l.ref;
      let g = this._values[_];
      if (g) {
        const w = g.get(v);
        if (w)
          return w;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(v, b);
      const $ = this._scope[_] || (this._scope[_] = []), p = $.length;
      return $[p] = l.ref, b.setValue(l, { property: _, itemIndex: p }), b;
    }
    getValue(d, l) {
      const h = this._values[d];
      if (h)
        return h.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, h) {
      return this._reduceValues(d, (b) => {
        if (b.value === void 0)
          throw new Error(`CodeGen: name "${b}" has no value`);
        return b.value.code;
      }, l, h);
    }
    _reduceValues(d, l, h = {}, b) {
      let _ = t.nil;
      for (const v in d) {
        const g = d[v];
        if (!g)
          continue;
        const $ = h[v] = h[v] || /* @__PURE__ */ new Map();
        g.forEach((p) => {
          if ($.has(p))
            return;
          $.set(p, n.Started);
          let w = l(p);
          if (w) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${p} = ${w};${this.opts._n}`;
          } else if (w = b == null ? void 0 : b(p))
            _ = (0, t._)`${_}${w}${this.opts._n}`;
          else
            throw new r(p);
          $.set(p, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(Fs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Zr, r = Fs;
  var n = Zr;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = Fs;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(o, f) {
      return this;
    }
  }
  class i extends a {
    constructor(o, f, P) {
      super(), this.varKind = o, this.name = f, this.rhs = P;
    }
    render({ es5: o, _n: f }) {
      const P = o ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${j};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class u extends a {
    constructor(o, f, P) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = P;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(o, this.rhs);
    }
  }
  class c extends u {
    constructor(o, f, P, j) {
      super(o, P, j), this.op = f;
    }
    render({ _n: o }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + o;
    }
  }
  class d extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `${this.label}:` + o;
    }
  }
  class l extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class h extends a {
    constructor(o) {
      super(), this.error = o;
    }
    render({ _n: o }) {
      return `throw ${this.error};` + o;
    }
    get names() {
      return this.error.names;
    }
  }
  class b extends a {
    constructor(o) {
      super(), this.code = o;
    }
    render({ _n: o }) {
      return `${this.code};` + o;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(o, f) {
      return this.code = C(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, P) => f + P.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const P = o[f].optimizeNodes();
        Array.isArray(P) ? o.splice(f, 1, ...P) : P ? o[f] = P : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: P } = this;
      let j = P.length;
      for (; j--; ) {
        const A = P[j];
        A.optimizeNames(o, f) || (k(o, A.names), P.splice(j, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class v extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class $ extends v {
  }
  $.kind = "else";
  class p extends v {
    constructor(o, f) {
      super(f), this.condition = o;
    }
    render(o) {
      let f = `if(${this.condition})` + super.render(o);
      return this.else && (f += "else " + this.else.render(o)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const o = this.condition;
      if (o === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const P = f.optimizeNodes();
        f = this.else = Array.isArray(P) ? new $(P) : P;
      }
      if (f)
        return o === !1 ? f instanceof p ? f : f.nodes : this.nodes.length ? this : new p(U(o), f instanceof p ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = C(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return de(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  p.kind = "if";
  class w extends v {
  }
  w.kind = "for";
  class N extends w {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = C(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends w {
    constructor(o, f, P, j) {
      super(), this.varKind = o, this.name = f, this.from = P, this.to = j;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: P, from: j, to: A } = this;
      return `for(${f} ${P}=${j}; ${P}<${A}; ${P}++)` + super.render(o);
    }
    get names() {
      const o = de(super.names, this.from);
      return de(o, this.to);
    }
  }
  class I extends w {
    constructor(o, f, P, j) {
      super(), this.loop = o, this.varKind = f, this.name = P, this.iterable = j;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = C(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends v {
    constructor(o, f, P) {
      super(), this.name = o, this.args = f, this.async = P;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  z.kind = "func";
  class B extends _ {
    render(o) {
      return "return " + super.render(o);
    }
  }
  B.kind = "return";
  class ue extends v {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var P, j;
      return super.optimizeNames(o, f), (P = this.catch) === null || P === void 0 || P.optimizeNames(o, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class V extends v {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends v {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(o, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(o) {
      return this._scope.name(o);
    }
    // reserves unique name in the external scope
    scopeName(o) {
      return this._extScope.name(o);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(o, f) {
      const P = this._extScope.value(o, f);
      return (this._values[P.prefix] || (this._values[P.prefix] = /* @__PURE__ */ new Set())).add(P), P;
    }
    getScopeValue(o, f) {
      return this._extScope.getValue(o, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(o) {
      return this._extScope.scopeRefs(o, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(o, f, P, j) {
      const A = this._scope.toName(f);
      return P !== void 0 && j && (this._constants[A.str] = P), this._leafNode(new i(o, A, P)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, P) {
      return this._def(r.varKinds.const, o, f, P);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, P) {
      return this._def(r.varKinds.let, o, f, P);
    }
    // `var` declaration with optional assignment
    var(o, f, P) {
      return this._def(r.varKinds.var, o, f, P);
    }
    // assignment code
    assign(o, f, P) {
      return this._leafNode(new u(o, f, P));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new b(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [P, j] of o)
        f.length > 1 && f.push(","), f.push(P), (P !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, P) {
      if (this._blockNode(new p(o)), f && P)
        this.code(f).else().code(P).endIf();
      else if (f)
        this.code(f).endIf();
      else if (P)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new p(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new $());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, $);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, P, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(o);
      return this._for(new R(A, q, f, P), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, P, j = r.varKinds.const) {
      const A = this._scope.toName(o);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), P(A);
        });
      }
      return this._for(new I("of", j, A, f), () => P(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, P, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, P);
      const A = this._scope.toName(o);
      return this._for(new I("in", j, A, f), () => P(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new l(o));
    }
    // `return` statement
    return(o) {
      const f = new B();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(B);
    }
    // `try` statement
    try(o, f, P) {
      if (!f && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new ue();
      if (this._blockNode(j), this.code(o), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return P && (this._currNode = j.finally = new H(), this.code(P)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new h(o));
    }
    // start self-balancing block
    block(o, f) {
      return this._blockStarts.push(this._nodes.length), o && this.code(o).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(o) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const P = this._nodes.length - f;
      if (P < 0 || o !== void 0 && P !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${P} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, P, j) {
      return this._blockNode(new z(o, f, P)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(o = 1) {
      for (; o-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(o) {
      return this._currNode.nodes.push(o), this;
    }
    _blockNode(o) {
      this._currNode.nodes.push(o), this._nodes.push(o);
    }
    _endBlockNode(o, f) {
      const P = this._currNode;
      if (P instanceof o || f && P instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof p))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = o, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const o = this._nodes;
      return o[o.length - 1];
    }
    set _currNode(o) {
      const f = this._nodes;
      f[f.length - 1] = o;
    }
  }
  e.CodeGen = ne;
  function Q(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) + (o[f] || 0);
    return y;
  }
  function de(y, o) {
    return o instanceof t._CodeOrName ? Q(y, o.names) : y;
  }
  function C(y, o, f) {
    if (y instanceof t.Name)
      return P(y);
    if (!j(y))
      return y;
    return new t._Code(y._items.reduce((A, q) => (q instanceof t.Name && (q = P(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function P(A) {
      const q = f[A.str];
      return q === void 0 || o[A.str] !== 1 ? A : (delete o[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && o[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) - (o[f] || 0);
  }
  function U(y) {
    return typeof y == "boolean" || typeof y == "number" || y === null ? !y : (0, t._)`!${S(y)}`;
  }
  e.not = U;
  const D = m(e.operators.AND);
  function O(...y) {
    return y.reduce(D);
  }
  e.and = O;
  const T = m(e.operators.OR);
  function E(...y) {
    return y.reduce(T);
  }
  e.or = E;
  function m(y) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${y} ${S(f)}`;
  }
  function S(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(te);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ie = te, xd = Zr;
function ef(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = ef;
function tf(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Yc(e, t), !Qc(t, e.self.RULES.all));
}
M.alwaysValidSchema = tf;
function Yc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || el(e, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = Yc;
function Qc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = Qc;
function rf(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = rf;
function nf({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ie._)`${r}`;
  }
  return (0, ie._)`${e}${t}${(0, ie.getProperty)(n)}`;
}
M.schemaRefOrVal = nf;
function sf(e) {
  return Zc(decodeURIComponent(e));
}
M.unescapeFragment = sf;
function af(e) {
  return encodeURIComponent(_a(e));
}
M.escapeFragment = af;
function _a(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = _a;
function Zc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = Zc;
function of(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = of;
function li({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ie.Name ? (a instanceof ie.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ie.Name ? (t(s, i, a), a) : r(a, i);
    return u === ie.Name && !(c instanceof ie.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: li({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ie._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ie._)`${r} || {}`).code((0, ie._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ie._)`${r} || {}`), ga(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: xc
  }),
  items: li({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ie._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ie._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function xc(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ie._)`{}`);
  return t !== void 0 && ga(e, r, t), r;
}
M.evaluatedPropsToName = xc;
function ga(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ie._)`${t}${(0, ie.getProperty)(n)}`, !0));
}
M.setEvaluated = ga;
const ui = {};
function cf(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: ui[t.code] || (ui[t.code] = new xd._Code(t.code))
  });
}
M.useFunc = cf;
var Vs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Vs || (M.Type = Vs = {}));
function lf(e, t, r) {
  if (e instanceof ie.Name) {
    const n = t === Vs.Num;
    return r ? n ? (0, ie._)`"[" + ${e} + "]"` : (0, ie._)`"['" + ${e} + "']"` : n ? (0, ie._)`"/" + ${e}` : (0, ie._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ie.getProperty)(e).toString() : "/" + _a(e);
}
M.getErrorPath = lf;
function el(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = el;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
const Ne = te, uf = {
  // validation function arguments
  data: new Ne.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Ne.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Ne.Name("instancePath"),
  parentData: new Ne.Name("parentData"),
  parentDataProperty: new Ne.Name("parentDataProperty"),
  rootData: new Ne.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Ne.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Ne.Name("vErrors"),
  // null or array of validation errors
  errors: new Ne.Name("errors"),
  // counter of validation errors
  this: new Ne.Name("this"),
  // "globals"
  self: new Ne.Name("self"),
  scope: new Ne.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Ne.Name("json"),
  jsonPos: new Ne.Name("jsonPos"),
  jsonLen: new Ne.Name("jsonLen"),
  jsonPart: new Ne.Name("jsonPart")
};
dt.default = uf;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = M, n = dt;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: p }) => p ? (0, t.str)`"${$}" keyword must be ${p} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, p = e.keywordError, w, N) {
    const { it: R } = $, { gen: I, compositeRule: z, allErrors: B } = R, ue = h($, p, w);
    N ?? (z || B) ? c(I, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, p = e.keywordError, w) {
    const { it: N } = $, { gen: R, compositeRule: I, allErrors: z } = N, B = h($, p, w);
    c(R, B), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i($, p) {
    $.assign(n.default.errors, p), $.if((0, t._)`${n.default.vErrors} !== null`, () => $.if(p, () => $.assign((0, t._)`${n.default.vErrors}.length`, p), () => $.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: $, keyword: p, schemaValue: w, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = $.name("err");
    $.forRange("i", R, n.default.errors, (B) => {
      $.const(z, (0, t._)`${n.default.vErrors}[${B}]`), $.if((0, t._)`${z}.instancePath === undefined`, () => $.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), $.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && ($.assign((0, t._)`${z}.schema`, w), $.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c($, p) {
    const w = $.const("err", p);
    $.if((0, t._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), $.code((0, t._)`${n.default.errors}++`);
  }
  function d($, p) {
    const { gen: w, validateName: N, schemaEnv: R } = $;
    R.$async ? w.throw((0, t._)`new ${$.ValidationError}(${p})`) : (w.assign((0, t._)`${N}.errors`, p), w.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function h($, p, w) {
    const { createErrors: N } = $.it;
    return N === !1 ? (0, t._)`{}` : b($, p, w);
  }
  function b($, p, w = {}) {
    const { gen: N, it: R } = $, I = [
      _(R, w),
      v($, w)
    ];
    return g($, p, I), N.object(...I);
  }
  function _({ errorPath: $ }, { instancePath: p }) {
    const w = p ? (0, t.str)`${$}${(0, r.getErrorPath)(p, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function v({ keyword: $, it: { errSchemaPath: p } }, { schemaPath: w, parentSchema: N }) {
    let R = N ? p : (0, t.str)`${p}/${$}`;
    return w && (R = (0, t.str)`${R}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g($, { params: p, message: w }, N) {
    const { keyword: R, data: I, schemaValue: z, it: B } = $, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = B;
    N.push([l.keyword, R], [l.params, typeof p == "function" ? p($) : p || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof w == "function" ? w($) : w]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([l.propertyName, V]);
  }
})(en);
Object.defineProperty(vr, "__esModule", { value: !0 });
vr.boolOrEmptySchema = vr.topBoolOrEmptySchema = void 0;
const df = en, ff = te, hf = dt, pf = {
  message: "boolean schema is false"
};
function mf(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? tl(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(hf.default.data) : (t.assign((0, ff._)`${n}.errors`, null), t.return(!0));
}
vr.topBoolOrEmptySchema = mf;
function yf(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), tl(e)) : r.var(t, !0);
}
vr.boolOrEmptySchema = yf;
function tl(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, df.reportError)(s, pf, void 0, t);
}
var $e = {}, er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.getRules = er.isJSONType = void 0;
const $f = ["string", "number", "integer", "boolean", "null", "object", "array"], _f = new Set($f);
function gf(e) {
  return typeof e == "string" && _f.has(e);
}
er.isJSONType = gf;
function vf() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
er.getRules = vf;
var ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.shouldUseRule = ht.shouldUseGroup = ht.schemaHasRulesForType = void 0;
function Ef({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && rl(e, n);
}
ht.schemaHasRulesForType = Ef;
function rl(e, t) {
  return t.rules.some((r) => nl(e, r));
}
ht.shouldUseGroup = rl;
function nl(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
ht.shouldUseRule = nl;
Object.defineProperty($e, "__esModule", { value: !0 });
$e.reportTypeError = $e.checkDataTypes = $e.checkDataType = $e.coerceAndCheckDataType = $e.getJSONTypes = $e.getSchemaTypes = $e.DataType = void 0;
const wf = er, Sf = ht, bf = en, W = te, sl = M;
var hr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(hr || ($e.DataType = hr = {}));
function Pf(e) {
  const t = al(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
$e.getSchemaTypes = Pf;
function al(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(wf.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
$e.getJSONTypes = al;
function Nf(e, t) {
  const { gen: r, data: n, opts: s } = e, a = Of(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, Sf.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = va(t, n, s.strictNumbers, hr.Wrong);
    r.if(u, () => {
      a.length ? Rf(e, t, a) : Ea(e);
    });
  }
  return i;
}
$e.coerceAndCheckDataType = Nf;
const ol = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Of(e, t) {
  return t ? e.filter((r) => ol.has(r) || t === "array" && r === "array") : [];
}
function Rf(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, W._)`typeof ${s}`), u = n.let("coerced", (0, W._)`undefined`);
  a.coerceTypes === "array" && n.if((0, W._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, W._)`${s}[0]`).assign(i, (0, W._)`typeof ${s}`).if(va(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, W._)`${u} !== undefined`);
  for (const d of r)
    (ol.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), Ea(e), n.endIf(), n.if((0, W._)`${u} !== undefined`, () => {
    n.assign(s, u), Tf(e, u);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, W._)`${i} == "number" || ${i} == "boolean"`).assign(u, (0, W._)`"" + ${s}`).elseIf((0, W._)`${s} === null`).assign(u, (0, W._)`""`);
        return;
      case "number":
        n.elseIf((0, W._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(u, (0, W._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, W._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(u, (0, W._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, W._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(u, !1).elseIf((0, W._)`${s} === "true" || ${s} === 1`).assign(u, !0);
        return;
      case "null":
        n.elseIf((0, W._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(u, null);
        return;
      case "array":
        n.elseIf((0, W._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(u, (0, W._)`[${s}]`);
    }
  }
}
function Tf({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, W._)`${t} !== undefined`, () => e.assign((0, W._)`${t}[${r}]`, n));
}
function Us(e, t, r, n = hr.Correct) {
  const s = n === hr.Correct ? W.operators.EQ : W.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, W._)`${t} ${s} null`;
    case "array":
      a = (0, W._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, W._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, W._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, W._)`typeof ${t} ${s} ${e}`;
  }
  return n === hr.Correct ? a : (0, W.not)(a);
  function i(u = W.nil) {
    return (0, W.and)((0, W._)`typeof ${t} == "number"`, u, r ? (0, W._)`isFinite(${t})` : W.nil);
  }
}
$e.checkDataType = Us;
function va(e, t, r, n) {
  if (e.length === 1)
    return Us(e[0], t, r, n);
  let s;
  const a = (0, sl.toHash)(e);
  if (a.array && a.object) {
    const i = (0, W._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, W._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = W.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, W.and)(s, Us(i, t, r, n));
  return s;
}
$e.checkDataTypes = va;
const If = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, W._)`{type: ${e}}` : (0, W._)`{type: ${t}}`
};
function Ea(e) {
  const t = jf(e);
  (0, bf.reportError)(t, If);
}
$e.reportTypeError = Ea;
function jf(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, sl.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.assignDefaults = void 0;
const ar = te, Af = M;
function kf(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      di(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => di(e, a, s.default));
}
xn.assignDefaults = kf;
function di(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, ar._)`${a}${(0, ar.getProperty)(t)}`;
  if (s) {
    (0, Af.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, ar._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, ar._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, ar._)`${u} = ${(0, ar.stringify)(r)}`);
}
var ct = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const fe = te, wa = M, _t = dt, Cf = M;
function Df(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(ba(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, fe._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = Df;
function Mf({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, fe.or)(...n.map((a) => (0, fe.and)(ba(e, t, a, r.ownProperties), (0, fe._)`${s} = ${a}`)));
}
x.checkMissingProp = Mf;
function Lf(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = Lf;
function il(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, fe._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = il;
function Sa(e, t, r) {
  return (0, fe._)`${il(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = Sa;
function Ff(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} !== undefined`;
  return n ? (0, fe._)`${s} && ${Sa(e, t, r)}` : s;
}
x.propertyInData = Ff;
function ba(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} === undefined`;
  return n ? (0, fe.or)(s, (0, fe.not)(Sa(e, t, r))) : s;
}
x.noPropertyInData = ba;
function cl(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = cl;
function Vf(e, t) {
  return cl(t).filter((r) => !(0, wa.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = Vf;
function Uf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, fe._)`${e}, ${t}, ${n}${s}` : t, h = [
    [_t.default.instancePath, (0, fe.strConcat)(_t.default.instancePath, a)],
    [_t.default.parentData, i.parentData],
    [_t.default.parentDataProperty, i.parentDataProperty],
    [_t.default.rootData, _t.default.rootData]
  ];
  i.opts.dynamicRef && h.push([_t.default.dynamicAnchors, _t.default.dynamicAnchors]);
  const b = (0, fe._)`${l}, ${r.object(...h)}`;
  return c !== fe.nil ? (0, fe._)`${u}.call(${c}, ${b})` : (0, fe._)`${u}(${b})`;
}
x.callValidateCode = Uf;
const zf = (0, fe._)`new RegExp`;
function qf({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, fe._)`${s.code === "new RegExp" ? zf : (0, Cf.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = qf;
function Kf(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const u = t.let("valid", !0);
    return i(() => t.assign(u, !1)), u;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(u) {
    const c = t.const("len", (0, fe._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: wa.Type.Num
      }, a), t.if((0, fe.not)(a), u);
    });
  }
}
x.validateArray = Kf;
function Gf(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, wa.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), u = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, u);
    t.assign(i, (0, fe._)`${i} || ${u}`), e.mergeValidEvaluated(l, u) || t.if((0, fe.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
x.validateUnion = Gf;
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.validateKeywordUsage = ct.validSchemaType = ct.funcKeywordCode = ct.macroKeywordCode = void 0;
const Ie = te, Xt = dt, Hf = x, Bf = en;
function Jf(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = ll(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: Ie.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
ct.macroKeywordCode = Jf;
function Xf(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  Yf(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = ll(n, s, d), h = n.let("valid");
  e.block$data(h, b), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function b() {
    if (t.errors === !1)
      g(), t.modifying && fi(e), $(() => e.error());
    else {
      const p = t.async ? _() : v();
      t.modifying && fi(e), $(() => Wf(e, p));
    }
  }
  function _() {
    const p = n.let("ruleErrs", null);
    return n.try(() => g((0, Ie._)`await `), (w) => n.assign(h, !1).if((0, Ie._)`${w} instanceof ${c.ValidationError}`, () => n.assign(p, (0, Ie._)`${w}.errors`), () => n.throw(w))), p;
  }
  function v() {
    const p = (0, Ie._)`${l}.errors`;
    return n.assign(p, null), g(Ie.nil), p;
  }
  function g(p = t.async ? (0, Ie._)`await ` : Ie.nil) {
    const w = c.opts.passContext ? Xt.default.this : Xt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(h, (0, Ie._)`${p}${(0, Hf.callValidateCode)(e, l, w, N)}`, t.modifying);
  }
  function $(p) {
    var w;
    n.if((0, Ie.not)((w = t.valid) !== null && w !== void 0 ? w : h), p);
  }
}
ct.funcKeywordCode = Xf;
function fi(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ie._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Wf(e, t) {
  const { gen: r } = e;
  r.if((0, Ie._)`Array.isArray(${t})`, () => {
    r.assign(Xt.default.vErrors, (0, Ie._)`${Xt.default.vErrors} === null ? ${t} : ${Xt.default.vErrors}.concat(${t})`).assign(Xt.default.errors, (0, Ie._)`${Xt.default.vErrors}.length`), (0, Bf.extendErrors)(e);
  }, () => e.error());
}
function Yf({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function ll(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ie.stringify)(r) });
}
function Qf(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
ct.validSchemaType = Qf;
function Zf({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((u) => !Object.prototype.hasOwnProperty.call(e, u)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
ct.validateKeywordUsage = Zf;
var Rt = {};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.extendSubschemaMode = Rt.extendSubschemaData = Rt.getSubschema = void 0;
const at = te, ul = M;
function xf(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, at._)`${e.schemaPath}${(0, at.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, at._)`${e.schemaPath}${(0, at.getProperty)(t)}${(0, at.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, ul.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Rt.getSubschema = xf;
function eh(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: h } = t, b = u.let("data", (0, at._)`${t.data}${(0, at.getProperty)(r)}`, !0);
    c(b), e.errorPath = (0, at.str)`${d}${(0, ul.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, at._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof at.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Rt.extendSubschemaData = eh;
function th(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Rt.extendSubschemaMode = th;
var be = {}, es = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, a;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!e(t[s], r[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (a = Object.keys(t), n = a.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, a[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var i = a[s];
      if (!e(t[i], r[i])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, dl = { exports: {} }, Nt = dl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Rn(t, n, s, e, "", e);
};
Nt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Nt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Nt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Nt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Rn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var h = n[l];
      if (Array.isArray(h)) {
        if (l in Nt.arrayKeywords)
          for (var b = 0; b < h.length; b++)
            Rn(e, t, r, h[b], s + "/" + l + "/" + b, a, s, l, n, b);
      } else if (l in Nt.propsKeywords) {
        if (h && typeof h == "object")
          for (var _ in h)
            Rn(e, t, r, h[_], s + "/" + l + "/" + rh(_), a, s, l, n, _);
      } else (l in Nt.keywords || e.allKeys && !(l in Nt.skipKeywords)) && Rn(e, t, r, h, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function rh(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var nh = dl.exports;
Object.defineProperty(be, "__esModule", { value: !0 });
be.getSchemaRefs = be.resolveUrl = be.normalizeId = be._getFullPath = be.getFullPath = be.inlineRef = void 0;
const sh = M, ah = es, oh = nh, ih = /* @__PURE__ */ new Set([
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
function ch(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !zs(e) : t ? fl(e) <= t : !1;
}
be.inlineRef = ch;
const lh = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function zs(e) {
  for (const t in e) {
    if (lh.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(zs) || typeof r == "object" && zs(r))
      return !0;
  }
  return !1;
}
function fl(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !ih.has(r) && (typeof e[r] == "object" && (0, sh.eachItem)(e[r], (n) => t += fl(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function hl(e, t = "", r) {
  r !== !1 && (t = pr(t));
  const n = e.parse(t);
  return pl(e, n);
}
be.getFullPath = hl;
function pl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
be._getFullPath = pl;
const uh = /#\/?$/;
function pr(e) {
  return e ? e.replace(uh, "") : "";
}
be.normalizeId = pr;
function dh(e, t, r) {
  return r = pr(r), e.resolve(t, r);
}
be.resolveUrl = dh;
const fh = /^[a-z_][-a-z0-9._]*$/i;
function hh(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = pr(e[r] || t), a = { "": s }, i = hl(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return oh(e, { allKeys: !0 }, (h, b, _, v) => {
    if (v === void 0)
      return;
    const g = i + b;
    let $ = a[v];
    typeof h[r] == "string" && ($ = p.call(this, h[r])), w.call(this, h.$anchor), w.call(this, h.$dynamicAnchor), a[b] = $;
    function p(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = pr($ ? R($, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(h, I.schema, N) : N !== pr(g) && (N[0] === "#" ? (d(h, u[N], N), u[N] = h) : this.refs[N] = g), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!fh.test(N))
          throw new Error(`invalid anchor "${N}"`);
        p.call(this, `#${N}`);
      }
    }
  }), u;
  function d(h, b, _) {
    if (b !== void 0 && !ah(h, b))
      throw l(_);
  }
  function l(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
be.getSchemaRefs = hh;
Object.defineProperty(et, "__esModule", { value: !0 });
et.getData = et.KeywordCxt = et.validateFunctionCode = void 0;
const ml = vr, hi = $e, Pa = ht, Un = $e, ph = xn, qr = ct, gs = Rt, K = te, J = dt, mh = be, pt = M, kr = en;
function yh(e) {
  if (_l(e) && (gl(e), $l(e))) {
    gh(e);
    return;
  }
  yl(e, () => (0, ml.topBoolOrEmptySchema)(e));
}
et.validateFunctionCode = yh;
function yl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, K._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${pi(r, s)}`), _h(e, s), e.code(a);
  }) : e.func(t, (0, K._)`${J.default.data}, ${$h(s)}`, n.$async, () => e.code(pi(r, s)).code(a));
}
function $h(e) {
  return (0, K._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, K._)`, ${J.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function _h(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, K._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, K._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, K._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, K._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, K._)`""`), e.var(J.default.parentData, (0, K._)`undefined`), e.var(J.default.parentDataProperty, (0, K._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function gh(e) {
  const { schema: t, opts: r, gen: n } = e;
  yl(e, () => {
    r.$comment && t.$comment && El(e), bh(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && vh(e), vl(e), Oh(e);
  });
}
function vh(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function pi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function Eh(e, t) {
  if (_l(e) && (gl(e), $l(e))) {
    wh(e, t);
    return;
  }
  (0, ml.boolOrEmptySchema)(e, t);
}
function $l({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function _l(e) {
  return typeof e.schema != "boolean";
}
function wh(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && El(e), Ph(e), Nh(e);
  const a = n.const("_errs", J.default.errors);
  vl(e, a), n.var(t, (0, K._)`${a} === ${J.default.errors}`);
}
function gl(e) {
  (0, pt.checkUnknownRules)(e), Sh(e);
}
function vl(e, t) {
  if (e.opts.jtd)
    return mi(e, [], !1, t);
  const r = (0, hi.getSchemaTypes)(e.schema), n = (0, hi.coerceAndCheckDataType)(e, r);
  mi(e, r, !n, t);
}
function Sh(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, pt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function bh(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, pt.checkStrictMode)(e, "default is ignored in the schema root");
}
function Ph(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, mh.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Nh(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function El({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${J.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, K.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${J.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function Oh(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, K._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, K._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, J.default.vErrors), a.unevaluated && Rh(e), t.return((0, K._)`${J.default.errors} === 0`));
}
function Rh({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function mi(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, pt.schemaHasRulesButRef)(a, l))) {
    s.block(() => bl(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || Th(e, t), s.block(() => {
    for (const b of l.rules)
      h(b);
    h(l.post);
  });
  function h(b) {
    (0, Pa.shouldUseGroup)(a, b) && (b.type ? (s.if((0, Un.checkDataType)(b.type, i, c.strictNumbers)), yi(e, b), t.length === 1 && t[0] === b.type && r && (s.else(), (0, Un.reportTypeError)(e)), s.endIf()) : yi(e, b), u || s.if((0, K._)`${J.default.errors} === ${n || 0}`));
  }
}
function yi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, ph.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, Pa.shouldUseRule)(n, a) && bl(e, a.keyword, a.definition, t.type);
  });
}
function Th(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (Ih(e, t), e.opts.allowUnionTypes || jh(e, t), Ah(e, e.dataTypes));
}
function Ih(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      wl(e.dataTypes, r) || Na(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Ch(e, t);
  }
}
function jh(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Na(e, "use allowUnionTypes to allow union type keyword");
}
function Ah(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Pa.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => kh(t, i)) && Na(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function kh(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function wl(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Ch(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    wl(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Na(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, pt.checkStrictMode)(e, t, e.opts.strictTypes);
}
let Sl = class {
  constructor(t, r, n) {
    if ((0, qr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, pt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Pl(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, qr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", J.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, K.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, K.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, K._)`${r} !== undefined && (${(0, K.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? kr.reportExtraError : kr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, kr.reportError)(this, this.def.$dataError || kr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, kr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = K.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = K.nil, r = K.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, K.or)((0, K._)`${s} === undefined`, r)), t !== K.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== K.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, K.or)(i(), u());
    function i() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Un.checkDataTypes)(c, r, a.opts.strictNumbers, Un.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function u() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, K._)`!${c}(${r})`;
      }
      return K.nil;
    }
  }
  subschema(t, r) {
    const n = (0, gs.getSubschema)(this.it, t);
    (0, gs.extendSubschemaData)(n, this.it, t), (0, gs.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return Eh(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = pt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = pt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
};
et.KeywordCxt = Sl;
function bl(e, t, r, n) {
  const s = new Sl(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, qr.funcKeywordCode)(s, r) : "macro" in r ? (0, qr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, qr.funcKeywordCode)(s, r);
}
const Dh = /^\/(?:[^~]|~0|~1)*$/, Mh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Pl(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!Dh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = J.default.rootData;
  } else {
    const d = Mh.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +d[1];
    if (s = d[2], s === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (a = r[t - l], !s)
      return a;
  }
  let i = a;
  const u = s.split("/");
  for (const d of u)
    d && (a = (0, K._)`${a}${(0, K.getProperty)((0, pt.unescapeJsonPointer)(d))}`, i = (0, K._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
et.getData = Pl;
var tn = {};
Object.defineProperty(tn, "__esModule", { value: !0 });
let Lh = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
tn.default = Lh;
var br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
const vs = be;
let Fh = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, vs.resolveUrl)(t, r, n), this.missingSchema = (0, vs.normalizeId)((0, vs.getFullPath)(t, this.missingRef));
  }
};
br.default = Fh;
var Le = {};
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.resolveSchema = Le.getCompilingSchema = Le.resolveRef = Le.compileSchema = Le.SchemaEnv = void 0;
const Je = te, Vh = tn, Ht = dt, Ze = be, $i = M, Uh = et;
let ts = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Ze.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Le.SchemaEnv = ts;
function Oa(e) {
  const t = Nl.call(this, e);
  if (t)
    return t;
  const r = (0, Ze.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Je.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: Vh.default,
    code: (0, Je._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Ht.default.data,
    parentData: Ht.default.parentData,
    parentDataProperty: Ht.default.parentDataProperty,
    dataNames: [Ht.default.data],
    dataPathArr: [Je.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Je.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Je.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Je._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, Uh.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    l = `${i.scopeRefs(Ht.default.scope)}return ${h}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${Ht.default.self}`, `${Ht.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: v, items: g } = d;
      _.evaluated = {
        props: v instanceof Je.Name ? void 0 : v,
        items: g instanceof Je.Name ? void 0 : g,
        dynamicProps: v instanceof Je.Name,
        dynamicItems: g instanceof Je.Name
      }, _.source && (_.source.evaluated = (0, Je.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), h;
  } finally {
    this._compilations.delete(e);
  }
}
Le.compileSchema = Oa;
function zh(e, t, r) {
  var n;
  r = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Gh.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new ts({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = qh.call(this, a);
}
Le.resolveRef = zh;
function qh(e) {
  return (0, Ze.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Oa.call(this, e);
}
function Nl(e) {
  for (const t of this._compilations)
    if (Kh(t, e))
      return t;
}
Le.getCompilingSchema = Nl;
function Kh(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Gh(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || rs.call(this, e, t);
}
function rs(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Ze._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Ze.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Es.call(this, r, e);
  const a = (0, Ze.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = rs.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : Es.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || Oa.call(this, i), a === (0, Ze.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Ze.resolveUrl)(this.opts.uriResolver, s, d)), new ts({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return Es.call(this, r, i);
  }
}
Le.resolveSchema = rs;
const Hh = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Es(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, $i.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !Hh.has(u) && d && (t = (0, Ze.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, $i.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = rs.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new ts({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Bh = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Jh = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Xh = "object", Wh = [
  "$data"
], Yh = {
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
}, Qh = !1, Zh = {
  $id: Bh,
  description: Jh,
  type: Xh,
  required: Wh,
  properties: Yh,
  additionalProperties: Qh
};
var Ra = {}, ns = { exports: {} };
const xh = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), Ol = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function Rl(e) {
  let t = "", r = 0, n = 0;
  for (n = 0; n < e.length; n++)
    if (r = e[n].charCodeAt(0), r !== 48) {
      if (!(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
        return "";
      t += e[n];
      break;
    }
  for (n += 1; n < e.length; n++) {
    if (r = e[n].charCodeAt(0), !(r >= 48 && r <= 57 || r >= 65 && r <= 70 || r >= 97 && r <= 102))
      return "";
    t += e[n];
  }
  return t;
}
const ep = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function _i(e) {
  return e.length = 0, !0;
}
function tp(e, t, r) {
  if (e.length) {
    const n = Rl(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function rp(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, u = tp;
  for (let c = 0; c < e.length; c++) {
    const d = e[c];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (a === !0 && (i = !0), !u(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (d === "%") {
        if (!u(s, n, r))
          break;
        u = _i;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (u === _i ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(Rl(s))), r.address = n.join(""), r;
}
function Tl(e) {
  if (np(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = rp(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function np(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function sp(e) {
  let t = e;
  const r = [];
  let n = -1, s = 0;
  for (; s = t.length; ) {
    if (s === 1) {
      if (t === ".")
        break;
      if (t === "/") {
        r.push("/");
        break;
      } else {
        r.push(t);
        break;
      }
    } else if (s === 2) {
      if (t[0] === ".") {
        if (t[1] === ".")
          break;
        if (t[1] === "/") {
          t = t.slice(2);
          continue;
        }
      } else if (t[0] === "/" && (t[1] === "." || t[1] === "/")) {
        r.push("/");
        break;
      }
    } else if (s === 3 && t === "/..") {
      r.length !== 0 && r.pop(), r.push("/");
      break;
    }
    if (t[0] === ".") {
      if (t[1] === ".") {
        if (t[2] === "/") {
          t = t.slice(3);
          continue;
        }
      } else if (t[1] === "/") {
        t = t.slice(2);
        continue;
      }
    } else if (t[0] === "/" && t[1] === ".") {
      if (t[2] === "/") {
        t = t.slice(2);
        continue;
      } else if (t[2] === "." && t[3] === "/") {
        t = t.slice(3), r.length !== 0 && r.pop();
        continue;
      }
    }
    if ((n = t.indexOf("/", 1)) === -1) {
      r.push(t);
      break;
    } else
      r.push(t.slice(0, n)), t = t.slice(n);
  }
  return r.join("");
}
function ap(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function op(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!Ol(r)) {
      const n = Tl(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Il = {
  nonSimpleDomain: ep,
  recomposeAuthority: op,
  normalizeComponentEncoding: ap,
  removeDotSegments: sp,
  isIPv4: Ol,
  isUUID: xh,
  normalizeIPv6: Tl
};
const { isUUID: ip } = Il, cp = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function jl(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function Al(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function kl(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function lp(e) {
  return e.secure = jl(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function up(e) {
  if ((e.port === (jl(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function dp(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(cp);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = Ta(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function fp(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = Ta(s);
  a && (e = a.serialize(e, t));
  const i = e, u = e.nss;
  return i.path = `${n || t.nid}:${u}`, t.skipEscape = !0, i;
}
function hp(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !ip(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function pp(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Cl = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: Al,
    serialize: kl
  }
), mp = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: Cl.domainHost,
    parse: Al,
    serialize: kl
  }
), Tn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: lp,
    serialize: up
  }
), yp = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Tn.domainHost,
    parse: Tn.parse,
    serialize: Tn.serialize
  }
), $p = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: dp,
    serialize: fp,
    skipNormalize: !0
  }
), _p = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: hp,
    serialize: pp,
    skipNormalize: !0
  }
), zn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: Cl,
    https: mp,
    ws: Tn,
    wss: yp,
    urn: $p,
    "urn:uuid": _p
  }
);
Object.setPrototypeOf(zn, null);
function Ta(e) {
  return e && (zn[
    /** @type {SchemeName} */
    e
  ] || zn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var gp = {
  SCHEMES: zn,
  getSchemeHandler: Ta
};
const { normalizeIPv6: vp, removeDotSegments: Fr, recomposeAuthority: Ep, normalizeComponentEncoding: dn, isIPv4: wp, nonSimpleDomain: Sp } = Il, { SCHEMES: bp, getSchemeHandler: Dl } = gp;
function Pp(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  lt($t(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  $t(lt(e, t), t)), e;
}
function Np(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = Ml($t(e, n), $t(t, n), n, !0);
  return n.skipEscape = !0, lt(s, n);
}
function Ml(e, t, r, n) {
  const s = {};
  return n || (e = $t(lt(e, r), r), t = $t(lt(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Fr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Fr(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = Fr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Fr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function Op(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = lt(dn($t(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = lt(dn(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = lt(dn($t(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = lt(dn(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function lt(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), s = [], a = Dl(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = Ep(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let u = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (u = Fr(u)), i === void 0 && u[0] === "/" && u[1] === "/" && (u = "/%2F" + u.slice(2)), s.push(u);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const Rp = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function $t(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  };
  let s = !1;
  r.reference === "suffix" && (r.scheme ? e = r.scheme + ":" + e : e = "//" + e);
  const a = e.match(Rp);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (wp(n.host) === !1) {
        const c = vp(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = Dl(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && Sp(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (u) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + u;
      }
    (!i || i && !i.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), i && i.parse && i.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Ia = {
  SCHEMES: bp,
  normalize: Pp,
  resolve: Np,
  resolveComponent: Ml,
  equal: Op,
  serialize: lt,
  parse: $t
};
ns.exports = Ia;
ns.exports.default = Ia;
ns.exports.fastUri = Ia;
var Ll = ns.exports;
Object.defineProperty(Ra, "__esModule", { value: !0 });
const Fl = Ll;
Fl.code = 'require("ajv/dist/runtime/uri").default';
Ra.default = Fl;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = et;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = te;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = tn, s = br, a = er, i = Le, u = te, c = be, d = $e, l = M, h = Zh, b = Ra, _ = (E, m) => new RegExp(E, m);
  _.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  ]), $ = {
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
  }, p = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function N(E) {
    var m, S, y, o, f, P, j, A, q, F, re, Ue, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut, zt, qt;
    const Be = E.strict, Kt = (m = E.code) === null || m === void 0 ? void 0 : m.optimize, jr = Kt === !0 || Kt === void 0 ? 1 : Kt || 0, Ar = (y = (S = E.code) === null || S === void 0 ? void 0 : S.regExp) !== null && y !== void 0 ? y : _, _s = (o = E.uriResolver) !== null && o !== void 0 ? o : b.default;
    return {
      strictSchema: (P = (f = E.strictSchema) !== null && f !== void 0 ? f : Be) !== null && P !== void 0 ? P : !0,
      strictNumbers: (A = (j = E.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = E.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ue = (re = E.strictTuples) !== null && re !== void 0 ? re : Be) !== null && Ue !== void 0 ? Ue : "log",
      strictRequired: (jt = (It = E.strictRequired) !== null && It !== void 0 ? It : Be) !== null && jt !== void 0 ? jt : !1,
      code: E.code ? { ...E.code, optimize: jr, regExp: Ar } : { optimize: jr, regExp: Ar },
      loopRequired: (At = E.loopRequired) !== null && At !== void 0 ? At : w,
      loopEnum: (kt = E.loopEnum) !== null && kt !== void 0 ? kt : w,
      meta: (Ct = E.meta) !== null && Ct !== void 0 ? Ct : !0,
      messages: (Dt = E.messages) !== null && Dt !== void 0 ? Dt : !0,
      inlineRefs: (Mt = E.inlineRefs) !== null && Mt !== void 0 ? Mt : !0,
      schemaId: (Lt = E.schemaId) !== null && Lt !== void 0 ? Lt : "$id",
      addUsedSchema: (Ft = E.addUsedSchema) !== null && Ft !== void 0 ? Ft : !0,
      validateSchema: (Vt = E.validateSchema) !== null && Vt !== void 0 ? Vt : !0,
      validateFormats: (Ut = E.validateFormats) !== null && Ut !== void 0 ? Ut : !0,
      unicodeRegExp: (zt = E.unicodeRegExp) !== null && zt !== void 0 ? zt : !0,
      int32range: (qt = E.int32range) !== null && qt !== void 0 ? qt : !0,
      uriResolver: _s
    };
  }
  class R {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...N(m) };
      const { es5: S, lines: y } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: y }), this.logger = Q(m.logger);
      const o = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, m, "NOT SUPPORTED"), I.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = H.call(this), m.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && V.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), B.call(this), m.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: S, schemaId: y } = this.opts;
      let o = h;
      y === "id" && (o = { ...h }, o.id = o.$id, delete o.$id), S && m && this.addMetaSchema(o, o[y], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[S] || m : void 0;
    }
    validate(m, S) {
      let y;
      if (typeof m == "string") {
        if (y = this.getSchema(m), !y)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        y = this.compile(m);
      const o = y(S);
      return "$async" in y || (this.errors = y.errors), o;
    }
    compile(m, S) {
      const y = this._addSchema(m, S);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(m, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return o.call(this, m, S);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const Ue = this._addSchema(F, re);
        return Ue.validate || P.call(this, Ue);
      }
      async function f(F) {
        F && !this.getSchema(F) && await o.call(this, { $ref: F }, !0);
      }
      async function P(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), P.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, S);
      }
      async function q(F) {
        const re = this._loading[F];
        if (re)
          return re;
        try {
          return await (this._loading[F] = y(F));
        } finally {
          delete this._loading[F];
        }
      }
    }
    // Adds schema to the instance
    addSchema(m, S, y, o = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const P of m)
          this.addSchema(P, void 0, y, o);
        return this;
      }
      let f;
      if (typeof m == "object") {
        const { schemaId: P } = this.opts;
        if (f = m[P], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(m, y, S, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, S, y = this.opts.validateSchema) {
      return this.addSchema(m, S, !0, y), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, S) {
      if (typeof m == "boolean")
        return !0;
      let y;
      if (y = m.$schema, y !== void 0 && typeof y != "string")
        throw new Error("$schema must be a string");
      if (y = y || this.opts.defaultMeta || this.defaultMeta(), !y)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate(y, m);
      if (!o && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return o;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(m) {
      let S;
      for (; typeof (S = z.call(this, m)) == "string"; )
        m = S;
      if (S === void 0) {
        const { schemaId: y } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: y });
        if (S = i.resolveSchema.call(this, o, m), !S)
          return;
        this.refs[m] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(m) {
      if (m instanceof RegExp)
        return this._removeAllSchemas(this.schemas, m), this._removeAllSchemas(this.refs, m), this;
      switch (typeof m) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = z.call(this, m);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[m], delete this.refs[m], this;
        }
        case "object": {
          const S = m;
          this._cache.delete(S);
          let y = m[this.opts.schemaId];
          return y && (y = (0, c.normalizeId)(y), delete this.schemas[y], delete this.refs[y]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(m) {
      for (const S of m)
        this.addKeyword(S);
      return this;
    }
    addKeyword(m, S) {
      let y;
      if (typeof m == "string")
        y = m, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = y);
      else if (typeof m == "object" && S === void 0) {
        if (S = m, y = S.keyword, Array.isArray(y) && !y.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, y, S), !S)
        return (0, l.eachItem)(y, (f) => k.call(this, f)), this;
      D.call(this, S);
      const o = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)(y, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((P) => k.call(this, f, o, P))), this;
    }
    getKeyword(m) {
      const S = this.RULES.all[m];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: S } = this;
      delete S.keywords[m], delete S.all[m];
      for (const y of S.rules) {
        const o = y.rules.findIndex((f) => f.keyword === m);
        o >= 0 && y.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[m] = S, this;
    }
    errorsText(m = this.errors, { separator: S = ", ", dataVar: y = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((o) => `${y}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(m, S) {
      const y = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let P = m;
        for (const j of f)
          P = P[j];
        for (const j in y) {
          const A = y[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = P[j];
          q && F && (P[j] = T(F));
        }
      }
      return m;
    }
    _removeAllSchemas(m, S) {
      for (const y in m) {
        const o = m[y];
        (!S || S.test(y)) && (typeof o == "string" ? delete m[y] : o && !o.meta && (this._cache.delete(o.schema), delete m[y]));
      }
    }
    _addSchema(m, S, y, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let P;
      const { schemaId: j } = this.opts;
      if (typeof m == "object")
        P = m[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof m != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(m);
      if (A !== void 0)
        return A;
      y = (0, c.normalizeId)(P || y);
      const q = c.getSchemaRefs.call(this, m, y);
      return A = new i.SchemaEnv({ schema: m, schemaId: j, meta: S, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), o && this.validateSchema(m, !0), A;
    }
    _checkUnique(m) {
      if (this.schemas[m] || this.refs[m])
        throw new Error(`schema with key or id "${m}" already exists`);
    }
    _compileSchemaEnv(m) {
      if (m.meta ? this._compileMetaSchema(m) : i.compileSchema.call(this, m), !m.validate)
        throw new Error("ajv implementation error");
      return m.validate;
    }
    _compileMetaSchema(m) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, m);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(E, m, S, y = "error") {
    for (const o in E) {
      const f = o;
      f in m && this.logger[y](`${S}: option ${o}. ${E[f]}`);
    }
  }
  function z(E) {
    return E = (0, c.normalizeId)(E), this.schemas[E] || this.refs[E];
  }
  function B() {
    const E = this.opts.schemas;
    if (E)
      if (Array.isArray(E))
        this.addSchema(E);
      else
        for (const m in E)
          this.addSchema(E[m], m);
  }
  function ue() {
    for (const E in this.opts.formats) {
      const m = this.opts.formats[E];
      m && this.addFormat(E, m);
    }
  }
  function V(E) {
    if (Array.isArray(E)) {
      this.addVocabulary(E);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in E) {
      const S = E[m];
      S.keyword || (S.keyword = m), this.addKeyword(S);
    }
  }
  function H() {
    const E = { ...this.opts };
    for (const m of v)
      delete E[m];
    return E;
  }
  const ne = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(E) {
    if (E === !1)
      return ne;
    if (E === void 0)
      return console;
    if (E.log && E.warn && E.error)
      return E;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(E, m) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(E, (y) => {
      if (S.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(E, m, S) {
    var y;
    const o = m == null ? void 0 : m.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let P = o ? f.post : f.rules.find(({ type: A }) => A === S);
    if (P || (P = { type: S, rules: [] }, f.rules.push(P)), f.keywords[E] = !0, !m)
      return;
    const j = {
      keyword: E,
      definition: {
        ...m,
        type: (0, d.getJSONTypes)(m.type),
        schemaType: (0, d.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? U.call(this, P, j, m.before) : P.rules.push(j), f.all[E] = j, (y = m.implements) === null || y === void 0 || y.forEach((A) => this.addKeyword(A));
  }
  function U(E, m, S) {
    const y = E.rules.findIndex((o) => o.keyword === S);
    y >= 0 ? E.rules.splice(y, 0, m) : (E.rules.push(m), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(E) {
    let { metaSchema: m } = E;
    m !== void 0 && (E.$data && this.opts.$data && (m = T(m)), E.validateSchema = this.compile(m, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(E) {
    return { anyOf: [E, O] };
  }
})(Wc);
var ja = {}, Aa = {}, ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const Tp = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ka.default = Tp;
var tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.callRef = tr.getValidate = void 0;
const Ip = br, gi = x, De = te, or = dt, vi = Le, fn = M, jp = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const l = vi.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new Ip.default(n.opts.uriResolver, s, r);
    if (l instanceof vi.SchemaEnv)
      return b(l);
    return _(l);
    function h() {
      if (a === d)
        return In(e, i, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return In(e, (0, De._)`${v}.validate`, d, d.$async);
    }
    function b(v) {
      const g = Vl(e, v);
      In(e, g, v, v.$async);
    }
    function _(v) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: v, code: (0, De.stringify)(v) } : { ref: v }), $ = t.name("valid"), p = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: De.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, $);
      e.mergeEvaluated(p), e.ok($);
    }
  }
};
function Vl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, De._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
tr.getValidate = Vl;
function In(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? or.default.this : De.nil;
  n ? l() : h();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, De._)`await ${(0, gi.callValidateCode)(e, t, d)}`), _(t), i || s.assign(v, !0);
    }, (g) => {
      s.if((0, De._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), b(g), i || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, gi.callValidateCode)(e, t, d), () => _(t), () => b(t));
  }
  function b(v) {
    const g = (0, De._)`${v}.errors`;
    s.assign(or.default.vErrors, (0, De._)`${or.default.vErrors} === null ? ${g} : ${or.default.vErrors}.concat(${g})`), s.assign(or.default.errors, (0, De._)`${or.default.vErrors}.length`);
  }
  function _(v) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const $ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = fn.mergeEvaluated.props(s, $.props, a.props));
      else {
        const p = s.var("props", (0, De._)`${v}.evaluated.props`);
        a.props = fn.mergeEvaluated.props(s, p, a.props, De.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = fn.mergeEvaluated.items(s, $.items, a.items));
      else {
        const p = s.var("items", (0, De._)`${v}.evaluated.items`);
        a.items = fn.mergeEvaluated.items(s, p, a.items, De.Name);
      }
  }
}
tr.callRef = In;
tr.default = jp;
Object.defineProperty(Aa, "__esModule", { value: !0 });
const Ap = ka, kp = tr, Cp = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Ap.default,
  kp.default
];
Aa.default = Cp;
var Ca = {}, Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
const qn = te, gt = qn.operators, Kn = {
  maximum: { okStr: "<=", ok: gt.LTE, fail: gt.GT },
  minimum: { okStr: ">=", ok: gt.GTE, fail: gt.LT },
  exclusiveMaximum: { okStr: "<", ok: gt.LT, fail: gt.GTE },
  exclusiveMinimum: { okStr: ">", ok: gt.GT, fail: gt.LTE }
}, Dp = {
  message: ({ keyword: e, schemaCode: t }) => (0, qn.str)`must be ${Kn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, qn._)`{comparison: ${Kn[e].okStr}, limit: ${t}}`
}, Mp = {
  keyword: Object.keys(Kn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Dp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, qn._)`${r} ${Kn[t].fail} ${n} || isNaN(${r})`);
  }
};
Da.default = Mp;
var Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const Kr = te, Lp = {
  message: ({ schemaCode: e }) => (0, Kr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Kr._)`{multipleOf: ${e}}`
}, Fp = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Lp,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Kr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Kr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Kr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
Ma.default = Fp;
var La = {}, Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
function Ul(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Fa.default = Ul;
Ul.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(La, "__esModule", { value: !0 });
const Wt = te, Vp = M, Up = Fa, zp = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Wt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Wt._)`{limit: ${e}}`
}, qp = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: zp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Wt.operators.GT : Wt.operators.LT, i = s.opts.unicode === !1 ? (0, Wt._)`${r}.length` : (0, Wt._)`${(0, Vp.useFunc)(e.gen, Up.default)}(${r})`;
    e.fail$data((0, Wt._)`${i} ${a} ${n}`);
  }
};
La.default = qp;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const Kp = x, Gn = te, Gp = {
  message: ({ schemaCode: e }) => (0, Gn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Gn._)`{pattern: ${e}}`
}, Hp = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Gp,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Gn._)`(new RegExp(${s}, ${i}))` : (0, Kp.usePattern)(e, n);
    e.fail$data((0, Gn._)`!${u}.test(${t})`);
  }
};
Va.default = Hp;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const Gr = te, Bp = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Gr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Gr._)`{limit: ${e}}`
}, Jp = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Bp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Gr.operators.GT : Gr.operators.LT;
    e.fail$data((0, Gr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Ua.default = Jp;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const Cr = x, Hr = te, Xp = M, Wp = {
  message: ({ params: { missingProperty: e } }) => (0, Hr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Hr._)`{missingProperty: ${e}}`
}, Yp = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Wp,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !v.has(g)) {
          const $ = i.schemaEnv.baseId + i.errSchemaPath, p = `required property "${g}" is not defined at "${$}" (strictRequired)`;
          (0, Xp.checkStrictMode)(i, p, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Hr.nil, h);
      else
        for (const _ of r)
          (0, Cr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => b(_, v)), e.ok(v);
      } else
        t.if((0, Cr.checkMissingProp)(e, r, _)), (0, Cr.reportMissingProp)(e, _), t.else();
    }
    function h() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Cr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function b(_, v) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(v, (0, Cr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, Hr.not)(v), () => {
          e.error(), t.break();
        });
      }, Hr.nil);
    }
  }
};
za.default = Yp;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const Br = te, Qp = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Br.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Br._)`{limit: ${e}}`
}, Zp = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Qp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Br.operators.GT : Br.operators.LT;
    e.fail$data((0, Br._)`${r}.length ${s} ${n}`);
  }
};
qa.default = Zp;
var Ka = {}, rn = {};
Object.defineProperty(rn, "__esModule", { value: !0 });
const zl = es;
zl.code = 'require("ajv/dist/runtime/equal").default';
rn.default = zl;
Object.defineProperty(Ka, "__esModule", { value: !0 });
const ws = $e, Ee = te, xp = M, em = rn, tm = {
  message: ({ params: { i: e, j: t } }) => (0, Ee.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ee._)`{i: ${e}, j: ${t}}`
}, rm = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: tm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, ws.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, Ee._)`${i} === false`), e.ok(c);
    function l() {
      const v = t.let("i", (0, Ee._)`${r}.length`), g = t.let("j");
      e.setParams({ i: v, j: g }), t.assign(c, !0), t.if((0, Ee._)`${v} > 1`, () => (h() ? b : _)(v, g));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function b(v, g) {
      const $ = t.name("item"), p = (0, ws.checkDataTypes)(d, $, u.opts.strictNumbers, ws.DataType.Wrong), w = t.const("indices", (0, Ee._)`{}`);
      t.for((0, Ee._)`;${v}--;`, () => {
        t.let($, (0, Ee._)`${r}[${v}]`), t.if(p, (0, Ee._)`continue`), d.length > 1 && t.if((0, Ee._)`typeof ${$} == "string"`, (0, Ee._)`${$} += "_"`), t.if((0, Ee._)`typeof ${w}[${$}] == "number"`, () => {
          t.assign(g, (0, Ee._)`${w}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ee._)`${w}[${$}] = ${v}`);
      });
    }
    function _(v, g) {
      const $ = (0, xp.useFunc)(t, em.default), p = t.name("outer");
      t.label(p).for((0, Ee._)`;${v}--;`, () => t.for((0, Ee._)`${g} = ${v}; ${g}--;`, () => t.if((0, Ee._)`${$}(${r}[${v}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(p);
      })));
    }
  }
};
Ka.default = rm;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const qs = te, nm = M, sm = rn, am = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, qs._)`{allowedValue: ${e}}`
}, om = {
  keyword: "const",
  $data: !0,
  error: am,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, qs._)`!${(0, nm.useFunc)(t, sm.default)}(${r}, ${s})`) : e.fail((0, qs._)`${a} !== ${r}`);
  }
};
Ga.default = om;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const Vr = te, im = M, cm = rn, lm = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Vr._)`{allowedValues: ${e}}`
}, um = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: lm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, im.useFunc)(t, cm.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Vr.or)(...s.map((v, g) => b(_, g)));
    }
    e.pass(l);
    function h() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Vr._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function b(_, v) {
      const g = s[v];
      return typeof g == "object" && g !== null ? (0, Vr._)`${d()}(${r}, ${_}[${v}])` : (0, Vr._)`${r} === ${g}`;
    }
  }
};
Ha.default = um;
Object.defineProperty(Ca, "__esModule", { value: !0 });
const dm = Da, fm = Ma, hm = La, pm = Va, mm = Ua, ym = za, $m = qa, _m = Ka, gm = Ga, vm = Ha, Em = [
  // number
  dm.default,
  fm.default,
  // string
  hm.default,
  pm.default,
  // object
  mm.default,
  ym.default,
  // array
  $m.default,
  _m.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  gm.default,
  vm.default
];
Ca.default = Em;
var Ba = {}, Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.validateAdditionalItems = void 0;
const Yt = te, Ks = M, wm = {
  message: ({ params: { len: e } }) => (0, Yt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Yt._)`{limit: ${e}}`
}, Sm = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: wm,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ks.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    ql(e, n);
  }
};
function ql(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Yt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Yt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ks.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Yt._)`${u} <= ${t.length}`);
    r.if((0, Yt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Ks.Type.Num }, d), i.allErrors || r.if((0, Yt.not)(d), () => r.break());
    });
  }
}
Pr.validateAdditionalItems = ql;
Pr.default = Sm;
var Ja = {}, Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.validateTuple = void 0;
const Ei = te, jn = M, bm = x, Pm = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Kl(e, "additionalItems", t);
    r.items = !0, !(0, jn.alwaysValidSchema)(r, t) && e.ok((0, bm.validateArray)(e));
  }
};
function Kl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = jn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, Ei._)`${a}.length`);
  r.forEach((h, b) => {
    (0, jn.alwaysValidSchema)(u, h) || (n.if((0, Ei._)`${d} > ${b}`, () => e.subschema({
      keyword: i,
      schemaProp: b,
      dataProp: b
    }, c)), e.ok(c));
  });
  function l(h) {
    const { opts: b, errSchemaPath: _ } = u, v = r.length, g = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (b.strictTuples && !g) {
      const $ = `"${i}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, jn.checkStrictMode)(u, $, b.strictTuples);
    }
  }
}
Nr.validateTuple = Kl;
Nr.default = Pm;
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Nm = Nr, Om = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Nm.validateTuple)(e, "items")
};
Ja.default = Om;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: !0 });
const wi = te, Rm = M, Tm = x, Im = Pr, jm = {
  message: ({ params: { len: e } }) => (0, wi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, wi._)`{limit: ${e}}`
}, Am = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: jm,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Rm.alwaysValidSchema)(n, t) && (s ? (0, Im.validateAdditionalItems)(e, s) : e.ok((0, Tm.validateArray)(e)));
  }
};
Xa.default = Am;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const Ke = te, hn = M, km = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ke.str)`must contain at least ${e} valid item(s)` : (0, Ke.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ke._)`{minContains: ${e}}` : (0, Ke._)`{minContains: ${e}, maxContains: ${t}}`
}, Cm = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: km,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, Ke._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, hn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, hn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, hn.alwaysValidSchema)(a, r)) {
      let g = (0, Ke._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, Ke._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    u === void 0 && i === 1 ? _(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), u !== void 0 && t.if((0, Ke._)`${s}.length > 0`, b)) : (t.let(h, !1), b()), e.result(h, () => e.reset());
    function b() {
      const g = t.name("_valid"), $ = t.let("count", 0);
      _(g, () => t.if(g, () => v($)));
    }
    function _(g, $) {
      t.forRange("i", 0, l, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: hn.Type.Num,
          compositeRule: !0
        }, g), $();
      });
    }
    function v(g) {
      t.code((0, Ke._)`${g}++`), u === void 0 ? t.if((0, Ke._)`${g} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, Ke._)`${g} > ${u}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, Ke._)`${g} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
Wa.default = Cm;
var Gl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = M, n = x;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: h } }) => (0, t._)`{property: ${c},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, l] = a(c);
      i(c, d), u(c, l);
    }
  };
  function a({ schema: c }) {
    const d = {}, l = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const b = Array.isArray(c[h]) ? d : l;
      b[h] = c[h];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: h, it: b } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const v in d) {
      const g = d[v];
      if (g.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, h, v, b.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: g.length,
        deps: g.join(", ")
      }), b.allErrors ? l.if($, () => {
        for (const p of g)
          (0, n.checkReportMissingProp)(c, p);
      }) : (l.if((0, t._)`${$} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: h, keyword: b, it: _ } = c, v = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, h, g, _.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: b, schemaProp: g }, v);
          c.mergeValidEvaluated($, v);
        },
        () => l.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = u, e.default = s;
})(Gl);
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Hl = te, Dm = M, Mm = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Hl._)`{propertyName: ${e.propertyName}}`
}, Lm = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Mm,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Dm.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Hl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Ya.default = Lm;
var ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
const pn = x, We = te, Fm = dt, mn = M, Vm = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, We._)`{additionalProperty: ${e.additionalProperty}}`
}, Um = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Vm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, mn.alwaysValidSchema)(i, r))
      return;
    const d = (0, pn.allSchemaProperties)(n.properties), l = (0, pn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, We._)`${a} === ${Fm.default.errors}`);
    function h() {
      t.forIn("key", s, ($) => {
        !d.length && !l.length ? v($) : t.if(b($), () => v($));
      });
    }
    function b($) {
      let p;
      if (d.length > 8) {
        const w = (0, mn.schemaRefOrVal)(i, n.properties, "properties");
        p = (0, pn.isOwnProperty)(t, w, $);
      } else d.length ? p = (0, We.or)(...d.map((w) => (0, We._)`${$} === ${w}`)) : p = We.nil;
      return l.length && (p = (0, We.or)(p, ...l.map((w) => (0, We._)`${(0, pn.usePattern)(e, w)}.test(${$})`))), (0, We.not)(p);
    }
    function _($) {
      t.code((0, We._)`delete ${s}[${$}]`);
    }
    function v($) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _($);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: $ }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, mn.alwaysValidSchema)(i, r)) {
        const p = t.name("valid");
        c.removeAdditional === "failing" ? (g($, p, !1), t.if((0, We.not)(p), () => {
          e.reset(), _($);
        })) : (g($, p), u || t.if((0, We.not)(p), () => t.break()));
      }
    }
    function g($, p, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: mn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, p);
    }
  }
};
ss.default = Um;
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
const zm = et, Si = x, Ss = M, bi = ss, qm = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && bi.default.code(new zm.KeywordCxt(a, bi.default, "additionalProperties"));
    const i = (0, Si.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = Ss.mergeEvaluated.props(t, (0, Ss.toHash)(i), a.props));
    const u = i.filter((h) => !(0, Ss.alwaysValidSchema)(a, r[h]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const h of u)
      d(h) ? l(h) : (t.if((0, Si.propertyInData)(t, s, h, a.opts.ownProperties)), l(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function l(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
Qa.default = qm;
var Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
const Pi = x, yn = te, Ni = M, Oi = M, Km = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Pi.allSchemaProperties)(r), c = u.filter((g) => (0, Ni.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof yn.Name) && (a.props = (0, Oi.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    b();
    function b() {
      for (const g of u)
        d && _(g), a.allErrors ? v(g) : (t.var(l, !0), v(g), t.if(l));
    }
    function _(g) {
      for (const $ in d)
        new RegExp(g).test($) && (0, Ni.checkStrictMode)(a, `property ${$} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function v(g) {
      t.forIn("key", n, ($) => {
        t.if((0, yn._)`${(0, Pi.usePattern)(e, g)}.test(${$})`, () => {
          const p = c.includes(g);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: $,
            dataPropType: Oi.Type.Str
          }, l), a.opts.unevaluated && h !== !0 ? t.assign((0, yn._)`${h}[${$}]`, !0) : !p && !a.allErrors && t.if((0, yn.not)(l), () => t.break());
        });
      });
    }
  }
};
Za.default = Km;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const Gm = M, Hm = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, Gm.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
xa.default = Hm;
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
const Bm = x, Jm = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Bm.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
eo.default = Jm;
var to = {};
Object.defineProperty(to, "__esModule", { value: !0 });
const An = te, Xm = M, Wm = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, An._)`{passingSchemas: ${e.passing}}`
}, Ym = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Wm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, h) => {
        let b;
        (0, Xm.alwaysValidSchema)(s, l) ? t.var(c, !0) : b = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, An._)`${c} && ${i}`).assign(i, !1).assign(u, (0, An._)`[${u}, ${h}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, h), b && e.mergeEvaluated(b, An.Name);
        });
      });
    }
  }
};
to.default = Ym;
var ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
const Qm = M, Zm = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, Qm.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
ro.default = Zm;
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
const Hn = te, Bl = M, xm = {
  message: ({ params: e }) => (0, Hn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Hn._)`{failingKeyword: ${e.ifClause}}`
}, ey = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: xm,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Bl.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Ri(n, "then"), a = Ri(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Hn.not)(u), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, u);
      e.mergeEvaluated(l);
    }
    function d(l, h) {
      return () => {
        const b = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(b, i), h ? t.assign(h, (0, Hn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Ri(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Bl.alwaysValidSchema)(e, r);
}
no.default = ey;
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
const ty = M, ry = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, ty.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
so.default = ry;
Object.defineProperty(Ba, "__esModule", { value: !0 });
const ny = Pr, sy = Ja, ay = Nr, oy = Xa, iy = Wa, cy = Gl, ly = Ya, uy = ss, dy = Qa, fy = Za, hy = xa, py = eo, my = to, yy = ro, $y = no, _y = so;
function gy(e = !1) {
  const t = [
    // any
    hy.default,
    py.default,
    my.default,
    yy.default,
    $y.default,
    _y.default,
    // object
    ly.default,
    uy.default,
    cy.default,
    dy.default,
    fy.default
  ];
  return e ? t.push(sy.default, oy.default) : t.push(ny.default, ay.default), t.push(iy.default), t;
}
Ba.default = gy;
var ao = {}, oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
const me = te, vy = {
  message: ({ schemaCode: e }) => (0, me.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, me._)`{format: ${e}}`
}, Ey = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: vy,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: h } = u;
    if (!c.validateFormats)
      return;
    s ? b() : _();
    function b() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, me._)`${v}[${i}]`), $ = r.let("fType"), p = r.let("format");
      r.if((0, me._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign($, (0, me._)`${g}.type || "string"`).assign(p, (0, me._)`${g}.validate`), () => r.assign($, (0, me._)`"string"`).assign(p, g)), e.fail$data((0, me.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? me.nil : (0, me._)`${i} && !${p}`;
      }
      function N() {
        const R = l.$async ? (0, me._)`(${g}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, me._)`${p}(${n})`, I = (0, me._)`(typeof ${p} == "function" ? ${R} : ${p}.test(${n}))`;
        return (0, me._)`${p} && ${p} !== true && ${$} === ${t} && !${I}`;
      }
    }
    function _() {
      const v = h.formats[a];
      if (!v) {
        w();
        return;
      }
      if (v === !0)
        return;
      const [g, $, p] = N(v);
      g === t && e.pass(R());
      function w() {
        if (c.strictSchema === !1) {
          h.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const z = I instanceof RegExp ? (0, me.regexpCode)(I) : c.code.formats ? (0, me._)`${c.code.formats}${(0, me.getProperty)(a)}` : void 0, B = r.scopeValue("formats", { key: a, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, me._)`${B}.validate`] : ["string", I, B];
      }
      function R() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, me._)`await ${p}(${n})`;
        }
        return typeof $ == "function" ? (0, me._)`${p}(${n})` : (0, me._)`${p}.test(${n})`;
      }
    }
  }
};
oo.default = Ey;
Object.defineProperty(ao, "__esModule", { value: !0 });
const wy = oo, Sy = [wy.default];
ao.default = Sy;
var Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.contentVocabulary = Er.metadataVocabulary = void 0;
Er.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Er.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(ja, "__esModule", { value: !0 });
const by = Aa, Py = Ca, Ny = Ba, Oy = ao, Ti = Er, Ry = [
  by.default,
  Py.default,
  (0, Ny.default)(),
  Oy.default,
  Ti.metadataVocabulary,
  Ti.contentVocabulary
];
ja.default = Ry;
var io = {}, as = {};
Object.defineProperty(as, "__esModule", { value: !0 });
as.DiscrError = void 0;
var Ii;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Ii || (as.DiscrError = Ii = {}));
Object.defineProperty(io, "__esModule", { value: !0 });
const lr = te, Gs = as, ji = Le, Ty = br, Iy = M, jy = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Gs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, lr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, Ay = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: jy,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const u = n.propertyName;
    if (typeof u != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, lr._)`${r}${(0, lr.getProperty)(u)}`);
    t.if((0, lr._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Gs.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = b();
      t.if(!1);
      for (const v in _)
        t.elseIf((0, lr._)`${d} === ${v}`), t.assign(c, h(_[v]));
      t.else(), e.error(!1, { discrError: Gs.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function h(_) {
      const v = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, v);
      return e.mergeEvaluated(g, lr.Name), v;
    }
    function b() {
      var _;
      const v = {}, g = p(s);
      let $ = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, Iy.schemaHasRulesButRef)(I, a.self.RULES)) {
          const B = I.$ref;
          if (I = ji.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), I instanceof ji.SchemaEnv && (I = I.schema), I === void 0)
            throw new Ty.default(a.opts.uriResolver, a.baseId, B);
        }
        const z = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        $ = $ && (g || p(I)), w(z, R);
      }
      if (!$)
        throw new Error(`discriminator: "${u}" must be required`);
      return v;
      function p({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function w(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const z of R.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in v)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        v[R] = I;
      }
    }
  }
};
io.default = Ay;
const ky = "http://json-schema.org/draft-07/schema#", Cy = "http://json-schema.org/draft-07/schema#", Dy = "Core schema meta-schema", My = {
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
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
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
    uniqueItems: !0,
    default: []
  }
}, Ly = [
  "object",
  "boolean"
], Fy = {
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
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
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
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
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
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
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
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
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
        uniqueItems: !0
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
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
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
}, Vy = {
  $schema: ky,
  $id: Cy,
  title: Dy,
  definitions: My,
  type: Ly,
  properties: Fy,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Wc, n = ja, s = io, a = Vy, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(v, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = et;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var l = te;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var h = tn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var b = br;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return b.default;
  } });
})(Ls, Ls.exports);
var Uy = Ls.exports, Hs = { exports: {} }, Jl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(V, H) {
    return { validate: V, compare: H };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, d),
    "date-time": t(h, b),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: g,
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
    regex: ue,
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
    byte: p,
    // signed 32 bit integer
    int32: { type: "number", validate: R },
    // signed 64 bit integer
    int64: { type: "number", validate: I },
    // C-type float
    float: { type: "number", validate: z },
    // C-type double
    double: { type: "number", validate: z },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, b),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(V) {
    return V % 4 === 0 && (V % 100 !== 0 || V % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(V) {
    const H = n.exec(V);
    if (!H)
      return !1;
    const ne = +H[1], Q = +H[2], de = +H[3];
    return Q >= 1 && Q <= 12 && de >= 1 && de <= (Q === 2 && r(ne) ? 29 : s[Q]);
  }
  function i(V, H) {
    if (V && H)
      return V > H ? 1 : V < H ? -1 : 0;
  }
  const u = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(V, H) {
    const ne = u.exec(V);
    if (!ne)
      return !1;
    const Q = +ne[1], de = +ne[2], C = +ne[3], k = ne[5];
    return (Q <= 23 && de <= 59 && C <= 59 || Q === 23 && de === 59 && C === 60) && (!H || k !== "");
  }
  function d(V, H) {
    if (!(V && H))
      return;
    const ne = u.exec(V), Q = u.exec(H);
    if (ne && Q)
      return V = ne[1] + ne[2] + ne[3] + (ne[4] || ""), H = Q[1] + Q[2] + Q[3] + (Q[4] || ""), V > H ? 1 : V < H ? -1 : 0;
  }
  const l = /t|\s/i;
  function h(V) {
    const H = V.split(l);
    return H.length === 2 && a(H[0]) && c(H[1], !0);
  }
  function b(V, H) {
    if (!(V && H))
      return;
    const [ne, Q] = V.split(l), [de, C] = H.split(l), k = i(ne, de);
    if (k !== void 0)
      return k || d(Q, C);
  }
  const _ = /\/|:/, v = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(V) {
    return _.test(V) && v.test(V);
  }
  const $ = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function p(V) {
    return $.lastIndex = 0, $.test(V);
  }
  const w = -2147483648, N = 2 ** 31 - 1;
  function R(V) {
    return Number.isInteger(V) && V <= N && V >= w;
  }
  function I(V) {
    return Number.isInteger(V);
  }
  function z() {
    return !0;
  }
  const B = /[^\\]\\Z/;
  function ue(V) {
    if (B.test(V))
      return !1;
    try {
      return new RegExp(V), !0;
    } catch {
      return !1;
    }
  }
})(Jl);
var Xl = {}, Bs = { exports: {} }, Wl = {}, tt = {}, wr = {}, nn = {}, Z = {}, xr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...w) {
    const N = [p[0]];
    let R = 0;
    for (; R < w.length; )
      u(N, w[R]), N.push(p[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(p, ...w) {
    const N = [_(p[0])];
    let R = 0;
    for (; R < w.length; )
      N.push(a), u(N, w[R]), N.push(a, _(p[++R]));
    return c(N), new n(N);
  }
  e.str = i;
  function u(p, w) {
    w instanceof n ? p.push(...w._items) : w instanceof r ? p.push(w) : p.push(h(w));
  }
  e.addCodeArg = u;
  function c(p) {
    let w = 1;
    for (; w < p.length - 1; ) {
      if (p[w] === a) {
        const N = d(p[w - 1], p[w + 1]);
        if (N !== void 0) {
          p.splice(w - 1, 3, N);
          continue;
        }
        p[w++] = "+";
      }
      w++;
    }
  }
  function d(p, w) {
    if (w === '""')
      return p;
    if (p === '""')
      return w;
    if (typeof p == "string")
      return w instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${p.slice(0, -1)}${w}"` : w[0] === '"' ? p.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(p instanceof r))
      return `"${p}${w.slice(1)}`;
  }
  function l(p, w) {
    return w.emptyStr() ? p : p.emptyStr() ? w : i`${p}${w}`;
  }
  e.strConcat = l;
  function h(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : _(Array.isArray(p) ? p.join(",") : p);
  }
  function b(p) {
    return new n(_(p));
  }
  e.stringify = b;
  function _(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = _;
  function v(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = v;
  function g(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function $(p) {
    return new n(p.toString());
  }
  e.regexpCode = $;
})(xr);
var Js = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = xr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: d, parent: l } = {}) {
      this._names = {}, this._prefixes = d, this._parent = l;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const l = this._names[d] || this._nameGroup(d);
      return `${d}${l.index++}`;
    }
    _nameGroup(d) {
      var l, h;
      if (!((h = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, l) {
      super(l), this.prefix = d;
    }
    setValue(d, { property: l, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(l)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const i = (0, t._)`\n`;
  class u extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, l) {
      var h;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const b = this.toName(d), { prefix: _ } = b, v = (h = l.key) !== null && h !== void 0 ? h : l.ref;
      let g = this._values[_];
      if (g) {
        const w = g.get(v);
        if (w)
          return w;
      } else
        g = this._values[_] = /* @__PURE__ */ new Map();
      g.set(v, b);
      const $ = this._scope[_] || (this._scope[_] = []), p = $.length;
      return $[p] = l.ref, b.setValue(l, { property: _, itemIndex: p }), b;
    }
    getValue(d, l) {
      const h = this._values[d];
      if (h)
        return h.get(l);
    }
    scopeRefs(d, l = this._values) {
      return this._reduceValues(l, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, l, h) {
      return this._reduceValues(d, (b) => {
        if (b.value === void 0)
          throw new Error(`CodeGen: name "${b}" has no value`);
        return b.value.code;
      }, l, h);
    }
    _reduceValues(d, l, h = {}, b) {
      let _ = t.nil;
      for (const v in d) {
        const g = d[v];
        if (!g)
          continue;
        const $ = h[v] = h[v] || /* @__PURE__ */ new Map();
        g.forEach((p) => {
          if ($.has(p))
            return;
          $.set(p, n.Started);
          let w = l(p);
          if (w) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            _ = (0, t._)`${_}${N} ${p} = ${w};${this.opts._n}`;
          } else if (w = b == null ? void 0 : b(p))
            _ = (0, t._)`${_}${w}${this.opts._n}`;
          else
            throw new r(p);
          $.set(p, n.Completed);
        });
      }
      return _;
    }
  }
  e.ValueScope = u;
})(Js);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = xr, r = Js;
  var n = xr;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = Js;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(o, f) {
      return this;
    }
  }
  class i extends a {
    constructor(o, f, P) {
      super(), this.varKind = o, this.name = f, this.rhs = P;
    }
    render({ es5: o, _n: f }) {
      const P = o ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${j};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class u extends a {
    constructor(o, f, P) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = P;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(o, this.rhs);
    }
  }
  class c extends u {
    constructor(o, f, P, j) {
      super(o, P, j), this.op = f;
    }
    render({ _n: o }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + o;
    }
  }
  class d extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `${this.label}:` + o;
    }
  }
  class l extends a {
    constructor(o) {
      super(), this.label = o, this.names = {};
    }
    render({ _n: o }) {
      return `break${this.label ? ` ${this.label}` : ""};` + o;
    }
  }
  class h extends a {
    constructor(o) {
      super(), this.error = o;
    }
    render({ _n: o }) {
      return `throw ${this.error};` + o;
    }
    get names() {
      return this.error.names;
    }
  }
  class b extends a {
    constructor(o) {
      super(), this.code = o;
    }
    render({ _n: o }) {
      return `${this.code};` + o;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(o, f) {
      return this.code = C(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class _ extends a {
    constructor(o = []) {
      super(), this.nodes = o;
    }
    render(o) {
      return this.nodes.reduce((f, P) => f + P.render(o), "");
    }
    optimizeNodes() {
      const { nodes: o } = this;
      let f = o.length;
      for (; f--; ) {
        const P = o[f].optimizeNodes();
        Array.isArray(P) ? o.splice(f, 1, ...P) : P ? o[f] = P : o.splice(f, 1);
      }
      return o.length > 0 ? this : void 0;
    }
    optimizeNames(o, f) {
      const { nodes: P } = this;
      let j = P.length;
      for (; j--; ) {
        const A = P[j];
        A.optimizeNames(o, f) || (k(o, A.names), P.splice(j, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class v extends _ {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends _ {
  }
  class $ extends v {
  }
  $.kind = "else";
  class p extends v {
    constructor(o, f) {
      super(f), this.condition = o;
    }
    render(o) {
      let f = `if(${this.condition})` + super.render(o);
      return this.else && (f += "else " + this.else.render(o)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const o = this.condition;
      if (o === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const P = f.optimizeNodes();
        f = this.else = Array.isArray(P) ? new $(P) : P;
      }
      if (f)
        return o === !1 ? f instanceof p ? f : f.nodes : this.nodes.length ? this : new p(U(o), f instanceof p ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = C(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return de(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  p.kind = "if";
  class w extends v {
  }
  w.kind = "for";
  class N extends w {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = C(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends w {
    constructor(o, f, P, j) {
      super(), this.varKind = o, this.name = f, this.from = P, this.to = j;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: P, from: j, to: A } = this;
      return `for(${f} ${P}=${j}; ${P}<${A}; ${P}++)` + super.render(o);
    }
    get names() {
      const o = de(super.names, this.from);
      return de(o, this.to);
    }
  }
  class I extends w {
    constructor(o, f, P, j) {
      super(), this.loop = o, this.varKind = f, this.name = P, this.iterable = j;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = C(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends v {
    constructor(o, f, P) {
      super(), this.name = o, this.args = f, this.async = P;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  z.kind = "func";
  class B extends _ {
    render(o) {
      return "return " + super.render(o);
    }
  }
  B.kind = "return";
  class ue extends v {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var P, j;
      return super.optimizeNames(o, f), (P = this.catch) === null || P === void 0 || P.optimizeNames(o, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class V extends v {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  V.kind = "catch";
  class H extends v {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(o, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(o) {
      return this._scope.name(o);
    }
    // reserves unique name in the external scope
    scopeName(o) {
      return this._extScope.name(o);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(o, f) {
      const P = this._extScope.value(o, f);
      return (this._values[P.prefix] || (this._values[P.prefix] = /* @__PURE__ */ new Set())).add(P), P;
    }
    getScopeValue(o, f) {
      return this._extScope.getValue(o, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(o) {
      return this._extScope.scopeRefs(o, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(o, f, P, j) {
      const A = this._scope.toName(f);
      return P !== void 0 && j && (this._constants[A.str] = P), this._leafNode(new i(o, A, P)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(o, f, P) {
      return this._def(r.varKinds.const, o, f, P);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(o, f, P) {
      return this._def(r.varKinds.let, o, f, P);
    }
    // `var` declaration with optional assignment
    var(o, f, P) {
      return this._def(r.varKinds.var, o, f, P);
    }
    // assignment code
    assign(o, f, P) {
      return this._leafNode(new u(o, f, P));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new c(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new b(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [P, j] of o)
        f.length > 1 && f.push(","), f.push(P), (P !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(o, f, P) {
      if (this._blockNode(new p(o)), f && P)
        this.code(f).else().code(P).endIf();
      else if (f)
        this.code(f).endIf();
      else if (P)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(o) {
      return this._elseNode(new p(o));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new $());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, $);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, P, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(o);
      return this._for(new R(A, q, f, P), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, P, j = r.varKinds.const) {
      const A = this._scope.toName(o);
      if (this.opts.es5) {
        const q = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${q}.length`, (F) => {
          this.var(A, (0, t._)`${q}[${F}]`), P(A);
        });
      }
      return this._for(new I("of", j, A, f), () => P(A));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, P, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, P);
      const A = this._scope.toName(o);
      return this._for(new I("in", j, A, f), () => P(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new l(o));
    }
    // `return` statement
    return(o) {
      const f = new B();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(B);
    }
    // `try` statement
    try(o, f, P) {
      if (!f && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new ue();
      if (this._blockNode(j), this.code(o), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return P && (this._currNode = j.finally = new H(), this.code(P)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(o) {
      return this._leafNode(new h(o));
    }
    // start self-balancing block
    block(o, f) {
      return this._blockStarts.push(this._nodes.length), o && this.code(o).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(o) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const P = this._nodes.length - f;
      if (P < 0 || o !== void 0 && P !== o)
        throw new Error(`CodeGen: wrong number of nodes: ${P} vs ${o} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(o, f = t.nil, P, j) {
      return this._blockNode(new z(o, f, P)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(o = 1) {
      for (; o-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(o) {
      return this._currNode.nodes.push(o), this;
    }
    _blockNode(o) {
      this._currNode.nodes.push(o), this._nodes.push(o);
    }
    _endBlockNode(o, f) {
      const P = this._currNode;
      if (P instanceof o || f && P instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${o.kind}/${f.kind}` : o.kind}"`);
    }
    _elseNode(o) {
      const f = this._currNode;
      if (!(f instanceof p))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = o, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const o = this._nodes;
      return o[o.length - 1];
    }
    set _currNode(o) {
      const f = this._nodes;
      f[f.length - 1] = o;
    }
  }
  e.CodeGen = ne;
  function Q(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) + (o[f] || 0);
    return y;
  }
  function de(y, o) {
    return o instanceof t._CodeOrName ? Q(y, o.names) : y;
  }
  function C(y, o, f) {
    if (y instanceof t.Name)
      return P(y);
    if (!j(y))
      return y;
    return new t._Code(y._items.reduce((A, q) => (q instanceof t.Name && (q = P(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function P(A) {
      const q = f[A.str];
      return q === void 0 || o[A.str] !== 1 ? A : (delete o[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && o[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k(y, o) {
    for (const f in o)
      y[f] = (y[f] || 0) - (o[f] || 0);
  }
  function U(y) {
    return typeof y == "boolean" || typeof y == "number" || y === null ? !y : (0, t._)`!${S(y)}`;
  }
  e.not = U;
  const D = m(e.operators.AND);
  function O(...y) {
    return y.reduce(D);
  }
  e.and = O;
  const T = m(e.operators.OR);
  function E(...y) {
    return y.reduce(T);
  }
  e.or = E;
  function m(y) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${S(o)} ${y} ${S(f)}`;
  }
  function S(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(Z);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const ce = Z, zy = xr;
function qy(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = qy;
function Ky(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Yl(e, t), !Ql(t, e.self.RULES.all));
}
L.alwaysValidSchema = Ky;
function Yl(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || eu(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = Yl;
function Ql(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = Ql;
function Gy(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = Gy;
function Hy({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
L.schemaRefOrVal = Hy;
function By(e) {
  return Zl(decodeURIComponent(e));
}
L.unescapeFragment = By;
function Jy(e) {
  return encodeURIComponent(co(e));
}
L.escapeFragment = Jy;
function co(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = co;
function Zl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = Zl;
function Xy(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = Xy;
function Ai({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ce.Name ? (a instanceof ce.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ce.Name ? (t(s, i, a), a) : r(a, i);
    return u === ce.Name && !(c instanceof ce.Name) ? n(s, c) : c;
  };
}
L.mergeEvaluated = {
  props: Ai({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ce._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ce._)`${r} || {}`).code((0, ce._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ce._)`${r} || {}`), lo(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: xl
  }),
  items: Ai({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function xl(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && lo(e, r, t), r;
}
L.evaluatedPropsToName = xl;
function lo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
L.setEvaluated = lo;
const ki = {};
function Wy(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: ki[t.code] || (ki[t.code] = new zy._Code(t.code))
  });
}
L.useFunc = Wy;
var Xs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Xs || (L.Type = Xs = {}));
function Yy(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === Xs.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + co(e);
}
L.getErrorPath = Yy;
function eu(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = eu;
var ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
const Oe = Z, Qy = {
  // validation function arguments
  data: new Oe.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Oe.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Oe.Name("instancePath"),
  parentData: new Oe.Name("parentData"),
  parentDataProperty: new Oe.Name("parentDataProperty"),
  rootData: new Oe.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Oe.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Oe.Name("vErrors"),
  // null or array of validation errors
  errors: new Oe.Name("errors"),
  // counter of validation errors
  this: new Oe.Name("this"),
  // "globals"
  self: new Oe.Name("self"),
  scope: new Oe.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Oe.Name("json"),
  jsonPos: new Oe.Name("jsonPos"),
  jsonLen: new Oe.Name("jsonLen"),
  jsonPart: new Oe.Name("jsonPart")
};
ft.default = Qy;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Z, r = L, n = ft;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: p }) => p ? (0, t.str)`"${$}" keyword must be ${p} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, p = e.keywordError, w, N) {
    const { it: R } = $, { gen: I, compositeRule: z, allErrors: B } = R, ue = h($, p, w);
    N ?? (z || B) ? c(I, ue) : d(R, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, p = e.keywordError, w) {
    const { it: N } = $, { gen: R, compositeRule: I, allErrors: z } = N, B = h($, p, w);
    c(R, B), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i($, p) {
    $.assign(n.default.errors, p), $.if((0, t._)`${n.default.vErrors} !== null`, () => $.if(p, () => $.assign((0, t._)`${n.default.vErrors}.length`, p), () => $.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: $, keyword: p, schemaValue: w, data: N, errsCount: R, it: I }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const z = $.name("err");
    $.forRange("i", R, n.default.errors, (B) => {
      $.const(z, (0, t._)`${n.default.vErrors}[${B}]`), $.if((0, t._)`${z}.instancePath === undefined`, () => $.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), $.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && ($.assign((0, t._)`${z}.schema`, w), $.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c($, p) {
    const w = $.const("err", p);
    $.if((0, t._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), $.code((0, t._)`${n.default.errors}++`);
  }
  function d($, p) {
    const { gen: w, validateName: N, schemaEnv: R } = $;
    R.$async ? w.throw((0, t._)`new ${$.ValidationError}(${p})`) : (w.assign((0, t._)`${N}.errors`, p), w.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function h($, p, w) {
    const { createErrors: N } = $.it;
    return N === !1 ? (0, t._)`{}` : b($, p, w);
  }
  function b($, p, w = {}) {
    const { gen: N, it: R } = $, I = [
      _(R, w),
      v($, w)
    ];
    return g($, p, I), N.object(...I);
  }
  function _({ errorPath: $ }, { instancePath: p }) {
    const w = p ? (0, t.str)`${$}${(0, r.getErrorPath)(p, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function v({ keyword: $, it: { errSchemaPath: p } }, { schemaPath: w, parentSchema: N }) {
    let R = N ? p : (0, t.str)`${p}/${$}`;
    return w && (R = (0, t.str)`${R}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g($, { params: p, message: w }, N) {
    const { keyword: R, data: I, schemaValue: z, it: B } = $, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = B;
    N.push([l.keyword, R], [l.params, typeof p == "function" ? p($) : p || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof w == "function" ? w($) : w]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([l.propertyName, V]);
  }
})(nn);
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.boolOrEmptySchema = wr.topBoolOrEmptySchema = void 0;
const Zy = nn, xy = Z, e$ = ft, t$ = {
  message: "boolean schema is false"
};
function r$(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? tu(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(e$.default.data) : (t.assign((0, xy._)`${n}.errors`, null), t.return(!0));
}
wr.topBoolOrEmptySchema = r$;
function n$(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), tu(e)) : r.var(t, !0);
}
wr.boolOrEmptySchema = n$;
function tu(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, Zy.reportError)(s, t$, void 0, t);
}
var _e = {}, rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.getRules = rr.isJSONType = void 0;
const s$ = ["string", "number", "integer", "boolean", "null", "object", "array"], a$ = new Set(s$);
function o$(e) {
  return typeof e == "string" && a$.has(e);
}
rr.isJSONType = o$;
function i$() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
rr.getRules = i$;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.shouldUseRule = mt.shouldUseGroup = mt.schemaHasRulesForType = void 0;
function c$({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && ru(e, n);
}
mt.schemaHasRulesForType = c$;
function ru(e, t) {
  return t.rules.some((r) => nu(e, r));
}
mt.shouldUseGroup = ru;
function nu(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
mt.shouldUseRule = nu;
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.reportTypeError = _e.checkDataTypes = _e.checkDataType = _e.coerceAndCheckDataType = _e.getJSONTypes = _e.getSchemaTypes = _e.DataType = void 0;
const l$ = rr, u$ = mt, d$ = nn, Y = Z, su = L;
var mr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(mr || (_e.DataType = mr = {}));
function f$(e) {
  const t = au(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
_e.getSchemaTypes = f$;
function au(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(l$.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
_e.getJSONTypes = au;
function h$(e, t) {
  const { gen: r, data: n, opts: s } = e, a = p$(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, u$.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = uo(t, n, s.strictNumbers, mr.Wrong);
    r.if(u, () => {
      a.length ? m$(e, t, a) : fo(e);
    });
  }
  return i;
}
_e.coerceAndCheckDataType = h$;
const ou = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function p$(e, t) {
  return t ? e.filter((r) => ou.has(r) || t === "array" && r === "array") : [];
}
function m$(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, Y._)`typeof ${s}`), u = n.let("coerced", (0, Y._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Y._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(i, (0, Y._)`typeof ${s}`).if(uo(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, Y._)`${u} !== undefined`);
  for (const d of r)
    (ou.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), fo(e), n.endIf(), n.if((0, Y._)`${u} !== undefined`, () => {
    n.assign(s, u), y$(e, u);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, Y._)`${i} == "number" || ${i} == "boolean"`).assign(u, (0, Y._)`"" + ${s}`).elseIf((0, Y._)`${s} === null`).assign(u, (0, Y._)`""`);
        return;
      case "number":
        n.elseIf((0, Y._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(u, (0, Y._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, Y._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(u, (0, Y._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, Y._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(u, !1).elseIf((0, Y._)`${s} === "true" || ${s} === 1`).assign(u, !0);
        return;
      case "null":
        n.elseIf((0, Y._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(u, null);
        return;
      case "array":
        n.elseIf((0, Y._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(u, (0, Y._)`[${s}]`);
    }
  }
}
function y$({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function Ws(e, t, r, n = mr.Correct) {
  const s = n === mr.Correct ? Y.operators.EQ : Y.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, Y._)`${t} ${s} null`;
    case "array":
      a = (0, Y._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, Y._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, Y._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, Y._)`typeof ${t} ${s} ${e}`;
  }
  return n === mr.Correct ? a : (0, Y.not)(a);
  function i(u = Y.nil) {
    return (0, Y.and)((0, Y._)`typeof ${t} == "number"`, u, r ? (0, Y._)`isFinite(${t})` : Y.nil);
  }
}
_e.checkDataType = Ws;
function uo(e, t, r, n) {
  if (e.length === 1)
    return Ws(e[0], t, r, n);
  let s;
  const a = (0, su.toHash)(e);
  if (a.array && a.object) {
    const i = (0, Y._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, Y._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = Y.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, Y.and)(s, Ws(i, t, r, n));
  return s;
}
_e.checkDataTypes = uo;
const $$ = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function fo(e) {
  const t = _$(e);
  (0, d$.reportError)(t, $$);
}
_e.reportTypeError = fo;
function _$(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, su.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var os = {};
Object.defineProperty(os, "__esModule", { value: !0 });
os.assignDefaults = void 0;
const ir = Z, g$ = L;
function v$(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Ci(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Ci(e, a, s.default));
}
os.assignDefaults = v$;
function Ci(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, ir._)`${a}${(0, ir.getProperty)(t)}`;
  if (s) {
    (0, g$.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, ir._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, ir._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, ir._)`${u} = ${(0, ir.stringify)(r)}`);
}
var ut = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const he = Z, ho = L, vt = ft, E$ = L;
function w$(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(mo(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = w$;
function S$({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)(mo(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
ee.checkMissingProp = S$;
function b$(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = b$;
function iu(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = iu;
function po(e, t, r) {
  return (0, he._)`${iu(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = po;
function P$(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${po(e, t, r)}` : s;
}
ee.propertyInData = P$;
function mo(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(po(e, t, r))) : s;
}
ee.noPropertyInData = mo;
function cu(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = cu;
function N$(e, t) {
  return cu(t).filter((r) => !(0, ho.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = N$;
function O$({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, he._)`${e}, ${t}, ${n}${s}` : t, h = [
    [vt.default.instancePath, (0, he.strConcat)(vt.default.instancePath, a)],
    [vt.default.parentData, i.parentData],
    [vt.default.parentDataProperty, i.parentDataProperty],
    [vt.default.rootData, vt.default.rootData]
  ];
  i.opts.dynamicRef && h.push([vt.default.dynamicAnchors, vt.default.dynamicAnchors]);
  const b = (0, he._)`${l}, ${r.object(...h)}`;
  return c !== he.nil ? (0, he._)`${u}.call(${c}, ${b})` : (0, he._)`${u}(${b})`;
}
ee.callValidateCode = O$;
const R$ = (0, he._)`new RegExp`;
function T$({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? R$ : (0, E$.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = T$;
function I$(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const u = t.let("valid", !0);
    return i(() => t.assign(u, !1)), u;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(u) {
    const c = t.const("len", (0, he._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: ho.Type.Num
      }, a), t.if((0, he.not)(a), u);
    });
  }
}
ee.validateArray = I$;
function j$(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ho.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), u = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, u);
    t.assign(i, (0, he._)`${i} || ${u}`), e.mergeValidEvaluated(l, u) || t.if((0, he.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
ee.validateUnion = j$;
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.validateKeywordUsage = ut.validSchemaType = ut.funcKeywordCode = ut.macroKeywordCode = void 0;
const je = Z, Qt = ft, A$ = ee, k$ = nn;
function C$(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = lu(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: je.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
ut.macroKeywordCode = C$;
function D$(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  L$(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = lu(n, s, d), h = n.let("valid");
  e.block$data(h, b), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function b() {
    if (t.errors === !1)
      g(), t.modifying && Di(e), $(() => e.error());
    else {
      const p = t.async ? _() : v();
      t.modifying && Di(e), $(() => M$(e, p));
    }
  }
  function _() {
    const p = n.let("ruleErrs", null);
    return n.try(() => g((0, je._)`await `), (w) => n.assign(h, !1).if((0, je._)`${w} instanceof ${c.ValidationError}`, () => n.assign(p, (0, je._)`${w}.errors`), () => n.throw(w))), p;
  }
  function v() {
    const p = (0, je._)`${l}.errors`;
    return n.assign(p, null), g(je.nil), p;
  }
  function g(p = t.async ? (0, je._)`await ` : je.nil) {
    const w = c.opts.passContext ? Qt.default.this : Qt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(h, (0, je._)`${p}${(0, A$.callValidateCode)(e, l, w, N)}`, t.modifying);
  }
  function $(p) {
    var w;
    n.if((0, je.not)((w = t.valid) !== null && w !== void 0 ? w : h), p);
  }
}
ut.funcKeywordCode = D$;
function Di(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, je._)`${n.parentData}[${n.parentDataProperty}]`));
}
function M$(e, t) {
  const { gen: r } = e;
  r.if((0, je._)`Array.isArray(${t})`, () => {
    r.assign(Qt.default.vErrors, (0, je._)`${Qt.default.vErrors} === null ? ${t} : ${Qt.default.vErrors}.concat(${t})`).assign(Qt.default.errors, (0, je._)`${Qt.default.vErrors}.length`), (0, k$.extendErrors)(e);
  }, () => e.error());
}
function L$({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function lu(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, je.stringify)(r) });
}
function F$(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
ut.validSchemaType = F$;
function V$({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((u) => !Object.prototype.hasOwnProperty.call(e, u)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
ut.validateKeywordUsage = V$;
var Tt = {};
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.extendSubschemaMode = Tt.extendSubschemaData = Tt.getSubschema = void 0;
const ot = Z, uu = L;
function U$(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const u = e.schema[t];
    return r === void 0 ? {
      schema: u,
      schemaPath: (0, ot._)`${e.schemaPath}${(0, ot.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: u[r],
      schemaPath: (0, ot._)`${e.schemaPath}${(0, ot.getProperty)(t)}${(0, ot.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, uu.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: i,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
Tt.getSubschema = U$;
function z$(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: h } = t, b = u.let("data", (0, ot._)`${t.data}${(0, ot.getProperty)(r)}`, !0);
    c(b), e.errorPath = (0, ot.str)`${d}${(0, uu.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, ot._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof ot.Name ? s : u.let("data", s, !0);
    c(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Tt.extendSubschemaData = z$;
function q$(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Tt.extendSubschemaMode = q$;
var Pe = {}, du = { exports: {} }, Ot = du.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  kn(t, n, s, e, "", e);
};
Ot.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Ot.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Ot.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Ot.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function kn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var h = n[l];
      if (Array.isArray(h)) {
        if (l in Ot.arrayKeywords)
          for (var b = 0; b < h.length; b++)
            kn(e, t, r, h[b], s + "/" + l + "/" + b, a, s, l, n, b);
      } else if (l in Ot.propsKeywords) {
        if (h && typeof h == "object")
          for (var _ in h)
            kn(e, t, r, h[_], s + "/" + l + "/" + K$(_), a, s, l, n, _);
      } else (l in Ot.keywords || e.allKeys && !(l in Ot.skipKeywords)) && kn(e, t, r, h, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function K$(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var G$ = du.exports;
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.getSchemaRefs = Pe.resolveUrl = Pe.normalizeId = Pe._getFullPath = Pe.getFullPath = Pe.inlineRef = void 0;
const H$ = L, B$ = es, J$ = G$, X$ = /* @__PURE__ */ new Set([
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
function W$(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Ys(e) : t ? fu(e) <= t : !1;
}
Pe.inlineRef = W$;
const Y$ = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Ys(e) {
  for (const t in e) {
    if (Y$.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Ys) || typeof r == "object" && Ys(r))
      return !0;
  }
  return !1;
}
function fu(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !X$.has(r) && (typeof e[r] == "object" && (0, H$.eachItem)(e[r], (n) => t += fu(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function hu(e, t = "", r) {
  r !== !1 && (t = yr(t));
  const n = e.parse(t);
  return pu(e, n);
}
Pe.getFullPath = hu;
function pu(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Pe._getFullPath = pu;
const Q$ = /#\/?$/;
function yr(e) {
  return e ? e.replace(Q$, "") : "";
}
Pe.normalizeId = yr;
function Z$(e, t, r) {
  return r = yr(r), e.resolve(t, r);
}
Pe.resolveUrl = Z$;
const x$ = /^[a-z_][-a-z0-9._]*$/i;
function e_(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = yr(e[r] || t), a = { "": s }, i = hu(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return J$(e, { allKeys: !0 }, (h, b, _, v) => {
    if (v === void 0)
      return;
    const g = i + b;
    let $ = a[v];
    typeof h[r] == "string" && ($ = p.call(this, h[r])), w.call(this, h.$anchor), w.call(this, h.$dynamicAnchor), a[b] = $;
    function p(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = yr($ ? R($, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(h, I.schema, N) : N !== yr(g) && (N[0] === "#" ? (d(h, u[N], N), u[N] = h) : this.refs[N] = g), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!x$.test(N))
          throw new Error(`invalid anchor "${N}"`);
        p.call(this, `#${N}`);
      }
    }
  }), u;
  function d(h, b, _) {
    if (b !== void 0 && !B$(h, b))
      throw l(_);
  }
  function l(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Pe.getSchemaRefs = e_;
Object.defineProperty(tt, "__esModule", { value: !0 });
tt.getData = tt.KeywordCxt = tt.validateFunctionCode = void 0;
const mu = wr, Mi = _e, yo = mt, Bn = _e, t_ = os, Jr = ut, bs = Tt, G = Z, X = ft, r_ = Pe, yt = L, Dr = nn;
function n_(e) {
  if (_u(e) && (gu(e), $u(e))) {
    o_(e);
    return;
  }
  yu(e, () => (0, mu.topBoolOrEmptySchema)(e));
}
tt.validateFunctionCode = n_;
function yu({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${X.default.data}, ${X.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${Li(r, s)}`), a_(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${X.default.data}, ${s_(s)}`, n.$async, () => e.code(Li(r, s)).code(a));
}
function s_(e) {
  return (0, G._)`{${X.default.instancePath}="", ${X.default.parentData}, ${X.default.parentDataProperty}, ${X.default.rootData}=${X.default.data}${e.dynamicRef ? (0, G._)`, ${X.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function a_(e, t) {
  e.if(X.default.valCxt, () => {
    e.var(X.default.instancePath, (0, G._)`${X.default.valCxt}.${X.default.instancePath}`), e.var(X.default.parentData, (0, G._)`${X.default.valCxt}.${X.default.parentData}`), e.var(X.default.parentDataProperty, (0, G._)`${X.default.valCxt}.${X.default.parentDataProperty}`), e.var(X.default.rootData, (0, G._)`${X.default.valCxt}.${X.default.rootData}`), t.dynamicRef && e.var(X.default.dynamicAnchors, (0, G._)`${X.default.valCxt}.${X.default.dynamicAnchors}`);
  }, () => {
    e.var(X.default.instancePath, (0, G._)`""`), e.var(X.default.parentData, (0, G._)`undefined`), e.var(X.default.parentDataProperty, (0, G._)`undefined`), e.var(X.default.rootData, X.default.data), t.dynamicRef && e.var(X.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function o_(e) {
  const { schema: t, opts: r, gen: n } = e;
  yu(e, () => {
    r.$comment && t.$comment && Eu(e), d_(e), n.let(X.default.vErrors, null), n.let(X.default.errors, 0), r.unevaluated && i_(e), vu(e), p_(e);
  });
}
function i_(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function Li(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function c_(e, t) {
  if (_u(e) && (gu(e), $u(e))) {
    l_(e, t);
    return;
  }
  (0, mu.boolOrEmptySchema)(e, t);
}
function $u({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function _u(e) {
  return typeof e.schema != "boolean";
}
function l_(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Eu(e), f_(e), h_(e);
  const a = n.const("_errs", X.default.errors);
  vu(e, a), n.var(t, (0, G._)`${a} === ${X.default.errors}`);
}
function gu(e) {
  (0, yt.checkUnknownRules)(e), u_(e);
}
function vu(e, t) {
  if (e.opts.jtd)
    return Fi(e, [], !1, t);
  const r = (0, Mi.getSchemaTypes)(e.schema), n = (0, Mi.coerceAndCheckDataType)(e, r);
  Fi(e, r, !n, t);
}
function u_(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, yt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function d_(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, yt.checkStrictMode)(e, "default is ignored in the schema root");
}
function f_(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, r_.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function h_(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Eu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${X.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, G.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${X.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function p_(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${X.default.errors} === 0`, () => t.return(X.default.data), () => t.throw((0, G._)`new ${s}(${X.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, X.default.vErrors), a.unevaluated && m_(e), t.return((0, G._)`${X.default.errors} === 0`));
}
function m_({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function Fi(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, yt.schemaHasRulesButRef)(a, l))) {
    s.block(() => bu(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || y_(e, t), s.block(() => {
    for (const b of l.rules)
      h(b);
    h(l.post);
  });
  function h(b) {
    (0, yo.shouldUseGroup)(a, b) && (b.type ? (s.if((0, Bn.checkDataType)(b.type, i, c.strictNumbers)), Vi(e, b), t.length === 1 && t[0] === b.type && r && (s.else(), (0, Bn.reportTypeError)(e)), s.endIf()) : Vi(e, b), u || s.if((0, G._)`${X.default.errors} === ${n || 0}`));
  }
}
function Vi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, t_.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, yo.shouldUseRule)(n, a) && bu(e, a.keyword, a.definition, t.type);
  });
}
function y_(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || ($_(e, t), e.opts.allowUnionTypes || __(e, t), g_(e, e.dataTypes));
}
function $_(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      wu(e.dataTypes, r) || $o(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), E_(e, t);
  }
}
function __(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && $o(e, "use allowUnionTypes to allow union type keyword");
}
function g_(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, yo.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => v_(t, i)) && $o(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function v_(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function wu(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function E_(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    wu(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function $o(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, yt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class Su {
  constructor(t, r, n) {
    if ((0, Jr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, yt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Pu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Jr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", X.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, G.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, G.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, G._)`${r} !== undefined && (${(0, G.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Dr.reportExtraError : Dr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Dr.reportError)(this, this.def.$dataError || Dr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Dr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = G.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = G.nil, r = G.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, G.or)((0, G._)`${s} === undefined`, r)), t !== G.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== G.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, G.or)(i(), u());
    function i() {
      if (n.length) {
        if (!(r instanceof G.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, G._)`${(0, Bn.checkDataTypes)(c, r, a.opts.strictNumbers, Bn.DataType.Wrong)}`;
      }
      return G.nil;
    }
    function u() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, G._)`!${c}(${r})`;
      }
      return G.nil;
    }
  }
  subschema(t, r) {
    const n = (0, bs.getSubschema)(this.it, t);
    (0, bs.extendSubschemaData)(n, this.it, t), (0, bs.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return c_(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = yt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = yt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, G.Name)), !0;
  }
}
tt.KeywordCxt = Su;
function bu(e, t, r, n) {
  const s = new Su(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Jr.funcKeywordCode)(s, r) : "macro" in r ? (0, Jr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Jr.funcKeywordCode)(s, r);
}
const w_ = /^\/(?:[^~]|~0|~1)*$/, S_ = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Pu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return X.default.rootData;
  if (e[0] === "/") {
    if (!w_.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = X.default.rootData;
  } else {
    const d = S_.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +d[1];
    if (s = d[2], s === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (a = r[t - l], !s)
      return a;
  }
  let i = a;
  const u = s.split("/");
  for (const d of u)
    d && (a = (0, G._)`${a}${(0, G.getProperty)((0, yt.unescapeJsonPointer)(d))}`, i = (0, G._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
tt.getData = Pu;
var sn = {};
Object.defineProperty(sn, "__esModule", { value: !0 });
class b_ extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
sn.default = b_;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
const Ps = Pe;
class P_ extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Ps.resolveUrl)(t, r, n), this.missingSchema = (0, Ps.normalizeId)((0, Ps.getFullPath)(t, this.missingRef));
  }
}
Or.default = P_;
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.resolveSchema = Fe.getCompilingSchema = Fe.resolveRef = Fe.compileSchema = Fe.SchemaEnv = void 0;
const Xe = Z, N_ = sn, Bt = ft, xe = Pe, Ui = L, O_ = tt;
class is {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, xe.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Fe.SchemaEnv = is;
function _o(e) {
  const t = Nu.call(this, e);
  if (t)
    return t;
  const r = (0, xe.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Xe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: N_.default,
    code: (0, Xe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Bt.default.data,
    parentData: Bt.default.parentData,
    parentDataProperty: Bt.default.parentDataProperty,
    dataNames: [Bt.default.data],
    dataPathArr: [Xe.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Xe.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: u,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Xe.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Xe._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, O_.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    l = `${i.scopeRefs(Bt.default.scope)}return ${h}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const _ = new Function(`${Bt.default.self}`, `${Bt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: _ }), _.errors = null, _.schema = e.schema, _.schemaEnv = e, e.$async && (_.$async = !0), this.opts.code.source === !0 && (_.source = { validateName: c, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: v, items: g } = d;
      _.evaluated = {
        props: v instanceof Xe.Name ? void 0 : v,
        items: g instanceof Xe.Name ? void 0 : g,
        dynamicProps: v instanceof Xe.Name,
        dynamicItems: g instanceof Xe.Name
      }, _.source && (_.source.evaluated = (0, Xe.stringify)(_.evaluated));
    }
    return e.validate = _, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), h;
  } finally {
    this._compilations.delete(e);
  }
}
Fe.compileSchema = _o;
function R_(e, t, r) {
  var n;
  r = (0, xe.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = j_.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new is({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = T_.call(this, a);
}
Fe.resolveRef = R_;
function T_(e) {
  return (0, xe.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : _o.call(this, e);
}
function Nu(e) {
  for (const t of this._compilations)
    if (I_(t, e))
      return t;
}
Fe.getCompilingSchema = Nu;
function I_(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function j_(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || cs.call(this, e, t);
}
function cs(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, xe._getFullPath)(this.opts.uriResolver, r);
  let s = (0, xe.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Ns.call(this, r, e);
  const a = (0, xe.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = cs.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : Ns.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || _o.call(this, i), a === (0, xe.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, xe.resolveUrl)(this.opts.uriResolver, s, d)), new is({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return Ns.call(this, r, i);
  }
}
Fe.resolveSchema = cs;
const A_ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Ns(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Ui.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !A_.has(u) && d && (t = (0, xe.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Ui.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, xe.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = cs.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new is({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const k_ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", C_ = "Meta-schema for $data reference (JSON AnySchema extension proposal)", D_ = "object", M_ = [
  "$data"
], L_ = {
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
}, F_ = !1, V_ = {
  $id: k_,
  description: C_,
  type: D_,
  required: M_,
  properties: L_,
  additionalProperties: F_
};
var go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
const Ou = Ll;
Ou.code = 'require("ajv/dist/runtime/uri").default';
go.default = Ou;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = tt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = Z;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = sn, s = Or, a = rr, i = Fe, u = Z, c = Pe, d = _e, l = L, h = V_, b = go, _ = (E, m) => new RegExp(E, m);
  _.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  ]), $ = {
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
  }, p = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function N(E) {
    var m, S, y, o, f, P, j, A, q, F, re, Ue, It, jt, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut, zt, qt;
    const Be = E.strict, Kt = (m = E.code) === null || m === void 0 ? void 0 : m.optimize, jr = Kt === !0 || Kt === void 0 ? 1 : Kt || 0, Ar = (y = (S = E.code) === null || S === void 0 ? void 0 : S.regExp) !== null && y !== void 0 ? y : _, _s = (o = E.uriResolver) !== null && o !== void 0 ? o : b.default;
    return {
      strictSchema: (P = (f = E.strictSchema) !== null && f !== void 0 ? f : Be) !== null && P !== void 0 ? P : !0,
      strictNumbers: (A = (j = E.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = E.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (Ue = (re = E.strictTuples) !== null && re !== void 0 ? re : Be) !== null && Ue !== void 0 ? Ue : "log",
      strictRequired: (jt = (It = E.strictRequired) !== null && It !== void 0 ? It : Be) !== null && jt !== void 0 ? jt : !1,
      code: E.code ? { ...E.code, optimize: jr, regExp: Ar } : { optimize: jr, regExp: Ar },
      loopRequired: (At = E.loopRequired) !== null && At !== void 0 ? At : w,
      loopEnum: (kt = E.loopEnum) !== null && kt !== void 0 ? kt : w,
      meta: (Ct = E.meta) !== null && Ct !== void 0 ? Ct : !0,
      messages: (Dt = E.messages) !== null && Dt !== void 0 ? Dt : !0,
      inlineRefs: (Mt = E.inlineRefs) !== null && Mt !== void 0 ? Mt : !0,
      schemaId: (Lt = E.schemaId) !== null && Lt !== void 0 ? Lt : "$id",
      addUsedSchema: (Ft = E.addUsedSchema) !== null && Ft !== void 0 ? Ft : !0,
      validateSchema: (Vt = E.validateSchema) !== null && Vt !== void 0 ? Vt : !0,
      validateFormats: (Ut = E.validateFormats) !== null && Ut !== void 0 ? Ut : !0,
      unicodeRegExp: (zt = E.unicodeRegExp) !== null && zt !== void 0 ? zt : !0,
      int32range: (qt = E.int32range) !== null && qt !== void 0 ? qt : !0,
      uriResolver: _s
    };
  }
  class R {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...N(m) };
      const { es5: S, lines: y } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: g, es5: S, lines: y }), this.logger = Q(m.logger);
      const o = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, m, "NOT SUPPORTED"), I.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = H.call(this), m.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && V.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), B.call(this), m.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: S, schemaId: y } = this.opts;
      let o = h;
      y === "id" && (o = { ...h }, o.id = o.$id, delete o.$id), S && m && this.addMetaSchema(o, o[y], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[S] || m : void 0;
    }
    validate(m, S) {
      let y;
      if (typeof m == "string") {
        if (y = this.getSchema(m), !y)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        y = this.compile(m);
      const o = y(S);
      return "$async" in y || (this.errors = y.errors), o;
    }
    compile(m, S) {
      const y = this._addSchema(m, S);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(m, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return o.call(this, m, S);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const Ue = this._addSchema(F, re);
        return Ue.validate || P.call(this, Ue);
      }
      async function f(F) {
        F && !this.getSchema(F) && await o.call(this, { $ref: F }, !0);
      }
      async function P(F) {
        try {
          return this._compileSchemaEnv(F);
        } catch (re) {
          if (!(re instanceof s.default))
            throw re;
          return j.call(this, re), await A.call(this, re.missingSchema), P.call(this, F);
        }
      }
      function j({ missingSchema: F, missingRef: re }) {
        if (this.refs[F])
          throw new Error(`AnySchema ${F} is loaded but ${re} cannot be resolved`);
      }
      async function A(F) {
        const re = await q.call(this, F);
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, S);
      }
      async function q(F) {
        const re = this._loading[F];
        if (re)
          return re;
        try {
          return await (this._loading[F] = y(F));
        } finally {
          delete this._loading[F];
        }
      }
    }
    // Adds schema to the instance
    addSchema(m, S, y, o = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const P of m)
          this.addSchema(P, void 0, y, o);
        return this;
      }
      let f;
      if (typeof m == "object") {
        const { schemaId: P } = this.opts;
        if (f = m[P], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(m, y, S, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, S, y = this.opts.validateSchema) {
      return this.addSchema(m, S, !0, y), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, S) {
      if (typeof m == "boolean")
        return !0;
      let y;
      if (y = m.$schema, y !== void 0 && typeof y != "string")
        throw new Error("$schema must be a string");
      if (y = y || this.opts.defaultMeta || this.defaultMeta(), !y)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate(y, m);
      if (!o && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return o;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(m) {
      let S;
      for (; typeof (S = z.call(this, m)) == "string"; )
        m = S;
      if (S === void 0) {
        const { schemaId: y } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: y });
        if (S = i.resolveSchema.call(this, o, m), !S)
          return;
        this.refs[m] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(m) {
      if (m instanceof RegExp)
        return this._removeAllSchemas(this.schemas, m), this._removeAllSchemas(this.refs, m), this;
      switch (typeof m) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = z.call(this, m);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[m], delete this.refs[m], this;
        }
        case "object": {
          const S = m;
          this._cache.delete(S);
          let y = m[this.opts.schemaId];
          return y && (y = (0, c.normalizeId)(y), delete this.schemas[y], delete this.refs[y]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(m) {
      for (const S of m)
        this.addKeyword(S);
      return this;
    }
    addKeyword(m, S) {
      let y;
      if (typeof m == "string")
        y = m, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = y);
      else if (typeof m == "object" && S === void 0) {
        if (S = m, y = S.keyword, Array.isArray(y) && !y.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, y, S), !S)
        return (0, l.eachItem)(y, (f) => k.call(this, f)), this;
      D.call(this, S);
      const o = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)(y, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((P) => k.call(this, f, o, P))), this;
    }
    getKeyword(m) {
      const S = this.RULES.all[m];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: S } = this;
      delete S.keywords[m], delete S.all[m];
      for (const y of S.rules) {
        const o = y.rules.findIndex((f) => f.keyword === m);
        o >= 0 && y.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[m] = S, this;
    }
    errorsText(m = this.errors, { separator: S = ", ", dataVar: y = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((o) => `${y}${o.instancePath} ${o.message}`).reduce((o, f) => o + S + f);
    }
    $dataMetaSchema(m, S) {
      const y = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const o of S) {
        const f = o.split("/").slice(1);
        let P = m;
        for (const j of f)
          P = P[j];
        for (const j in y) {
          const A = y[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = P[j];
          q && F && (P[j] = T(F));
        }
      }
      return m;
    }
    _removeAllSchemas(m, S) {
      for (const y in m) {
        const o = m[y];
        (!S || S.test(y)) && (typeof o == "string" ? delete m[y] : o && !o.meta && (this._cache.delete(o.schema), delete m[y]));
      }
    }
    _addSchema(m, S, y, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let P;
      const { schemaId: j } = this.opts;
      if (typeof m == "object")
        P = m[j];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof m != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let A = this._cache.get(m);
      if (A !== void 0)
        return A;
      y = (0, c.normalizeId)(P || y);
      const q = c.getSchemaRefs.call(this, m, y);
      return A = new i.SchemaEnv({ schema: m, schemaId: j, meta: S, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), o && this.validateSchema(m, !0), A;
    }
    _checkUnique(m) {
      if (this.schemas[m] || this.refs[m])
        throw new Error(`schema with key or id "${m}" already exists`);
    }
    _compileSchemaEnv(m) {
      if (m.meta ? this._compileMetaSchema(m) : i.compileSchema.call(this, m), !m.validate)
        throw new Error("ajv implementation error");
      return m.validate;
    }
    _compileMetaSchema(m) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, m);
      } finally {
        this.opts = S;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function I(E, m, S, y = "error") {
    for (const o in E) {
      const f = o;
      f in m && this.logger[y](`${S}: option ${o}. ${E[f]}`);
    }
  }
  function z(E) {
    return E = (0, c.normalizeId)(E), this.schemas[E] || this.refs[E];
  }
  function B() {
    const E = this.opts.schemas;
    if (E)
      if (Array.isArray(E))
        this.addSchema(E);
      else
        for (const m in E)
          this.addSchema(E[m], m);
  }
  function ue() {
    for (const E in this.opts.formats) {
      const m = this.opts.formats[E];
      m && this.addFormat(E, m);
    }
  }
  function V(E) {
    if (Array.isArray(E)) {
      this.addVocabulary(E);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in E) {
      const S = E[m];
      S.keyword || (S.keyword = m), this.addKeyword(S);
    }
  }
  function H() {
    const E = { ...this.opts };
    for (const m of v)
      delete E[m];
    return E;
  }
  const ne = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(E) {
    if (E === !1)
      return ne;
    if (E === void 0)
      return console;
    if (E.log && E.warn && E.error)
      return E;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(E, m) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(E, (y) => {
      if (S.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(E, m, S) {
    var y;
    const o = m == null ? void 0 : m.post;
    if (S && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let P = o ? f.post : f.rules.find(({ type: A }) => A === S);
    if (P || (P = { type: S, rules: [] }, f.rules.push(P)), f.keywords[E] = !0, !m)
      return;
    const j = {
      keyword: E,
      definition: {
        ...m,
        type: (0, d.getJSONTypes)(m.type),
        schemaType: (0, d.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? U.call(this, P, j, m.before) : P.rules.push(j), f.all[E] = j, (y = m.implements) === null || y === void 0 || y.forEach((A) => this.addKeyword(A));
  }
  function U(E, m, S) {
    const y = E.rules.findIndex((o) => o.keyword === S);
    y >= 0 ? E.rules.splice(y, 0, m) : (E.rules.push(m), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(E) {
    let { metaSchema: m } = E;
    m !== void 0 && (E.$data && this.opts.$data && (m = T(m)), E.validateSchema = this.compile(m, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function T(E) {
    return { anyOf: [E, O] };
  }
})(Wl);
var vo = {}, Eo = {}, wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
const U_ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
wo.default = U_;
var nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.callRef = nr.getValidate = void 0;
const z_ = Or, zi = ee, Me = Z, cr = ft, qi = Fe, $n = L, q_ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const l = qi.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new z_.default(n.opts.uriResolver, s, r);
    if (l instanceof qi.SchemaEnv)
      return b(l);
    return _(l);
    function h() {
      if (a === d)
        return Cn(e, i, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return Cn(e, (0, Me._)`${v}.validate`, d, d.$async);
    }
    function b(v) {
      const g = Ru(e, v);
      Cn(e, g, v, v.$async);
    }
    function _(v) {
      const g = t.scopeValue("schema", u.code.source === !0 ? { ref: v, code: (0, Me.stringify)(v) } : { ref: v }), $ = t.name("valid"), p = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Me.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, $);
      e.mergeEvaluated(p), e.ok($);
    }
  }
};
function Ru(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Me._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
nr.getValidate = Ru;
function Cn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? cr.default.this : Me.nil;
  n ? l() : h();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Me._)`await ${(0, zi.callValidateCode)(e, t, d)}`), _(t), i || s.assign(v, !0);
    }, (g) => {
      s.if((0, Me._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), b(g), i || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, zi.callValidateCode)(e, t, d), () => _(t), () => b(t));
  }
  function b(v) {
    const g = (0, Me._)`${v}.errors`;
    s.assign(cr.default.vErrors, (0, Me._)`${cr.default.vErrors} === null ? ${g} : ${cr.default.vErrors}.concat(${g})`), s.assign(cr.default.errors, (0, Me._)`${cr.default.vErrors}.length`);
  }
  function _(v) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const $ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = $n.mergeEvaluated.props(s, $.props, a.props));
      else {
        const p = s.var("props", (0, Me._)`${v}.evaluated.props`);
        a.props = $n.mergeEvaluated.props(s, p, a.props, Me.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = $n.mergeEvaluated.items(s, $.items, a.items));
      else {
        const p = s.var("items", (0, Me._)`${v}.evaluated.items`);
        a.items = $n.mergeEvaluated.items(s, p, a.items, Me.Name);
      }
  }
}
nr.callRef = Cn;
nr.default = q_;
Object.defineProperty(Eo, "__esModule", { value: !0 });
const K_ = wo, G_ = nr, H_ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  K_.default,
  G_.default
];
Eo.default = H_;
var So = {}, bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const Jn = Z, Et = Jn.operators, Xn = {
  maximum: { okStr: "<=", ok: Et.LTE, fail: Et.GT },
  minimum: { okStr: ">=", ok: Et.GTE, fail: Et.LT },
  exclusiveMaximum: { okStr: "<", ok: Et.LT, fail: Et.GTE },
  exclusiveMinimum: { okStr: ">", ok: Et.GT, fail: Et.LTE }
}, B_ = {
  message: ({ keyword: e, schemaCode: t }) => (0, Jn.str)`must be ${Xn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Jn._)`{comparison: ${Xn[e].okStr}, limit: ${t}}`
}, J_ = {
  keyword: Object.keys(Xn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: B_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Jn._)`${r} ${Xn[t].fail} ${n} || isNaN(${r})`);
  }
};
bo.default = J_;
var Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
const Xr = Z, X_ = {
  message: ({ schemaCode: e }) => (0, Xr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Xr._)`{multipleOf: ${e}}`
}, W_ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: X_,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Xr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Xr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Xr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
Po.default = W_;
var No = {}, Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
function Tu(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Oo.default = Tu;
Tu.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(No, "__esModule", { value: !0 });
const Zt = Z, Y_ = L, Q_ = Oo, Z_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Zt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Zt._)`{limit: ${e}}`
}, x_ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Z_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Zt.operators.GT : Zt.operators.LT, i = s.opts.unicode === !1 ? (0, Zt._)`${r}.length` : (0, Zt._)`${(0, Y_.useFunc)(e.gen, Q_.default)}(${r})`;
    e.fail$data((0, Zt._)`${i} ${a} ${n}`);
  }
};
No.default = x_;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const eg = ee, Wn = Z, tg = {
  message: ({ schemaCode: e }) => (0, Wn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Wn._)`{pattern: ${e}}`
}, rg = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: tg,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Wn._)`(new RegExp(${s}, ${i}))` : (0, eg.usePattern)(e, n);
    e.fail$data((0, Wn._)`!${u}.test(${t})`);
  }
};
Ro.default = rg;
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const Wr = Z, ng = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Wr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Wr._)`{limit: ${e}}`
}, sg = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: ng,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Wr.operators.GT : Wr.operators.LT;
    e.fail$data((0, Wr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
To.default = sg;
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
const Mr = ee, Yr = Z, ag = L, og = {
  message: ({ params: { missingProperty: e } }) => (0, Yr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Yr._)`{missingProperty: ${e}}`
}, ig = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: og,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const _ = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const g of r)
        if ((_ == null ? void 0 : _[g]) === void 0 && !v.has(g)) {
          const $ = i.schemaEnv.baseId + i.errSchemaPath, p = `required property "${g}" is not defined at "${$}" (strictRequired)`;
          (0, ag.checkStrictMode)(i, p, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Yr.nil, h);
      else
        for (const _ of r)
          (0, Mr.checkReportMissingProp)(e, _);
    }
    function l() {
      const _ = t.let("missing");
      if (c || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => b(_, v)), e.ok(v);
      } else
        t.if((0, Mr.checkMissingProp)(e, r, _)), (0, Mr.reportMissingProp)(e, _), t.else();
    }
    function h() {
      t.forOf("prop", n, (_) => {
        e.setParams({ missingProperty: _ }), t.if((0, Mr.noPropertyInData)(t, s, _, u.ownProperties), () => e.error());
      });
    }
    function b(_, v) {
      e.setParams({ missingProperty: _ }), t.forOf(_, n, () => {
        t.assign(v, (0, Mr.propertyInData)(t, s, _, u.ownProperties)), t.if((0, Yr.not)(v), () => {
          e.error(), t.break();
        });
      }, Yr.nil);
    }
  }
};
Io.default = ig;
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
const Qr = Z, cg = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Qr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Qr._)`{limit: ${e}}`
}, lg = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: cg,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Qr.operators.GT : Qr.operators.LT;
    e.fail$data((0, Qr._)`${r}.length ${s} ${n}`);
  }
};
jo.default = lg;
var Ao = {}, an = {};
Object.defineProperty(an, "__esModule", { value: !0 });
const Iu = es;
Iu.code = 'require("ajv/dist/runtime/equal").default';
an.default = Iu;
Object.defineProperty(Ao, "__esModule", { value: !0 });
const Os = _e, we = Z, ug = L, dg = an, fg = {
  message: ({ params: { i: e, j: t } }) => (0, we.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, we._)`{i: ${e}, j: ${t}}`
}, hg = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: fg,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, Os.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, we._)`${i} === false`), e.ok(c);
    function l() {
      const v = t.let("i", (0, we._)`${r}.length`), g = t.let("j");
      e.setParams({ i: v, j: g }), t.assign(c, !0), t.if((0, we._)`${v} > 1`, () => (h() ? b : _)(v, g));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function b(v, g) {
      const $ = t.name("item"), p = (0, Os.checkDataTypes)(d, $, u.opts.strictNumbers, Os.DataType.Wrong), w = t.const("indices", (0, we._)`{}`);
      t.for((0, we._)`;${v}--;`, () => {
        t.let($, (0, we._)`${r}[${v}]`), t.if(p, (0, we._)`continue`), d.length > 1 && t.if((0, we._)`typeof ${$} == "string"`, (0, we._)`${$} += "_"`), t.if((0, we._)`typeof ${w}[${$}] == "number"`, () => {
          t.assign(g, (0, we._)`${w}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, we._)`${w}[${$}] = ${v}`);
      });
    }
    function _(v, g) {
      const $ = (0, ug.useFunc)(t, dg.default), p = t.name("outer");
      t.label(p).for((0, we._)`;${v}--;`, () => t.for((0, we._)`${g} = ${v}; ${g}--;`, () => t.if((0, we._)`${$}(${r}[${v}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(p);
      })));
    }
  }
};
Ao.default = hg;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const Qs = Z, pg = L, mg = an, yg = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Qs._)`{allowedValue: ${e}}`
}, $g = {
  keyword: "const",
  $data: !0,
  error: yg,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Qs._)`!${(0, pg.useFunc)(t, mg.default)}(${r}, ${s})`) : e.fail((0, Qs._)`${a} !== ${r}`);
  }
};
ko.default = $g;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const Ur = Z, _g = L, gg = an, vg = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Ur._)`{allowedValues: ${e}}`
}, Eg = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: vg,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, _g.useFunc)(t, gg.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const _ = t.const("vSchema", a);
      l = (0, Ur.or)(...s.map((v, g) => b(_, g)));
    }
    e.pass(l);
    function h() {
      t.assign(l, !1), t.forOf("v", a, (_) => t.if((0, Ur._)`${d()}(${r}, ${_})`, () => t.assign(l, !0).break()));
    }
    function b(_, v) {
      const g = s[v];
      return typeof g == "object" && g !== null ? (0, Ur._)`${d()}(${r}, ${_}[${v}])` : (0, Ur._)`${r} === ${g}`;
    }
  }
};
Co.default = Eg;
Object.defineProperty(So, "__esModule", { value: !0 });
const wg = bo, Sg = Po, bg = No, Pg = Ro, Ng = To, Og = Io, Rg = jo, Tg = Ao, Ig = ko, jg = Co, Ag = [
  // number
  wg.default,
  Sg.default,
  // string
  bg.default,
  Pg.default,
  // object
  Ng.default,
  Og.default,
  // array
  Rg.default,
  Tg.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Ig.default,
  jg.default
];
So.default = Ag;
var Do = {}, Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.validateAdditionalItems = void 0;
const xt = Z, Zs = L, kg = {
  message: ({ params: { len: e } }) => (0, xt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, xt._)`{limit: ${e}}`
}, Cg = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: kg,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Zs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    ju(e, n);
  }
};
function ju(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, xt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, xt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Zs.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, xt._)`${u} <= ${t.length}`);
    r.if((0, xt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Zs.Type.Num }, d), i.allErrors || r.if((0, xt.not)(d), () => r.break());
    });
  }
}
Rr.validateAdditionalItems = ju;
Rr.default = Cg;
var Mo = {}, Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.validateTuple = void 0;
const Ki = Z, Dn = L, Dg = ee, Mg = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Au(e, "additionalItems", t);
    r.items = !0, !(0, Dn.alwaysValidSchema)(r, t) && e.ok((0, Dg.validateArray)(e));
  }
};
function Au(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = Dn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, Ki._)`${a}.length`);
  r.forEach((h, b) => {
    (0, Dn.alwaysValidSchema)(u, h) || (n.if((0, Ki._)`${d} > ${b}`, () => e.subschema({
      keyword: i,
      schemaProp: b,
      dataProp: b
    }, c)), e.ok(c));
  });
  function l(h) {
    const { opts: b, errSchemaPath: _ } = u, v = r.length, g = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (b.strictTuples && !g) {
      const $ = `"${i}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${_}"`;
      (0, Dn.checkStrictMode)(u, $, b.strictTuples);
    }
  }
}
Tr.validateTuple = Au;
Tr.default = Mg;
Object.defineProperty(Mo, "__esModule", { value: !0 });
const Lg = Tr, Fg = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Lg.validateTuple)(e, "items")
};
Mo.default = Fg;
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
const Gi = Z, Vg = L, Ug = ee, zg = Rr, qg = {
  message: ({ params: { len: e } }) => (0, Gi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Gi._)`{limit: ${e}}`
}, Kg = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: qg,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Vg.alwaysValidSchema)(n, t) && (s ? (0, zg.validateAdditionalItems)(e, s) : e.ok((0, Ug.validateArray)(e)));
  }
};
Lo.default = Kg;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const Ge = Z, _n = L, Gg = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge.str)`must contain at least ${e} valid item(s)` : (0, Ge.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge._)`{minContains: ${e}}` : (0, Ge._)`{minContains: ${e}, maxContains: ${t}}`
}, Hg = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Gg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, Ge._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, _n.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, _n.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, _n.alwaysValidSchema)(a, r)) {
      let g = (0, Ge._)`${l} >= ${i}`;
      u !== void 0 && (g = (0, Ge._)`${g} && ${l} <= ${u}`), e.pass(g);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    u === void 0 && i === 1 ? _(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), u !== void 0 && t.if((0, Ge._)`${s}.length > 0`, b)) : (t.let(h, !1), b()), e.result(h, () => e.reset());
    function b() {
      const g = t.name("_valid"), $ = t.let("count", 0);
      _(g, () => t.if(g, () => v($)));
    }
    function _(g, $) {
      t.forRange("i", 0, l, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: _n.Type.Num,
          compositeRule: !0
        }, g), $();
      });
    }
    function v(g) {
      t.code((0, Ge._)`${g}++`), u === void 0 ? t.if((0, Ge._)`${g} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, Ge._)`${g} > ${u}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, Ge._)`${g} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
Fo.default = Hg;
var ku = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Z, r = L, n = ee;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: l } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: l, missingProperty: h } }) => (0, t._)`{property: ${c},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, l] = a(c);
      i(c, d), u(c, l);
    }
  };
  function a({ schema: c }) {
    const d = {}, l = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const b = Array.isArray(c[h]) ? d : l;
      b[h] = c[h];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: h, it: b } = c;
    if (Object.keys(d).length === 0)
      return;
    const _ = l.let("missing");
    for (const v in d) {
      const g = d[v];
      if (g.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, h, v, b.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: g.length,
        deps: g.join(", ")
      }), b.allErrors ? l.if($, () => {
        for (const p of g)
          (0, n.checkReportMissingProp)(c, p);
      }) : (l.if((0, t._)`${$} && (${(0, n.checkMissingProp)(c, g, _)})`), (0, n.reportMissingProp)(c, _), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: h, keyword: b, it: _ } = c, v = l.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(_, d[g]) || (l.if(
        (0, n.propertyInData)(l, h, g, _.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: b, schemaProp: g }, v);
          c.mergeValidEvaluated($, v);
        },
        () => l.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = u, e.default = s;
})(ku);
var Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
const Cu = Z, Bg = L, Jg = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Cu._)`{propertyName: ${e.propertyName}}`
}, Xg = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Jg,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Bg.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Cu.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Vo.default = Xg;
var ls = {};
Object.defineProperty(ls, "__esModule", { value: !0 });
const gn = ee, Ye = Z, Wg = ft, vn = L, Yg = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ye._)`{additionalProperty: ${e.additionalProperty}}`
}, Qg = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Yg,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, vn.alwaysValidSchema)(i, r))
      return;
    const d = (0, gn.allSchemaProperties)(n.properties), l = (0, gn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Ye._)`${a} === ${Wg.default.errors}`);
    function h() {
      t.forIn("key", s, ($) => {
        !d.length && !l.length ? v($) : t.if(b($), () => v($));
      });
    }
    function b($) {
      let p;
      if (d.length > 8) {
        const w = (0, vn.schemaRefOrVal)(i, n.properties, "properties");
        p = (0, gn.isOwnProperty)(t, w, $);
      } else d.length ? p = (0, Ye.or)(...d.map((w) => (0, Ye._)`${$} === ${w}`)) : p = Ye.nil;
      return l.length && (p = (0, Ye.or)(p, ...l.map((w) => (0, Ye._)`${(0, gn.usePattern)(e, w)}.test(${$})`))), (0, Ye.not)(p);
    }
    function _($) {
      t.code((0, Ye._)`delete ${s}[${$}]`);
    }
    function v($) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        _($);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: $ }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, vn.alwaysValidSchema)(i, r)) {
        const p = t.name("valid");
        c.removeAdditional === "failing" ? (g($, p, !1), t.if((0, Ye.not)(p), () => {
          e.reset(), _($);
        })) : (g($, p), u || t.if((0, Ye.not)(p), () => t.break()));
      }
    }
    function g($, p, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: vn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, p);
    }
  }
};
ls.default = Qg;
var Uo = {};
Object.defineProperty(Uo, "__esModule", { value: !0 });
const Zg = tt, Hi = ee, Rs = L, Bi = ls, xg = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Bi.default.code(new Zg.KeywordCxt(a, Bi.default, "additionalProperties"));
    const i = (0, Hi.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = Rs.mergeEvaluated.props(t, (0, Rs.toHash)(i), a.props));
    const u = i.filter((h) => !(0, Rs.alwaysValidSchema)(a, r[h]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const h of u)
      d(h) ? l(h) : (t.if((0, Hi.propertyInData)(t, s, h, a.opts.ownProperties)), l(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function l(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
Uo.default = xg;
var zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
const Ji = ee, En = Z, Xi = L, Wi = L, e0 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Ji.allSchemaProperties)(r), c = u.filter((g) => (0, Xi.alwaysValidSchema)(a, r[g]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof En.Name) && (a.props = (0, Wi.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    b();
    function b() {
      for (const g of u)
        d && _(g), a.allErrors ? v(g) : (t.var(l, !0), v(g), t.if(l));
    }
    function _(g) {
      for (const $ in d)
        new RegExp(g).test($) && (0, Xi.checkStrictMode)(a, `property ${$} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function v(g) {
      t.forIn("key", n, ($) => {
        t.if((0, En._)`${(0, Ji.usePattern)(e, g)}.test(${$})`, () => {
          const p = c.includes(g);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: $,
            dataPropType: Wi.Type.Str
          }, l), a.opts.unevaluated && h !== !0 ? t.assign((0, En._)`${h}[${$}]`, !0) : !p && !a.allErrors && t.if((0, En.not)(l), () => t.break());
        });
      });
    }
  }
};
zo.default = e0;
var qo = {};
Object.defineProperty(qo, "__esModule", { value: !0 });
const t0 = L, r0 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, t0.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
qo.default = r0;
var Ko = {};
Object.defineProperty(Ko, "__esModule", { value: !0 });
const n0 = ee, s0 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: n0.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Ko.default = s0;
var Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
const Mn = Z, a0 = L, o0 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Mn._)`{passingSchemas: ${e.passing}}`
}, i0 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: o0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), u = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: u }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((l, h) => {
        let b;
        (0, a0.alwaysValidSchema)(s, l) ? t.var(c, !0) : b = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, Mn._)`${c} && ${i}`).assign(i, !1).assign(u, (0, Mn._)`[${u}, ${h}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, h), b && e.mergeEvaluated(b, Mn.Name);
        });
      });
    }
  }
};
Go.default = i0;
var Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
const c0 = L, l0 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, c0.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Ho.default = l0;
var Bo = {};
Object.defineProperty(Bo, "__esModule", { value: !0 });
const Yn = Z, Du = L, u0 = {
  message: ({ params: e }) => (0, Yn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Yn._)`{failingKeyword: ${e.ifClause}}`
}, d0 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: u0,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Du.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Yi(n, "then"), a = Yi(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Yn.not)(u), d("else"));
    e.pass(i, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, u);
      e.mergeEvaluated(l);
    }
    function d(l, h) {
      return () => {
        const b = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(b, i), h ? t.assign(h, (0, Yn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Yi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Du.alwaysValidSchema)(e, r);
}
Bo.default = d0;
var Jo = {};
Object.defineProperty(Jo, "__esModule", { value: !0 });
const f0 = L, h0 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, f0.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Jo.default = h0;
Object.defineProperty(Do, "__esModule", { value: !0 });
const p0 = Rr, m0 = Mo, y0 = Tr, $0 = Lo, _0 = Fo, g0 = ku, v0 = Vo, E0 = ls, w0 = Uo, S0 = zo, b0 = qo, P0 = Ko, N0 = Go, O0 = Ho, R0 = Bo, T0 = Jo;
function I0(e = !1) {
  const t = [
    // any
    b0.default,
    P0.default,
    N0.default,
    O0.default,
    R0.default,
    T0.default,
    // object
    v0.default,
    E0.default,
    g0.default,
    w0.default,
    S0.default
  ];
  return e ? t.push(m0.default, $0.default) : t.push(p0.default, y0.default), t.push(_0.default), t;
}
Do.default = I0;
var Xo = {}, Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
const ye = Z, j0 = {
  message: ({ schemaCode: e }) => (0, ye.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ye._)`{format: ${e}}`
}, A0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: j0,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: h } = u;
    if (!c.validateFormats)
      return;
    s ? b() : _();
    function b() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, ye._)`${v}[${i}]`), $ = r.let("fType"), p = r.let("format");
      r.if((0, ye._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign($, (0, ye._)`${g}.type || "string"`).assign(p, (0, ye._)`${g}.validate`), () => r.assign($, (0, ye._)`"string"`).assign(p, g)), e.fail$data((0, ye.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? ye.nil : (0, ye._)`${i} && !${p}`;
      }
      function N() {
        const R = l.$async ? (0, ye._)`(${g}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, ye._)`${p}(${n})`, I = (0, ye._)`(typeof ${p} == "function" ? ${R} : ${p}.test(${n}))`;
        return (0, ye._)`${p} && ${p} !== true && ${$} === ${t} && !${I}`;
      }
    }
    function _() {
      const v = h.formats[a];
      if (!v) {
        w();
        return;
      }
      if (v === !0)
        return;
      const [g, $, p] = N(v);
      g === t && e.pass(R());
      function w() {
        if (c.strictSchema === !1) {
          h.logger.warn(I());
          return;
        }
        throw new Error(I());
        function I() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(I) {
        const z = I instanceof RegExp ? (0, ye.regexpCode)(I) : c.code.formats ? (0, ye._)`${c.code.formats}${(0, ye.getProperty)(a)}` : void 0, B = r.scopeValue("formats", { key: a, ref: I, code: z });
        return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, ye._)`${B}.validate`] : ["string", I, B];
      }
      function R() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, ye._)`await ${p}(${n})`;
        }
        return typeof $ == "function" ? (0, ye._)`${p}(${n})` : (0, ye._)`${p}.test(${n})`;
      }
    }
  }
};
Wo.default = A0;
Object.defineProperty(Xo, "__esModule", { value: !0 });
const k0 = Wo, C0 = [k0.default];
Xo.default = C0;
var Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.contentVocabulary = Sr.metadataVocabulary = void 0;
Sr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Sr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(vo, "__esModule", { value: !0 });
const D0 = Eo, M0 = So, L0 = Do, F0 = Xo, Qi = Sr, V0 = [
  D0.default,
  M0.default,
  (0, L0.default)(),
  F0.default,
  Qi.metadataVocabulary,
  Qi.contentVocabulary
];
vo.default = V0;
var Yo = {}, us = {};
Object.defineProperty(us, "__esModule", { value: !0 });
us.DiscrError = void 0;
var Zi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Zi || (us.DiscrError = Zi = {}));
Object.defineProperty(Yo, "__esModule", { value: !0 });
const ur = Z, xs = us, xi = Fe, U0 = Or, z0 = L, q0 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === xs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, ur._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, K0 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: q0,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const u = n.propertyName;
    if (typeof u != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, ur._)`${r}${(0, ur.getProperty)(u)}`);
    t.if((0, ur._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: xs.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const _ = b();
      t.if(!1);
      for (const v in _)
        t.elseIf((0, ur._)`${d} === ${v}`), t.assign(c, h(_[v]));
      t.else(), e.error(!1, { discrError: xs.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function h(_) {
      const v = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: _ }, v);
      return e.mergeEvaluated(g, ur.Name), v;
    }
    function b() {
      var _;
      const v = {}, g = p(s);
      let $ = !0;
      for (let R = 0; R < i.length; R++) {
        let I = i[R];
        if (I != null && I.$ref && !(0, z0.schemaHasRulesButRef)(I, a.self.RULES)) {
          const B = I.$ref;
          if (I = xi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), I instanceof xi.SchemaEnv && (I = I.schema), I === void 0)
            throw new U0.default(a.opts.uriResolver, a.baseId, B);
        }
        const z = (_ = I == null ? void 0 : I.properties) === null || _ === void 0 ? void 0 : _[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        $ = $ && (g || p(I)), w(z, R);
      }
      if (!$)
        throw new Error(`discriminator: "${u}" must be required`);
      return v;
      function p({ required: R }) {
        return Array.isArray(R) && R.includes(u);
      }
      function w(R, I) {
        if (R.const)
          N(R.const, I);
        else if (R.enum)
          for (const z of R.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(R, I) {
        if (typeof R != "string" || R in v)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        v[R] = I;
      }
    }
  }
};
Yo.default = K0;
const G0 = "http://json-schema.org/draft-07/schema#", H0 = "http://json-schema.org/draft-07/schema#", B0 = "Core schema meta-schema", J0 = {
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
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
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
    uniqueItems: !0,
    default: []
  }
}, X0 = [
  "object",
  "boolean"
], W0 = {
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
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
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
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
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
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
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
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
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
        uniqueItems: !0
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
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
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
}, Y0 = {
  $schema: G0,
  $id: H0,
  title: B0,
  definitions: J0,
  type: X0,
  properties: W0,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Wl, n = vo, s = Yo, a = Y0, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(v, u, !1), this.refs["http://json-schema.org/schema"] = u;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(u) ? u : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = tt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var l = Z;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var h = sn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var b = Or;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return b.default;
  } });
})(Bs, Bs.exports);
var Q0 = Bs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Q0, r = Z, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: u, schemaCode: c }) => r.str`should be ${s[u].okStr} ${c}`,
    params: ({ keyword: u, schemaCode: c }) => r._`{comparison: ${s[u].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(u) {
      const { gen: c, data: d, schemaCode: l, keyword: h, it: b } = u, { opts: _, self: v } = b;
      if (!_.validateFormats)
        return;
      const g = new t.KeywordCxt(b, v.RULES.all.format.definition, "format");
      g.$data ? $() : p();
      function $() {
        const N = c.scopeValue("formats", {
          ref: v.formats,
          code: _.code.formats
        }), R = c.const("fmt", r._`${N}[${g.schemaCode}]`);
        u.fail$data(r.or(r._`typeof ${R} != "object"`, r._`${R} instanceof RegExp`, r._`typeof ${R}.compare != "function"`, w(R)));
      }
      function p() {
        const N = g.schema, R = v.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${h}": format "${N}" does not define "compare" function`);
        const I = c.scopeValue("formats", {
          key: N,
          ref: R,
          code: _.code.formats ? r._`${_.code.formats}${r.getProperty(N)}` : void 0
        });
        u.fail$data(w(I));
      }
      function w(N) {
        return r._`${N}.compare(${d}, ${l}) ${s[h].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (u) => (u.addKeyword(e.formatLimitDefinition), u);
  e.default = i;
})(Xl);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Jl, n = Xl, s = Z, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), u = (d, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(d, l, r.fullFormats, a), d;
    const [h, b] = l.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], _ = l.formats || r.formatNames;
    return c(d, _, h, b), l.keywords && n.default(d), d;
  };
  u.get = (d, l = "full") => {
    const b = (l === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!b)
      throw new Error(`Unknown format "${d}"`);
    return b;
  };
  function c(d, l, h, b) {
    var _, v;
    (_ = (v = d.opts.code).formats) !== null && _ !== void 0 || (v.formats = s._`require("ajv-formats/dist/formats").${b}`);
    for (const g of l)
      d.addFormat(g, h[g]);
  }
  e.exports = t = u, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = u;
})(Hs, Hs.exports);
var Z0 = Hs.exports;
const x0 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !ev(s, a) && n || Object.defineProperty(e, r, a);
}, ev = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, tv = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, rv = (e, t) => `/* Wrapped ${e}*/
${t}`, nv = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), sv = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), av = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = rv.bind(null, n, t.toString());
  Object.defineProperty(s, "name", sv), Object.defineProperty(e, "toString", { ...nv, value: s });
}, ov = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    x0(e, t, s, r);
  return tv(e, t), av(e, t, n), e;
};
var iv = ov;
const cv = iv;
var lv = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    before: n = !1,
    after: s = !0
  } = t;
  if (!n && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let a, i;
  const u = function(...c) {
    const d = this, l = () => {
      a = void 0, s && (i = e.apply(d, c));
    }, h = n && !a;
    return clearTimeout(a), a = setTimeout(l, r), h && (i = e.apply(d, c)), i;
  };
  return cv(u, e), u.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, u;
}, ea = { exports: {} };
const uv = "2.0.0", Mu = 256, dv = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, fv = 16, hv = Mu - 6, pv = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var ds = {
  MAX_LENGTH: Mu,
  MAX_SAFE_COMPONENT_LENGTH: fv,
  MAX_SAFE_BUILD_LENGTH: hv,
  MAX_SAFE_INTEGER: dv,
  RELEASE_TYPES: pv,
  SEMVER_SPEC_VERSION: uv,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const mv = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var fs = mv;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = ds, a = fs;
  t = e.exports = {};
  const i = t.re = [], u = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], l = t.t = {};
  let h = 0;
  const b = "[a-zA-Z0-9-]", _ = [
    ["\\s", 1],
    ["\\d", s],
    [b, n]
  ], v = ($) => {
    for (const [p, w] of _)
      $ = $.split(`${p}*`).join(`${p}{0,${w}}`).split(`${p}+`).join(`${p}{1,${w}}`);
    return $;
  }, g = ($, p, w) => {
    const N = v(p), R = h++;
    a($, R, p), l[$] = R, c[R] = p, d[R] = N, i[R] = new RegExp(p, w ? "g" : void 0), u[R] = new RegExp(N, w ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${b}*`), g("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${b}+`), g("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), g("FULL", `^${c[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), g("LOOSE", `^${c[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), g("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[l.COERCE], !0), g("COERCERTLFULL", c[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(ea, ea.exports);
var on = ea.exports;
const yv = Object.freeze({ loose: !0 }), $v = Object.freeze({}), _v = (e) => e ? typeof e != "object" ? yv : e : $v;
var Qo = _v;
const ec = /^[0-9]+$/, Lu = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = ec.test(e), n = ec.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, gv = (e, t) => Lu(t, e);
var Fu = {
  compareIdentifiers: Lu,
  rcompareIdentifiers: gv
};
const wn = fs, { MAX_LENGTH: tc, MAX_SAFE_INTEGER: Sn } = ds, { safeRe: bn, t: Pn } = on, vv = Qo, { compareIdentifiers: Ts } = Fu;
let Ev = class st {
  constructor(t, r) {
    if (r = vv(r), t instanceof st) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > tc)
      throw new TypeError(
        `version is longer than ${tc} characters`
      );
    wn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? bn[Pn.LOOSE] : bn[Pn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Sn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Sn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Sn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < Sn)
          return a;
      }
      return s;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (wn("SemVer.compare", this.version, this.options, t), !(t instanceof st)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new st(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof st || (t = new st(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof st || (t = new st(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (wn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Ts(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof st || (t = new st(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (wn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Ts(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? bn[Pn.PRERELEASELOOSE] : bn[Pn.PRERELEASE]);
        if (!s || s[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const s = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [s];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (r) {
          let a = [r, s];
          n === !1 && (a = [r]), Ts(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ae = Ev;
const rc = Ae, wv = (e, t, r = !1) => {
  if (e instanceof rc)
    return e;
  try {
    return new rc(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Ir = wv;
const Sv = Ir, bv = (e, t) => {
  const r = Sv(e, t);
  return r ? r.version : null;
};
var Pv = bv;
const Nv = Ir, Ov = (e, t) => {
  const r = Nv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Rv = Ov;
const nc = Ae, Tv = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new nc(
      e instanceof nc ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var Iv = Tv;
const sc = Ir, jv = (e, t) => {
  const r = sc(e, null, !0), n = sc(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, i = a ? r : n, u = a ? n : r, c = !!i.prerelease.length;
  if (!!u.prerelease.length && !c) {
    if (!u.patch && !u.minor)
      return "major";
    if (u.compareMain(i) === 0)
      return u.minor && !u.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var Av = jv;
const kv = Ae, Cv = (e, t) => new kv(e, t).major;
var Dv = Cv;
const Mv = Ae, Lv = (e, t) => new Mv(e, t).minor;
var Fv = Lv;
const Vv = Ae, Uv = (e, t) => new Vv(e, t).patch;
var zv = Uv;
const qv = Ir, Kv = (e, t) => {
  const r = qv(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Gv = Kv;
const ac = Ae, Hv = (e, t, r) => new ac(e, r).compare(new ac(t, r));
var rt = Hv;
const Bv = rt, Jv = (e, t, r) => Bv(t, e, r);
var Xv = Jv;
const Wv = rt, Yv = (e, t) => Wv(e, t, !0);
var Qv = Yv;
const oc = Ae, Zv = (e, t, r) => {
  const n = new oc(e, r), s = new oc(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Zo = Zv;
const xv = Zo, eE = (e, t) => e.sort((r, n) => xv(r, n, t));
var tE = eE;
const rE = Zo, nE = (e, t) => e.sort((r, n) => rE(n, r, t));
var sE = nE;
const aE = rt, oE = (e, t, r) => aE(e, t, r) > 0;
var hs = oE;
const iE = rt, cE = (e, t, r) => iE(e, t, r) < 0;
var xo = cE;
const lE = rt, uE = (e, t, r) => lE(e, t, r) === 0;
var Vu = uE;
const dE = rt, fE = (e, t, r) => dE(e, t, r) !== 0;
var Uu = fE;
const hE = rt, pE = (e, t, r) => hE(e, t, r) >= 0;
var ei = pE;
const mE = rt, yE = (e, t, r) => mE(e, t, r) <= 0;
var ti = yE;
const $E = Vu, _E = Uu, gE = hs, vE = ei, EE = xo, wE = ti, SE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return $E(e, r, n);
    case "!=":
      return _E(e, r, n);
    case ">":
      return gE(e, r, n);
    case ">=":
      return vE(e, r, n);
    case "<":
      return EE(e, r, n);
    case "<=":
      return wE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var zu = SE;
const bE = Ae, PE = Ir, { safeRe: Nn, t: On } = on, NE = (e, t) => {
  if (e instanceof bE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Nn[On.COERCEFULL] : Nn[On.COERCE]);
  else {
    const c = t.includePrerelease ? Nn[On.COERCERTLFULL] : Nn[On.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", i = t.includePrerelease && r[5] ? `-${r[5]}` : "", u = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return PE(`${n}.${s}.${a}${i}${u}`, t);
};
var OE = NE;
class RE {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const s = this.map.keys().next().value;
        this.delete(s);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var TE = RE, Is, ic;
function nt() {
  if (ic) return Is;
  ic = 1;
  const e = /\s+/g;
  class t {
    constructor(k, U) {
      if (U = s(U), k instanceof t)
        return k.loose === !!U.loose && k.includePrerelease === !!U.includePrerelease ? k : new t(k.raw, U);
      if (k instanceof a)
        return this.raw = k.value, this.set = [[k]], this.formatted = void 0, this;
      if (this.options = U, this.loose = !!U.loose, this.includePrerelease = !!U.includePrerelease, this.raw = k.trim().replace(e, " "), this.set = this.raw.split("||").map((D) => this.parseRange(D.trim())).filter((D) => D.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const D = this.set[0];
        if (this.set = this.set.filter((O) => !g(O[0])), this.set.length === 0)
          this.set = [D];
        else if (this.set.length > 1) {
          for (const O of this.set)
            if (O.length === 1 && $(O[0])) {
              this.set = [O];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let k = 0; k < this.set.length; k++) {
          k > 0 && (this.formatted += "||");
          const U = this.set[k];
          for (let D = 0; D < U.length; D++)
            D > 0 && (this.formatted += " "), this.formatted += U[D].toString().trim();
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
    parseRange(k) {
      const D = ((this.options.includePrerelease && _) | (this.options.loose && v)) + ":" + k, O = n.get(D);
      if (O)
        return O;
      const T = this.options.loose, E = T ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      k = k.replace(E, Q(this.options.includePrerelease)), i("hyphen replace", k), k = k.replace(c[d.COMPARATORTRIM], l), i("comparator trim", k), k = k.replace(c[d.TILDETRIM], h), i("tilde trim", k), k = k.replace(c[d.CARETTRIM], b), i("caret trim", k);
      let m = k.split(" ").map((f) => w(f, this.options)).join(" ").split(/\s+/).map((f) => ne(f, this.options));
      T && (m = m.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), i("range list", m);
      const S = /* @__PURE__ */ new Map(), y = m.map((f) => new a(f, this.options));
      for (const f of y) {
        if (g(f))
          return [f];
        S.set(f.value, f);
      }
      S.size > 1 && S.has("") && S.delete("");
      const o = [...S.values()];
      return n.set(D, o), o;
    }
    intersects(k, U) {
      if (!(k instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((D) => p(D, U) && k.set.some((O) => p(O, U) && D.every((T) => O.every((E) => T.intersects(E, U)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(k) {
      if (!k)
        return !1;
      if (typeof k == "string")
        try {
          k = new u(k, this.options);
        } catch {
          return !1;
        }
      for (let U = 0; U < this.set.length; U++)
        if (de(this.set[U], k, this.options))
          return !0;
      return !1;
    }
  }
  Is = t;
  const r = TE, n = new r(), s = Qo, a = ps(), i = fs, u = Ae, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: l,
    tildeTrimReplace: h,
    caretTrimReplace: b
  } = on, { FLAG_INCLUDE_PRERELEASE: _, FLAG_LOOSE: v } = ds, g = (C) => C.value === "<0.0.0-0", $ = (C) => C.value === "", p = (C, k) => {
    let U = !0;
    const D = C.slice();
    let O = D.pop();
    for (; U && D.length; )
      U = D.every((T) => O.intersects(T, k)), O = D.pop();
    return U;
  }, w = (C, k) => (C = C.replace(c[d.BUILD], ""), i("comp", C, k), C = z(C, k), i("caret", C), C = R(C, k), i("tildes", C), C = ue(C, k), i("xrange", C), C = H(C, k), i("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", R = (C, k) => C.trim().split(/\s+/).map((U) => I(U, k)).join(" "), I = (C, k) => {
    const U = k.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return C.replace(U, (D, O, T, E, m) => {
      i("tilde", C, D, O, T, E, m);
      let S;
      return N(O) ? S = "" : N(T) ? S = `>=${O}.0.0 <${+O + 1}.0.0-0` : N(E) ? S = `>=${O}.${T}.0 <${O}.${+T + 1}.0-0` : m ? (i("replaceTilde pr", m), S = `>=${O}.${T}.${E}-${m} <${O}.${+T + 1}.0-0`) : S = `>=${O}.${T}.${E} <${O}.${+T + 1}.0-0`, i("tilde return", S), S;
    });
  }, z = (C, k) => C.trim().split(/\s+/).map((U) => B(U, k)).join(" "), B = (C, k) => {
    i("caret", C, k);
    const U = k.loose ? c[d.CARETLOOSE] : c[d.CARET], D = k.includePrerelease ? "-0" : "";
    return C.replace(U, (O, T, E, m, S) => {
      i("caret", C, O, T, E, m, S);
      let y;
      return N(T) ? y = "" : N(E) ? y = `>=${T}.0.0${D} <${+T + 1}.0.0-0` : N(m) ? T === "0" ? y = `>=${T}.${E}.0${D} <${T}.${+E + 1}.0-0` : y = `>=${T}.${E}.0${D} <${+T + 1}.0.0-0` : S ? (i("replaceCaret pr", S), T === "0" ? E === "0" ? y = `>=${T}.${E}.${m}-${S} <${T}.${E}.${+m + 1}-0` : y = `>=${T}.${E}.${m}-${S} <${T}.${+E + 1}.0-0` : y = `>=${T}.${E}.${m}-${S} <${+T + 1}.0.0-0`) : (i("no pr"), T === "0" ? E === "0" ? y = `>=${T}.${E}.${m}${D} <${T}.${E}.${+m + 1}-0` : y = `>=${T}.${E}.${m}${D} <${T}.${+E + 1}.0-0` : y = `>=${T}.${E}.${m} <${+T + 1}.0.0-0`), i("caret return", y), y;
    });
  }, ue = (C, k) => (i("replaceXRanges", C, k), C.split(/\s+/).map((U) => V(U, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const U = k.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return C.replace(U, (D, O, T, E, m, S) => {
      i("xRange", C, D, O, T, E, m, S);
      const y = N(T), o = y || N(E), f = o || N(m), P = f;
      return O === "=" && P && (O = ""), S = k.includePrerelease ? "-0" : "", y ? O === ">" || O === "<" ? D = "<0.0.0-0" : D = "*" : O && P ? (o && (E = 0), m = 0, O === ">" ? (O = ">=", o ? (T = +T + 1, E = 0, m = 0) : (E = +E + 1, m = 0)) : O === "<=" && (O = "<", o ? T = +T + 1 : E = +E + 1), O === "<" && (S = "-0"), D = `${O + T}.${E}.${m}${S}`) : o ? D = `>=${T}.0.0${S} <${+T + 1}.0.0-0` : f && (D = `>=${T}.${E}.0${S} <${T}.${+E + 1}.0-0`), i("xRange return", D), D;
    });
  }, H = (C, k) => (i("replaceStars", C, k), C.trim().replace(c[d.STAR], "")), ne = (C, k) => (i("replaceGTE0", C, k), C.trim().replace(c[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, U, D, O, T, E, m, S, y, o, f, P) => (N(D) ? U = "" : N(O) ? U = `>=${D}.0.0${C ? "-0" : ""}` : N(T) ? U = `>=${D}.${O}.0${C ? "-0" : ""}` : E ? U = `>=${U}` : U = `>=${U}${C ? "-0" : ""}`, N(y) ? S = "" : N(o) ? S = `<${+y + 1}.0.0-0` : N(f) ? S = `<${y}.${+o + 1}.0-0` : P ? S = `<=${y}.${o}.${f}-${P}` : C ? S = `<${y}.${o}.${+f + 1}-0` : S = `<=${S}`, `${U} ${S}`.trim()), de = (C, k, U) => {
    for (let D = 0; D < C.length; D++)
      if (!C[D].test(k))
        return !1;
    if (k.prerelease.length && !U.includePrerelease) {
      for (let D = 0; D < C.length; D++)
        if (i(C[D].semver), C[D].semver !== a.ANY && C[D].semver.prerelease.length > 0) {
          const O = C[D].semver;
          if (O.major === k.major && O.minor === k.minor && O.patch === k.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Is;
}
var js, cc;
function ps() {
  if (cc) return js;
  cc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, h) {
      if (h = r(h), l instanceof t) {
        if (l.loose === !!h.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), i("comparator", l, h), this.options = h, this.loose = !!h.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(l) {
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], b = l.match(h);
      if (!b)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = b[1] !== void 0 ? b[1] : "", this.operator === "=" && (this.operator = ""), b[2] ? this.semver = new u(b[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (i("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new u(l, this.options);
        } catch {
          return !1;
        }
      return a(l, this.operator, this.semver, this.options);
    }
    intersects(l, h) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, h).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, h).test(l.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || a(this.semver, "<", l.semver, h) && this.operator.startsWith(">") && l.operator.startsWith("<") || a(this.semver, ">", l.semver, h) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  js = t;
  const r = Qo, { safeRe: n, t: s } = on, a = zu, i = fs, u = Ae, c = nt();
  return js;
}
const IE = nt(), jE = (e, t, r) => {
  try {
    t = new IE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ms = jE;
const AE = nt(), kE = (e, t) => new AE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var CE = kE;
const DE = Ae, ME = nt(), LE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new ME(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new DE(n, r));
  }), n;
};
var FE = LE;
const VE = Ae, UE = nt(), zE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new UE(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new VE(n, r));
  }), n;
};
var qE = zE;
const As = Ae, KE = nt(), lc = hs, GE = (e, t) => {
  e = new KE(e, t);
  let r = new As("0.0.0");
  if (e.test(r) || (r = new As("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((i) => {
      const u = new As(i.semver.version);
      switch (i.operator) {
        case ">":
          u.prerelease.length === 0 ? u.patch++ : u.prerelease.push(0), u.raw = u.format();
        case "":
        case ">=":
          (!a || lc(u, a)) && (a = u);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), a && (!r || lc(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var HE = GE;
const BE = nt(), JE = (e, t) => {
  try {
    return new BE(e, t).range || "*";
  } catch {
    return null;
  }
};
var XE = JE;
const WE = Ae, qu = ps(), { ANY: YE } = qu, QE = nt(), ZE = ms, uc = hs, dc = xo, xE = ti, ew = ei, tw = (e, t, r, n) => {
  e = new WE(e, n), t = new QE(t, n);
  let s, a, i, u, c;
  switch (r) {
    case ">":
      s = uc, a = xE, i = dc, u = ">", c = ">=";
      break;
    case "<":
      s = dc, a = ew, i = uc, u = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (ZE(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const l = t.set[d];
    let h = null, b = null;
    if (l.forEach((_) => {
      _.semver === YE && (_ = new qu(">=0.0.0")), h = h || _, b = b || _, s(_.semver, h.semver, n) ? h = _ : i(_.semver, b.semver, n) && (b = _);
    }), h.operator === u || h.operator === c || (!b.operator || b.operator === u) && a(e, b.semver))
      return !1;
    if (b.operator === c && i(e, b.semver))
      return !1;
  }
  return !0;
};
var ri = tw;
const rw = ri, nw = (e, t, r) => rw(e, t, ">", r);
var sw = nw;
const aw = ri, ow = (e, t, r) => aw(e, t, "<", r);
var iw = ow;
const fc = nt(), cw = (e, t, r) => (e = new fc(e, r), t = new fc(t, r), e.intersects(t, r));
var lw = cw;
const uw = ms, dw = rt;
var fw = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const i = e.sort((l, h) => dw(l, h, r));
  for (const l of i)
    uw(l, t, r) ? (a = l, s || (s = l)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const u = [];
  for (const [l, h] of n)
    l === h ? u.push(l) : !h && l === i[0] ? u.push("*") : h ? l === i[0] ? u.push(`<=${h}`) : u.push(`${l} - ${h}`) : u.push(`>=${l}`);
  const c = u.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const hc = nt(), ni = ps(), { ANY: ks } = ni, Lr = ms, si = rt, hw = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new hc(e, r), t = new hc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const i = mw(s, a, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, pw = [new ni(">=0.0.0-0")], pc = [new ni(">=0.0.0")], mw = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ks) {
    if (t.length === 1 && t[0].semver === ks)
      return !0;
    r.includePrerelease ? e = pw : e = pc;
  }
  if (t.length === 1 && t[0].semver === ks) {
    if (r.includePrerelease)
      return !0;
    t = pc;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const _ of e)
    _.operator === ">" || _.operator === ">=" ? s = mc(s, _, r) : _.operator === "<" || _.operator === "<=" ? a = yc(a, _, r) : n.add(_.semver);
  if (n.size > 1)
    return null;
  let i;
  if (s && a) {
    if (i = si(s.semver, a.semver, r), i > 0)
      return null;
    if (i === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const _ of n) {
    if (s && !Lr(_, String(s), r) || a && !Lr(_, String(a), r))
      return null;
    for (const v of t)
      if (!Lr(_, String(v), r))
        return !1;
    return !0;
  }
  let u, c, d, l, h = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, b = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && a.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const _ of t) {
    if (l = l || _.operator === ">" || _.operator === ">=", d = d || _.operator === "<" || _.operator === "<=", s) {
      if (b && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === b.major && _.semver.minor === b.minor && _.semver.patch === b.patch && (b = !1), _.operator === ">" || _.operator === ">=") {
        if (u = mc(s, _, r), u === _ && u !== s)
          return !1;
      } else if (s.operator === ">=" && !Lr(s.semver, String(_), r))
        return !1;
    }
    if (a) {
      if (h && _.semver.prerelease && _.semver.prerelease.length && _.semver.major === h.major && _.semver.minor === h.minor && _.semver.patch === h.patch && (h = !1), _.operator === "<" || _.operator === "<=") {
        if (c = yc(a, _, r), c === _ && c !== a)
          return !1;
      } else if (a.operator === "<=" && !Lr(a.semver, String(_), r))
        return !1;
    }
    if (!_.operator && (a || s) && i !== 0)
      return !1;
  }
  return !(s && d && !a && i !== 0 || a && l && !s && i !== 0 || b || h);
}, mc = (e, t, r) => {
  if (!e)
    return t;
  const n = si(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, yc = (e, t, r) => {
  if (!e)
    return t;
  const n = si(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var yw = hw;
const Cs = on, $c = ds, $w = Ae, _c = Fu, _w = Ir, gw = Pv, vw = Rv, Ew = Iv, ww = Av, Sw = Dv, bw = Fv, Pw = zv, Nw = Gv, Ow = rt, Rw = Xv, Tw = Qv, Iw = Zo, jw = tE, Aw = sE, kw = hs, Cw = xo, Dw = Vu, Mw = Uu, Lw = ei, Fw = ti, Vw = zu, Uw = OE, zw = ps(), qw = nt(), Kw = ms, Gw = CE, Hw = FE, Bw = qE, Jw = HE, Xw = XE, Ww = ri, Yw = sw, Qw = iw, Zw = lw, xw = fw, eS = yw;
var tS = {
  parse: _w,
  valid: gw,
  clean: vw,
  inc: Ew,
  diff: ww,
  major: Sw,
  minor: bw,
  patch: Pw,
  prerelease: Nw,
  compare: Ow,
  rcompare: Rw,
  compareLoose: Tw,
  compareBuild: Iw,
  sort: jw,
  rsort: Aw,
  gt: kw,
  lt: Cw,
  eq: Dw,
  neq: Mw,
  gte: Lw,
  lte: Fw,
  cmp: Vw,
  coerce: Uw,
  Comparator: zw,
  Range: qw,
  satisfies: Kw,
  toComparators: Gw,
  maxSatisfying: Hw,
  minSatisfying: Bw,
  minVersion: Jw,
  validRange: Xw,
  outside: Ww,
  gtr: Yw,
  ltr: Qw,
  intersects: Zw,
  simplifyRange: xw,
  subset: eS,
  SemVer: $w,
  re: Cs.re,
  src: Cs.src,
  tokens: Cs.t,
  SEMVER_SPEC_VERSION: $c.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: $c.RELEASE_TYPES,
  compareIdentifiers: _c.compareIdentifiers,
  rcompareIdentifiers: _c.rcompareIdentifiers
}, ys = { exports: {} }, ai = { exports: {} };
const Ku = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
ai.exports = Ku;
ai.exports.default = Ku;
var rS = ai.exports;
const nS = rS, Qn = /* @__PURE__ */ new WeakMap(), Gu = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...i) {
    if (Qn.set(a, ++n), n === 1)
      r = e.apply(this, i), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return nS(a, e), Qn.set(a, n), a;
};
ys.exports = Gu;
ys.exports.default = Gu;
ys.exports.callCount = (e) => {
  if (!Qn.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return Qn.get(e);
};
var sS = ys.exports;
(function(e, t) {
  var r = cn && cn.__classPrivateFieldSet || function(D, O, T, E, m) {
    if (E === "m") throw new TypeError("Private method is not writable");
    if (E === "a" && !m) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? D !== O || !m : !O.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return E === "a" ? m.call(D, T) : m ? m.value = T : O.set(D, T), T;
  }, n = cn && cn.__classPrivateFieldGet || function(D, O, T, E) {
    if (T === "a" && !E) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? D !== O || !E : !O.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return T === "m" ? E : T === "a" ? E.call(D) : E ? E.value : O.get(D);
  }, s, a, i, u, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const l = Nc, h = na, b = sr, _ = td, v = rd, g = nd, $ = pd, p = Pd, w = Td, N = it, R = Uy, I = Z0, z = lv, B = tS, ue = sS, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), ne = (D) => D != null;
  let Q = "";
  try {
    delete require.cache[__filename], Q = b.dirname((a = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && a !== void 0 ? a : ".");
  } catch {
  }
  const de = (D, O) => {
    const T = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), E = typeof O;
    if (T.has(E))
      throw new TypeError(`Setting a value of type \`${E}\` for key \`${D}\` is not allowed as it's not supported by JSON`);
  }, C = "__internal__", k = `${C}.migrations.version`;
  class U {
    constructor(O = {}) {
      var T;
      i.set(this, void 0), u.set(this, void 0), c.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const E = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...O
      }, m = ue(() => {
        const f = p.sync({ cwd: Q }), P = f && JSON.parse(h.readFileSync(f, "utf8"));
        return P ?? {};
      });
      if (!E.cwd) {
        if (E.projectName || (E.projectName = m().name), !E.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        E.cwd = w(E.projectName, { suffix: E.projectSuffix }).config;
      }
      if (r(this, c, E, "f"), E.schema) {
        if (typeof E.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const f = new R.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, I.default)(f);
        const P = {
          type: "object",
          properties: E.schema
        };
        r(this, i, f.compile(P), "f");
        for (const [j, A] of Object.entries(E.schema))
          A != null && A.default && (n(this, d, "f")[j] = A.default);
      }
      E.defaults && r(this, d, {
        ...n(this, d, "f"),
        ...E.defaults
      }, "f"), E.serialize && (this._serialize = E.serialize), E.deserialize && (this._deserialize = E.deserialize), this.events = new g.EventEmitter(), r(this, u, E.encryptionKey, "f");
      const S = E.fileExtension ? `.${E.fileExtension}` : "";
      this.path = b.resolve(E.cwd, `${(T = E.configName) !== null && T !== void 0 ? T : "config"}${S}`);
      const y = this.store, o = Object.assign(H(), E.defaults, y);
      this._validate(o);
      try {
        v.deepEqual(y, o);
      } catch {
        this.store = o;
      }
      if (E.watch && this._watch(), E.migrations) {
        if (E.projectVersion || (E.projectVersion = m().version), !E.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(E.migrations, E.projectVersion, E.beforeEachMigration);
      }
    }
    get(O, T) {
      if (n(this, c, "f").accessPropertiesByDotNotation)
        return this._get(O, T);
      const { store: E } = this;
      return O in E ? E[O] : T;
    }
    set(O, T) {
      if (typeof O != "string" && typeof O != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof O}`);
      if (typeof O != "object" && T === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(O))
        throw new TypeError(`Please don't use the ${C} key, as it's used to manage this module internal operations.`);
      const { store: E } = this, m = (S, y) => {
        de(S, y), n(this, c, "f").accessPropertiesByDotNotation ? $.set(E, S, y) : E[S] = y;
      };
      if (typeof O == "object") {
        const S = O;
        for (const [y, o] of Object.entries(S))
          m(y, o);
      } else
        m(O, T);
      this.store = E;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(O) {
      return n(this, c, "f").accessPropertiesByDotNotation ? $.has(this.store, O) : O in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...O) {
      for (const T of O)
        ne(n(this, d, "f")[T]) && this.set(T, n(this, d, "f")[T]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(O) {
      const { store: T } = this;
      n(this, c, "f").accessPropertiesByDotNotation ? $.delete(T, O) : delete T[O], this.store = T;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = H();
      for (const O of Object.keys(n(this, d, "f")))
        this.reset(O);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(O, T) {
      if (typeof O != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof O}`);
      if (typeof T != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof T}`);
      return this._handleChange(() => this.get(O), T);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(O) {
      if (typeof O != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof O}`);
      return this._handleChange(() => this.store, O);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const O = h.readFileSync(this.path, n(this, u, "f") ? null : "utf8"), T = this._encryptData(O), E = this._deserialize(T);
        return this._validate(E), Object.assign(H(), E);
      } catch (O) {
        if ((O == null ? void 0 : O.code) === "ENOENT")
          return this._ensureDirectory(), H();
        if (n(this, c, "f").clearInvalidConfig && O.name === "SyntaxError")
          return H();
        throw O;
      }
    }
    set store(O) {
      this._ensureDirectory(), this._validate(O), this._write(O), this.events.emit("change");
    }
    *[(i = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [O, T] of Object.entries(this.store))
        yield [O, T];
    }
    _encryptData(O) {
      if (!n(this, u, "f"))
        return O.toString();
      try {
        if (n(this, u, "f"))
          try {
            if (O.slice(16, 17).toString() === ":") {
              const T = O.slice(0, 16), E = _.pbkdf2Sync(n(this, u, "f"), T.toString(), 1e4, 32, "sha512"), m = _.createDecipheriv(V, E, T);
              O = Buffer.concat([m.update(Buffer.from(O.slice(17))), m.final()]).toString("utf8");
            } else {
              const T = _.createDecipher(V, n(this, u, "f"));
              O = Buffer.concat([T.update(Buffer.from(O)), T.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return O.toString();
    }
    _handleChange(O, T) {
      let E = O();
      const m = () => {
        const S = E, y = O();
        (0, l.isDeepStrictEqual)(y, S) || (E = y, T.call(this, y, S));
      };
      return this.events.on("change", m), () => this.events.removeListener("change", m);
    }
    _validate(O) {
      if (!n(this, i, "f") || n(this, i, "f").call(this, O) || !n(this, i, "f").errors)
        return;
      const E = n(this, i, "f").errors.map(({ instancePath: m, message: S = "" }) => `\`${m.slice(1)}\` ${S}`);
      throw new Error("Config schema violation: " + E.join("; "));
    }
    _ensureDirectory() {
      h.mkdirSync(b.dirname(this.path), { recursive: !0 });
    }
    _write(O) {
      let T = this._serialize(O);
      if (n(this, u, "f")) {
        const E = _.randomBytes(16), m = _.pbkdf2Sync(n(this, u, "f"), E.toString(), 1e4, 32, "sha512"), S = _.createCipheriv(V, m, E);
        T = Buffer.concat([E, Buffer.from(":"), S.update(Buffer.from(T)), S.final()]);
      }
      if (process.env.SNAP)
        h.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
        } catch (E) {
          if ((E == null ? void 0 : E.code) === "EXDEV") {
            h.writeFileSync(this.path, T, { mode: n(this, c, "f").configFileMode });
            return;
          }
          throw E;
        }
    }
    _watch() {
      this._ensureDirectory(), h.existsSync(this.path) || this._write(H()), process.platform === "win32" ? h.watch(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 100 })) : h.watchFile(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(O, T, E) {
      let m = this._get(k, "0.0.0");
      const S = Object.keys(O).filter((o) => this._shouldPerformMigration(o, m, T));
      let y = { ...this.store };
      for (const o of S)
        try {
          E && E(this, {
            fromVersion: m,
            toVersion: o,
            finalVersion: T,
            versions: S
          });
          const f = O[o];
          f(this), this._set(k, o), m = o, y = { ...this.store };
        } catch (f) {
          throw this.store = y, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(m) || !B.eq(m, T)) && this._set(k, T);
    }
    _containsReservedKey(O) {
      return typeof O == "object" && Object.keys(O)[0] === C ? !0 : typeof O != "string" ? !1 : n(this, c, "f").accessPropertiesByDotNotation ? !!O.startsWith(`${C}.`) : !1;
    }
    _isVersionInRangeFormat(O) {
      return B.clean(O) === null;
    }
    _shouldPerformMigration(O, T, E) {
      return this._isVersionInRangeFormat(O) ? T !== "0.0.0" && B.satisfies(T, O) ? !1 : B.satisfies(E, O) : !(B.lte(O, T) || B.gt(O, E));
    }
    _get(O, T) {
      return $.get(this.store, O, T);
    }
    _set(O, T) {
      const { store: E } = this;
      $.set(E, O, T), this.store = E;
    }
  }
  t.default = U, e.exports = U, e.exports.default = U;
})(Ds, Ds.exports);
var aS = Ds.exports;
const gc = sr, { app: Ln, ipcMain: ta, ipcRenderer: vc, shell: oS } = Yu, iS = aS;
let Ec = !1;
const wc = () => {
  if (!ta || !Ln)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Ln.getPath("userData"),
    appVersion: Ln.getVersion()
  };
  return Ec || (ta.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Ec = !0), e;
};
class cS extends iS {
  constructor(t) {
    let r, n;
    if (vc) {
      const s = vc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else ta && Ln && ({ defaultCwd: r, appVersion: n } = wc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = gc.isAbsolute(t.cwd) ? t.cwd : gc.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    wc();
  }
  async openInEditor() {
    const t = await oS.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var lS = cS;
const uS = /* @__PURE__ */ ud(lS), Hu = "iTransporter-secure-key-2024", He = new uS({
  name: "iTransporter-data",
  defaults: {
    credentials: [],
    uploadHistory: []
  }
});
function dS(e) {
  const t = fr.scryptSync(Hu, "salt", 32), r = fr.randomBytes(16), n = fr.createCipheriv("aes-256-cbc", t, r);
  let s = n.update(e, "utf8", "hex");
  return s += n.final("hex"), r.toString("hex") + ":" + s;
}
function fS(e) {
  try {
    const [t, r] = e.split(":"), n = fr.scryptSync(Hu, "salt", 32), s = Buffer.from(t, "hex"), a = fr.createDecipheriv("aes-256-cbc", n, s);
    let i = a.update(r, "hex", "utf8");
    return i += a.final("utf8"), i;
  } catch {
    return "";
  }
}
function Bu(e, t) {
  const r = He.get("credentials", []), n = r.findIndex((i) => i.appleId === e), s = dS(t), a = (/* @__PURE__ */ new Date()).toISOString();
  n >= 0 ? (r[n].password = s, r[n].lastUsed = a, r[n].uploadCount += 1) : r.push({
    appleId: e,
    password: s,
    lastUsed: a,
    uploadCount: 1
  }), He.set("credentials", r);
}
function hS() {
  return He.get("credentials", []).map((t) => ({
    appleId: t.appleId,
    lastUsed: t.lastUsed,
    uploadCount: t.uploadCount
  }));
}
function pS(e) {
  const r = He.get("credentials", []).find((n) => n.appleId === e);
  return r ? {
    ...r,
    password: fS(r.password)
  } : null;
}
function mS(e) {
  const t = He.get("credentials", []), r = t.filter((n) => n.appleId !== e);
  return r.length !== t.length ? (He.set("credentials", r), !0) : !1;
}
function Fn(e) {
  const t = He.get("uploadHistory", []), r = {
    ...e,
    id: fr.randomUUID()
  };
  return t.unshift(r), t.length > 100 && t.pop(), He.set("uploadHistory", t), r;
}
function yS() {
  return He.get("uploadHistory", []);
}
function $S() {
  He.set("uploadHistory", []);
}
function _S(e) {
  const t = He.get("uploadHistory", []), r = t.filter((n) => n.id !== e);
  return r.length !== t.length ? (He.set("uploadHistory", r), !0) : !1;
}
let Qe = null, St = null, zr = "";
async function gS(e, t) {
  return new Promise((r) => {
    var u, c;
    const n = Ic(), s = Pc(n, [
      "-m",
      "provider",
      "-u",
      e,
      "-p",
      t
    ]);
    let a = "", i = "";
    (u = s.stdout) == null || u.on("data", (d) => {
      a += d.toString();
    }), (c = s.stderr) == null || c.on("data", (d) => {
      i += d.toString();
    }), s.on("close", (d) => {
      if (d === 0) {
        const l = [], h = a.split(`
`);
        let b = !1;
        for (const _ of h) {
          if (_.includes("Provider listing:")) {
            b = !0;
            continue;
          }
          if (_.includes("- Long Name -") || _.includes("- Short Name -"))
            continue;
          if (b) {
            const $ = _.match(/^\s*(\d+)\s+(.+?)\s{2,}(\S+)\s*$/);
            if ($) {
              l.push({
                teamName: $[2].trim(),
                teamId: $[3],
                // 在表格格式中，shortName 就是 ID
                shortName: $[3]
              });
              continue;
            }
          }
          const v = _.match(/^\d+\.\s+(.+?)\s+\((\w+)\)\s+-\s+ProviderShortName:\s+(\S+)/);
          v && l.push({
            teamName: v[1].trim(),
            teamId: v[2],
            shortName: v[3]
          });
          const g = _.match(/parameter\s+(.+?)\s+=\s+(\w+)/);
          if (g && !_.includes("Application") && !_.includes("Version") && !_.includes("OSIdentifier")) {
            const $ = g[1].trim(), p = g[2];
            /^[A-Z0-9]{8,12}$/.test(p) && (l.find((w) => w.shortName === p) || l.push({
              teamName: $,
              teamId: p,
              shortName: p
            }));
          }
        }
        if (l.length > 0)
          r({ success: !0, providers: l });
        else {
          const _ = a.match(/ProviderShortName[:\s]+(\S+)/g);
          _ ? (_.forEach((v, g) => {
            const $ = v.replace(/ProviderShortName[:\s]+/, "").trim();
            l.push({
              teamName: `Team ${g + 1}`,
              teamId: $,
              shortName: $
            });
          }), r({ success: !0, providers: l })) : r({ success: !1, errorMessage: "未能解析 Provider 列表。请手动输入 Provider Shortname。" });
        }
      } else
        r({
          success: !1,
          errorMessage: i || `获取 Provider 失败 (退出码: ${d})`
        });
    }), s.on("error", (d) => {
      r({ success: !1, errorMessage: d.message });
    });
  });
}
function vS(e, t) {
  const r = e.match(/Package upload progress:\s*([\d.]+)%\s*completed/);
  if (r)
    return {
      phase: "uploading",
      phaseText: "上传中",
      progress: parseFloat(r[1]),
      fileName: t
    };
  const n = e.match(/File:\s*\S+\s+(\d+)\/(\d+),\s*([\d.]+)%\s*completed/);
  if (n) {
    const a = parseInt(n[1]), i = parseInt(n[2]);
    return {
      phase: "uploading",
      phaseText: "上传中",
      progress: parseFloat(n[3]),
      fileName: t,
      bytesUploaded: a,
      totalBytes: i
    };
  }
  const s = e.match(/Finished part upload.*?([\d.]+)\s*MB\/s/);
  return s ? {
    phase: "uploading",
    phaseText: "上传中",
    progress: 100,
    fileName: t,
    speed: `${s[1]} MB/s`
  } : null;
}
function ES(e, t) {
  return e.includes("authenticateForSession") || e.includes("Configuring logging") ? {
    phase: "authenticating",
    phaseText: "认证中",
    progress: 0,
    fileName: t
  } : e.includes("Performing analysis") || e.includes("Configuring the Software Uploader") ? {
    phase: "analyzing",
    phaseText: "分析包中",
    progress: 0,
    fileName: t
  } : e.includes("Starting upload for package") || e.includes("Computing total size") ? {
    phase: "uploading",
    phaseText: "准备上传",
    progress: 0,
    fileName: t
  } : e.includes("Committing reservation") || e.includes("Transfer Metrics Summary") ? {
    phase: "committing",
    phaseText: "提交中",
    progress: 100,
    fileName: t
  } : e.includes("package was uploaded successfully") || e.includes("Package Summary") ? {
    phase: "completed",
    phaseText: "上传完成",
    progress: 100,
    fileName: t
  } : e.includes("ERROR:") || e.includes("Upload Failed") || e.includes("Could not upload") ? {
    phase: "failed",
    phaseText: "上传失败",
    progress: 0,
    fileName: t
  } : null;
}
function wS(e, t) {
  return new Promise((r) => {
    var d, l;
    const n = Ic(), s = Oc.basename(e.ipaPath);
    zr = (/* @__PURE__ */ new Date()).toISOString(), St = e, Jt(t, {
      phase: "preparing",
      phaseText: "准备中",
      progress: 0,
      fileName: s
    }), Ce(t, `[INFO] 开始上传: ${s}`), Ce(t, `[INFO] Apple ID: ${e.appleId}`), e.ascProvider && Ce(t, `[INFO] Provider: ${e.ascProvider}`), Ce(t, `[INFO] 使用 iTMSTransporter: ${n}`), Ce(t, "---");
    const a = [
      "-m",
      "upload",
      "-assetFile",
      e.ipaPath,
      "-u",
      e.appleId,
      "-p",
      e.appSpecificPassword
    ];
    e.ascProvider && a.push("-asc_provider", e.ascProvider), Qe = Pc(n, a);
    let i = "", u = null;
    const c = (h, b = !1) => {
      b ? Ce(t, `[ERROR] ${h}`) : Ce(t, h);
      const _ = vS(h, s);
      if (_) {
        u = _, Jt(t, _);
        return;
      }
      const v = ES(h, s);
      v && (u && v.phase === "uploading" && u.phase === "uploading" && (v.progress = u.progress), u = v, Jt(t, v));
    };
    (d = Qe.stdout) == null || d.on("data", (h) => {
      h.toString().split(`
`).filter((v) => v.trim()).forEach((v) => c(v));
    }), (l = Qe.stderr) == null || l.on("data", (h) => {
      const b = h.toString();
      i += b, b.split(`
`).filter((v) => v.trim()).forEach((v) => c(v, !0));
    }), Qe.on("close", (h) => {
      const b = (/* @__PURE__ */ new Date()).toISOString();
      h === 0 ? (Ce(t, "---"), Ce(t, "[SUCCESS] 上传完成!"), Jt(t, {
        phase: "completed",
        phaseText: "上传完成",
        progress: 100,
        fileName: s
      }), Bu(e.appleId, e.appSpecificPassword), Fn({
        fileName: s,
        filePath: e.ipaPath,
        appleId: e.appleId,
        status: "success",
        startTime: zr,
        endTime: b
      }), t.webContents.send("upload-complete", { success: !0 }), r({ success: !0 })) : (Ce(t, "---"), Ce(t, `[FAILED] 上传失败 (退出码: ${h})`), Jt(t, {
        phase: "failed",
        phaseText: "上传失败",
        progress: (u == null ? void 0 : u.progress) || 0,
        fileName: s
      }), Fn({
        fileName: s,
        filePath: e.ipaPath,
        appleId: e.appleId,
        status: "failed",
        startTime: zr,
        endTime: b,
        errorMessage: i || `Exit code: ${h}`
      }), t.webContents.send("upload-complete", {
        success: !1,
        errorMessage: i || `Exit code: ${h}`
      }), r({ success: !1, errorMessage: i || `Exit code: ${h}` })), Qe = null, St = null;
    }), Qe.on("error", (h) => {
      const b = (/* @__PURE__ */ new Date()).toISOString();
      Ce(t, `[ERROR] 进程启动失败: ${h.message}`), Jt(t, {
        phase: "failed",
        phaseText: "启动失败",
        progress: 0,
        fileName: s
      }), Fn({
        fileName: s,
        filePath: e.ipaPath,
        appleId: e.appleId,
        status: "failed",
        startTime: zr,
        endTime: b,
        errorMessage: h.message
      }), t.webContents.send("upload-complete", {
        success: !1,
        errorMessage: h.message
      }), r({ success: !1, errorMessage: h.message }), Qe = null, St = null;
    });
  });
}
function SS(e) {
  if (Qe && St) {
    const t = Oc.basename(St.ipaPath);
    Ce(e, "[INFO] 正在取消上传..."), Jt(e, {
      phase: "failed",
      phaseText: "已取消",
      progress: 0,
      fileName: t
    });
    const r = (/* @__PURE__ */ new Date()).toISOString();
    return Fn({
      fileName: t,
      filePath: St.ipaPath,
      appleId: St.appleId,
      status: "cancelled",
      startTime: zr,
      endTime: r,
      errorMessage: "用户取消上传"
    }), Qe.kill("SIGTERM"), Qe = null, St = null, Ce(e, "[INFO] 上传已取消"), e.webContents.send("upload-complete", {
      success: !1,
      errorMessage: "用户取消上传"
    }), !0;
  }
  return !1;
}
function Ju() {
  return Qe !== null;
}
function Ce(e, t) {
  e.webContents.send("upload-log", {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    message: t
  });
}
function Jt(e, t) {
  e.webContents.send("upload-progress", t);
}
const $s = $r.dirname(Zu(import.meta.url)), bS = !!process.env.VITE_DEV_SERVER_URL, Sc = process.env.VITE_DEV_SERVER_URL, US = $r.join($s), Xu = $r.join($s, "../dist");
process.env.VITE_PUBLIC = bS ? $r.join($s, "../public") : Xu;
let ve;
function Wu() {
  ve = new bc({
    width: 1e3,
    height: 800,
    minWidth: 900,
    minHeight: 700,
    // icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: $r.join($s, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), ve.webContents.on("did-finish-load", () => {
    ve == null || ve.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Sc ? ve.loadURL(Sc) : ve.loadFile($r.join(Xu, "index.html")), ve.webContents.on("context-menu", (e, t) => {
    const { isEditable: r, selectionText: n, editFlags: s, x: a, y: i } = t;
    ve == null || ve.webContents.send("show-context-menu", {
      isEditable: r,
      hasSelection: n && n.trim() !== "",
      editFlags: s,
      x: a,
      y: i
    });
  });
}
Ve.handle("check-environment", async () => await cd());
Ve.handle("install-clt", async () => await ld());
Ve.handle("select-ipa-file", async () => {
  if (!ve) return null;
  const e = await Qu.showOpenDialog(ve, {
    title: "选择 IPA 文件",
    filters: [
      { name: "iOS App", extensions: ["ipa"] }
    ],
    properties: ["openFile"]
  });
  return e.canceled || e.filePaths.length === 0 ? null : e.filePaths[0];
});
Ve.handle("start-upload", async (e, t) => ve ? Ju() ? { success: !1, errorMessage: "已有上传任务进行中" } : await wS(t, ve) : { success: !1, errorMessage: "窗口未初始化" });
Ve.handle("cancel-upload", async () => ve ? SS(ve) : !1);
Ve.handle("is-uploading", () => Ju());
Ve.handle("fetch-providers", async (e, t) => await gS(t.appleId, t.password));
Ve.handle("get-credentials-list", () => hS());
Ve.handle("get-credential", (e, t) => pS(t));
Ve.handle("save-credential", (e, t) => (Bu(t.appleId, t.password), !0));
Ve.handle("delete-credential", (e, t) => mS(t));
Ve.handle("get-upload-history", () => yS());
Ve.handle("clear-upload-history", () => ($S(), !0));
Ve.handle("delete-upload-history", (e, t) => _S(t));
Vn.on("window-all-closed", () => {
  process.platform !== "darwin" && (Vn.quit(), ve = null);
});
Vn.on("activate", () => {
  bc.getAllWindows().length === 0 && Wu();
});
Vn.whenReady().then(Wu);
export {
  US as MAIN_DIST,
  Xu as RENDERER_DIST,
  Sc as VITE_DEV_SERVER_URL
};
