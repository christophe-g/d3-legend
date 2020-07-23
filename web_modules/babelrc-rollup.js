import { c as createCommonjsModule, g as getCjsExportFromNamespace, u as unwrapExports } from './common/_commonjsHelpers-11875166.js';
import fs$1 from 'fs';
import path$1 from 'path';

var caller = function () {
    // see https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
    var origPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) { return stack; };
    var stack = (new Error()).stack;
    Error.prepareStackTrace = origPrepareStackTrace;
    return stack[2].getFileName();
};

var pathParse = createCommonjsModule(function (module) {

// Regex to split a windows path into three parts: [*, device, slash,
// tail] windows-only
var splitDeviceRe =
    /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

// Regex to split the tail part of the above into [*, dir, basename, ext]
var splitTailRe =
    /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

var win32 = {};

// Function to split a filename into [root, dir, basename, ext]
function win32SplitPath(filename) {
  // Separate device+slash from tail
  var result = splitDeviceRe.exec(filename),
      device = (result[1] || '') + (result[2] || ''),
      tail = result[3] || '';
  // Split the tail into dir, basename and extension
  var result2 = splitTailRe.exec(tail),
      dir = result2[1],
      basename = result2[2],
      ext = result2[3];
  return [device, dir, basename, ext];
}

win32.parse = function(pathString) {
  if (typeof pathString !== 'string') {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = win32SplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};



// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var posix = {};


function posixSplitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
}


posix.parse = function(pathString) {
  if (typeof pathString !== 'string') {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = posixSplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  allParts[1] = allParts[1] || '';
  allParts[2] = allParts[2] || '';
  allParts[3] = allParts[3] || '';

  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};


module.exports = posix.parse;

module.exports.posix = posix.parse;
module.exports.win32 = win32.parse;
});

var parse = path$1.parse || pathParse;

var getNodeModulesDirs = function getNodeModulesDirs(absoluteStart, modules) {
    var prefix = '/';
    if ((/^([A-Za-z]:)/).test(absoluteStart)) {
        prefix = '';
    } else if ((/^\\\\/).test(absoluteStart)) {
        prefix = '\\\\';
    }

    var paths = [absoluteStart];
    var parsed = parse(absoluteStart);
    while (parsed.dir !== paths[paths.length - 1]) {
        paths.push(parsed.dir);
        parsed = parse(parsed.dir);
    }

    return paths.reduce(function (dirs, aPath) {
        return dirs.concat(modules.map(function (moduleDir) {
            return path$1.resolve(prefix, aPath, moduleDir);
        }));
    }, []);
};

var nodeModulesPaths = function nodeModulesPaths(start, opts, request) {
    var modules = opts && opts.moduleDirectory
        ? [].concat(opts.moduleDirectory)
        : ['node_modules'];

    if (opts && typeof opts.paths === 'function') {
        return opts.paths(
            request,
            start,
            function () { return getNodeModulesDirs(start, modules); },
            opts
        );
    }

    var dirs = getNodeModulesDirs(start, modules);
    return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
};

var normalizeOptions = function (x, opts) {
    /**
     * This file is purposefully a passthrough. It's expected that third-party
     * environments will override it at runtime in order to inject special logic
     * into `resolve` (by manipulating the options). One such example is the PnP
     * code path in Yarn.
     */

    return opts || {};
};

const assert = true;
const async_hooks = ">= 8";
const buffer_ieee754 = "< 0.9.7";
const buffer = true;
const child_process = true;
const cluster = true;
const console = true;
const constants = true;
const crypto = true;
const _debug_agent = ">= 1 && < 8";
const _debugger = "< 8";
const dgram = true;
const dns = true;
const domain = true;
const events = true;
const freelist = "< 6";
const fs = true;
const _http_agent = ">= 0.11.1";
const _http_client = ">= 0.11.1";
const _http_common = ">= 0.11.1";
const _http_incoming = ">= 0.11.1";
const _http_outgoing = ">= 0.11.1";
const _http_server = ">= 0.11.1";
const http = true;
const http2 = ">= 8.8";
const https = true;
const inspector = ">= 8.0.0";
const _linklist = "< 8";
const module = true;
const net = true;
const os = true;
const path = true;
const perf_hooks = ">= 8.5";
const process$1 = ">= 1";
const punycode = true;
const querystring = true;
const readline = true;
const repl = true;
const smalloc = ">= 0.11.5 && < 3";
const _stream_duplex = ">= 0.9.4";
const _stream_transform = ">= 0.9.4";
const _stream_wrap = ">= 1.4.1";
const _stream_passthrough = ">= 0.9.4";
const _stream_readable = ">= 0.9.4";
const _stream_writable = ">= 0.9.4";
const stream = true;
const string_decoder = true;
const sys = true;
const timers = true;
const _tls_common = ">= 0.11.13";
const _tls_legacy = ">= 0.11.3 && < 10";
const _tls_wrap = ">= 0.11.3";
const tls = true;
const trace_events = ">= 10";
const tty = true;
const url = true;
const util = true;
const v8 = ">= 1";
const vm = true;
const wasi = ">= 13.4 && < 13.5";
const worker_threads = ">= 11.7";
const zlib = true;
var core = {
  assert: assert,
  async_hooks: async_hooks,
  buffer_ieee754: buffer_ieee754,
  buffer: buffer,
  child_process: child_process,
  cluster: cluster,
  console: console,
  constants: constants,
  crypto: crypto,
  _debug_agent: _debug_agent,
  _debugger: _debugger,
  dgram: dgram,
  dns: dns,
  domain: domain,
  events: events,
  freelist: freelist,
  fs: fs,
  "fs/promises": [
  ">= 10 && < 10.1",
  ">= 14"
],
  _http_agent: _http_agent,
  _http_client: _http_client,
  _http_common: _http_common,
  _http_incoming: _http_incoming,
  _http_outgoing: _http_outgoing,
  _http_server: _http_server,
  http: http,
  http2: http2,
  https: https,
  inspector: inspector,
  _linklist: _linklist,
  module: module,
  net: net,
  "node-inspect/lib/_inspect": ">= 7.6.0 && < 12",
  "node-inspect/lib/internal/inspect_client": ">= 7.6.0 && < 12",
  "node-inspect/lib/internal/inspect_repl": ">= 7.6.0 && < 12",
  os: os,
  path: path,
  perf_hooks: perf_hooks,
  process: process$1,
  punycode: punycode,
  querystring: querystring,
  readline: readline,
  repl: repl,
  smalloc: smalloc,
  _stream_duplex: _stream_duplex,
  _stream_transform: _stream_transform,
  _stream_wrap: _stream_wrap,
  _stream_passthrough: _stream_passthrough,
  _stream_readable: _stream_readable,
  _stream_writable: _stream_writable,
  stream: stream,
  string_decoder: string_decoder,
  sys: sys,
  timers: timers,
  _tls_common: _tls_common,
  _tls_legacy: _tls_legacy,
  _tls_wrap: _tls_wrap,
  tls: tls,
  trace_events: trace_events,
  tty: tty,
  url: url,
  util: util,
  "v8/tools/arguments": ">= 10 && < 12",
  "v8/tools/codemap": [
  ">= 4.4.0 && < 5",
  ">= 5.2.0 && < 12"
],
  "v8/tools/consarray": [
  ">= 4.4.0 && < 5",
  ">= 5.2.0 && < 12"
],
  "v8/tools/csvparser": [
  ">= 4.4.0 && < 5",
  ">= 5.2.0 && < 12"
],
  "v8/tools/logreader": [
  ">= 4.4.0 && < 5",
  ">= 5.2.0 && < 12"
],
  "v8/tools/profile_view": [
  ">= 4.4.0 && < 5",
  ">= 5.2.0 && < 12"
],
  "v8/tools/splaytree": [
  ">= 4.4.0 && < 5",
  ">= 5.2.0 && < 12"
],
  v8: v8,
  vm: vm,
  wasi: wasi,
  worker_threads: worker_threads,
  zlib: zlib
};

var core$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    assert: assert,
    async_hooks: async_hooks,
    buffer_ieee754: buffer_ieee754,
    buffer: buffer,
    child_process: child_process,
    cluster: cluster,
    console: console,
    constants: constants,
    crypto: crypto,
    _debug_agent: _debug_agent,
    _debugger: _debugger,
    dgram: dgram,
    dns: dns,
    domain: domain,
    events: events,
    freelist: freelist,
    fs: fs,
    _http_agent: _http_agent,
    _http_client: _http_client,
    _http_common: _http_common,
    _http_incoming: _http_incoming,
    _http_outgoing: _http_outgoing,
    _http_server: _http_server,
    http: http,
    http2: http2,
    https: https,
    inspector: inspector,
    _linklist: _linklist,
    module: module,
    net: net,
    os: os,
    path: path,
    perf_hooks: perf_hooks,
    process: process$1,
    punycode: punycode,
    querystring: querystring,
    readline: readline,
    repl: repl,
    smalloc: smalloc,
    _stream_duplex: _stream_duplex,
    _stream_transform: _stream_transform,
    _stream_wrap: _stream_wrap,
    _stream_passthrough: _stream_passthrough,
    _stream_readable: _stream_readable,
    _stream_writable: _stream_writable,
    stream: stream,
    string_decoder: string_decoder,
    sys: sys,
    timers: timers,
    _tls_common: _tls_common,
    _tls_legacy: _tls_legacy,
    _tls_wrap: _tls_wrap,
    tls: tls,
    trace_events: trace_events,
    tty: tty,
    url: url,
    util: util,
    v8: v8,
    vm: vm,
    wasi: wasi,
    worker_threads: worker_threads,
    zlib: zlib,
    'default': core
});

