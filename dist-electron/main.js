import vu, { ipcMain as Be, app as In, BrowserWindow as uc, dialog as Eu } from "electron";
import { fileURLToPath as wu } from "node:url";
import ur from "node:path";
import * as Hs from "fs";
import Bs from "fs";
import { exec as Su, spawn as dc } from "child_process";
import fc, { promisify as bu } from "util";
import * as hc from "path";
import Zt from "path";
import * as ar from "crypto";
import Pu from "crypto";
import Nu from "assert";
import Ou from "events";
import Ru from "os";
const pc = bu(Su), mc = "/Applications/Transporter.app", Js = "/Applications/Transporter.app/Contents/itms/bin/iTMSTransporter";
function Tu() {
  return Hs.existsSync(mc);
}
function Iu() {
  return Hs.existsSync(Js);
}
async function ju() {
  try {
    const { stdout: e } = await pc("xcode-select -p"), t = e.trim();
    return Hs.existsSync(t) ? { installed: !0, path: t } : { installed: !1, path: "" };
  } catch {
    return { installed: !1, path: "" };
  }
}
async function Au() {
  const e = Tu(), t = Iu(), r = await ju();
  return {
    transporterInstalled: e,
    transporterPath: mc,
    iTMSTransporterPath: Js,
    iTMSTransporterExists: t,
    commandLineToolsInstalled: r.installed,
    commandLineToolsPath: r.path,
    allReady: e && t && r.installed
  };
}
function yc() {
  return Js;
}
async function ku() {
  var e;
  try {
    return await pc("xcode-select --install"), {
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
var Qr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Cu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var bs = { exports: {} }, Du = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
};
const Ft = Du, Mu = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Lu = (e) => !e.some((t) => Mu.has(t));
function Zr(e) {
  const t = e.split("."), r = [];
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    for (; s[s.length - 1] === "\\" && t[n + 1] !== void 0; )
      s = s.slice(0, -1) + ".", s += t[++n];
    r.push(s);
  }
  return Lu(r) ? r : [];
}
var Fu = {
  get(e, t, r) {
    if (!Ft(e) || typeof t != "string")
      return r === void 0 ? e : r;
    const n = Zr(t);
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
    if (!Ft(e) || typeof t != "string")
      return e;
    const n = e, s = Zr(t);
    for (let a = 0; a < s.length; a++) {
      const i = s[a];
      Ft(e[i]) || (e[i] = {}), a === s.length - 1 && (e[i] = r), e = e[i];
    }
    return n;
  },
  delete(e, t) {
    if (!Ft(e) || typeof t != "string")
      return !1;
    const r = Zr(t);
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (n === r.length - 1)
        return delete e[s], !0;
      if (e = e[s], !Ft(e))
        return !1;
    }
  },
  has(e, t) {
    if (!Ft(e) || typeof t != "string")
      return !1;
    const r = Zr(t);
    if (r.length === 0)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (Ft(e)) {
        if (!(r[n] in e))
          return !1;
        e = e[r[n]];
      } else
        return !1;
    return !0;
  }
}, Xs = { exports: {} }, Ws = { exports: {} }, Ys = { exports: {} }, Qs = { exports: {} };
const $c = Bs;
Qs.exports = (e) => new Promise((t) => {
  $c.access(e, (r) => {
    t(!r);
  });
});
Qs.exports.sync = (e) => {
  try {
    return $c.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Vu = Qs.exports, Zs = { exports: {} }, xs = { exports: {} };
const _c = (e, ...t) => new Promise((r) => {
  r(e(...t));
});
xs.exports = _c;
xs.exports.default = _c;
var Uu = xs.exports;
const zu = Uu, gc = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let r = 0;
  const n = () => {
    r--, t.length > 0 && t.shift()();
  }, s = (c, l, ...d) => {
    r++;
    const u = zu(c, ...d);
    l(u), u.then(n, n);
  }, a = (c, l, ...d) => {
    r < e ? s(c, l, ...d) : t.push(s.bind(null, c, l, ...d));
  }, i = (c, ...l) => new Promise((d) => a(c, d, ...l));
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
Zs.exports = gc;
Zs.exports.default = gc;
var qu = Zs.exports;
const Ho = qu;
class vc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const Ku = (e, t) => Promise.resolve(e).then(t), Gu = (e) => Promise.all(e).then((t) => t[1] === !0 && Promise.reject(new vc(t[0])));
var Hu = (e, t, r) => {
  r = Object.assign({
    concurrency: 1 / 0,
    preserveOrder: !0
  }, r);
  const n = Ho(r.concurrency), s = [...e].map((i) => [i, n(Ku, i, t)]), a = Ho(r.preserveOrder ? 1 : 1 / 0);
  return Promise.all(s.map((i) => a(Gu, i))).then(() => {
  }).catch((i) => i instanceof vc ? i.value : Promise.reject(i));
};
const Ec = Zt, wc = Vu, Bu = Hu;
Ys.exports = (e, t) => (t = Object.assign({
  cwd: process.cwd()
}, t), Bu(e, (r) => wc(Ec.resolve(t.cwd, r)), t));
Ys.exports.sync = (e, t) => {
  t = Object.assign({
    cwd: process.cwd()
  }, t);
  for (const r of e)
    if (wc.sync(Ec.resolve(t.cwd, r)))
      return r;
};
var Ju = Ys.exports;
const It = Zt, Sc = Ju;
Ws.exports = (e, t = {}) => {
  const r = It.resolve(t.cwd || ""), { root: n } = It.parse(r), s = [].concat(e);
  return new Promise((a) => {
    (function i(c) {
      Sc(s, { cwd: c }).then((l) => {
        l ? a(It.join(c, l)) : c === n ? a(null) : i(It.dirname(c));
      });
    })(r);
  });
};
Ws.exports.sync = (e, t = {}) => {
  let r = It.resolve(t.cwd || "");
  const { root: n } = It.parse(r), s = [].concat(e);
  for (; ; ) {
    const a = Sc.sync(s, { cwd: r });
    if (a)
      return It.join(r, a);
    if (r === n)
      return null;
    r = It.dirname(r);
  }
};
var Xu = Ws.exports;
const bc = Xu;
Xs.exports = async ({ cwd: e } = {}) => bc("package.json", { cwd: e });
Xs.exports.sync = ({ cwd: e } = {}) => bc.sync("package.json", { cwd: e });
var Wu = Xs.exports, ea = { exports: {} };
const ye = Zt, Pc = Ru, Rt = Pc.homedir(), ta = Pc.tmpdir(), { env: sr } = process, Yu = (e) => {
  const t = ye.join(Rt, "Library");
  return {
    data: ye.join(t, "Application Support", e),
    config: ye.join(t, "Preferences", e),
    cache: ye.join(t, "Caches", e),
    log: ye.join(t, "Logs", e),
    temp: ye.join(ta, e)
  };
}, Qu = (e) => {
  const t = sr.APPDATA || ye.join(Rt, "AppData", "Roaming"), r = sr.LOCALAPPDATA || ye.join(Rt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: ye.join(r, e, "Data"),
    config: ye.join(t, e, "Config"),
    cache: ye.join(r, e, "Cache"),
    log: ye.join(r, e, "Log"),
    temp: ye.join(ta, e)
  };
}, Zu = (e) => {
  const t = ye.basename(Rt);
  return {
    data: ye.join(sr.XDG_DATA_HOME || ye.join(Rt, ".local", "share"), e),
    config: ye.join(sr.XDG_CONFIG_HOME || ye.join(Rt, ".config"), e),
    cache: ye.join(sr.XDG_CACHE_HOME || ye.join(Rt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: ye.join(sr.XDG_STATE_HOME || ye.join(Rt, ".local", "state"), e),
    temp: ye.join(ta, t, e)
  };
}, Nc = (e, t) => {
  if (typeof e != "string")
    throw new TypeError(`Expected string, got ${typeof e}`);
  return t = Object.assign({ suffix: "nodejs" }, t), t.suffix && (e += `-${t.suffix}`), process.platform === "darwin" ? Yu(e) : process.platform === "win32" ? Qu(e) : Zu(e);
};
ea.exports = Nc;
ea.exports.default = Nc;
var xu = ea.exports, pt = {}, le = {};
Object.defineProperty(le, "__esModule", { value: !0 });
le.NOOP = le.LIMIT_FILES_DESCRIPTORS = le.LIMIT_BASENAME_LENGTH = le.IS_USER_ROOT = le.IS_POSIX = le.DEFAULT_TIMEOUT_SYNC = le.DEFAULT_TIMEOUT_ASYNC = le.DEFAULT_WRITE_OPTIONS = le.DEFAULT_READ_OPTIONS = le.DEFAULT_FOLDER_MODE = le.DEFAULT_FILE_MODE = le.DEFAULT_ENCODING = void 0;
const ed = "utf8";
le.DEFAULT_ENCODING = ed;
const td = 438;
le.DEFAULT_FILE_MODE = td;
const rd = 511;
le.DEFAULT_FOLDER_MODE = rd;
const nd = {};
le.DEFAULT_READ_OPTIONS = nd;
const sd = {};
le.DEFAULT_WRITE_OPTIONS = sd;
const ad = 5e3;
le.DEFAULT_TIMEOUT_ASYNC = ad;
const od = 100;
le.DEFAULT_TIMEOUT_SYNC = od;
const id = !!process.getuid;
le.IS_POSIX = id;
const cd = process.getuid ? !process.getuid() : !1;
le.IS_USER_ROOT = cd;
const ld = 128;
le.LIMIT_BASENAME_LENGTH = ld;
const ud = 1e4;
le.LIMIT_FILES_DESCRIPTORS = ud;
const dd = () => {
};
le.NOOP = dd;
var qn = {}, dr = {};
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.attemptifySync = dr.attemptifyAsync = void 0;
const Oc = le, fd = (e, t = Oc.NOOP) => function() {
  return e.apply(void 0, arguments).catch(t);
};
dr.attemptifyAsync = fd;
const hd = (e, t = Oc.NOOP) => function() {
  try {
    return e.apply(void 0, arguments);
  } catch (r) {
    return t(r);
  }
};
dr.attemptifySync = hd;
var ra = {};
Object.defineProperty(ra, "__esModule", { value: !0 });
const pd = le, Rc = {
  isChangeErrorOk: (e) => {
    const { code: t } = e;
    return t === "ENOSYS" || !pd.IS_USER_ROOT && (t === "EINVAL" || t === "EPERM");
  },
  isRetriableError: (e) => {
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Rc.isChangeErrorOk(e))
      throw e;
  }
};
ra.default = Rc;
var fr = {}, na = {};
Object.defineProperty(na, "__esModule", { value: !0 });
const md = le, pe = {
  interval: 25,
  intervalId: void 0,
  limit: md.LIMIT_FILES_DESCRIPTORS,
  queueActive: /* @__PURE__ */ new Set(),
  queueWaiting: /* @__PURE__ */ new Set(),
  init: () => {
    pe.intervalId || (pe.intervalId = setInterval(pe.tick, pe.interval));
  },
  reset: () => {
    pe.intervalId && (clearInterval(pe.intervalId), delete pe.intervalId);
  },
  add: (e) => {
    pe.queueWaiting.add(e), pe.queueActive.size < pe.limit / 2 ? pe.tick() : pe.init();
  },
  remove: (e) => {
    pe.queueWaiting.delete(e), pe.queueActive.delete(e);
  },
  schedule: () => new Promise((e) => {
    const t = () => pe.remove(r), r = () => e(t);
    pe.add(r);
  }),
  tick: () => {
    if (!(pe.queueActive.size >= pe.limit)) {
      if (!pe.queueWaiting.size)
        return pe.reset();
      for (const e of pe.queueWaiting) {
        if (pe.queueActive.size >= pe.limit)
          break;
        pe.queueWaiting.delete(e), pe.queueActive.add(e), e();
      }
    }
  }
};
na.default = pe;
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.retryifySync = fr.retryifyAsync = void 0;
const yd = na, $d = (e, t) => function(r) {
  return function n() {
    return yd.default.schedule().then((s) => e.apply(void 0, arguments).then((a) => (s(), a), (a) => {
      if (s(), Date.now() >= r)
        throw a;
      if (t(a)) {
        const i = Math.round(100 + 400 * Math.random());
        return new Promise((l) => setTimeout(l, i)).then(() => n.apply(void 0, arguments));
      }
      throw a;
    }));
  };
};
fr.retryifyAsync = $d;
const _d = (e, t) => function(r) {
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
fr.retryifySync = _d;
Object.defineProperty(qn, "__esModule", { value: !0 });
const ue = Bs, De = fc, Me = dr, Pe = ra, Ve = fr, gd = {
  chmodAttempt: Me.attemptifyAsync(De.promisify(ue.chmod), Pe.default.onChangeError),
  chownAttempt: Me.attemptifyAsync(De.promisify(ue.chown), Pe.default.onChangeError),
  closeAttempt: Me.attemptifyAsync(De.promisify(ue.close)),
  fsyncAttempt: Me.attemptifyAsync(De.promisify(ue.fsync)),
  mkdirAttempt: Me.attemptifyAsync(De.promisify(ue.mkdir)),
  realpathAttempt: Me.attemptifyAsync(De.promisify(ue.realpath)),
  statAttempt: Me.attemptifyAsync(De.promisify(ue.stat)),
  unlinkAttempt: Me.attemptifyAsync(De.promisify(ue.unlink)),
  closeRetry: Ve.retryifyAsync(De.promisify(ue.close), Pe.default.isRetriableError),
  fsyncRetry: Ve.retryifyAsync(De.promisify(ue.fsync), Pe.default.isRetriableError),
  openRetry: Ve.retryifyAsync(De.promisify(ue.open), Pe.default.isRetriableError),
  readFileRetry: Ve.retryifyAsync(De.promisify(ue.readFile), Pe.default.isRetriableError),
  renameRetry: Ve.retryifyAsync(De.promisify(ue.rename), Pe.default.isRetriableError),
  statRetry: Ve.retryifyAsync(De.promisify(ue.stat), Pe.default.isRetriableError),
  writeRetry: Ve.retryifyAsync(De.promisify(ue.write), Pe.default.isRetriableError),
  chmodSyncAttempt: Me.attemptifySync(ue.chmodSync, Pe.default.onChangeError),
  chownSyncAttempt: Me.attemptifySync(ue.chownSync, Pe.default.onChangeError),
  closeSyncAttempt: Me.attemptifySync(ue.closeSync),
  mkdirSyncAttempt: Me.attemptifySync(ue.mkdirSync),
  realpathSyncAttempt: Me.attemptifySync(ue.realpathSync),
  statSyncAttempt: Me.attemptifySync(ue.statSync),
  unlinkSyncAttempt: Me.attemptifySync(ue.unlinkSync),
  closeSyncRetry: Ve.retryifySync(ue.closeSync, Pe.default.isRetriableError),
  fsyncSyncRetry: Ve.retryifySync(ue.fsyncSync, Pe.default.isRetriableError),
  openSyncRetry: Ve.retryifySync(ue.openSync, Pe.default.isRetriableError),
  readFileSyncRetry: Ve.retryifySync(ue.readFileSync, Pe.default.isRetriableError),
  renameSyncRetry: Ve.retryifySync(ue.renameSync, Pe.default.isRetriableError),
  statSyncRetry: Ve.retryifySync(ue.statSync, Pe.default.isRetriableError),
  writeSyncRetry: Ve.retryifySync(ue.writeSync, Pe.default.isRetriableError)
};
qn.default = gd;
var sa = {};
Object.defineProperty(sa, "__esModule", { value: !0 });
const vd = {
  isFunction: (e) => typeof e == "function",
  isString: (e) => typeof e == "string",
  isUndefined: (e) => typeof e > "u"
};
sa.default = vd;
var aa = {};
Object.defineProperty(aa, "__esModule", { value: !0 });
const xr = {}, Ps = {
  next: (e) => {
    const t = xr[e];
    if (!t)
      return;
    t.shift();
    const r = t[0];
    r ? r(() => Ps.next(e)) : delete xr[e];
  },
  schedule: (e) => new Promise((t) => {
    let r = xr[e];
    r || (r = xr[e] = []), r.push(t), !(r.length > 1) && t(() => Ps.next(e));
  })
};
aa.default = Ps;
var oa = {};
Object.defineProperty(oa, "__esModule", { value: !0 });
const Ed = Zt, Bo = le, Jo = qn, Je = {
  store: {},
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), r = Date.now().toString().slice(-10), n = "tmp-", s = `.${n}${r}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = Je.truncate(t(e));
    return n in Je.store ? Je.get(e, t, r) : (Je.store[n] = r, [n, () => delete Je.store[n]]);
  },
  purge: (e) => {
    Je.store[e] && (delete Je.store[e], Jo.default.unlinkAttempt(e));
  },
  purgeSync: (e) => {
    Je.store[e] && (delete Je.store[e], Jo.default.unlinkSyncAttempt(e));
  },
  purgeSyncAll: () => {
    for (const e in Je.store)
      Je.purgeSync(e);
  },
  truncate: (e) => {
    const t = Ed.basename(e);
    if (t.length <= Bo.LIMIT_BASENAME_LENGTH)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Bo.LIMIT_BASENAME_LENGTH;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
process.on("exit", Je.purgeSyncAll);
oa.default = Je;
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.writeFileSync = pt.writeFile = pt.readFileSync = pt.readFile = void 0;
const Tc = Zt, Re = le, ce = qn, Xe = sa, wd = aa, jt = oa;
function Ic(e, t = Re.DEFAULT_READ_OPTIONS) {
  var r;
  if (Xe.default.isString(t))
    return Ic(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Re.DEFAULT_TIMEOUT_ASYNC);
  return ce.default.readFileRetry(n)(e, t);
}
pt.readFile = Ic;
function jc(e, t = Re.DEFAULT_READ_OPTIONS) {
  var r;
  if (Xe.default.isString(t))
    return jc(e, { encoding: t });
  const n = Date.now() + ((r = t.timeout) !== null && r !== void 0 ? r : Re.DEFAULT_TIMEOUT_SYNC);
  return ce.default.readFileSyncRetry(n)(e, t);
}
pt.readFileSync = jc;
const Ac = (e, t, r, n) => {
  if (Xe.default.isFunction(r))
    return Ac(e, t, Re.DEFAULT_WRITE_OPTIONS, r);
  const s = kc(e, t, r);
  return n && s.then(n, n), s;
};
pt.writeFile = Ac;
const kc = async (e, t, r = Re.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Xe.default.isString(r))
    return kc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Re.DEFAULT_TIMEOUT_ASYNC);
  let a = null, i = null, c = null, l = null, d = null;
  try {
    r.schedule && (a = await r.schedule(e)), i = await wd.default.schedule(e), e = await ce.default.realpathAttempt(e) || e, [l, c] = jt.default.get(e, r.tmpCreate || jt.default.create, r.tmpPurge !== !1);
    const u = Re.IS_POSIX && Xe.default.isUndefined(r.chown), h = Xe.default.isUndefined(r.mode);
    if (u || h) {
      const y = await ce.default.statAttempt(e);
      y && (r = { ...r }, u && (r.chown = { uid: y.uid, gid: y.gid }), h && (r.mode = y.mode));
    }
    const w = Tc.dirname(e);
    await ce.default.mkdirAttempt(w, {
      mode: Re.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), d = await ce.default.openRetry(s)(l, "w", r.mode || Re.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(l), Xe.default.isString(t) ? await ce.default.writeRetry(s)(d, t, 0, r.encoding || Re.DEFAULT_ENCODING) : Xe.default.isUndefined(t) || await ce.default.writeRetry(s)(d, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? await ce.default.fsyncRetry(s)(d) : ce.default.fsyncAttempt(d)), await ce.default.closeRetry(s)(d), d = null, r.chown && await ce.default.chownAttempt(l, r.chown.uid, r.chown.gid), r.mode && await ce.default.chmodAttempt(l, r.mode);
    try {
      await ce.default.renameRetry(s)(l, e);
    } catch (y) {
      if (y.code !== "ENAMETOOLONG")
        throw y;
      await ce.default.renameRetry(s)(l, jt.default.truncate(e));
    }
    c(), l = null;
  } finally {
    d && await ce.default.closeAttempt(d), l && jt.default.purge(l), a && a(), i && i();
  }
}, Cc = (e, t, r = Re.DEFAULT_WRITE_OPTIONS) => {
  var n;
  if (Xe.default.isString(r))
    return Cc(e, t, { encoding: r });
  const s = Date.now() + ((n = r.timeout) !== null && n !== void 0 ? n : Re.DEFAULT_TIMEOUT_SYNC);
  let a = null, i = null, c = null;
  try {
    e = ce.default.realpathSyncAttempt(e) || e, [i, a] = jt.default.get(e, r.tmpCreate || jt.default.create, r.tmpPurge !== !1);
    const l = Re.IS_POSIX && Xe.default.isUndefined(r.chown), d = Xe.default.isUndefined(r.mode);
    if (l || d) {
      const h = ce.default.statSyncAttempt(e);
      h && (r = { ...r }, l && (r.chown = { uid: h.uid, gid: h.gid }), d && (r.mode = h.mode));
    }
    const u = Tc.dirname(e);
    ce.default.mkdirSyncAttempt(u, {
      mode: Re.DEFAULT_FOLDER_MODE,
      recursive: !0
    }), c = ce.default.openSyncRetry(s)(i, "w", r.mode || Re.DEFAULT_FILE_MODE), r.tmpCreated && r.tmpCreated(i), Xe.default.isString(t) ? ce.default.writeSyncRetry(s)(c, t, 0, r.encoding || Re.DEFAULT_ENCODING) : Xe.default.isUndefined(t) || ce.default.writeSyncRetry(s)(c, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? ce.default.fsyncSyncRetry(s)(c) : ce.default.fsyncAttempt(c)), ce.default.closeSyncRetry(s)(c), c = null, r.chown && ce.default.chownSyncAttempt(i, r.chown.uid, r.chown.gid), r.mode && ce.default.chmodSyncAttempt(i, r.mode);
    try {
      ce.default.renameSyncRetry(s)(i, e);
    } catch (h) {
      if (h.code !== "ENAMETOOLONG")
        throw h;
      ce.default.renameSyncRetry(s)(i, jt.default.truncate(e));
    }
    a(), i = null;
  } finally {
    c && ce.default.closeSyncAttempt(c), i && jt.default.purge(i);
  }
};
pt.writeFileSync = Cc;
var Ns = { exports: {} }, Dc = {}, it = {}, hr = {}, Hr = {}, ie = {}, Kr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(v) {
      if (super(), !e.IDENTIFIER.test(v))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = v;
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
    constructor(v) {
      super(), this._items = typeof v == "string" ? [v] : v;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const v = this._items[0];
      return v === "" || v === '""';
    }
    get str() {
      var v;
      return (v = this._str) !== null && v !== void 0 ? v : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var v;
      return (v = this._names) !== null && v !== void 0 ? v : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...v) {
    const N = [p[0]];
    let R = 0;
    for (; R < v.length; )
      c(N, v[R]), N.push(p[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(p, ...v) {
    const N = [y(p[0])];
    let R = 0;
    for (; R < v.length; )
      N.push(a), c(N, v[R]), N.push(a, y(p[++R]));
    return l(N), new n(N);
  }
  e.str = i;
  function c(p, v) {
    v instanceof n ? p.push(...v._items) : v instanceof r ? p.push(v) : p.push(h(v));
  }
  e.addCodeArg = c;
  function l(p) {
    let v = 1;
    for (; v < p.length - 1; ) {
      if (p[v] === a) {
        const N = d(p[v - 1], p[v + 1]);
        if (N !== void 0) {
          p.splice(v - 1, 3, N);
          continue;
        }
        p[v++] = "+";
      }
      v++;
    }
  }
  function d(p, v) {
    if (v === '""')
      return p;
    if (p === '""')
      return v;
    if (typeof p == "string")
      return v instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof v != "string" ? `${p.slice(0, -1)}${v}"` : v[0] === '"' ? p.slice(0, -1) + v.slice(1) : void 0;
    if (typeof v == "string" && v[0] === '"' && !(p instanceof r))
      return `"${p}${v.slice(1)}`;
  }
  function u(p, v) {
    return v.emptyStr() ? p : p.emptyStr() ? v : i`${p}${v}`;
  }
  e.strConcat = u;
  function h(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : y(Array.isArray(p) ? p.join(",") : p);
  }
  function w(p) {
    return new n(y(p));
  }
  e.stringify = w;
  function y(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = y;
  function E(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = E;
  function g(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function _(p) {
    return new n(p.toString());
  }
  e.regexpCode = _;
})(Kr);
var Os = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Kr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(l) {
    l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
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
  const i = (0, t._)`\n`;
  class c extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
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
      const w = this.toName(d), { prefix: y } = w, E = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let g = this._values[y];
      if (g) {
        const v = g.get(E);
        if (v)
          return v;
      } else
        g = this._values[y] = /* @__PURE__ */ new Map();
      g.set(E, w);
      const _ = this._scope[y] || (this._scope[y] = []), p = _.length;
      return _[p] = u.ref, w.setValue(u, { property: y, itemIndex: p }), w;
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
      return this._reduceValues(d, (w) => {
        if (w.value === void 0)
          throw new Error(`CodeGen: name "${w}" has no value`);
        return w.value.code;
      }, u, h);
    }
    _reduceValues(d, u, h = {}, w) {
      let y = t.nil;
      for (const E in d) {
        const g = d[E];
        if (!g)
          continue;
        const _ = h[E] = h[E] || /* @__PURE__ */ new Map();
        g.forEach((p) => {
          if (_.has(p))
            return;
          _.set(p, n.Started);
          let v = u(p);
          if (v) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            y = (0, t._)`${y}${N} ${p} = ${v};${this.opts._n}`;
          } else if (v = w == null ? void 0 : w(p))
            y = (0, t._)`${y}${v}${this.opts._n}`;
          else
            throw new r(p);
          _.set(p, n.Completed);
        });
      }
      return y;
    }
  }
  e.ValueScope = c;
})(Os);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Kr, r = Os;
  var n = Kr;
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
  var s = Os;
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
      const P = o ? r.varKinds.var : this.varKind, k = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${k};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = M(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class c extends a {
    constructor(o, f, P) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = P;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = M(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return x(o, this.rhs);
    }
  }
  class l extends c {
    constructor(o, f, P, k) {
      super(o, P, k), this.op = f;
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
  class u extends a {
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
  class w extends a {
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
      return this.code = M(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class y extends a {
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
      let k = P.length;
      for (; k--; ) {
        const C = P[k];
        C.optimizeNames(o, f) || (L(o, C.names), P.splice(k, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class E extends y {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends y {
  }
  class _ extends E {
  }
  _.kind = "else";
  class p extends E {
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
        f = this.else = Array.isArray(P) ? new _(P) : P;
      }
      if (f)
        return o === !1 ? f instanceof p ? f : f.nodes : this.nodes.length ? this : new p(B(o), f instanceof p ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = M(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return x(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  p.kind = "if";
  class v extends E {
  }
  v.kind = "for";
  class N extends v {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = M(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends v {
    constructor(o, f, P, k) {
      super(), this.varKind = o, this.name = f, this.from = P, this.to = k;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: P, from: k, to: C } = this;
      return `for(${f} ${P}=${k}; ${P}<${C}; ${P}++)` + super.render(o);
    }
    get names() {
      const o = x(super.names, this.from);
      return x(o, this.to);
    }
  }
  class j extends v {
    constructor(o, f, P, k) {
      super(), this.loop = o, this.varKind = f, this.name = P, this.iterable = k;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = M(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class F extends E {
    constructor(o, f, P) {
      super(), this.name = o, this.args = f, this.async = P;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  F.kind = "func";
  class q extends y {
    render(o) {
      return "return " + super.render(o);
    }
  }
  q.kind = "return";
  class te extends E {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var P, k;
      return super.optimizeNames(o, f), (P = this.catch) === null || P === void 0 || P.optimizeNames(o, f), (k = this.finally) === null || k === void 0 || k.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class z extends E {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  z.kind = "catch";
  class J extends E {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  J.kind = "finally";
  class ee {
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
    _def(o, f, P, k) {
      const C = this._scope.toName(f);
      return P !== void 0 && k && (this._constants[C.str] = P), this._leafNode(new i(o, C, P)), C;
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
      return this._leafNode(new c(o, f, P));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new l(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new w(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [P, k] of o)
        f.length > 1 && f.push(","), f.push(P), (P !== k || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, k));
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
      return this._elseNode(new _());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, _);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, P, k, C = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const X = this._scope.toName(o);
      return this._for(new R(C, X, f, P), () => k(X));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, P, k = r.varKinds.const) {
      const C = this._scope.toName(o);
      if (this.opts.es5) {
        const X = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${X}.length`, (H) => {
          this.var(C, (0, t._)`${X}[${H}]`), P(C);
        });
      }
      return this._for(new j("of", k, C, f), () => P(C));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, P, k = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, P);
      const C = this._scope.toName(o);
      return this._for(new j("in", k, C, f), () => P(C));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(v);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new u(o));
    }
    // `return` statement
    return(o) {
      const f = new q();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(q);
    }
    // `try` statement
    try(o, f, P) {
      if (!f && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const k = new te();
      if (this._blockNode(k), this.code(o), f) {
        const C = this.name("e");
        this._currNode = k.catch = new z(C), f(C);
      }
      return P && (this._currNode = k.finally = new J(), this.code(P)), this._endBlockNode(z, J);
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
    func(o, f = t.nil, P, k) {
      return this._blockNode(new F(o, f, P)), k && this.code(k).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(F);
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
  e.CodeGen = ee;
  function Q($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) + (o[f] || 0);
    return $;
  }
  function x($, o) {
    return o instanceof t._CodeOrName ? Q($, o.names) : $;
  }
  function M($, o, f) {
    if ($ instanceof t.Name)
      return P($);
    if (!k($))
      return $;
    return new t._Code($._items.reduce((C, X) => (X instanceof t.Name && (X = P(X)), X instanceof t._Code ? C.push(...X._items) : C.push(X), C), []));
    function P(C) {
      const X = f[C.str];
      return X === void 0 || o[C.str] !== 1 ? C : (delete o[C.str], X);
    }
    function k(C) {
      return C instanceof t._Code && C._items.some((X) => X instanceof t.Name && o[X.str] === 1 && f[X.str] !== void 0);
    }
  }
  function L($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) - (o[f] || 0);
  }
  function B($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${b($)}`;
  }
  e.not = B;
  const U = m(e.operators.AND);
  function I(...$) {
    return $.reduce(U);
  }
  e.and = I;
  const A = m(e.operators.OR);
  function S(...$) {
    return $.reduce(A);
  }
  e.or = S;
  function m($) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${b(o)} ${$} ${b(f)}`;
  }
  function b($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(ie);
var K = {};
Object.defineProperty(K, "__esModule", { value: !0 });
K.checkStrictMode = K.getErrorPath = K.Type = K.useFunc = K.setEvaluated = K.evaluatedPropsToName = K.mergeEvaluated = K.eachItem = K.unescapeJsonPointer = K.escapeJsonPointer = K.escapeFragment = K.unescapeFragment = K.schemaRefOrVal = K.schemaHasRulesButRef = K.schemaHasRules = K.checkUnknownRules = K.alwaysValidSchema = K.toHash = void 0;
const fe = ie, Sd = Kr;
function bd(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
K.toHash = bd;
function Pd(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Mc(e, t), !Lc(t, e.self.RULES.all));
}
K.alwaysValidSchema = Pd;
function Mc(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Uc(e, `unknown keyword: "${a}"`);
}
K.checkUnknownRules = Mc;
function Lc(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
K.schemaHasRules = Lc;
function Nd(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
K.schemaHasRulesButRef = Nd;
function Od({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, fe._)`${r}`;
  }
  return (0, fe._)`${e}${t}${(0, fe.getProperty)(n)}`;
}
K.schemaRefOrVal = Od;
function Rd(e) {
  return Fc(decodeURIComponent(e));
}
K.unescapeFragment = Rd;
function Td(e) {
  return encodeURIComponent(ia(e));
}
K.escapeFragment = Td;
function ia(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
K.escapeJsonPointer = ia;
function Fc(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
K.unescapeJsonPointer = Fc;
function Id(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
K.eachItem = Id;
function Xo({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, c) => {
    const l = i === void 0 ? a : i instanceof fe.Name ? (a instanceof fe.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof fe.Name ? (t(s, i, a), a) : r(a, i);
    return c === fe.Name && !(l instanceof fe.Name) ? n(s, l) : l;
  };
}
K.mergeEvaluated = {
  props: Xo({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, fe._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, fe._)`${r} || {}`).code((0, fe._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, fe._)`${r} || {}`), ca(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Vc
  }),
  items: Xo({
    mergeNames: (e, t, r) => e.if((0, fe._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, fe._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, fe._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, fe._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Vc(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, fe._)`{}`);
  return t !== void 0 && ca(e, r, t), r;
}
K.evaluatedPropsToName = Vc;
function ca(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, fe._)`${t}${(0, fe.getProperty)(n)}`, !0));
}
K.setEvaluated = ca;
const Wo = {};
function jd(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: Wo[t.code] || (Wo[t.code] = new Sd._Code(t.code))
  });
}
K.useFunc = jd;
var Rs;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Rs || (K.Type = Rs = {}));
function Ad(e, t, r) {
  if (e instanceof fe.Name) {
    const n = t === Rs.Num;
    return r ? n ? (0, fe._)`"[" + ${e} + "]"` : (0, fe._)`"['" + ${e} + "']"` : n ? (0, fe._)`"/" + ${e}` : (0, fe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, fe.getProperty)(e).toString() : "/" + ia(e);
}
K.getErrorPath = Ad;
function Uc(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
K.checkStrictMode = Uc;
var $t = {};
Object.defineProperty($t, "__esModule", { value: !0 });
const Ae = ie, kd = {
  // validation function arguments
  data: new Ae.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Ae.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Ae.Name("instancePath"),
  parentData: new Ae.Name("parentData"),
  parentDataProperty: new Ae.Name("parentDataProperty"),
  rootData: new Ae.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Ae.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Ae.Name("vErrors"),
  // null or array of validation errors
  errors: new Ae.Name("errors"),
  // counter of validation errors
  this: new Ae.Name("this"),
  // "globals"
  self: new Ae.Name("self"),
  scope: new Ae.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Ae.Name("json"),
  jsonPos: new Ae.Name("jsonPos"),
  jsonLen: new Ae.Name("jsonLen"),
  jsonPart: new Ae.Name("jsonPart")
};
$t.default = kd;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ie, r = K, n = $t;
  e.keywordError = {
    message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: _, schemaType: p }) => p ? (0, t.str)`"${_}" keyword must be ${p} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
  };
  function s(_, p = e.keywordError, v, N) {
    const { it: R } = _, { gen: j, compositeRule: F, allErrors: q } = R, te = h(_, p, v);
    N ?? (F || q) ? l(j, te) : d(R, (0, t._)`[${te}]`);
  }
  e.reportError = s;
  function a(_, p = e.keywordError, v) {
    const { it: N } = _, { gen: R, compositeRule: j, allErrors: F } = N, q = h(_, p, v);
    l(R, q), j || F || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(_, p) {
    _.assign(n.default.errors, p), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(p, () => _.assign((0, t._)`${n.default.vErrors}.length`, p), () => _.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function c({ gen: _, keyword: p, schemaValue: v, data: N, errsCount: R, it: j }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const F = _.name("err");
    _.forRange("i", R, n.default.errors, (q) => {
      _.const(F, (0, t._)`${n.default.vErrors}[${q}]`), _.if((0, t._)`${F}.instancePath === undefined`, () => _.assign((0, t._)`${F}.instancePath`, (0, t.strConcat)(n.default.instancePath, j.errorPath))), _.assign((0, t._)`${F}.schemaPath`, (0, t.str)`${j.errSchemaPath}/${p}`), j.opts.verbose && (_.assign((0, t._)`${F}.schema`, v), _.assign((0, t._)`${F}.data`, N));
    });
  }
  e.extendErrors = c;
  function l(_, p) {
    const v = _.const("err", p);
    _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${v}]`), (0, t._)`${n.default.vErrors}.push(${v})`), _.code((0, t._)`${n.default.errors}++`);
  }
  function d(_, p) {
    const { gen: v, validateName: N, schemaEnv: R } = _;
    R.$async ? v.throw((0, t._)`new ${_.ValidationError}(${p})`) : (v.assign((0, t._)`${N}.errors`, p), v.return(!1));
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
  function h(_, p, v) {
    const { createErrors: N } = _.it;
    return N === !1 ? (0, t._)`{}` : w(_, p, v);
  }
  function w(_, p, v = {}) {
    const { gen: N, it: R } = _, j = [
      y(R, v),
      E(_, v)
    ];
    return g(_, p, j), N.object(...j);
  }
  function y({ errorPath: _ }, { instancePath: p }) {
    const v = p ? (0, t.str)`${_}${(0, r.getErrorPath)(p, r.Type.Str)}` : _;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, v)];
  }
  function E({ keyword: _, it: { errSchemaPath: p } }, { schemaPath: v, parentSchema: N }) {
    let R = N ? p : (0, t.str)`${p}/${_}`;
    return v && (R = (0, t.str)`${R}${(0, r.getErrorPath)(v, r.Type.Str)}`), [u.schemaPath, R];
  }
  function g(_, { params: p, message: v }, N) {
    const { keyword: R, data: j, schemaValue: F, it: q } = _, { opts: te, propertyName: z, topSchemaRef: J, schemaPath: ee } = q;
    N.push([u.keyword, R], [u.params, typeof p == "function" ? p(_) : p || (0, t._)`{}`]), te.messages && N.push([u.message, typeof v == "function" ? v(_) : v]), te.verbose && N.push([u.schema, F], [u.parentSchema, (0, t._)`${J}${ee}`], [n.default.data, j]), z && N.push([u.propertyName, z]);
  }
})(Hr);
Object.defineProperty(hr, "__esModule", { value: !0 });
hr.boolOrEmptySchema = hr.topBoolOrEmptySchema = void 0;
const Cd = Hr, Dd = ie, Md = $t, Ld = {
  message: "boolean schema is false"
};
function Fd(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? zc(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(Md.default.data) : (t.assign((0, Dd._)`${n}.errors`, null), t.return(!0));
}
hr.topBoolOrEmptySchema = Fd;
function Vd(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), zc(e)) : r.var(t, !0);
}
hr.boolOrEmptySchema = Vd;
function zc(e, t) {
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
  (0, Cd.reportError)(s, Ld, void 0, t);
}
var Ee = {}, Xt = {};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.getRules = Xt.isJSONType = void 0;
const Ud = ["string", "number", "integer", "boolean", "null", "object", "array"], zd = new Set(Ud);
function qd(e) {
  return typeof e == "string" && zd.has(e);
}
Xt.isJSONType = qd;
function Kd() {
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
Xt.getRules = Kd;
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.shouldUseRule = Et.shouldUseGroup = Et.schemaHasRulesForType = void 0;
function Gd({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && qc(e, n);
}
Et.schemaHasRulesForType = Gd;
function qc(e, t) {
  return t.rules.some((r) => Kc(e, r));
}
Et.shouldUseGroup = qc;
function Kc(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Et.shouldUseRule = Kc;
Object.defineProperty(Ee, "__esModule", { value: !0 });
Ee.reportTypeError = Ee.checkDataTypes = Ee.checkDataType = Ee.coerceAndCheckDataType = Ee.getJSONTypes = Ee.getSchemaTypes = Ee.DataType = void 0;
const Hd = Xt, Bd = Et, Jd = Hr, ne = ie, Gc = K;
var or;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(or || (Ee.DataType = or = {}));
function Xd(e) {
  const t = Hc(e.type);
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
Ee.getSchemaTypes = Xd;
function Hc(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Hd.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ee.getJSONTypes = Hc;
function Wd(e, t) {
  const { gen: r, data: n, opts: s } = e, a = Yd(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, Bd.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const c = la(t, n, s.strictNumbers, or.Wrong);
    r.if(c, () => {
      a.length ? Qd(e, t, a) : ua(e);
    });
  }
  return i;
}
Ee.coerceAndCheckDataType = Wd;
const Bc = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Yd(e, t) {
  return t ? e.filter((r) => Bc.has(r) || t === "array" && r === "array") : [];
}
function Qd(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, ne._)`typeof ${s}`), c = n.let("coerced", (0, ne._)`undefined`);
  a.coerceTypes === "array" && n.if((0, ne._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, ne._)`${s}[0]`).assign(i, (0, ne._)`typeof ${s}`).if(la(t, s, a.strictNumbers), () => n.assign(c, s))), n.if((0, ne._)`${c} !== undefined`);
  for (const d of r)
    (Bc.has(d) || d === "array" && a.coerceTypes === "array") && l(d);
  n.else(), ua(e), n.endIf(), n.if((0, ne._)`${c} !== undefined`, () => {
    n.assign(s, c), Zd(e, c);
  });
  function l(d) {
    switch (d) {
      case "string":
        n.elseIf((0, ne._)`${i} == "number" || ${i} == "boolean"`).assign(c, (0, ne._)`"" + ${s}`).elseIf((0, ne._)`${s} === null`).assign(c, (0, ne._)`""`);
        return;
      case "number":
        n.elseIf((0, ne._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(c, (0, ne._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, ne._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(c, (0, ne._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, ne._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(c, !1).elseIf((0, ne._)`${s} === "true" || ${s} === 1`).assign(c, !0);
        return;
      case "null":
        n.elseIf((0, ne._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(c, null);
        return;
      case "array":
        n.elseIf((0, ne._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(c, (0, ne._)`[${s}]`);
    }
  }
}
function Zd({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ne._)`${t} !== undefined`, () => e.assign((0, ne._)`${t}[${r}]`, n));
}
function Ts(e, t, r, n = or.Correct) {
  const s = n === or.Correct ? ne.operators.EQ : ne.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, ne._)`${t} ${s} null`;
    case "array":
      a = (0, ne._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, ne._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, ne._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, ne._)`typeof ${t} ${s} ${e}`;
  }
  return n === or.Correct ? a : (0, ne.not)(a);
  function i(c = ne.nil) {
    return (0, ne.and)((0, ne._)`typeof ${t} == "number"`, c, r ? (0, ne._)`isFinite(${t})` : ne.nil);
  }
}
Ee.checkDataType = Ts;
function la(e, t, r, n) {
  if (e.length === 1)
    return Ts(e[0], t, r, n);
  let s;
  const a = (0, Gc.toHash)(e);
  if (a.array && a.object) {
    const i = (0, ne._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, ne._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = ne.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, ne.and)(s, Ts(i, t, r, n));
  return s;
}
Ee.checkDataTypes = la;
const xd = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ne._)`{type: ${e}}` : (0, ne._)`{type: ${t}}`
};
function ua(e) {
  const t = ef(e);
  (0, Jd.reportError)(t, xd);
}
Ee.reportTypeError = ua;
function ef(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Gc.schemaRefOrVal)(e, n, "type");
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
var Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.assignDefaults = void 0;
const xt = ie, tf = K;
function rf(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Yo(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Yo(e, a, s.default));
}
Kn.assignDefaults = rf;
function Yo(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: i } = e;
  if (r === void 0)
    return;
  const c = (0, xt._)`${a}${(0, xt.getProperty)(t)}`;
  if (s) {
    (0, tf.checkStrictMode)(e, `default is ignored for: ${c}`);
    return;
  }
  let l = (0, xt._)`${c} === undefined`;
  i.useDefaults === "empty" && (l = (0, xt._)`${l} || ${c} === null || ${c} === ""`), n.if(l, (0, xt._)`${c} = ${(0, xt.stringify)(r)}`);
}
var mt = {}, oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.validateUnion = oe.validateArray = oe.usePattern = oe.callValidateCode = oe.schemaProperties = oe.allSchemaProperties = oe.noPropertyInData = oe.propertyInData = oe.isOwnProperty = oe.hasPropFunc = oe.reportMissingProp = oe.checkMissingProp = oe.checkReportMissingProp = void 0;
const me = ie, da = K, Pt = $t, nf = K;
function sf(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(ha(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, me._)`${t}` }, !0), e.error();
  });
}
oe.checkReportMissingProp = sf;
function af({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, me.or)(...n.map((a) => (0, me.and)(ha(e, t, a, r.ownProperties), (0, me._)`${s} = ${a}`)));
}
oe.checkMissingProp = af;
function of(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
oe.reportMissingProp = of;
function Jc(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, me._)`Object.prototype.hasOwnProperty`
  });
}
oe.hasPropFunc = Jc;
function fa(e, t, r) {
  return (0, me._)`${Jc(e)}.call(${t}, ${r})`;
}
oe.isOwnProperty = fa;
function cf(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} !== undefined`;
  return n ? (0, me._)`${s} && ${fa(e, t, r)}` : s;
}
oe.propertyInData = cf;
function ha(e, t, r, n) {
  const s = (0, me._)`${t}${(0, me.getProperty)(r)} === undefined`;
  return n ? (0, me.or)(s, (0, me.not)(fa(e, t, r))) : s;
}
oe.noPropertyInData = ha;
function Xc(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
oe.allSchemaProperties = Xc;
function lf(e, t) {
  return Xc(t).filter((r) => !(0, da.alwaysValidSchema)(e, t[r]));
}
oe.schemaProperties = lf;
function uf({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: i }, c, l, d) {
  const u = d ? (0, me._)`${e}, ${t}, ${n}${s}` : t, h = [
    [Pt.default.instancePath, (0, me.strConcat)(Pt.default.instancePath, a)],
    [Pt.default.parentData, i.parentData],
    [Pt.default.parentDataProperty, i.parentDataProperty],
    [Pt.default.rootData, Pt.default.rootData]
  ];
  i.opts.dynamicRef && h.push([Pt.default.dynamicAnchors, Pt.default.dynamicAnchors]);
  const w = (0, me._)`${u}, ${r.object(...h)}`;
  return l !== me.nil ? (0, me._)`${c}.call(${l}, ${w})` : (0, me._)`${c}(${w})`;
}
oe.callValidateCode = uf;
const df = (0, me._)`new RegExp`;
function ff({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, me._)`${s.code === "new RegExp" ? df : (0, nf.useFunc)(e, s)}(${r}, ${n})`
  });
}
oe.usePattern = ff;
function hf(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const c = t.let("valid", !0);
    return i(() => t.assign(c, !1)), c;
  }
  return t.var(a, !0), i(() => t.break()), a;
  function i(c) {
    const l = t.const("len", (0, me._)`${r}.length`);
    t.forRange("i", 0, l, (d) => {
      e.subschema({
        keyword: n,
        dataProp: d,
        dataPropType: da.Type.Num
      }, a), t.if((0, me.not)(a), c);
    });
  }
}
oe.validateArray = hf;
function pf(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((l) => (0, da.alwaysValidSchema)(s, l)) && !s.opts.unevaluated)
    return;
  const i = t.let("valid", !1), c = t.name("_valid");
  t.block(() => r.forEach((l, d) => {
    const u = e.subschema({
      keyword: n,
      schemaProp: d,
      compositeRule: !0
    }, c);
    t.assign(i, (0, me._)`${i} || ${c}`), e.mergeValidEvaluated(u, c) || t.if((0, me.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
oe.validateUnion = pf;
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.validateKeywordUsage = mt.validSchemaType = mt.funcKeywordCode = mt.macroKeywordCode = void 0;
const Le = ie, Kt = $t, mf = oe, yf = Hr;
function $f(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: i } = e, c = t.macro.call(i.self, s, a, i), l = Wc(r, n, c);
  i.opts.validateSchema !== !1 && i.self.validateSchema(c, !0);
  const d = r.name("valid");
  e.subschema({
    schema: c,
    schemaPath: Le.nil,
    errSchemaPath: `${i.errSchemaPath}/${n}`,
    topSchemaRef: l,
    compositeRule: !0
  }, d), e.pass(d, () => e.error(!0));
}
mt.macroKeywordCode = $f;
function _f(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: i, $data: c, it: l } = e;
  vf(l, t);
  const d = !c && t.compile ? t.compile.call(l.self, a, i, l) : t.validate, u = Wc(n, s, d), h = n.let("valid");
  e.block$data(h, w), e.ok((r = t.valid) !== null && r !== void 0 ? r : h);
  function w() {
    if (t.errors === !1)
      g(), t.modifying && Qo(e), _(() => e.error());
    else {
      const p = t.async ? y() : E();
      t.modifying && Qo(e), _(() => gf(e, p));
    }
  }
  function y() {
    const p = n.let("ruleErrs", null);
    return n.try(() => g((0, Le._)`await `), (v) => n.assign(h, !1).if((0, Le._)`${v} instanceof ${l.ValidationError}`, () => n.assign(p, (0, Le._)`${v}.errors`), () => n.throw(v))), p;
  }
  function E() {
    const p = (0, Le._)`${u}.errors`;
    return n.assign(p, null), g(Le.nil), p;
  }
  function g(p = t.async ? (0, Le._)`await ` : Le.nil) {
    const v = l.opts.passContext ? Kt.default.this : Kt.default.self, N = !("compile" in t && !c || t.schema === !1);
    n.assign(h, (0, Le._)`${p}${(0, mf.callValidateCode)(e, u, v, N)}`, t.modifying);
  }
  function _(p) {
    var v;
    n.if((0, Le.not)((v = t.valid) !== null && v !== void 0 ? v : h), p);
  }
}
mt.funcKeywordCode = _f;
function Qo(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Le._)`${n.parentData}[${n.parentDataProperty}]`));
}
function gf(e, t) {
  const { gen: r } = e;
  r.if((0, Le._)`Array.isArray(${t})`, () => {
    r.assign(Kt.default.vErrors, (0, Le._)`${Kt.default.vErrors} === null ? ${t} : ${Kt.default.vErrors}.concat(${t})`).assign(Kt.default.errors, (0, Le._)`${Kt.default.vErrors}.length`), (0, yf.extendErrors)(e);
  }, () => e.error());
}
function vf({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Wc(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Le.stringify)(r) });
}
function Ef(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
mt.validSchemaType = Ef;
function wf({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const i = s.dependencies;
  if (i != null && i.some((c) => !Object.prototype.hasOwnProperty.call(e, c)))
    throw new Error(`parent schema must have dependencies of ${a}: ${i.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const l = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(l);
    else
      throw new Error(l);
  }
}
mt.validateKeywordUsage = wf;
var Ct = {};
Object.defineProperty(Ct, "__esModule", { value: !0 });
Ct.extendSubschemaMode = Ct.extendSubschemaData = Ct.getSubschema = void 0;
const ht = ie, Yc = K;
function Sf(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: i }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const c = e.schema[t];
    return r === void 0 ? {
      schema: c,
      schemaPath: (0, ht._)`${e.schemaPath}${(0, ht.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: c[r],
      schemaPath: (0, ht._)`${e.schemaPath}${(0, ht.getProperty)(t)}${(0, ht.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Yc.escapeFragment)(r)}`
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
Ct.getSubschema = Sf;
function bf(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: i }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: c } = t;
  if (r !== void 0) {
    const { errorPath: d, dataPathArr: u, opts: h } = t, w = c.let("data", (0, ht._)`${t.data}${(0, ht.getProperty)(r)}`, !0);
    l(w), e.errorPath = (0, ht.str)`${d}${(0, Yc.getErrorPath)(r, n, h.jsPropertySyntax)}`, e.parentDataProperty = (0, ht._)`${r}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const d = s instanceof ht.Name ? s : c.let("data", s, !0);
    l(d), i !== void 0 && (e.propertyName = i);
  }
  a && (e.dataTypes = a);
  function l(d) {
    e.data = d, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, d];
  }
}
Ct.extendSubschemaData = bf;
function Pf(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
Ct.extendSubschemaMode = Pf;
var Te = {}, Gn = function e(t, r) {
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
}, Qc = { exports: {} }, At = Qc.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  gn(t, n, s, e, "", e);
};
At.keywords = {
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
At.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
At.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
At.skipKeywords = {
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
function gn(e, t, r, n, s, a, i, c, l, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, c, l, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in At.arrayKeywords)
          for (var w = 0; w < h.length; w++)
            gn(e, t, r, h[w], s + "/" + u + "/" + w, a, s, u, n, w);
      } else if (u in At.propsKeywords) {
        if (h && typeof h == "object")
          for (var y in h)
            gn(e, t, r, h[y], s + "/" + u + "/" + Nf(y), a, s, u, n, y);
      } else (u in At.keywords || e.allKeys && !(u in At.skipKeywords)) && gn(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, i, c, l, d);
  }
}
function Nf(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Of = Qc.exports;
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.getSchemaRefs = Te.resolveUrl = Te.normalizeId = Te._getFullPath = Te.getFullPath = Te.inlineRef = void 0;
const Rf = K, Tf = Gn, If = Of, jf = /* @__PURE__ */ new Set([
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
function Af(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Is(e) : t ? Zc(e) <= t : !1;
}
Te.inlineRef = Af;
const kf = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Is(e) {
  for (const t in e) {
    if (kf.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Is) || typeof r == "object" && Is(r))
      return !0;
  }
  return !1;
}
function Zc(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !jf.has(r) && (typeof e[r] == "object" && (0, Rf.eachItem)(e[r], (n) => t += Zc(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function xc(e, t = "", r) {
  r !== !1 && (t = ir(t));
  const n = e.parse(t);
  return el(e, n);
}
Te.getFullPath = xc;
function el(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Te._getFullPath = el;
const Cf = /#\/?$/;
function ir(e) {
  return e ? e.replace(Cf, "") : "";
}
Te.normalizeId = ir;
function Df(e, t, r) {
  return r = ir(r), e.resolve(t, r);
}
Te.resolveUrl = Df;
const Mf = /^[a-z_][-a-z0-9._]*$/i;
function Lf(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = ir(e[r] || t), a = { "": s }, i = xc(n, s, !1), c = {}, l = /* @__PURE__ */ new Set();
  return If(e, { allKeys: !0 }, (h, w, y, E) => {
    if (E === void 0)
      return;
    const g = i + w;
    let _ = a[E];
    typeof h[r] == "string" && (_ = p.call(this, h[r])), v.call(this, h.$anchor), v.call(this, h.$dynamicAnchor), a[w] = _;
    function p(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = ir(_ ? R(_, N) : N), l.has(N))
        throw u(N);
      l.add(N);
      let j = this.refs[N];
      return typeof j == "string" && (j = this.refs[j]), typeof j == "object" ? d(h, j.schema, N) : N !== ir(g) && (N[0] === "#" ? (d(h, c[N], N), c[N] = h) : this.refs[N] = g), N;
    }
    function v(N) {
      if (typeof N == "string") {
        if (!Mf.test(N))
          throw new Error(`invalid anchor "${N}"`);
        p.call(this, `#${N}`);
      }
    }
  }), c;
  function d(h, w, y) {
    if (w !== void 0 && !Tf(h, w))
      throw u(y);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Te.getSchemaRefs = Lf;
Object.defineProperty(it, "__esModule", { value: !0 });
it.getData = it.KeywordCxt = it.validateFunctionCode = void 0;
const tl = hr, Zo = Ee, pa = Et, jn = Ee, Ff = Kn, Cr = mt, ls = Ct, Y = ie, Z = $t, Vf = Te, wt = K, Pr = Hr;
function Uf(e) {
  if (sl(e) && (al(e), nl(e))) {
    Kf(e);
    return;
  }
  rl(e, () => (0, tl.topBoolOrEmptySchema)(e));
}
it.validateFunctionCode = Uf;
function rl({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, Y._)`${Z.default.data}, ${Z.default.valCxt}`, n.$async, () => {
    e.code((0, Y._)`"use strict"; ${xo(r, s)}`), qf(e, s), e.code(a);
  }) : e.func(t, (0, Y._)`${Z.default.data}, ${zf(s)}`, n.$async, () => e.code(xo(r, s)).code(a));
}
function zf(e) {
  return (0, Y._)`{${Z.default.instancePath}="", ${Z.default.parentData}, ${Z.default.parentDataProperty}, ${Z.default.rootData}=${Z.default.data}${e.dynamicRef ? (0, Y._)`, ${Z.default.dynamicAnchors}={}` : Y.nil}}={}`;
}
function qf(e, t) {
  e.if(Z.default.valCxt, () => {
    e.var(Z.default.instancePath, (0, Y._)`${Z.default.valCxt}.${Z.default.instancePath}`), e.var(Z.default.parentData, (0, Y._)`${Z.default.valCxt}.${Z.default.parentData}`), e.var(Z.default.parentDataProperty, (0, Y._)`${Z.default.valCxt}.${Z.default.parentDataProperty}`), e.var(Z.default.rootData, (0, Y._)`${Z.default.valCxt}.${Z.default.rootData}`), t.dynamicRef && e.var(Z.default.dynamicAnchors, (0, Y._)`${Z.default.valCxt}.${Z.default.dynamicAnchors}`);
  }, () => {
    e.var(Z.default.instancePath, (0, Y._)`""`), e.var(Z.default.parentData, (0, Y._)`undefined`), e.var(Z.default.parentDataProperty, (0, Y._)`undefined`), e.var(Z.default.rootData, Z.default.data), t.dynamicRef && e.var(Z.default.dynamicAnchors, (0, Y._)`{}`);
  });
}
function Kf(e) {
  const { schema: t, opts: r, gen: n } = e;
  rl(e, () => {
    r.$comment && t.$comment && il(e), Xf(e), n.let(Z.default.vErrors, null), n.let(Z.default.errors, 0), r.unevaluated && Gf(e), ol(e), Qf(e);
  });
}
function Gf(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, Y._)`${r}.evaluated`), t.if((0, Y._)`${e.evaluated}.dynamicProps`, () => t.assign((0, Y._)`${e.evaluated}.props`, (0, Y._)`undefined`)), t.if((0, Y._)`${e.evaluated}.dynamicItems`, () => t.assign((0, Y._)`${e.evaluated}.items`, (0, Y._)`undefined`));
}
function xo(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, Y._)`/*# sourceURL=${r} */` : Y.nil;
}
function Hf(e, t) {
  if (sl(e) && (al(e), nl(e))) {
    Bf(e, t);
    return;
  }
  (0, tl.boolOrEmptySchema)(e, t);
}
function nl({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function sl(e) {
  return typeof e.schema != "boolean";
}
function Bf(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && il(e), Wf(e), Yf(e);
  const a = n.const("_errs", Z.default.errors);
  ol(e, a), n.var(t, (0, Y._)`${a} === ${Z.default.errors}`);
}
function al(e) {
  (0, wt.checkUnknownRules)(e), Jf(e);
}
function ol(e, t) {
  if (e.opts.jtd)
    return ei(e, [], !1, t);
  const r = (0, Zo.getSchemaTypes)(e.schema), n = (0, Zo.coerceAndCheckDataType)(e, r);
  ei(e, r, !n, t);
}
function Jf(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, wt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function Xf(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, wt.checkStrictMode)(e, "default is ignored in the schema root");
}
function Wf(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Vf.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function Yf(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function il({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, Y._)`${Z.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const i = (0, Y.str)`${n}/$comment`, c = e.scopeValue("root", { ref: t.root });
    e.code((0, Y._)`${Z.default.self}.opts.$comment(${a}, ${i}, ${c}.schema)`);
  }
}
function Qf(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, Y._)`${Z.default.errors} === 0`, () => t.return(Z.default.data), () => t.throw((0, Y._)`new ${s}(${Z.default.vErrors})`)) : (t.assign((0, Y._)`${n}.errors`, Z.default.vErrors), a.unevaluated && Zf(e), t.return((0, Y._)`${Z.default.errors} === 0`));
}
function Zf({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof Y.Name && e.assign((0, Y._)`${t}.props`, r), n instanceof Y.Name && e.assign((0, Y._)`${t}.items`, n);
}
function ei(e, t, r, n) {
  const { gen: s, schema: a, data: i, allErrors: c, opts: l, self: d } = e, { RULES: u } = d;
  if (a.$ref && (l.ignoreKeywordsWithRef || !(0, wt.schemaHasRulesButRef)(a, u))) {
    s.block(() => ul(e, "$ref", u.all.$ref.definition));
    return;
  }
  l.jtd || xf(e, t), s.block(() => {
    for (const w of u.rules)
      h(w);
    h(u.post);
  });
  function h(w) {
    (0, pa.shouldUseGroup)(a, w) && (w.type ? (s.if((0, jn.checkDataType)(w.type, i, l.strictNumbers)), ti(e, w), t.length === 1 && t[0] === w.type && r && (s.else(), (0, jn.reportTypeError)(e)), s.endIf()) : ti(e, w), c || s.if((0, Y._)`${Z.default.errors} === ${n || 0}`));
  }
}
function ti(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Ff.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, pa.shouldUseRule)(n, a) && ul(e, a.keyword, a.definition, t.type);
  });
}
function xf(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (eh(e, t), e.opts.allowUnionTypes || th(e, t), rh(e, e.dataTypes));
}
function eh(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      cl(e.dataTypes, r) || ma(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), sh(e, t);
  }
}
function th(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && ma(e, "use allowUnionTypes to allow union type keyword");
}
function rh(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, pa.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((i) => nh(t, i)) && ma(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function nh(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function cl(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function sh(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    cl(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function ma(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, wt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class ll {
  constructor(t, r, n) {
    if ((0, Cr.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, wt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", dl(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Cr.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", Z.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, Y.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, Y.not)(t), void 0, r);
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
    this.fail((0, Y._)`${r} !== undefined && (${(0, Y.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Pr.reportExtraError : Pr.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Pr.reportError)(this, this.def.$dataError || Pr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Pr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = Y.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = Y.nil, r = Y.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: i } = this;
    n.if((0, Y.or)((0, Y._)`${s} === undefined`, r)), t !== Y.nil && n.assign(t, !0), (a.length || i.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== Y.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, Y.or)(i(), c());
    function i() {
      if (n.length) {
        if (!(r instanceof Y.Name))
          throw new Error("ajv implementation error");
        const l = Array.isArray(n) ? n : [n];
        return (0, Y._)`${(0, jn.checkDataTypes)(l, r, a.opts.strictNumbers, jn.DataType.Wrong)}`;
      }
      return Y.nil;
    }
    function c() {
      if (s.validateSchema) {
        const l = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, Y._)`!${l}(${r})`;
      }
      return Y.nil;
    }
  }
  subschema(t, r) {
    const n = (0, ls.getSubschema)(this.it, t);
    (0, ls.extendSubschemaData)(n, this.it, t), (0, ls.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return Hf(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = wt.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = wt.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, Y.Name)), !0;
  }
}
it.KeywordCxt = ll;
function ul(e, t, r, n) {
  const s = new ll(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Cr.funcKeywordCode)(s, r) : "macro" in r ? (0, Cr.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Cr.funcKeywordCode)(s, r);
}
const ah = /^\/(?:[^~]|~0|~1)*$/, oh = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function dl(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return Z.default.rootData;
  if (e[0] === "/") {
    if (!ah.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = Z.default.rootData;
  } else {
    const d = oh.exec(e);
    if (!d)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +d[1];
    if (s = d[2], s === "#") {
      if (u >= t)
        throw new Error(l("property/index", u));
      return n[t - u];
    }
    if (u > t)
      throw new Error(l("data", u));
    if (a = r[t - u], !s)
      return a;
  }
  let i = a;
  const c = s.split("/");
  for (const d of c)
    d && (a = (0, Y._)`${a}${(0, Y.getProperty)((0, wt.unescapeJsonPointer)(d))}`, i = (0, Y._)`${i} && ${a}`);
  return i;
  function l(d, u) {
    return `Cannot access ${d} ${u} levels up, current level is ${t}`;
  }
}
it.getData = dl;
var Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
class ih extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Br.default = ih;
var yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
const us = Te;
let ch = class extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, us.resolveUrl)(t, r, n), this.missingSchema = (0, us.normalizeId)((0, us.getFullPath)(t, this.missingRef));
  }
};
yr.default = ch;
var Ge = {};
Object.defineProperty(Ge, "__esModule", { value: !0 });
Ge.resolveSchema = Ge.getCompilingSchema = Ge.resolveRef = Ge.compileSchema = Ge.SchemaEnv = void 0;
const xe = ie, lh = Br, Vt = $t, at = Te, ri = K, uh = it;
let Hn = class {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, at.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
Ge.SchemaEnv = Hn;
function ya(e) {
  const t = fl.call(this, e);
  if (t)
    return t;
  const r = (0, at.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new xe.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let c;
  e.$async && (c = i.scopeValue("Error", {
    ref: lh.default,
    code: (0, xe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = i.scopeName("validate");
  e.validateName = l;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: Vt.default.data,
    parentData: Vt.default.parentData,
    parentDataProperty: Vt.default.parentDataProperty,
    dataNames: [Vt.default.data],
    dataPathArr: [xe.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, xe.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: c,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: xe.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, xe._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, uh.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    u = `${i.scopeRefs(Vt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const y = new Function(`${Vt.default.self}`, `${Vt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(l, { ref: y }), y.errors = null, y.schema = e.schema, y.schemaEnv = e, e.$async && (y.$async = !0), this.opts.code.source === !0 && (y.source = { validateName: l, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: E, items: g } = d;
      y.evaluated = {
        props: E instanceof xe.Name ? void 0 : E,
        items: g instanceof xe.Name ? void 0 : g,
        dynamicProps: E instanceof xe.Name,
        dynamicItems: g instanceof xe.Name
      }, y.source && (y.source.evaluated = (0, xe.stringify)(y.evaluated));
    }
    return e.validate = y, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
Ge.compileSchema = ya;
function dh(e, t, r) {
  var n;
  r = (0, at.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = ph.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: c } = this.opts;
    i && (a = new Hn({ schema: i, schemaId: c, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = fh.call(this, a);
}
Ge.resolveRef = dh;
function fh(e) {
  return (0, at.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : ya.call(this, e);
}
function fl(e) {
  for (const t of this._compilations)
    if (hh(t, e))
      return t;
}
Ge.getCompilingSchema = fl;
function hh(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function ph(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Bn.call(this, e, t);
}
function Bn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, at._getFullPath)(this.opts.uriResolver, r);
  let s = (0, at.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return ds.call(this, r, e);
  const a = (0, at.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const c = Bn.call(this, e, i);
    return typeof (c == null ? void 0 : c.schema) != "object" ? void 0 : ds.call(this, r, c);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || ya.call(this, i), a === (0, at.normalizeId)(t)) {
      const { schema: c } = i, { schemaId: l } = this.opts, d = c[l];
      return d && (s = (0, at.resolveUrl)(this.opts.uriResolver, s, d)), new Hn({ schema: c, schemaId: l, root: e, baseId: s });
    }
    return ds.call(this, r, i);
  }
}
Ge.resolveSchema = Bn;
const mh = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function ds(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const c of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const l = r[(0, ri.unescapeFragment)(c)];
    if (l === void 0)
      return;
    r = l;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !mh.has(c) && d && (t = (0, at.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, ri.schemaHasRulesButRef)(r, this.RULES)) {
    const c = (0, at.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Bn.call(this, n, c);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Hn({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const yh = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", $h = "Meta-schema for $data reference (JSON AnySchema extension proposal)", _h = "object", gh = [
  "$data"
], vh = {
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
}, Eh = !1, wh = {
  $id: yh,
  description: $h,
  type: _h,
  required: gh,
  properties: vh,
  additionalProperties: Eh
};
var $a = {}, Jn = { exports: {} };
const Sh = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), hl = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
function pl(e) {
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
const bh = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
function ni(e) {
  return e.length = 0, !0;
}
function Ph(e, t, r) {
  if (e.length) {
    const n = pl(e);
    if (n !== "")
      t.push(n);
    else
      return r.error = !0, !1;
    e.length = 0;
  }
  return !0;
}
function Nh(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, i = !1, c = Ph;
  for (let l = 0; l < e.length; l++) {
    const d = e[l];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (a === !0 && (i = !0), !c(s, n, r))
          break;
        if (++t > 7) {
          r.error = !0;
          break;
        }
        l > 0 && e[l - 1] === ":" && (a = !0), n.push(":");
        continue;
      } else if (d === "%") {
        if (!c(s, n, r))
          break;
        c = ni;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (c === ni ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(pl(s))), r.address = n.join(""), r;
}
function ml(e) {
  if (Oh(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = Nh(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, isIPV6: !0, escapedHost: n };
  }
}
function Oh(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
function Rh(e) {
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
function Th(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function Ih(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    if (!hl(r)) {
      const n = ml(r);
      n.isIPV6 === !0 ? r = `[${n.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var yl = {
  nonSimpleDomain: bh,
  recomposeAuthority: Ih,
  normalizeComponentEncoding: Th,
  removeDotSegments: Rh,
  isIPv4: hl,
  isUUID: Sh,
  normalizeIPv6: ml
};
const { isUUID: jh } = yl, Ah = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function $l(e) {
  return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
}
function _l(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function gl(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function kh(e) {
  return e.secure = $l(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function Ch(e) {
  if ((e.port === ($l(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function Dh(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Ah);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = _a(s);
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function Mh(e, t) {
  if (e.nid === void 0)
    throw new Error("URN without nid cannot be serialized");
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = _a(s);
  a && (e = a.serialize(e, t));
  const i = e, c = e.nss;
  return i.path = `${n || t.nid}:${c}`, t.skipEscape = !0, i;
}
function Lh(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !jh(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function Fh(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const vl = (
  /** @type {SchemeHandler} */
  {
    scheme: "http",
    domainHost: !0,
    parse: _l,
    serialize: gl
  }
), Vh = (
  /** @type {SchemeHandler} */
  {
    scheme: "https",
    domainHost: vl.domainHost,
    parse: _l,
    serialize: gl
  }
), vn = (
  /** @type {SchemeHandler} */
  {
    scheme: "ws",
    domainHost: !0,
    parse: kh,
    serialize: Ch
  }
), Uh = (
  /** @type {SchemeHandler} */
  {
    scheme: "wss",
    domainHost: vn.domainHost,
    parse: vn.parse,
    serialize: vn.serialize
  }
), zh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn",
    parse: Dh,
    serialize: Mh,
    skipNormalize: !0
  }
), qh = (
  /** @type {SchemeHandler} */
  {
    scheme: "urn:uuid",
    parse: Lh,
    serialize: Fh,
    skipNormalize: !0
  }
), An = (
  /** @type {Record<SchemeName, SchemeHandler>} */
  {
    http: vl,
    https: Vh,
    ws: vn,
    wss: Uh,
    urn: zh,
    "urn:uuid": qh
  }
);
Object.setPrototypeOf(An, null);
function _a(e) {
  return e && (An[
    /** @type {SchemeName} */
    e
  ] || An[
    /** @type {SchemeName} */
    e.toLowerCase()
  ]) || void 0;
}
var Kh = {
  SCHEMES: An,
  getSchemeHandler: _a
};
const { normalizeIPv6: Gh, removeDotSegments: Ir, recomposeAuthority: Hh, normalizeComponentEncoding: en, isIPv4: Bh, nonSimpleDomain: Jh } = yl, { SCHEMES: Xh, getSchemeHandler: El } = Kh;
function Wh(e, t) {
  return typeof e == "string" ? e = /** @type {T} */
  yt(bt(e, t), t) : typeof e == "object" && (e = /** @type {T} */
  bt(yt(e, t), t)), e;
}
function Yh(e, t, r) {
  const n = r ? Object.assign({ scheme: "null" }, r) : { scheme: "null" }, s = wl(bt(e, n), bt(t, n), n, !0);
  return n.skipEscape = !0, yt(s, n);
}
function wl(e, t, r, n) {
  const s = {};
  return n || (e = bt(yt(e, r), r), t = bt(yt(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Ir(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = Ir(t.path || ""), s.query = t.query) : (t.path ? (t.path[0] === "/" ? s.path = Ir(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = Ir(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function Qh(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = yt(en(bt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = yt(en(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = yt(en(bt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = yt(en(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function yt(e, t) {
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
  }, n = Object.assign({}, t), s = [], a = El(n.scheme || r.scheme);
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const i = Hh(r);
  if (i !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(i), r.path && r.path[0] !== "/" && s.push("/")), r.path !== void 0) {
    let c = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (c = Ir(c)), i === void 0 && c[0] === "/" && c[1] === "/" && (c = "/%2F" + c.slice(2)), s.push(c);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const Zh = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function bt(e, t) {
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
  const a = e.match(Zh);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host)
      if (Bh(n.host) === !1) {
        const l = Gh(n.host);
        n.host = l.host.toLowerCase(), s = l.isIPV6;
      } else
        s = !0;
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = El(r.scheme || n.scheme);
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && s === !1 && Jh(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (c) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + c;
      }
    (!i || i && !i.skipNormalize) && (e.indexOf("%") !== -1 && (n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), n.host !== void 0 && (n.host = unescape(n.host))), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), i && i.parse && i.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const ga = {
  SCHEMES: Xh,
  normalize: Wh,
  resolve: Yh,
  resolveComponent: wl,
  equal: Qh,
  serialize: yt,
  parse: bt
};
Jn.exports = ga;
Jn.exports.default = ga;
Jn.exports.fastUri = ga;
var Sl = Jn.exports;
Object.defineProperty($a, "__esModule", { value: !0 });
const bl = Sl;
bl.code = 'require("ajv/dist/runtime/uri").default';
$a.default = bl;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = it;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ie;
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
  const n = Br, s = yr, a = Xt, i = Ge, c = ie, l = Te, d = Ee, u = K, h = wh, w = $a, y = (S, m) => new RegExp(S, m);
  y.code = "new RegExp";
  const E = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  ]), _ = {
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
  }, v = 200;
  function N(S) {
    var m, b, $, o, f, P, k, C, X, H, O, T, D, V, W, re, $e, Ce, Se, be, _e, dt, je, Dt, Mt;
    const Ze = S.strict, Lt = (m = S.code) === null || m === void 0 ? void 0 : m.optimize, Sr = Lt === !0 || Lt === void 0 ? 1 : Lt || 0, br = ($ = (b = S.code) === null || b === void 0 ? void 0 : b.regExp) !== null && $ !== void 0 ? $ : y, cs = (o = S.uriResolver) !== null && o !== void 0 ? o : w.default;
    return {
      strictSchema: (P = (f = S.strictSchema) !== null && f !== void 0 ? f : Ze) !== null && P !== void 0 ? P : !0,
      strictNumbers: (C = (k = S.strictNumbers) !== null && k !== void 0 ? k : Ze) !== null && C !== void 0 ? C : !0,
      strictTypes: (H = (X = S.strictTypes) !== null && X !== void 0 ? X : Ze) !== null && H !== void 0 ? H : "log",
      strictTuples: (T = (O = S.strictTuples) !== null && O !== void 0 ? O : Ze) !== null && T !== void 0 ? T : "log",
      strictRequired: (V = (D = S.strictRequired) !== null && D !== void 0 ? D : Ze) !== null && V !== void 0 ? V : !1,
      code: S.code ? { ...S.code, optimize: Sr, regExp: br } : { optimize: Sr, regExp: br },
      loopRequired: (W = S.loopRequired) !== null && W !== void 0 ? W : v,
      loopEnum: (re = S.loopEnum) !== null && re !== void 0 ? re : v,
      meta: ($e = S.meta) !== null && $e !== void 0 ? $e : !0,
      messages: (Ce = S.messages) !== null && Ce !== void 0 ? Ce : !0,
      inlineRefs: (Se = S.inlineRefs) !== null && Se !== void 0 ? Se : !0,
      schemaId: (be = S.schemaId) !== null && be !== void 0 ? be : "$id",
      addUsedSchema: (_e = S.addUsedSchema) !== null && _e !== void 0 ? _e : !0,
      validateSchema: (dt = S.validateSchema) !== null && dt !== void 0 ? dt : !0,
      validateFormats: (je = S.validateFormats) !== null && je !== void 0 ? je : !0,
      unicodeRegExp: (Dt = S.unicodeRegExp) !== null && Dt !== void 0 ? Dt : !0,
      int32range: (Mt = S.int32range) !== null && Mt !== void 0 ? Mt : !0,
      uriResolver: cs
    };
  }
  class R {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...N(m) };
      const { es5: b, lines: $ } = this.opts.code;
      this.scope = new c.ValueScope({ scope: {}, prefixes: g, es5: b, lines: $ }), this.logger = Q(m.logger);
      const o = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, a.getRules)(), j.call(this, _, m, "NOT SUPPORTED"), j.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = J.call(this), m.formats && te.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && z.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), q.call(this), m.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: b, schemaId: $ } = this.opts;
      let o = h;
      $ === "id" && (o = { ...h }, o.id = o.$id, delete o.$id), b && m && this.addMetaSchema(o, o[$], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: b } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[b] || m : void 0;
    }
    validate(m, b) {
      let $;
      if (typeof m == "string") {
        if ($ = this.getSchema(m), !$)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        $ = this.compile(m);
      const o = $(b);
      return "$async" in $ || (this.errors = $.errors), o;
    }
    compile(m, b) {
      const $ = this._addSchema(m, b);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(m, b) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return o.call(this, m, b);
      async function o(H, O) {
        await f.call(this, H.$schema);
        const T = this._addSchema(H, O);
        return T.validate || P.call(this, T);
      }
      async function f(H) {
        H && !this.getSchema(H) && await o.call(this, { $ref: H }, !0);
      }
      async function P(H) {
        try {
          return this._compileSchemaEnv(H);
        } catch (O) {
          if (!(O instanceof s.default))
            throw O;
          return k.call(this, O), await C.call(this, O.missingSchema), P.call(this, H);
        }
      }
      function k({ missingSchema: H, missingRef: O }) {
        if (this.refs[H])
          throw new Error(`AnySchema ${H} is loaded but ${O} cannot be resolved`);
      }
      async function C(H) {
        const O = await X.call(this, H);
        this.refs[H] || await f.call(this, O.$schema), this.refs[H] || this.addSchema(O, H, b);
      }
      async function X(H) {
        const O = this._loading[H];
        if (O)
          return O;
        try {
          return await (this._loading[H] = $(H));
        } finally {
          delete this._loading[H];
        }
      }
    }
    // Adds schema to the instance
    addSchema(m, b, $, o = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const P of m)
          this.addSchema(P, void 0, $, o);
        return this;
      }
      let f;
      if (typeof m == "object") {
        const { schemaId: P } = this.opts;
        if (f = m[P], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return b = (0, l.normalizeId)(b || f), this._checkUnique(b), this.schemas[b] = this._addSchema(m, $, b, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, b, $ = this.opts.validateSchema) {
      return this.addSchema(m, b, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, b) {
      if (typeof m == "boolean")
        return !0;
      let $;
      if ($ = m.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate($, m);
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
      for (; typeof (b = F.call(this, m)) == "string"; )
        m = b;
      if (b === void 0) {
        const { schemaId: $ } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: $ });
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
          const b = F.call(this, m);
          return typeof b == "object" && this._cache.delete(b.schema), delete this.schemas[m], delete this.refs[m], this;
        }
        case "object": {
          const b = m;
          this._cache.delete(b);
          let $ = m[this.opts.schemaId];
          return $ && ($ = (0, l.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
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
      let $;
      if (typeof m == "string")
        $ = m, typeof b == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), b.keyword = $);
      else if (typeof m == "object" && b === void 0) {
        if (b = m, $ = b.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (M.call(this, $, b), !b)
        return (0, u.eachItem)($, (f) => L.call(this, f)), this;
      U.call(this, b);
      const o = {
        ...b,
        type: (0, d.getJSONTypes)(b.type),
        schemaType: (0, d.getJSONTypes)(b.schemaType)
      };
      return (0, u.eachItem)($, o.type.length === 0 ? (f) => L.call(this, f, o) : (f) => o.type.forEach((P) => L.call(this, f, o, P))), this;
    }
    getKeyword(m) {
      const b = this.RULES.all[m];
      return typeof b == "object" ? b.definition : !!b;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: b } = this;
      delete b.keywords[m], delete b.all[m];
      for (const $ of b.rules) {
        const o = $.rules.findIndex((f) => f.keyword === m);
        o >= 0 && $.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, b) {
      return typeof b == "string" && (b = new RegExp(b)), this.formats[m] = b, this;
    }
    errorsText(m = this.errors, { separator: b = ", ", dataVar: $ = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((o) => `${$}${o.instancePath} ${o.message}`).reduce((o, f) => o + b + f);
    }
    $dataMetaSchema(m, b) {
      const $ = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const o of b) {
        const f = o.split("/").slice(1);
        let P = m;
        for (const k of f)
          P = P[k];
        for (const k in $) {
          const C = $[k];
          if (typeof C != "object")
            continue;
          const { $data: X } = C.definition, H = P[k];
          X && H && (P[k] = A(H));
        }
      }
      return m;
    }
    _removeAllSchemas(m, b) {
      for (const $ in m) {
        const o = m[$];
        (!b || b.test($)) && (typeof o == "string" ? delete m[$] : o && !o.meta && (this._cache.delete(o.schema), delete m[$]));
      }
    }
    _addSchema(m, b, $, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let P;
      const { schemaId: k } = this.opts;
      if (typeof m == "object")
        P = m[k];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof m != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let C = this._cache.get(m);
      if (C !== void 0)
        return C;
      $ = (0, l.normalizeId)(P || $);
      const X = l.getSchemaRefs.call(this, m, $);
      return C = new i.SchemaEnv({ schema: m, schemaId: k, meta: b, baseId: $, localRefs: X }), this._cache.set(C.schema, C), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = C), o && this.validateSchema(m, !0), C;
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
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function j(S, m, b, $ = "error") {
    for (const o in S) {
      const f = o;
      f in m && this.logger[$](`${b}: option ${o}. ${S[f]}`);
    }
  }
  function F(S) {
    return S = (0, l.normalizeId)(S), this.schemas[S] || this.refs[S];
  }
  function q() {
    const S = this.opts.schemas;
    if (S)
      if (Array.isArray(S))
        this.addSchema(S);
      else
        for (const m in S)
          this.addSchema(S[m], m);
  }
  function te() {
    for (const S in this.opts.formats) {
      const m = this.opts.formats[S];
      m && this.addFormat(S, m);
    }
  }
  function z(S) {
    if (Array.isArray(S)) {
      this.addVocabulary(S);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in S) {
      const b = S[m];
      b.keyword || (b.keyword = m), this.addKeyword(b);
    }
  }
  function J() {
    const S = { ...this.opts };
    for (const m of E)
      delete S[m];
    return S;
  }
  const ee = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(S) {
    if (S === !1)
      return ee;
    if (S === void 0)
      return console;
    if (S.log && S.warn && S.error)
      return S;
    throw new Error("logger must implement log, warn and error methods");
  }
  const x = /^[a-z_$][a-z0-9_$:-]*$/i;
  function M(S, m) {
    const { RULES: b } = this;
    if ((0, u.eachItem)(S, ($) => {
      if (b.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!x.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(S, m, b) {
    var $;
    const o = m == null ? void 0 : m.post;
    if (b && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let P = o ? f.post : f.rules.find(({ type: C }) => C === b);
    if (P || (P = { type: b, rules: [] }, f.rules.push(P)), f.keywords[S] = !0, !m)
      return;
    const k = {
      keyword: S,
      definition: {
        ...m,
        type: (0, d.getJSONTypes)(m.type),
        schemaType: (0, d.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? B.call(this, P, k, m.before) : P.rules.push(k), f.all[S] = k, ($ = m.implements) === null || $ === void 0 || $.forEach((C) => this.addKeyword(C));
  }
  function B(S, m, b) {
    const $ = S.rules.findIndex((o) => o.keyword === b);
    $ >= 0 ? S.rules.splice($, 0, m) : (S.rules.push(m), this.logger.warn(`rule ${b} is not defined`));
  }
  function U(S) {
    let { metaSchema: m } = S;
    m !== void 0 && (S.$data && this.opts.$data && (m = A(m)), S.validateSchema = this.compile(m, !0));
  }
  const I = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function A(S) {
    return { anyOf: [S, I] };
  }
})(Dc);
var va = {}, Ea = {}, wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
const xh = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
wa.default = xh;
var Wt = {};
Object.defineProperty(Wt, "__esModule", { value: !0 });
Wt.callRef = Wt.getValidate = void 0;
const ep = yr, si = oe, ze = ie, er = $t, ai = Ge, tn = K, tp = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: c, self: l } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = ai.resolveRef.call(l, d, s, r);
    if (u === void 0)
      throw new ep.default(n.opts.uriResolver, s, r);
    if (u instanceof ai.SchemaEnv)
      return w(u);
    return y(u);
    function h() {
      if (a === d)
        return En(e, i, a, a.$async);
      const E = t.scopeValue("root", { ref: d });
      return En(e, (0, ze._)`${E}.validate`, d, d.$async);
    }
    function w(E) {
      const g = Pl(e, E);
      En(e, g, E, E.$async);
    }
    function y(E) {
      const g = t.scopeValue("schema", c.code.source === !0 ? { ref: E, code: (0, ze.stringify)(E) } : { ref: E }), _ = t.name("valid"), p = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: ze.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, _);
      e.mergeEvaluated(p), e.ok(_);
    }
  }
};
function Pl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, ze._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Wt.getValidate = Pl;
function En(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: c, opts: l } = a, d = l.passContext ? er.default.this : ze.nil;
  n ? u() : h();
  function u() {
    if (!c.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, ze._)`await ${(0, si.callValidateCode)(e, t, d)}`), y(t), i || s.assign(E, !0);
    }, (g) => {
      s.if((0, ze._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), w(g), i || s.assign(E, !1);
    }), e.ok(E);
  }
  function h() {
    e.result((0, si.callValidateCode)(e, t, d), () => y(t), () => w(t));
  }
  function w(E) {
    const g = (0, ze._)`${E}.errors`;
    s.assign(er.default.vErrors, (0, ze._)`${er.default.vErrors} === null ? ${g} : ${er.default.vErrors}.concat(${g})`), s.assign(er.default.errors, (0, ze._)`${er.default.vErrors}.length`);
  }
  function y(E) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const _ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if (_ && !_.dynamicProps)
        _.props !== void 0 && (a.props = tn.mergeEvaluated.props(s, _.props, a.props));
      else {
        const p = s.var("props", (0, ze._)`${E}.evaluated.props`);
        a.props = tn.mergeEvaluated.props(s, p, a.props, ze.Name);
      }
    if (a.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (a.items = tn.mergeEvaluated.items(s, _.items, a.items));
      else {
        const p = s.var("items", (0, ze._)`${E}.evaluated.items`);
        a.items = tn.mergeEvaluated.items(s, p, a.items, ze.Name);
      }
  }
}
Wt.callRef = En;
Wt.default = tp;
Object.defineProperty(Ea, "__esModule", { value: !0 });
const rp = wa, np = Wt, sp = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  rp.default,
  np.default
];
Ea.default = sp;
var Sa = {}, ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
const kn = ie, Nt = kn.operators, Cn = {
  maximum: { okStr: "<=", ok: Nt.LTE, fail: Nt.GT },
  minimum: { okStr: ">=", ok: Nt.GTE, fail: Nt.LT },
  exclusiveMaximum: { okStr: "<", ok: Nt.LT, fail: Nt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Nt.GT, fail: Nt.LTE }
}, ap = {
  message: ({ keyword: e, schemaCode: t }) => (0, kn.str)`must be ${Cn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, kn._)`{comparison: ${Cn[e].okStr}, limit: ${t}}`
}, op = {
  keyword: Object.keys(Cn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: ap,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, kn._)`${r} ${Cn[t].fail} ${n} || isNaN(${r})`);
  }
};
ba.default = op;
var Pa = {};
Object.defineProperty(Pa, "__esModule", { value: !0 });
const Dr = ie, ip = {
  message: ({ schemaCode: e }) => (0, Dr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Dr._)`{multipleOf: ${e}}`
}, cp = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: ip,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), c = a ? (0, Dr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Dr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Dr._)`(${n} === 0 || (${i} = ${r}/${n}, ${c}))`);
  }
};
Pa.default = cp;
var Na = {}, Oa = {};
Object.defineProperty(Oa, "__esModule", { value: !0 });
function Nl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Oa.default = Nl;
Nl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Na, "__esModule", { value: !0 });
const Gt = ie, lp = K, up = Oa, dp = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Gt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Gt._)`{limit: ${e}}`
}, fp = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: dp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Gt.operators.GT : Gt.operators.LT, i = s.opts.unicode === !1 ? (0, Gt._)`${r}.length` : (0, Gt._)`${(0, lp.useFunc)(e.gen, up.default)}(${r})`;
    e.fail$data((0, Gt._)`${i} ${a} ${n}`);
  }
};
Na.default = fp;
var Ra = {};
Object.defineProperty(Ra, "__esModule", { value: !0 });
const hp = oe, Dn = ie, pp = {
  message: ({ schemaCode: e }) => (0, Dn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Dn._)`{pattern: ${e}}`
}, mp = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: pp,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", c = r ? (0, Dn._)`(new RegExp(${s}, ${i}))` : (0, hp.usePattern)(e, n);
    e.fail$data((0, Dn._)`!${c}.test(${t})`);
  }
};
Ra.default = mp;
var Ta = {};
Object.defineProperty(Ta, "__esModule", { value: !0 });
const Mr = ie, yp = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Mr.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Mr._)`{limit: ${e}}`
}, $p = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: yp,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Mr.operators.GT : Mr.operators.LT;
    e.fail$data((0, Mr._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Ta.default = $p;
var Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
const Nr = oe, Lr = ie, _p = K, gp = {
  message: ({ params: { missingProperty: e } }) => (0, Lr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Lr._)`{missingProperty: ${e}}`
}, vp = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: gp,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: c } = i;
    if (!a && r.length === 0)
      return;
    const l = r.length >= c.loopRequired;
    if (i.allErrors ? d() : u(), c.strictRequired) {
      const y = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const g of r)
        if ((y == null ? void 0 : y[g]) === void 0 && !E.has(g)) {
          const _ = i.schemaEnv.baseId + i.errSchemaPath, p = `required property "${g}" is not defined at "${_}" (strictRequired)`;
          (0, _p.checkStrictMode)(i, p, i.opts.strictRequired);
        }
    }
    function d() {
      if (l || a)
        e.block$data(Lr.nil, h);
      else
        for (const y of r)
          (0, Nr.checkReportMissingProp)(e, y);
    }
    function u() {
      const y = t.let("missing");
      if (l || a) {
        const E = t.let("valid", !0);
        e.block$data(E, () => w(y, E)), e.ok(E);
      } else
        t.if((0, Nr.checkMissingProp)(e, r, y)), (0, Nr.reportMissingProp)(e, y), t.else();
    }
    function h() {
      t.forOf("prop", n, (y) => {
        e.setParams({ missingProperty: y }), t.if((0, Nr.noPropertyInData)(t, s, y, c.ownProperties), () => e.error());
      });
    }
    function w(y, E) {
      e.setParams({ missingProperty: y }), t.forOf(y, n, () => {
        t.assign(E, (0, Nr.propertyInData)(t, s, y, c.ownProperties)), t.if((0, Lr.not)(E), () => {
          e.error(), t.break();
        });
      }, Lr.nil);
    }
  }
};
Ia.default = vp;
var ja = {};
Object.defineProperty(ja, "__esModule", { value: !0 });
const Fr = ie, Ep = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Fr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Fr._)`{limit: ${e}}`
}, wp = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Ep,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Fr.operators.GT : Fr.operators.LT;
    e.fail$data((0, Fr._)`${r}.length ${s} ${n}`);
  }
};
ja.default = wp;
var Aa = {}, Jr = {};
Object.defineProperty(Jr, "__esModule", { value: !0 });
const Ol = Gn;
Ol.code = 'require("ajv/dist/runtime/equal").default';
Jr.default = Ol;
Object.defineProperty(Aa, "__esModule", { value: !0 });
const fs = Ee, Ne = ie, Sp = K, bp = Jr, Pp = {
  message: ({ params: { i: e, j: t } }) => (0, Ne.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ne._)`{i: ${e}, j: ${t}}`
}, Np = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: Pp,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: c } = e;
    if (!n && !s)
      return;
    const l = t.let("valid"), d = a.items ? (0, fs.getSchemaTypes)(a.items) : [];
    e.block$data(l, u, (0, Ne._)`${i} === false`), e.ok(l);
    function u() {
      const E = t.let("i", (0, Ne._)`${r}.length`), g = t.let("j");
      e.setParams({ i: E, j: g }), t.assign(l, !0), t.if((0, Ne._)`${E} > 1`, () => (h() ? w : y)(E, g));
    }
    function h() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function w(E, g) {
      const _ = t.name("item"), p = (0, fs.checkDataTypes)(d, _, c.opts.strictNumbers, fs.DataType.Wrong), v = t.const("indices", (0, Ne._)`{}`);
      t.for((0, Ne._)`;${E}--;`, () => {
        t.let(_, (0, Ne._)`${r}[${E}]`), t.if(p, (0, Ne._)`continue`), d.length > 1 && t.if((0, Ne._)`typeof ${_} == "string"`, (0, Ne._)`${_} += "_"`), t.if((0, Ne._)`typeof ${v}[${_}] == "number"`, () => {
          t.assign(g, (0, Ne._)`${v}[${_}]`), e.error(), t.assign(l, !1).break();
        }).code((0, Ne._)`${v}[${_}] = ${E}`);
      });
    }
    function y(E, g) {
      const _ = (0, Sp.useFunc)(t, bp.default), p = t.name("outer");
      t.label(p).for((0, Ne._)`;${E}--;`, () => t.for((0, Ne._)`${g} = ${E}; ${g}--;`, () => t.if((0, Ne._)`${_}(${r}[${E}], ${r}[${g}])`, () => {
        e.error(), t.assign(l, !1).break(p);
      })));
    }
  }
};
Aa.default = Np;
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
const js = ie, Op = K, Rp = Jr, Tp = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, js._)`{allowedValue: ${e}}`
}, Ip = {
  keyword: "const",
  $data: !0,
  error: Tp,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, js._)`!${(0, Op.useFunc)(t, Rp.default)}(${r}, ${s})`) : e.fail((0, js._)`${a} !== ${r}`);
  }
};
ka.default = Ip;
var Ca = {};
Object.defineProperty(Ca, "__esModule", { value: !0 });
const jr = ie, jp = K, Ap = Jr, kp = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, jr._)`{allowedValues: ${e}}`
}, Cp = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: kp,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const c = s.length >= i.opts.loopEnum;
    let l;
    const d = () => l ?? (l = (0, jp.useFunc)(t, Ap.default));
    let u;
    if (c || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const y = t.const("vSchema", a);
      u = (0, jr.or)(...s.map((E, g) => w(y, g)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (y) => t.if((0, jr._)`${d()}(${r}, ${y})`, () => t.assign(u, !0).break()));
    }
    function w(y, E) {
      const g = s[E];
      return typeof g == "object" && g !== null ? (0, jr._)`${d()}(${r}, ${y}[${E}])` : (0, jr._)`${r} === ${g}`;
    }
  }
};
Ca.default = Cp;
Object.defineProperty(Sa, "__esModule", { value: !0 });
const Dp = ba, Mp = Pa, Lp = Na, Fp = Ra, Vp = Ta, Up = Ia, zp = ja, qp = Aa, Kp = ka, Gp = Ca, Hp = [
  // number
  Dp.default,
  Mp.default,
  // string
  Lp.default,
  Fp.default,
  // object
  Vp.default,
  Up.default,
  // array
  zp.default,
  qp.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Kp.default,
  Gp.default
];
Sa.default = Hp;
var Da = {}, $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
$r.validateAdditionalItems = void 0;
const Ht = ie, As = K, Bp = {
  message: ({ params: { len: e } }) => (0, Ht.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ht._)`{limit: ${e}}`
}, Jp = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Bp,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, As.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Rl(e, n);
  }
};
function Rl(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const c = r.const("len", (0, Ht._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Ht._)`${c} <= ${t.length}`);
  else if (typeof n == "object" && !(0, As.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Ht._)`${c} <= ${t.length}`);
    r.if((0, Ht.not)(d), () => l(d)), e.ok(d);
  }
  function l(d) {
    r.forRange("i", t.length, c, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: As.Type.Num }, d), i.allErrors || r.if((0, Ht.not)(d), () => r.break());
    });
  }
}
$r.validateAdditionalItems = Rl;
$r.default = Jp;
var Ma = {}, _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.validateTuple = void 0;
const oi = ie, wn = K, Xp = oe, Wp = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Tl(e, "additionalItems", t);
    r.items = !0, !(0, wn.alwaysValidSchema)(r, t) && e.ok((0, Xp.validateArray)(e));
  }
};
function Tl(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: c } = e;
  u(s), c.opts.unevaluated && r.length && c.items !== !0 && (c.items = wn.mergeEvaluated.items(n, r.length, c.items));
  const l = n.name("valid"), d = n.const("len", (0, oi._)`${a}.length`);
  r.forEach((h, w) => {
    (0, wn.alwaysValidSchema)(c, h) || (n.if((0, oi._)`${d} > ${w}`, () => e.subschema({
      keyword: i,
      schemaProp: w,
      dataProp: w
    }, l)), e.ok(l));
  });
  function u(h) {
    const { opts: w, errSchemaPath: y } = c, E = r.length, g = E === h.minItems && (E === h.maxItems || h[t] === !1);
    if (w.strictTuples && !g) {
      const _ = `"${i}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${y}"`;
      (0, wn.checkStrictMode)(c, _, w.strictTuples);
    }
  }
}
_r.validateTuple = Tl;
_r.default = Wp;
Object.defineProperty(Ma, "__esModule", { value: !0 });
const Yp = _r, Qp = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Yp.validateTuple)(e, "items")
};
Ma.default = Qp;
var La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
const ii = ie, Zp = K, xp = oe, em = $r, tm = {
  message: ({ params: { len: e } }) => (0, ii.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, ii._)`{limit: ${e}}`
}, rm = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: tm,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, Zp.alwaysValidSchema)(n, t) && (s ? (0, em.validateAdditionalItems)(e, s) : e.ok((0, xp.validateArray)(e)));
  }
};
La.default = rm;
var Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
const We = ie, rn = K, nm = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, We.str)`must contain at least ${e} valid item(s)` : (0, We.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, We._)`{minContains: ${e}}` : (0, We._)`{minContains: ${e}, maxContains: ${t}}`
}, sm = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: nm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, c;
    const { minContains: l, maxContains: d } = n;
    a.opts.next ? (i = l === void 0 ? 1 : l, c = d) : i = 1;
    const u = t.const("len", (0, We._)`${s}.length`);
    if (e.setParams({ min: i, max: c }), c === void 0 && i === 0) {
      (0, rn.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (c !== void 0 && i > c) {
      (0, rn.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, rn.alwaysValidSchema)(a, r)) {
      let g = (0, We._)`${u} >= ${i}`;
      c !== void 0 && (g = (0, We._)`${g} && ${u} <= ${c}`), e.pass(g);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    c === void 0 && i === 1 ? y(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), c !== void 0 && t.if((0, We._)`${s}.length > 0`, w)) : (t.let(h, !1), w()), e.result(h, () => e.reset());
    function w() {
      const g = t.name("_valid"), _ = t.let("count", 0);
      y(g, () => t.if(g, () => E(_)));
    }
    function y(g, _) {
      t.forRange("i", 0, u, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: rn.Type.Num,
          compositeRule: !0
        }, g), _();
      });
    }
    function E(g) {
      t.code((0, We._)`${g}++`), c === void 0 ? t.if((0, We._)`${g} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, We._)`${g} > ${c}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, We._)`${g} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
Fa.default = sm;
var Il = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ie, r = K, n = oe;
  e.error = {
    message: ({ params: { property: l, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${l},
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
    code(l) {
      const [d, u] = a(l);
      i(l, d), c(l, u);
    }
  };
  function a({ schema: l }) {
    const d = {}, u = {};
    for (const h in l) {
      if (h === "__proto__")
        continue;
      const w = Array.isArray(l[h]) ? d : u;
      w[h] = l[h];
    }
    return [d, u];
  }
  function i(l, d = l.schema) {
    const { gen: u, data: h, it: w } = l;
    if (Object.keys(d).length === 0)
      return;
    const y = u.let("missing");
    for (const E in d) {
      const g = d[E];
      if (g.length === 0)
        continue;
      const _ = (0, n.propertyInData)(u, h, E, w.opts.ownProperties);
      l.setParams({
        property: E,
        depsCount: g.length,
        deps: g.join(", ")
      }), w.allErrors ? u.if(_, () => {
        for (const p of g)
          (0, n.checkReportMissingProp)(l, p);
      }) : (u.if((0, t._)`${_} && (${(0, n.checkMissingProp)(l, g, y)})`), (0, n.reportMissingProp)(l, y), u.else());
    }
  }
  e.validatePropertyDeps = i;
  function c(l, d = l.schema) {
    const { gen: u, data: h, keyword: w, it: y } = l, E = u.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(y, d[g]) || (u.if(
        (0, n.propertyInData)(u, h, g, y.opts.ownProperties),
        () => {
          const _ = l.subschema({ keyword: w, schemaProp: g }, E);
          l.mergeValidEvaluated(_, E);
        },
        () => u.var(E, !0)
        // TODO var
      ), l.ok(E));
  }
  e.validateSchemaDeps = c, e.default = s;
})(Il);
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
const jl = ie, am = K, om = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, jl._)`{propertyName: ${e.propertyName}}`
}, im = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: om,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, am.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, jl.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
Va.default = im;
var Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
const nn = oe, rt = ie, cm = $t, sn = K, lm = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, rt._)`{additionalProperty: ${e.additionalProperty}}`
}, um = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: lm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: c, opts: l } = i;
    if (i.props = !0, l.removeAdditional !== "all" && (0, sn.alwaysValidSchema)(i, r))
      return;
    const d = (0, nn.allSchemaProperties)(n.properties), u = (0, nn.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, rt._)`${a} === ${cm.default.errors}`);
    function h() {
      t.forIn("key", s, (_) => {
        !d.length && !u.length ? E(_) : t.if(w(_), () => E(_));
      });
    }
    function w(_) {
      let p;
      if (d.length > 8) {
        const v = (0, sn.schemaRefOrVal)(i, n.properties, "properties");
        p = (0, nn.isOwnProperty)(t, v, _);
      } else d.length ? p = (0, rt.or)(...d.map((v) => (0, rt._)`${_} === ${v}`)) : p = rt.nil;
      return u.length && (p = (0, rt.or)(p, ...u.map((v) => (0, rt._)`${(0, nn.usePattern)(e, v)}.test(${_})`))), (0, rt.not)(p);
    }
    function y(_) {
      t.code((0, rt._)`delete ${s}[${_}]`);
    }
    function E(_) {
      if (l.removeAdditional === "all" || l.removeAdditional && r === !1) {
        y(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), c || t.break();
        return;
      }
      if (typeof r == "object" && !(0, sn.alwaysValidSchema)(i, r)) {
        const p = t.name("valid");
        l.removeAdditional === "failing" ? (g(_, p, !1), t.if((0, rt.not)(p), () => {
          e.reset(), y(_);
        })) : (g(_, p), c || t.if((0, rt.not)(p), () => t.break()));
      }
    }
    function g(_, p, v) {
      const N = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: sn.Type.Str
      };
      v === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, p);
    }
  }
};
Xn.default = um;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
const dm = it, ci = oe, hs = K, li = Xn, fm = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && li.default.code(new dm.KeywordCxt(a, li.default, "additionalProperties"));
    const i = (0, ci.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = hs.mergeEvaluated.props(t, (0, hs.toHash)(i), a.props));
    const c = i.filter((h) => !(0, hs.alwaysValidSchema)(a, r[h]));
    if (c.length === 0)
      return;
    const l = t.name("valid");
    for (const h of c)
      d(h) ? u(h) : (t.if((0, ci.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(l);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, l);
    }
  }
};
Ua.default = fm;
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
const ui = oe, an = ie, di = K, fi = K, hm = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, c = (0, ui.allSchemaProperties)(r), l = c.filter((g) => (0, di.alwaysValidSchema)(a, r[g]));
    if (c.length === 0 || l.length === c.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof an.Name) && (a.props = (0, fi.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    w();
    function w() {
      for (const g of c)
        d && y(g), a.allErrors ? E(g) : (t.var(u, !0), E(g), t.if(u));
    }
    function y(g) {
      for (const _ in d)
        new RegExp(g).test(_) && (0, di.checkStrictMode)(a, `property ${_} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function E(g) {
      t.forIn("key", n, (_) => {
        t.if((0, an._)`${(0, ui.usePattern)(e, g)}.test(${_})`, () => {
          const p = l.includes(g);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: _,
            dataPropType: fi.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, an._)`${h}[${_}]`, !0) : !p && !a.allErrors && t.if((0, an.not)(u), () => t.break());
        });
      });
    }
  }
};
za.default = hm;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
const pm = K, mm = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, pm.alwaysValidSchema)(n, r)) {
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
qa.default = mm;
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
const ym = oe, $m = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: ym.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Ka.default = $m;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
const Sn = ie, _m = K, gm = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Sn._)`{passingSchemas: ${e.passing}}`
}, vm = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: gm,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), c = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: c }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let w;
        (0, _m.alwaysValidSchema)(s, u) ? t.var(l, !0) : w = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, l), h > 0 && t.if((0, Sn._)`${l} && ${i}`).assign(i, !1).assign(c, (0, Sn._)`[${c}, ${h}]`).else(), t.if(l, () => {
          t.assign(i, !0), t.assign(c, h), w && e.mergeEvaluated(w, Sn.Name);
        });
      });
    }
  }
};
Ga.default = vm;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
const Em = K, wm = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, Em.alwaysValidSchema)(n, a))
        return;
      const c = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(c);
    });
  }
};
Ha.default = wm;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
const Mn = ie, Al = K, Sm = {
  message: ({ params: e }) => (0, Mn.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Mn._)`{failingKeyword: ${e.ifClause}}`
}, bm = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Sm,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Al.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = hi(n, "then"), a = hi(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), c = t.name("_valid");
    if (l(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(c, d("then", u), d("else", u));
    } else s ? t.if(c, d("then")) : t.if((0, Mn.not)(c), d("else"));
    e.pass(i, () => e.error(!0));
    function l() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const w = e.subschema({ keyword: u }, c);
        t.assign(i, c), e.mergeValidEvaluated(w, i), h ? t.assign(h, (0, Mn._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function hi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Al.alwaysValidSchema)(e, r);
}
Ba.default = bm;
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
const Pm = K, Nm = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, Pm.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Ja.default = Nm;
Object.defineProperty(Da, "__esModule", { value: !0 });
const Om = $r, Rm = Ma, Tm = _r, Im = La, jm = Fa, Am = Il, km = Va, Cm = Xn, Dm = Ua, Mm = za, Lm = qa, Fm = Ka, Vm = Ga, Um = Ha, zm = Ba, qm = Ja;
function Km(e = !1) {
  const t = [
    // any
    Lm.default,
    Fm.default,
    Vm.default,
    Um.default,
    zm.default,
    qm.default,
    // object
    km.default,
    Cm.default,
    Am.default,
    Dm.default,
    Mm.default
  ];
  return e ? t.push(Rm.default, Im.default) : t.push(Om.default, Tm.default), t.push(jm.default), t;
}
Da.default = Km;
var Xa = {}, Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
const ge = ie, Gm = {
  message: ({ schemaCode: e }) => (0, ge.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ge._)`{format: ${e}}`
}, Hm = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Gm,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: c } = e, { opts: l, errSchemaPath: d, schemaEnv: u, self: h } = c;
    if (!l.validateFormats)
      return;
    s ? w() : y();
    function w() {
      const E = r.scopeValue("formats", {
        ref: h.formats,
        code: l.code.formats
      }), g = r.const("fDef", (0, ge._)`${E}[${i}]`), _ = r.let("fType"), p = r.let("format");
      r.if((0, ge._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(_, (0, ge._)`${g}.type || "string"`).assign(p, (0, ge._)`${g}.validate`), () => r.assign(_, (0, ge._)`"string"`).assign(p, g)), e.fail$data((0, ge.or)(v(), N()));
      function v() {
        return l.strictSchema === !1 ? ge.nil : (0, ge._)`${i} && !${p}`;
      }
      function N() {
        const R = u.$async ? (0, ge._)`(${g}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, ge._)`${p}(${n})`, j = (0, ge._)`(typeof ${p} == "function" ? ${R} : ${p}.test(${n}))`;
        return (0, ge._)`${p} && ${p} !== true && ${_} === ${t} && !${j}`;
      }
    }
    function y() {
      const E = h.formats[a];
      if (!E) {
        v();
        return;
      }
      if (E === !0)
        return;
      const [g, _, p] = N(E);
      g === t && e.pass(R());
      function v() {
        if (l.strictSchema === !1) {
          h.logger.warn(j());
          return;
        }
        throw new Error(j());
        function j() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(j) {
        const F = j instanceof RegExp ? (0, ge.regexpCode)(j) : l.code.formats ? (0, ge._)`${l.code.formats}${(0, ge.getProperty)(a)}` : void 0, q = r.scopeValue("formats", { key: a, ref: j, code: F });
        return typeof j == "object" && !(j instanceof RegExp) ? [j.type || "string", j.validate, (0, ge._)`${q}.validate`] : ["string", j, q];
      }
      function R() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, ge._)`await ${p}(${n})`;
        }
        return typeof _ == "function" ? (0, ge._)`${p}(${n})` : (0, ge._)`${p}.test(${n})`;
      }
    }
  }
};
Wa.default = Hm;
Object.defineProperty(Xa, "__esModule", { value: !0 });
const Bm = Wa, Jm = [Bm.default];
Xa.default = Jm;
var pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.contentVocabulary = pr.metadataVocabulary = void 0;
pr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
pr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(va, "__esModule", { value: !0 });
const Xm = Ea, Wm = Sa, Ym = Da, Qm = Xa, pi = pr, Zm = [
  Xm.default,
  Wm.default,
  (0, Ym.default)(),
  Qm.default,
  pi.metadataVocabulary,
  pi.contentVocabulary
];
va.default = Zm;
var Ya = {}, Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.DiscrError = void 0;
var mi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(mi || (Wn.DiscrError = mi = {}));
Object.defineProperty(Ya, "__esModule", { value: !0 });
const rr = ie, ks = Wn, yi = Ge, xm = yr, ey = K, ty = {
  message: ({ params: { discrError: e, tagName: t } }) => e === ks.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, rr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, ry = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: ty,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const c = n.propertyName;
    if (typeof c != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const l = t.let("valid", !1), d = t.const("tag", (0, rr._)`${r}${(0, rr.getProperty)(c)}`);
    t.if((0, rr._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: ks.DiscrError.Tag, tag: d, tagName: c })), e.ok(l);
    function u() {
      const y = w();
      t.if(!1);
      for (const E in y)
        t.elseIf((0, rr._)`${d} === ${E}`), t.assign(l, h(y[E]));
      t.else(), e.error(!1, { discrError: ks.DiscrError.Mapping, tag: d, tagName: c }), t.endIf();
    }
    function h(y) {
      const E = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: y }, E);
      return e.mergeEvaluated(g, rr.Name), E;
    }
    function w() {
      var y;
      const E = {}, g = p(s);
      let _ = !0;
      for (let R = 0; R < i.length; R++) {
        let j = i[R];
        if (j != null && j.$ref && !(0, ey.schemaHasRulesButRef)(j, a.self.RULES)) {
          const q = j.$ref;
          if (j = yi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, q), j instanceof yi.SchemaEnv && (j = j.schema), j === void 0)
            throw new xm.default(a.opts.uriResolver, a.baseId, q);
        }
        const F = (y = j == null ? void 0 : j.properties) === null || y === void 0 ? void 0 : y[c];
        if (typeof F != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${c}"`);
        _ = _ && (g || p(j)), v(F, R);
      }
      if (!_)
        throw new Error(`discriminator: "${c}" must be required`);
      return E;
      function p({ required: R }) {
        return Array.isArray(R) && R.includes(c);
      }
      function v(R, j) {
        if (R.const)
          N(R.const, j);
        else if (R.enum)
          for (const F of R.enum)
            N(F, j);
        else
          throw new Error(`discriminator: "properties/${c}" must have "const" or "enum"`);
      }
      function N(R, j) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${c}" values must be unique strings`);
        E[R] = j;
      }
    }
  }
};
Ya.default = ry;
const ny = "http://json-schema.org/draft-07/schema#", sy = "http://json-schema.org/draft-07/schema#", ay = "Core schema meta-schema", oy = {
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
}, iy = [
  "object",
  "boolean"
], cy = {
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
}, ly = {
  $schema: ny,
  $id: sy,
  title: ay,
  definitions: oy,
  type: iy,
  properties: cy,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Dc, n = va, s = Ya, a = ly, i = ["/properties"], c = "http://json-schema.org/draft-07/schema";
  class l extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(E, c, !1), this.refs["http://json-schema.org/schema"] = c;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(c) ? c : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var d = it;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = ie;
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
  var h = Br;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var w = yr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return w.default;
  } });
})(Ns, Ns.exports);
var uy = Ns.exports, Cs = { exports: {} }, kl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(z, J) {
    return { validate: z, compare: J };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(l, d),
    "date-time": t(h, w),
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
    regex: te,
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
    int64: { type: "number", validate: j },
    // C-type float
    float: { type: "number", validate: F },
    // C-type double
    double: { type: "number", validate: F },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, w),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(z) {
    return z % 4 === 0 && (z % 100 !== 0 || z % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(z) {
    const J = n.exec(z);
    if (!J)
      return !1;
    const ee = +J[1], Q = +J[2], x = +J[3];
    return Q >= 1 && Q <= 12 && x >= 1 && x <= (Q === 2 && r(ee) ? 29 : s[Q]);
  }
  function i(z, J) {
    if (z && J)
      return z > J ? 1 : z < J ? -1 : 0;
  }
  const c = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function l(z, J) {
    const ee = c.exec(z);
    if (!ee)
      return !1;
    const Q = +ee[1], x = +ee[2], M = +ee[3], L = ee[5];
    return (Q <= 23 && x <= 59 && M <= 59 || Q === 23 && x === 59 && M === 60) && (!J || L !== "");
  }
  function d(z, J) {
    if (!(z && J))
      return;
    const ee = c.exec(z), Q = c.exec(J);
    if (ee && Q)
      return z = ee[1] + ee[2] + ee[3] + (ee[4] || ""), J = Q[1] + Q[2] + Q[3] + (Q[4] || ""), z > J ? 1 : z < J ? -1 : 0;
  }
  const u = /t|\s/i;
  function h(z) {
    const J = z.split(u);
    return J.length === 2 && a(J[0]) && l(J[1], !0);
  }
  function w(z, J) {
    if (!(z && J))
      return;
    const [ee, Q] = z.split(u), [x, M] = J.split(u), L = i(ee, x);
    if (L !== void 0)
      return L || d(Q, M);
  }
  const y = /\/|:/, E = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(z) {
    return y.test(z) && E.test(z);
  }
  const _ = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function p(z) {
    return _.lastIndex = 0, _.test(z);
  }
  const v = -2147483648, N = 2 ** 31 - 1;
  function R(z) {
    return Number.isInteger(z) && z <= N && z >= v;
  }
  function j(z) {
    return Number.isInteger(z);
  }
  function F() {
    return !0;
  }
  const q = /[^\\]\\Z/;
  function te(z) {
    if (q.test(z))
      return !1;
    try {
      return new RegExp(z), !0;
    } catch {
      return !1;
    }
  }
})(kl);
var Cl = {}, Ds = { exports: {} }, Dl = {}, gt = {}, Ut = {}, Xr = {}, ae = {}, Gr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(v) {
      if (super(), !e.IDENTIFIER.test(v))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = v;
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
    constructor(v) {
      super(), this._items = typeof v == "string" ? [v] : v;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const v = this._items[0];
      return v === "" || v === '""';
    }
    get str() {
      var v;
      return (v = this._str) !== null && v !== void 0 ? v : this._str = this._items.reduce((N, R) => `${N}${R}`, "");
    }
    get names() {
      var v;
      return (v = this._names) !== null && v !== void 0 ? v : this._names = this._items.reduce((N, R) => (R instanceof r && (N[R.str] = (N[R.str] || 0) + 1), N), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(p, ...v) {
    const N = [p[0]];
    let R = 0;
    for (; R < v.length; )
      c(N, v[R]), N.push(p[++R]);
    return new n(N);
  }
  e._ = s;
  const a = new n("+");
  function i(p, ...v) {
    const N = [y(p[0])];
    let R = 0;
    for (; R < v.length; )
      N.push(a), c(N, v[R]), N.push(a, y(p[++R]));
    return l(N), new n(N);
  }
  e.str = i;
  function c(p, v) {
    v instanceof n ? p.push(...v._items) : v instanceof r ? p.push(v) : p.push(h(v));
  }
  e.addCodeArg = c;
  function l(p) {
    let v = 1;
    for (; v < p.length - 1; ) {
      if (p[v] === a) {
        const N = d(p[v - 1], p[v + 1]);
        if (N !== void 0) {
          p.splice(v - 1, 3, N);
          continue;
        }
        p[v++] = "+";
      }
      v++;
    }
  }
  function d(p, v) {
    if (v === '""')
      return p;
    if (p === '""')
      return v;
    if (typeof p == "string")
      return v instanceof r || p[p.length - 1] !== '"' ? void 0 : typeof v != "string" ? `${p.slice(0, -1)}${v}"` : v[0] === '"' ? p.slice(0, -1) + v.slice(1) : void 0;
    if (typeof v == "string" && v[0] === '"' && !(p instanceof r))
      return `"${p}${v.slice(1)}`;
  }
  function u(p, v) {
    return v.emptyStr() ? p : p.emptyStr() ? v : i`${p}${v}`;
  }
  e.strConcat = u;
  function h(p) {
    return typeof p == "number" || typeof p == "boolean" || p === null ? p : y(Array.isArray(p) ? p.join(",") : p);
  }
  function w(p) {
    return new n(y(p));
  }
  e.stringify = w;
  function y(p) {
    return JSON.stringify(p).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = y;
  function E(p) {
    return typeof p == "string" && e.IDENTIFIER.test(p) ? new n(`.${p}`) : s`[${p}]`;
  }
  e.getProperty = E;
  function g(p) {
    if (typeof p == "string" && e.IDENTIFIER.test(p))
      return new n(`${p}`);
    throw new Error(`CodeGen: invalid export name: ${p}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function _(p) {
    return new n(p.toString());
  }
  e.regexpCode = _;
})(Gr);
var Ms = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Gr;
  class r extends Error {
    constructor(d) {
      super(`CodeGen: "code" for ${d} not defined`), this.value = d.value;
    }
  }
  var n;
  (function(l) {
    l[l.Started = 0] = "Started", l[l.Completed = 1] = "Completed";
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
  const i = (0, t._)`\n`;
  class c extends s {
    constructor(d) {
      super(d), this._values = {}, this._scope = d.scope, this.opts = { ...d, _n: d.lines ? i : t.nil };
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
      const w = this.toName(d), { prefix: y } = w, E = (h = u.key) !== null && h !== void 0 ? h : u.ref;
      let g = this._values[y];
      if (g) {
        const v = g.get(E);
        if (v)
          return v;
      } else
        g = this._values[y] = /* @__PURE__ */ new Map();
      g.set(E, w);
      const _ = this._scope[y] || (this._scope[y] = []), p = _.length;
      return _[p] = u.ref, w.setValue(u, { property: y, itemIndex: p }), w;
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
      return this._reduceValues(d, (w) => {
        if (w.value === void 0)
          throw new Error(`CodeGen: name "${w}" has no value`);
        return w.value.code;
      }, u, h);
    }
    _reduceValues(d, u, h = {}, w) {
      let y = t.nil;
      for (const E in d) {
        const g = d[E];
        if (!g)
          continue;
        const _ = h[E] = h[E] || /* @__PURE__ */ new Map();
        g.forEach((p) => {
          if (_.has(p))
            return;
          _.set(p, n.Started);
          let v = u(p);
          if (v) {
            const N = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            y = (0, t._)`${y}${N} ${p} = ${v};${this.opts._n}`;
          } else if (v = w == null ? void 0 : w(p))
            y = (0, t._)`${y}${v}${this.opts._n}`;
          else
            throw new r(p);
          _.set(p, n.Completed);
        });
      }
      return y;
    }
  }
  e.ValueScope = c;
})(Ms);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Gr, r = Ms;
  var n = Gr;
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
  var s = Ms;
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
      const P = o ? r.varKinds.var : this.varKind, k = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${P} ${this.name}${k};` + f;
    }
    optimizeNames(o, f) {
      if (o[this.name.str])
        return this.rhs && (this.rhs = M(this.rhs, o, f)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class c extends a {
    constructor(o, f, P) {
      super(), this.lhs = o, this.rhs = f, this.sideEffects = P;
    }
    render({ _n: o }) {
      return `${this.lhs} = ${this.rhs};` + o;
    }
    optimizeNames(o, f) {
      if (!(this.lhs instanceof t.Name && !o[this.lhs.str] && !this.sideEffects))
        return this.rhs = M(this.rhs, o, f), this;
    }
    get names() {
      const o = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return x(o, this.rhs);
    }
  }
  class l extends c {
    constructor(o, f, P, k) {
      super(o, P, k), this.op = f;
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
  class u extends a {
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
  class w extends a {
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
      return this.code = M(this.code, o, f), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class y extends a {
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
      let k = P.length;
      for (; k--; ) {
        const C = P[k];
        C.optimizeNames(o, f) || (L(o, C.names), P.splice(k, 1));
      }
      return P.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((o, f) => Q(o, f.names), {});
    }
  }
  class E extends y {
    render(o) {
      return "{" + o._n + super.render(o) + "}" + o._n;
    }
  }
  class g extends y {
  }
  class _ extends E {
  }
  _.kind = "else";
  class p extends E {
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
        f = this.else = Array.isArray(P) ? new _(P) : P;
      }
      if (f)
        return o === !1 ? f instanceof p ? f : f.nodes : this.nodes.length ? this : new p(B(o), f instanceof p ? [f] : f.nodes);
      if (!(o === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(o, f) {
      var P;
      if (this.else = (P = this.else) === null || P === void 0 ? void 0 : P.optimizeNames(o, f), !!(super.optimizeNames(o, f) || this.else))
        return this.condition = M(this.condition, o, f), this;
    }
    get names() {
      const o = super.names;
      return x(o, this.condition), this.else && Q(o, this.else.names), o;
    }
  }
  p.kind = "if";
  class v extends E {
  }
  v.kind = "for";
  class N extends v {
    constructor(o) {
      super(), this.iteration = o;
    }
    render(o) {
      return `for(${this.iteration})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iteration = M(this.iteration, o, f), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class R extends v {
    constructor(o, f, P, k) {
      super(), this.varKind = o, this.name = f, this.from = P, this.to = k;
    }
    render(o) {
      const f = o.es5 ? r.varKinds.var : this.varKind, { name: P, from: k, to: C } = this;
      return `for(${f} ${P}=${k}; ${P}<${C}; ${P}++)` + super.render(o);
    }
    get names() {
      const o = x(super.names, this.from);
      return x(o, this.to);
    }
  }
  class j extends v {
    constructor(o, f, P, k) {
      super(), this.loop = o, this.varKind = f, this.name = P, this.iterable = k;
    }
    render(o) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(o);
    }
    optimizeNames(o, f) {
      if (super.optimizeNames(o, f))
        return this.iterable = M(this.iterable, o, f), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class F extends E {
    constructor(o, f, P) {
      super(), this.name = o, this.args = f, this.async = P;
    }
    render(o) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(o);
    }
  }
  F.kind = "func";
  class q extends y {
    render(o) {
      return "return " + super.render(o);
    }
  }
  q.kind = "return";
  class te extends E {
    render(o) {
      let f = "try" + super.render(o);
      return this.catch && (f += this.catch.render(o)), this.finally && (f += this.finally.render(o)), f;
    }
    optimizeNodes() {
      var o, f;
      return super.optimizeNodes(), (o = this.catch) === null || o === void 0 || o.optimizeNodes(), (f = this.finally) === null || f === void 0 || f.optimizeNodes(), this;
    }
    optimizeNames(o, f) {
      var P, k;
      return super.optimizeNames(o, f), (P = this.catch) === null || P === void 0 || P.optimizeNames(o, f), (k = this.finally) === null || k === void 0 || k.optimizeNames(o, f), this;
    }
    get names() {
      const o = super.names;
      return this.catch && Q(o, this.catch.names), this.finally && Q(o, this.finally.names), o;
    }
  }
  class z extends E {
    constructor(o) {
      super(), this.error = o;
    }
    render(o) {
      return `catch(${this.error})` + super.render(o);
    }
  }
  z.kind = "catch";
  class J extends E {
    render(o) {
      return "finally" + super.render(o);
    }
  }
  J.kind = "finally";
  class ee {
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
    _def(o, f, P, k) {
      const C = this._scope.toName(f);
      return P !== void 0 && k && (this._constants[C.str] = P), this._leafNode(new i(o, C, P)), C;
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
      return this._leafNode(new c(o, f, P));
    }
    // `+=` code
    add(o, f) {
      return this._leafNode(new l(o, e.operators.ADD, f));
    }
    // appends passed SafeExpr to code or executes Block
    code(o) {
      return typeof o == "function" ? o() : o !== t.nil && this._leafNode(new w(o)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...o) {
      const f = ["{"];
      for (const [P, k] of o)
        f.length > 1 && f.push(","), f.push(P), (P !== k || this.opts.es5) && (f.push(":"), (0, t.addCodeArg)(f, k));
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
      return this._elseNode(new _());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(p, _);
    }
    _for(o, f) {
      return this._blockNode(o), f && this.code(f).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(o, f) {
      return this._for(new N(o), f);
    }
    // `for` statement for a range of values
    forRange(o, f, P, k, C = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const X = this._scope.toName(o);
      return this._for(new R(C, X, f, P), () => k(X));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(o, f, P, k = r.varKinds.const) {
      const C = this._scope.toName(o);
      if (this.opts.es5) {
        const X = f instanceof t.Name ? f : this.var("_arr", f);
        return this.forRange("_i", 0, (0, t._)`${X}.length`, (H) => {
          this.var(C, (0, t._)`${X}[${H}]`), P(C);
        });
      }
      return this._for(new j("of", k, C, f), () => P(C));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(o, f, P, k = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(o, (0, t._)`Object.keys(${f})`, P);
      const C = this._scope.toName(o);
      return this._for(new j("in", k, C, f), () => P(C));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(v);
    }
    // `label` statement
    label(o) {
      return this._leafNode(new d(o));
    }
    // `break` statement
    break(o) {
      return this._leafNode(new u(o));
    }
    // `return` statement
    return(o) {
      const f = new q();
      if (this._blockNode(f), this.code(o), f.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(q);
    }
    // `try` statement
    try(o, f, P) {
      if (!f && !P)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const k = new te();
      if (this._blockNode(k), this.code(o), f) {
        const C = this.name("e");
        this._currNode = k.catch = new z(C), f(C);
      }
      return P && (this._currNode = k.finally = new J(), this.code(P)), this._endBlockNode(z, J);
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
    func(o, f = t.nil, P, k) {
      return this._blockNode(new F(o, f, P)), k && this.code(k).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(F);
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
  e.CodeGen = ee;
  function Q($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) + (o[f] || 0);
    return $;
  }
  function x($, o) {
    return o instanceof t._CodeOrName ? Q($, o.names) : $;
  }
  function M($, o, f) {
    if ($ instanceof t.Name)
      return P($);
    if (!k($))
      return $;
    return new t._Code($._items.reduce((C, X) => (X instanceof t.Name && (X = P(X)), X instanceof t._Code ? C.push(...X._items) : C.push(X), C), []));
    function P(C) {
      const X = f[C.str];
      return X === void 0 || o[C.str] !== 1 ? C : (delete o[C.str], X);
    }
    function k(C) {
      return C instanceof t._Code && C._items.some((X) => X instanceof t.Name && o[X.str] === 1 && f[X.str] !== void 0);
    }
  }
  function L($, o) {
    for (const f in o)
      $[f] = ($[f] || 0) - (o[f] || 0);
  }
  function B($) {
    return typeof $ == "boolean" || typeof $ == "number" || $ === null ? !$ : (0, t._)`!${b($)}`;
  }
  e.not = B;
  const U = m(e.operators.AND);
  function I(...$) {
    return $.reduce(U);
  }
  e.and = I;
  const A = m(e.operators.OR);
  function S(...$) {
    return $.reduce(A);
  }
  e.or = S;
  function m($) {
    return (o, f) => o === t.nil ? f : f === t.nil ? o : (0, t._)`${b(o)} ${$} ${b(f)}`;
  }
  function b($) {
    return $ instanceof t.Name ? $ : (0, t._)`(${$})`;
  }
})(ae);
var G = {};
Object.defineProperty(G, "__esModule", { value: !0 });
G.checkStrictMode = G.getErrorPath = G.Type = G.useFunc = G.setEvaluated = G.evaluatedPropsToName = G.mergeEvaluated = G.eachItem = G.unescapeJsonPointer = G.escapeJsonPointer = G.escapeFragment = G.unescapeFragment = G.schemaRefOrVal = G.schemaHasRulesButRef = G.schemaHasRules = G.checkUnknownRules = G.alwaysValidSchema = G.toHash = void 0;
const he = ae, dy = Gr;
function fy(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
G.toHash = fy;
function hy(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Ml(e, t), !Ll(t, e.self.RULES.all));
}
G.alwaysValidSchema = hy;
function Ml(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Ul(e, `unknown keyword: "${a}"`);
}
G.checkUnknownRules = Ml;
function Ll(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
G.schemaHasRules = Ll;
function py(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
G.schemaHasRulesButRef = py;
function my({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, he._)`${r}`;
  }
  return (0, he._)`${e}${t}${(0, he.getProperty)(n)}`;
}
G.schemaRefOrVal = my;
function yy(e) {
  return Fl(decodeURIComponent(e));
}
G.unescapeFragment = yy;
function $y(e) {
  return encodeURIComponent(Qa(e));
}
G.escapeFragment = $y;
function Qa(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
G.escapeJsonPointer = Qa;
function Fl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
G.unescapeJsonPointer = Fl;
function _y(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
G.eachItem = _y;
function $i({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, i, c) => {
    const l = i === void 0 ? a : i instanceof he.Name ? (a instanceof he.Name ? e(s, a, i) : t(s, a, i), i) : a instanceof he.Name ? (t(s, i, a), a) : r(a, i);
    return c === he.Name && !(l instanceof he.Name) ? n(s, l) : l;
  };
}
G.mergeEvaluated = {
  props: $i({
    mergeNames: (e, t, r) => e.if((0, he._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, he._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, he._)`${r} || {}`).code((0, he._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, he._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, he._)`${r} || {}`), Za(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Vl
  }),
  items: $i({
    mergeNames: (e, t, r) => e.if((0, he._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, he._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, he._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, he._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Vl(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, he._)`{}`);
  return t !== void 0 && Za(e, r, t), r;
}
G.evaluatedPropsToName = Vl;
function Za(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, he._)`${t}${(0, he.getProperty)(n)}`, !0));
}
G.setEvaluated = Za;
const _i = {};
function gy(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: _i[t.code] || (_i[t.code] = new dy._Code(t.code))
  });
}
G.useFunc = gy;
var Ls;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Ls || (G.Type = Ls = {}));
function vy(e, t, r) {
  if (e instanceof he.Name) {
    const n = t === Ls.Num;
    return r ? n ? (0, he._)`"[" + ${e} + "]"` : (0, he._)`"['" + ${e} + "']"` : n ? (0, he._)`"/" + ${e}` : (0, he._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, he.getProperty)(e).toString() : "/" + Qa(e);
}
G.getErrorPath = vy;
function Ul(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
G.checkStrictMode = Ul;
var _t = {};
Object.defineProperty(_t, "__esModule", { value: !0 });
const ke = ae, Ey = {
  // validation function arguments
  data: new ke.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new ke.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new ke.Name("instancePath"),
  parentData: new ke.Name("parentData"),
  parentDataProperty: new ke.Name("parentDataProperty"),
  rootData: new ke.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new ke.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new ke.Name("vErrors"),
  // null or array of validation errors
  errors: new ke.Name("errors"),
  // counter of validation errors
  this: new ke.Name("this"),
  // "globals"
  self: new ke.Name("self"),
  scope: new ke.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new ke.Name("json"),
  jsonPos: new ke.Name("jsonPos"),
  jsonLen: new ke.Name("jsonLen"),
  jsonPart: new ke.Name("jsonPart")
};
_t.default = Ey;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = ae, r = G, n = _t;
  e.keywordError = {
    message: ({ keyword: _ }) => (0, t.str)`must pass "${_}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: _, schemaType: p }) => p ? (0, t.str)`"${_}" keyword must be ${p} ($data)` : (0, t.str)`"${_}" keyword is invalid ($data)`
  };
  function s(_, p = e.keywordError, v, N) {
    const { it: R } = _, { gen: j, compositeRule: F, allErrors: q } = R, te = h(_, p, v);
    N ?? (F || q) ? l(j, te) : d(R, (0, t._)`[${te}]`);
  }
  e.reportError = s;
  function a(_, p = e.keywordError, v) {
    const { it: N } = _, { gen: R, compositeRule: j, allErrors: F } = N, q = h(_, p, v);
    l(R, q), j || F || d(N, n.default.vErrors);
  }
  e.reportExtraError = a;
  function i(_, p) {
    _.assign(n.default.errors, p), _.if((0, t._)`${n.default.vErrors} !== null`, () => _.if(p, () => _.assign((0, t._)`${n.default.vErrors}.length`, p), () => _.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function c({ gen: _, keyword: p, schemaValue: v, data: N, errsCount: R, it: j }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const F = _.name("err");
    _.forRange("i", R, n.default.errors, (q) => {
      _.const(F, (0, t._)`${n.default.vErrors}[${q}]`), _.if((0, t._)`${F}.instancePath === undefined`, () => _.assign((0, t._)`${F}.instancePath`, (0, t.strConcat)(n.default.instancePath, j.errorPath))), _.assign((0, t._)`${F}.schemaPath`, (0, t.str)`${j.errSchemaPath}/${p}`), j.opts.verbose && (_.assign((0, t._)`${F}.schema`, v), _.assign((0, t._)`${F}.data`, N));
    });
  }
  e.extendErrors = c;
  function l(_, p) {
    const v = _.const("err", p);
    _.if((0, t._)`${n.default.vErrors} === null`, () => _.assign(n.default.vErrors, (0, t._)`[${v}]`), (0, t._)`${n.default.vErrors}.push(${v})`), _.code((0, t._)`${n.default.errors}++`);
  }
  function d(_, p) {
    const { gen: v, validateName: N, schemaEnv: R } = _;
    R.$async ? v.throw((0, t._)`new ${_.ValidationError}(${p})`) : (v.assign((0, t._)`${N}.errors`, p), v.return(!1));
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
  function h(_, p, v) {
    const { createErrors: N } = _.it;
    return N === !1 ? (0, t._)`{}` : w(_, p, v);
  }
  function w(_, p, v = {}) {
    const { gen: N, it: R } = _, j = [
      y(R, v),
      E(_, v)
    ];
    return g(_, p, j), N.object(...j);
  }
  function y({ errorPath: _ }, { instancePath: p }) {
    const v = p ? (0, t.str)`${_}${(0, r.getErrorPath)(p, r.Type.Str)}` : _;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, v)];
  }
  function E({ keyword: _, it: { errSchemaPath: p } }, { schemaPath: v, parentSchema: N }) {
    let R = N ? p : (0, t.str)`${p}/${_}`;
    return v && (R = (0, t.str)`${R}${(0, r.getErrorPath)(v, r.Type.Str)}`), [u.schemaPath, R];
  }
  function g(_, { params: p, message: v }, N) {
    const { keyword: R, data: j, schemaValue: F, it: q } = _, { opts: te, propertyName: z, topSchemaRef: J, schemaPath: ee } = q;
    N.push([u.keyword, R], [u.params, typeof p == "function" ? p(_) : p || (0, t._)`{}`]), te.messages && N.push([u.message, typeof v == "function" ? v(_) : v]), te.verbose && N.push([u.schema, F], [u.parentSchema, (0, t._)`${J}${ee}`], [n.default.data, j]), z && N.push([u.propertyName, z]);
  }
})(Xr);
var gi;
function wy() {
  if (gi) return Ut;
  gi = 1, Object.defineProperty(Ut, "__esModule", { value: !0 }), Ut.boolOrEmptySchema = Ut.topBoolOrEmptySchema = void 0;
  const e = Xr, t = ae, r = _t, n = {
    message: "boolean schema is false"
  };
  function s(c) {
    const { gen: l, schema: d, validateName: u } = c;
    d === !1 ? i(c, !1) : typeof d == "object" && d.$async === !0 ? l.return(r.default.data) : (l.assign((0, t._)`${u}.errors`, null), l.return(!0));
  }
  Ut.topBoolOrEmptySchema = s;
  function a(c, l) {
    const { gen: d, schema: u } = c;
    u === !1 ? (d.var(l, !1), i(c)) : d.var(l, !0);
  }
  Ut.boolOrEmptySchema = a;
  function i(c, l) {
    const { gen: d, data: u } = c, h = {
      gen: d,
      keyword: "false schema",
      data: u,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: c
    };
    (0, e.reportError)(h, n, void 0, l);
  }
  return Ut;
}
var we = {}, Yt = {};
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.getRules = Yt.isJSONType = void 0;
const Sy = ["string", "number", "integer", "boolean", "null", "object", "array"], by = new Set(Sy);
function Py(e) {
  return typeof e == "string" && by.has(e);
}
Yt.isJSONType = Py;
function Ny() {
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
Yt.getRules = Ny;
var St = {};
Object.defineProperty(St, "__esModule", { value: !0 });
St.shouldUseRule = St.shouldUseGroup = St.schemaHasRulesForType = void 0;
function Oy({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && zl(e, n);
}
St.schemaHasRulesForType = Oy;
function zl(e, t) {
  return t.rules.some((r) => ql(e, r));
}
St.shouldUseGroup = zl;
function ql(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
St.shouldUseRule = ql;
Object.defineProperty(we, "__esModule", { value: !0 });
we.reportTypeError = we.checkDataTypes = we.checkDataType = we.coerceAndCheckDataType = we.getJSONTypes = we.getSchemaTypes = we.DataType = void 0;
const Ry = Yt, Ty = St, Iy = Xr, se = ae, Kl = G;
var cr;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(cr || (we.DataType = cr = {}));
function jy(e) {
  const t = Gl(e.type);
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
we.getSchemaTypes = jy;
function Gl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(Ry.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
we.getJSONTypes = Gl;
function Ay(e, t) {
  const { gen: r, data: n, opts: s } = e, a = ky(t, s.coerceTypes), i = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, Ty.schemaHasRulesForType)(e, t[0]));
  if (i) {
    const c = xa(t, n, s.strictNumbers, cr.Wrong);
    r.if(c, () => {
      a.length ? Cy(e, t, a) : eo(e);
    });
  }
  return i;
}
we.coerceAndCheckDataType = Ay;
const Hl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function ky(e, t) {
  return t ? e.filter((r) => Hl.has(r) || t === "array" && r === "array") : [];
}
function Cy(e, t, r) {
  const { gen: n, data: s, opts: a } = e, i = n.let("dataType", (0, se._)`typeof ${s}`), c = n.let("coerced", (0, se._)`undefined`);
  a.coerceTypes === "array" && n.if((0, se._)`${i} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, se._)`${s}[0]`).assign(i, (0, se._)`typeof ${s}`).if(xa(t, s, a.strictNumbers), () => n.assign(c, s))), n.if((0, se._)`${c} !== undefined`);
  for (const d of r)
    (Hl.has(d) || d === "array" && a.coerceTypes === "array") && l(d);
  n.else(), eo(e), n.endIf(), n.if((0, se._)`${c} !== undefined`, () => {
    n.assign(s, c), Dy(e, c);
  });
  function l(d) {
    switch (d) {
      case "string":
        n.elseIf((0, se._)`${i} == "number" || ${i} == "boolean"`).assign(c, (0, se._)`"" + ${s}`).elseIf((0, se._)`${s} === null`).assign(c, (0, se._)`""`);
        return;
      case "number":
        n.elseIf((0, se._)`${i} == "boolean" || ${s} === null
              || (${i} == "string" && ${s} && ${s} == +${s})`).assign(c, (0, se._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, se._)`${i} === "boolean" || ${s} === null
              || (${i} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(c, (0, se._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, se._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(c, !1).elseIf((0, se._)`${s} === "true" || ${s} === 1`).assign(c, !0);
        return;
      case "null":
        n.elseIf((0, se._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(c, null);
        return;
      case "array":
        n.elseIf((0, se._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${s} === null`).assign(c, (0, se._)`[${s}]`);
    }
  }
}
function Dy({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, se._)`${t} !== undefined`, () => e.assign((0, se._)`${t}[${r}]`, n));
}
function Fs(e, t, r, n = cr.Correct) {
  const s = n === cr.Correct ? se.operators.EQ : se.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, se._)`${t} ${s} null`;
    case "array":
      a = (0, se._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, se._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = i((0, se._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = i();
      break;
    default:
      return (0, se._)`typeof ${t} ${s} ${e}`;
  }
  return n === cr.Correct ? a : (0, se.not)(a);
  function i(c = se.nil) {
    return (0, se.and)((0, se._)`typeof ${t} == "number"`, c, r ? (0, se._)`isFinite(${t})` : se.nil);
  }
}
we.checkDataType = Fs;
function xa(e, t, r, n) {
  if (e.length === 1)
    return Fs(e[0], t, r, n);
  let s;
  const a = (0, Kl.toHash)(e);
  if (a.array && a.object) {
    const i = (0, se._)`typeof ${t} != "object"`;
    s = a.null ? i : (0, se._)`!${t} || ${i}`, delete a.null, delete a.array, delete a.object;
  } else
    s = se.nil;
  a.number && delete a.integer;
  for (const i in a)
    s = (0, se.and)(s, Fs(i, t, r, n));
  return s;
}
we.checkDataTypes = xa;
const My = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, se._)`{type: ${e}}` : (0, se._)`{type: ${t}}`
};
function eo(e) {
  const t = Ly(e);
  (0, Iy.reportError)(t, My);
}
we.reportTypeError = eo;
function Ly(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, Kl.schemaRefOrVal)(e, n, "type");
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
var Or = {}, vi;
function Fy() {
  if (vi) return Or;
  vi = 1, Object.defineProperty(Or, "__esModule", { value: !0 }), Or.assignDefaults = void 0;
  const e = ae, t = G;
  function r(s, a) {
    const { properties: i, items: c } = s.schema;
    if (a === "object" && i)
      for (const l in i)
        n(s, l, i[l].default);
    else a === "array" && Array.isArray(c) && c.forEach((l, d) => n(s, d, l.default));
  }
  Or.assignDefaults = r;
  function n(s, a, i) {
    const { gen: c, compositeRule: l, data: d, opts: u } = s;
    if (i === void 0)
      return;
    const h = (0, e._)`${d}${(0, e.getProperty)(a)}`;
    if (l) {
      (0, t.checkStrictMode)(s, `default is ignored for: ${h}`);
      return;
    }
    let w = (0, e._)`${h} === undefined`;
    u.useDefaults === "empty" && (w = (0, e._)`${w} || ${h} === null || ${h} === ""`), c.if(w, (0, e._)`${h} = ${(0, e.stringify)(i)}`);
  }
  return Or;
}
var et = {}, de = {}, Ei;
function ct() {
  if (Ei) return de;
  Ei = 1, Object.defineProperty(de, "__esModule", { value: !0 }), de.validateUnion = de.validateArray = de.usePattern = de.callValidateCode = de.schemaProperties = de.allSchemaProperties = de.noPropertyInData = de.propertyInData = de.isOwnProperty = de.hasPropFunc = de.reportMissingProp = de.checkMissingProp = de.checkReportMissingProp = void 0;
  const e = ae, t = G, r = _t, n = G;
  function s(v, N) {
    const { gen: R, data: j, it: F } = v;
    R.if(u(R, j, N, F.opts.ownProperties), () => {
      v.setParams({ missingProperty: (0, e._)`${N}` }, !0), v.error();
    });
  }
  de.checkReportMissingProp = s;
  function a({ gen: v, data: N, it: { opts: R } }, j, F) {
    return (0, e.or)(...j.map((q) => (0, e.and)(u(v, N, q, R.ownProperties), (0, e._)`${F} = ${q}`)));
  }
  de.checkMissingProp = a;
  function i(v, N) {
    v.setParams({ missingProperty: N }, !0), v.error();
  }
  de.reportMissingProp = i;
  function c(v) {
    return v.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  de.hasPropFunc = c;
  function l(v, N, R) {
    return (0, e._)`${c(v)}.call(${N}, ${R})`;
  }
  de.isOwnProperty = l;
  function d(v, N, R, j) {
    const F = (0, e._)`${N}${(0, e.getProperty)(R)} !== undefined`;
    return j ? (0, e._)`${F} && ${l(v, N, R)}` : F;
  }
  de.propertyInData = d;
  function u(v, N, R, j) {
    const F = (0, e._)`${N}${(0, e.getProperty)(R)} === undefined`;
    return j ? (0, e.or)(F, (0, e.not)(l(v, N, R))) : F;
  }
  de.noPropertyInData = u;
  function h(v) {
    return v ? Object.keys(v).filter((N) => N !== "__proto__") : [];
  }
  de.allSchemaProperties = h;
  function w(v, N) {
    return h(N).filter((R) => !(0, t.alwaysValidSchema)(v, N[R]));
  }
  de.schemaProperties = w;
  function y({ schemaCode: v, data: N, it: { gen: R, topSchemaRef: j, schemaPath: F, errorPath: q }, it: te }, z, J, ee) {
    const Q = ee ? (0, e._)`${v}, ${N}, ${j}${F}` : N, x = [
      [r.default.instancePath, (0, e.strConcat)(r.default.instancePath, q)],
      [r.default.parentData, te.parentData],
      [r.default.parentDataProperty, te.parentDataProperty],
      [r.default.rootData, r.default.rootData]
    ];
    te.opts.dynamicRef && x.push([r.default.dynamicAnchors, r.default.dynamicAnchors]);
    const M = (0, e._)`${Q}, ${R.object(...x)}`;
    return J !== e.nil ? (0, e._)`${z}.call(${J}, ${M})` : (0, e._)`${z}(${M})`;
  }
  de.callValidateCode = y;
  const E = (0, e._)`new RegExp`;
  function g({ gen: v, it: { opts: N } }, R) {
    const j = N.unicodeRegExp ? "u" : "", { regExp: F } = N.code, q = F(R, j);
    return v.scopeValue("pattern", {
      key: q.toString(),
      ref: q,
      code: (0, e._)`${F.code === "new RegExp" ? E : (0, n.useFunc)(v, F)}(${R}, ${j})`
    });
  }
  de.usePattern = g;
  function _(v) {
    const { gen: N, data: R, keyword: j, it: F } = v, q = N.name("valid");
    if (F.allErrors) {
      const z = N.let("valid", !0);
      return te(() => N.assign(z, !1)), z;
    }
    return N.var(q, !0), te(() => N.break()), q;
    function te(z) {
      const J = N.const("len", (0, e._)`${R}.length`);
      N.forRange("i", 0, J, (ee) => {
        v.subschema({
          keyword: j,
          dataProp: ee,
          dataPropType: t.Type.Num
        }, q), N.if((0, e.not)(q), z);
      });
    }
  }
  de.validateArray = _;
  function p(v) {
    const { gen: N, schema: R, keyword: j, it: F } = v;
    if (!Array.isArray(R))
      throw new Error("ajv implementation error");
    if (R.some((J) => (0, t.alwaysValidSchema)(F, J)) && !F.opts.unevaluated)
      return;
    const te = N.let("valid", !1), z = N.name("_valid");
    N.block(() => R.forEach((J, ee) => {
      const Q = v.subschema({
        keyword: j,
        schemaProp: ee,
        compositeRule: !0
      }, z);
      N.assign(te, (0, e._)`${te} || ${z}`), v.mergeValidEvaluated(Q, z) || N.if((0, e.not)(te));
    })), v.result(te, () => v.reset(), () => v.error(!0));
  }
  return de.validateUnion = p, de;
}
var wi;
function Vy() {
  if (wi) return et;
  wi = 1, Object.defineProperty(et, "__esModule", { value: !0 }), et.validateKeywordUsage = et.validSchemaType = et.funcKeywordCode = et.macroKeywordCode = void 0;
  const e = ae, t = _t, r = ct(), n = Xr;
  function s(w, y) {
    const { gen: E, keyword: g, schema: _, parentSchema: p, it: v } = w, N = y.macro.call(v.self, _, p, v), R = d(E, g, N);
    v.opts.validateSchema !== !1 && v.self.validateSchema(N, !0);
    const j = E.name("valid");
    w.subschema({
      schema: N,
      schemaPath: e.nil,
      errSchemaPath: `${v.errSchemaPath}/${g}`,
      topSchemaRef: R,
      compositeRule: !0
    }, j), w.pass(j, () => w.error(!0));
  }
  et.macroKeywordCode = s;
  function a(w, y) {
    var E;
    const { gen: g, keyword: _, schema: p, parentSchema: v, $data: N, it: R } = w;
    l(R, y);
    const j = !N && y.compile ? y.compile.call(R.self, p, v, R) : y.validate, F = d(g, _, j), q = g.let("valid");
    w.block$data(q, te), w.ok((E = y.valid) !== null && E !== void 0 ? E : q);
    function te() {
      if (y.errors === !1)
        ee(), y.modifying && i(w), Q(() => w.error());
      else {
        const x = y.async ? z() : J();
        y.modifying && i(w), Q(() => c(w, x));
      }
    }
    function z() {
      const x = g.let("ruleErrs", null);
      return g.try(() => ee((0, e._)`await `), (M) => g.assign(q, !1).if((0, e._)`${M} instanceof ${R.ValidationError}`, () => g.assign(x, (0, e._)`${M}.errors`), () => g.throw(M))), x;
    }
    function J() {
      const x = (0, e._)`${F}.errors`;
      return g.assign(x, null), ee(e.nil), x;
    }
    function ee(x = y.async ? (0, e._)`await ` : e.nil) {
      const M = R.opts.passContext ? t.default.this : t.default.self, L = !("compile" in y && !N || y.schema === !1);
      g.assign(q, (0, e._)`${x}${(0, r.callValidateCode)(w, F, M, L)}`, y.modifying);
    }
    function Q(x) {
      var M;
      g.if((0, e.not)((M = y.valid) !== null && M !== void 0 ? M : q), x);
    }
  }
  et.funcKeywordCode = a;
  function i(w) {
    const { gen: y, data: E, it: g } = w;
    y.if(g.parentData, () => y.assign(E, (0, e._)`${g.parentData}[${g.parentDataProperty}]`));
  }
  function c(w, y) {
    const { gen: E } = w;
    E.if((0, e._)`Array.isArray(${y})`, () => {
      E.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${y} : ${t.default.vErrors}.concat(${y})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(w);
    }, () => w.error());
  }
  function l({ schemaEnv: w }, y) {
    if (y.async && !w.$async)
      throw new Error("async keyword in sync schema");
  }
  function d(w, y, E) {
    if (E === void 0)
      throw new Error(`keyword "${y}" failed to compile`);
    return w.scopeValue("keyword", typeof E == "function" ? { ref: E } : { ref: E, code: (0, e.stringify)(E) });
  }
  function u(w, y, E = !1) {
    return !y.length || y.some((g) => g === "array" ? Array.isArray(w) : g === "object" ? w && typeof w == "object" && !Array.isArray(w) : typeof w == g || E && typeof w > "u");
  }
  et.validSchemaType = u;
  function h({ schema: w, opts: y, self: E, errSchemaPath: g }, _, p) {
    if (Array.isArray(_.keyword) ? !_.keyword.includes(p) : _.keyword !== p)
      throw new Error("ajv implementation error");
    const v = _.dependencies;
    if (v != null && v.some((N) => !Object.prototype.hasOwnProperty.call(w, N)))
      throw new Error(`parent schema must have dependencies of ${p}: ${v.join(",")}`);
    if (_.validateSchema && !_.validateSchema(w[p])) {
      const R = `keyword "${p}" value is invalid at path "${g}": ` + E.errorsText(_.validateSchema.errors);
      if (y.validateSchema === "log")
        E.logger.error(R);
      else
        throw new Error(R);
    }
  }
  return et.validateKeywordUsage = h, et;
}
var vt = {}, Si;
function Uy() {
  if (Si) return vt;
  Si = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.extendSubschemaMode = vt.extendSubschemaData = vt.getSubschema = void 0;
  const e = ae, t = G;
  function r(a, { keyword: i, schemaProp: c, schema: l, schemaPath: d, errSchemaPath: u, topSchemaRef: h }) {
    if (i !== void 0 && l !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (i !== void 0) {
      const w = a.schema[i];
      return c === void 0 ? {
        schema: w,
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(i)}`,
        errSchemaPath: `${a.errSchemaPath}/${i}`
      } : {
        schema: w[c],
        schemaPath: (0, e._)`${a.schemaPath}${(0, e.getProperty)(i)}${(0, e.getProperty)(c)}`,
        errSchemaPath: `${a.errSchemaPath}/${i}/${(0, t.escapeFragment)(c)}`
      };
    }
    if (l !== void 0) {
      if (d === void 0 || u === void 0 || h === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: l,
        schemaPath: d,
        topSchemaRef: h,
        errSchemaPath: u
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  vt.getSubschema = r;
  function n(a, i, { dataProp: c, dataPropType: l, data: d, dataTypes: u, propertyName: h }) {
    if (d !== void 0 && c !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: w } = i;
    if (c !== void 0) {
      const { errorPath: E, dataPathArr: g, opts: _ } = i, p = w.let("data", (0, e._)`${i.data}${(0, e.getProperty)(c)}`, !0);
      y(p), a.errorPath = (0, e.str)`${E}${(0, t.getErrorPath)(c, l, _.jsPropertySyntax)}`, a.parentDataProperty = (0, e._)`${c}`, a.dataPathArr = [...g, a.parentDataProperty];
    }
    if (d !== void 0) {
      const E = d instanceof e.Name ? d : w.let("data", d, !0);
      y(E), h !== void 0 && (a.propertyName = h);
    }
    u && (a.dataTypes = u);
    function y(E) {
      a.data = E, a.dataLevel = i.dataLevel + 1, a.dataTypes = [], i.definedProperties = /* @__PURE__ */ new Set(), a.parentData = i.data, a.dataNames = [...i.dataNames, E];
    }
  }
  vt.extendSubschemaData = n;
  function s(a, { jtdDiscriminator: i, jtdMetadata: c, compositeRule: l, createErrors: d, allErrors: u }) {
    l !== void 0 && (a.compositeRule = l), d !== void 0 && (a.createErrors = d), u !== void 0 && (a.allErrors = u), a.jtdDiscriminator = i, a.jtdMetadata = c;
  }
  return vt.extendSubschemaMode = s, vt;
}
var Ie = {}, Bl = { exports: {} }, kt = Bl.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  bn(t, n, s, e, "", e);
};
kt.keywords = {
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
kt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
kt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
kt.skipKeywords = {
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
function bn(e, t, r, n, s, a, i, c, l, d) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, i, c, l, d);
    for (var u in n) {
      var h = n[u];
      if (Array.isArray(h)) {
        if (u in kt.arrayKeywords)
          for (var w = 0; w < h.length; w++)
            bn(e, t, r, h[w], s + "/" + u + "/" + w, a, s, u, n, w);
      } else if (u in kt.propsKeywords) {
        if (h && typeof h == "object")
          for (var y in h)
            bn(e, t, r, h[y], s + "/" + u + "/" + zy(y), a, s, u, n, y);
      } else (u in kt.keywords || e.allKeys && !(u in kt.skipKeywords)) && bn(e, t, r, h, s + "/" + u, a, s, u, n);
    }
    r(n, s, a, i, c, l, d);
  }
}
function zy(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var qy = Bl.exports;
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.getSchemaRefs = Ie.resolveUrl = Ie.normalizeId = Ie._getFullPath = Ie.getFullPath = Ie.inlineRef = void 0;
const Ky = G, Gy = Gn, Hy = qy, By = /* @__PURE__ */ new Set([
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
function Jy(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Vs(e) : t ? Jl(e) <= t : !1;
}
Ie.inlineRef = Jy;
const Xy = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Vs(e) {
  for (const t in e) {
    if (Xy.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Vs) || typeof r == "object" && Vs(r))
      return !0;
  }
  return !1;
}
function Jl(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !By.has(r) && (typeof e[r] == "object" && (0, Ky.eachItem)(e[r], (n) => t += Jl(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Xl(e, t = "", r) {
  r !== !1 && (t = lr(t));
  const n = e.parse(t);
  return Wl(e, n);
}
Ie.getFullPath = Xl;
function Wl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
Ie._getFullPath = Wl;
const Wy = /#\/?$/;
function lr(e) {
  return e ? e.replace(Wy, "") : "";
}
Ie.normalizeId = lr;
function Yy(e, t, r) {
  return r = lr(r), e.resolve(t, r);
}
Ie.resolveUrl = Yy;
const Qy = /^[a-z_][-a-z0-9._]*$/i;
function Zy(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = lr(e[r] || t), a = { "": s }, i = Xl(n, s, !1), c = {}, l = /* @__PURE__ */ new Set();
  return Hy(e, { allKeys: !0 }, (h, w, y, E) => {
    if (E === void 0)
      return;
    const g = i + w;
    let _ = a[E];
    typeof h[r] == "string" && (_ = p.call(this, h[r])), v.call(this, h.$anchor), v.call(this, h.$dynamicAnchor), a[w] = _;
    function p(N) {
      const R = this.opts.uriResolver.resolve;
      if (N = lr(_ ? R(_, N) : N), l.has(N))
        throw u(N);
      l.add(N);
      let j = this.refs[N];
      return typeof j == "string" && (j = this.refs[j]), typeof j == "object" ? d(h, j.schema, N) : N !== lr(g) && (N[0] === "#" ? (d(h, c[N], N), c[N] = h) : this.refs[N] = g), N;
    }
    function v(N) {
      if (typeof N == "string") {
        if (!Qy.test(N))
          throw new Error(`invalid anchor "${N}"`);
        p.call(this, `#${N}`);
      }
    }
  }), c;
  function d(h, w, y) {
    if (w !== void 0 && !Gy(h, w))
      throw u(y);
  }
  function u(h) {
    return new Error(`reference "${h}" resolves to more than one schema`);
  }
}
Ie.getSchemaRefs = Zy;
var bi;
function Yn() {
  if (bi) return gt;
  bi = 1, Object.defineProperty(gt, "__esModule", { value: !0 }), gt.getData = gt.KeywordCxt = gt.validateFunctionCode = void 0;
  const e = wy(), t = we, r = St, n = we, s = Fy(), a = Vy(), i = Uy(), c = ae, l = _t, d = Ie, u = G, h = Xr;
  function w(O) {
    if (j(O) && (q(O), R(O))) {
      _(O);
      return;
    }
    y(O, () => (0, e.topBoolOrEmptySchema)(O));
  }
  gt.validateFunctionCode = w;
  function y({ gen: O, validateName: T, schema: D, schemaEnv: V, opts: W }, re) {
    W.code.es5 ? O.func(T, (0, c._)`${l.default.data}, ${l.default.valCxt}`, V.$async, () => {
      O.code((0, c._)`"use strict"; ${v(D, W)}`), g(O, W), O.code(re);
    }) : O.func(T, (0, c._)`${l.default.data}, ${E(W)}`, V.$async, () => O.code(v(D, W)).code(re));
  }
  function E(O) {
    return (0, c._)`{${l.default.instancePath}="", ${l.default.parentData}, ${l.default.parentDataProperty}, ${l.default.rootData}=${l.default.data}${O.dynamicRef ? (0, c._)`, ${l.default.dynamicAnchors}={}` : c.nil}}={}`;
  }
  function g(O, T) {
    O.if(l.default.valCxt, () => {
      O.var(l.default.instancePath, (0, c._)`${l.default.valCxt}.${l.default.instancePath}`), O.var(l.default.parentData, (0, c._)`${l.default.valCxt}.${l.default.parentData}`), O.var(l.default.parentDataProperty, (0, c._)`${l.default.valCxt}.${l.default.parentDataProperty}`), O.var(l.default.rootData, (0, c._)`${l.default.valCxt}.${l.default.rootData}`), T.dynamicRef && O.var(l.default.dynamicAnchors, (0, c._)`${l.default.valCxt}.${l.default.dynamicAnchors}`);
    }, () => {
      O.var(l.default.instancePath, (0, c._)`""`), O.var(l.default.parentData, (0, c._)`undefined`), O.var(l.default.parentDataProperty, (0, c._)`undefined`), O.var(l.default.rootData, l.default.data), T.dynamicRef && O.var(l.default.dynamicAnchors, (0, c._)`{}`);
    });
  }
  function _(O) {
    const { schema: T, opts: D, gen: V } = O;
    y(O, () => {
      D.$comment && T.$comment && x(O), J(O), V.let(l.default.vErrors, null), V.let(l.default.errors, 0), D.unevaluated && p(O), te(O), M(O);
    });
  }
  function p(O) {
    const { gen: T, validateName: D } = O;
    O.evaluated = T.const("evaluated", (0, c._)`${D}.evaluated`), T.if((0, c._)`${O.evaluated}.dynamicProps`, () => T.assign((0, c._)`${O.evaluated}.props`, (0, c._)`undefined`)), T.if((0, c._)`${O.evaluated}.dynamicItems`, () => T.assign((0, c._)`${O.evaluated}.items`, (0, c._)`undefined`));
  }
  function v(O, T) {
    const D = typeof O == "object" && O[T.schemaId];
    return D && (T.code.source || T.code.process) ? (0, c._)`/*# sourceURL=${D} */` : c.nil;
  }
  function N(O, T) {
    if (j(O) && (q(O), R(O))) {
      F(O, T);
      return;
    }
    (0, e.boolOrEmptySchema)(O, T);
  }
  function R({ schema: O, self: T }) {
    if (typeof O == "boolean")
      return !O;
    for (const D in O)
      if (T.RULES.all[D])
        return !0;
    return !1;
  }
  function j(O) {
    return typeof O.schema != "boolean";
  }
  function F(O, T) {
    const { schema: D, gen: V, opts: W } = O;
    W.$comment && D.$comment && x(O), ee(O), Q(O);
    const re = V.const("_errs", l.default.errors);
    te(O, re), V.var(T, (0, c._)`${re} === ${l.default.errors}`);
  }
  function q(O) {
    (0, u.checkUnknownRules)(O), z(O);
  }
  function te(O, T) {
    if (O.opts.jtd)
      return B(O, [], !1, T);
    const D = (0, t.getSchemaTypes)(O.schema), V = (0, t.coerceAndCheckDataType)(O, D);
    B(O, D, !V, T);
  }
  function z(O) {
    const { schema: T, errSchemaPath: D, opts: V, self: W } = O;
    T.$ref && V.ignoreKeywordsWithRef && (0, u.schemaHasRulesButRef)(T, W.RULES) && W.logger.warn(`$ref: keywords ignored in schema at path "${D}"`);
  }
  function J(O) {
    const { schema: T, opts: D } = O;
    T.default !== void 0 && D.useDefaults && D.strictSchema && (0, u.checkStrictMode)(O, "default is ignored in the schema root");
  }
  function ee(O) {
    const T = O.schema[O.opts.schemaId];
    T && (O.baseId = (0, d.resolveUrl)(O.opts.uriResolver, O.baseId, T));
  }
  function Q(O) {
    if (O.schema.$async && !O.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function x({ gen: O, schemaEnv: T, schema: D, errSchemaPath: V, opts: W }) {
    const re = D.$comment;
    if (W.$comment === !0)
      O.code((0, c._)`${l.default.self}.logger.log(${re})`);
    else if (typeof W.$comment == "function") {
      const $e = (0, c.str)`${V}/$comment`, Ce = O.scopeValue("root", { ref: T.root });
      O.code((0, c._)`${l.default.self}.opts.$comment(${re}, ${$e}, ${Ce}.schema)`);
    }
  }
  function M(O) {
    const { gen: T, schemaEnv: D, validateName: V, ValidationError: W, opts: re } = O;
    D.$async ? T.if((0, c._)`${l.default.errors} === 0`, () => T.return(l.default.data), () => T.throw((0, c._)`new ${W}(${l.default.vErrors})`)) : (T.assign((0, c._)`${V}.errors`, l.default.vErrors), re.unevaluated && L(O), T.return((0, c._)`${l.default.errors} === 0`));
  }
  function L({ gen: O, evaluated: T, props: D, items: V }) {
    D instanceof c.Name && O.assign((0, c._)`${T}.props`, D), V instanceof c.Name && O.assign((0, c._)`${T}.items`, V);
  }
  function B(O, T, D, V) {
    const { gen: W, schema: re, data: $e, allErrors: Ce, opts: Se, self: be } = O, { RULES: _e } = be;
    if (re.$ref && (Se.ignoreKeywordsWithRef || !(0, u.schemaHasRulesButRef)(re, _e))) {
      W.block(() => k(O, "$ref", _e.all.$ref.definition));
      return;
    }
    Se.jtd || I(O, T), W.block(() => {
      for (const je of _e.rules)
        dt(je);
      dt(_e.post);
    });
    function dt(je) {
      (0, r.shouldUseGroup)(re, je) && (je.type ? (W.if((0, n.checkDataType)(je.type, $e, Se.strictNumbers)), U(O, je), T.length === 1 && T[0] === je.type && D && (W.else(), (0, n.reportTypeError)(O)), W.endIf()) : U(O, je), Ce || W.if((0, c._)`${l.default.errors} === ${V || 0}`));
    }
  }
  function U(O, T) {
    const { gen: D, schema: V, opts: { useDefaults: W } } = O;
    W && (0, s.assignDefaults)(O, T.type), D.block(() => {
      for (const re of T.rules)
        (0, r.shouldUseRule)(V, re) && k(O, re.keyword, re.definition, T.type);
    });
  }
  function I(O, T) {
    O.schemaEnv.meta || !O.opts.strictTypes || (A(O, T), O.opts.allowUnionTypes || S(O, T), m(O, O.dataTypes));
  }
  function A(O, T) {
    if (T.length) {
      if (!O.dataTypes.length) {
        O.dataTypes = T;
        return;
      }
      T.forEach((D) => {
        $(O.dataTypes, D) || f(O, `type "${D}" not allowed by context "${O.dataTypes.join(",")}"`);
      }), o(O, T);
    }
  }
  function S(O, T) {
    T.length > 1 && !(T.length === 2 && T.includes("null")) && f(O, "use allowUnionTypes to allow union type keyword");
  }
  function m(O, T) {
    const D = O.self.RULES.all;
    for (const V in D) {
      const W = D[V];
      if (typeof W == "object" && (0, r.shouldUseRule)(O.schema, W)) {
        const { type: re } = W.definition;
        re.length && !re.some(($e) => b(T, $e)) && f(O, `missing type "${re.join(",")}" for keyword "${V}"`);
      }
    }
  }
  function b(O, T) {
    return O.includes(T) || T === "number" && O.includes("integer");
  }
  function $(O, T) {
    return O.includes(T) || T === "integer" && O.includes("number");
  }
  function o(O, T) {
    const D = [];
    for (const V of O.dataTypes)
      $(T, V) ? D.push(V) : T.includes("integer") && V === "number" && D.push("integer");
    O.dataTypes = D;
  }
  function f(O, T) {
    const D = O.schemaEnv.baseId + O.errSchemaPath;
    T += ` at "${D}" (strictTypes)`, (0, u.checkStrictMode)(O, T, O.opts.strictTypes);
  }
  class P {
    constructor(T, D, V) {
      if ((0, a.validateKeywordUsage)(T, D, V), this.gen = T.gen, this.allErrors = T.allErrors, this.keyword = V, this.data = T.data, this.schema = T.schema[V], this.$data = D.$data && T.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, u.schemaRefOrVal)(T, this.schema, V, this.$data), this.schemaType = D.schemaType, this.parentSchema = T.schema, this.params = {}, this.it = T, this.def = D, this.$data)
        this.schemaCode = T.gen.const("vSchema", H(this.$data, T));
      else if (this.schemaCode = this.schemaValue, !(0, a.validSchemaType)(this.schema, D.schemaType, D.allowUndefined))
        throw new Error(`${V} value must be ${JSON.stringify(D.schemaType)}`);
      ("code" in D ? D.trackErrors : D.errors !== !1) && (this.errsCount = T.gen.const("_errs", l.default.errors));
    }
    result(T, D, V) {
      this.failResult((0, c.not)(T), D, V);
    }
    failResult(T, D, V) {
      this.gen.if(T), V ? V() : this.error(), D ? (this.gen.else(), D(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(T, D) {
      this.failResult((0, c.not)(T), void 0, D);
    }
    fail(T) {
      if (T === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(T), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(T) {
      if (!this.$data)
        return this.fail(T);
      const { schemaCode: D } = this;
      this.fail((0, c._)`${D} !== undefined && (${(0, c.or)(this.invalid$data(), T)})`);
    }
    error(T, D, V) {
      if (D) {
        this.setParams(D), this._error(T, V), this.setParams({});
        return;
      }
      this._error(T, V);
    }
    _error(T, D) {
      (T ? h.reportExtraError : h.reportError)(this, this.def.error, D);
    }
    $dataError() {
      (0, h.reportError)(this, this.def.$dataError || h.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, h.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(T) {
      this.allErrors || this.gen.if(T);
    }
    setParams(T, D) {
      D ? Object.assign(this.params, T) : this.params = T;
    }
    block$data(T, D, V = c.nil) {
      this.gen.block(() => {
        this.check$data(T, V), D();
      });
    }
    check$data(T = c.nil, D = c.nil) {
      if (!this.$data)
        return;
      const { gen: V, schemaCode: W, schemaType: re, def: $e } = this;
      V.if((0, c.or)((0, c._)`${W} === undefined`, D)), T !== c.nil && V.assign(T, !0), (re.length || $e.validateSchema) && (V.elseIf(this.invalid$data()), this.$dataError(), T !== c.nil && V.assign(T, !1)), V.else();
    }
    invalid$data() {
      const { gen: T, schemaCode: D, schemaType: V, def: W, it: re } = this;
      return (0, c.or)($e(), Ce());
      function $e() {
        if (V.length) {
          if (!(D instanceof c.Name))
            throw new Error("ajv implementation error");
          const Se = Array.isArray(V) ? V : [V];
          return (0, c._)`${(0, n.checkDataTypes)(Se, D, re.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return c.nil;
      }
      function Ce() {
        if (W.validateSchema) {
          const Se = T.scopeValue("validate$data", { ref: W.validateSchema });
          return (0, c._)`!${Se}(${D})`;
        }
        return c.nil;
      }
    }
    subschema(T, D) {
      const V = (0, i.getSubschema)(this.it, T);
      (0, i.extendSubschemaData)(V, this.it, T), (0, i.extendSubschemaMode)(V, T);
      const W = { ...this.it, ...V, items: void 0, props: void 0 };
      return N(W, D), W;
    }
    mergeEvaluated(T, D) {
      const { it: V, gen: W } = this;
      V.opts.unevaluated && (V.props !== !0 && T.props !== void 0 && (V.props = u.mergeEvaluated.props(W, T.props, V.props, D)), V.items !== !0 && T.items !== void 0 && (V.items = u.mergeEvaluated.items(W, T.items, V.items, D)));
    }
    mergeValidEvaluated(T, D) {
      const { it: V, gen: W } = this;
      if (V.opts.unevaluated && (V.props !== !0 || V.items !== !0))
        return W.if(D, () => this.mergeEvaluated(T, c.Name)), !0;
    }
  }
  gt.KeywordCxt = P;
  function k(O, T, D, V) {
    const W = new P(O, D, T);
    "code" in D ? D.code(W, V) : W.$data && D.validate ? (0, a.funcKeywordCode)(W, D) : "macro" in D ? (0, a.macroKeywordCode)(W, D) : (D.compile || D.validate) && (0, a.funcKeywordCode)(W, D);
  }
  const C = /^\/(?:[^~]|~0|~1)*$/, X = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function H(O, { dataLevel: T, dataNames: D, dataPathArr: V }) {
    let W, re;
    if (O === "")
      return l.default.rootData;
    if (O[0] === "/") {
      if (!C.test(O))
        throw new Error(`Invalid JSON-pointer: ${O}`);
      W = O, re = l.default.rootData;
    } else {
      const be = X.exec(O);
      if (!be)
        throw new Error(`Invalid JSON-pointer: ${O}`);
      const _e = +be[1];
      if (W = be[2], W === "#") {
        if (_e >= T)
          throw new Error(Se("property/index", _e));
        return V[T - _e];
      }
      if (_e > T)
        throw new Error(Se("data", _e));
      if (re = D[T - _e], !W)
        return re;
    }
    let $e = re;
    const Ce = W.split("/");
    for (const be of Ce)
      be && (re = (0, c._)`${re}${(0, c.getProperty)((0, u.unescapeJsonPointer)(be))}`, $e = (0, c._)`${$e} && ${re}`);
    return $e;
    function Se(be, _e) {
      return `Cannot access ${be} ${_e} levels up, current level is ${T}`;
    }
  }
  return gt.getData = H, gt;
}
var on = {}, Pi;
function to() {
  if (Pi) return on;
  Pi = 1, Object.defineProperty(on, "__esModule", { value: !0 });
  class e extends Error {
    constructor(r) {
      super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
    }
  }
  return on.default = e, on;
}
var gr = {};
Object.defineProperty(gr, "__esModule", { value: !0 });
const ps = Ie;
class xy extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, ps.resolveUrl)(t, r, n), this.missingSchema = (0, ps.normalizeId)((0, ps.getFullPath)(t, this.missingRef));
  }
}
gr.default = xy;
var He = {};
Object.defineProperty(He, "__esModule", { value: !0 });
He.resolveSchema = He.getCompilingSchema = He.resolveRef = He.compileSchema = He.SchemaEnv = void 0;
const tt = ae, e$ = to(), zt = _t, ot = Ie, Ni = G, t$ = Yn();
class Qn {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, ot.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
He.SchemaEnv = Qn;
function ro(e) {
  const t = Yl.call(this, e);
  if (t)
    return t;
  const r = (0, ot.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, i = new tt.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let c;
  e.$async && (c = i.scopeValue("Error", {
    ref: e$.default,
    code: (0, tt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const l = i.scopeName("validate");
  e.validateName = l;
  const d = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: zt.default.data,
    parentData: zt.default.parentData,
    parentDataProperty: zt.default.parentDataProperty,
    dataNames: [zt.default.data],
    dataPathArr: [tt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, tt.stringify)(e.schema) } : { ref: e.schema }),
    validateName: l,
    ValidationError: c,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: tt.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, tt._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, t$.validateFunctionCode)(d), i.optimize(this.opts.code.optimize);
    const h = i.toString();
    u = `${i.scopeRefs(zt.default.scope)}return ${h}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const y = new Function(`${zt.default.self}`, `${zt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(l, { ref: y }), y.errors = null, y.schema = e.schema, y.schemaEnv = e, e.$async && (y.$async = !0), this.opts.code.source === !0 && (y.source = { validateName: l, validateCode: h, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: E, items: g } = d;
      y.evaluated = {
        props: E instanceof tt.Name ? void 0 : E,
        items: g instanceof tt.Name ? void 0 : g,
        dynamicProps: E instanceof tt.Name,
        dynamicItems: g instanceof tt.Name
      }, y.source && (y.source.evaluated = (0, tt.stringify)(y.evaluated));
    }
    return e.validate = y, e;
  } catch (h) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), h;
  } finally {
    this._compilations.delete(e);
  }
}
He.compileSchema = ro;
function r$(e, t, r) {
  var n;
  r = (0, ot.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = a$.call(this, e, r);
  if (a === void 0) {
    const i = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: c } = this.opts;
    i && (a = new Qn({ schema: i, schemaId: c, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = n$.call(this, a);
}
He.resolveRef = r$;
function n$(e) {
  return (0, ot.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : ro.call(this, e);
}
function Yl(e) {
  for (const t of this._compilations)
    if (s$(t, e))
      return t;
}
He.getCompilingSchema = Yl;
function s$(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function a$(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || Zn.call(this, e, t);
}
function Zn(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, ot._getFullPath)(this.opts.uriResolver, r);
  let s = (0, ot.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return ms.call(this, r, e);
  const a = (0, ot.normalizeId)(n), i = this.refs[a] || this.schemas[a];
  if (typeof i == "string") {
    const c = Zn.call(this, e, i);
    return typeof (c == null ? void 0 : c.schema) != "object" ? void 0 : ms.call(this, r, c);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || ro.call(this, i), a === (0, ot.normalizeId)(t)) {
      const { schema: c } = i, { schemaId: l } = this.opts, d = c[l];
      return d && (s = (0, ot.resolveUrl)(this.opts.uriResolver, s, d)), new Qn({ schema: c, schemaId: l, root: e, baseId: s });
    }
    return ms.call(this, r, i);
  }
}
He.resolveSchema = Zn;
const o$ = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function ms(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const c of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const l = r[(0, Ni.unescapeFragment)(c)];
    if (l === void 0)
      return;
    r = l;
    const d = typeof r == "object" && r[this.opts.schemaId];
    !o$.has(c) && d && (t = (0, ot.resolveUrl)(this.opts.uriResolver, t, d));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Ni.schemaHasRulesButRef)(r, this.RULES)) {
    const c = (0, ot.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = Zn.call(this, n, c);
  }
  const { schemaId: i } = this.opts;
  if (a = a || new Qn({ schema: r, schemaId: i, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const i$ = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", c$ = "Meta-schema for $data reference (JSON AnySchema extension proposal)", l$ = "object", u$ = [
  "$data"
], d$ = {
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
}, f$ = !1, h$ = {
  $id: i$,
  description: c$,
  type: l$,
  required: u$,
  properties: d$,
  additionalProperties: f$
};
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
const Ql = Sl;
Ql.code = 'require("ajv/dist/runtime/uri").default';
no.default = Ql;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = Yn();
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = ae;
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
  const n = to(), s = gr, a = Yt, i = He, c = ae, l = Ie, d = we, u = G, h = h$, w = no, y = (S, m) => new RegExp(S, m);
  y.code = "new RegExp";
  const E = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
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
  ]), _ = {
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
  }, v = 200;
  function N(S) {
    var m, b, $, o, f, P, k, C, X, H, O, T, D, V, W, re, $e, Ce, Se, be, _e, dt, je, Dt, Mt;
    const Ze = S.strict, Lt = (m = S.code) === null || m === void 0 ? void 0 : m.optimize, Sr = Lt === !0 || Lt === void 0 ? 1 : Lt || 0, br = ($ = (b = S.code) === null || b === void 0 ? void 0 : b.regExp) !== null && $ !== void 0 ? $ : y, cs = (o = S.uriResolver) !== null && o !== void 0 ? o : w.default;
    return {
      strictSchema: (P = (f = S.strictSchema) !== null && f !== void 0 ? f : Ze) !== null && P !== void 0 ? P : !0,
      strictNumbers: (C = (k = S.strictNumbers) !== null && k !== void 0 ? k : Ze) !== null && C !== void 0 ? C : !0,
      strictTypes: (H = (X = S.strictTypes) !== null && X !== void 0 ? X : Ze) !== null && H !== void 0 ? H : "log",
      strictTuples: (T = (O = S.strictTuples) !== null && O !== void 0 ? O : Ze) !== null && T !== void 0 ? T : "log",
      strictRequired: (V = (D = S.strictRequired) !== null && D !== void 0 ? D : Ze) !== null && V !== void 0 ? V : !1,
      code: S.code ? { ...S.code, optimize: Sr, regExp: br } : { optimize: Sr, regExp: br },
      loopRequired: (W = S.loopRequired) !== null && W !== void 0 ? W : v,
      loopEnum: (re = S.loopEnum) !== null && re !== void 0 ? re : v,
      meta: ($e = S.meta) !== null && $e !== void 0 ? $e : !0,
      messages: (Ce = S.messages) !== null && Ce !== void 0 ? Ce : !0,
      inlineRefs: (Se = S.inlineRefs) !== null && Se !== void 0 ? Se : !0,
      schemaId: (be = S.schemaId) !== null && be !== void 0 ? be : "$id",
      addUsedSchema: (_e = S.addUsedSchema) !== null && _e !== void 0 ? _e : !0,
      validateSchema: (dt = S.validateSchema) !== null && dt !== void 0 ? dt : !0,
      validateFormats: (je = S.validateFormats) !== null && je !== void 0 ? je : !0,
      unicodeRegExp: (Dt = S.unicodeRegExp) !== null && Dt !== void 0 ? Dt : !0,
      int32range: (Mt = S.int32range) !== null && Mt !== void 0 ? Mt : !0,
      uriResolver: cs
    };
  }
  class R {
    constructor(m = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), m = this.opts = { ...m, ...N(m) };
      const { es5: b, lines: $ } = this.opts.code;
      this.scope = new c.ValueScope({ scope: {}, prefixes: g, es5: b, lines: $ }), this.logger = Q(m.logger);
      const o = m.validateFormats;
      m.validateFormats = !1, this.RULES = (0, a.getRules)(), j.call(this, _, m, "NOT SUPPORTED"), j.call(this, p, m, "DEPRECATED", "warn"), this._metaOpts = J.call(this), m.formats && te.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), m.keywords && z.call(this, m.keywords), typeof m.meta == "object" && this.addMetaSchema(m.meta), q.call(this), m.validateFormats = o;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: m, meta: b, schemaId: $ } = this.opts;
      let o = h;
      $ === "id" && (o = { ...h }, o.id = o.$id, delete o.$id), b && m && this.addMetaSchema(o, o[$], !1);
    }
    defaultMeta() {
      const { meta: m, schemaId: b } = this.opts;
      return this.opts.defaultMeta = typeof m == "object" ? m[b] || m : void 0;
    }
    validate(m, b) {
      let $;
      if (typeof m == "string") {
        if ($ = this.getSchema(m), !$)
          throw new Error(`no schema with key or ref "${m}"`);
      } else
        $ = this.compile(m);
      const o = $(b);
      return "$async" in $ || (this.errors = $.errors), o;
    }
    compile(m, b) {
      const $ = this._addSchema(m, b);
      return $.validate || this._compileSchemaEnv($);
    }
    compileAsync(m, b) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: $ } = this.opts;
      return o.call(this, m, b);
      async function o(H, O) {
        await f.call(this, H.$schema);
        const T = this._addSchema(H, O);
        return T.validate || P.call(this, T);
      }
      async function f(H) {
        H && !this.getSchema(H) && await o.call(this, { $ref: H }, !0);
      }
      async function P(H) {
        try {
          return this._compileSchemaEnv(H);
        } catch (O) {
          if (!(O instanceof s.default))
            throw O;
          return k.call(this, O), await C.call(this, O.missingSchema), P.call(this, H);
        }
      }
      function k({ missingSchema: H, missingRef: O }) {
        if (this.refs[H])
          throw new Error(`AnySchema ${H} is loaded but ${O} cannot be resolved`);
      }
      async function C(H) {
        const O = await X.call(this, H);
        this.refs[H] || await f.call(this, O.$schema), this.refs[H] || this.addSchema(O, H, b);
      }
      async function X(H) {
        const O = this._loading[H];
        if (O)
          return O;
        try {
          return await (this._loading[H] = $(H));
        } finally {
          delete this._loading[H];
        }
      }
    }
    // Adds schema to the instance
    addSchema(m, b, $, o = this.opts.validateSchema) {
      if (Array.isArray(m)) {
        for (const P of m)
          this.addSchema(P, void 0, $, o);
        return this;
      }
      let f;
      if (typeof m == "object") {
        const { schemaId: P } = this.opts;
        if (f = m[P], f !== void 0 && typeof f != "string")
          throw new Error(`schema ${P} must be string`);
      }
      return b = (0, l.normalizeId)(b || f), this._checkUnique(b), this.schemas[b] = this._addSchema(m, $, b, o, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(m, b, $ = this.opts.validateSchema) {
      return this.addSchema(m, b, !0, $), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(m, b) {
      if (typeof m == "boolean")
        return !0;
      let $;
      if ($ = m.$schema, $ !== void 0 && typeof $ != "string")
        throw new Error("$schema must be a string");
      if ($ = $ || this.opts.defaultMeta || this.defaultMeta(), !$)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const o = this.validate($, m);
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
      for (; typeof (b = F.call(this, m)) == "string"; )
        m = b;
      if (b === void 0) {
        const { schemaId: $ } = this.opts, o = new i.SchemaEnv({ schema: {}, schemaId: $ });
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
          const b = F.call(this, m);
          return typeof b == "object" && this._cache.delete(b.schema), delete this.schemas[m], delete this.refs[m], this;
        }
        case "object": {
          const b = m;
          this._cache.delete(b);
          let $ = m[this.opts.schemaId];
          return $ && ($ = (0, l.normalizeId)($), delete this.schemas[$], delete this.refs[$]), this;
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
      let $;
      if (typeof m == "string")
        $ = m, typeof b == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), b.keyword = $);
      else if (typeof m == "object" && b === void 0) {
        if (b = m, $ = b.keyword, Array.isArray($) && !$.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (M.call(this, $, b), !b)
        return (0, u.eachItem)($, (f) => L.call(this, f)), this;
      U.call(this, b);
      const o = {
        ...b,
        type: (0, d.getJSONTypes)(b.type),
        schemaType: (0, d.getJSONTypes)(b.schemaType)
      };
      return (0, u.eachItem)($, o.type.length === 0 ? (f) => L.call(this, f, o) : (f) => o.type.forEach((P) => L.call(this, f, o, P))), this;
    }
    getKeyword(m) {
      const b = this.RULES.all[m];
      return typeof b == "object" ? b.definition : !!b;
    }
    // Remove keyword
    removeKeyword(m) {
      const { RULES: b } = this;
      delete b.keywords[m], delete b.all[m];
      for (const $ of b.rules) {
        const o = $.rules.findIndex((f) => f.keyword === m);
        o >= 0 && $.rules.splice(o, 1);
      }
      return this;
    }
    // Add format
    addFormat(m, b) {
      return typeof b == "string" && (b = new RegExp(b)), this.formats[m] = b, this;
    }
    errorsText(m = this.errors, { separator: b = ", ", dataVar: $ = "data" } = {}) {
      return !m || m.length === 0 ? "No errors" : m.map((o) => `${$}${o.instancePath} ${o.message}`).reduce((o, f) => o + b + f);
    }
    $dataMetaSchema(m, b) {
      const $ = this.RULES.all;
      m = JSON.parse(JSON.stringify(m));
      for (const o of b) {
        const f = o.split("/").slice(1);
        let P = m;
        for (const k of f)
          P = P[k];
        for (const k in $) {
          const C = $[k];
          if (typeof C != "object")
            continue;
          const { $data: X } = C.definition, H = P[k];
          X && H && (P[k] = A(H));
        }
      }
      return m;
    }
    _removeAllSchemas(m, b) {
      for (const $ in m) {
        const o = m[$];
        (!b || b.test($)) && (typeof o == "string" ? delete m[$] : o && !o.meta && (this._cache.delete(o.schema), delete m[$]));
      }
    }
    _addSchema(m, b, $, o = this.opts.validateSchema, f = this.opts.addUsedSchema) {
      let P;
      const { schemaId: k } = this.opts;
      if (typeof m == "object")
        P = m[k];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof m != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let C = this._cache.get(m);
      if (C !== void 0)
        return C;
      $ = (0, l.normalizeId)(P || $);
      const X = l.getSchemaRefs.call(this, m, $);
      return C = new i.SchemaEnv({ schema: m, schemaId: k, meta: b, baseId: $, localRefs: X }), this._cache.set(C.schema, C), f && !$.startsWith("#") && ($ && this._checkUnique($), this.refs[$] = C), o && this.validateSchema(m, !0), C;
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
  R.ValidationError = n.default, R.MissingRefError = s.default, e.default = R;
  function j(S, m, b, $ = "error") {
    for (const o in S) {
      const f = o;
      f in m && this.logger[$](`${b}: option ${o}. ${S[f]}`);
    }
  }
  function F(S) {
    return S = (0, l.normalizeId)(S), this.schemas[S] || this.refs[S];
  }
  function q() {
    const S = this.opts.schemas;
    if (S)
      if (Array.isArray(S))
        this.addSchema(S);
      else
        for (const m in S)
          this.addSchema(S[m], m);
  }
  function te() {
    for (const S in this.opts.formats) {
      const m = this.opts.formats[S];
      m && this.addFormat(S, m);
    }
  }
  function z(S) {
    if (Array.isArray(S)) {
      this.addVocabulary(S);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const m in S) {
      const b = S[m];
      b.keyword || (b.keyword = m), this.addKeyword(b);
    }
  }
  function J() {
    const S = { ...this.opts };
    for (const m of E)
      delete S[m];
    return S;
  }
  const ee = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(S) {
    if (S === !1)
      return ee;
    if (S === void 0)
      return console;
    if (S.log && S.warn && S.error)
      return S;
    throw new Error("logger must implement log, warn and error methods");
  }
  const x = /^[a-z_$][a-z0-9_$:-]*$/i;
  function M(S, m) {
    const { RULES: b } = this;
    if ((0, u.eachItem)(S, ($) => {
      if (b.keywords[$])
        throw new Error(`Keyword ${$} is already defined`);
      if (!x.test($))
        throw new Error(`Keyword ${$} has invalid name`);
    }), !!m && m.$data && !("code" in m || "validate" in m))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function L(S, m, b) {
    var $;
    const o = m == null ? void 0 : m.post;
    if (b && o)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: f } = this;
    let P = o ? f.post : f.rules.find(({ type: C }) => C === b);
    if (P || (P = { type: b, rules: [] }, f.rules.push(P)), f.keywords[S] = !0, !m)
      return;
    const k = {
      keyword: S,
      definition: {
        ...m,
        type: (0, d.getJSONTypes)(m.type),
        schemaType: (0, d.getJSONTypes)(m.schemaType)
      }
    };
    m.before ? B.call(this, P, k, m.before) : P.rules.push(k), f.all[S] = k, ($ = m.implements) === null || $ === void 0 || $.forEach((C) => this.addKeyword(C));
  }
  function B(S, m, b) {
    const $ = S.rules.findIndex((o) => o.keyword === b);
    $ >= 0 ? S.rules.splice($, 0, m) : (S.rules.push(m), this.logger.warn(`rule ${b} is not defined`));
  }
  function U(S) {
    let { metaSchema: m } = S;
    m !== void 0 && (S.$data && this.opts.$data && (m = A(m)), S.validateSchema = this.compile(m, !0));
  }
  const I = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function A(S) {
    return { anyOf: [S, I] };
  }
})(Dl);
var so = {}, ao = {}, oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
const p$ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
oo.default = p$;
var Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.callRef = Qt.getValidate = void 0;
const m$ = gr, Oi = ct(), qe = ae, tr = _t, Ri = He, cn = G, y$ = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: i, opts: c, self: l } = n, { root: d } = a;
    if ((r === "#" || r === "#/") && s === d.baseId)
      return h();
    const u = Ri.resolveRef.call(l, d, s, r);
    if (u === void 0)
      throw new m$.default(n.opts.uriResolver, s, r);
    if (u instanceof Ri.SchemaEnv)
      return w(u);
    return y(u);
    function h() {
      if (a === d)
        return Pn(e, i, a, a.$async);
      const E = t.scopeValue("root", { ref: d });
      return Pn(e, (0, qe._)`${E}.validate`, d, d.$async);
    }
    function w(E) {
      const g = Zl(e, E);
      Pn(e, g, E, E.$async);
    }
    function y(E) {
      const g = t.scopeValue("schema", c.code.source === !0 ? { ref: E, code: (0, qe.stringify)(E) } : { ref: E }), _ = t.name("valid"), p = e.subschema({
        schema: E,
        dataTypes: [],
        schemaPath: qe.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, _);
      e.mergeEvaluated(p), e.ok(_);
    }
  }
};
function Zl(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, qe._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Qt.getValidate = Zl;
function Pn(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: i, schemaEnv: c, opts: l } = a, d = l.passContext ? tr.default.this : qe.nil;
  n ? u() : h();
  function u() {
    if (!c.$async)
      throw new Error("async schema referenced by sync schema");
    const E = s.let("valid");
    s.try(() => {
      s.code((0, qe._)`await ${(0, Oi.callValidateCode)(e, t, d)}`), y(t), i || s.assign(E, !0);
    }, (g) => {
      s.if((0, qe._)`!(${g} instanceof ${a.ValidationError})`, () => s.throw(g)), w(g), i || s.assign(E, !1);
    }), e.ok(E);
  }
  function h() {
    e.result((0, Oi.callValidateCode)(e, t, d), () => y(t), () => w(t));
  }
  function w(E) {
    const g = (0, qe._)`${E}.errors`;
    s.assign(tr.default.vErrors, (0, qe._)`${tr.default.vErrors} === null ? ${g} : ${tr.default.vErrors}.concat(${g})`), s.assign(tr.default.errors, (0, qe._)`${tr.default.vErrors}.length`);
  }
  function y(E) {
    var g;
    if (!a.opts.unevaluated)
      return;
    const _ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (a.props !== !0)
      if (_ && !_.dynamicProps)
        _.props !== void 0 && (a.props = cn.mergeEvaluated.props(s, _.props, a.props));
      else {
        const p = s.var("props", (0, qe._)`${E}.evaluated.props`);
        a.props = cn.mergeEvaluated.props(s, p, a.props, qe.Name);
      }
    if (a.items !== !0)
      if (_ && !_.dynamicItems)
        _.items !== void 0 && (a.items = cn.mergeEvaluated.items(s, _.items, a.items));
      else {
        const p = s.var("items", (0, qe._)`${E}.evaluated.items`);
        a.items = cn.mergeEvaluated.items(s, p, a.items, qe.Name);
      }
  }
}
Qt.callRef = Pn;
Qt.default = y$;
Object.defineProperty(ao, "__esModule", { value: !0 });
const $$ = oo, _$ = Qt, g$ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  $$.default,
  _$.default
];
ao.default = g$;
var io = {}, co = {};
Object.defineProperty(co, "__esModule", { value: !0 });
const Ln = ae, Ot = Ln.operators, Fn = {
  maximum: { okStr: "<=", ok: Ot.LTE, fail: Ot.GT },
  minimum: { okStr: ">=", ok: Ot.GTE, fail: Ot.LT },
  exclusiveMaximum: { okStr: "<", ok: Ot.LT, fail: Ot.GTE },
  exclusiveMinimum: { okStr: ">", ok: Ot.GT, fail: Ot.LTE }
}, v$ = {
  message: ({ keyword: e, schemaCode: t }) => (0, Ln.str)`must be ${Fn[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, Ln._)`{comparison: ${Fn[e].okStr}, limit: ${t}}`
}, E$ = {
  keyword: Object.keys(Fn),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: v$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, Ln._)`${r} ${Fn[t].fail} ${n} || isNaN(${r})`);
  }
};
co.default = E$;
var lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
const Vr = ae, w$ = {
  message: ({ schemaCode: e }) => (0, Vr.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Vr._)`{multipleOf: ${e}}`
}, S$ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: w$,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, i = t.let("res"), c = a ? (0, Vr._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${a}` : (0, Vr._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Vr._)`(${n} === 0 || (${i} = ${r}/${n}, ${c}))`);
  }
};
lo.default = S$;
var uo = {}, fo = {};
Object.defineProperty(fo, "__esModule", { value: !0 });
function xl(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
fo.default = xl;
xl.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(uo, "__esModule", { value: !0 });
const Bt = ae, b$ = G, P$ = fo, N$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Bt.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Bt._)`{limit: ${e}}`
}, O$ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: N$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? Bt.operators.GT : Bt.operators.LT, i = s.opts.unicode === !1 ? (0, Bt._)`${r}.length` : (0, Bt._)`${(0, b$.useFunc)(e.gen, P$.default)}(${r})`;
    e.fail$data((0, Bt._)`${i} ${a} ${n}`);
  }
};
uo.default = O$;
var ho = {};
Object.defineProperty(ho, "__esModule", { value: !0 });
const R$ = ct(), Vn = ae, T$ = {
  message: ({ schemaCode: e }) => (0, Vn.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Vn._)`{pattern: ${e}}`
}, I$ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: T$,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, i = a.opts.unicodeRegExp ? "u" : "", c = r ? (0, Vn._)`(new RegExp(${s}, ${i}))` : (0, R$.usePattern)(e, n);
    e.fail$data((0, Vn._)`!${c}.test(${t})`);
  }
};
ho.default = I$;
var po = {};
Object.defineProperty(po, "__esModule", { value: !0 });
const Ur = ae, j$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Ur.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Ur._)`{limit: ${e}}`
}, A$ = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: j$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Ur.operators.GT : Ur.operators.LT;
    e.fail$data((0, Ur._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
po.default = A$;
var mo = {};
Object.defineProperty(mo, "__esModule", { value: !0 });
const Rr = ct(), zr = ae, k$ = G, C$ = {
  message: ({ params: { missingProperty: e } }) => (0, zr.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, zr._)`{missingProperty: ${e}}`
}, D$ = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: C$,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: i } = e, { opts: c } = i;
    if (!a && r.length === 0)
      return;
    const l = r.length >= c.loopRequired;
    if (i.allErrors ? d() : u(), c.strictRequired) {
      const y = e.parentSchema.properties, { definedProperties: E } = e.it;
      for (const g of r)
        if ((y == null ? void 0 : y[g]) === void 0 && !E.has(g)) {
          const _ = i.schemaEnv.baseId + i.errSchemaPath, p = `required property "${g}" is not defined at "${_}" (strictRequired)`;
          (0, k$.checkStrictMode)(i, p, i.opts.strictRequired);
        }
    }
    function d() {
      if (l || a)
        e.block$data(zr.nil, h);
      else
        for (const y of r)
          (0, Rr.checkReportMissingProp)(e, y);
    }
    function u() {
      const y = t.let("missing");
      if (l || a) {
        const E = t.let("valid", !0);
        e.block$data(E, () => w(y, E)), e.ok(E);
      } else
        t.if((0, Rr.checkMissingProp)(e, r, y)), (0, Rr.reportMissingProp)(e, y), t.else();
    }
    function h() {
      t.forOf("prop", n, (y) => {
        e.setParams({ missingProperty: y }), t.if((0, Rr.noPropertyInData)(t, s, y, c.ownProperties), () => e.error());
      });
    }
    function w(y, E) {
      e.setParams({ missingProperty: y }), t.forOf(y, n, () => {
        t.assign(E, (0, Rr.propertyInData)(t, s, y, c.ownProperties)), t.if((0, zr.not)(E), () => {
          e.error(), t.break();
        });
      }, zr.nil);
    }
  }
};
mo.default = D$;
var yo = {};
Object.defineProperty(yo, "__esModule", { value: !0 });
const qr = ae, M$ = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, qr.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, qr._)`{limit: ${e}}`
}, L$ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: M$,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? qr.operators.GT : qr.operators.LT;
    e.fail$data((0, qr._)`${r}.length ${s} ${n}`);
  }
};
yo.default = L$;
var $o = {}, Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
const eu = Gn;
eu.code = 'require("ajv/dist/runtime/equal").default';
Wr.default = eu;
Object.defineProperty($o, "__esModule", { value: !0 });
const ys = we, Oe = ae, F$ = G, V$ = Wr, U$ = {
  message: ({ params: { i: e, j: t } }) => (0, Oe.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Oe._)`{i: ${e}, j: ${t}}`
}, z$ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: U$,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: i, it: c } = e;
    if (!n && !s)
      return;
    const l = t.let("valid"), d = a.items ? (0, ys.getSchemaTypes)(a.items) : [];
    e.block$data(l, u, (0, Oe._)`${i} === false`), e.ok(l);
    function u() {
      const E = t.let("i", (0, Oe._)`${r}.length`), g = t.let("j");
      e.setParams({ i: E, j: g }), t.assign(l, !0), t.if((0, Oe._)`${E} > 1`, () => (h() ? w : y)(E, g));
    }
    function h() {
      return d.length > 0 && !d.some((E) => E === "object" || E === "array");
    }
    function w(E, g) {
      const _ = t.name("item"), p = (0, ys.checkDataTypes)(d, _, c.opts.strictNumbers, ys.DataType.Wrong), v = t.const("indices", (0, Oe._)`{}`);
      t.for((0, Oe._)`;${E}--;`, () => {
        t.let(_, (0, Oe._)`${r}[${E}]`), t.if(p, (0, Oe._)`continue`), d.length > 1 && t.if((0, Oe._)`typeof ${_} == "string"`, (0, Oe._)`${_} += "_"`), t.if((0, Oe._)`typeof ${v}[${_}] == "number"`, () => {
          t.assign(g, (0, Oe._)`${v}[${_}]`), e.error(), t.assign(l, !1).break();
        }).code((0, Oe._)`${v}[${_}] = ${E}`);
      });
    }
    function y(E, g) {
      const _ = (0, F$.useFunc)(t, V$.default), p = t.name("outer");
      t.label(p).for((0, Oe._)`;${E}--;`, () => t.for((0, Oe._)`${g} = ${E}; ${g}--;`, () => t.if((0, Oe._)`${_}(${r}[${E}], ${r}[${g}])`, () => {
        e.error(), t.assign(l, !1).break(p);
      })));
    }
  }
};
$o.default = z$;
var _o = {};
Object.defineProperty(_o, "__esModule", { value: !0 });
const Us = ae, q$ = G, K$ = Wr, G$ = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Us._)`{allowedValue: ${e}}`
}, H$ = {
  keyword: "const",
  $data: !0,
  error: G$,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, Us._)`!${(0, q$.useFunc)(t, K$.default)}(${r}, ${s})`) : e.fail((0, Us._)`${a} !== ${r}`);
  }
};
_o.default = H$;
var go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
const Ar = ae, B$ = G, J$ = Wr, X$ = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Ar._)`{allowedValues: ${e}}`
}, W$ = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: X$,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: i } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const c = s.length >= i.opts.loopEnum;
    let l;
    const d = () => l ?? (l = (0, B$.useFunc)(t, J$.default));
    let u;
    if (c || n)
      u = t.let("valid"), e.block$data(u, h);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const y = t.const("vSchema", a);
      u = (0, Ar.or)(...s.map((E, g) => w(y, g)));
    }
    e.pass(u);
    function h() {
      t.assign(u, !1), t.forOf("v", a, (y) => t.if((0, Ar._)`${d()}(${r}, ${y})`, () => t.assign(u, !0).break()));
    }
    function w(y, E) {
      const g = s[E];
      return typeof g == "object" && g !== null ? (0, Ar._)`${d()}(${r}, ${y}[${E}])` : (0, Ar._)`${r} === ${g}`;
    }
  }
};
go.default = W$;
Object.defineProperty(io, "__esModule", { value: !0 });
const Y$ = co, Q$ = lo, Z$ = uo, x$ = ho, e_ = po, t_ = mo, r_ = yo, n_ = $o, s_ = _o, a_ = go, o_ = [
  // number
  Y$.default,
  Q$.default,
  // string
  Z$.default,
  x$.default,
  // object
  e_.default,
  t_.default,
  // array
  r_.default,
  n_.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  s_.default,
  a_.default
];
io.default = o_;
var vo = {}, vr = {};
Object.defineProperty(vr, "__esModule", { value: !0 });
vr.validateAdditionalItems = void 0;
const Jt = ae, zs = G, i_ = {
  message: ({ params: { len: e } }) => (0, Jt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Jt._)`{limit: ${e}}`
}, c_ = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: i_,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, zs.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    tu(e, n);
  }
};
function tu(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: i } = e;
  i.items = !0;
  const c = r.const("len", (0, Jt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Jt._)`${c} <= ${t.length}`);
  else if (typeof n == "object" && !(0, zs.alwaysValidSchema)(i, n)) {
    const d = r.var("valid", (0, Jt._)`${c} <= ${t.length}`);
    r.if((0, Jt.not)(d), () => l(d)), e.ok(d);
  }
  function l(d) {
    r.forRange("i", t.length, c, (u) => {
      e.subschema({ keyword: a, dataProp: u, dataPropType: zs.Type.Num }, d), i.allErrors || r.if((0, Jt.not)(d), () => r.break());
    });
  }
}
vr.validateAdditionalItems = tu;
vr.default = c_;
var Eo = {}, Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.validateTuple = void 0;
const Ti = ae, Nn = G, l_ = ct(), u_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return ru(e, "additionalItems", t);
    r.items = !0, !(0, Nn.alwaysValidSchema)(r, t) && e.ok((0, l_.validateArray)(e));
  }
};
function ru(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: i, it: c } = e;
  u(s), c.opts.unevaluated && r.length && c.items !== !0 && (c.items = Nn.mergeEvaluated.items(n, r.length, c.items));
  const l = n.name("valid"), d = n.const("len", (0, Ti._)`${a}.length`);
  r.forEach((h, w) => {
    (0, Nn.alwaysValidSchema)(c, h) || (n.if((0, Ti._)`${d} > ${w}`, () => e.subschema({
      keyword: i,
      schemaProp: w,
      dataProp: w
    }, l)), e.ok(l));
  });
  function u(h) {
    const { opts: w, errSchemaPath: y } = c, E = r.length, g = E === h.minItems && (E === h.maxItems || h[t] === !1);
    if (w.strictTuples && !g) {
      const _ = `"${i}" is ${E}-tuple, but minItems or maxItems/${t} are not specified or different at path "${y}"`;
      (0, Nn.checkStrictMode)(c, _, w.strictTuples);
    }
  }
}
Er.validateTuple = ru;
Er.default = u_;
Object.defineProperty(Eo, "__esModule", { value: !0 });
const d_ = Er, f_ = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, d_.validateTuple)(e, "items")
};
Eo.default = f_;
var wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
const Ii = ae, h_ = G, p_ = ct(), m_ = vr, y_ = {
  message: ({ params: { len: e } }) => (0, Ii.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Ii._)`{limit: ${e}}`
}, $_ = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: y_,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, h_.alwaysValidSchema)(n, t) && (s ? (0, m_.validateAdditionalItems)(e, s) : e.ok((0, p_.validateArray)(e)));
  }
};
wo.default = $_;
var So = {};
Object.defineProperty(So, "__esModule", { value: !0 });
const Ye = ae, ln = G, __ = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ye.str)`must contain at least ${e} valid item(s)` : (0, Ye.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ye._)`{minContains: ${e}}` : (0, Ye._)`{minContains: ${e}, maxContains: ${t}}`
}, g_ = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: __,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let i, c;
    const { minContains: l, maxContains: d } = n;
    a.opts.next ? (i = l === void 0 ? 1 : l, c = d) : i = 1;
    const u = t.const("len", (0, Ye._)`${s}.length`);
    if (e.setParams({ min: i, max: c }), c === void 0 && i === 0) {
      (0, ln.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (c !== void 0 && i > c) {
      (0, ln.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, ln.alwaysValidSchema)(a, r)) {
      let g = (0, Ye._)`${u} >= ${i}`;
      c !== void 0 && (g = (0, Ye._)`${g} && ${u} <= ${c}`), e.pass(g);
      return;
    }
    a.items = !0;
    const h = t.name("valid");
    c === void 0 && i === 1 ? y(h, () => t.if(h, () => t.break())) : i === 0 ? (t.let(h, !0), c !== void 0 && t.if((0, Ye._)`${s}.length > 0`, w)) : (t.let(h, !1), w()), e.result(h, () => e.reset());
    function w() {
      const g = t.name("_valid"), _ = t.let("count", 0);
      y(g, () => t.if(g, () => E(_)));
    }
    function y(g, _) {
      t.forRange("i", 0, u, (p) => {
        e.subschema({
          keyword: "contains",
          dataProp: p,
          dataPropType: ln.Type.Num,
          compositeRule: !0
        }, g), _();
      });
    }
    function E(g) {
      t.code((0, Ye._)`${g}++`), c === void 0 ? t.if((0, Ye._)`${g} >= ${i}`, () => t.assign(h, !0).break()) : (t.if((0, Ye._)`${g} > ${c}`, () => t.assign(h, !1).break()), i === 1 ? t.assign(h, !0) : t.if((0, Ye._)`${g} >= ${i}`, () => t.assign(h, !0)));
    }
  }
};
So.default = g_;
var nu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = ae, r = G, n = ct();
  e.error = {
    message: ({ params: { property: l, depsCount: d, deps: u } }) => {
      const h = d === 1 ? "property" : "properties";
      return (0, t.str)`must have ${h} ${u} when property ${l} is present`;
    },
    params: ({ params: { property: l, depsCount: d, deps: u, missingProperty: h } }) => (0, t._)`{property: ${l},
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
    code(l) {
      const [d, u] = a(l);
      i(l, d), c(l, u);
    }
  };
  function a({ schema: l }) {
    const d = {}, u = {};
    for (const h in l) {
      if (h === "__proto__")
        continue;
      const w = Array.isArray(l[h]) ? d : u;
      w[h] = l[h];
    }
    return [d, u];
  }
  function i(l, d = l.schema) {
    const { gen: u, data: h, it: w } = l;
    if (Object.keys(d).length === 0)
      return;
    const y = u.let("missing");
    for (const E in d) {
      const g = d[E];
      if (g.length === 0)
        continue;
      const _ = (0, n.propertyInData)(u, h, E, w.opts.ownProperties);
      l.setParams({
        property: E,
        depsCount: g.length,
        deps: g.join(", ")
      }), w.allErrors ? u.if(_, () => {
        for (const p of g)
          (0, n.checkReportMissingProp)(l, p);
      }) : (u.if((0, t._)`${_} && (${(0, n.checkMissingProp)(l, g, y)})`), (0, n.reportMissingProp)(l, y), u.else());
    }
  }
  e.validatePropertyDeps = i;
  function c(l, d = l.schema) {
    const { gen: u, data: h, keyword: w, it: y } = l, E = u.name("valid");
    for (const g in d)
      (0, r.alwaysValidSchema)(y, d[g]) || (u.if(
        (0, n.propertyInData)(u, h, g, y.opts.ownProperties),
        () => {
          const _ = l.subschema({ keyword: w, schemaProp: g }, E);
          l.mergeValidEvaluated(_, E);
        },
        () => u.var(E, !0)
        // TODO var
      ), l.ok(E));
  }
  e.validateSchemaDeps = c, e.default = s;
})(nu);
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
const su = ae, v_ = G, E_ = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, su._)`{propertyName: ${e.propertyName}}`
}, w_ = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: E_,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, v_.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, a), t.if((0, su.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
bo.default = w_;
var xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
const un = ct(), nt = ae, S_ = _t, dn = G, b_ = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, nt._)`{additionalProperty: ${e.additionalProperty}}`
}, P_ = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: b_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: i } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: c, opts: l } = i;
    if (i.props = !0, l.removeAdditional !== "all" && (0, dn.alwaysValidSchema)(i, r))
      return;
    const d = (0, un.allSchemaProperties)(n.properties), u = (0, un.allSchemaProperties)(n.patternProperties);
    h(), e.ok((0, nt._)`${a} === ${S_.default.errors}`);
    function h() {
      t.forIn("key", s, (_) => {
        !d.length && !u.length ? E(_) : t.if(w(_), () => E(_));
      });
    }
    function w(_) {
      let p;
      if (d.length > 8) {
        const v = (0, dn.schemaRefOrVal)(i, n.properties, "properties");
        p = (0, un.isOwnProperty)(t, v, _);
      } else d.length ? p = (0, nt.or)(...d.map((v) => (0, nt._)`${_} === ${v}`)) : p = nt.nil;
      return u.length && (p = (0, nt.or)(p, ...u.map((v) => (0, nt._)`${(0, un.usePattern)(e, v)}.test(${_})`))), (0, nt.not)(p);
    }
    function y(_) {
      t.code((0, nt._)`delete ${s}[${_}]`);
    }
    function E(_) {
      if (l.removeAdditional === "all" || l.removeAdditional && r === !1) {
        y(_);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: _ }), e.error(), c || t.break();
        return;
      }
      if (typeof r == "object" && !(0, dn.alwaysValidSchema)(i, r)) {
        const p = t.name("valid");
        l.removeAdditional === "failing" ? (g(_, p, !1), t.if((0, nt.not)(p), () => {
          e.reset(), y(_);
        })) : (g(_, p), c || t.if((0, nt.not)(p), () => t.break()));
      }
    }
    function g(_, p, v) {
      const N = {
        keyword: "additionalProperties",
        dataProp: _,
        dataPropType: dn.Type.Str
      };
      v === !1 && Object.assign(N, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(N, p);
    }
  }
};
xn.default = P_;
var Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
const N_ = Yn(), ji = ct(), $s = G, Ai = xn, O_ = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && Ai.default.code(new N_.KeywordCxt(a, Ai.default, "additionalProperties"));
    const i = (0, ji.allSchemaProperties)(r);
    for (const h of i)
      a.definedProperties.add(h);
    a.opts.unevaluated && i.length && a.props !== !0 && (a.props = $s.mergeEvaluated.props(t, (0, $s.toHash)(i), a.props));
    const c = i.filter((h) => !(0, $s.alwaysValidSchema)(a, r[h]));
    if (c.length === 0)
      return;
    const l = t.name("valid");
    for (const h of c)
      d(h) ? u(h) : (t.if((0, ji.propertyInData)(t, s, h, a.opts.ownProperties)), u(h), a.allErrors || t.else().var(l, !0), t.endIf()), e.it.definedProperties.add(h), e.ok(l);
    function d(h) {
      return a.opts.useDefaults && !a.compositeRule && r[h].default !== void 0;
    }
    function u(h) {
      e.subschema({
        keyword: "properties",
        schemaProp: h,
        dataProp: h
      }, l);
    }
  }
};
Po.default = O_;
var No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
const ki = ct(), fn = ae, Ci = G, Di = G, R_ = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: i } = a, c = (0, ki.allSchemaProperties)(r), l = c.filter((g) => (0, Ci.alwaysValidSchema)(a, r[g]));
    if (c.length === 0 || l.length === c.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const d = i.strictSchema && !i.allowMatchingProperties && s.properties, u = t.name("valid");
    a.props !== !0 && !(a.props instanceof fn.Name) && (a.props = (0, Di.evaluatedPropsToName)(t, a.props));
    const { props: h } = a;
    w();
    function w() {
      for (const g of c)
        d && y(g), a.allErrors ? E(g) : (t.var(u, !0), E(g), t.if(u));
    }
    function y(g) {
      for (const _ in d)
        new RegExp(g).test(_) && (0, Ci.checkStrictMode)(a, `property ${_} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function E(g) {
      t.forIn("key", n, (_) => {
        t.if((0, fn._)`${(0, ki.usePattern)(e, g)}.test(${_})`, () => {
          const p = l.includes(g);
          p || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: _,
            dataPropType: Di.Type.Str
          }, u), a.opts.unevaluated && h !== !0 ? t.assign((0, fn._)`${h}[${_}]`, !0) : !p && !a.allErrors && t.if((0, fn.not)(u), () => t.break());
        });
      });
    }
  }
};
No.default = R_;
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
const T_ = G, I_ = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, T_.alwaysValidSchema)(n, r)) {
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
Oo.default = I_;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
const j_ = ct(), A_ = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: j_.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Ro.default = A_;
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
const On = ae, k_ = G, C_ = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, On._)`{passingSchemas: ${e.passing}}`
}, D_ = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: C_,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, i = t.let("valid", !1), c = t.let("passing", null), l = t.name("_valid");
    e.setParams({ passing: c }), t.block(d), e.result(i, () => e.reset(), () => e.error(!0));
    function d() {
      a.forEach((u, h) => {
        let w;
        (0, k_.alwaysValidSchema)(s, u) ? t.var(l, !0) : w = e.subschema({
          keyword: "oneOf",
          schemaProp: h,
          compositeRule: !0
        }, l), h > 0 && t.if((0, On._)`${l} && ${i}`).assign(i, !1).assign(c, (0, On._)`[${c}, ${h}]`).else(), t.if(l, () => {
          t.assign(i, !0), t.assign(c, h), w && e.mergeEvaluated(w, On.Name);
        });
      });
    }
  }
};
To.default = D_;
var Io = {};
Object.defineProperty(Io, "__esModule", { value: !0 });
const M_ = G, L_ = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, i) => {
      if ((0, M_.alwaysValidSchema)(n, a))
        return;
      const c = e.subschema({ keyword: "allOf", schemaProp: i }, s);
      e.ok(s), e.mergeEvaluated(c);
    });
  }
};
Io.default = L_;
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
const Un = ae, au = G, F_ = {
  message: ({ params: e }) => (0, Un.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Un._)`{failingKeyword: ${e.ifClause}}`
}, V_ = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: F_,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, au.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Mi(n, "then"), a = Mi(n, "else");
    if (!s && !a)
      return;
    const i = t.let("valid", !0), c = t.name("_valid");
    if (l(), e.reset(), s && a) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(c, d("then", u), d("else", u));
    } else s ? t.if(c, d("then")) : t.if((0, Un.not)(c), d("else"));
    e.pass(i, () => e.error(!0));
    function l() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c);
      e.mergeEvaluated(u);
    }
    function d(u, h) {
      return () => {
        const w = e.subschema({ keyword: u }, c);
        t.assign(i, c), e.mergeValidEvaluated(w, i), h ? t.assign(h, (0, Un._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Mi(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, au.alwaysValidSchema)(e, r);
}
jo.default = V_;
var Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
const U_ = G, z_ = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, U_.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
Ao.default = z_;
Object.defineProperty(vo, "__esModule", { value: !0 });
const q_ = vr, K_ = Eo, G_ = Er, H_ = wo, B_ = So, J_ = nu, X_ = bo, W_ = xn, Y_ = Po, Q_ = No, Z_ = Oo, x_ = Ro, eg = To, tg = Io, rg = jo, ng = Ao;
function sg(e = !1) {
  const t = [
    // any
    Z_.default,
    x_.default,
    eg.default,
    tg.default,
    rg.default,
    ng.default,
    // object
    X_.default,
    W_.default,
    J_.default,
    Y_.default,
    Q_.default
  ];
  return e ? t.push(K_.default, H_.default) : t.push(q_.default, G_.default), t.push(B_.default), t;
}
vo.default = sg;
var ko = {}, Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
const ve = ae, ag = {
  message: ({ schemaCode: e }) => (0, ve.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ve._)`{format: ${e}}`
}, og = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: ag,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: i, it: c } = e, { opts: l, errSchemaPath: d, schemaEnv: u, self: h } = c;
    if (!l.validateFormats)
      return;
    s ? w() : y();
    function w() {
      const E = r.scopeValue("formats", {
        ref: h.formats,
        code: l.code.formats
      }), g = r.const("fDef", (0, ve._)`${E}[${i}]`), _ = r.let("fType"), p = r.let("format");
      r.if((0, ve._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign(_, (0, ve._)`${g}.type || "string"`).assign(p, (0, ve._)`${g}.validate`), () => r.assign(_, (0, ve._)`"string"`).assign(p, g)), e.fail$data((0, ve.or)(v(), N()));
      function v() {
        return l.strictSchema === !1 ? ve.nil : (0, ve._)`${i} && !${p}`;
      }
      function N() {
        const R = u.$async ? (0, ve._)`(${g}.async ? await ${p}(${n}) : ${p}(${n}))` : (0, ve._)`${p}(${n})`, j = (0, ve._)`(typeof ${p} == "function" ? ${R} : ${p}.test(${n}))`;
        return (0, ve._)`${p} && ${p} !== true && ${_} === ${t} && !${j}`;
      }
    }
    function y() {
      const E = h.formats[a];
      if (!E) {
        v();
        return;
      }
      if (E === !0)
        return;
      const [g, _, p] = N(E);
      g === t && e.pass(R());
      function v() {
        if (l.strictSchema === !1) {
          h.logger.warn(j());
          return;
        }
        throw new Error(j());
        function j() {
          return `unknown format "${a}" ignored in schema at path "${d}"`;
        }
      }
      function N(j) {
        const F = j instanceof RegExp ? (0, ve.regexpCode)(j) : l.code.formats ? (0, ve._)`${l.code.formats}${(0, ve.getProperty)(a)}` : void 0, q = r.scopeValue("formats", { key: a, ref: j, code: F });
        return typeof j == "object" && !(j instanceof RegExp) ? [j.type || "string", j.validate, (0, ve._)`${q}.validate`] : ["string", j, q];
      }
      function R() {
        if (typeof E == "object" && !(E instanceof RegExp) && E.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, ve._)`await ${p}(${n})`;
        }
        return typeof _ == "function" ? (0, ve._)`${p}(${n})` : (0, ve._)`${p}.test(${n})`;
      }
    }
  }
};
Co.default = og;
Object.defineProperty(ko, "__esModule", { value: !0 });
const ig = Co, cg = [ig.default];
ko.default = cg;
var mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.contentVocabulary = mr.metadataVocabulary = void 0;
mr.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
mr.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(so, "__esModule", { value: !0 });
const lg = ao, ug = io, dg = vo, fg = ko, Li = mr, hg = [
  lg.default,
  ug.default,
  (0, dg.default)(),
  fg.default,
  Li.metadataVocabulary,
  Li.contentVocabulary
];
so.default = hg;
var Do = {}, es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
es.DiscrError = void 0;
var Fi;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Fi || (es.DiscrError = Fi = {}));
Object.defineProperty(Do, "__esModule", { value: !0 });
const nr = ae, qs = es, Vi = He, pg = gr, mg = G, yg = {
  message: ({ params: { discrError: e, tagName: t } }) => e === qs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, nr._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, $g = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: yg,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: i } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const c = n.propertyName;
    if (typeof c != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const l = t.let("valid", !1), d = t.const("tag", (0, nr._)`${r}${(0, nr.getProperty)(c)}`);
    t.if((0, nr._)`typeof ${d} == "string"`, () => u(), () => e.error(!1, { discrError: qs.DiscrError.Tag, tag: d, tagName: c })), e.ok(l);
    function u() {
      const y = w();
      t.if(!1);
      for (const E in y)
        t.elseIf((0, nr._)`${d} === ${E}`), t.assign(l, h(y[E]));
      t.else(), e.error(!1, { discrError: qs.DiscrError.Mapping, tag: d, tagName: c }), t.endIf();
    }
    function h(y) {
      const E = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: y }, E);
      return e.mergeEvaluated(g, nr.Name), E;
    }
    function w() {
      var y;
      const E = {}, g = p(s);
      let _ = !0;
      for (let R = 0; R < i.length; R++) {
        let j = i[R];
        if (j != null && j.$ref && !(0, mg.schemaHasRulesButRef)(j, a.self.RULES)) {
          const q = j.$ref;
          if (j = Vi.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, q), j instanceof Vi.SchemaEnv && (j = j.schema), j === void 0)
            throw new pg.default(a.opts.uriResolver, a.baseId, q);
        }
        const F = (y = j == null ? void 0 : j.properties) === null || y === void 0 ? void 0 : y[c];
        if (typeof F != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${c}"`);
        _ = _ && (g || p(j)), v(F, R);
      }
      if (!_)
        throw new Error(`discriminator: "${c}" must be required`);
      return E;
      function p({ required: R }) {
        return Array.isArray(R) && R.includes(c);
      }
      function v(R, j) {
        if (R.const)
          N(R.const, j);
        else if (R.enum)
          for (const F of R.enum)
            N(F, j);
        else
          throw new Error(`discriminator: "properties/${c}" must have "const" or "enum"`);
      }
      function N(R, j) {
        if (typeof R != "string" || R in E)
          throw new Error(`discriminator: "${c}" values must be unique strings`);
        E[R] = j;
      }
    }
  }
};
Do.default = $g;
const _g = "http://json-schema.org/draft-07/schema#", gg = "http://json-schema.org/draft-07/schema#", vg = "Core schema meta-schema", Eg = {
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
}, wg = [
  "object",
  "boolean"
], Sg = {
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
}, bg = {
  $schema: _g,
  $id: gg,
  title: vg,
  definitions: Eg,
  type: wg,
  properties: Sg,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Dl, n = so, s = Do, a = bg, i = ["/properties"], c = "http://json-schema.org/draft-07/schema";
  class l extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((E) => this.addVocabulary(E)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const E = this.opts.$data ? this.$dataMetaSchema(a, i) : a;
      this.addMetaSchema(E, c, !1), this.refs["http://json-schema.org/schema"] = c;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(c) ? c : void 0);
    }
  }
  t.Ajv = l, e.exports = t = l, e.exports.Ajv = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var d = Yn();
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return d.KeywordCxt;
  } });
  var u = ae;
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
  var h = to();
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return h.default;
  } });
  var w = gr;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return w.default;
  } });
})(Ds, Ds.exports);
var Pg = Ds.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Pg, r = ae, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: c, schemaCode: l }) => r.str`should be ${s[c].okStr} ${l}`,
    params: ({ keyword: c, schemaCode: l }) => r._`{comparison: ${s[c].okStr}, limit: ${l}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(c) {
      const { gen: l, data: d, schemaCode: u, keyword: h, it: w } = c, { opts: y, self: E } = w;
      if (!y.validateFormats)
        return;
      const g = new t.KeywordCxt(w, E.RULES.all.format.definition, "format");
      g.$data ? _() : p();
      function _() {
        const N = l.scopeValue("formats", {
          ref: E.formats,
          code: y.code.formats
        }), R = l.const("fmt", r._`${N}[${g.schemaCode}]`);
        c.fail$data(r.or(r._`typeof ${R} != "object"`, r._`${R} instanceof RegExp`, r._`typeof ${R}.compare != "function"`, v(R)));
      }
      function p() {
        const N = g.schema, R = E.formats[N];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${h}": format "${N}" does not define "compare" function`);
        const j = l.scopeValue("formats", {
          key: N,
          ref: R,
          code: y.code.formats ? r._`${y.code.formats}${r.getProperty(N)}` : void 0
        });
        c.fail$data(v(j));
      }
      function v(N) {
        return r._`${N}.compare(${d}, ${u}) ${s[h].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (c) => (c.addKeyword(e.formatLimitDefinition), c);
  e.default = i;
})(Cl);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = kl, n = Cl, s = ae, a = new s.Name("fullFormats"), i = new s.Name("fastFormats"), c = (d, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return l(d, u, r.fullFormats, a), d;
    const [h, w] = u.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, a], y = u.formats || r.formatNames;
    return l(d, y, h, w), u.keywords && n.default(d), d;
  };
  c.get = (d, u = "full") => {
    const w = (u === "fast" ? r.fastFormats : r.fullFormats)[d];
    if (!w)
      throw new Error(`Unknown format "${d}"`);
    return w;
  };
  function l(d, u, h, w) {
    var y, E;
    (y = (E = d.opts.code).formats) !== null && y !== void 0 || (E.formats = s._`require("ajv-formats/dist/formats").${w}`);
    for (const g of u)
      d.addFormat(g, h[g]);
  }
  e.exports = t = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
})(Cs, Cs.exports);
var Ng = Cs.exports;
const Og = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !Rg(s, a) && n || Object.defineProperty(e, r, a);
}, Rg = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, Tg = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, Ig = (e, t) => `/* Wrapped ${e}*/
${t}`, jg = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Ag = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), kg = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = Ig.bind(null, n, t.toString());
  Object.defineProperty(s, "name", Ag), Object.defineProperty(e, "toString", { ...jg, value: s });
}, Cg = (e, t, { ignoreNonConfigurable: r = !1 } = {}) => {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    Og(e, t, s, r);
  return Tg(e, t), kg(e, t, n), e;
};
var Dg = Cg;
const Mg = Dg;
var Lg = (e, t = {}) => {
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
  const c = function(...l) {
    const d = this, u = () => {
      a = void 0, s && (i = e.apply(d, l));
    }, h = n && !a;
    return clearTimeout(a), a = setTimeout(u, r), h && (i = e.apply(d, l)), i;
  };
  return Mg(c, e), c.cancel = () => {
    a && (clearTimeout(a), a = void 0);
  }, c;
}, Ks = { exports: {} };
const Fg = "2.0.0", ou = 256, Vg = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Ug = 16, zg = ou - 6, qg = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var ts = {
  MAX_LENGTH: ou,
  MAX_SAFE_COMPONENT_LENGTH: Ug,
  MAX_SAFE_BUILD_LENGTH: zg,
  MAX_SAFE_INTEGER: Vg,
  RELEASE_TYPES: qg,
  SEMVER_SPEC_VERSION: Fg,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Kg = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var rs = Kg;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = ts, a = rs;
  t = e.exports = {};
  const i = t.re = [], c = t.safeRe = [], l = t.src = [], d = t.safeSrc = [], u = t.t = {};
  let h = 0;
  const w = "[a-zA-Z0-9-]", y = [
    ["\\s", 1],
    ["\\d", s],
    [w, n]
  ], E = (_) => {
    for (const [p, v] of y)
      _ = _.split(`${p}*`).join(`${p}{0,${v}}`).split(`${p}+`).join(`${p}{1,${v}}`);
    return _;
  }, g = (_, p, v) => {
    const N = E(p), R = h++;
    a(_, R, p), u[_] = R, l[R] = p, d[R] = N, i[R] = new RegExp(p, v ? "g" : void 0), c[R] = new RegExp(N, v ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${w}*`), g("MAINVERSION", `(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${l[u.NONNUMERICIDENTIFIER]}|${l[u.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${l[u.NONNUMERICIDENTIFIER]}|${l[u.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${l[u.PRERELEASEIDENTIFIER]}(?:\\.${l[u.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${l[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[u.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${w}+`), g("BUILD", `(?:\\+(${l[u.BUILDIDENTIFIER]}(?:\\.${l[u.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${l[u.MAINVERSION]}${l[u.PRERELEASE]}?${l[u.BUILD]}?`), g("FULL", `^${l[u.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${l[u.MAINVERSIONLOOSE]}${l[u.PRERELEASELOOSE]}?${l[u.BUILD]}?`), g("LOOSE", `^${l[u.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${l[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${l[u.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:${l[u.PRERELEASE]})?${l[u.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:${l[u.PRERELEASELOOSE]})?${l[u.BUILD]}?)?)?`), g("XRANGE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${l[u.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", l[u.COERCEPLAIN] + `(?:${l[u.PRERELEASE]})?(?:${l[u.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", l[u.COERCE], !0), g("COERCERTLFULL", l[u.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${l[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${l[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${l[u.LONECARET]}${l[u.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${l[u.LONECARET]}${l[u.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${l[u.GTLT]}\\s*(${l[u.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]}|${l[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${l[u.XRANGEPLAIN]})\\s+-\\s+(${l[u.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${l[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[u.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Ks, Ks.exports);
var Yr = Ks.exports;
const Gg = Object.freeze({ loose: !0 }), Hg = Object.freeze({}), Bg = (e) => e ? typeof e != "object" ? Gg : e : Hg;
var Mo = Bg;
const Ui = /^[0-9]+$/, iu = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = Ui.test(e), n = Ui.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Jg = (e, t) => iu(t, e);
var cu = {
  compareIdentifiers: iu,
  rcompareIdentifiers: Jg
};
const hn = rs, { MAX_LENGTH: zi, MAX_SAFE_INTEGER: pn } = ts, { safeRe: mn, t: yn } = Yr, Xg = Mo, { compareIdentifiers: _s } = cu;
let Wg = class ft {
  constructor(t, r) {
    if (r = Xg(r), t instanceof ft) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > zi)
      throw new TypeError(
        `version is longer than ${zi} characters`
      );
    hn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? mn[yn.LOOSE] : mn[yn.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > pn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > pn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > pn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < pn)
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
    if (hn("SemVer.compare", this.version, this.options, t), !(t instanceof ft)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ft(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ft || (t = new ft(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof ft || (t = new ft(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (hn("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return _s(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof ft || (t = new ft(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (hn("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return _s(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const s = `-${r}`.match(this.options.loose ? mn[yn.PRERELEASELOOSE] : mn[yn.PRERELEASE]);
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
          n === !1 && (a = [r]), _s(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Fe = Wg;
const qi = Fe, Yg = (e, t, r = !1) => {
  if (e instanceof qi)
    return e;
  try {
    return new qi(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var wr = Yg;
const Qg = wr, Zg = (e, t) => {
  const r = Qg(e, t);
  return r ? r.version : null;
};
var xg = Zg;
const e0 = wr, t0 = (e, t) => {
  const r = e0(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var r0 = t0;
const Ki = Fe, n0 = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new Ki(
      e instanceof Ki ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var s0 = n0;
const Gi = wr, a0 = (e, t) => {
  const r = Gi(e, null, !0), n = Gi(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, i = a ? r : n, c = a ? n : r, l = !!i.prerelease.length;
  if (!!c.prerelease.length && !l) {
    if (!c.patch && !c.minor)
      return "major";
    if (c.compareMain(i) === 0)
      return c.minor && !c.patch ? "minor" : "patch";
  }
  const u = l ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var o0 = a0;
const i0 = Fe, c0 = (e, t) => new i0(e, t).major;
var l0 = c0;
const u0 = Fe, d0 = (e, t) => new u0(e, t).minor;
var f0 = d0;
const h0 = Fe, p0 = (e, t) => new h0(e, t).patch;
var m0 = p0;
const y0 = wr, $0 = (e, t) => {
  const r = y0(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var _0 = $0;
const Hi = Fe, g0 = (e, t, r) => new Hi(e, r).compare(new Hi(t, r));
var lt = g0;
const v0 = lt, E0 = (e, t, r) => v0(t, e, r);
var w0 = E0;
const S0 = lt, b0 = (e, t) => S0(e, t, !0);
var P0 = b0;
const Bi = Fe, N0 = (e, t, r) => {
  const n = new Bi(e, r), s = new Bi(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Lo = N0;
const O0 = Lo, R0 = (e, t) => e.sort((r, n) => O0(r, n, t));
var T0 = R0;
const I0 = Lo, j0 = (e, t) => e.sort((r, n) => I0(n, r, t));
var A0 = j0;
const k0 = lt, C0 = (e, t, r) => k0(e, t, r) > 0;
var ns = C0;
const D0 = lt, M0 = (e, t, r) => D0(e, t, r) < 0;
var Fo = M0;
const L0 = lt, F0 = (e, t, r) => L0(e, t, r) === 0;
var lu = F0;
const V0 = lt, U0 = (e, t, r) => V0(e, t, r) !== 0;
var uu = U0;
const z0 = lt, q0 = (e, t, r) => z0(e, t, r) >= 0;
var Vo = q0;
const K0 = lt, G0 = (e, t, r) => K0(e, t, r) <= 0;
var Uo = G0;
const H0 = lu, B0 = uu, J0 = ns, X0 = Vo, W0 = Fo, Y0 = Uo, Q0 = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return H0(e, r, n);
    case "!=":
      return B0(e, r, n);
    case ">":
      return J0(e, r, n);
    case ">=":
      return X0(e, r, n);
    case "<":
      return W0(e, r, n);
    case "<=":
      return Y0(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var du = Q0;
const Z0 = Fe, x0 = wr, { safeRe: $n, t: _n } = Yr, ev = (e, t) => {
  if (e instanceof Z0)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? $n[_n.COERCEFULL] : $n[_n.COERCE]);
  else {
    const l = t.includePrerelease ? $n[_n.COERCERTLFULL] : $n[_n.COERCERTL];
    let d;
    for (; (d = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), l.lastIndex = d.index + d[1].length + d[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", i = t.includePrerelease && r[5] ? `-${r[5]}` : "", c = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return x0(`${n}.${s}.${a}${i}${c}`, t);
};
var tv = ev;
class rv {
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
var nv = rv, gs, Ji;
function ut() {
  if (Ji) return gs;
  Ji = 1;
  const e = /\s+/g;
  class t {
    constructor(L, B) {
      if (B = s(B), L instanceof t)
        return L.loose === !!B.loose && L.includePrerelease === !!B.includePrerelease ? L : new t(L.raw, B);
      if (L instanceof a)
        return this.raw = L.value, this.set = [[L]], this.formatted = void 0, this;
      if (this.options = B, this.loose = !!B.loose, this.includePrerelease = !!B.includePrerelease, this.raw = L.trim().replace(e, " "), this.set = this.raw.split("||").map((U) => this.parseRange(U.trim())).filter((U) => U.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const U = this.set[0];
        if (this.set = this.set.filter((I) => !g(I[0])), this.set.length === 0)
          this.set = [U];
        else if (this.set.length > 1) {
          for (const I of this.set)
            if (I.length === 1 && _(I[0])) {
              this.set = [I];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let L = 0; L < this.set.length; L++) {
          L > 0 && (this.formatted += "||");
          const B = this.set[L];
          for (let U = 0; U < B.length; U++)
            U > 0 && (this.formatted += " "), this.formatted += B[U].toString().trim();
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
    parseRange(L) {
      const U = ((this.options.includePrerelease && y) | (this.options.loose && E)) + ":" + L, I = n.get(U);
      if (I)
        return I;
      const A = this.options.loose, S = A ? l[d.HYPHENRANGELOOSE] : l[d.HYPHENRANGE];
      L = L.replace(S, Q(this.options.includePrerelease)), i("hyphen replace", L), L = L.replace(l[d.COMPARATORTRIM], u), i("comparator trim", L), L = L.replace(l[d.TILDETRIM], h), i("tilde trim", L), L = L.replace(l[d.CARETTRIM], w), i("caret trim", L);
      let m = L.split(" ").map((f) => v(f, this.options)).join(" ").split(/\s+/).map((f) => ee(f, this.options));
      A && (m = m.filter((f) => (i("loose invalid filter", f, this.options), !!f.match(l[d.COMPARATORLOOSE])))), i("range list", m);
      const b = /* @__PURE__ */ new Map(), $ = m.map((f) => new a(f, this.options));
      for (const f of $) {
        if (g(f))
          return [f];
        b.set(f.value, f);
      }
      b.size > 1 && b.has("") && b.delete("");
      const o = [...b.values()];
      return n.set(U, o), o;
    }
    intersects(L, B) {
      if (!(L instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((U) => p(U, B) && L.set.some((I) => p(I, B) && U.every((A) => I.every((S) => A.intersects(S, B)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(L) {
      if (!L)
        return !1;
      if (typeof L == "string")
        try {
          L = new c(L, this.options);
        } catch {
          return !1;
        }
      for (let B = 0; B < this.set.length; B++)
        if (x(this.set[B], L, this.options))
          return !0;
      return !1;
    }
  }
  gs = t;
  const r = nv, n = new r(), s = Mo, a = ss(), i = rs, c = Fe, {
    safeRe: l,
    t: d,
    comparatorTrimReplace: u,
    tildeTrimReplace: h,
    caretTrimReplace: w
  } = Yr, { FLAG_INCLUDE_PRERELEASE: y, FLAG_LOOSE: E } = ts, g = (M) => M.value === "<0.0.0-0", _ = (M) => M.value === "", p = (M, L) => {
    let B = !0;
    const U = M.slice();
    let I = U.pop();
    for (; B && U.length; )
      B = U.every((A) => I.intersects(A, L)), I = U.pop();
    return B;
  }, v = (M, L) => (M = M.replace(l[d.BUILD], ""), i("comp", M, L), M = F(M, L), i("caret", M), M = R(M, L), i("tildes", M), M = te(M, L), i("xrange", M), M = J(M, L), i("stars", M), M), N = (M) => !M || M.toLowerCase() === "x" || M === "*", R = (M, L) => M.trim().split(/\s+/).map((B) => j(B, L)).join(" "), j = (M, L) => {
    const B = L.loose ? l[d.TILDELOOSE] : l[d.TILDE];
    return M.replace(B, (U, I, A, S, m) => {
      i("tilde", M, U, I, A, S, m);
      let b;
      return N(I) ? b = "" : N(A) ? b = `>=${I}.0.0 <${+I + 1}.0.0-0` : N(S) ? b = `>=${I}.${A}.0 <${I}.${+A + 1}.0-0` : m ? (i("replaceTilde pr", m), b = `>=${I}.${A}.${S}-${m} <${I}.${+A + 1}.0-0`) : b = `>=${I}.${A}.${S} <${I}.${+A + 1}.0-0`, i("tilde return", b), b;
    });
  }, F = (M, L) => M.trim().split(/\s+/).map((B) => q(B, L)).join(" "), q = (M, L) => {
    i("caret", M, L);
    const B = L.loose ? l[d.CARETLOOSE] : l[d.CARET], U = L.includePrerelease ? "-0" : "";
    return M.replace(B, (I, A, S, m, b) => {
      i("caret", M, I, A, S, m, b);
      let $;
      return N(A) ? $ = "" : N(S) ? $ = `>=${A}.0.0${U} <${+A + 1}.0.0-0` : N(m) ? A === "0" ? $ = `>=${A}.${S}.0${U} <${A}.${+S + 1}.0-0` : $ = `>=${A}.${S}.0${U} <${+A + 1}.0.0-0` : b ? (i("replaceCaret pr", b), A === "0" ? S === "0" ? $ = `>=${A}.${S}.${m}-${b} <${A}.${S}.${+m + 1}-0` : $ = `>=${A}.${S}.${m}-${b} <${A}.${+S + 1}.0-0` : $ = `>=${A}.${S}.${m}-${b} <${+A + 1}.0.0-0`) : (i("no pr"), A === "0" ? S === "0" ? $ = `>=${A}.${S}.${m}${U} <${A}.${S}.${+m + 1}-0` : $ = `>=${A}.${S}.${m}${U} <${A}.${+S + 1}.0-0` : $ = `>=${A}.${S}.${m} <${+A + 1}.0.0-0`), i("caret return", $), $;
    });
  }, te = (M, L) => (i("replaceXRanges", M, L), M.split(/\s+/).map((B) => z(B, L)).join(" ")), z = (M, L) => {
    M = M.trim();
    const B = L.loose ? l[d.XRANGELOOSE] : l[d.XRANGE];
    return M.replace(B, (U, I, A, S, m, b) => {
      i("xRange", M, U, I, A, S, m, b);
      const $ = N(A), o = $ || N(S), f = o || N(m), P = f;
      return I === "=" && P && (I = ""), b = L.includePrerelease ? "-0" : "", $ ? I === ">" || I === "<" ? U = "<0.0.0-0" : U = "*" : I && P ? (o && (S = 0), m = 0, I === ">" ? (I = ">=", o ? (A = +A + 1, S = 0, m = 0) : (S = +S + 1, m = 0)) : I === "<=" && (I = "<", o ? A = +A + 1 : S = +S + 1), I === "<" && (b = "-0"), U = `${I + A}.${S}.${m}${b}`) : o ? U = `>=${A}.0.0${b} <${+A + 1}.0.0-0` : f && (U = `>=${A}.${S}.0${b} <${A}.${+S + 1}.0-0`), i("xRange return", U), U;
    });
  }, J = (M, L) => (i("replaceStars", M, L), M.trim().replace(l[d.STAR], "")), ee = (M, L) => (i("replaceGTE0", M, L), M.trim().replace(l[L.includePrerelease ? d.GTE0PRE : d.GTE0], "")), Q = (M) => (L, B, U, I, A, S, m, b, $, o, f, P) => (N(U) ? B = "" : N(I) ? B = `>=${U}.0.0${M ? "-0" : ""}` : N(A) ? B = `>=${U}.${I}.0${M ? "-0" : ""}` : S ? B = `>=${B}` : B = `>=${B}${M ? "-0" : ""}`, N($) ? b = "" : N(o) ? b = `<${+$ + 1}.0.0-0` : N(f) ? b = `<${$}.${+o + 1}.0-0` : P ? b = `<=${$}.${o}.${f}-${P}` : M ? b = `<${$}.${o}.${+f + 1}-0` : b = `<=${b}`, `${B} ${b}`.trim()), x = (M, L, B) => {
    for (let U = 0; U < M.length; U++)
      if (!M[U].test(L))
        return !1;
    if (L.prerelease.length && !B.includePrerelease) {
      for (let U = 0; U < M.length; U++)
        if (i(M[U].semver), M[U].semver !== a.ANY && M[U].semver.prerelease.length > 0) {
          const I = M[U].semver;
          if (I.major === L.major && I.minor === L.minor && I.patch === L.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return gs;
}
var vs, Xi;
function ss() {
  if (Xi) return vs;
  Xi = 1;
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
      u = u.trim().split(/\s+/).join(" "), i("comparator", u, h), this.options = h, this.loose = !!h.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(u) {
      const h = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], w = u.match(h);
      if (!w)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = w[1] !== void 0 ? w[1] : "", this.operator === "=" && (this.operator = ""), w[2] ? this.semver = new c(w[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (i("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new c(u, this.options);
        } catch {
          return !1;
        }
      return a(u, this.operator, this.semver, this.options);
    }
    intersects(u, h) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(u.value, h).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new l(this.value, h).test(u.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || a(this.semver, "<", u.semver, h) && this.operator.startsWith(">") && u.operator.startsWith("<") || a(this.semver, ">", u.semver, h) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  vs = t;
  const r = Mo, { safeRe: n, t: s } = Yr, a = du, i = rs, c = Fe, l = ut();
  return vs;
}
const sv = ut(), av = (e, t, r) => {
  try {
    t = new sv(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var as = av;
const ov = ut(), iv = (e, t) => new ov(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var cv = iv;
const lv = Fe, uv = ut(), dv = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new uv(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === -1) && (n = i, s = new lv(n, r));
  }), n;
};
var fv = dv;
const hv = Fe, pv = ut(), mv = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new pv(t, r);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    a.test(i) && (!n || s.compare(i) === 1) && (n = i, s = new hv(n, r));
  }), n;
};
var yv = mv;
const Es = Fe, $v = ut(), Wi = ns, _v = (e, t) => {
  e = new $v(e, t);
  let r = new Es("0.0.0");
  if (e.test(r) || (r = new Es("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((i) => {
      const c = new Es(i.semver.version);
      switch (i.operator) {
        case ">":
          c.prerelease.length === 0 ? c.patch++ : c.prerelease.push(0), c.raw = c.format();
        case "":
        case ">=":
          (!a || Wi(c, a)) && (a = c);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), a && (!r || Wi(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var gv = _v;
const vv = ut(), Ev = (e, t) => {
  try {
    return new vv(e, t).range || "*";
  } catch {
    return null;
  }
};
var wv = Ev;
const Sv = Fe, fu = ss(), { ANY: bv } = fu, Pv = ut(), Nv = as, Yi = ns, Qi = Fo, Ov = Uo, Rv = Vo, Tv = (e, t, r, n) => {
  e = new Sv(e, n), t = new Pv(t, n);
  let s, a, i, c, l;
  switch (r) {
    case ">":
      s = Yi, a = Ov, i = Qi, c = ">", l = ">=";
      break;
    case "<":
      s = Qi, a = Rv, i = Yi, c = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (Nv(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const u = t.set[d];
    let h = null, w = null;
    if (u.forEach((y) => {
      y.semver === bv && (y = new fu(">=0.0.0")), h = h || y, w = w || y, s(y.semver, h.semver, n) ? h = y : i(y.semver, w.semver, n) && (w = y);
    }), h.operator === c || h.operator === l || (!w.operator || w.operator === c) && a(e, w.semver))
      return !1;
    if (w.operator === l && i(e, w.semver))
      return !1;
  }
  return !0;
};
var zo = Tv;
const Iv = zo, jv = (e, t, r) => Iv(e, t, ">", r);
var Av = jv;
const kv = zo, Cv = (e, t, r) => kv(e, t, "<", r);
var Dv = Cv;
const Zi = ut(), Mv = (e, t, r) => (e = new Zi(e, r), t = new Zi(t, r), e.intersects(t, r));
var Lv = Mv;
const Fv = as, Vv = lt;
var Uv = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const i = e.sort((u, h) => Vv(u, h, r));
  for (const u of i)
    Fv(u, t, r) ? (a = u, s || (s = u)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const c = [];
  for (const [u, h] of n)
    u === h ? c.push(u) : !h && u === i[0] ? c.push("*") : h ? u === i[0] ? c.push(`<=${h}`) : c.push(`${u} - ${h}`) : c.push(`>=${u}`);
  const l = c.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < d.length ? l : t;
};
const xi = ut(), qo = ss(), { ANY: ws } = qo, Tr = as, Ko = lt, zv = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new xi(e, r), t = new xi(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const i = Kv(s, a, r);
      if (n = n || i !== null, i)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, qv = [new qo(">=0.0.0-0")], ec = [new qo(">=0.0.0")], Kv = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ws) {
    if (t.length === 1 && t[0].semver === ws)
      return !0;
    r.includePrerelease ? e = qv : e = ec;
  }
  if (t.length === 1 && t[0].semver === ws) {
    if (r.includePrerelease)
      return !0;
    t = ec;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const y of e)
    y.operator === ">" || y.operator === ">=" ? s = tc(s, y, r) : y.operator === "<" || y.operator === "<=" ? a = rc(a, y, r) : n.add(y.semver);
  if (n.size > 1)
    return null;
  let i;
  if (s && a) {
    if (i = Ko(s.semver, a.semver, r), i > 0)
      return null;
    if (i === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const y of n) {
    if (s && !Tr(y, String(s), r) || a && !Tr(y, String(a), r))
      return null;
    for (const E of t)
      if (!Tr(y, String(E), r))
        return !1;
    return !0;
  }
  let c, l, d, u, h = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, w = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  h && h.prerelease.length === 1 && a.operator === "<" && h.prerelease[0] === 0 && (h = !1);
  for (const y of t) {
    if (u = u || y.operator === ">" || y.operator === ">=", d = d || y.operator === "<" || y.operator === "<=", s) {
      if (w && y.semver.prerelease && y.semver.prerelease.length && y.semver.major === w.major && y.semver.minor === w.minor && y.semver.patch === w.patch && (w = !1), y.operator === ">" || y.operator === ">=") {
        if (c = tc(s, y, r), c === y && c !== s)
          return !1;
      } else if (s.operator === ">=" && !Tr(s.semver, String(y), r))
        return !1;
    }
    if (a) {
      if (h && y.semver.prerelease && y.semver.prerelease.length && y.semver.major === h.major && y.semver.minor === h.minor && y.semver.patch === h.patch && (h = !1), y.operator === "<" || y.operator === "<=") {
        if (l = rc(a, y, r), l === y && l !== a)
          return !1;
      } else if (a.operator === "<=" && !Tr(a.semver, String(y), r))
        return !1;
    }
    if (!y.operator && (a || s) && i !== 0)
      return !1;
  }
  return !(s && d && !a && i !== 0 || a && u && !s && i !== 0 || w || h);
}, tc = (e, t, r) => {
  if (!e)
    return t;
  const n = Ko(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, rc = (e, t, r) => {
  if (!e)
    return t;
  const n = Ko(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var Gv = zv;
const Ss = Yr, nc = ts, Hv = Fe, sc = cu, Bv = wr, Jv = xg, Xv = r0, Wv = s0, Yv = o0, Qv = l0, Zv = f0, xv = m0, eE = _0, tE = lt, rE = w0, nE = P0, sE = Lo, aE = T0, oE = A0, iE = ns, cE = Fo, lE = lu, uE = uu, dE = Vo, fE = Uo, hE = du, pE = tv, mE = ss(), yE = ut(), $E = as, _E = cv, gE = fv, vE = yv, EE = gv, wE = wv, SE = zo, bE = Av, PE = Dv, NE = Lv, OE = Uv, RE = Gv;
var TE = {
  parse: Bv,
  valid: Jv,
  clean: Xv,
  inc: Wv,
  diff: Yv,
  major: Qv,
  minor: Zv,
  patch: xv,
  prerelease: eE,
  compare: tE,
  rcompare: rE,
  compareLoose: nE,
  compareBuild: sE,
  sort: aE,
  rsort: oE,
  gt: iE,
  lt: cE,
  eq: lE,
  neq: uE,
  gte: dE,
  lte: fE,
  cmp: hE,
  coerce: pE,
  Comparator: mE,
  Range: yE,
  satisfies: $E,
  toComparators: _E,
  maxSatisfying: gE,
  minSatisfying: vE,
  minVersion: EE,
  validRange: wE,
  outside: SE,
  gtr: bE,
  ltr: PE,
  intersects: NE,
  simplifyRange: OE,
  subset: RE,
  SemVer: Hv,
  re: Ss.re,
  src: Ss.src,
  tokens: Ss.t,
  SEMVER_SPEC_VERSION: nc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: nc.RELEASE_TYPES,
  compareIdentifiers: sc.compareIdentifiers,
  rcompareIdentifiers: sc.rcompareIdentifiers
}, os = { exports: {} }, Go = { exports: {} };
const hu = (e, t) => {
  for (const r of Reflect.ownKeys(t))
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  return e;
};
Go.exports = hu;
Go.exports.default = hu;
var IE = Go.exports;
const jE = IE, zn = /* @__PURE__ */ new WeakMap(), pu = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let r, n = 0;
  const s = e.displayName || e.name || "<anonymous>", a = function(...i) {
    if (zn.set(a, ++n), n === 1)
      r = e.apply(this, i), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${s}\` can only be called once`);
    return r;
  };
  return jE(a, e), zn.set(a, n), a;
};
os.exports = pu;
os.exports.default = pu;
os.exports.callCount = (e) => {
  if (!zn.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return zn.get(e);
};
var AE = os.exports;
(function(e, t) {
  var r = Qr && Qr.__classPrivateFieldSet || function(U, I, A, S, m) {
    if (S === "m") throw new TypeError("Private method is not writable");
    if (S === "a" && !m) throw new TypeError("Private accessor was defined without a setter");
    if (typeof I == "function" ? U !== I || !m : !I.has(U)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return S === "a" ? m.call(U, A) : m ? m.value = A : I.set(U, A), A;
  }, n = Qr && Qr.__classPrivateFieldGet || function(U, I, A, S) {
    if (A === "a" && !S) throw new TypeError("Private accessor was defined without a getter");
    if (typeof I == "function" ? U !== I || !S : !I.has(U)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return A === "m" ? S : A === "a" ? S.call(U) : S ? S.value : I.get(U);
  }, s, a, i, c, l, d;
  Object.defineProperty(t, "__esModule", { value: !0 });
  const u = fc, h = Bs, w = Zt, y = Pu, E = Nu, g = Ou, _ = Fu, p = Wu, v = xu, N = pt, R = uy, j = Ng, F = Lg, q = TE, te = AE, z = "aes-256-cbc", J = () => /* @__PURE__ */ Object.create(null), ee = (U) => U != null;
  let Q = "";
  try {
    delete require.cache[__filename], Q = w.dirname((a = (s = e.parent) === null || s === void 0 ? void 0 : s.filename) !== null && a !== void 0 ? a : ".");
  } catch {
  }
  const x = (U, I) => {
    const A = /* @__PURE__ */ new Set([
      "undefined",
      "symbol",
      "function"
    ]), S = typeof I;
    if (A.has(S))
      throw new TypeError(`Setting a value of type \`${S}\` for key \`${U}\` is not allowed as it's not supported by JSON`);
  }, M = "__internal__", L = `${M}.migrations.version`;
  class B {
    constructor(I = {}) {
      var A;
      i.set(this, void 0), c.set(this, void 0), l.set(this, void 0), d.set(this, {}), this._deserialize = (f) => JSON.parse(f), this._serialize = (f) => JSON.stringify(f, void 0, "	");
      const S = {
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: !1,
        accessPropertiesByDotNotation: !0,
        configFileMode: 438,
        ...I
      }, m = te(() => {
        const f = p.sync({ cwd: Q }), P = f && JSON.parse(h.readFileSync(f, "utf8"));
        return P ?? {};
      });
      if (!S.cwd) {
        if (S.projectName || (S.projectName = m().name), !S.projectName)
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        S.cwd = v(S.projectName, { suffix: S.projectSuffix }).config;
      }
      if (r(this, l, S, "f"), S.schema) {
        if (typeof S.schema != "object")
          throw new TypeError("The `schema` option must be an object.");
        const f = new R.default({
          allErrors: !0,
          useDefaults: !0
        });
        (0, j.default)(f);
        const P = {
          type: "object",
          properties: S.schema
        };
        r(this, i, f.compile(P), "f");
        for (const [k, C] of Object.entries(S.schema))
          C != null && C.default && (n(this, d, "f")[k] = C.default);
      }
      S.defaults && r(this, d, {
        ...n(this, d, "f"),
        ...S.defaults
      }, "f"), S.serialize && (this._serialize = S.serialize), S.deserialize && (this._deserialize = S.deserialize), this.events = new g.EventEmitter(), r(this, c, S.encryptionKey, "f");
      const b = S.fileExtension ? `.${S.fileExtension}` : "";
      this.path = w.resolve(S.cwd, `${(A = S.configName) !== null && A !== void 0 ? A : "config"}${b}`);
      const $ = this.store, o = Object.assign(J(), S.defaults, $);
      this._validate(o);
      try {
        E.deepEqual($, o);
      } catch {
        this.store = o;
      }
      if (S.watch && this._watch(), S.migrations) {
        if (S.projectVersion || (S.projectVersion = m().version), !S.projectVersion)
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        this._migrate(S.migrations, S.projectVersion, S.beforeEachMigration);
      }
    }
    get(I, A) {
      if (n(this, l, "f").accessPropertiesByDotNotation)
        return this._get(I, A);
      const { store: S } = this;
      return I in S ? S[I] : A;
    }
    set(I, A) {
      if (typeof I != "string" && typeof I != "object")
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof I}`);
      if (typeof I != "object" && A === void 0)
        throw new TypeError("Use `delete()` to clear values");
      if (this._containsReservedKey(I))
        throw new TypeError(`Please don't use the ${M} key, as it's used to manage this module internal operations.`);
      const { store: S } = this, m = (b, $) => {
        x(b, $), n(this, l, "f").accessPropertiesByDotNotation ? _.set(S, b, $) : S[b] = $;
      };
      if (typeof I == "object") {
        const b = I;
        for (const [$, o] of Object.entries(b))
          m($, o);
      } else
        m(I, A);
      this.store = S;
    }
    /**
        Check if an item exists.
    
        @param key - The key of the item to check.
        */
    has(I) {
      return n(this, l, "f").accessPropertiesByDotNotation ? _.has(this.store, I) : I in this.store;
    }
    /**
        Reset items to their default values, as defined by the `defaults` or `schema` option.
    
        @see `clear()` to reset all items.
    
        @param keys - The keys of the items to reset.
        */
    reset(...I) {
      for (const A of I)
        ee(n(this, d, "f")[A]) && this.set(A, n(this, d, "f")[A]);
    }
    /**
        Delete an item.
    
        @param key - The key of the item to delete.
        */
    delete(I) {
      const { store: A } = this;
      n(this, l, "f").accessPropertiesByDotNotation ? _.delete(A, I) : delete A[I], this.store = A;
    }
    /**
        Delete all items.
    
        This resets known items to their default values, if defined by the `defaults` or `schema` option.
        */
    clear() {
      this.store = J();
      for (const I of Object.keys(n(this, d, "f")))
        this.reset(I);
    }
    /**
        Watches the given `key`, calling `callback` on any changes.
    
        @param key - The key wo watch.
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidChange(I, A) {
      if (typeof I != "string")
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof I}`);
      if (typeof A != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof A}`);
      return this._handleChange(() => this.get(I), A);
    }
    /**
        Watches the whole config object, calling `callback` on any changes.
    
        @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
        @returns A function, that when called, will unsubscribe.
        */
    onDidAnyChange(I) {
      if (typeof I != "function")
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof I}`);
      return this._handleChange(() => this.store, I);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const I = h.readFileSync(this.path, n(this, c, "f") ? null : "utf8"), A = this._encryptData(I), S = this._deserialize(A);
        return this._validate(S), Object.assign(J(), S);
      } catch (I) {
        if ((I == null ? void 0 : I.code) === "ENOENT")
          return this._ensureDirectory(), J();
        if (n(this, l, "f").clearInvalidConfig && I.name === "SyntaxError")
          return J();
        throw I;
      }
    }
    set store(I) {
      this._ensureDirectory(), this._validate(I), this._write(I), this.events.emit("change");
    }
    *[(i = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
      for (const [I, A] of Object.entries(this.store))
        yield [I, A];
    }
    _encryptData(I) {
      if (!n(this, c, "f"))
        return I.toString();
      try {
        if (n(this, c, "f"))
          try {
            if (I.slice(16, 17).toString() === ":") {
              const A = I.slice(0, 16), S = y.pbkdf2Sync(n(this, c, "f"), A.toString(), 1e4, 32, "sha512"), m = y.createDecipheriv(z, S, A);
              I = Buffer.concat([m.update(Buffer.from(I.slice(17))), m.final()]).toString("utf8");
            } else {
              const A = y.createDecipher(z, n(this, c, "f"));
              I = Buffer.concat([A.update(Buffer.from(I)), A.final()]).toString("utf8");
            }
          } catch {
          }
      } catch {
      }
      return I.toString();
    }
    _handleChange(I, A) {
      let S = I();
      const m = () => {
        const b = S, $ = I();
        (0, u.isDeepStrictEqual)($, b) || (S = $, A.call(this, $, b));
      };
      return this.events.on("change", m), () => this.events.removeListener("change", m);
    }
    _validate(I) {
      if (!n(this, i, "f") || n(this, i, "f").call(this, I) || !n(this, i, "f").errors)
        return;
      const S = n(this, i, "f").errors.map(({ instancePath: m, message: b = "" }) => `\`${m.slice(1)}\` ${b}`);
      throw new Error("Config schema violation: " + S.join("; "));
    }
    _ensureDirectory() {
      h.mkdirSync(w.dirname(this.path), { recursive: !0 });
    }
    _write(I) {
      let A = this._serialize(I);
      if (n(this, c, "f")) {
        const S = y.randomBytes(16), m = y.pbkdf2Sync(n(this, c, "f"), S.toString(), 1e4, 32, "sha512"), b = y.createCipheriv(z, m, S);
        A = Buffer.concat([S, Buffer.from(":"), b.update(Buffer.from(A)), b.final()]);
      }
      if (process.env.SNAP)
        h.writeFileSync(this.path, A, { mode: n(this, l, "f").configFileMode });
      else
        try {
          N.writeFileSync(this.path, A, { mode: n(this, l, "f").configFileMode });
        } catch (S) {
          if ((S == null ? void 0 : S.code) === "EXDEV") {
            h.writeFileSync(this.path, A, { mode: n(this, l, "f").configFileMode });
            return;
          }
          throw S;
        }
    }
    _watch() {
      this._ensureDirectory(), h.existsSync(this.path) || this._write(J()), process.platform === "win32" ? h.watch(this.path, { persistent: !1 }, F(() => {
        this.events.emit("change");
      }, { wait: 100 })) : h.watchFile(this.path, { persistent: !1 }, F(() => {
        this.events.emit("change");
      }, { wait: 5e3 }));
    }
    _migrate(I, A, S) {
      let m = this._get(L, "0.0.0");
      const b = Object.keys(I).filter((o) => this._shouldPerformMigration(o, m, A));
      let $ = { ...this.store };
      for (const o of b)
        try {
          S && S(this, {
            fromVersion: m,
            toVersion: o,
            finalVersion: A,
            versions: b
          });
          const f = I[o];
          f(this), this._set(L, o), m = o, $ = { ...this.store };
        } catch (f) {
          throw this.store = $, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
        }
      (this._isVersionInRangeFormat(m) || !q.eq(m, A)) && this._set(L, A);
    }
    _containsReservedKey(I) {
      return typeof I == "object" && Object.keys(I)[0] === M ? !0 : typeof I != "string" ? !1 : n(this, l, "f").accessPropertiesByDotNotation ? !!I.startsWith(`${M}.`) : !1;
    }
    _isVersionInRangeFormat(I) {
      return q.clean(I) === null;
    }
    _shouldPerformMigration(I, A, S) {
      return this._isVersionInRangeFormat(I) ? A !== "0.0.0" && q.satisfies(A, I) ? !1 : q.satisfies(S, I) : !(q.lte(I, A) || q.gt(I, S));
    }
    _get(I, A) {
      return _.get(this.store, I, A);
    }
    _set(I, A) {
      const { store: S } = this;
      _.set(S, I, A), this.store = S;
    }
  }
  t.default = B, e.exports = B, e.exports.default = B;
})(bs, bs.exports);
var kE = bs.exports;
const ac = Zt, { app: Rn, ipcMain: Gs, ipcRenderer: oc, shell: CE } = vu, DE = kE;
let ic = !1;
const cc = () => {
  if (!Gs || !Rn)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Rn.getPath("userData"),
    appVersion: Rn.getVersion()
  };
  return ic || (Gs.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), ic = !0), e;
};
class ME extends DE {
  constructor(t) {
    let r, n;
    if (oc) {
      const s = oc.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else Gs && Rn && ({ defaultCwd: r, appVersion: n } = cc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = ac.isAbsolute(t.cwd) ? t.cwd : ac.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    cc();
  }
  async openInEditor() {
    const t = await CE.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var LE = ME;
const FE = /* @__PURE__ */ Cu(LE), mu = "iTransporter-secure-key-2024", Qe = new FE({
  name: "iTransporter-data",
  defaults: {
    credentials: [],
    uploadHistory: []
  }
});
function VE(e) {
  const t = ar.scryptSync(mu, "salt", 32), r = ar.randomBytes(16), n = ar.createCipheriv("aes-256-cbc", t, r);
  let s = n.update(e, "utf8", "hex");
  return s += n.final("hex"), r.toString("hex") + ":" + s;
}
function UE(e) {
  try {
    const [t, r] = e.split(":"), n = ar.scryptSync(mu, "salt", 32), s = Buffer.from(t, "hex"), a = ar.createDecipheriv("aes-256-cbc", n, s);
    let i = a.update(r, "hex", "utf8");
    return i += a.final("utf8"), i;
  } catch {
    return "";
  }
}
function yu(e, t) {
  const r = Qe.get("credentials", []), n = r.findIndex((i) => i.appleId === e), s = VE(t), a = (/* @__PURE__ */ new Date()).toISOString();
  n >= 0 ? (r[n].password = s, r[n].lastUsed = a, r[n].uploadCount += 1) : r.push({
    appleId: e,
    password: s,
    lastUsed: a,
    uploadCount: 1
  }), Qe.set("credentials", r);
}
function zE() {
  return Qe.get("credentials", []).map((t) => ({
    appleId: t.appleId,
    lastUsed: t.lastUsed,
    uploadCount: t.uploadCount
  }));
}
function qE(e) {
  const r = Qe.get("credentials", []).find((n) => n.appleId === e);
  return r ? {
    ...r,
    password: UE(r.password)
  } : null;
}
function KE(e) {
  const t = Qe.get("credentials", []), r = t.filter((n) => n.appleId !== e);
  return r.length !== t.length ? (Qe.set("credentials", r), !0) : !1;
}
function Tn(e) {
  const t = Qe.get("uploadHistory", []), r = {
    ...e,
    id: ar.randomUUID()
  };
  return t.unshift(r), t.length > 100 && t.pop(), Qe.set("uploadHistory", t), r;
}
function GE() {
  return Qe.get("uploadHistory", []);
}
function HE() {
  Qe.set("uploadHistory", []);
}
function BE(e) {
  const t = Qe.get("uploadHistory", []), r = t.filter((n) => n.id !== e);
  return r.length !== t.length ? (Qe.set("uploadHistory", r), !0) : !1;
}
let st = null, Tt = null, kr = "";
async function JE(e, t) {
  return new Promise((r) => {
    var c, l;
    const n = yc(), s = dc(n, [
      "-m",
      "provider",
      "-u",
      e,
      "-p",
      t
    ]);
    let a = "", i = "";
    (c = s.stdout) == null || c.on("data", (d) => {
      a += d.toString();
    }), (l = s.stderr) == null || l.on("data", (d) => {
      i += d.toString();
    }), s.on("close", (d) => {
      if (d === 0) {
        const u = [], h = a.split(`
`);
        for (const w of h) {
          const y = w.match(/^\d+\.\s+(.+?)\s+\((\w+)\)\s+-\s+ProviderShortName:\s+(\S+)/);
          y && u.push({
            teamName: y[1].trim(),
            teamId: y[2],
            shortName: y[3]
          });
        }
        if (u.length > 0)
          r({ success: !0, providers: u });
        else {
          const w = a.match(/ProviderShortName:\s*(\S+)/g);
          w ? (w.forEach((y, E) => {
            const g = y.replace("ProviderShortName:", "").trim();
            u.push({
              teamName: `Team ${E + 1}`,
              teamId: "",
              shortName: g
            });
          }), r({ success: !0, providers: u })) : r({ success: !1, errorMessage: "未能解析 Provider 列表" });
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
function XE(e, t) {
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
function WE(e, t) {
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
function YE(e, t) {
  return new Promise((r) => {
    var d, u;
    const n = yc(), s = hc.basename(e.ipaPath);
    kr = (/* @__PURE__ */ new Date()).toISOString(), Tt = e, qt(t, {
      phase: "preparing",
      phaseText: "准备中",
      progress: 0,
      fileName: s
    }), Ue(t, `[INFO] 开始上传: ${s}`), Ue(t, `[INFO] Apple ID: ${e.appleId}`), e.ascProvider && Ue(t, `[INFO] Provider: ${e.ascProvider}`), Ue(t, `[INFO] 使用 iTMSTransporter: ${n}`), Ue(t, "---");
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
    e.ascProvider && a.push("-asc_provider", e.ascProvider), st = dc(n, a);
    let i = "", c = null;
    const l = (h, w = !1) => {
      w ? Ue(t, `[ERROR] ${h}`) : Ue(t, h);
      const y = XE(h, s);
      if (y) {
        c = y, qt(t, y);
        return;
      }
      const E = WE(h, s);
      E && (c && E.phase === "uploading" && c.phase === "uploading" && (E.progress = c.progress), c = E, qt(t, E));
    };
    (d = st.stdout) == null || d.on("data", (h) => {
      h.toString().split(`
`).filter((E) => E.trim()).forEach((E) => l(E));
    }), (u = st.stderr) == null || u.on("data", (h) => {
      const w = h.toString();
      i += w, w.split(`
`).filter((E) => E.trim()).forEach((E) => l(E, !0));
    }), st.on("close", (h) => {
      const w = (/* @__PURE__ */ new Date()).toISOString();
      h === 0 ? (Ue(t, "---"), Ue(t, "[SUCCESS] 上传完成!"), qt(t, {
        phase: "completed",
        phaseText: "上传完成",
        progress: 100,
        fileName: s
      }), yu(e.appleId, e.appSpecificPassword), Tn({
        fileName: s,
        filePath: e.ipaPath,
        appleId: e.appleId,
        status: "success",
        startTime: kr,
        endTime: w
      }), t.webContents.send("upload-complete", { success: !0 }), r({ success: !0 })) : (Ue(t, "---"), Ue(t, `[FAILED] 上传失败 (退出码: ${h})`), qt(t, {
        phase: "failed",
        phaseText: "上传失败",
        progress: (c == null ? void 0 : c.progress) || 0,
        fileName: s
      }), Tn({
        fileName: s,
        filePath: e.ipaPath,
        appleId: e.appleId,
        status: "failed",
        startTime: kr,
        endTime: w,
        errorMessage: i || `Exit code: ${h}`
      }), t.webContents.send("upload-complete", {
        success: !1,
        errorMessage: i || `Exit code: ${h}`
      }), r({ success: !1, errorMessage: i || `Exit code: ${h}` })), st = null, Tt = null;
    }), st.on("error", (h) => {
      const w = (/* @__PURE__ */ new Date()).toISOString();
      Ue(t, `[ERROR] 进程启动失败: ${h.message}`), qt(t, {
        phase: "failed",
        phaseText: "启动失败",
        progress: 0,
        fileName: s
      }), Tn({
        fileName: s,
        filePath: e.ipaPath,
        appleId: e.appleId,
        status: "failed",
        startTime: kr,
        endTime: w,
        errorMessage: h.message
      }), t.webContents.send("upload-complete", {
        success: !1,
        errorMessage: h.message
      }), r({ success: !1, errorMessage: h.message }), st = null, Tt = null;
    });
  });
}
function QE(e) {
  if (st && Tt) {
    const t = hc.basename(Tt.ipaPath);
    Ue(e, "[INFO] 正在取消上传..."), qt(e, {
      phase: "failed",
      phaseText: "已取消",
      progress: 0,
      fileName: t
    });
    const r = (/* @__PURE__ */ new Date()).toISOString();
    return Tn({
      fileName: t,
      filePath: Tt.ipaPath,
      appleId: Tt.appleId,
      status: "cancelled",
      startTime: kr,
      endTime: r,
      errorMessage: "用户取消上传"
    }), st.kill("SIGTERM"), st = null, Tt = null, Ue(e, "[INFO] 上传已取消"), e.webContents.send("upload-complete", {
      success: !1,
      errorMessage: "用户取消上传"
    }), !0;
  }
  return !1;
}
function $u() {
  return st !== null;
}
function Ue(e, t) {
  e.webContents.send("upload-log", {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    message: t
  });
}
function qt(e, t) {
  e.webContents.send("upload-progress", t);
}
const is = ur.dirname(wu(import.meta.url)), ZE = !!process.env.VITE_DEV_SERVER_URL, lc = process.env.VITE_DEV_SERVER_URL, fw = ur.join(is), _u = ur.join(is, "../dist");
process.env.VITE_PUBLIC = ZE ? ur.join(is, "../public") : _u;
let Ke;
function gu() {
  Ke = new uc({
    width: 900,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    // icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      preload: ur.join(is, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), Ke.webContents.on("did-finish-load", () => {
    Ke == null || Ke.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), lc ? Ke.loadURL(lc) : Ke.loadFile(ur.join(_u, "index.html"));
}
Be.handle("check-environment", async () => await Au());
Be.handle("install-clt", async () => await ku());
Be.handle("select-ipa-file", async () => {
  if (!Ke) return null;
  const e = await Eu.showOpenDialog(Ke, {
    title: "选择 IPA 文件",
    filters: [
      { name: "iOS App", extensions: ["ipa"] }
    ],
    properties: ["openFile"]
  });
  return e.canceled || e.filePaths.length === 0 ? null : e.filePaths[0];
});
Be.handle("start-upload", async (e, t) => Ke ? $u() ? { success: !1, errorMessage: "已有上传任务进行中" } : await YE(t, Ke) : { success: !1, errorMessage: "窗口未初始化" });
Be.handle("cancel-upload", async () => Ke ? QE(Ke) : !1);
Be.handle("is-uploading", () => $u());
Be.handle("fetch-providers", async (e, t) => await JE(t.appleId, t.password));
Be.handle("get-credentials-list", () => zE());
Be.handle("get-credential", (e, t) => qE(t));
Be.handle("save-credential", (e, t) => (yu(t.appleId, t.password), !0));
Be.handle("delete-credential", (e, t) => KE(t));
Be.handle("get-upload-history", () => GE());
Be.handle("clear-upload-history", () => (HE(), !0));
Be.handle("delete-upload-history", (e, t) => BE(t));
In.on("window-all-closed", () => {
  process.platform !== "darwin" && (In.quit(), Ke = null);
});
In.on("activate", () => {
  uc.getAllWindows().length === 0 && gu();
});
In.whenReady().then(gu);
export {
  fw as MAIN_DIST,
  _u as RENDERER_DIST,
  lc as VITE_DEV_SERVER_URL
};
