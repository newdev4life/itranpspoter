import ad, { net as od, ipcMain as $e, shell as id, app as rn, BrowserWindow as Ac, dialog as cd } from "electron";
import { fileURLToPath as ld } from "node:url";
import wr from "node:path";
import * as Er from "fs";
import ca from "fs";
import { exec as ud, spawn as kc } from "child_process";
import Cc, { promisify as dd } from "util";
import * as la from "path";
import cr from "path";
import * as yr from "crypto";
import fd from "crypto";
import hd from "assert";
import pd from "events";
import md from "os";
const Dc = dd(ud), Mc = "/Applications/Transporter.app", Gn = "/Applications/Transporter.app/Contents/itms/bin/iTMSTransporter", Hn = "/usr/local/itms/bin/iTMSTransporter";
function yd() {
  return Er.existsSync(Mc);
}
function $d() {
  return Er.existsSync(Gn);
}
function gd() {
  return Er.existsSync(Hn);
}
async function _d() {
  try {
    const { stdout: e } = await Dc("xcode-select -p"), t = e.trim();
    return Er.existsSync(t) ? { installed: !0, path: t } : { installed: !1, path: "" };
  } catch {
    return { installed: !1, path: "" };
  }
}
async function vd() {
  const e = yd(), t = $d(), r = gd(), n = await _d(), s = t || r;
  return {
    transporterInstalled: e,
    transporterPath: Mc,
    iTMSTransporterPath: Gn,
    iTMSTransporterExists: t,
    standaloneITMSTransporterExists: r,
    standaloneITMSTransporterPath: Hn,
    commandLineToolsInstalled: n.installed,
    commandLineToolsPath: n.path,
    allReady: s && n.installed
  };
}
function Lc() {
  if (Er.existsSync(Gn))
    return Gn;
  if (Er.existsSync(Hn))
    return Hn;
  throw new Error("iTMSTransporter not found. Please install Transporter from App Store or download standalone iTMSTransporter from Apple.");
}
async function wd() {
  var e;
  try {
    return await Dc("xcode-select --install"), {
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
var hn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ed(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var zs = { exports: {} }, Sd = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Jt = Sd, bd = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Pd = (e) => !e.some((t) => bd.has(t));
function pn(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return Pd(r) ? r : [];
}
var Nd = {
  get(e, t, r) {
    if (!Jt(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = pn(t);
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
    if (!Jt(e) || typeof t != "string")
      return e;
    const n = e, s = pn(t);
    for (let a = 0; a < s.length; a++) {
      const o = s[a];
      Jt(e[o]) || (e[o] = {}), a === s.length - 1 && (e[o] = r), e = e[o];
    }
    return n;
  },
  delete(e, t) {
    if (!Jt(e) || typeof t != "string")
      return !1;
    const r = pn(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Jt(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Jt(e) || typeof t != "string")
      return !1;
    const r = pn(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Jt(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, ua = { exports: {} }, da = { exports: {} }, fa = { exports: {} }, ha = { exports: {} };
const Fc = ca;
ha.exports = (e) => new Promise((t) => {
  Fc.access(e, (r) => {
    t(!r);
  });
});
ha.exports.sync = (e) => {
  try {
    return Fc.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Td = ha.exports, pa = { exports: {} }, ma = { exports: {} };
const Vc = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ma.exports = Vc;
ma.exports.default = Vc;
var Od = ma.exports;
const Rd = Od, Uc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (l, c, ...d) => {
    r++;
    const u = Rd(l, ...d);
    c(u), u.then(n, n);
  }, a = (l, c, ...d) => {
    r < e ? s(l, c, ...d) : t.push(s.bind(null, l, c, ...d));
  }, o = (l, ...c) => new Promise((d) => a(l, d, ...c));
  return Object.defineProperties(o, {
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
  }), o;
};
pa.exports = Uc;
pa.exports.default = Uc;
var Id = pa.exports;
const pi = Id;
class zc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const jd = (e, t) => Promise.resolve(e).then(t), Ad = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new zc(t[0])));
var kd = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = pi(r.concurrency), s = [...e].map((o) => [o, n(jd, o, t)]), a = pi(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((o) => a(Ad, o))).then(() => {
  }).catch((o) => o instanceof zc ? o.value : Promise.reject(o));
};
const qc = cr, Kc = Td, Cd = kd;
fa.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), Cd(e, (r) => Kc(qc.resolve(t.cwd, r)), t));
fa.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (Kc.sync(qc.resolve(t.cwd, r)))
      return r;
};
var Dd = fa.exports;
const Tt = cr, Gc = Dd;
da.exports = (e, t = {}) => {
  const r = Tt.resolve(t.cwd || ""), { root: n } = Tt.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function o(l) {
      Gc(s, { cwd: l }).then((c) => {
        c ? a(Tt.join(l, c)) : l === n ? a(null) : o(Tt.dirname(l));
      });
    })(r);
  });
};
da.exports.sync = (e, t = {}) => {
  let r = Tt.resolve(t.cwd || "");
  const { root: n } = Tt.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = Gc.sync(s, { cwd: r });
    if (a)
      return Tt.join(r, a);
    if (r === n)
      return null;
    r = Tt.dirname(r);
  }
};
var Md = da.exports;
const Hc = Md;
ua.exports = async ({ cwd: e } = {}) => Hc("package.json", { cwd: e });
ua.exports.sync = ({ cwd: e } = {}) => Hc.sync("package.json", { cwd: e });
var Ld = ua.exports, ya = { exports: {} };
const pe = cr, Bc = md, Pt = Bc.homedir(), $a = Bc.tmpdir(), { env: mr } = process, Fd = (e) => {
  const t = pe.join(Pt, "Library");
  return {
    data: pe.join(t, "Application Support", e),
    config: pe.join(t, "Preferences", e),
    cache: pe.join(t, "Caches", e),
    log: pe.join(t, "Logs", e),
    temp: pe.join($a, e)
  };
}, Vd = (e) => {
  const t = mr.APPDATA || pe.join(Pt, "AppData", "Roaming"), r = mr.LOCALAPPDATA || pe.join(Pt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: pe.join(r, e, "Data"),
    config: pe.join(t, e, "Config"),
    cache: pe.join(r, e, "Cache"),
    log: pe.join(r, e, "Log"),
    temp: pe.join($a, e)
  };
}, Ud = (e) => {
  const t = pe.basename(Pt);
  return {
    data: pe.join(mr.XDG_DATA_HOME || pe.join(Pt, ".local", "share"), e),
    config: pe.join(mr.XDG_CONFIG_HOME || pe.join(Pt, ".config"), e),
    cache: pe.join(mr.XDG_CACHE_HOME || pe.join(Pt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: pe.join(mr.XDG_STATE_HOME || pe.join(Pt, ".local", "state"), e),
    temp: pe.join($a, t, e)
  };
}, Jc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? Fd(e) : process.platform === "win32" ? Vd(e) : Ud(e);
};
ya.exports = Jc;
ya.exports.default = Jc;
var zd = ya.exports, ct = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.NOOP = ae.LIMIT_FILES_DESCRIPTORS = ae.LIMIT_BASENAME_LENGTH = ae.IS_USER_ROOT = ae.IS_POSIX = ae.DEFAULT_TIMEOUT_SYNC = ae.DEFAULT_TIMEOUT_ASYNC = ae.DEFAULT_WRITE_OPTIONS = ae.DEFAULT_READ_OPTIONS = ae.DEFAULT_FOLDER_MODE = ae.DEFAULT_FILE_MODE = ae.DEFAULT_ENCODING = void 0;
const qd = "utf8";
ae.DEFAULT_ENCODING = qd;
const Kd = 438;
ae.DEFAULT_FILE_MODE = Kd;
const Gd = 511;
ae.DEFAULT_FOLDER_MODE = Gd;
const Hd = {};
ae.DEFAULT_READ_OPTIONS = Hd;
const Bd = {};
ae.DEFAULT_WRITE_OPTIONS = Bd;
const Jd = 5e3;
ae.DEFAULT_TIMEOUT_ASYNC = Jd;
const Xd = 100;
ae.DEFAULT_TIMEOUT_SYNC = Xd;
const Wd = !!process.getuid;
ae.IS_POSIX = Wd;
const Yd = process.getuid ? !process.getuid() : !1;
ae.IS_USER_ROOT = Yd;
const Qd = 128;
ae.LIMIT_BASENAME_LENGTH = Qd;
const Zd = 1e4;
ae.LIMIT_FILES_DESCRIPTORS = Zd;
const xd = () => {
};
ae.NOOP = xd;
var ss = {}, Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.attemptifySync = Sr.attemptifyAsync = void 0;
const Xc = ae, ef = (e, t = Xc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
Sr.attemptifyAsync = ef;
const tf = (e, t = Xc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
Sr.attemptifySync = tf;
var ga = {};
Object.defineProperty(ga, "__esModule", { value: !0 });
const rf = ae, Wc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !rf.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Wc.isChangeErrorOk(e))
      throw e;
  }
};
ga.default = Wc;
var br = {}, _a = {};
Object.defineProperty(_a, "__esModule", { value: !0 });
const nf = ae, le = {
  interval: 25,
  intervalId: void 0,
  limit: nf.LIMIT_FILES_DESCRIPTORS,
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
_a.default = le;
Object.defineProperty(br, "__esModule", { value: !0 });
br.retryifySync = br.retryifyAsync = void 0;
const sf = _a, af = (e, t) => function(r) {
  return function n() {
    return sf.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
      if (s(), Date.now() >= r)
        throw a;
      if (t(a)) {
        const o = Math.round(100 + 400 * Math.random());
        return new Promise((c) => setTimeout(c, o)).then(() => n.apply(void 0, arguments));
      }
      throw a;
    }));
  };
};
br.retryifyAsync = af;
const of = (e, t) => function(r) {
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
br.retryifySync = of;
Object.defineProperty(ss, "__esModule", { value: !0 });
const oe = ca, je = Cc, Ae = Sr, we = ga, Me = br, cf = {
  chmodAttempt: Ae.attemptifyAsync(je.promisify(oe.chmod), we.default.onChangeError),
  chownAttempt: Ae.attemptifyAsync(je.promisify(oe.chown), we.default.onChangeError),
  closeAttempt: Ae.attemptifyAsync(je.promisify(oe.close)),
  fsyncAttempt: Ae.attemptifyAsync(je.promisify(oe.fsync)),
  mkdirAttempt: Ae.attemptifyAsync(je.promisify(oe.mkdir)),
  realpathAttempt: Ae.attemptifyAsync(je.promisify(oe.realpath)),
  statAttempt: Ae.attemptifyAsync(je.promisify(oe.stat)),
  unlinkAttempt: Ae.attemptifyAsync(je.promisify(oe.unlink)),
  closeRetry: Me.retryifyAsync(je.promisify(oe.close), we.default.isRetriableError),
  fsyncRetry: Me.retryifyAsync(je.promisify(oe.fsync), we.default.isRetriableError),
  openRetry: Me.retryifyAsync(je.promisify(oe.open), we.default.isRetriableError),
  readFileRetry: Me.retryifyAsync(je.promisify(oe.readFile), we.default.isRetriableError),
  renameRetry: Me.retryifyAsync(je.promisify(oe.rename), we.default.isRetriableError),
  statRetry: Me.retryifyAsync(je.promisify(oe.stat), we.default.isRetriableError),
  writeRetry: Me.retryifyAsync(je.promisify(oe.write), we.default.isRetriableError),
  chmodSyncAttempt: Ae.attemptifySync(oe.chmodSync, we.default.onChangeError),
  chownSyncAttempt: Ae.attemptifySync(oe.chownSync, we.default.onChangeError),
  closeSyncAttempt: Ae.attemptifySync(oe.closeSync),
  mkdirSyncAttempt: Ae.attemptifySync(oe.mkdirSync),
  realpathSyncAttempt: Ae.attemptifySync(oe.realpathSync),
  statSyncAttempt: Ae.attemptifySync(oe.statSync),
  unlinkSyncAttempt: Ae.attemptifySync(oe.unlinkSync),
  closeSyncRetry: Me.retryifySync(oe.closeSync, we.default.isRetriableError),
  fsyncSyncRetry: Me.retryifySync(oe.fsyncSync, we.default.isRetriableError),
  openSyncRetry: Me.retryifySync(oe.openSync, we.default.isRetriableError),
  readFileSyncRetry: Me.retryifySync(oe.readFileSync, we.default.isRetriableError),
  renameSyncRetry: Me.retryifySync(oe.renameSync, we.default.isRetriableError),
  statSyncRetry: Me.retryifySync(oe.statSync, we.default.isRetriableError),
  writeSyncRetry: Me.retryifySync(oe.writeSync, we.default.isRetriableError)
};
ss.default = cf;
var va = {};
Object.defineProperty(va, "__esModule", { value: !0 });
const lf = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
va.default = lf;
var wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
const mn = {}, qs = {
  next: (e) => {
    const t = mn[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => qs.next(e)) : delete mn[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = mn[e];
    r || (r = mn[e] = []), r.push(t), !(r.length > 1) && t(() => qs.next(e));
  })
};
wa.default = qs;
var Ea = {};
Object.defineProperty(Ea, "__esModule", { value: !0 });
const uf = cr, mi = ae, yi = ss, qe = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = qe.truncate(t(e));
    return n in qe.store ? qe.get(e, t, r) : (qe.store[n] = r, [n, () => delete qe.store[n]]);
  },
  purge: (e) => {
    qe.store[e] && (delete qe.store[e], yi.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    qe.store[e] && (delete qe.store[e], yi.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in qe.store)
      qe.purgeSync(e);
  },
  truncate: (e) => {
    const t = uf.basename(e);
    if (t.length <= mi.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - mi.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", qe.purgeSyncAll);
Ea.default = qe;
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.writeFileSync = ct.writeFile = ct.readFileSync = ct.readFile = void 0;
const Yc = cr, Pe = ae, se = ss, Ke = va, df = wa, Ot = Ea;
function Qc(e, t = Pe.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return Qc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Pe.DEFAULT_TIMEOUT_ASYNC);
  return se.default.readFileRetry(n)(e, t);
}
ct.readFile = Qc;
function Zc(e, t = Pe.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return Zc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Pe.DEFAULT_TIMEOUT_SYNC);
  return se.default.readFileSyncRetry(n)(e, t);
}
ct.readFileSync = Zc;
const xc = (e, t, r, n) => {
  if (Ke.default.isFunction(r))
    return xc(e, t, Pe.DEFAULT_WRITE_OPTIONS, r);
  const s = el(e, t, r);
  return n && s.then(n, n), s;
};
ct.writeFile = xc;
const el = async (e, t, r = Pe.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return el(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Pe.DEFAULT_TIMEOUT_ASYNC);
  let a = null, o = null, l = null, c = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), o = await df.default.schedule(e), e = await se.default.realpathAttempt(e) || e, [c, l] = Ot.default.get(e, r.tmpCreate || Ot.default.create, r.tmpPurge !== !1);
    const u = Pe.IS_POSIX && Ke.default.isUndefined(r.chown), h = Ke.default.isUndefined(r.mode);
    if (u || h) {
      const g = await se.default.statAttempt(e);
      g && (r = { ...r }, u && (r.chown = { uid: g.uid, gid: g.gid }), h && (r.mode = g.mode));
    }
    const b = Yc.dirname(e);
    await se.default.mkdirAttempt(b, {
      mode: Pe.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await se.default.openRetry(s)(c, "w", r.mode || Pe.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(c), Ke.default.isString(t) ? await se.default.writeRetry(s)(d, t, 0, r.encoding || Pe.DEFAULT_ENCODING) : Ke.default.isUndefined(t) || await se.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await se.default.fsyncRetry(s)(d) : se.default.fsyncAttempt(d)), await se.default.closeRetry(s)(d), d = null, r.chown && await se.default.chownAttempt(c, r.chown.uid, r.chown.gid), r.mode && await se.default.chmodAttempt(c, r.mode);
    try {
      await se.default.renameRetry(s)(c, e);
    } catch (g) {
      if (g.code !== "ENAMETOOLONG")
        throw g;
      await se.default.renameRetry(s)(c, Ot.default.truncate(e));
    }
    l(), c = null;
  } finally {
    d && await se.default.closeAttempt(d), c && Ot.default.purge(c), a && a(), o && o();
  }
}, tl = (e, t, r = Pe.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return tl(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Pe.DEFAULT_TIMEOUT_SYNC);
  let a = null, o = null, l = null;
  try {
    e = se.default.realpathSyncAttempt(e) || e, [o, a] = Ot.default.get(e, r.tmpCreate || Ot.default.create, r.tmpPurge !== !1);
    const c = Pe.IS_POSIX && Ke.default.isUndefined(r.chown), d = Ke.default.isUndefined(r.mode);
    if (c || d) {
      const h = se.default.statSyncAttempt(e);
      h && (r = { ...r }, c && (r.chown = { uid: h.uid, gid: h.gid }), d && (r.mode = h.mode));
    }
    const u = Yc.dirname(e);
    se.default.mkdirSyncAttempt(u, {
      mode: Pe.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), l = se.default.openSyncRetry(s)(o, "w", r.mode || Pe.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(o), Ke.default.isString(t) ? se.default.writeSyncRetry(s)(l, t, 0, r.encoding || Pe.DEFAULT_ENCODING) : Ke.default.isUndefined(t) || se.default.writeSyncRetry(s)(l, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? se.default.fsyncSyncRetry(s)(l) : se.default.fsyncAttempt(l)), se.default.closeSyncRetry(s)(l), l = null, r.chown && se.default.chownSyncAttempt(o, r.chown.uid, r.chown.gid), r.mode && se.default.chmodSyncAttempt(o, r.mode);
    try {
      se.default.renameSyncRetry(s)(o, e);
    } catch (h) {
      if (h.code !== "ENAMETOOLONG")
        throw h;
      se.default.renameSyncRetry(s)(o, Ot.default.truncate(e));
    }
    a(), o = null;
  } finally {
    l && se.default.closeSyncAttempt(l), o && Ot.default.purge(o);
  }
};
ct.writeFileSync = tl;
var Ks = { exports: {} }, rl = {}, et = {}, Pr = {}, an = {}, te = {}, nn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
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
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((N, O) => `${N}${O}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((N, O) => (O instanceof r && (N[O.str] = (N[O.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...E) {
    const N = [p[0]];
    let O = 0;
    for (; O < E.length; )
      l(N, E[O]), N.push(p[++O]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function o(p, ...E) {
    const N = [g(p[0])];
    let O = 0;
    for (; O < E.length; )
      N.push(a), l(N, E[O]), N.push(a, g(p[++O]));
    return c(N), new n(N);
  }
  e.str = o;
  function l(p, E) {
    E instanceof n ? p.push(...E._items) : E instanceof r ? p.push(E) : p.push(h(E));
  }
  e.addCodeArg = l;
  function c(p) {
    let E = 1;
    for (; E < p.length - 1; ) {
      if (p[E] === a) {
        const N = d(p[E - 1], p[E + 1]);
        if (N !== void 0) {
          p.splice(E - 1, 3, N);
          continue;
        }
        p[E++] = "+";
      }
      E++;
    }
  }
  function d(p, E) {
    if (E === '""')
      return p;
    if (p === '""')
      return E;
    if (typeof p == "string")
      return E instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${p.slice(0, -1)}${E}"` : E[0] === '"' ? p.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(p instanceof r))
      return `"${p}${E.slice(1)}`;
  }
  function u(p, E) {
    return E.emptyStr() ? p : p.emptyStr() ? E : o`${p}${E}`;
  }
  e.strConcat = u;
  function h(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : g(Array.isArray(p) ? p.join(",") : p);
  }
  function b(p) {
    return new n(g(p));
  }
  e.stringify = b;
  function g(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = g;
  function v(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = v;
  function _(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = _;
  function $(p) {
    return new n(p.toString());
  }
  e.regexpCode = $;
})(nn);
var Gs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = nn;
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
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, h;
      if (!((h = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const o = (0, t._)`\n`;
  class l extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, u) {
      var h;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const b = this.toName(d), { prefix: g } = b, v = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let _ = this._values[g];
      if (_) {
        const E = _.get(v);
        if (E)
          return E;
      } else
        _ = this._values[g] = /* @__PURE__ */ new Map();
      _.set(v, b);
      const $ = this._scope[g] || (this._scope[g] = []), p = $.length;
      return $[p] = u.ref, b.setValue(u, { property: g, itemIndex: p }), b;
    }
    getValue(d, u) {
      const h = this._values[d];
      if (h)
        return h.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, h) {
      return this._reduceValues(d, (b) => {
        if (b.value === void 0)
          throw new Error(`CodeGen: name "${b}" has no value`);
        return b.value.code;
      }, u, h);
    }
    _reduceValues(d, u, h = {}, b) {
      let g = t.nil;
      for (const v in d) {
        const _ = d[v];
        if (!_)
          continue;
        const $ = h[v] = h[v] || /* @__PURE__ */ new Map();
        _.forEach((p) => {
          if ($.has(p))
            return;
          $.set(p, n.Started);
          let E = u(p);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            g = (0, t._)`${g}${N} ${p} = ${E};${this.opts._n}`;
          } else if (E = b == null ? void 0 : b(p))
            g = (0, t._)`${g}${E}${this.opts._n}`;
          else
            throw new r(p);
          $.set(p, n.Completed);
        });
      }
      return g;
    }
  }
  e.ValueScope = l;
})(Gs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = nn, r = Gs;
  var n = nn;
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
  var s = Gs;
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
    optimizeNames(i, f) {
      return this;
    }
  }
  class o extends a {
    constructor(i, f, P) {
      super(), this.varKind = i, this.name = f, this.rhs = P;
    }
    render({ es5: i, _n: f }) {
      const P = i ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${j};` + f;
    }
    optimizeNames(i, f) {
      if (i[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, i, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends a {
    constructor(i, f, P) {
      super(), this.lhs = i, this.rhs = f, this.sideEffects = P;
    }
    render({ _n: i }) {
      return `${this.lhs} = ${this.rhs};` + i;
    }
    optimizeNames(i, f) {
      if (!(this.lhs instanceof t.Name && !i[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, i, f), this;
    }
    get names() {
      const i = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(i, this.rhs);
    }
  }
  class c extends l {
    constructor(i, f, P, j) {
      super(i, P, j), this.op = f;
    }
    render({ _n: i }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + i;
    }
  }
  class d extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `${this.label}:` + i;
    }
  }
  class u extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `break${this.label ? ` ${this.label}` : ""};` + i;
    }
  }
  class h extends a {
    constructor(i) {
      super(), this.error = i;
    }
    render({ _n: i }) {
      return `throw ${this.error};` + i;
    }
    get names() {
      return this.error.names;
    }
  }
  class b extends a {
    constructor(i) {
      super(), this.code = i;
    }
    render({ _n: i }) {
      return `${this.code};` + i;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(i, f) {
      return this.code = C(this.code, i, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class g extends a {
    constructor(i = []) {
      super(), this.nodes = i;
    }
    render(i) {
      return this.nodes.reduce((f, P) => f + P.render(i), "");
    }
    optimizeNodes() {
      const { nodes: i } = this;
      let f = i.length;
      for (; f--; ) {
        const P = i[f].optimizeNodes();
        Array.isArray(P) ? i.splice(f, 1, ...P) : P ? i[f] = P : i.splice(f, 1);
      }
      return i.length > 0 ? this : void 0;
    }
    optimizeNames(i, f) {
      const { nodes: P } = this;
      let j = P.length;
      for (; j--; ) {
        const A = P[j];
        A.optimizeNames(i, f) || (k(i, A.names), P.splice(j, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((i, f) => Q(i, f.names), {});
    }
  }
  class v extends g {
    render(i) {
      return "{" + i._n + super.render(i) + "}" + i._n;
    }
  }
  class _ extends g {
  }
  class $ extends v {
  }
  $.kind = "else";
  class p extends v {
    constructor(i, f) {
      super(f), this.condition = i;
    }
    render(i) {
      let f = `if(${this.condition})` + super.render(i);
      return this.else && (f += "else " + this.else.render(i)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const i = this.condition;
      if (i === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const P = f.optimizeNodes();
        f = this.else = Array.isArray(P) ? new $(P) : P;
      }
      if (f)
        return i === !1 ? f instanceof p ? f : f.nodes : this.nodes.length ? this : new p(U(i), f instanceof p ? [f] : f.nodes);
      if (!(i === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(i, f) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(i, f), !!(super.optimizeNames(i, f) || this.else))
        return this.condition = C(this.condition, i, f), this;
    }
    get names() {
      const i = super.names;
      return de(i, this.condition), this.else && Q(i, this.else.names), i;
    }
  }
  p.kind = "if";
  class E extends v {
  }
  E.kind = "for";
  class N extends E {
    constructor(i) {
      super(), this.iteration = i;
    }
    render(i) {
      return `for(${this.iteration})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iteration = C(this.iteration, i, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class O extends E {
    constructor(i, f, P, j) {
      super(), this.varKind = i, this.name = f, this.from = P, this.to = j;
    }
    render(i) {
      const f = i.es5 ? r.varKinds.var : this.varKind, { name: P, from: j, to: A } = this;
      return `for(${f} ${P}=${j}; ${P}<${A}; ${P}++)` + super.render(i);
    }
    get names() {
      const i = de(super.names, this.from);
      return de(i, this.to);
    }
  }
  class I extends E {
    constructor(i, f, P, j) {
      super(), this.loop = i, this.varKind = f, this.name = P, this.iterable = j;
    }
    render(i) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iterable = C(this.iterable, i, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends v {
    constructor(i, f, P) {
      super(), this.name = i, this.args = f, this.async = P;
    }
    render(i) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(i);
    }
  }
  z.kind = "func";
  class B extends g {
    render(i) {
      return "return " + super.render(i);
    }
  }
  B.kind = "return";
  class ue extends v {
    render(i) {
      let f = "try" + super.render(i);
      return this.catch && (f += this.catch.render(i)), this.finally && (f += this.finally.render(i)), f;
    }
    optimizeNodes() {
      var i, f;
      return super.optimizeNodes(), (i = this.catch) === null || i === void 0 || i.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(i, f) {
      var P, j;
      return super.optimizeNames(i, f), (P = this.catch) === null || P === void 0 || P.optimizeNames(i, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(i, f), this;
    }
    get names() {
      const i = super.names;
      return this.catch && Q(i, this.catch.names), this.finally && Q(i, this.finally.names), i;
    }
  }
  class V extends v {
    constructor(i) {
      super(), this.error = i;
    }
    render(i) {
      return `catch(${this.error})` + super.render(i);
    }
  }
  V.kind = "catch";
  class H extends v {
    render(i) {
      return "finally" + super.render(i);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(i, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = i, this._scope = new r.Scope({ parent: i }), this._nodes = [new _()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(i) {
      return this._scope.name(i);
    }
    // reserves unique name in the external scope
    scopeName(i) {
      return this._extScope.name(i);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(i, f) {
      const P = this._extScope.value(i, f);
      return (this._values[P.prefix] || (this._values[P.prefix] = /* @__PURE__ */ new Set())).add(P), P;
    }
    getScopeValue(i, f) {
      return this._extScope.getValue(i, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(i) {
      return this._extScope.scopeRefs(i, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(i, f, P, j) {
      const A = this._scope.toName(f);
      return P !== void 0 && j && (this._constants[A.str] = P), this._leafNode(new o(i, A, P)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(i, f, P) {
      return this._def(r.varKinds.const, i, f, P);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(i, f, P) {
      return this._def(r.varKinds.let, i, f, P);
    }
    // `var` declaration with optional assignment
    var(i, f, P) {
      return this._def(r.varKinds.var, i, f, P);
    }
    // assignment code
    assign(i, f, P) {
      return this._leafNode(new l(i, f, P));
    }
    // `+=` code
    add(i, f) {
      return this._leafNode(new c(i, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(i) {
      return typeof i == "function" ? i() : i !== t.nil && this._leafNode(new b(i)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...i) {
      const f = ["{"];
      for (const [P, j] of i)
        f.length > 1 && f.push(","), f.push(P), (P !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(i, f, P) {
      if (this._blockNode(new p(i)), f && P)
        this.code(f).else().code(P).endIf();
      else if (f)
        this.code(f).endIf();
      else if (P)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(i) {
      return this._elseNode(new p(i));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new $());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, $);
    }
    _for(i, f) {
      return this._blockNode(i), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(i, f) {
      return this._for(new N(i), f);
    }
    // `for` statement for a range of values
    forRange(i, f, P, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(i);
      return this._for(new O(A, q, f, P), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, f, P, j = r.varKinds.const) {
      const A = this._scope.toName(i);
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
    forIn(i, f, P, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(i, (0, t._)`Object.keys(${f})`, P);
      const A = this._scope.toName(i);
      return this._for(new I("in", j, A, f), () => P(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(i) {
      return this._leafNode(new d(i));
    }
    // `break` statement
    break(i) {
      return this._leafNode(new u(i));
    }
    // `return` statement
    return(i) {
      const f = new B();
      if (this._blockNode(f), this.code(i), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(B);
    }
    // `try` statement
    try(i, f, P) {
      if (!f && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new ue();
      if (this._blockNode(j), this.code(i), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return P && (this._currNode = j.finally = new H(), this.code(P)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(i) {
      return this._leafNode(new h(i));
    }
    // start self-balancing block
    block(i, f) {
      return this._blockStarts.push(this._nodes.length), i && this.code(i).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(i) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const P = this._nodes.length - f;
      if (P < 0 || i !== void 0 && P !== i)
        throw new Error(`CodeGen: wrong number of nodes: ${P} vs ${i} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(i, f = t.nil, P, j) {
      return this._blockNode(new z(i, f, P)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(i = 1) {
      for (; i-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(i) {
      return this._currNode.nodes.push(i), this;
    }
    _blockNode(i) {
      this._currNode.nodes.push(i), this._nodes.push(i);
    }
    _endBlockNode(i, f) {
      const P = this._currNode;
      if (P instanceof i || f && P instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${i.kind}/${f.kind}` : i.kind}"`);
    }
    _elseNode(i) {
      const f = this._currNode;
      if (!(f instanceof p))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = i, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const i = this._nodes;
      return i[i.length - 1];
    }
    set _currNode(i) {
      const f = this._nodes;
      f[f.length - 1] = i;
    }
  }
  e.CodeGen = ne;
  function Q(y, i) {
    for (const f in i)
      y[f] = (y[f] || 0) + (i[f] || 0);
    return y;
  }
  function de(y, i) {
    return i instanceof t._CodeOrName ? Q(y, i.names) : y;
  }
  function C(y, i, f) {
    if (y instanceof t.Name)
      return P(y);
    if (!j(y))
      return y;
    return new t._Code(y._items.reduce((A, q) => (q instanceof t.Name && (q = P(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function P(A) {
      const q = f[A.str];
      return q === void 0 || i[A.str] !== 1 ? A : (delete i[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && i[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k(y, i) {
    for (const f in i)
      y[f] = (y[f] || 0) - (i[f] || 0);
  }
  function U(y) {
    return typeof y == "boolean" || typeof y == "number" || y === null ? !y : (0, t._)`!${S(y)}`;
  }
  e.not = U;
  const D = m(e.operators.AND);
  function T(...y) {
    return y.reduce(D);
  }
  e.and = T;
  const R = m(e.operators.OR);
  function w(...y) {
    return y.reduce(R);
  }
  e.or = w;
  function m(y) {
    return (i, f) => i === t.nil ? f : f === t.nil ? i : (0, t._)`${S(i)} ${y} ${S(f)}`;
  }
  function S(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(te);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ie = te, ff = nn;
function hf(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = hf;
function pf(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (nl(e, t), !sl(t, e.self.RULES.all));
}
M.alwaysValidSchema = pf;
function nl(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || il(e, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = nl;
function sl(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = sl;
function mf(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = mf;
function yf({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ie._)`${r}`;
  }
  return (0, ie._)`${e}${t}${(0, ie.getProperty)(n)}`;
}
M.schemaRefOrVal = yf;
function $f(e) {
  return al(decodeURIComponent(e));
}
M.unescapeFragment = $f;
function gf(e) {
  return encodeURIComponent(Sa(e));
}
M.escapeFragment = gf;
function Sa(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = Sa;
function al(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = al;
function _f(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = _f;
function $i({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, o, l) => {
    const c = o === void 0 ? a : o instanceof ie.Name ? (a instanceof ie.Name ? e(s, a, o) : t(s, a, o), o) : a instanceof ie.Name ? (t(s, o, a), a) : r(a, o);
    return l === ie.Name && !(c instanceof ie.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: $i({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ie._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ie._)`${r} || {}`).code((0, ie._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ie._)`${r} || {}`), ba(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: ol
  }),
  items: $i({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ie._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ie._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function ol(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ie._)`{}`);
  return t !== void 0 && ba(e, r, t), r;
}
M.evaluatedPropsToName = ol;
function ba(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ie._)`${t}${(0, ie.getProperty)(n)}`, !0));
}
M.setEvaluated = ba;
const gi = {};
function vf(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: gi[t.code] || (gi[t.code] = new ff._Code(t.code))
  });
}
M.useFunc = vf;
var Hs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Hs || (M.Type = Hs = {}));
function wf(e, t, r) {
  if (e instanceof ie.Name) {
    const n = t === Hs.Num;
    return r ? n ? (0, ie._)`"[" + ${e} + "]"` : (0, ie._)`"['" + ${e} + "']"` : n ? (0, ie._)`"/" + ${e}` : (0, ie._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ie.getProperty)(e).toString() : "/" + Sa(e);
}
M.getErrorPath = wf;
function il(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = il;
var ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
const Oe = te, Ef = {
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
ht.default = Ef;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = M, n = ht;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: p }) => p ? (0, t.str)`"${$}" keyword must be ${p} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, p = e.keywordError, E, N) {
    const { it: O } = $, { gen: I, compositeRule: z, allErrors: B } = O, ue = h($, p, E);
    N ?? (z || B) ? c(I, ue) : d(O, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, p = e.keywordError, E) {
    const { it: N } = $, { gen: O, compositeRule: I, allErrors: z } = N, B = h($, p, E);
    c(O, B), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function o($, p) {
    $.assign(n.default.errors, p), $.if((0, t._)`${n.default.vErrors} !== null`, () => $.if(p, () => $.assign((0, t._)`${n.default.vErrors}.length`, p), () => $.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function l({ gen: $, keyword: p, schemaValue: E, data: N, errsCount: O, it: I }) {
    if (O === void 0)
      throw new Error("ajv implementation error");
    const z = $.name("err");
    $.forRange("i", O, n.default.errors, (B) => {
      $.const(z, (0, t._)`${n.default.vErrors}[${B}]`), $.if((0, t._)`${z}.instancePath === undefined`, () => $.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), $.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && ($.assign((0, t._)`${z}.schema`, E), $.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = l;
  function c($, p) {
    const E = $.const("err", p);
    $.if((0, t._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), $.code((0, t._)`${n.default.errors}++`);
  }
  function d($, p) {
    const { gen: E, validateName: N, schemaEnv: O } = $;
    O.$async ? E.throw((0, t._)`new ${$.ValidationError}(${p})`) : (E.assign((0, t._)`${N}.errors`, p), E.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function h($, p, E) {
    const { createErrors: N } = $.it;
    return N === !1 ? (0, t._)`{}` : b($, p, E);
  }
  function b($, p, E = {}) {
    const { gen: N, it: O } = $, I = [
      g(O, E),
      v($, E)
    ];
    return _($, p, I), N.object(...I);
  }
  function g({ errorPath: $ }, { instancePath: p }) {
    const E = p ? (0, t.str)`${$}${(0, r.getErrorPath)(p, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function v({ keyword: $, it: { errSchemaPath: p } }, { schemaPath: E, parentSchema: N }) {
    let O = N ? p : (0, t.str)`${p}/${$}`;
    return E && (O = (0, t.str)`${O}${(0, r.getErrorPath)(E, r.Type.Str)}`), [u.schemaPath, O];
  }
  function _($, { params: p, message: E }, N) {
    const { keyword: O, data: I, schemaValue: z, it: B } = $, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = B;
    N.push([u.keyword, O], [u.params, typeof p == "function" ? p($) : p || (0, t._)`{}`]), ue.messages && N.push([u.message, typeof E == "function" ? E($) : E]), ue.verbose && N.push([u.schema, z], [u.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([u.propertyName, V]);
  }
})(an);
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.boolOrEmptySchema = Pr.topBoolOrEmptySchema = void 0;
const Sf = an, bf = te, Pf = ht, Nf = {
  message: "boolean schema is false"
};
function Tf(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? cl(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(Pf.default.data) : (t.assign((0, bf._)`${n}.errors`, null), t.return(!0));
}
Pr.topBoolOrEmptySchema = Tf;
function Of(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), cl(e)) : r.var(t, !0);
}
Pr.boolOrEmptySchema = Of;
function cl(e, t) {
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
  (0, Sf.reportError)(s, Nf, void 0, t);
}
var _e = {}, sr = {};
Object.defineProperty(sr, "__esModule", { value: !0 });
sr.getRules = sr.isJSONType = void 0;
const Rf = ["string", "number", "integer", "boolean", "null", "object", "array"], If = new Set(Rf);
function jf(e) {
  return typeof e == "string" && If.has(e);
}
sr.isJSONType = jf;
function Af() {
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
sr.getRules = Af;
var yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.shouldUseRule = yt.shouldUseGroup = yt.schemaHasRulesForType = void 0;
function kf({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && ll(e, n);
}
yt.schemaHasRulesForType = kf;
function ll(e, t) {
  return t.rules.some((r) => ul(e, r));
}
yt.shouldUseGroup = ll;
function ul(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
yt.shouldUseRule = ul;
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.reportTypeError = _e.checkDataTypes = _e.checkDataType = _e.coerceAndCheckDataType = _e.getJSONTypes = _e.getSchemaTypes = _e.DataType = void 0;
const Cf = sr, Df = yt, Mf = an, W = te, dl = M;
var $r;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})($r || (_e.DataType = $r = {}));
function Lf(e) {
  const t = fl(e.type);
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
_e.getSchemaTypes = Lf;
function fl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Cf.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
_e.getJSONTypes = fl;
function Ff(e, t) {
  const { gen: r, data: n, opts: s } = e, a = Vf(t, s.coerceTypes), o = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, Df.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const l = Pa(t, n, s.strictNumbers, $r.Wrong);
    r.if(l, () => {
      a.length ? Uf(e, t, a) : Na(e);
    });
  }
  return o;
}
_e.coerceAndCheckDataType = Ff;
const hl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Vf(e, t) {
  return t ? e.filter((r) => hl.has(r) || t === "array" && r === "array") : [];
}
function Uf(e, t, r) {
  const { gen: n, data: s, opts: a } = e, o = n.let("dataType", (0, W._)`typeof ${s}`), l = n.let("coerced", (0, W._)`undefined`);
  a.coerceTypes === "array" && n.if((0, W._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, W._)`${s}[0]`).assign(o, (0, W._)`typeof ${s}`).if(Pa(t, s, a.strictNumbers), () => n.assign(l, s))), n.if((0, W._)`${l} !== undefined`);
  for (const d of r)
    (hl.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), Na(e), n.endIf(), n.if((0, W._)`${l} !== undefined`, () => {
    n.assign(s, l), zf(e, l);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, W._)`${o} == "number" || ${o} == "boolean"`).assign(l, (0, W._)`"" + ${s}`).elseIf((0, W._)`${s} === null`).assign(l, (0, W._)`""`);
        return;
      case "number":
        n.elseIf((0, W._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, W._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, W._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, W._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, W._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, W._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, W._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, W._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(l, (0, W._)`[${s}]`);
    }
  }
}
function zf({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, W._)`${t} !== undefined`, () => e.assign((0, W._)`${t}[${r}]`, n));
}
function Bs(e, t, r, n = $r.Correct) {
  const s = n === $r.Correct ? W.operators.EQ : W.operators.NEQ;
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
      a = o((0, W._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = o();
      break;
    default:
      return (0, W._)`typeof ${t} ${s} ${e}`;
  }
  return n === $r.Correct ? a : (0, W.not)(a);
  function o(l = W.nil) {
    return (0, W.and)((0, W._)`typeof ${t} == "number"`, l, r ? (0, W._)`isFinite(${t})` : W.nil);
  }
}
_e.checkDataType = Bs;
function Pa(e, t, r, n) {
  if (e.length === 1)
    return Bs(e[0], t, r, n);
  let s;
  const a = (0, dl.toHash)(e);
  if (a.array && a.object) {
    const o = (0, W._)`typeof ${t} != "object"`;
    s = a.null ? o : (0, W._)`!${t} || ${o}`, delete a.null, delete a.array, delete a.object;
  } else
    s = W.nil;
  a.number && delete a.integer;
  for (const o in a)
    s = (0, W.and)(s, Bs(o, t, r, n));
  return s;
}
_e.checkDataTypes = Pa;
const qf = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, W._)`{type: ${e}}` : (0, W._)`{type: ${t}}`
};
function Na(e) {
  const t = Kf(e);
  (0, Mf.reportError)(t, qf);
}
_e.reportTypeError = Na;
function Kf(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, dl.schemaRefOrVal)(e, n, "type");
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
var as = {};
Object.defineProperty(as, "__esModule", { value: !0 });
as.assignDefaults = void 0;
const lr = te, Gf = M;
function Hf(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      _i(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => _i(e, a, s.default));
}
as.assignDefaults = Hf;
function _i(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: o } = e;
  if (r === void 0)
    return;
  const l = (0, lr._)`${a}${(0, lr.getProperty)(t)}`;
  if (s) {
    (0, Gf.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, lr._)`${l} === undefined`;
  o.useDefaults === "empty" && (c = (0, lr._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, lr._)`${l} = ${(0, lr.stringify)(r)}`);
}
var lt = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const fe = te, Ta = M, wt = ht, Bf = M;
function Jf(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(Ra(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, fe._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = Jf;
function Xf({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, fe.or)(...n.map((a) => (0, fe.and)(Ra(e, t, a, r.ownProperties), (0, fe._)`${s} = ${a}`)));
}
x.checkMissingProp = Xf;
function Wf(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = Wf;
function pl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, fe._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = pl;
function Oa(e, t, r) {
  return (0, fe._)`${pl(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = Oa;
function Yf(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} !== undefined`;
  return n ? (0, fe._)`${s} && ${Oa(e, t, r)}` : s;
}
x.propertyInData = Yf;
function Ra(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} === undefined`;
  return n ? (0, fe.or)(s, (0, fe.not)(Oa(e, t, r))) : s;
}
x.noPropertyInData = Ra;
function ml(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = ml;
function Qf(e, t) {
  return ml(t).filter((r) => !(0, Ta.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = Qf;
function Zf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: o }, l, c, d) {
  const u = d ? (0, fe._)`${e}, ${t}, ${n}${s}` : t, h = [
    [wt.default.instancePath, (0, fe.strConcat)(wt.default.instancePath, a)],
    [wt.default.parentData, o.parentData],
    [wt.default.parentDataProperty, o.parentDataProperty],
    [wt.default.rootData, wt.default.rootData]
  ];
  o.opts.dynamicRef && h.push([wt.default.dynamicAnchors, wt.default.dynamicAnchors]);
  const b = (0, fe._)`${u}, ${r.object(...h)}`;
  return c !== fe.nil ? (0, fe._)`${l}.call(${c}, ${b})` : (0, fe._)`${l}(${b})`;
}
x.callValidateCode = Zf;
const xf = (0, fe._)`new RegExp`;
function eh({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, fe._)`${s.code === "new RegExp" ? xf : (0, Bf.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = eh;
function th(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return o(() => t.assign(l, !1)), l;
  }
  return t.var(a, !0), o(() => t.break()), a;
  function o(l) {
    const c = t.const("len", (0, fe._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: Ta.Type.Num
      }, a), t.if((0, fe.not)(a), l);
    });
  }
}
x.validateArray = th;
function rh(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, Ta.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const o = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, l);
    t.assign(o, (0, fe._)`${o} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, fe.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
x.validateUnion = rh;
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.validateKeywordUsage = lt.validSchemaType = lt.funcKeywordCode = lt.macroKeywordCode = void 0;
const ke = te, Qt = ht, nh = x, sh = an;
function ah(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: o } = e, l = t.macro.call(o.self, s, a, o), c = yl(r, n, l);
  o.opts.validateSchema !== !1 && o.self.validateSchema(l, !0);
  const d = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: ke.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
lt.macroKeywordCode = ah;
function oh(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: o, $data: l, it: c } = e;
  ch(c, t);
  const d = !l && t.compile ? t.compile.call(c.self, a, o, c) : t.validate, u = yl(n, s, d), h = n.let("valid");
  e.block$data(h, b), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function b() {
    if (t.errors === !1)
      _(), t.modifying && vi(e), $(() => e.error());
    else {
      const p = t.async ? g() : v();
      t.modifying && vi(e), $(() => ih(e, p));
    }
  }
  function g() {
    const p = n.let("ruleErrs", null);
    return n.try(() => _((0, ke._)`await `), (E) => n.assign(h, !1).if((0, ke._)`${E} instanceof ${c.ValidationError}`, () => n.assign(p, (0, ke._)`${E}.errors`), () => n.throw(E))), p;
  }
  function v() {
    const p = (0, ke._)`${u}.errors`;
    return n.assign(p, null), _(ke.nil), p;
  }
  function _(p = t.async ? (0, ke._)`await ` : ke.nil) {
    const E = c.opts.passContext ? Qt.default.this : Qt.default.self, N = !("compile" in t && !l || t.schema === !1);
    n.assign(h, (0, ke._)`${p}${(0, nh.callValidateCode)(e, u, E, N)}`, t.modifying);
  }
  function $(p) {
    var E;
    n.if((0, ke.not)((E = t.valid) !== null && E !== void 0 ? E : h), p);
  }
}
lt.funcKeywordCode = oh;
function vi(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, ke._)`${n.parentData}[${n.parentDataProperty}]`));
}
function ih(e, t) {
  const { gen: r } = e;
  r.if((0, ke._)`Array.isArray(${t})`, () => {
    r.assign(Qt.default.vErrors, (0, ke._)`${Qt.default.vErrors} === null ? ${t} : ${Qt.default.vErrors}.concat(${t})`).assign(Qt.default.errors, (0, ke._)`${Qt.default.vErrors}.length`), (0, sh.extendErrors)(e);
  }, () => e.error());
}
function ch({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function yl(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, ke.stringify)(r) });
}
function lh(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
lt.validSchemaType = lh;
function uh({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const o = s.dependencies;
  if (o != null && o.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
lt.validateKeywordUsage = uh;
var jt = {};
Object.defineProperty(jt, "__esModule", { value: !0 });
jt.extendSubschemaMode = jt.extendSubschemaData = jt.getSubschema = void 0;
const ot = te, $l = M;
function dh(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, ot._)`${e.schemaPath}${(0, ot.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, ot._)`${e.schemaPath}${(0, ot.getProperty)(t)}${(0, ot.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, $l.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: o,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
jt.getSubschema = dh;
function fh(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: o }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: h } = t, b = l.let("data", (0, ot._)`${t.data}${(0, ot.getProperty)(r)}`, !0);
    c(b), e.errorPath = (0, ot.str)`${d}${(0, $l.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, ot._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof ot.Name ? s : l.let("data", s, !0);
    c(d), o !== void 0 && (e.propertyName = o);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
jt.extendSubschemaData = fh;
function hh(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
jt.extendSubschemaMode = hh;
var Ne = {}, os = function e(t, r) {
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
      var o = a[s];
      if (!e(t[o], r[o])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, gl = { exports: {} }, Rt = gl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  kn(t, n, s, e, "", e);
};
Rt.keywords = {
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
Rt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Rt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Rt.skipKeywords = {
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
function kn(e, t, r, n, s, a, o, l, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, o, l, c, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in Rt.arrayKeywords)
          for (var b = 0; b < h.length; b++)
            kn(e, t, r, h[b], s + "/" + u + "/" + b, a, s, u, n, b);
      } else if (u in Rt.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            kn(e, t, r, h[g], s + "/" + u + "/" + ph(g), a, s, u, n, g);
      } else (u in Rt.keywords || e.allKeys && !(u in Rt.skipKeywords)) && kn(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, o, l, c, d);
  }
}
function ph(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var mh = gl.exports;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.getSchemaRefs = Ne.resolveUrl = Ne.normalizeId = Ne._getFullPath = Ne.getFullPath = Ne.inlineRef = void 0;
const yh = M, $h = os, gh = mh, _h = /* @__PURE__ */ new Set([
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
function vh(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Js(e) : t ? _l(e) <= t : !1;
}
Ne.inlineRef = vh;
const wh = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Js(e) {
  for (const t in e) {
    if (wh.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Js) || typeof r == "object" && Js(r))
      return !0;
  }
  return !1;
}
function _l(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !_h.has(r) && (typeof e[r] == "object" && (0, yh.eachItem)(e[r], (n) => t += _l(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function vl(e, t = "", r) {
  r !== !1 && (t = gr(t));
  const n = e.parse(t);
  return wl(e, n);
}
Ne.getFullPath = vl;
function wl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ne._getFullPath = wl;
const Eh = /#\/?$/;
function gr(e) {
  return e ? e.replace(Eh, "") : "";
}
Ne.normalizeId = gr;
function Sh(e, t, r) {
  return r = gr(r), e.resolve(t, r);
}
Ne.resolveUrl = Sh;
const bh = /^[a-z_][-a-z0-9._]*$/i;
function Ph(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = gr(e[r] || t), a = { "": s }, o = vl(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return gh(e, { allKeys: !0 }, (h, b, g, v) => {
    if (v === void 0)
      return;
    const _ = o + b;
    let $ = a[v];
    typeof h[r] == "string" && ($ = p.call(this, h[r])), E.call(this, h.$anchor), E.call(this, h.$dynamicAnchor), a[b] = $;
    function p(N) {
      const O = this.opts.uriResolver.resolve;
      if (N = gr($ ? O($, N) : N), c.has(N))
        throw u(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(h, I.schema, N) : N !== gr(_) && (N[0] === "#" ? (d(h, l[N], N), l[N] = h) : this.refs[N] = _), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!bh.test(N))
          throw new Error(`invalid anchor "${N}"`);
        p.call(this, `#${N}`);
      }
    }
  }), l;
  function d(h, b, g) {
    if (b !== void 0 && !$h(h, b))
      throw u(g);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Ne.getSchemaRefs = Ph;
Object.defineProperty(et, "__esModule", { value: !0 });
et.getData = et.KeywordCxt = et.validateFunctionCode = void 0;
const El = Pr, wi = _e, Ia = yt, Bn = _e, Nh = as, Br = lt, Ps = jt, K = te, J = ht, Th = Ne, $t = M, Fr = an;
function Oh(e) {
  if (Pl(e) && (Nl(e), bl(e))) {
    jh(e);
    return;
  }
  Sl(e, () => (0, El.topBoolOrEmptySchema)(e));
}
et.validateFunctionCode = Oh;
function Sl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, K._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${Ei(r, s)}`), Ih(e, s), e.code(a);
  }) : e.func(t, (0, K._)`${J.default.data}, ${Rh(s)}`, n.$async, () => e.code(Ei(r, s)).code(a));
}
function Rh(e) {
  return (0, K._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, K._)`, ${J.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function Ih(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, K._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, K._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, K._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, K._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, K._)`""`), e.var(J.default.parentData, (0, K._)`undefined`), e.var(J.default.parentDataProperty, (0, K._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function jh(e) {
  const { schema: t, opts: r, gen: n } = e;
  Sl(e, () => {
    r.$comment && t.$comment && Ol(e), Mh(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && Ah(e), Tl(e), Vh(e);
  });
}
function Ah(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function Ei(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function kh(e, t) {
  if (Pl(e) && (Nl(e), bl(e))) {
    Ch(e, t);
    return;
  }
  (0, El.boolOrEmptySchema)(e, t);
}
function bl({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Pl(e) {
  return typeof e.schema != "boolean";
}
function Ch(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Ol(e), Lh(e), Fh(e);
  const a = n.const("_errs", J.default.errors);
  Tl(e, a), n.var(t, (0, K._)`${a} === ${J.default.errors}`);
}
function Nl(e) {
  (0, $t.checkUnknownRules)(e), Dh(e);
}
function Tl(e, t) {
  if (e.opts.jtd)
    return Si(e, [], !1, t);
  const r = (0, wi.getSchemaTypes)(e.schema), n = (0, wi.coerceAndCheckDataType)(e, r);
  Si(e, r, !n, t);
}
function Dh(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, $t.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Mh(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, $t.checkStrictMode)(e, "default is ignored in the schema root");
}
function Lh(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Th.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Fh(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Ol({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${J.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const o = (0, K.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${J.default.self}.opts.$comment(${a}, ${o}, ${l}.schema)`);
  }
}
function Vh(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, K._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, K._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, J.default.vErrors), a.unevaluated && Uh(e), t.return((0, K._)`${J.default.errors} === 0`));
}
function Uh({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function Si(e, t, r, n) {
  const { gen: s, schema: a, data: o, allErrors: l, opts: c, self: d } = e, { RULES: u } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, $t.schemaHasRulesButRef)(a, u))) {
    s.block(() => jl(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || zh(e, t), s.block(() => {
    for (const b of u.rules)
      h(b);
    h(u.post);
  });
  function h(b) {
    (0, Ia.shouldUseGroup)(a, b) && (b.type ? (s.if((0, Bn.checkDataType)(b.type, o, c.strictNumbers)), bi(e, b), t.length === 1 && t[0] === b.type && r && (s.else(), (0, Bn.reportTypeError)(e)), s.endIf()) : bi(e, b), l || s.if((0, K._)`${J.default.errors} === ${n || 0}`));
  }
}
function bi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Nh.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, Ia.shouldUseRule)(n, a) && jl(e, a.keyword, a.definition, t.type);
  });
}
function zh(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (qh(e, t), e.opts.allowUnionTypes || Kh(e, t), Gh(e, e.dataTypes));
}
function qh(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Rl(e.dataTypes, r) || ja(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Bh(e, t);
  }
}
function Kh(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && ja(e, "use allowUnionTypes to allow union type keyword");
}
function Gh(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Ia.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((o) => Hh(t, o)) && ja(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function Hh(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Rl(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Bh(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Rl(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function ja(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, $t.checkStrictMode)(e, t, e.opts.strictTypes);
}
let Il = class {
  constructor(t, r, n) {
    if ((0, Br.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, $t.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Al(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Br.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Fr.reportExtraError : Fr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Fr.reportError)(this, this.def.$dataError || Fr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Fr.resetErrorsCount)(this.gen, this.errsCount);
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
    const { gen: n, schemaCode: s, schemaType: a, def: o } = this;
    n.if((0, K.or)((0, K._)`${s} === undefined`, r)), t !== K.nil && n.assign(t, !0), (a.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== K.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, K.or)(o(), l());
    function o() {
      if (n.length) {
        if (!(r instanceof K.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, K._)`${(0, Bn.checkDataTypes)(c, r, a.opts.strictNumbers, Bn.DataType.Wrong)}`;
      }
      return K.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, K._)`!${c}(${r})`;
      }
      return K.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Ps.getSubschema)(this.it, t);
    (0, Ps.extendSubschemaData)(n, this.it, t), (0, Ps.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return kh(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = $t.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = $t.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
};
et.KeywordCxt = Il;
function jl(e, t, r, n) {
  const s = new Il(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Br.funcKeywordCode)(s, r) : "macro" in r ? (0, Br.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Br.funcKeywordCode)(s, r);
}
const Jh = /^\/(?:[^~]|~0|~1)*$/, Xh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Al(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!Jh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = J.default.rootData;
  } else {
    const d = Xh.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (a = r[t - u], !s)
      return a;
  }
  let o = a;
  const l = s.split("/");
  for (const d of l)
    d && (a = (0, K._)`${a}${(0, K.getProperty)((0, $t.unescapeJsonPointer)(d))}`, o = (0, K._)`${o} && ${a}`);
  return o;
  function c(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
et.getData = Al;
var on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
let Wh = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
on.default = Wh;
var Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
const Ns = Ne;
let Yh = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Ns.resolveUrl)(t, r, n), this.missingSchema = (0, Ns.normalizeId)((0, Ns.getFullPath)(t, this.missingRef));
  }
};
Rr.default = Yh;
var Ve = {};
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.resolveSchema = Ve.getCompilingSchema = Ve.resolveRef = Ve.compileSchema = Ve.SchemaEnv = void 0;
const Je = te, Qh = on, Xt = ht, Ze = Ne, Pi = M, Zh = et;
let is = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Ze.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Ve.SchemaEnv = is;
function Aa(e) {
  const t = kl.call(this, e);
  if (t)
    return t;
  const r = (0, Ze.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, o = new Je.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let l;
  e.$async && (l = o.scopeValue("Error", {
    ref: Qh.default,
    code: (0, Je._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Xt.default.data,
    parentData: Xt.default.parentData,
    parentDataProperty: Xt.default.parentDataProperty,
    dataNames: [Xt.default.data],
    dataPathArr: [Je.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Je.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
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
  let u;
  try {
    this._compilations.add(e), (0, Zh.validateFunctionCode)(d), o.optimize(this.opts.code.optimize);
    const h = o.toString();
    u = `${o.scopeRefs(Xt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const g = new Function(`${Xt.default.self}`, `${Xt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: g }), g.errors = null, g.schema = e.schema, g.schemaEnv = e, e.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: c, validateCode: h, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: v, items: _ } = d;
      g.evaluated = {
        props: v instanceof Je.Name ? void 0 : v,
        items: _ instanceof Je.Name ? void 0 : _,
        dynamicProps: v instanceof Je.Name,
        dynamicItems: _ instanceof Je.Name
      }, g.source && (g.source.evaluated = (0, Je.stringify)(g.evaluated));
    }
    return e.validate = g, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
Ve.compileSchema = Aa;
function xh(e, t, r) {
  var n;
  r = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = rp.call(this, e, r);
  if (a === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    o && (a = new is({ schema: o, schemaId: l, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = ep.call(this, a);
}
Ve.resolveRef = xh;
function ep(e) {
  return (0, Ze.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Aa.call(this, e);
}
function kl(e) {
  for (const t of this._compilations)
    if (tp(t, e))
      return t;
}
Ve.getCompilingSchema = kl;
function tp(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function rp(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || cs.call(this, e, t);
}
function cs(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Ze._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Ze.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Ts.call(this, r, e);
  const a = (0, Ze.normalizeId)(n), o = this.refs[a] || this.schemas[a];
  if (typeof o == "string") {
    const l = cs.call(this, e, o);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : Ts.call(this, r, l);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || Aa.call(this, o), a === (0, Ze.normalizeId)(t)) {
      const { schema: l } = o, { schemaId: c } = this.opts, d = l[c];
      return d && (s = (0, Ze.resolveUrl)(this.opts.uriResolver, s, d)), new is({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return Ts.call(this, r, o);
  }
}
Ve.resolveSchema = cs;
const np = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Ts(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Pi.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !np.has(l) && d && (t = (0, Ze.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Pi.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = cs.call(this, n, l);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new is({ schema: r, schemaId: o, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const sp = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", ap = "Meta-schema for $data reference (JSON AnySchema extension proposal)", op = "object", ip = [
  "$data"
], cp = {
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
}, lp = !1, up = {
  $id: sp,
  description: ap,
  type: op,
  required: ip,
  properties: cp,
  additionalProperties: lp
};
var ka = {}, ls = { exports: {} };
const dp = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), Cl = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function Dl(e) {
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
const fp = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Ni(e) {
  return e.length = 0, !0;
}
function hp(e, t, r) {
  if (e.length) {
    const n = Dl(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function pp(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, o = !1, l = hp;
  for (let c = 0; c < e.length; c++) {
    const d = e[c];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (a === !0 && (o = !0), !l(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        c > 0 && e[c - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (d === "%") {
        if (!l(s, n, r))
          break;
        l = Ni;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (l === Ni ? r.zone = s.join("") : o ? n.push(s.join("")) : n.push(Dl(s))), r.address = n.join(""), r;
}
function Ml(e) {
  if (mp(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = pp(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function mp(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function yp(e) {
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
function $p(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function gp(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!Cl(r)) {
      const n = Ml(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Ll = {
  nonSimpleDomain: fp,
  recomposeAuthority: gp,
  normalizeComponentEncoding: $p,
  removeDotSegments: yp,
  isIPv4: Cl,
  isUUID: dp,
  normalizeIPv6: Ml
};
const { isUUID: _p } = Ll, vp = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Fl(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function Vl(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Ul(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function wp(e) {
  return e.secure = Fl(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function Ep(e) {
  if ((e.port === (Fl(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function Sp(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(vp);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = Ca(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function bp(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = Ca(s);
  a && (e = a.serialize(e, t));
  const o = e, l = e.nss;
  return o.path = `${n || t.nid}:${l}`, t.skipEscape = !0, o;
}
function Pp(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !_p(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function Np(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const zl = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: Vl,
    serialize: Ul
  }
), Tp = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: zl.domainHost,
    parse: Vl,
    serialize: Ul
  }
), Cn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: wp,
    serialize: Ep
  }
), Op = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: Cn.domainHost,
    parse: Cn.parse,
    serialize: Cn.serialize
  }
), Rp = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: Sp,
    serialize: bp,
    skipNormalize: !0
  }
), Ip = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: Pp,
    serialize: Np,
    skipNormalize: !0
  }
), Jn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: zl,
    https: Tp,
    ws: Cn,
    wss: Op,
    urn: Rp,
    "urn:uuid": Ip
  }
);
Object.setPrototypeOf(Jn, null);
function Ca(e) {
  return e && (Jn[
    /** @type {SchemeName} */
    e
  ] || Jn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var jp = {
  SCHEMES: Jn,
  getSchemeHandler: Ca
};
const { normalizeIPv6: Ap, removeDotSegments: Kr, recomposeAuthority: kp, normalizeComponentEncoding: yn, isIPv4: Cp, nonSimpleDomain: Dp } = Ll, { SCHEMES: Mp, getSchemeHandler: ql } = jp;
function Lp(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  ut(vt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  vt(ut(e, t), t)), e;
}
function Fp(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = Kl(vt(e, n), vt(t, n), n, !0);
  return n.skipEscape = !0, ut(s, n);
}
function Kl(e, t, r, n) {
  const s = {};
  return n || (e = vt(ut(e, r), r), t = vt(ut(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Kr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Kr(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = Kr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Kr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function Vp(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = ut(yn(vt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = ut(yn(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = ut(yn(vt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = ut(yn(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function ut(e, t) {
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
  }, n = Object.assign({}, t), s = [], a = ql(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const o = kp(r);
  if (o !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(o), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let l = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (l = Kr(l)), o === void 0 && l[0] === "/" && l[1] === "/" && (l = "/%2F" + l.slice(2)), s.push(l);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const Up = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function vt(e, t) {
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
  const a = e.match(Up);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (Cp(n.host) === !1) {
        const c = Ap(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const o = ql(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!o || !o.unicodeSupport) && n.host && (r.domainHost || o && o.domainHost) && s === !1 && Dp(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (l) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + l;
      }
    (!o || o && !o.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), o && o.parse && o.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Da = {
  SCHEMES: Mp,
  normalize: Lp,
  resolve: Fp,
  resolveComponent: Kl,
  equal: Vp,
  serialize: ut,
  parse: vt
};
ls.exports = Da;
ls.exports.default = Da;
ls.exports.fastUri = Da;
var Gl = ls.exports;
Object.defineProperty(ka, "__esModule", { value: !0 });
const Hl = Gl;
Hl.code = 'require("ajv/dist/runtime/uri").default';
ka.default = Hl;
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
  const n = on, s = Rr, a = sr, o = Ve, l = te, c = Ne, d = _e, u = M, h = up, b = ka, g = (w, m) => new RegExp(w, m);
  g.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], _ = /* @__PURE__ */ new Set([
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
  }, E = 200;
  function N(w) {
    var m, S, y, i, f, P, j, A, q, F, re, ze, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut, zt, qt, Kt, Gt, Ht;
    const Be = w.strict, Bt = (m = w.code) === null || m === void 0 ? void 0 : m.optimize, Mr = Bt === !0 || Bt === void 0 ? 1 : Bt || 0, Lr = (y = (S = w.code) === null || S === void 0 ? void 0 : S.regExp) !== null && y !== void 0 ? y : g, bs = (i = w.uriResolver) !== null && i !== void 0 ? i : b.default;
    return {
      strictSchema: (P = (f = w.strictSchema) !== null && f !== void 0 ? f : Be) !== null && P !== void 0 ? P : !0,
      strictNumbers: (A = (j = w.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = w.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (ze = (re = w.strictTuples) !== null && re !== void 0 ? re : Be) !== null && ze !== void 0 ? ze : "log",
      strictRequired: (Ct = (kt = w.strictRequired) !== null && kt !== void 0 ? kt : Be) !== null && Ct !== void 0 ? Ct : !1,
      code: w.code ? { ...w.code, optimize: Mr, regExp: Lr } : { optimize: Mr, regExp: Lr },
      loopRequired: (Dt = w.loopRequired) !== null && Dt !== void 0 ? Dt : E,
      loopEnum: (Mt = w.loopEnum) !== null && Mt !== void 0 ? Mt : E,
      meta: (Lt = w.meta) !== null && Lt !== void 0 ? Lt : !0,
      messages: (Ft = w.messages) !== null && Ft !== void 0 ? Ft : !0,
      inlineRefs: (Vt = w.inlineRefs) !== null && Vt !== void 0 ? Vt : !0,
      schemaId: (Ut = w.schemaId) !== null && Ut !== void 0 ? Ut : "$id",
      addUsedSchema: (zt = w.addUsedSchema) !== null && zt !== void 0 ? zt : !0,
      validateSchema: (qt = w.validateSchema) !== null && qt !== void 0 ? qt : !0,
      validateFormats: (Kt = w.validateFormats) !== null && Kt !== void 0 ? Kt : !0,
      unicodeRegExp: (Gt = w.unicodeRegExp) !== null && Gt !== void 0 ? Gt : !0,
      int32range: (Ht = w.int32range) !== null && Ht !== void 0 ? Ht : !0,
      uriResolver: bs
    };
  }
  class O {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...N(m) };
      const { es5: S, lines: y } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: _, es5: S, lines: y }), this.logger = Q(m.logger);
      const i = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, m, "NOT SUPPORTED"), I.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = H.call(this), m.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && V.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), B.call(this), m.validateFormats = i;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: S, schemaId: y } = this.opts;
      let i = h;
      y === "id" && (i = { ...h }, i.id = i.$id, delete i.$id), S && m && this.addMetaSchema(i, i[y], !1);
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
      const i = y(S);
      return "$async" in y || (this.errors = y.errors), i;
    }
    compile(m, S) {
      const y = this._addSchema(m, S);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(m, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return i.call(this, m, S);
      async function i(F, re) {
        await f.call(this, F.$schema);
        const ze = this._addSchema(F, re);
        return ze.validate || P.call(this, ze);
      }
      async function f(F) {
        F && !this.getSchema(F) && await i.call(this, { $ref: F }, !0);
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
    addSchema(m, S, y, i = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const P of m)
          this.addSchema(P, void 0, y, i);
        return this;
      }
      let f;
      if (typeof m == "object") {
        const { schemaId: P } = this.opts;
        if (f = m[P], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(m, y, S, i, !0), this;
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
      const i = this.validate(y, m);
      if (!i && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return i;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(m) {
      let S;
      for (; typeof (S = z.call(this, m)) == "string"; )
        m = S;
      if (S === void 0) {
        const { schemaId: y } = this.opts, i = new o.SchemaEnv({ schema: {}, schemaId: y });
        if (S = o.resolveSchema.call(this, i, m), !S)
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
        return (0, u.eachItem)(y, (f) => k.call(this, f)), this;
      D.call(this, S);
      const i = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, u.eachItem)(y, i.type.length === 0 ? (f) => k.call(this, f, i) : (f) => i.type.forEach((P) => k.call(this, f, i, P))), this;
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
        const i = y.rules.findIndex((f) => f.keyword === m);
        i >= 0 && y.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[m] = S, this;
    }
    errorsText(m = this.errors, { separator: S = ", ", dataVar: y = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((i) => `${y}${i.instancePath} ${i.message}`).reduce((i, f) => i + S + f);
    }
    $dataMetaSchema(m, S) {
      const y = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const i of S) {
        const f = i.split("/").slice(1);
        let P = m;
        for (const j of f)
          P = P[j];
        for (const j in y) {
          const A = y[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = P[j];
          q && F && (P[j] = R(F));
        }
      }
      return m;
    }
    _removeAllSchemas(m, S) {
      for (const y in m) {
        const i = m[y];
        (!S || S.test(y)) && (typeof i == "string" ? delete m[y] : i && !i.meta && (this._cache.delete(i.schema), delete m[y]));
      }
    }
    _addSchema(m, S, y, i = this.opts.validateSchema, f = this.opts.addUsedSchema) {
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
      return A = new o.SchemaEnv({ schema: m, schemaId: j, meta: S, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), i && this.validateSchema(m, !0), A;
    }
    _checkUnique(m) {
      if (this.schemas[m] || this.refs[m])
        throw new Error(`schema with key or id "${m}" already exists`);
    }
    _compileSchemaEnv(m) {
      if (m.meta ? this._compileMetaSchema(m) : o.compileSchema.call(this, m), !m.validate)
        throw new Error("ajv implementation error");
      return m.validate;
    }
    _compileMetaSchema(m) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, m);
      } finally {
        this.opts = S;
      }
    }
  }
  O.ValidationError = n.default, O.MissingRefError = s.default, e.default = O;
  function I(w, m, S, y = "error") {
    for (const i in w) {
      const f = i;
      f in m && this.logger[y](`${S}: option ${i}. ${w[f]}`);
    }
  }
  function z(w) {
    return w = (0, c.normalizeId)(w), this.schemas[w] || this.refs[w];
  }
  function B() {
    const w = this.opts.schemas;
    if (w)
      if (Array.isArray(w))
        this.addSchema(w);
      else
        for (const m in w)
          this.addSchema(w[m], m);
  }
  function ue() {
    for (const w in this.opts.formats) {
      const m = this.opts.formats[w];
      m && this.addFormat(w, m);
    }
  }
  function V(w) {
    if (Array.isArray(w)) {
      this.addVocabulary(w);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in w) {
      const S = w[m];
      S.keyword || (S.keyword = m), this.addKeyword(S);
    }
  }
  function H() {
    const w = { ...this.opts };
    for (const m of v)
      delete w[m];
    return w;
  }
  const ne = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(w) {
    if (w === !1)
      return ne;
    if (w === void 0)
      return console;
    if (w.log && w.warn && w.error)
      return w;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(w, m) {
    const { RULES: S } = this;
    if ((0, u.eachItem)(w, (y) => {
      if (S.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(w, m, S) {
    var y;
    const i = m == null ? void 0 : m.post;
    if (S && i)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let P = i ? f.post : f.rules.find(({ type: A }) => A === S);
    if (P || (P = { type: S, rules: [] }, f.rules.push(P)), f.keywords[w] = !0, !m)
      return;
    const j = {
      keyword: w,
      definition: {
        ...m,
        type: (0, d.getJSONTypes)(m.type),
        schemaType: (0, d.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? U.call(this, P, j, m.before) : P.rules.push(j), f.all[w] = j, (y = m.implements) === null || y === void 0 || y.forEach((A) => this.addKeyword(A));
  }
  function U(w, m, S) {
    const y = w.rules.findIndex((i) => i.keyword === S);
    y >= 0 ? w.rules.splice(y, 0, m) : (w.rules.push(m), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(w) {
    let { metaSchema: m } = w;
    m !== void 0 && (w.$data && this.opts.$data && (m = R(m)), w.validateSchema = this.compile(m, !0));
  }
  const T = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function R(w) {
    return { anyOf: [w, T] };
  }
})(rl);
var Ma = {}, La = {}, Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const zp = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Fa.default = zp;
var ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.callRef = ar.getValidate = void 0;
const qp = Rr, Ti = x, Le = te, ur = ht, Oi = Ve, $n = M, Kp = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: o, opts: l, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = Oi.resolveRef.call(c, d, s, r);
    if (u === void 0)
      throw new qp.default(n.opts.uriResolver, s, r);
    if (u instanceof Oi.SchemaEnv)
      return b(u);
    return g(u);
    function h() {
      if (a === d)
        return Dn(e, o, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return Dn(e, (0, Le._)`${v}.validate`, d, d.$async);
    }
    function b(v) {
      const _ = Bl(e, v);
      Dn(e, _, v, v.$async);
    }
    function g(v) {
      const _ = t.scopeValue("schema", l.code.source === !0 ? { ref: v, code: (0, Le.stringify)(v) } : { ref: v }), $ = t.name("valid"), p = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Le.nil,
        topSchemaRef: _,
        errSchemaPath: r
      }, $);
      e.mergeEvaluated(p), e.ok($);
    }
  }
};
function Bl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Le._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
ar.getValidate = Bl;
function Dn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: o, schemaEnv: l, opts: c } = a, d = c.passContext ? ur.default.this : Le.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Le._)`await ${(0, Ti.callValidateCode)(e, t, d)}`), g(t), o || s.assign(v, !0);
    }, (_) => {
      s.if((0, Le._)`!(${_} instanceof ${a.ValidationError})`, () => s.throw(_)), b(_), o || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, Ti.callValidateCode)(e, t, d), () => g(t), () => b(t));
  }
  function b(v) {
    const _ = (0, Le._)`${v}.errors`;
    s.assign(ur.default.vErrors, (0, Le._)`${ur.default.vErrors} === null ? ${_} : ${ur.default.vErrors}.concat(${_})`), s.assign(ur.default.errors, (0, Le._)`${ur.default.vErrors}.length`);
  }
  function g(v) {
    var _;
    if (!a.opts.unevaluated)
      return;
    const $ = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = $n.mergeEvaluated.props(s, $.props, a.props));
      else {
        const p = s.var("props", (0, Le._)`${v}.evaluated.props`);
        a.props = $n.mergeEvaluated.props(s, p, a.props, Le.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = $n.mergeEvaluated.items(s, $.items, a.items));
      else {
        const p = s.var("items", (0, Le._)`${v}.evaluated.items`);
        a.items = $n.mergeEvaluated.items(s, p, a.items, Le.Name);
      }
  }
}
ar.callRef = Dn;
ar.default = Kp;
Object.defineProperty(La, "__esModule", { value: !0 });
const Gp = Fa, Hp = ar, Bp = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Gp.default,
  Hp.default
];
La.default = Bp;
var Va = {}, Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const Xn = te, Et = Xn.operators, Wn = {
  maximum: { okStr: "<=", ok: Et.LTE, fail: Et.GT },
  minimum: { okStr: ">=", ok: Et.GTE, fail: Et.LT },
  exclusiveMaximum: { okStr: "<", ok: Et.LT, fail: Et.GTE },
  exclusiveMinimum: { okStr: ">", ok: Et.GT, fail: Et.LTE }
}, Jp = {
  message: ({ keyword: e, schemaCode: t }) => (0, Xn.str)`must be ${Wn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Xn._)`{comparison: ${Wn[e].okStr}, limit: ${t}}`
}, Xp = {
  keyword: Object.keys(Wn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Jp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Xn._)`${r} ${Wn[t].fail} ${n} || isNaN(${r})`);
  }
};
Ua.default = Xp;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const Jr = te, Wp = {
  message: ({ schemaCode: e }) => (0, Jr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Jr._)`{multipleOf: ${e}}`
}, Yp = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Wp,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, o = t.let("res"), l = a ? (0, Jr._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, Jr._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Jr._)`(${n} === 0 || (${o} = ${r}/${n}, ${l}))`);
  }
};
za.default = Yp;
var qa = {}, Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
function Jl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ka.default = Jl;
Jl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(qa, "__esModule", { value: !0 });
const Zt = te, Qp = M, Zp = Ka, xp = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Zt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Zt._)`{limit: ${e}}`
}, em = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: xp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Zt.operators.GT : Zt.operators.LT, o = s.opts.unicode === !1 ? (0, Zt._)`${r}.length` : (0, Zt._)`${(0, Qp.useFunc)(e.gen, Zp.default)}(${r})`;
    e.fail$data((0, Zt._)`${o} ${a} ${n}`);
  }
};
qa.default = em;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const tm = x, Yn = te, rm = {
  message: ({ schemaCode: e }) => (0, Yn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Yn._)`{pattern: ${e}}`
}, nm = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: rm,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, o = a.opts.unicodeRegExp ? "u" : "", l = r ? (0, Yn._)`(new RegExp(${s}, ${o}))` : (0, tm.usePattern)(e, n);
    e.fail$data((0, Yn._)`!${l}.test(${t})`);
  }
};
Ga.default = nm;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const Xr = te, sm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Xr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Xr._)`{limit: ${e}}`
}, am = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: sm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Xr.operators.GT : Xr.operators.LT;
    e.fail$data((0, Xr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Ha.default = am;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const Vr = x, Wr = te, om = M, im = {
  message: ({ params: { missingProperty: e } }) => (0, Wr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Wr._)`{missingProperty: ${e}}`
}, cm = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: im,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: o } = e, { opts: l } = o;
    if (!a && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (o.allErrors ? d() : u(), l.strictRequired) {
      const g = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const _ of r)
        if ((g == null ? void 0 : g[_]) === void 0 && !v.has(_)) {
          const $ = o.schemaEnv.baseId + o.errSchemaPath, p = `required property "${_}" is not defined at "${$}" (strictRequired)`;
          (0, om.checkStrictMode)(o, p, o.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Wr.nil, h);
      else
        for (const g of r)
          (0, Vr.checkReportMissingProp)(e, g);
    }
    function u() {
      const g = t.let("missing");
      if (c || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => b(g, v)), e.ok(v);
      } else
        t.if((0, Vr.checkMissingProp)(e, r, g)), (0, Vr.reportMissingProp)(e, g), t.else();
    }
    function h() {
      t.forOf("prop", n, (g) => {
        e.setParams({ missingProperty: g }), t.if((0, Vr.noPropertyInData)(t, s, g, l.ownProperties), () => e.error());
      });
    }
    function b(g, v) {
      e.setParams({ missingProperty: g }), t.forOf(g, n, () => {
        t.assign(v, (0, Vr.propertyInData)(t, s, g, l.ownProperties)), t.if((0, Wr.not)(v), () => {
          e.error(), t.break();
        });
      }, Wr.nil);
    }
  }
};
Ba.default = cm;
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Yr = te, lm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Yr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Yr._)`{limit: ${e}}`
}, um = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: lm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Yr.operators.GT : Yr.operators.LT;
    e.fail$data((0, Yr._)`${r}.length ${s} ${n}`);
  }
};
Ja.default = um;
var Xa = {}, cn = {};
Object.defineProperty(cn, "__esModule", { value: !0 });
const Xl = os;
Xl.code = 'require("ajv/dist/runtime/equal").default';
cn.default = Xl;
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Os = _e, Ee = te, dm = M, fm = cn, hm = {
  message: ({ params: { i: e, j: t } }) => (0, Ee.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ee._)`{i: ${e}, j: ${t}}`
}, pm = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: hm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: o, it: l } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, Os.getSchemaTypes)(a.items) : [];
    e.block$data(c, u, (0, Ee._)`${o} === false`), e.ok(c);
    function u() {
      const v = t.let("i", (0, Ee._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: v, j: _ }), t.assign(c, !0), t.if((0, Ee._)`${v} > 1`, () => (h() ? b : g)(v, _));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function b(v, _) {
      const $ = t.name("item"), p = (0, Os.checkDataTypes)(d, $, l.opts.strictNumbers, Os.DataType.Wrong), E = t.const("indices", (0, Ee._)`{}`);
      t.for((0, Ee._)`;${v}--;`, () => {
        t.let($, (0, Ee._)`${r}[${v}]`), t.if(p, (0, Ee._)`continue`), d.length > 1 && t.if((0, Ee._)`typeof ${$} == "string"`, (0, Ee._)`${$} += "_"`), t.if((0, Ee._)`typeof ${E}[${$}] == "number"`, () => {
          t.assign(_, (0, Ee._)`${E}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ee._)`${E}[${$}] = ${v}`);
      });
    }
    function g(v, _) {
      const $ = (0, dm.useFunc)(t, fm.default), p = t.name("outer");
      t.label(p).for((0, Ee._)`;${v}--;`, () => t.for((0, Ee._)`${_} = ${v}; ${_}--;`, () => t.if((0, Ee._)`${$}(${r}[${v}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(p);
      })));
    }
  }
};
Xa.default = pm;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const Xs = te, mm = M, ym = cn, $m = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Xs._)`{allowedValue: ${e}}`
}, gm = {
  keyword: "const",
  $data: !0,
  error: $m,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Xs._)`!${(0, mm.useFunc)(t, ym.default)}(${r}, ${s})`) : e.fail((0, Xs._)`${a} !== ${r}`);
  }
};
Wa.default = gm;
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Gr = te, _m = M, vm = cn, wm = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Gr._)`{allowedValues: ${e}}`
}, Em = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: wm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: o } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= o.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, _m.useFunc)(t, vm.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const g = t.const("vSchema", a);
      u = (0, Gr.or)(...s.map((v, _) => b(g, _)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (g) => t.if((0, Gr._)`${d()}(${r}, ${g})`, () => t.assign(u, !0).break()));
    }
    function b(g, v) {
      const _ = s[v];
      return typeof _ == "object" && _ !== null ? (0, Gr._)`${d()}(${r}, ${g}[${v}])` : (0, Gr._)`${r} === ${_}`;
    }
  }
};
Ya.default = Em;
Object.defineProperty(Va, "__esModule", { value: !0 });
const Sm = Ua, bm = za, Pm = qa, Nm = Ga, Tm = Ha, Om = Ba, Rm = Ja, Im = Xa, jm = Wa, Am = Ya, km = [
  // number
  Sm.default,
  bm.default,
  // string
  Pm.default,
  Nm.default,
  // object
  Tm.default,
  Om.default,
  // array
  Rm.default,
  Im.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  jm.default,
  Am.default
];
Va.default = km;
var Qa = {}, Ir = {};
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.validateAdditionalItems = void 0;
const xt = te, Ws = M, Cm = {
  message: ({ params: { len: e } }) => (0, xt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, xt._)`{limit: ${e}}`
}, Dm = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Cm,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ws.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Wl(e, n);
  }
};
function Wl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: o } = e;
  o.items = !0;
  const l = r.const("len", (0, xt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, xt._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ws.alwaysValidSchema)(o, n)) {
    const d = r.var("valid", (0, xt._)`${l} <= ${t.length}`);
    r.if((0, xt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: Ws.Type.Num }, d), o.allErrors || r.if((0, xt.not)(d), () => r.break());
    });
  }
}
Ir.validateAdditionalItems = Wl;
Ir.default = Dm;
var Za = {}, jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.validateTuple = void 0;
const Ri = te, Mn = M, Mm = x, Lm = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Yl(e, "additionalItems", t);
    r.items = !0, !(0, Mn.alwaysValidSchema)(r, t) && e.ok((0, Mm.validateArray)(e));
  }
};
function Yl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: o, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = Mn.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), d = n.const("len", (0, Ri._)`${a}.length`);
  r.forEach((h, b) => {
    (0, Mn.alwaysValidSchema)(l, h) || (n.if((0, Ri._)`${d} > ${b}`, () => e.subschema({
      keyword: o,
      schemaProp: b,
      dataProp: b
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: b, errSchemaPath: g } = l, v = r.length, _ = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (b.strictTuples && !_) {
      const $ = `"${o}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, Mn.checkStrictMode)(l, $, b.strictTuples);
    }
  }
}
jr.validateTuple = Yl;
jr.default = Lm;
Object.defineProperty(Za, "__esModule", { value: !0 });
const Fm = jr, Vm = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Fm.validateTuple)(e, "items")
};
Za.default = Vm;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const Ii = te, Um = M, zm = x, qm = Ir, Km = {
  message: ({ params: { len: e } }) => (0, Ii.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ii._)`{limit: ${e}}`
}, Gm = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Km,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Um.alwaysValidSchema)(n, t) && (s ? (0, qm.validateAdditionalItems)(e, s) : e.ok((0, zm.validateArray)(e)));
  }
};
xa.default = Gm;
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
const Ge = te, gn = M, Hm = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge.str)`must contain at least ${e} valid item(s)` : (0, Ge.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge._)`{minContains: ${e}}` : (0, Ge._)`{minContains: ${e}, maxContains: ${t}}`
}, Bm = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Hm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let o, l;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (o = c === void 0 ? 1 : c, l = d) : o = 1;
    const u = t.const("len", (0, Ge._)`${s}.length`);
    if (e.setParams({ min: o, max: l }), l === void 0 && o === 0) {
      (0, gn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && o > l) {
      (0, gn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, gn.alwaysValidSchema)(a, r)) {
      let _ = (0, Ge._)`${u} >= ${o}`;
      l !== void 0 && (_ = (0, Ge._)`${_} && ${u} <= ${l}`), e.pass(_);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    l === void 0 && o === 1 ? g(h, () => t.if(h, () => t.break())) : o === 0 ? (t.let(h, !0), l !== void 0 && t.if((0, Ge._)`${s}.length > 0`, b)) : (t.let(h, !1), b()), e.result(h, () => e.reset());
    function b() {
      const _ = t.name("_valid"), $ = t.let("count", 0);
      g(_, () => t.if(_, () => v($)));
    }
    function g(_, $) {
      t.forRange("i", 0, u, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: gn.Type.Num,
          compositeRule: !0
        }, _), $();
      });
    }
    function v(_) {
      t.code((0, Ge._)`${_}++`), l === void 0 ? t.if((0, Ge._)`${_} >= ${o}`, () => t.assign(h, !0).break()) : (t.if((0, Ge._)`${_} > ${l}`, () => t.assign(h, !1).break()), o === 1 ? t.assign(h, !0) : t.if((0, Ge._)`${_} >= ${o}`, () => t.assign(h, !0)));
    }
  }
};
eo.default = Bm;
var Ql = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = te, r = M, n = x;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${c},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, u] = a(c);
      o(c, d), l(c, u);
    }
  };
  function a({ schema: c }) {
    const d = {}, u = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const b = Array.isArray(c[h]) ? d : u;
      b[h] = c[h];
    }
    return [d, u];
  }
  function o(c, d = c.schema) {
    const { gen: u, data: h, it: b } = c;
    if (Object.keys(d).length === 0)
      return;
    const g = u.let("missing");
    for (const v in d) {
      const _ = d[v];
      if (_.length === 0)
        continue;
      const $ = (0, n.propertyInData)(u, h, v, b.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: _.length,
        deps: _.join(", ")
      }), b.allErrors ? u.if($, () => {
        for (const p of _)
          (0, n.checkReportMissingProp)(c, p);
      }) : (u.if((0, t._)`${$} && (${(0, n.checkMissingProp)(c, _, g)})`), (0, n.reportMissingProp)(c, g), u.else());
    }
  }
  e.validatePropertyDeps = o;
  function l(c, d = c.schema) {
    const { gen: u, data: h, keyword: b, it: g } = c, v = u.name("valid");
    for (const _ in d)
      (0, r.alwaysValidSchema)(g, d[_]) || (u.if(
        (0, n.propertyInData)(u, h, _, g.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: b, schemaProp: _ }, v);
          c.mergeValidEvaluated($, v);
        },
        () => u.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = l, e.default = s;
})(Ql);
var to = {};
Object.defineProperty(to, "__esModule", { value: !0 });
const Zl = te, Jm = M, Xm = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Zl._)`{propertyName: ${e.propertyName}}`
}, Wm = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Xm,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Jm.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), t.if((0, Zl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
to.default = Wm;
var us = {};
Object.defineProperty(us, "__esModule", { value: !0 });
const _n = x, We = te, Ym = ht, vn = M, Qm = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, We._)`{additionalProperty: ${e.additionalProperty}}`
}, Zm = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Qm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: o } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, vn.alwaysValidSchema)(o, r))
      return;
    const d = (0, _n.allSchemaProperties)(n.properties), u = (0, _n.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, We._)`${a} === ${Ym.default.errors}`);
    function h() {
      t.forIn("key", s, ($) => {
        !d.length && !u.length ? v($) : t.if(b($), () => v($));
      });
    }
    function b($) {
      let p;
      if (d.length > 8) {
        const E = (0, vn.schemaRefOrVal)(o, n.properties, "properties");
        p = (0, _n.isOwnProperty)(t, E, $);
      } else d.length ? p = (0, We.or)(...d.map((E) => (0, We._)`${$} === ${E}`)) : p = We.nil;
      return u.length && (p = (0, We.or)(p, ...u.map((E) => (0, We._)`${(0, _n.usePattern)(e, E)}.test(${$})`))), (0, We.not)(p);
    }
    function g($) {
      t.code((0, We._)`delete ${s}[${$}]`);
    }
    function v($) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        g($);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: $ }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, vn.alwaysValidSchema)(o, r)) {
        const p = t.name("valid");
        c.removeAdditional === "failing" ? (_($, p, !1), t.if((0, We.not)(p), () => {
          e.reset(), g($);
        })) : (_($, p), l || t.if((0, We.not)(p), () => t.break()));
      }
    }
    function _($, p, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: vn.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, p);
    }
  }
};
us.default = Zm;
var ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
const xm = et, ji = x, Rs = M, Ai = us, ey = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Ai.default.code(new xm.KeywordCxt(a, Ai.default, "additionalProperties"));
    const o = (0, ji.allSchemaProperties)(r);
    for (const h of o)
      a.definedProperties.add(h);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = Rs.mergeEvaluated.props(t, (0, Rs.toHash)(o), a.props));
    const l = o.filter((h) => !(0, Rs.alwaysValidSchema)(a, r[h]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const h of l)
      d(h) ? u(h) : (t.if((0, ji.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
ro.default = ey;
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
const ki = x, wn = te, Ci = M, Di = M, ty = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: o } = a, l = (0, ki.allSchemaProperties)(r), c = l.filter((_) => (0, Ci.alwaysValidSchema)(a, r[_]));
    if (l.length === 0 || c.length === l.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = o.strictSchema && !o.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof wn.Name) && (a.props = (0, Di.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    b();
    function b() {
      for (const _ of l)
        d && g(_), a.allErrors ? v(_) : (t.var(u, !0), v(_), t.if(u));
    }
    function g(_) {
      for (const $ in d)
        new RegExp(_).test($) && (0, Ci.checkStrictMode)(a, `property ${$} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function v(_) {
      t.forIn("key", n, ($) => {
        t.if((0, wn._)`${(0, ki.usePattern)(e, _)}.test(${$})`, () => {
          const p = c.includes(_);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: $,
            dataPropType: Di.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, wn._)`${h}[${$}]`, !0) : !p && !a.allErrors && t.if((0, wn.not)(u), () => t.break());
        });
      });
    }
  }
};
no.default = ty;
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
const ry = M, ny = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, ry.alwaysValidSchema)(n, r)) {
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
so.default = ny;
var ao = {};
Object.defineProperty(ao, "__esModule", { value: !0 });
const sy = x, ay = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: sy.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
ao.default = ay;
var oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
const Ln = te, oy = M, iy = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Ln._)`{passingSchemas: ${e.passing}}`
}, cy = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: iy,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, o = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(d), e.result(o, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let b;
        (0, oy.alwaysValidSchema)(s, u) ? t.var(c, !0) : b = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, Ln._)`${c} && ${o}`).assign(o, !1).assign(l, (0, Ln._)`[${l}, ${h}]`).else(), t.if(c, () => {
          t.assign(o, !0), t.assign(l, h), b && e.mergeEvaluated(b, Ln.Name);
        });
      });
    }
  }
};
oo.default = cy;
var io = {};
Object.defineProperty(io, "__esModule", { value: !0 });
const ly = M, uy = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, o) => {
      if ((0, ly.alwaysValidSchema)(n, a))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: o }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
io.default = uy;
var co = {};
Object.defineProperty(co, "__esModule", { value: !0 });
const Qn = te, xl = M, dy = {
  message: ({ params: e }) => (0, Qn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Qn._)`{failingKeyword: ${e.ifClause}}`
}, fy = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: dy,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, xl.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Mi(n, "then"), a = Mi(n, "else");
    if (!s && !a)
      return;
    const o = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, d("then", u), d("else", u));
    } else s ? t.if(l, d("then")) : t.if((0, Qn.not)(l), d("else"));
    e.pass(o, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const b = e.subschema({ keyword: u }, l);
        t.assign(o, l), e.mergeValidEvaluated(b, o), h ? t.assign(h, (0, Qn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Mi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, xl.alwaysValidSchema)(e, r);
}
co.default = fy;
var lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
const hy = M, py = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, hy.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
lo.default = py;
Object.defineProperty(Qa, "__esModule", { value: !0 });
const my = Ir, yy = Za, $y = jr, gy = xa, _y = eo, vy = Ql, wy = to, Ey = us, Sy = ro, by = no, Py = so, Ny = ao, Ty = oo, Oy = io, Ry = co, Iy = lo;
function jy(e = !1) {
  const t = [
    // any
    Py.default,
    Ny.default,
    Ty.default,
    Oy.default,
    Ry.default,
    Iy.default,
    // object
    wy.default,
    Ey.default,
    vy.default,
    Sy.default,
    by.default
  ];
  return e ? t.push(yy.default, gy.default) : t.push(my.default, $y.default), t.push(_y.default), t;
}
Qa.default = jy;
var uo = {}, fo = {};
Object.defineProperty(fo, "__esModule", { value: !0 });
const me = te, Ay = {
  message: ({ schemaCode: e }) => (0, me.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, me._)`{format: ${e}}`
}, ky = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Ay,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: o, it: l } = e, { opts: c, errSchemaPath: d, schemaEnv: u, self: h } = l;
    if (!c.validateFormats)
      return;
    s ? b() : g();
    function b() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), _ = r.const("fDef", (0, me._)`${v}[${o}]`), $ = r.let("fType"), p = r.let("format");
      r.if((0, me._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign($, (0, me._)`${_}.type || "string"`).assign(p, (0, me._)`${_}.validate`), () => r.assign($, (0, me._)`"string"`).assign(p, _)), e.fail$data((0, me.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? me.nil : (0, me._)`${o} && !${p}`;
      }
      function N() {
        const O = u.$async ? (0, me._)`(${_}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, me._)`${p}(${n})`, I = (0, me._)`(typeof ${p} == "function" ? ${O} : ${p}.test(${n}))`;
        return (0, me._)`${p} && ${p} !== true && ${$} === ${t} && !${I}`;
      }
    }
    function g() {
      const v = h.formats[a];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [_, $, p] = N(v);
      _ === t && e.pass(O());
      function E() {
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
      function O() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, me._)`await ${p}(${n})`;
        }
        return typeof $ == "function" ? (0, me._)`${p}(${n})` : (0, me._)`${p}.test(${n})`;
      }
    }
  }
};
fo.default = ky;
Object.defineProperty(uo, "__esModule", { value: !0 });
const Cy = fo, Dy = [Cy.default];
uo.default = Dy;
var Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.contentVocabulary = Nr.metadataVocabulary = void 0;
Nr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Nr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Ma, "__esModule", { value: !0 });
const My = La, Ly = Va, Fy = Qa, Vy = uo, Li = Nr, Uy = [
  My.default,
  Ly.default,
  (0, Fy.default)(),
  Vy.default,
  Li.metadataVocabulary,
  Li.contentVocabulary
];
Ma.default = Uy;
var ho = {}, ds = {};
Object.defineProperty(ds, "__esModule", { value: !0 });
ds.DiscrError = void 0;
var Fi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Fi || (ds.DiscrError = Fi = {}));
Object.defineProperty(ho, "__esModule", { value: !0 });
const hr = te, Ys = ds, Vi = Ve, zy = Rr, qy = M, Ky = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Ys.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, hr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, Gy = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: Ky,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: o } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, hr._)`${r}${(0, hr.getProperty)(l)}`);
    t.if((0, hr._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: Ys.DiscrError.Tag, tag: d, tagName: l })), e.ok(c);
    function u() {
      const g = b();
      t.if(!1);
      for (const v in g)
        t.elseIf((0, hr._)`${d} === ${v}`), t.assign(c, h(g[v]));
      t.else(), e.error(!1, { discrError: Ys.DiscrError.Mapping, tag: d, tagName: l }), t.endIf();
    }
    function h(g) {
      const v = t.name("valid"), _ = e.subschema({ keyword: "oneOf", schemaProp: g }, v);
      return e.mergeEvaluated(_, hr.Name), v;
    }
    function b() {
      var g;
      const v = {}, _ = p(s);
      let $ = !0;
      for (let O = 0; O < o.length; O++) {
        let I = o[O];
        if (I != null && I.$ref && !(0, qy.schemaHasRulesButRef)(I, a.self.RULES)) {
          const B = I.$ref;
          if (I = Vi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), I instanceof Vi.SchemaEnv && (I = I.schema), I === void 0)
            throw new zy.default(a.opts.uriResolver, a.baseId, B);
        }
        const z = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[l];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        $ = $ && (_ || p(I)), E(z, O);
      }
      if (!$)
        throw new Error(`discriminator: "${l}" must be required`);
      return v;
      function p({ required: O }) {
        return Array.isArray(O) && O.includes(l);
      }
      function E(O, I) {
        if (O.const)
          N(O.const, I);
        else if (O.enum)
          for (const z of O.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function N(O, I) {
        if (typeof O != "string" || O in v)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        v[O] = I;
      }
    }
  }
};
ho.default = Gy;
const Hy = "http://json-schema.org/draft-07/schema#", By = "http://json-schema.org/draft-07/schema#", Jy = "Core schema meta-schema", Xy = {
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
}, Wy = [
  "object",
  "boolean"
], Yy = {
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
}, Qy = {
  $schema: Hy,
  $id: By,
  title: Jy,
  definitions: Xy,
  type: Wy,
  properties: Yy,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = rl, n = Ma, s = ho, a = Qy, o = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(a, o) : a;
      this.addMetaSchema(v, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = et;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = te;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var h = on;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var b = Rr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return b.default;
  } });
})(Ks, Ks.exports);
var Zy = Ks.exports, Qs = { exports: {} }, eu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(V, H) {
    return { validate: V, compare: H };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, o),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c, d),
    "date-time": t(h, b),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: _,
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
    int32: { type: "number", validate: O },
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
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, o),
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
  function o(V, H) {
    if (V && H)
      return V > H ? 1 : V < H ? -1 : 0;
  }
  const l = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function c(V, H) {
    const ne = l.exec(V);
    if (!ne)
      return !1;
    const Q = +ne[1], de = +ne[2], C = +ne[3], k = ne[5];
    return (Q <= 23 && de <= 59 && C <= 59 || Q === 23 && de === 59 && C === 60) && (!H || k !== "");
  }
  function d(V, H) {
    if (!(V && H))
      return;
    const ne = l.exec(V), Q = l.exec(H);
    if (ne && Q)
      return V = ne[1] + ne[2] + ne[3] + (ne[4] || ""), H = Q[1] + Q[2] + Q[3] + (Q[4] || ""), V > H ? 1 : V < H ? -1 : 0;
  }
  const u = /t|\s/i;
  function h(V) {
    const H = V.split(u);
    return H.length === 2 && a(H[0]) && c(H[1], !0);
  }
  function b(V, H) {
    if (!(V && H))
      return;
    const [ne, Q] = V.split(u), [de, C] = H.split(u), k = o(ne, de);
    if (k !== void 0)
      return k || d(Q, C);
  }
  const g = /\/|:/, v = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function _(V) {
    return g.test(V) && v.test(V);
  }
  const $ = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function p(V) {
    return $.lastIndex = 0, $.test(V);
  }
  const E = -2147483648, N = 2 ** 31 - 1;
  function O(V) {
    return Number.isInteger(V) && V <= N && V >= E;
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
})(eu);
var tu = {}, Zs = { exports: {} }, ru = {}, tt = {}, Tr = {}, ln = {}, Z = {}, sn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(E) {
      if (super(), !e.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
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
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((N, O) => `${N}${O}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((N, O) => (O instanceof r && (N[O.str] = (N[O.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...E) {
    const N = [p[0]];
    let O = 0;
    for (; O < E.length; )
      l(N, E[O]), N.push(p[++O]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function o(p, ...E) {
    const N = [g(p[0])];
    let O = 0;
    for (; O < E.length; )
      N.push(a), l(N, E[O]), N.push(a, g(p[++O]));
    return c(N), new n(N);
  }
  e.str = o;
  function l(p, E) {
    E instanceof n ? p.push(...E._items) : E instanceof r ? p.push(E) : p.push(h(E));
  }
  e.addCodeArg = l;
  function c(p) {
    let E = 1;
    for (; E < p.length - 1; ) {
      if (p[E] === a) {
        const N = d(p[E - 1], p[E + 1]);
        if (N !== void 0) {
          p.splice(E - 1, 3, N);
          continue;
        }
        p[E++] = "+";
      }
      E++;
    }
  }
  function d(p, E) {
    if (E === '""')
      return p;
    if (p === '""')
      return E;
    if (typeof p == "string")
      return E instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${p.slice(0, -1)}${E}"` : E[0] === '"' ? p.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(p instanceof r))
      return `"${p}${E.slice(1)}`;
  }
  function u(p, E) {
    return E.emptyStr() ? p : p.emptyStr() ? E : o`${p}${E}`;
  }
  e.strConcat = u;
  function h(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : g(Array.isArray(p) ? p.join(",") : p);
  }
  function b(p) {
    return new n(g(p));
  }
  e.stringify = b;
  function g(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = g;
  function v(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = v;
  function _(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = _;
  function $(p) {
    return new n(p.toString());
  }
  e.regexpCode = $;
})(sn);
var xs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = sn;
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
    constructor({ prefixes: d, parent: u } = {}) {
      this._names = {}, this._prefixes = d, this._parent = u;
    }
    toName(d) {
      return d instanceof t.Name ? d : this.name(d);
    }
    name(d) {
      return new t.Name(this._newName(d));
    }
    _newName(d) {
      const u = this._names[d] || this._nameGroup(d);
      return `${d}${u.index++}`;
    }
    _nameGroup(d) {
      var u, h;
      if (!((h = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || h === void 0) && h.has(d) || this._prefixes && !this._prefixes.has(d))
        throw new Error(`CodeGen: prefix "${d}" is not allowed in this scope`);
      return this._names[d] = { prefix: d, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(d, u) {
      super(u), this.prefix = d;
    }
    setValue(d, { property: u, itemIndex: h }) {
      this.value = d, this.scopePath = (0, t._)`.${new t.Name(u)}[${h}]`;
    }
  }
  e.ValueScopeName = a;
  const o = (0, t._)`\n`;
  class l extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(d) {
      return new a(d, this._newName(d));
    }
    value(d, u) {
      var h;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const b = this.toName(d), { prefix: g } = b, v = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let _ = this._values[g];
      if (_) {
        const E = _.get(v);
        if (E)
          return E;
      } else
        _ = this._values[g] = /* @__PURE__ */ new Map();
      _.set(v, b);
      const $ = this._scope[g] || (this._scope[g] = []), p = $.length;
      return $[p] = u.ref, b.setValue(u, { property: g, itemIndex: p }), b;
    }
    getValue(d, u) {
      const h = this._values[d];
      if (h)
        return h.get(u);
    }
    scopeRefs(d, u = this._values) {
      return this._reduceValues(u, (h) => {
        if (h.scopePath === void 0)
          throw new Error(`CodeGen: name "${h}" has no value`);
        return (0, t._)`${d}${h.scopePath}`;
      });
    }
    scopeCode(d = this._values, u, h) {
      return this._reduceValues(d, (b) => {
        if (b.value === void 0)
          throw new Error(`CodeGen: name "${b}" has no value`);
        return b.value.code;
      }, u, h);
    }
    _reduceValues(d, u, h = {}, b) {
      let g = t.nil;
      for (const v in d) {
        const _ = d[v];
        if (!_)
          continue;
        const $ = h[v] = h[v] || /* @__PURE__ */ new Map();
        _.forEach((p) => {
          if ($.has(p))
            return;
          $.set(p, n.Started);
          let E = u(p);
          if (E) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            g = (0, t._)`${g}${N} ${p} = ${E};${this.opts._n}`;
          } else if (E = b == null ? void 0 : b(p))
            g = (0, t._)`${g}${E}${this.opts._n}`;
          else
            throw new r(p);
          $.set(p, n.Completed);
        });
      }
      return g;
    }
  }
  e.ValueScope = l;
})(xs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = sn, r = xs;
  var n = sn;
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
  var s = xs;
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
    optimizeNames(i, f) {
      return this;
    }
  }
  class o extends a {
    constructor(i, f, P) {
      super(), this.varKind = i, this.name = f, this.rhs = P;
    }
    render({ es5: i, _n: f }) {
      const P = i ? r.varKinds.var : this.varKind, j = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${j};` + f;
    }
    optimizeNames(i, f) {
      if (i[this.name.str])
        return this.rhs && (this.rhs = C(this.rhs, i, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends a {
    constructor(i, f, P) {
      super(), this.lhs = i, this.rhs = f, this.sideEffects = P;
    }
    render({ _n: i }) {
      return `${this.lhs} = ${this.rhs};` + i;
    }
    optimizeNames(i, f) {
      if (!(this.lhs instanceof t.Name && !i[this.lhs.str] && !this.sideEffects))
        return this.rhs = C(this.rhs, i, f), this;
    }
    get names() {
      const i = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return de(i, this.rhs);
    }
  }
  class c extends l {
    constructor(i, f, P, j) {
      super(i, P, j), this.op = f;
    }
    render({ _n: i }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + i;
    }
  }
  class d extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `${this.label}:` + i;
    }
  }
  class u extends a {
    constructor(i) {
      super(), this.label = i, this.names = {};
    }
    render({ _n: i }) {
      return `break${this.label ? ` ${this.label}` : ""};` + i;
    }
  }
  class h extends a {
    constructor(i) {
      super(), this.error = i;
    }
    render({ _n: i }) {
      return `throw ${this.error};` + i;
    }
    get names() {
      return this.error.names;
    }
  }
  class b extends a {
    constructor(i) {
      super(), this.code = i;
    }
    render({ _n: i }) {
      return `${this.code};` + i;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(i, f) {
      return this.code = C(this.code, i, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class g extends a {
    constructor(i = []) {
      super(), this.nodes = i;
    }
    render(i) {
      return this.nodes.reduce((f, P) => f + P.render(i), "");
    }
    optimizeNodes() {
      const { nodes: i } = this;
      let f = i.length;
      for (; f--; ) {
        const P = i[f].optimizeNodes();
        Array.isArray(P) ? i.splice(f, 1, ...P) : P ? i[f] = P : i.splice(f, 1);
      }
      return i.length > 0 ? this : void 0;
    }
    optimizeNames(i, f) {
      const { nodes: P } = this;
      let j = P.length;
      for (; j--; ) {
        const A = P[j];
        A.optimizeNames(i, f) || (k(i, A.names), P.splice(j, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((i, f) => Q(i, f.names), {});
    }
  }
  class v extends g {
    render(i) {
      return "{" + i._n + super.render(i) + "}" + i._n;
    }
  }
  class _ extends g {
  }
  class $ extends v {
  }
  $.kind = "else";
  class p extends v {
    constructor(i, f) {
      super(f), this.condition = i;
    }
    render(i) {
      let f = `if(${this.condition})` + super.render(i);
      return this.else && (f += "else " + this.else.render(i)), f;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const i = this.condition;
      if (i === !0)
        return this.nodes;
      let f = this.else;
      if (f) {
        const P = f.optimizeNodes();
        f = this.else = Array.isArray(P) ? new $(P) : P;
      }
      if (f)
        return i === !1 ? f instanceof p ? f : f.nodes : this.nodes.length ? this : new p(U(i), f instanceof p ? [f] : f.nodes);
      if (!(i === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(i, f) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(i, f), !!(super.optimizeNames(i, f) || this.else))
        return this.condition = C(this.condition, i, f), this;
    }
    get names() {
      const i = super.names;
      return de(i, this.condition), this.else && Q(i, this.else.names), i;
    }
  }
  p.kind = "if";
  class E extends v {
  }
  E.kind = "for";
  class N extends E {
    constructor(i) {
      super(), this.iteration = i;
    }
    render(i) {
      return `for(${this.iteration})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iteration = C(this.iteration, i, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class O extends E {
    constructor(i, f, P, j) {
      super(), this.varKind = i, this.name = f, this.from = P, this.to = j;
    }
    render(i) {
      const f = i.es5 ? r.varKinds.var : this.varKind, { name: P, from: j, to: A } = this;
      return `for(${f} ${P}=${j}; ${P}<${A}; ${P}++)` + super.render(i);
    }
    get names() {
      const i = de(super.names, this.from);
      return de(i, this.to);
    }
  }
  class I extends E {
    constructor(i, f, P, j) {
      super(), this.loop = i, this.varKind = f, this.name = P, this.iterable = j;
    }
    render(i) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(i);
    }
    optimizeNames(i, f) {
      if (super.optimizeNames(i, f))
        return this.iterable = C(this.iterable, i, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class z extends v {
    constructor(i, f, P) {
      super(), this.name = i, this.args = f, this.async = P;
    }
    render(i) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(i);
    }
  }
  z.kind = "func";
  class B extends g {
    render(i) {
      return "return " + super.render(i);
    }
  }
  B.kind = "return";
  class ue extends v {
    render(i) {
      let f = "try" + super.render(i);
      return this.catch && (f += this.catch.render(i)), this.finally && (f += this.finally.render(i)), f;
    }
    optimizeNodes() {
      var i, f;
      return super.optimizeNodes(), (i = this.catch) === null || i === void 0 || i.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(i, f) {
      var P, j;
      return super.optimizeNames(i, f), (P = this.catch) === null || P === void 0 || P.optimizeNames(i, f), (j = this.finally) === null || j === void 0 || j.optimizeNames(i, f), this;
    }
    get names() {
      const i = super.names;
      return this.catch && Q(i, this.catch.names), this.finally && Q(i, this.finally.names), i;
    }
  }
  class V extends v {
    constructor(i) {
      super(), this.error = i;
    }
    render(i) {
      return `catch(${this.error})` + super.render(i);
    }
  }
  V.kind = "catch";
  class H extends v {
    render(i) {
      return "finally" + super.render(i);
    }
  }
  H.kind = "finally";
  class ne {
    constructor(i, f = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...f, _n: f.lines ? `
` : "" }, this._extScope = i, this._scope = new r.Scope({ parent: i }), this._nodes = [new _()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(i) {
      return this._scope.name(i);
    }
    // reserves unique name in the external scope
    scopeName(i) {
      return this._extScope.name(i);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(i, f) {
      const P = this._extScope.value(i, f);
      return (this._values[P.prefix] || (this._values[P.prefix] = /* @__PURE__ */ new Set())).add(P), P;
    }
    getScopeValue(i, f) {
      return this._extScope.getValue(i, f);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(i) {
      return this._extScope.scopeRefs(i, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(i, f, P, j) {
      const A = this._scope.toName(f);
      return P !== void 0 && j && (this._constants[A.str] = P), this._leafNode(new o(i, A, P)), A;
    }
    // `const` declaration (`var` in es5 mode)
    const(i, f, P) {
      return this._def(r.varKinds.const, i, f, P);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(i, f, P) {
      return this._def(r.varKinds.let, i, f, P);
    }
    // `var` declaration with optional assignment
    var(i, f, P) {
      return this._def(r.varKinds.var, i, f, P);
    }
    // assignment code
    assign(i, f, P) {
      return this._leafNode(new l(i, f, P));
    }
    // `+=` code
    add(i, f) {
      return this._leafNode(new c(i, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(i) {
      return typeof i == "function" ? i() : i !== t.nil && this._leafNode(new b(i)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...i) {
      const f = ["{"];
      for (const [P, j] of i)
        f.length > 1 && f.push(","), f.push(P), (P !== j || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, j));
      return f.push("}"), new t._Code(f);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(i, f, P) {
      if (this._blockNode(new p(i)), f && P)
        this.code(f).else().code(P).endIf();
      else if (f)
        this.code(f).endIf();
      else if (P)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(i) {
      return this._elseNode(new p(i));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new $());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, $);
    }
    _for(i, f) {
      return this._blockNode(i), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(i, f) {
      return this._for(new N(i), f);
    }
    // `for` statement for a range of values
    forRange(i, f, P, j, A = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const q = this._scope.toName(i);
      return this._for(new O(A, q, f, P), () => j(q));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(i, f, P, j = r.varKinds.const) {
      const A = this._scope.toName(i);
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
    forIn(i, f, P, j = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(i, (0, t._)`Object.keys(${f})`, P);
      const A = this._scope.toName(i);
      return this._for(new I("in", j, A, f), () => P(A));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(i) {
      return this._leafNode(new d(i));
    }
    // `break` statement
    break(i) {
      return this._leafNode(new u(i));
    }
    // `return` statement
    return(i) {
      const f = new B();
      if (this._blockNode(f), this.code(i), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(B);
    }
    // `try` statement
    try(i, f, P) {
      if (!f && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const j = new ue();
      if (this._blockNode(j), this.code(i), f) {
        const A = this.name("e");
        this._currNode = j.catch = new V(A), f(A);
      }
      return P && (this._currNode = j.finally = new H(), this.code(P)), this._endBlockNode(V, H);
    }
    // `throw` statement
    throw(i) {
      return this._leafNode(new h(i));
    }
    // start self-balancing block
    block(i, f) {
      return this._blockStarts.push(this._nodes.length), i && this.code(i).endBlock(f), this;
    }
    // end the current self-balancing block
    endBlock(i) {
      const f = this._blockStarts.pop();
      if (f === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const P = this._nodes.length - f;
      if (P < 0 || i !== void 0 && P !== i)
        throw new Error(`CodeGen: wrong number of nodes: ${P} vs ${i} expected`);
      return this._nodes.length = f, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(i, f = t.nil, P, j) {
      return this._blockNode(new z(i, f, P)), j && this.code(j).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(z);
    }
    optimize(i = 1) {
      for (; i-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(i) {
      return this._currNode.nodes.push(i), this;
    }
    _blockNode(i) {
      this._currNode.nodes.push(i), this._nodes.push(i);
    }
    _endBlockNode(i, f) {
      const P = this._currNode;
      if (P instanceof i || f && P instanceof f)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${f ? `${i.kind}/${f.kind}` : i.kind}"`);
    }
    _elseNode(i) {
      const f = this._currNode;
      if (!(f instanceof p))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = f.else = i, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const i = this._nodes;
      return i[i.length - 1];
    }
    set _currNode(i) {
      const f = this._nodes;
      f[f.length - 1] = i;
    }
  }
  e.CodeGen = ne;
  function Q(y, i) {
    for (const f in i)
      y[f] = (y[f] || 0) + (i[f] || 0);
    return y;
  }
  function de(y, i) {
    return i instanceof t._CodeOrName ? Q(y, i.names) : y;
  }
  function C(y, i, f) {
    if (y instanceof t.Name)
      return P(y);
    if (!j(y))
      return y;
    return new t._Code(y._items.reduce((A, q) => (q instanceof t.Name && (q = P(q)), q instanceof t._Code ? A.push(...q._items) : A.push(q), A), []));
    function P(A) {
      const q = f[A.str];
      return q === void 0 || i[A.str] !== 1 ? A : (delete i[A.str], q);
    }
    function j(A) {
      return A instanceof t._Code && A._items.some((q) => q instanceof t.Name && i[q.str] === 1 && f[q.str] !== void 0);
    }
  }
  function k(y, i) {
    for (const f in i)
      y[f] = (y[f] || 0) - (i[f] || 0);
  }
  function U(y) {
    return typeof y == "boolean" || typeof y == "number" || y === null ? !y : (0, t._)`!${S(y)}`;
  }
  e.not = U;
  const D = m(e.operators.AND);
  function T(...y) {
    return y.reduce(D);
  }
  e.and = T;
  const R = m(e.operators.OR);
  function w(...y) {
    return y.reduce(R);
  }
  e.or = w;
  function m(y) {
    return (i, f) => i === t.nil ? f : f === t.nil ? i : (0, t._)`${S(i)} ${y} ${S(f)}`;
  }
  function S(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(Z);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const ce = Z, xy = sn;
function e$(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = e$;
function t$(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (nu(e, t), !su(t, e.self.RULES.all));
}
L.alwaysValidSchema = t$;
function nu(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || iu(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = nu;
function su(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = su;
function r$(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = r$;
function n$({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
L.schemaRefOrVal = n$;
function s$(e) {
  return au(decodeURIComponent(e));
}
L.unescapeFragment = s$;
function a$(e) {
  return encodeURIComponent(po(e));
}
L.escapeFragment = a$;
function po(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = po;
function au(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = au;
function o$(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = o$;
function Ui({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, o, l) => {
    const c = o === void 0 ? a : o instanceof ce.Name ? (a instanceof ce.Name ? e(s, a, o) : t(s, a, o), o) : a instanceof ce.Name ? (t(s, o, a), a) : r(a, o);
    return l === ce.Name && !(c instanceof ce.Name) ? n(s, c) : c;
  };
}
L.mergeEvaluated = {
  props: Ui({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ce._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ce._)`${r} || {}`).code((0, ce._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ce._)`${r} || {}`), mo(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: ou
  }),
  items: Ui({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function ou(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && mo(e, r, t), r;
}
L.evaluatedPropsToName = ou;
function mo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
L.setEvaluated = mo;
const zi = {};
function i$(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: zi[t.code] || (zi[t.code] = new xy._Code(t.code))
  });
}
L.useFunc = i$;
var ea;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(ea || (L.Type = ea = {}));
function c$(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === ea.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + po(e);
}
L.getErrorPath = c$;
function iu(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = iu;
var pt = {};
Object.defineProperty(pt, "__esModule", { value: !0 });
const Re = Z, l$ = {
  // validation function arguments
  data: new Re.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Re.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Re.Name("instancePath"),
  parentData: new Re.Name("parentData"),
  parentDataProperty: new Re.Name("parentDataProperty"),
  rootData: new Re.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Re.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Re.Name("vErrors"),
  // null or array of validation errors
  errors: new Re.Name("errors"),
  // counter of validation errors
  this: new Re.Name("this"),
  // "globals"
  self: new Re.Name("self"),
  scope: new Re.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Re.Name("json"),
  jsonPos: new Re.Name("jsonPos"),
  jsonLen: new Re.Name("jsonLen"),
  jsonPart: new Re.Name("jsonPart")
};
pt.default = l$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Z, r = L, n = pt;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: p }) => p ? (0, t.str)`"${$}" keyword must be ${p} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, p = e.keywordError, E, N) {
    const { it: O } = $, { gen: I, compositeRule: z, allErrors: B } = O, ue = h($, p, E);
    N ?? (z || B) ? c(I, ue) : d(O, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, p = e.keywordError, E) {
    const { it: N } = $, { gen: O, compositeRule: I, allErrors: z } = N, B = h($, p, E);
    c(O, B), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function o($, p) {
    $.assign(n.default.errors, p), $.if((0, t._)`${n.default.vErrors} !== null`, () => $.if(p, () => $.assign((0, t._)`${n.default.vErrors}.length`, p), () => $.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function l({ gen: $, keyword: p, schemaValue: E, data: N, errsCount: O, it: I }) {
    if (O === void 0)
      throw new Error("ajv implementation error");
    const z = $.name("err");
    $.forRange("i", O, n.default.errors, (B) => {
      $.const(z, (0, t._)`${n.default.vErrors}[${B}]`), $.if((0, t._)`${z}.instancePath === undefined`, () => $.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), $.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && ($.assign((0, t._)`${z}.schema`, E), $.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = l;
  function c($, p) {
    const E = $.const("err", p);
    $.if((0, t._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${n.default.vErrors}.push(${E})`), $.code((0, t._)`${n.default.errors}++`);
  }
  function d($, p) {
    const { gen: E, validateName: N, schemaEnv: O } = $;
    O.$async ? E.throw((0, t._)`new ${$.ValidationError}(${p})`) : (E.assign((0, t._)`${N}.errors`, p), E.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function h($, p, E) {
    const { createErrors: N } = $.it;
    return N === !1 ? (0, t._)`{}` : b($, p, E);
  }
  function b($, p, E = {}) {
    const { gen: N, it: O } = $, I = [
      g(O, E),
      v($, E)
    ];
    return _($, p, I), N.object(...I);
  }
  function g({ errorPath: $ }, { instancePath: p }) {
    const E = p ? (0, t.str)`${$}${(0, r.getErrorPath)(p, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, E)];
  }
  function v({ keyword: $, it: { errSchemaPath: p } }, { schemaPath: E, parentSchema: N }) {
    let O = N ? p : (0, t.str)`${p}/${$}`;
    return E && (O = (0, t.str)`${O}${(0, r.getErrorPath)(E, r.Type.Str)}`), [u.schemaPath, O];
  }
  function _($, { params: p, message: E }, N) {
    const { keyword: O, data: I, schemaValue: z, it: B } = $, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = B;
    N.push([u.keyword, O], [u.params, typeof p == "function" ? p($) : p || (0, t._)`{}`]), ue.messages && N.push([u.message, typeof E == "function" ? E($) : E]), ue.verbose && N.push([u.schema, z], [u.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([u.propertyName, V]);
  }
})(ln);
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.boolOrEmptySchema = Tr.topBoolOrEmptySchema = void 0;
const u$ = ln, d$ = Z, f$ = pt, h$ = {
  message: "boolean schema is false"
};
function p$(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? cu(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(f$.default.data) : (t.assign((0, d$._)`${n}.errors`, null), t.return(!0));
}
Tr.topBoolOrEmptySchema = p$;
function m$(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), cu(e)) : r.var(t, !0);
}
Tr.boolOrEmptySchema = m$;
function cu(e, t) {
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
  (0, u$.reportError)(s, h$, void 0, t);
}
var ve = {}, or = {};
Object.defineProperty(or, "__esModule", { value: !0 });
or.getRules = or.isJSONType = void 0;
const y$ = ["string", "number", "integer", "boolean", "null", "object", "array"], $$ = new Set(y$);
function g$(e) {
  return typeof e == "string" && $$.has(e);
}
or.isJSONType = g$;
function _$() {
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
or.getRules = _$;
var gt = {};
Object.defineProperty(gt, "__esModule", { value: !0 });
gt.shouldUseRule = gt.shouldUseGroup = gt.schemaHasRulesForType = void 0;
function v$({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && lu(e, n);
}
gt.schemaHasRulesForType = v$;
function lu(e, t) {
  return t.rules.some((r) => uu(e, r));
}
gt.shouldUseGroup = lu;
function uu(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
gt.shouldUseRule = uu;
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.reportTypeError = ve.checkDataTypes = ve.checkDataType = ve.coerceAndCheckDataType = ve.getJSONTypes = ve.getSchemaTypes = ve.DataType = void 0;
const w$ = or, E$ = gt, S$ = ln, Y = Z, du = L;
var _r;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(_r || (ve.DataType = _r = {}));
function b$(e) {
  const t = fu(e.type);
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
ve.getSchemaTypes = b$;
function fu(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(w$.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ve.getJSONTypes = fu;
function P$(e, t) {
  const { gen: r, data: n, opts: s } = e, a = N$(t, s.coerceTypes), o = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, E$.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const l = yo(t, n, s.strictNumbers, _r.Wrong);
    r.if(l, () => {
      a.length ? T$(e, t, a) : $o(e);
    });
  }
  return o;
}
ve.coerceAndCheckDataType = P$;
const hu = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function N$(e, t) {
  return t ? e.filter((r) => hu.has(r) || t === "array" && r === "array") : [];
}
function T$(e, t, r) {
  const { gen: n, data: s, opts: a } = e, o = n.let("dataType", (0, Y._)`typeof ${s}`), l = n.let("coerced", (0, Y._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Y._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(o, (0, Y._)`typeof ${s}`).if(yo(t, s, a.strictNumbers), () => n.assign(l, s))), n.if((0, Y._)`${l} !== undefined`);
  for (const d of r)
    (hu.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), $o(e), n.endIf(), n.if((0, Y._)`${l} !== undefined`, () => {
    n.assign(s, l), O$(e, l);
  });
  function c(d) {
    switch (d) {
      case "string":
        n.elseIf((0, Y._)`${o} == "number" || ${o} == "boolean"`).assign(l, (0, Y._)`"" + ${s}`).elseIf((0, Y._)`${s} === null`).assign(l, (0, Y._)`""`);
        return;
      case "number":
        n.elseIf((0, Y._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, Y._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, Y._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, Y._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, Y._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, Y._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, Y._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, Y._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(l, (0, Y._)`[${s}]`);
    }
  }
}
function O$({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function ta(e, t, r, n = _r.Correct) {
  const s = n === _r.Correct ? Y.operators.EQ : Y.operators.NEQ;
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
      a = o((0, Y._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = o();
      break;
    default:
      return (0, Y._)`typeof ${t} ${s} ${e}`;
  }
  return n === _r.Correct ? a : (0, Y.not)(a);
  function o(l = Y.nil) {
    return (0, Y.and)((0, Y._)`typeof ${t} == "number"`, l, r ? (0, Y._)`isFinite(${t})` : Y.nil);
  }
}
ve.checkDataType = ta;
function yo(e, t, r, n) {
  if (e.length === 1)
    return ta(e[0], t, r, n);
  let s;
  const a = (0, du.toHash)(e);
  if (a.array && a.object) {
    const o = (0, Y._)`typeof ${t} != "object"`;
    s = a.null ? o : (0, Y._)`!${t} || ${o}`, delete a.null, delete a.array, delete a.object;
  } else
    s = Y.nil;
  a.number && delete a.integer;
  for (const o in a)
    s = (0, Y.and)(s, ta(o, t, r, n));
  return s;
}
ve.checkDataTypes = yo;
const R$ = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function $o(e) {
  const t = I$(e);
  (0, S$.reportError)(t, R$);
}
ve.reportTypeError = $o;
function I$(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, du.schemaRefOrVal)(e, n, "type");
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
var fs = {};
Object.defineProperty(fs, "__esModule", { value: !0 });
fs.assignDefaults = void 0;
const dr = Z, j$ = L;
function A$(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      qi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => qi(e, a, s.default));
}
fs.assignDefaults = A$;
function qi(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: o } = e;
  if (r === void 0)
    return;
  const l = (0, dr._)`${a}${(0, dr.getProperty)(t)}`;
  if (s) {
    (0, j$.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, dr._)`${l} === undefined`;
  o.useDefaults === "empty" && (c = (0, dr._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, dr._)`${l} = ${(0, dr.stringify)(r)}`);
}
var dt = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const he = Z, go = L, St = pt, k$ = L;
function C$(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(vo(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = C$;
function D$({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)(vo(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
ee.checkMissingProp = D$;
function M$(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = M$;
function pu(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = pu;
function _o(e, t, r) {
  return (0, he._)`${pu(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = _o;
function L$(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${_o(e, t, r)}` : s;
}
ee.propertyInData = L$;
function vo(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(_o(e, t, r))) : s;
}
ee.noPropertyInData = vo;
function mu(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = mu;
function F$(e, t) {
  return mu(t).filter((r) => !(0, go.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = F$;
function V$({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: o }, l, c, d) {
  const u = d ? (0, he._)`${e}, ${t}, ${n}${s}` : t, h = [
    [St.default.instancePath, (0, he.strConcat)(St.default.instancePath, a)],
    [St.default.parentData, o.parentData],
    [St.default.parentDataProperty, o.parentDataProperty],
    [St.default.rootData, St.default.rootData]
  ];
  o.opts.dynamicRef && h.push([St.default.dynamicAnchors, St.default.dynamicAnchors]);
  const b = (0, he._)`${u}, ${r.object(...h)}`;
  return c !== he.nil ? (0, he._)`${l}.call(${c}, ${b})` : (0, he._)`${l}(${b})`;
}
ee.callValidateCode = V$;
const U$ = (0, he._)`new RegExp`;
function z$({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? U$ : (0, k$.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = z$;
function q$(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return o(() => t.assign(l, !1)), l;
  }
  return t.var(a, !0), o(() => t.break()), a;
  function o(l) {
    const c = t.const("len", (0, he._)`${r}.length`);
    t.forRange("i", 0, c, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: go.Type.Num
      }, a), t.if((0, he.not)(a), l);
    });
  }
}
ee.validateArray = q$;
function K$(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, go.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const o = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, l);
    t.assign(o, (0, he._)`${o} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, he.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
ee.validateUnion = K$;
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.validateKeywordUsage = dt.validSchemaType = dt.funcKeywordCode = dt.macroKeywordCode = void 0;
const Ce = Z, er = pt, G$ = ee, H$ = ln;
function B$(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: o } = e, l = t.macro.call(o.self, s, a, o), c = yu(r, n, l);
  o.opts.validateSchema !== !1 && o.self.validateSchema(l, !0);
  const d = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: Ce.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
dt.macroKeywordCode = B$;
function J$(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: o, $data: l, it: c } = e;
  W$(c, t);
  const d = !l && t.compile ? t.compile.call(c.self, a, o, c) : t.validate, u = yu(n, s, d), h = n.let("valid");
  e.block$data(h, b), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function b() {
    if (t.errors === !1)
      _(), t.modifying && Ki(e), $(() => e.error());
    else {
      const p = t.async ? g() : v();
      t.modifying && Ki(e), $(() => X$(e, p));
    }
  }
  function g() {
    const p = n.let("ruleErrs", null);
    return n.try(() => _((0, Ce._)`await `), (E) => n.assign(h, !1).if((0, Ce._)`${E} instanceof ${c.ValidationError}`, () => n.assign(p, (0, Ce._)`${E}.errors`), () => n.throw(E))), p;
  }
  function v() {
    const p = (0, Ce._)`${u}.errors`;
    return n.assign(p, null), _(Ce.nil), p;
  }
  function _(p = t.async ? (0, Ce._)`await ` : Ce.nil) {
    const E = c.opts.passContext ? er.default.this : er.default.self, N = !("compile" in t && !l || t.schema === !1);
    n.assign(h, (0, Ce._)`${p}${(0, G$.callValidateCode)(e, u, E, N)}`, t.modifying);
  }
  function $(p) {
    var E;
    n.if((0, Ce.not)((E = t.valid) !== null && E !== void 0 ? E : h), p);
  }
}
dt.funcKeywordCode = J$;
function Ki(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ce._)`${n.parentData}[${n.parentDataProperty}]`));
}
function X$(e, t) {
  const { gen: r } = e;
  r.if((0, Ce._)`Array.isArray(${t})`, () => {
    r.assign(er.default.vErrors, (0, Ce._)`${er.default.vErrors} === null ? ${t} : ${er.default.vErrors}.concat(${t})`).assign(er.default.errors, (0, Ce._)`${er.default.vErrors}.length`), (0, H$.extendErrors)(e);
  }, () => e.error());
}
function W$({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function yu(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ce.stringify)(r) });
}
function Y$(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
dt.validSchemaType = Y$;
function Q$({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const o = s.dependencies;
  if (o != null && o.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
dt.validateKeywordUsage = Q$;
var At = {};
Object.defineProperty(At, "__esModule", { value: !0 });
At.extendSubschemaMode = At.extendSubschemaData = At.getSubschema = void 0;
const it = Z, $u = L;
function Z$(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, it._)`${e.schemaPath}${(0, it.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, it._)`${e.schemaPath}${(0, it.getProperty)(t)}${(0, it.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, $u.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: o,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
At.getSubschema = Z$;
function x$(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: o }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: h } = t, b = l.let("data", (0, it._)`${t.data}${(0, it.getProperty)(r)}`, !0);
    c(b), e.errorPath = (0, it.str)`${d}${(0, $u.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, it._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof it.Name ? s : l.let("data", s, !0);
    c(d), o !== void 0 && (e.propertyName = o);
  }
  a && (e.dataTypes = a);
  function c(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
At.extendSubschemaData = x$;
function eg(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
At.extendSubschemaMode = eg;
var Te = {}, gu = { exports: {} }, It = gu.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Fn(t, n, s, e, "", e);
};
It.keywords = {
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
It.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
It.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
It.skipKeywords = {
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
function Fn(e, t, r, n, s, a, o, l, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, o, l, c, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in It.arrayKeywords)
          for (var b = 0; b < h.length; b++)
            Fn(e, t, r, h[b], s + "/" + u + "/" + b, a, s, u, n, b);
      } else if (u in It.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            Fn(e, t, r, h[g], s + "/" + u + "/" + tg(g), a, s, u, n, g);
      } else (u in It.keywords || e.allKeys && !(u in It.skipKeywords)) && Fn(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, o, l, c, d);
  }
}
function tg(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var rg = gu.exports;
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.getSchemaRefs = Te.resolveUrl = Te.normalizeId = Te._getFullPath = Te.getFullPath = Te.inlineRef = void 0;
const ng = L, sg = os, ag = rg, og = /* @__PURE__ */ new Set([
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
function ig(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !ra(e) : t ? _u(e) <= t : !1;
}
Te.inlineRef = ig;
const cg = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function ra(e) {
  for (const t in e) {
    if (cg.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(ra) || typeof r == "object" && ra(r))
      return !0;
  }
  return !1;
}
function _u(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !og.has(r) && (typeof e[r] == "object" && (0, ng.eachItem)(e[r], (n) => t += _u(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function vu(e, t = "", r) {
  r !== !1 && (t = vr(t));
  const n = e.parse(t);
  return wu(e, n);
}
Te.getFullPath = vu;
function wu(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Te._getFullPath = wu;
const lg = /#\/?$/;
function vr(e) {
  return e ? e.replace(lg, "") : "";
}
Te.normalizeId = vr;
function ug(e, t, r) {
  return r = vr(r), e.resolve(t, r);
}
Te.resolveUrl = ug;
const dg = /^[a-z_][-a-z0-9._]*$/i;
function fg(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = vr(e[r] || t), a = { "": s }, o = vu(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return ag(e, { allKeys: !0 }, (h, b, g, v) => {
    if (v === void 0)
      return;
    const _ = o + b;
    let $ = a[v];
    typeof h[r] == "string" && ($ = p.call(this, h[r])), E.call(this, h.$anchor), E.call(this, h.$dynamicAnchor), a[b] = $;
    function p(N) {
      const O = this.opts.uriResolver.resolve;
      if (N = vr($ ? O($, N) : N), c.has(N))
        throw u(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(h, I.schema, N) : N !== vr(_) && (N[0] === "#" ? (d(h, l[N], N), l[N] = h) : this.refs[N] = _), N;
    }
    function E(N) {
      if (typeof N == "string") {
        if (!dg.test(N))
          throw new Error(`invalid anchor "${N}"`);
        p.call(this, `#${N}`);
      }
    }
  }), l;
  function d(h, b, g) {
    if (b !== void 0 && !sg(h, b))
      throw u(g);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Te.getSchemaRefs = fg;
Object.defineProperty(tt, "__esModule", { value: !0 });
tt.getData = tt.KeywordCxt = tt.validateFunctionCode = void 0;
const Eu = Tr, Gi = ve, wo = gt, Zn = ve, hg = fs, Qr = dt, Is = At, G = Z, X = pt, pg = Te, _t = L, Ur = ln;
function mg(e) {
  if (Pu(e) && (Nu(e), bu(e))) {
    gg(e);
    return;
  }
  Su(e, () => (0, Eu.topBoolOrEmptySchema)(e));
}
tt.validateFunctionCode = mg;
function Su({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${X.default.data}, ${X.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${Hi(r, s)}`), $g(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${X.default.data}, ${yg(s)}`, n.$async, () => e.code(Hi(r, s)).code(a));
}
function yg(e) {
  return (0, G._)`{${X.default.instancePath}="", ${X.default.parentData}, ${X.default.parentDataProperty}, ${X.default.rootData}=${X.default.data}${e.dynamicRef ? (0, G._)`, ${X.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function $g(e, t) {
  e.if(X.default.valCxt, () => {
    e.var(X.default.instancePath, (0, G._)`${X.default.valCxt}.${X.default.instancePath}`), e.var(X.default.parentData, (0, G._)`${X.default.valCxt}.${X.default.parentData}`), e.var(X.default.parentDataProperty, (0, G._)`${X.default.valCxt}.${X.default.parentDataProperty}`), e.var(X.default.rootData, (0, G._)`${X.default.valCxt}.${X.default.rootData}`), t.dynamicRef && e.var(X.default.dynamicAnchors, (0, G._)`${X.default.valCxt}.${X.default.dynamicAnchors}`);
  }, () => {
    e.var(X.default.instancePath, (0, G._)`""`), e.var(X.default.parentData, (0, G._)`undefined`), e.var(X.default.parentDataProperty, (0, G._)`undefined`), e.var(X.default.rootData, X.default.data), t.dynamicRef && e.var(X.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function gg(e) {
  const { schema: t, opts: r, gen: n } = e;
  Su(e, () => {
    r.$comment && t.$comment && Ou(e), Sg(e), n.let(X.default.vErrors, null), n.let(X.default.errors, 0), r.unevaluated && _g(e), Tu(e), Ng(e);
  });
}
function _g(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function Hi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function vg(e, t) {
  if (Pu(e) && (Nu(e), bu(e))) {
    wg(e, t);
    return;
  }
  (0, Eu.boolOrEmptySchema)(e, t);
}
function bu({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Pu(e) {
  return typeof e.schema != "boolean";
}
function wg(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Ou(e), bg(e), Pg(e);
  const a = n.const("_errs", X.default.errors);
  Tu(e, a), n.var(t, (0, G._)`${a} === ${X.default.errors}`);
}
function Nu(e) {
  (0, _t.checkUnknownRules)(e), Eg(e);
}
function Tu(e, t) {
  if (e.opts.jtd)
    return Bi(e, [], !1, t);
  const r = (0, Gi.getSchemaTypes)(e.schema), n = (0, Gi.coerceAndCheckDataType)(e, r);
  Bi(e, r, !n, t);
}
function Eg(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, _t.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Sg(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, _t.checkStrictMode)(e, "default is ignored in the schema root");
}
function bg(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, pg.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Pg(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Ou({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${X.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const o = (0, G.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${X.default.self}.opts.$comment(${a}, ${o}, ${l}.schema)`);
  }
}
function Ng(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${X.default.errors} === 0`, () => t.return(X.default.data), () => t.throw((0, G._)`new ${s}(${X.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, X.default.vErrors), a.unevaluated && Tg(e), t.return((0, G._)`${X.default.errors} === 0`));
}
function Tg({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function Bi(e, t, r, n) {
  const { gen: s, schema: a, data: o, allErrors: l, opts: c, self: d } = e, { RULES: u } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, _t.schemaHasRulesButRef)(a, u))) {
    s.block(() => ju(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || Og(e, t), s.block(() => {
    for (const b of u.rules)
      h(b);
    h(u.post);
  });
  function h(b) {
    (0, wo.shouldUseGroup)(a, b) && (b.type ? (s.if((0, Zn.checkDataType)(b.type, o, c.strictNumbers)), Ji(e, b), t.length === 1 && t[0] === b.type && r && (s.else(), (0, Zn.reportTypeError)(e)), s.endIf()) : Ji(e, b), l || s.if((0, G._)`${X.default.errors} === ${n || 0}`));
  }
}
function Ji(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, hg.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, wo.shouldUseRule)(n, a) && ju(e, a.keyword, a.definition, t.type);
  });
}
function Og(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (Rg(e, t), e.opts.allowUnionTypes || Ig(e, t), jg(e, e.dataTypes));
}
function Rg(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Ru(e.dataTypes, r) || Eo(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), kg(e, t);
  }
}
function Ig(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Eo(e, "use allowUnionTypes to allow union type keyword");
}
function jg(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, wo.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((o) => Ag(t, o)) && Eo(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function Ag(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Ru(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function kg(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Ru(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Eo(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, _t.checkStrictMode)(e, t, e.opts.strictTypes);
}
class Iu {
  constructor(t, r, n) {
    if ((0, Qr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, _t.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Au(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Qr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Ur.reportExtraError : Ur.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Ur.reportError)(this, this.def.$dataError || Ur.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Ur.resetErrorsCount)(this.gen, this.errsCount);
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
    const { gen: n, schemaCode: s, schemaType: a, def: o } = this;
    n.if((0, G.or)((0, G._)`${s} === undefined`, r)), t !== G.nil && n.assign(t, !0), (a.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== G.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, G.or)(o(), l());
    function o() {
      if (n.length) {
        if (!(r instanceof G.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, G._)`${(0, Zn.checkDataTypes)(c, r, a.opts.strictNumbers, Zn.DataType.Wrong)}`;
      }
      return G.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, G._)`!${c}(${r})`;
      }
      return G.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Is.getSubschema)(this.it, t);
    (0, Is.extendSubschemaData)(n, this.it, t), (0, Is.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return vg(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = _t.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = _t.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, G.Name)), !0;
  }
}
tt.KeywordCxt = Iu;
function ju(e, t, r, n) {
  const s = new Iu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Qr.funcKeywordCode)(s, r) : "macro" in r ? (0, Qr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Qr.funcKeywordCode)(s, r);
}
const Cg = /^\/(?:[^~]|~0|~1)*$/, Dg = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Au(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return X.default.rootData;
  if (e[0] === "/") {
    if (!Cg.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = X.default.rootData;
  } else {
    const d = Dg.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (a = r[t - u], !s)
      return a;
  }
  let o = a;
  const l = s.split("/");
  for (const d of l)
    d && (a = (0, G._)`${a}${(0, G.getProperty)((0, _t.unescapeJsonPointer)(d))}`, o = (0, G._)`${o} && ${a}`);
  return o;
  function c(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
tt.getData = Au;
var un = {};
Object.defineProperty(un, "__esModule", { value: !0 });
class Mg extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
un.default = Mg;
var Ar = {};
Object.defineProperty(Ar, "__esModule", { value: !0 });
const js = Te;
class Lg extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, js.resolveUrl)(t, r, n), this.missingSchema = (0, js.normalizeId)((0, js.getFullPath)(t, this.missingRef));
  }
}
Ar.default = Lg;
var Ue = {};
Object.defineProperty(Ue, "__esModule", { value: !0 });
Ue.resolveSchema = Ue.getCompilingSchema = Ue.resolveRef = Ue.compileSchema = Ue.SchemaEnv = void 0;
const Xe = Z, Fg = un, Wt = pt, xe = Te, Xi = L, Vg = tt;
class hs {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, xe.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Ue.SchemaEnv = hs;
function So(e) {
  const t = ku.call(this, e);
  if (t)
    return t;
  const r = (0, xe.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, o = new Xe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let l;
  e.$async && (l = o.scopeValue("Error", {
    ref: Fg.default,
    code: (0, Xe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Wt.default.data,
    parentData: Wt.default.parentData,
    parentDataProperty: Wt.default.parentDataProperty,
    dataNames: [Wt.default.data],
    dataPathArr: [Xe.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Xe.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
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
  let u;
  try {
    this._compilations.add(e), (0, Vg.validateFunctionCode)(d), o.optimize(this.opts.code.optimize);
    const h = o.toString();
    u = `${o.scopeRefs(Wt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const g = new Function(`${Wt.default.self}`, `${Wt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: g }), g.errors = null, g.schema = e.schema, g.schemaEnv = e, e.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: c, validateCode: h, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: v, items: _ } = d;
      g.evaluated = {
        props: v instanceof Xe.Name ? void 0 : v,
        items: _ instanceof Xe.Name ? void 0 : _,
        dynamicProps: v instanceof Xe.Name,
        dynamicItems: _ instanceof Xe.Name
      }, g.source && (g.source.evaluated = (0, Xe.stringify)(g.evaluated));
    }
    return e.validate = g, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
Ue.compileSchema = So;
function Ug(e, t, r) {
  var n;
  r = (0, xe.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Kg.call(this, e, r);
  if (a === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    o && (a = new hs({ schema: o, schemaId: l, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = zg.call(this, a);
}
Ue.resolveRef = Ug;
function zg(e) {
  return (0, xe.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : So.call(this, e);
}
function ku(e) {
  for (const t of this._compilations)
    if (qg(t, e))
      return t;
}
Ue.getCompilingSchema = ku;
function qg(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Kg(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || ps.call(this, e, t);
}
function ps(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, xe._getFullPath)(this.opts.uriResolver, r);
  let s = (0, xe.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return As.call(this, r, e);
  const a = (0, xe.normalizeId)(n), o = this.refs[a] || this.schemas[a];
  if (typeof o == "string") {
    const l = ps.call(this, e, o);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : As.call(this, r, l);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || So.call(this, o), a === (0, xe.normalizeId)(t)) {
      const { schema: l } = o, { schemaId: c } = this.opts, d = l[c];
      return d && (s = (0, xe.resolveUrl)(this.opts.uriResolver, s, d)), new hs({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return As.call(this, r, o);
  }
}
Ue.resolveSchema = ps;
const Gg = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function As(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Xi.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !Gg.has(l) && d && (t = (0, xe.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Xi.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, xe.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = ps.call(this, n, l);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new hs({ schema: r, schemaId: o, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Hg = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Bg = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Jg = "object", Xg = [
  "$data"
], Wg = {
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
}, Yg = !1, Qg = {
  $id: Hg,
  description: Bg,
  type: Jg,
  required: Xg,
  properties: Wg,
  additionalProperties: Yg
};
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const Cu = Gl;
Cu.code = 'require("ajv/dist/runtime/uri").default';
bo.default = Cu;
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
  const n = un, s = Ar, a = or, o = Ue, l = Z, c = Te, d = ve, u = L, h = Qg, b = bo, g = (w, m) => new RegExp(w, m);
  g.code = "new RegExp";
  const v = ["removeAdditional", "useDefaults", "coerceTypes"], _ = /* @__PURE__ */ new Set([
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
  }, E = 200;
  function N(w) {
    var m, S, y, i, f, P, j, A, q, F, re, ze, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut, zt, qt, Kt, Gt, Ht;
    const Be = w.strict, Bt = (m = w.code) === null || m === void 0 ? void 0 : m.optimize, Mr = Bt === !0 || Bt === void 0 ? 1 : Bt || 0, Lr = (y = (S = w.code) === null || S === void 0 ? void 0 : S.regExp) !== null && y !== void 0 ? y : g, bs = (i = w.uriResolver) !== null && i !== void 0 ? i : b.default;
    return {
      strictSchema: (P = (f = w.strictSchema) !== null && f !== void 0 ? f : Be) !== null && P !== void 0 ? P : !0,
      strictNumbers: (A = (j = w.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = w.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (ze = (re = w.strictTuples) !== null && re !== void 0 ? re : Be) !== null && ze !== void 0 ? ze : "log",
      strictRequired: (Ct = (kt = w.strictRequired) !== null && kt !== void 0 ? kt : Be) !== null && Ct !== void 0 ? Ct : !1,
      code: w.code ? { ...w.code, optimize: Mr, regExp: Lr } : { optimize: Mr, regExp: Lr },
      loopRequired: (Dt = w.loopRequired) !== null && Dt !== void 0 ? Dt : E,
      loopEnum: (Mt = w.loopEnum) !== null && Mt !== void 0 ? Mt : E,
      meta: (Lt = w.meta) !== null && Lt !== void 0 ? Lt : !0,
      messages: (Ft = w.messages) !== null && Ft !== void 0 ? Ft : !0,
      inlineRefs: (Vt = w.inlineRefs) !== null && Vt !== void 0 ? Vt : !0,
      schemaId: (Ut = w.schemaId) !== null && Ut !== void 0 ? Ut : "$id",
      addUsedSchema: (zt = w.addUsedSchema) !== null && zt !== void 0 ? zt : !0,
      validateSchema: (qt = w.validateSchema) !== null && qt !== void 0 ? qt : !0,
      validateFormats: (Kt = w.validateFormats) !== null && Kt !== void 0 ? Kt : !0,
      unicodeRegExp: (Gt = w.unicodeRegExp) !== null && Gt !== void 0 ? Gt : !0,
      int32range: (Ht = w.int32range) !== null && Ht !== void 0 ? Ht : !0,
      uriResolver: bs
    };
  }
  class O {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...N(m) };
      const { es5: S, lines: y } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: _, es5: S, lines: y }), this.logger = Q(m.logger);
      const i = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, m, "NOT SUPPORTED"), I.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = H.call(this), m.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && V.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), B.call(this), m.validateFormats = i;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: S, schemaId: y } = this.opts;
      let i = h;
      y === "id" && (i = { ...h }, i.id = i.$id, delete i.$id), S && m && this.addMetaSchema(i, i[y], !1);
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
      const i = y(S);
      return "$async" in y || (this.errors = y.errors), i;
    }
    compile(m, S) {
      const y = this._addSchema(m, S);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(m, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return i.call(this, m, S);
      async function i(F, re) {
        await f.call(this, F.$schema);
        const ze = this._addSchema(F, re);
        return ze.validate || P.call(this, ze);
      }
      async function f(F) {
        F && !this.getSchema(F) && await i.call(this, { $ref: F }, !0);
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
    addSchema(m, S, y, i = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const P of m)
          this.addSchema(P, void 0, y, i);
        return this;
      }
      let f;
      if (typeof m == "object") {
        const { schemaId: P } = this.opts;
        if (f = m[P], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return S = (0, c.normalizeId)(S || f), this._checkUnique(S), this.schemas[S] = this._addSchema(m, y, S, i, !0), this;
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
      const i = this.validate(y, m);
      if (!i && S) {
        const f = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(f);
        else
          throw new Error(f);
      }
      return i;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(m) {
      let S;
      for (; typeof (S = z.call(this, m)) == "string"; )
        m = S;
      if (S === void 0) {
        const { schemaId: y } = this.opts, i = new o.SchemaEnv({ schema: {}, schemaId: y });
        if (S = o.resolveSchema.call(this, i, m), !S)
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
        return (0, u.eachItem)(y, (f) => k.call(this, f)), this;
      D.call(this, S);
      const i = {
        ...S,
        type: (0, d.getJSONTypes)(S.type),
        schemaType: (0, d.getJSONTypes)(S.schemaType)
      };
      return (0, u.eachItem)(y, i.type.length === 0 ? (f) => k.call(this, f, i) : (f) => i.type.forEach((P) => k.call(this, f, i, P))), this;
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
        const i = y.rules.findIndex((f) => f.keyword === m);
        i >= 0 && y.rules.splice(i, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[m] = S, this;
    }
    errorsText(m = this.errors, { separator: S = ", ", dataVar: y = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((i) => `${y}${i.instancePath} ${i.message}`).reduce((i, f) => i + S + f);
    }
    $dataMetaSchema(m, S) {
      const y = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const i of S) {
        const f = i.split("/").slice(1);
        let P = m;
        for (const j of f)
          P = P[j];
        for (const j in y) {
          const A = y[j];
          if (typeof A != "object")
            continue;
          const { $data: q } = A.definition, F = P[j];
          q && F && (P[j] = R(F));
        }
      }
      return m;
    }
    _removeAllSchemas(m, S) {
      for (const y in m) {
        const i = m[y];
        (!S || S.test(y)) && (typeof i == "string" ? delete m[y] : i && !i.meta && (this._cache.delete(i.schema), delete m[y]));
      }
    }
    _addSchema(m, S, y, i = this.opts.validateSchema, f = this.opts.addUsedSchema) {
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
      return A = new o.SchemaEnv({ schema: m, schemaId: j, meta: S, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), i && this.validateSchema(m, !0), A;
    }
    _checkUnique(m) {
      if (this.schemas[m] || this.refs[m])
        throw new Error(`schema with key or id "${m}" already exists`);
    }
    _compileSchemaEnv(m) {
      if (m.meta ? this._compileMetaSchema(m) : o.compileSchema.call(this, m), !m.validate)
        throw new Error("ajv implementation error");
      return m.validate;
    }
    _compileMetaSchema(m) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, m);
      } finally {
        this.opts = S;
      }
    }
  }
  O.ValidationError = n.default, O.MissingRefError = s.default, e.default = O;
  function I(w, m, S, y = "error") {
    for (const i in w) {
      const f = i;
      f in m && this.logger[y](`${S}: option ${i}. ${w[f]}`);
    }
  }
  function z(w) {
    return w = (0, c.normalizeId)(w), this.schemas[w] || this.refs[w];
  }
  function B() {
    const w = this.opts.schemas;
    if (w)
      if (Array.isArray(w))
        this.addSchema(w);
      else
        for (const m in w)
          this.addSchema(w[m], m);
  }
  function ue() {
    for (const w in this.opts.formats) {
      const m = this.opts.formats[w];
      m && this.addFormat(w, m);
    }
  }
  function V(w) {
    if (Array.isArray(w)) {
      this.addVocabulary(w);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in w) {
      const S = w[m];
      S.keyword || (S.keyword = m), this.addKeyword(S);
    }
  }
  function H() {
    const w = { ...this.opts };
    for (const m of v)
      delete w[m];
    return w;
  }
  const ne = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(w) {
    if (w === !1)
      return ne;
    if (w === void 0)
      return console;
    if (w.log && w.warn && w.error)
      return w;
    throw new Error("logger must implement log, warn and error methods");
  }
  const de = /^[a-z_$][a-z0-9_$:-]*$/i;
  function C(w, m) {
    const { RULES: S } = this;
    if ((0, u.eachItem)(w, (y) => {
      if (S.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(w, m, S) {
    var y;
    const i = m == null ? void 0 : m.post;
    if (S && i)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let P = i ? f.post : f.rules.find(({ type: A }) => A === S);
    if (P || (P = { type: S, rules: [] }, f.rules.push(P)), f.keywords[w] = !0, !m)
      return;
    const j = {
      keyword: w,
      definition: {
        ...m,
        type: (0, d.getJSONTypes)(m.type),
        schemaType: (0, d.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? U.call(this, P, j, m.before) : P.rules.push(j), f.all[w] = j, (y = m.implements) === null || y === void 0 || y.forEach((A) => this.addKeyword(A));
  }
  function U(w, m, S) {
    const y = w.rules.findIndex((i) => i.keyword === S);
    y >= 0 ? w.rules.splice(y, 0, m) : (w.rules.push(m), this.logger.warn(`rule ${S} is not defined`));
  }
  function D(w) {
    let { metaSchema: m } = w;
    m !== void 0 && (w.$data && this.opts.$data && (m = R(m)), w.validateSchema = this.compile(m, !0));
  }
  const T = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function R(w) {
    return { anyOf: [w, T] };
  }
})(ru);
var Po = {}, No = {}, To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const Zg = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
To.default = Zg;
var ir = {};
Object.defineProperty(ir, "__esModule", { value: !0 });
ir.callRef = ir.getValidate = void 0;
const xg = Ar, Wi = ee, Fe = Z, fr = pt, Yi = Ue, En = L, e_ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: o, opts: l, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = Yi.resolveRef.call(c, d, s, r);
    if (u === void 0)
      throw new xg.default(n.opts.uriResolver, s, r);
    if (u instanceof Yi.SchemaEnv)
      return b(u);
    return g(u);
    function h() {
      if (a === d)
        return Vn(e, o, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return Vn(e, (0, Fe._)`${v}.validate`, d, d.$async);
    }
    function b(v) {
      const _ = Du(e, v);
      Vn(e, _, v, v.$async);
    }
    function g(v) {
      const _ = t.scopeValue("schema", l.code.source === !0 ? { ref: v, code: (0, Fe.stringify)(v) } : { ref: v }), $ = t.name("valid"), p = e.subschema({
        schema: v,
        dataTypes: [],
        schemaPath: Fe.nil,
        topSchemaRef: _,
        errSchemaPath: r
      }, $);
      e.mergeEvaluated(p), e.ok($);
    }
  }
};
function Du(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Fe._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
ir.getValidate = Du;
function Vn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: o, schemaEnv: l, opts: c } = a, d = c.passContext ? fr.default.this : Fe.nil;
  n ? u() : h();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Fe._)`await ${(0, Wi.callValidateCode)(e, t, d)}`), g(t), o || s.assign(v, !0);
    }, (_) => {
      s.if((0, Fe._)`!(${_} instanceof ${a.ValidationError})`, () => s.throw(_)), b(_), o || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, Wi.callValidateCode)(e, t, d), () => g(t), () => b(t));
  }
  function b(v) {
    const _ = (0, Fe._)`${v}.errors`;
    s.assign(fr.default.vErrors, (0, Fe._)`${fr.default.vErrors} === null ? ${_} : ${fr.default.vErrors}.concat(${_})`), s.assign(fr.default.errors, (0, Fe._)`${fr.default.vErrors}.length`);
  }
  function g(v) {
    var _;
    if (!a.opts.unevaluated)
      return;
    const $ = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = En.mergeEvaluated.props(s, $.props, a.props));
      else {
        const p = s.var("props", (0, Fe._)`${v}.evaluated.props`);
        a.props = En.mergeEvaluated.props(s, p, a.props, Fe.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = En.mergeEvaluated.items(s, $.items, a.items));
      else {
        const p = s.var("items", (0, Fe._)`${v}.evaluated.items`);
        a.items = En.mergeEvaluated.items(s, p, a.items, Fe.Name);
      }
  }
}
ir.callRef = Vn;
ir.default = e_;
Object.defineProperty(No, "__esModule", { value: !0 });
const t_ = To, r_ = ir, n_ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  t_.default,
  r_.default
];
No.default = n_;
var Oo = {}, Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const xn = Z, bt = xn.operators, es = {
  maximum: { okStr: "<=", ok: bt.LTE, fail: bt.GT },
  minimum: { okStr: ">=", ok: bt.GTE, fail: bt.LT },
  exclusiveMaximum: { okStr: "<", ok: bt.LT, fail: bt.GTE },
  exclusiveMinimum: { okStr: ">", ok: bt.GT, fail: bt.LTE }
}, s_ = {
  message: ({ keyword: e, schemaCode: t }) => (0, xn.str)`must be ${es[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, xn._)`{comparison: ${es[e].okStr}, limit: ${t}}`
}, a_ = {
  keyword: Object.keys(es),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: s_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, xn._)`${r} ${es[t].fail} ${n} || isNaN(${r})`);
  }
};
Ro.default = a_;
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
const Zr = Z, o_ = {
  message: ({ schemaCode: e }) => (0, Zr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Zr._)`{multipleOf: ${e}}`
}, i_ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: o_,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, o = t.let("res"), l = a ? (0, Zr._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, Zr._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Zr._)`(${n} === 0 || (${o} = ${r}/${n}, ${l}))`);
  }
};
Io.default = i_;
var jo = {}, Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
function Mu(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ao.default = Mu;
Mu.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(jo, "__esModule", { value: !0 });
const tr = Z, c_ = L, l_ = Ao, u_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, tr.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, tr._)`{limit: ${e}}`
}, d_ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: u_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? tr.operators.GT : tr.operators.LT, o = s.opts.unicode === !1 ? (0, tr._)`${r}.length` : (0, tr._)`${(0, c_.useFunc)(e.gen, l_.default)}(${r})`;
    e.fail$data((0, tr._)`${o} ${a} ${n}`);
  }
};
jo.default = d_;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const f_ = ee, ts = Z, h_ = {
  message: ({ schemaCode: e }) => (0, ts.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, ts._)`{pattern: ${e}}`
}, p_ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: h_,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, o = a.opts.unicodeRegExp ? "u" : "", l = r ? (0, ts._)`(new RegExp(${s}, ${o}))` : (0, f_.usePattern)(e, n);
    e.fail$data((0, ts._)`!${l}.test(${t})`);
  }
};
ko.default = p_;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const xr = Z, m_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, xr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, xr._)`{limit: ${e}}`
}, y_ = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: m_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? xr.operators.GT : xr.operators.LT;
    e.fail$data((0, xr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Co.default = y_;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const zr = ee, en = Z, $_ = L, g_ = {
  message: ({ params: { missingProperty: e } }) => (0, en.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, en._)`{missingProperty: ${e}}`
}, __ = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: g_,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: o } = e, { opts: l } = o;
    if (!a && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (o.allErrors ? d() : u(), l.strictRequired) {
      const g = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const _ of r)
        if ((g == null ? void 0 : g[_]) === void 0 && !v.has(_)) {
          const $ = o.schemaEnv.baseId + o.errSchemaPath, p = `required property "${_}" is not defined at "${$}" (strictRequired)`;
          (0, $_.checkStrictMode)(o, p, o.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(en.nil, h);
      else
        for (const g of r)
          (0, zr.checkReportMissingProp)(e, g);
    }
    function u() {
      const g = t.let("missing");
      if (c || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => b(g, v)), e.ok(v);
      } else
        t.if((0, zr.checkMissingProp)(e, r, g)), (0, zr.reportMissingProp)(e, g), t.else();
    }
    function h() {
      t.forOf("prop", n, (g) => {
        e.setParams({ missingProperty: g }), t.if((0, zr.noPropertyInData)(t, s, g, l.ownProperties), () => e.error());
      });
    }
    function b(g, v) {
      e.setParams({ missingProperty: g }), t.forOf(g, n, () => {
        t.assign(v, (0, zr.propertyInData)(t, s, g, l.ownProperties)), t.if((0, en.not)(v), () => {
          e.error(), t.break();
        });
      }, en.nil);
    }
  }
};
Do.default = __;
var Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
const tn = Z, v_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, tn.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, tn._)`{limit: ${e}}`
}, w_ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: v_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? tn.operators.GT : tn.operators.LT;
    e.fail$data((0, tn._)`${r}.length ${s} ${n}`);
  }
};
Mo.default = w_;
var Lo = {}, dn = {};
Object.defineProperty(dn, "__esModule", { value: !0 });
const Lu = os;
Lu.code = 'require("ajv/dist/runtime/equal").default';
dn.default = Lu;
Object.defineProperty(Lo, "__esModule", { value: !0 });
const ks = ve, Se = Z, E_ = L, S_ = dn, b_ = {
  message: ({ params: { i: e, j: t } }) => (0, Se.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Se._)`{i: ${e}, j: ${t}}`
}, P_ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: b_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: o, it: l } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, ks.getSchemaTypes)(a.items) : [];
    e.block$data(c, u, (0, Se._)`${o} === false`), e.ok(c);
    function u() {
      const v = t.let("i", (0, Se._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: v, j: _ }), t.assign(c, !0), t.if((0, Se._)`${v} > 1`, () => (h() ? b : g)(v, _));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function b(v, _) {
      const $ = t.name("item"), p = (0, ks.checkDataTypes)(d, $, l.opts.strictNumbers, ks.DataType.Wrong), E = t.const("indices", (0, Se._)`{}`);
      t.for((0, Se._)`;${v}--;`, () => {
        t.let($, (0, Se._)`${r}[${v}]`), t.if(p, (0, Se._)`continue`), d.length > 1 && t.if((0, Se._)`typeof ${$} == "string"`, (0, Se._)`${$} += "_"`), t.if((0, Se._)`typeof ${E}[${$}] == "number"`, () => {
          t.assign(_, (0, Se._)`${E}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Se._)`${E}[${$}] = ${v}`);
      });
    }
    function g(v, _) {
      const $ = (0, E_.useFunc)(t, S_.default), p = t.name("outer");
      t.label(p).for((0, Se._)`;${v}--;`, () => t.for((0, Se._)`${_} = ${v}; ${_}--;`, () => t.if((0, Se._)`${$}(${r}[${v}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(p);
      })));
    }
  }
};
Lo.default = P_;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const na = Z, N_ = L, T_ = dn, O_ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, na._)`{allowedValue: ${e}}`
}, R_ = {
  keyword: "const",
  $data: !0,
  error: O_,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, na._)`!${(0, N_.useFunc)(t, T_.default)}(${r}, ${s})`) : e.fail((0, na._)`${a} !== ${r}`);
  }
};
Fo.default = R_;
var Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
const Hr = Z, I_ = L, j_ = dn, A_ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Hr._)`{allowedValues: ${e}}`
}, k_ = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: A_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: o } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= o.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, I_.useFunc)(t, j_.default));
    let u;
    if (l || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const g = t.const("vSchema", a);
      u = (0, Hr.or)(...s.map((v, _) => b(g, _)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (g) => t.if((0, Hr._)`${d()}(${r}, ${g})`, () => t.assign(u, !0).break()));
    }
    function b(g, v) {
      const _ = s[v];
      return typeof _ == "object" && _ !== null ? (0, Hr._)`${d()}(${r}, ${g}[${v}])` : (0, Hr._)`${r} === ${_}`;
    }
  }
};
Vo.default = k_;
Object.defineProperty(Oo, "__esModule", { value: !0 });
const C_ = Ro, D_ = Io, M_ = jo, L_ = ko, F_ = Co, V_ = Do, U_ = Mo, z_ = Lo, q_ = Fo, K_ = Vo, G_ = [
  // number
  C_.default,
  D_.default,
  // string
  M_.default,
  L_.default,
  // object
  F_.default,
  V_.default,
  // array
  U_.default,
  z_.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  q_.default,
  K_.default
];
Oo.default = G_;
var Uo = {}, kr = {};
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.validateAdditionalItems = void 0;
const rr = Z, sa = L, H_ = {
  message: ({ params: { len: e } }) => (0, rr.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, rr._)`{limit: ${e}}`
}, B_ = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: H_,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, sa.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Fu(e, n);
  }
};
function Fu(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: o } = e;
  o.items = !0;
  const l = r.const("len", (0, rr._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, rr._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, sa.alwaysValidSchema)(o, n)) {
    const d = r.var("valid", (0, rr._)`${l} <= ${t.length}`);
    r.if((0, rr.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: sa.Type.Num }, d), o.allErrors || r.if((0, rr.not)(d), () => r.break());
    });
  }
}
kr.validateAdditionalItems = Fu;
kr.default = B_;
var zo = {}, Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.validateTuple = void 0;
const Qi = Z, Un = L, J_ = ee, X_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Vu(e, "additionalItems", t);
    r.items = !0, !(0, Un.alwaysValidSchema)(r, t) && e.ok((0, J_.validateArray)(e));
  }
};
function Vu(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: o, it: l } = e;
  u(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = Un.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), d = n.const("len", (0, Qi._)`${a}.length`);
  r.forEach((h, b) => {
    (0, Un.alwaysValidSchema)(l, h) || (n.if((0, Qi._)`${d} > ${b}`, () => e.subschema({
      keyword: o,
      schemaProp: b,
      dataProp: b
    }, c)), e.ok(c));
  });
  function u(h) {
    const { opts: b, errSchemaPath: g } = l, v = r.length, _ = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (b.strictTuples && !_) {
      const $ = `"${o}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, Un.checkStrictMode)(l, $, b.strictTuples);
    }
  }
}
Cr.validateTuple = Vu;
Cr.default = X_;
Object.defineProperty(zo, "__esModule", { value: !0 });
const W_ = Cr, Y_ = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, W_.validateTuple)(e, "items")
};
zo.default = Y_;
var qo = {};
Object.defineProperty(qo, "__esModule", { value: !0 });
const Zi = Z, Q_ = L, Z_ = ee, x_ = kr, e0 = {
  message: ({ params: { len: e } }) => (0, Zi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Zi._)`{limit: ${e}}`
}, t0 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: e0,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Q_.alwaysValidSchema)(n, t) && (s ? (0, x_.validateAdditionalItems)(e, s) : e.ok((0, Z_.validateArray)(e)));
  }
};
qo.default = t0;
var Ko = {};
Object.defineProperty(Ko, "__esModule", { value: !0 });
const He = Z, Sn = L, r0 = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He.str)`must contain at least ${e} valid item(s)` : (0, He.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He._)`{minContains: ${e}}` : (0, He._)`{minContains: ${e}, maxContains: ${t}}`
}, n0 = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: r0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let o, l;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (o = c === void 0 ? 1 : c, l = d) : o = 1;
    const u = t.const("len", (0, He._)`${s}.length`);
    if (e.setParams({ min: o, max: l }), l === void 0 && o === 0) {
      (0, Sn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && o > l) {
      (0, Sn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Sn.alwaysValidSchema)(a, r)) {
      let _ = (0, He._)`${u} >= ${o}`;
      l !== void 0 && (_ = (0, He._)`${_} && ${u} <= ${l}`), e.pass(_);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    l === void 0 && o === 1 ? g(h, () => t.if(h, () => t.break())) : o === 0 ? (t.let(h, !0), l !== void 0 && t.if((0, He._)`${s}.length > 0`, b)) : (t.let(h, !1), b()), e.result(h, () => e.reset());
    function b() {
      const _ = t.name("_valid"), $ = t.let("count", 0);
      g(_, () => t.if(_, () => v($)));
    }
    function g(_, $) {
      t.forRange("i", 0, u, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: Sn.Type.Num,
          compositeRule: !0
        }, _), $();
      });
    }
    function v(_) {
      t.code((0, He._)`${_}++`), l === void 0 ? t.if((0, He._)`${_} >= ${o}`, () => t.assign(h, !0).break()) : (t.if((0, He._)`${_} > ${l}`, () => t.assign(h, !1).break()), o === 1 ? t.assign(h, !0) : t.if((0, He._)`${_} >= ${o}`, () => t.assign(h, !0)));
    }
  }
};
Ko.default = n0;
var Uu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = Z, r = L, n = ee;
  e.error = {
    message: ({ params: { property: c, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${c},
    missingProperty: ${h},
    depsCount: ${d},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [d, u] = a(c);
      o(c, d), l(c, u);
    }
  };
  function a({ schema: c }) {
    const d = {}, u = {};
    for (const h in c) {
      if (h === "__proto__")
        continue;
      const b = Array.isArray(c[h]) ? d : u;
      b[h] = c[h];
    }
    return [d, u];
  }
  function o(c, d = c.schema) {
    const { gen: u, data: h, it: b } = c;
    if (Object.keys(d).length === 0)
      return;
    const g = u.let("missing");
    for (const v in d) {
      const _ = d[v];
      if (_.length === 0)
        continue;
      const $ = (0, n.propertyInData)(u, h, v, b.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: _.length,
        deps: _.join(", ")
      }), b.allErrors ? u.if($, () => {
        for (const p of _)
          (0, n.checkReportMissingProp)(c, p);
      }) : (u.if((0, t._)`${$} && (${(0, n.checkMissingProp)(c, _, g)})`), (0, n.reportMissingProp)(c, g), u.else());
    }
  }
  e.validatePropertyDeps = o;
  function l(c, d = c.schema) {
    const { gen: u, data: h, keyword: b, it: g } = c, v = u.name("valid");
    for (const _ in d)
      (0, r.alwaysValidSchema)(g, d[_]) || (u.if(
        (0, n.propertyInData)(u, h, _, g.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: b, schemaProp: _ }, v);
          c.mergeValidEvaluated($, v);
        },
        () => u.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = l, e.default = s;
})(Uu);
var Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
const zu = Z, s0 = L, a0 = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, zu._)`{propertyName: ${e.propertyName}}`
}, o0 = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: a0,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, s0.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), t.if((0, zu.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Go.default = o0;
var ms = {};
Object.defineProperty(ms, "__esModule", { value: !0 });
const bn = ee, Ye = Z, i0 = pt, Pn = L, c0 = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ye._)`{additionalProperty: ${e.additionalProperty}}`
}, l0 = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: c0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: o } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, Pn.alwaysValidSchema)(o, r))
      return;
    const d = (0, bn.allSchemaProperties)(n.properties), u = (0, bn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Ye._)`${a} === ${i0.default.errors}`);
    function h() {
      t.forIn("key", s, ($) => {
        !d.length && !u.length ? v($) : t.if(b($), () => v($));
      });
    }
    function b($) {
      let p;
      if (d.length > 8) {
        const E = (0, Pn.schemaRefOrVal)(o, n.properties, "properties");
        p = (0, bn.isOwnProperty)(t, E, $);
      } else d.length ? p = (0, Ye.or)(...d.map((E) => (0, Ye._)`${$} === ${E}`)) : p = Ye.nil;
      return u.length && (p = (0, Ye.or)(p, ...u.map((E) => (0, Ye._)`${(0, bn.usePattern)(e, E)}.test(${$})`))), (0, Ye.not)(p);
    }
    function g($) {
      t.code((0, Ye._)`delete ${s}[${$}]`);
    }
    function v($) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        g($);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: $ }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Pn.alwaysValidSchema)(o, r)) {
        const p = t.name("valid");
        c.removeAdditional === "failing" ? (_($, p, !1), t.if((0, Ye.not)(p), () => {
          e.reset(), g($);
        })) : (_($, p), l || t.if((0, Ye.not)(p), () => t.break()));
      }
    }
    function _($, p, E) {
      const N = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: Pn.Type.Str
      };
      E === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, p);
    }
  }
};
ms.default = l0;
var Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
const u0 = tt, xi = ee, Cs = L, ec = ms, d0 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && ec.default.code(new u0.KeywordCxt(a, ec.default, "additionalProperties"));
    const o = (0, xi.allSchemaProperties)(r);
    for (const h of o)
      a.definedProperties.add(h);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = Cs.mergeEvaluated.props(t, (0, Cs.toHash)(o), a.props));
    const l = o.filter((h) => !(0, Cs.alwaysValidSchema)(a, r[h]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const h of l)
      d(h) ? u(h) : (t.if((0, xi.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, c);
    }
  }
};
Ho.default = d0;
var Bo = {};
Object.defineProperty(Bo, "__esModule", { value: !0 });
const tc = ee, Nn = Z, rc = L, nc = L, f0 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: o } = a, l = (0, tc.allSchemaProperties)(r), c = l.filter((_) => (0, rc.alwaysValidSchema)(a, r[_]));
    if (l.length === 0 || c.length === l.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = o.strictSchema && !o.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof Nn.Name) && (a.props = (0, nc.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    b();
    function b() {
      for (const _ of l)
        d && g(_), a.allErrors ? v(_) : (t.var(u, !0), v(_), t.if(u));
    }
    function g(_) {
      for (const $ in d)
        new RegExp(_).test($) && (0, rc.checkStrictMode)(a, `property ${$} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function v(_) {
      t.forIn("key", n, ($) => {
        t.if((0, Nn._)`${(0, tc.usePattern)(e, _)}.test(${$})`, () => {
          const p = c.includes(_);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: $,
            dataPropType: nc.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, Nn._)`${h}[${$}]`, !0) : !p && !a.allErrors && t.if((0, Nn.not)(u), () => t.break());
        });
      });
    }
  }
};
Bo.default = f0;
var Jo = {};
Object.defineProperty(Jo, "__esModule", { value: !0 });
const h0 = L, p0 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, h0.alwaysValidSchema)(n, r)) {
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
Jo.default = p0;
var Xo = {};
Object.defineProperty(Xo, "__esModule", { value: !0 });
const m0 = ee, y0 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: m0.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Xo.default = y0;
var Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
const zn = Z, $0 = L, g0 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, zn._)`{passingSchemas: ${e.passing}}`
}, _0 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: g0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, o = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(d), e.result(o, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let b;
        (0, $0.alwaysValidSchema)(s, u) ? t.var(c, !0) : b = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, zn._)`${c} && ${o}`).assign(o, !1).assign(l, (0, zn._)`[${l}, ${h}]`).else(), t.if(c, () => {
          t.assign(o, !0), t.assign(l, h), b && e.mergeEvaluated(b, zn.Name);
        });
      });
    }
  }
};
Wo.default = _0;
var Yo = {};
Object.defineProperty(Yo, "__esModule", { value: !0 });
const v0 = L, w0 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, o) => {
      if ((0, v0.alwaysValidSchema)(n, a))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: o }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
Yo.default = w0;
var Qo = {};
Object.defineProperty(Qo, "__esModule", { value: !0 });
const rs = Z, qu = L, E0 = {
  message: ({ params: e }) => (0, rs.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, rs._)`{failingKeyword: ${e.ifClause}}`
}, S0 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: E0,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, qu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = sc(n, "then"), a = sc(n, "else");
    if (!s && !a)
      return;
    const o = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, d("then", u), d("else", u));
    } else s ? t.if(l, d("then")) : t.if((0, rs.not)(l), d("else"));
    e.pass(o, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const b = e.subschema({ keyword: u }, l);
        t.assign(o, l), e.mergeValidEvaluated(b, o), h ? t.assign(h, (0, rs._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function sc(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, qu.alwaysValidSchema)(e, r);
}
Qo.default = S0;
var Zo = {};
Object.defineProperty(Zo, "__esModule", { value: !0 });
const b0 = L, P0 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, b0.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Zo.default = P0;
Object.defineProperty(Uo, "__esModule", { value: !0 });
const N0 = kr, T0 = zo, O0 = Cr, R0 = qo, I0 = Ko, j0 = Uu, A0 = Go, k0 = ms, C0 = Ho, D0 = Bo, M0 = Jo, L0 = Xo, F0 = Wo, V0 = Yo, U0 = Qo, z0 = Zo;
function q0(e = !1) {
  const t = [
    // any
    M0.default,
    L0.default,
    F0.default,
    V0.default,
    U0.default,
    z0.default,
    // object
    A0.default,
    k0.default,
    j0.default,
    C0.default,
    D0.default
  ];
  return e ? t.push(T0.default, R0.default) : t.push(N0.default, O0.default), t.push(I0.default), t;
}
Uo.default = q0;
var xo = {}, ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
const ye = Z, K0 = {
  message: ({ schemaCode: e }) => (0, ye.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ye._)`{format: ${e}}`
}, G0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: K0,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: o, it: l } = e, { opts: c, errSchemaPath: d, schemaEnv: u, self: h } = l;
    if (!c.validateFormats)
      return;
    s ? b() : g();
    function b() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), _ = r.const("fDef", (0, ye._)`${v}[${o}]`), $ = r.let("fType"), p = r.let("format");
      r.if((0, ye._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign($, (0, ye._)`${_}.type || "string"`).assign(p, (0, ye._)`${_}.validate`), () => r.assign($, (0, ye._)`"string"`).assign(p, _)), e.fail$data((0, ye.or)(E(), N()));
      function E() {
        return c.strictSchema === !1 ? ye.nil : (0, ye._)`${o} && !${p}`;
      }
      function N() {
        const O = u.$async ? (0, ye._)`(${_}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, ye._)`${p}(${n})`, I = (0, ye._)`(typeof ${p} == "function" ? ${O} : ${p}.test(${n}))`;
        return (0, ye._)`${p} && ${p} !== true && ${$} === ${t} && !${I}`;
      }
    }
    function g() {
      const v = h.formats[a];
      if (!v) {
        E();
        return;
      }
      if (v === !0)
        return;
      const [_, $, p] = N(v);
      _ === t && e.pass(O());
      function E() {
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
      function O() {
        if (typeof v == "object" && !(v instanceof RegExp) && v.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, ye._)`await ${p}(${n})`;
        }
        return typeof $ == "function" ? (0, ye._)`${p}(${n})` : (0, ye._)`${p}.test(${n})`;
      }
    }
  }
};
ei.default = G0;
Object.defineProperty(xo, "__esModule", { value: !0 });
const H0 = ei, B0 = [H0.default];
xo.default = B0;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.contentVocabulary = Or.metadataVocabulary = void 0;
Or.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Or.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Po, "__esModule", { value: !0 });
const J0 = No, X0 = Oo, W0 = Uo, Y0 = xo, ac = Or, Q0 = [
  J0.default,
  X0.default,
  (0, W0.default)(),
  Y0.default,
  ac.metadataVocabulary,
  ac.contentVocabulary
];
Po.default = Q0;
var ti = {}, ys = {};
Object.defineProperty(ys, "__esModule", { value: !0 });
ys.DiscrError = void 0;
var oc;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(oc || (ys.DiscrError = oc = {}));
Object.defineProperty(ti, "__esModule", { value: !0 });
const pr = Z, aa = ys, ic = Ue, Z0 = Ar, x0 = L, ev = {
  message: ({ params: { discrError: e, tagName: t } }) => e === aa.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, pr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, tv = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: ev,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: o } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), d = t.const("tag", (0, pr._)`${r}${(0, pr.getProperty)(l)}`);
    t.if((0, pr._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: aa.DiscrError.Tag, tag: d, tagName: l })), e.ok(c);
    function u() {
      const g = b();
      t.if(!1);
      for (const v in g)
        t.elseIf((0, pr._)`${d} === ${v}`), t.assign(c, h(g[v]));
      t.else(), e.error(!1, { discrError: aa.DiscrError.Mapping, tag: d, tagName: l }), t.endIf();
    }
    function h(g) {
      const v = t.name("valid"), _ = e.subschema({ keyword: "oneOf", schemaProp: g }, v);
      return e.mergeEvaluated(_, pr.Name), v;
    }
    function b() {
      var g;
      const v = {}, _ = p(s);
      let $ = !0;
      for (let O = 0; O < o.length; O++) {
        let I = o[O];
        if (I != null && I.$ref && !(0, x0.schemaHasRulesButRef)(I, a.self.RULES)) {
          const B = I.$ref;
          if (I = ic.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), I instanceof ic.SchemaEnv && (I = I.schema), I === void 0)
            throw new Z0.default(a.opts.uriResolver, a.baseId, B);
        }
        const z = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[l];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        $ = $ && (_ || p(I)), E(z, O);
      }
      if (!$)
        throw new Error(`discriminator: "${l}" must be required`);
      return v;
      function p({ required: O }) {
        return Array.isArray(O) && O.includes(l);
      }
      function E(O, I) {
        if (O.const)
          N(O.const, I);
        else if (O.enum)
          for (const z of O.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function N(O, I) {
        if (typeof O != "string" || O in v)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        v[O] = I;
      }
    }
  }
};
ti.default = tv;
const rv = "http://json-schema.org/draft-07/schema#", nv = "http://json-schema.org/draft-07/schema#", sv = "Core schema meta-schema", av = {
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
}, ov = [
  "object",
  "boolean"
], iv = {
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
}, cv = {
  $schema: rv,
  $id: nv,
  title: sv,
  definitions: av,
  type: ov,
  properties: iv,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = ru, n = Po, s = ti, a = cv, o = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((v) => this.addVocabulary(v)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const v = this.opts.$data ? this.$dataMetaSchema(a, o) : a;
      this.addMetaSchema(v, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var d = tt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = Z;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var h = un;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var b = Ar;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return b.default;
  } });
})(Zs, Zs.exports);
var lv = Zs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = lv, r = Z, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: l, schemaCode: c }) => r.str`should be ${s[l].okStr} ${c}`,
    params: ({ keyword: l, schemaCode: c }) => r._`{comparison: ${s[l].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(l) {
      const { gen: c, data: d, schemaCode: u, keyword: h, it: b } = l, { opts: g, self: v } = b;
      if (!g.validateFormats)
        return;
      const _ = new t.KeywordCxt(b, v.RULES.all.format.definition, "format");
      _.$data ? $() : p();
      function $() {
        const N = c.scopeValue("formats", {
          ref: v.formats,
          code: g.code.formats
        }), O = c.const("fmt", r._`${N}[${_.schemaCode}]`);
        l.fail$data(r.or(r._`typeof ${O} != "object"`, r._`${O} instanceof RegExp`, r._`typeof ${O}.compare != "function"`, E(O)));
      }
      function p() {
        const N = _.schema, O = v.formats[N];
        if (!O || O === !0)
          return;
        if (typeof O != "object" || O instanceof RegExp || typeof O.compare != "function")
          throw new Error(`"${h}": format "${N}" does not define "compare" function`);
        const I = c.scopeValue("formats", {
          key: N,
          ref: O,
          code: g.code.formats ? r._`${g.code.formats}${r.getProperty(N)}` : void 0
        });
        l.fail$data(E(I));
      }
      function E(N) {
        return r._`${N}.compare(${d}, ${u}) ${s[h].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (l) => (l.addKeyword(e.formatLimitDefinition), l);
  e.default = o;
})(tu);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = eu, n = tu, s = Z, a = new s.Name("fullFormats"), o = new s.Name("fastFormats"), l = (d, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return c(d, u, r.fullFormats, a), d;
    const [h, b] = u.mode === "fast" ? [r.fastFormats, o] : [r.fullFormats, a], g = u.formats || r.formatNames;
    return c(d, g, h, b), u.keywords && n.default(d), d;
  };
  l.get = (d, u = "full") => {
    const b = (u === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!b)
      throw new Error(`Unknown format "${d}"`);
    return b;
  };
  function c(d, u, h, b) {
    var g, v;
    (g = (v = d.opts.code).formats) !== null && g !== void 0 || (v.formats = s._`require("ajv-formats/dist/formats").${b}`);
    for (const _ of u)
      d.addFormat(_, h[_]);
  }
  e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
})(Qs, Qs.exports);
var uv = Qs.exports;
const dv = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !fv(s, a) && n || Object.defineProperty(e, r, a);
}, fv = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, hv = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, pv = (e, t) => `/* Wrapped ${e}*/
${t}`, mv = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), yv = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), $v = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = pv.bind(null, n, t.toString());
  Object.defineProperty(s, "name", yv), Object.defineProperty(e, "toString", { ...mv, value: s });
}, gv = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    dv(e, t, s, r);
  return hv(e, t), $v(e, t, n), e;
};
var _v = gv;
const vv = _v;
var wv = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    before: n = !1,
    after: s = !0
  } = t;
  if (!n && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let a, o;
  const l = function(...c) {
    const d = this, u = () => {
      a = void 0, s && (o = e.apply(d, c));
    }, h = n && !a;
    return clearTimeout(a), a = setTimeout(u, r), h && (o = e.apply(d, c)), o;
  };
  return vv(l, e), l.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, l;
}, oa = { exports: {} };
const Ev = "2.0.0", Ku = 256, Sv = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, bv = 16, Pv = Ku - 6, Nv = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var $s = {
  MAX_LENGTH: Ku,
  MAX_SAFE_COMPONENT_LENGTH: bv,
  MAX_SAFE_BUILD_LENGTH: Pv,
  MAX_SAFE_INTEGER: Sv,
  RELEASE_TYPES: Nv,
  SEMVER_SPEC_VERSION: Ev,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Tv = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var gs = Tv;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = $s, a = gs;
  t = e.exports = {};
  const o = t.re = [], l = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], u = t.t = {};
  let h = 0;
  const b = "[a-zA-Z0-9-]", g = [
    ["\\s", 1],
    ["\\d", s],
    [b, n]
  ], v = ($) => {
    for (const [p, E] of g)
      $ = $.split(`${p}*`).join(`${p}{0,${E}}`).split(`${p}+`).join(`${p}{1,${E}}`);
    return $;
  }, _ = ($, p, E) => {
    const N = v(p), O = h++;
    a($, O, p), u[$] = O, c[O] = p, d[O] = N, o[O] = new RegExp(p, E ? "g" : void 0), l[O] = new RegExp(N, E ? "g" : void 0);
  };
  _("NUMERICIDENTIFIER", "0|[1-9]\\d*"), _("NUMERICIDENTIFIERLOOSE", "\\d+"), _("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${b}*`), _("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), _("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASEIDENTIFIER", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), _("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), _("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), _("BUILDIDENTIFIER", `${b}+`), _("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), _("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), _("FULL", `^${c[u.FULLPLAIN]}$`), _("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), _("LOOSE", `^${c[u.LOOSEPLAIN]}$`), _("GTLT", "((?:<|>)?=?)"), _("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), _("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), _("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), _("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), _("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), _("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), _("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), _("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), _("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), _("COERCERTL", c[u.COERCE], !0), _("COERCERTLFULL", c[u.COERCEFULL], !0), _("LONETILDE", "(?:~>?)"), _("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", _("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), _("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), _("LONECARET", "(?:\\^)"), _("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", _("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), _("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), _("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), _("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), _("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", _("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), _("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), _("STAR", "(<|>)?=?\\s*\\*"), _("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), _("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(oa, oa.exports);
var fn = oa.exports;
const Ov = Object.freeze({ loose: !0 }), Rv = Object.freeze({}), Iv = (e) => e ? typeof e != "object" ? Ov : e : Rv;
var ri = Iv;
const cc = /^[0-9]+$/, Gu = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = cc.test(e), n = cc.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, jv = (e, t) => Gu(t, e);
var Hu = {
  compareIdentifiers: Gu,
  rcompareIdentifiers: jv
};
const Tn = gs, { MAX_LENGTH: lc, MAX_SAFE_INTEGER: On } = $s, { safeRe: Rn, t: In } = fn, Av = ri, { compareIdentifiers: Ds } = Hu;
let kv = class st {
  constructor(t, r) {
    if (r = Av(r), t instanceof st) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > lc)
      throw new TypeError(
        `version is longer than ${lc} characters`
      );
    Tn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Rn[In.LOOSE] : Rn[In.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > On || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > On || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > On || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < On)
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
    if (Tn("SemVer.compare", this.version, this.options, t), !(t instanceof st)) {
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
      if (Tn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Ds(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof st || (t = new st(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (Tn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Ds(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? Rn[In.PRERELEASELOOSE] : Rn[In.PRERELEASE]);
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
          n === !1 && (a = [r]), Ds(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var De = kv;
const uc = De, Cv = (e, t, r = !1) => {
  if (e instanceof uc)
    return e;
  try {
    return new uc(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Dr = Cv;
const Dv = Dr, Mv = (e, t) => {
  const r = Dv(e, t);
  return r ? r.version : null;
};
var Lv = Mv;
const Fv = Dr, Vv = (e, t) => {
  const r = Fv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Uv = Vv;
const dc = De, zv = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new dc(
      e instanceof dc ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var qv = zv;
const fc = Dr, Kv = (e, t) => {
  const r = fc(e, null, !0), n = fc(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, o = a ? r : n, l = a ? n : r, c = !!o.prerelease.length;
  if (!!l.prerelease.length && !c) {
    if (!l.patch && !l.minor)
      return "major";
    if (l.compareMain(o) === 0)
      return l.minor && !l.patch ? "minor" : "patch";
  }
  const u = c ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var Gv = Kv;
const Hv = De, Bv = (e, t) => new Hv(e, t).major;
var Jv = Bv;
const Xv = De, Wv = (e, t) => new Xv(e, t).minor;
var Yv = Wv;
const Qv = De, Zv = (e, t) => new Qv(e, t).patch;
var xv = Zv;
const ew = Dr, tw = (e, t) => {
  const r = ew(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var rw = tw;
const hc = De, nw = (e, t, r) => new hc(e, r).compare(new hc(t, r));
var rt = nw;
const sw = rt, aw = (e, t, r) => sw(t, e, r);
var ow = aw;
const iw = rt, cw = (e, t) => iw(e, t, !0);
var lw = cw;
const pc = De, uw = (e, t, r) => {
  const n = new pc(e, r), s = new pc(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var ni = uw;
const dw = ni, fw = (e, t) => e.sort((r, n) => dw(r, n, t));
var hw = fw;
const pw = ni, mw = (e, t) => e.sort((r, n) => pw(n, r, t));
var yw = mw;
const $w = rt, gw = (e, t, r) => $w(e, t, r) > 0;
var _s = gw;
const _w = rt, vw = (e, t, r) => _w(e, t, r) < 0;
var si = vw;
const ww = rt, Ew = (e, t, r) => ww(e, t, r) === 0;
var Bu = Ew;
const Sw = rt, bw = (e, t, r) => Sw(e, t, r) !== 0;
var Ju = bw;
const Pw = rt, Nw = (e, t, r) => Pw(e, t, r) >= 0;
var ai = Nw;
const Tw = rt, Ow = (e, t, r) => Tw(e, t, r) <= 0;
var oi = Ow;
const Rw = Bu, Iw = Ju, jw = _s, Aw = ai, kw = si, Cw = oi, Dw = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return Rw(e, r, n);
    case "!=":
      return Iw(e, r, n);
    case ">":
      return jw(e, r, n);
    case ">=":
      return Aw(e, r, n);
    case "<":
      return kw(e, r, n);
    case "<=":
      return Cw(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Xu = Dw;
const Mw = De, Lw = Dr, { safeRe: jn, t: An } = fn, Fw = (e, t) => {
  if (e instanceof Mw)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? jn[An.COERCEFULL] : jn[An.COERCE]);
  else {
    const c = t.includePrerelease ? jn[An.COERCERTLFULL] : jn[An.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", o = t.includePrerelease && r[5] ? `-${r[5]}` : "", l = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return Lw(`${n}.${s}.${a}${o}${l}`, t);
};
var Vw = Fw;
class Uw {
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
var zw = Uw, Ms, mc;
function nt() {
  if (mc) return Ms;
  mc = 1;
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
        if (this.set = this.set.filter((T) => !_(T[0])), this.set.length === 0)
          this.set = [D];
        else if (this.set.length > 1) {
          for (const T of this.set)
            if (T.length === 1 && $(T[0])) {
              this.set = [T];
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
      const D = ((this.options.includePrerelease && g) | (this.options.loose && v)) + ":" + k, T = n.get(D);
      if (T)
        return T;
      const R = this.options.loose, w = R ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      k = k.replace(w, Q(this.options.includePrerelease)), o("hyphen replace", k), k = k.replace(c[d.COMPARATORTRIM], u), o("comparator trim", k), k = k.replace(c[d.TILDETRIM], h), o("tilde trim", k), k = k.replace(c[d.CARETTRIM], b), o("caret trim", k);
      let m = k.split(" ").map((f) => E(f, this.options)).join(" ").split(/\s+/).map((f) => ne(f, this.options));
      R && (m = m.filter((f) => (o("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), o("range list", m);
      const S = /* @__PURE__ */ new Map(), y = m.map((f) => new a(f, this.options));
      for (const f of y) {
        if (_(f))
          return [f];
        S.set(f.value, f);
      }
      S.size > 1 && S.has("") && S.delete("");
      const i = [...S.values()];
      return n.set(D, i), i;
    }
    intersects(k, U) {
      if (!(k instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((D) => p(D, U) && k.set.some((T) => p(T, U) && D.every((R) => T.every((w) => R.intersects(w, U)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(k) {
      if (!k)
        return !1;
      if (typeof k == "string")
        try {
          k = new l(k, this.options);
        } catch {
          return !1;
        }
      for (let U = 0; U < this.set.length; U++)
        if (de(this.set[U], k, this.options))
          return !0;
      return !1;
    }
  }
  Ms = t;
  const r = zw, n = new r(), s = ri, a = vs(), o = gs, l = De, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: u,
    tildeTrimReplace: h,
    caretTrimReplace: b
  } = fn, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: v } = $s, _ = (C) => C.value === "<0.0.0-0", $ = (C) => C.value === "", p = (C, k) => {
    let U = !0;
    const D = C.slice();
    let T = D.pop();
    for (; U && D.length; )
      U = D.every((R) => T.intersects(R, k)), T = D.pop();
    return U;
  }, E = (C, k) => (C = C.replace(c[d.BUILD], ""), o("comp", C, k), C = z(C, k), o("caret", C), C = O(C, k), o("tildes", C), C = ue(C, k), o("xrange", C), C = H(C, k), o("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", O = (C, k) => C.trim().split(/\s+/).map((U) => I(U, k)).join(" "), I = (C, k) => {
    const U = k.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return C.replace(U, (D, T, R, w, m) => {
      o("tilde", C, D, T, R, w, m);
      let S;
      return N(T) ? S = "" : N(R) ? S = `>=${T}.0.0 <${+T + 1}.0.0-0` : N(w) ? S = `>=${T}.${R}.0 <${T}.${+R + 1}.0-0` : m ? (o("replaceTilde pr", m), S = `>=${T}.${R}.${w}-${m} <${T}.${+R + 1}.0-0`) : S = `>=${T}.${R}.${w} <${T}.${+R + 1}.0-0`, o("tilde return", S), S;
    });
  }, z = (C, k) => C.trim().split(/\s+/).map((U) => B(U, k)).join(" "), B = (C, k) => {
    o("caret", C, k);
    const U = k.loose ? c[d.CARETLOOSE] : c[d.CARET], D = k.includePrerelease ? "-0" : "";
    return C.replace(U, (T, R, w, m, S) => {
      o("caret", C, T, R, w, m, S);
      let y;
      return N(R) ? y = "" : N(w) ? y = `>=${R}.0.0${D} <${+R + 1}.0.0-0` : N(m) ? R === "0" ? y = `>=${R}.${w}.0${D} <${R}.${+w + 1}.0-0` : y = `>=${R}.${w}.0${D} <${+R + 1}.0.0-0` : S ? (o("replaceCaret pr", S), R === "0" ? w === "0" ? y = `>=${R}.${w}.${m}-${S} <${R}.${w}.${+m + 1}-0` : y = `>=${R}.${w}.${m}-${S} <${R}.${+w + 1}.0-0` : y = `>=${R}.${w}.${m}-${S} <${+R + 1}.0.0-0`) : (o("no pr"), R === "0" ? w === "0" ? y = `>=${R}.${w}.${m}${D} <${R}.${w}.${+m + 1}-0` : y = `>=${R}.${w}.${m}${D} <${R}.${+w + 1}.0-0` : y = `>=${R}.${w}.${m} <${+R + 1}.0.0-0`), o("caret return", y), y;
    });
  }, ue = (C, k) => (o("replaceXRanges", C, k), C.split(/\s+/).map((U) => V(U, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const U = k.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return C.replace(U, (D, T, R, w, m, S) => {
      o("xRange", C, D, T, R, w, m, S);
      const y = N(R), i = y || N(w), f = i || N(m), P = f;
      return T === "=" && P && (T = ""), S = k.includePrerelease ? "-0" : "", y ? T === ">" || T === "<" ? D = "<0.0.0-0" : D = "*" : T && P ? (i && (w = 0), m = 0, T === ">" ? (T = ">=", i ? (R = +R + 1, w = 0, m = 0) : (w = +w + 1, m = 0)) : T === "<=" && (T = "<", i ? R = +R + 1 : w = +w + 1), T === "<" && (S = "-0"), D = `${T + R}.${w}.${m}${S}`) : i ? D = `>=${R}.0.0${S} <${+R + 1}.0.0-0` : f && (D = `>=${R}.${w}.0${S} <${R}.${+w + 1}.0-0`), o("xRange return", D), D;
    });
  }, H = (C, k) => (o("replaceStars", C, k), C.trim().replace(c[d.STAR], "")), ne = (C, k) => (o("replaceGTE0", C, k), C.trim().replace(c[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, U, D, T, R, w, m, S, y, i, f, P) => (N(D) ? U = "" : N(T) ? U = `>=${D}.0.0${C ? "-0" : ""}` : N(R) ? U = `>=${D}.${T}.0${C ? "-0" : ""}` : w ? U = `>=${U}` : U = `>=${U}${C ? "-0" : ""}`, N(y) ? S = "" : N(i) ? S = `<${+y + 1}.0.0-0` : N(f) ? S = `<${y}.${+i + 1}.0-0` : P ? S = `<=${y}.${i}.${f}-${P}` : C ? S = `<${y}.${i}.${+f + 1}-0` : S = `<=${S}`, `${U} ${S}`.trim()), de = (C, k, U) => {
    for (let D = 0; D < C.length; D++)
      if (!C[D].test(k))
        return !1;
    if (k.prerelease.length && !U.includePrerelease) {
      for (let D = 0; D < C.length; D++)
        if (o(C[D].semver), C[D].semver !== a.ANY && C[D].semver.prerelease.length > 0) {
          const T = C[D].semver;
          if (T.major === k.major && T.minor === k.minor && T.patch === k.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ms;
}
var Ls, yc;
function vs() {
  if (yc) return Ls;
  yc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, h) {
      if (h = r(h), u instanceof t) {
        if (u.loose === !!h.loose)
          return u;
        u = u.value;
      }
      u = u.trim().split(/\s+/).join(" "), o("comparator", u, h), this.options = h, this.loose = !!h.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(u) {
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], b = u.match(h);
      if (!b)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = b[1] !== void 0 ? b[1] : "", this.operator === "=" && (this.operator = ""), b[2] ? this.semver = new l(b[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (o("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new l(u, this.options);
        } catch {
          return !1;
        }
      return a(u, this.operator, this.semver, this.options);
    }
    intersects(u, h) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(u.value, h).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new c(this.value, h).test(u.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || a(this.semver, "<", u.semver, h) && this.operator.startsWith(">") && u.operator.startsWith("<") || a(this.semver, ">", u.semver, h) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  Ls = t;
  const r = ri, { safeRe: n, t: s } = fn, a = Xu, o = gs, l = De, c = nt();
  return Ls;
}
const qw = nt(), Kw = (e, t, r) => {
  try {
    t = new qw(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ws = Kw;
const Gw = nt(), Hw = (e, t) => new Gw(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var Bw = Hw;
const Jw = De, Xw = nt(), Ww = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new Xw(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === -1) && (n = o, s = new Jw(n, r));
  }), n;
};
var Yw = Ww;
const Qw = De, Zw = nt(), xw = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new Zw(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === 1) && (n = o, s = new Qw(n, r));
  }), n;
};
var eE = xw;
const Fs = De, tE = nt(), $c = _s, rE = (e, t) => {
  e = new tE(e, t);
  let r = new Fs("0.0.0");
  if (e.test(r) || (r = new Fs("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((o) => {
      const l = new Fs(o.semver.version);
      switch (o.operator) {
        case ">":
          l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
        case "":
        case ">=":
          (!a || $c(l, a)) && (a = l);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), a && (!r || $c(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var nE = rE;
const sE = nt(), aE = (e, t) => {
  try {
    return new sE(e, t).range || "*";
  } catch {
    return null;
  }
};
var oE = aE;
const iE = De, Wu = vs(), { ANY: cE } = Wu, lE = nt(), uE = ws, gc = _s, _c = si, dE = oi, fE = ai, hE = (e, t, r, n) => {
  e = new iE(e, n), t = new lE(t, n);
  let s, a, o, l, c;
  switch (r) {
    case ">":
      s = gc, a = dE, o = _c, l = ">", c = ">=";
      break;
    case "<":
      s = _c, a = fE, o = gc, l = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (uE(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const u = t.set[d];
    let h = null, b = null;
    if (u.forEach((g) => {
      g.semver === cE && (g = new Wu(">=0.0.0")), h = h || g, b = b || g, s(g.semver, h.semver, n) ? h = g : o(g.semver, b.semver, n) && (b = g);
    }), h.operator === l || h.operator === c || (!b.operator || b.operator === l) && a(e, b.semver))
      return !1;
    if (b.operator === c && o(e, b.semver))
      return !1;
  }
  return !0;
};
var ii = hE;
const pE = ii, mE = (e, t, r) => pE(e, t, ">", r);
var yE = mE;
const $E = ii, gE = (e, t, r) => $E(e, t, "<", r);
var _E = gE;
const vc = nt(), vE = (e, t, r) => (e = new vc(e, r), t = new vc(t, r), e.intersects(t, r));
var wE = vE;
const EE = ws, SE = rt;
var bE = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const o = e.sort((u, h) => SE(u, h, r));
  for (const u of o)
    EE(u, t, r) ? (a = u, s || (s = u)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const l = [];
  for (const [u, h] of n)
    u === h ? l.push(u) : !h && u === o[0] ? l.push("*") : h ? u === o[0] ? l.push(`<=${h}`) : l.push(`${u} - ${h}`) : l.push(`>=${u}`);
  const c = l.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const wc = nt(), ci = vs(), { ANY: Vs } = ci, qr = ws, li = rt, PE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new wc(e, r), t = new wc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const o = TE(s, a, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, NE = [new ci(">=0.0.0-0")], Ec = [new ci(">=0.0.0")], TE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Vs) {
    if (t.length === 1 && t[0].semver === Vs)
      return !0;
    r.includePrerelease ? e = NE : e = Ec;
  }
  if (t.length === 1 && t[0].semver === Vs) {
    if (r.includePrerelease)
      return !0;
    t = Ec;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? s = Sc(s, g, r) : g.operator === "<" || g.operator === "<=" ? a = bc(a, g, r) : n.add(g.semver);
  if (n.size > 1)
    return null;
  let o;
  if (s && a) {
    if (o = li(s.semver, a.semver, r), o > 0)
      return null;
    if (o === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const g of n) {
    if (s && !qr(g, String(s), r) || a && !qr(g, String(a), r))
      return null;
    for (const v of t)
      if (!qr(g, String(v), r))
        return !1;
    return !0;
  }
  let l, c, d, u, h = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, b = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && a.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const g of t) {
    if (u = u || g.operator === ">" || g.operator === ">=", d = d || g.operator === "<" || g.operator === "<=", s) {
      if (b && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === b.major && g.semver.minor === b.minor && g.semver.patch === b.patch && (b = !1), g.operator === ">" || g.operator === ">=") {
        if (l = Sc(s, g, r), l === g && l !== s)
          return !1;
      } else if (s.operator === ">=" && !qr(s.semver, String(g), r))
        return !1;
    }
    if (a) {
      if (h && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === h.major && g.semver.minor === h.minor && g.semver.patch === h.patch && (h = !1), g.operator === "<" || g.operator === "<=") {
        if (c = bc(a, g, r), c === g && c !== a)
          return !1;
      } else if (a.operator === "<=" && !qr(a.semver, String(g), r))
        return !1;
    }
    if (!g.operator && (a || s) && o !== 0)
      return !1;
  }
  return !(s && d && !a && o !== 0 || a && u && !s && o !== 0 || b || h);
}, Sc = (e, t, r) => {
  if (!e)
    return t;
  const n = li(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, bc = (e, t, r) => {
  if (!e)
    return t;
  const n = li(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var OE = PE;
const Us = fn, Pc = $s, RE = De, Nc = Hu, IE = Dr, jE = Lv, AE = Uv, kE = qv, CE = Gv, DE = Jv, ME = Yv, LE = xv, FE = rw, VE = rt, UE = ow, zE = lw, qE = ni, KE = hw, GE = yw, HE = _s, BE = si, JE = Bu, XE = Ju, WE = ai, YE = oi, QE = Xu, ZE = Vw, xE = vs(), eS = nt(), tS = ws, rS = Bw, nS = Yw, sS = eE, aS = nE, oS = oE, iS = ii, cS = yE, lS = _E, uS = wE, dS = bE, fS = OE;
var hS = {
  parse: IE,
  valid: jE,
  clean: AE,
  inc: kE,
  diff: CE,
  major: DE,
  minor: ME,
  patch: LE,
  prerelease: FE,
  compare: VE,
  rcompare: UE,
  compareLoose: zE,
  compareBuild: qE,
  sort: KE,
  rsort: GE,
  gt: HE,
  lt: BE,
  eq: JE,
  neq: XE,
  gte: WE,
  lte: YE,
  cmp: QE,
  coerce: ZE,
  Comparator: xE,
  Range: eS,
  satisfies: tS,
  toComparators: rS,
  maxSatisfying: nS,
  minSatisfying: sS,
  minVersion: aS,
  validRange: oS,
  outside: iS,
  gtr: cS,
  ltr: lS,
  intersects: uS,
  simplifyRange: dS,
  subset: fS,
  SemVer: RE,
  re: Us.re,
  src: Us.src,
  tokens: Us.t,
  SEMVER_SPEC_VERSION: Pc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Pc.RELEASE_TYPES,
  compareIdentifiers: Nc.compareIdentifiers,
  rcompareIdentifiers: Nc.rcompareIdentifiers
}, Es = { exports: {} }, ui = { exports: {} };
const Yu = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
ui.exports = Yu;
ui.exports.default = Yu;
var pS = ui.exports;
const mS = pS, ns = /* @__PURE__ */ new WeakMap(), Qu = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...o) {
    if (ns.set(a, ++n), n === 1)
      r = e.apply(this, o), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return mS(a, e), ns.set(a, n), a;
};
Es.exports = Qu;
Es.exports.default = Qu;
Es.exports.callCount = (e) => {
  if (!ns.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return ns.get(e);
};
var yS = Es.exports;
(function(e, t) {
  var r = hn && hn.__classPrivateFieldSet || function(D, T, R, w, m) {
    if (w === "m") throw new TypeError("Private method is not writable");
    if (w === "a" && !m) throw new TypeError("Private accessor was defined without a setter");
    if (typeof T == "function" ? D !== T || !m : !T.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return w === "a" ? m.call(D, R) : m ? m.value = R : T.set(D, R), R;
  }, n = hn && hn.__classPrivateFieldGet || function(D, T, R, w) {
    if (R === "a" && !w) throw new TypeError("Private accessor was defined without a getter");
    if (typeof T == "function" ? D !== T || !w : !T.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return R === "m" ? w : R === "a" ? w.call(D) : w ? w.value : T.get(D);
  }, s, a, o, l, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const u = Cc, h = ca, b = cr, g = fd, v = hd, _ = pd, $ = Nd, p = Ld, E = zd, N = ct, O = Zy, I = uv, z = wv, B = hS, ue = yS, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), ne = (D) => D != null;
  let Q = "";
  try {
    delete require.cache[__filename], Q = b.dirname((a = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && a !== void 0 ? a : ".");
  } catch {
  }
  const de = (D, T) => {
    const R = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), w = typeof T;
    if (R.has(w))
      throw new TypeError(`Setting a value of type \`${w}\` for key \`${D}\` is not allowed as it's not supported by JSON`);
  }, C = "__internal__", k = `${C}.migrations.version`;
  class U {
    constructor(T = {}) {
      var R;
      o.set(this, void 0), l.set(this, void 0), c.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const w = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...T
      }, m = ue(() => {
        const f = p.sync({ cwd: Q }), P = f && JSON.parse(h.readFileSync(f, "utf8"));
        return P ?? {};
      });
      if (!w.cwd) {
        if (w.projectName || (w.projectName = m().name), !w.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        w.cwd = E(w.projectName, { suffix: w.projectSuffix }).config;
      }
      if (r(this, c, w, "f"), w.schema) {
        if (typeof w.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const f = new O.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, I.default)(f);
        const P = {
          type: "object",
          properties: w.schema
        };
        r(this, o, f.compile(P), "f");
        for (const [j, A] of Object.entries(w.schema))
          A != null && A.default && (n(this, d, "f")[j] = A.default);
      }
      w.defaults && r(this, d, {
        ...n(this, d, "f"),
        ...w.defaults
      }, "f"), w.serialize && (this._serialize = w.serialize), w.deserialize && (this._deserialize = w.deserialize), this.events = new _.EventEmitter(), r(this, l, w.encryptionKey, "f");
      const S = w.fileExtension ? `.${w.fileExtension}` : "";
      this.path = b.resolve(w.cwd, `${(R = w.configName) !== null && R !== void 0 ? R : "config"}${S}`);
      const y = this.store, i = Object.assign(H(), w.defaults, y);
      this._validate(i);
      try {
        v.deepEqual(y, i);
      } catch {
        this.store = i;
      }
      if (w.watch && this._watch(), w.migrations) {
        if (w.projectVersion || (w.projectVersion = m().version), !w.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(w.migrations, w.projectVersion, w.beforeEachMigration);
      }
    }
    get(T, R) {
      if (n(this, c, "f").accessPropertiesByDotNotation)
        return this._get(T, R);
      const { store: w } = this;
      return T in w ? w[T] : R;
    }
    set(T, R) {
      if (typeof T != "string" && typeof T != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof T}`);
      if (typeof T != "object" && R === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(T))
        throw new TypeError(`Please don't use the ${C} key, as it's used to manage this module internal operations.`);
      const { store: w } = this, m = (S, y) => {
        de(S, y), n(this, c, "f").accessPropertiesByDotNotation ? $.set(w, S, y) : w[S] = y;
      };
      if (typeof T == "object") {
        const S = T;
        for (const [y, i] of Object.entries(S))
          m(y, i);
      } else
        m(T, R);
      this.store = w;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(T) {
      return n(this, c, "f").accessPropertiesByDotNotation ? $.has(this.store, T) : T in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...T) {
      for (const R of T)
        ne(n(this, d, "f")[R]) && this.set(R, n(this, d, "f")[R]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(T) {
      const { store: R } = this;
      n(this, c, "f").accessPropertiesByDotNotation ? $.delete(R, T) : delete R[T], this.store = R;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = H();
      for (const T of Object.keys(n(this, d, "f")))
        this.reset(T);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(T, R) {
      if (typeof T != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof T}`);
      if (typeof R != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof R}`);
      return this._handleChange(() => this.get(T), R);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(T) {
      if (typeof T != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof T}`);
      return this._handleChange(() => this.store, T);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const T = h.readFileSync(this.path, n(this, l, "f") ? null : "utf8"), R = this._encryptData(T), w = this._deserialize(R);
        return this._validate(w), Object.assign(H(), w);
      } catch (T) {
        if ((T == null ? void 0 : T.code) === "ENOENT")
          return this._ensureDirectory(), H();
        if (n(this, c, "f").clearInvalidConfig && T.name === "SyntaxError")
          return H();
        throw T;
      }
    }
    set store(T) {
      this._ensureDirectory(), this._validate(T), this._write(T), this.events.emit("change");
    }
    *[(o = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [T, R] of Object.entries(this.store))
        yield [T, R];
    }
    _encryptData(T) {
      if (!n(this, l, "f"))
        return T.toString();
      try {
        if (n(this, l, "f"))
          try {
            if (T.slice(16, 17).toString() === ":") {
              const R = T.slice(0, 16), w = g.pbkdf2Sync(n(this, l, "f"), R.toString(), 1e4, 32, "sha512"), m = g.createDecipheriv(V, w, R);
              T = Buffer.concat([m.update(Buffer.from(T.slice(17))), m.final()]).toString("utf8");
            } else {
              const R = g.createDecipher(V, n(this, l, "f"));
              T = Buffer.concat([R.update(Buffer.from(T)), R.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return T.toString();
    }
    _handleChange(T, R) {
      let w = T();
      const m = () => {
        const S = w, y = T();
        (0, u.isDeepStrictEqual)(y, S) || (w = y, R.call(this, y, S));
      };
      return this.events.on("change", m), () => this.events.removeListener("change", m);
    }
    _validate(T) {
      if (!n(this, o, "f") || n(this, o, "f").call(this, T) || !n(this, o, "f").errors)
        return;
      const w = n(this, o, "f").errors.map(({ instancePath: m, message: S = "" }) => `\`${m.slice(1)}\` ${S}`);
      throw new Error("Config schema violation: " + w.join("; "));
    }
    _ensureDirectory() {
      h.mkdirSync(b.dirname(this.path), { recursive: !0 });
    }
    _write(T) {
      let R = this._serialize(T);
      if (n(this, l, "f")) {
        const w = g.randomBytes(16), m = g.pbkdf2Sync(n(this, l, "f"), w.toString(), 1e4, 32, "sha512"), S = g.createCipheriv(V, m, w);
        R = Buffer.concat([w, Buffer.from(":"), S.update(Buffer.from(R)), S.final()]);
      }
      if (process.env.SNAP)
        h.writeFileSync(this.path, R, { mode: n(this, c, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, R, { mode: n(this, c, "f").configFileMode });
        } catch (w) {
          if ((w == null ? void 0 : w.code) === "EXDEV") {
            h.writeFileSync(this.path, R, { mode: n(this, c, "f").configFileMode });
            return;
          }
          throw w;
        }
    }
    _watch() {
      this._ensureDirectory(), h.existsSync(this.path) || this._write(H()), process.platform === "win32" ? h.watch(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 100 })) : h.watchFile(this.path, { persistent: !1 }, z(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(T, R, w) {
      let m = this._get(k, "0.0.0");
      const S = Object.keys(T).filter((i) => this._shouldPerformMigration(i, m, R));
      let y = { ...this.store };
      for (const i of S)
        try {
          w && w(this, {
            fromVersion: m,
            toVersion: i,
            finalVersion: R,
            versions: S
          });
          const f = T[i];
          f(this), this._set(k, i), m = i, y = { ...this.store };
        } catch (f) {
          throw this.store = y, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(m) || !B.eq(m, R)) && this._set(k, R);
    }
    _containsReservedKey(T) {
      return typeof T == "object" && Object.keys(T)[0] === C ? !0 : typeof T != "string" ? !1 : n(this, c, "f").accessPropertiesByDotNotation ? !!T.startsWith(`${C}.`) : !1;
    }
    _isVersionInRangeFormat(T) {
      return B.clean(T) === null;
    }
    _shouldPerformMigration(T, R, w) {
      return this._isVersionInRangeFormat(T) ? R !== "0.0.0" && B.satisfies(R, T) ? !1 : B.satisfies(w, T) : !(B.lte(T, R) || B.gt(T, w));
    }
    _get(T, R) {
      return $.get(this.store, T, R);
    }
    _set(T, R) {
      const { store: w } = this;
      $.set(w, T, R), this.store = w;
    }
  }
  t.default = U, e.exports = U, e.exports.default = U;
})(zs, zs.exports);
var $S = zs.exports;
const Tc = cr, { app: qn, ipcMain: ia, ipcRenderer: Oc, shell: gS } = ad, _S = $S;
let Rc = !1;
const Ic = () => {
  if (!ia || !qn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: qn.getPath("userData"),
    appVersion: qn.getVersion()
  };
  return Rc || (ia.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Rc = !0), e;
};
class vS extends _S {
  constructor(t) {
    let r, n;
    if (Oc) {
      const s = Oc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else ia && qn && ({ defaultCwd: r, appVersion: n } = Ic());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = Tc.isAbsolute(t.cwd) ? t.cwd : Tc.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Ic();
  }
  async openInEditor() {
    const t = await gS.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var wS = vS;
const ES = /* @__PURE__ */ Ed(wS), Zu = "iTransporter-secure-key-2024", Ie = new ES({
  name: "iTransporter-data",
  defaults: {
    credentials: [],
    uploadHistory: [],
    webhookSettings: {
      url: "",
      enabled: !1
    },
    retryAttempts: 3
  }
});
function SS(e) {
  const t = yr.scryptSync(Zu, "salt", 32), r = yr.randomBytes(16), n = yr.createCipheriv("aes-256-cbc", t, r);
  let s = n.update(e, "utf8", "hex");
  return s += n.final("hex"), r.toString("hex") + ":" + s;
}
function bS(e) {
  try {
    const [t, r] = e.split(":"), n = yr.scryptSync(Zu, "salt", 32), s = Buffer.from(t, "hex"), a = yr.createDecipheriv("aes-256-cbc", n, s);
    let o = a.update(r, "hex", "utf8");
    return o += a.final("utf8"), o;
  } catch {
    return "";
  }
}
function xu(e, t) {
  const r = Ie.get("credentials", []), n = r.findIndex((o) => o.appleId === e), s = SS(t), a = (/* @__PURE__ */ new Date()).toISOString();
  n >= 0 ? (r[n].password = s, r[n].lastUsed = a, r[n].uploadCount += 1) : r.push({
    appleId: e,
    password: s,
    lastUsed: a,
    uploadCount: 1
  }), Ie.set("credentials", r);
}
function PS() {
  return Ie.get("credentials", []).map((t) => ({
    appleId: t.appleId,
    lastUsed: t.lastUsed,
    uploadCount: t.uploadCount
  }));
}
function NS(e) {
  const r = Ie.get("credentials", []).find((n) => n.appleId === e);
  return r ? {
    ...r,
    password: bS(r.password)
  } : null;
}
function TS(e) {
  const t = Ie.get("credentials", []), r = t.filter((n) => n.appleId !== e);
  return r.length !== t.length ? (Ie.set("credentials", r), !0) : !1;
}
function di(e) {
  const t = Ie.get("uploadHistory", []), r = {
    ...e,
    id: yr.randomUUID()
  };
  return t.unshift(r), t.length > 100 && t.pop(), Ie.set("uploadHistory", t), r;
}
function OS() {
  return Ie.get("uploadHistory", []);
}
function RS() {
  Ie.set("uploadHistory", []);
}
function IS(e) {
  const t = Ie.get("uploadHistory", []), r = t.filter((n) => n.id !== e);
  return r.length !== t.length ? (Ie.set("uploadHistory", r), !0) : !1;
}
function ed() {
  return Ie.get("webhookSettings", { url: "", enabled: !1 });
}
function jS(e) {
  Ie.set("webhookSettings", e);
}
function AS() {
  return Ie.get("retryAttempts", 3);
}
function kS(e) {
  Ie.set("retryAttempts", Math.max(1, Math.min(e, 10)));
}
function CS(e) {
  const t = Math.floor(e / 1e3), r = Math.floor(t / 60), n = Math.floor(r / 60), s = r % 60, a = t % 60, o = [];
  return n > 0 && o.push(`${n}h`), s > 0 && o.push(`${s}m`), (a > 0 || o.length === 0) && o.push(`${a}s`), o.join(" ");
}
function DS(e) {
  const t = {
    success: "✅",
    failed: "❌",
    cancelled: "⚠️"
  }, r = {
    success: "Upload Successful",
    failed: "Upload Failed",
    cancelled: "Upload Cancelled"
  };
  let n = `${t[e.status]} ${r[e.status]}
`;
  return n += `📦 File: ${e.fileName}
`, n += `👤 Apple ID: ${e.appleId}
`, e.ipRegion && (n += `🌍 Region: ${e.ipRegion}
`), e.status === "success" && e.duration && (n += `⏱️ Duration: ${e.duration}
`), e.errorMessage && (n += `❗ Error: ${e.errorMessage}
`), n += `🕐 Time: ${new Date(e.endTime).toLocaleString()}`, n;
}
async function fi(e) {
  const t = ed();
  if (!t.enabled || !t.url)
    return { success: !1, message: "Webhook not enabled or URL not set" };
  if (e.status === "success" && e.startTime && e.endTime) {
    const s = new Date(e.startTime).getTime(), a = new Date(e.endTime).getTime();
    e.duration = CS(a - s);
  }
  const n = {
    msg_type: "text",
    content: {
      text: DS(e)
    }
  };
  try {
    const a = await (await fetch(t.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(n)
    })).json();
    return a.code === 0 || a.StatusCode === 0 ? { success: !0, code: 0, message: a.msg || "success" } : { success: !1, code: a.code, message: a.msg || "Unknown error" };
  } catch (s) {
    return { success: !1, message: s instanceof Error ? s.message : "Unknown error" };
  }
}
async function MS(e) {
  const t = {
    msg_type: "text",
    content: {
      text: `🔔 iTransporter Webhook Test

Your webhook is configured correctly! You will receive notifications when uploads complete.`
    }
  };
  try {
    const n = await (await fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(t)
    })).json();
    return n.code === 0 || n.StatusCode === 0 ? { success: !0, code: 0, message: "Test successful" } : { success: !1, code: n.code, message: n.msg || "Bad Request" };
  } catch (r) {
    return { success: !1, message: r instanceof Error ? r.message : "Failed to connect" };
  }
}
async function td() {
  return new Promise((e) => {
    const t = od.request({
      method: "GET",
      url: "http://ip-api.com/json"
    });
    let r = "";
    t.on("response", (n) => {
      n.on("data", (s) => {
        r += s.toString();
      }), n.on("end", () => {
        try {
          const s = JSON.parse(r);
          s.status === "success" ? e(s) : e(null);
        } catch {
          e(null);
        }
      }), n.on("error", () => {
        e(null);
      });
    }), t.on("error", () => {
      e(null);
    }), setTimeout(() => {
      t.abort(), e(null);
    }, 1e4), t.end();
  });
}
let Qe = null, Nt = null, ft = "", at = 0, Yt = 3, Kn = !1, mt = "";
function hi(e) {
  const t = Math.floor(e / 1e3), r = Math.floor(t / 60), n = Math.floor(r / 60), s = r % 60, a = t % 60, o = [];
  return n > 0 && o.push(`${n}h`), s > 0 && o.push(`${s}m`), (a > 0 || o.length === 0) && o.push(`${a}s`), o.join(" ");
}
async function LS(e, t) {
  return new Promise((r) => {
    var l, c;
    const n = Lc(), s = kc(n, [
      "-m",
      "provider",
      "-u",
      e,
      "-p",
      t
    ]);
    let a = "", o = "";
    (l = s.stdout) == null || l.on("data", (d) => {
      a += d.toString();
    }), (c = s.stderr) == null || c.on("data", (d) => {
      o += d.toString();
    }), s.on("close", (d) => {
      if (d === 0) {
        const u = [], h = a.split(`
`);
        let b = !1;
        for (const g of h) {
          if (g.includes("Provider listing:")) {
            b = !0;
            continue;
          }
          if (g.includes("- Long Name -") || g.includes("- Short Name -"))
            continue;
          if (b) {
            const $ = g.match(/^\s*(\d+)\s+(.+?)\s{2,}(\S+)\s*$/);
            if ($) {
              u.push({
                teamName: $[2].trim(),
                teamId: $[3],
                // In table format, shortName is ID
                shortName: $[3]
              });
              continue;
            }
          }
          const v = g.match(/^\d+\.\s+(.+?)\s+\((\w+)\)\s+-\s+ProviderShortName:\s+(\S+)/);
          v && u.push({
            teamName: v[1].trim(),
            teamId: v[2],
            shortName: v[3]
          });
          const _ = g.match(/parameter\s+(.+?)\s+=\s+(\w+)/);
          if (_ && !g.includes("Application") && !g.includes("Version") && !g.includes("OSIdentifier")) {
            const $ = _[1].trim(), p = _[2];
            /^[A-Z0-9]{8,12}$/.test(p) && (u.find((E) => E.shortName === p) || u.push({
              teamName: $,
              teamId: p,
              shortName: p
            }));
          }
        }
        if (u.length > 0)
          r({ success: !0, providers: u });
        else {
          const g = a.match(/ProviderShortName[:\s]+(\S+)/g);
          g ? (g.forEach((v, _) => {
            const $ = v.replace(/ProviderShortName[:\s]+/, "").trim();
            u.push({
              teamName: `Team ${_ + 1}`,
              teamId: $,
              shortName: $
            });
          }), r({ success: !0, providers: u })) : r({ success: !1, errorMessage: "Failed to parse Provider list. Please enter Provider Shortname manually." });
        }
      } else
        r({
          success: !1,
          errorMessage: o || `Failed to get Provider (Exit code: ${d})`
        });
    }), s.on("error", (d) => {
      r({ success: !1, errorMessage: d.message });
    });
  });
}
function FS(e, t) {
  const r = e.match(/Package upload progress:\s*([\d.]+)%\s*completed/);
  if (r)
    return {
      phase: "uploading",
      phaseText: "Uploading",
      progress: parseFloat(r[1]),
      fileName: t
    };
  const n = e.match(/File:\s*\S+\s+(\d+)\/(\d+),\s*([\d.]+)%\s*completed/);
  if (n) {
    const a = parseInt(n[1]), o = parseInt(n[2]);
    return {
      phase: "uploading",
      phaseText: "Uploading",
      progress: parseFloat(n[3]),
      fileName: t,
      bytesUploaded: a,
      totalBytes: o
    };
  }
  const s = e.match(/Finished part upload.*?([\d.]+)\s*MB\/s/);
  return s ? {
    phase: "uploading",
    phaseText: "Uploading",
    progress: 100,
    fileName: t,
    speed: `${s[1]} MB/s`
  } : null;
}
function VS(e, t) {
  return e.includes("authenticateForSession") || e.includes("Configuring logging") ? {
    phase: "authenticating",
    phaseText: "Authenticating",
    progress: 0,
    fileName: t
  } : e.includes("Performing analysis") || e.includes("Configuring the Software Uploader") ? {
    phase: "analyzing",
    phaseText: "Analyzing",
    progress: 0,
    fileName: t
  } : e.includes("Starting upload for package") || e.includes("Computing total size") ? {
    phase: "uploading",
    phaseText: "Preparing upload",
    progress: 0,
    fileName: t
  } : e.includes("Committing reservation") || e.includes("Transfer Metrics Summary") ? {
    phase: "committing",
    phaseText: "Committing",
    progress: 100,
    fileName: t
  } : e.includes("package was uploaded successfully") || e.includes("Package Summary") ? {
    phase: "completed",
    phaseText: "Completed",
    progress: 100,
    fileName: t
  } : e.includes("ERROR:") || e.includes("Upload Failed") || e.includes("Could not upload") ? {
    phase: "failed",
    phaseText: "Failed",
    progress: 0,
    fileName: t
  } : null;
}
async function US(e, t, r = 3) {
  Yt = r, at = 0, Kn = !1, ft = (/* @__PURE__ */ new Date()).toISOString();
  try {
    const d = await td();
    d ? mt = `${d.country}, ${d.city}` : mt = "";
  } catch {
    mt = "";
  }
  const n = la.basename(e.ipaPath);
  let s = { success: !1, errorMessage: "Unknown error" };
  for (; at < Yt; ) {
    if (at++, Kn)
      return { success: !1, errorMessage: "User cancelled upload" };
    if (at > 1 && (be(t, "---"), be(t, `[RETRY] Attempt ${at} of ${Yt}...`), nr(t, {
      phase: "retrying",
      phaseText: `Retrying (${at}/${Yt})`,
      progress: 0,
      fileName: n
    }), t.webContents.send("upload-retry", {
      attempt: at,
      maxAttempts: Yt
    }), await new Promise((d) => setTimeout(d, 2e3))), s = await zS(e, t), s.success || Kn)
      return s;
    at < Yt && be(t, `[INFO] Upload failed, will retry (${Yt - at} attempts remaining)...`);
  }
  const a = (/* @__PURE__ */ new Date()).toISOString();
  nr(t, {
    phase: "failed",
    phaseText: "Failed",
    progress: 0,
    fileName: n
  });
  const o = new Date(ft).getTime(), l = new Date(a).getTime(), c = hi(l - o);
  return di({
    fileName: n,
    filePath: e.ipaPath,
    appleId: e.appleId,
    status: "failed",
    startTime: ft,
    endTime: a,
    errorMessage: s.errorMessage || "Upload failed after all retries",
    ipRegion: mt || void 0,
    duration: c
  }), t.webContents.send("upload-complete", {
    success: !1,
    errorMessage: s.errorMessage
  }), fi({
    fileName: n,
    status: "failed",
    appleId: e.appleId,
    startTime: ft,
    endTime: a,
    errorMessage: s.errorMessage || "Upload failed after all retries",
    ipRegion: mt || void 0,
    duration: c
  }), s;
}
function zS(e, t) {
  return new Promise((r) => {
    var d, u;
    const n = Lc(), s = la.basename(e.ipaPath);
    Nt = e, at === 1 && nr(t, {
      phase: "preparing",
      phaseText: "Preparing",
      progress: 0,
      fileName: s
    }), be(t, `[INFO] Start upload: ${s}`), be(t, `[INFO] Apple ID: ${e.appleId}`), e.ascProvider && be(t, `[INFO] Provider: ${e.ascProvider}`), be(t, `[INFO] Using iTMSTransporter: ${n}`), be(t, "---");
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
    e.ascProvider && a.push("-asc_provider", e.ascProvider), Qe = kc(n, a);
    let o = "", l = null;
    const c = (h, b = !1) => {
      b ? be(t, `[ERROR] ${h}`) : be(t, h);
      const g = FS(h, s);
      if (g) {
        l = g, nr(t, g);
        return;
      }
      const v = VS(h, s);
      v && v.phase !== "failed" && (l && v.phase === "uploading" && l.phase === "uploading" && (v.progress = l.progress), l = v, nr(t, v));
    };
    (d = Qe.stdout) == null || d.on("data", (h) => {
      h.toString().split(`
`).filter((v) => v.trim()).forEach((v) => c(v));
    }), (u = Qe.stderr) == null || u.on("data", (h) => {
      const b = h.toString();
      o += b, b.split(`
`).filter((v) => v.trim()).forEach((v) => c(v, !0));
    }), Qe.on("close", (h) => {
      const b = (/* @__PURE__ */ new Date()).toISOString();
      if (h === 0) {
        be(t, "---"), be(t, "[SUCCESS] Upload Completed!"), nr(t, {
          phase: "completed",
          phaseText: "Completed",
          progress: 100,
          fileName: s
        }), xu(e.appleId, e.appSpecificPassword);
        const g = new Date(ft).getTime(), v = new Date(b).getTime(), _ = hi(v - g);
        di({
          fileName: s,
          filePath: e.ipaPath,
          appleId: e.appleId,
          status: "success",
          startTime: ft,
          endTime: b,
          ipRegion: mt || void 0,
          duration: _
        }), t.webContents.send("upload-complete", { success: !0 }), fi({
          fileName: s,
          status: "success",
          appleId: e.appleId,
          startTime: ft,
          endTime: b,
          ipRegion: mt || void 0,
          duration: _
        }), r({ success: !0 });
      } else
        be(t, "---"), be(t, `[FAILED] Upload Failed (Exit code: ${h})`), r({ success: !1, errorMessage: o || `Exit code: ${h}` });
      Qe = null, Nt = null;
    }), Qe.on("error", (h) => {
      be(t, `[ERROR] Process failed to start: ${h.message}`), r({ success: !1, errorMessage: h.message }), Qe = null, Nt = null;
    });
  });
}
function qS(e) {
  if (Kn = !0, Qe && Nt) {
    const t = la.basename(Nt.ipaPath);
    be(e, "[INFO] Cancelling upload..."), nr(e, {
      phase: "failed",
      phaseText: "Cancelled",
      progress: 0,
      fileName: t
    });
    const r = (/* @__PURE__ */ new Date()).toISOString(), n = Nt.appleId, s = Nt.ipaPath, a = new Date(ft).getTime(), o = new Date(r).getTime(), l = hi(o - a);
    return di({
      fileName: t,
      filePath: s,
      appleId: n,
      status: "cancelled",
      startTime: ft,
      endTime: r,
      errorMessage: "User cancelled upload",
      ipRegion: mt || void 0,
      duration: l
    }), fi({
      fileName: t,
      status: "cancelled",
      appleId: n,
      startTime: ft,
      endTime: r,
      errorMessage: "User cancelled upload",
      ipRegion: mt || void 0,
      duration: l
    }), Qe.kill("SIGTERM"), Qe = null, Nt = null, be(e, "[INFO] Upload cancelled"), e.webContents.send("upload-complete", {
      success: !1,
      errorMessage: "User cancelled upload"
    }), !0;
  }
  return !1;
}
function rd() {
  return Qe !== null;
}
function be(e, t) {
  e.webContents.send("upload-log", {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    message: t
  });
}
function nr(e, t) {
  e.webContents.send("upload-progress", t);
}
const Ss = wr.dirname(ld(import.meta.url)), KS = !!process.env.VITE_DEV_SERVER_URL, jc = process.env.VITE_DEV_SERVER_URL, ab = wr.join(Ss), nd = wr.join(Ss, "../dist");
process.env.VITE_PUBLIC = KS ? wr.join(Ss, "../public") : nd;
let ge;
function sd() {
  const e = !rn.isPackaged;
  ge = new Ac({
    width: 1e3,
    height: 800,
    minWidth: 900,
    minHeight: 700,
    // icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: wr.join(Ss, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      devTools: e
    }
  }), e && ge.webContents.openDevTools({ mode: "detach" }), ge.webContents.on("did-finish-load", () => {
    ge == null || ge.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), jc ? ge.loadURL(jc) : ge.loadFile(wr.join(nd, "index.html")), ge.webContents.on("context-menu", (t, r) => {
    const { isEditable: n, selectionText: s, editFlags: a, x: o, y: l } = r;
    ge == null || ge.webContents.send("show-context-menu", {
      isEditable: n,
      hasSelection: s && s.trim() !== "",
      editFlags: a,
      x: o,
      y: l
    });
  });
}
$e.handle("check-environment", async () => await vd());
$e.handle("install-clt", async () => await wd());
$e.handle("select-ipa-file", async () => {
  if (!ge) return null;
  const e = await cd.showOpenDialog(ge, {
    title: "选择 IPA 文件",
    filters: [
      { name: "iOS App", extensions: ["ipa"] }
    ],
    properties: ["openFile"]
  });
  return e.canceled || e.filePaths.length === 0 ? null : e.filePaths[0];
});
$e.handle("start-upload", async (e, t) => ge ? rd() ? { success: !1, errorMessage: "已有上传任务进行中" } : await US(t, ge, t.retryAttempts || 1) : { success: !1, errorMessage: "窗口未初始化" });
$e.handle("cancel-upload", async () => ge ? qS(ge) : !1);
$e.handle("is-uploading", () => rd());
$e.handle("fetch-providers", async (e, t) => await LS(t.appleId, t.password));
$e.handle("open-external", async (e, t) => {
  t && (t.startsWith("http://") || t.startsWith("https://")) && await id.openExternal(t);
});
$e.handle("get-credentials-list", () => PS());
$e.handle("get-credential", (e, t) => NS(t));
$e.handle("save-credential", (e, t) => (xu(t.appleId, t.password), !0));
$e.handle("delete-credential", (e, t) => TS(t));
$e.handle("get-upload-history", () => OS());
$e.handle("clear-upload-history", () => (RS(), !0));
$e.handle("delete-upload-history", (e, t) => IS(t));
$e.handle("get-ip-info", async () => await td());
$e.handle("get-webhook-settings", () => ed());
$e.handle("set-webhook-settings", (e, t) => (jS(t), !0));
$e.handle("test-webhook", async (e, t) => await MS(t));
$e.handle("get-retry-attempts", () => AS());
$e.handle("set-retry-attempts", (e, t) => (kS(t), !0));
rn.on("window-all-closed", () => {
  process.platform !== "darwin" && (rn.quit(), ge = null);
});
rn.on("activate", () => {
  Ac.getAllWindows().length === 0 && sd();
});
rn.whenReady().then(sd);
export {
  ab as MAIN_DIST,
  nd as RENDERER_DIST,
  jc as VITE_DEV_SERVER_URL
};