var data = getCjsExportFromNamespace(core$1);

var current = (process.versions && undefined && undefined.split('.')) || [];

function specifierIncluded(specifier) {
    var parts = specifier.split(' ');
    var op = parts.length > 1 ? parts[0] : '=';
    var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split('.');

    for (var i = 0; i < 3; ++i) {
        var cur = Number(current[i] || 0);
        var ver = Number(versionParts[i] || 0);
        if (cur === ver) {
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        }
        if (op === '<') {
            return cur < ver;
        } else if (op === '>=') {
            return cur >= ver;
        } else {
            return false;
        }
    }
    return op === '>=';
}

function matchesRange(range) {
    var specifiers = range.split(/ ?&& ?/);
    if (specifiers.length === 0) { return false; }
    for (var i = 0; i < specifiers.length; ++i) {
        if (!specifierIncluded(specifiers[i])) { return false; }
    }
    return true;
}

function versionIncluded(specifierValue) {
    if (typeof specifierValue === 'boolean') { return specifierValue; }
    if (specifierValue && typeof specifierValue === 'object') {
        for (var i = 0; i < specifierValue.length; ++i) {
            if (matchesRange(specifierValue[i])) { return true; }
        }
        return false;
    }
    return matchesRange(specifierValue);
}



var core$2 = {};
for (var mod in data) { // eslint-disable-line no-restricted-syntax
    if (Object.prototype.hasOwnProperty.call(data, mod)) {
        core$2[mod] = versionIncluded(data[mod]);
    }
}
var core_1 = core$2;

