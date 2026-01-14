import rd, { net as nd, ipcMain as $e, shell as sd, app as Gn, BrowserWindow as Rc, dialog as ad } from "electron";
import { fileURLToPath as od } from "node:url";
import vr from "node:path";
import * as Er from "fs";
import la from "fs";
import { exec as id, spawn as Ic } from "child_process";
import jc, { promisify as cd } from "util";
import * as Ac from "path";
import or from "path";
import * as mr from "crypto";
import ld from "crypto";
import ud from "assert";
import dd from "events";
import fd from "os";
const kc = cd(id), Cc = "/Applications/Transporter.app", Hn = "/Applications/Transporter.app/Contents/itms/bin/iTMSTransporter", Bn = "/usr/local/itms/bin/iTMSTransporter";
function hd() {
  return Er.existsSync(Cc);
}
function pd() {
  return Er.existsSync(Hn);
}
function md() {
  return Er.existsSync(Bn);
}
async function yd() {
  try {
    const { stdout: e } = await kc("xcode-select -p"), t = e.trim();
    return Er.existsSync(t) ? { installed: !0, path: t } : { installed: !1, path: "" };
  } catch {
    return { installed: !1, path: "" };
  }
}
async function $d() {
  const e = hd(), t = pd(), r = md(), n = await yd(), s = t || r;
  return {
    transporterInstalled: e,
    transporterPath: Cc,
    iTMSTransporterPath: Hn,
    iTMSTransporterExists: t,
    standaloneITMSTransporterExists: r,
    standaloneITMSTransporterPath: Bn,
    commandLineToolsInstalled: n.installed,
    commandLineToolsPath: n.path,
    allReady: s && n.installed
  };
}
function Dc() {
  if (Er.existsSync(Hn))
    return Hn;
  if (Er.existsSync(Bn))
    return Bn;
  throw new Error("iTMSTransporter not found. Please install Transporter from App Store or download standalone iTMSTransporter from Apple.");
}
async function gd() {
  var e;
  try {
    return await kc("xcode-select --install"), {
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
var dn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function _d(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qs = { exports: {} }, vd = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Bt = vd, Ed = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), wd = (e) => !e.some((t) => Ed.has(t));
function fn(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return wd(r) ? r : [];
}
var Sd = {
  get(e, t, r) {
    if (!Bt(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = fn(t);
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
    if (!Bt(e) || typeof t != "string")
      return e;
    const n = e, s = fn(t);
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      Bt(e[i]) || (e[i] = {}), a === s.length - 1 && (e[i] = r), e = e[i];
    }
    return n;
  },
  delete(e, t) {
    if (!Bt(e) || typeof t != "string")
      return !1;
    const r = fn(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Bt(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Bt(e) || typeof t != "string")
      return !1;
    const r = fn(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Bt(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, ua = { exports: {} }, da = { exports: {} }, fa = { exports: {} }, ha = { exports: {} };
const Mc = la;
ha.exports = (e) => new Promise((t) => {
  Mc.access(e, (r) => {
    t(!r);
  });
});
ha.exports.sync = (e) => {
  try {
    return Mc.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var bd = ha.exports, pa = { exports: {} }, ma = { exports: {} };
const Lc = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
ma.exports = Lc;
ma.exports.default = Lc;
var Pd = ma.exports;
const Nd = Pd, Fc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (u, c, ...d) => {
    r++;
    const l = Nd(u, ...d);
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
pa.exports = Fc;
pa.exports.default = Fc;
var Od = pa.exports;
const di = Od;
class Vc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const Td = (e, t) => Promise.resolve(e).then(t), Rd = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new Vc(t[0])));
var Id = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = di(r.concurrency), s = [...e].map((i) => [i, n(Td, i, t)]), a = di(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((i) => a(Rd, i))).then(() => {
  }).catch((i) => i instanceof Vc ? i.value : Promise.reject(i));
};
const Uc = or, zc = bd, jd = Id;
fa.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), jd(e, (r) => zc(Uc.resolve(t.cwd, r)), t));
fa.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (zc.sync(Uc.resolve(t.cwd, r)))
      return r;
};
var Ad = fa.exports;
const Nt = or, qc = Ad;
da.exports = (e, t = {}) => {
  const r = Nt.resolve(t.cwd || ""), { root: n } = Nt.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function i(u) {
      qc(s, { cwd: u }).then((c) => {
        c ? a(Nt.join(u, c)) : u === n ? a(null) : i(Nt.dirname(u));
      });
    })(r);
  });
};
da.exports.sync = (e, t = {}) => {
  let r = Nt.resolve(t.cwd || "");
  const { root: n } = Nt.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = qc.sync(s, { cwd: r });
    if (a)
      return Nt.join(r, a);
    if (r === n)
      return null;
    r = Nt.dirname(r);
  }
};
var kd = da.exports;
const Kc = kd;
ua.exports = async ({ cwd: e } = {}) => Kc("package.json", { cwd: e });
ua.exports.sync = ({ cwd: e } = {}) => Kc.sync("package.json", { cwd: e });
var Cd = ua.exports, ya = { exports: {} };
const pe = or, Gc = fd, bt = Gc.homedir(), $a = Gc.tmpdir(), { env: pr } = process, Dd = (e) => {
  const t = pe.join(bt, "Library");
  return {
    data: pe.join(t, "Application Support", e),
    config: pe.join(t, "Preferences", e),
    cache: pe.join(t, "Caches", e),
    log: pe.join(t, "Logs", e),
    temp: pe.join($a, e)
  };
}, Md = (e) => {
  const t = pr.APPDATA || pe.join(bt, "AppData", "Roaming"), r = pr.LOCALAPPDATA || pe.join(bt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: pe.join(r, e, "Data"),
    config: pe.join(t, e, "Config"),
    cache: pe.join(r, e, "Cache"),
    log: pe.join(r, e, "Log"),
    temp: pe.join($a, e)
  };
}, Ld = (e) => {
  const t = pe.basename(bt);
  return {
    data: pe.join(pr.XDG_DATA_HOME || pe.join(bt, ".local", "share"), e),
    config: pe.join(pr.XDG_CONFIG_HOME || pe.join(bt, ".config"), e),
    cache: pe.join(pr.XDG_CACHE_HOME || pe.join(bt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: pe.join(pr.XDG_STATE_HOME || pe.join(bt, ".local", "state"), e),
    temp: pe.join($a, t, e)
  };
}, Hc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? Dd(e) : process.platform === "win32" ? Md(e) : Ld(e);
};
ya.exports = Hc;
ya.exports.default = Hc;
var Fd = ya.exports, it = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.NOOP = ae.LIMIT_FILES_DESCRIPTORS = ae.LIMIT_BASENAME_LENGTH = ae.IS_USER_ROOT = ae.IS_POSIX = ae.DEFAULT_TIMEOUT_SYNC = ae.DEFAULT_TIMEOUT_ASYNC = ae.DEFAULT_WRITE_OPTIONS = ae.DEFAULT_READ_OPTIONS = ae.DEFAULT_FOLDER_MODE = ae.DEFAULT_FILE_MODE = ae.DEFAULT_ENCODING = void 0;
const Vd = "utf8";
ae.DEFAULT_ENCODING = Vd;
const Ud = 438;
ae.DEFAULT_FILE_MODE = Ud;
const zd = 511;
ae.DEFAULT_FOLDER_MODE = zd;
const qd = {};
ae.DEFAULT_READ_OPTIONS = qd;
const Kd = {};
ae.DEFAULT_WRITE_OPTIONS = Kd;
const Gd = 5e3;
ae.DEFAULT_TIMEOUT_ASYNC = Gd;
const Hd = 100;
ae.DEFAULT_TIMEOUT_SYNC = Hd;
const Bd = !!process.getuid;
ae.IS_POSIX = Bd;
const Jd = process.getuid ? !process.getuid() : !1;
ae.IS_USER_ROOT = Jd;
const Xd = 128;
ae.LIMIT_BASENAME_LENGTH = Xd;
const Wd = 1e4;
ae.LIMIT_FILES_DESCRIPTORS = Wd;
const Yd = () => {
};
ae.NOOP = Yd;
var as = {}, wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.attemptifySync = wr.attemptifyAsync = void 0;
const Bc = ae, Qd = (e, t = Bc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
wr.attemptifyAsync = Qd;
const Zd = (e, t = Bc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
wr.attemptifySync = Zd;
var ga = {};
Object.defineProperty(ga, "__esModule", { value: !0 });
const xd = ae, Jc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !xd.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Jc.isChangeErrorOk(e))
      throw e;
  }
};
ga.default = Jc;
var Sr = {}, _a = {};
Object.defineProperty(_a, "__esModule", { value: !0 });
const ef = ae, le = {
  interval: 25,
  intervalId: void 0,
  limit: ef.LIMIT_FILES_DESCRIPTORS,
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
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.retryifySync = Sr.retryifyAsync = void 0;
const tf = _a, rf = (e, t) => function(r) {
  return function n() {
    return tf.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
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
Sr.retryifyAsync = rf;
const nf = (e, t) => function(r) {
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
Sr.retryifySync = nf;
Object.defineProperty(as, "__esModule", { value: !0 });
const oe = la, je = jc, Ae = wr, Ee = ga, Me = Sr, sf = {
  chmodAttempt: Ae.attemptifyAsync(je.promisify(oe.chmod), Ee.default.onChangeError),
  chownAttempt: Ae.attemptifyAsync(je.promisify(oe.chown), Ee.default.onChangeError),
  closeAttempt: Ae.attemptifyAsync(je.promisify(oe.close)),
  fsyncAttempt: Ae.attemptifyAsync(je.promisify(oe.fsync)),
  mkdirAttempt: Ae.attemptifyAsync(je.promisify(oe.mkdir)),
  realpathAttempt: Ae.attemptifyAsync(je.promisify(oe.realpath)),
  statAttempt: Ae.attemptifyAsync(je.promisify(oe.stat)),
  unlinkAttempt: Ae.attemptifyAsync(je.promisify(oe.unlink)),
  closeRetry: Me.retryifyAsync(je.promisify(oe.close), Ee.default.isRetriableError),
  fsyncRetry: Me.retryifyAsync(je.promisify(oe.fsync), Ee.default.isRetriableError),
  openRetry: Me.retryifyAsync(je.promisify(oe.open), Ee.default.isRetriableError),
  readFileRetry: Me.retryifyAsync(je.promisify(oe.readFile), Ee.default.isRetriableError),
  renameRetry: Me.retryifyAsync(je.promisify(oe.rename), Ee.default.isRetriableError),
  statRetry: Me.retryifyAsync(je.promisify(oe.stat), Ee.default.isRetriableError),
  writeRetry: Me.retryifyAsync(je.promisify(oe.write), Ee.default.isRetriableError),
  chmodSyncAttempt: Ae.attemptifySync(oe.chmodSync, Ee.default.onChangeError),
  chownSyncAttempt: Ae.attemptifySync(oe.chownSync, Ee.default.onChangeError),
  closeSyncAttempt: Ae.attemptifySync(oe.closeSync),
  mkdirSyncAttempt: Ae.attemptifySync(oe.mkdirSync),
  realpathSyncAttempt: Ae.attemptifySync(oe.realpathSync),
  statSyncAttempt: Ae.attemptifySync(oe.statSync),
  unlinkSyncAttempt: Ae.attemptifySync(oe.unlinkSync),
  closeSyncRetry: Me.retryifySync(oe.closeSync, Ee.default.isRetriableError),
  fsyncSyncRetry: Me.retryifySync(oe.fsyncSync, Ee.default.isRetriableError),
  openSyncRetry: Me.retryifySync(oe.openSync, Ee.default.isRetriableError),
  readFileSyncRetry: Me.retryifySync(oe.readFileSync, Ee.default.isRetriableError),
  renameSyncRetry: Me.retryifySync(oe.renameSync, Ee.default.isRetriableError),
  statSyncRetry: Me.retryifySync(oe.statSync, Ee.default.isRetriableError),
  writeSyncRetry: Me.retryifySync(oe.writeSync, Ee.default.isRetriableError)
};
as.default = sf;
var va = {};
Object.defineProperty(va, "__esModule", { value: !0 });
const af = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
va.default = af;
var Ea = {};
Object.defineProperty(Ea, "__esModule", { value: !0 });
const hn = {}, Ks = {
  next: (e) => {
    const t = hn[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Ks.next(e)) : delete hn[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = hn[e];
    r || (r = hn[e] = []), r.push(t), !(r.length > 1) && t(() => Ks.next(e));
  })
};
Ea.default = Ks;
var wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
const of = or, fi = ae, hi = as, qe = {
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
    qe.store[e] && (delete qe.store[e], hi.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    qe.store[e] && (delete qe.store[e], hi.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in qe.store)
      qe.purgeSync(e);
  },
  truncate: (e) => {
    const t = of.basename(e);
    if (t.length <= fi.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - fi.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", qe.purgeSyncAll);
wa.default = qe;
Object.defineProperty(it, "__esModule", { value: !0 });
it.writeFileSync = it.writeFile = it.readFileSync = it.readFile = void 0;
const Xc = or, Pe = ae, se = as, Ke = va, cf = Ea, Ot = wa;
function Wc(e, t = Pe.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return Wc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Pe.DEFAULT_TIMEOUT_ASYNC);
  return se.default.readFileRetry(n)(e, t);
}
it.readFile = Wc;
function Yc(e, t = Pe.DEFAULT_READ_OPTIONS) {
  var r;
  if (Ke.default.isString(t))
    return Yc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Pe.DEFAULT_TIMEOUT_SYNC);
  return se.default.readFileSyncRetry(n)(e, t);
}
it.readFileSync = Yc;
const Qc = (e, t, r, n) => {
  if (Ke.default.isFunction(r))
    return Qc(e, t, Pe.DEFAULT_WRITE_OPTIONS, r);
  const s = Zc(e, t, r);
  return n && s.then(n, n), s;
};
it.writeFile = Qc;
const Zc = async (e, t, r = Pe.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return Zc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Pe.DEFAULT_TIMEOUT_ASYNC);
  let a = null, i = null, u = null, c = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), i = await cf.default.schedule(e), e = await se.default.realpathAttempt(e) || e, [c, u] = Ot.default.get(e, r.tmpCreate || Ot.default.create, r.tmpPurge !== !1);
    const l = Pe.IS_POSIX && Ke.default.isUndefined(r.chown), h = Ke.default.isUndefined(r.mode);
    if (l || h) {
      const g = await se.default.statAttempt(e);
      g && (r = { ...r }, l && (r.chown = { uid: g.uid, gid: g.gid }), h && (r.mode = g.mode));
    }
    const S = Xc.dirname(e);
    await se.default.mkdirAttempt(S, {
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
    u(), c = null;
  } finally {
    d && await se.default.closeAttempt(d), c && Ot.default.purge(c), a && a(), i && i();
  }
}, xc = (e, t, r = Pe.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Ke.default.isString(r))
    return xc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Pe.DEFAULT_TIMEOUT_SYNC);
  let a = null, i = null, u = null;
  try {
    e = se.default.realpathSyncAttempt(e) || e, [i, a] = Ot.default.get(e, r.tmpCreate || Ot.default.create, r.tmpPurge !== !1);
    const c = Pe.IS_POSIX && Ke.default.isUndefined(r.chown), d = Ke.default.isUndefined(r.mode);
    if (c || d) {
      const h = se.default.statSyncAttempt(e);
      h && (r = { ...r }, c && (r.chown = { uid: h.uid, gid: h.gid }), d && (r.mode = h.mode));
    }
    const l = Xc.dirname(e);
    se.default.mkdirSyncAttempt(l, {
      mode: Pe.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), u = se.default.openSyncRetry(s)(i, "w", r.mode || Pe.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), Ke.default.isString(t) ? se.default.writeSyncRetry(s)(u, t, 0, r.encoding || Pe.DEFAULT_ENCODING) : Ke.default.isUndefined(t) || se.default.writeSyncRetry(s)(u, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? se.default.fsyncSyncRetry(s)(u) : se.default.fsyncAttempt(u)), se.default.closeSyncRetry(s)(u), u = null, r.chown && se.default.chownSyncAttempt(i, r.chown.uid, r.chown.gid), r.mode && se.default.chmodSyncAttempt(i, r.mode);
    try {
      se.default.renameSyncRetry(s)(i, e);
    } catch (h) {
      if (h.code !== "ENAMETOOLONG")
        throw h;
      se.default.renameSyncRetry(s)(i, Ot.default.truncate(e));
    }
    a(), i = null;
  } finally {
    u && se.default.closeSyncAttempt(u), i && Ot.default.purge(i);
  }
};
it.writeFileSync = xc;
var Gs = { exports: {} }, el = {}, et = {}, br = {}, nn = {}, te = {}, tn = {};
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
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((N, T) => `${N}${T}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((N, T) => (T instanceof r && (N[T.str] = (N[T.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...w) {
    const N = [p[0]];
    let T = 0;
    for (; T < w.length; )
      u(N, w[T]), N.push(p[++T]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(p, ...w) {
    const N = [g(p[0])];
    let T = 0;
    for (; T < w.length; )
      N.push(a), u(N, w[T]), N.push(a, g(p[++T]));
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
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : g(Array.isArray(p) ? p.join(",") : p);
  }
  function S(p) {
    return new n(g(p));
  }
  e.stringify = S;
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
})(tn);
var Hs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = tn;
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
      const S = this.toName(d), { prefix: g } = S, v = (h = l.key) !== null && h !== void 0 ? h : l.ref;
      let _ = this._values[g];
      if (_) {
        const w = _.get(v);
        if (w)
          return w;
      } else
        _ = this._values[g] = /* @__PURE__ */ new Map();
      _.set(v, S);
      const $ = this._scope[g] || (this._scope[g] = []), p = $.length;
      return $[p] = l.ref, S.setValue(l, { property: g, itemIndex: p }), S;
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
      return this._reduceValues(d, (S) => {
        if (S.value === void 0)
          throw new Error(`CodeGen: name "${S}" has no value`);
        return S.value.code;
      }, l, h);
    }
    _reduceValues(d, l, h = {}, S) {
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
          let w = l(p);
          if (w) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            g = (0, t._)`${g}${N} ${p} = ${w};${this.opts._n}`;
          } else if (w = S == null ? void 0 : S(p))
            g = (0, t._)`${g}${w}${this.opts._n}`;
          else
            throw new r(p);
          $.set(p, n.Completed);
        });
      }
      return g;
    }
  }
  e.ValueScope = u;
})(Hs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = tn, r = Hs;
  var n = tn;
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
  var s = Hs;
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
  class S extends a {
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
  class g extends a {
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
  class v extends g {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class _ extends g {
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
  class T extends w {
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
  class B extends g {
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
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new _()];
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
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new S(o)), this;
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
      return this._for(new T(A, q, f, P), () => j(q));
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
    return typeof y == "boolean" || typeof y == "number" || y === null ? !y : (0, t._)`!${b(y)}`;
  }
  e.not = U;
  const D = m(e.operators.AND);
  function O(...y) {
    return y.reduce(D);
  }
  e.and = O;
  const R = m(e.operators.OR);
  function E(...y) {
    return y.reduce(R);
  }
  e.or = E;
  function m(y) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${b(o)} ${y} ${b(f)}`;
  }
  function b(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(te);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ie = te, lf = tn;
function uf(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
M.toHash = uf;
function df(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (tl(e, t), !rl(t, e.self.RULES.all));
}
M.alwaysValidSchema = df;
function tl(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || al(e, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = tl;
function rl(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
M.schemaHasRules = rl;
function ff(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = ff;
function hf({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ie._)`${r}`;
  }
  return (0, ie._)`${e}${t}${(0, ie.getProperty)(n)}`;
}
M.schemaRefOrVal = hf;
function pf(e) {
  return nl(decodeURIComponent(e));
}
M.unescapeFragment = pf;
function mf(e) {
  return encodeURIComponent(Sa(e));
}
M.escapeFragment = mf;
function Sa(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = Sa;
function nl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = nl;
function yf(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
M.eachItem = yf;
function pi({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ie.Name ? (a instanceof ie.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ie.Name ? (t(s, i, a), a) : r(a, i);
    return u === ie.Name && !(c instanceof ie.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: pi({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ie._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ie._)`${r} || {}`).code((0, ie._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ie._)`${r} || {}`), ba(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: sl
  }),
  items: pi({
    mergeNames: (e, t, r) => e.if((0, ie._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ie._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ie._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ie._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function sl(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ie._)`{}`);
  return t !== void 0 && ba(e, r, t), r;
}
M.evaluatedPropsToName = sl;
function ba(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ie._)`${t}${(0, ie.getProperty)(n)}`, !0));
}
M.setEvaluated = ba;
const mi = {};
function $f(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: mi[t.code] || (mi[t.code] = new lf._Code(t.code))
  });
}
M.useFunc = $f;
var Bs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Bs || (M.Type = Bs = {}));
function gf(e, t, r) {
  if (e instanceof ie.Name) {
    const n = t === Bs.Num;
    return r ? n ? (0, ie._)`"[" + ${e} + "]"` : (0, ie._)`"['" + ${e} + "']"` : n ? (0, ie._)`"/" + ${e}` : (0, ie._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ie.getProperty)(e).toString() : "/" + Sa(e);
}
M.getErrorPath = gf;
function al(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
M.checkStrictMode = al;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
const Te = te, _f = {
  // validation function arguments
  data: new Te.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Te.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Te.Name("instancePath"),
  parentData: new Te.Name("parentData"),
  parentDataProperty: new Te.Name("parentDataProperty"),
  rootData: new Te.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Te.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Te.Name("vErrors"),
  // null or array of validation errors
  errors: new Te.Name("errors"),
  // counter of validation errors
  this: new Te.Name("this"),
  // "globals"
  self: new Te.Name("self"),
  scope: new Te.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Te.Name("json"),
  jsonPos: new Te.Name("jsonPos"),
  jsonLen: new Te.Name("jsonLen"),
  jsonPart: new Te.Name("jsonPart")
};
dt.default = _f;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = te, r = M, n = dt;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: p }) => p ? (0, t.str)`"${$}" keyword must be ${p} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, p = e.keywordError, w, N) {
    const { it: T } = $, { gen: I, compositeRule: z, allErrors: B } = T, ue = h($, p, w);
    N ?? (z || B) ? c(I, ue) : d(T, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, p = e.keywordError, w) {
    const { it: N } = $, { gen: T, compositeRule: I, allErrors: z } = N, B = h($, p, w);
    c(T, B), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i($, p) {
    $.assign(n.default.errors, p), $.if((0, t._)`${n.default.vErrors} !== null`, () => $.if(p, () => $.assign((0, t._)`${n.default.vErrors}.length`, p), () => $.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: $, keyword: p, schemaValue: w, data: N, errsCount: T, it: I }) {
    if (T === void 0)
      throw new Error("ajv implementation error");
    const z = $.name("err");
    $.forRange("i", T, n.default.errors, (B) => {
      $.const(z, (0, t._)`${n.default.vErrors}[${B}]`), $.if((0, t._)`${z}.instancePath === undefined`, () => $.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), $.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && ($.assign((0, t._)`${z}.schema`, w), $.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c($, p) {
    const w = $.const("err", p);
    $.if((0, t._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), $.code((0, t._)`${n.default.errors}++`);
  }
  function d($, p) {
    const { gen: w, validateName: N, schemaEnv: T } = $;
    T.$async ? w.throw((0, t._)`new ${$.ValidationError}(${p})`) : (w.assign((0, t._)`${N}.errors`, p), w.return(!1));
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
    return N === !1 ? (0, t._)`{}` : S($, p, w);
  }
  function S($, p, w = {}) {
    const { gen: N, it: T } = $, I = [
      g(T, w),
      v($, w)
    ];
    return _($, p, I), N.object(...I);
  }
  function g({ errorPath: $ }, { instancePath: p }) {
    const w = p ? (0, t.str)`${$}${(0, r.getErrorPath)(p, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function v({ keyword: $, it: { errSchemaPath: p } }, { schemaPath: w, parentSchema: N }) {
    let T = N ? p : (0, t.str)`${p}/${$}`;
    return w && (T = (0, t.str)`${T}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, T];
  }
  function _($, { params: p, message: w }, N) {
    const { keyword: T, data: I, schemaValue: z, it: B } = $, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = B;
    N.push([l.keyword, T], [l.params, typeof p == "function" ? p($) : p || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof w == "function" ? w($) : w]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([l.propertyName, V]);
  }
})(nn);
Object.defineProperty(br, "__esModule", { value: !0 });
br.boolOrEmptySchema = br.topBoolOrEmptySchema = void 0;
const vf = nn, Ef = te, wf = dt, Sf = {
  message: "boolean schema is false"
};
function bf(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? ol(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(wf.default.data) : (t.assign((0, Ef._)`${n}.errors`, null), t.return(!0));
}
br.topBoolOrEmptySchema = bf;
function Pf(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), ol(e)) : r.var(t, !0);
}
br.boolOrEmptySchema = Pf;
function ol(e, t) {
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
  (0, vf.reportError)(s, Sf, void 0, t);
}
var _e = {}, rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.getRules = rr.isJSONType = void 0;
const Nf = ["string", "number", "integer", "boolean", "null", "object", "array"], Of = new Set(Nf);
function Tf(e) {
  return typeof e == "string" && Of.has(e);
}
rr.isJSONType = Tf;
function Rf() {
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
rr.getRules = Rf;
var pt = {};
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.shouldUseRule = pt.shouldUseGroup = pt.schemaHasRulesForType = void 0;
function If({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && il(e, n);
}
pt.schemaHasRulesForType = If;
function il(e, t) {
  return t.rules.some((r) => cl(e, r));
}
pt.shouldUseGroup = il;
function cl(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
pt.shouldUseRule = cl;
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.reportTypeError = _e.checkDataTypes = _e.checkDataType = _e.coerceAndCheckDataType = _e.getJSONTypes = _e.getSchemaTypes = _e.DataType = void 0;
const jf = rr, Af = pt, kf = nn, W = te, ll = M;
var yr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(yr || (_e.DataType = yr = {}));
function Cf(e) {
  const t = ul(e.type);
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
_e.getSchemaTypes = Cf;
function ul(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(jf.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
_e.getJSONTypes = ul;
function Df(e, t) {
  const { gen: r, data: n, opts: s } = e, a = Mf(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, Af.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = Pa(t, n, s.strictNumbers, yr.Wrong);
    r.if(u, () => {
      a.length ? Lf(e, t, a) : Na(e);
    });
  }
  return i;
}
_e.coerceAndCheckDataType = Df;
const dl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Mf(e, t) {
  return t ? e.filter((r) => dl.has(r) || t === "array" && r === "array") : [];
}
function Lf(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, W._)`typeof ${s}`), u = n.let("coerced", (0, W._)`undefined`);
  a.coerceTypes === "array" && n.if((0, W._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, W._)`${s}[0]`).assign(i, (0, W._)`typeof ${s}`).if(Pa(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, W._)`${u} !== undefined`);
  for (const d of r)
    (dl.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), Na(e), n.endIf(), n.if((0, W._)`${u} !== undefined`, () => {
    n.assign(s, u), Ff(e, u);
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
function Ff({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, W._)`${t} !== undefined`, () => e.assign((0, W._)`${t}[${r}]`, n));
}
function Js(e, t, r, n = yr.Correct) {
  const s = n === yr.Correct ? W.operators.EQ : W.operators.NEQ;
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
  return n === yr.Correct ? a : (0, W.not)(a);
  function i(u = W.nil) {
    return (0, W.and)((0, W._)`typeof ${t} == "number"`, u, r ? (0, W._)`isFinite(${t})` : W.nil);
  }
}
_e.checkDataType = Js;
function Pa(e, t, r, n) {
  if (e.length === 1)
    return Js(e[0], t, r, n);
  let s;
  const a = (0, ll.toHash)(e);
  if (a.array && a.object) {
    const i = (0, W._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, W._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = W.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, W.and)(s, Js(i, t, r, n));
  return s;
}
_e.checkDataTypes = Pa;
const Vf = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, W._)`{type: ${e}}` : (0, W._)`{type: ${t}}`
};
function Na(e) {
  const t = Uf(e);
  (0, kf.reportError)(t, Vf);
}
_e.reportTypeError = Na;
function Uf(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, ll.schemaRefOrVal)(e, n, "type");
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
const ir = te, zf = M;
function qf(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      yi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => yi(e, a, s.default));
}
os.assignDefaults = qf;
function yi(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, ir._)`${a}${(0, ir.getProperty)(t)}`;
  if (s) {
    (0, zf.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, ir._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, ir._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, ir._)`${u} = ${(0, ir.stringify)(r)}`);
}
var ct = {}, x = {};
Object.defineProperty(x, "__esModule", { value: !0 });
x.validateUnion = x.validateArray = x.usePattern = x.callValidateCode = x.schemaProperties = x.allSchemaProperties = x.noPropertyInData = x.propertyInData = x.isOwnProperty = x.hasPropFunc = x.reportMissingProp = x.checkMissingProp = x.checkReportMissingProp = void 0;
const fe = te, Oa = M, _t = dt, Kf = M;
function Gf(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(Ra(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, fe._)`${t}` }, !0), e.error();
  });
}
x.checkReportMissingProp = Gf;
function Hf({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, fe.or)(...n.map((a) => (0, fe.and)(Ra(e, t, a, r.ownProperties), (0, fe._)`${s} = ${a}`)));
}
x.checkMissingProp = Hf;
function Bf(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
x.reportMissingProp = Bf;
function fl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, fe._)`Object.prototype.hasOwnProperty`
  });
}
x.hasPropFunc = fl;
function Ta(e, t, r) {
  return (0, fe._)`${fl(e)}.call(${t}, ${r})`;
}
x.isOwnProperty = Ta;
function Jf(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} !== undefined`;
  return n ? (0, fe._)`${s} && ${Ta(e, t, r)}` : s;
}
x.propertyInData = Jf;
function Ra(e, t, r, n) {
  const s = (0, fe._)`${t}${(0, fe.getProperty)(r)} === undefined`;
  return n ? (0, fe.or)(s, (0, fe.not)(Ta(e, t, r))) : s;
}
x.noPropertyInData = Ra;
function hl(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
x.allSchemaProperties = hl;
function Xf(e, t) {
  return hl(t).filter((r) => !(0, Oa.alwaysValidSchema)(e, t[r]));
}
x.schemaProperties = Xf;
function Wf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, fe._)`${e}, ${t}, ${n}${s}` : t, h = [
    [_t.default.instancePath, (0, fe.strConcat)(_t.default.instancePath, a)],
    [_t.default.parentData, i.parentData],
    [_t.default.parentDataProperty, i.parentDataProperty],
    [_t.default.rootData, _t.default.rootData]
  ];
  i.opts.dynamicRef && h.push([_t.default.dynamicAnchors, _t.default.dynamicAnchors]);
  const S = (0, fe._)`${l}, ${r.object(...h)}`;
  return c !== fe.nil ? (0, fe._)`${u}.call(${c}, ${S})` : (0, fe._)`${u}(${S})`;
}
x.callValidateCode = Wf;
const Yf = (0, fe._)`new RegExp`;
function Qf({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, fe._)`${s.code === "new RegExp" ? Yf : (0, Kf.useFunc)(e, s)}(${r}, ${n})`
  });
}
x.usePattern = Qf;
function Zf(e) {
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
        dataPropType: Oa.Type.Num
      }, a), t.if((0, fe.not)(a), u);
    });
  }
}
x.validateArray = Zf;
function xf(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, Oa.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
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
x.validateUnion = xf;
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.validateKeywordUsage = ct.validSchemaType = ct.funcKeywordCode = ct.macroKeywordCode = void 0;
const ke = te, Yt = dt, eh = x, th = nn;
function rh(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = pl(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: ke.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
ct.macroKeywordCode = rh;
function nh(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  ah(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = pl(n, s, d), h = n.let("valid");
  e.block$data(h, S), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function S() {
    if (t.errors === !1)
      _(), t.modifying && $i(e), $(() => e.error());
    else {
      const p = t.async ? g() : v();
      t.modifying && $i(e), $(() => sh(e, p));
    }
  }
  function g() {
    const p = n.let("ruleErrs", null);
    return n.try(() => _((0, ke._)`await `), (w) => n.assign(h, !1).if((0, ke._)`${w} instanceof ${c.ValidationError}`, () => n.assign(p, (0, ke._)`${w}.errors`), () => n.throw(w))), p;
  }
  function v() {
    const p = (0, ke._)`${l}.errors`;
    return n.assign(p, null), _(ke.nil), p;
  }
  function _(p = t.async ? (0, ke._)`await ` : ke.nil) {
    const w = c.opts.passContext ? Yt.default.this : Yt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(h, (0, ke._)`${p}${(0, eh.callValidateCode)(e, l, w, N)}`, t.modifying);
  }
  function $(p) {
    var w;
    n.if((0, ke.not)((w = t.valid) !== null && w !== void 0 ? w : h), p);
  }
}
ct.funcKeywordCode = nh;
function $i(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, ke._)`${n.parentData}[${n.parentDataProperty}]`));
}
function sh(e, t) {
  const { gen: r } = e;
  r.if((0, ke._)`Array.isArray(${t})`, () => {
    r.assign(Yt.default.vErrors, (0, ke._)`${Yt.default.vErrors} === null ? ${t} : ${Yt.default.vErrors}.concat(${t})`).assign(Yt.default.errors, (0, ke._)`${Yt.default.vErrors}.length`), (0, th.extendErrors)(e);
  }, () => e.error());
}
function ah({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function pl(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, ke.stringify)(r) });
}
function oh(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
ct.validSchemaType = oh;
function ih({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
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
ct.validateKeywordUsage = ih;
var It = {};
Object.defineProperty(It, "__esModule", { value: !0 });
It.extendSubschemaMode = It.extendSubschemaData = It.getSubschema = void 0;
const at = te, ml = M;
function ch(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
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
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, ml.escapeFragment)(r)}`
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
It.getSubschema = ch;
function lh(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: h } = t, S = u.let("data", (0, at._)`${t.data}${(0, at.getProperty)(r)}`, !0);
    c(S), e.errorPath = (0, at.str)`${d}${(0, ml.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, at._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
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
It.extendSubschemaData = lh;
function uh(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
It.extendSubschemaMode = uh;
var Ne = {}, is = function e(t, r) {
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
}, yl = { exports: {} }, Tt = yl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  jn(t, n, s, e, "", e);
};
Tt.keywords = {
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
Tt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Tt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Tt.skipKeywords = {
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
function jn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var h = n[l];
      if (Array.isArray(h)) {
        if (l in Tt.arrayKeywords)
          for (var S = 0; S < h.length; S++)
            jn(e, t, r, h[S], s + "/" + l + "/" + S, a, s, l, n, S);
      } else if (l in Tt.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            jn(e, t, r, h[g], s + "/" + l + "/" + dh(g), a, s, l, n, g);
      } else (l in Tt.keywords || e.allKeys && !(l in Tt.skipKeywords)) && jn(e, t, r, h, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function dh(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var fh = yl.exports;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.getSchemaRefs = Ne.resolveUrl = Ne.normalizeId = Ne._getFullPath = Ne.getFullPath = Ne.inlineRef = void 0;
const hh = M, ph = is, mh = fh, yh = /* @__PURE__ */ new Set([
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
function $h(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Xs(e) : t ? $l(e) <= t : !1;
}
Ne.inlineRef = $h;
const gh = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Xs(e) {
  for (const t in e) {
    if (gh.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Xs) || typeof r == "object" && Xs(r))
      return !0;
  }
  return !1;
}
function $l(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !yh.has(r) && (typeof e[r] == "object" && (0, hh.eachItem)(e[r], (n) => t += $l(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function gl(e, t = "", r) {
  r !== !1 && (t = $r(t));
  const n = e.parse(t);
  return _l(e, n);
}
Ne.getFullPath = gl;
function _l(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ne._getFullPath = _l;
const _h = /#\/?$/;
function $r(e) {
  return e ? e.replace(_h, "") : "";
}
Ne.normalizeId = $r;
function vh(e, t, r) {
  return r = $r(r), e.resolve(t, r);
}
Ne.resolveUrl = vh;
const Eh = /^[a-z_][-a-z0-9._]*$/i;
function wh(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = $r(e[r] || t), a = { "": s }, i = gl(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return mh(e, { allKeys: !0 }, (h, S, g, v) => {
    if (v === void 0)
      return;
    const _ = i + S;
    let $ = a[v];
    typeof h[r] == "string" && ($ = p.call(this, h[r])), w.call(this, h.$anchor), w.call(this, h.$dynamicAnchor), a[S] = $;
    function p(N) {
      const T = this.opts.uriResolver.resolve;
      if (N = $r($ ? T($, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(h, I.schema, N) : N !== $r(_) && (N[0] === "#" ? (d(h, u[N], N), u[N] = h) : this.refs[N] = _), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!Eh.test(N))
          throw new Error(`invalid anchor "${N}"`);
        p.call(this, `#${N}`);
      }
    }
  }), u;
  function d(h, S, g) {
    if (S !== void 0 && !ph(h, S))
      throw l(g);
  }
  function l(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Ne.getSchemaRefs = wh;
Object.defineProperty(et, "__esModule", { value: !0 });
et.getData = et.KeywordCxt = et.validateFunctionCode = void 0;
const vl = br, gi = _e, Ia = pt, Jn = _e, Sh = os, Hr = ct, Ns = It, K = te, J = dt, bh = Ne, mt = M, Lr = nn;
function Ph(e) {
  if (Sl(e) && (bl(e), wl(e))) {
    Th(e);
    return;
  }
  El(e, () => (0, vl.topBoolOrEmptySchema)(e));
}
et.validateFunctionCode = Ph;
function El({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, K._)`${J.default.data}, ${J.default.valCxt}`, n.$async, () => {
    e.code((0, K._)`"use strict"; ${_i(r, s)}`), Oh(e, s), e.code(a);
  }) : e.func(t, (0, K._)`${J.default.data}, ${Nh(s)}`, n.$async, () => e.code(_i(r, s)).code(a));
}
function Nh(e) {
  return (0, K._)`{${J.default.instancePath}="", ${J.default.parentData}, ${J.default.parentDataProperty}, ${J.default.rootData}=${J.default.data}${e.dynamicRef ? (0, K._)`, ${J.default.dynamicAnchors}={}` : K.nil}}={}`;
}
function Oh(e, t) {
  e.if(J.default.valCxt, () => {
    e.var(J.default.instancePath, (0, K._)`${J.default.valCxt}.${J.default.instancePath}`), e.var(J.default.parentData, (0, K._)`${J.default.valCxt}.${J.default.parentData}`), e.var(J.default.parentDataProperty, (0, K._)`${J.default.valCxt}.${J.default.parentDataProperty}`), e.var(J.default.rootData, (0, K._)`${J.default.valCxt}.${J.default.rootData}`), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`${J.default.valCxt}.${J.default.dynamicAnchors}`);
  }, () => {
    e.var(J.default.instancePath, (0, K._)`""`), e.var(J.default.parentData, (0, K._)`undefined`), e.var(J.default.parentDataProperty, (0, K._)`undefined`), e.var(J.default.rootData, J.default.data), t.dynamicRef && e.var(J.default.dynamicAnchors, (0, K._)`{}`);
  });
}
function Th(e) {
  const { schema: t, opts: r, gen: n } = e;
  El(e, () => {
    r.$comment && t.$comment && Nl(e), kh(e), n.let(J.default.vErrors, null), n.let(J.default.errors, 0), r.unevaluated && Rh(e), Pl(e), Mh(e);
  });
}
function Rh(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, K._)`${r}.evaluated`), t.if((0, K._)`${e.evaluated}.dynamicProps`, () => t.assign((0, K._)`${e.evaluated}.props`, (0, K._)`undefined`)), t.if((0, K._)`${e.evaluated}.dynamicItems`, () => t.assign((0, K._)`${e.evaluated}.items`, (0, K._)`undefined`));
}
function _i(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, K._)`/*# sourceURL=${r} */` : K.nil;
}
function Ih(e, t) {
  if (Sl(e) && (bl(e), wl(e))) {
    jh(e, t);
    return;
  }
  (0, vl.boolOrEmptySchema)(e, t);
}
function wl({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Sl(e) {
  return typeof e.schema != "boolean";
}
function jh(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Nl(e), Ch(e), Dh(e);
  const a = n.const("_errs", J.default.errors);
  Pl(e, a), n.var(t, (0, K._)`${a} === ${J.default.errors}`);
}
function bl(e) {
  (0, mt.checkUnknownRules)(e), Ah(e);
}
function Pl(e, t) {
  if (e.opts.jtd)
    return vi(e, [], !1, t);
  const r = (0, gi.getSchemaTypes)(e.schema), n = (0, gi.coerceAndCheckDataType)(e, r);
  vi(e, r, !n, t);
}
function Ah(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, mt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function kh(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, mt.checkStrictMode)(e, "default is ignored in the schema root");
}
function Ch(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, bh.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Dh(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Nl({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, K._)`${J.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, K.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, K._)`${J.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function Mh(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, K._)`${J.default.errors} === 0`, () => t.return(J.default.data), () => t.throw((0, K._)`new ${s}(${J.default.vErrors})`)) : (t.assign((0, K._)`${n}.errors`, J.default.vErrors), a.unevaluated && Lh(e), t.return((0, K._)`${J.default.errors} === 0`));
}
function Lh({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof K.Name && e.assign((0, K._)`${t}.props`, r), n instanceof K.Name && e.assign((0, K._)`${t}.items`, n);
}
function vi(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, mt.schemaHasRulesButRef)(a, l))) {
    s.block(() => Rl(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || Fh(e, t), s.block(() => {
    for (const S of l.rules)
      h(S);
    h(l.post);
  });
  function h(S) {
    (0, Ia.shouldUseGroup)(a, S) && (S.type ? (s.if((0, Jn.checkDataType)(S.type, i, c.strictNumbers)), Ei(e, S), t.length === 1 && t[0] === S.type && r && (s.else(), (0, Jn.reportTypeError)(e)), s.endIf()) : Ei(e, S), u || s.if((0, K._)`${J.default.errors} === ${n || 0}`));
  }
}
function Ei(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Sh.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, Ia.shouldUseRule)(n, a) && Rl(e, a.keyword, a.definition, t.type);
  });
}
function Fh(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (Vh(e, t), e.opts.allowUnionTypes || Uh(e, t), zh(e, e.dataTypes));
}
function Vh(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Ol(e.dataTypes, r) || ja(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Kh(e, t);
  }
}
function Uh(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && ja(e, "use allowUnionTypes to allow union type keyword");
}
function zh(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Ia.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => qh(t, i)) && ja(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function qh(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Ol(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Kh(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Ol(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function ja(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, mt.checkStrictMode)(e, t, e.opts.strictTypes);
}
let Tl = class {
  constructor(t, r, n) {
    if ((0, Hr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, mt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Il(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Hr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Lr.reportExtraError : Lr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Lr.reportError)(this, this.def.$dataError || Lr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Lr.resetErrorsCount)(this.gen, this.errsCount);
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
        return (0, K._)`${(0, Jn.checkDataTypes)(c, r, a.opts.strictNumbers, Jn.DataType.Wrong)}`;
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
    const n = (0, Ns.getSubschema)(this.it, t);
    (0, Ns.extendSubschemaData)(n, this.it, t), (0, Ns.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return Ih(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = mt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = mt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, K.Name)), !0;
  }
};
et.KeywordCxt = Tl;
function Rl(e, t, r, n) {
  const s = new Tl(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Hr.funcKeywordCode)(s, r) : "macro" in r ? (0, Hr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Hr.funcKeywordCode)(s, r);
}
const Gh = /^\/(?:[^~]|~0|~1)*$/, Hh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Il(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return J.default.rootData;
  if (e[0] === "/") {
    if (!Gh.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = J.default.rootData;
  } else {
    const d = Hh.exec(e);
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
    d && (a = (0, K._)`${a}${(0, K.getProperty)((0, mt.unescapeJsonPointer)(d))}`, i = (0, K._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
et.getData = Il;
var sn = {};
Object.defineProperty(sn, "__esModule", { value: !0 });
let Bh = class extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
};
sn.default = Bh;
var Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
const Os = Ne;
let Jh = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Os.resolveUrl)(t, r, n), this.missingSchema = (0, Os.normalizeId)((0, Os.getFullPath)(t, this.missingRef));
  }
};
Tr.default = Jh;
var Ve = {};
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.resolveSchema = Ve.getCompilingSchema = Ve.resolveRef = Ve.compileSchema = Ve.SchemaEnv = void 0;
const Je = te, Xh = sn, Jt = dt, Ze = Ne, wi = M, Wh = et;
let cs = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Ze.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Ve.SchemaEnv = cs;
function Aa(e) {
  const t = jl.call(this, e);
  if (t)
    return t;
  const r = (0, Ze.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Je.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: Xh.default,
    code: (0, Je._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Jt.default.data,
    parentData: Jt.default.parentData,
    parentDataProperty: Jt.default.parentDataProperty,
    dataNames: [Jt.default.data],
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
    this._compilations.add(e), (0, Wh.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    l = `${i.scopeRefs(Jt.default.scope)}return ${h}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const g = new Function(`${Jt.default.self}`, `${Jt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: g }), g.errors = null, g.schema = e.schema, g.schemaEnv = e, e.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: c, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
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
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), h;
  } finally {
    this._compilations.delete(e);
  }
}
Ve.compileSchema = Aa;
function Yh(e, t, r) {
  var n;
  r = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = xh.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new cs({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = Qh.call(this, a);
}
Ve.resolveRef = Yh;
function Qh(e) {
  return (0, Ze.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Aa.call(this, e);
}
function jl(e) {
  for (const t of this._compilations)
    if (Zh(t, e))
      return t;
}
Ve.getCompilingSchema = jl;
function Zh(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function xh(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || ls.call(this, e, t);
}
function ls(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Ze._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Ze.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Ts.call(this, r, e);
  const a = (0, Ze.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = ls.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : Ts.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || Aa.call(this, i), a === (0, Ze.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, Ze.resolveUrl)(this.opts.uriResolver, s, d)), new cs({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return Ts.call(this, r, i);
  }
}
Ve.resolveSchema = ls;
const ep = /* @__PURE__ */ new Set([
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
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, wi.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !ep.has(u) && d && (t = (0, Ze.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, wi.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, Ze.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = ls.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new cs({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const tp = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", rp = "Meta-schema for $data reference (JSON AnySchema extension proposal)", np = "object", sp = [
  "$data"
], ap = {
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
}, op = !1, ip = {
  $id: tp,
  description: rp,
  type: np,
  required: sp,
  properties: ap,
  additionalProperties: op
};
var ka = {}, us = { exports: {} };
const cp = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), Al = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function kl(e) {
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
const lp = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function Si(e) {
  return e.length = 0, !0;
}
function up(e, t, r) {
  if (e.length) {
    const n = kl(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function dp(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, u = up;
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
        u = Si;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (u === Si ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(kl(s))), r.address = n.join(""), r;
}
function Cl(e) {
  if (fp(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = dp(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function fp(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function hp(e) {
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
function pp(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function mp(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!Al(r)) {
      const n = Cl(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var Dl = {
  nonSimpleDomain: lp,
  recomposeAuthority: mp,
  normalizeComponentEncoding: pp,
  removeDotSegments: hp,
  isIPv4: Al,
  isUUID: cp,
  normalizeIPv6: Cl
};
const { isUUID: yp } = Dl, $p = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Ml(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function Ll(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Fl(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function gp(e) {
  return e.secure = Ml(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function _p(e) {
  if ((e.port === (Ml(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function vp(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match($p);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = Ca(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function Ep(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = Ca(s);
  a && (e = a.serialize(e, t));
  const i = e, u = e.nss;
  return i.path = `${n || t.nid}:${u}`, t.skipEscape = !0, i;
}
function wp(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !yp(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function Sp(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const Vl = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: Ll,
    serialize: Fl
  }
), bp = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: Vl.domainHost,
    parse: Ll,
    serialize: Fl
  }
), An = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: gp,
    serialize: _p
  }
), Pp = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: An.domainHost,
    parse: An.parse,
    serialize: An.serialize
  }
), Np = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: vp,
    serialize: Ep,
    skipNormalize: !0
  }
), Op = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: wp,
    serialize: Sp,
    skipNormalize: !0
  }
), Xn = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: Vl,
    https: bp,
    ws: An,
    wss: Pp,
    urn: Np,
    "urn:uuid": Op
  }
);
Object.setPrototypeOf(Xn, null);
function Ca(e) {
  return e && (Xn[
    /** @type {SchemeName} */
    e
  ] || Xn[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var Tp = {
  SCHEMES: Xn,
  getSchemeHandler: Ca
};
const { normalizeIPv6: Rp, removeDotSegments: qr, recomposeAuthority: Ip, normalizeComponentEncoding: pn, isIPv4: jp, nonSimpleDomain: Ap } = Dl, { SCHEMES: kp, getSchemeHandler: Ul } = Tp;
function Cp(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  lt(gt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  gt(lt(e, t), t)), e;
}
function Dp(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = zl(gt(e, n), gt(t, n), n, !0);
  return n.skipEscape = !0, lt(s, n);
}
function zl(e, t, r, n) {
  const s = {};
  return n || (e = gt(lt(e, r), r), t = gt(lt(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = qr(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = qr(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = qr(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = qr(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function Mp(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = lt(pn(gt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = lt(pn(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = lt(pn(gt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = lt(pn(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
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
  }, n = Object.assign({}, t), s = [], a = Ul(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = Ip(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let u = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (u = qr(u)), i === void 0 && u[0] === "/" && u[1] === "/" && (u = "/%2F" + u.slice(2)), s.push(u);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const Lp = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function gt(e, t) {
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
  const a = e.match(Lp);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (jp(n.host) === !1) {
        const c = Rp(n.host);
        n.host = c.host.toLowerCase(), s = c.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = Ul(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && Ap(n.host))
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
const Da = {
  SCHEMES: kp,
  normalize: Cp,
  resolve: Dp,
  resolveComponent: zl,
  equal: Mp,
  serialize: lt,
  parse: gt
};
us.exports = Da;
us.exports.default = Da;
us.exports.fastUri = Da;
var ql = us.exports;
Object.defineProperty(ka, "__esModule", { value: !0 });
const Kl = ql;
Kl.code = 'require("ajv/dist/runtime/uri").default';
ka.default = Kl;
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
  const n = sn, s = Tr, a = rr, i = Ve, u = te, c = Ne, d = _e, l = M, h = ip, S = ka, g = (E, m) => new RegExp(E, m);
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
  }, w = 200;
  function N(E) {
    var m, b, y, o, f, P, j, A, q, F, re, ze, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut, zt, qt, Kt, Gt;
    const Be = E.strict, Ht = (m = E.code) === null || m === void 0 ? void 0 : m.optimize, Dr = Ht === !0 || Ht === void 0 ? 1 : Ht || 0, Mr = (y = (b = E.code) === null || b === void 0 ? void 0 : b.regExp) !== null && y !== void 0 ? y : g, Ps = (o = E.uriResolver) !== null && o !== void 0 ? o : S.default;
    return {
      strictSchema: (P = (f = E.strictSchema) !== null && f !== void 0 ? f : Be) !== null && P !== void 0 ? P : !0,
      strictNumbers: (A = (j = E.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = E.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (ze = (re = E.strictTuples) !== null && re !== void 0 ? re : Be) !== null && ze !== void 0 ? ze : "log",
      strictRequired: (kt = (At = E.strictRequired) !== null && At !== void 0 ? At : Be) !== null && kt !== void 0 ? kt : !1,
      code: E.code ? { ...E.code, optimize: Dr, regExp: Mr } : { optimize: Dr, regExp: Mr },
      loopRequired: (Ct = E.loopRequired) !== null && Ct !== void 0 ? Ct : w,
      loopEnum: (Dt = E.loopEnum) !== null && Dt !== void 0 ? Dt : w,
      meta: (Mt = E.meta) !== null && Mt !== void 0 ? Mt : !0,
      messages: (Lt = E.messages) !== null && Lt !== void 0 ? Lt : !0,
      inlineRefs: (Ft = E.inlineRefs) !== null && Ft !== void 0 ? Ft : !0,
      schemaId: (Vt = E.schemaId) !== null && Vt !== void 0 ? Vt : "$id",
      addUsedSchema: (Ut = E.addUsedSchema) !== null && Ut !== void 0 ? Ut : !0,
      validateSchema: (zt = E.validateSchema) !== null && zt !== void 0 ? zt : !0,
      validateFormats: (qt = E.validateFormats) !== null && qt !== void 0 ? qt : !0,
      unicodeRegExp: (Kt = E.unicodeRegExp) !== null && Kt !== void 0 ? Kt : !0,
      int32range: (Gt = E.int32range) !== null && Gt !== void 0 ? Gt : !0,
      uriResolver: Ps
    };
  }
  class T {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...N(m) };
      const { es5: b, lines: y } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: _, es5: b, lines: y }), this.logger = Q(m.logger);
      const o = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, m, "NOT SUPPORTED"), I.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = H.call(this), m.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && V.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), B.call(this), m.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: b, schemaId: y } = this.opts;
      let o = h;
      y === "id" && (o = { ...h }, o.id = o.$id, delete o.$id), b && m && this.addMetaSchema(o, o[y], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: b } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[b] || m : void 0;
    }
    validate(m, b) {
      let y;
      if (typeof m == "string") {
        if (y = this.getSchema(m), !y)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        y = this.compile(m);
      const o = y(b);
      return "$async" in y || (this.errors = y.errors), o;
    }
    compile(m, b) {
      const y = this._addSchema(m, b);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(m, b) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return o.call(this, m, b);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const ze = this._addSchema(F, re);
        return ze.validate || P.call(this, ze);
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
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, b);
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
    addSchema(m, b, y, o = this.opts.validateSchema) {
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
      return b = (0, c.normalizeId)(b || f), this._checkUnique(b), this.schemas[b] = this._addSchema(m, y, b, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, b, y = this.opts.validateSchema) {
      return this.addSchema(m, b, !0, y), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, b) {
      if (typeof m == "boolean")
        return !0;
      let y;
      if (y = m.$schema, y !== void 0 && typeof y != "string")
        throw new Error("$schema must be a string");
      if (y = y || this.opts.defaultMeta || this.defaultMeta(), !y)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate(y, m);
      if (!o && b) {
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
      let b;
      for (; typeof (b = z.call(this, m)) == "string"; )
        m = b;
      if (b === void 0) {
        const { schemaId: y } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: y });
        if (b = i.resolveSchema.call(this, o, m), !b)
          return;
        this.refs[m] = b;
      }
      return b.validate || this._compileSchemaEnv(b);
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
          const b = z.call(this, m);
          return typeof b == "object" && this._cache.delete(b.schema), delete this.schemas[m], delete this.refs[m], this;
        }
        case "object": {
          const b = m;
          this._cache.delete(b);
          let y = m[this.opts.schemaId];
          return y && (y = (0, c.normalizeId)(y), delete this.schemas[y], delete this.refs[y]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(m) {
      for (const b of m)
        this.addKeyword(b);
      return this;
    }
    addKeyword(m, b) {
      let y;
      if (typeof m == "string")
        y = m, typeof b == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), b.keyword = y);
      else if (typeof m == "object" && b === void 0) {
        if (b = m, y = b.keyword, Array.isArray(y) && !y.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, y, b), !b)
        return (0, l.eachItem)(y, (f) => k.call(this, f)), this;
      D.call(this, b);
      const o = {
        ...b,
        type: (0, d.getJSONTypes)(b.type),
        schemaType: (0, d.getJSONTypes)(b.schemaType)
      };
      return (0, l.eachItem)(y, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((P) => k.call(this, f, o, P))), this;
    }
    getKeyword(m) {
      const b = this.RULES.all[m];
      return typeof b == "object" ? b.definition : !!b;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: b } = this;
      delete b.keywords[m], delete b.all[m];
      for (const y of b.rules) {
        const o = y.rules.findIndex((f) => f.keyword === m);
        o >= 0 && y.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, b) {
      return typeof b == "string" && (b = new RegExp(b)), this.formats[m] = b, this;
    }
    errorsText(m = this.errors, { separator: b = ", ", dataVar: y = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((o) => `${y}${o.instancePath} ${o.message}`).reduce((o, f) => o + b + f);
    }
    $dataMetaSchema(m, b) {
      const y = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const o of b) {
        const f = o.split("/").slice(1);
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
    _removeAllSchemas(m, b) {
      for (const y in m) {
        const o = m[y];
        (!b || b.test(y)) && (typeof o == "string" ? delete m[y] : o && !o.meta && (this._cache.delete(o.schema), delete m[y]));
      }
    }
    _addSchema(m, b, y, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
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
      return A = new i.SchemaEnv({ schema: m, schemaId: j, meta: b, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), o && this.validateSchema(m, !0), A;
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
      const b = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, m);
      } finally {
        this.opts = b;
      }
    }
  }
  T.ValidationError = n.default, T.MissingRefError = s.default, e.default = T;
  function I(E, m, b, y = "error") {
    for (const o in E) {
      const f = o;
      f in m && this.logger[y](`${b}: option ${o}. ${E[f]}`);
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
      const b = E[m];
      b.keyword || (b.keyword = m), this.addKeyword(b);
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
    const { RULES: b } = this;
    if ((0, l.eachItem)(E, (y) => {
      if (b.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(E, m, b) {
    var y;
    const o = m == null ? void 0 : m.post;
    if (b && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let P = o ? f.post : f.rules.find(({ type: A }) => A === b);
    if (P || (P = { type: b, rules: [] }, f.rules.push(P)), f.keywords[E] = !0, !m)
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
  function U(E, m, b) {
    const y = E.rules.findIndex((o) => o.keyword === b);
    y >= 0 ? E.rules.splice(y, 0, m) : (E.rules.push(m), this.logger.warn(`rule ${b} is not defined`));
  }
  function D(E) {
    let { metaSchema: m } = E;
    m !== void 0 && (E.$data && this.opts.$data && (m = R(m)), E.validateSchema = this.compile(m, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function R(E) {
    return { anyOf: [E, O] };
  }
})(el);
var Ma = {}, La = {}, Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const Fp = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Fa.default = Fp;
var nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.callRef = nr.getValidate = void 0;
const Vp = Tr, bi = x, Le = te, cr = dt, Pi = Ve, mn = M, Up = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const l = Pi.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new Vp.default(n.opts.uriResolver, s, r);
    if (l instanceof Pi.SchemaEnv)
      return S(l);
    return g(l);
    function h() {
      if (a === d)
        return kn(e, i, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return kn(e, (0, Le._)`${v}.validate`, d, d.$async);
    }
    function S(v) {
      const _ = Gl(e, v);
      kn(e, _, v, v.$async);
    }
    function g(v) {
      const _ = t.scopeValue("schema", u.code.source === !0 ? { ref: v, code: (0, Le.stringify)(v) } : { ref: v }), $ = t.name("valid"), p = e.subschema({
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
function Gl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Le._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
nr.getValidate = Gl;
function kn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? cr.default.this : Le.nil;
  n ? l() : h();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Le._)`await ${(0, bi.callValidateCode)(e, t, d)}`), g(t), i || s.assign(v, !0);
    }, (_) => {
      s.if((0, Le._)`!(${_} instanceof ${a.ValidationError})`, () => s.throw(_)), S(_), i || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, bi.callValidateCode)(e, t, d), () => g(t), () => S(t));
  }
  function S(v) {
    const _ = (0, Le._)`${v}.errors`;
    s.assign(cr.default.vErrors, (0, Le._)`${cr.default.vErrors} === null ? ${_} : ${cr.default.vErrors}.concat(${_})`), s.assign(cr.default.errors, (0, Le._)`${cr.default.vErrors}.length`);
  }
  function g(v) {
    var _;
    if (!a.opts.unevaluated)
      return;
    const $ = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = mn.mergeEvaluated.props(s, $.props, a.props));
      else {
        const p = s.var("props", (0, Le._)`${v}.evaluated.props`);
        a.props = mn.mergeEvaluated.props(s, p, a.props, Le.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = mn.mergeEvaluated.items(s, $.items, a.items));
      else {
        const p = s.var("items", (0, Le._)`${v}.evaluated.items`);
        a.items = mn.mergeEvaluated.items(s, p, a.items, Le.Name);
      }
  }
}
nr.callRef = kn;
nr.default = Up;
Object.defineProperty(La, "__esModule", { value: !0 });
const zp = Fa, qp = nr, Kp = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  zp.default,
  qp.default
];
La.default = Kp;
var Va = {}, Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const Wn = te, vt = Wn.operators, Yn = {
  maximum: { okStr: "<=", ok: vt.LTE, fail: vt.GT },
  minimum: { okStr: ">=", ok: vt.GTE, fail: vt.LT },
  exclusiveMaximum: { okStr: "<", ok: vt.LT, fail: vt.GTE },
  exclusiveMinimum: { okStr: ">", ok: vt.GT, fail: vt.LTE }
}, Gp = {
  message: ({ keyword: e, schemaCode: t }) => (0, Wn.str)`must be ${Yn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Wn._)`{comparison: ${Yn[e].okStr}, limit: ${t}}`
}, Hp = {
  keyword: Object.keys(Yn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Gp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Wn._)`${r} ${Yn[t].fail} ${n} || isNaN(${r})`);
  }
};
Ua.default = Hp;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const Br = te, Bp = {
  message: ({ schemaCode: e }) => (0, Br.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Br._)`{multipleOf: ${e}}`
}, Jp = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Bp,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Br._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Br._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Br._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
za.default = Jp;
var qa = {}, Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
function Hl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ka.default = Hl;
Hl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(qa, "__esModule", { value: !0 });
const Qt = te, Xp = M, Wp = Ka, Yp = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Qt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Qt._)`{limit: ${e}}`
}, Qp = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Yp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Qt.operators.GT : Qt.operators.LT, i = s.opts.unicode === !1 ? (0, Qt._)`${r}.length` : (0, Qt._)`${(0, Xp.useFunc)(e.gen, Wp.default)}(${r})`;
    e.fail$data((0, Qt._)`${i} ${a} ${n}`);
  }
};
qa.default = Qp;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const Zp = x, Qn = te, xp = {
  message: ({ schemaCode: e }) => (0, Qn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Qn._)`{pattern: ${e}}`
}, em = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: xp,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, Qn._)`(new RegExp(${s}, ${i}))` : (0, Zp.usePattern)(e, n);
    e.fail$data((0, Qn._)`!${u}.test(${t})`);
  }
};
Ga.default = em;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const Jr = te, tm = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Jr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Jr._)`{limit: ${e}}`
}, rm = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: tm,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Jr.operators.GT : Jr.operators.LT;
    e.fail$data((0, Jr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Ha.default = rm;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const Fr = x, Xr = te, nm = M, sm = {
  message: ({ params: { missingProperty: e } }) => (0, Xr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Xr._)`{missingProperty: ${e}}`
}, am = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: sm,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const g = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const _ of r)
        if ((g == null ? void 0 : g[_]) === void 0 && !v.has(_)) {
          const $ = i.schemaEnv.baseId + i.errSchemaPath, p = `required property "${_}" is not defined at "${$}" (strictRequired)`;
          (0, nm.checkStrictMode)(i, p, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(Xr.nil, h);
      else
        for (const g of r)
          (0, Fr.checkReportMissingProp)(e, g);
    }
    function l() {
      const g = t.let("missing");
      if (c || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => S(g, v)), e.ok(v);
      } else
        t.if((0, Fr.checkMissingProp)(e, r, g)), (0, Fr.reportMissingProp)(e, g), t.else();
    }
    function h() {
      t.forOf("prop", n, (g) => {
        e.setParams({ missingProperty: g }), t.if((0, Fr.noPropertyInData)(t, s, g, u.ownProperties), () => e.error());
      });
    }
    function S(g, v) {
      e.setParams({ missingProperty: g }), t.forOf(g, n, () => {
        t.assign(v, (0, Fr.propertyInData)(t, s, g, u.ownProperties)), t.if((0, Xr.not)(v), () => {
          e.error(), t.break();
        });
      }, Xr.nil);
    }
  }
};
Ba.default = am;
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Wr = te, om = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Wr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Wr._)`{limit: ${e}}`
}, im = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: om,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Wr.operators.GT : Wr.operators.LT;
    e.fail$data((0, Wr._)`${r}.length ${s} ${n}`);
  }
};
Ja.default = im;
var Xa = {}, an = {};
Object.defineProperty(an, "__esModule", { value: !0 });
const Bl = is;
Bl.code = 'require("ajv/dist/runtime/equal").default';
an.default = Bl;
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Rs = _e, we = te, cm = M, lm = an, um = {
  message: ({ params: { i: e, j: t } }) => (0, we.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, we._)`{i: ${e}, j: ${t}}`
}, dm = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: um,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, Rs.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, we._)`${i} === false`), e.ok(c);
    function l() {
      const v = t.let("i", (0, we._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: v, j: _ }), t.assign(c, !0), t.if((0, we._)`${v} > 1`, () => (h() ? S : g)(v, _));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function S(v, _) {
      const $ = t.name("item"), p = (0, Rs.checkDataTypes)(d, $, u.opts.strictNumbers, Rs.DataType.Wrong), w = t.const("indices", (0, we._)`{}`);
      t.for((0, we._)`;${v}--;`, () => {
        t.let($, (0, we._)`${r}[${v}]`), t.if(p, (0, we._)`continue`), d.length > 1 && t.if((0, we._)`typeof ${$} == "string"`, (0, we._)`${$} += "_"`), t.if((0, we._)`typeof ${w}[${$}] == "number"`, () => {
          t.assign(_, (0, we._)`${w}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, we._)`${w}[${$}] = ${v}`);
      });
    }
    function g(v, _) {
      const $ = (0, cm.useFunc)(t, lm.default), p = t.name("outer");
      t.label(p).for((0, we._)`;${v}--;`, () => t.for((0, we._)`${_} = ${v}; ${_}--;`, () => t.if((0, we._)`${$}(${r}[${v}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(p);
      })));
    }
  }
};
Xa.default = dm;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const Ws = te, fm = M, hm = an, pm = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Ws._)`{allowedValue: ${e}}`
}, mm = {
  keyword: "const",
  $data: !0,
  error: pm,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Ws._)`!${(0, fm.useFunc)(t, hm.default)}(${r}, ${s})`) : e.fail((0, Ws._)`${a} !== ${r}`);
  }
};
Wa.default = mm;
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
const Kr = te, ym = M, $m = an, gm = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Kr._)`{allowedValues: ${e}}`
}, _m = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: gm,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, ym.useFunc)(t, $m.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const g = t.const("vSchema", a);
      l = (0, Kr.or)(...s.map((v, _) => S(g, _)));
    }
    e.pass(l);
    function h() {
      t.assign(l, !1), t.forOf("v", a, (g) => t.if((0, Kr._)`${d()}(${r}, ${g})`, () => t.assign(l, !0).break()));
    }
    function S(g, v) {
      const _ = s[v];
      return typeof _ == "object" && _ !== null ? (0, Kr._)`${d()}(${r}, ${g}[${v}])` : (0, Kr._)`${r} === ${_}`;
    }
  }
};
Ya.default = _m;
Object.defineProperty(Va, "__esModule", { value: !0 });
const vm = Ua, Em = za, wm = qa, Sm = Ga, bm = Ha, Pm = Ba, Nm = Ja, Om = Xa, Tm = Wa, Rm = Ya, Im = [
  // number
  vm.default,
  Em.default,
  // string
  wm.default,
  Sm.default,
  // object
  bm.default,
  Pm.default,
  // array
  Nm.default,
  Om.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Tm.default,
  Rm.default
];
Va.default = Im;
var Qa = {}, Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.validateAdditionalItems = void 0;
const Zt = te, Ys = M, jm = {
  message: ({ params: { len: e } }) => (0, Zt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Zt._)`{limit: ${e}}`
}, Am = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: jm,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ys.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Jl(e, n);
  }
};
function Jl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, Zt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Zt._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ys.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Zt._)`${u} <= ${t.length}`);
    r.if((0, Zt.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: Ys.Type.Num }, d), i.allErrors || r.if((0, Zt.not)(d), () => r.break());
    });
  }
}
Rr.validateAdditionalItems = Jl;
Rr.default = Am;
var Za = {}, Ir = {};
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.validateTuple = void 0;
const Ni = te, Cn = M, km = x, Cm = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Xl(e, "additionalItems", t);
    r.items = !0, !(0, Cn.alwaysValidSchema)(r, t) && e.ok((0, km.validateArray)(e));
  }
};
function Xl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = Cn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, Ni._)`${a}.length`);
  r.forEach((h, S) => {
    (0, Cn.alwaysValidSchema)(u, h) || (n.if((0, Ni._)`${d} > ${S}`, () => e.subschema({
      keyword: i,
      schemaProp: S,
      dataProp: S
    }, c)), e.ok(c));
  });
  function l(h) {
    const { opts: S, errSchemaPath: g } = u, v = r.length, _ = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (S.strictTuples && !_) {
      const $ = `"${i}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, Cn.checkStrictMode)(u, $, S.strictTuples);
    }
  }
}
Ir.validateTuple = Xl;
Ir.default = Cm;
Object.defineProperty(Za, "__esModule", { value: !0 });
const Dm = Ir, Mm = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Dm.validateTuple)(e, "items")
};
Za.default = Mm;
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
const Oi = te, Lm = M, Fm = x, Vm = Rr, Um = {
  message: ({ params: { len: e } }) => (0, Oi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Oi._)`{limit: ${e}}`
}, zm = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Um,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Lm.alwaysValidSchema)(n, t) && (s ? (0, Vm.validateAdditionalItems)(e, s) : e.ok((0, Fm.validateArray)(e)));
  }
};
xa.default = zm;
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
const Ge = te, yn = M, qm = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge.str)`must contain at least ${e} valid item(s)` : (0, Ge.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ge._)`{minContains: ${e}}` : (0, Ge._)`{minContains: ${e}, maxContains: ${t}}`
}, Km = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: qm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, Ge._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, yn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, yn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, yn.alwaysValidSchema)(a, r)) {
      let _ = (0, Ge._)`${l} >= ${i}`;
      u !== void 0 && (_ = (0, Ge._)`${_} && ${l} <= ${u}`), e.pass(_);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    u === void 0 && i === 1 ? g(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), u !== void 0 && t.if((0, Ge._)`${s}.length > 0`, S)) : (t.let(h, !1), S()), e.result(h, () => e.reset());
    function S() {
      const _ = t.name("_valid"), $ = t.let("count", 0);
      g(_, () => t.if(_, () => v($)));
    }
    function g(_, $) {
      t.forRange("i", 0, l, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: yn.Type.Num,
          compositeRule: !0
        }, _), $();
      });
    }
    function v(_) {
      t.code((0, Ge._)`${_}++`), u === void 0 ? t.if((0, Ge._)`${_} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, Ge._)`${_} > ${u}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, Ge._)`${_} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
eo.default = Km;
var Wl = {};
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
      const S = Array.isArray(c[h]) ? d : l;
      S[h] = c[h];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: h, it: S } = c;
    if (Object.keys(d).length === 0)
      return;
    const g = l.let("missing");
    for (const v in d) {
      const _ = d[v];
      if (_.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, h, v, S.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: _.length,
        deps: _.join(", ")
      }), S.allErrors ? l.if($, () => {
        for (const p of _)
          (0, n.checkReportMissingProp)(c, p);
      }) : (l.if((0, t._)`${$} && (${(0, n.checkMissingProp)(c, _, g)})`), (0, n.reportMissingProp)(c, g), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: h, keyword: S, it: g } = c, v = l.name("valid");
    for (const _ in d)
      (0, r.alwaysValidSchema)(g, d[_]) || (l.if(
        (0, n.propertyInData)(l, h, _, g.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: S, schemaProp: _ }, v);
          c.mergeValidEvaluated($, v);
        },
        () => l.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = u, e.default = s;
})(Wl);
var to = {};
Object.defineProperty(to, "__esModule", { value: !0 });
const Yl = te, Gm = M, Hm = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Yl._)`{propertyName: ${e.propertyName}}`
}, Bm = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Hm,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, Gm.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Yl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
to.default = Bm;
var ds = {};
Object.defineProperty(ds, "__esModule", { value: !0 });
const $n = x, We = te, Jm = dt, gn = M, Xm = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, We._)`{additionalProperty: ${e.additionalProperty}}`
}, Wm = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Xm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, gn.alwaysValidSchema)(i, r))
      return;
    const d = (0, $n.allSchemaProperties)(n.properties), l = (0, $n.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, We._)`${a} === ${Jm.default.errors}`);
    function h() {
      t.forIn("key", s, ($) => {
        !d.length && !l.length ? v($) : t.if(S($), () => v($));
      });
    }
    function S($) {
      let p;
      if (d.length > 8) {
        const w = (0, gn.schemaRefOrVal)(i, n.properties, "properties");
        p = (0, $n.isOwnProperty)(t, w, $);
      } else d.length ? p = (0, We.or)(...d.map((w) => (0, We._)`${$} === ${w}`)) : p = We.nil;
      return l.length && (p = (0, We.or)(p, ...l.map((w) => (0, We._)`${(0, $n.usePattern)(e, w)}.test(${$})`))), (0, We.not)(p);
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
        e.setParams({ additionalProperty: $ }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, gn.alwaysValidSchema)(i, r)) {
        const p = t.name("valid");
        c.removeAdditional === "failing" ? (_($, p, !1), t.if((0, We.not)(p), () => {
          e.reset(), g($);
        })) : (_($, p), u || t.if((0, We.not)(p), () => t.break()));
      }
    }
    function _($, p, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: gn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, p);
    }
  }
};
ds.default = Wm;
var ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
const Ym = et, Ti = x, Is = M, Ri = ds, Qm = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Ri.default.code(new Ym.KeywordCxt(a, Ri.default, "additionalProperties"));
    const i = (0, Ti.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = Is.mergeEvaluated.props(t, (0, Is.toHash)(i), a.props));
    const u = i.filter((h) => !(0, Is.alwaysValidSchema)(a, r[h]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const h of u)
      d(h) ? l(h) : (t.if((0, Ti.propertyInData)(t, s, h, a.opts.ownProperties)), l(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
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
ro.default = Qm;
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
const Ii = x, _n = te, ji = M, Ai = M, Zm = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Ii.allSchemaProperties)(r), c = u.filter((_) => (0, ji.alwaysValidSchema)(a, r[_]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof _n.Name) && (a.props = (0, Ai.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    S();
    function S() {
      for (const _ of u)
        d && g(_), a.allErrors ? v(_) : (t.var(l, !0), v(_), t.if(l));
    }
    function g(_) {
      for (const $ in d)
        new RegExp(_).test($) && (0, ji.checkStrictMode)(a, `property ${$} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function v(_) {
      t.forIn("key", n, ($) => {
        t.if((0, _n._)`${(0, Ii.usePattern)(e, _)}.test(${$})`, () => {
          const p = c.includes(_);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: $,
            dataPropType: Ai.Type.Str
          }, l), a.opts.unevaluated && h !== !0 ? t.assign((0, _n._)`${h}[${$}]`, !0) : !p && !a.allErrors && t.if((0, _n.not)(l), () => t.break());
        });
      });
    }
  }
};
no.default = Zm;
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
const xm = M, ey = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, xm.alwaysValidSchema)(n, r)) {
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
so.default = ey;
var ao = {};
Object.defineProperty(ao, "__esModule", { value: !0 });
const ty = x, ry = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: ty.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
ao.default = ry;
var oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
const Dn = te, ny = M, sy = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Dn._)`{passingSchemas: ${e.passing}}`
}, ay = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: sy,
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
        let S;
        (0, ny.alwaysValidSchema)(s, l) ? t.var(c, !0) : S = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, Dn._)`${c} && ${i}`).assign(i, !1).assign(u, (0, Dn._)`[${u}, ${h}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, h), S && e.mergeEvaluated(S, Dn.Name);
        });
      });
    }
  }
};
oo.default = ay;
var io = {};
Object.defineProperty(io, "__esModule", { value: !0 });
const oy = M, iy = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, oy.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
io.default = iy;
var co = {};
Object.defineProperty(co, "__esModule", { value: !0 });
const Zn = te, Ql = M, cy = {
  message: ({ params: e }) => (0, Zn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Zn._)`{failingKeyword: ${e.ifClause}}`
}, ly = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: cy,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Ql.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = ki(n, "then"), a = ki(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, Zn.not)(u), d("else"));
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
        const S = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(S, i), h ? t.assign(h, (0, Zn._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function ki(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Ql.alwaysValidSchema)(e, r);
}
co.default = ly;
var lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
const uy = M, dy = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, uy.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
lo.default = dy;
Object.defineProperty(Qa, "__esModule", { value: !0 });
const fy = Rr, hy = Za, py = Ir, my = xa, yy = eo, $y = Wl, gy = to, _y = ds, vy = ro, Ey = no, wy = so, Sy = ao, by = oo, Py = io, Ny = co, Oy = lo;
function Ty(e = !1) {
  const t = [
    // any
    wy.default,
    Sy.default,
    by.default,
    Py.default,
    Ny.default,
    Oy.default,
    // object
    gy.default,
    _y.default,
    $y.default,
    vy.default,
    Ey.default
  ];
  return e ? t.push(hy.default, my.default) : t.push(fy.default, py.default), t.push(yy.default), t;
}
Qa.default = Ty;
var uo = {}, fo = {};
Object.defineProperty(fo, "__esModule", { value: !0 });
const me = te, Ry = {
  message: ({ schemaCode: e }) => (0, me.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, me._)`{format: ${e}}`
}, Iy = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Ry,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: h } = u;
    if (!c.validateFormats)
      return;
    s ? S() : g();
    function S() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), _ = r.const("fDef", (0, me._)`${v}[${i}]`), $ = r.let("fType"), p = r.let("format");
      r.if((0, me._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign($, (0, me._)`${_}.type || "string"`).assign(p, (0, me._)`${_}.validate`), () => r.assign($, (0, me._)`"string"`).assign(p, _)), e.fail$data((0, me.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? me.nil : (0, me._)`${i} && !${p}`;
      }
      function N() {
        const T = l.$async ? (0, me._)`(${_}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, me._)`${p}(${n})`, I = (0, me._)`(typeof ${p} == "function" ? ${T} : ${p}.test(${n}))`;
        return (0, me._)`${p} && ${p} !== true && ${$} === ${t} && !${I}`;
      }
    }
    function g() {
      const v = h.formats[a];
      if (!v) {
        w();
        return;
      }
      if (v === !0)
        return;
      const [_, $, p] = N(v);
      _ === t && e.pass(T());
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
      function T() {
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
fo.default = Iy;
Object.defineProperty(uo, "__esModule", { value: !0 });
const jy = fo, Ay = [jy.default];
uo.default = Ay;
var Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.contentVocabulary = Pr.metadataVocabulary = void 0;
Pr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Pr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Ma, "__esModule", { value: !0 });
const ky = La, Cy = Va, Dy = Qa, My = uo, Ci = Pr, Ly = [
  ky.default,
  Cy.default,
  (0, Dy.default)(),
  My.default,
  Ci.metadataVocabulary,
  Ci.contentVocabulary
];
Ma.default = Ly;
var ho = {}, fs = {};
Object.defineProperty(fs, "__esModule", { value: !0 });
fs.DiscrError = void 0;
var Di;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Di || (fs.DiscrError = Di = {}));
Object.defineProperty(ho, "__esModule", { value: !0 });
const fr = te, Qs = fs, Mi = Ve, Fy = Tr, Vy = M, Uy = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Qs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, fr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, zy = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: Uy,
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
    const c = t.let("valid", !1), d = t.const("tag", (0, fr._)`${r}${(0, fr.getProperty)(u)}`);
    t.if((0, fr._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: Qs.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const g = S();
      t.if(!1);
      for (const v in g)
        t.elseIf((0, fr._)`${d} === ${v}`), t.assign(c, h(g[v]));
      t.else(), e.error(!1, { discrError: Qs.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function h(g) {
      const v = t.name("valid"), _ = e.subschema({ keyword: "oneOf", schemaProp: g }, v);
      return e.mergeEvaluated(_, fr.Name), v;
    }
    function S() {
      var g;
      const v = {}, _ = p(s);
      let $ = !0;
      for (let T = 0; T < i.length; T++) {
        let I = i[T];
        if (I != null && I.$ref && !(0, Vy.schemaHasRulesButRef)(I, a.self.RULES)) {
          const B = I.$ref;
          if (I = Mi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), I instanceof Mi.SchemaEnv && (I = I.schema), I === void 0)
            throw new Fy.default(a.opts.uriResolver, a.baseId, B);
        }
        const z = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        $ = $ && (_ || p(I)), w(z, T);
      }
      if (!$)
        throw new Error(`discriminator: "${u}" must be required`);
      return v;
      function p({ required: T }) {
        return Array.isArray(T) && T.includes(u);
      }
      function w(T, I) {
        if (T.const)
          N(T.const, I);
        else if (T.enum)
          for (const z of T.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(T, I) {
        if (typeof T != "string" || T in v)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        v[T] = I;
      }
    }
  }
};
ho.default = zy;
const qy = "http://json-schema.org/draft-07/schema#", Ky = "http://json-schema.org/draft-07/schema#", Gy = "Core schema meta-schema", Hy = {
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
}, By = [
  "object",
  "boolean"
], Jy = {
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
}, Xy = {
  $schema: qy,
  $id: Ky,
  title: Gy,
  definitions: Hy,
  type: By,
  properties: Jy,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = el, n = Ma, s = ho, a = Xy, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
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
  var h = sn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var S = Tr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return S.default;
  } });
})(Gs, Gs.exports);
var Wy = Gs.exports, Zs = { exports: {} }, Zl = {};
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
    "date-time": t(h, S),
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
    int32: { type: "number", validate: T },
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
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, S),
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
  function S(V, H) {
    if (!(V && H))
      return;
    const [ne, Q] = V.split(l), [de, C] = H.split(l), k = i(ne, de);
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
  const w = -2147483648, N = 2 ** 31 - 1;
  function T(V) {
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
})(Zl);
var xl = {}, xs = { exports: {} }, eu = {}, tt = {}, Nr = {}, on = {}, Z = {}, rn = {};
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
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((N, T) => `${N}${T}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((N, T) => (T instanceof r && (N[T.str] = (N[T.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...w) {
    const N = [p[0]];
    let T = 0;
    for (; T < w.length; )
      u(N, w[T]), N.push(p[++T]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(p, ...w) {
    const N = [g(p[0])];
    let T = 0;
    for (; T < w.length; )
      N.push(a), u(N, w[T]), N.push(a, g(p[++T]));
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
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : g(Array.isArray(p) ? p.join(",") : p);
  }
  function S(p) {
    return new n(g(p));
  }
  e.stringify = S;
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
})(rn);
var ea = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = rn;
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
      const S = this.toName(d), { prefix: g } = S, v = (h = l.key) !== null && h !== void 0 ? h : l.ref;
      let _ = this._values[g];
      if (_) {
        const w = _.get(v);
        if (w)
          return w;
      } else
        _ = this._values[g] = /* @__PURE__ */ new Map();
      _.set(v, S);
      const $ = this._scope[g] || (this._scope[g] = []), p = $.length;
      return $[p] = l.ref, S.setValue(l, { property: g, itemIndex: p }), S;
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
      return this._reduceValues(d, (S) => {
        if (S.value === void 0)
          throw new Error(`CodeGen: name "${S}" has no value`);
        return S.value.code;
      }, l, h);
    }
    _reduceValues(d, l, h = {}, S) {
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
          let w = l(p);
          if (w) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            g = (0, t._)`${g}${N} ${p} = ${w};${this.opts._n}`;
          } else if (w = S == null ? void 0 : S(p))
            g = (0, t._)`${g}${w}${this.opts._n}`;
          else
            throw new r(p);
          $.set(p, n.Completed);
        });
      }
      return g;
    }
  }
  e.ValueScope = u;
})(ea);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = rn, r = ea;
  var n = rn;
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
  var s = ea;
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
  class S extends a {
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
  class g extends a {
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
  class v extends g {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class _ extends g {
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
  class T extends w {
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
  class B extends g {
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
` : "" }, this._extScope = o, this._scope = new r.Scope({ parent: o }), this._nodes = [new _()];
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
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new S(o)), this;
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
      return this._for(new T(A, q, f, P), () => j(q));
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
    return typeof y == "boolean" || typeof y == "number" || y === null ? !y : (0, t._)`!${b(y)}`;
  }
  e.not = U;
  const D = m(e.operators.AND);
  function O(...y) {
    return y.reduce(D);
  }
  e.and = O;
  const R = m(e.operators.OR);
  function E(...y) {
    return y.reduce(R);
  }
  e.or = E;
  function m(y) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${b(o)} ${y} ${b(f)}`;
  }
  function b(y) {
    return y instanceof t.Name ? y : (0, t._)`(${y})`;
  }
})(Z);
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.checkStrictMode = L.getErrorPath = L.Type = L.useFunc = L.setEvaluated = L.evaluatedPropsToName = L.mergeEvaluated = L.eachItem = L.unescapeJsonPointer = L.escapeJsonPointer = L.escapeFragment = L.unescapeFragment = L.schemaRefOrVal = L.schemaHasRulesButRef = L.schemaHasRules = L.checkUnknownRules = L.alwaysValidSchema = L.toHash = void 0;
const ce = Z, Yy = rn;
function Qy(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
L.toHash = Qy;
function Zy(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (tu(e, t), !ru(t, e.self.RULES.all));
}
L.alwaysValidSchema = Zy;
function tu(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || au(e, `unknown keyword: "${a}"`);
}
L.checkUnknownRules = tu;
function ru(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
L.schemaHasRules = ru;
function xy(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
L.schemaHasRulesButRef = xy;
function e$({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ce._)`${r}`;
  }
  return (0, ce._)`${e}${t}${(0, ce.getProperty)(n)}`;
}
L.schemaRefOrVal = e$;
function t$(e) {
  return nu(decodeURIComponent(e));
}
L.unescapeFragment = t$;
function r$(e) {
  return encodeURIComponent(po(e));
}
L.escapeFragment = r$;
function po(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
L.escapeJsonPointer = po;
function nu(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
L.unescapeJsonPointer = nu;
function n$(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
L.eachItem = n$;
function Li({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, u) => {
    const c = i === void 0 ? a : i instanceof ce.Name ? (a instanceof ce.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof ce.Name ? (t(s, i, a), a) : r(a, i);
    return u === ce.Name && !(c instanceof ce.Name) ? n(s, c) : c;
  };
}
L.mergeEvaluated = {
  props: Li({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, ce._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, ce._)`${r} || {}`).code((0, ce._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, ce._)`${r} || {}`), mo(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: su
  }),
  items: Li({
    mergeNames: (e, t, r) => e.if((0, ce._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, ce._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, ce._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, ce._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function su(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, ce._)`{}`);
  return t !== void 0 && mo(e, r, t), r;
}
L.evaluatedPropsToName = su;
function mo(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, ce._)`${t}${(0, ce.getProperty)(n)}`, !0));
}
L.setEvaluated = mo;
const Fi = {};
function s$(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Fi[t.code] || (Fi[t.code] = new Yy._Code(t.code))
  });
}
L.useFunc = s$;
var ta;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(ta || (L.Type = ta = {}));
function a$(e, t, r) {
  if (e instanceof ce.Name) {
    const n = t === ta.Num;
    return r ? n ? (0, ce._)`"[" + ${e} + "]"` : (0, ce._)`"['" + ${e} + "']"` : n ? (0, ce._)`"/" + ${e}` : (0, ce._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ce.getProperty)(e).toString() : "/" + po(e);
}
L.getErrorPath = a$;
function au(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
L.checkStrictMode = au;
var ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
const Re = Z, o$ = {
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
ft.default = o$;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = Z, r = L, n = ft;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: p }) => p ? (0, t.str)`"${$}" keyword must be ${p} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, p = e.keywordError, w, N) {
    const { it: T } = $, { gen: I, compositeRule: z, allErrors: B } = T, ue = h($, p, w);
    N ?? (z || B) ? c(I, ue) : d(T, (0, t._)`[${ue}]`);
  }
  e.reportError = s;
  function a($, p = e.keywordError, w) {
    const { it: N } = $, { gen: T, compositeRule: I, allErrors: z } = N, B = h($, p, w);
    c(T, B), I || z || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i($, p) {
    $.assign(n.default.errors, p), $.if((0, t._)`${n.default.vErrors} !== null`, () => $.if(p, () => $.assign((0, t._)`${n.default.vErrors}.length`, p), () => $.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function u({ gen: $, keyword: p, schemaValue: w, data: N, errsCount: T, it: I }) {
    if (T === void 0)
      throw new Error("ajv implementation error");
    const z = $.name("err");
    $.forRange("i", T, n.default.errors, (B) => {
      $.const(z, (0, t._)`${n.default.vErrors}[${B}]`), $.if((0, t._)`${z}.instancePath === undefined`, () => $.assign((0, t._)`${z}.instancePath`, (0, t.strConcat)(n.default.instancePath, I.errorPath))), $.assign((0, t._)`${z}.schemaPath`, (0, t.str)`${I.errSchemaPath}/${p}`), I.opts.verbose && ($.assign((0, t._)`${z}.schema`, w), $.assign((0, t._)`${z}.data`, N));
    });
  }
  e.extendErrors = u;
  function c($, p) {
    const w = $.const("err", p);
    $.if((0, t._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), $.code((0, t._)`${n.default.errors}++`);
  }
  function d($, p) {
    const { gen: w, validateName: N, schemaEnv: T } = $;
    T.$async ? w.throw((0, t._)`new ${$.ValidationError}(${p})`) : (w.assign((0, t._)`${N}.errors`, p), w.return(!1));
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
    return N === !1 ? (0, t._)`{}` : S($, p, w);
  }
  function S($, p, w = {}) {
    const { gen: N, it: T } = $, I = [
      g(T, w),
      v($, w)
    ];
    return _($, p, I), N.object(...I);
  }
  function g({ errorPath: $ }, { instancePath: p }) {
    const w = p ? (0, t.str)`${$}${(0, r.getErrorPath)(p, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function v({ keyword: $, it: { errSchemaPath: p } }, { schemaPath: w, parentSchema: N }) {
    let T = N ? p : (0, t.str)`${p}/${$}`;
    return w && (T = (0, t.str)`${T}${(0, r.getErrorPath)(w, r.Type.Str)}`), [l.schemaPath, T];
  }
  function _($, { params: p, message: w }, N) {
    const { keyword: T, data: I, schemaValue: z, it: B } = $, { opts: ue, propertyName: V, topSchemaRef: H, schemaPath: ne } = B;
    N.push([l.keyword, T], [l.params, typeof p == "function" ? p($) : p || (0, t._)`{}`]), ue.messages && N.push([l.message, typeof w == "function" ? w($) : w]), ue.verbose && N.push([l.schema, z], [l.parentSchema, (0, t._)`${H}${ne}`], [n.default.data, I]), V && N.push([l.propertyName, V]);
  }
})(on);
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.boolOrEmptySchema = Nr.topBoolOrEmptySchema = void 0;
const i$ = on, c$ = Z, l$ = ft, u$ = {
  message: "boolean schema is false"
};
function d$(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? ou(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(l$.default.data) : (t.assign((0, c$._)`${n}.errors`, null), t.return(!0));
}
Nr.topBoolOrEmptySchema = d$;
function f$(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), ou(e)) : r.var(t, !0);
}
Nr.boolOrEmptySchema = f$;
function ou(e, t) {
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
  (0, i$.reportError)(s, u$, void 0, t);
}
var ve = {}, sr = {};
Object.defineProperty(sr, "__esModule", { value: !0 });
sr.getRules = sr.isJSONType = void 0;
const h$ = ["string", "number", "integer", "boolean", "null", "object", "array"], p$ = new Set(h$);
function m$(e) {
  return typeof e == "string" && p$.has(e);
}
sr.isJSONType = m$;
function y$() {
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
sr.getRules = y$;
var yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.shouldUseRule = yt.shouldUseGroup = yt.schemaHasRulesForType = void 0;
function $$({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && iu(e, n);
}
yt.schemaHasRulesForType = $$;
function iu(e, t) {
  return t.rules.some((r) => cu(e, r));
}
yt.shouldUseGroup = iu;
function cu(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
yt.shouldUseRule = cu;
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.reportTypeError = ve.checkDataTypes = ve.checkDataType = ve.coerceAndCheckDataType = ve.getJSONTypes = ve.getSchemaTypes = ve.DataType = void 0;
const g$ = sr, _$ = yt, v$ = on, Y = Z, lu = L;
var gr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(gr || (ve.DataType = gr = {}));
function E$(e) {
  const t = uu(e.type);
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
ve.getSchemaTypes = E$;
function uu(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(g$.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ve.getJSONTypes = uu;
function w$(e, t) {
  const { gen: r, data: n, opts: s } = e, a = S$(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, _$.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const u = yo(t, n, s.strictNumbers, gr.Wrong);
    r.if(u, () => {
      a.length ? b$(e, t, a) : $o(e);
    });
  }
  return i;
}
ve.coerceAndCheckDataType = w$;
const du = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function S$(e, t) {
  return t ? e.filter((r) => du.has(r) || t === "array" && r === "array") : [];
}
function b$(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, Y._)`typeof ${s}`), u = n.let("coerced", (0, Y._)`undefined`);
  a.coerceTypes === "array" && n.if((0, Y._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, Y._)`${s}[0]`).assign(i, (0, Y._)`typeof ${s}`).if(yo(t, s, a.strictNumbers), () => n.assign(u, s))), n.if((0, Y._)`${u} !== undefined`);
  for (const d of r)
    (du.has(d) || d === "array" && a.coerceTypes === "array") && c(d);
  n.else(), $o(e), n.endIf(), n.if((0, Y._)`${u} !== undefined`, () => {
    n.assign(s, u), P$(e, u);
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
function P$({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, Y._)`${t} !== undefined`, () => e.assign((0, Y._)`${t}[${r}]`, n));
}
function ra(e, t, r, n = gr.Correct) {
  const s = n === gr.Correct ? Y.operators.EQ : Y.operators.NEQ;
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
  return n === gr.Correct ? a : (0, Y.not)(a);
  function i(u = Y.nil) {
    return (0, Y.and)((0, Y._)`typeof ${t} == "number"`, u, r ? (0, Y._)`isFinite(${t})` : Y.nil);
  }
}
ve.checkDataType = ra;
function yo(e, t, r, n) {
  if (e.length === 1)
    return ra(e[0], t, r, n);
  let s;
  const a = (0, lu.toHash)(e);
  if (a.array && a.object) {
    const i = (0, Y._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, Y._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = Y.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, Y.and)(s, ra(i, t, r, n));
  return s;
}
ve.checkDataTypes = yo;
const N$ = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, Y._)`{type: ${e}}` : (0, Y._)`{type: ${t}}`
};
function $o(e) {
  const t = O$(e);
  (0, v$.reportError)(t, N$);
}
ve.reportTypeError = $o;
function O$(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, lu.schemaRefOrVal)(e, n, "type");
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
var hs = {};
Object.defineProperty(hs, "__esModule", { value: !0 });
hs.assignDefaults = void 0;
const lr = Z, T$ = L;
function R$(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Vi(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Vi(e, a, s.default));
}
hs.assignDefaults = R$;
function Vi(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const u = (0, lr._)`${a}${(0, lr.getProperty)(t)}`;
  if (s) {
    (0, T$.checkStrictMode)(e, `default is ignored for: ${u}`);
    return;
  }
  let c = (0, lr._)`${u} === undefined`;
  i.useDefaults === "empty" && (c = (0, lr._)`${c} || ${u} === null || ${u} === ""`), n.if(c, (0, lr._)`${u} = ${(0, lr.stringify)(r)}`);
}
var ut = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.validateUnion = ee.validateArray = ee.usePattern = ee.callValidateCode = ee.schemaProperties = ee.allSchemaProperties = ee.noPropertyInData = ee.propertyInData = ee.isOwnProperty = ee.hasPropFunc = ee.reportMissingProp = ee.checkMissingProp = ee.checkReportMissingProp = void 0;
const he = Z, go = L, Et = ft, I$ = L;
function j$(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(vo(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, he._)`${t}` }, !0), e.error();
  });
}
ee.checkReportMissingProp = j$;
function A$({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, he.or)(...n.map((a) => (0, he.and)(vo(e, t, a, r.ownProperties), (0, he._)`${s} = ${a}`)));
}
ee.checkMissingProp = A$;
function k$(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ee.reportMissingProp = k$;
function fu(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, he._)`Object.prototype.hasOwnProperty`
  });
}
ee.hasPropFunc = fu;
function _o(e, t, r) {
  return (0, he._)`${fu(e)}.call(${t}, ${r})`;
}
ee.isOwnProperty = _o;
function C$(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} !== undefined`;
  return n ? (0, he._)`${s} && ${_o(e, t, r)}` : s;
}
ee.propertyInData = C$;
function vo(e, t, r, n) {
  const s = (0, he._)`${t}${(0, he.getProperty)(r)} === undefined`;
  return n ? (0, he.or)(s, (0, he.not)(_o(e, t, r))) : s;
}
ee.noPropertyInData = vo;
function hu(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ee.allSchemaProperties = hu;
function D$(e, t) {
  return hu(t).filter((r) => !(0, go.alwaysValidSchema)(e, t[r]));
}
ee.schemaProperties = D$;
function M$({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, u, c, d) {
  const l = d ? (0, he._)`${e}, ${t}, ${n}${s}` : t, h = [
    [Et.default.instancePath, (0, he.strConcat)(Et.default.instancePath, a)],
    [Et.default.parentData, i.parentData],
    [Et.default.parentDataProperty, i.parentDataProperty],
    [Et.default.rootData, Et.default.rootData]
  ];
  i.opts.dynamicRef && h.push([Et.default.dynamicAnchors, Et.default.dynamicAnchors]);
  const S = (0, he._)`${l}, ${r.object(...h)}`;
  return c !== he.nil ? (0, he._)`${u}.call(${c}, ${S})` : (0, he._)`${u}(${S})`;
}
ee.callValidateCode = M$;
const L$ = (0, he._)`new RegExp`;
function F$({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, he._)`${s.code === "new RegExp" ? L$ : (0, I$.useFunc)(e, s)}(${r}, ${n})`
  });
}
ee.usePattern = F$;
function V$(e) {
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
        dataPropType: go.Type.Num
      }, a), t.if((0, he.not)(a), u);
    });
  }
}
ee.validateArray = V$;
function U$(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, go.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
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
ee.validateUnion = U$;
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.validateKeywordUsage = ut.validSchemaType = ut.funcKeywordCode = ut.macroKeywordCode = void 0;
const Ce = Z, xt = ft, z$ = ee, q$ = on;
function K$(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, u = t.macro.call(i.self, s, a, i), c = pu(r, n, u);
  i.opts.validateSchema !== !1 && i.self.validateSchema(u, !0);
  const d = r.name("valid");
  e.subschema({
    schema: u,
    schemaPath: Ce.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
ut.macroKeywordCode = K$;
function G$(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: u, it: c } = e;
  B$(c, t);
  const d = !u && t.compile ? t.compile.call(c.self, a, i, c) : t.validate, l = pu(n, s, d), h = n.let("valid");
  e.block$data(h, S), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function S() {
    if (t.errors === !1)
      _(), t.modifying && Ui(e), $(() => e.error());
    else {
      const p = t.async ? g() : v();
      t.modifying && Ui(e), $(() => H$(e, p));
    }
  }
  function g() {
    const p = n.let("ruleErrs", null);
    return n.try(() => _((0, Ce._)`await `), (w) => n.assign(h, !1).if((0, Ce._)`${w} instanceof ${c.ValidationError}`, () => n.assign(p, (0, Ce._)`${w}.errors`), () => n.throw(w))), p;
  }
  function v() {
    const p = (0, Ce._)`${l}.errors`;
    return n.assign(p, null), _(Ce.nil), p;
  }
  function _(p = t.async ? (0, Ce._)`await ` : Ce.nil) {
    const w = c.opts.passContext ? xt.default.this : xt.default.self, N = !("compile" in t && !u || t.schema === !1);
    n.assign(h, (0, Ce._)`${p}${(0, z$.callValidateCode)(e, l, w, N)}`, t.modifying);
  }
  function $(p) {
    var w;
    n.if((0, Ce.not)((w = t.valid) !== null && w !== void 0 ? w : h), p);
  }
}
ut.funcKeywordCode = G$;
function Ui(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Ce._)`${n.parentData}[${n.parentDataProperty}]`));
}
function H$(e, t) {
  const { gen: r } = e;
  r.if((0, Ce._)`Array.isArray(${t})`, () => {
    r.assign(xt.default.vErrors, (0, Ce._)`${xt.default.vErrors} === null ? ${t} : ${xt.default.vErrors}.concat(${t})`).assign(xt.default.errors, (0, Ce._)`${xt.default.vErrors}.length`), (0, q$.extendErrors)(e);
  }, () => e.error());
}
function B$({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function pu(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ce.stringify)(r) });
}
function J$(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
ut.validSchemaType = J$;
function X$({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
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
ut.validateKeywordUsage = X$;
var jt = {};
Object.defineProperty(jt, "__esModule", { value: !0 });
jt.extendSubschemaMode = jt.extendSubschemaData = jt.getSubschema = void 0;
const ot = Z, mu = L;
function W$(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
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
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, mu.escapeFragment)(r)}`
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
jt.getSubschema = W$;
function Y$(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: u } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: l, opts: h } = t, S = u.let("data", (0, ot._)`${t.data}${(0, ot.getProperty)(r)}`, !0);
    c(S), e.errorPath = (0, ot.str)`${d}${(0, mu.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, ot._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
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
jt.extendSubschemaData = Y$;
function Q$(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
jt.extendSubschemaMode = Q$;
var Oe = {}, yu = { exports: {} }, Rt = yu.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Mn(t, n, s, e, "", e);
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
function Mn(e, t, r, n, s, a, i, u, c, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, u, c, d);
    for (var l in n) {
      var h = n[l];
      if (Array.isArray(h)) {
        if (l in Rt.arrayKeywords)
          for (var S = 0; S < h.length; S++)
            Mn(e, t, r, h[S], s + "/" + l + "/" + S, a, s, l, n, S);
      } else if (l in Rt.propsKeywords) {
        if (h && typeof h == "object")
          for (var g in h)
            Mn(e, t, r, h[g], s + "/" + l + "/" + Z$(g), a, s, l, n, g);
      } else (l in Rt.keywords || e.allKeys && !(l in Rt.skipKeywords)) && Mn(e, t, r, h, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, i, u, c, d);
  }
}
function Z$(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var x$ = yu.exports;
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.getSchemaRefs = Oe.resolveUrl = Oe.normalizeId = Oe._getFullPath = Oe.getFullPath = Oe.inlineRef = void 0;
const eg = L, tg = is, rg = x$, ng = /* @__PURE__ */ new Set([
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
function sg(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !na(e) : t ? $u(e) <= t : !1;
}
Oe.inlineRef = sg;
const ag = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function na(e) {
  for (const t in e) {
    if (ag.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(na) || typeof r == "object" && na(r))
      return !0;
  }
  return !1;
}
function $u(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !ng.has(r) && (typeof e[r] == "object" && (0, eg.eachItem)(e[r], (n) => t += $u(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function gu(e, t = "", r) {
  r !== !1 && (t = _r(t));
  const n = e.parse(t);
  return _u(e, n);
}
Oe.getFullPath = gu;
function _u(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Oe._getFullPath = _u;
const og = /#\/?$/;
function _r(e) {
  return e ? e.replace(og, "") : "";
}
Oe.normalizeId = _r;
function ig(e, t, r) {
  return r = _r(r), e.resolve(t, r);
}
Oe.resolveUrl = ig;
const cg = /^[a-z_][-a-z0-9._]*$/i;
function lg(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = _r(e[r] || t), a = { "": s }, i = gu(n, s, !1), u = {}, c = /* @__PURE__ */ new Set();
  return rg(e, { allKeys: !0 }, (h, S, g, v) => {
    if (v === void 0)
      return;
    const _ = i + S;
    let $ = a[v];
    typeof h[r] == "string" && ($ = p.call(this, h[r])), w.call(this, h.$anchor), w.call(this, h.$dynamicAnchor), a[S] = $;
    function p(N) {
      const T = this.opts.uriResolver.resolve;
      if (N = _r($ ? T($, N) : N), c.has(N))
        throw l(N);
      c.add(N);
      let I = this.refs[N];
      return typeof I == "string" && (I = this.refs[I]), typeof I == "object" ? d(h, I.schema, N) : N !== _r(_) && (N[0] === "#" ? (d(h, u[N], N), u[N] = h) : this.refs[N] = _), N;
    }
    function w(N) {
      if (typeof N == "string") {
        if (!cg.test(N))
          throw new Error(`invalid anchor "${N}"`);
        p.call(this, `#${N}`);
      }
    }
  }), u;
  function d(h, S, g) {
    if (S !== void 0 && !tg(h, S))
      throw l(g);
  }
  function l(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Oe.getSchemaRefs = lg;
Object.defineProperty(tt, "__esModule", { value: !0 });
tt.getData = tt.KeywordCxt = tt.validateFunctionCode = void 0;
const vu = Nr, zi = ve, Eo = yt, xn = ve, ug = hs, Yr = ut, js = jt, G = Z, X = ft, dg = Oe, $t = L, Vr = on;
function fg(e) {
  if (Su(e) && (bu(e), wu(e))) {
    mg(e);
    return;
  }
  Eu(e, () => (0, vu.topBoolOrEmptySchema)(e));
}
tt.validateFunctionCode = fg;
function Eu({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, G._)`${X.default.data}, ${X.default.valCxt}`, n.$async, () => {
    e.code((0, G._)`"use strict"; ${qi(r, s)}`), pg(e, s), e.code(a);
  }) : e.func(t, (0, G._)`${X.default.data}, ${hg(s)}`, n.$async, () => e.code(qi(r, s)).code(a));
}
function hg(e) {
  return (0, G._)`{${X.default.instancePath}="", ${X.default.parentData}, ${X.default.parentDataProperty}, ${X.default.rootData}=${X.default.data}${e.dynamicRef ? (0, G._)`, ${X.default.dynamicAnchors}={}` : G.nil}}={}`;
}
function pg(e, t) {
  e.if(X.default.valCxt, () => {
    e.var(X.default.instancePath, (0, G._)`${X.default.valCxt}.${X.default.instancePath}`), e.var(X.default.parentData, (0, G._)`${X.default.valCxt}.${X.default.parentData}`), e.var(X.default.parentDataProperty, (0, G._)`${X.default.valCxt}.${X.default.parentDataProperty}`), e.var(X.default.rootData, (0, G._)`${X.default.valCxt}.${X.default.rootData}`), t.dynamicRef && e.var(X.default.dynamicAnchors, (0, G._)`${X.default.valCxt}.${X.default.dynamicAnchors}`);
  }, () => {
    e.var(X.default.instancePath, (0, G._)`""`), e.var(X.default.parentData, (0, G._)`undefined`), e.var(X.default.parentDataProperty, (0, G._)`undefined`), e.var(X.default.rootData, X.default.data), t.dynamicRef && e.var(X.default.dynamicAnchors, (0, G._)`{}`);
  });
}
function mg(e) {
  const { schema: t, opts: r, gen: n } = e;
  Eu(e, () => {
    r.$comment && t.$comment && Nu(e), vg(e), n.let(X.default.vErrors, null), n.let(X.default.errors, 0), r.unevaluated && yg(e), Pu(e), Sg(e);
  });
}
function yg(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, G._)`${r}.evaluated`), t.if((0, G._)`${e.evaluated}.dynamicProps`, () => t.assign((0, G._)`${e.evaluated}.props`, (0, G._)`undefined`)), t.if((0, G._)`${e.evaluated}.dynamicItems`, () => t.assign((0, G._)`${e.evaluated}.items`, (0, G._)`undefined`));
}
function qi(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, G._)`/*# sourceURL=${r} */` : G.nil;
}
function $g(e, t) {
  if (Su(e) && (bu(e), wu(e))) {
    gg(e, t);
    return;
  }
  (0, vu.boolOrEmptySchema)(e, t);
}
function wu({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function Su(e) {
  return typeof e.schema != "boolean";
}
function gg(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Nu(e), Eg(e), wg(e);
  const a = n.const("_errs", X.default.errors);
  Pu(e, a), n.var(t, (0, G._)`${a} === ${X.default.errors}`);
}
function bu(e) {
  (0, $t.checkUnknownRules)(e), _g(e);
}
function Pu(e, t) {
  if (e.opts.jtd)
    return Ki(e, [], !1, t);
  const r = (0, zi.getSchemaTypes)(e.schema), n = (0, zi.coerceAndCheckDataType)(e, r);
  Ki(e, r, !n, t);
}
function _g(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, $t.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function vg(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, $t.checkStrictMode)(e, "default is ignored in the schema root");
}
function Eg(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, dg.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function wg(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Nu({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, G._)`${X.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, G.str)`${n}/$comment`, u = e.scopeValue("root", { ref: t.root });
    e.code((0, G._)`${X.default.self}.opts.$comment(${a}, ${i}, ${u}.schema)`);
  }
}
function Sg(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, G._)`${X.default.errors} === 0`, () => t.return(X.default.data), () => t.throw((0, G._)`new ${s}(${X.default.vErrors})`)) : (t.assign((0, G._)`${n}.errors`, X.default.vErrors), a.unevaluated && bg(e), t.return((0, G._)`${X.default.errors} === 0`));
}
function bg({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof G.Name && e.assign((0, G._)`${t}.props`, r), n instanceof G.Name && e.assign((0, G._)`${t}.items`, n);
}
function Ki(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: u, opts: c, self: d } = e, { RULES: l } = d;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, $t.schemaHasRulesButRef)(a, l))) {
    s.block(() => Ru(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || Pg(e, t), s.block(() => {
    for (const S of l.rules)
      h(S);
    h(l.post);
  });
  function h(S) {
    (0, Eo.shouldUseGroup)(a, S) && (S.type ? (s.if((0, xn.checkDataType)(S.type, i, c.strictNumbers)), Gi(e, S), t.length === 1 && t[0] === S.type && r && (s.else(), (0, xn.reportTypeError)(e)), s.endIf()) : Gi(e, S), u || s.if((0, G._)`${X.default.errors} === ${n || 0}`));
  }
}
function Gi(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, ug.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, Eo.shouldUseRule)(n, a) && Ru(e, a.keyword, a.definition, t.type);
  });
}
function Pg(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (Ng(e, t), e.opts.allowUnionTypes || Og(e, t), Tg(e, e.dataTypes));
}
function Ng(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      Ou(e.dataTypes, r) || wo(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Ig(e, t);
  }
}
function Og(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && wo(e, "use allowUnionTypes to allow union type keyword");
}
function Tg(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, Eo.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => Rg(t, i)) && wo(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function Rg(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Ou(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Ig(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    Ou(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function wo(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, $t.checkStrictMode)(e, t, e.opts.strictTypes);
}
class Tu {
  constructor(t, r, n) {
    if ((0, Yr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, $t.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Iu(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Yr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
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
    (t ? Vr.reportExtraError : Vr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Vr.reportError)(this, this.def.$dataError || Vr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Vr.resetErrorsCount)(this.gen, this.errsCount);
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
        return (0, G._)`${(0, xn.checkDataTypes)(c, r, a.opts.strictNumbers, xn.DataType.Wrong)}`;
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
    const n = (0, js.getSubschema)(this.it, t);
    (0, js.extendSubschemaData)(n, this.it, t), (0, js.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return $g(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = $t.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = $t.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, G.Name)), !0;
  }
}
tt.KeywordCxt = Tu;
function Ru(e, t, r, n) {
  const s = new Tu(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Yr.funcKeywordCode)(s, r) : "macro" in r ? (0, Yr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Yr.funcKeywordCode)(s, r);
}
const jg = /^\/(?:[^~]|~0|~1)*$/, Ag = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Iu(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return X.default.rootData;
  if (e[0] === "/") {
    if (!jg.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = X.default.rootData;
  } else {
    const d = Ag.exec(e);
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
    d && (a = (0, G._)`${a}${(0, G.getProperty)((0, $t.unescapeJsonPointer)(d))}`, i = (0, G._)`${i} && ${a}`);
  return i;
  function c(d, l) {
    return `Cannot access ${d} ${l} levels up, current level is ${t}`;
  }
}
tt.getData = Iu;
var cn = {};
Object.defineProperty(cn, "__esModule", { value: !0 });
class kg extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
cn.default = kg;
var jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
const As = Oe;
class Cg extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, As.resolveUrl)(t, r, n), this.missingSchema = (0, As.normalizeId)((0, As.getFullPath)(t, this.missingRef));
  }
}
jr.default = Cg;
var Ue = {};
Object.defineProperty(Ue, "__esModule", { value: !0 });
Ue.resolveSchema = Ue.getCompilingSchema = Ue.resolveRef = Ue.compileSchema = Ue.SchemaEnv = void 0;
const Xe = Z, Dg = cn, Xt = ft, xe = Oe, Hi = L, Mg = tt;
class ps {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, xe.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Ue.SchemaEnv = ps;
function So(e) {
  const t = ju.call(this, e);
  if (t)
    return t;
  const r = (0, xe.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new Xe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let u;
  e.$async && (u = i.scopeValue("Error", {
    ref: Dg.default,
    code: (0, Xe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = i.scopeName("validate");
  e.validateName = c;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Xt.default.data,
    parentData: Xt.default.parentData,
    parentDataProperty: Xt.default.parentDataProperty,
    dataNames: [Xt.default.data],
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
    this._compilations.add(e), (0, Mg.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    l = `${i.scopeRefs(Xt.default.scope)}return ${h}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const g = new Function(`${Xt.default.self}`, `${Xt.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: g }), g.errors = null, g.schema = e.schema, g.schemaEnv = e, e.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: c, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
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
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), h;
  } finally {
    this._compilations.delete(e);
  }
}
Ue.compileSchema = So;
function Lg(e, t, r) {
  var n;
  r = (0, xe.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Ug.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: u } = this.opts;
    i && (a = new ps({ schema: i, schemaId: u, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = Fg.call(this, a);
}
Ue.resolveRef = Lg;
function Fg(e) {
  return (0, xe.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : So.call(this, e);
}
function ju(e) {
  for (const t of this._compilations)
    if (Vg(t, e))
      return t;
}
Ue.getCompilingSchema = ju;
function Vg(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Ug(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || ms.call(this, e, t);
}
function ms(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, xe._getFullPath)(this.opts.uriResolver, r);
  let s = (0, xe.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return ks.call(this, r, e);
  const a = (0, xe.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const u = ms.call(this, e, i);
    return typeof (u == null ? void 0 : u.schema) != "object" ? void 0 : ks.call(this, r, u);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || So.call(this, i), a === (0, xe.normalizeId)(t)) {
      const { schema: u } = i, { schemaId: c } = this.opts, d = u[c];
      return d && (s = (0, xe.resolveUrl)(this.opts.uriResolver, s, d)), new ps({ schema: u, schemaId: c, root: e, baseId: s });
    }
    return ks.call(this, r, i);
  }
}
Ue.resolveSchema = ms;
const zg = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function ks(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const u of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Hi.unescapeFragment)(u)];
    if (c === void 0)
      return;
    r = c;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !zg.has(u) && d && (t = (0, xe.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Hi.schemaHasRulesButRef)(r, this.RULES)) {
    const u = (0, xe.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = ms.call(this, n, u);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new ps({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const qg = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Kg = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Gg = "object", Hg = [
  "$data"
], Bg = {
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
}, Jg = !1, Xg = {
  $id: qg,
  description: Kg,
  type: Gg,
  required: Hg,
  properties: Bg,
  additionalProperties: Jg
};
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const Au = ql;
Au.code = 'require("ajv/dist/runtime/uri").default';
bo.default = Au;
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
  const n = cn, s = jr, a = sr, i = Ue, u = Z, c = Oe, d = ve, l = L, h = Xg, S = bo, g = (E, m) => new RegExp(E, m);
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
  }, w = 200;
  function N(E) {
    var m, b, y, o, f, P, j, A, q, F, re, ze, At, kt, Ct, Dt, Mt, Lt, Ft, Vt, Ut, zt, qt, Kt, Gt;
    const Be = E.strict, Ht = (m = E.code) === null || m === void 0 ? void 0 : m.optimize, Dr = Ht === !0 || Ht === void 0 ? 1 : Ht || 0, Mr = (y = (b = E.code) === null || b === void 0 ? void 0 : b.regExp) !== null && y !== void 0 ? y : g, Ps = (o = E.uriResolver) !== null && o !== void 0 ? o : S.default;
    return {
      strictSchema: (P = (f = E.strictSchema) !== null && f !== void 0 ? f : Be) !== null && P !== void 0 ? P : !0,
      strictNumbers: (A = (j = E.strictNumbers) !== null && j !== void 0 ? j : Be) !== null && A !== void 0 ? A : !0,
      strictTypes: (F = (q = E.strictTypes) !== null && q !== void 0 ? q : Be) !== null && F !== void 0 ? F : "log",
      strictTuples: (ze = (re = E.strictTuples) !== null && re !== void 0 ? re : Be) !== null && ze !== void 0 ? ze : "log",
      strictRequired: (kt = (At = E.strictRequired) !== null && At !== void 0 ? At : Be) !== null && kt !== void 0 ? kt : !1,
      code: E.code ? { ...E.code, optimize: Dr, regExp: Mr } : { optimize: Dr, regExp: Mr },
      loopRequired: (Ct = E.loopRequired) !== null && Ct !== void 0 ? Ct : w,
      loopEnum: (Dt = E.loopEnum) !== null && Dt !== void 0 ? Dt : w,
      meta: (Mt = E.meta) !== null && Mt !== void 0 ? Mt : !0,
      messages: (Lt = E.messages) !== null && Lt !== void 0 ? Lt : !0,
      inlineRefs: (Ft = E.inlineRefs) !== null && Ft !== void 0 ? Ft : !0,
      schemaId: (Vt = E.schemaId) !== null && Vt !== void 0 ? Vt : "$id",
      addUsedSchema: (Ut = E.addUsedSchema) !== null && Ut !== void 0 ? Ut : !0,
      validateSchema: (zt = E.validateSchema) !== null && zt !== void 0 ? zt : !0,
      validateFormats: (qt = E.validateFormats) !== null && qt !== void 0 ? qt : !0,
      unicodeRegExp: (Kt = E.unicodeRegExp) !== null && Kt !== void 0 ? Kt : !0,
      int32range: (Gt = E.int32range) !== null && Gt !== void 0 ? Gt : !0,
      uriResolver: Ps
    };
  }
  class T {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...N(m) };
      const { es5: b, lines: y } = this.opts.code;
      this.scope = new u.ValueScope({ scope: {}, prefixes: _, es5: b, lines: y }), this.logger = Q(m.logger);
      const o = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, a.getRules)(), I.call(this, $, m, "NOT SUPPORTED"), I.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = H.call(this), m.formats && ue.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && V.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), B.call(this), m.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: b, schemaId: y } = this.opts;
      let o = h;
      y === "id" && (o = { ...h }, o.id = o.$id, delete o.$id), b && m && this.addMetaSchema(o, o[y], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: b } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[b] || m : void 0;
    }
    validate(m, b) {
      let y;
      if (typeof m == "string") {
        if (y = this.getSchema(m), !y)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        y = this.compile(m);
      const o = y(b);
      return "$async" in y || (this.errors = y.errors), o;
    }
    compile(m, b) {
      const y = this._addSchema(m, b);
      return y.validate || this._compileSchemaEnv(y);
    }
    compileAsync(m, b) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: y } = this.opts;
      return o.call(this, m, b);
      async function o(F, re) {
        await f.call(this, F.$schema);
        const ze = this._addSchema(F, re);
        return ze.validate || P.call(this, ze);
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
        this.refs[F] || await f.call(this, re.$schema), this.refs[F] || this.addSchema(re, F, b);
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
    addSchema(m, b, y, o = this.opts.validateSchema) {
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
      return b = (0, c.normalizeId)(b || f), this._checkUnique(b), this.schemas[b] = this._addSchema(m, y, b, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, b, y = this.opts.validateSchema) {
      return this.addSchema(m, b, !0, y), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, b) {
      if (typeof m == "boolean")
        return !0;
      let y;
      if (y = m.$schema, y !== void 0 && typeof y != "string")
        throw new Error("$schema must be a string");
      if (y = y || this.opts.defaultMeta || this.defaultMeta(), !y)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate(y, m);
      if (!o && b) {
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
      let b;
      for (; typeof (b = z.call(this, m)) == "string"; )
        m = b;
      if (b === void 0) {
        const { schemaId: y } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: y });
        if (b = i.resolveSchema.call(this, o, m), !b)
          return;
        this.refs[m] = b;
      }
      return b.validate || this._compileSchemaEnv(b);
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
          const b = z.call(this, m);
          return typeof b == "object" && this._cache.delete(b.schema), delete this.schemas[m], delete this.refs[m], this;
        }
        case "object": {
          const b = m;
          this._cache.delete(b);
          let y = m[this.opts.schemaId];
          return y && (y = (0, c.normalizeId)(y), delete this.schemas[y], delete this.refs[y]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(m) {
      for (const b of m)
        this.addKeyword(b);
      return this;
    }
    addKeyword(m, b) {
      let y;
      if (typeof m == "string")
        y = m, typeof b == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), b.keyword = y);
      else if (typeof m == "object" && b === void 0) {
        if (b = m, y = b.keyword, Array.isArray(y) && !y.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (C.call(this, y, b), !b)
        return (0, l.eachItem)(y, (f) => k.call(this, f)), this;
      D.call(this, b);
      const o = {
        ...b,
        type: (0, d.getJSONTypes)(b.type),
        schemaType: (0, d.getJSONTypes)(b.schemaType)
      };
      return (0, l.eachItem)(y, o.type.length === 0 ? (f) => k.call(this, f, o) : (f) => o.type.forEach((P) => k.call(this, f, o, P))), this;
    }
    getKeyword(m) {
      const b = this.RULES.all[m];
      return typeof b == "object" ? b.definition : !!b;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: b } = this;
      delete b.keywords[m], delete b.all[m];
      for (const y of b.rules) {
        const o = y.rules.findIndex((f) => f.keyword === m);
        o >= 0 && y.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, b) {
      return typeof b == "string" && (b = new RegExp(b)), this.formats[m] = b, this;
    }
    errorsText(m = this.errors, { separator: b = ", ", dataVar: y = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((o) => `${y}${o.instancePath} ${o.message}`).reduce((o, f) => o + b + f);
    }
    $dataMetaSchema(m, b) {
      const y = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const o of b) {
        const f = o.split("/").slice(1);
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
    _removeAllSchemas(m, b) {
      for (const y in m) {
        const o = m[y];
        (!b || b.test(y)) && (typeof o == "string" ? delete m[y] : o && !o.meta && (this._cache.delete(o.schema), delete m[y]));
      }
    }
    _addSchema(m, b, y, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
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
      return A = new i.SchemaEnv({ schema: m, schemaId: j, meta: b, baseId: y, localRefs: q }), this._cache.set(A.schema, A), f && !y.startsWith("#") && (y && this._checkUnique(y), this.refs[y] = A), o && this.validateSchema(m, !0), A;
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
      const b = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, m);
      } finally {
        this.opts = b;
      }
    }
  }
  T.ValidationError = n.default, T.MissingRefError = s.default, e.default = T;
  function I(E, m, b, y = "error") {
    for (const o in E) {
      const f = o;
      f in m && this.logger[y](`${b}: option ${o}. ${E[f]}`);
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
      const b = E[m];
      b.keyword || (b.keyword = m), this.addKeyword(b);
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
    const { RULES: b } = this;
    if ((0, l.eachItem)(E, (y) => {
      if (b.keywords[y])
        throw new Error(`Keyword ${y} is already defined`);
      if (!de.test(y))
        throw new Error(`Keyword ${y} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function k(E, m, b) {
    var y;
    const o = m == null ? void 0 : m.post;
    if (b && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let P = o ? f.post : f.rules.find(({ type: A }) => A === b);
    if (P || (P = { type: b, rules: [] }, f.rules.push(P)), f.keywords[E] = !0, !m)
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
  function U(E, m, b) {
    const y = E.rules.findIndex((o) => o.keyword === b);
    y >= 0 ? E.rules.splice(y, 0, m) : (E.rules.push(m), this.logger.warn(`rule ${b} is not defined`));
  }
  function D(E) {
    let { metaSchema: m } = E;
    m !== void 0 && (E.$data && this.opts.$data && (m = R(m)), E.validateSchema = this.compile(m, !0));
  }
  const O = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function R(E) {
    return { anyOf: [E, O] };
  }
})(eu);
var Po = {}, No = {}, Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
const Wg = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Oo.default = Wg;
var ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.callRef = ar.getValidate = void 0;
const Yg = jr, Bi = ee, Fe = Z, ur = ft, Ji = Ue, vn = L, Qg = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: u, self: c } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const l = Ji.resolveRef.call(c, d, s, r);
    if (l === void 0)
      throw new Yg.default(n.opts.uriResolver, s, r);
    if (l instanceof Ji.SchemaEnv)
      return S(l);
    return g(l);
    function h() {
      if (a === d)
        return Ln(e, i, a, a.$async);
      const v = t.scopeValue("root", { ref: d });
      return Ln(e, (0, Fe._)`${v}.validate`, d, d.$async);
    }
    function S(v) {
      const _ = ku(e, v);
      Ln(e, _, v, v.$async);
    }
    function g(v) {
      const _ = t.scopeValue("schema", u.code.source === !0 ? { ref: v, code: (0, Fe.stringify)(v) } : { ref: v }), $ = t.name("valid"), p = e.subschema({
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
function ku(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, Fe._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
ar.getValidate = ku;
function Ln(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: u, opts: c } = a, d = c.passContext ? ur.default.this : Fe.nil;
  n ? l() : h();
  function l() {
    if (!u.$async)
      throw new Error("async schema referenced by sync schema");
    const v = s.let("valid");
    s.try(() => {
      s.code((0, Fe._)`await ${(0, Bi.callValidateCode)(e, t, d)}`), g(t), i || s.assign(v, !0);
    }, (_) => {
      s.if((0, Fe._)`!(${_} instanceof ${a.ValidationError})`, () => s.throw(_)), S(_), i || s.assign(v, !1);
    }), e.ok(v);
  }
  function h() {
    e.result((0, Bi.callValidateCode)(e, t, d), () => g(t), () => S(t));
  }
  function S(v) {
    const _ = (0, Fe._)`${v}.errors`;
    s.assign(ur.default.vErrors, (0, Fe._)`${ur.default.vErrors} === null ? ${_} : ${ur.default.vErrors}.concat(${_})`), s.assign(ur.default.errors, (0, Fe._)`${ur.default.vErrors}.length`);
  }
  function g(v) {
    var _;
    if (!a.opts.unevaluated)
      return;
    const $ = (_ = r == null ? void 0 : r.validate) === null || _ === void 0 ? void 0 : _.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = vn.mergeEvaluated.props(s, $.props, a.props));
      else {
        const p = s.var("props", (0, Fe._)`${v}.evaluated.props`);
        a.props = vn.mergeEvaluated.props(s, p, a.props, Fe.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = vn.mergeEvaluated.items(s, $.items, a.items));
      else {
        const p = s.var("items", (0, Fe._)`${v}.evaluated.items`);
        a.items = vn.mergeEvaluated.items(s, p, a.items, Fe.Name);
      }
  }
}
ar.callRef = Ln;
ar.default = Qg;
Object.defineProperty(No, "__esModule", { value: !0 });
const Zg = Oo, xg = ar, e_ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Zg.default,
  xg.default
];
No.default = e_;
var To = {}, Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const es = Z, wt = es.operators, ts = {
  maximum: { okStr: "<=", ok: wt.LTE, fail: wt.GT },
  minimum: { okStr: ">=", ok: wt.GTE, fail: wt.LT },
  exclusiveMaximum: { okStr: "<", ok: wt.LT, fail: wt.GTE },
  exclusiveMinimum: { okStr: ">", ok: wt.GT, fail: wt.LTE }
}, t_ = {
  message: ({ keyword: e, schemaCode: t }) => (0, es.str)`must be ${ts[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, es._)`{comparison: ${ts[e].okStr}, limit: ${t}}`
}, r_ = {
  keyword: Object.keys(ts),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: t_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, es._)`${r} ${ts[t].fail} ${n} || isNaN(${r})`);
  }
};
Ro.default = r_;
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
const Qr = Z, n_ = {
  message: ({ schemaCode: e }) => (0, Qr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Qr._)`{multipleOf: ${e}}`
}, s_ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: n_,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), u = a ? (0, Qr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Qr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Qr._)`(${n} === 0 || (${i} = ${r}/${n}, ${u}))`);
  }
};
Io.default = s_;
var jo = {}, Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
function Cu(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ao.default = Cu;
Cu.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(jo, "__esModule", { value: !0 });
const er = Z, a_ = L, o_ = Ao, i_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, er.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, er._)`{limit: ${e}}`
}, c_ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: i_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? er.operators.GT : er.operators.LT, i = s.opts.unicode === !1 ? (0, er._)`${r}.length` : (0, er._)`${(0, a_.useFunc)(e.gen, o_.default)}(${r})`;
    e.fail$data((0, er._)`${i} ${a} ${n}`);
  }
};
jo.default = c_;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
const l_ = ee, rs = Z, u_ = {
  message: ({ schemaCode: e }) => (0, rs.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, rs._)`{pattern: ${e}}`
}, d_ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: u_,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", u = r ? (0, rs._)`(new RegExp(${s}, ${i}))` : (0, l_.usePattern)(e, n);
    e.fail$data((0, rs._)`!${u}.test(${t})`);
  }
};
ko.default = d_;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const Zr = Z, f_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Zr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Zr._)`{limit: ${e}}`
}, h_ = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: f_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Zr.operators.GT : Zr.operators.LT;
    e.fail$data((0, Zr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Co.default = h_;
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
const Ur = ee, xr = Z, p_ = L, m_ = {
  message: ({ params: { missingProperty: e } }) => (0, xr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, xr._)`{missingProperty: ${e}}`
}, y_ = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: m_,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: u } = i;
    if (!a && r.length === 0)
      return;
    const c = r.length >= u.loopRequired;
    if (i.allErrors ? d() : l(), u.strictRequired) {
      const g = e.parentSchema.properties, { definedProperties: v } = e.it;
      for (const _ of r)
        if ((g == null ? void 0 : g[_]) === void 0 && !v.has(_)) {
          const $ = i.schemaEnv.baseId + i.errSchemaPath, p = `required property "${_}" is not defined at "${$}" (strictRequired)`;
          (0, p_.checkStrictMode)(i, p, i.opts.strictRequired);
        }
    }
    function d() {
      if (c || a)
        e.block$data(xr.nil, h);
      else
        for (const g of r)
          (0, Ur.checkReportMissingProp)(e, g);
    }
    function l() {
      const g = t.let("missing");
      if (c || a) {
        const v = t.let("valid", !0);
        e.block$data(v, () => S(g, v)), e.ok(v);
      } else
        t.if((0, Ur.checkMissingProp)(e, r, g)), (0, Ur.reportMissingProp)(e, g), t.else();
    }
    function h() {
      t.forOf("prop", n, (g) => {
        e.setParams({ missingProperty: g }), t.if((0, Ur.noPropertyInData)(t, s, g, u.ownProperties), () => e.error());
      });
    }
    function S(g, v) {
      e.setParams({ missingProperty: g }), t.forOf(g, n, () => {
        t.assign(v, (0, Ur.propertyInData)(t, s, g, u.ownProperties)), t.if((0, xr.not)(v), () => {
          e.error(), t.break();
        });
      }, xr.nil);
    }
  }
};
Do.default = y_;
var Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
const en = Z, $_ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, en.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, en._)`{limit: ${e}}`
}, g_ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: $_,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? en.operators.GT : en.operators.LT;
    e.fail$data((0, en._)`${r}.length ${s} ${n}`);
  }
};
Mo.default = g_;
var Lo = {}, ln = {};
Object.defineProperty(ln, "__esModule", { value: !0 });
const Du = is;
Du.code = 'require("ajv/dist/runtime/equal").default';
ln.default = Du;
Object.defineProperty(Lo, "__esModule", { value: !0 });
const Cs = ve, Se = Z, __ = L, v_ = ln, E_ = {
  message: ({ params: { i: e, j: t } }) => (0, Se.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Se._)`{i: ${e}, j: ${t}}`
}, w_ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: E_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: u } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), d = a.items ? (0, Cs.getSchemaTypes)(a.items) : [];
    e.block$data(c, l, (0, Se._)`${i} === false`), e.ok(c);
    function l() {
      const v = t.let("i", (0, Se._)`${r}.length`), _ = t.let("j");
      e.setParams({ i: v, j: _ }), t.assign(c, !0), t.if((0, Se._)`${v} > 1`, () => (h() ? S : g)(v, _));
    }
    function h() {
      return d.length > 0 && !d.some((v) => v === "object" || v === "array");
    }
    function S(v, _) {
      const $ = t.name("item"), p = (0, Cs.checkDataTypes)(d, $, u.opts.strictNumbers, Cs.DataType.Wrong), w = t.const("indices", (0, Se._)`{}`);
      t.for((0, Se._)`;${v}--;`, () => {
        t.let($, (0, Se._)`${r}[${v}]`), t.if(p, (0, Se._)`continue`), d.length > 1 && t.if((0, Se._)`typeof ${$} == "string"`, (0, Se._)`${$} += "_"`), t.if((0, Se._)`typeof ${w}[${$}] == "number"`, () => {
          t.assign(_, (0, Se._)`${w}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Se._)`${w}[${$}] = ${v}`);
      });
    }
    function g(v, _) {
      const $ = (0, __.useFunc)(t, v_.default), p = t.name("outer");
      t.label(p).for((0, Se._)`;${v}--;`, () => t.for((0, Se._)`${_} = ${v}; ${_}--;`, () => t.if((0, Se._)`${$}(${r}[${v}], ${r}[${_}])`, () => {
        e.error(), t.assign(c, !1).break(p);
      })));
    }
  }
};
Lo.default = w_;
var Fo = {};
Object.defineProperty(Fo, "__esModule", { value: !0 });
const sa = Z, S_ = L, b_ = ln, P_ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, sa._)`{allowedValue: ${e}}`
}, N_ = {
  keyword: "const",
  $data: !0,
  error: P_,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, sa._)`!${(0, S_.useFunc)(t, b_.default)}(${r}, ${s})`) : e.fail((0, sa._)`${a} !== ${r}`);
  }
};
Fo.default = N_;
var Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
const Gr = Z, O_ = L, T_ = ln, R_ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Gr._)`{allowedValues: ${e}}`
}, I_ = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: R_,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const u = s.length >= i.opts.loopEnum;
    let c;
    const d = () => c ?? (c = (0, O_.useFunc)(t, T_.default));
    let l;
    if (u || n)
      l = t.let("valid"), e.block$data(l, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const g = t.const("vSchema", a);
      l = (0, Gr.or)(...s.map((v, _) => S(g, _)));
    }
    e.pass(l);
    function h() {
      t.assign(l, !1), t.forOf("v", a, (g) => t.if((0, Gr._)`${d()}(${r}, ${g})`, () => t.assign(l, !0).break()));
    }
    function S(g, v) {
      const _ = s[v];
      return typeof _ == "object" && _ !== null ? (0, Gr._)`${d()}(${r}, ${g}[${v}])` : (0, Gr._)`${r} === ${_}`;
    }
  }
};
Vo.default = I_;
Object.defineProperty(To, "__esModule", { value: !0 });
const j_ = Ro, A_ = Io, k_ = jo, C_ = ko, D_ = Co, M_ = Do, L_ = Mo, F_ = Lo, V_ = Fo, U_ = Vo, z_ = [
  // number
  j_.default,
  A_.default,
  // string
  k_.default,
  C_.default,
  // object
  D_.default,
  M_.default,
  // array
  L_.default,
  F_.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  V_.default,
  U_.default
];
To.default = z_;
var Uo = {}, Ar = {};
Object.defineProperty(Ar, "__esModule", { value: !0 });
Ar.validateAdditionalItems = void 0;
const tr = Z, aa = L, q_ = {
  message: ({ params: { len: e } }) => (0, tr.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, tr._)`{limit: ${e}}`
}, K_ = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: q_,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, aa.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Mu(e, n);
  }
};
function Mu(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const u = r.const("len", (0, tr._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, tr._)`${u} <= ${t.length}`);
  else if (typeof n == "object" && !(0, aa.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, tr._)`${u} <= ${t.length}`);
    r.if((0, tr.not)(d), () => c(d)), e.ok(d);
  }
  function c(d) {
    r.forRange("i", t.length, u, (l) => {
      e.subschema({ keyword: a, dataProp: l, dataPropType: aa.Type.Num }, d), i.allErrors || r.if((0, tr.not)(d), () => r.break());
    });
  }
}
Ar.validateAdditionalItems = Mu;
Ar.default = K_;
var zo = {}, kr = {};
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.validateTuple = void 0;
const Xi = Z, Fn = L, G_ = ee, H_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Lu(e, "additionalItems", t);
    r.items = !0, !(0, Fn.alwaysValidSchema)(r, t) && e.ok((0, G_.validateArray)(e));
  }
};
function Lu(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: u } = e;
  l(s), u.opts.unevaluated && r.length && u.items !== !0 && (u.items = Fn.mergeEvaluated.items(n, r.length, u.items));
  const c = n.name("valid"), d = n.const("len", (0, Xi._)`${a}.length`);
  r.forEach((h, S) => {
    (0, Fn.alwaysValidSchema)(u, h) || (n.if((0, Xi._)`${d} > ${S}`, () => e.subschema({
      keyword: i,
      schemaProp: S,
      dataProp: S
    }, c)), e.ok(c));
  });
  function l(h) {
    const { opts: S, errSchemaPath: g } = u, v = r.length, _ = v === h.minItems && (v === h.maxItems || h[t] === !1);
    if (S.strictTuples && !_) {
      const $ = `"${i}" is ${v}-tuple, but minItems or maxItems/${t} are not specified or different at path "${g}"`;
      (0, Fn.checkStrictMode)(u, $, S.strictTuples);
    }
  }
}
kr.validateTuple = Lu;
kr.default = H_;
Object.defineProperty(zo, "__esModule", { value: !0 });
const B_ = kr, J_ = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, B_.validateTuple)(e, "items")
};
zo.default = J_;
var qo = {};
Object.defineProperty(qo, "__esModule", { value: !0 });
const Wi = Z, X_ = L, W_ = ee, Y_ = Ar, Q_ = {
  message: ({ params: { len: e } }) => (0, Wi.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Wi._)`{limit: ${e}}`
}, Z_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Q_,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, X_.alwaysValidSchema)(n, t) && (s ? (0, Y_.validateAdditionalItems)(e, s) : e.ok((0, W_.validateArray)(e)));
  }
};
qo.default = Z_;
var Ko = {};
Object.defineProperty(Ko, "__esModule", { value: !0 });
const He = Z, En = L, x_ = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He.str)`must contain at least ${e} valid item(s)` : (0, He.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, He._)`{minContains: ${e}}` : (0, He._)`{minContains: ${e}, maxContains: ${t}}`
}, e0 = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: x_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, u;
    const { minContains: c, maxContains: d } = n;
    a.opts.next ? (i = c === void 0 ? 1 : c, u = d) : i = 1;
    const l = t.const("len", (0, He._)`${s}.length`);
    if (e.setParams({ min: i, max: u }), u === void 0 && i === 0) {
      (0, En.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (u !== void 0 && i > u) {
      (0, En.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, En.alwaysValidSchema)(a, r)) {
      let _ = (0, He._)`${l} >= ${i}`;
      u !== void 0 && (_ = (0, He._)`${_} && ${l} <= ${u}`), e.pass(_);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    u === void 0 && i === 1 ? g(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), u !== void 0 && t.if((0, He._)`${s}.length > 0`, S)) : (t.let(h, !1), S()), e.result(h, () => e.reset());
    function S() {
      const _ = t.name("_valid"), $ = t.let("count", 0);
      g(_, () => t.if(_, () => v($)));
    }
    function g(_, $) {
      t.forRange("i", 0, l, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: En.Type.Num,
          compositeRule: !0
        }, _), $();
      });
    }
    function v(_) {
      t.code((0, He._)`${_}++`), u === void 0 ? t.if((0, He._)`${_} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, He._)`${_} > ${u}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, He._)`${_} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
Ko.default = e0;
var Fu = {};
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
      const S = Array.isArray(c[h]) ? d : l;
      S[h] = c[h];
    }
    return [d, l];
  }
  function i(c, d = c.schema) {
    const { gen: l, data: h, it: S } = c;
    if (Object.keys(d).length === 0)
      return;
    const g = l.let("missing");
    for (const v in d) {
      const _ = d[v];
      if (_.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, h, v, S.opts.ownProperties);
      c.setParams({
        property: v,
        depsCount: _.length,
        deps: _.join(", ")
      }), S.allErrors ? l.if($, () => {
        for (const p of _)
          (0, n.checkReportMissingProp)(c, p);
      }) : (l.if((0, t._)`${$} && (${(0, n.checkMissingProp)(c, _, g)})`), (0, n.reportMissingProp)(c, g), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function u(c, d = c.schema) {
    const { gen: l, data: h, keyword: S, it: g } = c, v = l.name("valid");
    for (const _ in d)
      (0, r.alwaysValidSchema)(g, d[_]) || (l.if(
        (0, n.propertyInData)(l, h, _, g.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: S, schemaProp: _ }, v);
          c.mergeValidEvaluated($, v);
        },
        () => l.var(v, !0)
        // TODO var
      ), c.ok(v));
  }
  e.validateSchemaDeps = u, e.default = s;
})(Fu);
var Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
const Vu = Z, t0 = L, r0 = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Vu._)`{propertyName: ${e.propertyName}}`
}, n0 = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: r0,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, t0.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, Vu.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Go.default = n0;
var ys = {};
Object.defineProperty(ys, "__esModule", { value: !0 });
const wn = ee, Ye = Z, s0 = ft, Sn = L, a0 = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Ye._)`{additionalProperty: ${e.additionalProperty}}`
}, o0 = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: a0,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: u, opts: c } = i;
    if (i.props = !0, c.removeAdditional !== "all" && (0, Sn.alwaysValidSchema)(i, r))
      return;
    const d = (0, wn.allSchemaProperties)(n.properties), l = (0, wn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, Ye._)`${a} === ${s0.default.errors}`);
    function h() {
      t.forIn("key", s, ($) => {
        !d.length && !l.length ? v($) : t.if(S($), () => v($));
      });
    }
    function S($) {
      let p;
      if (d.length > 8) {
        const w = (0, Sn.schemaRefOrVal)(i, n.properties, "properties");
        p = (0, wn.isOwnProperty)(t, w, $);
      } else d.length ? p = (0, Ye.or)(...d.map((w) => (0, Ye._)`${$} === ${w}`)) : p = Ye.nil;
      return l.length && (p = (0, Ye.or)(p, ...l.map((w) => (0, Ye._)`${(0, wn.usePattern)(e, w)}.test(${$})`))), (0, Ye.not)(p);
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
        e.setParams({ additionalProperty: $ }), e.error(), u || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Sn.alwaysValidSchema)(i, r)) {
        const p = t.name("valid");
        c.removeAdditional === "failing" ? (_($, p, !1), t.if((0, Ye.not)(p), () => {
          e.reset(), g($);
        })) : (_($, p), u || t.if((0, Ye.not)(p), () => t.break()));
      }
    }
    function _($, p, w) {
      const N = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: Sn.Type.Str
      };
      w === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, p);
    }
  }
};
ys.default = o0;
var Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
const i0 = tt, Yi = ee, Ds = L, Qi = ys, c0 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Qi.default.code(new i0.KeywordCxt(a, Qi.default, "additionalProperties"));
    const i = (0, Yi.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = Ds.mergeEvaluated.props(t, (0, Ds.toHash)(i), a.props));
    const u = i.filter((h) => !(0, Ds.alwaysValidSchema)(a, r[h]));
    if (u.length === 0)
      return;
    const c = t.name("valid");
    for (const h of u)
      d(h) ? l(h) : (t.if((0, Yi.propertyInData)(t, s, h, a.opts.ownProperties)), l(h), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(c);
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
Ho.default = c0;
var Bo = {};
Object.defineProperty(Bo, "__esModule", { value: !0 });
const Zi = ee, bn = Z, xi = L, ec = L, l0 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, u = (0, Zi.allSchemaProperties)(r), c = u.filter((_) => (0, xi.alwaysValidSchema)(a, r[_]));
    if (u.length === 0 || c.length === u.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, l = t.name("valid");
    a.props !== !0 && !(a.props instanceof bn.Name) && (a.props = (0, ec.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    S();
    function S() {
      for (const _ of u)
        d && g(_), a.allErrors ? v(_) : (t.var(l, !0), v(_), t.if(l));
    }
    function g(_) {
      for (const $ in d)
        new RegExp(_).test($) && (0, xi.checkStrictMode)(a, `property ${$} matches pattern ${_} (use allowMatchingProperties)`);
    }
    function v(_) {
      t.forIn("key", n, ($) => {
        t.if((0, bn._)`${(0, Zi.usePattern)(e, _)}.test(${$})`, () => {
          const p = c.includes(_);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: _,
            dataProp: $,
            dataPropType: ec.Type.Str
          }, l), a.opts.unevaluated && h !== !0 ? t.assign((0, bn._)`${h}[${$}]`, !0) : !p && !a.allErrors && t.if((0, bn.not)(l), () => t.break());
        });
      });
    }
  }
};
Bo.default = l0;
var Jo = {};
Object.defineProperty(Jo, "__esModule", { value: !0 });
const u0 = L, d0 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, u0.alwaysValidSchema)(n, r)) {
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
Jo.default = d0;
var Xo = {};
Object.defineProperty(Xo, "__esModule", { value: !0 });
const f0 = ee, h0 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: f0.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Xo.default = h0;
var Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
const Vn = Z, p0 = L, m0 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Vn._)`{passingSchemas: ${e.passing}}`
}, y0 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: m0,
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
        let S;
        (0, p0.alwaysValidSchema)(s, l) ? t.var(c, !0) : S = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, c), h > 0 && t.if((0, Vn._)`${c} && ${i}`).assign(i, !1).assign(u, (0, Vn._)`[${u}, ${h}]`).else(), t.if(c, () => {
          t.assign(i, !0), t.assign(u, h), S && e.mergeEvaluated(S, Vn.Name);
        });
      });
    }
  }
};
Wo.default = y0;
var Yo = {};
Object.defineProperty(Yo, "__esModule", { value: !0 });
const $0 = L, g0 = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, $0.alwaysValidSchema)(n, a))
        return;
      const u = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(u);
    });
  }
};
Yo.default = g0;
var Qo = {};
Object.defineProperty(Qo, "__esModule", { value: !0 });
const ns = Z, Uu = L, _0 = {
  message: ({ params: e }) => (0, ns.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, ns._)`{failingKeyword: ${e.ifClause}}`
}, v0 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: _0,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Uu.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = tc(n, "then"), a = tc(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), u = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(u, d("then", l), d("else", l));
    } else s ? t.if(u, d("then")) : t.if((0, ns.not)(u), d("else"));
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
        const S = e.subschema({ keyword: l }, u);
        t.assign(i, u), e.mergeValidEvaluated(S, i), h ? t.assign(h, (0, ns._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function tc(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Uu.alwaysValidSchema)(e, r);
}
Qo.default = v0;
var Zo = {};
Object.defineProperty(Zo, "__esModule", { value: !0 });
const E0 = L, w0 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, E0.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Zo.default = w0;
Object.defineProperty(Uo, "__esModule", { value: !0 });
const S0 = Ar, b0 = zo, P0 = kr, N0 = qo, O0 = Ko, T0 = Fu, R0 = Go, I0 = ys, j0 = Ho, A0 = Bo, k0 = Jo, C0 = Xo, D0 = Wo, M0 = Yo, L0 = Qo, F0 = Zo;
function V0(e = !1) {
  const t = [
    // any
    k0.default,
    C0.default,
    D0.default,
    M0.default,
    L0.default,
    F0.default,
    // object
    R0.default,
    I0.default,
    T0.default,
    j0.default,
    A0.default
  ];
  return e ? t.push(b0.default, N0.default) : t.push(S0.default, P0.default), t.push(O0.default), t;
}
Uo.default = V0;
var xo = {}, ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
const ye = Z, U0 = {
  message: ({ schemaCode: e }) => (0, ye.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ye._)`{format: ${e}}`
}, z0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: U0,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: u } = e, { opts: c, errSchemaPath: d, schemaEnv: l, self: h } = u;
    if (!c.validateFormats)
      return;
    s ? S() : g();
    function S() {
      const v = r.scopeValue("formats", {
        ref: h.formats,
        code: c.code.formats
      }), _ = r.const("fDef", (0, ye._)`${v}[${i}]`), $ = r.let("fType"), p = r.let("format");
      r.if((0, ye._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`, () => r.assign($, (0, ye._)`${_}.type || "string"`).assign(p, (0, ye._)`${_}.validate`), () => r.assign($, (0, ye._)`"string"`).assign(p, _)), e.fail$data((0, ye.or)(w(), N()));
      function w() {
        return c.strictSchema === !1 ? ye.nil : (0, ye._)`${i} && !${p}`;
      }
      function N() {
        const T = l.$async ? (0, ye._)`(${_}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, ye._)`${p}(${n})`, I = (0, ye._)`(typeof ${p} == "function" ? ${T} : ${p}.test(${n}))`;
        return (0, ye._)`${p} && ${p} !== true && ${$} === ${t} && !${I}`;
      }
    }
    function g() {
      const v = h.formats[a];
      if (!v) {
        w();
        return;
      }
      if (v === !0)
        return;
      const [_, $, p] = N(v);
      _ === t && e.pass(T());
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
      function T() {
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
ei.default = z0;
Object.defineProperty(xo, "__esModule", { value: !0 });
const q0 = ei, K0 = [q0.default];
xo.default = K0;
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
const G0 = No, H0 = To, B0 = Uo, J0 = xo, rc = Or, X0 = [
  G0.default,
  H0.default,
  (0, B0.default)(),
  J0.default,
  rc.metadataVocabulary,
  rc.contentVocabulary
];
Po.default = X0;
var ti = {}, $s = {};
Object.defineProperty($s, "__esModule", { value: !0 });
$s.DiscrError = void 0;
var nc;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(nc || ($s.DiscrError = nc = {}));
Object.defineProperty(ti, "__esModule", { value: !0 });
const hr = Z, oa = $s, sc = Ue, W0 = jr, Y0 = L, Q0 = {
  message: ({ params: { discrError: e, tagName: t } }) => e === oa.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, hr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, Z0 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: Q0,
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
    const c = t.let("valid", !1), d = t.const("tag", (0, hr._)`${r}${(0, hr.getProperty)(u)}`);
    t.if((0, hr._)`typeof ${d} == "string"`, () => l(), () => e.error(!1, { discrError: oa.DiscrError.Tag, tag: d, tagName: u })), e.ok(c);
    function l() {
      const g = S();
      t.if(!1);
      for (const v in g)
        t.elseIf((0, hr._)`${d} === ${v}`), t.assign(c, h(g[v]));
      t.else(), e.error(!1, { discrError: oa.DiscrError.Mapping, tag: d, tagName: u }), t.endIf();
    }
    function h(g) {
      const v = t.name("valid"), _ = e.subschema({ keyword: "oneOf", schemaProp: g }, v);
      return e.mergeEvaluated(_, hr.Name), v;
    }
    function S() {
      var g;
      const v = {}, _ = p(s);
      let $ = !0;
      for (let T = 0; T < i.length; T++) {
        let I = i[T];
        if (I != null && I.$ref && !(0, Y0.schemaHasRulesButRef)(I, a.self.RULES)) {
          const B = I.$ref;
          if (I = sc.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, B), I instanceof sc.SchemaEnv && (I = I.schema), I === void 0)
            throw new W0.default(a.opts.uriResolver, a.baseId, B);
        }
        const z = (g = I == null ? void 0 : I.properties) === null || g === void 0 ? void 0 : g[u];
        if (typeof z != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${u}"`);
        $ = $ && (_ || p(I)), w(z, T);
      }
      if (!$)
        throw new Error(`discriminator: "${u}" must be required`);
      return v;
      function p({ required: T }) {
        return Array.isArray(T) && T.includes(u);
      }
      function w(T, I) {
        if (T.const)
          N(T.const, I);
        else if (T.enum)
          for (const z of T.enum)
            N(z, I);
        else
          throw new Error(`discriminator: "properties/${u}" must have "const" or "enum"`);
      }
      function N(T, I) {
        if (typeof T != "string" || T in v)
          throw new Error(`discriminator: "${u}" values must be unique strings`);
        v[T] = I;
      }
    }
  }
};
ti.default = Z0;
const x0 = "http://json-schema.org/draft-07/schema#", ev = "http://json-schema.org/draft-07/schema#", tv = "Core schema meta-schema", rv = {
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
}, nv = [
  "object",
  "boolean"
], sv = {
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
}, av = {
  $schema: x0,
  $id: ev,
  title: tv,
  definitions: rv,
  type: nv,
  properties: sv,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = eu, n = Po, s = ti, a = av, i = ["/properties"], u = "http://json-schema.org/draft-07/schema";
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
  var h = cn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var S = jr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return S.default;
  } });
})(xs, xs.exports);
var ov = xs.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = ov, r = Z, n = r.operators, s = {
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
      const { gen: c, data: d, schemaCode: l, keyword: h, it: S } = u, { opts: g, self: v } = S;
      if (!g.validateFormats)
        return;
      const _ = new t.KeywordCxt(S, v.RULES.all.format.definition, "format");
      _.$data ? $() : p();
      function $() {
        const N = c.scopeValue("formats", {
          ref: v.formats,
          code: g.code.formats
        }), T = c.const("fmt", r._`${N}[${_.schemaCode}]`);
        u.fail$data(r.or(r._`typeof ${T} != "object"`, r._`${T} instanceof RegExp`, r._`typeof ${T}.compare != "function"`, w(T)));
      }
      function p() {
        const N = _.schema, T = v.formats[N];
        if (!T || T === !0)
          return;
        if (typeof T != "object" || T instanceof RegExp || typeof T.compare != "function")
          throw new Error(`"${h}": format "${N}" does not define "compare" function`);
        const I = c.scopeValue("formats", {
          key: N,
          ref: T,
          code: g.code.formats ? r._`${g.code.formats}${r.getProperty(N)}` : void 0
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
})(xl);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Zl, n = xl, s = Z, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), u = (d, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(d, l, r.fullFormats, a), d;
    const [h, S] = l.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], g = l.formats || r.formatNames;
    return c(d, g, h, S), l.keywords && n.default(d), d;
  };
  u.get = (d, l = "full") => {
    const S = (l === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!S)
      throw new Error(`Unknown format "${d}"`);
    return S;
  };
  function c(d, l, h, S) {
    var g, v;
    (g = (v = d.opts.code).formats) !== null && g !== void 0 || (v.formats = s._`require("ajv-formats/dist/formats").${S}`);
    for (const _ of l)
      d.addFormat(_, h[_]);
  }
  e.exports = t = u, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = u;
})(Zs, Zs.exports);
var iv = Zs.exports;
const cv = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !lv(s, a) && n || Object.defineProperty(e, r, a);
}, lv = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, uv = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, dv = (e, t) => `/* Wrapped ${e}*/
${t}`, fv = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), hv = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), pv = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = dv.bind(null, n, t.toString());
  Object.defineProperty(s, "name", hv), Object.defineProperty(e, "toString", { ...fv, value: s });
}, mv = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    cv(e, t, s, r);
  return uv(e, t), pv(e, t, n), e;
};
var yv = mv;
const $v = yv;
var gv = (e, t = {}) => {
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
  return $v(u, e), u.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, u;
}, ia = { exports: {} };
const _v = "2.0.0", zu = 256, vv = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Ev = 16, wv = zu - 6, Sv = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var gs = {
  MAX_LENGTH: zu,
  MAX_SAFE_COMPONENT_LENGTH: Ev,
  MAX_SAFE_BUILD_LENGTH: wv,
  MAX_SAFE_INTEGER: vv,
  RELEASE_TYPES: Sv,
  SEMVER_SPEC_VERSION: _v,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const bv = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var _s = bv;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = gs, a = _s;
  t = e.exports = {};
  const i = t.re = [], u = t.safeRe = [], c = t.src = [], d = t.safeSrc = [], l = t.t = {};
  let h = 0;
  const S = "[a-zA-Z0-9-]", g = [
    ["\\s", 1],
    ["\\d", s],
    [S, n]
  ], v = ($) => {
    for (const [p, w] of g)
      $ = $.split(`${p}*`).join(`${p}{0,${w}}`).split(`${p}+`).join(`${p}{1,${w}}`);
    return $;
  }, _ = ($, p, w) => {
    const N = v(p), T = h++;
    a($, T, p), l[$] = T, c[T] = p, d[T] = N, i[T] = new RegExp(p, w ? "g" : void 0), u[T] = new RegExp(N, w ? "g" : void 0);
  };
  _("NUMERICIDENTIFIER", "0|[1-9]\\d*"), _("NUMERICIDENTIFIERLOOSE", "\\d+"), _("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${S}*`), _("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), _("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), _("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), _("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), _("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), _("BUILDIDENTIFIER", `${S}+`), _("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), _("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), _("FULL", `^${c[l.FULLPLAIN]}$`), _("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), _("LOOSE", `^${c[l.LOOSEPLAIN]}$`), _("GTLT", "((?:<|>)?=?)"), _("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), _("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), _("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), _("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), _("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), _("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), _("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), _("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), _("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), _("COERCERTL", c[l.COERCE], !0), _("COERCERTLFULL", c[l.COERCEFULL], !0), _("LONETILDE", "(?:~>?)"), _("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", _("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), _("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), _("LONECARET", "(?:\\^)"), _("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", _("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), _("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), _("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), _("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), _("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", _("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), _("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), _("STAR", "(<|>)?=?\\s*\\*"), _("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), _("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(ia, ia.exports);
var un = ia.exports;
const Pv = Object.freeze({ loose: !0 }), Nv = Object.freeze({}), Ov = (e) => e ? typeof e != "object" ? Pv : e : Nv;
var ri = Ov;
const ac = /^[0-9]+$/, qu = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = ac.test(e), n = ac.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Tv = (e, t) => qu(t, e);
var Ku = {
  compareIdentifiers: qu,
  rcompareIdentifiers: Tv
};
const Pn = _s, { MAX_LENGTH: oc, MAX_SAFE_INTEGER: Nn } = gs, { safeRe: On, t: Tn } = un, Rv = ri, { compareIdentifiers: Ms } = Ku;
let Iv = class st {
  constructor(t, r) {
    if (r = Rv(r), t instanceof st) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > oc)
      throw new TypeError(
        `version is longer than ${oc} characters`
      );
    Pn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? On[Tn.LOOSE] : On[Tn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Nn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Nn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Nn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < Nn)
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
    if (Pn("SemVer.compare", this.version, this.options, t), !(t instanceof st)) {
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
      if (Pn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Ms(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof st || (t = new st(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (Pn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return Ms(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? On[Tn.PRERELEASELOOSE] : On[Tn.PRERELEASE]);
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
          n === !1 && (a = [r]), Ms(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var De = Iv;
const ic = De, jv = (e, t, r = !1) => {
  if (e instanceof ic)
    return e;
  try {
    return new ic(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Cr = jv;
const Av = Cr, kv = (e, t) => {
  const r = Av(e, t);
  return r ? r.version : null;
};
var Cv = kv;
const Dv = Cr, Mv = (e, t) => {
  const r = Dv(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Lv = Mv;
const cc = De, Fv = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new cc(
      e instanceof cc ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var Vv = Fv;
const lc = Cr, Uv = (e, t) => {
  const r = lc(e, null, !0), n = lc(t, null, !0), s = r.compare(n);
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
var zv = Uv;
const qv = De, Kv = (e, t) => new qv(e, t).major;
var Gv = Kv;
const Hv = De, Bv = (e, t) => new Hv(e, t).minor;
var Jv = Bv;
const Xv = De, Wv = (e, t) => new Xv(e, t).patch;
var Yv = Wv;
const Qv = Cr, Zv = (e, t) => {
  const r = Qv(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var xv = Zv;
const uc = De, eE = (e, t, r) => new uc(e, r).compare(new uc(t, r));
var rt = eE;
const tE = rt, rE = (e, t, r) => tE(t, e, r);
var nE = rE;
const sE = rt, aE = (e, t) => sE(e, t, !0);
var oE = aE;
const dc = De, iE = (e, t, r) => {
  const n = new dc(e, r), s = new dc(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var ni = iE;
const cE = ni, lE = (e, t) => e.sort((r, n) => cE(r, n, t));
var uE = lE;
const dE = ni, fE = (e, t) => e.sort((r, n) => dE(n, r, t));
var hE = fE;
const pE = rt, mE = (e, t, r) => pE(e, t, r) > 0;
var vs = mE;
const yE = rt, $E = (e, t, r) => yE(e, t, r) < 0;
var si = $E;
const gE = rt, _E = (e, t, r) => gE(e, t, r) === 0;
var Gu = _E;
const vE = rt, EE = (e, t, r) => vE(e, t, r) !== 0;
var Hu = EE;
const wE = rt, SE = (e, t, r) => wE(e, t, r) >= 0;
var ai = SE;
const bE = rt, PE = (e, t, r) => bE(e, t, r) <= 0;
var oi = PE;
const NE = Gu, OE = Hu, TE = vs, RE = ai, IE = si, jE = oi, AE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return NE(e, r, n);
    case "!=":
      return OE(e, r, n);
    case ">":
      return TE(e, r, n);
    case ">=":
      return RE(e, r, n);
    case "<":
      return IE(e, r, n);
    case "<=":
      return jE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Bu = AE;
const kE = De, CE = Cr, { safeRe: Rn, t: In } = un, DE = (e, t) => {
  if (e instanceof kE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Rn[In.COERCEFULL] : Rn[In.COERCE]);
  else {
    const c = t.includePrerelease ? Rn[In.COERCERTLFULL] : Rn[In.COERCERTL];
    let d;
    for (; (d = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), c.lastIndex = d.index + d[1].length + d[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", i = t.includePrerelease && r[5] ? `-${r[5]}` : "", u = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return CE(`${n}.${s}.${a}${i}${u}`, t);
};
var ME = DE;
class LE {
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
var FE = LE, Ls, fc;
function nt() {
  if (fc) return Ls;
  fc = 1;
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
        if (this.set = this.set.filter((O) => !_(O[0])), this.set.length === 0)
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
      const D = ((this.options.includePrerelease && g) | (this.options.loose && v)) + ":" + k, O = n.get(D);
      if (O)
        return O;
      const R = this.options.loose, E = R ? c[d.HYPHENRANGELOOSE] : c[d.HYPHENRANGE];
      k = k.replace(E, Q(this.options.includePrerelease)), i("hyphen replace", k), k = k.replace(c[d.COMPARATORTRIM], l), i("comparator trim", k), k = k.replace(c[d.TILDETRIM], h), i("tilde trim", k), k = k.replace(c[d.CARETTRIM], S), i("caret trim", k);
      let m = k.split(" ").map((f) => w(f, this.options)).join(" ").split(/\s+/).map((f) => ne(f, this.options));
      R && (m = m.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(c[d.COMPARATORLOOSE])))), i("range list", m);
      const b = /* @__PURE__ */ new Map(), y = m.map((f) => new a(f, this.options));
      for (const f of y) {
        if (_(f))
          return [f];
        b.set(f.value, f);
      }
      b.size > 1 && b.has("") && b.delete("");
      const o = [...b.values()];
      return n.set(D, o), o;
    }
    intersects(k, U) {
      if (!(k instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((D) => p(D, U) && k.set.some((O) => p(O, U) && D.every((R) => O.every((E) => R.intersects(E, U)))));
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
  Ls = t;
  const r = FE, n = new r(), s = ri, a = Es(), i = _s, u = De, {
    safeRe: c,
    t: d,
    comparatorTrimReplace: l,
    tildeTrimReplace: h,
    caretTrimReplace: S
  } = un, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: v } = gs, _ = (C) => C.value === "<0.0.0-0", $ = (C) => C.value === "", p = (C, k) => {
    let U = !0;
    const D = C.slice();
    let O = D.pop();
    for (; U && D.length; )
      U = D.every((R) => O.intersects(R, k)), O = D.pop();
    return U;
  }, w = (C, k) => (C = C.replace(c[d.BUILD], ""), i("comp", C, k), C = z(C, k), i("caret", C), C = T(C, k), i("tildes", C), C = ue(C, k), i("xrange", C), C = H(C, k), i("stars", C), C), N = (C) => !C || C.toLowerCase() === "x" || C === "*", T = (C, k) => C.trim().split(/\s+/).map((U) => I(U, k)).join(" "), I = (C, k) => {
    const U = k.loose ? c[d.TILDELOOSE] : c[d.TILDE];
    return C.replace(U, (D, O, R, E, m) => {
      i("tilde", C, D, O, R, E, m);
      let b;
      return N(O) ? b = "" : N(R) ? b = `>=${O}.0.0 <${+O + 1}.0.0-0` : N(E) ? b = `>=${O}.${R}.0 <${O}.${+R + 1}.0-0` : m ? (i("replaceTilde pr", m), b = `>=${O}.${R}.${E}-${m} <${O}.${+R + 1}.0-0`) : b = `>=${O}.${R}.${E} <${O}.${+R + 1}.0-0`, i("tilde return", b), b;
    });
  }, z = (C, k) => C.trim().split(/\s+/).map((U) => B(U, k)).join(" "), B = (C, k) => {
    i("caret", C, k);
    const U = k.loose ? c[d.CARETLOOSE] : c[d.CARET], D = k.includePrerelease ? "-0" : "";
    return C.replace(U, (O, R, E, m, b) => {
      i("caret", C, O, R, E, m, b);
      let y;
      return N(R) ? y = "" : N(E) ? y = `>=${R}.0.0${D} <${+R + 1}.0.0-0` : N(m) ? R === "0" ? y = `>=${R}.${E}.0${D} <${R}.${+E + 1}.0-0` : y = `>=${R}.${E}.0${D} <${+R + 1}.0.0-0` : b ? (i("replaceCaret pr", b), R === "0" ? E === "0" ? y = `>=${R}.${E}.${m}-${b} <${R}.${E}.${+m + 1}-0` : y = `>=${R}.${E}.${m}-${b} <${R}.${+E + 1}.0-0` : y = `>=${R}.${E}.${m}-${b} <${+R + 1}.0.0-0`) : (i("no pr"), R === "0" ? E === "0" ? y = `>=${R}.${E}.${m}${D} <${R}.${E}.${+m + 1}-0` : y = `>=${R}.${E}.${m}${D} <${R}.${+E + 1}.0-0` : y = `>=${R}.${E}.${m} <${+R + 1}.0.0-0`), i("caret return", y), y;
    });
  }, ue = (C, k) => (i("replaceXRanges", C, k), C.split(/\s+/).map((U) => V(U, k)).join(" ")), V = (C, k) => {
    C = C.trim();
    const U = k.loose ? c[d.XRANGELOOSE] : c[d.XRANGE];
    return C.replace(U, (D, O, R, E, m, b) => {
      i("xRange", C, D, O, R, E, m, b);
      const y = N(R), o = y || N(E), f = o || N(m), P = f;
      return O === "=" && P && (O = ""), b = k.includePrerelease ? "-0" : "", y ? O === ">" || O === "<" ? D = "<0.0.0-0" : D = "*" : O && P ? (o && (E = 0), m = 0, O === ">" ? (O = ">=", o ? (R = +R + 1, E = 0, m = 0) : (E = +E + 1, m = 0)) : O === "<=" && (O = "<", o ? R = +R + 1 : E = +E + 1), O === "<" && (b = "-0"), D = `${O + R}.${E}.${m}${b}`) : o ? D = `>=${R}.0.0${b} <${+R + 1}.0.0-0` : f && (D = `>=${R}.${E}.0${b} <${R}.${+E + 1}.0-0`), i("xRange return", D), D;
    });
  }, H = (C, k) => (i("replaceStars", C, k), C.trim().replace(c[d.STAR], "")), ne = (C, k) => (i("replaceGTE0", C, k), C.trim().replace(c[k.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (C) => (k, U, D, O, R, E, m, b, y, o, f, P) => (N(D) ? U = "" : N(O) ? U = `>=${D}.0.0${C ? "-0" : ""}` : N(R) ? U = `>=${D}.${O}.0${C ? "-0" : ""}` : E ? U = `>=${U}` : U = `>=${U}${C ? "-0" : ""}`, N(y) ? b = "" : N(o) ? b = `<${+y + 1}.0.0-0` : N(f) ? b = `<${y}.${+o + 1}.0-0` : P ? b = `<=${y}.${o}.${f}-${P}` : C ? b = `<${y}.${o}.${+f + 1}-0` : b = `<=${b}`, `${U} ${b}`.trim()), de = (C, k, U) => {
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
  return Ls;
}
var Fs, hc;
function Es() {
  if (hc) return Fs;
  hc = 1;
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
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], S = l.match(h);
      if (!S)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = S[1] !== void 0 ? S[1] : "", this.operator === "=" && (this.operator = ""), S[2] ? this.semver = new u(S[2], this.options.loose) : this.semver = e;
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
  Fs = t;
  const r = ri, { safeRe: n, t: s } = un, a = Bu, i = _s, u = De, c = nt();
  return Fs;
}
const VE = nt(), UE = (e, t, r) => {
  try {
    t = new VE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ws = UE;
const zE = nt(), qE = (e, t) => new zE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var KE = qE;
const GE = De, HE = nt(), BE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new HE(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new GE(n, r));
  }), n;
};
var JE = BE;
const XE = De, WE = nt(), YE = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new WE(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new XE(n, r));
  }), n;
};
var QE = YE;
const Vs = De, ZE = nt(), pc = vs, xE = (e, t) => {
  e = new ZE(e, t);
  let r = new Vs("0.0.0");
  if (e.test(r) || (r = new Vs("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((i) => {
      const u = new Vs(i.semver.version);
      switch (i.operator) {
        case ">":
          u.prerelease.length === 0 ? u.patch++ : u.prerelease.push(0), u.raw = u.format();
        case "":
        case ">=":
          (!a || pc(u, a)) && (a = u);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), a && (!r || pc(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var ew = xE;
const tw = nt(), rw = (e, t) => {
  try {
    return new tw(e, t).range || "*";
  } catch {
    return null;
  }
};
var nw = rw;
const sw = De, Ju = Es(), { ANY: aw } = Ju, ow = nt(), iw = ws, mc = vs, yc = si, cw = oi, lw = ai, uw = (e, t, r, n) => {
  e = new sw(e, n), t = new ow(t, n);
  let s, a, i, u, c;
  switch (r) {
    case ">":
      s = mc, a = cw, i = yc, u = ">", c = ">=";
      break;
    case "<":
      s = yc, a = lw, i = mc, u = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (iw(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const l = t.set[d];
    let h = null, S = null;
    if (l.forEach((g) => {
      g.semver === aw && (g = new Ju(">=0.0.0")), h = h || g, S = S || g, s(g.semver, h.semver, n) ? h = g : i(g.semver, S.semver, n) && (S = g);
    }), h.operator === u || h.operator === c || (!S.operator || S.operator === u) && a(e, S.semver))
      return !1;
    if (S.operator === c && i(e, S.semver))
      return !1;
  }
  return !0;
};
var ii = uw;
const dw = ii, fw = (e, t, r) => dw(e, t, ">", r);
var hw = fw;
const pw = ii, mw = (e, t, r) => pw(e, t, "<", r);
var yw = mw;
const $c = nt(), $w = (e, t, r) => (e = new $c(e, r), t = new $c(t, r), e.intersects(t, r));
var gw = $w;
const _w = ws, vw = rt;
var Ew = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const i = e.sort((l, h) => vw(l, h, r));
  for (const l of i)
    _w(l, t, r) ? (a = l, s || (s = l)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const u = [];
  for (const [l, h] of n)
    l === h ? u.push(l) : !h && l === i[0] ? u.push("*") : h ? l === i[0] ? u.push(`<=${h}`) : u.push(`${l} - ${h}`) : u.push(`>=${l}`);
  const c = u.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < d.length ? c : t;
};
const gc = nt(), ci = Es(), { ANY: Us } = ci, zr = ws, li = rt, ww = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new gc(e, r), t = new gc(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const i = bw(s, a, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, Sw = [new ci(">=0.0.0-0")], _c = [new ci(">=0.0.0")], bw = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Us) {
    if (t.length === 1 && t[0].semver === Us)
      return !0;
    r.includePrerelease ? e = Sw : e = _c;
  }
  if (t.length === 1 && t[0].semver === Us) {
    if (r.includePrerelease)
      return !0;
    t = _c;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? s = vc(s, g, r) : g.operator === "<" || g.operator === "<=" ? a = Ec(a, g, r) : n.add(g.semver);
  if (n.size > 1)
    return null;
  let i;
  if (s && a) {
    if (i = li(s.semver, a.semver, r), i > 0)
      return null;
    if (i === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const g of n) {
    if (s && !zr(g, String(s), r) || a && !zr(g, String(a), r))
      return null;
    for (const v of t)
      if (!zr(g, String(v), r))
        return !1;
    return !0;
  }
  let u, c, d, l, h = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, S = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && a.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const g of t) {
    if (l = l || g.operator === ">" || g.operator === ">=", d = d || g.operator === "<" || g.operator === "<=", s) {
      if (S && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === S.major && g.semver.minor === S.minor && g.semver.patch === S.patch && (S = !1), g.operator === ">" || g.operator === ">=") {
        if (u = vc(s, g, r), u === g && u !== s)
          return !1;
      } else if (s.operator === ">=" && !zr(s.semver, String(g), r))
        return !1;
    }
    if (a) {
      if (h && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === h.major && g.semver.minor === h.minor && g.semver.patch === h.patch && (h = !1), g.operator === "<" || g.operator === "<=") {
        if (c = Ec(a, g, r), c === g && c !== a)
          return !1;
      } else if (a.operator === "<=" && !zr(a.semver, String(g), r))
        return !1;
    }
    if (!g.operator && (a || s) && i !== 0)
      return !1;
  }
  return !(s && d && !a && i !== 0 || a && l && !s && i !== 0 || S || h);
}, vc = (e, t, r) => {
  if (!e)
    return t;
  const n = li(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Ec = (e, t, r) => {
  if (!e)
    return t;
  const n = li(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var Pw = ww;
const zs = un, wc = gs, Nw = De, Sc = Ku, Ow = Cr, Tw = Cv, Rw = Lv, Iw = Vv, jw = zv, Aw = Gv, kw = Jv, Cw = Yv, Dw = xv, Mw = rt, Lw = nE, Fw = oE, Vw = ni, Uw = uE, zw = hE, qw = vs, Kw = si, Gw = Gu, Hw = Hu, Bw = ai, Jw = oi, Xw = Bu, Ww = ME, Yw = Es(), Qw = nt(), Zw = ws, xw = KE, eS = JE, tS = QE, rS = ew, nS = nw, sS = ii, aS = hw, oS = yw, iS = gw, cS = Ew, lS = Pw;
var uS = {
  parse: Ow,
  valid: Tw,
  clean: Rw,
  inc: Iw,
  diff: jw,
  major: Aw,
  minor: kw,
  patch: Cw,
  prerelease: Dw,
  compare: Mw,
  rcompare: Lw,
  compareLoose: Fw,
  compareBuild: Vw,
  sort: Uw,
  rsort: zw,
  gt: qw,
  lt: Kw,
  eq: Gw,
  neq: Hw,
  gte: Bw,
  lte: Jw,
  cmp: Xw,
  coerce: Ww,
  Comparator: Yw,
  Range: Qw,
  satisfies: Zw,
  toComparators: xw,
  maxSatisfying: eS,
  minSatisfying: tS,
  minVersion: rS,
  validRange: nS,
  outside: sS,
  gtr: aS,
  ltr: oS,
  intersects: iS,
  simplifyRange: cS,
  subset: lS,
  SemVer: Nw,
  re: zs.re,
  src: zs.src,
  tokens: zs.t,
  SEMVER_SPEC_VERSION: wc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: wc.RELEASE_TYPES,
  compareIdentifiers: Sc.compareIdentifiers,
  rcompareIdentifiers: Sc.rcompareIdentifiers
}, Ss = { exports: {} }, ui = { exports: {} };
const Xu = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
ui.exports = Xu;
ui.exports.default = Xu;
var dS = ui.exports;
const fS = dS, ss = /* @__PURE__ */ new WeakMap(), Wu = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...i) {
    if (ss.set(a, ++n), n === 1)
      r = e.apply(this, i), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return fS(a, e), ss.set(a, n), a;
};
Ss.exports = Wu;
Ss.exports.default = Wu;
Ss.exports.callCount = (e) => {
  if (!ss.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return ss.get(e);
};
var hS = Ss.exports;
(function(e, t) {
  var r = dn && dn.__classPrivateFieldSet || function(D, O, R, E, m) {
    if (E === "m") throw new TypeError("Private method is not writable");
    if (E === "a" && !m) throw new TypeError("Private accessor was defined without a setter");
    if (typeof O == "function" ? D !== O || !m : !O.has(D)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return E === "a" ? m.call(D, R) : m ? m.value = R : O.set(D, R), R;
  }, n = dn && dn.__classPrivateFieldGet || function(D, O, R, E) {
    if (R === "a" && !E) throw new TypeError("Private accessor was defined without a getter");
    if (typeof O == "function" ? D !== O || !E : !O.has(D)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return R === "m" ? E : R === "a" ? E.call(D) : E ? E.value : O.get(D);
  }, s, a, i, u, c, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const l = jc, h = la, S = or, g = ld, v = ud, _ = dd, $ = Sd, p = Cd, w = Fd, N = it, T = Wy, I = iv, z = gv, B = uS, ue = hS, V = "aes-256-cbc", H = () => /* @__PURE__ */ Object.create(null), ne = (D) => D != null;
  let Q = "";
  try {
    delete require.cache[__filename], Q = S.dirname((a = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && a !== void 0 ? a : ".");
  } catch {
  }
  const de = (D, O) => {
    const R = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), E = typeof O;
    if (R.has(E))
      throw new TypeError(`Setting a value of type \`${E}\` for key \`${D}\` is not allowed as it's not supported by JSON`);
  }, C = "__internal__", k = `${C}.migrations.version`;
  class U {
    constructor(O = {}) {
      var R;
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
        const f = new T.default({
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
      }, "f"), E.serialize && (this._serialize = E.serialize), E.deserialize && (this._deserialize = E.deserialize), this.events = new _.EventEmitter(), r(this, u, E.encryptionKey, "f");
      const b = E.fileExtension ? `.${E.fileExtension}` : "";
      this.path = S.resolve(E.cwd, `${(R = E.configName) !== null && R !== void 0 ? R : "config"}${b}`);
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
    get(O, R) {
      if (n(this, c, "f").accessPropertiesByDotNotation)
        return this._get(O, R);
      const { store: E } = this;
      return O in E ? E[O] : R;
    }
    set(O, R) {
      if (typeof O != "string" && typeof O != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof O}`);
      if (typeof O != "object" && R === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(O))
        throw new TypeError(`Please don't use the ${C} key, as it's used to manage this module internal operations.`);
      const { store: E } = this, m = (b, y) => {
        de(b, y), n(this, c, "f").accessPropertiesByDotNotation ? $.set(E, b, y) : E[b] = y;
      };
      if (typeof O == "object") {
        const b = O;
        for (const [y, o] of Object.entries(b))
          m(y, o);
      } else
        m(O, R);
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
      for (const R of O)
        ne(n(this, d, "f")[R]) && this.set(R, n(this, d, "f")[R]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(O) {
      const { store: R } = this;
      n(this, c, "f").accessPropertiesByDotNotation ? $.delete(R, O) : delete R[O], this.store = R;
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
    onDidChange(O, R) {
      if (typeof O != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof O}`);
      if (typeof R != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof R}`);
      return this._handleChange(() => this.get(O), R);
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
        const O = h.readFileSync(this.path, n(this, u, "f") ? null : "utf8"), R = this._encryptData(O), E = this._deserialize(R);
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
      for (const [O, R] of Object.entries(this.store))
        yield [O, R];
    }
    _encryptData(O) {
      if (!n(this, u, "f"))
        return O.toString();
      try {
        if (n(this, u, "f"))
          try {
            if (O.slice(16, 17).toString() === ":") {
              const R = O.slice(0, 16), E = g.pbkdf2Sync(n(this, u, "f"), R.toString(), 1e4, 32, "sha512"), m = g.createDecipheriv(V, E, R);
              O = Buffer.concat([m.update(Buffer.from(O.slice(17))), m.final()]).toString("utf8");
            } else {
              const R = g.createDecipher(V, n(this, u, "f"));
              O = Buffer.concat([R.update(Buffer.from(O)), R.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return O.toString();
    }
    _handleChange(O, R) {
      let E = O();
      const m = () => {
        const b = E, y = O();
        (0, l.isDeepStrictEqual)(y, b) || (E = y, R.call(this, y, b));
      };
      return this.events.on("change", m), () => this.events.removeListener("change", m);
    }
    _validate(O) {
      if (!n(this, i, "f") || n(this, i, "f").call(this, O) || !n(this, i, "f").errors)
        return;
      const E = n(this, i, "f").errors.map(({ instancePath: m, message: b = "" }) => `\`${m.slice(1)}\` ${b}`);
      throw new Error("Config schema violation: " + E.join("; "));
    }
    _ensureDirectory() {
      h.mkdirSync(S.dirname(this.path), { recursive: !0 });
    }
    _write(O) {
      let R = this._serialize(O);
      if (n(this, u, "f")) {
        const E = g.randomBytes(16), m = g.pbkdf2Sync(n(this, u, "f"), E.toString(), 1e4, 32, "sha512"), b = g.createCipheriv(V, m, E);
        R = Buffer.concat([E, Buffer.from(":"), b.update(Buffer.from(R)), b.final()]);
      }
      if (process.env.SNAP)
        h.writeFileSync(this.path, R, { mode: n(this, c, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, R, { mode: n(this, c, "f").configFileMode });
        } catch (E) {
          if ((E == null ? void 0 : E.code) === "EXDEV") {
            h.writeFileSync(this.path, R, { mode: n(this, c, "f").configFileMode });
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
    _migrate(O, R, E) {
      let m = this._get(k, "0.0.0");
      const b = Object.keys(O).filter((o) => this._shouldPerformMigration(o, m, R));
      let y = { ...this.store };
      for (const o of b)
        try {
          E && E(this, {
            fromVersion: m,
            toVersion: o,
            finalVersion: R,
            versions: b
          });
          const f = O[o];
          f(this), this._set(k, o), m = o, y = { ...this.store };
        } catch (f) {
          throw this.store = y, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(m) || !B.eq(m, R)) && this._set(k, R);
    }
    _containsReservedKey(O) {
      return typeof O == "object" && Object.keys(O)[0] === C ? !0 : typeof O != "string" ? !1 : n(this, c, "f").accessPropertiesByDotNotation ? !!O.startsWith(`${C}.`) : !1;
    }
    _isVersionInRangeFormat(O) {
      return B.clean(O) === null;
    }
    _shouldPerformMigration(O, R, E) {
      return this._isVersionInRangeFormat(O) ? R !== "0.0.0" && B.satisfies(R, O) ? !1 : B.satisfies(E, O) : !(B.lte(O, R) || B.gt(O, E));
    }
    _get(O, R) {
      return $.get(this.store, O, R);
    }
    _set(O, R) {
      const { store: E } = this;
      $.set(E, O, R), this.store = E;
    }
  }
  t.default = U, e.exports = U, e.exports.default = U;
})(qs, qs.exports);
var pS = qs.exports;
const bc = or, { app: Un, ipcMain: ca, ipcRenderer: Pc, shell: mS } = rd, yS = pS;
let Nc = !1;
const Oc = () => {
  if (!ca || !Un)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Un.getPath("userData"),
    appVersion: Un.getVersion()
  };
  return Nc || (ca.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Nc = !0), e;
};
class $S extends yS {
  constructor(t) {
    let r, n;
    if (Pc) {
      const s = Pc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else ca && Un && ({ defaultCwd: r, appVersion: n } = Oc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = bc.isAbsolute(t.cwd) ? t.cwd : bc.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    Oc();
  }
  async openInEditor() {
    const t = await mS.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var gS = $S;
const _S = /* @__PURE__ */ _d(gS), Yu = "iTransporter-secure-key-2024", Ie = new _S({
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
function vS(e) {
  const t = mr.scryptSync(Yu, "salt", 32), r = mr.randomBytes(16), n = mr.createCipheriv("aes-256-cbc", t, r);
  let s = n.update(e, "utf8", "hex");
  return s += n.final("hex"), r.toString("hex") + ":" + s;
}
function ES(e) {
  try {
    const [t, r] = e.split(":"), n = mr.scryptSync(Yu, "salt", 32), s = Buffer.from(t, "hex"), a = mr.createDecipheriv("aes-256-cbc", n, s);
    let i = a.update(r, "hex", "utf8");
    return i += a.final("utf8"), i;
  } catch {
    return "";
  }
}
function Qu(e, t) {
  const r = Ie.get("credentials", []), n = r.findIndex((i) => i.appleId === e), s = vS(t), a = (/* @__PURE__ */ new Date()).toISOString();
  n >= 0 ? (r[n].password = s, r[n].lastUsed = a, r[n].uploadCount += 1) : r.push({
    appleId: e,
    password: s,
    lastUsed: a,
    uploadCount: 1
  }), Ie.set("credentials", r);
}
function wS() {
  return Ie.get("credentials", []).map((t) => ({
    appleId: t.appleId,
    lastUsed: t.lastUsed,
    uploadCount: t.uploadCount
  }));
}
function SS(e) {
  const r = Ie.get("credentials", []).find((n) => n.appleId === e);
  return r ? {
    ...r,
    password: ES(r.password)
  } : null;
}
function bS(e) {
  const t = Ie.get("credentials", []), r = t.filter((n) => n.appleId !== e);
  return r.length !== t.length ? (Ie.set("credentials", r), !0) : !1;
}
function zn(e) {
  const t = Ie.get("uploadHistory", []), r = {
    ...e,
    id: mr.randomUUID()
  };
  return t.unshift(r), t.length > 100 && t.pop(), Ie.set("uploadHistory", t), r;
}
function PS() {
  return Ie.get("uploadHistory", []);
}
function NS() {
  Ie.set("uploadHistory", []);
}
function OS(e) {
  const t = Ie.get("uploadHistory", []), r = t.filter((n) => n.id !== e);
  return r.length !== t.length ? (Ie.set("uploadHistory", r), !0) : !1;
}
function Zu() {
  return Ie.get("webhookSettings", { url: "", enabled: !1 });
}
function TS(e) {
  Ie.set("webhookSettings", e);
}
function RS() {
  return Ie.get("retryAttempts", 3);
}
function IS(e) {
  Ie.set("retryAttempts", Math.max(1, Math.min(e, 10)));
}
function jS(e) {
  const t = Math.floor(e / 1e3), r = Math.floor(t / 60), n = Math.floor(r / 60), s = r % 60, a = t % 60, i = [];
  return n > 0 && i.push(`${n}h`), s > 0 && i.push(`${s}m`), (a > 0 || i.length === 0) && i.push(`${a}s`), i.join(" ");
}
function AS(e) {
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
`, e.status === "success" && e.duration && (n += `⏱️ Duration: ${e.duration}
`), e.errorMessage && (n += `❗ Error: ${e.errorMessage}
`), n += `🕐 Time: ${new Date(e.endTime).toLocaleString()}`, n;
}
async function qn(e) {
  const t = Zu();
  if (!t.enabled || !t.url)
    return { success: !1, message: "Webhook not enabled or URL not set" };
  if (e.status === "success" && e.startTime && e.endTime) {
    const s = new Date(e.startTime).getTime(), a = new Date(e.endTime).getTime();
    e.duration = jS(a - s);
  }
  const n = {
    msg_type: "text",
    content: {
      text: AS(e)
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
async function kS(e) {
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
let Qe = null, Pt = null, ht = "", St = 0, dr = 3, Kn = !1;
async function CS(e, t) {
  return new Promise((r) => {
    var u, c;
    const n = Dc(), s = Ic(n, [
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
        let S = !1;
        for (const g of h) {
          if (g.includes("Provider listing:")) {
            S = !0;
            continue;
          }
          if (g.includes("- Long Name -") || g.includes("- Short Name -"))
            continue;
          if (S) {
            const $ = g.match(/^\s*(\d+)\s+(.+?)\s{2,}(\S+)\s*$/);
            if ($) {
              l.push({
                teamName: $[2].trim(),
                teamId: $[3],
                // In table format, shortName is ID
                shortName: $[3]
              });
              continue;
            }
          }
          const v = g.match(/^\d+\.\s+(.+?)\s+\((\w+)\)\s+-\s+ProviderShortName:\s+(\S+)/);
          v && l.push({
            teamName: v[1].trim(),
            teamId: v[2],
            shortName: v[3]
          });
          const _ = g.match(/parameter\s+(.+?)\s+=\s+(\w+)/);
          if (_ && !g.includes("Application") && !g.includes("Version") && !g.includes("OSIdentifier")) {
            const $ = _[1].trim(), p = _[2];
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
          const g = a.match(/ProviderShortName[:\s]+(\S+)/g);
          g ? (g.forEach((v, _) => {
            const $ = v.replace(/ProviderShortName[:\s]+/, "").trim();
            l.push({
              teamName: `Team ${_ + 1}`,
              teamId: $,
              shortName: $
            });
          }), r({ success: !0, providers: l })) : r({ success: !1, errorMessage: "Failed to parse Provider list. Please enter Provider Shortname manually." });
        }
      } else
        r({
          success: !1,
          errorMessage: i || `Failed to get Provider (Exit code: ${d})`
        });
    }), s.on("error", (d) => {
      r({ success: !1, errorMessage: d.message });
    });
  });
}
function DS(e, t) {
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
    const a = parseInt(n[1]), i = parseInt(n[2]);
    return {
      phase: "uploading",
      phaseText: "Uploading",
      progress: parseFloat(n[3]),
      fileName: t,
      bytesUploaded: a,
      totalBytes: i
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
function MS(e, t) {
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
async function LS(e, t, r = 3) {
  dr = r, St = 0, Kn = !1;
  let n = { success: !1, errorMessage: "Unknown error" };
  for (; St < dr; ) {
    if (St++, Kn)
      return { success: !1, errorMessage: "User cancelled upload" };
    if (St > 1 && (be(t, "---"), be(t, `[RETRY] Attempt ${St} of ${dr}...`), t.webContents.send("upload-retry", {
      attempt: St,
      maxAttempts: dr
    }), await new Promise((s) => setTimeout(s, 2e3))), n = await FS(e, t), n.success || Kn)
      return n;
    St < dr && be(t, `[INFO] Upload failed, will retry (${dr - St} attempts remaining)...`);
  }
  return n;
}
function FS(e, t) {
  return new Promise((r) => {
    var d, l;
    const n = Dc(), s = Ac.basename(e.ipaPath);
    ht = (/* @__PURE__ */ new Date()).toISOString(), Pt = e, Wt(t, {
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
    e.ascProvider && a.push("-asc_provider", e.ascProvider), Qe = Ic(n, a);
    let i = "", u = null;
    const c = (h, S = !1) => {
      S ? be(t, `[ERROR] ${h}`) : be(t, h);
      const g = DS(h, s);
      if (g) {
        u = g, Wt(t, g);
        return;
      }
      const v = MS(h, s);
      v && (u && v.phase === "uploading" && u.phase === "uploading" && (v.progress = u.progress), u = v, Wt(t, v));
    };
    (d = Qe.stdout) == null || d.on("data", (h) => {
      h.toString().split(`
`).filter((v) => v.trim()).forEach((v) => c(v));
    }), (l = Qe.stderr) == null || l.on("data", (h) => {
      const S = h.toString();
      i += S, S.split(`
`).filter((v) => v.trim()).forEach((v) => c(v, !0));
    }), Qe.on("close", (h) => {
      const S = (/* @__PURE__ */ new Date()).toISOString();
      h === 0 ? (be(t, "---"), be(t, "[SUCCESS] Upload Completed!"), Wt(t, {
        phase: "completed",
        phaseText: "Completed",
        progress: 100,
        fileName: s
      }), Qu(e.appleId, e.appSpecificPassword), zn({
        fileName: s,
        filePath: e.ipaPath,
        appleId: e.appleId,
        status: "success",
        startTime: ht,
        endTime: S
      }), t.webContents.send("upload-complete", { success: !0 }), qn({
        fileName: s,
        status: "success",
        appleId: e.appleId,
        startTime: ht,
        endTime: S
      }), r({ success: !0 })) : (be(t, "---"), be(t, `[FAILED] Upload Failed (Exit code: ${h})`), Wt(t, {
        phase: "failed",
        phaseText: "Failed",
        progress: (u == null ? void 0 : u.progress) || 0,
        fileName: s
      }), zn({
        fileName: s,
        filePath: e.ipaPath,
        appleId: e.appleId,
        status: "failed",
        startTime: ht,
        endTime: S,
        errorMessage: i || `Exit code: ${h}`
      }), t.webContents.send("upload-complete", {
        success: !1,
        errorMessage: i || `Exit code: ${h}`
      }), qn({
        fileName: s,
        status: "failed",
        appleId: e.appleId,
        startTime: ht,
        endTime: S,
        errorMessage: i || `Exit code: ${h}`
      }), r({ success: !1, errorMessage: i || `Exit code: ${h}` })), Qe = null, Pt = null;
    }), Qe.on("error", (h) => {
      const S = (/* @__PURE__ */ new Date()).toISOString();
      be(t, `[ERROR] Process failed to start: ${h.message}`), Wt(t, {
        phase: "failed",
        phaseText: "Start failed",
        progress: 0,
        fileName: s
      }), zn({
        fileName: s,
        filePath: e.ipaPath,
        appleId: e.appleId,
        status: "failed",
        startTime: ht,
        endTime: S,
        errorMessage: h.message
      }), t.webContents.send("upload-complete", {
        success: !1,
        errorMessage: h.message
      }), qn({
        fileName: s,
        status: "failed",
        appleId: e.appleId,
        startTime: ht,
        endTime: S,
        errorMessage: h.message
      }), r({ success: !1, errorMessage: h.message }), Qe = null, Pt = null;
    });
  });
}
function VS(e) {
  if (Kn = !0, Qe && Pt) {
    const t = Ac.basename(Pt.ipaPath);
    be(e, "[INFO] Cancelling upload..."), Wt(e, {
      phase: "failed",
      phaseText: "Cancelled",
      progress: 0,
      fileName: t
    });
    const r = (/* @__PURE__ */ new Date()).toISOString(), n = Pt.appleId, s = Pt.ipaPath;
    return zn({
      fileName: t,
      filePath: s,
      appleId: n,
      status: "cancelled",
      startTime: ht,
      endTime: r,
      errorMessage: "User cancelled upload"
    }), qn({
      fileName: t,
      status: "cancelled",
      appleId: n,
      startTime: ht,
      endTime: r,
      errorMessage: "User cancelled upload"
    }), Qe.kill("SIGTERM"), Qe = null, Pt = null, be(e, "[INFO] Upload cancelled"), e.webContents.send("upload-complete", {
      success: !1,
      errorMessage: "User cancelled upload"
    }), !0;
  }
  return !1;
}
function xu() {
  return Qe !== null;
}
function be(e, t) {
  e.webContents.send("upload-log", {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    message: t
  });
}
function Wt(e, t) {
  e.webContents.send("upload-progress", t);
}
async function US() {
  return new Promise((e) => {
    const t = nd.request({
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
const bs = vr.dirname(od(import.meta.url)), zS = !!process.env.VITE_DEV_SERVER_URL, Tc = process.env.VITE_DEV_SERVER_URL, nb = vr.join(bs), ed = vr.join(bs, "../dist");
process.env.VITE_PUBLIC = zS ? vr.join(bs, "../public") : ed;
let ge;
function td() {
  ge = new Rc({
    width: 1e3,
    height: 800,
    minWidth: 900,
    minHeight: 700,
    // icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: vr.join(bs, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), ge.webContents.openDevTools(), ge.webContents.on("did-finish-load", () => {
    ge == null || ge.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Tc ? ge.loadURL(Tc) : ge.loadFile(vr.join(ed, "index.html")), ge.webContents.on("context-menu", (e, t) => {
    const { isEditable: r, selectionText: n, editFlags: s, x: a, y: i } = t;
    ge == null || ge.webContents.send("show-context-menu", {
      isEditable: r,
      hasSelection: n && n.trim() !== "",
      editFlags: s,
      x: a,
      y: i
    });
  });
}
$e.handle("check-environment", async () => await $d());
$e.handle("install-clt", async () => await gd());
$e.handle("select-ipa-file", async () => {
  if (!ge) return null;
  const e = await ad.showOpenDialog(ge, {
    title: "选择 IPA 文件",
    filters: [
      { name: "iOS App", extensions: ["ipa"] }
    ],
    properties: ["openFile"]
  });
  return e.canceled || e.filePaths.length === 0 ? null : e.filePaths[0];
});
$e.handle("start-upload", async (e, t) => ge ? xu() ? { success: !1, errorMessage: "已有上传任务进行中" } : await LS(t, ge, t.retryAttempts || 1) : { success: !1, errorMessage: "窗口未初始化" });
$e.handle("cancel-upload", async () => ge ? VS(ge) : !1);
$e.handle("is-uploading", () => xu());
$e.handle("fetch-providers", async (e, t) => await CS(t.appleId, t.password));
$e.handle("open-external", async (e, t) => {
  t && (t.startsWith("http://") || t.startsWith("https://")) && await sd.openExternal(t);
});
$e.handle("get-credentials-list", () => wS());
$e.handle("get-credential", (e, t) => SS(t));
$e.handle("save-credential", (e, t) => (Qu(t.appleId, t.password), !0));
$e.handle("delete-credential", (e, t) => bS(t));
$e.handle("get-upload-history", () => PS());
$e.handle("clear-upload-history", () => (NS(), !0));
$e.handle("delete-upload-history", (e, t) => OS(t));
$e.handle("get-ip-info", async () => await US());
$e.handle("get-webhook-settings", () => Zu());
$e.handle("set-webhook-settings", (e, t) => (TS(t), !0));
$e.handle("test-webhook", async (e, t) => await kS(t));
$e.handle("get-retry-attempts", () => RS());
$e.handle("set-retry-attempts", (e, t) => (IS(t), !0));
Gn.on("window-all-closed", () => {
  process.platform !== "darwin" && (Gn.quit(), ge = null);
});
Gn.on("activate", () => {
  Rc.getAllWindows().length === 0 && td();
});
Gn.whenReady().then(td);
export {
  nb as MAIN_DIST,
  ed as RENDERER_DIST,
  Tc as VITE_DEV_SERVER_URL
};
