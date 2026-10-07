var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../../node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// _worker.js/index.js
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name((_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[/* @__PURE__ */ Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name((_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var ne = Object.create;
var U = Object.defineProperty;
var se = Object.getOwnPropertyDescriptor;
var ae = Object.getOwnPropertyNames;
var ce = Object.getPrototypeOf;
var ie = Object.prototype.hasOwnProperty;
var E = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "E");
var V = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "V");
var oe = /* @__PURE__ */ __name((e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function") for (let a of ae(t)) !ie.call(e, a) && a !== n && U(e, a, { get: /* @__PURE__ */ __name(() => t[a], "get"), enumerable: !(r = se(t, a)) || r.enumerable });
  return e;
}, "oe");
var F = /* @__PURE__ */ __name((e, t, n) => (n = e != null ? ne(ce(e)) : {}, oe(t || !e || !e.__esModule ? U(n, "default", { value: e, enumerable: true }) : n, e)), "F");
var d;
var _ = E(() => {
  d = { collectedLocales: [] };
});
var l;
var h = E(() => {
  l = { version: 3, routes: { none: [{ src: "^(?:/((?!\\.well-known(?:/.*)?)(?:[^/]+/)*[^/]+\\.\\w+))/$", headers: { Location: "/$1" }, status: 308, missing: [{ type: "header", key: "x-nextjs-data" }], continue: true }, { src: "^(?:/((?!\\.well-known(?:/.*)?)(?:[^/]+/)*[^/\\.]+))$", headers: { Location: "/$1/" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/index.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/$1.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/_next/data/(.*)$", dest: "/_next/data/$1", check: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/.+$", status: 404, check: true, dest: "/_next/static/not-found.txt", headers: { "content-type": "text/plain; charset=utf-8" } }], rewrite: [{ src: "^/_next/data/(.*)$", dest: "/404", status: 404 }, { src: "^/book/(?<nxtPkitchen>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/book/[kitchen].rsc?nxtPkitchen=$nxtPkitchen" }, { src: "^/book/(?<nxtPkitchen>[^/]+?)(?:/)?$", dest: "/book/[kitchen]?nxtPkitchen=$nxtPkitchen" }, { src: "^/kitchen/(?<nxtPid>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/kitchen/[id].rsc?nxtPid=$nxtPid" }, { src: "^/kitchen/(?<nxtPid>[^/]+?)(?:/)?$", dest: "/kitchen/[id]?nxtPid=$nxtPid" }, { src: "^/kitchens/(?<nxtPcategory>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/kitchens/[category].rsc?nxtPcategory=$nxtPcategory" }, { src: "^/kitchens/(?<nxtPcategory>[^/]+?)(?:/)?$", dest: "/kitchens/[category]?nxtPcategory=$nxtPcategory" }, { src: "^/order/(?<nxtPid>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/order/[id].rsc?nxtPid=$nxtPid" }, { src: "^/order/(?<nxtPid>[^/]+?)(?:/)?$", dest: "/order/[id]?nxtPid=$nxtPid" }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|VoG4SDHuwHdFXQz0YWCyF)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404, headers: { "x-next-error-status": "404" } }, { src: "^/.*$", dest: "/500", status: 500, headers: { "x-next-error-status": "500" } }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 16, 32, 48, 64, 96, 128, 256, 384], remotePatterns: [], minimumCacheTTL: 60, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "attachment" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "_app.rsc.json": { path: "_app.rsc", contentType: "application/json" }, "_error.rsc.json": { path: "_error.rsc", contentType: "application/json" }, "_document.rsc.json": { path: "_document.rsc", contentType: "application/json" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "_next/static/not-found.txt": { contentType: "text/plain" } }, framework: { slug: "nextjs", version: "15.5.27" }, crons: [] };
});
var y;
var p = E(() => {
  y = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/PJS.woff": { type: "static" }, "/_app.rsc.json": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc.json": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc.json": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/VoG4SDHuwHdFXQz0YWCyF/_buildManifest.js": { type: "static" }, "/_next/static/VoG4SDHuwHdFXQz0YWCyF/_ssgManifest.js": { type: "static" }, "/_next/static/chunks/143-17f8cc7dc399c6a2.js": { type: "static" }, "/_next/static/chunks/255-0c97713bcfa8ac3e.js": { type: "static" }, "/_next/static/chunks/35-f3610b6c6a1168cd.js": { type: "static" }, "/_next/static/chunks/416-f19375d350d0af10.js": { type: "static" }, "/_next/static/chunks/4bd1b696-c023c6e3521b1417.js": { type: "static" }, "/_next/static/chunks/558-811d5982ad6d6dee.js": { type: "static" }, "/_next/static/chunks/619-ba102abea3e3d0e4.js": { type: "static" }, "/_next/static/chunks/673-5c33419fede59a3a.js": { type: "static" }, "/_next/static/chunks/867-1b96440b50a07fd5.js": { type: "static" }, "/_next/static/chunks/app/_not-found/page-d016b88d3382ba36.js": { type: "static" }, "/_next/static/chunks/app/api/order-email/route-d016b88d3382ba36.js": { type: "static" }, "/_next/static/chunks/app/api/partner/route-d016b88d3382ba36.js": { type: "static" }, "/_next/static/chunks/app/api/subscribe/route-d016b88d3382ba36.js": { type: "static" }, "/_next/static/chunks/app/book/[kitchen]/page-e3714488c2b5e1f2.js": { type: "static" }, "/_next/static/chunks/app/cart/page-1f522b716f598c03.js": { type: "static" }, "/_next/static/chunks/app/checkout/page-5f9f18c8190de457.js": { type: "static" }, "/_next/static/chunks/app/confirmation/page-6cad61cf89634ef3.js": { type: "static" }, "/_next/static/chunks/app/early-access/page-e5727f0fce0a8812.js": { type: "static" }, "/_next/static/chunks/app/kitchen/[id]/page-25e8291e989862a0.js": { type: "static" }, "/_next/static/chunks/app/kitchens/[category]/page-c999167c48b551d5.js": { type: "static" }, "/_next/static/chunks/app/layout-2097282927fb4725.js": { type: "static" }, "/_next/static/chunks/app/live/page-e2c10beaa153e012.js": { type: "static" }, "/_next/static/chunks/app/loading-d016b88d3382ba36.js": { type: "static" }, "/_next/static/chunks/app/not-found-79465f4b9679caa5.js": { type: "static" }, "/_next/static/chunks/app/order/[id]/page-56ea9d2a6bde5c94.js": { type: "static" }, "/_next/static/chunks/app/page-7356b05454d3701d.js": { type: "static" }, "/_next/static/chunks/app/privacy/page-79465f4b9679caa5.js": { type: "static" }, "/_next/static/chunks/framework-4891de286d38ef96.js": { type: "static" }, "/_next/static/chunks/main-2e72aa10088ddedd.js": { type: "static" }, "/_next/static/chunks/main-app-117de46666fe7167.js": { type: "static" }, "/_next/static/chunks/pages/_app-7d307437aca18ad4.js": { type: "static" }, "/_next/static/chunks/pages/_error-cb2a52f75f2162e2.js": { type: "static" }, "/_next/static/chunks/polyfills-42372ed130431b0a.js": { type: "static" }, "/_next/static/chunks/webpack-1546ff54bcd8aaf8.js": { type: "static" }, "/_next/static/css/170fb96ed53d916a.css": { type: "static" }, "/_next/static/css/779b6852580fee8c.css": { type: "static" }, "/_next/static/media/dd867eac9d8707d9-s.p.ttf": { type: "static" }, "/_next/static/not-found.txt": { type: "static" }, "/assets/brand/fork.png": { type: "static" }, "/assets/brand/logo-dark.png": { type: "static" }, "/assets/brand/logo-white.png": { type: "static" }, "/assets/categories/bubble-tea.webp": { type: "static" }, "/assets/categories/burgers.webp": { type: "static" }, "/assets/categories/burritos.webp": { type: "static" }, "/assets/categories/coffee.webp": { type: "static" }, "/assets/categories/desserts.webp": { type: "static" }, "/assets/categories/doughnuts.webp": { type: "static" }, "/assets/categories/fish-chips.webp": { type: "static" }, "/assets/categories/fried-chicken.webp": { type: "static" }, "/assets/categories/healthy.webp": { type: "static" }, "/assets/categories/ice-cream.webp": { type: "static" }, "/assets/categories/kebab.webp": { type: "static" }, "/assets/categories/meal-prep.webp": { type: "static" }, "/assets/categories/mexican.webp": { type: "static" }, "/assets/categories/pasta.webp": { type: "static" }, "/assets/categories/ramen.webp": { type: "static" }, "/assets/categories/sandwiches.webp": { type: "static" }, "/assets/categories/thai.webp": { type: "static" }, "/assets/categories/vegan.webp": { type: "static" }, "/assets/dine/dine-01.jpg": { type: "static" }, "/assets/dine/dine-02.jpg": { type: "static" }, "/assets/dine/dine-03.jpg": { type: "static" }, "/assets/dine/dine-04.jpg": { type: "static" }, "/assets/dine/dine-05.jpg": { type: "static" }, "/assets/dine/dine-06.jpg": { type: "static" }, "/assets/dine/dine-07.jpg": { type: "static" }, "/assets/dishes/american.webp": { type: "static" }, "/assets/dishes/asian.webp": { type: "static" }, "/assets/dishes/bbq.webp": { type: "static" }, "/assets/dishes/biryani.webp": { type: "static" }, "/assets/dishes/bread.webp": { type: "static" }, "/assets/dishes/burgers.webp": { type: "static" }, "/assets/dishes/cakes.webp": { type: "static" }, "/assets/dishes/chinese.webp": { type: "static" }, "/assets/dishes/chow-mein.webp": { type: "static" }, "/assets/dishes/curry.webp": { type: "static" }, "/assets/dishes/desserts.webp": { type: "static" }, "/assets/dishes/duck.webp": { type: "static" }, "/assets/dishes/english.webp": { type: "static" }, "/assets/dishes/fish-and-chips.webp": { type: "static" }, "/assets/dishes/fresh-seafood.webp": { type: "static" }, "/assets/dishes/fried-chicken.webp": { type: "static" }, "/assets/dishes/grill.webp": { type: "static" }, "/assets/dishes/groceries.webp": { type: "static" }, "/assets/dishes/ice-cream.webp": { type: "static" }, "/assets/dishes/indian.webp": { type: "static" }, "/assets/dishes/kebab.webp": { type: "static" }, "/assets/dishes/malaysian.webp": { type: "static" }, "/assets/dishes/mexican.webp": { type: "static" }, "/assets/dishes/milkshake.webp": { type: "static" }, "/assets/dishes/noodles.webp": { type: "static" }, "/assets/dishes/pasta.webp": { type: "static" }, "/assets/dishes/peri-peri.webp": { type: "static" }, "/assets/dishes/pizza.webp": { type: "static" }, "/assets/dishes/pork.webp": { type: "static" }, "/assets/dishes/rice.webp": { type: "static" }, "/assets/dishes/salad.webp": { type: "static" }, "/assets/dishes/sandwich.webp": { type: "static" }, "/assets/dishes/singapore.webp": { type: "static" }, "/assets/dishes/tandoori.webp": { type: "static" }, "/assets/dishes/thai.webp": { type: "static" }, "/assets/dishes/wraps.webp": { type: "static" }, "/assets/hero/hero-sushi.webp": { type: "static" }, "/assets/how/how-01-see-it.jpg": { type: "static" }, "/assets/how/how-01-see-it.mp4": { type: "static" }, "/assets/how/how-02-share-it.jpg": { type: "static" }, "/assets/how/how-03-plated.jpg": { type: "static" }, "/assets/kitchens/kitchen-01.jpg": { type: "static" }, "/assets/kitchens/kitchen-02.jpg": { type: "static" }, "/assets/kitchens/kitchen-03.jpg": { type: "static" }, "/assets/kitchens/kitchen-04.jpg": { type: "static" }, "/assets/kitchens/kitchen-05.jpg": { type: "static" }, "/assets/kitchens/kitchen-06.jpg": { type: "static" }, "/assets/kitchens/kitchen-07.jpg": { type: "static" }, "/assets/kitchens/kitchen-08.jpg": { type: "static" }, "/assets/kitchens/kitchen-09.jpg": { type: "static" }, "/assets/kitchens/kitchen-10.jpg": { type: "static" }, "/assets/kitchens/kitchen-11.jpg": { type: "static" }, "/assets/kitchens/kitchen-12.jpg": { type: "static" }, "/assets/kitchens/kitchen-13.jpg": { type: "static" }, "/assets/kitchens/kitchen-14.jpg": { type: "static" }, "/assets/kitchens/kitchen-15.jpg": { type: "static" }, "/assets/kitchens/kitchen-16.jpg": { type: "static" }, "/assets/kitchens/kitchen-17.jpg": { type: "static" }, "/assets/kitchens/kitchen-18.jpg": { type: "static" }, "/assets/kitchens/kitchen-19.jpg": { type: "static" }, "/assets/kitchens/kitchen-20.jpg": { type: "static" }, "/assets/kitchens/kitchen-21.jpg": { type: "static" }, "/assets/kitchens/kitchen-22.jpg": { type: "static" }, "/assets/kitchens/kitchen-23.jpg": { type: "static" }, "/assets/kitchens/kitchen-24.jpg": { type: "static" }, "/assets/kitchens/kitchen-25.jpg": { type: "static" }, "/assets/kitchens/kitchen-26.jpg": { type: "static" }, "/assets/kitchens/kitchen-27.jpg": { type: "static" }, "/assets/kitchens/kitchen-28.jpg": { type: "static" }, "/assets/kitchens/kitchen-29.jpg": { type: "static" }, "/assets/kitchens/kitchen-30.jpg": { type: "static" }, "/assets/kitchens/kitchen-31.jpg": { type: "static" }, "/assets/kitchens/kitchen-32.jpg": { type: "static" }, "/assets/kitchens/kitchen-33.jpg": { type: "static" }, "/assets/live/live-01.jpg": { type: "static" }, "/assets/live/live-01.mp4": { type: "static" }, "/assets/live/live-02.jpg": { type: "static" }, "/assets/live/live-02.mp4": { type: "static" }, "/assets/live/live-03.jpg": { type: "static" }, "/assets/live/live-03.mp4": { type: "static" }, "/assets/live/live-04.jpg": { type: "static" }, "/assets/live/live-04.mp4": { type: "static" }, "/assets/live/live-05.jpg": { type: "static" }, "/assets/live/live-05.mp4": { type: "static" }, "/assets/live/live-06.jpg": { type: "static" }, "/assets/live/live-06.mp4": { type: "static" }, "/assets/live/live-07.jpg": { type: "static" }, "/assets/live/live-07.mp4": { type: "static" }, "/assets/live/live-08.jpg": { type: "static" }, "/assets/live/live-08.mp4": { type: "static" }, "/assets/live/live-09.jpg": { type: "static" }, "/assets/live/live-09.mp4": { type: "static" }, "/assets/live/live-10.jpg": { type: "static" }, "/assets/live/live-10.mp4": { type: "static" }, "/assets/live/live-11.jpg": { type: "static" }, "/assets/live/live-11.mp4": { type: "static" }, "/assets/live-kitchens/live-kitchen-01.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-02.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-03.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-04.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-05.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-06.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-07.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-08.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-09.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-10.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-11.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-12.jpg": { type: "static" }, "/assets/live-kitchens/live-kitchen-13.jpg": { type: "static" }, "/api/order-email": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/order-email.func.js" }, "/api/order-email.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/order-email.func.js" }, "/api/partner": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/partner.func.js" }, "/api/partner.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/partner.func.js" }, "/api/subscribe": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/subscribe.func.js" }, "/api/subscribe.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/subscribe.func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/_not-found.html": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found.rsc": { type: "override", path: "/_not-found.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/book/ember-table.html": { type: "override", path: "/book/ember-table.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/ember-table/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/ember-table": { type: "override", path: "/book/ember-table.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/ember-table/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/ember-table.rsc": { type: "override", path: "/book/ember-table.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/ember-table/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/book/flame-and-iron.html": { type: "override", path: "/book/flame-and-iron.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/flame-and-iron/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/flame-and-iron": { type: "override", path: "/book/flame-and-iron.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/flame-and-iron/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/flame-and-iron.rsc": { type: "override", path: "/book/flame-and-iron.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/flame-and-iron/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/book/harbour-terrace.html": { type: "override", path: "/book/harbour-terrace.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/harbour-terrace/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/harbour-terrace": { type: "override", path: "/book/harbour-terrace.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/harbour-terrace/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/harbour-terrace.rsc": { type: "override", path: "/book/harbour-terrace.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/harbour-terrace/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/book/hinoki-counter.html": { type: "override", path: "/book/hinoki-counter.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/hinoki-counter/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/hinoki-counter": { type: "override", path: "/book/hinoki-counter.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/hinoki-counter/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/hinoki-counter.rsc": { type: "override", path: "/book/hinoki-counter.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/hinoki-counter/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/book/skyline-rooftop.html": { type: "override", path: "/book/skyline-rooftop.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/skyline-rooftop/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/skyline-rooftop": { type: "override", path: "/book/skyline-rooftop.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/skyline-rooftop/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/skyline-rooftop.rsc": { type: "override", path: "/book/skyline-rooftop.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/skyline-rooftop/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/book/the-open-pass.html": { type: "override", path: "/book/the-open-pass.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/the-open-pass/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/the-open-pass": { type: "override", path: "/book/the-open-pass.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/the-open-pass/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/the-open-pass.rsc": { type: "override", path: "/book/the-open-pass.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/the-open-pass/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/book/the-winter-garden.html": { type: "override", path: "/book/the-winter-garden.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/the-winter-garden/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/the-winter-garden": { type: "override", path: "/book/the-winter-garden.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/the-winter-garden/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/book/the-winter-garden.rsc": { type: "override", path: "/book/the-winter-garden.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/book/layout,_N_T_/book/[kitchen]/layout,_N_T_/book/[kitchen]/page,_N_T_/book/the-winter-garden/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/cart.html": { type: "override", path: "/cart.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/cart/layout,_N_T_/cart/page,_N_T_/cart/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/cart": { type: "override", path: "/cart.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/cart/layout,_N_T_/cart/page,_N_T_/cart/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/cart.rsc": { type: "override", path: "/cart.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/cart/layout,_N_T_/cart/page,_N_T_/cart/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/checkout.html": { type: "override", path: "/checkout.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/checkout/layout,_N_T_/checkout/page,_N_T_/checkout/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/checkout": { type: "override", path: "/checkout.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/checkout/layout,_N_T_/checkout/page,_N_T_/checkout/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/checkout.rsc": { type: "override", path: "/checkout.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/checkout/layout,_N_T_/checkout/page,_N_T_/checkout/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/confirmation.html": { type: "override", path: "/confirmation.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/confirmation/layout,_N_T_/confirmation/page,_N_T_/confirmation/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/confirmation": { type: "override", path: "/confirmation.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/confirmation/layout,_N_T_/confirmation/page,_N_T_/confirmation/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/confirmation.rsc": { type: "override", path: "/confirmation.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/confirmation/layout,_N_T_/confirmation/page,_N_T_/confirmation/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/early-access.html": { type: "override", path: "/early-access.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/early-access/layout,_N_T_/early-access/page,_N_T_/early-access/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/early-access": { type: "override", path: "/early-access.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/early-access/layout,_N_T_/early-access/page,_N_T_/early-access/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/early-access.rsc": { type: "override", path: "/early-access.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/early-access/layout,_N_T_/early-access/page,_N_T_/early-access/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/index.html": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/index": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/": { type: "override", path: "/index.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/index.rsc": { type: "override", path: "/index.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/b-bagel.html": { type: "override", path: "/kitchen/b-bagel.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/b-bagel/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/b-bagel": { type: "override", path: "/kitchen/b-bagel.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/b-bagel/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/b-bagel.rsc": { type: "override", path: "/kitchen/b-bagel.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/b-bagel/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/baskin-robbins.html": { type: "override", path: "/kitchen/baskin-robbins.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/baskin-robbins/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/baskin-robbins": { type: "override", path: "/kitchen/baskin-robbins.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/baskin-robbins/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/baskin-robbins.rsc": { type: "override", path: "/kitchen/baskin-robbins.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/baskin-robbins/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/brigade-13.html": { type: "override", path: "/kitchen/brigade-13.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/brigade-13/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/brigade-13": { type: "override", path: "/kitchen/brigade-13.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/brigade-13/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/brigade-13.rsc": { type: "override", path: "/kitchen/brigade-13.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/brigade-13/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/bubbleology.html": { type: "override", path: "/kitchen/bubbleology.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/bubbleology/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/bubbleology": { type: "override", path: "/kitchen/bubbleology.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/bubbleology/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/bubbleology.rsc": { type: "override", path: "/kitchen/bubbleology.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/bubbleology/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/burger-king.html": { type: "override", path: "/kitchen/burger-king.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/burger-king/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/burger-king": { type: "override", path: "/kitchen/burger-king.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/burger-king/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/burger-king.rsc": { type: "override", path: "/kitchen/burger-king.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/burger-king/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/butchies.html": { type: "override", path: "/kitchen/butchies.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/butchies/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/butchies": { type: "override", path: "/kitchen/butchies.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/butchies/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/butchies.rsc": { type: "override", path: "/kitchen/butchies.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/butchies/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/chaiiwala.html": { type: "override", path: "/kitchen/chaiiwala.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/chaiiwala/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/chaiiwala": { type: "override", path: "/kitchen/chaiiwala.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/chaiiwala/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/chaiiwala.rsc": { type: "override", path: "/kitchen/chaiiwala.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/chaiiwala/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/char-lab.html": { type: "override", path: "/kitchen/char-lab.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/char-lab/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/char-lab": { type: "override", path: "/kitchen/char-lab.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/char-lab/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/char-lab.rsc": { type: "override", path: "/kitchen/char-lab.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/char-lab/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/cheat-meals.html": { type: "override", path: "/kitchen/cheat-meals.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/cheat-meals/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/cheat-meals": { type: "override", path: "/kitchen/cheat-meals.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/cheat-meals/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/cheat-meals.rsc": { type: "override", path: "/kitchen/cheat-meals.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/cheat-meals/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/chipotle.html": { type: "override", path: "/kitchen/chipotle.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/chipotle/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/chipotle": { type: "override", path: "/kitchen/chipotle.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/chipotle/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/chipotle.rsc": { type: "override", path: "/kitchen/chipotle.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/chipotle/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/copper-line.html": { type: "override", path: "/kitchen/copper-line.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/copper-line/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/copper-line": { type: "override", path: "/kitchen/copper-line.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/copper-line/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/copper-line.rsc": { type: "override", path: "/kitchen/copper-line.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/copper-line/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/costa.html": { type: "override", path: "/kitchen/costa.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/costa/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/costa": { type: "override", path: "/kitchen/costa.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/costa/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/costa.rsc": { type: "override", path: "/kitchen/costa.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/costa/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/crispies.html": { type: "override", path: "/kitchen/crispies.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/crispies/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/crispies": { type: "override", path: "/kitchen/crispies.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/crispies/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/crispies.rsc": { type: "override", path: "/kitchen/crispies.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/crispies/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/crunch.html": { type: "override", path: "/kitchen/crunch.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/crunch/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/crunch": { type: "override", path: "/kitchen/crunch.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/crunch/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/crunch.rsc": { type: "override", path: "/kitchen/crunch.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/crunch/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/dough-dome.html": { type: "override", path: "/kitchen/dough-dome.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/dough-dome/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/dough-dome": { type: "override", path: "/kitchen/dough-dome.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/dough-dome/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/dough-dome.rsc": { type: "override", path: "/kitchen/dough-dome.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/dough-dome/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/eat-activ.html": { type: "override", path: "/kitchen/eat-activ.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/eat-activ/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/eat-activ": { type: "override", path: "/kitchen/eat-activ.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/eat-activ/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/eat-activ.rsc": { type: "override", path: "/kitchen/eat-activ.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/eat-activ/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/elevate.html": { type: "override", path: "/kitchen/elevate.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/elevate/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/elevate": { type: "override", path: "/kitchen/elevate.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/elevate/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/elevate.rsc": { type: "override", path: "/kitchen/elevate.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/elevate/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/ember-table.html": { type: "override", path: "/kitchen/ember-table.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/ember-table/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/ember-table": { type: "override", path: "/kitchen/ember-table.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/ember-table/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/ember-table.rsc": { type: "override", path: "/kitchen/ember-table.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/ember-table/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/five-guys.html": { type: "override", path: "/kitchen/five-guys.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/five-guys/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/five-guys": { type: "override", path: "/kitchen/five-guys.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/five-guys/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/five-guys.rsc": { type: "override", path: "/kitchen/five-guys.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/five-guys/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/flame-iron.html": { type: "override", path: "/kitchen/flame-iron.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/flame-iron/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/flame-iron": { type: "override", path: "/kitchen/flame-iron.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/flame-iron/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/flame-iron.rsc": { type: "override", path: "/kitchen/flame-iron.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/flame-iron/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/fry-society.html": { type: "override", path: "/kitchen/fry-society.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/fry-society/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/fry-society": { type: "override", path: "/kitchen/fry-society.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/fry-society/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/fry-society.rsc": { type: "override", path: "/kitchen/fry-society.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/fry-society/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/gdk.html": { type: "override", path: "/kitchen/gdk.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/gdk/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/gdk": { type: "override", path: "/kitchen/gdk.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/gdk/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/gdk.rsc": { type: "override", path: "/kitchen/gdk.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/gdk/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/grain.html": { type: "override", path: "/kitchen/grain.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/grain/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/grain": { type: "override", path: "/kitchen/grain.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/grain/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/grain.rsc": { type: "override", path: "/kitchen/grain.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/grain/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/grind-theory.html": { type: "override", path: "/kitchen/grind-theory.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/grind-theory/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/grind-theory": { type: "override", path: "/kitchen/grind-theory.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/grind-theory/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/grind-theory.rsc": { type: "override", path: "/kitchen/grind-theory.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/grind-theory/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/itsu.html": { type: "override", path: "/kitchen/itsu.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/itsu/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/itsu": { type: "override", path: "/kitchen/itsu.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/itsu/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/itsu.rsc": { type: "override", path: "/kitchen/itsu.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/itsu/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/keu.html": { type: "override", path: "/kitchen/keu.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/keu/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/keu": { type: "override", path: "/kitchen/keu.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/keu/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/keu.rsc": { type: "override", path: "/kitchen/keu.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/keu/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/kfc.html": { type: "override", path: "/kitchen/kfc.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/kfc/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/kfc": { type: "override", path: "/kitchen/kfc.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/kfc/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/kfc.rsc": { type: "override", path: "/kitchen/kfc.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/kfc/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/knife-ember.html": { type: "override", path: "/kitchen/knife-ember.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/knife-ember/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/knife-ember": { type: "override", path: "/kitchen/knife-ember.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/knife-ember/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/knife-ember.rsc": { type: "override", path: "/kitchen/knife-ember.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/knife-ember/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/lotus-wok-house.html": { type: "override", path: "/kitchen/lotus-wok-house.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/lotus-wok-house/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/lotus-wok-house": { type: "override", path: "/kitchen/lotus-wok-house.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/lotus-wok-house/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/lotus-wok-house.rsc": { type: "override", path: "/kitchen/lotus-wok-house.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/lotus-wok-house/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/maison-flambe.html": { type: "override", path: "/kitchen/maison-flambe.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/maison-flambe/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/maison-flambe": { type: "override", path: "/kitchen/maison-flambe.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/maison-flambe/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/maison-flambe.rsc": { type: "override", path: "/kitchen/maison-flambe.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/maison-flambe/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/midnight-mise.html": { type: "override", path: "/kitchen/midnight-mise.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/midnight-mise/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/midnight-mise": { type: "override", path: "/kitchen/midnight-mise.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/midnight-mise/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/midnight-mise.rsc": { type: "override", path: "/kitchen/midnight-mise.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/midnight-mise/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/mizu-sushi.html": { type: "override", path: "/kitchen/mizu-sushi.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/mizu-sushi/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/mizu-sushi": { type: "override", path: "/kitchen/mizu-sushi.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/mizu-sushi/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/mizu-sushi.rsc": { type: "override", path: "/kitchen/mizu-sushi.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/mizu-sushi/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/morley-s.html": { type: "override", path: "/kitchen/morley-s.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/morley-s/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/morley-s": { type: "override", path: "/kitchen/morley-s.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/morley-s/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/morley-s.rsc": { type: "override", path: "/kitchen/morley-s.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/morley-s/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/napoli-fire-club.html": { type: "override", path: "/kitchen/napoli-fire-club.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/napoli-fire-club/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/napoli-fire-club": { type: "override", path: "/kitchen/napoli-fire-club.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/napoli-fire-club/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/napoli-fire-club.rsc": { type: "override", path: "/kitchen/napoli-fire-club.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/napoli-fire-club/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/popeyes.html": { type: "override", path: "/kitchen/popeyes.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/popeyes/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/popeyes": { type: "override", path: "/kitchen/popeyes.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/popeyes/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/popeyes.rsc": { type: "override", path: "/kitchen/popeyes.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/popeyes/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/portobello-juice.html": { type: "override", path: "/kitchen/portobello-juice.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/portobello-juice/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/portobello-juice": { type: "override", path: "/kitchen/portobello-juice.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/portobello-juice/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/portobello-juice.rsc": { type: "override", path: "/kitchen/portobello-juice.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/portobello-juice/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/pret.html": { type: "override", path: "/kitchen/pret.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/pret/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/pret": { type: "override", path: "/kitchen/pret.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/pret/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/pret.rsc": { type: "override", path: "/kitchen/pret.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/pret/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/red-line-kitchen.html": { type: "override", path: "/kitchen/red-line-kitchen.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/red-line-kitchen/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/red-line-kitchen": { type: "override", path: "/kitchen/red-line-kitchen.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/red-line-kitchen/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/red-line-kitchen.rsc": { type: "override", path: "/kitchen/red-line-kitchen.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/red-line-kitchen/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/shake-shack.html": { type: "override", path: "/kitchen/shake-shack.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/shake-shack/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/shake-shack": { type: "override", path: "/kitchen/shake-shack.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/shake-shack/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/shake-shack.rsc": { type: "override", path: "/kitchen/shake-shack.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/shake-shack/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/slice-lab.html": { type: "override", path: "/kitchen/slice-lab.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/slice-lab/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/slice-lab": { type: "override", path: "/kitchen/slice-lab.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/slice-lab/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/slice-lab.rsc": { type: "override", path: "/kitchen/slice-lab.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/slice-lab/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/slim-chickens.html": { type: "override", path: "/kitchen/slim-chickens.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/slim-chickens/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/slim-chickens": { type: "override", path: "/kitchen/slim-chickens.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/slim-chickens/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/slim-chickens.rsc": { type: "override", path: "/kitchen/slim-chickens.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/slim-chickens/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/sobe-burger.html": { type: "override", path: "/kitchen/sobe-burger.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/sobe-burger/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/sobe-burger": { type: "override", path: "/kitchen/sobe-burger.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/sobe-burger/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/sobe-burger.rsc": { type: "override", path: "/kitchen/sobe-burger.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/sobe-burger/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/steel-smoke.html": { type: "override", path: "/kitchen/steel-smoke.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/steel-smoke/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/steel-smoke": { type: "override", path: "/kitchen/steel-smoke.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/steel-smoke/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/steel-smoke.rsc": { type: "override", path: "/kitchen/steel-smoke.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/steel-smoke/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/taco-bell.html": { type: "override", path: "/kitchen/taco-bell.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/taco-bell/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/taco-bell": { type: "override", path: "/kitchen/taco-bell.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/taco-bell/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/taco-bell.rsc": { type: "override", path: "/kitchen/taco-bell.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/taco-bell/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/tandoor-house.html": { type: "override", path: "/kitchen/tandoor-house.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/tandoor-house/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/tandoor-house": { type: "override", path: "/kitchen/tandoor-house.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/tandoor-house/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/tandoor-house.rsc": { type: "override", path: "/kitchen/tandoor-house.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/tandoor-house/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/the-hot-pass.html": { type: "override", path: "/kitchen/the-hot-pass.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/the-hot-pass/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/the-hot-pass": { type: "override", path: "/kitchen/the-hot-pass.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/the-hot-pass/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/the-hot-pass.rsc": { type: "override", path: "/kitchen/the-hot-pass.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/the-hot-pass/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/the-open-pass.html": { type: "override", path: "/kitchen/the-open-pass.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/the-open-pass/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/the-open-pass": { type: "override", path: "/kitchen/the-open-pass.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/the-open-pass/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/the-open-pass.rsc": { type: "override", path: "/kitchen/the-open-pass.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/the-open-pass/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/urban-chocolatier.html": { type: "override", path: "/kitchen/urban-chocolatier.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/urban-chocolatier/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/urban-chocolatier": { type: "override", path: "/kitchen/urban-chocolatier.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/urban-chocolatier/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/urban-chocolatier.rsc": { type: "override", path: "/kitchen/urban-chocolatier.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/urban-chocolatier/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/wenzel-s.html": { type: "override", path: "/kitchen/wenzel-s.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wenzel-s/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/wenzel-s": { type: "override", path: "/kitchen/wenzel-s.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wenzel-s/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/wenzel-s.rsc": { type: "override", path: "/kitchen/wenzel-s.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wenzel-s/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/wingmans.html": { type: "override", path: "/kitchen/wingmans.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wingmans/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/wingmans": { type: "override", path: "/kitchen/wingmans.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wingmans/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/wingmans.rsc": { type: "override", path: "/kitchen/wingmans.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wingmans/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/wingstop.html": { type: "override", path: "/kitchen/wingstop.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wingstop/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/wingstop": { type: "override", path: "/kitchen/wingstop.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wingstop/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/wingstop.rsc": { type: "override", path: "/kitchen/wingstop.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wingstop/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/wok-republic.html": { type: "override", path: "/kitchen/wok-republic.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wok-republic/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/wok-republic": { type: "override", path: "/kitchen/wok-republic.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wok-republic/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/wok-republic.rsc": { type: "override", path: "/kitchen/wok-republic.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/wok-republic/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchen/youme-sushi.html": { type: "override", path: "/kitchen/youme-sushi.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/youme-sushi/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/youme-sushi": { type: "override", path: "/kitchen/youme-sushi.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/youme-sushi/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchen/youme-sushi.rsc": { type: "override", path: "/kitchen/youme-sushi.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchen/layout,_N_T_/kitchen/[id]/layout,_N_T_/kitchen/[id]/page,_N_T_/kitchen/youme-sushi/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/all.html": { type: "override", path: "/kitchens/all.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/all/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/all": { type: "override", path: "/kitchens/all.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/all/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/all.rsc": { type: "override", path: "/kitchens/all.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/all/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/bubble-tea.html": { type: "override", path: "/kitchens/bubble-tea.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/bubble-tea/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/bubble-tea": { type: "override", path: "/kitchens/bubble-tea.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/bubble-tea/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/bubble-tea.rsc": { type: "override", path: "/kitchens/bubble-tea.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/bubble-tea/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/burgers.html": { type: "override", path: "/kitchens/burgers.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/burgers/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/burgers": { type: "override", path: "/kitchens/burgers.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/burgers/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/burgers.rsc": { type: "override", path: "/kitchens/burgers.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/burgers/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/burritos.html": { type: "override", path: "/kitchens/burritos.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/burritos/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/burritos": { type: "override", path: "/kitchens/burritos.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/burritos/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/burritos.rsc": { type: "override", path: "/kitchens/burritos.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/burritos/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/coffee.html": { type: "override", path: "/kitchens/coffee.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/coffee/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/coffee": { type: "override", path: "/kitchens/coffee.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/coffee/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/coffee.rsc": { type: "override", path: "/kitchens/coffee.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/coffee/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/desserts.html": { type: "override", path: "/kitchens/desserts.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/desserts/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/desserts": { type: "override", path: "/kitchens/desserts.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/desserts/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/desserts.rsc": { type: "override", path: "/kitchens/desserts.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/desserts/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/doughnuts.html": { type: "override", path: "/kitchens/doughnuts.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/doughnuts/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/doughnuts": { type: "override", path: "/kitchens/doughnuts.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/doughnuts/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/doughnuts.rsc": { type: "override", path: "/kitchens/doughnuts.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/doughnuts/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/fish-chips.html": { type: "override", path: "/kitchens/fish-chips.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/fish-chips/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/fish-chips": { type: "override", path: "/kitchens/fish-chips.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/fish-chips/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/fish-chips.rsc": { type: "override", path: "/kitchens/fish-chips.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/fish-chips/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/fried-chicken.html": { type: "override", path: "/kitchens/fried-chicken.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/fried-chicken/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/fried-chicken": { type: "override", path: "/kitchens/fried-chicken.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/fried-chicken/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/fried-chicken.rsc": { type: "override", path: "/kitchens/fried-chicken.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/fried-chicken/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/healthy.html": { type: "override", path: "/kitchens/healthy.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/healthy/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/healthy": { type: "override", path: "/kitchens/healthy.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/healthy/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/healthy.rsc": { type: "override", path: "/kitchens/healthy.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/healthy/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/ice-cream.html": { type: "override", path: "/kitchens/ice-cream.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/ice-cream/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/ice-cream": { type: "override", path: "/kitchens/ice-cream.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/ice-cream/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/ice-cream.rsc": { type: "override", path: "/kitchens/ice-cream.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/ice-cream/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/kebab.html": { type: "override", path: "/kitchens/kebab.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/kebab/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/kebab": { type: "override", path: "/kitchens/kebab.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/kebab/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/kebab.rsc": { type: "override", path: "/kitchens/kebab.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/kebab/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/meal-prep.html": { type: "override", path: "/kitchens/meal-prep.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/meal-prep/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/meal-prep": { type: "override", path: "/kitchens/meal-prep.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/meal-prep/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/meal-prep.rsc": { type: "override", path: "/kitchens/meal-prep.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/meal-prep/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/mexican.html": { type: "override", path: "/kitchens/mexican.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/mexican/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/mexican": { type: "override", path: "/kitchens/mexican.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/mexican/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/mexican.rsc": { type: "override", path: "/kitchens/mexican.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/mexican/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/pasta.html": { type: "override", path: "/kitchens/pasta.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/pasta/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/pasta": { type: "override", path: "/kitchens/pasta.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/pasta/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/pasta.rsc": { type: "override", path: "/kitchens/pasta.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/pasta/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/ramen.html": { type: "override", path: "/kitchens/ramen.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/ramen/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/ramen": { type: "override", path: "/kitchens/ramen.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/ramen/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/ramen.rsc": { type: "override", path: "/kitchens/ramen.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/ramen/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/sandwiches.html": { type: "override", path: "/kitchens/sandwiches.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/sandwiches/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/sandwiches": { type: "override", path: "/kitchens/sandwiches.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/sandwiches/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/sandwiches.rsc": { type: "override", path: "/kitchens/sandwiches.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/sandwiches/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/thai.html": { type: "override", path: "/kitchens/thai.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/thai/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/thai": { type: "override", path: "/kitchens/thai.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/thai/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/thai.rsc": { type: "override", path: "/kitchens/thai.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/thai/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/kitchens/vegan.html": { type: "override", path: "/kitchens/vegan.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/vegan/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/vegan": { type: "override", path: "/kitchens/vegan.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/vegan/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/kitchens/vegan.rsc": { type: "override", path: "/kitchens/vegan.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/kitchens/layout,_N_T_/kitchens/[category]/layout,_N_T_/kitchens/[category]/page,_N_T_/kitchens/vegan/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/live.html": { type: "override", path: "/live.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/live/layout,_N_T_/live/page,_N_T_/live/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/live": { type: "override", path: "/live.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/live/layout,_N_T_/live/page,_N_T_/live/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/live.rsc": { type: "override", path: "/live.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/live/layout,_N_T_/live/page,_N_T_/live/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/order/STP-1048.html": { type: "override", path: "/order/STP-1048.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/order/layout,_N_T_/order/[id]/layout,_N_T_/order/[id]/page,_N_T_/order/STP-1048/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/order/STP-1048": { type: "override", path: "/order/STP-1048.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/order/layout,_N_T_/order/[id]/layout,_N_T_/order/[id]/page,_N_T_/order/STP-1048/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/order/STP-1048.rsc": { type: "override", path: "/order/STP-1048.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/order/layout,_N_T_/order/[id]/layout,_N_T_/order/[id]/page,_N_T_/order/STP-1048/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/privacy.html": { type: "override", path: "/privacy.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/privacy/layout,_N_T_/privacy/page,_N_T_/privacy/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/privacy": { type: "override", path: "/privacy.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/privacy/layout,_N_T_/privacy/page,_N_T_/privacy/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/privacy.rsc": { type: "override", path: "/privacy.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/privacy/layout,_N_T_/privacy/page,_N_T_/privacy/", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } } };
});
var q = V((Ke, $) => {
  "use strict";
  _();
  h();
  p();
  function T(e, t) {
    e = String(e || "").trim();
    let n = e, r, a = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      r = e[0];
      let i = e.lastIndexOf(r);
      a += e.substring(i + 1), e = e.substring(1, i);
    }
    let s = 0;
    return e = pe(e, (i) => {
      if (/^\(\?[P<']/.test(i)) {
        let o = /^\(\?P?[<']([^>']+)[>']/.exec(i);
        if (!o) throw new Error(`Failed to extract named captures from ${JSON.stringify(i)}`);
        let x = i.substring(o[0].length, i.length - 1);
        return t && (t[s] = o[1]), s++, `(${x})`;
      }
      return i.substring(0, 3) === "(?:" || s++, i;
    }), e = e.replace(/\[:([^:]+):\]/g, (i, o) => T.characterClasses[o] || i), new T.PCRE(e, a, n, a, r);
  }
  __name(T, "T");
  function pe(e, t) {
    let n = 0, r = 0, a = false;
    for (let c = 0; c < e.length; c++) {
      let s = e[c];
      if (a) {
        a = false;
        continue;
      }
      switch (s) {
        case "(":
          r === 0 && (n = c), r++;
          break;
        case ")":
          if (r > 0 && (r--, r === 0)) {
            let i = c + 1, o = n === 0 ? "" : e.substring(0, n), x = e.substring(i), u = String(t(e.substring(n, i)));
            e = o + u + x, c = n;
          }
          break;
        case "\\":
          a = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(pe, "pe");
  (function(e) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      constructor(r, a, c, s, i) {
        super(r, a), this.pcrePattern = c, this.pcreFlags = s, this.delimiter = i;
      }
    }
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(T || (T = {}));
  T.prototype = T.PCRE.prototype;
  $.exports = T;
});
var Q = V((H) => {
  "use strict";
  _();
  h();
  p();
  H.parse = ve;
  H.serialize = be;
  var fe = Object.prototype.toString, S = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function ve(e, t) {
    if (typeof e != "string") throw new TypeError("argument str must be a string");
    for (var n = {}, r = t || {}, a = r.decode || je, c = 0; c < e.length; ) {
      var s = e.indexOf("=", c);
      if (s === -1) break;
      var i = e.indexOf(";", c);
      if (i === -1) i = e.length;
      else if (i < s) {
        c = e.lastIndexOf(";", s - 1) + 1;
        continue;
      }
      var o = e.slice(c, s).trim();
      if (n[o] === void 0) {
        var x = e.slice(s + 1, i).trim();
        x.charCodeAt(0) === 34 && (x = x.slice(1, -1)), n[o] = Pe(x, a);
      }
      c = i + 1;
    }
    return n;
  }
  __name(ve, "ve");
  function be(e, t, n) {
    var r = n || {}, a = r.encode || we;
    if (typeof a != "function") throw new TypeError("option encode is invalid");
    if (!S.test(e)) throw new TypeError("argument name is invalid");
    var c = a(t);
    if (c && !S.test(c)) throw new TypeError("argument val is invalid");
    var s = e + "=" + c;
    if (r.maxAge != null) {
      var i = r.maxAge - 0;
      if (isNaN(i) || !isFinite(i)) throw new TypeError("option maxAge is invalid");
      s += "; Max-Age=" + Math.floor(i);
    }
    if (r.domain) {
      if (!S.test(r.domain)) throw new TypeError("option domain is invalid");
      s += "; Domain=" + r.domain;
    }
    if (r.path) {
      if (!S.test(r.path)) throw new TypeError("option path is invalid");
      s += "; Path=" + r.path;
    }
    if (r.expires) {
      var o = r.expires;
      if (!Re(o) || isNaN(o.valueOf())) throw new TypeError("option expires is invalid");
      s += "; Expires=" + o.toUTCString();
    }
    if (r.httpOnly && (s += "; HttpOnly"), r.secure && (s += "; Secure"), r.priority) {
      var x = typeof r.priority == "string" ? r.priority.toLowerCase() : r.priority;
      switch (x) {
        case "low":
          s += "; Priority=Low";
          break;
        case "medium":
          s += "; Priority=Medium";
          break;
        case "high":
          s += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (r.sameSite) {
      var u = typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite;
      switch (u) {
        case true:
          s += "; SameSite=Strict";
          break;
        case "lax":
          s += "; SameSite=Lax";
          break;
        case "strict":
          s += "; SameSite=Strict";
          break;
        case "none":
          s += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return s;
  }
  __name(be, "be");
  function je(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(je, "je");
  function we(e) {
    return encodeURIComponent(e);
  }
  __name(we, "we");
  function Re(e) {
    return fe.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(Re, "Re");
  function Pe(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(Pe, "Pe");
});
_();
h();
p();
_();
h();
p();
_();
h();
p();
var f = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
_();
h();
p();
_();
h();
p();
_();
h();
p();
_();
h();
p();
var D = F(q());
function w(e, t, n) {
  if (t == null) return { match: null, captureGroupKeys: [] };
  let r = n ? "" : "i", a = [];
  return { match: (0, D.default)(`%${e}%${r}`, a).exec(t), captureGroupKeys: a };
}
__name(w, "w");
function v(e, t, n, { namedOnly: r } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (a, c) => {
    let s = n.indexOf(c);
    return r && s === -1 ? a : (s === -1 ? t[parseInt(c, 10)] : t[s + 1]) || "";
  });
}
__name(v, "v");
function I(e, { url: t, cookies: n, headers: r, routeDest: a }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? M(e.value, r.get(e.key), a) : { valid: r.has(e.key) };
    case "cookie": {
      let c = n[e.key];
      return c && e.value !== void 0 ? M(e.value, c, a) : { valid: c !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? M(e.value, t.searchParams.get(e.key), a) : { valid: t.searchParams.has(e.key) };
  }
}
__name(I, "I");
function M(e, t, n) {
  let { match: r, captureGroupKeys: a } = w(e, t);
  return n && r && a.length ? { valid: !!r, newRouteDest: v(n, r, a, { namedOnly: true }) } : { valid: !!r };
}
__name(M, "M");
_();
h();
p();
function z(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", f), new Request(e, { headers: t });
}
__name(z, "z");
_();
h();
p();
function g(e, t, n) {
  let r = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [a, c] of r) {
    let s = a.toLowerCase(), i = n?.match ? v(c, n.match, n.captureGroupKeys) : c;
    s === "set-cookie" ? e.append(s, i) : e.set(s, i);
  }
}
__name(g, "g");
function b(e) {
  return /^https?:\/\//.test(e);
}
__name(b, "b");
function m(e, t) {
  for (let [n, r] of t.entries()) {
    let a = /^nxtP(.+)$/.exec(n), c = /^nxtI(.+)$/.exec(n);
    a?.[1] ? (e.set(n, r), e.set(a[1], r)) : c?.[1] ? e.set(c[1], r.replace(/(\(\.+\))+/, "")) : (!e.has(n) || !!r && !e.getAll(n).includes(r)) && e.append(n, r);
  }
}
__name(m, "m");
function A(e, t) {
  let n = new URL(t, e.url);
  return m(n.searchParams, new URL(e.url).searchParams), n.pathname = n.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(n, e);
}
__name(A, "A");
function j(e) {
  return new Response(e.body, e);
}
__name(j, "j");
function L(e) {
  return e.split(",").map((t) => {
    let [n, r] = t.split(";"), a = parseFloat((r ?? "q=1").replace(/q *= */gi, ""));
    return [n.trim(), isNaN(a) ? 1 : a];
  }).sort((t, n) => n[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(L, "L");
_();
h();
p();
function O(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(O, "O");
async function R(e, { request: t, assetsFetcher: n, ctx: r }, { path: a, searchParams: c }) {
  let s, i = new URL(t.url);
  m(i.searchParams, c);
  let o = new Request(i, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let x = await import(e.entrypoint);
        try {
          s = await x.default(o, r);
        } catch (u) {
          let k = u;
          throw k.name === "TypeError" && k.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : u;
        }
        break;
      }
      case "override": {
        s = j(await n.fetch(A(o, e.path ?? a))), e.headers && g(s.headers, e.headers);
        break;
      }
      case "static": {
        s = await n.fetch(A(o, a));
        break;
      }
      default:
        s = new Response("Not Found", { status: 404 });
    }
  } catch (x) {
    return console.error(x), new Response("Internal Server Error", { status: 500 });
  }
  return j(s);
}
__name(R, "R");
function B(e, t) {
  let n = "^//?(?:", r = ")/(.*)$";
  return !e.startsWith(n) || !e.endsWith(r) ? false : e.slice(n.length, -r.length).split("|").every((c) => t.has(c));
}
__name(B, "B");
_();
h();
p();
function xe(e, { protocol: t, hostname: n, port: r, pathname: a }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(n).test(e.hostname) || r && !new RegExp(r).test(e.port) || a && !new RegExp(a).test(e.pathname));
}
__name(xe, "xe");
function ue(e, t) {
  if (e.method !== "GET") return;
  let { origin: n, searchParams: r } = new URL(e.url), a = r.get("url"), c = Number.parseInt(r.get("w") ?? "", 10), s = Number.parseInt(r.get("q") ?? "75", 10);
  if (!a || Number.isNaN(c) || Number.isNaN(s) || !t?.sizes?.includes(c) || s < 0 || s > 100) return;
  let i = new URL(a, n);
  if (i.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG) return;
  let o = a.startsWith("//"), x = a.startsWith("/") && !o;
  if (!x && !t?.domains?.includes(i.hostname) && !t?.remotePatterns?.find((N) => xe(i, N))) return;
  let u = e.headers.get("Accept") ?? "", k = t?.formats?.find((N) => u.includes(N))?.replace("image/", "");
  return { isRelative: x, imageUrl: i, options: { width: c, quality: s, format: k } };
}
__name(ue, "ue");
function le(e, t, n) {
  let r = new Headers();
  if (n?.contentSecurityPolicy && r.set("Content-Security-Policy", n.contentSecurityPolicy), n?.contentDispositionType) {
    let c = t.pathname.split("/").pop(), s = c ? `${n.contentDispositionType}; filename="${c}"` : n.contentDispositionType;
    r.set("Content-Disposition", s);
  }
  e.headers.has("Cache-Control") || r.set("Cache-Control", `public, max-age=${n?.minimumCacheTTL ?? 60}`);
  let a = j(e);
  return g(a.headers, r), a;
}
__name(le, "le");
async function G(e, { buildOutput: t, assetsFetcher: n, imagesConfig: r }) {
  let a = ue(e, r);
  if (!a) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: c, imageUrl: s } = a, o = await (c && s.pathname in t ? n.fetch.bind(n) : fetch)(s);
  return le(o, s, r);
}
__name(G, "G");
_();
h();
p();
_();
h();
p();
_();
h();
p();
async function P(e) {
  return import(e);
}
__name(P, "P");
var ye = "x-vercel-cache-tags";
var de = "x-next-cache-soft-tags";
var ke = /* @__PURE__ */ Symbol.for("__cloudflare-request-context__");
async function J(e) {
  let t = `https://${f}/v1/suspense-cache/`;
  if (!e.url.startsWith(t)) return null;
  try {
    let n = new URL(e.url), r = await ge();
    if (n.pathname === "/v1/suspense-cache/revalidate") {
      let c = n.searchParams.get("tags")?.split(",") ?? [];
      for (let s of c) await r.revalidateTag(s);
      return new Response(null, { status: 200 });
    }
    let a = n.pathname.replace("/v1/suspense-cache/", "");
    if (!a.length) return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let c = K(e, de), s = await r.get(a, { softTags: c });
        return s ? new Response(JSON.stringify(s.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (s.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let c = globalThis[ke], s = /* @__PURE__ */ __name(async () => {
          let i = await e.json();
          i.data.tags === void 0 && (i.tags ??= K(e, ye) ?? []), await r.set(a, i);
        }, "s");
        return c ? c.ctx.waitUntil(s()) : await s(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (n) {
    return console.error(n), new Response("Error handling cache request", { status: 500 });
  }
}
__name(J, "J");
async function ge() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? W("kv") : W("cache-api");
}
__name(ge, "ge");
async function W(e) {
  let t = `./__next-on-pages-dist__/cache/${e}.js`, n = await P(t);
  return new n.default();
}
__name(W, "W");
function K(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(K, "K");
function Z() {
  globalThis[X] || (me(), globalThis[X] = true);
}
__name(Z, "Z");
function me() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let n = new Request(...t), r = await Te(n);
    return r || (r = await J(n), r) ? r : (Ne(n), e(n));
  };
}
__name(me, "me");
async function Te(e) {
  if (e.url.startsWith("blob:")) try {
    let n = `./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`, r = (await P(n)).default, a = { async arrayBuffer() {
      return r;
    }, get body() {
      return new ReadableStream({ start(c) {
        let s = Buffer.from(r);
        c.enqueue(s), c.close();
      } });
    }, async text() {
      return Buffer.from(r).toString();
    }, async json() {
      let c = Buffer.from(r);
      return JSON.stringify(c.toString());
    }, async blob() {
      return new Blob(r);
    } };
    return a.clone = () => ({ ...a }), a;
  } catch {
  }
  return null;
}
__name(Te, "Te");
function Ne(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(Ne, "Ne");
var X = /* @__PURE__ */ Symbol.for("next-on-pages fetch patch");
_();
h();
p();
var Y = F(Q());
var C = class {
  static {
    __name(this, "C");
  }
  constructor(t, n, r, a, c) {
    this.routes = t;
    this.output = n;
    this.reqCtx = r;
    this.url = new URL(r.request.url), this.cookies = (0, Y.parse)(r.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), m(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = c?.find((s) => s.domain === this.url.hostname), this.locales = new Set(a.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: n, checkIntercept: r }) {
    let a = w(t.src, this.path, t.caseSensitive);
    if (!a.match || t.methods && !t.methods.map((s) => s.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) return;
    let c = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((s) => {
      let i = I(s, c);
      return i.newRouteDest && (c.routeDest = i.newRouteDest), !i.valid;
    }) && !t.missing?.find((s) => I(s, c).valid) && !(n && t.status !== this.status)) {
      if (r && t.dest) {
        let s = /\/(\(\.+\))+/, i = s.test(t.dest), o = s.test(this.path);
        if (i && !o) return;
      }
      return { routeMatch: a, routeDest: c.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let n = "x-middleware-override-headers", r = t.headers.get(n);
    if (r) {
      let o = new Set(r.split(",").map((x) => x.trim()));
      for (let x of o.keys()) {
        let u = `x-middleware-request-${x}`, k = t.headers.get(u);
        this.reqCtx.request.headers.get(x) !== k && (k ? this.reqCtx.request.headers.set(x, k) : this.reqCtx.request.headers.delete(x)), t.headers.delete(u);
      }
      t.headers.delete(n);
    }
    let a = "x-middleware-rewrite", c = t.headers.get(a);
    if (c) {
      let o = new URL(c, this.url), x = this.url.hostname !== o.hostname;
      this.path = x ? `${o}` : o.pathname, m(this.searchParams, o.searchParams), t.headers.delete(a);
    }
    let s = "x-middleware-next";
    t.headers.get(s) ? t.headers.delete(s) : !c && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), g(this.reqCtx.request.headers, t.headers), g(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t) return true;
    let n = t && this.output[t];
    if (!n || n.type !== "middleware") return this.status = 500, false;
    let r = await R(n, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), r.status === 500 ? (this.status = r.status, false) : (this.processMiddlewareResp(r), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, n, r) {
    !t.headers || (g(this.headers.normal, t.headers, { match: n, captureGroupKeys: r }), t.important && g(this.headers.important, t.headers, { match: n, captureGroupKeys: r }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, n, r) {
    if (!t.dest) return this.path;
    let a = this.path, c = t.dest;
    this.wildcardMatch && /\$wildcard/.test(c) && (c = c.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = v(c, n, r);
    let s = /\/index\.rsc$/i.test(this.path), i = /^\/(?:index)?$/i.test(a), o = /^\/__index\.prefetch\.rsc$/i.test(a);
    s && !i && !o && (this.path = a);
    let x = /\.rsc$/i.test(this.path), u = /\.prefetch\.rsc$/i.test(this.path), k = this.path in this.output;
    x && !u && !k && (this.path = this.path.replace(/\.rsc/i, ""));
    let N = new URL(this.path, this.url);
    return m(this.searchParams, N.searchParams), b(this.path) || (this.path = N.pathname), a;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location")) return;
    let { locale: { redirect: r, cookie: a } } = t, c = a && this.cookies[a], s = L(c ?? ""), i = L(this.reqCtx.request.headers.get("accept-language") ?? ""), u = [...s, ...i].map((k) => r[k]).filter(Boolean)[0];
    if (u) {
      !this.path.startsWith(u) && (this.headers.normal.set("location", u), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, n) {
    return !this.locales || n !== "miss" ? t : B(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, n) {
    let r = this.getLocaleFriendlyRoute(n, t), { routeMatch: a, routeDest: c } = this.checkRouteMatch(r, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, s = { ...r, dest: c };
    if (!a?.match || s.middlewarePath && this.middlewareInvoked.includes(s.middlewarePath)) return "skip";
    let { match: i, captureGroupKeys: o } = a;
    if (this.applyRouteOverrides(s), this.applyLocaleRedirects(s), !await this.runRouteMiddleware(s.middlewarePath)) return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) return "done";
    this.applyRouteHeaders(s, i, o), this.applyRouteStatus(s);
    let u = this.applyRouteDest(s, i, o);
    if (s.check && !b(this.path)) if (u === this.path) {
      if (t !== "miss") return this.checkPhase(O(t));
      this.status = 404;
    } else if (t === "miss") {
      if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) return this.checkPhase("filesystem");
      this.status === 404 && (this.status = void 0);
    } else return this.checkPhase("none");
    return !s.continue || s.status && s.status >= 300 && s.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50) return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let n = true;
    for (let c of this.routes[t]) {
      let s = await this.checkRoute(t, c);
      if (s === "error") return "error";
      if (s === "done") {
        n = false;
        break;
      }
    }
    if (t === "hit" || b(this.path) || this.headers.normal.has("location") || !!this.body) return "done";
    if (t === "none") for (let c of this.locales) {
      let s = new RegExp(`/${c}(/.*)`), o = this.path.match(s)?.[1];
      if (o && o in this.output) {
        this.path = o;
        break;
      }
    }
    let r = this.path in this.output;
    if (!r && this.path.endsWith("/")) {
      let c = this.path.replace(/\/$/, "");
      r = c in this.output, r && (this.path = c);
    }
    if (t === "miss" && !r) {
      let c = !this.status || this.status < 400;
      this.status = c ? 404 : this.status;
    }
    let a = "miss";
    return r || t === "miss" || t === "error" ? a = "hit" : n && (a = O(t)), this.checkPhase(a);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let n = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), n;
  }
};
async function ee(e, t, n, r) {
  let a = new C(t.routes, n, e, r, t.wildcard), c = await te(a);
  return Se(e, c, n);
}
__name(ee, "ee");
async function te(e, t = "none", n = false) {
  return await e.run(t) === "error" || !n && e.status && e.status >= 400 ? te(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(te, "te");
async function Se(e, { path: t = "/404", status: n, headers: r, searchParams: a, body: c }, s) {
  let i = r.normal.get("location");
  if (i) {
    if (i !== r.middlewareLocation) {
      let u = [...a.keys()].length ? `?${a.toString()}` : "";
      r.normal.set("location", `${i ?? "/"}${u}`);
    }
    return new Response(null, { status: n, headers: r.normal });
  }
  let o;
  if (c !== void 0) o = new Response(c, { status: n });
  else if (b(t)) {
    let u = new URL(t);
    m(u.searchParams, a), o = await fetch(u, e.request);
  } else o = await R(s[t], e, { path: t, status: n, headers: r, searchParams: a });
  let x = r.normal;
  return g(x, o.headers), g(x, r.important), o = new Response(o.body, { ...o, status: n || o.status, headers: x }), o;
}
__name(Se, "Se");
_();
h();
p();
function re() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ce };
}
__name(re, "re");
function Ce(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t) return t;
  let n = Ee();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, n), n;
}
__name(Ce, "Ce");
function Ee() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name((t, n) => e.has(n) ? e.get(n) : Reflect.get(globalThis, n), "get"), set: /* @__PURE__ */ __name((t, n, r) => Me.has(n) ? Reflect.set(globalThis, n, r) : (e.set(n, r), true), "set") });
}
__name(Ee, "Ee");
var Me = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var Ie = Object.defineProperty;
var Ae = /* @__PURE__ */ __name((...e) => {
  let t = e[0], n = e[1], r = "__import_unsupported";
  if (!(n === r && typeof t == "object" && t !== null && r in t)) return Ie(...e);
}, "Ae");
globalThis.Object.defineProperty = Ae;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name(() => {
      }, "throwIfAborted") }, abort() {
      } };
      throw t;
    }
  }
};
var jr = { async fetch(e, t, n) {
  re(), Z();
  let r = await __ALSes_PROMISE__;
  if (!r) {
    let s = new URL(e.url), i = await t.ASSETS.fetch(`${s.protocol}//${s.host}/cdn-cgi/errors/no-nodejs_compat.html`), o = i.ok ? i.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(o, { status: 503 });
  }
  let { envAsyncLocalStorage: a, requestContextAsyncLocalStorage: c } = r;
  return a.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: f }, async () => c.run({ env: t, ctx: n, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image")) return G(e, { buildOutput: y, assetsFetcher: t.ASSETS, imagesConfig: l.images });
    let i = z(e);
    return ee({ request: i, ctx: n, assetsFetcher: t.ASSETS }, l, y, d);
  }));
} };
export {
  jr as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=bundledWorker-0.9996530346681637.mjs.map