var isCore = function isCore(x) {
    return Object.prototype.hasOwnProperty.call(core_1, x);
};

var realpathFS = fs$1.realpath && typeof fs$1.realpath.native === 'function' ? fs$1.realpath.native : fs$1.realpath;

var defaultIsFile = function isFile(file, cb) {
    fs$1.stat(file, function (err, stat) {
        if (!err) {
            return cb(null, stat.isFile() || stat.isFIFO());
        }
        if (err.code === 'ENOENT' || err.code === 'ENOTDIR') return cb(null, false);
        return cb(err);
    });
};

var defaultIsDir = function isDirectory(dir, cb) {
    fs$1.stat(dir, function (err, stat) {
        if (!err) {
            return cb(null, stat.isDirectory());
        }
        if (err.code === 'ENOENT' || err.code === 'ENOTDIR') return cb(null, false);
        return cb(err);
    });
};

var defaultRealpath = function realpath(x, cb) {
    realpathFS(x, function (realpathErr, realPath) {
        if (realpathErr && realpathErr.code !== 'ENOENT') cb(realpathErr);
        else cb(null, realpathErr ? x : realPath);
    });
};

var maybeRealpath = function maybeRealpath(realpath, x, opts, cb) {
    if (opts && opts.preserveSymlinks === false) {
        realpath(x, cb);
    } else {
        cb(null, x);
    }
};

