// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"eZFTg":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "9eacdeebc9112ede";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"9Fk10":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pureUiActions = require("pure-ui-actions");
var _counterPage = require("./pages/counterPage");
var _counterPageDefault = parcelHelpers.interopDefault(_counterPage);
var _listPage = require("./pages/listPage");
var _listPageDefault = parcelHelpers.interopDefault(_listPage);
var _router = require("./router");
const { div } = (0, _pureUiActions.html);
exports.default = (0, _pureUiActions.component)(()=>({
        state: ()=>({
                theme: "dark",
                page: undefined,
                likes: {
                    counterPage: 0,
                    listPage: 0
                }
            }),
        actions: {
            SetPage: ({ page }, { state })=>{
                return {
                    state: page === state.page ? state : {
                        ...state,
                        page
                    }
                };
            },
            SetTheme: ({ theme }, { state })=>{
                return {
                    state: theme === state.theme ? state : {
                        ...state,
                        theme
                    }
                };
            },
            Like: ({ page }, { state })=>{
                return {
                    state: {
                        ...state,
                        likes: {
                            ...state.likes,
                            [page]: state.likes[page] + 1
                        }
                    }
                };
            }
        },
        tasks: {
            // Demonstrates a task that is only an effect
            SetDocTitle: ({ title })=>({
                    perform: ()=>{
                        document.title = title;
                    }
                })
        },
        view (id, { state }) {
            return div(`#${id}.page`, {
                class: {
                    light: state.theme === "light",
                    dark: state.theme === "dark"
                }
            }, (()=>{
                switch(state.page){
                    case "listPage":
                        return (0, _listPageDefault.default)("#list-page");
                    case "counterPage":
                        return (0, _counterPageDefault.default)("#counter-page");
                }
            })());
        }
    }));

},{"pure-ui-actions":"7NB7V","./pages/counterPage":"8Ln84","./pages/listPage":"4tkCQ","./router":"4wVP1","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7NB7V":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "html", ()=>(0, _vdom.html));
parcelHelpers.export(exports, "VNode", ()=>(0, _vdom.VNode));
parcelHelpers.export(exports, "memo", ()=>(0, _vdom.memo));
parcelHelpers.export(exports, "setHook", ()=>(0, _vdom.setHook));
parcelHelpers.export(exports, "ActionHandler", ()=>(0, _pureUiActionsTypes.ActionHandler));
parcelHelpers.export(exports, "ActionThunk", ()=>(0, _pureUiActionsTypes.ActionThunk));
parcelHelpers.export(exports, "Component", ()=>(0, _pureUiActionsTypes.Component));
parcelHelpers.export(exports, "ComponentInstance", ()=>(0, _pureUiActionsTypes.ComponentInstance));
parcelHelpers.export(exports, "Config", ()=>(0, _pureUiActionsTypes.Config));
parcelHelpers.export(exports, "Context", ()=>(0, _pureUiActionsTypes.Context));
parcelHelpers.export(exports, "GetActionThunk", ()=>(0, _pureUiActionsTypes.GetActionThunk));
parcelHelpers.export(exports, "GetConfig", ()=>(0, _pureUiActionsTypes.GetConfig));
parcelHelpers.export(exports, "GetTaskThunk", ()=>(0, _pureUiActionsTypes.GetTaskThunk));
parcelHelpers.export(exports, "Next", ()=>(0, _pureUiActionsTypes.Next));
parcelHelpers.export(exports, "RunAction", ()=>(0, _pureUiActionsTypes.RunAction));
parcelHelpers.export(exports, "Task", ()=>(0, _pureUiActionsTypes.Task));
parcelHelpers.export(exports, "TaskHandler", ()=>(0, _pureUiActionsTypes.TaskHandler));
parcelHelpers.export(exports, "TaskThunk", ()=>(0, _pureUiActionsTypes.TaskThunk));
parcelHelpers.export(exports, "ThunkType", ()=>(0, _pureUiActionsTypes.ThunkType));
parcelHelpers.export(exports, "componentRegistry", ()=>componentRegistry);
parcelHelpers.export(exports, "_setTestKey", ()=>_setTestKey);
parcelHelpers.export(exports, "_resetForTest", ()=>_resetForTest);
parcelHelpers.export(exports, "component", ()=>component);
parcelHelpers.export(exports, "renderComponent", ()=>renderComponent);
parcelHelpers.export(exports, "mount", ()=>mount);
// Pub/sub
parcelHelpers.export(exports, "subscribe", ()=>subscribe);
parcelHelpers.export(exports, "unsubscribe", ()=>unsubscribe);
parcelHelpers.export(exports, "publish", ()=>publish);
var _vdom = require("./vdom");
var _log = require("./log");
var _pureUiActionsTypes = require("./pure-ui-actions.types");
const componentRegistry = new Map();
const actionThunkCache = new Map();
const taskThunkCache = new Map();
// Root component references
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let rootAction;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let rootTask;
let rootState;
// Render cycle state
let renderingFromRoot = false;
let stateChanged = false;
let noRender = 0;
const appId = "app";
function resetAppState() {
    componentRegistry.clear();
    actionThunkCache.clear();
    taskThunkCache.clear();
    rootAction = undefined;
    rootTask = undefined;
    rootState = undefined;
    renderingFromRoot = false;
    stateChanged = false;
    noRender = 0;
}
// Test utilities
let internalKey = {};
const _setTestKey = (k)=>internalKey = k;
const _resetForTest = resetAppState;
// Helper to create stable cache keys
function createCacheKey(id, name, data) {
    const dataKey = data === null || data === undefined ? "" : JSON.stringify(data);
    return `${id}:${name}:${dataKey}`;
}
// Action thunk creator with memoization
function createActionThunk(componentId, actionName, data) {
    const cacheKey = createCacheKey(componentId, actionName, data);
    const cached = actionThunkCache.get(cacheKey);
    if (cached) return cached;
    const actionThunk = (thunkInput)=>{
        const instance = componentRegistry.get(componentId);
        if (!instance) throw Error(`${componentId} not found`);
        if (isDomEvent(thunkInput)) executeAction(instance, actionName, data, thunkInput);
        else if (thunkInput === internalKey) executeAction(instance, actionName, data);
        else (0, _log.log).manualError(componentId, actionName);
    };
    actionThunk.type = (0, _pureUiActionsTypes.ThunkType).Action;
    actionThunkCache.set(cacheKey, actionThunk);
    return actionThunk;
}
// Task thunk creator with memoization
function createTaskThunk(componentId, taskName, data) {
    const cacheKey = createCacheKey(componentId, taskName, data);
    const cached = taskThunkCache.get(cacheKey);
    if (cached) return cached;
    const taskThunk = (thunkInput)=>{
        if (isDomEvent(thunkInput) || thunkInput === internalKey) {
            const instance = componentRegistry.get(componentId);
            if (!instance) throw Error(`${componentId} not found`);
            const result = performTask(instance, taskName, data);
            return result.then((next)=>runNext(instance, next));
        } else (0, _log.log).manualError(componentId, taskName);
    };
    taskThunk.type = (0, _pureUiActionsTypes.ThunkType).Task;
    taskThunk.taskName = String(taskName);
    taskThunk.taskData = data;
    taskThunkCache.set(cacheKey, taskThunk);
    return taskThunk;
}
function executeAction(instance, actionName, data, event) {
    const { config, state: prevState, props, isRoot, id } = instance;
    const actions = config.actions;
    if (!actions || !actions[actionName]) return;
    const hasStateConfig = Boolean(config.state);
    let next;
    const prevStateFrozen = deepFreeze(prevState);
    const actionOutput = actions[actionName](data, {
        props: props ?? {},
        state: prevStateFrozen ?? {},
        rootState: rootState ?? {},
        event
    });
    // Only update instance.state if component has state config
    if (hasStateConfig) instance.state = actionOutput.state;
    next = actionOutput.next;
    const currStateChanged = hasStateConfig && instance.state !== prevState;
    stateChanged = stateChanged || currStateChanged;
    (0, _log.log).updateStart(id, currStateChanged ? prevState : undefined, actionName, data, instance.state, hasStateConfig);
    if (isRoot) rootState = instance.state;
    if (currStateChanged && instance.state) (0, _log.log).updateEnd(instance.state);
    runNext(instance, next);
}
function performTask(instance, taskName, data) {
    const { config, state, props, id } = instance;
    const tasks = config.tasks;
    if (!tasks || !tasks[taskName]) throw Error(`Task ${taskName} not found in ${id}`);
    const { perform, success, failure } = tasks[taskName](data);
    const runSuccess = (result)=>success && success(result, {
            props: props ?? {},
            state: state ?? {},
            rootState: rootState ?? {}
        });
    const runFailure = (err)=>failure && failure(err, {
            props: props ?? {},
            state: state ?? {},
            rootState: rootState ?? {}
        });
    try {
        const output = perform();
        (0, _log.log).taskPerform(id, String(taskName), isPromise(output));
        if (isPromise(output)) {
            renderComponentInstance(instance); // Render pending state updates
            return output.then((result)=>{
                (0, _log.log).taskSuccess(id, String(taskName));
                return runSuccess(result);
            }).catch((err)=>{
                (0, _log.log).taskFailure(id, String(taskName), err);
                return runFailure(err);
            });
        } else {
            (0, _log.log).taskSuccess(id, String(taskName));
            return Promise.resolve(runSuccess(output));
        }
    } catch (err) {
        (0, _log.log).taskFailure(id, String(taskName), err);
        return Promise.resolve(runFailure(err));
    }
}
function runNext(instance, next) {
    if (!next) renderComponentInstance(instance);
    else if (isThunk(next)) // Thunks may only be invoked here or from the DOM
    // `internalKey` prevents any manual calls from outside
    next(internalKey);
    else if (Array.isArray(next)) {
        noRender++;
        next.forEach((n)=>runNext(instance, n));
        noRender--;
        renderComponentInstance(instance);
    }
}
// Render function - always renders from root to keep vnode tree consistent
function renderComponentInstance(instance) {
    if (!noRender && (stateChanged || instance.props !== instance.prevProps)) {
        let isRenderRoot = false;
        if (!renderingFromRoot) {
            // If a child component, start render from root
            const rootInstance = componentRegistry.get(appId);
            if (rootInstance && !instance.isRoot) return renderComponentInstance(rootInstance);
            // Already root
            renderingFromRoot = true;
            isRenderRoot = true;
        }
        // Mark as rendering to prevent cleanup during patch (destroy hooks may fire)
        instance.inCurrentRender = true;
        const prevVNode = instance.vnode;
        instance.vnode = instance.config.view(instance.id, {
            props: instance.props ?? {},
            state: instance.state ?? {},
            rootState: rootState ?? {}
        });
        (0, _log.log).render(instance.id, instance.props);
        (0, _log.log).setStateGlobal(instance.id, instance.state);
        // Patch the DOM once at the root
        if (isRenderRoot && prevVNode) {
            (0, _vdom.patch)(prevVNode, instance.vnode);
            (0, _log.log).patch();
            publish("patch");
            stateChanged = false;
            renderingFromRoot = false;
            // Reset render flags
            Array.from(componentRegistry.values()).forEach((inst)=>{
                inst.inCurrentRender = false;
            });
        }
        setCleanup(instance);
    }
    instance.prevProps = instance.props;
    return instance.vnode;
}
function component(getConfig) {
    // Pass in callback that returns component config
    // Returns render function that is called by parent e.g. `counter("counter-0", { start: 0 })`
    const renderFn = (idStr, props)=>{
        const id = (idStr || "").replace(/^#/, "");
        // Check if component exists in registry
        const existing = componentRegistry.get(id);
        if (!id.length || !noRender && existing && existing.inCurrentRender) throw Error(`Component${id ? ` "${id}" ` : " "}must have a unique id!`);
        // Mark as in current render
        if (existing) existing.inCurrentRender = true;
        return renderComponent(id, getConfig, props);
    };
    // Add a handle to `getConfig` for tests
    renderFn.getConfig = getConfig;
    return renderFn;
}
function renderComponent(id, getConfig, props) {
    deepFreeze(props);
    const isRoot = id === appId;
    // If component already exists, just render again
    const existingRender = componentRegistry.get(id)?.render;
    if (existingRender) {
        const newVNode = existingRender(props);
        if (newVNode) return newVNode;
    }
    const action = (actionName, data)=>{
        return createActionThunk(id, String(actionName), data);
    };
    const task = (taskName, data)=>{
        return createTaskThunk(id, String(taskName), data);
    };
    const config = getConfig({
        action,
        task,
        rootAction: rootAction,
        rootTask: rootTask
    });
    const state = config.state && config.state(props);
    // Create component instance
    const instance = {
        id,
        config,
        state,
        props,
        prevProps: undefined,
        render: (p)=>{
            const inst = componentRegistry.get(id);
            if (inst) {
                inst.props = p;
                return renderComponentInstance(inst);
            }
        },
        vnode: undefined,
        isRoot,
        inCurrentRender: true
    };
    componentRegistry.set(id, instance);
    if (config.init) {
        noRender++;
        runNext(instance, config.init);
        noRender--;
    } else (0, _log.log).noInitialAction(id, state);
    if (isRoot) {
        rootAction = action;
        rootTask = task;
        rootState = instance.state;
    }
    (0, _log.log).render(id, props);
    instance.vnode = config.view(id, {
        props: props ?? {},
        state: instance.state ?? {},
        rootState: rootState ?? {}
    });
    instance.prevProps = props;
    setCleanup(instance);
    (0, _log.log).setStateGlobal(id, instance.state);
    return instance.vnode;
}
function setCleanup(instance) {
    if (!instance.vnode) return;
    (0, _vdom.setHook)(instance.vnode, "destroy", ()=>{
        const inst = componentRegistry.get(instance.id);
        if (inst && !inst.inCurrentRender) {
            componentRegistry.delete(instance.id);
            // Clean up thunk caches
            Array.from(actionThunkCache.keys()).forEach((key)=>{
                if (key.startsWith(`${instance.id}:`)) actionThunkCache.delete(key);
            });
            Array.from(taskThunkCache.keys()).forEach((key)=>{
                if (key.startsWith(`${instance.id}:`)) taskThunkCache.delete(key);
            });
            (0, _log.log).setStateGlobal(instance.id, undefined);
        }
    });
}
function mount({ app, props, init }) {
    resetAppState();
    // Mount the top-level app component
    const appElement = document.getElementById(appId);
    if (!appElement) throw Error(`Element with id "${appId}" not found`);
    (0, _vdom.patch)(appElement, app(appId, props));
    (0, _log.log).patch();
    publish("patch");
    // Reset render flags
    Array.from(componentRegistry.values()).forEach((instance)=>{
        instance.inCurrentRender = false;
    });
    // Manually invoking an action without `internalKey` is an error, so `runRootAction`
    // is provided by `mount` for wiring up events to root actions (e.g. routing)
    if (init) {
        const runRootAction = (actionName, data)=>{
            rootAction?.(actionName, data)(internalKey);
        };
        init(runRootAction);
    }
}
function isDomEvent(e) {
    return Boolean(e && "eventPhase" in e && "target" in e && "type" in e);
}
function isThunk(next) {
    if (next) return !Array.isArray(next) && next.type in (0, _pureUiActionsTypes.ThunkType);
    return false;
}
function isPromise(o) {
    return Boolean(o && o.then);
}
function deepFreeze(o) {
    if (o) {
        Object.freeze(o);
        Object.getOwnPropertyNames(o).forEach((p)=>{
            if (Object.prototype.hasOwnProperty.call(o, p) && o[p] !== null && (typeof o[p] === "object" || typeof o[p] === "function") && !Object.isFrozen(o[p])) deepFreeze(o[p]);
        });
    }
    return o;
}
function subscribe(type, listener) {
    document.addEventListener(type, listener);
}
function unsubscribe(type, listener) {
    document.removeEventListener(type, listener);
}
function publish(type, detail) {
    document.dispatchEvent(new CustomEvent(type, detail ? {
        detail
    } : undefined));
}

},{"./vdom":"38jsF","./log":"72iVC","./pure-ui-actions.types":"5X1yX","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"38jsF":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "thunk", ()=>(0, _snabbdom.thunk));
parcelHelpers.export(exports, "memo", ()=>(0, _snabbdom.thunk));
parcelHelpers.export(exports, "patch", ()=>patch);
parcelHelpers.export(exports, "html", ()=>html);
parcelHelpers.export(exports, "setHook", ()=>setHook);
var _snabbdom = require("snabbdom");
var _hyperscriptHelpers = require("hyperscript-helpers");
var _hyperscriptHelpersDefault = parcelHelpers.interopDefault(_hyperscriptHelpers);
const patch = (0, _snabbdom.init)([
    (0, _snabbdom.classModule),
    (0, _snabbdom.attributesModule),
    (0, _snabbdom.propsModule),
    (0, _snabbdom.eventListenersModule)
]);
const html = (0, _hyperscriptHelpersDefault.default)((0, _snabbdom.h));
function setHook(vnode, hookName, callback) {
    // See https://github.com/snabbdom/snabbdom#hooks
    if (vnode) {
        vnode.data = vnode.data || {};
        vnode.data.hook = vnode.data.hook || {};
        vnode.data.hook[hookName] = callback;
    }
}

},{"snabbdom":"k5Peu","hyperscript-helpers":"k7BPk","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"k5Peu":[function(require,module,exports,__globalThis) {
// core
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "htmlDomApi", ()=>(0, _htmldomapiJs.htmlDomApi));
parcelHelpers.export(exports, "init", ()=>(0, _initJs.init));
parcelHelpers.export(exports, "thunk", ()=>(0, _thunkJs.thunk));
parcelHelpers.export(exports, "vnode", ()=>(0, _vnodeJs.vnode));
// helpers
parcelHelpers.export(exports, "attachTo", ()=>(0, _attachtoJs.attachTo));
parcelHelpers.export(exports, "array", ()=>(0, _isJs.array));
parcelHelpers.export(exports, "primitive", ()=>(0, _isJs.primitive));
parcelHelpers.export(exports, "toVNode", ()=>(0, _tovnodeJs.toVNode));
parcelHelpers.export(exports, "h", ()=>(0, _hJs.h));
parcelHelpers.export(exports, "fragment", ()=>(0, _hJs.fragment));
// modules
parcelHelpers.export(exports, "attributesModule", ()=>(0, _attributesJs.attributesModule));
parcelHelpers.export(exports, "classModule", ()=>(0, _classJs.classModule));
parcelHelpers.export(exports, "datasetModule", ()=>(0, _datasetJs.datasetModule));
parcelHelpers.export(exports, "eventListenersModule", ()=>(0, _eventlistenersJs.eventListenersModule));
parcelHelpers.export(exports, "propsModule", ()=>(0, _propsJs.propsModule));
parcelHelpers.export(exports, "styleModule", ()=>(0, _styleJs.styleModule));
// JSX
parcelHelpers.export(exports, "jsx", ()=>(0, _jsxJs.jsx));
parcelHelpers.export(exports, "Fragment", ()=>(0, _jsxJs.Fragment));
var _htmldomapiJs = require("./htmldomapi.js");
var _initJs = require("./init.js");
var _thunkJs = require("./thunk.js");
var _vnodeJs = require("./vnode.js");
var _attachtoJs = require("./helpers/attachto.js");
var _isJs = require("./is.js");
var _tovnodeJs = require("./tovnode.js");
var _hJs = require("./h.js");
// types
var _hooksJs = require("./hooks.js");
parcelHelpers.exportAll(_hooksJs, exports);
var _attributesJs = require("./modules/attributes.js");
var _classJs = require("./modules/class.js");
var _datasetJs = require("./modules/dataset.js");
var _eventlistenersJs = require("./modules/eventlisteners.js");
var _propsJs = require("./modules/props.js");
var _styleJs = require("./modules/style.js");
var _jsxJs = require("./jsx.js");

},{"./htmldomapi.js":false,"./init.js":"aOSIP","./thunk.js":"d42m8","./vnode.js":false,"./helpers/attachto.js":false,"./is.js":false,"./tovnode.js":false,"./h.js":"5WsB2","./hooks.js":false,"./modules/attributes.js":"j6IwF","./modules/class.js":"fB5YU","./modules/dataset.js":false,"./modules/eventlisteners.js":"6yNCj","./modules/props.js":"caLKt","./modules/style.js":false,"./jsx.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"kyV9d":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "htmlDomApi", ()=>htmlDomApi);
function createElement(tagName, options) {
    return document.createElement(tagName, options);
}
function createElementNS(namespaceURI, qualifiedName, options) {
    return document.createElementNS(namespaceURI, qualifiedName, options);
}
function createDocumentFragment() {
    return parseFragment(document.createDocumentFragment());
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    if (isDocumentFragment(parentNode)) {
        let node = parentNode;
        while(node && isDocumentFragment(node)){
            const fragment = parseFragment(node);
            node = fragment.parent;
        }
        parentNode = node !== null && node !== void 0 ? node : parentNode;
    }
    if (isDocumentFragment(newNode)) newNode = parseFragment(newNode, parentNode);
    if (referenceNode && isDocumentFragment(referenceNode)) referenceNode = parseFragment(referenceNode).firstChildNode;
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    if (isDocumentFragment(child)) child = parseFragment(child, node);
    node.appendChild(child);
}
function parentNode(node) {
    if (isDocumentFragment(node)) {
        while(node && isDocumentFragment(node)){
            const fragment = parseFragment(node);
            node = fragment.parent;
        }
        return node !== null && node !== void 0 ? node : null;
    }
    return node.parentNode;
}
function nextSibling(node) {
    var _a;
    if (isDocumentFragment(node)) {
        const fragment = parseFragment(node);
        const parent = parentNode(fragment);
        if (parent && fragment.lastChildNode) {
            const children = Array.from(parent.childNodes);
            const index = children.indexOf(fragment.lastChildNode);
            return (_a = children[index + 1]) !== null && _a !== void 0 ? _a : null;
        }
        return null;
    }
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
function isDocumentFragment(node) {
    return node.nodeType === 11;
}
function parseFragment(fragmentNode, parentNode) {
    var _a, _b, _c;
    const fragment = fragmentNode;
    (_a = fragment.parent) !== null && _a !== void 0 ? _a : fragment.parent = parentNode !== null && parentNode !== void 0 ? parentNode : null;
    (_b = fragment.firstChildNode) !== null && _b !== void 0 ? _b : fragment.firstChildNode = fragmentNode.firstChild;
    (_c = fragment.lastChildNode) !== null && _c !== void 0 ? _c : fragment.lastChildNode = fragmentNode.lastChild;
    return fragment;
}
const htmlDomApi = {
    createElement,
    createElementNS,
    createTextNode,
    createDocumentFragment,
    createComment,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
    getTextContent,
    isElement,
    isText,
    isComment,
    isDocumentFragment
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"aOSIP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "init", ()=>init);
var _vnodeJs = require("./vnode.js");
var _isJs = require("./is.js");
var _htmldomapiJs = require("./htmldomapi.js");
const emptyNode = (0, _vnodeJs.vnode)("", {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    var _a, _b;
    const isSameKey = vnode1.key === vnode2.key;
    const isSameIs = ((_a = vnode1.data) === null || _a === void 0 ? void 0 : _a.is) === ((_b = vnode2.data) === null || _b === void 0 ? void 0 : _b.is);
    const isSameSel = vnode1.sel === vnode2.sel;
    const isSameTextOrFragment = !vnode1.sel && vnode1.sel === vnode2.sel ? typeof vnode1.text === typeof vnode2.text : true;
    return isSameSel && isSameKey && isSameIs && isSameTextOrFragment;
}
/**
 * @todo Remove this function when the document fragment is considered stable.
 */ function documentFragmentIsNotSupported() {
    throw new Error("The document fragment is not supported on this platform.");
}
function isElement(api, vnode) {
    return api.isElement(vnode);
}
function isDocumentFragment(api, vnode) {
    return api.isDocumentFragment(vnode);
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var _a;
    const map = {};
    for(let i = beginIdx; i <= endIdx; ++i){
        const key = (_a = children[i]) === null || _a === void 0 ? void 0 : _a.key;
        if (key !== undefined) map[key] = i;
    }
    return map;
}
const hooks = [
    "create",
    "update",
    "remove",
    "destroy",
    "pre",
    "post"
];
function init(modules, domApi, options) {
    const cbs = {
        create: [],
        update: [],
        remove: [],
        destroy: [],
        pre: [],
        post: []
    };
    const api = domApi !== undefined ? domApi : (0, _htmldomapiJs.htmlDomApi);
    for (const hook of hooks)for (const module of modules){
        const currentHook = module[hook];
        if (currentHook !== undefined) cbs[hook].push(currentHook);
    }
    function emptyNodeAt(elm) {
        const id = elm.id ? "#" + elm.id : "";
        // elm.className doesn't return a string when elm is an SVG element inside a shadowRoot.
        // https://stackoverflow.com/questions/29454340/detecting-classname-of-svganimatedstring
        const classes = elm.getAttribute("class");
        const c = classes ? "." + classes.split(" ").join(".") : "";
        return (0, _vnodeJs.vnode)(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function emptyDocumentFragmentAt(frag) {
        return (0, _vnodeJs.vnode)(undefined, {}, [], undefined, frag);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                const parent = api.parentNode(childElm);
                if (parent !== null) api.removeChild(parent, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var _a, _b, _c, _d, _e;
        let i;
        const data = vnode.data;
        const hook = data === null || data === void 0 ? void 0 : data.hook;
        (_a = hook === null || hook === void 0 ? void 0 : hook.init) === null || _a === void 0 || _a.call(hook, vnode);
        const children = vnode.children;
        const sel = vnode.sel;
        if (sel === "!") {
            (_b = vnode.text) !== null && _b !== void 0 ? _b : vnode.text = "";
            vnode.elm = api.createComment(vnode.text);
        } else if (sel === "") // textNode has no selector
        vnode.elm = api.createTextNode(vnode.text);
        else if (sel !== undefined) {
            // Parse selector
            const hashIdx = sel.indexOf("#");
            const dotIdx = sel.indexOf(".", hashIdx);
            const hash = hashIdx > 0 ? hashIdx : sel.length;
            const dot = dotIdx > 0 ? dotIdx : sel.length;
            const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            const ns = data === null || data === void 0 ? void 0 : data.ns;
            const elm = ns === undefined ? api.createElement(tag, data) : api.createElementNS(ns, tag, data);
            vnode.elm = elm;
            if (hash < dot) elm.setAttribute("id", sel.slice(hash + 1, dot));
            if (dotIdx > 0) elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
            for(i = 0; i < cbs.create.length; ++i)cbs.create[i](emptyNode, vnode);
            if (_isJs.primitive(vnode.text) && (!_isJs.array(children) || children.length === 0)) // allow h1 and similar nodes to be created w/ text and empty child list
            api.appendChild(elm, api.createTextNode(vnode.text));
            if (_isJs.array(children)) for(i = 0; i < children.length; ++i){
                const ch = children[i];
                if (ch != null) api.appendChild(elm, createElm(ch, insertedVnodeQueue));
            }
            if (hook !== undefined) {
                (_c = hook.create) === null || _c === void 0 || _c.call(hook, emptyNode, vnode);
                if (hook.insert !== undefined) insertedVnodeQueue.push(vnode);
            }
        } else if (((_d = options === null || options === void 0 ? void 0 : options.experimental) === null || _d === void 0 ? void 0 : _d.fragments) && vnode.children) {
            vnode.elm = ((_e = api.createDocumentFragment) !== null && _e !== void 0 ? _e : documentFragmentIsNotSupported)();
            for(i = 0; i < cbs.create.length; ++i)cbs.create[i](emptyNode, vnode);
            for(i = 0; i < vnode.children.length; ++i){
                const ch = vnode.children[i];
                if (ch != null) api.appendChild(vnode.elm, createElm(ch, insertedVnodeQueue));
            }
        } else vnode.elm = api.createTextNode(vnode.text);
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for(; startIdx <= endIdx; ++startIdx){
            const ch = vnodes[startIdx];
            if (ch != null) api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
        }
    }
    function invokeDestroyHook(vnode) {
        var _a, _b;
        const data = vnode.data;
        if (data !== undefined) {
            (_b = (_a = data === null || data === void 0 ? void 0 : data.hook) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 || _b.call(_a, vnode);
            for(let i = 0; i < cbs.destroy.length; ++i)cbs.destroy[i](vnode);
            if (vnode.children !== undefined) for(let j = 0; j < vnode.children.length; ++j){
                const child = vnode.children[j];
                if (child != null && typeof child !== "string") invokeDestroyHook(child);
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        var _a, _b;
        for(; startIdx <= endIdx; ++startIdx){
            let listeners;
            const ch = vnodes[startIdx];
            if (ch != null) {
                if (ch.sel !== undefined) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    const rm = createRmCb(ch.elm, listeners);
                    for(let i = 0; i < cbs.remove.length; ++i)cbs.remove[i](ch, rm);
                    const removeHook = (_b = (_a = ch === null || ch === void 0 ? void 0 : ch.data) === null || _a === void 0 ? void 0 : _a.hook) === null || _b === void 0 ? void 0 : _b.remove;
                    if (removeHook !== undefined) removeHook(ch, rm);
                    else rm();
                } else if (ch.children) {
                    // Fragment node
                    invokeDestroyHook(ch);
                    removeVnodes(parentElm, ch.children, 0, ch.children.length - 1);
                } else // Text node
                api.removeChild(parentElm, ch.elm);
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        let oldStartIdx = 0;
        let newStartIdx = 0;
        let oldEndIdx = oldCh.length - 1;
        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIdx];
        let newEndIdx = newCh.length - 1;
        let newStartVnode = newCh[0];
        let newEndVnode = newCh[newEndIdx];
        let oldKeyToIdx;
        let idxInOld;
        let elmToMove;
        let before;
        while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx){
            if (oldStartVnode == null) oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            else if (oldEndVnode == null) oldEndVnode = oldCh[--oldEndIdx];
            else if (newStartVnode == null) newStartVnode = newCh[++newStartIdx];
            else if (newEndVnode == null) newEndVnode = newCh[--newEndIdx];
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newEndVnode)) {
                // Vnode moved right
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldEndVnode, newStartVnode)) {
                // Vnode moved left
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            } else {
                if (oldKeyToIdx === undefined) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (idxInOld === undefined) {
                    // `newStartVnode` is new, create and insert it in beginning
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                } else if (oldKeyToIdx[newEndVnode.key] === undefined) {
                    // `newEndVnode` is new, create and insert it in the end
                    api.insertBefore(parentElm, createElm(newEndVnode, insertedVnodeQueue), api.nextSibling(oldEndVnode.elm));
                    newEndVnode = newCh[--newEndIdx];
                } else {
                    // Neither of the new endpoints are new vnodes, so we make progress by
                    // moving `newStartVnode` into position
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (newStartIdx <= newEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        }
        if (oldStartIdx <= oldEndIdx) removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const hook = (_a = vnode.data) === null || _a === void 0 ? void 0 : _a.hook;
        (_b = hook === null || hook === void 0 ? void 0 : hook.prepatch) === null || _b === void 0 || _b.call(hook, oldVnode, vnode);
        const elm = vnode.elm = oldVnode.elm;
        if (oldVnode === vnode) return;
        if (vnode.data !== undefined || vnode.text !== undefined && vnode.text !== oldVnode.text) {
            (_c = vnode.data) !== null && _c !== void 0 ? _c : vnode.data = {};
            (_d = oldVnode.data) !== null && _d !== void 0 ? _d : oldVnode.data = {};
            for(let i = 0; i < cbs.update.length; ++i)cbs.update[i](oldVnode, vnode);
            (_g = (_f = (_e = vnode.data) === null || _e === void 0 ? void 0 : _e.hook) === null || _f === void 0 ? void 0 : _f.update) === null || _g === void 0 || _g.call(_f, oldVnode, vnode);
        }
        const oldCh = oldVnode.children;
        const ch = vnode.children;
        if (vnode.text === undefined) {
            if (oldCh !== undefined && ch !== undefined) {
                if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            } else if (ch !== undefined) {
                if (oldVnode.text !== undefined) api.setTextContent(elm, "");
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            } else if (oldCh !== undefined) removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            else if (oldVnode.text !== undefined) api.setTextContent(elm, "");
        } else if (oldVnode.text !== vnode.text) {
            if (oldCh !== undefined) removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            api.setTextContent(elm, vnode.text);
        }
        (_h = hook === null || hook === void 0 ? void 0 : hook.postpatch) === null || _h === void 0 || _h.call(hook, oldVnode, vnode);
    }
    return function patch(oldVnode, vnode) {
        let i, elm, parent;
        const insertedVnodeQueue = [];
        for(i = 0; i < cbs.pre.length; ++i)cbs.pre[i]();
        if (isElement(api, oldVnode)) oldVnode = emptyNodeAt(oldVnode);
        else if (isDocumentFragment(api, oldVnode)) oldVnode = emptyDocumentFragmentAt(oldVnode);
        if (sameVnode(oldVnode, vnode)) patchVnode(oldVnode, vnode, insertedVnodeQueue);
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [
                    oldVnode
                ], 0, 0);
            }
        }
        for(i = 0; i < insertedVnodeQueue.length; ++i)insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        for(i = 0; i < cbs.post.length; ++i)cbs.post[i]();
        return vnode;
    };
}

},{"./vnode.js":"bqeAL","./is.js":"dyuJ1","./htmldomapi.js":"kyV9d","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bqeAL":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "vnode", ()=>vnode);
function vnode(sel, data, children, text, elm) {
    const key = data === undefined ? undefined : data.key;
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dyuJ1":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "array", ()=>array);
parcelHelpers.export(exports, "primitive", ()=>primitive);
const array = Array.isArray;
function primitive(s) {
    return typeof s === "string" || typeof s === "number" || s instanceof String || s instanceof Number;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"d42m8":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "thunk", ()=>thunk);
var _hJs = require("./h.js");
function copyToThunk(vnode, thunk) {
    var _a;
    const ns = (_a = thunk.data) === null || _a === void 0 ? void 0 : _a.ns;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
    if (ns) (0, _hJs.addNS)(thunk.data, thunk.children, thunk.sel);
}
function init(thunk) {
    const cur = thunk.data;
    const vnode = cur.fn(...cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    let i;
    const old = oldVnode.data;
    const cur = thunk.data;
    const oldArgs = old.args;
    const args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn(...args), thunk);
        return;
    }
    for(i = 0; i < args.length; ++i)if (oldArgs[i] !== args[i]) {
        copyToThunk(cur.fn(...args), thunk);
        return;
    }
    copyToThunk(oldVnode, thunk);
}
const thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return (0, _hJs.h)(sel, {
        key: key,
        hook: {
            init,
            prepatch
        },
        fn: fn,
        args: args
    });
};

},{"./h.js":"5WsB2","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5WsB2":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addNS", ()=>addNS);
parcelHelpers.export(exports, "h", ()=>h);
/**
 * @experimental
 */ parcelHelpers.export(exports, "fragment", ()=>fragment);
var _vnodeJs = require("./vnode.js");
var _isJs = require("./is.js");
function addNS(data, children, sel) {
    data.ns = "http://www.w3.org/2000/svg";
    if (sel !== "foreignObject" && children !== undefined) for(let i = 0; i < children.length; ++i){
        const child = children[i];
        if (typeof child === "string") continue;
        const childData = child.data;
        if (childData !== undefined) addNS(childData, child.children, child.sel);
    }
}
function h(sel, b, c) {
    let data = {};
    let children;
    let text;
    let i;
    if (c !== undefined) {
        if (b !== null) data = b;
        if (_isJs.array(c)) children = c;
        else if (_isJs.primitive(c)) text = c.toString();
        else if (c && c.sel) children = [
            c
        ];
    } else if (b !== undefined && b !== null) {
        if (_isJs.array(b)) children = b;
        else if (_isJs.primitive(b)) text = b.toString();
        else if (b && b.sel) children = [
            b
        ];
        else data = b;
    }
    if (children !== undefined) {
        for(i = 0; i < children.length; ++i)if (_isJs.primitive(children[i])) children[i] = (0, _vnodeJs.vnode)(undefined, undefined, undefined, children[i], undefined);
    }
    if (sel.startsWith("svg") && (sel.length === 3 || sel[3] === "." || sel[3] === "#")) addNS(data, children, sel);
    return (0, _vnodeJs.vnode)(sel, data, children, text, undefined);
}
function fragment(children) {
    let c;
    let text;
    if (_isJs.array(children)) c = children;
    else if (_isJs.primitive(c)) text = children;
    else if (c && c.sel) c = [
        children
    ];
    if (c !== undefined) {
        for(let i = 0; i < c.length; ++i)if (_isJs.primitive(c[i])) c[i] = (0, _vnodeJs.vnode)(undefined, undefined, undefined, c[i], undefined);
    }
    return (0, _vnodeJs.vnode)(undefined, {}, c, text, undefined);
}

},{"./vnode.js":"bqeAL","./is.js":"dyuJ1","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"j6IwF":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "attributesModule", ()=>attributesModule);
const xlinkNS = "http://www.w3.org/1999/xlink";
const xmlnsNS = "http://www.w3.org/2000/xmlns/";
const xmlNS = "http://www.w3.org/XML/1998/namespace";
const colonChar = 58;
const xChar = 120;
const mChar = 109;
function updateAttrs(oldVnode, vnode) {
    let key;
    const elm = vnode.elm;
    let oldAttrs = oldVnode.data.attrs;
    let attrs = vnode.data.attrs;
    if (!oldAttrs && !attrs) return;
    if (oldAttrs === attrs) return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    // update modified attributes, add new attributes
    for(key in attrs){
        const cur = attrs[key];
        const old = oldAttrs[key];
        if (old !== cur) {
            if (cur === true) elm.setAttribute(key, "");
            else if (cur === false) elm.removeAttribute(key);
            else {
                if (key.charCodeAt(0) !== xChar) elm.setAttribute(key, cur);
                else if (key.charCodeAt(3) === colonChar) // Assume xml namespace
                elm.setAttributeNS(xmlNS, key, cur);
                else if (key.charCodeAt(5) === colonChar) // Assume 'xmlns' or 'xlink' namespace
                key.charCodeAt(1) === mChar ? elm.setAttributeNS(xmlnsNS, key, cur) : elm.setAttributeNS(xlinkNS, key, cur);
                else elm.setAttribute(key, cur);
            }
        }
    }
    // remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for(key in oldAttrs)if (!(key in attrs)) elm.removeAttribute(key);
}
const attributesModule = {
    create: updateAttrs,
    update: updateAttrs
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fB5YU":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "classModule", ()=>classModule);
function updateClass(oldVnode, vnode) {
    let cur;
    let name;
    const elm = vnode.elm;
    let oldClass = oldVnode.data.class;
    let klass = vnode.data.class;
    if (!oldClass && !klass) return;
    if (oldClass === klass) return;
    oldClass = oldClass || {};
    klass = klass || {};
    for(name in oldClass)if (oldClass[name] && !Object.prototype.hasOwnProperty.call(klass, name)) // was `true` and now not provided
    elm.classList.remove(name);
    for(name in klass){
        cur = klass[name];
        if (cur !== oldClass[name]) elm.classList[cur ? "add" : "remove"](name);
    }
}
const classModule = {
    create: updateClass,
    update: updateClass
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6yNCj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "eventListenersModule", ()=>eventListenersModule);
function invokeHandler(handler, vnode, event) {
    if (typeof handler === "function") // call function handler
    handler.call(vnode, event, vnode);
    else if (typeof handler === "object") // call multiple handlers
    for(let i = 0; i < handler.length; i++)invokeHandler(handler[i], vnode, event);
}
function handleEvent(event, vnode) {
    const name = event.type;
    const on = vnode.data.on;
    // call event handler(s) if exists
    if (on && on[name]) invokeHandler(on[name], vnode, event);
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function updateEventListeners(oldVnode, vnode) {
    const oldOn = oldVnode.data.on;
    const oldListener = oldVnode.listener;
    const oldElm = oldVnode.elm;
    const on = vnode && vnode.data.on;
    const elm = vnode && vnode.elm;
    let name;
    // optimization for reused immutable handlers
    if (oldOn === on) return;
    // remove existing listeners which no longer used
    if (oldOn && oldListener) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if (!on) for(name in oldOn)// remove listener if element was changed or existing listeners removed
        oldElm.removeEventListener(name, oldListener, false);
        else {
            for(name in oldOn)// remove listener if existing listener removed
            if (!on[name]) oldElm.removeEventListener(name, oldListener, false);
        }
    }
    // add new listeners which has not already attached
    if (on) {
        // reuse existing listener or create new
        const listener = vnode.listener = oldVnode.listener || createListener();
        // update vnode for listener
        listener.vnode = vnode;
        // if element changed or added we add all needed listeners unconditionally
        if (!oldOn) for(name in on)// add listener if element was changed or new listeners added
        elm.addEventListener(name, listener, false);
        else {
            for(name in on)// add listener if new listener added
            if (!oldOn[name]) elm.addEventListener(name, listener, false);
        }
    }
}
const eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"caLKt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "propsModule", ()=>propsModule);
function updateProps(oldVnode, vnode) {
    let key;
    let cur;
    let old;
    const elm = vnode.elm;
    let oldProps = oldVnode.data.props;
    let props = vnode.data.props;
    if (!oldProps && !props) return;
    if (oldProps === props) return;
    oldProps = oldProps || {};
    props = props || {};
    for(key in props){
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== "value" || elm[key] !== cur)) elm[key] = cur;
    }
}
const propsModule = {
    create: updateProps,
    update: updateProps
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"k7BPk":[function(require,module,exports,__globalThis) {
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
var isValidString = function isValidString(param) {
    return typeof param === 'string' && param.length > 0;
};
var startsWith = function startsWith(string, start) {
    return string[0] === start;
};
var isSelector = function isSelector(param) {
    return isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));
};
var node = function node(h) {
    return function(tagName) {
        return function(first) {
            for(var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)rest[_key - 1] = arguments[_key];
            if (isSelector(first)) return h.apply(undefined, [
                tagName + first
            ].concat(rest));
            else if (typeof first === 'undefined') return h(tagName);
            else return h.apply(undefined, [
                tagName,
                first
            ].concat(rest));
        };
    };
};
var TAG_NAMES = [
    'a',
    'abbr',
    'acronym',
    'address',
    'applet',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'basefont',
    'bdi',
    'bdo',
    'bgsound',
    'big',
    'blink',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'center',
    'cite',
    'code',
    'col',
    'colgroup',
    'command',
    'content',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'element',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'font',
    'footer',
    'form',
    'frame',
    'frameset',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'image',
    'img',
    'input',
    'ins',
    'isindex',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'link',
    'listing',
    'main',
    'map',
    'mark',
    'marquee',
    'math',
    'menu',
    'menuitem',
    'meta',
    'meter',
    'multicol',
    'nav',
    'nextid',
    'nobr',
    'noembed',
    'noframes',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'picture',
    'plaintext',
    'pre',
    'progress',
    'q',
    'rb',
    'rbc',
    'rp',
    'rt',
    'rtc',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'shadow',
    'slot',
    'small',
    'source',
    'spacer',
    'span',
    'strike',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'svg',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'tt',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
    'xmp'
];
exports['default'] = function(h) {
    var createTag = node(h);
    var exported = {
        TAG_NAMES: TAG_NAMES,
        isSelector: isSelector,
        createTag: createTag
    };
    TAG_NAMES.forEach(function(n) {
        exported[n] = createTag(n);
    });
    return exported;
};
module.exports = exports['default'];

},{}],"72iVC":[function(require,module,exports,__globalThis) {
/* eslint-disable @typescript-eslint/no-explicit-any */ /*
Logging for pure-ui-actions lifecycle with Redux DevTools integration
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "log", ()=>log);
let groupId = "";
// Logging controls based on URL query parameters
const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
const logToConsole = searchParams?.get("debug") === "console"; // Enable with ?debug=console
const logEnabled = logToConsole;
let devToolsConnection = null;
// Initialize Redux DevTools connection (if extension is active)
if (typeof window !== "undefined") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (devToolsExtension) {
        devToolsConnection = devToolsExtension.connect({
            name: "pure-ui-actions App",
            features: {
                jump: false,
                skip: false,
                reorder: false,
                dispatch: false,
                persist: false // Disable persist
            }
        });
        // Initialize with empty state
        if (devToolsConnection) devToolsConnection.init({});
    }
}
// Helper to get aggregated state for DevTools
function getAggregatedState() {
    const win = window;
    // Return a shallow copy to avoid mutating window.state
    return {
        ...win.state || {}
    };
}
const log = {
    setStateGlobal (id, state) {
        // Maintain global state registry (DevTools and logging rely on this)
        // Called after actions update state and during render lifecycle
        const win = window;
        const stateGlobal = win.state || (win.state = {});
        if (state === undefined || state === null) delete stateGlobal[id];
        else stateGlobal[id] = state;
    // Note: State updates are sent to DevTools by updateStart, not here
    // This just maintains window.state for getAggregatedState() to read
    },
    noInitialAction (id, state) {
        // Send initial mount to Redux DevTools
        if (devToolsConnection && state) {
            // Build aggregated state with the initial state for this component
            const aggregatedState = getAggregatedState();
            aggregatedState[id] = state;
            devToolsConnection.send({
                type: `${id}/[Mount]`,
                meta: {
                    lifecycle: true
                }
            }, aggregatedState);
        }
        // Console logging
        if (logEnabled) {
            console.group(`%c#${id}`, "color: #69f");
            if (state) console.log(`${JSON.stringify(state)}`);
            groupId = id;
        }
    },
    updateStart (id, state, label, data, newState, hasStateConfig) {
        // Send to Redux DevTools with current state
        if (devToolsConnection && newState !== undefined) {
            // Update window.state FIRST so subsequent getAggregatedState() calls are accurate
            const win = window;
            const stateGlobal = win.state || (win.state = {});
            stateGlobal[id] = newState;
            // Build aggregated state with the NEW state for this component
            const aggregatedState = getAggregatedState();
            devToolsConnection.send({
                type: `${id}/${label}`,
                payload: data || null
            }, aggregatedState);
        }
        // Console logging
        if (logEnabled) {
            if (!groupId || groupId !== id) {
                console.group(`%c#${id}`, "color: #69f");
                groupId = id;
            }
            if (state) console.log(`%c${JSON.stringify(state)}`, "text-decoration: line-through;");
            let msg = `${String(label)}`;
            if (data) msg += ` ${JSON.stringify(data)}`;
            console.log(`%c${msg}`, "color: #f6b");
            if (!state && hasStateConfig) console.log(`No change`);
        }
    },
    updateEnd (state) {
        // Note: updateEnd is informational only - state already sent in updateStart
        // Console logging
        if (logEnabled && state) console.log(`${JSON.stringify(state)}`);
    },
    taskPerform (id, label, isPromise) {
        // Send task start to Redux DevTools
        if (devToolsConnection) devToolsConnection.send({
            type: `${id}/[Task] ${label}/start`,
            meta: {
                isTask: true,
                status: "start",
                isPromise
            }
        }, getAggregatedState());
        // Console logging
        if (logEnabled) console.log(`%cTask "${label}" perform${isPromise ? "..." : "ed"}`, "color: #dd8");
    },
    taskSuccess (id, label) {
        // Send to Redux DevTools
        if (devToolsConnection) devToolsConnection.send({
            type: `${id}/[Task] ${label}/success`,
            meta: {
                isTask: true,
                status: "success"
            }
        }, getAggregatedState());
        // Console logging
        if (logEnabled) console.log(`%c\n...#${id} task "${label}" success`, "color: #dd8");
    },
    taskFailure (id, label, err) {
        // Send to Redux DevTools
        if (devToolsConnection) devToolsConnection.send({
            type: `${id}/[Task] ${label}/failure`,
            payload: {
                error: err && typeof err === "object" && "message" in err ? err.message : String(err)
            },
            meta: {
                isTask: true,
                status: "failure"
            }
        }, getAggregatedState());
        // Console logging
        if (logEnabled) {
            console.log(`%c\n...#${id} task "${label}" failure`, "color: #dd8");
            if (err) console.error(JSON.stringify(err));
        }
    },
    render (id, props) {
        // Console logging
        if (logEnabled) {
            console.groupEnd();
            let msg = `\u{27F3} Render #${id}`;
            if (props && Object.keys(props).length) msg += `, props: ${JSON.stringify(props, replacer)}`;
            console.log(`%c${msg}`, "color: #888");
            groupId = "";
        }
    },
    patch () {
        // Send updated state to Redux DevTools after VDOM patch completes
        // At this point, destroy hooks have run and window.state is clean
        // ALWAYS sent - critical for state synchronization (shows component cleanup)
        if (devToolsConnection) devToolsConnection.send({
            type: "[PATCH]",
            meta: {
                isPatch: true
            }
        }, getAggregatedState());
        // Console logging
        if (logEnabled) {
            console.log(`%c\xbb PATCH`, "color: #888");
            console.groupEnd();
        }
    },
    manualError (id, name) {
        throw Error(`#${id} "${name}" cannot be invoked manually`);
    }
};
function replacer(k, v) {
    return typeof v === "function" ? "[fn]" : v;
}
window.addEventListener("error", ()=>{
    setTimeout(()=>{
        console.groupEnd();
        groupId = "";
    });
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5X1yX":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ThunkType", ()=>ThunkType);
var ThunkType = /*#__PURE__*/ function(ThunkType) {
    ThunkType[ThunkType["Action"] = 0] = "Action";
    ThunkType[ThunkType["Task"] = 1] = "Task";
    return ThunkType;
}({});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8Ln84":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pureUiActions = require("pure-ui-actions");
var _counter = require("../components/counter");
var _counterDefault = parcelHelpers.interopDefault(_counter);
var _themeMenu = require("../components/themeMenu");
var _themeMenuDefault = parcelHelpers.interopDefault(_themeMenu);
var _like = require("../components/like");
var _likeDefault = parcelHelpers.interopDefault(_like);
const { div, span, a } = (0, _pureUiActions.html);
exports.default = (0, _pureUiActions.component)(({ rootTask })=>({
        init: rootTask("SetDocTitle", {
            title: "Counter Page"
        }),
        view (id) {
            return div(`#${id}`, [
                div(".content", [
                    (0, _themeMenuDefault.default)("#theme-menu"),
                    div(".nav", [
                        span("counter page | "),
                        a({
                            attrs: {
                                href: "/list" + location.search,
                                "data-navigo": true
                            }
                        }, "list page")
                    ]),
                    (0, _likeDefault.default)("#counter-like", {
                        page: "counterPage"
                    })
                ]),
                (0, _counterDefault.default)("#counter-0", {
                    start: 0
                }),
                (0, _counterDefault.default)("#counter-1", {
                    start: -1
                })
            ]);
        }
    }));

},{"pure-ui-actions":"7NB7V","../components/counter":"5Ydba","../components/themeMenu":"lkXYY","../components/like":"edpvh","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5Ydba":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pureUiActions = require("pure-ui-actions");
var _notification = require("./notification");
var _notificationDefault = parcelHelpers.interopDefault(_notification);
var _validation = require("../services/validation");
const { div, button } = (0, _pureUiActions.html);
exports.default = (0, _pureUiActions.component)(({ action, task })=>({
        state: (props)=>({
                counter: props.start,
                feedback: ""
            }),
        init: action("Validate"),
        actions: {
            Increment: ({ step }, { state })=>{
                return {
                    state: {
                        ...state,
                        counter: state.counter + step
                    },
                    next: action("Validate")
                };
            },
            Decrement: ({ step }, { state })=>{
                return {
                    state: {
                        ...state,
                        counter: state.counter - step
                    },
                    next: action("Validate")
                };
            },
            Validate: (_, { state })=>{
                return {
                    state,
                    next: [
                        action("SetFeedback", {
                            text: "Validating..."
                        }),
                        // An async task
                        task("ValidateCount", {
                            count: state.counter
                        })
                    ]
                };
            },
            SetFeedback: ({ text }, { state })=>{
                return {
                    state: text === state.feedback ? state : {
                        ...state,
                        feedback: text
                    }
                };
            }
        },
        tasks: {
            ValidateCount: ({ count })=>{
                return {
                    perform: ()=>(0, _validation.validateCount)(count),
                    success: (result)=>action("SetFeedback", result),
                    failure: ()=>action("SetFeedback", {
                            text: "Unavailable"
                        })
                };
            }
        },
        view (id, { state }) {
            return div(`#${id}.counter`, [
                button({
                    on: {
                        click: action("Increment", {
                            step: 1
                        })
                    }
                }, "+"),
                div(String(state.counter)),
                button({
                    on: {
                        click: action("Decrement", {
                            step: 1
                        })
                    }
                }, "-"),
                // Child component - `notification` module
                (0, _notificationDefault.default)(`#${id}-feedback`, {
                    text: state.feedback,
                    onDismiss: action("SetFeedback", {
                        text: ""
                    })
                })
            ]);
        }
    }));

},{"pure-ui-actions":"7NB7V","./notification":"hf2lb","../services/validation":"5uzyO","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hf2lb":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pureUiActions = require("pure-ui-actions");
const { div, button } = (0, _pureUiActions.html);
exports.default = (0, _pureUiActions.component)(({ action })=>({
        state: ()=>({
                show: true
            }),
        actions: {
            Dismiss: (_, { props, state })=>{
                return {
                    state: {
                        ...state,
                        show: false
                    },
                    next: props.onDismiss
                };
            }
        },
        view (id, { props, state }) {
            return div(`#${id}.notification`, {
                class: {
                    show: state.show && props.text.length
                }
            }, [
                props.text,
                button({
                    on: {
                        click: action("Dismiss")
                    }
                }, "Dismiss")
            ]);
        }
    }));

},{"pure-ui-actions":"7NB7V","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5uzyO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "validateCount", ()=>validateCount);
function validateCount(num) {
    return new Promise((resolve)=>{
        // Mock async
        setTimeout(()=>resolve({
                text: num % 2 === 0 ? "\u2713 Even" : "x Odd"
            }), 500);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lkXYY":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pureUiActions = require("pure-ui-actions");
const { div, button } = (0, _pureUiActions.html);
exports.default = (0, _pureUiActions.component)(({ rootAction })=>({
        view (id) {
            return div(`#${id}`, [
                button({
                    on: {
                        click: rootAction("SetTheme", {
                            theme: "light"
                        })
                    }
                }, "Light theme"),
                button({
                    on: {
                        click: rootAction("SetTheme", {
                            theme: "dark"
                        })
                    }
                }, "Dark theme")
            ]);
        }
    }));

},{"pure-ui-actions":"7NB7V","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"edpvh":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pureUiActions = require("pure-ui-actions");
const { button } = (0, _pureUiActions.html);
exports.default = (0, _pureUiActions.component)(({ action, rootAction, rootTask })=>({
        actions: {
            Like: (_, { props, state })=>({
                    state,
                    next: [
                        rootAction("Like", {
                            page: props.page
                        }),
                        rootTask("SetDocTitle", {
                            title: "You like this!"
                        })
                    ]
                })
        },
        view: (id, { props, rootState })=>button(`#${id}.like`, {
                on: {
                    click: action("Like")
                }
            }, `\u{1F44D} ${rootState.likes[props.page]}`)
    }));

},{"pure-ui-actions":"7NB7V","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4tkCQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pureUiActions = require("pure-ui-actions");
var _themeMenu = require("../components/themeMenu");
var _themeMenuDefault = parcelHelpers.interopDefault(_themeMenu);
var _like = require("../components/like");
var _likeDefault = parcelHelpers.interopDefault(_like);
var _datesList = require("../components/datesList");
var _datesListDefault = parcelHelpers.interopDefault(_datesList);
const { div, span, a } = (0, _pureUiActions.html);
exports.default = (0, _pureUiActions.component)(({ rootTask })=>({
        init: rootTask("SetDocTitle", {
            title: "List Page"
        }),
        view (id) {
            return div(`#${id}`, div(".content", [
                (0, _themeMenuDefault.default)("#theme-menu"),
                div(".nav", [
                    a({
                        attrs: {
                            href: "/counter" + location.search,
                            "data-navigo": true
                        }
                    }, "counter page"),
                    span(" | list page")
                ]),
                (0, _likeDefault.default)("#list-like", {
                    page: "listPage"
                }),
                (0, _datesListDefault.default)("#dates-list")
            ]));
        }
    }));

},{"pure-ui-actions":"7NB7V","../components/themeMenu":"lkXYY","../components/like":"edpvh","../components/datesList":"6HuA9","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"6HuA9":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pureUiActions = require("pure-ui-actions");
const { div, input, ul, li, button } = (0, _pureUiActions.html);
const allDates = (()=>{
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({
        length: days
    }, (_, i)=>{
        const date = new Date(year, month, i + 1);
        return {
            id: date.toISOString().split("T")[0],
            label: date.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric"
            })
        };
    });
})();
const filterDates = (filter)=>filter.trim() ? allDates.filter((d)=>d.label.toLowerCase().includes(filter.toLowerCase().trim())) : allDates;
// Memoized render function
const renderList = (filter, selected, onClick)=>ul(".dates-list", {
        on: {
            click: onClick
        }
    }, filterDates(filter).map((d)=>li({
            key: d.id,
            attrs: {
                "data-id": d.id
            },
            class: {
                selected: selected === d.id
            }
        }, d.label)));
exports.default = (0, _pureUiActions.component)(({ action })=>({
        state: ()=>({
                filterText: "",
                selectedDate: null,
                showInfo: true
            }),
        actions: {
            SetFilter: (_, { state, event })=>({
                    state: {
                        ...state,
                        filterText: event?.target?.value ?? ""
                    }
                }),
            SelectDate: (_, { state, event })=>{
                const id = event?.target?.closest("[data-id]")?.getAttribute("data-id");
                return id && id !== state.selectedDate ? {
                    state: {
                        ...state,
                        selectedDate: id
                    }
                } : {
                    state
                };
            },
            ToggleInfo: (_, { state })=>({
                    state: {
                        ...state,
                        showInfo: !state.showInfo
                    }
                })
        },
        view (id, { state }) {
            const filtered = filterDates(state.filterText);
            return div(`#${id}.dates-picker`, [
                div(".ui-row", [
                    input(`#${id}-filter`, {
                        props: {
                            type: "text",
                            value: state.filterText,
                            placeholder: "Filter by day or date..."
                        },
                        on: {
                            input: action("SetFilter")
                        }
                    })
                ]),
                div(".ui-row", [
                    button(".help-toggle", {
                        on: {
                            click: action("ToggleInfo")
                        }
                    }, "\u24D8"),
                    state.showInfo ? div(".dates-info", `Showing ${filtered.length} of ${allDates.length} days`) : null
                ]),
                // Memoized: re-renders on filter/selection change, but NOT when toggling info
                (0, _pureUiActions.memo)("ul.dates-list", "dates-list", renderList, [
                    state.filterText,
                    state.selectedDate,
                    action("SelectDate")
                ])
            ]);
        }
    }));

},{"pure-ui-actions":"7NB7V","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4wVP1":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _pureUiActions = require("pure-ui-actions");
var _navigo = require("navigo");
var _navigoDefault = parcelHelpers.interopDefault(_navigo);
var _app = require("./app");
var _appDefault = parcelHelpers.interopDefault(_app);
const router = new (0, _navigoDefault.default)("/demos/pure-ui-actions/spa/");
document.addEventListener("DOMContentLoaded", ()=>(0, _pureUiActions.mount)({
        app: (0, _appDefault.default),
        props: {},
        // Manually invoking an action is an error, so `runRootAction` is provided
        // by `mount` for wiring up events to root actions (e.g. routing)
        init: (runRootAction)=>{
            const list = ()=>runRootAction("SetPage", {
                    page: "listPage"
                });
            const counter = ()=>runRootAction("SetPage", {
                    page: "counterPage"
                });
            router.on({
                list,
                counter,
                "*": counter
            }).resolve();
            (0, _pureUiActions.subscribe)("patch", ()=>{
                router.updatePageLinks();
            });
        }
    }));

},{"pure-ui-actions":"7NB7V","navigo":"1cMK4","./app":"9Fk10","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1cMK4":[function(require,module,exports,__globalThis) {
!function(t, n) {
    module.exports = n();
}("undefined" != typeof self ? self : this, function() {
    return function() {
        "use strict";
        var t = {
            407: function(t, n, e) {
                e.d(n, {
                    default: function() {
                        return N;
                    }
                });
                var o = /([:*])(\w+)/g, r = /\*/g, i = /\/\?/g;
                function a(t) {
                    return void 0 === t && (t = "/"), v() ? location.pathname + location.search + location.hash : t;
                }
                function s(t) {
                    return t.replace(/\/+$/, "").replace(/^\/+/, "");
                }
                function c(t) {
                    return "string" == typeof t;
                }
                function u(t) {
                    return t && t.indexOf("#") >= 0 && t.split("#").pop() || "";
                }
                function h(t) {
                    var n = s(t).split(/\?(.*)?$/);
                    return [
                        s(n[0]),
                        n.slice(1).join("")
                    ];
                }
                function f(t) {
                    for(var n = {}, e = t.split("&"), o = 0; o < e.length; o++){
                        var r = e[o].split("=");
                        if ("" !== r[0]) {
                            var i = decodeURIComponent(r[0]);
                            n[i] ? (Array.isArray(n[i]) || (n[i] = [
                                n[i]
                            ]), n[i].push(decodeURIComponent(r[1] || ""))) : n[i] = decodeURIComponent(r[1] || "");
                        }
                    }
                    return n;
                }
                function l(t, n) {
                    var e, a = h(s(t.currentLocationPath)), l = a[0], p = a[1], d = "" === p ? null : f(p), v = [];
                    if (c(n.path)) {
                        if (e = "(?:/^|^)" + s(n.path).replace(o, function(t, n, e) {
                            return v.push(e), "([^/]+)";
                        }).replace(r, "?(?:.*)").replace(i, "/?([^/]+|)") + "$", "" === s(n.path) && "" === s(l)) return {
                            url: l,
                            queryString: p,
                            hashString: u(t.to),
                            route: n,
                            data: null,
                            params: d
                        };
                    } else e = n.path;
                    var g = new RegExp(e, ""), m = l.match(g);
                    if (m) {
                        var y = c(n.path) ? function(t, n) {
                            return 0 === n.length ? null : t ? t.slice(1, t.length).reduce(function(t, e, o) {
                                return null === t && (t = {}), t[n[o]] = decodeURIComponent(e), t;
                            }, null) : null;
                        }(m, v) : m.groups ? m.groups : m.slice(1);
                        return {
                            url: s(l.replace(new RegExp("^" + t.instance.root), "")),
                            queryString: p,
                            hashString: u(t.to),
                            route: n,
                            data: y,
                            params: d
                        };
                    }
                    return !1;
                }
                function p() {
                    return !("undefined" == typeof window || !window.history || !window.history.pushState);
                }
                function d(t, n) {
                    return void 0 === t[n] || !0 === t[n];
                }
                function v() {
                    return "undefined" != typeof window;
                }
                function g(t, n) {
                    return void 0 === t && (t = []), void 0 === n && (n = {}), t.filter(function(t) {
                        return t;
                    }).forEach(function(t) {
                        [
                            "before",
                            "after",
                            "already",
                            "leave"
                        ].forEach(function(e) {
                            t[e] && (n[e] || (n[e] = []), n[e].push(t[e]));
                        });
                    }), n;
                }
                function m(t, n, e) {
                    var o = n || {}, r = 0;
                    !function n() {
                        t[r] ? Array.isArray(t[r]) ? (t.splice.apply(t, [
                            r,
                            1
                        ].concat(t[r][0](o) ? t[r][1] : t[r][2])), n()) : t[r](o, function(t) {
                            void 0 === t || !0 === t ? (r += 1, n()) : e && e(o);
                        }) : e && e(o);
                    }();
                }
                function y(t, n) {
                    void 0 === t.currentLocationPath && (t.currentLocationPath = t.to = a(t.instance.root)), t.currentLocationPath = t.instance._checkForAHash(t.currentLocationPath), n();
                }
                function _(t, n) {
                    for(var e = 0; e < t.instance.routes.length; e++){
                        var o = l(t, t.instance.routes[e]);
                        if (o && (t.matches || (t.matches = []), t.matches.push(o), "ONE" === t.resolveOptions.strategy)) return void n();
                    }
                    n();
                }
                function k(t, n) {
                    t.navigateOptions && (void 0 !== t.navigateOptions.shouldResolve && console.warn('"shouldResolve" is deprecated. Please check the documentation.'), void 0 !== t.navigateOptions.silent && console.warn('"silent" is deprecated. Please check the documentation.')), n();
                }
                function O(t, n) {
                    !0 === t.navigateOptions.force ? (t.instance._setCurrent([
                        t.instance._pathToMatchObject(t.to)
                    ]), n(!1)) : n();
                }
                m.if = function(t, n, e) {
                    return Array.isArray(n) || (n = [
                        n
                    ]), Array.isArray(e) || (e = [
                        e
                    ]), [
                        t,
                        n,
                        e
                    ];
                };
                var w = v(), L = p();
                function b(t, n) {
                    if (d(t.navigateOptions, "updateBrowserURL")) {
                        var e = ("/" + t.to).replace(/\/\//g, "/"), o = w && t.resolveOptions && !0 === t.resolveOptions.hash;
                        L ? (history[t.navigateOptions.historyAPIMethod || "pushState"](t.navigateOptions.stateObj || {}, t.navigateOptions.title || "", o ? "#" + e : e), location && location.hash && (t.instance.__freezeListening = !0, setTimeout(function() {
                            if (!o) {
                                var n = location.hash;
                                location.hash = "", location.hash = n;
                            }
                            t.instance.__freezeListening = !1;
                        }, 1))) : w && (window.location.href = t.to);
                    }
                    n();
                }
                function A(t, n) {
                    var e = t.instance;
                    e.lastResolved() ? m(e.lastResolved().map(function(n) {
                        return function(e, o) {
                            if (n.route.hooks && n.route.hooks.leave) {
                                var r = !1, i = t.instance.matchLocation(n.route.path, t.currentLocationPath, !1);
                                r = "*" !== n.route.path ? !i : !(t.matches && t.matches.find(function(t) {
                                    return n.route.path === t.route.path;
                                })), d(t.navigateOptions, "callHooks") && r ? m(n.route.hooks.leave.map(function(n) {
                                    return function(e, o) {
                                        return n(function(n) {
                                            !1 === n ? t.instance.__markAsClean(t) : o();
                                        }, t.matches && t.matches.length > 0 ? 1 === t.matches.length ? t.matches[0] : t.matches : void 0);
                                    };
                                }).concat([
                                    function() {
                                        return o();
                                    }
                                ])) : o();
                            } else o();
                        };
                    }), {}, function() {
                        return n();
                    }) : n();
                }
                function P(t, n) {
                    d(t.navigateOptions, "updateState") && t.instance._setCurrent(t.matches), n();
                }
                var R = [
                    function(t, n) {
                        var e = t.instance.lastResolved();
                        if (e && e[0] && e[0].route === t.match.route && e[0].url === t.match.url && e[0].queryString === t.match.queryString) return e.forEach(function(n) {
                            n.route.hooks && n.route.hooks.already && d(t.navigateOptions, "callHooks") && n.route.hooks.already.forEach(function(n) {
                                return n(t.match);
                            });
                        }), void n(!1);
                        n();
                    },
                    function(t, n) {
                        t.match.route.hooks && t.match.route.hooks.before && d(t.navigateOptions, "callHooks") ? m(t.match.route.hooks.before.map(function(n) {
                            return function(e, o) {
                                return n(function(n) {
                                    !1 === n ? t.instance.__markAsClean(t) : o();
                                }, t.match);
                            };
                        }).concat([
                            function() {
                                return n();
                            }
                        ])) : n();
                    },
                    function(t, n) {
                        d(t.navigateOptions, "callHandler") && t.match.route.handler(t.match), t.instance.updatePageLinks(), n();
                    },
                    function(t, n) {
                        t.match.route.hooks && t.match.route.hooks.after && d(t.navigateOptions, "callHooks") && t.match.route.hooks.after.forEach(function(n) {
                            return n(t.match);
                        }), n();
                    }
                ], S = [
                    A,
                    function(t, n) {
                        var e = t.instance._notFoundRoute;
                        if (e) {
                            t.notFoundHandled = !0;
                            var o = h(t.currentLocationPath), r = o[0], i = o[1], a = u(t.to);
                            e.path = s(r);
                            var c = {
                                url: e.path,
                                queryString: i,
                                hashString: a,
                                data: null,
                                route: e,
                                params: "" !== i ? f(i) : null
                            };
                            t.matches = [
                                c
                            ], t.match = c;
                        }
                        n();
                    },
                    m.if(function(t) {
                        return t.notFoundHandled;
                    }, R.concat([
                        P
                    ]), [
                        function(t, n) {
                            t.resolveOptions && !1 !== t.resolveOptions.noMatchWarning && void 0 !== t.resolveOptions.noMatchWarning || console.warn('Navigo: "' + t.currentLocationPath + "\" didn't match any of the registered routes."), n();
                        },
                        function(t, n) {
                            t.instance._setCurrent(null), n();
                        }
                    ])
                ];
                function E() {
                    return (E = Object.assign || function(t) {
                        for(var n = 1; n < arguments.length; n++){
                            var e = arguments[n];
                            for(var o in e)Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        }
                        return t;
                    }).apply(this, arguments);
                }
                function x(t, n) {
                    var e = 0;
                    A(t, function o() {
                        e !== t.matches.length ? m(R, E({}, t, {
                            match: t.matches[e]
                        }), function() {
                            e += 1, o();
                        }) : P(t, n);
                    });
                }
                function H(t) {
                    t.instance.__markAsClean(t);
                }
                function j() {
                    return (j = Object.assign || function(t) {
                        for(var n = 1; n < arguments.length; n++){
                            var e = arguments[n];
                            for(var o in e)Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        }
                        return t;
                    }).apply(this, arguments);
                }
                var C = "[data-navigo]";
                function N(t, n) {
                    var e, o = n || {
                        strategy: "ONE",
                        hash: !1,
                        noMatchWarning: !1,
                        linksSelector: C
                    }, r = this, i = "/", d = null, w = [], L = !1, A = p(), P = v();
                    function R(t) {
                        return t.indexOf("#") >= 0 && (t = !0 === o.hash ? t.split("#")[1] || "/" : t.split("#")[0]), t;
                    }
                    function E(t) {
                        return s(i + "/" + s(t));
                    }
                    function N(t, n, e, o) {
                        return t = c(t) ? E(t) : t, {
                            name: o || s(String(t)),
                            path: t,
                            handler: n,
                            hooks: g(e)
                        };
                    }
                    function U(t, n) {
                        if (!r.__dirty) {
                            r.__dirty = !0, t = t ? s(i) + "/" + s(t) : void 0;
                            var e = {
                                instance: r,
                                to: t,
                                currentLocationPath: t,
                                navigateOptions: {},
                                resolveOptions: j({}, o, n)
                            };
                            return m([
                                y,
                                _,
                                m.if(function(t) {
                                    var n = t.matches;
                                    return n && n.length > 0;
                                }, x, S)
                            ], e, H), !!e.matches && e.matches;
                        }
                        r.__waiting.push(function() {
                            return r.resolve(t, n);
                        });
                    }
                    function q(t, n) {
                        if (r.__dirty) r.__waiting.push(function() {
                            return r.navigate(t, n);
                        });
                        else {
                            r.__dirty = !0, t = s(i) + "/" + s(t);
                            var e = {
                                instance: r,
                                to: t,
                                navigateOptions: n || {},
                                resolveOptions: n && n.resolveOptions ? n.resolveOptions : o,
                                currentLocationPath: R(t)
                            };
                            m([
                                k,
                                O,
                                _,
                                m.if(function(t) {
                                    var n = t.matches;
                                    return n && n.length > 0;
                                }, x, S),
                                b,
                                H
                            ], e, H);
                        }
                    }
                    function F() {
                        if (P) return (P ? [].slice.call(document.querySelectorAll(o.linksSelector || C)) : []).forEach(function(t) {
                            "false" !== t.getAttribute("data-navigo") && "_blank" !== t.getAttribute("target") ? t.hasListenerAttached || (t.hasListenerAttached = !0, t.navigoHandler = function(n) {
                                if ((n.ctrlKey || n.metaKey) && "a" === n.target.tagName.toLowerCase()) return !1;
                                var e = t.getAttribute("href");
                                if (null == e) return !1;
                                if (e.match(/^(http|https)/) && "undefined" != typeof URL) try {
                                    var o = new URL(e);
                                    e = o.pathname + o.search;
                                } catch (t) {}
                                var i = function(t) {
                                    if (!t) return {};
                                    var n, e = t.split(","), o = {};
                                    return e.forEach(function(t) {
                                        var e = t.split(":").map(function(t) {
                                            return t.replace(/(^ +| +$)/g, "");
                                        });
                                        switch(e[0]){
                                            case "historyAPIMethod":
                                                o.historyAPIMethod = e[1];
                                                break;
                                            case "resolveOptionsStrategy":
                                                n || (n = {}), n.strategy = e[1];
                                                break;
                                            case "resolveOptionsHash":
                                                n || (n = {}), n.hash = "true" === e[1];
                                                break;
                                            case "updateBrowserURL":
                                            case "callHandler":
                                            case "updateState":
                                            case "force":
                                                o[e[0]] = "true" === e[1];
                                        }
                                    }), n && (o.resolveOptions = n), o;
                                }(t.getAttribute("data-navigo-options"));
                                L || (n.preventDefault(), n.stopPropagation(), r.navigate(s(e), i));
                            }, t.addEventListener("click", t.navigoHandler)) : t.hasListenerAttached && t.removeEventListener("click", t.navigoHandler);
                        }), r;
                    }
                    function I(t, n, e) {
                        var o = w.find(function(n) {
                            return n.name === t;
                        }), r = null;
                        if (o) {
                            if (r = o.path, n) for(var a in n)r = r.replace(":" + a, n[a]);
                            r = r.match(/^\//) ? r : "/" + r;
                        }
                        return r && e && !e.includeRoot && (r = r.replace(new RegExp("^/" + i), "")), r;
                    }
                    function M(t) {
                        var n = h(s(t)), o = n[0], r = n[1], i = "" === r ? null : f(r);
                        return {
                            url: o,
                            queryString: r,
                            hashString: u(t),
                            route: N(o, function() {}, [
                                e
                            ], o),
                            data: null,
                            params: i
                        };
                    }
                    function T(t, n, e) {
                        return "string" == typeof n && (n = z(n)), n ? (n.hooks[t] || (n.hooks[t] = []), n.hooks[t].push(e), function() {
                            n.hooks[t] = n.hooks[t].filter(function(t) {
                                return t !== e;
                            });
                        }) : (console.warn("Route doesn't exists: " + n), function() {});
                    }
                    function z(t) {
                        return "string" == typeof t ? w.find(function(n) {
                            return n.name === E(t);
                        }) : w.find(function(n) {
                            return n.handler === t;
                        });
                    }
                    t ? i = s(t) : console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.'), this.root = i, this.routes = w, this.destroyed = L, this.current = d, this.__freezeListening = !1, this.__waiting = [], this.__dirty = !1, this.__markAsClean = function(t) {
                        t.instance.__dirty = !1, t.instance.__waiting.length > 0 && t.instance.__waiting.shift()();
                    }, this.on = function(t, n, o) {
                        var r = this;
                        return "object" != typeof t || t instanceof RegExp ? ("function" == typeof t && (o = n, n = t, t = i), w.push(N(t, n, [
                            e,
                            o
                        ])), this) : (Object.keys(t).forEach(function(n) {
                            if ("function" == typeof t[n]) r.on(n, t[n]);
                            else {
                                var o = t[n], i = o.uses, a = o.as, s = o.hooks;
                                w.push(N(n, i, [
                                    e,
                                    s
                                ], a));
                            }
                        }), this);
                    }, this.off = function(t) {
                        return this.routes = w = w.filter(function(n) {
                            return c(t) ? s(n.path) !== s(t) : "function" == typeof t ? t !== n.handler : String(n.path) !== String(t);
                        }), this;
                    }, this.resolve = U, this.navigate = q, this.navigateByName = function(t, n, e) {
                        var o = I(t, n);
                        return null !== o && (q(o.replace(new RegExp("^/?" + i), ""), e), !0);
                    }, this.destroy = function() {
                        this.routes = w = [], A && window.removeEventListener("popstate", this.__popstateListener), this.destroyed = L = !0;
                    }, this.notFound = function(t, n) {
                        return r._notFoundRoute = N("*", t, [
                            e,
                            n
                        ], "__NOT_FOUND__"), this;
                    }, this.updatePageLinks = F, this.link = function(t) {
                        return "/" + i + "/" + s(t);
                    }, this.hooks = function(t) {
                        return e = t, this;
                    }, this.extractGETParameters = function(t) {
                        return h(R(t));
                    }, this.lastResolved = function() {
                        return d;
                    }, this.generate = I, this.getLinkPath = function(t) {
                        return t.getAttribute("href");
                    }, this.match = function(t) {
                        var n = {
                            instance: r,
                            currentLocationPath: t,
                            to: t,
                            navigateOptions: {},
                            resolveOptions: o
                        };
                        return _(n, function() {}), !!n.matches && n.matches;
                    }, this.matchLocation = function(t, n, e) {
                        void 0 === n || void 0 !== e && !e || (n = E(n));
                        var o = {
                            instance: r,
                            to: n,
                            currentLocationPath: n
                        };
                        return y(o, function() {}), "string" == typeof t && (t = void 0 === e || e ? E(t) : t), l(o, {
                            name: String(t),
                            path: t,
                            handler: function() {},
                            hooks: {}
                        }) || !1;
                    }, this.getCurrentLocation = function() {
                        return M(s(a(i)).replace(new RegExp("^" + i), ""));
                    }, this.addBeforeHook = T.bind(this, "before"), this.addAfterHook = T.bind(this, "after"), this.addAlreadyHook = T.bind(this, "already"), this.addLeaveHook = T.bind(this, "leave"), this.getRoute = z, this._pathToMatchObject = M, this._clean = s, this._checkForAHash = R, this._setCurrent = function(t) {
                        return d = r.current = t;
                    }, (function() {
                        A && (this.__popstateListener = function() {
                            r.__freezeListening || U();
                        }, window.addEventListener("popstate", this.__popstateListener));
                    }).call(this), F.call(this);
                }
            }
        }, n = {};
        function e(o) {
            if (n[o]) return n[o].exports;
            var r = n[o] = {
                exports: {}
            };
            return t[o](r, r.exports, e), r.exports;
        }
        return e.d = function(t, n) {
            for(var o in n)e.o(n, o) && !e.o(t, o) && Object.defineProperty(t, o, {
                enumerable: !0,
                get: n[o]
            });
        }, e.o = function(t, n) {
            return Object.prototype.hasOwnProperty.call(t, n);
        }, e(407);
    }().default;
});

},{}]},["eZFTg","9Fk10"], "9Fk10", "parcelRequiree1d7", {})

//# sourceMappingURL=spa.c9112ede.js.map
