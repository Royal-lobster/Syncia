(function(define){var __define; typeof define === "function" && (__define=define,define=null);
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
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

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
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
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

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

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"aUyBn":[function(require,module,exports) {
var u = typeof globalThis.process < "u" ? globalThis.process.argv : [];
var h = ()=>typeof globalThis.process < "u" ? globalThis.process.env : {};
var B = new Set(u), _ = (e)=>B.has(e), G = u.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var U = _("--dry-run"), g = ()=>_("--verbose") || h().VERBOSE === "true", N = g();
var m = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var y = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), b = (...e)=>m("\uD83D\uDD35 INFO", ...e), f = (...e)=>m("\uD83D\uDFE0 WARN", ...e), M = 0, i = (...e)=>g() && m(`\u{1F7E1} ${M++}`, ...e);
var v = ()=>{
    let e = globalThis.browser?.runtime || globalThis.chrome?.runtime, t = ()=>setInterval(e.getPlatformInfo, 24e3);
    e.onStartup.addListener(t), t();
};
var n = {
    "isContentScript": false,
    "isBackground": true,
    "isReact": false,
    "runtimes": [
        "background-service-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "/Users/srujangurram/Projects/personal/Syncia/.plasmo/static/background/index.ts",
    "bundleId": "c338908e704c91f1",
    "envHash": "d99a5ffa57acd638",
    "verbose": "false",
    "secure": false,
    "serverPort": 52665
};
module.bundle.HMR_BUNDLE_ID = n.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: n.verbose
    }
};
var D = module.bundle.Module;
function H(e) {
    D.call(this, e), this.hot = {
        data: module.bundle.hotData[e],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData[e] = void 0;
}
module.bundle.Module = H;
module.bundle.hotData = {};
var c = globalThis.browser || globalThis.chrome || null;
function R() {
    return !n.host || n.host === "0.0.0.0" ? location.protocol.indexOf("http") === 0 ? location.hostname : "localhost" : n.host;
}
function x() {
    return !n.host || n.host === "0.0.0.0" ? "localhost" : n.host;
}
function d() {
    return n.port || location.port;
}
var P = "__plasmo_runtime_page_", S = "__plasmo_runtime_script_";
var O = `${n.secure ? "https" : "http"}://${R()}:${d()}/`;
async function k(e = 1470) {
    for(;;)try {
        await fetch(O);
        break;
    } catch  {
        await new Promise((o)=>setTimeout(o, e));
    }
}
if (c.runtime.getManifest().manifest_version === 3) {
    let e = c.runtime.getURL("/__plasmo_hmr_proxy__?url=");
    globalThis.addEventListener("fetch", function(t) {
        let o = t.request.url;
        if (o.startsWith(e)) {
            let s = new URL(decodeURIComponent(o.slice(e.length)));
            s.hostname === n.host && s.port === `${n.port}` ? (s.searchParams.set("t", Date.now().toString()), t.respondWith(fetch(s).then((r)=>new Response(r.body, {
                    headers: {
                        "Content-Type": r.headers.get("Content-Type") ?? "text/javascript"
                    }
                })))) : t.respondWith(new Response("Plasmo HMR", {
                status: 200,
                statusText: "Testing"
            }));
        }
    });
}
function E(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function C(e = d()) {
    let t = x();
    return `${n.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function T(e) {
    typeof e.message == "string" && y("[plasmo/parcel-runtime]: " + e.message);
}
function L(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C(Number(d()) + 1));
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        await e(s);
    }), t.addEventListener("error", T), t;
}
function A(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C());
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        if (s.type === "update" && await e(s.assets), s.type === "error") for (let r of s.diagnostics.ansi){
            let l = r.codeframe || r.stack;
            f("[plasmo/parcel-runtime]: " + r.message + `
` + l + `

` + r.hints.join(`
`));
        }
    }), t.addEventListener("error", T), t.addEventListener("open", ()=>{
        b(`[plasmo/parcel-runtime]: Connected to HMR server for ${n.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        f(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${n.entryFilePath}`);
    }), t;
}
var w = module.bundle.parent, a = {
    buildReady: !1,
    bgChanged: !1,
    csChanged: !1,
    pageChanged: !1,
    scriptPorts: new Set,
    pagePorts: new Set
};
async function p(e = !1) {
    if (e || a.buildReady && a.pageChanged) {
        i("BGSW Runtime - reloading Page");
        for (let t of a.pagePorts)t.postMessage(null);
    }
    if (e || a.buildReady && (a.bgChanged || a.csChanged)) {
        i("BGSW Runtime - reloading CS");
        let t = await c?.tabs.query({
            active: !0
        });
        for (let o of a.scriptPorts){
            let s = t.some((r)=>r.id === o.sender.tab?.id);
            o.postMessage({
                __plasmo_cs_active_tab__: s
            });
        }
        c.runtime.reload();
    }
}
if (!w || !w.isParcelRequire) {
    v();
    let e = A(async (t)=>{
        i("BGSW Runtime - On HMR Update"), a.bgChanged ||= t.filter((s)=>s.envHash === n.envHash).some((s)=>E(module.bundle, s.id));
        let o = t.find((s)=>s.type === "json");
        if (o) {
            let s = new Set(t.map((l)=>l.id)), r = Object.values(o.depsByBundle).map((l)=>Object.values(l)).flat();
            a.bgChanged ||= r.every((l)=>s.has(l));
        }
        p();
    });
    e.addEventListener("open", ()=>{
        let t = setInterval(()=>e.send("ping"), 24e3);
        e.addEventListener("close", ()=>clearInterval(t));
    }), e.addEventListener("close", async ()=>{
        await k(), p(!0);
    });
}
L(async (e)=>{
    switch(i("BGSW Runtime - On Build Repackaged"), e.type){
        case "build_ready":
            a.buildReady ||= !0, p();
            break;
        case "cs_changed":
            a.csChanged ||= !0, p();
            break;
    }
});
c.runtime.onConnect.addListener(function(e) {
    let t = e.name.startsWith(P), o = e.name.startsWith(S);
    if (t || o) {
        let s = t ? a.pagePorts : a.scriptPorts;
        s.add(e), e.onDisconnect.addListener(()=>{
            s.delete(e);
        }), e.onMessage.addListener(function(r) {
            i("BGSW Runtime - On source changed", r), r.__plasmo_cs_changed__ && (a.csChanged ||= !0), r.__plasmo_page_changed__ && (a.pageChanged ||= !0), p();
        });
    }
});
c.runtime.onMessage.addListener(function(t) {
    return t.__plasmo_full_reload__ && (i("BGSW Runtime - On top-level code changed"), p()), !0;
});

},{}],"8oeFb":[function(require,module,exports) {
var _index = require("../../../src/background/index");

},{"../../../src/background/index":"kB65o"}],"kB65o":[function(require,module,exports) {
var _logs = require("~lib/logs");
var _createContextMenu = require("./quick-menu/createContextMenu");
var _forwardContextMenu = require("./quick-menu/forwardContextMenu");
var _sendSidebarShortcut = require("./sidebar/sendSidebarShortcut");
var _sidebarToggleListeners = require("./sidebar/sidebarToggleListeners");
(0, _logs.backgroundLog)();
// =========================== //
// Sidebar Scripts
// =========================== //
(0, _sidebarToggleListeners.sidebarToggleListeners)();
(0, _sendSidebarShortcut.sendSidebarShortcut)();
// =========================== //
// Quick menu Scripts
// =========================== //
(0, _createContextMenu.createContextMenu)();
(0, _forwardContextMenu.forwardContextMenuClicks)();
(0, _createContextMenu.createContextMenuOnStorageChange)();

},{"~lib/logs":"5TVVV","./quick-menu/createContextMenu":"cyuNz","./quick-menu/forwardContextMenu":"5g7K8","./sidebar/sendSidebarShortcut":"6evU9","./sidebar/sidebarToggleListeners":"cf5K4"}],"5TVVV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "contentScriptLog", ()=>contentScriptLog);
parcelHelpers.export(exports, "backgroundLog", ()=>backgroundLog);
const logoText = " ____                   _\n/ ___| _   _ _ __   ___(_) __ _\n\\___ \\| | | | '_ \\ / __| |/ _` |\n ___) | |_| | | | | (__| | (_| |\n|____/ \\__, |_| |_|\\___|_|\\__,_|\n       |___/";
const msgText = (msg)=>`\n${" ".repeat(14 - msg.length / 2)}[${msg}]`;
const contentScriptLog = (item)=>{
    console.log(logoText, msgText(`${item} Script Loaded`));
};
const backgroundLog = ()=>{
    console.log(logoText, msgText("Background Loaded"));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"5G9Z5":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
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

},{}],"cyuNz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createContextMenu", ()=>createContextMenu);
parcelHelpers.export(exports, "createContextMenuOnStorageChange", ()=>createContextMenuOnStorageChange);
var _getStoredPrompts = require("~lib/getStoredPrompts");
const createContextMenu = async ()=>{
    const prompts = await (0, _getStoredPrompts.getStoredPrompts)();
    const contextMenuItems = [];
    // Create text actions context menu
    const createChildContextMenu = (prompts, parentId)=>{
        for (const prompt of prompts){
            contextMenuItems.push({
                id: prompt.id,
                title: prompt.name,
                contexts: [
                    "selection"
                ],
                parentId
            });
            if (prompt.children) createChildContextMenu(prompt.children, prompt.id);
        }
    };
    createChildContextMenu(prompts);
    // Create Settings context menu
    contextMenuItems.push({
        id: "separator",
        type: "separator",
        contexts: [
            "selection"
        ]
    }, {
        id: "settings",
        title: "Settings",
        contexts: [
            "selection"
        ]
    });
    // Before creating the context menu, remove all the existing context menus
    chrome.contextMenus.removeAll();
    // Create context menu
    for (const item of contextMenuItems)chrome.contextMenus.create(item);
};
const createContextMenuOnStorageChange = ()=>{
    chrome.storage.onChanged.addListener(()=>{
        console.log("\uD83D\uDCDD Storage changed");
        createContextMenu();
    });
};

},{"~lib/getStoredPrompts":"6svPz","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"6svPz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getStoredPrompts", ()=>getStoredPrompts);
var _default = require("../config/prompts/default");
const getStoredPrompts = async ()=>{
    const storedPrompts = await getStoredLocalPrompts();
    if (!storedPrompts) chrome.storage.local.set({
        PROMPTS: (0, _default.defaultPrompts)
    }, ()=>{
        console.log("\u2139\ufe0f Default prompts stored from getStoredPrompts.ts");
    });
    return storedPrompts ?? (0, _default.defaultPrompts);
};
const getStoredLocalPrompts = async ()=>{
    const storedLocalPrompts = await new Promise((resolve)=>{
        chrome.storage.local.get("PROMPTS", function(result) {
            resolve(result.PROMPTS);
        });
    });
    return storedLocalPrompts;
};

},{"../config/prompts/default":"1jfPA","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"1jfPA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultPrompts", ()=>defaultPrompts);
var _endent = require("endent");
var _endentDefault = parcelHelpers.interopDefault(_endent);
var _objectHash = require("object-hash");
var _objectHashDefault = parcelHelpers.interopDefault(_objectHash);
const prompts = [
    {
        name: "Review Selection",
        children: [
            {
                name: "Summarize",
                prompt: (0, _endentDefault.default)`
          Read the following text and summarize it in less than half the original length.
        `
            },
            {
                name: "key takeaways",
                prompt: (0, _endentDefault.default)`
          Read the following text and identify the key takeaways in list format.
        `
            },
            {
                name: "Questions",
                prompt: (0, _endentDefault.default)`
          Read the following text and identify the key questions that it raises.
        `
            }
        ]
    },
    {
        name: "Edit Selection",
        children: [
            {
                name: "Fix Grammar and Spelling",
                prompt: (0, _endentDefault.default)`
          Read the following text and fix any grammar and spelling mistakes.
        `
            },
            {
                name: "Change Tone",
                children: [
                    {
                        name: "Formal",
                        prompt: (0, _endentDefault.default)`
              Read the following text and make it more formal.
            `
                    },
                    {
                        name: "Informal",
                        prompt: (0, _endentDefault.default)`
              Read the following text and make it more informal.
            `
                    },
                    {
                        name: "Neutral",
                        prompt: (0, _endentDefault.default)`
              Read the following text and make it more neutral.
            `
                    },
                    {
                        name: "Strong",
                        prompt: (0, _endentDefault.default)`
              Read the following text and make it more strong and assertive.
            `
                    }
                ]
            },
            {
                name: "Change Length",
                children: [
                    {
                        name: "Shorter",
                        prompt: (0, _endentDefault.default)`
              Read the following text and make it shorter.
            `
                    },
                    {
                        name: "Longer",
                        prompt: (0, _endentDefault.default)`
              Read the following text and make it longer.
            `
                    }
                ]
            },
            {
                name: "Change Structure",
                children: [
                    {
                        name: "Add Details",
                        prompt: (0, _endentDefault.default)`
              Read the following text and add details to make it more informative.
            `
                    },
                    {
                        name: "Add Examples",
                        prompt: (0, _endentDefault.default)`
              Read the following text and add examples to make it more informative.
            `
                    },
                    {
                        name: "Add Emphasis",
                        prompt: (0, _endentDefault.default)`
              Read the following text and add emphasis to make it more impactful.
            `
                    }
                ]
            }
        ]
    },
    {
        name: "Reply",
        children: [
            {
                name: "Positive",
                prompt: (0, _endentDefault.default)`
          Read the following text and reply to it in a positive way.
        `
            },
            {
                name: "Negative",
                prompt: (0, _endentDefault.default)`
          Read the following text and reply to it in a negative way.
        `
            }
        ]
    }
];
const recursiveAddId = (prompts, _parentId = "")=>{
    return prompts.map((prompt)=>{
        const id = (0, _objectHashDefault.default)(prompt);
        return {
            id,
            ...prompt,
            children: prompt.children ? recursiveAddId(prompt.children, id) : undefined
        };
    });
};
const defaultPrompts = recursiveAddId(prompts);

},{"endent":"fKlKJ","object-hash":"akG96","@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"fKlKJ":[function(require,module,exports) {
"use strict";
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const dedent_1 = __importDefault(require("6268b77c8184e9a6"));
const objectorarray_1 = __importDefault(require("fb73dfddd32ef7ad"));
const fast_json_parse_1 = __importDefault(require("77ec271eabe2169a"));
const ENDENT_ID = "twhZNwxI1aFG3r4";
function endent(strings, ...values) {
    let result = "";
    for(let i = 0; i < strings.length; i++){
        result += strings[i];
        if (i < values.length) {
            let value = values[i];
            let isJson = false;
            if (fast_json_parse_1.default(value).value) {
                value = fast_json_parse_1.default(value).value;
                isJson = true;
            }
            if (value && value[ENDENT_ID] || isJson) {
                let rawlines = result.split("\n");
                let l = rawlines[rawlines.length - 1].search(/\S/);
                let endentation = l > 0 ? " ".repeat(l) : "";
                let valueJson = isJson ? JSON.stringify(value, null, 2) : value[ENDENT_ID];
                let valueLines = valueJson.split("\n");
                valueLines.forEach((l, index)=>{
                    if (index > 0) result += "\n" + endentation + l;
                    else result += l;
                });
            } else if (typeof value === "string" && value.includes("\n")) {
                let endentations = result.match(/(?:^|\n)( *)$/);
                if (typeof value === "string") {
                    let endentation = endentations ? endentations[1] : "";
                    result += value.split("\n").map((str, i)=>{
                        str = ENDENT_ID + str;
                        return i === 0 ? str : `${endentation}${str}`;
                    }).join("\n");
                } else result += value;
            } else result += value;
        }
    }
    result = dedent_1.default(result);
    return result.split(ENDENT_ID).join("");
}
endent.pretty = (data)=>{
    return objectorarray_1.default(data) ? {
        [ENDENT_ID]: JSON.stringify(data, null, 2)
    } : data;
};
exports.default = endent;

},{"6268b77c8184e9a6":"iYdSv","fb73dfddd32ef7ad":"aPf35","77ec271eabe2169a":"0nY8n"}],"iYdSv":[function(require,module,exports) {
"use strict";
function dedent(strings) {
    var raw = void 0;
    if (typeof strings === "string") // dedent can be used as a plain function
    raw = [
        strings
    ];
    else raw = strings.raw;
    // first, perform interpolation
    var result = "";
    for(var i = 0; i < raw.length; i++){
        result += raw[i].// join lines when there is a suppressed newline
        replace(/\\\n[ \t]*/g, "").// handle escaped backticks
        replace(/\\`/g, "`");
        if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) result += arguments.length <= i + 1 ? undefined : arguments[i + 1];
    }
    // now strip indentation
    var lines = result.split("\n");
    var mindent = null;
    lines.forEach(function(l) {
        var m = l.match(/^(\s+)\S+/);
        if (m) {
            var indent = m[1].length;
            if (!mindent) // this is the first indented line
            mindent = indent;
            else mindent = Math.min(mindent, indent);
        }
    });
    if (mindent !== null) result = lines.map(function(l) {
        return l[0] === " " ? l.slice(mindent) : l;
    }).join("\n");
    // dedent eats leading and trailing whitespace too
    result = result.trim();
    // handle escaped newlines at the end to ensure they don't get stripped too
    return result.replace(/\\n/g, "\n");
}
module.exports = dedent;

},{}],"aPf35":[function(require,module,exports) {
module.exports = (val)=>{
    return val != null && typeof val === "object" && val.constructor !== RegExp;
};

},{}],"0nY8n":[function(require,module,exports) {
"use strict";
function Parse(data) {
    if (!(this instanceof Parse)) return new Parse(data);
    this.err = null;
    this.value = null;
    try {
        this.value = JSON.parse(data);
    } catch (err) {
        this.err = err;
    }
}
module.exports = Parse;

},{}],"akG96":[function(require,module,exports) {
!function(e) {
    var t;
    module.exports = e();
}(function() {
    return (function r(o, i, u) {
        function s(n, e) {
            if (!i[n]) {
                if (!o[n]) {
                    var t = undefined;
                    if (!e && t) return t(n, !0);
                    if (a) return a(n, !0);
                    throw new Error("Cannot find module '" + n + "'");
                }
                e = i[n] = {
                    exports: {}
                };
                o[n][0].call(e.exports, function(e) {
                    var t = o[n][1][e];
                    return s(t || e);
                }, e, e.exports, r, o, i, u);
            }
            return i[n].exports;
        }
        for(var a = undefined, e = 0; e < u.length; e++)s(u[e]);
        return s;
    })({
        1: [
            function(w, b, m) {
                (function(e, n, s, c, d, h, p, g, y) {
                    "use strict";
                    var r = w("crypto");
                    function t(e, t) {
                        t = u(e, t);
                        var n;
                        return void 0 === (n = "passthrough" !== t.algorithm ? r.createHash(t.algorithm) : new l).write && (n.write = n.update, n.end = n.update), f(t, n).dispatch(e), n.update || n.end(""), n.digest ? n.digest("buffer" === t.encoding ? void 0 : t.encoding) : (e = n.read(), "buffer" !== t.encoding ? e.toString(t.encoding) : e);
                    }
                    (m = b.exports = t).sha1 = function(e) {
                        return t(e);
                    }, m.keys = function(e) {
                        return t(e, {
                            excludeValues: !0,
                            algorithm: "sha1",
                            encoding: "hex"
                        });
                    }, m.MD5 = function(e) {
                        return t(e, {
                            algorithm: "md5",
                            encoding: "hex"
                        });
                    }, m.keysMD5 = function(e) {
                        return t(e, {
                            algorithm: "md5",
                            encoding: "hex",
                            excludeValues: !0
                        });
                    };
                    var o = r.getHashes ? r.getHashes().slice() : [
                        "sha1",
                        "md5"
                    ], i = (o.push("passthrough"), [
                        "buffer",
                        "hex",
                        "binary",
                        "base64"
                    ]);
                    function u(e, t) {
                        var n = {};
                        if (n.algorithm = (t = t || {}).algorithm || "sha1", n.encoding = t.encoding || "hex", n.excludeValues = !!t.excludeValues, n.algorithm = n.algorithm.toLowerCase(), n.encoding = n.encoding.toLowerCase(), n.ignoreUnknown = !0 === t.ignoreUnknown, n.respectType = !1 !== t.respectType, n.respectFunctionNames = !1 !== t.respectFunctionNames, n.respectFunctionProperties = !1 !== t.respectFunctionProperties, n.unorderedArrays = !0 === t.unorderedArrays, n.unorderedSets = !1 !== t.unorderedSets, n.unorderedObjects = !1 !== t.unorderedObjects, n.replacer = t.replacer || void 0, n.excludeKeys = t.excludeKeys || void 0, void 0 === e) throw new Error("Object argument required.");
                        for(var r = 0; r < o.length; ++r)o[r].toLowerCase() === n.algorithm.toLowerCase() && (n.algorithm = o[r]);
                        if (-1 === o.indexOf(n.algorithm)) throw new Error('Algorithm "' + n.algorithm + '"  not supported. supported values: ' + o.join(", "));
                        if (-1 === i.indexOf(n.encoding) && "passthrough" !== n.algorithm) throw new Error('Encoding "' + n.encoding + '"  not supported. supported values: ' + i.join(", "));
                        return n;
                    }
                    function a(e) {
                        if ("function" == typeof e) return null != /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e));
                    }
                    function f(o, t, i) {
                        i = i || [];
                        function u(e) {
                            return t.update ? t.update(e, "utf8") : t.write(e, "utf8");
                        }
                        return {
                            dispatch: function(e) {
                                return this["_" + (null === (e = o.replacer ? o.replacer(e) : e) ? "null" : typeof e)](e);
                            },
                            _object: function(t) {
                                var n, e = Object.prototype.toString.call(t), r = /\[object (.*)\]/i.exec(e);
                                r = (r = r ? r[1] : "unknown:[" + e + "]").toLowerCase();
                                if (0 <= (e = i.indexOf(t))) return this.dispatch("[CIRCULAR:" + e + "]");
                                if (i.push(t), void 0 !== s && s.isBuffer && s.isBuffer(t)) return u("buffer:"), u(t);
                                if ("object" === r || "function" === r || "asyncfunction" === r) return e = Object.keys(t), o.unorderedObjects && (e = e.sort()), !1 === o.respectType || a(t) || e.splice(0, 0, "prototype", "__proto__", "constructor"), o.excludeKeys && (e = e.filter(function(e) {
                                    return !o.excludeKeys(e);
                                })), u("object:" + e.length + ":"), n = this, e.forEach(function(e) {
                                    n.dispatch(e), u(":"), o.excludeValues || n.dispatch(t[e]), u(",");
                                });
                                if (!this["_" + r]) {
                                    if (o.ignoreUnknown) return u("[" + r + "]");
                                    throw new Error('Unknown object type "' + r + '"');
                                }
                                this["_" + r](t);
                            },
                            _array: function(e, t) {
                                t = void 0 !== t ? t : !1 !== o.unorderedArrays;
                                var n = this;
                                if (u("array:" + e.length + ":"), !t || e.length <= 1) return e.forEach(function(e) {
                                    return n.dispatch(e);
                                });
                                var r = [], t = e.map(function(e) {
                                    var t = new l, n = i.slice();
                                    return f(o, t, n).dispatch(e), r = r.concat(n.slice(i.length)), t.read().toString();
                                });
                                return i = i.concat(r), t.sort(), this._array(t, !1);
                            },
                            _date: function(e) {
                                return u("date:" + e.toJSON());
                            },
                            _symbol: function(e) {
                                return u("symbol:" + e.toString());
                            },
                            _error: function(e) {
                                return u("error:" + e.toString());
                            },
                            _boolean: function(e) {
                                return u("bool:" + e.toString());
                            },
                            _string: function(e) {
                                u("string:" + e.length + ":"), u(e.toString());
                            },
                            _function: function(e) {
                                u("fn:"), a(e) ? this.dispatch("[native]") : this.dispatch(e.toString()), !1 !== o.respectFunctionNames && this.dispatch("function-name:" + String(e.name)), o.respectFunctionProperties && this._object(e);
                            },
                            _number: function(e) {
                                return u("number:" + e.toString());
                            },
                            _xml: function(e) {
                                return u("xml:" + e.toString());
                            },
                            _null: function() {
                                return u("Null");
                            },
                            _undefined: function() {
                                return u("Undefined");
                            },
                            _regexp: function(e) {
                                return u("regex:" + e.toString());
                            },
                            _uint8array: function(e) {
                                return u("uint8array:"), this.dispatch(Array.prototype.slice.call(e));
                            },
                            _uint8clampedarray: function(e) {
                                return u("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(e));
                            },
                            _int8array: function(e) {
                                return u("int8array:"), this.dispatch(Array.prototype.slice.call(e));
                            },
                            _uint16array: function(e) {
                                return u("uint16array:"), this.dispatch(Array.prototype.slice.call(e));
                            },
                            _int16array: function(e) {
                                return u("int16array:"), this.dispatch(Array.prototype.slice.call(e));
                            },
                            _uint32array: function(e) {
                                return u("uint32array:"), this.dispatch(Array.prototype.slice.call(e));
                            },
                            _int32array: function(e) {
                                return u("int32array:"), this.dispatch(Array.prototype.slice.call(e));
                            },
                            _float32array: function(e) {
                                return u("float32array:"), this.dispatch(Array.prototype.slice.call(e));
                            },
                            _float64array: function(e) {
                                return u("float64array:"), this.dispatch(Array.prototype.slice.call(e));
                            },
                            _arraybuffer: function(e) {
                                return u("arraybuffer:"), this.dispatch(new Uint8Array(e));
                            },
                            _url: function(e) {
                                return u("url:" + e.toString());
                            },
                            _map: function(e) {
                                u("map:");
                                e = Array.from(e);
                                return this._array(e, !1 !== o.unorderedSets);
                            },
                            _set: function(e) {
                                u("set:");
                                e = Array.from(e);
                                return this._array(e, !1 !== o.unorderedSets);
                            },
                            _file: function(e) {
                                return u("file:"), this.dispatch([
                                    e.name,
                                    e.size,
                                    e.type,
                                    e.lastModfied
                                ]);
                            },
                            _blob: function() {
                                if (o.ignoreUnknown) return u("[blob]");
                                throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n');
                            },
                            _domwindow: function() {
                                return u("domwindow");
                            },
                            _bigint: function(e) {
                                return u("bigint:" + e.toString());
                            },
                            _process: function() {
                                return u("process");
                            },
                            _timer: function() {
                                return u("timer");
                            },
                            _pipe: function() {
                                return u("pipe");
                            },
                            _tcp: function() {
                                return u("tcp");
                            },
                            _udp: function() {
                                return u("udp");
                            },
                            _tty: function() {
                                return u("tty");
                            },
                            _statwatcher: function() {
                                return u("statwatcher");
                            },
                            _securecontext: function() {
                                return u("securecontext");
                            },
                            _connection: function() {
                                return u("connection");
                            },
                            _zlib: function() {
                                return u("zlib");
                            },
                            _context: function() {
                                return u("context");
                            },
                            _nodescript: function() {
                                return u("nodescript");
                            },
                            _httpparser: function() {
                                return u("httpparser");
                            },
                            _dataview: function() {
                                return u("dataview");
                            },
                            _signal: function() {
                                return u("signal");
                            },
                            _fsevent: function() {
                                return u("fsevent");
                            },
                            _tlswrap: function() {
                                return u("tlswrap");
                            }
                        };
                    }
                    function l() {
                        return {
                            buf: "",
                            write: function(e) {
                                this.buf += e;
                            },
                            end: function(e) {
                                this.buf += e;
                            },
                            read: function() {
                                return this.buf;
                            }
                        };
                    }
                    m.writeToStream = function(e, t, n) {
                        return void 0 === n && (n = t, t = {}), f(t = u(e, t), n).dispatch(e);
                    };
                }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_9a5aa49d.js", "/");
            },
            {
                buffer: 3,
                crypto: 5,
                lYpoI2: 11
            }
        ],
        2: [
            function(e, t, f) {
                (function(e, t, n, r, o, i, u, s, a) {
                    !function(e) {
                        "use strict";
                        var a = "undefined" != typeof Uint8Array ? Uint8Array : Array, t = "+".charCodeAt(0), n = "/".charCodeAt(0), r = "0".charCodeAt(0), o = "a".charCodeAt(0), i = "A".charCodeAt(0), u = "-".charCodeAt(0), s = "_".charCodeAt(0);
                        function f(e) {
                            e = e.charCodeAt(0);
                            return e === t || e === u ? 62 : e === n || e === s ? 63 : e < r ? -1 : e < r + 10 ? e - r + 26 + 26 : e < i + 26 ? e - i : e < o + 26 ? e - o + 26 : void 0;
                        }
                        e.toByteArray = function(e) {
                            var t, n;
                            if (0 < e.length % 4) throw new Error("Invalid string. Length must be a multiple of 4");
                            var r = e.length, r = "=" === e.charAt(r - 2) ? 2 : "=" === e.charAt(r - 1) ? 1 : 0, o = new a(3 * e.length / 4 - r), i = 0 < r ? e.length - 4 : e.length, u = 0;
                            function s(e) {
                                o[u++] = e;
                            }
                            for(t = 0; t < i; t += 4)s((16711680 & (n = f(e.charAt(t)) << 18 | f(e.charAt(t + 1)) << 12 | f(e.charAt(t + 2)) << 6 | f(e.charAt(t + 3)))) >> 16), s((65280 & n) >> 8), s(255 & n);
                            return 2 == r ? s(255 & (n = f(e.charAt(t)) << 2 | f(e.charAt(t + 1)) >> 4)) : 1 == r && (s((n = f(e.charAt(t)) << 10 | f(e.charAt(t + 1)) << 4 | f(e.charAt(t + 2)) >> 2) >> 8 & 255), s(255 & n)), o;
                        }, e.fromByteArray = function(e) {
                            var t, n, r, o, i = e.length % 3, u = "";
                            function s(e) {
                                return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e);
                            }
                            for(t = 0, r = e.length - i; t < r; t += 3)n = (e[t] << 16) + (e[t + 1] << 8) + e[t + 2], u += s((o = n) >> 18 & 63) + s(o >> 12 & 63) + s(o >> 6 & 63) + s(63 & o);
                            switch(i){
                                case 1:
                                    u = (u += s((n = e[e.length - 1]) >> 2)) + s(n << 4 & 63) + "==";
                                    break;
                                case 2:
                                    u = (u = (u += s((n = (e[e.length - 2] << 8) + e[e.length - 1]) >> 10)) + s(n >> 4 & 63)) + s(n << 2 & 63) + "=";
                            }
                            return u;
                        };
                    }(void 0 === f ? this.base64js = {} : f);
                }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib");
            },
            {
                buffer: 3,
                lYpoI2: 11
            }
        ],
        3: [
            function(O, e, H) {
                (function(e, n, f, r, h, p, g, y, w) {
                    var a = O("base64-js"), i = O("ieee754");
                    function f(e, t, n) {
                        if (!(this instanceof f)) return new f(e, t, n);
                        var r, o, i, u, s = typeof e;
                        if ("base64" === t && "string" == s) for(e = (u = e).trim ? u.trim() : u.replace(/^\s+|\s+$/g, ""); e.length % 4 != 0;)e += "=";
                        if ("number" == s) r = j(e);
                        else if ("string" == s) r = f.byteLength(e, t);
                        else {
                            if ("object" != s) throw new Error("First argument needs to be a number, array or string.");
                            r = j(e.length);
                        }
                        if (f._useTypedArrays ? o = f._augment(new Uint8Array(r)) : ((o = this).length = r, o._isBuffer = !0), f._useTypedArrays && "number" == typeof e.byteLength) o._set(e);
                        else if (C(u = e) || f.isBuffer(u) || u && "object" == typeof u && "number" == typeof u.length) for(i = 0; i < r; i++)f.isBuffer(e) ? o[i] = e.readUInt8(i) : o[i] = e[i];
                        else if ("string" == s) o.write(e, 0, t);
                        else if ("number" == s && !f._useTypedArrays && !n) for(i = 0; i < r; i++)o[i] = 0;
                        return o;
                    }
                    function b(e, t, n, r) {
                        return f._charsWritten = c(function(e) {
                            for(var t = [], n = 0; n < e.length; n++)t.push(255 & e.charCodeAt(n));
                            return t;
                        }(t), e, n, r);
                    }
                    function m(e, t, n, r) {
                        return f._charsWritten = c(function(e) {
                            for(var t, n, r = [], o = 0; o < e.length; o++)n = e.charCodeAt(o), t = n >> 8, n = n % 256, r.push(n), r.push(t);
                            return r;
                        }(t), e, n, r);
                    }
                    function v(e, t, n) {
                        var r = "";
                        n = Math.min(e.length, n);
                        for(var o = t; o < n; o++)r += String.fromCharCode(e[o]);
                        return r;
                    }
                    function o(e, t, n, r) {
                        r || (d("boolean" == typeof n, "missing or invalid endian"), d(null != t, "missing offset"), d(t + 1 < e.length, "Trying to read beyond buffer length"));
                        var o, r = e.length;
                        if (!(r <= t)) return n ? (o = e[t], t + 1 < r && (o |= e[t + 1] << 8)) : (o = e[t] << 8, t + 1 < r && (o |= e[t + 1])), o;
                    }
                    function u(e, t, n, r) {
                        r || (d("boolean" == typeof n, "missing or invalid endian"), d(null != t, "missing offset"), d(t + 3 < e.length, "Trying to read beyond buffer length"));
                        var o, r = e.length;
                        if (!(r <= t)) return n ? (t + 2 < r && (o = e[t + 2] << 16), t + 1 < r && (o |= e[t + 1] << 8), o |= e[t], t + 3 < r && (o += e[t + 3] << 24 >>> 0)) : (t + 1 < r && (o = e[t + 1] << 16), t + 2 < r && (o |= e[t + 2] << 8), t + 3 < r && (o |= e[t + 3]), o += e[t] << 24 >>> 0), o;
                    }
                    function _(e, t, n, r) {
                        if (r || (d("boolean" == typeof n, "missing or invalid endian"), d(null != t, "missing offset"), d(t + 1 < e.length, "Trying to read beyond buffer length")), !(e.length <= t)) return r = o(e, t, n, !0), 32768 & r ? -1 * (65535 - r + 1) : r;
                    }
                    function E(e, t, n, r) {
                        if (r || (d("boolean" == typeof n, "missing or invalid endian"), d(null != t, "missing offset"), d(t + 3 < e.length, "Trying to read beyond buffer length")), !(e.length <= t)) return r = u(e, t, n, !0), 2147483648 & r ? -1 * (4294967295 - r + 1) : r;
                    }
                    function I(e, t, n, r) {
                        return r || (d("boolean" == typeof n, "missing or invalid endian"), d(t + 3 < e.length, "Trying to read beyond buffer length")), i.read(e, t, n, 23, 4);
                    }
                    function A(e, t, n, r) {
                        return r || (d("boolean" == typeof n, "missing or invalid endian"), d(t + 7 < e.length, "Trying to read beyond buffer length")), i.read(e, t, n, 52, 8);
                    }
                    function s(e, t, n, r, o) {
                        o || (d(null != t, "missing value"), d("boolean" == typeof r, "missing or invalid endian"), d(null != n, "missing offset"), d(n + 1 < e.length, "trying to write beyond buffer length"), Y(t, 65535));
                        o = e.length;
                        if (!(o <= n)) for(var i = 0, u = Math.min(o - n, 2); i < u; i++)e[n + i] = (t & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i);
                    }
                    function l(e, t, n, r, o) {
                        o || (d(null != t, "missing value"), d("boolean" == typeof r, "missing or invalid endian"), d(null != n, "missing offset"), d(n + 3 < e.length, "trying to write beyond buffer length"), Y(t, 4294967295));
                        o = e.length;
                        if (!(o <= n)) for(var i = 0, u = Math.min(o - n, 4); i < u; i++)e[n + i] = t >>> 8 * (r ? i : 3 - i) & 255;
                    }
                    function B(e, t, n, r, o) {
                        o || (d(null != t, "missing value"), d("boolean" == typeof r, "missing or invalid endian"), d(null != n, "missing offset"), d(n + 1 < e.length, "Trying to write beyond buffer length"), F(t, 32767, -32768)), e.length <= n || s(e, 0 <= t ? t : 65535 + t + 1, n, r, o);
                    }
                    function L(e, t, n, r, o) {
                        o || (d(null != t, "missing value"), d("boolean" == typeof r, "missing or invalid endian"), d(null != n, "missing offset"), d(n + 3 < e.length, "Trying to write beyond buffer length"), F(t, 2147483647, -2147483648)), e.length <= n || l(e, 0 <= t ? t : 4294967295 + t + 1, n, r, o);
                    }
                    function U(e, t, n, r, o) {
                        o || (d(null != t, "missing value"), d("boolean" == typeof r, "missing or invalid endian"), d(null != n, "missing offset"), d(n + 3 < e.length, "Trying to write beyond buffer length"), D(t, 34028234663852886e22, -340282346638528860000000000000000000000)), e.length <= n || i.write(e, t, n, r, 23, 4);
                    }
                    function x(e, t, n, r, o) {
                        o || (d(null != t, "missing value"), d("boolean" == typeof r, "missing or invalid endian"), d(null != n, "missing offset"), d(n + 7 < e.length, "Trying to write beyond buffer length"), D(t, 17976931348623157e292, -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000)), e.length <= n || i.write(e, t, n, r, 52, 8);
                    }
                    H.Buffer = f, H.SlowBuffer = f, H.INSPECT_MAX_BYTES = 50, f.poolSize = 8192, f._useTypedArrays = function() {
                        try {
                            var e = new ArrayBuffer(0), t = new Uint8Array(e);
                            return t.foo = function() {
                                return 42;
                            }, 42 === t.foo() && "function" == typeof t.subarray;
                        } catch (e) {
                            return !1;
                        }
                    }(), f.isEncoding = function(e) {
                        switch(String(e).toLowerCase()){
                            case "hex":
                            case "utf8":
                            case "utf-8":
                            case "ascii":
                            case "binary":
                            case "base64":
                            case "raw":
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return !0;
                            default:
                                return !1;
                        }
                    }, f.isBuffer = function(e) {
                        return !(null == e || !e._isBuffer);
                    }, f.byteLength = function(e, t) {
                        var n;
                        switch(e += "", t || "utf8"){
                            case "hex":
                                n = e.length / 2;
                                break;
                            case "utf8":
                            case "utf-8":
                                n = T(e).length;
                                break;
                            case "ascii":
                            case "binary":
                            case "raw":
                                n = e.length;
                                break;
                            case "base64":
                                n = M(e).length;
                                break;
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                n = 2 * e.length;
                                break;
                            default:
                                throw new Error("Unknown encoding");
                        }
                        return n;
                    }, f.concat = function(e, t) {
                        if (d(C(e), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."), 0 === e.length) return new f(0);
                        if (1 === e.length) return e[0];
                        if ("number" != typeof t) for(o = t = 0; o < e.length; o++)t += e[o].length;
                        for(var n = new f(t), r = 0, o = 0; o < e.length; o++){
                            var i = e[o];
                            i.copy(n, r), r += i.length;
                        }
                        return n;
                    }, f.prototype.write = function(e, t, n, r) {
                        isFinite(t) ? isFinite(n) || (r = n, n = void 0) : (a = r, r = t, t = n, n = a), t = Number(t) || 0;
                        var o, i, u, s, a = this.length - t;
                        switch((!n || a < (n = Number(n))) && (n = a), r = String(r || "utf8").toLowerCase()){
                            case "hex":
                                o = function(e, t, n, r) {
                                    n = Number(n) || 0;
                                    var o = e.length - n;
                                    (!r || o < (r = Number(r))) && (r = o), d((o = t.length) % 2 == 0, "Invalid hex string"), o / 2 < r && (r = o / 2);
                                    for(var i = 0; i < r; i++){
                                        var u = parseInt(t.substr(2 * i, 2), 16);
                                        d(!isNaN(u), "Invalid hex string"), e[n + i] = u;
                                    }
                                    return f._charsWritten = 2 * i, i;
                                }(this, e, t, n);
                                break;
                            case "utf8":
                            case "utf-8":
                                i = this, u = t, s = n, o = f._charsWritten = c(T(e), i, u, s);
                                break;
                            case "ascii":
                            case "binary":
                                o = b(this, e, t, n);
                                break;
                            case "base64":
                                i = this, u = t, s = n, o = f._charsWritten = c(M(e), i, u, s);
                                break;
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                o = m(this, e, t, n);
                                break;
                            default:
                                throw new Error("Unknown encoding");
                        }
                        return o;
                    }, f.prototype.toString = function(e, t, n) {
                        var r, o, i, u, s = this;
                        if (e = String(e || "utf8").toLowerCase(), t = Number(t) || 0, (n = void 0 !== n ? Number(n) : s.length) === t) return "";
                        switch(e){
                            case "hex":
                                r = function(e, t, n) {
                                    var r = e.length;
                                    (!t || t < 0) && (t = 0);
                                    (!n || n < 0 || r < n) && (n = r);
                                    for(var o = "", i = t; i < n; i++)o += k(e[i]);
                                    return o;
                                }(s, t, n);
                                break;
                            case "utf8":
                            case "utf-8":
                                r = function(e, t, n) {
                                    var r = "", o = "";
                                    n = Math.min(e.length, n);
                                    for(var i = t; i < n; i++)e[i] <= 127 ? (r += N(o) + String.fromCharCode(e[i]), o = "") : o += "%" + e[i].toString(16);
                                    return r + N(o);
                                }(s, t, n);
                                break;
                            case "ascii":
                            case "binary":
                                r = v(s, t, n);
                                break;
                            case "base64":
                                o = s, u = n, r = 0 === (i = t) && u === o.length ? a.fromByteArray(o) : a.fromByteArray(o.slice(i, u));
                                break;
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                r = function(e, t, n) {
                                    for(var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2)o += String.fromCharCode(r[i] + 256 * r[i + 1]);
                                    return o;
                                }(s, t, n);
                                break;
                            default:
                                throw new Error("Unknown encoding");
                        }
                        return r;
                    }, f.prototype.toJSON = function() {
                        return {
                            type: "Buffer",
                            data: Array.prototype.slice.call(this._arr || this, 0)
                        };
                    }, f.prototype.copy = function(e, t, n, r) {
                        if (t = t || 0, (r = r || 0 === r ? r : this.length) !== (n = n || 0) && 0 !== e.length && 0 !== this.length) {
                            d(n <= r, "sourceEnd < sourceStart"), d(0 <= t && t < e.length, "targetStart out of bounds"), d(0 <= n && n < this.length, "sourceStart out of bounds"), d(0 <= r && r <= this.length, "sourceEnd out of bounds"), r > this.length && (r = this.length);
                            var o = (r = e.length - t < r - n ? e.length - t + n : r) - n;
                            if (o < 100 || !f._useTypedArrays) for(var i = 0; i < o; i++)e[i + t] = this[i + n];
                            else e._set(this.subarray(n, n + o), t);
                        }
                    }, f.prototype.slice = function(e, t) {
                        var n = this.length;
                        if (e = S(e, n, 0), t = S(t, n, n), f._useTypedArrays) return f._augment(this.subarray(e, t));
                        for(var r = t - e, o = new f(r, void 0, !0), i = 0; i < r; i++)o[i] = this[i + e];
                        return o;
                    }, f.prototype.get = function(e) {
                        return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e);
                    }, f.prototype.set = function(e, t) {
                        return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e, t);
                    }, f.prototype.readUInt8 = function(e, t) {
                        if (t || (d(null != e, "missing offset"), d(e < this.length, "Trying to read beyond buffer length")), !(e >= this.length)) return this[e];
                    }, f.prototype.readUInt16LE = function(e, t) {
                        return o(this, e, !0, t);
                    }, f.prototype.readUInt16BE = function(e, t) {
                        return o(this, e, !1, t);
                    }, f.prototype.readUInt32LE = function(e, t) {
                        return u(this, e, !0, t);
                    }, f.prototype.readUInt32BE = function(e, t) {
                        return u(this, e, !1, t);
                    }, f.prototype.readInt8 = function(e, t) {
                        if (t || (d(null != e, "missing offset"), d(e < this.length, "Trying to read beyond buffer length")), !(e >= this.length)) return 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
                    }, f.prototype.readInt16LE = function(e, t) {
                        return _(this, e, !0, t);
                    }, f.prototype.readInt16BE = function(e, t) {
                        return _(this, e, !1, t);
                    }, f.prototype.readInt32LE = function(e, t) {
                        return E(this, e, !0, t);
                    }, f.prototype.readInt32BE = function(e, t) {
                        return E(this, e, !1, t);
                    }, f.prototype.readFloatLE = function(e, t) {
                        return I(this, e, !0, t);
                    }, f.prototype.readFloatBE = function(e, t) {
                        return I(this, e, !1, t);
                    }, f.prototype.readDoubleLE = function(e, t) {
                        return A(this, e, !0, t);
                    }, f.prototype.readDoubleBE = function(e, t) {
                        return A(this, e, !1, t);
                    }, f.prototype.writeUInt8 = function(e, t, n) {
                        n || (d(null != e, "missing value"), d(null != t, "missing offset"), d(t < this.length, "trying to write beyond buffer length"), Y(e, 255)), t >= this.length || (this[t] = e);
                    }, f.prototype.writeUInt16LE = function(e, t, n) {
                        s(this, e, t, !0, n);
                    }, f.prototype.writeUInt16BE = function(e, t, n) {
                        s(this, e, t, !1, n);
                    }, f.prototype.writeUInt32LE = function(e, t, n) {
                        l(this, e, t, !0, n);
                    }, f.prototype.writeUInt32BE = function(e, t, n) {
                        l(this, e, t, !1, n);
                    }, f.prototype.writeInt8 = function(e, t, n) {
                        n || (d(null != e, "missing value"), d(null != t, "missing offset"), d(t < this.length, "Trying to write beyond buffer length"), F(e, 127, -128)), t >= this.length || (0 <= e ? this.writeUInt8(e, t, n) : this.writeUInt8(255 + e + 1, t, n));
                    }, f.prototype.writeInt16LE = function(e, t, n) {
                        B(this, e, t, !0, n);
                    }, f.prototype.writeInt16BE = function(e, t, n) {
                        B(this, e, t, !1, n);
                    }, f.prototype.writeInt32LE = function(e, t, n) {
                        L(this, e, t, !0, n);
                    }, f.prototype.writeInt32BE = function(e, t, n) {
                        L(this, e, t, !1, n);
                    }, f.prototype.writeFloatLE = function(e, t, n) {
                        U(this, e, t, !0, n);
                    }, f.prototype.writeFloatBE = function(e, t, n) {
                        U(this, e, t, !1, n);
                    }, f.prototype.writeDoubleLE = function(e, t, n) {
                        x(this, e, t, !0, n);
                    }, f.prototype.writeDoubleBE = function(e, t, n) {
                        x(this, e, t, !1, n);
                    }, f.prototype.fill = function(e, t, n) {
                        if (t = t || 0, n = n || this.length, d("number" == typeof (e = "string" == typeof (e = e || 0) ? e.charCodeAt(0) : e) && !isNaN(e), "value is not a number"), d(t <= n, "end < start"), n !== t && 0 !== this.length) {
                            d(0 <= t && t < this.length, "start out of bounds"), d(0 <= n && n <= this.length, "end out of bounds");
                            for(var r = t; r < n; r++)this[r] = e;
                        }
                    }, f.prototype.inspect = function() {
                        for(var e = [], t = this.length, n = 0; n < t; n++)if (e[n] = k(this[n]), n === H.INSPECT_MAX_BYTES) {
                            e[n + 1] = "...";
                            break;
                        }
                        return "<Buffer " + e.join(" ") + ">";
                    }, f.prototype.toArrayBuffer = function() {
                        if ("undefined" == typeof Uint8Array) throw new Error("Buffer.toArrayBuffer not supported in this browser");
                        if (f._useTypedArrays) return new f(this).buffer;
                        for(var e = new Uint8Array(this.length), t = 0, n = e.length; t < n; t += 1)e[t] = this[t];
                        return e.buffer;
                    };
                    var t = f.prototype;
                    function S(e, t, n) {
                        return "number" != typeof e ? n : t <= (e = ~~e) ? t : 0 <= e || 0 <= (e += t) ? e : 0;
                    }
                    function j(e) {
                        return (e = ~~Math.ceil(+e)) < 0 ? 0 : e;
                    }
                    function C(e) {
                        return (Array.isArray || function(e) {
                            return "[object Array]" === Object.prototype.toString.call(e);
                        })(e);
                    }
                    function k(e) {
                        return e < 16 ? "0" + e.toString(16) : e.toString(16);
                    }
                    function T(e) {
                        for(var t = [], n = 0; n < e.length; n++){
                            var r = e.charCodeAt(n);
                            if (r <= 127) t.push(e.charCodeAt(n));
                            else for(var o = n, i = (55296 <= r && r <= 57343 && n++, encodeURIComponent(e.slice(o, n + 1)).substr(1).split("%")), u = 0; u < i.length; u++)t.push(parseInt(i[u], 16));
                        }
                        return t;
                    }
                    function M(e) {
                        return a.toByteArray(e);
                    }
                    function c(e, t, n, r) {
                        for(var o = 0; o < r && !(o + n >= t.length || o >= e.length); o++)t[o + n] = e[o];
                        return o;
                    }
                    function N(e) {
                        try {
                            return decodeURIComponent(e);
                        } catch (e) {
                            return String.fromCharCode(65533);
                        }
                    }
                    function Y(e, t) {
                        d("number" == typeof e, "cannot write a non-number as a number"), d(0 <= e, "specified a negative value for writing an unsigned value"), d(e <= t, "value is larger than maximum value for type"), d(Math.floor(e) === e, "value has a fractional component");
                    }
                    function F(e, t, n) {
                        d("number" == typeof e, "cannot write a non-number as a number"), d(e <= t, "value larger than maximum allowed value"), d(n <= e, "value smaller than minimum allowed value"), d(Math.floor(e) === e, "value has a fractional component");
                    }
                    function D(e, t, n) {
                        d("number" == typeof e, "cannot write a non-number as a number"), d(e <= t, "value larger than maximum allowed value"), d(n <= e, "value smaller than minimum allowed value");
                    }
                    function d(e, t) {
                        if (!e) throw new Error(t || "Failed assertion");
                    }
                    f._augment = function(e) {
                        return e._isBuffer = !0, e._get = e.get, e._set = e.set, e.get = t.get, e.set = t.set, e.write = t.write, e.toString = t.toString, e.toLocaleString = t.toString, e.toJSON = t.toJSON, e.copy = t.copy, e.slice = t.slice, e.readUInt8 = t.readUInt8, e.readUInt16LE = t.readUInt16LE, e.readUInt16BE = t.readUInt16BE, e.readUInt32LE = t.readUInt32LE, e.readUInt32BE = t.readUInt32BE, e.readInt8 = t.readInt8, e.readInt16LE = t.readInt16LE, e.readInt16BE = t.readInt16BE, e.readInt32LE = t.readInt32LE, e.readInt32BE = t.readInt32BE, e.readFloatLE = t.readFloatLE, e.readFloatBE = t.readFloatBE, e.readDoubleLE = t.readDoubleLE, e.readDoubleBE = t.readDoubleBE, e.writeUInt8 = t.writeUInt8, e.writeUInt16LE = t.writeUInt16LE, e.writeUInt16BE = t.writeUInt16BE, e.writeUInt32LE = t.writeUInt32LE, e.writeUInt32BE = t.writeUInt32BE, e.writeInt8 = t.writeInt8, e.writeInt16LE = t.writeInt16LE, e.writeInt16BE = t.writeInt16BE, e.writeInt32LE = t.writeInt32LE, e.writeInt32BE = t.writeInt32BE, e.writeFloatLE = t.writeFloatLE, e.writeFloatBE = t.writeFloatBE, e.writeDoubleLE = t.writeDoubleLE, e.writeDoubleBE = t.writeDoubleBE, e.fill = t.fill, e.inspect = t.inspect, e.toArrayBuffer = t.toArrayBuffer, e;
                    };
                }).call(this, O("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, O("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer");
            },
            {
                "base64-js": 2,
                buffer: 3,
                ieee754: 10,
                lYpoI2: 11
            }
        ],
        4: [
            function(c, d, e) {
                (function(e, t, a, n, r, o, i, u, s) {
                    var a = c("buffer").Buffer, f = 4, l = new a(f);
                    l.fill(0);
                    d.exports = {
                        hash: function(e, t, n, r) {
                            for(var o = t(function(e, t) {
                                e.length % f != 0 && (n = e.length + (f - e.length % f), e = a.concat([
                                    e,
                                    l
                                ], n));
                                for(var n, r = [], o = t ? e.readInt32BE : e.readInt32LE, i = 0; i < e.length; i += f)r.push(o.call(e, i));
                                return r;
                            }(e = a.isBuffer(e) ? e : new a(e), r), 8 * e.length), t = r, i = new a(n), u = t ? i.writeInt32BE : i.writeInt32LE, s = 0; s < o.length; s++)u.call(i, o[s], 4 * s, !0);
                            return i;
                        }
                    };
                }).call(this, c("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
            },
            {
                buffer: 3,
                lYpoI2: 11
            }
        ],
        5: [
            function(v, e, _) {
                (function(l, c, u, d, h, p, g, y, w) {
                    var u = v("buffer").Buffer, e = v("./sha"), t = v("./sha256"), n = v("./rng"), b = {
                        sha1: e,
                        sha256: t,
                        md5: v("./md5")
                    }, s = 64, a = new u(s);
                    function r(e, n) {
                        var r = b[e = e || "sha1"], o = [];
                        return r || i("algorithm:", e, "is not yet supported"), {
                            update: function(e) {
                                return u.isBuffer(e) || (e = new u(e)), o.push(e), e.length, this;
                            },
                            digest: function(e) {
                                var t = u.concat(o), t = n ? function(e, t, n) {
                                    u.isBuffer(t) || (t = new u(t)), u.isBuffer(n) || (n = new u(n)), t.length > s ? t = e(t) : t.length < s && (t = u.concat([
                                        t,
                                        a
                                    ], s));
                                    for(var r = new u(s), o = new u(s), i = 0; i < s; i++)r[i] = 54 ^ t[i], o[i] = 92 ^ t[i];
                                    return n = e(u.concat([
                                        r,
                                        n
                                    ])), e(u.concat([
                                        o,
                                        n
                                    ]));
                                }(r, n, t) : r(t);
                                return o = null, e ? t.toString(e) : t;
                            }
                        };
                    }
                    function i() {
                        var e = [].slice.call(arguments).join(" ");
                        throw new Error([
                            e,
                            "we accept pull requests",
                            "http://github.com/dominictarr/crypto-browserify"
                        ].join("\n"));
                    }
                    a.fill(0), _.createHash = function(e) {
                        return r(e);
                    }, _.createHmac = r, _.randomBytes = function(e, t) {
                        if (!t || !t.call) return new u(n(e));
                        try {
                            t.call(this, void 0, new u(n(e)));
                        } catch (e) {
                            t(e);
                        }
                    };
                    var o, f = [
                        "createCredentials",
                        "createCipher",
                        "createCipheriv",
                        "createDecipher",
                        "createDecipheriv",
                        "createSign",
                        "createVerify",
                        "createDiffieHellman",
                        "pbkdf2"
                    ], m = function(e) {
                        _[e] = function() {
                            i("sorry,", e, "is not implemented yet");
                        };
                    };
                    for(o in f)m(f[o], o);
                }).call(this, v("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, v("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
            },
            {
                "./md5": 6,
                "./rng": 7,
                "./sha": 8,
                "./sha256": 9,
                buffer: 3,
                lYpoI2: 11
            }
        ],
        6: [
            function(w, b, e) {
                (function(e, r, o, i, u, a, f, l, y) {
                    var t = w("./helpers");
                    function n(e, t) {
                        e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
                        for(var n = 1732584193, r = -271733879, o = -1732584194, i = 271733878, u = 0; u < e.length; u += 16){
                            var s = n, a = r, f = o, l = i, n = c(n, r, o, i, e[u + 0], 7, -680876936), i = c(i, n, r, o, e[u + 1], 12, -389564586), o = c(o, i, n, r, e[u + 2], 17, 606105819), r = c(r, o, i, n, e[u + 3], 22, -1044525330);
                            n = c(n, r, o, i, e[u + 4], 7, -176418897), i = c(i, n, r, o, e[u + 5], 12, 1200080426), o = c(o, i, n, r, e[u + 6], 17, -1473231341), r = c(r, o, i, n, e[u + 7], 22, -45705983), n = c(n, r, o, i, e[u + 8], 7, 1770035416), i = c(i, n, r, o, e[u + 9], 12, -1958414417), o = c(o, i, n, r, e[u + 10], 17, -42063), r = c(r, o, i, n, e[u + 11], 22, -1990404162), n = c(n, r, o, i, e[u + 12], 7, 1804603682), i = c(i, n, r, o, e[u + 13], 12, -40341101), o = c(o, i, n, r, e[u + 14], 17, -1502002290), n = d(n, r = c(r, o, i, n, e[u + 15], 22, 1236535329), o, i, e[u + 1], 5, -165796510), i = d(i, n, r, o, e[u + 6], 9, -1069501632), o = d(o, i, n, r, e[u + 11], 14, 643717713), r = d(r, o, i, n, e[u + 0], 20, -373897302), n = d(n, r, o, i, e[u + 5], 5, -701558691), i = d(i, n, r, o, e[u + 10], 9, 38016083), o = d(o, i, n, r, e[u + 15], 14, -660478335), r = d(r, o, i, n, e[u + 4], 20, -405537848), n = d(n, r, o, i, e[u + 9], 5, 568446438), i = d(i, n, r, o, e[u + 14], 9, -1019803690), o = d(o, i, n, r, e[u + 3], 14, -187363961), r = d(r, o, i, n, e[u + 8], 20, 1163531501), n = d(n, r, o, i, e[u + 13], 5, -1444681467), i = d(i, n, r, o, e[u + 2], 9, -51403784), o = d(o, i, n, r, e[u + 7], 14, 1735328473), n = h(n, r = d(r, o, i, n, e[u + 12], 20, -1926607734), o, i, e[u + 5], 4, -378558), i = h(i, n, r, o, e[u + 8], 11, -2022574463), o = h(o, i, n, r, e[u + 11], 16, 1839030562), r = h(r, o, i, n, e[u + 14], 23, -35309556), n = h(n, r, o, i, e[u + 1], 4, -1530992060), i = h(i, n, r, o, e[u + 4], 11, 1272893353), o = h(o, i, n, r, e[u + 7], 16, -155497632), r = h(r, o, i, n, e[u + 10], 23, -1094730640), n = h(n, r, o, i, e[u + 13], 4, 681279174), i = h(i, n, r, o, e[u + 0], 11, -358537222), o = h(o, i, n, r, e[u + 3], 16, -722521979), r = h(r, o, i, n, e[u + 6], 23, 76029189), n = h(n, r, o, i, e[u + 9], 4, -640364487), i = h(i, n, r, o, e[u + 12], 11, -421815835), o = h(o, i, n, r, e[u + 15], 16, 530742520), n = p(n, r = h(r, o, i, n, e[u + 2], 23, -995338651), o, i, e[u + 0], 6, -198630844), i = p(i, n, r, o, e[u + 7], 10, 1126891415), o = p(o, i, n, r, e[u + 14], 15, -1416354905), r = p(r, o, i, n, e[u + 5], 21, -57434055), n = p(n, r, o, i, e[u + 12], 6, 1700485571), i = p(i, n, r, o, e[u + 3], 10, -1894986606), o = p(o, i, n, r, e[u + 10], 15, -1051523), r = p(r, o, i, n, e[u + 1], 21, -2054922799), n = p(n, r, o, i, e[u + 8], 6, 1873313359), i = p(i, n, r, o, e[u + 15], 10, -30611744), o = p(o, i, n, r, e[u + 6], 15, -1560198380), r = p(r, o, i, n, e[u + 13], 21, 1309151649), n = p(n, r, o, i, e[u + 4], 6, -145523070), i = p(i, n, r, o, e[u + 11], 10, -1120210379), o = p(o, i, n, r, e[u + 2], 15, 718787259), r = p(r, o, i, n, e[u + 9], 21, -343485551), n = g(n, s), r = g(r, a), o = g(o, f), i = g(i, l);
                        }
                        return Array(n, r, o, i);
                    }
                    function s(e, t, n, r, o, i) {
                        return g((t = g(g(t, e), g(r, i))) << o | t >>> 32 - o, n);
                    }
                    function c(e, t, n, r, o, i, u) {
                        return s(t & n | ~t & r, e, t, o, i, u);
                    }
                    function d(e, t, n, r, o, i, u) {
                        return s(t & r | n & ~r, e, t, o, i, u);
                    }
                    function h(e, t, n, r, o, i, u) {
                        return s(t ^ n ^ r, e, t, o, i, u);
                    }
                    function p(e, t, n, r, o, i, u) {
                        return s(n ^ (t | ~r), e, t, o, i, u);
                    }
                    function g(e, t) {
                        var n = (65535 & e) + (65535 & t);
                        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
                    }
                    b.exports = function(e) {
                        return t.hash(e, n, 16);
                    };
                }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
            },
            {
                "./helpers": 4,
                buffer: 3,
                lYpoI2: 11
            }
        ],
        7: [
            function(e, l, t) {
                (function(e, t, n, r, o, i, u, s, f) {
                    var a;
                    l.exports = a || function(e) {
                        for(var t, n = new Array(e), r = 0; r < e; r++)0 == (3 & r) && (t = 4294967296 * Math.random()), n[r] = t >>> ((3 & r) << 3) & 255;
                        return n;
                    };
                }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
            },
            {
                buffer: 3,
                lYpoI2: 11
            }
        ],
        8: [
            function(c, d, e) {
                (function(e, t, n, r, o, s, a, f, l) {
                    var i = c("./helpers");
                    function u(l, c) {
                        l[c >> 5] |= 128 << 24 - c % 32, l[15 + (c + 64 >> 9 << 4)] = c;
                        for(var e, t, n, r = Array(80), o = 1732584193, i = -271733879, u = -1732584194, s = 271733878, d = -1009589776, h = 0; h < l.length; h += 16){
                            for(var p = o, g = i, y = u, w = s, b = d, a = 0; a < 80; a++){
                                r[a] = a < 16 ? l[h + a] : v(r[a - 3] ^ r[a - 8] ^ r[a - 14] ^ r[a - 16], 1);
                                var f = m(m(v(o, 5), (f = i, t = u, n = s, (e = a) < 20 ? f & t | ~f & n : !(e < 40) && e < 60 ? f & t | f & n | t & n : f ^ t ^ n)), m(m(d, r[a]), (e = a) < 20 ? 1518500249 : e < 40 ? 1859775393 : e < 60 ? -1894007588 : -899497514)), d = s, s = u, u = v(i, 30), i = o, o = f;
                            }
                            o = m(o, p), i = m(i, g), u = m(u, y), s = m(s, w), d = m(d, b);
                        }
                        return Array(o, i, u, s, d);
                    }
                    function m(e, t) {
                        var n = (65535 & e) + (65535 & t);
                        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
                    }
                    function v(e, t) {
                        return e << t | e >>> 32 - t;
                    }
                    d.exports = function(e) {
                        return i.hash(e, u, 20, !0);
                    };
                }).call(this, c("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
            },
            {
                "./helpers": 4,
                buffer: 3,
                lYpoI2: 11
            }
        ],
        9: [
            function(c, d, e) {
                (function(e, t, n, r, u, s, a, f, l) {
                    function b(e, t) {
                        var n = (65535 & e) + (65535 & t);
                        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
                    }
                    function o(e, l) {
                        var c, d = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), t = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), n = new Array(64);
                        e[l >> 5] |= 128 << 24 - l % 32, e[15 + (l + 64 >> 9 << 4)] = l;
                        for(var r, o, h = 0; h < e.length; h += 16){
                            for(var i = t[0], u = t[1], s = t[2], p = t[3], a = t[4], g = t[5], y = t[6], w = t[7], f = 0; f < 64; f++)n[f] = f < 16 ? e[f + h] : b(b(b((o = n[f - 2], m(o, 17) ^ m(o, 19) ^ v(o, 10)), n[f - 7]), (o = n[f - 15], m(o, 7) ^ m(o, 18) ^ v(o, 3))), n[f - 16]), c = b(b(b(b(w, m(o = a, 6) ^ m(o, 11) ^ m(o, 25)), a & g ^ ~a & y), d[f]), n[f]), r = b(m(r = i, 2) ^ m(r, 13) ^ m(r, 22), i & u ^ i & s ^ u & s), w = y, y = g, g = a, a = b(p, c), p = s, s = u, u = i, i = b(c, r);
                            t[0] = b(i, t[0]), t[1] = b(u, t[1]), t[2] = b(s, t[2]), t[3] = b(p, t[3]), t[4] = b(a, t[4]), t[5] = b(g, t[5]), t[6] = b(y, t[6]), t[7] = b(w, t[7]);
                        }
                        return t;
                    }
                    var i = c("./helpers"), m = function(e, t) {
                        return e >>> t | e << 32 - t;
                    }, v = function(e, t) {
                        return e >>> t;
                    };
                    d.exports = function(e) {
                        return i.hash(e, o, 32, !0);
                    };
                }).call(this, c("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
            },
            {
                "./helpers": 4,
                buffer: 3,
                lYpoI2: 11
            }
        ],
        10: [
            function(e, t, f) {
                (function(e, t, n, r, o, i, u, s, a) {
                    f.read = function(e, t, n, r, o) {
                        var i, u, l = 8 * o - r - 1, c = (1 << l) - 1, d = c >> 1, s = -7, a = n ? o - 1 : 0, f = n ? -1 : 1, o = e[t + a];
                        for(a += f, i = o & (1 << -s) - 1, o >>= -s, s += l; 0 < s; i = 256 * i + e[t + a], a += f, s -= 8);
                        for(u = i & (1 << -s) - 1, i >>= -s, s += r; 0 < s; u = 256 * u + e[t + a], a += f, s -= 8);
                        if (0 === i) i = 1 - d;
                        else {
                            if (i === c) return u ? NaN : 1 / 0 * (o ? -1 : 1);
                            u += Math.pow(2, r), i -= d;
                        }
                        return (o ? -1 : 1) * u * Math.pow(2, i - r);
                    }, f.write = function(e, t, l, n, r, c) {
                        var o, i, u = 8 * c - r - 1, s = (1 << u) - 1, a = s >> 1, d = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = n ? 0 : c - 1, h = n ? 1 : -1, c = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                        for(t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (i = isNaN(t) ? 1 : 0, o = s) : (o = Math.floor(Math.log(t) / Math.LN2), t * (n = Math.pow(2, -o)) < 1 && (o--, n *= 2), 2 <= (t += 1 <= o + a ? d / n : d * Math.pow(2, 1 - a)) * n && (o++, n /= 2), s <= o + a ? (i = 0, o = s) : 1 <= o + a ? (i = (t * n - 1) * Math.pow(2, r), o += a) : (i = t * Math.pow(2, a - 1) * Math.pow(2, r), o = 0)); 8 <= r; e[l + f] = 255 & i, f += h, i /= 256, r -= 8);
                        for(o = o << r | i, u += r; 0 < u; e[l + f] = 255 & o, f += h, o /= 256, u -= 8);
                        e[l + f - h] |= 128 * c;
                    };
                }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/ieee754/index.js", "/node_modules/gulp-browserify/node_modules/ieee754");
            },
            {
                buffer: 3,
                lYpoI2: 11
            }
        ],
        11: [
            function(e, h, t) {
                (function(e, t, n, r, o, f, l, c, d) {
                    var i, u, s;
                    function a() {}
                    (e = h.exports = {}).nextTick = (u = "undefined" != typeof window && window.setImmediate, s = "undefined" != typeof window && window.postMessage && window.addEventListener, u ? function(e) {
                        return window.setImmediate(e);
                    } : s ? (i = [], window.addEventListener("message", function(e) {
                        var t = e.source;
                        t !== window && null !== t || "process-tick" !== e.data || (e.stopPropagation(), 0 < i.length && i.shift()());
                    }, !0), function(e) {
                        i.push(e), window.postMessage("process-tick", "*");
                    }) : function(e) {
                        setTimeout(e, 0);
                    }), e.title = "browser", e.browser = !0, e.env = {}, e.argv = [], e.on = a, e.addListener = a, e.once = a, e.off = a, e.removeListener = a, e.removeAllListeners = a, e.emit = a, e.binding = function(e) {
                        throw new Error("process.binding is not supported");
                    }, e.cwd = function() {
                        return "/";
                    }, e.chdir = function(e) {
                        throw new Error("process.chdir is not supported");
                    };
                }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process");
            },
            {
                buffer: 3,
                lYpoI2: 11
            }
        ]
    }, {}, [
        1
    ])(1);
});

},{}],"5g7K8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "forwardContextMenuClicks", ()=>forwardContextMenuClicks);
const forwardContextMenuClicks = ()=>{
    chrome.contextMenus.onClicked.addListener((info, tab)=>{
        console.log("info", info);
        if (info.menuItemId === "settings") chrome.tabs.create({
            url: chrome.runtime.getURL("/src/pages/settings/index.html")
        });
        else {
            const selectedText = info.selectionText;
            const id = info.menuItemId;
            if (tab?.id) chrome.tabs.sendMessage(tab.id, {
                action: "forward-context-menu-click",
                payload: {
                    selectedText,
                    id
                }
            });
        }
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"6evU9":[function(require,module,exports) {
/**
 * We fetch the shortcut assigned to sidebar from chrome.commands.getAll
 * and send it to client via chrome.tabs.sendMessage.
 *
 * We are doing this because we cannot directly access the chrome.commands
 * from the content script.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sendSidebarShortcut", ()=>sendSidebarShortcut);
const sendSidebarShortcut = ()=>{
    chrome.commands.getAll(function(commands) {
        // Get shortcut
        const shortcut = commands.find((c)=>c.name === "open-sidebar")?.shortcut;
        // Send shortcut to client
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            if (tabs[0].id) chrome.tabs.sendMessage(tabs[0].id, {
                action: "sidebar-shortcut",
                shortcut
            });
        });
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"cf5K4":[function(require,module,exports) {
/**
 * This file contains all the listeners that toggle the sidebar.
 * The sidebar can be toggled by:
 * 1) Clicking on the extension icon
 * 2) Pressing the keyboard shortcut
 * 3) Programmatically via the chrome.runtime.onMessage listener
 *    (used by the close button in the sidebar)
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sidebarToggleListeners", ()=>sidebarToggleListeners);
const sidebarToggleListeners = ()=>{
    // Toggle sidebar when user performs a keyboard shortcut
    chrome.commands.onCommand.addListener(function(command) {
        console.log(`\ud83d [Command Received] ${command}`);
        if (command === "open-sidebar") toggleSidebar();
    });
    // Toggle sidebar when user clicks on the extension icon
    chrome.action.onClicked.addListener(toggleSidebar);
    // Toggle sidebar programmatically
    chrome.runtime.onMessage.addListener(function(message, _sender, sendResponse) {
        if (message.action === "close-sidebar" || message.action === "open-sidebar") toggleSidebar();
        if (message.action === "generate") message.prompt;
        sendResponse({
            action: "close-sidebar"
        });
    });
};
const toggleSidebar = ()=>{
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        if (tabs[0].id) chrome.tabs.sendMessage(tabs[0].id, {
            action: "open-sidebar"
        });
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}]},["aUyBn","8oeFb"], "8oeFb", "parcelRequire5833")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsT0FBTyxJQUFFLE9BQUssS0FBRyxFQUFFLEVBQUUsT0FBTyxJQUFFLE9BQUssSUFBRSxFQUFFLEVBQUUsT0FBTyxJQUFFLEdBQUUsQ0FBQyxLQUFJLEtBQUksRUFBRSxBQUFDLENBQUEsUUFBTSxDQUFBLEtBQUksSUFBRyxFQUFFLE1BQUk7NEJBQUcsT0FBTyxLQUFHLElBQUUsRUFBRSxNQUFLLENBQUEsSUFBRSxFQUFFLEVBQUUsT0FBTyxPQUFLLElBQUUsRUFBRSxFQUFFLE9BQU8sSUFBRSxPQUFLLENBQUEsS0FBSSxLQUFHLEtBQUksQ0FBQSxFQUFFLEFBQUMsQ0FBQSxJQUFFLEVBQUUsRUFBRSxPQUFPLE9BQUssS0FBRyxFQUFFLEVBQUUsT0FBTyxJQUFFLE9BQUssSUFBRSxFQUFFLEVBQUUsT0FBTyxJQUFFLE9BQUssQ0FBQSxLQUFJLElBQUUsTUFBSyxFQUFFLE1BQUksRUFBQyxHQUFHO3dCQUFDLEdBQUUsRUFBRSxnQkFBYyxTQUFTLENBQUM7NEJBQUUsSUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxTQUFPLEdBQUUsSUFBRTs0QkFBRyxTQUFTLEVBQUUsQ0FBQztnQ0FBRSxPQUFNLG1FQUFtRSxPQUFPOzRCQUFFOzRCQUFDLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxTQUFPLEdBQUUsSUFBRSxHQUFFLEtBQUcsRUFBRSxJQUFFLEFBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxJQUFFLEVBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxJQUFFLEVBQUUsSUFBRSxDQUFBLElBQUcsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEtBQUcsRUFBRSxBQUFDLENBQUEsSUFBRSxDQUFBLEtBQUksS0FBRyxNQUFJLEVBQUUsS0FBRyxLQUFHLE1BQUksRUFBRSxLQUFHLElBQUUsTUFBSSxFQUFFLEtBQUc7NEJBQUcsT0FBTztnQ0FBRyxLQUFLO29DQUFFLElBQUUsQUFBQyxDQUFBLEtBQUcsRUFBRSxBQUFDLENBQUEsSUFBRSxDQUFDLENBQUMsRUFBRSxTQUFPLEVBQUUsQUFBRCxLQUFJLEVBQUMsSUFBRyxFQUFFLEtBQUcsSUFBRSxNQUFJO29DQUFLO2dDQUFNLEtBQUs7b0NBQUUsSUFBRSxBQUFDLENBQUEsSUFBRSxBQUFDLENBQUEsS0FBRyxFQUFFLEFBQUMsQ0FBQSxJQUFFLEFBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxTQUFPLEVBQUUsSUFBRSxDQUFBLElBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBTyxFQUFFLEFBQUQsS0FBSSxHQUFFLElBQUcsRUFBRSxLQUFHLElBQUUsR0FBRSxJQUFHLEVBQUUsS0FBRyxJQUFFLE1BQUk7NEJBQUc7NEJBQUMsT0FBTzt3QkFBQztvQkFBQyxFQUFFLEtBQUssTUFBSSxJQUFFLElBQUksQ0FBQyxXQUFTLENBQUMsSUFBRTtnQkFBRSxDQUFBLEVBQUUsS0FBSyxJQUFJLEVBQUMsRUFBRSxXQUFVLGVBQWEsT0FBTyxPQUFLLE9BQUssZUFBYSxPQUFPLFNBQU8sU0FBTyxDQUFDLEdBQUUsRUFBRSxVQUFVLFFBQU8sU0FBUyxDQUFDLEVBQUUsRUFBQyxTQUFTLENBQUMsRUFBRSxFQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxtRUFBa0U7WUFBMkQ7WUFBRTtnQkFBQyxRQUFPO2dCQUFFLFFBQU87WUFBRTtTQUFFO1FBQUMsR0FBRTtZQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO2dCQUFHLENBQUEsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7b0JBQUUsSUFBSSxJQUFFLEVBQUUsY0FBYSxJQUFFLEVBQUU7b0JBQVcsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxJQUFHLENBQUUsQ0FBQSxJQUFJLFlBQVksQ0FBQSxHQUFHLE9BQU8sSUFBSSxFQUFFLEdBQUUsR0FBRTt3QkFBRyxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxPQUFPO3dCQUFFLElBQUcsYUFBVyxLQUFHLFlBQVUsR0FBRSxJQUFJLElBQUUsQUFBQyxDQUFBLElBQUUsQ0FBQSxFQUFHLE9BQUssRUFBRSxTQUFPLEVBQUUsUUFBUSxjQUFhLEtBQUksRUFBRSxTQUFPLEtBQUcsR0FBRyxLQUFHO3dCQUFJLElBQUcsWUFBVSxHQUFFLElBQUUsRUFBRTs2QkFBUSxJQUFHLFlBQVUsR0FBRSxJQUFFLEVBQUUsV0FBVyxHQUFFOzZCQUFPOzRCQUFDLElBQUcsWUFBVSxHQUFFLE1BQU0sSUFBSSxNQUFNOzRCQUF5RCxJQUFFLEVBQUUsRUFBRTt3QkFBTzt3QkFBQyxJQUFHLEVBQUUsa0JBQWdCLElBQUUsRUFBRSxTQUFTLElBQUksV0FBVyxNQUFLLENBQUEsQUFBQyxDQUFBLElBQUUsSUFBSSxBQUFELEVBQUcsU0FBTyxHQUFFLEVBQUUsWUFBVSxDQUFDLENBQUEsR0FBRyxFQUFFLG1CQUFpQixZQUFVLE9BQU8sRUFBRSxZQUFXLEVBQUUsS0FBSzs2QkFBUSxJQUFHLEVBQUUsSUFBRSxNQUFJLEVBQUUsU0FBUyxNQUFJLEtBQUcsWUFBVSxPQUFPLEtBQUcsWUFBVSxPQUFPLEVBQUUsUUFBTyxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBSSxFQUFFLFNBQVMsS0FBRyxDQUFDLENBQUMsRUFBRSxHQUFDLEVBQUUsVUFBVSxLQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLEVBQUU7NkJBQU0sSUFBRyxZQUFVLEdBQUUsRUFBRSxNQUFNLEdBQUUsR0FBRTs2QkFBUSxJQUFHLFlBQVUsS0FBRyxDQUFDLEVBQUUsbUJBQWlCLENBQUMsR0FBRSxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFDO3dCQUFFLE9BQU87b0JBQUM7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxFQUFFLGdCQUFjLEVBQUUsU0FBUyxDQUFDOzRCQUFFLElBQUksSUFBSSxJQUFFLEVBQUUsRUFBQyxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxFQUFFLEtBQUssTUFBSSxFQUFFLFdBQVc7NEJBQUksT0FBTzt3QkFBQyxFQUFFLElBQUcsR0FBRSxHQUFFO29CQUFFO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLE9BQU8sRUFBRSxnQkFBYyxFQUFFLFNBQVMsQ0FBQzs0QkFBRSxJQUFJLElBQUksR0FBRSxHQUFFLElBQUUsRUFBRSxFQUFDLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLElBQUUsRUFBRSxXQUFXLElBQUcsSUFBRSxLQUFHLEdBQUUsSUFBRSxJQUFFLEtBQUksRUFBRSxLQUFLLElBQUcsRUFBRSxLQUFLOzRCQUFHLE9BQU87d0JBQUMsRUFBRSxJQUFHLEdBQUUsR0FBRTtvQkFBRTtvQkFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLElBQUksSUFBRTt3QkFBRyxJQUFFLEtBQUssSUFBSSxFQUFFLFFBQU87d0JBQUcsSUFBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBSSxLQUFHLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRTt3QkFBRSxPQUFPO29CQUFDO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLEtBQUksQ0FBQSxFQUFFLGFBQVcsT0FBTyxHQUFFLDhCQUE2QixFQUFFLFFBQU0sR0FBRSxtQkFBa0IsRUFBRSxJQUFFLElBQUUsRUFBRSxRQUFPLHNDQUFxQzt3QkFBRyxJQUFJLEdBQUUsSUFBRSxFQUFFO3dCQUFPLElBQUcsQ0FBRSxDQUFBLEtBQUcsQ0FBQSxHQUFHLE9BQU8sSUFBRyxDQUFBLElBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxJQUFFLElBQUUsS0FBSSxDQUFBLEtBQUcsQ0FBQyxDQUFDLElBQUUsRUFBRSxJQUFFLENBQUEsQ0FBQyxJQUFJLENBQUEsSUFBRSxDQUFDLENBQUMsRUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFFLEtBQUksQ0FBQSxLQUFHLENBQUMsQ0FBQyxJQUFFLEVBQUUsQUFBRCxDQUFDLEdBQUc7b0JBQUM7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsS0FBSSxDQUFBLEVBQUUsYUFBVyxPQUFPLEdBQUUsOEJBQTZCLEVBQUUsUUFBTSxHQUFFLG1CQUFrQixFQUFFLElBQUUsSUFBRSxFQUFFLFFBQU8sc0NBQXFDO3dCQUFHLElBQUksR0FBRSxJQUFFLEVBQUU7d0JBQU8sSUFBRyxDQUFFLENBQUEsS0FBRyxDQUFBLEdBQUcsT0FBTyxJQUFHLENBQUEsSUFBRSxJQUFFLEtBQUksQ0FBQSxJQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsSUFBRSxFQUFDLEdBQUcsSUFBRSxJQUFFLEtBQUksQ0FBQSxLQUFHLENBQUMsQ0FBQyxJQUFFLEVBQUUsSUFBRSxDQUFBLEdBQUcsS0FBRyxDQUFDLENBQUMsRUFBRSxFQUFDLElBQUUsSUFBRSxLQUFJLENBQUEsS0FBRyxDQUFDLENBQUMsSUFBRSxFQUFFLElBQUUsT0FBSyxDQUFBLENBQUMsSUFBSSxDQUFBLElBQUUsSUFBRSxLQUFJLENBQUEsSUFBRSxDQUFDLENBQUMsSUFBRSxFQUFFLElBQUUsRUFBQyxHQUFHLElBQUUsSUFBRSxLQUFJLENBQUEsS0FBRyxDQUFDLENBQUMsSUFBRSxFQUFFLElBQUUsQ0FBQSxHQUFHLElBQUUsSUFBRSxLQUFJLENBQUEsS0FBRyxDQUFDLENBQUMsSUFBRSxFQUFFLEFBQUQsR0FBRyxLQUFHLENBQUMsQ0FBQyxFQUFFLElBQUUsT0FBSyxDQUFBLEdBQUc7b0JBQUM7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsSUFBRyxLQUFJLENBQUEsRUFBRSxhQUFXLE9BQU8sR0FBRSw4QkFBNkIsRUFBRSxRQUFNLEdBQUUsbUJBQWtCLEVBQUUsSUFBRSxJQUFFLEVBQUUsUUFBTyxzQ0FBcUMsR0FBRyxDQUFFLENBQUEsRUFBRSxVQUFRLENBQUEsR0FBRyxPQUFPLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLElBQUcsUUFBTSxJQUFFLEtBQUksQ0FBQSxRQUFNLElBQUUsQ0FBQSxJQUFHO29CQUFDO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLElBQUcsS0FBSSxDQUFBLEVBQUUsYUFBVyxPQUFPLEdBQUUsOEJBQTZCLEVBQUUsUUFBTSxHQUFFLG1CQUFrQixFQUFFLElBQUUsSUFBRSxFQUFFLFFBQU8sc0NBQXFDLEdBQUcsQ0FBRSxDQUFBLEVBQUUsVUFBUSxDQUFBLEdBQUcsT0FBTyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxJQUFHLGFBQVcsSUFBRSxLQUFJLENBQUEsYUFBVyxJQUFFLENBQUEsSUFBRztvQkFBQztvQkFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxPQUFPLEtBQUksQ0FBQSxFQUFFLGFBQVcsT0FBTyxHQUFFLDhCQUE2QixFQUFFLElBQUUsSUFBRSxFQUFFLFFBQU8sc0NBQXFDLEdBQUcsRUFBRSxLQUFLLEdBQUUsR0FBRSxHQUFFLElBQUc7b0JBQUU7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxLQUFJLENBQUEsRUFBRSxhQUFXLE9BQU8sR0FBRSw4QkFBNkIsRUFBRSxJQUFFLElBQUUsRUFBRSxRQUFPLHNDQUFxQyxHQUFHLEVBQUUsS0FBSyxHQUFFLEdBQUUsR0FBRSxJQUFHO29CQUFFO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxLQUFJLENBQUEsRUFBRSxRQUFNLEdBQUUsa0JBQWlCLEVBQUUsYUFBVyxPQUFPLEdBQUUsOEJBQTZCLEVBQUUsUUFBTSxHQUFFLG1CQUFrQixFQUFFLElBQUUsSUFBRSxFQUFFLFFBQU8seUNBQXdDLEVBQUUsR0FBRSxNQUFLO3dCQUFHLElBQUUsRUFBRTt3QkFBTyxJQUFHLENBQUUsQ0FBQSxLQUFHLENBQUEsR0FBRyxJQUFJLElBQUksSUFBRSxHQUFFLElBQUUsS0FBSyxJQUFJLElBQUUsR0FBRSxJQUFHLElBQUUsR0FBRSxJQUFJLENBQUMsQ0FBQyxJQUFFLEVBQUUsR0FBQyxBQUFDLENBQUEsSUFBRSxPQUFLLElBQUcsQ0FBQSxJQUFFLElBQUUsSUFBRSxDQUFBLENBQUMsTUFBSyxJQUFHLENBQUEsSUFBRSxJQUFFLElBQUUsQ0FBQTtvQkFBRTtvQkFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsS0FBSSxDQUFBLEVBQUUsUUFBTSxHQUFFLGtCQUFpQixFQUFFLGFBQVcsT0FBTyxHQUFFLDhCQUE2QixFQUFFLFFBQU0sR0FBRSxtQkFBa0IsRUFBRSxJQUFFLElBQUUsRUFBRSxRQUFPLHlDQUF3QyxFQUFFLEdBQUUsV0FBVTt3QkFBRyxJQUFFLEVBQUU7d0JBQU8sSUFBRyxDQUFFLENBQUEsS0FBRyxDQUFBLEdBQUcsSUFBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEtBQUssSUFBSSxJQUFFLEdBQUUsSUFBRyxJQUFFLEdBQUUsSUFBSSxDQUFDLENBQUMsSUFBRSxFQUFFLEdBQUMsTUFBSSxJQUFHLENBQUEsSUFBRSxJQUFFLElBQUUsQ0FBQSxJQUFHO29CQUFHO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxLQUFJLENBQUEsRUFBRSxRQUFNLEdBQUUsa0JBQWlCLEVBQUUsYUFBVyxPQUFPLEdBQUUsOEJBQTZCLEVBQUUsUUFBTSxHQUFFLG1CQUFrQixFQUFFLElBQUUsSUFBRSxFQUFFLFFBQU8seUNBQXdDLEVBQUUsR0FBRSxPQUFNLE9BQU0sR0FBRyxFQUFFLFVBQVEsS0FBRyxFQUFFLEdBQUUsS0FBRyxJQUFFLElBQUUsUUFBTSxJQUFFLEdBQUUsR0FBRSxHQUFFO29CQUFFO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxLQUFJLENBQUEsRUFBRSxRQUFNLEdBQUUsa0JBQWlCLEVBQUUsYUFBVyxPQUFPLEdBQUUsOEJBQTZCLEVBQUUsUUFBTSxHQUFFLG1CQUFrQixFQUFFLElBQUUsSUFBRSxFQUFFLFFBQU8seUNBQXdDLEVBQUUsR0FBRSxZQUFXLFlBQVcsR0FBRyxFQUFFLFVBQVEsS0FBRyxFQUFFLEdBQUUsS0FBRyxJQUFFLElBQUUsYUFBVyxJQUFFLEdBQUUsR0FBRSxHQUFFO29CQUFFO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxLQUFJLENBQUEsRUFBRSxRQUFNLEdBQUUsa0JBQWlCLEVBQUUsYUFBVyxPQUFPLEdBQUUsOEJBQTZCLEVBQUUsUUFBTSxHQUFFLG1CQUFrQixFQUFFLElBQUUsSUFBRSxFQUFFLFFBQU8seUNBQXdDLEVBQUUsR0FBRSxzQkFBcUIseUNBQXFCLEdBQUcsRUFBRSxVQUFRLEtBQUcsRUFBRSxNQUFNLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRztvQkFBRTtvQkFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsS0FBSSxDQUFBLEVBQUUsUUFBTSxHQUFFLGtCQUFpQixFQUFFLGFBQVcsT0FBTyxHQUFFLDhCQUE2QixFQUFFLFFBQU0sR0FBRSxtQkFBa0IsRUFBRSxJQUFFLElBQUUsRUFBRSxRQUFPLHlDQUF3QyxFQUFFLEdBQUUsdUJBQXNCLHVUQUFzQixHQUFHLEVBQUUsVUFBUSxLQUFHLEVBQUUsTUFBTSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUc7b0JBQUU7b0JBQUMsRUFBRSxTQUFPLEdBQUUsRUFBRSxhQUFXLEdBQUUsRUFBRSxvQkFBa0IsSUFBRyxFQUFFLFdBQVMsTUFBSyxFQUFFLGtCQUFnQjt3QkFBVyxJQUFHOzRCQUFDLElBQUksSUFBRSxJQUFJLFlBQVksSUFBRyxJQUFFLElBQUksV0FBVzs0QkFBRyxPQUFPLEVBQUUsTUFBSTtnQ0FBVyxPQUFPOzRCQUFFLEdBQUUsT0FBSyxFQUFFLFNBQU8sY0FBWSxPQUFPLEVBQUU7d0JBQVEsRUFBQyxPQUFNLEdBQUU7NEJBQUMsT0FBTSxDQUFDO3dCQUFDO29CQUFDLEtBQUksRUFBRSxhQUFXLFNBQVMsQ0FBQzt3QkFBRSxPQUFPLE9BQU8sR0FBRzs0QkFBZSxLQUFJOzRCQUFNLEtBQUk7NEJBQU8sS0FBSTs0QkFBUSxLQUFJOzRCQUFRLEtBQUk7NEJBQVMsS0FBSTs0QkFBUyxLQUFJOzRCQUFNLEtBQUk7NEJBQU8sS0FBSTs0QkFBUSxLQUFJOzRCQUFVLEtBQUk7Z0NBQVcsT0FBTSxDQUFDOzRCQUFFO2dDQUFRLE9BQU0sQ0FBQzt3QkFBQztvQkFBQyxHQUFFLEVBQUUsV0FBUyxTQUFTLENBQUM7d0JBQUUsT0FBTSxDQUFFLENBQUEsUUFBTSxLQUFHLENBQUMsRUFBRSxTQUFRO29CQUFFLEdBQUUsRUFBRSxhQUFXLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsSUFBSTt3QkFBRSxPQUFPLEtBQUcsSUFBRyxLQUFHOzRCQUFRLEtBQUk7Z0NBQU0sSUFBRSxFQUFFLFNBQU87Z0NBQUU7NEJBQU0sS0FBSTs0QkFBTyxLQUFJO2dDQUFRLElBQUUsRUFBRSxHQUFHO2dDQUFPOzRCQUFNLEtBQUk7NEJBQVEsS0FBSTs0QkFBUyxLQUFJO2dDQUFNLElBQUUsRUFBRTtnQ0FBTzs0QkFBTSxLQUFJO2dDQUFTLElBQUUsRUFBRSxHQUFHO2dDQUFPOzRCQUFNLEtBQUk7NEJBQU8sS0FBSTs0QkFBUSxLQUFJOzRCQUFVLEtBQUk7Z0NBQVcsSUFBRSxJQUFFLEVBQUU7Z0NBQU87NEJBQU07Z0NBQVEsTUFBTSxJQUFJLE1BQU07d0JBQW1CO3dCQUFDLE9BQU87b0JBQUMsR0FBRSxFQUFFLFNBQU8sU0FBUyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxJQUFHLEVBQUUsRUFBRSxJQUFHLHdFQUF1RSxNQUFJLEVBQUUsUUFBTyxPQUFPLElBQUksRUFBRTt3QkFBRyxJQUFHLE1BQUksRUFBRSxRQUFPLE9BQU8sQ0FBQyxDQUFDLEVBQUU7d0JBQUMsSUFBRyxZQUFVLE9BQU8sR0FBRSxJQUFJLElBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksS0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUFPLElBQUksSUFBSSxJQUFFLElBQUksRUFBRSxJQUFHLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSTs0QkFBQyxJQUFJLElBQUUsQ0FBQyxDQUFDLEVBQUU7NEJBQUMsRUFBRSxLQUFLLEdBQUUsSUFBRyxLQUFHLEVBQUU7d0JBQU07d0JBQUMsT0FBTztvQkFBQyxHQUFFLEVBQUUsVUFBVSxRQUFNLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxTQUFTLEtBQUcsU0FBUyxNQUFLLENBQUEsSUFBRSxHQUFFLElBQUUsS0FBSyxDQUFBLElBQUksQ0FBQSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLENBQUEsR0FBRyxJQUFFLE9BQU8sTUFBSTt3QkFBRSxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxJQUFJLENBQUMsU0FBTzt3QkFBRSxPQUFPLEFBQUMsQ0FBQSxDQUFDLEtBQUcsSUFBRyxDQUFBLElBQUUsT0FBTyxFQUFDLENBQUMsS0FBSyxDQUFBLElBQUUsQ0FBQSxHQUFHLElBQUUsT0FBTyxLQUFHLFFBQVE7NEJBQWUsS0FBSTtnQ0FBTSxJQUFFLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztvQ0FBRSxJQUFFLE9BQU8sTUFBSTtvQ0FBRSxJQUFJLElBQUUsRUFBRSxTQUFPO29DQUFHLENBQUEsQ0FBQyxLQUFHLElBQUcsQ0FBQSxJQUFFLE9BQU8sRUFBQyxDQUFDLEtBQUssQ0FBQSxJQUFFLENBQUEsR0FBRyxFQUFFLEFBQUMsQ0FBQSxJQUFFLEVBQUUsTUFBSyxJQUFHLEtBQUcsR0FBRSx1QkFBc0IsSUFBRSxJQUFFLEtBQUksQ0FBQSxJQUFFLElBQUUsQ0FBQTtvQ0FBRyxJQUFJLElBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJO3dDQUFDLElBQUksSUFBRSxTQUFTLEVBQUUsT0FBTyxJQUFFLEdBQUUsSUFBRzt3Q0FBSSxFQUFFLENBQUMsTUFBTSxJQUFHLHVCQUFzQixDQUFDLENBQUMsSUFBRSxFQUFFLEdBQUM7b0NBQUM7b0NBQUMsT0FBTyxFQUFFLGdCQUFjLElBQUUsR0FBRTtnQ0FBQyxFQUFFLElBQUksRUFBQyxHQUFFLEdBQUU7Z0NBQUc7NEJBQU0sS0FBSTs0QkFBTyxLQUFJO2dDQUFRLElBQUUsSUFBSSxFQUFDLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxFQUFFLGdCQUFjLEVBQUUsRUFBRSxJQUFHLEdBQUUsR0FBRTtnQ0FBRzs0QkFBTSxLQUFJOzRCQUFRLEtBQUk7Z0NBQVMsSUFBRSxFQUFFLElBQUksRUFBQyxHQUFFLEdBQUU7Z0NBQUc7NEJBQU0sS0FBSTtnQ0FBUyxJQUFFLElBQUksRUFBQyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxnQkFBYyxFQUFFLEVBQUUsSUFBRyxHQUFFLEdBQUU7Z0NBQUc7NEJBQU0sS0FBSTs0QkFBTyxLQUFJOzRCQUFRLEtBQUk7NEJBQVUsS0FBSTtnQ0FBVyxJQUFFLEVBQUUsSUFBSSxFQUFDLEdBQUUsR0FBRTtnQ0FBRzs0QkFBTTtnQ0FBUSxNQUFNLElBQUksTUFBTTt3QkFBbUI7d0JBQUMsT0FBTztvQkFBQyxHQUFFLEVBQUUsVUFBVSxXQUFTLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLElBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLElBQUk7d0JBQUMsSUFBRyxJQUFFLE9BQU8sS0FBRyxRQUFRLGVBQWMsSUFBRSxPQUFPLE1BQUksR0FBRSxBQUFDLENBQUEsSUFBRSxLQUFLLE1BQUksSUFBRSxPQUFPLEtBQUcsRUFBRSxNQUFLLE1BQUssR0FBRSxPQUFNO3dCQUFHLE9BQU87NEJBQUcsS0FBSTtnQ0FBTSxJQUFFLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO29DQUFFLElBQUksSUFBRSxFQUFFO29DQUFRLENBQUEsQ0FBQyxLQUFHLElBQUUsQ0FBQSxLQUFLLENBQUEsSUFBRSxDQUFBO29DQUFJLENBQUEsQ0FBQyxLQUFHLElBQUUsS0FBRyxJQUFFLENBQUEsS0FBSyxDQUFBLElBQUUsQ0FBQTtvQ0FBRyxJQUFJLElBQUksSUFBRSxJQUFHLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBSSxLQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUU7b0NBQUUsT0FBTztnQ0FBQyxFQUFFLEdBQUUsR0FBRTtnQ0FBRzs0QkFBTSxLQUFJOzRCQUFPLEtBQUk7Z0NBQVEsSUFBRSxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztvQ0FBRSxJQUFJLElBQUUsSUFBRyxJQUFFO29DQUFHLElBQUUsS0FBSyxJQUFJLEVBQUUsUUFBTztvQ0FBRyxJQUFJLElBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUUsTUFBSyxDQUFBLEtBQUcsRUFBRSxLQUFHLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxHQUFFLElBQUUsRUFBQyxJQUFHLEtBQUcsTUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVM7b0NBQUksT0FBTyxJQUFFLEVBQUU7Z0NBQUUsRUFBRSxHQUFFLEdBQUU7Z0NBQUc7NEJBQU0sS0FBSTs0QkFBUSxLQUFJO2dDQUFTLElBQUUsRUFBRSxHQUFFLEdBQUU7Z0NBQUc7NEJBQU0sS0FBSTtnQ0FBUyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsTUFBSyxDQUFBLElBQUUsQ0FBQSxLQUFJLE1BQUksRUFBRSxTQUFPLEVBQUUsY0FBYyxLQUFHLEVBQUUsY0FBYyxFQUFFLE1BQU0sR0FBRTtnQ0FBSTs0QkFBTSxLQUFJOzRCQUFPLEtBQUk7NEJBQVEsS0FBSTs0QkFBVSxLQUFJO2dDQUFXLElBQUUsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7b0NBQUUsSUFBSSxJQUFJLElBQUUsRUFBRSxNQUFNLEdBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUcsRUFBRSxLQUFHLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxHQUFDLE1BQUksQ0FBQyxDQUFDLElBQUUsRUFBRTtvQ0FBRSxPQUFPO2dDQUFDLEVBQUUsR0FBRSxHQUFFO2dDQUFHOzRCQUFNO2dDQUFRLE1BQU0sSUFBSSxNQUFNO3dCQUFtQjt3QkFBQyxPQUFPO29CQUFDLEdBQUUsRUFBRSxVQUFVLFNBQU87d0JBQVcsT0FBTTs0QkFBQyxNQUFLOzRCQUFTLE1BQUssTUFBTSxVQUFVLE1BQU0sS0FBSyxJQUFJLENBQUMsUUFBTSxJQUFJLEVBQUM7d0JBQUU7b0JBQUMsR0FBRSxFQUFFLFVBQVUsT0FBSyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsSUFBRyxJQUFFLEtBQUcsR0FBRSxBQUFDLENBQUEsSUFBRSxLQUFHLE1BQUksSUFBRSxJQUFFLElBQUksQ0FBQyxNQUFLLE1BQU0sQ0FBQSxJQUFFLEtBQUcsQ0FBQSxLQUFJLE1BQUksRUFBRSxVQUFRLE1BQUksSUFBSSxDQUFDLFFBQU87NEJBQUMsRUFBRSxLQUFHLEdBQUUsNEJBQTJCLEVBQUUsS0FBRyxLQUFHLElBQUUsRUFBRSxRQUFPLDhCQUE2QixFQUFFLEtBQUcsS0FBRyxJQUFFLElBQUksQ0FBQyxRQUFPLDhCQUE2QixFQUFFLEtBQUcsS0FBRyxLQUFHLElBQUksQ0FBQyxRQUFPLDRCQUEyQixJQUFFLElBQUksQ0FBQyxVQUFTLENBQUEsSUFBRSxJQUFJLENBQUMsTUFBSzs0QkFBRyxJQUFJLElBQUUsQUFBQyxDQUFBLElBQUUsRUFBRSxTQUFPLElBQUUsSUFBRSxJQUFFLEVBQUUsU0FBTyxJQUFFLElBQUUsQ0FBQSxJQUFHOzRCQUFFLElBQUcsSUFBRSxPQUFLLENBQUMsRUFBRSxpQkFBZ0IsSUFBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBSSxDQUFDLENBQUMsSUFBRSxFQUFFLEdBQUMsSUFBSSxDQUFDLElBQUUsRUFBRTtpQ0FBTSxFQUFFLEtBQUssSUFBSSxDQUFDLFNBQVMsR0FBRSxJQUFFLElBQUc7d0JBQUU7b0JBQUMsR0FBRSxFQUFFLFVBQVUsUUFBTSxTQUFTLENBQUMsRUFBQyxDQUFDO3dCQUFFLElBQUksSUFBRSxJQUFJLENBQUM7d0JBQU8sSUFBRyxJQUFFLEVBQUUsR0FBRSxHQUFFLElBQUcsSUFBRSxFQUFFLEdBQUUsR0FBRSxJQUFHLEVBQUUsaUJBQWdCLE9BQU8sRUFBRSxTQUFTLElBQUksQ0FBQyxTQUFTLEdBQUU7d0JBQUksSUFBSSxJQUFJLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBSSxFQUFFLEdBQUUsS0FBSyxHQUFFLENBQUMsSUFBRyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsSUFBRSxFQUFFO3dCQUFDLE9BQU87b0JBQUMsR0FBRSxFQUFFLFVBQVUsTUFBSSxTQUFTLENBQUM7d0JBQUUsT0FBTyxRQUFRLElBQUksOERBQTZELElBQUksQ0FBQyxVQUFVO29CQUFFLEdBQUUsRUFBRSxVQUFVLE1BQUksU0FBUyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxPQUFPLFFBQVEsSUFBSSw4REFBNkQsSUFBSSxDQUFDLFdBQVcsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxZQUFVLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsSUFBRyxLQUFJLENBQUEsRUFBRSxRQUFNLEdBQUUsbUJBQWtCLEVBQUUsSUFBRSxJQUFJLENBQUMsUUFBTyxzQ0FBcUMsR0FBRyxDQUFFLENBQUEsS0FBRyxJQUFJLENBQUMsTUFBSyxHQUFHLE9BQU8sSUFBSSxDQUFDLEVBQUU7b0JBQUEsR0FBRSxFQUFFLFVBQVUsZUFBYSxTQUFTLENBQUMsRUFBQyxDQUFDO3dCQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsR0FBRSxDQUFDLEdBQUU7b0JBQUUsR0FBRSxFQUFFLFVBQVUsZUFBYSxTQUFTLENBQUMsRUFBQyxDQUFDO3dCQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsR0FBRSxDQUFDLEdBQUU7b0JBQUUsR0FBRSxFQUFFLFVBQVUsZUFBYSxTQUFTLENBQUMsRUFBQyxDQUFDO3dCQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsR0FBRSxDQUFDLEdBQUU7b0JBQUUsR0FBRSxFQUFFLFVBQVUsZUFBYSxTQUFTLENBQUMsRUFBQyxDQUFDO3dCQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsR0FBRSxDQUFDLEdBQUU7b0JBQUUsR0FBRSxFQUFFLFVBQVUsV0FBUyxTQUFTLENBQUMsRUFBQyxDQUFDO3dCQUFFLElBQUcsS0FBSSxDQUFBLEVBQUUsUUFBTSxHQUFFLG1CQUFrQixFQUFFLElBQUUsSUFBSSxDQUFDLFFBQU8sc0NBQXFDLEdBQUcsQ0FBRSxDQUFBLEtBQUcsSUFBSSxDQUFDLE1BQUssR0FBRyxPQUFPLE1BQUksSUFBSSxDQUFDLEVBQUUsR0FBQyxLQUFJLENBQUEsTUFBSSxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUEsSUFBRyxJQUFJLENBQUMsRUFBRTtvQkFBQSxHQUFFLEVBQUUsVUFBVSxjQUFZLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFFLENBQUMsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxjQUFZLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFFLENBQUMsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxjQUFZLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFFLENBQUMsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxjQUFZLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFFLENBQUMsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxjQUFZLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFFLENBQUMsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxjQUFZLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFFLENBQUMsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxlQUFhLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFFLENBQUMsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxlQUFhLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFFLENBQUMsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxhQUFXLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLEtBQUksQ0FBQSxFQUFFLFFBQU0sR0FBRSxrQkFBaUIsRUFBRSxRQUFNLEdBQUUsbUJBQWtCLEVBQUUsSUFBRSxJQUFJLENBQUMsUUFBTyx5Q0FBd0MsRUFBRSxHQUFFLElBQUcsR0FBRyxLQUFHLElBQUksQ0FBQyxVQUFTLENBQUEsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFBO29CQUFFLEdBQUUsRUFBRSxVQUFVLGdCQUFjLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLEVBQUUsSUFBSSxFQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUU7b0JBQUUsR0FBRSxFQUFFLFVBQVUsZ0JBQWMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsRUFBRSxJQUFJLEVBQUMsR0FBRSxHQUFFLENBQUMsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxnQkFBYyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxFQUFFLElBQUksRUFBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFO29CQUFFLEdBQUUsRUFBRSxVQUFVLGdCQUFjLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLEVBQUUsSUFBSSxFQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUU7b0JBQUUsR0FBRSxFQUFFLFVBQVUsWUFBVSxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxLQUFJLENBQUEsRUFBRSxRQUFNLEdBQUUsa0JBQWlCLEVBQUUsUUFBTSxHQUFFLG1CQUFrQixFQUFFLElBQUUsSUFBSSxDQUFDLFFBQU8seUNBQXdDLEVBQUUsR0FBRSxLQUFJLEtBQUksR0FBRyxLQUFHLElBQUksQ0FBQyxVQUFTLENBQUEsS0FBRyxJQUFFLElBQUksQ0FBQyxXQUFXLEdBQUUsR0FBRSxLQUFHLElBQUksQ0FBQyxXQUFXLE1BQUksSUFBRSxHQUFFLEdBQUUsRUFBQztvQkFBRSxHQUFFLEVBQUUsVUFBVSxlQUFhLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLEVBQUUsSUFBSSxFQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUU7b0JBQUUsR0FBRSxFQUFFLFVBQVUsZUFBYSxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxFQUFFLElBQUksRUFBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFO29CQUFFLEdBQUUsRUFBRSxVQUFVLGVBQWEsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsRUFBRSxJQUFJLEVBQUMsR0FBRSxHQUFFLENBQUMsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxlQUFhLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLEVBQUUsSUFBSSxFQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUU7b0JBQUUsR0FBRSxFQUFFLFVBQVUsZUFBYSxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxFQUFFLElBQUksRUFBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFO29CQUFFLEdBQUUsRUFBRSxVQUFVLGVBQWEsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsRUFBRSxJQUFJLEVBQUMsR0FBRSxHQUFFLENBQUMsR0FBRTtvQkFBRSxHQUFFLEVBQUUsVUFBVSxnQkFBYyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxFQUFFLElBQUksRUFBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFO29CQUFFLEdBQUUsRUFBRSxVQUFVLGdCQUFjLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLEVBQUUsSUFBSSxFQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUU7b0JBQUUsR0FBRSxFQUFFLFVBQVUsT0FBSyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxJQUFHLElBQUUsS0FBRyxHQUFFLElBQUUsS0FBRyxJQUFJLENBQUMsUUFBTyxFQUFFLFlBQVUsT0FBTyxDQUFBLElBQUUsWUFBVSxPQUFPLENBQUEsSUFBRSxLQUFHLENBQUEsSUFBRyxFQUFFLFdBQVcsS0FBRyxDQUFBLEtBQUksQ0FBQyxNQUFNLElBQUcsMEJBQXlCLEVBQUUsS0FBRyxHQUFFLGdCQUFlLE1BQUksS0FBRyxNQUFJLElBQUksQ0FBQyxRQUFPOzRCQUFDLEVBQUUsS0FBRyxLQUFHLElBQUUsSUFBSSxDQUFDLFFBQU8sd0JBQXVCLEVBQUUsS0FBRyxLQUFHLEtBQUcsSUFBSSxDQUFDLFFBQU87NEJBQXFCLElBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBQzt3QkFBQztvQkFBQyxHQUFFLEVBQUUsVUFBVSxVQUFRO3dCQUFXLElBQUksSUFBSSxJQUFFLEVBQUUsRUFBQyxJQUFFLElBQUksQ0FBQyxRQUFPLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBSSxJQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFFLE1BQUksRUFBRSxtQkFBa0I7NEJBQUMsQ0FBQyxDQUFDLElBQUUsRUFBRSxHQUFDOzRCQUFNO3dCQUFLO3dCQUFDLE9BQU0sYUFBVyxFQUFFLEtBQUssT0FBSztvQkFBRyxHQUFFLEVBQUUsVUFBVSxnQkFBYzt3QkFBVyxJQUFHLGVBQWEsT0FBTyxZQUFXLE1BQU0sSUFBSSxNQUFNO3dCQUFzRCxJQUFHLEVBQUUsaUJBQWdCLE9BQU8sSUFBSSxFQUFFLElBQUksRUFBRTt3QkFBTyxJQUFJLElBQUksSUFBRSxJQUFJLFdBQVcsSUFBSSxDQUFDLFNBQVEsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUUsR0FBRSxLQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsRUFBRTt3QkFBQyxPQUFPLEVBQUU7b0JBQU07b0JBQUUsSUFBSSxJQUFFLEVBQUU7b0JBQVUsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxPQUFNLFlBQVUsT0FBTyxJQUFFLElBQUUsS0FBSSxDQUFBLElBQUUsQ0FBQyxDQUFDLENBQUEsSUFBRyxJQUFFLEtBQUcsS0FBRyxLQUFJLENBQUEsS0FBRyxDQUFBLElBQUcsSUFBRTtvQkFBQztvQkFBQyxTQUFTLEVBQUUsQ0FBQzt3QkFBRSxPQUFNLEFBQUMsQ0FBQSxJQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFDLElBQUcsSUFBRSxJQUFFO29CQUFDO29CQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUFFLE9BQU0sQUFBQyxDQUFBLE1BQU0sV0FBUyxTQUFTLENBQUM7NEJBQUUsT0FBTSxxQkFBbUIsT0FBTyxVQUFVLFNBQVMsS0FBSzt3QkFBRSxDQUFBLEVBQUc7b0JBQUU7b0JBQUMsU0FBUyxFQUFFLENBQUM7d0JBQUUsT0FBTyxJQUFFLEtBQUcsTUFBSSxFQUFFLFNBQVMsTUFBSSxFQUFFLFNBQVM7b0JBQUc7b0JBQUMsU0FBUyxFQUFFLENBQUM7d0JBQUUsSUFBSSxJQUFJLElBQUUsRUFBRSxFQUFDLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJOzRCQUFDLElBQUksSUFBRSxFQUFFLFdBQVc7NEJBQUcsSUFBRyxLQUFHLEtBQUksRUFBRSxLQUFLLEVBQUUsV0FBVztpQ0FBUyxJQUFJLElBQUksSUFBRSxHQUFFLElBQUcsQ0FBQSxTQUFPLEtBQUcsS0FBRyxTQUFPLEtBQUksbUJBQW1CLEVBQUUsTUFBTSxHQUFFLElBQUUsSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFHLEdBQUcsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBQzt3QkFBSTt3QkFBQyxPQUFPO29CQUFDO29CQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUFFLE9BQU8sRUFBRSxZQUFZO29CQUFFO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLElBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxLQUFHLENBQUUsQ0FBQSxJQUFFLEtBQUcsRUFBRSxVQUFRLEtBQUcsRUFBRSxNQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBRSxFQUFFLEdBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQUMsT0FBTztvQkFBQztvQkFBQyxTQUFTLEVBQUUsQ0FBQzt3QkFBRSxJQUFHOzRCQUFDLE9BQU8sbUJBQW1CO3dCQUFFLEVBQUMsT0FBTSxHQUFFOzRCQUFDLE9BQU8sT0FBTyxhQUFhO3dCQUFNO29CQUFDO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxFQUFFLFlBQVUsT0FBTyxHQUFFLDBDQUF5QyxFQUFFLEtBQUcsR0FBRSw2REFBNEQsRUFBRSxLQUFHLEdBQUUsZ0RBQStDLEVBQUUsS0FBSyxNQUFNLE9BQUssR0FBRTtvQkFBbUM7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxFQUFFLFlBQVUsT0FBTyxHQUFFLDBDQUF5QyxFQUFFLEtBQUcsR0FBRSw0Q0FBMkMsRUFBRSxLQUFHLEdBQUUsNkNBQTRDLEVBQUUsS0FBSyxNQUFNLE9BQUssR0FBRTtvQkFBbUM7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxFQUFFLFlBQVUsT0FBTyxHQUFFLDBDQUF5QyxFQUFFLEtBQUcsR0FBRSw0Q0FBMkMsRUFBRSxLQUFHLEdBQUU7b0JBQTJDO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxJQUFHLENBQUMsR0FBRSxNQUFNLElBQUksTUFBTSxLQUFHO29CQUFtQjtvQkFBQyxFQUFFLFdBQVMsU0FBUyxDQUFDO3dCQUFFLE9BQU8sRUFBRSxZQUFVLENBQUMsR0FBRSxFQUFFLE9BQUssRUFBRSxLQUFJLEVBQUUsT0FBSyxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsUUFBTSxFQUFFLE9BQU0sRUFBRSxXQUFTLEVBQUUsVUFBUyxFQUFFLGlCQUFlLEVBQUUsVUFBUyxFQUFFLFNBQU8sRUFBRSxRQUFPLEVBQUUsT0FBSyxFQUFFLE1BQUssRUFBRSxRQUFNLEVBQUUsT0FBTSxFQUFFLFlBQVUsRUFBRSxXQUFVLEVBQUUsZUFBYSxFQUFFLGNBQWEsRUFBRSxlQUFhLEVBQUUsY0FBYSxFQUFFLGVBQWEsRUFBRSxjQUFhLEVBQUUsZUFBYSxFQUFFLGNBQWEsRUFBRSxXQUFTLEVBQUUsVUFBUyxFQUFFLGNBQVksRUFBRSxhQUFZLEVBQUUsY0FBWSxFQUFFLGFBQVksRUFBRSxjQUFZLEVBQUUsYUFBWSxFQUFFLGNBQVksRUFBRSxhQUFZLEVBQUUsY0FBWSxFQUFFLGFBQVksRUFBRSxjQUFZLEVBQUUsYUFBWSxFQUFFLGVBQWEsRUFBRSxjQUFhLEVBQUUsZUFBYSxFQUFFLGNBQWEsRUFBRSxhQUFXLEVBQUUsWUFBVyxFQUFFLGdCQUFjLEVBQUUsZUFBYyxFQUFFLGdCQUFjLEVBQUUsZUFBYyxFQUFFLGdCQUFjLEVBQUUsZUFBYyxFQUFFLGdCQUFjLEVBQUUsZUFBYyxFQUFFLFlBQVUsRUFBRSxXQUFVLEVBQUUsZUFBYSxFQUFFLGNBQWEsRUFBRSxlQUFhLEVBQUUsY0FBYSxFQUFFLGVBQWEsRUFBRSxjQUFhLEVBQUUsZUFBYSxFQUFFLGNBQWEsRUFBRSxlQUFhLEVBQUUsY0FBYSxFQUFFLGVBQWEsRUFBRSxjQUFhLEVBQUUsZ0JBQWMsRUFBRSxlQUFjLEVBQUUsZ0JBQWMsRUFBRSxlQUFjLEVBQUUsT0FBSyxFQUFFLE1BQUssRUFBRSxVQUFR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O3dCQUFFLENBQUMsQ0FBQyxLQUFHLEVBQUUsSUFBRSxPQUFLLElBQUUsSUFBRyxDQUFDLENBQUMsS0FBSSxDQUFBLElBQUUsT0FBSyxLQUFHLENBQUEsRUFBRyxHQUFDO3dCQUFFLElBQUksSUFBSSxJQUFFLFlBQVcsSUFBRSxZQUFXLElBQUUsYUFBWSxJQUFFLFdBQVUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUcsR0FBRzs0QkFBQyxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsWUFBVyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRzs0QkFBYSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsY0FBYSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxZQUFXLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxHQUFFLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsY0FBYSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsSUFBRyxTQUFRLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLGNBQWEsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLEdBQUUsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsSUFBRyxZQUFXLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLGNBQWEsSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsYUFBWSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEdBQUUsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLFlBQVcsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxHQUFFLFdBQVUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxHQUFFLFlBQVcsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLEdBQUUsY0FBYSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLEdBQUUsY0FBYSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxZQUFXLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsY0FBYSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEdBQUUsVUFBUyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsWUFBVyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsSUFBRyxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxHQUFFLFlBQVcsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLFdBQVUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEdBQUUsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsSUFBRyxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLFlBQVcsSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsYUFBWSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEdBQUUsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLGNBQWEsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsWUFBVyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsR0FBRSxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGNBQWEsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsV0FBVSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxHQUFFLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsWUFBVyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEdBQUUsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsSUFBRyxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLFlBQVcsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsYUFBWSxJQUFFLEVBQUUsR0FBRSxJQUFHLElBQUUsRUFBRSxHQUFFLElBQUcsSUFBRSxFQUFFLEdBQUUsSUFBRyxJQUFFLEVBQUUsR0FBRTt3QkFBRTt3QkFBQyxPQUFPLE1BQU0sR0FBRSxHQUFFLEdBQUU7b0JBQUU7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxPQUFPLEVBQUUsQUFBQyxDQUFBLElBQUUsRUFBRSxFQUFFLEdBQUUsSUFBRyxFQUFFLEdBQUUsR0FBRSxLQUFJLElBQUUsTUFBSSxLQUFHLEdBQUU7b0JBQUU7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO29CQUFFO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLE9BQU8sRUFBRSxJQUFFLElBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtvQkFBRTtvQkFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxPQUFPLEVBQUUsSUFBRSxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtvQkFBRTtvQkFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxPQUFPLEVBQUUsSUFBRyxDQUFBLElBQUUsQ0FBQyxDQUFBLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtvQkFBRTtvQkFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUM7d0JBQUUsSUFBSSxJQUFFLEFBQUMsQ0FBQSxRQUFNLENBQUEsSUFBSSxDQUFBLFFBQU0sQ0FBQTt3QkFBRyxPQUFNLEFBQUMsQ0FBQSxLQUFHLEVBQUMsSUFBSSxDQUFBLEtBQUcsRUFBQyxJQUFJLENBQUEsS0FBRyxFQUFDLEtBQUksS0FBRyxRQUFNO29CQUFDO29CQUFDLEVBQUUsVUFBUSxTQUFTLENBQUM7d0JBQUUsT0FBTyxFQUFFLEtBQUssR0FBRSxHQUFFO29CQUFHO2dCQUFDLENBQUEsRUFBRSxLQUFLLElBQUksRUFBQyxFQUFFLFdBQVUsZUFBYSxPQUFPLE9BQUssT0FBSyxlQUFhLE9BQU8sU0FBTyxTQUFPLENBQUMsR0FBRSxFQUFFLFVBQVUsUUFBTyxTQUFTLENBQUMsRUFBRSxFQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxTQUFTLENBQUMsRUFBRSxFQUFDLHVFQUFzRTtZQUErRDtZQUFFO2dCQUFDLGFBQVk7Z0JBQUUsUUFBTztnQkFBRSxRQUFPO1lBQUU7U0FBRTtRQUFDLEdBQUU7WUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztnQkFBRyxDQUFBLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO29CQUFFLElBQUk7b0JBQUUsRUFBRSxVQUFRLEtBQUcsU0FBUyxDQUFDO3dCQUFFLElBQUksSUFBSSxHQUFFLElBQUUsSUFBSSxNQUFNLElBQUcsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLEtBQUksQ0FBQSxJQUFFLENBQUEsS0FBSyxDQUFBLElBQUUsYUFBVyxLQUFLLFFBQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFDLE1BQUssQ0FBQSxBQUFDLENBQUEsSUFBRSxDQUFBLEtBQUksQ0FBQSxJQUFHO3dCQUFJLE9BQU87b0JBQUM7Z0JBQUMsQ0FBQSxFQUFFLEtBQUssSUFBSSxFQUFDLEVBQUUsV0FBVSxlQUFhLE9BQU8sT0FBSyxPQUFLLGVBQWEsT0FBTyxTQUFPLFNBQU8sQ0FBQyxHQUFFLEVBQUUsVUFBVSxRQUFPLFNBQVMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxTQUFTLENBQUMsRUFBRSxFQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsdUVBQXNFO1lBQStEO1lBQUU7Z0JBQUMsUUFBTztnQkFBRSxRQUFPO1lBQUU7U0FBRTtRQUFDLEdBQUU7WUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztnQkFBRyxDQUFBLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO29CQUFFLElBQUksSUFBRSxFQUFFO29CQUFhLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxDQUFDLENBQUMsS0FBRyxFQUFFLElBQUUsT0FBSyxLQUFHLElBQUUsSUFBRyxDQUFDLENBQUMsS0FBSSxDQUFBLElBQUUsTUFBSSxLQUFHLENBQUEsRUFBRyxHQUFDO3dCQUFFLElBQUksSUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLE1BQU0sS0FBSSxJQUFFLFlBQVcsSUFBRSxZQUFXLElBQUUsYUFBWSxJQUFFLFdBQVUsSUFBRSxhQUFZLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFHLEdBQUc7NEJBQUMsSUFBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFJO2dDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUMsSUFBRSxLQUFHLENBQUMsQ0FBQyxJQUFFLEVBQUUsR0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsR0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLEdBQUMsQ0FBQyxDQUFDLElBQUUsR0FBRyxHQUFDLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQztnQ0FBRyxJQUFJLElBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRSxJQUFJLENBQUEsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsQUFBQyxDQUFBLElBQUUsQ0FBQSxJQUFHLEtBQUcsSUFBRSxJQUFFLENBQUMsSUFBRSxJQUFFLENBQUUsQ0FB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SSxDQUFBLElBQUUsTUFBSSxLQUFHLENBQUEsRUFBRyxHQUFDO3dCQUFFLElBQUksSUFBSSxHQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUcsR0FBRzs0QkFBQyxJQUFJLElBQUksSUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxJQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxJQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBQyxJQUFFLEtBQUcsQ0FBQyxDQUFDLElBQUUsRUFBRSxHQUFDLEVBQUUsRUFBRSxFQUFHLENBQUEsSUFBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsRUFBRSxHQUFFLE1BQUksRUFBRSxHQUFFLE1BQUksRUFBRSxHQUFFLEdBQUUsR0FBRyxDQUFDLENBQUMsSUFBRSxFQUFFLEdBQUcsQ0FBQSxJQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxFQUFFLEdBQUUsS0FBRyxFQUFFLEdBQUUsTUFBSSxFQUFFLEdBQUUsRUFBQyxJQUFJLENBQUMsQ0FBQyxJQUFFLEdBQUcsR0FBRSxJQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRSxFQUFFLElBQUUsR0FBRSxLQUFHLEVBQUUsR0FBRSxNQUFJLEVBQUUsR0FBRSxNQUFLLElBQUUsSUFBRSxDQUFDLElBQUUsSUFBRyxDQUFDLENBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsSUFBRSxHQUFFLEtBQUcsRUFBRSxHQUFFLE1BQUksRUFBRSxHQUFFLEtBQUksSUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEVBQUUsR0FBRTs0QkFBRyxDQUFDLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBRSxDQUFDLENBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRSxDQUFDLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBRSxDQUFDLENBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRSxDQUFDLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBRSxDQUFDLENBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFO3dCQUFDO3dCQUFDLE9BQU87b0JBQUM7b0JBQUMsSUFBSSxJQUFFLEVBQUUsY0FBYSxJQUFFLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxNQUFJLElBQUUsS0FBRyxLQUFHO29CQUFDLEdBQUUsSUFBRSxTQUFTLENBQUMsRUFBQyxDQUFDO3dCQUFFLE9BQU8sTUFBSTtvQkFBQztvQkFBRSxFQUFFLFVBQVEsU0FBUyxDQUFDO3dCQUFFLE9BQU8sRUFBRSxLQUFLLEdBQUUsR0FBRSxJQUFHLENBQUM7b0JBQUU7Z0JBQUMsQ0FBQSxFQUFFLEtBQUssSUFBSSxFQUFDLEVBQUUsV0FBVSxlQUFhLE9BQU8sT0FBSyxPQUFLLGVBQWEsT0FBTyxTQUFPLFNBQU8sQ0FBQyxHQUFFLEVBQUUsVUFBVSxRQUFPLFNBQVMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxTQUFTLENBQUMsRUFBRSxFQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsMEVBQXlFO1lBQStEO1lBQUU7Z0JBQUMsYUFBWTtnQkFBRSxRQUFPO2dCQUFFLFFBQU87WUFBRTtTQUFFO1FBQUMsSUFBRztZQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO2dCQUFHLENBQUEsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7b0JBQUUsRUFBRSxPQUFLLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsSUFBSSxHQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsQUFBQyxDQUFBLEtBQUcsQ0FBQSxJQUFHLEdBQUUsSUFBRSxLQUFHLEdBQUUsSUFBRSxJQUFHLElBQUUsSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUUsS0FBRyxHQUFFLElBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRTt3QkFBQyxJQUFJLEtBQUcsR0FBRSxJQUFFLElBQUUsQUFBQyxDQUFBLEtBQUcsQ0FBQyxDQUFBLElBQUcsR0FBRSxNQUFJLENBQUMsR0FBRSxLQUFHLEdBQUUsSUFBRSxHQUFFLElBQUUsTUFBSSxJQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxLQUFHLEdBQUUsS0FBRzt3QkFBRyxJQUFJLElBQUUsSUFBRSxBQUFDLENBQUEsS0FBRyxDQUFDLENBQUEsSUFBRyxHQUFFLE1BQUksQ0FBQyxHQUFFLEtBQUcsR0FBRSxJQUFFLEdBQUUsSUFBRSxNQUFJLElBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEtBQUcsR0FBRSxLQUFHO3dCQUFHLElBQUcsTUFBSSxHQUFFLElBQUUsSUFBRTs2QkFBTTs0QkFBQyxJQUFHLE1BQUksR0FBRSxPQUFPLElBQUUsTUFBSSxJQUFFLElBQUcsQ0FBQSxJQUFFLEtBQUcsQ0FBQTs0QkFBRyxLQUFHLEtBQUssSUFBSSxHQUFFLElBQUcsS0FBRzt3QkFBQzt3QkFBQyxPQUFNLEFBQUMsQ0FBQSxJQUFFLEtBQUcsQ0FBQSxJQUFHLElBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRTtvQkFBRSxHQUFFLEVBQUUsUUFBTSxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxJQUFJLEdBQUUsR0FBRSxJQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxBQUFDLENBQUEsS0FBRyxDQUFBLElBQUcsR0FBRSxJQUFFLEtBQUcsR0FBRSxJQUFFLE9BQUssSUFBRSxLQUFLLElBQUksR0FBRSxPQUFLLEtBQUssSUFBSSxHQUFFLE9BQUssR0FBRSxJQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsS0FBRyxNQUFJLEtBQUcsSUFBRSxJQUFFLElBQUUsSUFBRTt3QkFBRSxJQUFJLElBQUUsS0FBSyxJQUFJLElBQUcsTUFBTSxNQUFJLE1BQUksSUFBRSxJQUFHLENBQUEsSUFBRSxNQUFNLEtBQUcsSUFBRSxHQUFFLElBQUUsQ0FBQSxJQUFJLENBQUEsSUFBRSxLQUFLLE1BQU0sS0FBSyxJQUFJLEtBQUcsS0FBSyxNQUFLLElBQUcsQ0FBQSxJQUFFLEtBQUssSUFBSSxHQUFFLENBQUMsRUFBQyxJQUFHLEtBQUksQ0FBQSxLQUFJLEtBQUcsQ0FBQSxHQUFHLEtBQUcsQUFBQyxDQUFBLEtBQUcsS0FBRyxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRSxFQUFDLElBQUcsS0FBSSxDQUFBLEtBQUksS0FBRyxDQUFBLEdBQUcsS0FBRyxJQUFFLElBQUcsQ0FBQSxJQUFFLEdBQUUsSUFBRSxDQUFBLElBQUcsS0FBRyxJQUFFLElBQUcsQ0FBQSxJQUFFLEFBQUMsQ0FBQSxJQUFFLElBQUUsQ0FBQSxJQUFHLEtBQUssSUFBSSxHQUFFLElBQUcsS0FBRyxDQUFBLElBQUksQ0FBQSxJQUFFLElBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRSxLQUFHLEtBQUssSUFBSSxHQUFFLElBQUcsSUFB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QUFhO1lBQUUsUUFBUTtRQUFnQjtJQUN6QztBQUNGO0FBRUEsTUFBTSxnQkFBZ0I7SUFDcEIsT0FBTyxLQUFLLE1BQU07UUFBRSxRQUFRO1FBQU0sZUFBZTtJQUFLLEdBQUcsU0FBVSxJQUFJO1FBQ3JFLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUNWLE9BQU8sS0FBSyxZQUFZLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSTtZQUFFLFFBQVE7UUFBZTtJQUVqRTtBQUNGIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvLnBucG0vQHBsYXNtb2hxK3BhcmNlbC1ydW50aW1lQDAuMjIuMC9ub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC1ydW50aW1lL2Rpc3QvcnVudGltZS0wNmRjYjdlNjI5ODdlZTBlLmpzIiwiLnBsYXNtby9zdGF0aWMvYmFja2dyb3VuZC9pbmRleC50cyIsInNyYy9iYWNrZ3JvdW5kL2luZGV4LnRzIiwic3JjL2xpYi9sb2dzLnRzeCIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3RyYW5zZm9ybWVyLWpzQDIuOS4zX0BwYXJjZWwrY29yZUAyLjkuMy9ub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsInNyYy9iYWNrZ3JvdW5kL3F1aWNrLW1lbnUvY3JlYXRlQ29udGV4dE1lbnUudHMiLCJzcmMvbGliL2dldFN0b3JlZFByb21wdHMudHMiLCJzcmMvY29uZmlnL3Byb21wdHMvZGVmYXVsdC50cyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9lbmRlbnRAMi4xLjAvbm9kZV9tb2R1bGVzL2VuZGVudC9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvLnBucG0vZGVkZW50QDAuNy4wL25vZGVfbW9kdWxlcy9kZWRlbnQvZGlzdC9kZWRlbnQuanMiLCJub2RlX21vZHVsZXMvLnBucG0vb2JqZWN0b3JhcnJheUAxLjAuNS9ub2RlX21vZHVsZXMvb2JqZWN0b3JhcnJheS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9mYXN0LWpzb24tcGFyc2VAMS4wLjMvbm9kZV9tb2R1bGVzL2Zhc3QtanNvbi1wYXJzZS9wYXJzZS5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9vYmplY3QtaGFzaEAzLjAuMC9ub2RlX21vZHVsZXMvb2JqZWN0LWhhc2gvZGlzdC9vYmplY3RfaGFzaC5qcyIsInNyYy9iYWNrZ3JvdW5kL3F1aWNrLW1lbnUvZm9yd2FyZENvbnRleHRNZW51LnRzIiwic3JjL2JhY2tncm91bmQvc2lkZWJhci9zZW5kU2lkZWJhclNob3J0Y3V0LnRzIiwic3JjL2JhY2tncm91bmQvc2lkZWJhci9zaWRlYmFyVG9nZ2xlTGlzdGVuZXJzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB1PXR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmFyZ3Y6W107dmFyIGg9KCk9PnR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmVudjp7fTt2YXIgQj1uZXcgU2V0KHUpLF89ZT0+Qi5oYXMoZSksRz11LmZpbHRlcihlPT5lLnN0YXJ0c1dpdGgoXCItLVwiKSYmZS5pbmNsdWRlcyhcIj1cIikpLm1hcChlPT5lLnNwbGl0KFwiPVwiKSkucmVkdWNlKChlLFt0LG9dKT0+KGVbdF09byxlKSx7fSk7dmFyIFU9XyhcIi0tZHJ5LXJ1blwiKSxnPSgpPT5fKFwiLS12ZXJib3NlXCIpfHxoKCkuVkVSQk9TRT09PVwidHJ1ZVwiLE49ZygpO3ZhciBtPShlPVwiXCIsLi4udCk9PmNvbnNvbGUubG9nKGUucGFkRW5kKDkpLFwifFwiLC4uLnQpO3ZhciB5PSguLi5lKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4uZSksYj0oLi4uZSk9Pm0oXCJcXHV7MUY1MzV9IElORk9cIiwuLi5lKSxmPSguLi5lKT0+bShcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLmUpLE09MCxpPSguLi5lKT0+ZygpJiZtKGBcXHV7MUY3RTF9ICR7TSsrfWAsLi4uZSk7dmFyIHY9KCk9PntsZXQgZT1nbG9iYWxUaGlzLmJyb3dzZXI/LnJ1bnRpbWV8fGdsb2JhbFRoaXMuY2hyb21lPy5ydW50aW1lLHQ9KCk9PnNldEludGVydmFsKGUuZ2V0UGxhdGZvcm1JbmZvLDI0ZTMpO2Uub25TdGFydHVwLmFkZExpc3RlbmVyKHQpLHQoKX07dmFyIG49e1wiaXNDb250ZW50U2NyaXB0XCI6ZmFsc2UsXCJpc0JhY2tncm91bmRcIjp0cnVlLFwiaXNSZWFjdFwiOmZhbHNlLFwicnVudGltZXNcIjpbXCJiYWNrZ3JvdW5kLXNlcnZpY2UtcnVudGltZVwiXSxcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjE4MTUsXCJlbnRyeUZpbGVQYXRoXCI6XCIvVXNlcnMvc3J1amFuZ3VycmFtL1Byb2plY3RzL3BlcnNvbmFsL1N5bmNpYS8ucGxhc21vL3N0YXRpYy9iYWNrZ3JvdW5kL2luZGV4LnRzXCIsXCJidW5kbGVJZFwiOlwiYzMzODkwOGU3MDRjOTFmMVwiLFwiZW52SGFzaFwiOlwiZDk5YTVmZmE1N2FjZDYzOFwiLFwidmVyYm9zZVwiOlwiZmFsc2VcIixcInNlY3VyZVwiOmZhbHNlLFwic2VydmVyUG9ydFwiOjUyNjY1fTttb2R1bGUuYnVuZGxlLkhNUl9CVU5ETEVfSUQ9bi5idW5kbGVJZDtnbG9iYWxUaGlzLnByb2Nlc3M9e2FyZ3Y6W10sZW52OntWRVJCT1NFOm4udmVyYm9zZX19O3ZhciBEPW1vZHVsZS5idW5kbGUuTW9kdWxlO2Z1bmN0aW9uIEgoZSl7RC5jYWxsKHRoaXMsZSksdGhpcy5ob3Q9e2RhdGE6bW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdLF9hY2NlcHRDYWxsYmFja3M6W10sX2Rpc3Bvc2VDYWxsYmFja3M6W10sYWNjZXB0OmZ1bmN0aW9uKHQpe3RoaXMuX2FjY2VwdENhbGxiYWNrcy5wdXNoKHR8fGZ1bmN0aW9uKCl7fSl9LGRpc3Bvc2U6ZnVuY3Rpb24odCl7dGhpcy5fZGlzcG9zZUNhbGxiYWNrcy5wdXNoKHQpfX0sbW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdPXZvaWQgMH1tb2R1bGUuYnVuZGxlLk1vZHVsZT1IO21vZHVsZS5idW5kbGUuaG90RGF0YT17fTt2YXIgYz1nbG9iYWxUaGlzLmJyb3dzZXJ8fGdsb2JhbFRoaXMuY2hyb21lfHxudWxsO2Z1bmN0aW9uIFIoKXtyZXR1cm4hbi5ob3N0fHxuLmhvc3Q9PT1cIjAuMC4wLjBcIj9sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKT09PTA/bG9jYXRpb24uaG9zdG5hbWU6XCJsb2NhbGhvc3RcIjpuLmhvc3R9ZnVuY3Rpb24geCgpe3JldHVybiFuLmhvc3R8fG4uaG9zdD09PVwiMC4wLjAuMFwiP1wibG9jYWxob3N0XCI6bi5ob3N0fWZ1bmN0aW9uIGQoKXtyZXR1cm4gbi5wb3J0fHxsb2NhdGlvbi5wb3J0fXZhciBQPVwiX19wbGFzbW9fcnVudGltZV9wYWdlX1wiLFM9XCJfX3BsYXNtb19ydW50aW1lX3NjcmlwdF9cIjt2YXIgTz1gJHtuLnNlY3VyZT9cImh0dHBzXCI6XCJodHRwXCJ9Oi8vJHtSKCl9OiR7ZCgpfS9gO2FzeW5jIGZ1bmN0aW9uIGsoZT0xNDcwKXtmb3IoOzspdHJ5e2F3YWl0IGZldGNoKE8pO2JyZWFrfWNhdGNoe2F3YWl0IG5ldyBQcm9taXNlKG89PnNldFRpbWVvdXQobyxlKSl9fWlmKGMucnVudGltZS5nZXRNYW5pZmVzdCgpLm1hbmlmZXN0X3ZlcnNpb249PT0zKXtsZXQgZT1jLnJ1bnRpbWUuZ2V0VVJMKFwiL19fcGxhc21vX2htcl9wcm94eV9fP3VybD1cIik7Z2xvYmFsVGhpcy5hZGRFdmVudExpc3RlbmVyKFwiZmV0Y2hcIixmdW5jdGlvbih0KXtsZXQgbz10LnJlcXVlc3QudXJsO2lmKG8uc3RhcnRzV2l0aChlKSl7bGV0IHM9bmV3IFVSTChkZWNvZGVVUklDb21wb25lbnQoby5zbGljZShlLmxlbmd0aCkpKTtzLmhvc3RuYW1lPT09bi5ob3N0JiZzLnBvcnQ9PT1gJHtuLnBvcnR9YD8ocy5zZWFyY2hQYXJhbXMuc2V0KFwidFwiLERhdGUubm93KCkudG9TdHJpbmcoKSksdC5yZXNwb25kV2l0aChmZXRjaChzKS50aGVuKHI9Pm5ldyBSZXNwb25zZShyLmJvZHkse2hlYWRlcnM6e1wiQ29udGVudC1UeXBlXCI6ci5oZWFkZXJzLmdldChcIkNvbnRlbnQtVHlwZVwiKT8/XCJ0ZXh0L2phdmFzY3JpcHRcIn19KSkpKTp0LnJlc3BvbmRXaXRoKG5ldyBSZXNwb25zZShcIlBsYXNtbyBITVJcIix7c3RhdHVzOjIwMCxzdGF0dXNUZXh0OlwiVGVzdGluZ1wifSkpfX0pfWZ1bmN0aW9uIEUoZSx0KXtsZXR7bW9kdWxlczpvfT1lO3JldHVybiBvPyEhb1t0XTohMX1mdW5jdGlvbiBDKGU9ZCgpKXtsZXQgdD14KCk7cmV0dXJuYCR7bi5zZWN1cmV8fGxvY2F0aW9uLnByb3RvY29sPT09XCJodHRwczpcIiYmIS9sb2NhbGhvc3R8MTI3LjAuMC4xfDAuMC4wLjAvLnRlc3QodCk/XCJ3c3NcIjpcIndzXCJ9Oi8vJHt0fToke2V9L2B9ZnVuY3Rpb24gVChlKXt0eXBlb2YgZS5tZXNzYWdlPT1cInN0cmluZ1wiJiZ5KFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2UubWVzc2FnZSl9ZnVuY3Rpb24gTChlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQoQyhOdW1iZXIoZCgpKSsxKSk7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixhc3luYyBmdW5jdGlvbihvKXtsZXQgcz1KU09OLnBhcnNlKG8uZGF0YSk7YXdhaXQgZShzKX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsVCksdH1mdW5jdGlvbiBBKGUpe2lmKHR5cGVvZiBnbG9iYWxUaGlzLldlYlNvY2tldD5cInVcIilyZXR1cm47bGV0IHQ9bmV3IFdlYlNvY2tldChDKCkpO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYXN5bmMgZnVuY3Rpb24obyl7bGV0IHM9SlNPTi5wYXJzZShvLmRhdGEpO2lmKHMudHlwZT09PVwidXBkYXRlXCImJmF3YWl0IGUocy5hc3NldHMpLHMudHlwZT09PVwiZXJyb3JcIilmb3IobGV0IHIgb2Ygcy5kaWFnbm9zdGljcy5hbnNpKXtsZXQgbD1yLmNvZGVmcmFtZXx8ci5zdGFjaztmKFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK3IubWVzc2FnZStgXG5gK2wrYFxuXG5gK3IuaGludHMuam9pbihgXG5gKSl9fSksdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixUKSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsKCk9PntiKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGVkIHRvIEhNUiBzZXJ2ZXIgZm9yICR7bi5lbnRyeUZpbGVQYXRofWApfSksdC5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwoKT0+e2YoYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0aW9uIHRvIHRoZSBITVIgc2VydmVyIGlzIGNsb3NlZCBmb3IgJHtuLmVudHJ5RmlsZVBhdGh9YCl9KSx0fXZhciB3PW1vZHVsZS5idW5kbGUucGFyZW50LGE9e2J1aWxkUmVhZHk6ITEsYmdDaGFuZ2VkOiExLGNzQ2hhbmdlZDohMSxwYWdlQ2hhbmdlZDohMSxzY3JpcHRQb3J0czpuZXcgU2V0LHBhZ2VQb3J0czpuZXcgU2V0fTthc3luYyBmdW5jdGlvbiBwKGU9ITEpe2lmKGV8fGEuYnVpbGRSZWFkeSYmYS5wYWdlQ2hhbmdlZCl7aShcIkJHU1cgUnVudGltZSAtIHJlbG9hZGluZyBQYWdlXCIpO2ZvcihsZXQgdCBvZiBhLnBhZ2VQb3J0cyl0LnBvc3RNZXNzYWdlKG51bGwpfWlmKGV8fGEuYnVpbGRSZWFkeSYmKGEuYmdDaGFuZ2VkfHxhLmNzQ2hhbmdlZCkpe2koXCJCR1NXIFJ1bnRpbWUgLSByZWxvYWRpbmcgQ1NcIik7bGV0IHQ9YXdhaXQgYz8udGFicy5xdWVyeSh7YWN0aXZlOiEwfSk7Zm9yKGxldCBvIG9mIGEuc2NyaXB0UG9ydHMpe2xldCBzPXQuc29tZShyPT5yLmlkPT09by5zZW5kZXIudGFiPy5pZCk7by5wb3N0TWVzc2FnZSh7X19wbGFzbW9fY3NfYWN0aXZlX3RhYl9fOnN9KX1jLnJ1bnRpbWUucmVsb2FkKCl9fWlmKCF3fHwhdy5pc1BhcmNlbFJlcXVpcmUpe3YoKTtsZXQgZT1BKGFzeW5jIHQ9PntpKFwiQkdTVyBSdW50aW1lIC0gT24gSE1SIFVwZGF0ZVwiKSxhLmJnQ2hhbmdlZHx8PXQuZmlsdGVyKHM9PnMuZW52SGFzaD09PW4uZW52SGFzaCkuc29tZShzPT5FKG1vZHVsZS5idW5kbGUscy5pZCkpO2xldCBvPXQuZmluZChzPT5zLnR5cGU9PT1cImpzb25cIik7aWYobyl7bGV0IHM9bmV3IFNldCh0Lm1hcChsPT5sLmlkKSkscj1PYmplY3QudmFsdWVzKG8uZGVwc0J5QnVuZGxlKS5tYXAobD0+T2JqZWN0LnZhbHVlcyhsKSkuZmxhdCgpO2EuYmdDaGFuZ2VkfHw9ci5ldmVyeShsPT5zLmhhcyhsKSl9cCgpfSk7ZS5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCgpPT57bGV0IHQ9c2V0SW50ZXJ2YWwoKCk9PmUuc2VuZChcInBpbmdcIiksMjRlMyk7ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwoKT0+Y2xlYXJJbnRlcnZhbCh0KSl9KSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLGFzeW5jKCk9Pnthd2FpdCBrKCkscCghMCl9KX1MKGFzeW5jIGU9Pntzd2l0Y2goaShcIkJHU1cgUnVudGltZSAtIE9uIEJ1aWxkIFJlcGFja2FnZWRcIiksZS50eXBlKXtjYXNlXCJidWlsZF9yZWFkeVwiOnthLmJ1aWxkUmVhZHl8fD0hMCxwKCk7YnJlYWt9Y2FzZVwiY3NfY2hhbmdlZFwiOnthLmNzQ2hhbmdlZHx8PSEwLHAoKTticmVha319fSk7Yy5ydW50aW1lLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihmdW5jdGlvbihlKXtsZXQgdD1lLm5hbWUuc3RhcnRzV2l0aChQKSxvPWUubmFtZS5zdGFydHNXaXRoKFMpO2lmKHR8fG8pe2xldCBzPXQ/YS5wYWdlUG9ydHM6YS5zY3JpcHRQb3J0cztzLmFkZChlKSxlLm9uRGlzY29ubmVjdC5hZGRMaXN0ZW5lcigoKT0+e3MuZGVsZXRlKGUpfSksZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocil7aShcIkJHU1cgUnVudGltZSAtIE9uIHNvdXJjZSBjaGFuZ2VkXCIsciksci5fX3BsYXNtb19jc19jaGFuZ2VkX18mJihhLmNzQ2hhbmdlZHx8PSEwKSxyLl9fcGxhc21vX3BhZ2VfY2hhbmdlZF9fJiYoYS5wYWdlQ2hhbmdlZHx8PSEwKSxwKCl9KX19KTtjLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHQpe3JldHVybiB0Ll9fcGxhc21vX2Z1bGxfcmVsb2FkX18mJihpKFwiQkdTVyBSdW50aW1lIC0gT24gdG9wLWxldmVsIGNvZGUgY2hhbmdlZFwiKSxwKCkpLCEwfSk7XG4iLCJpbXBvcnQgXCIuLi8uLi8uLi9zcmMvYmFja2dyb3VuZC9pbmRleFwiIiwiaW1wb3J0IHsgYmFja2dyb3VuZExvZyB9IGZyb20gJ35saWIvbG9ncydcbmltcG9ydCB7XG4gIGNyZWF0ZUNvbnRleHRNZW51LFxuICBjcmVhdGVDb250ZXh0TWVudU9uU3RvcmFnZUNoYW5nZSxcbn0gZnJvbSAnLi9xdWljay1tZW51L2NyZWF0ZUNvbnRleHRNZW51J1xuaW1wb3J0IHsgZm9yd2FyZENvbnRleHRNZW51Q2xpY2tzIH0gZnJvbSAnLi9xdWljay1tZW51L2ZvcndhcmRDb250ZXh0TWVudSdcbmltcG9ydCB7IHNlbmRTaWRlYmFyU2hvcnRjdXQgfSBmcm9tICcuL3NpZGViYXIvc2VuZFNpZGViYXJTaG9ydGN1dCdcbmltcG9ydCB7IHNpZGViYXJUb2dnbGVMaXN0ZW5lcnMgfSBmcm9tICcuL3NpZGViYXIvc2lkZWJhclRvZ2dsZUxpc3RlbmVycydcblxuYmFja2dyb3VuZExvZygpXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xuLy8gU2lkZWJhciBTY3JpcHRzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cbnNpZGViYXJUb2dnbGVMaXN0ZW5lcnMoKVxuc2VuZFNpZGViYXJTaG9ydGN1dCgpXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xuLy8gUXVpY2sgbWVudSBTY3JpcHRzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cbmNyZWF0ZUNvbnRleHRNZW51KClcbmZvcndhcmRDb250ZXh0TWVudUNsaWNrcygpXG5jcmVhdGVDb250ZXh0TWVudU9uU3RvcmFnZUNoYW5nZSgpXG5cbmV4cG9ydCB7fSIsImNvbnN0IGxvZ29UZXh0ID1cbiAgXCIgX19fXyAgICAgICAgICAgICAgICAgICBfXFxuLyBfX198IF8gICBfIF8gX18gICBfX18oXykgX18gX1xcblxcXFxfX18gXFxcXHwgfCB8IHwgJ18gXFxcXCAvIF9ffCB8LyBfYCB8XFxuIF9fXykgfCB8X3wgfCB8IHwgfCAoX198IHwgKF98IHxcXG58X19fXy8gXFxcXF9fLCB8X3wgfF98XFxcXF9fX3xffFxcXFxfXyxffFxcbiAgICAgICB8X19fL1wiXG5cbmNvbnN0IG1zZ1RleHQgPSAobXNnOiBzdHJpbmcpID0+IGBcXG4keycgJy5yZXBlYXQoMTQgLSBtc2cubGVuZ3RoIC8gMil9WyR7bXNnfV1gXG5cbmV4cG9ydCBjb25zdCBjb250ZW50U2NyaXB0TG9nID0gKGl0ZW06IHN0cmluZykgPT4ge1xuICBjb25zb2xlLmxvZyhsb2dvVGV4dCwgbXNnVGV4dChgJHtpdGVtfSBTY3JpcHQgTG9hZGVkYCkpXG59XG5cbmV4cG9ydCBjb25zdCBiYWNrZ3JvdW5kTG9nID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZyhsb2dvVGV4dCwgbXNnVGV4dCgnQmFja2dyb3VuZCBMb2FkZWQnKSlcbn1cbiIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ2RlZmF1bHQnIHx8IGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8IGRlc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiIsImltcG9ydCB0eXBlIHsgUHJvbXB0IH0gZnJvbSBcIn5ob29rcy91c2VQcm9tcHRzXCJcbmltcG9ydCB7IGdldFN0b3JlZFByb21wdHMgfSBmcm9tIFwifmxpYi9nZXRTdG9yZWRQcm9tcHRzXCJcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBuYXRpdmUgY29udGV4dCBtZW51IGZvciB0aGUgcXVpY2sgbWVudS5cbiAqIFRoaXMgd2lsbCBhbGxvdyB1c2VycyB0byByaWdodCBjbGljayBvbiBhbnkgc2VsZWN0ZWQgdGV4dCBhbmQgc2VlIHRoZSBwcm9tcHRcbiAqIGFjdGlvbnMgb24gdGhlIHRleHQuXG4gKlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RvY3MvZXh0ZW5zaW9ucy9yZWZlcmVuY2UvY29udGV4dE1lbnVzL1xuICpcbiAqIEl0IHBlcmZvcm1zIHRoZSBmb2xsb3dpbmcgc3RlcHM6XG4gKiAxLiBHZXQgdGhlIHByb21wdHMgZnJvbSBzdG9yYWdlXG4gKiAyLiBDcmVhdGUgdGhlIHRleHQgYWN0aW9ucyBhdCBzdGFydFxuICogMy4gUmVtb3ZlIGFsbCB0aGUgZXhpc3RpbmcgY29udGV4dCBtZW51c1xuICogNC4gQ3JlYXRlIHRoZSBtZW51IGZvciByZXN0IG9mIHRoZSBpdGVtc1xuICovXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDb250ZXh0TWVudSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcHJvbXB0cyA9IGF3YWl0IGdldFN0b3JlZFByb21wdHMoKVxuICBjb25zdCBjb250ZXh0TWVudUl0ZW1zOiBjaHJvbWUuY29udGV4dE1lbnVzLkNyZWF0ZVByb3BlcnRpZXNbXSA9IFtdXG5cbiAgLy8gQ3JlYXRlIHRleHQgYWN0aW9ucyBjb250ZXh0IG1lbnVcbiAgY29uc3QgY3JlYXRlQ2hpbGRDb250ZXh0TWVudSA9IChwcm9tcHRzOiBQcm9tcHRbXSwgcGFyZW50SWQ/OiBzdHJpbmcpID0+IHtcbiAgICBmb3IgKGNvbnN0IHByb21wdCBvZiBwcm9tcHRzKSB7XG4gICAgICBjb250ZXh0TWVudUl0ZW1zLnB1c2goe1xuICAgICAgICBpZDogcHJvbXB0LmlkLFxuICAgICAgICB0aXRsZTogcHJvbXB0Lm5hbWUsXG4gICAgICAgIGNvbnRleHRzOiBbJ3NlbGVjdGlvbiddLFxuICAgICAgICBwYXJlbnRJZCxcbiAgICAgIH0pXG4gICAgICBpZiAocHJvbXB0LmNoaWxkcmVuKSBjcmVhdGVDaGlsZENvbnRleHRNZW51KHByb21wdC5jaGlsZHJlbiwgcHJvbXB0LmlkKVxuICAgIH1cbiAgfVxuICBjcmVhdGVDaGlsZENvbnRleHRNZW51KHByb21wdHMpXG5cbiAgLy8gQ3JlYXRlIFNldHRpbmdzIGNvbnRleHQgbWVudVxuICBjb250ZXh0TWVudUl0ZW1zLnB1c2goXG4gICAge1xuICAgICAgaWQ6ICdzZXBhcmF0b3InLFxuICAgICAgdHlwZTogJ3NlcGFyYXRvcicsXG4gICAgICBjb250ZXh0czogWydzZWxlY3Rpb24nXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnc2V0dGluZ3MnLFxuICAgICAgdGl0bGU6ICdTZXR0aW5ncycsXG4gICAgICBjb250ZXh0czogWydzZWxlY3Rpb24nXSxcbiAgICB9LFxuICApXG5cbiAgLy8gQmVmb3JlIGNyZWF0aW5nIHRoZSBjb250ZXh0IG1lbnUsIHJlbW92ZSBhbGwgdGhlIGV4aXN0aW5nIGNvbnRleHQgbWVudXNcbiAgY2hyb21lLmNvbnRleHRNZW51cy5yZW1vdmVBbGwoKVxuXG4gIC8vIENyZWF0ZSBjb250ZXh0IG1lbnVcbiAgZm9yIChjb25zdCBpdGVtIG9mIGNvbnRleHRNZW51SXRlbXMpIHtcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZShpdGVtKVxuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgY29udGV4dCBtZW51IG9uIHN0b3JhZ2UgY2hhbmdlLlxuICogVGhpcyB3aWxsIGFsbG93IHVzZXJzIHRvIHNlZSB0aGUgY2hhbmdlcyBpbiB0aGUgY29udGV4dCBtZW51IHdoZW4gdXNlclxuICogY2hhbmdlIHRoZSBwcm9tcHRzLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQ29udGV4dE1lbnVPblN0b3JhZ2VDaGFuZ2UgPSAoKSA9PiB7XG4gIGNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ/Cfk50gU3RvcmFnZSBjaGFuZ2VkJylcbiAgICBjcmVhdGVDb250ZXh0TWVudSgpXG4gIH0pXG59XG4iLCJpbXBvcnQgeyB0eXBlIFByb21wdCB9IGZyb20gJy4uL2hvb2tzL3VzZVByb21wdHMnXG5pbXBvcnQgeyBkZWZhdWx0UHJvbXB0cyB9IGZyb20gJy4uL2NvbmZpZy9wcm9tcHRzL2RlZmF1bHQnXG5cbmV4cG9ydCBjb25zdCBnZXRTdG9yZWRQcm9tcHRzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzdG9yZWRQcm9tcHRzID0gYXdhaXQgZ2V0U3RvcmVkTG9jYWxQcm9tcHRzKClcbiAgaWYgKCFzdG9yZWRQcm9tcHRzKSB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgUFJPTVBUUzogZGVmYXVsdFByb21wdHMgfSwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ+KEue+4jyBEZWZhdWx0IHByb21wdHMgc3RvcmVkIGZyb20gZ2V0U3RvcmVkUHJvbXB0cy50cycpXG4gICAgfSlcbiAgfVxuICByZXR1cm4gc3RvcmVkUHJvbXB0cyA/PyBkZWZhdWx0UHJvbXB0c1xufVxuXG5jb25zdCBnZXRTdG9yZWRMb2NhbFByb21wdHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0b3JlZExvY2FsUHJvbXB0cyA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdQUk9NUFRTJywgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmVzb2x2ZShyZXN1bHQuUFJPTVBUUylcbiAgICB9KVxuICB9KVxuICByZXR1cm4gc3RvcmVkTG9jYWxQcm9tcHRzIGFzIFByb21wdFtdIHwgbnVsbFxufVxuIiwiaW1wb3J0IGVuZGVudCBmcm9tICdlbmRlbnQnXG5pbXBvcnQgaGFzaCBmcm9tICdvYmplY3QtaGFzaCdcbmltcG9ydCB0eXBlIHsgUHJvbXB0IH0gZnJvbSAnfmhvb2tzL3VzZVByb21wdHMnXG5cbnR5cGUgUHJvbXB0V2l0aG91dElkID0gT21pdDxQcm9tcHQsICdpZCcgfCAnY2hpbGRyZW4nPiAmIHtcbiAgY2hpbGRyZW4/OiBQcm9tcHRXaXRob3V0SWRbXVxufVxuXG5jb25zdCBwcm9tcHRzOiBQcm9tcHRXaXRob3V0SWRbXSA9IFtcbiAge1xuICAgIG5hbWU6ICdSZXZpZXcgU2VsZWN0aW9uJyxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnU3VtbWFyaXplJyxcbiAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIHN1bW1hcml6ZSBpdCBpbiBsZXNzIHRoYW4gaGFsZiB0aGUgb3JpZ2luYWwgbGVuZ3RoLlxuICAgICAgICBgLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2tleSB0YWtlYXdheXMnLFxuICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICBSZWFkIHRoZSBmb2xsb3dpbmcgdGV4dCBhbmQgaWRlbnRpZnkgdGhlIGtleSB0YWtlYXdheXMgaW4gbGlzdCBmb3JtYXQuXG4gICAgICAgIGAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnUXVlc3Rpb25zJyxcbiAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIGlkZW50aWZ5IHRoZSBrZXkgcXVlc3Rpb25zIHRoYXQgaXQgcmFpc2VzLlxuICAgICAgICBgLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ0VkaXQgU2VsZWN0aW9uJyxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnRml4IEdyYW1tYXIgYW5kIFNwZWxsaW5nJyxcbiAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIGZpeCBhbnkgZ3JhbW1hciBhbmQgc3BlbGxpbmcgbWlzdGFrZXMuXG4gICAgICAgIGAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnQ2hhbmdlIFRvbmUnLFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdGb3JtYWwnLFxuICAgICAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBtYWtlIGl0IG1vcmUgZm9ybWFsLlxuICAgICAgICAgICAgYCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdJbmZvcm1hbCcsXG4gICAgICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIG1ha2UgaXQgbW9yZSBpbmZvcm1hbC5cbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTmV1dHJhbCcsXG4gICAgICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIG1ha2UgaXQgbW9yZSBuZXV0cmFsLlxuICAgICAgICAgICAgYCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdTdHJvbmcnLFxuICAgICAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBtYWtlIGl0IG1vcmUgc3Ryb25nIGFuZCBhc3NlcnRpdmUuXG4gICAgICAgICAgICBgLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnQ2hhbmdlIExlbmd0aCcsXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1Nob3J0ZXInLFxuICAgICAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBtYWtlIGl0IHNob3J0ZXIuXG4gICAgICAgICAgICBgLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xvbmdlcicsXG4gICAgICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIG1ha2UgaXQgbG9uZ2VyLlxuICAgICAgICAgICAgYCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0NoYW5nZSBTdHJ1Y3R1cmUnLFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBZGQgRGV0YWlscycsXG4gICAgICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIGFkZCBkZXRhaWxzIHRvIG1ha2UgaXQgbW9yZSBpbmZvcm1hdGl2ZS5cbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQWRkIEV4YW1wbGVzJyxcbiAgICAgICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgICAgICBSZWFkIHRoZSBmb2xsb3dpbmcgdGV4dCBhbmQgYWRkIGV4YW1wbGVzIHRvIG1ha2UgaXQgbW9yZSBpbmZvcm1hdGl2ZS5cbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQWRkIEVtcGhhc2lzJyxcbiAgICAgICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgICAgICBSZWFkIHRoZSBmb2xsb3dpbmcgdGV4dCBhbmQgYWRkIGVtcGhhc2lzIHRvIG1ha2UgaXQgbW9yZSBpbXBhY3RmdWwuXG4gICAgICAgICAgICBgLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnUmVwbHknLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdQb3NpdGl2ZScsXG4gICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCByZXBseSB0byBpdCBpbiBhIHBvc2l0aXZlIHdheS5cbiAgICAgICAgYCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdOZWdhdGl2ZScsXG4gICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCByZXBseSB0byBpdCBpbiBhIG5lZ2F0aXZlIHdheS5cbiAgICAgICAgYCxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl1cblxuY29uc3QgcmVjdXJzaXZlQWRkSWQgPSAoXG4gIHByb21wdHM6IFByb21wdFdpdGhvdXRJZFtdLFxuICBfcGFyZW50SWQ6IHN0cmluZyA9ICcnLFxuKTogUHJvbXB0W10gPT4ge1xuICByZXR1cm4gcHJvbXB0cy5tYXAoKHByb21wdCkgPT4ge1xuICAgIGNvbnN0IGlkID0gaGFzaChwcm9tcHQpXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkLFxuICAgICAgLi4ucHJvbXB0LFxuICAgICAgY2hpbGRyZW46IHByb21wdC5jaGlsZHJlblxuICAgICAgICA/IHJlY3Vyc2l2ZUFkZElkKHByb21wdC5jaGlsZHJlbiwgaWQpXG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgIH1cbiAgfSkgYXMgUHJvbXB0W11cbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRQcm9tcHRzID0gcmVjdXJzaXZlQWRkSWQocHJvbXB0cylcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGVkZW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImRlZGVudFwiKSk7XG5jb25zdCBvYmplY3RvcmFycmF5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIm9iamVjdG9yYXJyYXlcIikpO1xuY29uc3QgZmFzdF9qc29uX3BhcnNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImZhc3QtanNvbi1wYXJzZVwiKSk7XG5jb25zdCBFTkRFTlRfSUQgPSBcInR3aFpOd3hJMWFGRzNyNFwiO1xuZnVuY3Rpb24gZW5kZW50KHN0cmluZ3MsIC4uLnZhbHVlcykge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gc3RyaW5nc1tpXTtcbiAgICAgICAgaWYgKGkgPCB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgICAgICAgICBsZXQgaXNKc29uID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZmFzdF9qc29uX3BhcnNlXzEuZGVmYXVsdCh2YWx1ZSkudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGZhc3RfanNvbl9wYXJzZV8xLmRlZmF1bHQodmFsdWUpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlzSnNvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHZhbHVlICYmIHZhbHVlW0VOREVOVF9JRF0pIHx8IGlzSnNvbikge1xuICAgICAgICAgICAgICAgIGxldCByYXdsaW5lcyA9IHJlc3VsdC5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgICAgICBsZXQgbCA9IHJhd2xpbmVzW3Jhd2xpbmVzLmxlbmd0aCAtIDFdLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICAgICAgbGV0IGVuZGVudGF0aW9uID0gbCA+IDAgPyBcIiBcIi5yZXBlYXQobCkgOiBcIlwiO1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZUpzb24gPSBpc0pzb25cbiAgICAgICAgICAgICAgICAgICAgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgMilcbiAgICAgICAgICAgICAgICAgICAgOiB2YWx1ZVtFTkRFTlRfSURdO1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZUxpbmVzID0gdmFsdWVKc29uLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICAgICAgICAgIHZhbHVlTGluZXMuZm9yRWFjaCgobCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxuXCIgKyBlbmRlbnRhdGlvbiArIGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLmluY2x1ZGVzKFwiXFxuXCIpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVuZGVudGF0aW9ucyA9IHJlc3VsdC5tYXRjaCgvKD86XnxcXG4pKCAqKSQvKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRlbnRhdGlvbiA9IGVuZGVudGF0aW9ucyA/IGVuZGVudGF0aW9uc1sxXSA6IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKChzdHIsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IEVOREVOVF9JRCArIHN0cjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpID09PSAwID8gc3RyIDogYCR7ZW5kZW50YXRpb259JHtzdHJ9YDtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgPSBkZWRlbnRfMS5kZWZhdWx0KHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdC5zcGxpdChFTkRFTlRfSUQpLmpvaW4oXCJcIik7XG59XG5lbmRlbnQucHJldHR5ID0gKGRhdGEpID0+IHtcbiAgICByZXR1cm4gb2JqZWN0b3JhcnJheV8xLmRlZmF1bHQoZGF0YSlcbiAgICAgICAgPyB7IFtFTkRFTlRfSURdOiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSB9XG4gICAgICAgIDogZGF0YTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBlbmRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gZGVkZW50KHN0cmluZ3MpIHtcblxuICB2YXIgcmF3ID0gdm9pZCAwO1xuICBpZiAodHlwZW9mIHN0cmluZ3MgPT09IFwic3RyaW5nXCIpIHtcbiAgICAvLyBkZWRlbnQgY2FuIGJlIHVzZWQgYXMgYSBwbGFpbiBmdW5jdGlvblxuICAgIHJhdyA9IFtzdHJpbmdzXTtcbiAgfSBlbHNlIHtcbiAgICByYXcgPSBzdHJpbmdzLnJhdztcbiAgfVxuXG4gIC8vIGZpcnN0LCBwZXJmb3JtIGludGVycG9sYXRpb25cbiAgdmFyIHJlc3VsdCA9IFwiXCI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmF3Lmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0ICs9IHJhd1tpXS5cbiAgICAvLyBqb2luIGxpbmVzIHdoZW4gdGhlcmUgaXMgYSBzdXBwcmVzc2VkIG5ld2xpbmVcbiAgICByZXBsYWNlKC9cXFxcXFxuWyBcXHRdKi9nLCBcIlwiKS5cblxuICAgIC8vIGhhbmRsZSBlc2NhcGVkIGJhY2t0aWNrc1xuICAgIHJlcGxhY2UoL1xcXFxgL2csIFwiYFwiKTtcblxuICAgIGlmIChpIDwgKGFyZ3VtZW50cy5sZW5ndGggPD0gMSA/IDAgOiBhcmd1bWVudHMubGVuZ3RoIC0gMSkpIHtcbiAgICAgIHJlc3VsdCArPSBhcmd1bWVudHMubGVuZ3RoIDw9IGkgKyAxID8gdW5kZWZpbmVkIDogYXJndW1lbnRzW2kgKyAxXTtcbiAgICB9XG4gIH1cblxuICAvLyBub3cgc3RyaXAgaW5kZW50YXRpb25cbiAgdmFyIGxpbmVzID0gcmVzdWx0LnNwbGl0KFwiXFxuXCIpO1xuICB2YXIgbWluZGVudCA9IG51bGw7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24gKGwpIHtcbiAgICB2YXIgbSA9IGwubWF0Y2goL14oXFxzKylcXFMrLyk7XG4gICAgaWYgKG0pIHtcbiAgICAgIHZhciBpbmRlbnQgPSBtWzFdLmxlbmd0aDtcbiAgICAgIGlmICghbWluZGVudCkge1xuICAgICAgICAvLyB0aGlzIGlzIHRoZSBmaXJzdCBpbmRlbnRlZCBsaW5lXG4gICAgICAgIG1pbmRlbnQgPSBpbmRlbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtaW5kZW50ID0gTWF0aC5taW4obWluZGVudCwgaW5kZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGlmIChtaW5kZW50ICE9PSBudWxsKSB7XG4gICAgcmVzdWx0ID0gbGluZXMubWFwKGZ1bmN0aW9uIChsKSB7XG4gICAgICByZXR1cm4gbFswXSA9PT0gXCIgXCIgPyBsLnNsaWNlKG1pbmRlbnQpIDogbDtcbiAgICB9KS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgLy8gZGVkZW50IGVhdHMgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSB0b29cbiAgcmVzdWx0ID0gcmVzdWx0LnRyaW0oKTtcblxuICAvLyBoYW5kbGUgZXNjYXBlZCBuZXdsaW5lcyBhdCB0aGUgZW5kIHRvIGVuc3VyZSB0aGV5IGRvbid0IGdldCBzdHJpcHBlZCB0b29cbiAgcmV0dXJuIHJlc3VsdC5yZXBsYWNlKC9cXFxcbi9nLCBcIlxcblwiKTtcbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBkZWRlbnQ7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICh2YWwpID0+IHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gUmVnRXhwXG59XG4iLCIndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gUGFyc2UgKGRhdGEpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhcnNlKSkge1xuICAgIHJldHVybiBuZXcgUGFyc2UoZGF0YSlcbiAgfVxuICB0aGlzLmVyciA9IG51bGxcbiAgdGhpcy52YWx1ZSA9IG51bGxcbiAgdHJ5IHtcbiAgICB0aGlzLnZhbHVlID0gSlNPTi5wYXJzZShkYXRhKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aGlzLmVyciA9IGVyclxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFyc2VcbiIsIiFmdW5jdGlvbihlKXt2YXIgdDtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKTooXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz90PXdpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP3Q9Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiYodD1zZWxmKSx0Lm9iamVjdEhhc2g9ZSgpKX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gcihvLGksdSl7ZnVuY3Rpb24gcyhuLGUpe2lmKCFpW25dKXtpZighb1tuXSl7dmFyIHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZSYmdClyZXR1cm4gdChuLCEwKTtpZihhKXJldHVybiBhKG4sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbitcIidcIil9ZT1pW25dPXtleHBvcnRzOnt9fTtvW25dWzBdLmNhbGwoZS5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciB0PW9bbl1bMV1bZV07cmV0dXJuIHModHx8ZSl9LGUsZS5leHBvcnRzLHIsbyxpLHUpfXJldHVybiBpW25dLmV4cG9ydHN9Zm9yKHZhciBhPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsZT0wO2U8dS5sZW5ndGg7ZSsrKXModVtlXSk7cmV0dXJuIHN9KHsxOltmdW5jdGlvbih3LGIsbSl7IWZ1bmN0aW9uKGUsbixzLGMsZCxoLHAsZyx5KXtcInVzZSBzdHJpY3RcIjt2YXIgcj13KFwiY3J5cHRvXCIpO2Z1bmN0aW9uIHQoZSx0KXt0PXUoZSx0KTt2YXIgbjtyZXR1cm4gdm9pZCAwPT09KG49XCJwYXNzdGhyb3VnaFwiIT09dC5hbGdvcml0aG0/ci5jcmVhdGVIYXNoKHQuYWxnb3JpdGhtKTpuZXcgbCkud3JpdGUmJihuLndyaXRlPW4udXBkYXRlLG4uZW5kPW4udXBkYXRlKSxmKHQsbikuZGlzcGF0Y2goZSksbi51cGRhdGV8fG4uZW5kKFwiXCIpLG4uZGlnZXN0P24uZGlnZXN0KFwiYnVmZmVyXCI9PT10LmVuY29kaW5nP3ZvaWQgMDp0LmVuY29kaW5nKTooZT1uLnJlYWQoKSxcImJ1ZmZlclwiIT09dC5lbmNvZGluZz9lLnRvU3RyaW5nKHQuZW5jb2RpbmcpOmUpfShtPWIuZXhwb3J0cz10KS5zaGExPWZ1bmN0aW9uKGUpe3JldHVybiB0KGUpfSxtLmtleXM9ZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSx7ZXhjbHVkZVZhbHVlczohMCxhbGdvcml0aG06XCJzaGExXCIsZW5jb2Rpbmc6XCJoZXhcIn0pfSxtLk1ENT1mdW5jdGlvbihlKXtyZXR1cm4gdChlLHthbGdvcml0aG06XCJtZDVcIixlbmNvZGluZzpcImhleFwifSl9LG0ua2V5c01ENT1mdW5jdGlvbihlKXtyZXR1cm4gdChlLHthbGdvcml0aG06XCJtZDVcIixlbmNvZGluZzpcImhleFwiLGV4Y2x1ZGVWYWx1ZXM6ITB9KX07dmFyIG89ci5nZXRIYXNoZXM/ci5nZXRIYXNoZXMoKS5zbGljZSgpOltcInNoYTFcIixcIm1kNVwiXSxpPShvLnB1c2goXCJwYXNzdGhyb3VnaFwiKSxbXCJidWZmZXJcIixcImhleFwiLFwiYmluYXJ5XCIsXCJiYXNlNjRcIl0pO2Z1bmN0aW9uIHUoZSx0KXt2YXIgbj17fTtpZihuLmFsZ29yaXRobT0odD10fHx7fSkuYWxnb3JpdGhtfHxcInNoYTFcIixuLmVuY29kaW5nPXQuZW5jb2Rpbmd8fFwiaGV4XCIsbi5leGNsdWRlVmFsdWVzPSEhdC5leGNsdWRlVmFsdWVzLG4uYWxnb3JpdGhtPW4uYWxnb3JpdGhtLnRvTG93ZXJDYXNlKCksbi5lbmNvZGluZz1uLmVuY29kaW5nLnRvTG93ZXJDYXNlKCksbi5pZ25vcmVVbmtub3duPSEwPT09dC5pZ25vcmVVbmtub3duLG4ucmVzcGVjdFR5cGU9ITEhPT10LnJlc3BlY3RUeXBlLG4ucmVzcGVjdEZ1bmN0aW9uTmFtZXM9ITEhPT10LnJlc3BlY3RGdW5jdGlvbk5hbWVzLG4ucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcz0hMSE9PXQucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcyxuLnVub3JkZXJlZEFycmF5cz0hMD09PXQudW5vcmRlcmVkQXJyYXlzLG4udW5vcmRlcmVkU2V0cz0hMSE9PXQudW5vcmRlcmVkU2V0cyxuLnVub3JkZXJlZE9iamVjdHM9ITEhPT10LnVub3JkZXJlZE9iamVjdHMsbi5yZXBsYWNlcj10LnJlcGxhY2VyfHx2b2lkIDAsbi5leGNsdWRlS2V5cz10LmV4Y2x1ZGVLZXlzfHx2b2lkIDAsdm9pZCAwPT09ZSl0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgYXJndW1lbnQgcmVxdWlyZWQuXCIpO2Zvcih2YXIgcj0wO3I8by5sZW5ndGg7KytyKW9bcl0udG9Mb3dlckNhc2UoKT09PW4uYWxnb3JpdGhtLnRvTG93ZXJDYXNlKCkmJihuLmFsZ29yaXRobT1vW3JdKTtpZigtMT09PW8uaW5kZXhPZihuLmFsZ29yaXRobSkpdGhyb3cgbmV3IEVycm9yKCdBbGdvcml0aG0gXCInK24uYWxnb3JpdGhtKydcIiAgbm90IHN1cHBvcnRlZC4gc3VwcG9ydGVkIHZhbHVlczogJytvLmpvaW4oXCIsIFwiKSk7aWYoLTE9PT1pLmluZGV4T2Yobi5lbmNvZGluZykmJlwicGFzc3Rocm91Z2hcIiE9PW4uYWxnb3JpdGhtKXRocm93IG5ldyBFcnJvcignRW5jb2RpbmcgXCInK24uZW5jb2RpbmcrJ1wiICBub3Qgc3VwcG9ydGVkLiBzdXBwb3J0ZWQgdmFsdWVzOiAnK2kuam9pbihcIiwgXCIpKTtyZXR1cm4gbn1mdW5jdGlvbiBhKGUpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUpcmV0dXJuIG51bGwhPS9eZnVuY3Rpb25cXHMrXFx3KlxccypcXChcXHMqXFwpXFxzKntcXHMrXFxbbmF0aXZlIGNvZGVcXF1cXHMrfSQvaS5leGVjKEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKX1mdW5jdGlvbiBmKG8sdCxpKXtpPWl8fFtdO2Z1bmN0aW9uIHUoZSl7cmV0dXJuIHQudXBkYXRlP3QudXBkYXRlKGUsXCJ1dGY4XCIpOnQud3JpdGUoZSxcInV0ZjhcIil9cmV0dXJue2Rpc3BhdGNoOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzW1wiX1wiKyhudWxsPT09KGU9by5yZXBsYWNlcj9vLnJlcGxhY2VyKGUpOmUpP1wibnVsbFwiOnR5cGVvZiBlKV0oZSl9LF9vYmplY3Q6ZnVuY3Rpb24odCl7dmFyIG4sZT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCkscj0vXFxbb2JqZWN0ICguKilcXF0vaS5leGVjKGUpO3I9KHI9cj9yWzFdOlwidW5rbm93bjpbXCIrZStcIl1cIikudG9Mb3dlckNhc2UoKTtpZigwPD0oZT1pLmluZGV4T2YodCkpKXJldHVybiB0aGlzLmRpc3BhdGNoKFwiW0NJUkNVTEFSOlwiK2UrXCJdXCIpO2lmKGkucHVzaCh0KSx2b2lkIDAhPT1zJiZzLmlzQnVmZmVyJiZzLmlzQnVmZmVyKHQpKXJldHVybiB1KFwiYnVmZmVyOlwiKSx1KHQpO2lmKFwib2JqZWN0XCI9PT1yfHxcImZ1bmN0aW9uXCI9PT1yfHxcImFzeW5jZnVuY3Rpb25cIj09PXIpcmV0dXJuIGU9T2JqZWN0LmtleXModCksby51bm9yZGVyZWRPYmplY3RzJiYoZT1lLnNvcnQoKSksITE9PT1vLnJlc3BlY3RUeXBlfHxhKHQpfHxlLnNwbGljZSgwLDAsXCJwcm90b3R5cGVcIixcIl9fcHJvdG9fX1wiLFwiY29uc3RydWN0b3JcIiksby5leGNsdWRlS2V5cyYmKGU9ZS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIW8uZXhjbHVkZUtleXMoZSl9KSksdShcIm9iamVjdDpcIitlLmxlbmd0aCtcIjpcIiksbj10aGlzLGUuZm9yRWFjaChmdW5jdGlvbihlKXtuLmRpc3BhdGNoKGUpLHUoXCI6XCIpLG8uZXhjbHVkZVZhbHVlc3x8bi5kaXNwYXRjaCh0W2VdKSx1KFwiLFwiKX0pO2lmKCF0aGlzW1wiX1wiK3JdKXtpZihvLmlnbm9yZVVua25vd24pcmV0dXJuIHUoXCJbXCIrcitcIl1cIik7dGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG9iamVjdCB0eXBlIFwiJytyKydcIicpfXRoaXNbXCJfXCIrcl0odCl9LF9hcnJheTpmdW5jdGlvbihlLHQpe3Q9dm9pZCAwIT09dD90OiExIT09by51bm9yZGVyZWRBcnJheXM7dmFyIG49dGhpcztpZih1KFwiYXJyYXk6XCIrZS5sZW5ndGgrXCI6XCIpLCF0fHxlLmxlbmd0aDw9MSlyZXR1cm4gZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBuLmRpc3BhdGNoKGUpfSk7dmFyIHI9W10sdD1lLm1hcChmdW5jdGlvbihlKXt2YXIgdD1uZXcgbCxuPWkuc2xpY2UoKTtyZXR1cm4gZihvLHQsbikuZGlzcGF0Y2goZSkscj1yLmNvbmNhdChuLnNsaWNlKGkubGVuZ3RoKSksdC5yZWFkKCkudG9TdHJpbmcoKX0pO3JldHVybiBpPWkuY29uY2F0KHIpLHQuc29ydCgpLHRoaXMuX2FycmF5KHQsITEpfSxfZGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gdShcImRhdGU6XCIrZS50b0pTT04oKSl9LF9zeW1ib2w6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJzeW1ib2w6XCIrZS50b1N0cmluZygpKX0sX2Vycm9yOmZ1bmN0aW9uKGUpe3JldHVybiB1KFwiZXJyb3I6XCIrZS50b1N0cmluZygpKX0sX2Jvb2xlYW46ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJib29sOlwiK2UudG9TdHJpbmcoKSl9LF9zdHJpbmc6ZnVuY3Rpb24oZSl7dShcInN0cmluZzpcIitlLmxlbmd0aCtcIjpcIiksdShlLnRvU3RyaW5nKCkpfSxfZnVuY3Rpb246ZnVuY3Rpb24oZSl7dShcImZuOlwiKSxhKGUpP3RoaXMuZGlzcGF0Y2goXCJbbmF0aXZlXVwiKTp0aGlzLmRpc3BhdGNoKGUudG9TdHJpbmcoKSksITEhPT1vLnJlc3BlY3RGdW5jdGlvbk5hbWVzJiZ0aGlzLmRpc3BhdGNoKFwiZnVuY3Rpb24tbmFtZTpcIitTdHJpbmcoZS5uYW1lKSksby5yZXNwZWN0RnVuY3Rpb25Qcm9wZXJ0aWVzJiZ0aGlzLl9vYmplY3QoZSl9LF9udW1iZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJudW1iZXI6XCIrZS50b1N0cmluZygpKX0sX3htbDpmdW5jdGlvbihlKXtyZXR1cm4gdShcInhtbDpcIitlLnRvU3RyaW5nKCkpfSxfbnVsbDpmdW5jdGlvbigpe3JldHVybiB1KFwiTnVsbFwiKX0sX3VuZGVmaW5lZDpmdW5jdGlvbigpe3JldHVybiB1KFwiVW5kZWZpbmVkXCIpfSxfcmVnZXhwOmZ1bmN0aW9uKGUpe3JldHVybiB1KFwicmVnZXg6XCIrZS50b1N0cmluZygpKX0sX3VpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJ1aW50OGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX3VpbnQ4Y2xhbXBlZGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiB1KFwidWludDhjbGFtcGVkYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfaW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiB1KFwiaW50OGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX3VpbnQxNmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiB1KFwidWludDE2YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfaW50MTZhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gdShcImludDE2YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDMyYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJ1aW50MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiB1KFwiaW50MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9mbG9hdDMyYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJmbG9hdDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfZmxvYXQ2NGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiB1KFwiZmxvYXQ2NGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2FycmF5YnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiB1KFwiYXJyYXlidWZmZXI6XCIpLHRoaXMuZGlzcGF0Y2gobmV3IFVpbnQ4QXJyYXkoZSkpfSxfdXJsOmZ1bmN0aW9uKGUpe3JldHVybiB1KFwidXJsOlwiK2UudG9TdHJpbmcoKSl9LF9tYXA6ZnVuY3Rpb24oZSl7dShcIm1hcDpcIik7ZT1BcnJheS5mcm9tKGUpO3JldHVybiB0aGlzLl9hcnJheShlLCExIT09by51bm9yZGVyZWRTZXRzKX0sX3NldDpmdW5jdGlvbihlKXt1KFwic2V0OlwiKTtlPUFycmF5LmZyb20oZSk7cmV0dXJuIHRoaXMuX2FycmF5KGUsITEhPT1vLnVub3JkZXJlZFNldHMpfSxfZmlsZTpmdW5jdGlvbihlKXtyZXR1cm4gdShcImZpbGU6XCIpLHRoaXMuZGlzcGF0Y2goW2UubmFtZSxlLnNpemUsZS50eXBlLGUubGFzdE1vZGZpZWRdKX0sX2Jsb2I6ZnVuY3Rpb24oKXtpZihvLmlnbm9yZVVua25vd24pcmV0dXJuIHUoXCJbYmxvYl1cIik7dGhyb3cgRXJyb3IoJ0hhc2hpbmcgQmxvYiBvYmplY3RzIGlzIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkXFxuKHNlZSBodHRwczovL2dpdGh1Yi5jb20vcHVsZW9zL29iamVjdC1oYXNoL2lzc3Vlcy8yNilcXG5Vc2UgXCJvcHRpb25zLnJlcGxhY2VyXCIgb3IgXCJvcHRpb25zLmlnbm9yZVVua25vd25cIlxcbicpfSxfZG9td2luZG93OmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJkb213aW5kb3dcIil9LF9iaWdpbnQ6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJiaWdpbnQ6XCIrZS50b1N0cmluZygpKX0sX3Byb2Nlc3M6ZnVuY3Rpb24oKXtyZXR1cm4gdShcInByb2Nlc3NcIil9LF90aW1lcjpmdW5jdGlvbigpe3JldHVybiB1KFwidGltZXJcIil9LF9waXBlOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJwaXBlXCIpfSxfdGNwOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJ0Y3BcIil9LF91ZHA6ZnVuY3Rpb24oKXtyZXR1cm4gdShcInVkcFwiKX0sX3R0eTpmdW5jdGlvbigpe3JldHVybiB1KFwidHR5XCIpfSxfc3RhdHdhdGNoZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdShcInN0YXR3YXRjaGVyXCIpfSxfc2VjdXJlY29udGV4dDpmdW5jdGlvbigpe3JldHVybiB1KFwic2VjdXJlY29udGV4dFwiKX0sX2Nvbm5lY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm4gdShcImNvbm5lY3Rpb25cIil9LF96bGliOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJ6bGliXCIpfSxfY29udGV4dDpmdW5jdGlvbigpe3JldHVybiB1KFwiY29udGV4dFwiKX0sX25vZGVzY3JpcHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdShcIm5vZGVzY3JpcHRcIil9LF9odHRwcGFyc2VyOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJodHRwcGFyc2VyXCIpfSxfZGF0YXZpZXc6ZnVuY3Rpb24oKXtyZXR1cm4gdShcImRhdGF2aWV3XCIpfSxfc2lnbmFsOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJzaWduYWxcIil9LF9mc2V2ZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJmc2V2ZW50XCIpfSxfdGxzd3JhcDpmdW5jdGlvbigpe3JldHVybiB1KFwidGxzd3JhcFwiKX19fWZ1bmN0aW9uIGwoKXtyZXR1cm57YnVmOlwiXCIsd3JpdGU6ZnVuY3Rpb24oZSl7dGhpcy5idWYrPWV9LGVuZDpmdW5jdGlvbihlKXt0aGlzLmJ1Zis9ZX0scmVhZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmJ1Zn19fW0ud3JpdGVUb1N0cmVhbT1mdW5jdGlvbihlLHQsbil7cmV0dXJuIHZvaWQgMD09PW4mJihuPXQsdD17fSksZih0PXUoZSx0KSxuKS5kaXNwYXRjaChlKX19LmNhbGwodGhpcyx3KFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sdyhcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2Zha2VfOWE1YWE0OWQuanNcIixcIi9cIil9LHtidWZmZXI6MyxjcnlwdG86NSxsWXBvSTI6MTF9XSwyOltmdW5jdGlvbihlLHQsZil7IWZ1bmN0aW9uKGUsdCxuLHIsbyxpLHUscyxhKXshZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGE9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXk/VWludDhBcnJheTpBcnJheSx0PVwiK1wiLmNoYXJDb2RlQXQoMCksbj1cIi9cIi5jaGFyQ29kZUF0KDApLHI9XCIwXCIuY2hhckNvZGVBdCgwKSxvPVwiYVwiLmNoYXJDb2RlQXQoMCksaT1cIkFcIi5jaGFyQ29kZUF0KDApLHU9XCItXCIuY2hhckNvZGVBdCgwKSxzPVwiX1wiLmNoYXJDb2RlQXQoMCk7ZnVuY3Rpb24gZihlKXtlPWUuY2hhckNvZGVBdCgwKTtyZXR1cm4gZT09PXR8fGU9PT11PzYyOmU9PT1ufHxlPT09cz82MzplPHI/LTE6ZTxyKzEwP2UtcisyNisyNjplPGkrMjY/ZS1pOmU8bysyNj9lLW8rMjY6dm9pZCAwfWUudG9CeXRlQXJyYXk9ZnVuY3Rpb24oZSl7dmFyIHQsbjtpZigwPGUubGVuZ3RoJTQpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNFwiKTt2YXIgcj1lLmxlbmd0aCxyPVwiPVwiPT09ZS5jaGFyQXQoci0yKT8yOlwiPVwiPT09ZS5jaGFyQXQoci0xKT8xOjAsbz1uZXcgYSgzKmUubGVuZ3RoLzQtciksaT0wPHI/ZS5sZW5ndGgtNDplLmxlbmd0aCx1PTA7ZnVuY3Rpb24gcyhlKXtvW3UrK109ZX1mb3IodD0wO3Q8aTt0Kz00LDApcygoMTY3MTE2ODAmKG49ZihlLmNoYXJBdCh0KSk8PDE4fGYoZS5jaGFyQXQodCsxKSk8PDEyfGYoZS5jaGFyQXQodCsyKSk8PDZ8ZihlLmNoYXJBdCh0KzMpKSkpPj4xNikscygoNjUyODAmbik+PjgpLHMoMjU1Jm4pO3JldHVybiAyPT1yP3MoMjU1JihuPWYoZS5jaGFyQXQodCkpPDwyfGYoZS5jaGFyQXQodCsxKSk+PjQpKToxPT1yJiYocygobj1mKGUuY2hhckF0KHQpKTw8MTB8ZihlLmNoYXJBdCh0KzEpKTw8NHxmKGUuY2hhckF0KHQrMikpPj4yKT4+OCYyNTUpLHMoMjU1Jm4pKSxvfSxlLmZyb21CeXRlQXJyYXk9ZnVuY3Rpb24oZSl7dmFyIHQsbixyLG8saT1lLmxlbmd0aCUzLHU9XCJcIjtmdW5jdGlvbiBzKGUpe3JldHVyblwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLmNoYXJBdChlKX1mb3IodD0wLHI9ZS5sZW5ndGgtaTt0PHI7dCs9MyluPShlW3RdPDwxNikrKGVbdCsxXTw8OCkrZVt0KzJdLHUrPXMoKG89bik+PjE4JjYzKStzKG8+PjEyJjYzKStzKG8+PjYmNjMpK3MoNjMmbyk7c3dpdGNoKGkpe2Nhc2UgMTp1PSh1Kz1zKChuPWVbZS5sZW5ndGgtMV0pPj4yKSkrcyhuPDw0JjYzKStcIj09XCI7YnJlYWs7Y2FzZSAyOnU9KHU9KHUrPXMoKG49KGVbZS5sZW5ndGgtMl08PDgpK2VbZS5sZW5ndGgtMV0pPj4xMCkpK3Mobj4+NCY2MykpK3Mobjw8MiY2MykrXCI9XCJ9cmV0dXJuIHV9fSh2b2lkIDA9PT1mP3RoaXMuYmFzZTY0anM9e306Zil9LmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYlwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMX1dLDM6W2Z1bmN0aW9uKE8sZSxIKXshZnVuY3Rpb24oZSxuLGYscixoLHAsZyx5LHcpe3ZhciBhPU8oXCJiYXNlNjQtanNcIiksaT1PKFwiaWVlZTc1NFwiKTtmdW5jdGlvbiBmKGUsdCxuKXtpZighKHRoaXMgaW5zdGFuY2VvZiBmKSlyZXR1cm4gbmV3IGYoZSx0LG4pO3ZhciByLG8saSx1LHM9dHlwZW9mIGU7aWYoXCJiYXNlNjRcIj09PXQmJlwic3RyaW5nXCI9PXMpZm9yKGU9KHU9ZSkudHJpbT91LnRyaW0oKTp1LnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIik7ZS5sZW5ndGglNCE9MDspZSs9XCI9XCI7aWYoXCJudW1iZXJcIj09cylyPWooZSk7ZWxzZSBpZihcInN0cmluZ1wiPT1zKXI9Zi5ieXRlTGVuZ3RoKGUsdCk7ZWxzZXtpZihcIm9iamVjdFwiIT1zKXRocm93IG5ldyBFcnJvcihcIkZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuXCIpO3I9aihlLmxlbmd0aCl9aWYoZi5fdXNlVHlwZWRBcnJheXM/bz1mLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KHIpKTooKG89dGhpcykubGVuZ3RoPXIsby5faXNCdWZmZXI9ITApLGYuX3VzZVR5cGVkQXJyYXlzJiZcIm51bWJlclwiPT10eXBlb2YgZS5ieXRlTGVuZ3RoKW8uX3NldChlKTtlbHNlIGlmKEModT1lKXx8Zi5pc0J1ZmZlcih1KXx8dSYmXCJvYmplY3RcIj09dHlwZW9mIHUmJlwibnVtYmVyXCI9PXR5cGVvZiB1Lmxlbmd0aClmb3IoaT0wO2k8cjtpKyspZi5pc0J1ZmZlcihlKT9vW2ldPWUucmVhZFVJbnQ4KGkpOm9baV09ZVtpXTtlbHNlIGlmKFwic3RyaW5nXCI9PXMpby53cml0ZShlLDAsdCk7ZWxzZSBpZihcIm51bWJlclwiPT1zJiYhZi5fdXNlVHlwZWRBcnJheXMmJiFuKWZvcihpPTA7aTxyO2krKylvW2ldPTA7cmV0dXJuIG99ZnVuY3Rpb24gYihlLHQsbixyKXtyZXR1cm4gZi5fY2hhcnNXcml0dGVuPWMoZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVtdLG49MDtuPGUubGVuZ3RoO24rKyl0LnB1c2goMjU1JmUuY2hhckNvZGVBdChuKSk7cmV0dXJuIHR9KHQpLGUsbixyKX1mdW5jdGlvbiBtKGUsdCxuLHIpe3JldHVybiBmLl9jaGFyc1dyaXR0ZW49YyhmdW5jdGlvbihlKXtmb3IodmFyIHQsbixyPVtdLG89MDtvPGUubGVuZ3RoO28rKyluPWUuY2hhckNvZGVBdChvKSx0PW4+Pjgsbj1uJTI1NixyLnB1c2gobiksci5wdXNoKHQpO3JldHVybiByfSh0KSxlLG4scil9ZnVuY3Rpb24gdihlLHQsbil7dmFyIHI9XCJcIjtuPU1hdGgubWluKGUubGVuZ3RoLG4pO2Zvcih2YXIgbz10O288bjtvKyspcis9U3RyaW5nLmZyb21DaGFyQ29kZShlW29dKTtyZXR1cm4gcn1mdW5jdGlvbiBvKGUsdCxuLHIpe3J8fChkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZChudWxsIT10LFwibWlzc2luZyBvZmZzZXRcIiksZCh0KzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG8scj1lLmxlbmd0aDtpZighKHI8PXQpKXJldHVybiBuPyhvPWVbdF0sdCsxPHImJihvfD1lW3QrMV08PDgpKToobz1lW3RdPDw4LHQrMTxyJiYob3w9ZVt0KzFdKSksb31mdW5jdGlvbiB1KGUsdCxuLHIpe3J8fChkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZChudWxsIT10LFwibWlzc2luZyBvZmZzZXRcIiksZCh0KzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSk7dmFyIG8scj1lLmxlbmd0aDtpZighKHI8PXQpKXJldHVybiBuPyh0KzI8ciYmKG89ZVt0KzJdPDwxNiksdCsxPHImJihvfD1lW3QrMV08PDgpLG98PWVbdF0sdCszPHImJihvKz1lW3QrM108PDI0Pj4+MCkpOih0KzE8ciYmKG89ZVt0KzFdPDwxNiksdCsyPHImJihvfD1lW3QrMl08PDgpLHQrMzxyJiYob3w9ZVt0KzNdKSxvKz1lW3RdPDwyND4+PjApLG99ZnVuY3Rpb24gXyhlLHQsbixyKXtpZihyfHwoZChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQobnVsbCE9dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLGQodCsxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLCEoZS5sZW5ndGg8PXQpKXJldHVybiByPW8oZSx0LG4sITApLDMyNzY4JnI/LTEqKDY1NTM1LXIrMSk6cn1mdW5jdGlvbiBFKGUsdCxuLHIpe2lmKHJ8fChkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZChudWxsIT10LFwibWlzc2luZyBvZmZzZXRcIiksZCh0KzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlLmxlbmd0aDw9dCkpcmV0dXJuIHI9dShlLHQsbiwhMCksMjE0NzQ4MzY0OCZyPy0xKig0Mjk0OTY3Mjk1LXIrMSk6cn1mdW5jdGlvbiBJKGUsdCxuLHIpe3JldHVybiByfHwoZChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLGkucmVhZChlLHQsbiwyMyw0KX1mdW5jdGlvbiBBKGUsdCxuLHIpe3JldHVybiByfHwoZChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQodCs3PGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLGkucmVhZChlLHQsbiw1Miw4KX1mdW5jdGlvbiBzKGUsdCxuLHIsbyl7b3x8KGQobnVsbCE9dCxcIm1pc3NpbmcgdmFsdWVcIiksZChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQobnVsbCE9bixcIm1pc3Npbmcgb2Zmc2V0XCIpLGQobisxPGUubGVuZ3RoLFwidHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLFkodCw2NTUzNSkpO289ZS5sZW5ndGg7aWYoIShvPD1uKSlmb3IodmFyIGk9MCx1PU1hdGgubWluKG8tbiwyKTtpPHU7aSsrKWVbbitpXT0odCYyNTU8PDgqKHI/aToxLWkpKT4+PjgqKHI/aToxLWkpfWZ1bmN0aW9uIGwoZSx0LG4scixvKXtvfHwoZChudWxsIT10LFwibWlzc2luZyB2YWx1ZVwiKSxkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZChudWxsIT1uLFwibWlzc2luZyBvZmZzZXRcIiksZChuKzM8ZS5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksWSh0LDQyOTQ5NjcyOTUpKTtvPWUubGVuZ3RoO2lmKCEobzw9bikpZm9yKHZhciBpPTAsdT1NYXRoLm1pbihvLW4sNCk7aTx1O2krKyllW24raV09dD4+PjgqKHI/aTozLWkpJjI1NX1mdW5jdGlvbiBCKGUsdCxuLHIsbyl7b3x8KGQobnVsbCE9dCxcIm1pc3NpbmcgdmFsdWVcIiksZChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQobnVsbCE9bixcIm1pc3Npbmcgb2Zmc2V0XCIpLGQobisxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLEYodCwzMjc2NywtMzI3NjgpKSxlLmxlbmd0aDw9bnx8cyhlLDA8PXQ/dDo2NTUzNSt0KzEsbixyLG8pfWZ1bmN0aW9uIEwoZSx0LG4scixvKXtvfHwoZChudWxsIT10LFwibWlzc2luZyB2YWx1ZVwiKSxkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZChudWxsIT1uLFwibWlzc2luZyBvZmZzZXRcIiksZChuKzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksRih0LDIxNDc0ODM2NDcsLTIxNDc0ODM2NDgpKSxlLmxlbmd0aDw9bnx8bChlLDA8PXQ/dDo0Mjk0OTY3Mjk1K3QrMSxuLHIsbyl9ZnVuY3Rpb24gVShlLHQsbixyLG8pe298fChkKG51bGwhPXQsXCJtaXNzaW5nIHZhbHVlXCIpLGQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKG51bGwhPW4sXCJtaXNzaW5nIG9mZnNldFwiKSxkKG4rMzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxEKHQsMzQwMjgyMzQ2NjM4NTI4ODZlMjIsLTM0MDI4MjM0NjYzODUyODg2ZTIyKSksZS5sZW5ndGg8PW58fGkud3JpdGUoZSx0LG4sciwyMyw0KX1mdW5jdGlvbiB4KGUsdCxuLHIsbyl7b3x8KGQobnVsbCE9dCxcIm1pc3NpbmcgdmFsdWVcIiksZChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQobnVsbCE9bixcIm1pc3Npbmcgb2Zmc2V0XCIpLGQobis3PGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLEQodCwxNzk3NjkzMTM0ODYyMzE1N2UyOTIsLTE3OTc2OTMxMzQ4NjIzMTU3ZTI5MikpLGUubGVuZ3RoPD1ufHxpLndyaXRlKGUsdCxuLHIsNTIsOCl9SC5CdWZmZXI9ZixILlNsb3dCdWZmZXI9ZixILklOU1BFQ1RfTUFYX0JZVEVTPTUwLGYucG9vbFNpemU9ODE5MixmLl91c2VUeXBlZEFycmF5cz1mdW5jdGlvbigpe3RyeXt2YXIgZT1uZXcgQXJyYXlCdWZmZXIoMCksdD1uZXcgVWludDhBcnJheShlKTtyZXR1cm4gdC5mb289ZnVuY3Rpb24oKXtyZXR1cm4gNDJ9LDQyPT09dC5mb28oKSYmXCJmdW5jdGlvblwiPT10eXBlb2YgdC5zdWJhcnJheX1jYXRjaChlKXtyZXR1cm4hMX19KCksZi5pc0VuY29kaW5nPWZ1bmN0aW9uKGUpe3N3aXRjaChTdHJpbmcoZSkudG9Mb3dlckNhc2UoKSl7Y2FzZVwiaGV4XCI6Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6Y2FzZVwiYXNjaWlcIjpjYXNlXCJiaW5hcnlcIjpjYXNlXCJiYXNlNjRcIjpjYXNlXCJyYXdcIjpjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpyZXR1cm4hMDtkZWZhdWx0OnJldHVybiExfX0sZi5pc0J1ZmZlcj1mdW5jdGlvbihlKXtyZXR1cm4hKG51bGw9PWV8fCFlLl9pc0J1ZmZlcil9LGYuYnl0ZUxlbmd0aD1mdW5jdGlvbihlLHQpe3ZhciBuO3N3aXRjaChlKz1cIlwiLHR8fFwidXRmOFwiKXtjYXNlXCJoZXhcIjpuPWUubGVuZ3RoLzI7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6bj1UKGUpLmxlbmd0aDticmVhaztjYXNlXCJhc2NpaVwiOmNhc2VcImJpbmFyeVwiOmNhc2VcInJhd1wiOm49ZS5sZW5ndGg7YnJlYWs7Y2FzZVwiYmFzZTY0XCI6bj1NKGUpLmxlbmd0aDticmVhaztjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpuPTIqZS5sZW5ndGg7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiBufSxmLmNvbmNhdD1mdW5jdGlvbihlLHQpe2lmKGQoQyhlKSxcIlVzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxubGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuXCIpLDA9PT1lLmxlbmd0aClyZXR1cm4gbmV3IGYoMCk7aWYoMT09PWUubGVuZ3RoKXJldHVybiBlWzBdO2lmKFwibnVtYmVyXCIhPXR5cGVvZiB0KWZvcihvPXQ9MDtvPGUubGVuZ3RoO28rKyl0Kz1lW29dLmxlbmd0aDtmb3IodmFyIG49bmV3IGYodCkscj0wLG89MDtvPGUubGVuZ3RoO28rKyl7dmFyIGk9ZVtvXTtpLmNvcHkobixyKSxyKz1pLmxlbmd0aH1yZXR1cm4gbn0sZi5wcm90b3R5cGUud3JpdGU9ZnVuY3Rpb24oZSx0LG4scil7aXNGaW5pdGUodCk/aXNGaW5pdGUobil8fChyPW4sbj12b2lkIDApOihhPXIscj10LHQ9bixuPWEpLHQ9TnVtYmVyKHQpfHwwO3ZhciBvLGksdSxzLGE9dGhpcy5sZW5ndGgtdDtzd2l0Y2goKCFufHxhPChuPU51bWJlcihuKSkpJiYobj1hKSxyPVN0cmluZyhyfHxcInV0ZjhcIikudG9Mb3dlckNhc2UoKSl7Y2FzZVwiaGV4XCI6bz1mdW5jdGlvbihlLHQsbixyKXtuPU51bWJlcihuKXx8MDt2YXIgbz1lLmxlbmd0aC1uOyghcnx8bzwocj1OdW1iZXIocikpKSYmKHI9byksZCgobz10Lmxlbmd0aCklMj09MCxcIkludmFsaWQgaGV4IHN0cmluZ1wiKSxvLzI8ciYmKHI9by8yKTtmb3IodmFyIGk9MDtpPHI7aSsrKXt2YXIgdT1wYXJzZUludCh0LnN1YnN0cigyKmksMiksMTYpO2QoIWlzTmFOKHUpLFwiSW52YWxpZCBoZXggc3RyaW5nXCIpLGVbbitpXT11fXJldHVybiBmLl9jaGFyc1dyaXR0ZW49MippLGl9KHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmk9dGhpcyx1PXQscz1uLG89Zi5fY2hhcnNXcml0dGVuPWMoVChlKSxpLHUscyk7YnJlYWs7Y2FzZVwiYXNjaWlcIjpjYXNlXCJiaW5hcnlcIjpvPWIodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwiYmFzZTY0XCI6aT10aGlzLHU9dCxzPW4sbz1mLl9jaGFyc1dyaXR0ZW49YyhNKGUpLGksdSxzKTticmVhaztjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpvPW0odGhpcyxlLHQsbik7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiBvfSxmLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbihlLHQsbil7dmFyIHIsbyxpLHUscz10aGlzO2lmKGU9U3RyaW5nKGV8fFwidXRmOFwiKS50b0xvd2VyQ2FzZSgpLHQ9TnVtYmVyKHQpfHwwLChuPXZvaWQgMCE9PW4/TnVtYmVyKG4pOnMubGVuZ3RoKT09PXQpcmV0dXJuXCJcIjtzd2l0Y2goZSl7Y2FzZVwiaGV4XCI6cj1mdW5jdGlvbihlLHQsbil7dmFyIHI9ZS5sZW5ndGg7KCF0fHx0PDApJiYodD0wKTsoIW58fG48MHx8cjxuKSYmKG49cik7Zm9yKHZhciBvPVwiXCIsaT10O2k8bjtpKyspbys9ayhlW2ldKTtyZXR1cm4gb30ocyx0LG4pO2JyZWFrO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOnI9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPVwiXCIsbz1cIlwiO249TWF0aC5taW4oZS5sZW5ndGgsbik7Zm9yKHZhciBpPXQ7aTxuO2krKyllW2ldPD0xMjc/KHIrPU4obykrU3RyaW5nLmZyb21DaGFyQ29kZShlW2ldKSxvPVwiXCIpOm8rPVwiJVwiK2VbaV0udG9TdHJpbmcoMTYpO3JldHVybiByK04obyl9KHMsdCxuKTticmVhaztjYXNlXCJhc2NpaVwiOmNhc2VcImJpbmFyeVwiOnI9dihzLHQsbik7YnJlYWs7Y2FzZVwiYmFzZTY0XCI6bz1zLHU9bixyPTA9PT0oaT10KSYmdT09PW8ubGVuZ3RoP2EuZnJvbUJ5dGVBcnJheShvKTphLmZyb21CeXRlQXJyYXkoby5zbGljZShpLHUpKTticmVhaztjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpyPWZ1bmN0aW9uKGUsdCxuKXtmb3IodmFyIHI9ZS5zbGljZSh0LG4pLG89XCJcIixpPTA7aTxyLmxlbmd0aDtpKz0yKW8rPVN0cmluZy5mcm9tQ2hhckNvZGUocltpXSsyNTYqcltpKzFdKTtyZXR1cm4gb30ocyx0LG4pO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlbmNvZGluZ1wiKX1yZXR1cm4gcn0sZi5wcm90b3R5cGUudG9KU09OPWZ1bmN0aW9uKCl7cmV0dXJue3R5cGU6XCJCdWZmZXJcIixkYXRhOkFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2Fycnx8dGhpcywwKX19LGYucHJvdG90eXBlLmNvcHk9ZnVuY3Rpb24oZSx0LG4scil7aWYodD10fHwwLChyPXJ8fDA9PT1yP3I6dGhpcy5sZW5ndGgpIT09KG49bnx8MCkmJjAhPT1lLmxlbmd0aCYmMCE9PXRoaXMubGVuZ3RoKXtkKG48PXIsXCJzb3VyY2VFbmQgPCBzb3VyY2VTdGFydFwiKSxkKDA8PXQmJnQ8ZS5sZW5ndGgsXCJ0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzXCIpLGQoMDw9biYmbjx0aGlzLmxlbmd0aCxcInNvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHNcIiksZCgwPD1yJiZyPD10aGlzLmxlbmd0aCxcInNvdXJjZUVuZCBvdXQgb2YgYm91bmRzXCIpLHI+dGhpcy5sZW5ndGgmJihyPXRoaXMubGVuZ3RoKTt2YXIgbz0ocj1lLmxlbmd0aC10PHItbj9lLmxlbmd0aC10K246ciktbjtpZihvPDEwMHx8IWYuX3VzZVR5cGVkQXJyYXlzKWZvcih2YXIgaT0wO2k8bztpKyspZVtpK3RdPXRoaXNbaStuXTtlbHNlIGUuX3NldCh0aGlzLnN1YmFycmF5KG4sbitvKSx0KX19LGYucHJvdG90eXBlLnNsaWNlPWZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcy5sZW5ndGg7aWYoZT1TKGUsbiwwKSx0PVModCxuLG4pLGYuX3VzZVR5cGVkQXJyYXlzKXJldHVybiBmLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoZSx0KSk7Zm9yKHZhciByPXQtZSxvPW5ldyBmKHIsdm9pZCAwLCEwKSxpPTA7aTxyO2krKylvW2ldPXRoaXNbaStlXTtyZXR1cm4gb30sZi5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKGUpe3JldHVybiBjb25zb2xlLmxvZyhcIi5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLlwiKSx0aGlzLnJlYWRVSW50OChlKX0sZi5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGNvbnNvbGUubG9nKFwiLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuXCIpLHRoaXMud3JpdGVVSW50OChlLHQpfSxmLnByb3RvdHlwZS5yZWFkVUludDg9ZnVuY3Rpb24oZSx0KXtpZih0fHwoZChudWxsIT1lLFwibWlzc2luZyBvZmZzZXRcIiksZChlPHRoaXMubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLCEoZT49dGhpcy5sZW5ndGgpKXJldHVybiB0aGlzW2VdfSxmLnByb3RvdHlwZS5yZWFkVUludDE2TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbyh0aGlzLGUsITAsdCl9LGYucHJvdG90eXBlLnJlYWRVSW50MTZCRT1mdW5jdGlvbihlLHQpe3JldHVybiBvKHRoaXMsZSwhMSx0KX0sZi5wcm90b3R5cGUucmVhZFVJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHUodGhpcyxlLCEwLHQpfSxmLnByb3RvdHlwZS5yZWFkVUludDMyQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdSh0aGlzLGUsITEsdCl9LGYucHJvdG90eXBlLnJlYWRJbnQ4PWZ1bmN0aW9uKGUsdCl7aWYodHx8KGQobnVsbCE9ZSxcIm1pc3Npbmcgb2Zmc2V0XCIpLGQoZTx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSwhKGU+PXRoaXMubGVuZ3RoKSlyZXR1cm4gMTI4JnRoaXNbZV0/LTEqKDI1NS10aGlzW2VdKzEpOnRoaXNbZV19LGYucHJvdG90eXBlLnJlYWRJbnQxNkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIF8odGhpcyxlLCEwLHQpfSxmLnByb3RvdHlwZS5yZWFkSW50MTZCRT1mdW5jdGlvbihlLHQpe3JldHVybiBfKHRoaXMsZSwhMSx0KX0sZi5wcm90b3R5cGUucmVhZEludDMyTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gRSh0aGlzLGUsITAsdCl9LGYucHJvdG90eXBlLnJlYWRJbnQzMkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEUodGhpcyxlLCExLHQpfSxmLnByb3RvdHlwZS5yZWFkRmxvYXRMRT1mdW5jdGlvbihlLHQpe3JldHVybiBJKHRoaXMsZSwhMCx0KX0sZi5wcm90b3R5cGUucmVhZEZsb2F0QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gSSh0aGlzLGUsITEsdCl9LGYucHJvdG90eXBlLnJlYWREb3VibGVMRT1mdW5jdGlvbihlLHQpe3JldHVybiBBKHRoaXMsZSwhMCx0KX0sZi5wcm90b3R5cGUucmVhZERvdWJsZUJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEEodGhpcyxlLCExLHQpfSxmLnByb3RvdHlwZS53cml0ZVVJbnQ4PWZ1bmN0aW9uKGUsdCxuKXtufHwoZChudWxsIT1lLFwibWlzc2luZyB2YWx1ZVwiKSxkKG51bGwhPXQsXCJtaXNzaW5nIG9mZnNldFwiKSxkKHQ8dGhpcy5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksWShlLDI1NSkpLHQ+PXRoaXMubGVuZ3RofHwodGhpc1t0XT1lKX0sZi5wcm90b3R5cGUud3JpdGVVSW50MTZMRT1mdW5jdGlvbihlLHQsbil7cyh0aGlzLGUsdCwhMCxuKX0sZi5wcm90b3R5cGUud3JpdGVVSW50MTZCRT1mdW5jdGlvbihlLHQsbil7cyh0aGlzLGUsdCwhMSxuKX0sZi5wcm90b3R5cGUud3JpdGVVSW50MzJMRT1mdW5jdGlvbihlLHQsbil7bCh0aGlzLGUsdCwhMCxuKX0sZi5wcm90b3R5cGUud3JpdGVVSW50MzJCRT1mdW5jdGlvbihlLHQsbil7bCh0aGlzLGUsdCwhMSxuKX0sZi5wcm90b3R5cGUud3JpdGVJbnQ4PWZ1bmN0aW9uKGUsdCxuKXtufHwoZChudWxsIT1lLFwibWlzc2luZyB2YWx1ZVwiKSxkKG51bGwhPXQsXCJtaXNzaW5nIG9mZnNldFwiKSxkKHQ8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksRihlLDEyNywtMTI4KSksdD49dGhpcy5sZW5ndGh8fCgwPD1lP3RoaXMud3JpdGVVSW50OChlLHQsbik6dGhpcy53cml0ZVVJbnQ4KDI1NStlKzEsdCxuKSl9LGYucHJvdG90eXBlLndyaXRlSW50MTZMRT1mdW5jdGlvbihlLHQsbil7Qih0aGlzLGUsdCwhMCxuKX0sZi5wcm90b3R5cGUud3JpdGVJbnQxNkJFPWZ1bmN0aW9uKGUsdCxuKXtCKHRoaXMsZSx0LCExLG4pfSxmLnByb3RvdHlwZS53cml0ZUludDMyTEU9ZnVuY3Rpb24oZSx0LG4pe0wodGhpcyxlLHQsITAsbil9LGYucHJvdG90eXBlLndyaXRlSW50MzJCRT1mdW5jdGlvbihlLHQsbil7TCh0aGlzLGUsdCwhMSxuKX0sZi5wcm90b3R5cGUud3JpdGVGbG9hdExFPWZ1bmN0aW9uKGUsdCxuKXtVKHRoaXMsZSx0LCEwLG4pfSxmLnByb3RvdHlwZS53cml0ZUZsb2F0QkU9ZnVuY3Rpb24oZSx0LG4pe1UodGhpcyxlLHQsITEsbil9LGYucHJvdG90eXBlLndyaXRlRG91YmxlTEU9ZnVuY3Rpb24oZSx0LG4pe3godGhpcyxlLHQsITAsbil9LGYucHJvdG90eXBlLndyaXRlRG91YmxlQkU9ZnVuY3Rpb24oZSx0LG4pe3godGhpcyxlLHQsITEsbil9LGYucHJvdG90eXBlLmZpbGw9ZnVuY3Rpb24oZSx0LG4pe2lmKHQ9dHx8MCxuPW58fHRoaXMubGVuZ3RoLGQoXCJudW1iZXJcIj09dHlwZW9mKGU9XCJzdHJpbmdcIj09dHlwZW9mKGU9ZXx8MCk/ZS5jaGFyQ29kZUF0KDApOmUpJiYhaXNOYU4oZSksXCJ2YWx1ZSBpcyBub3QgYSBudW1iZXJcIiksZCh0PD1uLFwiZW5kIDwgc3RhcnRcIiksbiE9PXQmJjAhPT10aGlzLmxlbmd0aCl7ZCgwPD10JiZ0PHRoaXMubGVuZ3RoLFwic3RhcnQgb3V0IG9mIGJvdW5kc1wiKSxkKDA8PW4mJm48PXRoaXMubGVuZ3RoLFwiZW5kIG91dCBvZiBib3VuZHNcIik7Zm9yKHZhciByPXQ7cjxuO3IrKyl0aGlzW3JdPWV9fSxmLnByb3RvdHlwZS5pbnNwZWN0PWZ1bmN0aW9uKCl7Zm9yKHZhciBlPVtdLHQ9dGhpcy5sZW5ndGgsbj0wO248dDtuKyspaWYoZVtuXT1rKHRoaXNbbl0pLG49PT1ILklOU1BFQ1RfTUFYX0JZVEVTKXtlW24rMV09XCIuLi5cIjticmVha31yZXR1cm5cIjxCdWZmZXIgXCIrZS5qb2luKFwiIFwiKStcIj5cIn0sZi5wcm90b3R5cGUudG9BcnJheUJ1ZmZlcj1mdW5jdGlvbigpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBVaW50OEFycmF5KXRocm93IG5ldyBFcnJvcihcIkJ1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO2lmKGYuX3VzZVR5cGVkQXJyYXlzKXJldHVybiBuZXcgZih0aGlzKS5idWZmZXI7Zm9yKHZhciBlPW5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKSx0PTAsbj1lLmxlbmd0aDt0PG47dCs9MSllW3RdPXRoaXNbdF07cmV0dXJuIGUuYnVmZmVyfTt2YXIgdD1mLnByb3RvdHlwZTtmdW5jdGlvbiBTKGUsdCxuKXtyZXR1cm5cIm51bWJlclwiIT10eXBlb2YgZT9uOnQ8PShlPX5+ZSk/dDowPD1lfHwwPD0oZSs9dCk/ZTowfWZ1bmN0aW9uIGooZSl7cmV0dXJuKGU9fn5NYXRoLmNlaWwoK2UpKTwwPzA6ZX1mdW5jdGlvbiBDKGUpe3JldHVybihBcnJheS5pc0FycmF5fHxmdW5jdGlvbihlKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9KShlKX1mdW5jdGlvbiBrKGUpe3JldHVybiBlPDE2P1wiMFwiK2UudG9TdHJpbmcoMTYpOmUudG9TdHJpbmcoMTYpfWZ1bmN0aW9uIFQoZSl7Zm9yKHZhciB0PVtdLG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHI9ZS5jaGFyQ29kZUF0KG4pO2lmKHI8PTEyNyl0LnB1c2goZS5jaGFyQ29kZUF0KG4pKTtlbHNlIGZvcih2YXIgbz1uLGk9KDU1Mjk2PD1yJiZyPD01NzM0MyYmbisrLGVuY29kZVVSSUNvbXBvbmVudChlLnNsaWNlKG8sbisxKSkuc3Vic3RyKDEpLnNwbGl0KFwiJVwiKSksdT0wO3U8aS5sZW5ndGg7dSsrKXQucHVzaChwYXJzZUludChpW3VdLDE2KSl9cmV0dXJuIHR9ZnVuY3Rpb24gTShlKXtyZXR1cm4gYS50b0J5dGVBcnJheShlKX1mdW5jdGlvbiBjKGUsdCxuLHIpe2Zvcih2YXIgbz0wO288ciYmIShvK24+PXQubGVuZ3RofHxvPj1lLmxlbmd0aCk7bysrKXRbbytuXT1lW29dO3JldHVybiBvfWZ1bmN0aW9uIE4oZSl7dHJ5e3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZSl9Y2F0Y2goZSl7cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoNjU1MzMpfX1mdW5jdGlvbiBZKGUsdCl7ZChcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksZCgwPD1lLFwic3BlY2lmaWVkIGEgbmVnYXRpdmUgdmFsdWUgZm9yIHdyaXRpbmcgYW4gdW5zaWduZWQgdmFsdWVcIiksZChlPD10LFwidmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZVwiKSxkKE1hdGguZmxvb3IoZSk9PT1lLFwidmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnRcIil9ZnVuY3Rpb24gRihlLHQsbil7ZChcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksZChlPD10LFwidmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlXCIpLGQobjw9ZSxcInZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWVcIiksZChNYXRoLmZsb29yKGUpPT09ZSxcInZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50XCIpfWZ1bmN0aW9uIEQoZSx0LG4pe2QoXCJudW1iZXJcIj09dHlwZW9mIGUsXCJjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyXCIpLGQoZTw9dCxcInZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZVwiKSxkKG48PWUsXCJ2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlXCIpfWZ1bmN0aW9uIGQoZSx0KXtpZighZSl0aHJvdyBuZXcgRXJyb3IodHx8XCJGYWlsZWQgYXNzZXJ0aW9uXCIpfWYuX2F1Z21lbnQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGUuX2lzQnVmZmVyPSEwLGUuX2dldD1lLmdldCxlLl9zZXQ9ZS5zZXQsZS5nZXQ9dC5nZXQsZS5zZXQ9dC5zZXQsZS53cml0ZT10LndyaXRlLGUudG9TdHJpbmc9dC50b1N0cmluZyxlLnRvTG9jYWxlU3RyaW5nPXQudG9TdHJpbmcsZS50b0pTT049dC50b0pTT04sZS5jb3B5PXQuY29weSxlLnNsaWNlPXQuc2xpY2UsZS5yZWFkVUludDg9dC5yZWFkVUludDgsZS5yZWFkVUludDE2TEU9dC5yZWFkVUludDE2TEUsZS5yZWFkVUludDE2QkU9dC5yZWFkVUludDE2QkUsZS5yZWFkVUludDMyTEU9dC5yZWFkVUludDMyTEUsZS5yZWFkVUludDMyQkU9dC5yZWFkVUludDMyQkUsZS5yZWFkSW50OD10LnJlYWRJbnQ4LGUucmVhZEludDE2TEU9dC5yZWFkSW50MTZMRSxlLnJlYWRJbnQxNkJFPXQucmVhZEludDE2QkUsZS5yZWFkSW50MzJMRT10LnJlYWRJbnQzMkxFLGUucmVhZEludDMyQkU9dC5yZWFkSW50MzJCRSxlLnJlYWRGbG9hdExFPXQucmVhZEZsb2F0TEUsZS5yZWFkRmxvYXRCRT10LnJlYWRGbG9hdEJFLGUucmVhZERvdWJsZUxFPXQucmVhZERvdWJsZUxFLGUucmVhZERvdWJsZUJFPXQucmVhZERvdWJsZUJFLGUud3JpdGVVSW50OD10LndyaXRlVUludDgsZS53cml0ZVVJbnQxNkxFPXQud3JpdGVVSW50MTZMRSxlLndyaXRlVUludDE2QkU9dC53cml0ZVVJbnQxNkJFLGUud3JpdGVVSW50MzJMRT10LndyaXRlVUludDMyTEUsZS53cml0ZVVJbnQzMkJFPXQud3JpdGVVSW50MzJCRSxlLndyaXRlSW50OD10LndyaXRlSW50OCxlLndyaXRlSW50MTZMRT10LndyaXRlSW50MTZMRSxlLndyaXRlSW50MTZCRT10LndyaXRlSW50MTZCRSxlLndyaXRlSW50MzJMRT10LndyaXRlSW50MzJMRSxlLndyaXRlSW50MzJCRT10LndyaXRlSW50MzJCRSxlLndyaXRlRmxvYXRMRT10LndyaXRlRmxvYXRMRSxlLndyaXRlRmxvYXRCRT10LndyaXRlRmxvYXRCRSxlLndyaXRlRG91YmxlTEU9dC53cml0ZURvdWJsZUxFLGUud3JpdGVEb3VibGVCRT10LndyaXRlRG91YmxlQkUsZS5maWxsPXQuZmlsbCxlLmluc3BlY3Q9dC5pbnNwZWN0LGUudG9BcnJheUJ1ZmZlcj10LnRvQXJyYXlCdWZmZXIsZX19LmNhbGwodGhpcyxPKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sTyhcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlclwiKX0se1wiYmFzZTY0LWpzXCI6MixidWZmZXI6MyxpZWVlNzU0OjEwLGxZcG9JMjoxMX1dLDQ6W2Z1bmN0aW9uKGMsZCxlKXshZnVuY3Rpb24oZSx0LGEsbixyLG8saSx1LHMpe3ZhciBhPWMoXCJidWZmZXJcIikuQnVmZmVyLGY9NCxsPW5ldyBhKGYpO2wuZmlsbCgwKTtkLmV4cG9ydHM9e2hhc2g6ZnVuY3Rpb24oZSx0LG4scil7Zm9yKHZhciBvPXQoZnVuY3Rpb24oZSx0KXtlLmxlbmd0aCVmIT0wJiYobj1lLmxlbmd0aCsoZi1lLmxlbmd0aCVmKSxlPWEuY29uY2F0KFtlLGxdLG4pKTtmb3IodmFyIG4scj1bXSxvPXQ/ZS5yZWFkSW50MzJCRTplLnJlYWRJbnQzMkxFLGk9MDtpPGUubGVuZ3RoO2krPWYpci5wdXNoKG8uY2FsbChlLGkpKTtyZXR1cm4gcn0oZT1hLmlzQnVmZmVyKGUpP2U6bmV3IGEoZSksciksOCplLmxlbmd0aCksdD1yLGk9bmV3IGEobiksdT10P2kud3JpdGVJbnQzMkJFOmkud3JpdGVJbnQzMkxFLHM9MDtzPG8ubGVuZ3RoO3MrKyl1LmNhbGwoaSxvW3NdLDQqcywhMCk7cmV0dXJuIGl9fX0uY2FsbCh0aGlzLGMoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxjKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaGVscGVycy5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7YnVmZmVyOjMsbFlwb0kyOjExfV0sNTpbZnVuY3Rpb24odixlLF8peyFmdW5jdGlvbihsLGMsdSxkLGgscCxnLHksdyl7dmFyIHU9dihcImJ1ZmZlclwiKS5CdWZmZXIsZT12KFwiLi9zaGFcIiksdD12KFwiLi9zaGEyNTZcIiksbj12KFwiLi9ybmdcIiksYj17c2hhMTplLHNoYTI1Njp0LG1kNTp2KFwiLi9tZDVcIil9LHM9NjQsYT1uZXcgdShzKTtmdW5jdGlvbiByKGUsbil7dmFyIHI9YltlPWV8fFwic2hhMVwiXSxvPVtdO3JldHVybiByfHxpKFwiYWxnb3JpdGhtOlwiLGUsXCJpcyBub3QgeWV0IHN1cHBvcnRlZFwiKSx7dXBkYXRlOmZ1bmN0aW9uKGUpe3JldHVybiB1LmlzQnVmZmVyKGUpfHwoZT1uZXcgdShlKSksby5wdXNoKGUpLGUubGVuZ3RoLHRoaXN9LGRpZ2VzdDpmdW5jdGlvbihlKXt2YXIgdD11LmNvbmNhdChvKSx0PW4/ZnVuY3Rpb24oZSx0LG4pe3UuaXNCdWZmZXIodCl8fCh0PW5ldyB1KHQpKSx1LmlzQnVmZmVyKG4pfHwobj1uZXcgdShuKSksdC5sZW5ndGg+cz90PWUodCk6dC5sZW5ndGg8cyYmKHQ9dS5jb25jYXQoW3QsYV0scykpO2Zvcih2YXIgcj1uZXcgdShzKSxvPW5ldyB1KHMpLGk9MDtpPHM7aSsrKXJbaV09NTRedFtpXSxvW2ldPTkyXnRbaV07cmV0dXJuIG49ZSh1LmNvbmNhdChbcixuXSkpLGUodS5jb25jYXQoW28sbl0pKX0ocixuLHQpOnIodCk7cmV0dXJuIG89bnVsbCxlP3QudG9TdHJpbmcoZSk6dH19fWZ1bmN0aW9uIGkoKXt2YXIgZT1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbihcIiBcIik7dGhyb3cgbmV3IEVycm9yKFtlLFwid2UgYWNjZXB0IHB1bGwgcmVxdWVzdHNcIixcImh0dHA6Ly9naXRodWIuY29tL2RvbWluaWN0YXJyL2NyeXB0by1icm93c2VyaWZ5XCJdLmpvaW4oXCJcXG5cIikpfWEuZmlsbCgwKSxfLmNyZWF0ZUhhc2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHIoZSl9LF8uY3JlYXRlSG1hYz1yLF8ucmFuZG9tQnl0ZXM9ZnVuY3Rpb24oZSx0KXtpZighdHx8IXQuY2FsbClyZXR1cm4gbmV3IHUobihlKSk7dHJ5e3QuY2FsbCh0aGlzLHZvaWQgMCxuZXcgdShuKGUpKSl9Y2F0Y2goZSl7dChlKX19O3ZhciBvLGY9W1wiY3JlYXRlQ3JlZGVudGlhbHNcIixcImNyZWF0ZUNpcGhlclwiLFwiY3JlYXRlQ2lwaGVyaXZcIixcImNyZWF0ZURlY2lwaGVyXCIsXCJjcmVhdGVEZWNpcGhlcml2XCIsXCJjcmVhdGVTaWduXCIsXCJjcmVhdGVWZXJpZnlcIixcImNyZWF0ZURpZmZpZUhlbGxtYW5cIixcInBia2RmMlwiXSxtPWZ1bmN0aW9uKGUpe19bZV09ZnVuY3Rpb24oKXtpKFwic29ycnksXCIsZSxcImlzIG5vdCBpbXBsZW1lbnRlZCB5ZXRcIil9fTtmb3IobyBpbiBmKW0oZltvXSxvKX0uY2FsbCh0aGlzLHYoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSx2KFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaW5kZXguanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9tZDVcIjo2LFwiLi9ybmdcIjo3LFwiLi9zaGFcIjo4LFwiLi9zaGEyNTZcIjo5LGJ1ZmZlcjozLGxZcG9JMjoxMX1dLDY6W2Z1bmN0aW9uKHcsYixlKXshZnVuY3Rpb24oZSxyLG8saSx1LGEsZixsLHkpe3ZhciB0PXcoXCIuL2hlbHBlcnNcIik7ZnVuY3Rpb24gbihlLHQpe2VbdD4+NV18PTEyODw8dCUzMixlWzE0Kyh0KzY0Pj4+OTw8NCldPXQ7Zm9yKHZhciBuPTE3MzI1ODQxOTMscj0tMjcxNzMzODc5LG89LTE3MzI1ODQxOTQsaT0yNzE3MzM4NzgsdT0wO3U8ZS5sZW5ndGg7dSs9MTYpe3ZhciBzPW4sYT1yLGY9byxsPWksbj1jKG4scixvLGksZVt1KzBdLDcsLTY4MDg3NjkzNiksaT1jKGksbixyLG8sZVt1KzFdLDEyLC0zODk1NjQ1ODYpLG89YyhvLGksbixyLGVbdSsyXSwxNyw2MDYxMDU4MTkpLHI9YyhyLG8saSxuLGVbdSszXSwyMiwtMTA0NDUyNTMzMCk7bj1jKG4scixvLGksZVt1KzRdLDcsLTE3NjQxODg5NyksaT1jKGksbixyLG8sZVt1KzVdLDEyLDEyMDAwODA0MjYpLG89YyhvLGksbixyLGVbdSs2XSwxNywtMTQ3MzIzMTM0MSkscj1jKHIsbyxpLG4sZVt1KzddLDIyLC00NTcwNTk4Myksbj1jKG4scixvLGksZVt1KzhdLDcsMTc3MDAzNTQxNiksaT1jKGksbixyLG8sZVt1KzldLDEyLC0xOTU4NDE0NDE3KSxvPWMobyxpLG4scixlW3UrMTBdLDE3LC00MjA2Mykscj1jKHIsbyxpLG4sZVt1KzExXSwyMiwtMTk5MDQwNDE2Miksbj1jKG4scixvLGksZVt1KzEyXSw3LDE4MDQ2MDM2ODIpLGk9YyhpLG4scixvLGVbdSsxM10sMTIsLTQwMzQxMTAxKSxvPWMobyxpLG4scixlW3UrMTRdLDE3LC0xNTAyMDAyMjkwKSxuPWQobixyPWMocixvLGksbixlW3UrMTVdLDIyLDEyMzY1MzUzMjkpLG8saSxlW3UrMV0sNSwtMTY1Nzk2NTEwKSxpPWQoaSxuLHIsbyxlW3UrNl0sOSwtMTA2OTUwMTYzMiksbz1kKG8saSxuLHIsZVt1KzExXSwxNCw2NDM3MTc3MTMpLHI9ZChyLG8saSxuLGVbdSswXSwyMCwtMzczODk3MzAyKSxuPWQobixyLG8saSxlW3UrNV0sNSwtNzAxNTU4NjkxKSxpPWQoaSxuLHIsbyxlW3UrMTBdLDksMzgwMTYwODMpLG89ZChvLGksbixyLGVbdSsxNV0sMTQsLTY2MDQ3ODMzNSkscj1kKHIsbyxpLG4sZVt1KzRdLDIwLC00MDU1Mzc4NDgpLG49ZChuLHIsbyxpLGVbdSs5XSw1LDU2ODQ0NjQzOCksaT1kKGksbixyLG8sZVt1KzE0XSw5LC0xMDE5ODAzNjkwKSxvPWQobyxpLG4scixlW3UrM10sMTQsLTE4NzM2Mzk2MSkscj1kKHIsbyxpLG4sZVt1KzhdLDIwLDExNjM1MzE1MDEpLG49ZChuLHIsbyxpLGVbdSsxM10sNSwtMTQ0NDY4MTQ2NyksaT1kKGksbixyLG8sZVt1KzJdLDksLTUxNDAzNzg0KSxvPWQobyxpLG4scixlW3UrN10sMTQsMTczNTMyODQ3Myksbj1oKG4scj1kKHIsbyxpLG4sZVt1KzEyXSwyMCwtMTkyNjYwNzczNCksbyxpLGVbdSs1XSw0LC0zNzg1NTgpLGk9aChpLG4scixvLGVbdSs4XSwxMSwtMjAyMjU3NDQ2Myksbz1oKG8saSxuLHIsZVt1KzExXSwxNiwxODM5MDMwNTYyKSxyPWgocixvLGksbixlW3UrMTRdLDIzLC0zNTMwOTU1Niksbj1oKG4scixvLGksZVt1KzFdLDQsLTE1MzA5OTIwNjApLGk9aChpLG4scixvLGVbdSs0XSwxMSwxMjcyODkzMzUzKSxvPWgobyxpLG4scixlW3UrN10sMTYsLTE1NTQ5NzYzMikscj1oKHIsbyxpLG4sZVt1KzEwXSwyMywtMTA5NDczMDY0MCksbj1oKG4scixvLGksZVt1KzEzXSw0LDY4MTI3OTE3NCksaT1oKGksbixyLG8sZVt1KzBdLDExLC0zNTg1MzcyMjIpLG89aChvLGksbixyLGVbdSszXSwxNiwtNzIyNTIxOTc5KSxyPWgocixvLGksbixlW3UrNl0sMjMsNzYwMjkxODkpLG49aChuLHIsbyxpLGVbdSs5XSw0LC02NDAzNjQ0ODcpLGk9aChpLG4scixvLGVbdSsxMl0sMTEsLTQyMTgxNTgzNSksbz1oKG8saSxuLHIsZVt1KzE1XSwxNiw1MzA3NDI1MjApLG49cChuLHI9aChyLG8saSxuLGVbdSsyXSwyMywtOTk1MzM4NjUxKSxvLGksZVt1KzBdLDYsLTE5ODYzMDg0NCksaT1wKGksbixyLG8sZVt1KzddLDEwLDExMjY4OTE0MTUpLG89cChvLGksbixyLGVbdSsxNF0sMTUsLTE0MTYzNTQ5MDUpLHI9cChyLG8saSxuLGVbdSs1XSwyMSwtNTc0MzQwNTUpLG49cChuLHIsbyxpLGVbdSsxMl0sNiwxNzAwNDg1NTcxKSxpPXAoaSxuLHIsbyxlW3UrM10sMTAsLTE4OTQ5ODY2MDYpLG89cChvLGksbixyLGVbdSsxMF0sMTUsLTEwNTE1MjMpLHI9cChyLG8saSxuLGVbdSsxXSwyMSwtMjA1NDkyMjc5OSksbj1wKG4scixvLGksZVt1KzhdLDYsMTg3MzMxMzM1OSksaT1wKGksbixyLG8sZVt1KzE1XSwxMCwtMzA2MTE3NDQpLG89cChvLGksbixyLGVbdSs2XSwxNSwtMTU2MDE5ODM4MCkscj1wKHIsbyxpLG4sZVt1KzEzXSwyMSwxMzA5MTUxNjQ5KSxuPXAobixyLG8saSxlW3UrNF0sNiwtMTQ1NTIzMDcwKSxpPXAoaSxuLHIsbyxlW3UrMTFdLDEwLC0xMTIwMjEwMzc5KSxvPXAobyxpLG4scixlW3UrMl0sMTUsNzE4Nzg3MjU5KSxyPXAocixvLGksbixlW3UrOV0sMjEsLTM0MzQ4NTU1MSksbj1nKG4scykscj1nKHIsYSksbz1nKG8sZiksaT1nKGksbCl9cmV0dXJuIEFycmF5KG4scixvLGkpfWZ1bmN0aW9uIHMoZSx0LG4scixvLGkpe3JldHVybiBnKCh0PWcoZyh0LGUpLGcocixpKSkpPDxvfHQ+Pj4zMi1vLG4pfWZ1bmN0aW9uIGMoZSx0LG4scixvLGksdSl7cmV0dXJuIHModCZufH50JnIsZSx0LG8saSx1KX1mdW5jdGlvbiBkKGUsdCxuLHIsbyxpLHUpe3JldHVybiBzKHQmcnxuJn5yLGUsdCxvLGksdSl9ZnVuY3Rpb24gaChlLHQsbixyLG8saSx1KXtyZXR1cm4gcyh0Xm5ecixlLHQsbyxpLHUpfWZ1bmN0aW9uIHAoZSx0LG4scixvLGksdSl7cmV0dXJuIHMobl4odHx+ciksZSx0LG8saSx1KX1mdW5jdGlvbiBnKGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KTtyZXR1cm4oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTw8MTZ8NjU1MzUmbn1iLmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHQuaGFzaChlLG4sMTYpfX0uY2FsbCh0aGlzLHcoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSx3KFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvbWQ1LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vaGVscGVyc1wiOjQsYnVmZmVyOjMsbFlwb0kyOjExfV0sNzpbZnVuY3Rpb24oZSxsLHQpeyFmdW5jdGlvbihlLHQsbixyLG8saSx1LHMsZil7dmFyIGE7bC5leHBvcnRzPWF8fGZ1bmN0aW9uKGUpe2Zvcih2YXIgdCxuPW5ldyBBcnJheShlKSxyPTA7cjxlO3IrKykwPT0oMyZyKSYmKHQ9NDI5NDk2NzI5NipNYXRoLnJhbmRvbSgpKSxuW3JdPXQ+Pj4oKDMmcik8PDMpJjI1NTtyZXR1cm4gbn19LmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3JuZy5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7YnVmZmVyOjMsbFlwb0kyOjExfV0sODpbZnVuY3Rpb24oYyxkLGUpeyFmdW5jdGlvbihlLHQsbixyLG8scyxhLGYsbCl7dmFyIGk9YyhcIi4vaGVscGVyc1wiKTtmdW5jdGlvbiB1KGwsYyl7bFtjPj41XXw9MTI4PDwyNC1jJTMyLGxbMTUrKGMrNjQ+Pjk8PDQpXT1jO2Zvcih2YXIgZSx0LG4scj1BcnJheSg4MCksbz0xNzMyNTg0MTkzLGk9LTI3MTczMzg3OSx1PS0xNzMyNTg0MTk0LHM9MjcxNzMzODc4LGQ9LTEwMDk1ODk3NzYsaD0wO2g8bC5sZW5ndGg7aCs9MTYpe2Zvcih2YXIgcD1vLGc9aSx5PXUsdz1zLGI9ZCxhPTA7YTw4MDthKyspe3JbYV09YTwxNj9sW2grYV06dihyW2EtM11eclthLThdXnJbYS0xNF1eclthLTE2XSwxKTt2YXIgZj1tKG0odihvLDUpLChmPWksdD11LG49cywoZT1hKTwyMD9mJnR8fmYmbjohKGU8NDApJiZlPDYwP2YmdHxmJm58dCZuOmZedF5uKSksbShtKGQsclthXSksKGU9YSk8MjA/MTUxODUwMDI0OTplPDQwPzE4NTk3NzUzOTM6ZTw2MD8tMTg5NDAwNzU4ODotODk5NDk3NTE0KSksZD1zLHM9dSx1PXYoaSwzMCksaT1vLG89Zn1vPW0obyxwKSxpPW0oaSxnKSx1PW0odSx5KSxzPW0ocyx3KSxkPW0oZCxiKX1yZXR1cm4gQXJyYXkobyxpLHUscyxkKX1mdW5jdGlvbiBtKGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KTtyZXR1cm4oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTw8MTZ8NjU1MzUmbn1mdW5jdGlvbiB2KGUsdCl7cmV0dXJuIGU8PHR8ZT4+PjMyLXR9ZC5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBpLmhhc2goZSx1LDIwLCEwKX19LmNhbGwodGhpcyxjKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sYyhcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYS5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMX1dLDk6W2Z1bmN0aW9uKGMsZCxlKXshZnVuY3Rpb24oZSx0LG4scix1LHMsYSxmLGwpe2Z1bmN0aW9uIGIoZSx0KXt2YXIgbj0oNjU1MzUmZSkrKDY1NTM1JnQpO3JldHVybihlPj4xNikrKHQ+PjE2KSsobj4+MTYpPDwxNnw2NTUzNSZufWZ1bmN0aW9uIG8oZSxsKXt2YXIgYyxkPW5ldyBBcnJheSgxMTE2MzUyNDA4LDE4OTk0NDc0NDEsMzA0OTMyMzQ3MSwzOTIxMDA5NTczLDk2MTk4NzE2MywxNTA4OTcwOTkzLDI0NTM2MzU3NDgsMjg3MDc2MzIyMSwzNjI0MzgxMDgwLDMxMDU5ODQwMSw2MDcyMjUyNzgsMTQyNjg4MTk4NywxOTI1MDc4Mzg4LDIxNjIwNzgyMDYsMjYxNDg4ODEwMywzMjQ4MjIyNTgwLDM4MzUzOTA0MDEsNDAyMjIyNDc3NCwyNjQzNDcwNzgsNjA0ODA3NjI4LDc3MDI1NTk4MywxMjQ5MTUwMTIyLDE1NTUwODE2OTIsMTk5NjA2NDk4NiwyNTU0MjIwODgyLDI4MjE4MzQzNDksMjk1Mjk5NjgwOCwzMjEwMzEzNjcxLDMzMzY1NzE4OTEsMzU4NDUyODcxMSwxMTM5MjY5OTMsMzM4MjQxODk1LDY2NjMwNzIwNSw3NzM1Mjk5MTIsMTI5NDc1NzM3MiwxMzk2MTgyMjkxLDE2OTUxODM3MDAsMTk4NjY2MTA1MSwyMTc3MDI2MzUwLDI0NTY5NTYwMzcsMjczMDQ4NTkyMSwyODIwMzAyNDExLDMyNTk3MzA4MDAsMzM0NTc2NDc3MSwzNTE2MDY1ODE3LDM2MDAzNTI4MDQsNDA5NDU3MTkwOSwyNzU0MjMzNDQsNDMwMjI3NzM0LDUwNjk0ODYxNiw2NTkwNjA1NTYsODgzOTk3ODc3LDk1ODEzOTU3MSwxMzIyODIyMjE4LDE1MzcwMDIwNjMsMTc0Nzg3Mzc3OSwxOTU1NTYyMjIyLDIwMjQxMDQ4MTUsMjIyNzczMDQ1MiwyMzYxODUyNDI0LDI0Mjg0MzY0NzQsMjc1NjczNDE4NywzMjA0MDMxNDc5LDMzMjkzMjUyOTgpLHQ9bmV3IEFycmF5KDE3NzkwMzM3MDMsMzE0NDEzNDI3NywxMDEzOTA0MjQyLDI3NzM0ODA3NjIsMTM1OTg5MzExOSwyNjAwODIyOTI0LDUyODczNDYzNSwxNTQxNDU5MjI1KSxuPW5ldyBBcnJheSg2NCk7ZVtsPj41XXw9MTI4PDwyNC1sJTMyLGVbMTUrKGwrNjQ+Pjk8PDQpXT1sO2Zvcih2YXIgcixvLGg9MDtoPGUubGVuZ3RoO2grPTE2KXtmb3IodmFyIGk9dFswXSx1PXRbMV0scz10WzJdLHA9dFszXSxhPXRbNF0sZz10WzVdLHk9dFs2XSx3PXRbN10sZj0wO2Y8NjQ7ZisrKW5bZl09ZjwxNj9lW2YraF06YihiKGIoKG89bltmLTJdLG0obywxNylebShvLDE5KV52KG8sMTApKSxuW2YtN10pLChvPW5bZi0xNV0sbShvLDcpXm0obywxOCledihvLDMpKSksbltmLTE2XSksYz1iKGIoYihiKHcsbShvPWEsNilebShvLDExKV5tKG8sMjUpKSxhJmdefmEmeSksZFtmXSksbltmXSkscj1iKG0ocj1pLDIpXm0ociwxMylebShyLDIyKSxpJnVeaSZzXnUmcyksdz15LHk9ZyxnPWEsYT1iKHAsYykscD1zLHM9dSx1PWksaT1iKGMscik7dFswXT1iKGksdFswXSksdFsxXT1iKHUsdFsxXSksdFsyXT1iKHMsdFsyXSksdFszXT1iKHAsdFszXSksdFs0XT1iKGEsdFs0XSksdFs1XT1iKGcsdFs1XSksdFs2XT1iKHksdFs2XSksdFs3XT1iKHcsdFs3XSl9cmV0dXJuIHR9dmFyIGk9YyhcIi4vaGVscGVyc1wiKSxtPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj50fGU8PDMyLXR9LHY9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+PnR9O2QuZXhwb3J0cz1mdW5jdGlvbihlKXtyZXR1cm4gaS5oYXNoKGUsbywzMiwhMCl9fS5jYWxsKHRoaXMsYyhcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGMoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEyNTYuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTF9XSwxMDpbZnVuY3Rpb24oZSx0LGYpeyFmdW5jdGlvbihlLHQsbixyLG8saSx1LHMsYSl7Zi5yZWFkPWZ1bmN0aW9uKGUsdCxuLHIsbyl7dmFyIGksdSxsPTgqby1yLTEsYz0oMTw8bCktMSxkPWM+PjEscz0tNyxhPW4/by0xOjAsZj1uPy0xOjEsbz1lW3QrYV07Zm9yKGErPWYsaT1vJigxPDwtcyktMSxvPj49LXMscys9bDswPHM7aT0yNTYqaStlW3QrYV0sYSs9ZixzLT04KTtmb3IodT1pJigxPDwtcyktMSxpPj49LXMscys9cjswPHM7dT0yNTYqdStlW3QrYV0sYSs9ZixzLT04KTtpZigwPT09aSlpPTEtZDtlbHNle2lmKGk9PT1jKXJldHVybiB1P05hTjoxLzAqKG8/LTE6MSk7dSs9TWF0aC5wb3coMixyKSxpLT1kfXJldHVybihvPy0xOjEpKnUqTWF0aC5wb3coMixpLXIpfSxmLndyaXRlPWZ1bmN0aW9uKGUsdCxsLG4scixjKXt2YXIgbyxpLHU9OCpjLXItMSxzPSgxPDx1KS0xLGE9cz4+MSxkPTIzPT09cj9NYXRoLnBvdygyLC0yNCktTWF0aC5wb3coMiwtNzcpOjAsZj1uPzA6Yy0xLGg9bj8xOi0xLGM9dDwwfHwwPT09dCYmMS90PDA/MTowO2Zvcih0PU1hdGguYWJzKHQpLGlzTmFOKHQpfHx0PT09MS8wPyhpPWlzTmFOKHQpPzE6MCxvPXMpOihvPU1hdGguZmxvb3IoTWF0aC5sb2codCkvTWF0aC5MTjIpLHQqKG49TWF0aC5wb3coMiwtbykpPDEmJihvLS0sbio9MiksMjw9KHQrPTE8PW8rYT9kL246ZCpNYXRoLnBvdygyLDEtYSkpKm4mJihvKyssbi89Miksczw9bythPyhpPTAsbz1zKToxPD1vK2E/KGk9KHQqbi0xKSpNYXRoLnBvdygyLHIpLG8rPWEpOihpPXQqTWF0aC5wb3coMixhLTEpKk1hdGgucG93KDIsciksbz0wKSk7ODw9cjtlW2wrZl09MjU1JmksZis9aCxpLz0yNTYsci09OCk7Zm9yKG89bzw8cnxpLHUrPXI7MDx1O2VbbCtmXT0yNTUmbyxmKz1oLG8vPTI1Nix1LT04KTtlW2wrZi1oXXw9MTI4KmN9fS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaWVlZTc1NFwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMX1dLDExOltmdW5jdGlvbihlLGgsdCl7IWZ1bmN0aW9uKGUsdCxuLHIsbyxmLGwsYyxkKXt2YXIgaSx1LHM7ZnVuY3Rpb24gYSgpe30oZT1oLmV4cG9ydHM9e30pLm5leHRUaWNrPSh1PVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5zZXRJbW1lZGlhdGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cucG9zdE1lc3NhZ2UmJndpbmRvdy5hZGRFdmVudExpc3RlbmVyLHU/ZnVuY3Rpb24oZSl7cmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZSl9OnM/KGk9W10sd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsZnVuY3Rpb24oZSl7dmFyIHQ9ZS5zb3VyY2U7dCE9PXdpbmRvdyYmbnVsbCE9PXR8fFwicHJvY2Vzcy10aWNrXCIhPT1lLmRhdGF8fChlLnN0b3BQcm9wYWdhdGlvbigpLDA8aS5sZW5ndGgmJmkuc2hpZnQoKSgpKX0sITApLGZ1bmN0aW9uKGUpe2kucHVzaChlKSx3aW5kb3cucG9zdE1lc3NhZ2UoXCJwcm9jZXNzLXRpY2tcIixcIipcIil9KTpmdW5jdGlvbihlKXtzZXRUaW1lb3V0KGUsMCl9KSxlLnRpdGxlPVwiYnJvd3NlclwiLGUuYnJvd3Nlcj0hMCxlLmVudj17fSxlLmFyZ3Y9W10sZS5vbj1hLGUuYWRkTGlzdGVuZXI9YSxlLm9uY2U9YSxlLm9mZj1hLGUucmVtb3ZlTGlzdGVuZXI9YSxlLnJlbW92ZUFsbExpc3RlbmVycz1hLGUuZW1pdD1hLGUuYmluZGluZz1mdW5jdGlvbihlKXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZFwiKX0sZS5jd2Q9ZnVuY3Rpb24oKXtyZXR1cm5cIi9cIn0sZS5jaGRpcj1mdW5jdGlvbihlKXt0aHJvdyBuZXcgRXJyb3IoXCJwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWRcIil9fS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzXCIpfSx7YnVmZmVyOjMsbFlwb0kyOjExfV19LHt9LFsxXSkoMSl9KTsiLCJleHBvcnQgY29uc3QgZm9yd2FyZENvbnRleHRNZW51Q2xpY2tzID0gKCkgPT4ge1xuICBjaHJvbWUuY29udGV4dE1lbnVzLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcigoaW5mbywgdGFiKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2luZm8nLCBpbmZvKVxuICAgIGlmIChpbmZvLm1lbnVJdGVtSWQgPT09ICdzZXR0aW5ncycpIHtcbiAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7XG4gICAgICAgIHVybDogY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKCcvc3JjL3BhZ2VzL3NldHRpbmdzL2luZGV4Lmh0bWwnKSxcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IGluZm8uc2VsZWN0aW9uVGV4dFxuICAgICAgY29uc3QgaWQgPSBpbmZvLm1lbnVJdGVtSWRcbiAgICAgIGlmICh0YWI/LmlkKVxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWIuaWQsIHtcbiAgICAgICAgICBhY3Rpb246ICdmb3J3YXJkLWNvbnRleHQtbWVudS1jbGljaycsXG4gICAgICAgICAgcGF5bG9hZDogeyBzZWxlY3RlZFRleHQsIGlkIH0sXG4gICAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuIiwiLyoqXG4gKiBXZSBmZXRjaCB0aGUgc2hvcnRjdXQgYXNzaWduZWQgdG8gc2lkZWJhciBmcm9tIGNocm9tZS5jb21tYW5kcy5nZXRBbGxcbiAqIGFuZCBzZW5kIGl0IHRvIGNsaWVudCB2aWEgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UuXG4gKlxuICogV2UgYXJlIGRvaW5nIHRoaXMgYmVjYXVzZSB3ZSBjYW5ub3QgZGlyZWN0bHkgYWNjZXNzIHRoZSBjaHJvbWUuY29tbWFuZHNcbiAqIGZyb20gdGhlIGNvbnRlbnQgc2NyaXB0LlxuICovXG5leHBvcnQgY29uc3Qgc2VuZFNpZGViYXJTaG9ydGN1dCA9ICgpID0+IHtcbiAgY2hyb21lLmNvbW1hbmRzLmdldEFsbChmdW5jdGlvbiAoY29tbWFuZHMpIHtcbiAgICAvLyBHZXQgc2hvcnRjdXRcbiAgICBjb25zdCBzaG9ydGN1dCA9IGNvbW1hbmRzLmZpbmQoKGMpID0+IGMubmFtZSA9PT0gJ29wZW4tc2lkZWJhcicpPy5zaG9ydGN1dFxuXG4gICAgLy8gU2VuZCBzaG9ydGN1dCB0byBjbGllbnRcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgaWYgKHRhYnNbMF0uaWQpXG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHtcbiAgICAgICAgICBhY3Rpb246ICdzaWRlYmFyLXNob3J0Y3V0JyxcbiAgICAgICAgICBzaG9ydGN1dCxcbiAgICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuIiwiLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgYWxsIHRoZSBsaXN0ZW5lcnMgdGhhdCB0b2dnbGUgdGhlIHNpZGViYXIuXG4gKiBUaGUgc2lkZWJhciBjYW4gYmUgdG9nZ2xlZCBieTpcbiAqIDEpIENsaWNraW5nIG9uIHRoZSBleHRlbnNpb24gaWNvblxuICogMikgUHJlc3NpbmcgdGhlIGtleWJvYXJkIHNob3J0Y3V0XG4gKiAzKSBQcm9ncmFtbWF0aWNhbGx5IHZpYSB0aGUgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlIGxpc3RlbmVyXG4gKiAgICAodXNlZCBieSB0aGUgY2xvc2UgYnV0dG9uIGluIHRoZSBzaWRlYmFyKVxuICovXG5leHBvcnQgY29uc3Qgc2lkZWJhclRvZ2dsZUxpc3RlbmVycyA9ICgpID0+IHtcbiAgLy8gVG9nZ2xlIHNpZGViYXIgd2hlbiB1c2VyIHBlcmZvcm1zIGEga2V5Ym9hcmQgc2hvcnRjdXRcbiAgY2hyb21lLmNvbW1hbmRzLm9uQ29tbWFuZC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoY29tbWFuZCkge1xuICAgIGNvbnNvbGUubG9nKGDwn5qaIFtDb21tYW5kIFJlY2VpdmVkXSAke2NvbW1hbmR9YClcbiAgICBpZiAoY29tbWFuZCA9PT0gJ29wZW4tc2lkZWJhcicpIHtcbiAgICAgIHRvZ2dsZVNpZGViYXIoKVxuICAgIH1cbiAgfSlcblxuICAvLyBUb2dnbGUgc2lkZWJhciB3aGVuIHVzZXIgY2xpY2tzIG9uIHRoZSBleHRlbnNpb24gaWNvblxuICBjaHJvbWUuYWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcih0b2dnbGVTaWRlYmFyKVxuXG4gIC8vIFRvZ2dsZSBzaWRlYmFyIHByb2dyYW1tYXRpY2FsbHlcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChcbiAgICBtZXNzYWdlLFxuICAgIF9zZW5kZXIsXG4gICAgc2VuZFJlc3BvbnNlLFxuICApIHtcbiAgICBpZiAoXG4gICAgICBtZXNzYWdlLmFjdGlvbiA9PT0gJ2Nsb3NlLXNpZGViYXInIHx8XG4gICAgICBtZXNzYWdlLmFjdGlvbiA9PT0gJ29wZW4tc2lkZWJhcidcbiAgICApIHtcbiAgICAgIHRvZ2dsZVNpZGViYXIoKVxuICAgIH1cbiAgICBpZiAobWVzc2FnZS5hY3Rpb24gPT09ICdnZW5lcmF0ZScpIHtcbiAgICAgIG1lc3NhZ2UucHJvbXB0XG4gICAgfVxuICAgIHNlbmRSZXNwb25zZSh7IGFjdGlvbjogJ2Nsb3NlLXNpZGViYXInIH0pXG4gIH0pXG59XG5cbmNvbnN0IHRvZ2dsZVNpZGViYXIgPSAoKSA9PiB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgaWYgKHRhYnNbMF0uaWQpIHtcbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHsgYWN0aW9uOiAnb3Blbi1zaWRlYmFyJyB9KVxuICAgIH1cbiAgfSlcbn1cbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJpbmRleC5qcy5tYXAifQ==
 globalThis.define=__define;  })(globalThis.define);