var getPackageCandidates = function getPackageCandidates(x, start, opts) {
    var dirs = nodeModulesPaths(start, opts, x);
    for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path$1.join(dirs[i], x);
    }
    return dirs;
};

var async = function resolve(x, options, callback) {
    var cb = callback;
    var opts = options;
    if (typeof options === 'function') {
        cb = opts;
        opts = {};
    }
    if (typeof x !== 'string') {
        var err = new TypeError('Path must be a string.');
        return process.nextTick(function () {
            cb(err);
        });
    }

    opts = normalizeOptions(x, opts);

    var isFile = opts.isFile || defaultIsFile;
    var isDirectory = opts.isDirectory || defaultIsDir;
    var readFile = opts.readFile || fs$1.readFile;
    var realpath = opts.realpath || defaultRealpath;
    var packageIterator = opts.packageIterator;

    var extensions = opts.extensions || ['.js'];
    var basedir = opts.basedir || path$1.dirname(caller());
    var parent = opts.filename || basedir;

    opts.paths = opts.paths || [];

    // ensure that `basedir` is an absolute path at this point, resolving against the process' current working directory
    var absoluteStart = path$1.resolve(basedir);

    maybeRealpath(
        realpath,
        absoluteStart,
        opts,
        function (err, realStart) {
            if (err) cb(err);
            else init(realStart);
        }
    );

    var res;
    function init(basedir) {
        if ((/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/).test(x)) {
            res = path$1.resolve(basedir, x);
            if (x === '.' || x === '..' || x.slice(-1) === '/') res += '/';
            if ((/\/$/).test(x) && res === basedir) {
                loadAsDirectory(res, opts.package, onfile);
            } else loadAsFile(res, opts.package, onfile);
        } else if (isCore(x)) {
            return cb(null, x);
        } else loadNodeModules(x, basedir, function (err, n, pkg) {
            if (err) cb(err);
            else if (n) {
                return maybeRealpath(realpath, n, opts, function (err, realN) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, realN, pkg);
                    }
                });
            } else {
                var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
                moduleError.code = 'MODULE_NOT_FOUND';
                cb(moduleError);
            }
        });
    }

    function onfile(err, m, pkg) {
        if (err) cb(err);
        else if (m) cb(null, m, pkg);
        else loadAsDirectory(res, function (err, d, pkg) {
            if (err) cb(err);
            else if (d) {
                maybeRealpath(realpath, d, opts, function (err, realD) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, realD, pkg);
                    }
                });
            } else {
                var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
                moduleError.code = 'MODULE_NOT_FOUND';
                cb(moduleError);
            }
        });
    }

    function loadAsFile(x, thePackage, callback) {
        var loadAsFilePackage = thePackage;
        var cb = callback;
        if (typeof loadAsFilePackage === 'function') {
            cb = loadAsFilePackage;
            loadAsFilePackage = undefined;
        }

        var exts = [''].concat(extensions);
        load(exts, x, loadAsFilePackage);

        function load(exts, x, loadPackage) {
            if (exts.length === 0) return cb(null, undefined, loadPackage);
            var file = x + exts[0];

            var pkg = loadPackage;
            if (pkg) onpkg(null, pkg);
            else loadpkg(path$1.dirname(file), onpkg);

            function onpkg(err, pkg_, dir) {
                pkg = pkg_;
                if (err) return cb(err);
                if (dir && pkg && opts.pathFilter) {
                    var rfile = path$1.relative(dir, file);
                    var rel = rfile.slice(0, rfile.length - exts[0].length);
                    var r = opts.pathFilter(pkg, x, rel);
                    if (r) return load(
                        [''].concat(extensions.slice()),
                        path$1.resolve(dir, r),
                        pkg
                    );
                }
                isFile(file, onex);
            }
            function onex(err, ex) {
                if (err) return cb(err);
                if (ex) return cb(null, file, pkg);
                load(exts.slice(1), x, pkg);
            }
        }
    }

    function loadpkg(dir, cb) {
        if (dir === '' || dir === '/') return cb(null);
        if ((/[/\\]node_modules[/\\]*$/).test(dir)) return cb(null);

        maybeRealpath(realpath, dir, opts, function (unwrapErr, pkgdir) {
            if (unwrapErr) return loadpkg(path$1.dirname(dir), cb);
            var pkgfile = path$1.join(pkgdir, 'package.json');
            isFile(pkgfile, function (err, ex) {
                // on err, ex is false
                if (!ex) return loadpkg(path$1.dirname(dir), cb);

                readFile(pkgfile, function (err, body) {
                    if (err) cb(err);
                    try { var pkg = JSON.parse(body); } catch (jsonErr) {}

                    if (pkg && opts.packageFilter) {
                        pkg = opts.packageFilter(pkg, pkgfile);
                    }
                    cb(null, pkg, dir);
                });
            });
        });
    }

    function loadAsDirectory(x, loadAsDirectoryPackage, callback) {
        var cb = callback;
        var fpkg = loadAsDirectoryPackage;
        if (typeof fpkg === 'function') {
            cb = fpkg;
            fpkg = opts.package;
        }

        maybeRealpath(realpath, x, opts, function (unwrapErr, pkgdir) {
            if (unwrapErr) return cb(unwrapErr);
            var pkgfile = path$1.join(pkgdir, 'package.json');
            isFile(pkgfile, function (err, ex) {
                if (err) return cb(err);
                if (!ex) return loadAsFile(path$1.join(x, 'index'), fpkg, cb);

                readFile(pkgfile, function (err, body) {
                    if (err) return cb(err);
                    try {
                        var pkg = JSON.parse(body);
                    } catch (jsonErr) {}

                    if (pkg && opts.packageFilter) {
                        pkg = opts.packageFilter(pkg, pkgfile);
                    }

                    if (pkg && pkg.main) {
                        if (typeof pkg.main !== 'string') {
                            var mainError = new TypeError('package “' + pkg.name + '” `main` must be a string');
                            mainError.code = 'INVALID_PACKAGE_MAIN';
                            return cb(mainError);
                        }
                        if (pkg.main === '.' || pkg.main === './') {
                            pkg.main = 'index';
                        }
                        loadAsFile(path$1.resolve(x, pkg.main), pkg, function (err, m, pkg) {
                            if (err) return cb(err);
                            if (m) return cb(null, m, pkg);
                            if (!pkg) return loadAsFile(path$1.join(x, 'index'), pkg, cb);

                            var dir = path$1.resolve(x, pkg.main);
                            loadAsDirectory(dir, pkg, function (err, n, pkg) {
                                if (err) return cb(err);
                                if (n) return cb(null, n, pkg);
                                loadAsFile(path$1.join(x, 'index'), pkg, cb);
                            });
                        });
                        return;
                    }

                    loadAsFile(path$1.join(x, '/index'), pkg, cb);
                });
            });
        });
    }

    function processDirs(cb, dirs) {
        if (dirs.length === 0) return cb(null, undefined);
        var dir = dirs[0];

        isDirectory(path$1.dirname(dir), isdir);

        function isdir(err, isdir) {
            if (err) return cb(err);
            if (!isdir) return processDirs(cb, dirs.slice(1));
            loadAsFile(dir, opts.package, onfile);
        }

        function onfile(err, m, pkg) {
            if (err) return cb(err);
            if (m) return cb(null, m, pkg);
            loadAsDirectory(dir, opts.package, ondir);
        }

        function ondir(err, n, pkg) {
            if (err) return cb(err);
            if (n) return cb(null, n, pkg);
            processDirs(cb, dirs.slice(1));
        }
    }
    function loadNodeModules(x, start, cb) {
        var thunk = function () { return getPackageCandidates(x, start, opts); };
        processDirs(
            cb,
            packageIterator ? packageIterator(x, start, thunk, opts) : thunk()
        );
    }
};

var realpathFS$1 = fs$1.realpathSync && typeof fs$1.realpathSync.native === 'function' ? fs$1.realpathSync.native : fs$1.realpathSync;

var defaultIsFile$1 = function isFile(file) {
    try {
        var stat = fs$1.statSync(file);
    } catch (e) {
        if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false;
        throw e;
    }
    return stat.isFile() || stat.isFIFO();
};

var defaultIsDir$1 = function isDirectory(dir) {
    try {
        var stat = fs$1.statSync(dir);
    } catch (e) {
        if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false;
        throw e;
    }
    return stat.isDirectory();
};

var defaultRealpathSync = function realpathSync(x) {
    try {
        return realpathFS$1(x);
    } catch (realpathErr) {
        if (realpathErr.code !== 'ENOENT') {
            throw realpathErr;
        }
    }
    return x;
};

var maybeRealpathSync = function maybeRealpathSync(realpathSync, x, opts) {
    if (opts && opts.preserveSymlinks === false) {
        return realpathSync(x);
    }
    return x;
};

var getPackageCandidates$1 = function getPackageCandidates(x, start, opts) {
    var dirs = nodeModulesPaths(start, opts, x);
    for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path$1.join(dirs[i], x);
    }
    return dirs;
};

var sync = function resolveSync(x, options) {
    if (typeof x !== 'string') {
        throw new TypeError('Path must be a string.');
    }
    var opts = normalizeOptions(x, options);

    var isFile = opts.isFile || defaultIsFile$1;
    var readFileSync = opts.readFileSync || fs$1.readFileSync;
    var isDirectory = opts.isDirectory || defaultIsDir$1;
    var realpathSync = opts.realpathSync || defaultRealpathSync;
    var packageIterator = opts.packageIterator;

    var extensions = opts.extensions || ['.js'];
    var basedir = opts.basedir || path$1.dirname(caller());
    var parent = opts.filename || basedir;

    opts.paths = opts.paths || [];

    // ensure that `basedir` is an absolute path at this point, resolving against the process' current working directory
    var absoluteStart = maybeRealpathSync(realpathSync, path$1.resolve(basedir), opts);

    if ((/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/).test(x)) {
        var res = path$1.resolve(absoluteStart, x);
        if (x === '.' || x === '..' || x.slice(-1) === '/') res += '/';
        var m = loadAsFileSync(res) || loadAsDirectorySync(res);
        if (m) return maybeRealpathSync(realpathSync, m, opts);
    } else if (isCore(x)) {
        return x;
    } else {
        var n = loadNodeModulesSync(x, absoluteStart);
        if (n) return maybeRealpathSync(realpathSync, n, opts);
    }

    var err = new Error("Cannot find module '" + x + "' from '" + parent + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;

    function loadAsFileSync(x) {
        var pkg = loadpkg(path$1.dirname(x));

        if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
            var rfile = path$1.relative(pkg.dir, x);
            var r = opts.pathFilter(pkg.pkg, x, rfile);
            if (r) {
                x = path$1.resolve(pkg.dir, r); // eslint-disable-line no-param-reassign
            }
        }

        if (isFile(x)) {
            return x;
        }

        for (var i = 0; i < extensions.length; i++) {
            var file = x + extensions[i];
            if (isFile(file)) {
                return file;
            }
        }
    }

    function loadpkg(dir) {
        if (dir === '' || dir === '/') return;
        if ((/[/\\]node_modules[/\\]*$/).test(dir)) return;

        var pkgfile = path$1.join(maybeRealpathSync(realpathSync, dir, opts), 'package.json');

        if (!isFile(pkgfile)) {
            return loadpkg(path$1.dirname(dir));
        }

        var body = readFileSync(pkgfile);

        try {
            var pkg = JSON.parse(body);
        } catch (jsonErr) {}

        if (pkg && opts.packageFilter) {
            // v2 will pass pkgfile
            pkg = opts.packageFilter(pkg, /*pkgfile,*/ dir); // eslint-disable-line spaced-comment
        }

        return { pkg: pkg, dir: dir };
    }

    function loadAsDirectorySync(x) {
        var pkgfile = path$1.join(maybeRealpathSync(realpathSync, x, opts), '/package.json');
        if (isFile(pkgfile)) {
            try {
                var body = readFileSync(pkgfile, 'UTF8');
                var pkg = JSON.parse(body);
            } catch (e) {}

            if (pkg && opts.packageFilter) {
                // v2 will pass pkgfile
                pkg = opts.packageFilter(pkg, /*pkgfile,*/ x); // eslint-disable-line spaced-comment
            }

            if (pkg && pkg.main) {
                if (typeof pkg.main !== 'string') {
                    var mainError = new TypeError('package “' + pkg.name + '” `main` must be a string');
                    mainError.code = 'INVALID_PACKAGE_MAIN';
                    throw mainError;
                }
                if (pkg.main === '.' || pkg.main === './') {
                    pkg.main = 'index';
                }
                try {
                    var m = loadAsFileSync(path$1.resolve(x, pkg.main));
                    if (m) return m;
                    var n = loadAsDirectorySync(path$1.resolve(x, pkg.main));
                    if (n) return n;
                } catch (e) {}
            }
        }

        return loadAsFileSync(path$1.join(x, '/index'));
    }

    function loadNodeModulesSync(x, start) {
        var thunk = function () { return getPackageCandidates$1(x, start, opts); };
        var dirs = packageIterator ? packageIterator(x, start, thunk, opts) : thunk();

        for (var i = 0; i < dirs.length; i++) {
            var dir = dirs[i];
            if (isDirectory(path$1.dirname(dir))) {
                var m = loadAsFileSync(dir);
                if (m) return m;
                var n = loadAsDirectorySync(dir);
                if (n) return n;
            }
        }
    }
};

async.core = core_1;
async.isCore = isCore;
async.sync = sync;

var resolve = async;

var babelrcRollup = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });




var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function startsWith(string, prefix) {
  return string.lastIndexOf(prefix, 0) === 0;
}

var DEFAULT_OPTIONS = {
  path: '.babelrc',
  findRollupPresets: false,
  addModuleOptions: true,
  addExternalHelpersPlugin: true,
  resolve: resolve.sync
};

function babelrc() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (typeof options === 'string') {
    options = { path: options };
  }

  var resolvedOptions = _extends({}, DEFAULT_OPTIONS, options);

  if (!resolvedOptions.config && typeof resolvedOptions.path === 'string') {
    resolvedOptions.config = JSON.parse(fs$1.readFileSync(resolvedOptions.path, { encoding: 'utf8' }));
  }

  return configWithoutModules(resolvedOptions.config, resolvedOptions);
}

function configWithoutModules(config, options) {
  var result = {};

  for (var _key in config) {
    if (Object.prototype.hasOwnProperty.call(config, _key)) {
      if (_key === 'presets' && config.presets) {
        // Replace the es2015 preset with the es2015-rollup preset.
        result.presets = config.presets.map(function (preset) {
          return mapPreset(preset, options);
        });
      } else if (_key === 'plugins' && config.plugins) {
        // Remove any explicit module plugins, e.g. es2015-modules-commonjs.
        result.plugins = config.plugins.filter(function (plugin) {
          return !startsWith(plugin, 'es2015-modules-');
        });
      } else {
        result[_key] = config[_key];
      }
    }
  }

  if (options.addExternalHelpersPlugin) {
    if (!result.plugins) {
      result.plugins = ['external-helpers'];
    } else {
      result.plugins = [].concat(toConsumableArray(result.plugins), ['external-helpers']);
    }
  }

  // Make sure babel does not look for the babelrc file.
  result.babelrc = false;

  return result;
}

function mapPreset(preset, options) {
  var info = getPresetInfo(preset);

  if (!info) {
    return preset;
  }

  if (options.findRollupPresets && hasRollupVersionOfPreset(info.name, options.resolve || resolve.sync)) {
    return [info.name + '-rollup', info.options];
  } else if (options.addModuleOptions) {
    return [info.name, _extends({}, info.options, { modules: false })];
  } else {
    return preset;
  }
}

function getPresetInfo(preset) {
  if (typeof preset === 'string') {
    return { name: preset, options: {} };
  } else if (Array.isArray(preset)) {
    var _name = preset[0];
    var _options = preset[1] || {};

    if (typeof _name === 'string' && (typeof _options === 'undefined' ? 'undefined' : _typeof(_options)) === 'object') {
      return { name: _name, options: _options };
    }
  }

  return null;
}

function hasRollupVersionOfPreset(preset, resolve) {
  try {
    // this will throw if it can't resolve it
    resolve('babel-preset-' + preset + '-rollup');
    return true;
  } catch (err) {
    return false;
  }
}

exports['default'] = babelrc;
exports.configWithoutModules = configWithoutModules;
});

var babelrcRollup$1 = /*@__PURE__*/unwrapExports(babelrcRollup);

export default babelrcRollup$1;
