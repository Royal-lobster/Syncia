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
})({"3dHho":[function(require,module,exports) {
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
    "entryFilePath": "/Users/srujangurram/Projects/personal/syncia-plasmo/.plasmo/static/background/index.ts",
    "bundleId": "c338908e704c91f1",
    "envHash": "d99a5ffa57acd638",
    "verbose": "false",
    "secure": false,
    "serverPort": 52320
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}]},["3dHho","8oeFb"], "8oeFb", "parcelRequire5833")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsT0FBTyxJQUFFLE9BQUssS0FBRyxFQUFFLEVBQUUsT0FBTyxJQUFFLE9BQUssSUFBRSxFQUFFLEVBQUUsT0FBTyxJQUFFLEdBQUUsQ0FBQyxLQUFJLEtBQUksRUFBRSxBQUFDLENBQUEsUUFBTSxDQUFBLEtBQUksSUFBRyxFQUFFLE1BQUk7NEJBQUcsT0FBTyxLQUFHLElBQUUsRUFBRSxNQUFLLENBQUEsSUFBRSxFQUFFLEVBQUUsT0FBTyxPQUFLLElBQUUsRUFBRSxFQUFFLE9BQU8sSUFBRSxPQUFLLENBQUEsS0FBSSxLQUFHLEtBQUksQ0FBQSxFQUFFLEFBQUMsQ0FBQSxJQUFFLEVBQUUsRUFBRSxPQUFPLE9BQUssS0FBRyxFQUFFLEVBQUUsT0FBTyxJQUFFLE9BQUssSUFBRSxFQUFFLEVBQUUsT0FBTyxJQUFFLE9BQUssQ0FBQSxLQUFJLElBQUUsTUFBSyxFQUFFLE1BQUksRUFBQyxHQUFHO3dCQUFDLEdBQUUsRUFBRSxnQkFBYyxTQUFTLENBQUM7NEJBQUUsSUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxTQUFPLEdBQUUsSUFBRTs0QkFBRyxTQUFTLEVBQUUsQ0FBQztnQ0FBRSxPQUFNLG1FQUFtRSxPQUFPOzRCQUFFOzRCQUFDLElBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxTQUFPLEdBQUUsSUFBRSxHQUFFLEtBQUcsRUFBRSxJQUFFLEFBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxJQUFFLEVBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQyxJQUFFLEVBQUUsSUFBRSxDQUFBLElBQUcsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEtBQUcsRUFBRSxBQUFDLENBQUEsSUFBRSxDQUFBLEtBQUksS0FBRyxNQUFJLEVBQUUsS0FBRyxLQUFHLE1BQUksRUFBRSxLQUFHLElBQUUsTUFBSSxFQUFFLEtBQUc7NEJBQUcsT0FBTztnQ0FBRyxLQUFLO29DQUFFLElBQUUsQUFBQyxDQUFBLEtBQUcsRUFBRSxBQUFDLENBQUEsSUFBRSxDQUFDLENBQUMsRUFBRSxTQUFPLEVBQUUsQUFBRCxL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RSxJQUFHLHdFQUF1RSxNQUFJLEVBQUUsUUFBTyxPQUFPLElBQUksRUFBRTt3QkFBRyxJQUFHLE1BQUksRUFBRSxRQUFPLE9BQU8sQ0FBQyxDQUFDLEVBQUU7d0JBQUMsSUFBRyxZQUFVLE9BQU8sR0FBRSxJQUFJLElBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksS0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUFPLElBQUksSUFBSSxJQUFFLElBQUksRUFBRSxJQUFHLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSTs0QkFBQyxJQUFJLElBQUUsQ0FBQyxDQUFDLEVBQUU7NEJBQUMsRUFBRSxLQUFLLEdBQUUsSUFBRyxLQUFHLEVBQUU7d0JBQU07d0JBQUMsT0FBTztvQkFBQyxHQUFFLEVBQUUsVUFBVSxRQUFNLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxTQUFTLEtBQUcsU0FBUyxNQUFLLENBQUEsSUFBRSxHQUFFLElBQUUsS0FBSyxDQUFBLElBQUksQ0FBQSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLENBQUEsR0FBRyxJQUFFLE9BQU8sTUFBSTt3QkFBRSxJQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxJQUFJLENBQUMsU0FBTzt3QkFBRSxPQUFPLEFBQUMsQ0FBQSxDQUFDLEtBQUcsSUFBRyxDQUFBLElBQUUsT0FBTyxFQUFDLENBQUMsS0FBSyxDQUFBLElBQUUsQ0FBQSxHQUFHLElBQUUsT0FBTyxLQUFHLFFBQVE7NEJBQWUsS0FBSTtnQ0FBTSxJQUFFLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztvQ0FBRSxJQUFFLE9BQU8sTUFBSTtvQ0FBRSxJQUFJLElBQUUsRUFBRSxTQUFPO29DQUFHLENBQUEsQ0FBQyxLQUFHLElBQUcsQ0FBQSxJQUFFLE9BQU8sRUFBQyxDQUFDLEtBQUssQ0FBQSxJQUFFLENBQUEsR0FBRyxFQUFFLEFBQUMsQ0FBQSxJQUFFLEVBQUUs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QWdCLE9BQU8sSUFBSSxFQUFFLElBQUksRUFBRTt3QkFBTyxJQUFJLElBQUksSUFBRSxJQUFJLFdBQVcsSUFBSSxDQUFDLFNBQVEsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUUsR0FBRSxLQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsRUFBRTt3QkFBQyxPQUFPLEVBQUU7b0JBQU07b0JBQUUsSUFBSSxJQUFFLEVBQUU7b0JBQVUsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxPQUFNLFlBQVUsT0FBTyxJQUFFLElBQUUsS0FBSSxDQUFBLElBQUUsQ0FBQyxDQUFDLENBQUEsSUFBRyxJQUFFLEtBQUcsS0FBRyxLQUFJLENBQUEsS0FBRyxDQUFBLElBQUcsSUFBRTtvQkFBQztvQkFBQyxTQUFTLEVBQUUsQ0FBQzt3QkFBRSxPQUFNLEFBQUMsQ0FBQSxJQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFDLElBQUcsSUFBRSxJQUFFO29CQUFDO29CQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUFFLE9BQU0sQUFBQyxDQUFBLE1BQU0sV0FBUyxTQUFTLENBQUM7NEJBQUUsT0FBTSxxQkFBbUIsT0FBTyxVQUFVLFNBQVMsS0FBSzt3QkFBRSxDQUFBLEVBQUc7b0JBQUU7b0JBQUMsU0FBUyxFQUFFLENBQUM7d0JBQUUsT0FBTyxJQUFFLEtBQUcsTUFBSSxFQUFFLFNBQVMsTUFBSSxFQUFFLFNBQVM7b0JBQUc7b0JBQUMsU0FBUyxFQUFFLENBQUM7d0JBQUUsSUFBSSxJQUFJLElBQUUsRUFBRSxFQUFDLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJOzRCQUFDLElBQUksSUFBRSxFQUFFLFdBQVc7NEJBQUcsSUFBRyxLQUFHLEtBQUksRUFBRSxLQUFLLEVBQUUsV0FBVztpQ0FBUyxJQUFJLElBQUksSUFBRSxHQUFFLElBQUcsQ0FBQSxTQUFPLEtBQUcsS0FBRyxTQUFPLEtBQUksbUJBQW1CLEVBQUUsTUFBTSxHQUFFLElBQUUsSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFHLEdBQUcsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBQzt3QkFBSTt3QkFBQyxPQUFPO29CQUFDO29CQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUFFLE9BQU8sRUFBRSxZQUFZO29CQUFFO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLElBQUksSUFBSSxJQUFFLEdBQUUsSUFBRSxLQUFHLENBQUUsQ0FBQSxJQUFFLEtBQUcsRUFBRSxVQUFRLEtBQUcsRUFBRSxNQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBRSxFQUFFLEdBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQUMsT0FBTztvQkFBQztvQkFBQyxTQUFTLEVBQUUsQ0FBQzt3QkFBRSxJQUFHOzRCQUFDLE9BQU8sbUJBQW1CO3dCQUFFLEVBQUMsT0FBTSxHQUFFOzRCQUFDLE9BQU8sT0FBTyxhQUFhO3dCQUFNO29CQUFDO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxFQUFFLFlBQVUsT0FBTyxHQUFFLDBDQUF5QyxFQUFFLEtBQUcsR0FBRSw2REFBNEQsRUFBRSxLQUFHLEdBQUUsZ0RBQStDLEVBQUUsS0FBSyxNQUFNLE9BQUssR0FBRTtvQkFBbUM7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxFQUFFLFlBQVUsT0FBTyxHQUFFLDBDQUF5QyxFQUFFLEtBQUcsR0FBRSw0Q0FBMkMsRUFBRSxLQUFHLEdBQUUsNkNBQTRDLEVBQUUsS0FBSyxNQUFNLE9BQUssR0FBRTtvQkFBbUM7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxFQUFFLFlBQVUsT0FBTyxHQUFFLDBDQUF5QyxFQUFFLEtBQUcsR0FBRSw0Q0FBMkMsRUFBRSxLQUFHLEdBQUU7b0JBQTJDO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxJQUFHLENBQUMsR0FBRSxNQUFNLElBQUksTUFBTSxLQUFHO29CQUFtQjtvQkFBQyxFQUFFLFdBQVMsU0FBUyxDQUFDO3dCQUFFLE9BQU8sRUFBRSxZQUFVLENBQUMsR0FBRSxFQUFFLE9BQUssRUFBRSxLQUFJLEVBQUUsT0FBSyxFQUFFLEtBQUksRUFBRSxNQUFJLEVBQUUsS0FBSSxFQUFFLE1BQUksRUFBRSxLQUFJLEVBQUUsUUFBTSxFQUFFLE9BQU0sRUFBRSxXQUFTLEVBQUUsVUFBUyxFQUFFLGlCQUFlLEVBQUUsVUFBUyxFQUFFLFNBQU8sRUFBRSxRQUFPLEVBQUUsT0FBSyxFQUFFLE1BQUssRUFBRSxRQUFNLEVBQUUsT0FBTSxFQUFFLFlBQVUsRUFBRSxXQUFVLEVBQUUsZUFBYSxFQUFFLGNBQWEsRUFBRSxlQUFhLEVBQUUsY0FBYSxFQUFFLGVBQWEsRUFBRSxjQUFhLEVBQUUsZUFBYSxFQUFFLGNBQWEsRUFBRSxXQUFTLEVBQUUsVUFBUyxFQUFFLGNBQVksRUFBRSxhQUFZLEVBQUUsY0FBWSxFQUFFLGFBQVksRUFBRSxjQUFZLEVBQUUsYUFBWSxFQUFFLGNBQVksRUFBRSxhQUFZLEVBQUUsY0FBWSxFQUFFLGFBQVksRUFBRSxjQUFZLEVBQUUsYUFBWSxFQUFFLGVBQWEsRUFBRSxjQUFhLEVBQUUsZUFBYSxFQUFFLGNBQWEsRUFBRSxhQUFXLEVBQUUsWUFBVyxFQUFFLGdCQUFjLEVBQUUsZUFBYyxFQUFFLGdCQUFjLEVBQUUsZUFBYyxFQUFFLGdCQUFjLEVBQUUsZUFBYyxFQUFFLGdCQUFjLEVBQUUsZUFBYyxFQUFFLFlBQVUsRUFBRSxXQUFVLEVBQUUsZUFBYSxFQUFFLGNBQWEsRUFBRSxlQUFhLEVBQUUsY0FBYSxFQUFFLGVBQWEsRUFBRSxjQUFhLEVBQUUsZUFBYSxFQUFFLGNBQWEsRUFBRSxlQUFhLEVBQUUsY0FBYSxFQUFFLGVBQWEsRUFBRSxjQUFhLEVBQUUsZ0JBQWMsRUFBRSxlQUFjLEVBQUUsZ0JBQWMsRUFBRSxlQUFjLEVBQUUsT0FBSyxFQUFFLE1BQUssRUFBRSxVQUFR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O3dCQUFFLENBQUMsQ0FBQyxLQUFHLEVBQUUsSUFBRSxPQUFLLElBQUUsSUFBRyxDQUFDLENBQUMsS0FBSSxDQUFBLElBQUUsT0FBSyxLQUFHLENBQUEsRUFBRyxHQUFDO3dCQUFFLElBQUksSUFBSSxJQUFFLFlBQVcsSUFBRSxZQUFXLElBQUUsYUFBWSxJQUFFLFdBQVUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUcsR0FBRzs0QkFBQyxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsWUFBVyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRzs0QkFBYSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsY0FBYSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxZQUFXLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxHQUFFLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsY0FBYSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsSUFBRyxTQUFRLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLGNBQWEsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLEdBQUUsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsSUFBRyxZQUFXLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLGNBQWEsSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsYUFBWSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEdBQUUsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLFlBQVcsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxHQUFFLFdBQVUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxHQUFFLFlBQVcsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLEdBQUUsY0FBYSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLEdBQUUsY0FBYSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxZQUFXLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsY0FBYSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEdBQUUsVUFBUyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsWUFBVyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsR0FBRSxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsSUFBRyxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxHQUFFLFlBQVcsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLFdBQVUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEdBQUUsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsSUFBRyxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLFlBQVcsSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsYUFBWSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEdBQUUsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLGNBQWEsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsWUFBVyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsR0FBRSxhQUFZLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLGNBQWEsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsV0FBVSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxHQUFFLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsR0FBRyxFQUFDLElBQUcsWUFBVyxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBRyxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxJQUFHLGFBQVksSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEdBQUUsYUFBWSxJQUFFLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLENBQUMsSUFBRSxHQUFHLEVBQUMsSUFBRyxjQUFhLElBQUUsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFHLFlBQVcsSUFBRSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLElBQUcsYUFBWSxJQUFFLEVBQUUsR0FBRSxJQUFHLElBQUUsRUFBRSxHQUFFLElBQUcsSUFBRSxFQUFFLEdBQUUsSUFBRyxJQUFFLEVBQUUsR0FBRTt3QkFBRTt3QkFBQyxPQUFPLE1BQU0sR0FBRSxHQUFFLEdBQUU7b0JBQUU7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxPQUFPLEVBQUUsQUFBQyxDQUFBLElBQUUsRUFBRSxFQUFFLEdBQUUsSUFBRyxFQUFFLEdBQUUsR0FBRSxLQUFJLElBQUUsTUFBSSxLQUFHLEdBQUU7b0JBQUU7b0JBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO29CQUFFO29CQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO3dCQUFFLE9BQU8sRUFBRSxJQUFFLElBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtvQkFBRTtvQkFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxPQUFPLEVBQUUsSUFBRSxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtvQkFBRTtvQkFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxPQUFPLEVBQUUsSUFBRyxDQUFBLElBQUUsQ0FBQyxDQUFBLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRTtvQkFBRTtvQkFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUM7d0JBQUUsSUFBSSxJQUFFLEFBQUMsQ0FBQSxRQUFNLENBQUEsSUFBSSxDQUFBLFFBQU0sQ0FBQTt3QkFBRyxPQUFNLEFBQUMsQ0FBQSxLQUFHLEVBQUMsSUFBSSxDQUFBLEtBQUcsRUFBQyxJQUFJLENBQUEsS0FBRyxFQUFDLEtBQUksS0FBRyxRQUFNO29CQUFDO29CQUFDLEVBQUUsVUFBUSxTQUFTLENBQUM7d0JBQUUsT0FBTyxFQUFFLEtBQUssR0FBRSxHQUFFO29CQUFHO2dCQUFDLENBQUEsRUFBRSxLQUFLLElBQUksRUFBQyxFQUFFLFdBQVUsZUFBYSxPQUFPLE9BQUssT0FBSyxlQUFhLE9BQU8sU0FBTyxTQUFPLENBQUMsR0FBRSxFQUFFLFVBQVUsUUFBTyxTQUFTLENBQUMsRUFBRSxFQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxTQUFTLENBQUMsRUFBRSxFQUFDLHVFQUFzRTtZQUErRDtZQUFFO2dCQUFDLGFBQVk7Z0JBQUUsUUFBTztnQkFBRSxRQUFPO1lBQUU7U0FBRTtRQUFDLEdBQUU7WUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztnQkFBRyxDQUFBLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO29CQUFFLElBQUk7b0JBQUUsRUFBRSxVQUFRLEtBQUcsU0FBUyxDQUFDO3dCQUFFLElBQUksSUFBSSxHQUFFLElBQUUsSUFBSSxNQUFNLElBQUcsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLEtBQUksQ0FBQSxJQUFFLENBQUEsS0FBSyxDQUFBLElBQUUsYUFBVyxLQUFLLFFBQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFDLE1BQUssQ0FBQSxBQUFDLENBQUEsSUFBRSxDQUFBLEtBQUksQ0FBQSxJQUFHO3dCQUFJLE9BQU87b0JBQUM7Z0JBQUMsQ0FBQSxFQUFFLEtBQUssSUFBSSxFQUFDLEVBQUUsV0FBVSxlQUFhLE9BQU8sT0FBSyxPQUFLLGVBQWEsT0FBTyxTQUFPLFNBQU8sQ0FBQyxHQUFFLEVBQUUsVUFBVSxRQUFPLFNBQVMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxTQUFTLENBQUMsRUFBRSxFQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsdUVBQXNFO1lBQStEO1lBQUU7Z0JBQUMsUUFBTztnQkFBRSxRQUFPO1lBQUU7U0FBRTtRQUFDLEdBQUU7WUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztnQkFBRyxDQUFBLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO29CQUFFLElBQUksSUFBRSxFQUFFO29CQUFhLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxDQUFDLENBQUMsS0FBRyxFQUFFLElBQUUsT0FBSyxLQUFHLElBQUUsSUFBRyxDQUFDLENBQUMsS0FBSSxDQUFBLElBQUUsTUFBSSxLQUFHLENBQUEsRUFBRyxHQUFDO3dCQUFFLElBQUksSUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLE1BQU0sS0FBSSxJQUFFLFlBQVcsSUFBRSxZQUFXLElBQUUsYUFBWSxJQUFFLFdBQVUsSUFBRSxhQUFZLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFHLEdBQUc7NEJBQUMsSUFBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFJO2dDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUMsSUFBRSxLQUFHLENBQUMsQ0FBQyxJQUFFLEVBQUUsR0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsR0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLEdBQUMsQ0FBQyxDQUFDLElBQUUsR0FBRyxHQUFDLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQztnQ0FBRyxJQUFJLElBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRSxJQUFJLENBQUEsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsQUFBQyxDQUFBLElBQUUsQ0FBQSxJQUFHLEtBQUcsSUFBRSxJQUFFLENBQUMsSUFBRSxJQUFFLENBQUUsQ0FB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SSxDQUFBLElBQUUsTUFBSSxLQUFHLENBQUEsRUFBRyxHQUFDO3dCQUFFLElBQUksSUFBSSxHQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUcsR0FBRzs0QkFBQyxJQUFJLElBQUksSUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxJQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxJQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBQyxJQUFFLEtBQUcsQ0FBQyxDQUFDLElBQUUsRUFBRSxHQUFDLEVBQUUsRUFBRSxFQUFHLENBQUEsSUFBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsRUFBRSxHQUFFLE1BQUksRUFBRSxHQUFFLE1BQUksRUFBRSxHQUFFLEdBQUUsR0FBRyxDQUFDLENBQUMsSUFBRSxFQUFFLEdBQUcsQ0FBQSxJQUFFLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxFQUFFLEdBQUUsS0FBRyxFQUFFLEdBQUUsTUFBSSxFQUFFLEdBQUUsRUFBQyxJQUFJLENBQUMsQ0FBQyxJQUFFLEdBQUcsR0FBRSxJQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRSxFQUFFLElBQUUsR0FBRSxLQUFHLEVBQUUsR0FBRSxNQUFJLEVBQUUsR0FBRSxNQUFLLElBQUUsSUFBRSxDQUFDLElBQUUsSUFBRyxDQUFDLENBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsSUFBRSxHQUFFLEtBQUcsRUFBRSxHQUFFLE1BQUksRUFBRSxHQUFFLEtBQUksSUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxFQUFFLEdBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEVBQUUsR0FBRTs0QkFBRyxDQUFDLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBRSxDQUFDLENBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRSxDQUFDLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBRSxDQUFDLENBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRSxDQUFDLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBRSxDQUFDLENBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxFQUFFO3dCQUFDO3dCQUFDLE9BQU87b0JBQUM7b0JBQUMsSUFBSSxJQUFFLEVBQUUsY0FBYSxJQUFFLFNBQVMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsT0FBTyxNQUFJLElBQUUsS0FBRyxLQUFHO29CQUFDLEdBQUUsSUFBRSxTQUFTLENBQUMsRUFBQyxDQUFDO3dCQUFFLE9BQU8sTUFBSTtvQkFBQztvQkFBRSxFQUFFLFVBQVEsU0FBUyxDQUFDO3dCQUFFLE9BQU8sRUFBRSxLQUFLLEdBQUUsR0FBRSxJQUFHLENBQUM7b0JBQUU7Z0JBQUMsQ0FBQSxFQUFFLEtBQUssSUFBSSxFQUFDLEVBQUUsV0FBVSxlQUFhLE9BQU8sT0FBSyxPQUFLLGVBQWEsT0FBTyxTQUFPLFNBQU8sQ0FBQyxHQUFFLEVBQUUsVUFBVSxRQUFPLFNBQVMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxTQUFTLENBQUMsRUFBRSxFQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsMEVBQXlFO1lBQStEO1lBQUU7Z0JBQUMsYUFBWTtnQkFBRSxRQUFPO2dCQUFFLFFBQU87WUFBRTtTQUFFO1FBQUMsSUFBRztZQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO2dCQUFHLENBQUEsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7b0JBQUUsRUFBRSxPQUFLLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUM7d0JBQUUsSUFBSSxHQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsQUFBQyxDQUFBLEtBQUcsQ0FBQSxJQUFHLEdBQUUsSUFBRSxLQUFHLEdBQUUsSUFBRSxJQUFHLElBQUUsSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUUsS0FBRyxHQUFFLElBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRTt3QkFBQyxJQUFJLEtBQUcsR0FBRSxJQUFFLElBQUUsQUFBQyxDQUFBLEtBQUcsQ0FBQyxDQUFBLElBQUcsR0FBRSxNQUFJLENBQUMsR0FBRSxLQUFHLEdBQUUsSUFBRSxHQUFFLElBQUUsTUFBSSxJQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxLQUFHLEdBQUUsS0FBRzt3QkFBRyxJQUFJLElBQUUsSUFBRSxBQUFDLENBQUEsS0FBRyxDQUFDLENBQUEsSUFBRyxHQUFFLE1BQUksQ0FBQyxHQUFFLEtBQUcsR0FBRSxJQUFFLEdBQUUsSUFBRSxNQUFJLElBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLEtBQUcsR0FBRSxLQUFHO3dCQUFHLElBQUcsTUFBSSxHQUFFLElBQUUsSUFBRTs2QkFBTTs0QkFBQyxJQUFHLE1BQUksR0FBRSxPQUFPLElBQUUsTUFBSSxJQUFFLElBQUcsQ0FBQSxJQUFFLEtBQUcsQ0FBQTs0QkFBRyxLQUFHLEtBQUssSUFBSSxHQUFFLElBQUcsS0FBRzt3QkFBQzt3QkFBQyxPQUFNLEFBQUMsQ0FBQSxJQUFFLEtBQUcsQ0FBQSxJQUFHLElBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRTtvQkFBRSxHQUFFLEVBQUUsUUFBTSxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQzt3QkFBRSxJQUFJLEdBQUUsR0FBRSxJQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxBQUFDLENBQUEsS0FBRyxDQUFBLElBQUcsR0FBRSxJQUFFLEtBQUcsR0FBRSxJQUFFLE9BQUssSUFBRSxLQUFLLElBQUksR0FBRSxPQUFLLEtBQUssSUFBSSxHQUFFLE9BQUssR0FBRSxJQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsS0FBRyxNQUFJLEtBQUcsSUFBRSxJQUFFLElBQUUsSUFBRTt3QkFBRSxJQUFJLElBQUUsS0FBSyxJQUFJLElBQUcsTUFBTSxNQUFJLE1BQUksSUFBRSxJQUFHLENBQUEsSUFBRSxNQUFNLEtBQUcsSUFBRSxHQUFFLElBQUUsQ0FBQSxJQUFJLENBQUEsSUFBRSxLQUFLLE1BQU0sS0FBSyxJQUFJLEtBQUcsS0FBSyxNQUFLLElBQUcsQ0FBQSxJQUFFLEtBQUssSUFBSSxHQUFFLENBQUMsRUFBQyxJQUFHLEtBQUksQ0FBQSxLQUFJLEtBQUcsQ0FBQSxHQUFHLEtBQUcsQUFBQyxDQUFBLEtBQUcsS0FBRyxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRSxFQUFDLElBQUcsS0FBSSxDQUFBLEtBQUksS0FBRyxDQUFBLEdBQUcsS0FBRyxJQUFFLElBQUcsQ0FBQSxJQUFFLEdBQUUsSUFBRSxDQUFBLElBQUcsS0FBRyxJQUFFLElBQUcsQ0FBQSxJQUFFLEFBQUMsQ0FBQSxJQUFFLElBQUUsQ0FBQSxJQUFHLEtBQUssSUFBSSxHQUFFLElBQUcsS0FBRyxDQUFBLElBQUksQ0FBQSxJQUFFLElBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRSxLQUFHLEtBQUssSUFBSSxHQUFFLElBQUcsSUFB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QUFhO1lBQUUsUUFBUTtRQUFnQjtJQUN6QztBQUNGO0FBRUEsTUFBTSxnQkFBZ0I7SUFDcEIsT0FBTyxLQUFLLE1BQU07UUFBRSxRQUFRO1FBQU0sZUFBZTtJQUFLLEdBQUcsU0FBVSxJQUFJO1FBQ3JFLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUNWLE9BQU8sS0FBSyxZQUFZLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSTtZQUFFLFFBQVE7UUFBZTtJQUVqRTtBQUNGIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvLnBucG0vQHBsYXNtb2hxK3BhcmNlbC1ydW50aW1lQDAuMjIuMC9ub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC1ydW50aW1lL2Rpc3QvcnVudGltZS02NTkzYjI5MDI3YTNjNDI5LmpzIiwiLnBsYXNtby9zdGF0aWMvYmFja2dyb3VuZC9pbmRleC50cyIsInNyYy9iYWNrZ3JvdW5kL2luZGV4LnRzIiwic3JjL2xpYi9sb2dzLnRzeCIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3RyYW5zZm9ybWVyLWpzQDIuOS4zX0BwYXJjZWwrY29yZUAyLjkuMy9ub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsInNyYy9iYWNrZ3JvdW5kL3F1aWNrLW1lbnUvY3JlYXRlQ29udGV4dE1lbnUudHMiLCJzcmMvbGliL2dldFN0b3JlZFByb21wdHMudHMiLCJzcmMvY29uZmlnL3Byb21wdHMvZGVmYXVsdC50cyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9lbmRlbnRAMi4xLjAvbm9kZV9tb2R1bGVzL2VuZGVudC9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvLnBucG0vZGVkZW50QDAuNy4wL25vZGVfbW9kdWxlcy9kZWRlbnQvZGlzdC9kZWRlbnQuanMiLCJub2RlX21vZHVsZXMvLnBucG0vb2JqZWN0b3JhcnJheUAxLjAuNS9ub2RlX21vZHVsZXMvb2JqZWN0b3JhcnJheS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9mYXN0LWpzb24tcGFyc2VAMS4wLjMvbm9kZV9tb2R1bGVzL2Zhc3QtanNvbi1wYXJzZS9wYXJzZS5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9vYmplY3QtaGFzaEAzLjAuMC9ub2RlX21vZHVsZXMvb2JqZWN0LWhhc2gvZGlzdC9vYmplY3RfaGFzaC5qcyIsInNyYy9iYWNrZ3JvdW5kL3F1aWNrLW1lbnUvZm9yd2FyZENvbnRleHRNZW51LnRzIiwic3JjL2JhY2tncm91bmQvc2lkZWJhci9zZW5kU2lkZWJhclNob3J0Y3V0LnRzIiwic3JjL2JhY2tncm91bmQvc2lkZWJhci9zaWRlYmFyVG9nZ2xlTGlzdGVuZXJzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB1PXR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmFyZ3Y6W107dmFyIGg9KCk9PnR5cGVvZiBnbG9iYWxUaGlzLnByb2Nlc3M8XCJ1XCI/Z2xvYmFsVGhpcy5wcm9jZXNzLmVudjp7fTt2YXIgQj1uZXcgU2V0KHUpLF89ZT0+Qi5oYXMoZSksRz11LmZpbHRlcihlPT5lLnN0YXJ0c1dpdGgoXCItLVwiKSYmZS5pbmNsdWRlcyhcIj1cIikpLm1hcChlPT5lLnNwbGl0KFwiPVwiKSkucmVkdWNlKChlLFt0LG9dKT0+KGVbdF09byxlKSx7fSk7dmFyIFU9XyhcIi0tZHJ5LXJ1blwiKSxnPSgpPT5fKFwiLS12ZXJib3NlXCIpfHxoKCkuVkVSQk9TRT09PVwidHJ1ZVwiLE49ZygpO3ZhciBtPShlPVwiXCIsLi4udCk9PmNvbnNvbGUubG9nKGUucGFkRW5kKDkpLFwifFwiLC4uLnQpO3ZhciB5PSguLi5lKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4uZSksYj0oLi4uZSk9Pm0oXCJcXHV7MUY1MzV9IElORk9cIiwuLi5lKSxmPSguLi5lKT0+bShcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLmUpLE09MCxpPSguLi5lKT0+ZygpJiZtKGBcXHV7MUY3RTF9ICR7TSsrfWAsLi4uZSk7dmFyIHY9KCk9PntsZXQgZT1nbG9iYWxUaGlzLmJyb3dzZXI/LnJ1bnRpbWV8fGdsb2JhbFRoaXMuY2hyb21lPy5ydW50aW1lLHQ9KCk9PnNldEludGVydmFsKGUuZ2V0UGxhdGZvcm1JbmZvLDI0ZTMpO2Uub25TdGFydHVwLmFkZExpc3RlbmVyKHQpLHQoKX07dmFyIG49e1wiaXNDb250ZW50U2NyaXB0XCI6ZmFsc2UsXCJpc0JhY2tncm91bmRcIjp0cnVlLFwiaXNSZWFjdFwiOmZhbHNlLFwicnVudGltZXNcIjpbXCJiYWNrZ3JvdW5kLXNlcnZpY2UtcnVudGltZVwiXSxcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjE4MTUsXCJlbnRyeUZpbGVQYXRoXCI6XCIvVXNlcnMvc3J1amFuZ3VycmFtL1Byb2plY3RzL3BlcnNvbmFsL3N5bmNpYS1wbGFzbW8vLnBsYXNtby9zdGF0aWMvYmFja2dyb3VuZC9pbmRleC50c1wiLFwiYnVuZGxlSWRcIjpcImMzMzg5MDhlNzA0YzkxZjFcIixcImVudkhhc2hcIjpcImQ5OWE1ZmZhNTdhY2Q2MzhcIixcInZlcmJvc2VcIjpcImZhbHNlXCIsXCJzZWN1cmVcIjpmYWxzZSxcInNlcnZlclBvcnRcIjo1MjMyMH07bW9kdWxlLmJ1bmRsZS5ITVJfQlVORExFX0lEPW4uYnVuZGxlSWQ7Z2xvYmFsVGhpcy5wcm9jZXNzPXthcmd2OltdLGVudjp7VkVSQk9TRTpuLnZlcmJvc2V9fTt2YXIgRD1tb2R1bGUuYnVuZGxlLk1vZHVsZTtmdW5jdGlvbiBIKGUpe0QuY2FsbCh0aGlzLGUpLHRoaXMuaG90PXtkYXRhOm1vZHVsZS5idW5kbGUuaG90RGF0YVtlXSxfYWNjZXB0Q2FsbGJhY2tzOltdLF9kaXNwb3NlQ2FsbGJhY2tzOltdLGFjY2VwdDpmdW5jdGlvbih0KXt0aGlzLl9hY2NlcHRDYWxsYmFja3MucHVzaCh0fHxmdW5jdGlvbigpe30pfSxkaXNwb3NlOmZ1bmN0aW9uKHQpe3RoaXMuX2Rpc3Bvc2VDYWxsYmFja3MucHVzaCh0KX19LG1vZHVsZS5idW5kbGUuaG90RGF0YVtlXT12b2lkIDB9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU9SDttb2R1bGUuYnVuZGxlLmhvdERhdGE9e307dmFyIGM9Z2xvYmFsVGhpcy5icm93c2VyfHxnbG9iYWxUaGlzLmNocm9tZXx8bnVsbDtmdW5jdGlvbiBSKCl7cmV0dXJuIW4uaG9zdHx8bi5ob3N0PT09XCIwLjAuMC4wXCI/bG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIik9PT0wP2xvY2F0aW9uLmhvc3RuYW1lOlwibG9jYWxob3N0XCI6bi5ob3N0fWZ1bmN0aW9uIHgoKXtyZXR1cm4hbi5ob3N0fHxuLmhvc3Q9PT1cIjAuMC4wLjBcIj9cImxvY2FsaG9zdFwiOm4uaG9zdH1mdW5jdGlvbiBkKCl7cmV0dXJuIG4ucG9ydHx8bG9jYXRpb24ucG9ydH12YXIgUD1cIl9fcGxhc21vX3J1bnRpbWVfcGFnZV9cIixTPVwiX19wbGFzbW9fcnVudGltZV9zY3JpcHRfXCI7dmFyIE89YCR7bi5zZWN1cmU/XCJodHRwc1wiOlwiaHR0cFwifTovLyR7UigpfToke2QoKX0vYDthc3luYyBmdW5jdGlvbiBrKGU9MTQ3MCl7Zm9yKDs7KXRyeXthd2FpdCBmZXRjaChPKTticmVha31jYXRjaHthd2FpdCBuZXcgUHJvbWlzZShvPT5zZXRUaW1lb3V0KG8sZSkpfX1pZihjLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5tYW5pZmVzdF92ZXJzaW9uPT09Myl7bGV0IGU9Yy5ydW50aW1lLmdldFVSTChcIi9fX3BsYXNtb19obXJfcHJveHlfXz91cmw9XCIpO2dsb2JhbFRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImZldGNoXCIsZnVuY3Rpb24odCl7bGV0IG89dC5yZXF1ZXN0LnVybDtpZihvLnN0YXJ0c1dpdGgoZSkpe2xldCBzPW5ldyBVUkwoZGVjb2RlVVJJQ29tcG9uZW50KG8uc2xpY2UoZS5sZW5ndGgpKSk7cy5ob3N0bmFtZT09PW4uaG9zdCYmcy5wb3J0PT09YCR7bi5wb3J0fWA/KHMuc2VhcmNoUGFyYW1zLnNldChcInRcIixEYXRlLm5vdygpLnRvU3RyaW5nKCkpLHQucmVzcG9uZFdpdGgoZmV0Y2gocykudGhlbihyPT5uZXcgUmVzcG9uc2Uoci5ib2R5LHtoZWFkZXJzOntcIkNvbnRlbnQtVHlwZVwiOnIuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik/P1widGV4dC9qYXZhc2NyaXB0XCJ9fSkpKSk6dC5yZXNwb25kV2l0aChuZXcgUmVzcG9uc2UoXCJQbGFzbW8gSE1SXCIse3N0YXR1czoyMDAsc3RhdHVzVGV4dDpcIlRlc3RpbmdcIn0pKX19KX1mdW5jdGlvbiBFKGUsdCl7bGV0e21vZHVsZXM6b309ZTtyZXR1cm4gbz8hIW9bdF06ITF9ZnVuY3Rpb24gQyhlPWQoKSl7bGV0IHQ9eCgpO3JldHVybmAke24uc2VjdXJlfHxsb2NhdGlvbi5wcm90b2NvbD09PVwiaHR0cHM6XCImJiEvbG9jYWxob3N0fDEyNy4wLjAuMXwwLjAuMC4wLy50ZXN0KHQpP1wid3NzXCI6XCJ3c1wifTovLyR7dH06JHtlfS9gfWZ1bmN0aW9uIFQoZSl7dHlwZW9mIGUubWVzc2FnZT09XCJzdHJpbmdcIiYmeShcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitlLm1lc3NhZ2UpfWZ1bmN0aW9uIEwoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1uZXcgV2ViU29ja2V0KEMoTnVtYmVyKGQoKSkrMSkpO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYXN5bmMgZnVuY3Rpb24obyl7bGV0IHM9SlNPTi5wYXJzZShvLmRhdGEpO2F3YWl0IGUocyl9KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLFQpLHR9ZnVuY3Rpb24gQShlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQoQygpKTtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGFzeW5jIGZ1bmN0aW9uKG8pe2xldCBzPUpTT04ucGFyc2Uoby5kYXRhKTtpZihzLnR5cGU9PT1cInVwZGF0ZVwiJiZhd2FpdCBlKHMuYXNzZXRzKSxzLnR5cGU9PT1cImVycm9yXCIpZm9yKGxldCByIG9mIHMuZGlhZ25vc3RpY3MuYW5zaSl7bGV0IGw9ci5jb2RlZnJhbWV8fHIuc3RhY2s7ZihcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIityLm1lc3NhZ2UrYFxuYCtsK2BcblxuYCtyLmhpbnRzLmpvaW4oYFxuYCkpfX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsVCksdC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCgpPT57YihgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3RlZCB0byBITVIgc2VydmVyIGZvciAke24uZW50cnlGaWxlUGF0aH1gKX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PntmKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGlvbiB0byB0aGUgSE1SIHNlcnZlciBpcyBjbG9zZWQgZm9yICR7bi5lbnRyeUZpbGVQYXRofWApfSksdH12YXIgdz1tb2R1bGUuYnVuZGxlLnBhcmVudCxhPXtidWlsZFJlYWR5OiExLGJnQ2hhbmdlZDohMSxjc0NoYW5nZWQ6ITEscGFnZUNoYW5nZWQ6ITEsc2NyaXB0UG9ydHM6bmV3IFNldCxwYWdlUG9ydHM6bmV3IFNldH07YXN5bmMgZnVuY3Rpb24gcChlPSExKXtpZihlfHxhLmJ1aWxkUmVhZHkmJmEucGFnZUNoYW5nZWQpe2koXCJCR1NXIFJ1bnRpbWUgLSByZWxvYWRpbmcgUGFnZVwiKTtmb3IobGV0IHQgb2YgYS5wYWdlUG9ydHMpdC5wb3N0TWVzc2FnZShudWxsKX1pZihlfHxhLmJ1aWxkUmVhZHkmJihhLmJnQ2hhbmdlZHx8YS5jc0NoYW5nZWQpKXtpKFwiQkdTVyBSdW50aW1lIC0gcmVsb2FkaW5nIENTXCIpO2xldCB0PWF3YWl0IGM/LnRhYnMucXVlcnkoe2FjdGl2ZTohMH0pO2ZvcihsZXQgbyBvZiBhLnNjcmlwdFBvcnRzKXtsZXQgcz10LnNvbWUocj0+ci5pZD09PW8uc2VuZGVyLnRhYj8uaWQpO28ucG9zdE1lc3NhZ2Uoe19fcGxhc21vX2NzX2FjdGl2ZV90YWJfXzpzfSl9Yy5ydW50aW1lLnJlbG9hZCgpfX1pZighd3x8IXcuaXNQYXJjZWxSZXF1aXJlKXt2KCk7bGV0IGU9QShhc3luYyB0PT57aShcIkJHU1cgUnVudGltZSAtIE9uIEhNUiBVcGRhdGVcIiksYS5iZ0NoYW5nZWR8fD10LmZpbHRlcihzPT5zLmVudkhhc2g9PT1uLmVudkhhc2gpLnNvbWUocz0+RShtb2R1bGUuYnVuZGxlLHMuaWQpKTtsZXQgbz10LmZpbmQocz0+cy50eXBlPT09XCJqc29uXCIpO2lmKG8pe2xldCBzPW5ldyBTZXQodC5tYXAobD0+bC5pZCkpLHI9T2JqZWN0LnZhbHVlcyhvLmRlcHNCeUJ1bmRsZSkubWFwKGw9Pk9iamVjdC52YWx1ZXMobCkpLmZsYXQoKTthLmJnQ2hhbmdlZHx8PXIuZXZlcnkobD0+cy5oYXMobCkpfXAoKX0pO2UuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e2xldCB0PXNldEludGVydmFsKCgpPT5lLnNlbmQoXCJwaW5nXCIpLDI0ZTMpO2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PmNsZWFySW50ZXJ2YWwodCkpfSksZS5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIixhc3luYygpPT57YXdhaXQgaygpLHAoITApfSl9TChhc3luYyBlPT57c3dpdGNoKGkoXCJCR1NXIFJ1bnRpbWUgLSBPbiBCdWlsZCBSZXBhY2thZ2VkXCIpLGUudHlwZSl7Y2FzZVwiYnVpbGRfcmVhZHlcIjp7YS5idWlsZFJlYWR5fHw9ITAscCgpO2JyZWFrfWNhc2VcImNzX2NoYW5nZWRcIjp7YS5jc0NoYW5nZWR8fD0hMCxwKCk7YnJlYWt9fX0pO2MucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24oZSl7bGV0IHQ9ZS5uYW1lLnN0YXJ0c1dpdGgoUCksbz1lLm5hbWUuc3RhcnRzV2l0aChTKTtpZih0fHxvKXtsZXQgcz10P2EucGFnZVBvcnRzOmEuc2NyaXB0UG9ydHM7cy5hZGQoZSksZS5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKCk9PntzLmRlbGV0ZShlKX0pLGUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHIpe2koXCJCR1NXIFJ1bnRpbWUgLSBPbiBzb3VyY2UgY2hhbmdlZFwiLHIpLHIuX19wbGFzbW9fY3NfY2hhbmdlZF9fJiYoYS5jc0NoYW5nZWR8fD0hMCksci5fX3BsYXNtb19wYWdlX2NoYW5nZWRfXyYmKGEucGFnZUNoYW5nZWR8fD0hMCkscCgpfSl9fSk7Yy5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbih0KXtyZXR1cm4gdC5fX3BsYXNtb19mdWxsX3JlbG9hZF9fJiYoaShcIkJHU1cgUnVudGltZSAtIE9uIHRvcC1sZXZlbCBjb2RlIGNoYW5nZWRcIikscCgpKSwhMH0pO1xuIiwiaW1wb3J0IFwiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvaW5kZXhcIiIsImltcG9ydCB7IGJhY2tncm91bmRMb2cgfSBmcm9tICd+bGliL2xvZ3MnXG5pbXBvcnQge1xuICBjcmVhdGVDb250ZXh0TWVudSxcbiAgY3JlYXRlQ29udGV4dE1lbnVPblN0b3JhZ2VDaGFuZ2UsXG59IGZyb20gJy4vcXVpY2stbWVudS9jcmVhdGVDb250ZXh0TWVudSdcbmltcG9ydCB7IGZvcndhcmRDb250ZXh0TWVudUNsaWNrcyB9IGZyb20gJy4vcXVpY2stbWVudS9mb3J3YXJkQ29udGV4dE1lbnUnXG5pbXBvcnQgeyBzZW5kU2lkZWJhclNob3J0Y3V0IH0gZnJvbSAnLi9zaWRlYmFyL3NlbmRTaWRlYmFyU2hvcnRjdXQnXG5pbXBvcnQgeyBzaWRlYmFyVG9nZ2xlTGlzdGVuZXJzIH0gZnJvbSAnLi9zaWRlYmFyL3NpZGViYXJUb2dnbGVMaXN0ZW5lcnMnXG5cbmJhY2tncm91bmRMb2coKVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cbi8vIFNpZGViYXIgU2NyaXB0c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXG5zaWRlYmFyVG9nZ2xlTGlzdGVuZXJzKClcbnNlbmRTaWRlYmFyU2hvcnRjdXQoKVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cbi8vIFF1aWNrIG1lbnUgU2NyaXB0c1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXG5jcmVhdGVDb250ZXh0TWVudSgpXG5mb3J3YXJkQ29udGV4dE1lbnVDbGlja3MoKVxuY3JlYXRlQ29udGV4dE1lbnVPblN0b3JhZ2VDaGFuZ2UoKVxuXG5leHBvcnQge30iLCJjb25zdCBsb2dvVGV4dCA9XG4gIFwiIF9fX18gICAgICAgICAgICAgICAgICAgX1xcbi8gX19ffCBfICAgXyBfIF9fICAgX19fKF8pIF9fIF9cXG5cXFxcX19fIFxcXFx8IHwgfCB8ICdfIFxcXFwgLyBfX3wgfC8gX2AgfFxcbiBfX18pIHwgfF98IHwgfCB8IHwgKF9ffCB8IChffCB8XFxufF9fX18vIFxcXFxfXywgfF98IHxffFxcXFxfX198X3xcXFxcX18sX3xcXG4gICAgICAgfF9fXy9cIlxuXG5jb25zdCBtc2dUZXh0ID0gKG1zZzogc3RyaW5nKSA9PiBgXFxuJHsnICcucmVwZWF0KDE0IC0gbXNnLmxlbmd0aCAvIDIpfVske21zZ31dYFxuXG5leHBvcnQgY29uc3QgY29udGVudFNjcmlwdExvZyA9IChpdGVtOiBzdHJpbmcpID0+IHtcbiAgY29uc29sZS5sb2cobG9nb1RleHQsIG1zZ1RleHQoYCR7aXRlbX0gU2NyaXB0IExvYWRlZGApKVxufVxuXG5leHBvcnQgY29uc3QgYmFja2dyb3VuZExvZyA9ICgpID0+IHtcbiAgY29uc29sZS5sb2cobG9nb1RleHQsIG1zZ1RleHQoJ0JhY2tncm91bmQgTG9hZGVkJykpXG59XG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgPT09ICdkZWZhdWx0JyB8fCBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fCBkZXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iLCJpbXBvcnQgdHlwZSB7IFByb21wdCB9IGZyb20gXCJ+aG9va3MvdXNlUHJvbXB0c1wiXG5pbXBvcnQgeyBnZXRTdG9yZWRQcm9tcHRzIH0gZnJvbSBcIn5saWIvZ2V0U3RvcmVkUHJvbXB0c1wiXG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgbmF0aXZlIGNvbnRleHQgbWVudSBmb3IgdGhlIHF1aWNrIG1lbnUuXG4gKiBUaGlzIHdpbGwgYWxsb3cgdXNlcnMgdG8gcmlnaHQgY2xpY2sgb24gYW55IHNlbGVjdGVkIHRleHQgYW5kIHNlZSB0aGUgcHJvbXB0XG4gKiBhY3Rpb25zIG9uIHRoZSB0ZXh0LlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kb2NzL2V4dGVuc2lvbnMvcmVmZXJlbmNlL2NvbnRleHRNZW51cy9cbiAqXG4gKiBJdCBwZXJmb3JtcyB0aGUgZm9sbG93aW5nIHN0ZXBzOlxuICogMS4gR2V0IHRoZSBwcm9tcHRzIGZyb20gc3RvcmFnZVxuICogMi4gQ3JlYXRlIHRoZSB0ZXh0IGFjdGlvbnMgYXQgc3RhcnRcbiAqIDMuIFJlbW92ZSBhbGwgdGhlIGV4aXN0aW5nIGNvbnRleHQgbWVudXNcbiAqIDQuIENyZWF0ZSB0aGUgbWVudSBmb3IgcmVzdCBvZiB0aGUgaXRlbXNcbiAqL1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ29udGV4dE1lbnUgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHByb21wdHMgPSBhd2FpdCBnZXRTdG9yZWRQcm9tcHRzKClcbiAgY29uc3QgY29udGV4dE1lbnVJdGVtczogY2hyb21lLmNvbnRleHRNZW51cy5DcmVhdGVQcm9wZXJ0aWVzW10gPSBbXVxuXG4gIC8vIENyZWF0ZSB0ZXh0IGFjdGlvbnMgY29udGV4dCBtZW51XG4gIGNvbnN0IGNyZWF0ZUNoaWxkQ29udGV4dE1lbnUgPSAocHJvbXB0czogUHJvbXB0W10sIHBhcmVudElkPzogc3RyaW5nKSA9PiB7XG4gICAgZm9yIChjb25zdCBwcm9tcHQgb2YgcHJvbXB0cykge1xuICAgICAgY29udGV4dE1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgaWQ6IHByb21wdC5pZCxcbiAgICAgICAgdGl0bGU6IHByb21wdC5uYW1lLFxuICAgICAgICBjb250ZXh0czogWydzZWxlY3Rpb24nXSxcbiAgICAgICAgcGFyZW50SWQsXG4gICAgICB9KVxuICAgICAgaWYgKHByb21wdC5jaGlsZHJlbikgY3JlYXRlQ2hpbGRDb250ZXh0TWVudShwcm9tcHQuY2hpbGRyZW4sIHByb21wdC5pZClcbiAgICB9XG4gIH1cbiAgY3JlYXRlQ2hpbGRDb250ZXh0TWVudShwcm9tcHRzKVxuXG4gIC8vIENyZWF0ZSBTZXR0aW5ncyBjb250ZXh0IG1lbnVcbiAgY29udGV4dE1lbnVJdGVtcy5wdXNoKFxuICAgIHtcbiAgICAgIGlkOiAnc2VwYXJhdG9yJyxcbiAgICAgIHR5cGU6ICdzZXBhcmF0b3InLFxuICAgICAgY29udGV4dHM6IFsnc2VsZWN0aW9uJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ3NldHRpbmdzJyxcbiAgICAgIHRpdGxlOiAnU2V0dGluZ3MnLFxuICAgICAgY29udGV4dHM6IFsnc2VsZWN0aW9uJ10sXG4gICAgfSxcbiAgKVxuXG4gIC8vIEJlZm9yZSBjcmVhdGluZyB0aGUgY29udGV4dCBtZW51LCByZW1vdmUgYWxsIHRoZSBleGlzdGluZyBjb250ZXh0IG1lbnVzXG4gIGNocm9tZS5jb250ZXh0TWVudXMucmVtb3ZlQWxsKClcblxuICAvLyBDcmVhdGUgY29udGV4dCBtZW51XG4gIGZvciAoY29uc3QgaXRlbSBvZiBjb250ZXh0TWVudUl0ZW1zKSB7XG4gICAgY2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoaXRlbSlcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGNvbnRleHQgbWVudSBvbiBzdG9yYWdlIGNoYW5nZS5cbiAqIFRoaXMgd2lsbCBhbGxvdyB1c2VycyB0byBzZWUgdGhlIGNoYW5nZXMgaW4gdGhlIGNvbnRleHQgbWVudSB3aGVuIHVzZXJcbiAqIGNoYW5nZSB0aGUgcHJvbXB0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnRleHRNZW51T25TdG9yYWdlQ2hhbmdlID0gKCkgPT4ge1xuICBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCfwn5OdIFN0b3JhZ2UgY2hhbmdlZCcpXG4gICAgY3JlYXRlQ29udGV4dE1lbnUoKVxuICB9KVxufVxuIiwiaW1wb3J0IHsgdHlwZSBQcm9tcHQgfSBmcm9tICcuLi9ob29rcy91c2VQcm9tcHRzJ1xuaW1wb3J0IHsgZGVmYXVsdFByb21wdHMgfSBmcm9tICcuLi9jb25maWcvcHJvbXB0cy9kZWZhdWx0J1xuXG5leHBvcnQgY29uc3QgZ2V0U3RvcmVkUHJvbXB0cyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc3RvcmVkUHJvbXB0cyA9IGF3YWl0IGdldFN0b3JlZExvY2FsUHJvbXB0cygpXG4gIGlmICghc3RvcmVkUHJvbXB0cykge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IFBST01QVFM6IGRlZmF1bHRQcm9tcHRzIH0sICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCfihLnvuI8gRGVmYXVsdCBwcm9tcHRzIHN0b3JlZCBmcm9tIGdldFN0b3JlZFByb21wdHMudHMnKVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHN0b3JlZFByb21wdHMgPz8gZGVmYXVsdFByb21wdHNcbn1cblxuY29uc3QgZ2V0U3RvcmVkTG9jYWxQcm9tcHRzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzdG9yZWRMb2NhbFByb21wdHMgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnUFJPTVBUUycsIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJlc29sdmUocmVzdWx0LlBST01QVFMpXG4gICAgfSlcbiAgfSlcbiAgcmV0dXJuIHN0b3JlZExvY2FsUHJvbXB0cyBhcyBQcm9tcHRbXSB8IG51bGxcbn1cbiIsImltcG9ydCBlbmRlbnQgZnJvbSAnZW5kZW50J1xuaW1wb3J0IGhhc2ggZnJvbSAnb2JqZWN0LWhhc2gnXG5pbXBvcnQgdHlwZSB7IFByb21wdCB9IGZyb20gJ35ob29rcy91c2VQcm9tcHRzJ1xuXG50eXBlIFByb21wdFdpdGhvdXRJZCA9IE9taXQ8UHJvbXB0LCAnaWQnIHwgJ2NoaWxkcmVuJz4gJiB7XG4gIGNoaWxkcmVuPzogUHJvbXB0V2l0aG91dElkW11cbn1cblxuY29uc3QgcHJvbXB0czogUHJvbXB0V2l0aG91dElkW10gPSBbXG4gIHtcbiAgICBuYW1lOiAnUmV2aWV3IFNlbGVjdGlvbicsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N1bW1hcml6ZScsXG4gICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBzdW1tYXJpemUgaXQgaW4gbGVzcyB0aGFuIGhhbGYgdGhlIG9yaWdpbmFsIGxlbmd0aC5cbiAgICAgICAgYCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdrZXkgdGFrZWF3YXlzJyxcbiAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIGlkZW50aWZ5IHRoZSBrZXkgdGFrZWF3YXlzIGluIGxpc3QgZm9ybWF0LlxuICAgICAgICBgLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1F1ZXN0aW9ucycsXG4gICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBpZGVudGlmeSB0aGUga2V5IHF1ZXN0aW9ucyB0aGF0IGl0IHJhaXNlcy5cbiAgICAgICAgYCxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdFZGl0IFNlbGVjdGlvbicsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0ZpeCBHcmFtbWFyIGFuZCBTcGVsbGluZycsXG4gICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBmaXggYW55IGdyYW1tYXIgYW5kIHNwZWxsaW5nIG1pc3Rha2VzLlxuICAgICAgICBgLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0NoYW5nZSBUb25lJyxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnRm9ybWFsJyxcbiAgICAgICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgICAgICBSZWFkIHRoZSBmb2xsb3dpbmcgdGV4dCBhbmQgbWFrZSBpdCBtb3JlIGZvcm1hbC5cbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnSW5mb3JtYWwnLFxuICAgICAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBtYWtlIGl0IG1vcmUgaW5mb3JtYWwuXG4gICAgICAgICAgICBgLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ05ldXRyYWwnLFxuICAgICAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBtYWtlIGl0IG1vcmUgbmV1dHJhbC5cbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnU3Ryb25nJyxcbiAgICAgICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgICAgICBSZWFkIHRoZSBmb2xsb3dpbmcgdGV4dCBhbmQgbWFrZSBpdCBtb3JlIHN0cm9uZyBhbmQgYXNzZXJ0aXZlLlxuICAgICAgICAgICAgYCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0NoYW5nZSBMZW5ndGgnLFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdTaG9ydGVyJyxcbiAgICAgICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgICAgICBSZWFkIHRoZSBmb2xsb3dpbmcgdGV4dCBhbmQgbWFrZSBpdCBzaG9ydGVyLlxuICAgICAgICAgICAgYCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdMb25nZXInLFxuICAgICAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBtYWtlIGl0IGxvbmdlci5cbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdDaGFuZ2UgU3RydWN0dXJlJyxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQWRkIERldGFpbHMnLFxuICAgICAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBhZGQgZGV0YWlscyB0byBtYWtlIGl0IG1vcmUgaW5mb3JtYXRpdmUuXG4gICAgICAgICAgICBgLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FkZCBFeGFtcGxlcycsXG4gICAgICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIGFkZCBleGFtcGxlcyB0byBtYWtlIGl0IG1vcmUgaW5mb3JtYXRpdmUuXG4gICAgICAgICAgICBgLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0FkZCBFbXBoYXNpcycsXG4gICAgICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIGFkZCBlbXBoYXNpcyB0byBtYWtlIGl0IG1vcmUgaW1wYWN0ZnVsLlxuICAgICAgICAgICAgYCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ1JlcGx5JyxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnUG9zaXRpdmUnLFxuICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICBSZWFkIHRoZSBmb2xsb3dpbmcgdGV4dCBhbmQgcmVwbHkgdG8gaXQgaW4gYSBwb3NpdGl2ZSB3YXkuXG4gICAgICAgIGAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnTmVnYXRpdmUnLFxuICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICBSZWFkIHRoZSBmb2xsb3dpbmcgdGV4dCBhbmQgcmVwbHkgdG8gaXQgaW4gYSBuZWdhdGl2ZSB3YXkuXG4gICAgICAgIGAsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5dXG5cbmNvbnN0IHJlY3Vyc2l2ZUFkZElkID0gKFxuICBwcm9tcHRzOiBQcm9tcHRXaXRob3V0SWRbXSxcbiAgX3BhcmVudElkOiBzdHJpbmcgPSAnJyxcbik6IFByb21wdFtdID0+IHtcbiAgcmV0dXJuIHByb21wdHMubWFwKChwcm9tcHQpID0+IHtcbiAgICBjb25zdCBpZCA9IGhhc2gocHJvbXB0KVxuICAgIHJldHVybiB7XG4gICAgICBpZCxcbiAgICAgIC4uLnByb21wdCxcbiAgICAgIGNoaWxkcmVuOiBwcm9tcHQuY2hpbGRyZW5cbiAgICAgICAgPyByZWN1cnNpdmVBZGRJZChwcm9tcHQuY2hpbGRyZW4sIGlkKVxuICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICB9XG4gIH0pIGFzIFByb21wdFtdXG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UHJvbXB0cyA9IHJlY3Vyc2l2ZUFkZElkKHByb21wdHMpXG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRlZGVudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkZWRlbnRcIikpO1xuY29uc3Qgb2JqZWN0b3JhcnJheV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJvYmplY3RvcmFycmF5XCIpKTtcbmNvbnN0IGZhc3RfanNvbl9wYXJzZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJmYXN0LWpzb24tcGFyc2VcIikpO1xuY29uc3QgRU5ERU5UX0lEID0gXCJ0d2haTnd4STFhRkczcjRcIjtcbmZ1bmN0aW9uIGVuZGVudChzdHJpbmdzLCAuLi52YWx1ZXMpIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IHN0cmluZ3NbaV07XG4gICAgICAgIGlmIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgICAgICAgbGV0IGlzSnNvbiA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGZhc3RfanNvbl9wYXJzZV8xLmRlZmF1bHQodmFsdWUpLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBmYXN0X2pzb25fcGFyc2VfMS5kZWZhdWx0KHZhbHVlKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBpc0pzb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh2YWx1ZSAmJiB2YWx1ZVtFTkRFTlRfSURdKSB8fCBpc0pzb24pIHtcbiAgICAgICAgICAgICAgICBsZXQgcmF3bGluZXMgPSByZXN1bHQuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgbGV0IGwgPSByYXdsaW5lc1tyYXdsaW5lcy5sZW5ndGggLSAxXS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgICAgIGxldCBlbmRlbnRhdGlvbiA9IGwgPiAwID8gXCIgXCIucmVwZWF0KGwpIDogXCJcIjtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVKc29uID0gaXNKc29uXG4gICAgICAgICAgICAgICAgICAgID8gSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpXG4gICAgICAgICAgICAgICAgICAgIDogdmFsdWVbRU5ERU5UX0lEXTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVMaW5lcyA9IHZhbHVlSnNvbi5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgICAgICB2YWx1ZUxpbmVzLmZvckVhY2goKGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcblwiICsgZW5kZW50YXRpb24gKyBsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICAgIGxldCBlbmRlbnRhdGlvbnMgPSByZXN1bHQubWF0Y2goLyg/Ol58XFxuKSggKikkLyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kZW50YXRpb24gPSBlbmRlbnRhdGlvbnMgPyBlbmRlbnRhdGlvbnNbMV0gOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdChcIlxcblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoc3RyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBFTkRFTlRfSUQgKyBzdHI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSA9PT0gMCA/IHN0ciA6IGAke2VuZGVudGF0aW9ufSR7c3RyfWA7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ID0gZGVkZW50XzEuZGVmYXVsdChyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQuc3BsaXQoRU5ERU5UX0lEKS5qb2luKFwiXCIpO1xufVxuZW5kZW50LnByZXR0eSA9IChkYXRhKSA9PiB7XG4gICAgcmV0dXJuIG9iamVjdG9yYXJyYXlfMS5kZWZhdWx0KGRhdGEpXG4gICAgICAgID8geyBbRU5ERU5UX0lEXTogSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikgfVxuICAgICAgICA6IGRhdGE7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZW5kZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIGRlZGVudChzdHJpbmdzKSB7XG5cbiAgdmFyIHJhdyA9IHZvaWQgMDtcbiAgaWYgKHR5cGVvZiBzdHJpbmdzID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gZGVkZW50IGNhbiBiZSB1c2VkIGFzIGEgcGxhaW4gZnVuY3Rpb25cbiAgICByYXcgPSBbc3RyaW5nc107XG4gIH0gZWxzZSB7XG4gICAgcmF3ID0gc3RyaW5ncy5yYXc7XG4gIH1cblxuICAvLyBmaXJzdCwgcGVyZm9ybSBpbnRlcnBvbGF0aW9uXG4gIHZhciByZXN1bHQgPSBcIlwiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhdy5sZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdCArPSByYXdbaV0uXG4gICAgLy8gam9pbiBsaW5lcyB3aGVuIHRoZXJlIGlzIGEgc3VwcHJlc3NlZCBuZXdsaW5lXG4gICAgcmVwbGFjZSgvXFxcXFxcblsgXFx0XSovZywgXCJcIikuXG5cbiAgICAvLyBoYW5kbGUgZXNjYXBlZCBiYWNrdGlja3NcbiAgICByZXBsYWNlKC9cXFxcYC9nLCBcImBcIik7XG5cbiAgICBpZiAoaSA8IChhcmd1bWVudHMubGVuZ3RoIDw9IDEgPyAwIDogYXJndW1lbnRzLmxlbmd0aCAtIDEpKSB7XG4gICAgICByZXN1bHQgKz0gYXJndW1lbnRzLmxlbmd0aCA8PSBpICsgMSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1tpICsgMV07XG4gICAgfVxuICB9XG5cbiAgLy8gbm93IHN0cmlwIGluZGVudGF0aW9uXG4gIHZhciBsaW5lcyA9IHJlc3VsdC5zcGxpdChcIlxcblwiKTtcbiAgdmFyIG1pbmRlbnQgPSBudWxsO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7XG4gICAgdmFyIG0gPSBsLm1hdGNoKC9eKFxccyspXFxTKy8pO1xuICAgIGlmIChtKSB7XG4gICAgICB2YXIgaW5kZW50ID0gbVsxXS5sZW5ndGg7XG4gICAgICBpZiAoIW1pbmRlbnQpIHtcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgZmlyc3QgaW5kZW50ZWQgbGluZVxuICAgICAgICBtaW5kZW50ID0gaW5kZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWluZGVudCA9IE1hdGgubWluKG1pbmRlbnQsIGluZGVudCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpZiAobWluZGVudCAhPT0gbnVsbCkge1xuICAgIHJlc3VsdCA9IGxpbmVzLm1hcChmdW5jdGlvbiAobCkge1xuICAgICAgcmV0dXJuIGxbMF0gPT09IFwiIFwiID8gbC5zbGljZShtaW5kZW50KSA6IGw7XG4gICAgfSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIC8vIGRlZGVudCBlYXRzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UgdG9vXG4gIHJlc3VsdCA9IHJlc3VsdC50cmltKCk7XG5cbiAgLy8gaGFuZGxlIGVzY2FwZWQgbmV3bGluZXMgYXQgdGhlIGVuZCB0byBlbnN1cmUgdGhleSBkb24ndCBnZXQgc3RyaXBwZWQgdG9vXG4gIHJldHVybiByZXN1bHQucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIik7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZGVkZW50O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAodmFsKSA9PiB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgIT09IFJlZ0V4cFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIFBhcnNlIChkYXRhKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXJzZSkpIHtcbiAgICByZXR1cm4gbmV3IFBhcnNlKGRhdGEpXG4gIH1cbiAgdGhpcy5lcnIgPSBudWxsXG4gIHRoaXMudmFsdWUgPSBudWxsXG4gIHRyeSB7XG4gICAgdGhpcy52YWx1ZSA9IEpTT04ucGFyc2UoZGF0YSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhpcy5lcnIgPSBlcnJcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnNlXG4iLCIhZnVuY3Rpb24oZSl7dmFyIHQ7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/dD13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD90PWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKHQ9c2VsZiksdC5vYmplY3RIYXNoPWUoKSl9KGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uIHIobyxpLHUpe2Z1bmN0aW9uIHMobixlKXtpZighaVtuXSl7aWYoIW9bbl0pe3ZhciB0PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWUmJnQpcmV0dXJuIHQobiwhMCk7aWYoYSlyZXR1cm4gYShuLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK24rXCInXCIpfWU9aVtuXT17ZXhwb3J0czp7fX07b1tuXVswXS5jYWxsKGUuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgdD1vW25dWzFdW2VdO3JldHVybiBzKHR8fGUpfSxlLGUuZXhwb3J0cyxyLG8saSx1KX1yZXR1cm4gaVtuXS5leHBvcnRzfWZvcih2YXIgYT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGU9MDtlPHUubGVuZ3RoO2UrKylzKHVbZV0pO3JldHVybiBzfSh7MTpbZnVuY3Rpb24odyxiLG0peyFmdW5jdGlvbihlLG4scyxjLGQsaCxwLGcseSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9dyhcImNyeXB0b1wiKTtmdW5jdGlvbiB0KGUsdCl7dD11KGUsdCk7dmFyIG47cmV0dXJuIHZvaWQgMD09PShuPVwicGFzc3Rocm91Z2hcIiE9PXQuYWxnb3JpdGhtP3IuY3JlYXRlSGFzaCh0LmFsZ29yaXRobSk6bmV3IGwpLndyaXRlJiYobi53cml0ZT1uLnVwZGF0ZSxuLmVuZD1uLnVwZGF0ZSksZih0LG4pLmRpc3BhdGNoKGUpLG4udXBkYXRlfHxuLmVuZChcIlwiKSxuLmRpZ2VzdD9uLmRpZ2VzdChcImJ1ZmZlclwiPT09dC5lbmNvZGluZz92b2lkIDA6dC5lbmNvZGluZyk6KGU9bi5yZWFkKCksXCJidWZmZXJcIiE9PXQuZW5jb2Rpbmc/ZS50b1N0cmluZyh0LmVuY29kaW5nKTplKX0obT1iLmV4cG9ydHM9dCkuc2hhMT1mdW5jdGlvbihlKXtyZXR1cm4gdChlKX0sbS5rZXlzPWZ1bmN0aW9uKGUpe3JldHVybiB0KGUse2V4Y2x1ZGVWYWx1ZXM6ITAsYWxnb3JpdGhtOlwic2hhMVwiLGVuY29kaW5nOlwiaGV4XCJ9KX0sbS5NRDU9ZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSx7YWxnb3JpdGhtOlwibWQ1XCIsZW5jb2Rpbmc6XCJoZXhcIn0pfSxtLmtleXNNRDU9ZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSx7YWxnb3JpdGhtOlwibWQ1XCIsZW5jb2Rpbmc6XCJoZXhcIixleGNsdWRlVmFsdWVzOiEwfSl9O3ZhciBvPXIuZ2V0SGFzaGVzP3IuZ2V0SGFzaGVzKCkuc2xpY2UoKTpbXCJzaGExXCIsXCJtZDVcIl0saT0oby5wdXNoKFwicGFzc3Rocm91Z2hcIiksW1wiYnVmZmVyXCIsXCJoZXhcIixcImJpbmFyeVwiLFwiYmFzZTY0XCJdKTtmdW5jdGlvbiB1KGUsdCl7dmFyIG49e307aWYobi5hbGdvcml0aG09KHQ9dHx8e30pLmFsZ29yaXRobXx8XCJzaGExXCIsbi5lbmNvZGluZz10LmVuY29kaW5nfHxcImhleFwiLG4uZXhjbHVkZVZhbHVlcz0hIXQuZXhjbHVkZVZhbHVlcyxuLmFsZ29yaXRobT1uLmFsZ29yaXRobS50b0xvd2VyQ2FzZSgpLG4uZW5jb2Rpbmc9bi5lbmNvZGluZy50b0xvd2VyQ2FzZSgpLG4uaWdub3JlVW5rbm93bj0hMD09PXQuaWdub3JlVW5rbm93bixuLnJlc3BlY3RUeXBlPSExIT09dC5yZXNwZWN0VHlwZSxuLnJlc3BlY3RGdW5jdGlvbk5hbWVzPSExIT09dC5yZXNwZWN0RnVuY3Rpb25OYW1lcyxuLnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXM9ITEhPT10LnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXMsbi51bm9yZGVyZWRBcnJheXM9ITA9PT10LnVub3JkZXJlZEFycmF5cyxuLnVub3JkZXJlZFNldHM9ITEhPT10LnVub3JkZXJlZFNldHMsbi51bm9yZGVyZWRPYmplY3RzPSExIT09dC51bm9yZGVyZWRPYmplY3RzLG4ucmVwbGFjZXI9dC5yZXBsYWNlcnx8dm9pZCAwLG4uZXhjbHVkZUtleXM9dC5leGNsdWRlS2V5c3x8dm9pZCAwLHZvaWQgMD09PWUpdGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IGFyZ3VtZW50IHJlcXVpcmVkLlwiKTtmb3IodmFyIHI9MDtyPG8ubGVuZ3RoOysrcilvW3JdLnRvTG93ZXJDYXNlKCk9PT1uLmFsZ29yaXRobS50b0xvd2VyQ2FzZSgpJiYobi5hbGdvcml0aG09b1tyXSk7aWYoLTE9PT1vLmluZGV4T2Yobi5hbGdvcml0aG0pKXRocm93IG5ldyBFcnJvcignQWxnb3JpdGhtIFwiJytuLmFsZ29yaXRobSsnXCIgIG5vdCBzdXBwb3J0ZWQuIHN1cHBvcnRlZCB2YWx1ZXM6ICcrby5qb2luKFwiLCBcIikpO2lmKC0xPT09aS5pbmRleE9mKG4uZW5jb2RpbmcpJiZcInBhc3N0aHJvdWdoXCIhPT1uLmFsZ29yaXRobSl0aHJvdyBuZXcgRXJyb3IoJ0VuY29kaW5nIFwiJytuLmVuY29kaW5nKydcIiAgbm90IHN1cHBvcnRlZC4gc3VwcG9ydGVkIHZhbHVlczogJytpLmpvaW4oXCIsIFwiKSk7cmV0dXJuIG59ZnVuY3Rpb24gYShlKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlKXJldHVybiBudWxsIT0vXmZ1bmN0aW9uXFxzK1xcdypcXHMqXFwoXFxzKlxcKVxccyp7XFxzK1xcW25hdGl2ZSBjb2RlXFxdXFxzK30kL2kuZXhlYyhGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSl9ZnVuY3Rpb24gZihvLHQsaSl7aT1pfHxbXTtmdW5jdGlvbiB1KGUpe3JldHVybiB0LnVwZGF0ZT90LnVwZGF0ZShlLFwidXRmOFwiKTp0LndyaXRlKGUsXCJ1dGY4XCIpfXJldHVybntkaXNwYXRjaDpmdW5jdGlvbihlKXtyZXR1cm4gdGhpc1tcIl9cIisobnVsbD09PShlPW8ucmVwbGFjZXI/by5yZXBsYWNlcihlKTplKT9cIm51bGxcIjp0eXBlb2YgZSldKGUpfSxfb2JqZWN0OmZ1bmN0aW9uKHQpe3ZhciBuLGU9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpLHI9L1xcW29iamVjdCAoLiopXFxdL2kuZXhlYyhlKTtyPShyPXI/clsxXTpcInVua25vd246W1wiK2UrXCJdXCIpLnRvTG93ZXJDYXNlKCk7aWYoMDw9KGU9aS5pbmRleE9mKHQpKSlyZXR1cm4gdGhpcy5kaXNwYXRjaChcIltDSVJDVUxBUjpcIitlK1wiXVwiKTtpZihpLnB1c2godCksdm9pZCAwIT09cyYmcy5pc0J1ZmZlciYmcy5pc0J1ZmZlcih0KSlyZXR1cm4gdShcImJ1ZmZlcjpcIiksdSh0KTtpZihcIm9iamVjdFwiPT09cnx8XCJmdW5jdGlvblwiPT09cnx8XCJhc3luY2Z1bmN0aW9uXCI9PT1yKXJldHVybiBlPU9iamVjdC5rZXlzKHQpLG8udW5vcmRlcmVkT2JqZWN0cyYmKGU9ZS5zb3J0KCkpLCExPT09by5yZXNwZWN0VHlwZXx8YSh0KXx8ZS5zcGxpY2UoMCwwLFwicHJvdG90eXBlXCIsXCJfX3Byb3RvX19cIixcImNvbnN0cnVjdG9yXCIpLG8uZXhjbHVkZUtleXMmJihlPWUuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiFvLmV4Y2x1ZGVLZXlzKGUpfSkpLHUoXCJvYmplY3Q6XCIrZS5sZW5ndGgrXCI6XCIpLG49dGhpcyxlLmZvckVhY2goZnVuY3Rpb24oZSl7bi5kaXNwYXRjaChlKSx1KFwiOlwiKSxvLmV4Y2x1ZGVWYWx1ZXN8fG4uZGlzcGF0Y2godFtlXSksdShcIixcIil9KTtpZighdGhpc1tcIl9cIityXSl7aWYoby5pZ25vcmVVbmtub3duKXJldHVybiB1KFwiW1wiK3IrXCJdXCIpO3Rocm93IG5ldyBFcnJvcignVW5rbm93biBvYmplY3QgdHlwZSBcIicrcisnXCInKX10aGlzW1wiX1wiK3JdKHQpfSxfYXJyYXk6ZnVuY3Rpb24oZSx0KXt0PXZvaWQgMCE9PXQ/dDohMSE9PW8udW5vcmRlcmVkQXJyYXlzO3ZhciBuPXRoaXM7aWYodShcImFycmF5OlwiK2UubGVuZ3RoK1wiOlwiKSwhdHx8ZS5sZW5ndGg8PTEpcmV0dXJuIGUuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gbi5kaXNwYXRjaChlKX0pO3ZhciByPVtdLHQ9ZS5tYXAoZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IGwsbj1pLnNsaWNlKCk7cmV0dXJuIGYobyx0LG4pLmRpc3BhdGNoKGUpLHI9ci5jb25jYXQobi5zbGljZShpLmxlbmd0aCkpLHQucmVhZCgpLnRvU3RyaW5nKCl9KTtyZXR1cm4gaT1pLmNvbmNhdChyKSx0LnNvcnQoKSx0aGlzLl9hcnJheSh0LCExKX0sX2RhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJkYXRlOlwiK2UudG9KU09OKCkpfSxfc3ltYm9sOmZ1bmN0aW9uKGUpe3JldHVybiB1KFwic3ltYm9sOlwiK2UudG9TdHJpbmcoKSl9LF9lcnJvcjpmdW5jdGlvbihlKXtyZXR1cm4gdShcImVycm9yOlwiK2UudG9TdHJpbmcoKSl9LF9ib29sZWFuOmZ1bmN0aW9uKGUpe3JldHVybiB1KFwiYm9vbDpcIitlLnRvU3RyaW5nKCkpfSxfc3RyaW5nOmZ1bmN0aW9uKGUpe3UoXCJzdHJpbmc6XCIrZS5sZW5ndGgrXCI6XCIpLHUoZS50b1N0cmluZygpKX0sX2Z1bmN0aW9uOmZ1bmN0aW9uKGUpe3UoXCJmbjpcIiksYShlKT90aGlzLmRpc3BhdGNoKFwiW25hdGl2ZV1cIik6dGhpcy5kaXNwYXRjaChlLnRvU3RyaW5nKCkpLCExIT09by5yZXNwZWN0RnVuY3Rpb25OYW1lcyYmdGhpcy5kaXNwYXRjaChcImZ1bmN0aW9uLW5hbWU6XCIrU3RyaW5nKGUubmFtZSkpLG8ucmVzcGVjdEZ1bmN0aW9uUHJvcGVydGllcyYmdGhpcy5fb2JqZWN0KGUpfSxfbnVtYmVyOmZ1bmN0aW9uKGUpe3JldHVybiB1KFwibnVtYmVyOlwiK2UudG9TdHJpbmcoKSl9LF94bWw6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJ4bWw6XCIrZS50b1N0cmluZygpKX0sX251bGw6ZnVuY3Rpb24oKXtyZXR1cm4gdShcIk51bGxcIil9LF91bmRlZmluZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdShcIlVuZGVmaW5lZFwiKX0sX3JlZ2V4cDpmdW5jdGlvbihlKXtyZXR1cm4gdShcInJlZ2V4OlwiK2UudG9TdHJpbmcoKSl9LF91aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiB1KFwidWludDhhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF91aW50OGNsYW1wZWRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gdShcInVpbnQ4Y2xhbXBlZGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2ludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gdShcImludDhhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF91aW50MTZhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gdShcInVpbnQxNmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2ludDE2YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJpbnQxNmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX3VpbnQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiB1KFwidWludDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfaW50MzJhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gdShcImludDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfZmxvYXQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiB1KFwiZmxvYXQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2Zsb2F0NjRhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gdShcImZsb2F0NjRhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9hcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gdShcImFycmF5YnVmZmVyOlwiKSx0aGlzLmRpc3BhdGNoKG5ldyBVaW50OEFycmF5KGUpKX0sX3VybDpmdW5jdGlvbihlKXtyZXR1cm4gdShcInVybDpcIitlLnRvU3RyaW5nKCkpfSxfbWFwOmZ1bmN0aW9uKGUpe3UoXCJtYXA6XCIpO2U9QXJyYXkuZnJvbShlKTtyZXR1cm4gdGhpcy5fYXJyYXkoZSwhMSE9PW8udW5vcmRlcmVkU2V0cyl9LF9zZXQ6ZnVuY3Rpb24oZSl7dShcInNldDpcIik7ZT1BcnJheS5mcm9tKGUpO3JldHVybiB0aGlzLl9hcnJheShlLCExIT09by51bm9yZGVyZWRTZXRzKX0sX2ZpbGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJmaWxlOlwiKSx0aGlzLmRpc3BhdGNoKFtlLm5hbWUsZS5zaXplLGUudHlwZSxlLmxhc3RNb2RmaWVkXSl9LF9ibG9iOmZ1bmN0aW9uKCl7aWYoby5pZ25vcmVVbmtub3duKXJldHVybiB1KFwiW2Jsb2JdXCIpO3Rocm93IEVycm9yKCdIYXNoaW5nIEJsb2Igb2JqZWN0cyBpcyBjdXJyZW50bHkgbm90IHN1cHBvcnRlZFxcbihzZWUgaHR0cHM6Ly9naXRodWIuY29tL3B1bGVvcy9vYmplY3QtaGFzaC9pc3N1ZXMvMjYpXFxuVXNlIFwib3B0aW9ucy5yZXBsYWNlclwiIG9yIFwib3B0aW9ucy5pZ25vcmVVbmtub3duXCJcXG4nKX0sX2RvbXdpbmRvdzpmdW5jdGlvbigpe3JldHVybiB1KFwiZG9td2luZG93XCIpfSxfYmlnaW50OmZ1bmN0aW9uKGUpe3JldHVybiB1KFwiYmlnaW50OlwiK2UudG9TdHJpbmcoKSl9LF9wcm9jZXNzOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJwcm9jZXNzXCIpfSxfdGltZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdShcInRpbWVyXCIpfSxfcGlwZTpmdW5jdGlvbigpe3JldHVybiB1KFwicGlwZVwiKX0sX3RjcDpmdW5jdGlvbigpe3JldHVybiB1KFwidGNwXCIpfSxfdWRwOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJ1ZHBcIil9LF90dHk6ZnVuY3Rpb24oKXtyZXR1cm4gdShcInR0eVwiKX0sX3N0YXR3YXRjaGVyOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJzdGF0d2F0Y2hlclwiKX0sX3NlY3VyZWNvbnRleHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdShcInNlY3VyZWNvbnRleHRcIil9LF9jb25uZWN0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJjb25uZWN0aW9uXCIpfSxfemxpYjpmdW5jdGlvbigpe3JldHVybiB1KFwiemxpYlwiKX0sX2NvbnRleHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdShcImNvbnRleHRcIil9LF9ub2Rlc2NyaXB0OmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJub2Rlc2NyaXB0XCIpfSxfaHR0cHBhcnNlcjpmdW5jdGlvbigpe3JldHVybiB1KFwiaHR0cHBhcnNlclwiKX0sX2RhdGF2aWV3OmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJkYXRhdmlld1wiKX0sX3NpZ25hbDpmdW5jdGlvbigpe3JldHVybiB1KFwic2lnbmFsXCIpfSxfZnNldmVudDpmdW5jdGlvbigpe3JldHVybiB1KFwiZnNldmVudFwiKX0sX3Rsc3dyYXA6ZnVuY3Rpb24oKXtyZXR1cm4gdShcInRsc3dyYXBcIil9fX1mdW5jdGlvbiBsKCl7cmV0dXJue2J1ZjpcIlwiLHdyaXRlOmZ1bmN0aW9uKGUpe3RoaXMuYnVmKz1lfSxlbmQ6ZnVuY3Rpb24oZSl7dGhpcy5idWYrPWV9LHJlYWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5idWZ9fX1tLndyaXRlVG9TdHJlYW09ZnVuY3Rpb24oZSx0LG4pe3JldHVybiB2b2lkIDA9PT1uJiYobj10LHQ9e30pLGYodD11KGUsdCksbikuZGlzcGF0Y2goZSl9fS5jYWxsKHRoaXMsdyhcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LHcoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlXzlhNWFhNDlkLmpzXCIsXCIvXCIpfSx7YnVmZmVyOjMsY3J5cHRvOjUsbFlwb0kyOjExfV0sMjpbZnVuY3Rpb24oZSx0LGYpeyFmdW5jdGlvbihlLHQsbixyLG8saSx1LHMsYSl7IWZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO3ZhciBhPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5P1VpbnQ4QXJyYXk6QXJyYXksdD1cIitcIi5jaGFyQ29kZUF0KDApLG49XCIvXCIuY2hhckNvZGVBdCgwKSxyPVwiMFwiLmNoYXJDb2RlQXQoMCksbz1cImFcIi5jaGFyQ29kZUF0KDApLGk9XCJBXCIuY2hhckNvZGVBdCgwKSx1PVwiLVwiLmNoYXJDb2RlQXQoMCkscz1cIl9cIi5jaGFyQ29kZUF0KDApO2Z1bmN0aW9uIGYoZSl7ZT1lLmNoYXJDb2RlQXQoMCk7cmV0dXJuIGU9PT10fHxlPT09dT82MjplPT09bnx8ZT09PXM/NjM6ZTxyPy0xOmU8cisxMD9lLXIrMjYrMjY6ZTxpKzI2P2UtaTplPG8rMjY/ZS1vKzI2OnZvaWQgMH1lLnRvQnl0ZUFycmF5PWZ1bmN0aW9uKGUpe3ZhciB0LG47aWYoMDxlLmxlbmd0aCU0KXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDRcIik7dmFyIHI9ZS5sZW5ndGgscj1cIj1cIj09PWUuY2hhckF0KHItMik/MjpcIj1cIj09PWUuY2hhckF0KHItMSk/MTowLG89bmV3IGEoMyplLmxlbmd0aC80LXIpLGk9MDxyP2UubGVuZ3RoLTQ6ZS5sZW5ndGgsdT0wO2Z1bmN0aW9uIHMoZSl7b1t1KytdPWV9Zm9yKHQ9MDt0PGk7dCs9NCwwKXMoKDE2NzExNjgwJihuPWYoZS5jaGFyQXQodCkpPDwxOHxmKGUuY2hhckF0KHQrMSkpPDwxMnxmKGUuY2hhckF0KHQrMikpPDw2fGYoZS5jaGFyQXQodCszKSkpKT4+MTYpLHMoKDY1MjgwJm4pPj44KSxzKDI1NSZuKTtyZXR1cm4gMj09cj9zKDI1NSYobj1mKGUuY2hhckF0KHQpKTw8MnxmKGUuY2hhckF0KHQrMSkpPj40KSk6MT09ciYmKHMoKG49ZihlLmNoYXJBdCh0KSk8PDEwfGYoZS5jaGFyQXQodCsxKSk8PDR8ZihlLmNoYXJBdCh0KzIpKT4+Mik+PjgmMjU1KSxzKDI1NSZuKSksb30sZS5mcm9tQnl0ZUFycmF5PWZ1bmN0aW9uKGUpe3ZhciB0LG4scixvLGk9ZS5sZW5ndGglMyx1PVwiXCI7ZnVuY3Rpb24gcyhlKXtyZXR1cm5cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIi5jaGFyQXQoZSl9Zm9yKHQ9MCxyPWUubGVuZ3RoLWk7dDxyO3QrPTMpbj0oZVt0XTw8MTYpKyhlW3QrMV08PDgpK2VbdCsyXSx1Kz1zKChvPW4pPj4xOCY2MykrcyhvPj4xMiY2MykrcyhvPj42JjYzKStzKDYzJm8pO3N3aXRjaChpKXtjYXNlIDE6dT0odSs9cygobj1lW2UubGVuZ3RoLTFdKT4+MikpK3Mobjw8NCY2MykrXCI9PVwiO2JyZWFrO2Nhc2UgMjp1PSh1PSh1Kz1zKChuPShlW2UubGVuZ3RoLTJdPDw4KStlW2UubGVuZ3RoLTFdKT4+MTApKStzKG4+PjQmNjMpKStzKG48PDImNjMpK1wiPVwifXJldHVybiB1fX0odm9pZCAwPT09Zj90aGlzLmJhc2U2NGpzPXt9OmYpfS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWJcIil9LHtidWZmZXI6MyxsWXBvSTI6MTF9XSwzOltmdW5jdGlvbihPLGUsSCl7IWZ1bmN0aW9uKGUsbixmLHIsaCxwLGcseSx3KXt2YXIgYT1PKFwiYmFzZTY0LWpzXCIpLGk9TyhcImllZWU3NTRcIik7ZnVuY3Rpb24gZihlLHQsbil7aWYoISh0aGlzIGluc3RhbmNlb2YgZikpcmV0dXJuIG5ldyBmKGUsdCxuKTt2YXIgcixvLGksdSxzPXR5cGVvZiBlO2lmKFwiYmFzZTY0XCI9PT10JiZcInN0cmluZ1wiPT1zKWZvcihlPSh1PWUpLnRyaW0/dS50cmltKCk6dS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLFwiXCIpO2UubGVuZ3RoJTQhPTA7KWUrPVwiPVwiO2lmKFwibnVtYmVyXCI9PXMpcj1qKGUpO2Vsc2UgaWYoXCJzdHJpbmdcIj09cylyPWYuYnl0ZUxlbmd0aChlLHQpO2Vsc2V7aWYoXCJvYmplY3RcIiE9cyl0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLlwiKTtyPWooZS5sZW5ndGgpfWlmKGYuX3VzZVR5cGVkQXJyYXlzP289Zi5fYXVnbWVudChuZXcgVWludDhBcnJheShyKSk6KChvPXRoaXMpLmxlbmd0aD1yLG8uX2lzQnVmZmVyPSEwKSxmLl91c2VUeXBlZEFycmF5cyYmXCJudW1iZXJcIj09dHlwZW9mIGUuYnl0ZUxlbmd0aClvLl9zZXQoZSk7ZWxzZSBpZihDKHU9ZSl8fGYuaXNCdWZmZXIodSl8fHUmJlwib2JqZWN0XCI9PXR5cGVvZiB1JiZcIm51bWJlclwiPT10eXBlb2YgdS5sZW5ndGgpZm9yKGk9MDtpPHI7aSsrKWYuaXNCdWZmZXIoZSk/b1tpXT1lLnJlYWRVSW50OChpKTpvW2ldPWVbaV07ZWxzZSBpZihcInN0cmluZ1wiPT1zKW8ud3JpdGUoZSwwLHQpO2Vsc2UgaWYoXCJudW1iZXJcIj09cyYmIWYuX3VzZVR5cGVkQXJyYXlzJiYhbilmb3IoaT0wO2k8cjtpKyspb1tpXT0wO3JldHVybiBvfWZ1bmN0aW9uIGIoZSx0LG4scil7cmV0dXJuIGYuX2NoYXJzV3JpdHRlbj1jKGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxuPTA7bjxlLmxlbmd0aDtuKyspdC5wdXNoKDI1NSZlLmNoYXJDb2RlQXQobikpO3JldHVybiB0fSh0KSxlLG4scil9ZnVuY3Rpb24gbShlLHQsbixyKXtyZXR1cm4gZi5fY2hhcnNXcml0dGVuPWMoZnVuY3Rpb24oZSl7Zm9yKHZhciB0LG4scj1bXSxvPTA7bzxlLmxlbmd0aDtvKyspbj1lLmNoYXJDb2RlQXQobyksdD1uPj44LG49biUyNTYsci5wdXNoKG4pLHIucHVzaCh0KTtyZXR1cm4gcn0odCksZSxuLHIpfWZ1bmN0aW9uIHYoZSx0LG4pe3ZhciByPVwiXCI7bj1NYXRoLm1pbihlLmxlbmd0aCxuKTtmb3IodmFyIG89dDtvPG47bysrKXIrPVN0cmluZy5mcm9tQ2hhckNvZGUoZVtvXSk7cmV0dXJuIHJ9ZnVuY3Rpb24gbyhlLHQsbixyKXtyfHwoZChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQobnVsbCE9dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLGQodCsxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvLHI9ZS5sZW5ndGg7aWYoIShyPD10KSlyZXR1cm4gbj8obz1lW3RdLHQrMTxyJiYob3w9ZVt0KzFdPDw4KSk6KG89ZVt0XTw8OCx0KzE8ciYmKG98PWVbdCsxXSkpLG99ZnVuY3Rpb24gdShlLHQsbixyKXtyfHwoZChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQobnVsbCE9dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLGQodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvLHI9ZS5sZW5ndGg7aWYoIShyPD10KSlyZXR1cm4gbj8odCsyPHImJihvPWVbdCsyXTw8MTYpLHQrMTxyJiYob3w9ZVt0KzFdPDw4KSxvfD1lW3RdLHQrMzxyJiYobys9ZVt0KzNdPDwyND4+PjApKToodCsxPHImJihvPWVbdCsxXTw8MTYpLHQrMjxyJiYob3w9ZVt0KzJdPDw4KSx0KzM8ciYmKG98PWVbdCszXSksbys9ZVt0XTw8MjQ+Pj4wKSxvfWZ1bmN0aW9uIF8oZSx0LG4scil7aWYocnx8KGQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKG51bGwhPXQsXCJtaXNzaW5nIG9mZnNldFwiKSxkKHQrMTxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSwhKGUubGVuZ3RoPD10KSlyZXR1cm4gcj1vKGUsdCxuLCEwKSwzMjc2OCZyPy0xKig2NTUzNS1yKzEpOnJ9ZnVuY3Rpb24gRShlLHQsbixyKXtpZihyfHwoZChcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQobnVsbCE9dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLGQodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLCEoZS5sZW5ndGg8PXQpKXJldHVybiByPXUoZSx0LG4sITApLDIxNDc0ODM2NDgmcj8tMSooNDI5NDk2NzI5NS1yKzEpOnJ9ZnVuY3Rpb24gSShlLHQsbixyKXtyZXR1cm4gcnx8KGQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSxpLnJlYWQoZSx0LG4sMjMsNCl9ZnVuY3Rpb24gQShlLHQsbixyKXtyZXR1cm4gcnx8KGQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKHQrNzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSxpLnJlYWQoZSx0LG4sNTIsOCl9ZnVuY3Rpb24gcyhlLHQsbixyLG8pe298fChkKG51bGwhPXQsXCJtaXNzaW5nIHZhbHVlXCIpLGQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKG51bGwhPW4sXCJtaXNzaW5nIG9mZnNldFwiKSxkKG4rMTxlLmxlbmd0aCxcInRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxZKHQsNjU1MzUpKTtvPWUubGVuZ3RoO2lmKCEobzw9bikpZm9yKHZhciBpPTAsdT1NYXRoLm1pbihvLW4sMik7aTx1O2krKyllW24raV09KHQmMjU1PDw4KihyP2k6MS1pKSk+Pj44KihyP2k6MS1pKX1mdW5jdGlvbiBsKGUsdCxuLHIsbyl7b3x8KGQobnVsbCE9dCxcIm1pc3NpbmcgdmFsdWVcIiksZChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQobnVsbCE9bixcIm1pc3Npbmcgb2Zmc2V0XCIpLGQobiszPGUubGVuZ3RoLFwidHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLFkodCw0Mjk0OTY3Mjk1KSk7bz1lLmxlbmd0aDtpZighKG88PW4pKWZvcih2YXIgaT0wLHU9TWF0aC5taW4oby1uLDQpO2k8dTtpKyspZVtuK2ldPXQ+Pj44KihyP2k6My1pKSYyNTV9ZnVuY3Rpb24gQihlLHQsbixyLG8pe298fChkKG51bGwhPXQsXCJtaXNzaW5nIHZhbHVlXCIpLGQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKG51bGwhPW4sXCJtaXNzaW5nIG9mZnNldFwiKSxkKG4rMTxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxGKHQsMzI3NjcsLTMyNzY4KSksZS5sZW5ndGg8PW58fHMoZSwwPD10P3Q6NjU1MzUrdCsxLG4scixvKX1mdW5jdGlvbiBMKGUsdCxuLHIsbyl7b3x8KGQobnVsbCE9dCxcIm1pc3NpbmcgdmFsdWVcIiksZChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQobnVsbCE9bixcIm1pc3Npbmcgb2Zmc2V0XCIpLGQobiszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLEYodCwyMTQ3NDgzNjQ3LC0yMTQ3NDgzNjQ4KSksZS5sZW5ndGg8PW58fGwoZSwwPD10P3Q6NDI5NDk2NzI5NSt0KzEsbixyLG8pfWZ1bmN0aW9uIFUoZSx0LG4scixvKXtvfHwoZChudWxsIT10LFwibWlzc2luZyB2YWx1ZVwiKSxkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZChudWxsIT1uLFwibWlzc2luZyBvZmZzZXRcIiksZChuKzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksRCh0LDM0MDI4MjM0NjYzODUyODg2ZTIyLC0zNDAyODIzNDY2Mzg1Mjg4NmUyMikpLGUubGVuZ3RoPD1ufHxpLndyaXRlKGUsdCxuLHIsMjMsNCl9ZnVuY3Rpb24geChlLHQsbixyLG8pe298fChkKG51bGwhPXQsXCJtaXNzaW5nIHZhbHVlXCIpLGQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKG51bGwhPW4sXCJtaXNzaW5nIG9mZnNldFwiKSxkKG4rNzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxEKHQsMTc5NzY5MzEzNDg2MjMxNTdlMjkyLC0xNzk3NjkzMTM0ODYyMzE1N2UyOTIpKSxlLmxlbmd0aDw9bnx8aS53cml0ZShlLHQsbixyLDUyLDgpfUguQnVmZmVyPWYsSC5TbG93QnVmZmVyPWYsSC5JTlNQRUNUX01BWF9CWVRFUz01MCxmLnBvb2xTaXplPTgxOTIsZi5fdXNlVHlwZWRBcnJheXM9ZnVuY3Rpb24oKXt0cnl7dmFyIGU9bmV3IEFycmF5QnVmZmVyKDApLHQ9bmV3IFVpbnQ4QXJyYXkoZSk7cmV0dXJuIHQuZm9vPWZ1bmN0aW9uKCl7cmV0dXJuIDQyfSw0Mj09PXQuZm9vKCkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHQuc3ViYXJyYXl9Y2F0Y2goZSl7cmV0dXJuITF9fSgpLGYuaXNFbmNvZGluZz1mdW5jdGlvbihlKXtzd2l0Y2goU3RyaW5nKGUpLnRvTG93ZXJDYXNlKCkpe2Nhc2VcImhleFwiOmNhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmNhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwiYmFzZTY0XCI6Y2FzZVwicmF3XCI6Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX19LGYuaXNCdWZmZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIShudWxsPT1lfHwhZS5faXNCdWZmZXIpfSxmLmJ5dGVMZW5ndGg9ZnVuY3Rpb24oZSx0KXt2YXIgbjtzd2l0Y2goZSs9XCJcIix0fHxcInV0ZjhcIil7Y2FzZVwiaGV4XCI6bj1lLmxlbmd0aC8yO2JyZWFrO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOm49VChlKS5sZW5ndGg7YnJlYWs7Y2FzZVwiYXNjaWlcIjpjYXNlXCJiaW5hcnlcIjpjYXNlXCJyYXdcIjpuPWUubGVuZ3RoO2JyZWFrO2Nhc2VcImJhc2U2NFwiOm49TShlKS5sZW5ndGg7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6bj0yKmUubGVuZ3RoO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlbmNvZGluZ1wiKX1yZXR1cm4gbn0sZi5jb25jYXQ9ZnVuY3Rpb24oZSx0KXtpZihkKEMoZSksXCJVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0LCBbdG90YWxMZW5ndGhdKVxcbmxpc3Qgc2hvdWxkIGJlIGFuIEFycmF5LlwiKSwwPT09ZS5sZW5ndGgpcmV0dXJuIG5ldyBmKDApO2lmKDE9PT1lLmxlbmd0aClyZXR1cm4gZVswXTtpZihcIm51bWJlclwiIT10eXBlb2YgdClmb3Iobz10PTA7bzxlLmxlbmd0aDtvKyspdCs9ZVtvXS5sZW5ndGg7Zm9yKHZhciBuPW5ldyBmKHQpLHI9MCxvPTA7bzxlLmxlbmd0aDtvKyspe3ZhciBpPWVbb107aS5jb3B5KG4scikscis9aS5sZW5ndGh9cmV0dXJuIG59LGYucHJvdG90eXBlLndyaXRlPWZ1bmN0aW9uKGUsdCxuLHIpe2lzRmluaXRlKHQpP2lzRmluaXRlKG4pfHwocj1uLG49dm9pZCAwKTooYT1yLHI9dCx0PW4sbj1hKSx0PU51bWJlcih0KXx8MDt2YXIgbyxpLHUscyxhPXRoaXMubGVuZ3RoLXQ7c3dpdGNoKCghbnx8YTwobj1OdW1iZXIobikpKSYmKG49YSkscj1TdHJpbmcocnx8XCJ1dGY4XCIpLnRvTG93ZXJDYXNlKCkpe2Nhc2VcImhleFwiOm89ZnVuY3Rpb24oZSx0LG4scil7bj1OdW1iZXIobil8fDA7dmFyIG89ZS5sZW5ndGgtbjsoIXJ8fG88KHI9TnVtYmVyKHIpKSkmJihyPW8pLGQoKG89dC5sZW5ndGgpJTI9PTAsXCJJbnZhbGlkIGhleCBzdHJpbmdcIiksby8yPHImJihyPW8vMik7Zm9yKHZhciBpPTA7aTxyO2krKyl7dmFyIHU9cGFyc2VJbnQodC5zdWJzdHIoMippLDIpLDE2KTtkKCFpc05hTih1KSxcIkludmFsaWQgaGV4IHN0cmluZ1wiKSxlW24raV09dX1yZXR1cm4gZi5fY2hhcnNXcml0dGVuPTIqaSxpfSh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjppPXRoaXMsdT10LHM9bixvPWYuX2NoYXJzV3JpdHRlbj1jKFQoZSksaSx1LHMpO2JyZWFrO2Nhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6bz1iKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcImJhc2U2NFwiOmk9dGhpcyx1PXQscz1uLG89Zi5fY2hhcnNXcml0dGVuPWMoTShlKSxpLHUscyk7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6bz1tKHRoaXMsZSx0LG4pO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlbmNvZGluZ1wiKX1yZXR1cm4gb30sZi5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oZSx0LG4pe3ZhciByLG8saSx1LHM9dGhpcztpZihlPVN0cmluZyhlfHxcInV0ZjhcIikudG9Mb3dlckNhc2UoKSx0PU51bWJlcih0KXx8MCwobj12b2lkIDAhPT1uP051bWJlcihuKTpzLmxlbmd0aCk9PT10KXJldHVyblwiXCI7c3dpdGNoKGUpe2Nhc2VcImhleFwiOnI9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPWUubGVuZ3RoOyghdHx8dDwwKSYmKHQ9MCk7KCFufHxuPDB8fHI8bikmJihuPXIpO2Zvcih2YXIgbz1cIlwiLGk9dDtpPG47aSsrKW8rPWsoZVtpXSk7cmV0dXJuIG99KHMsdCxuKTticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpyPWZ1bmN0aW9uKGUsdCxuKXt2YXIgcj1cIlwiLG89XCJcIjtuPU1hdGgubWluKGUubGVuZ3RoLG4pO2Zvcih2YXIgaT10O2k8bjtpKyspZVtpXTw9MTI3PyhyKz1OKG8pK1N0cmluZy5mcm9tQ2hhckNvZGUoZVtpXSksbz1cIlwiKTpvKz1cIiVcIitlW2ldLnRvU3RyaW5nKDE2KTtyZXR1cm4gcitOKG8pfShzLHQsbik7YnJlYWs7Y2FzZVwiYXNjaWlcIjpjYXNlXCJiaW5hcnlcIjpyPXYocyx0LG4pO2JyZWFrO2Nhc2VcImJhc2U2NFwiOm89cyx1PW4scj0wPT09KGk9dCkmJnU9PT1vLmxlbmd0aD9hLmZyb21CeXRlQXJyYXkobyk6YS5mcm9tQnl0ZUFycmF5KG8uc2xpY2UoaSx1KSk7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cj1mdW5jdGlvbihlLHQsbil7Zm9yKHZhciByPWUuc2xpY2UodCxuKSxvPVwiXCIsaT0wO2k8ci5sZW5ndGg7aSs9MilvKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHJbaV0rMjU2KnJbaSsxXSk7cmV0dXJuIG99KHMsdCxuKTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIHJ9LGYucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybnt0eXBlOlwiQnVmZmVyXCIsZGF0YTpBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnJ8fHRoaXMsMCl9fSxmLnByb3RvdHlwZS5jb3B5PWZ1bmN0aW9uKGUsdCxuLHIpe2lmKHQ9dHx8MCwocj1yfHwwPT09cj9yOnRoaXMubGVuZ3RoKSE9PShuPW58fDApJiYwIT09ZS5sZW5ndGgmJjAhPT10aGlzLmxlbmd0aCl7ZChuPD1yLFwic291cmNlRW5kIDwgc291cmNlU3RhcnRcIiksZCgwPD10JiZ0PGUubGVuZ3RoLFwidGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kc1wiKSxkKDA8PW4mJm48dGhpcy5sZW5ndGgsXCJzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzXCIpLGQoMDw9ciYmcjw9dGhpcy5sZW5ndGgsXCJzb3VyY2VFbmQgb3V0IG9mIGJvdW5kc1wiKSxyPnRoaXMubGVuZ3RoJiYocj10aGlzLmxlbmd0aCk7dmFyIG89KHI9ZS5sZW5ndGgtdDxyLW4/ZS5sZW5ndGgtdCtuOnIpLW47aWYobzwxMDB8fCFmLl91c2VUeXBlZEFycmF5cylmb3IodmFyIGk9MDtpPG87aSsrKWVbaSt0XT10aGlzW2krbl07ZWxzZSBlLl9zZXQodGhpcy5zdWJhcnJheShuLG4rbyksdCl9fSxmLnByb3RvdHlwZS5zbGljZT1mdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMubGVuZ3RoO2lmKGU9UyhlLG4sMCksdD1TKHQsbixuKSxmLl91c2VUeXBlZEFycmF5cylyZXR1cm4gZi5fYXVnbWVudCh0aGlzLnN1YmFycmF5KGUsdCkpO2Zvcih2YXIgcj10LWUsbz1uZXcgZihyLHZvaWQgMCwhMCksaT0wO2k8cjtpKyspb1tpXT10aGlzW2krZV07cmV0dXJuIG99LGYucHJvdG90eXBlLmdldD1mdW5jdGlvbihlKXtyZXR1cm4gY29uc29sZS5sb2coXCIuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC5cIiksdGhpcy5yZWFkVUludDgoZSl9LGYucHJvdG90eXBlLnNldD1mdW5jdGlvbihlLHQpe3JldHVybiBjb25zb2xlLmxvZyhcIi5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLlwiKSx0aGlzLndyaXRlVUludDgoZSx0KX0sZi5wcm90b3R5cGUucmVhZFVJbnQ4PWZ1bmN0aW9uKGUsdCl7aWYodHx8KGQobnVsbCE9ZSxcIm1pc3Npbmcgb2Zmc2V0XCIpLGQoZTx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSwhKGU+PXRoaXMubGVuZ3RoKSlyZXR1cm4gdGhpc1tlXX0sZi5wcm90b3R5cGUucmVhZFVJbnQxNkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG8odGhpcyxlLCEwLHQpfSxmLnByb3RvdHlwZS5yZWFkVUludDE2QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbyh0aGlzLGUsITEsdCl9LGYucHJvdG90eXBlLnJlYWRVSW50MzJMRT1mdW5jdGlvbihlLHQpe3JldHVybiB1KHRoaXMsZSwhMCx0KX0sZi5wcm90b3R5cGUucmVhZFVJbnQzMkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHUodGhpcyxlLCExLHQpfSxmLnByb3RvdHlwZS5yZWFkSW50OD1mdW5jdGlvbihlLHQpe2lmKHR8fChkKG51bGwhPWUsXCJtaXNzaW5nIG9mZnNldFwiKSxkKGU8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlPj10aGlzLmxlbmd0aCkpcmV0dXJuIDEyOCZ0aGlzW2VdPy0xKigyNTUtdGhpc1tlXSsxKTp0aGlzW2VdfSxmLnByb3RvdHlwZS5yZWFkSW50MTZMRT1mdW5jdGlvbihlLHQpe3JldHVybiBfKHRoaXMsZSwhMCx0KX0sZi5wcm90b3R5cGUucmVhZEludDE2QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gXyh0aGlzLGUsITEsdCl9LGYucHJvdG90eXBlLnJlYWRJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEUodGhpcyxlLCEwLHQpfSxmLnByb3RvdHlwZS5yZWFkSW50MzJCRT1mdW5jdGlvbihlLHQpe3JldHVybiBFKHRoaXMsZSwhMSx0KX0sZi5wcm90b3R5cGUucmVhZEZsb2F0TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gSSh0aGlzLGUsITAsdCl9LGYucHJvdG90eXBlLnJlYWRGbG9hdEJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEkodGhpcyxlLCExLHQpfSxmLnByb3RvdHlwZS5yZWFkRG91YmxlTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQSh0aGlzLGUsITAsdCl9LGYucHJvdG90eXBlLnJlYWREb3VibGVCRT1mdW5jdGlvbihlLHQpe3JldHVybiBBKHRoaXMsZSwhMSx0KX0sZi5wcm90b3R5cGUud3JpdGVVSW50OD1mdW5jdGlvbihlLHQsbil7bnx8KGQobnVsbCE9ZSxcIm1pc3NpbmcgdmFsdWVcIiksZChudWxsIT10LFwibWlzc2luZyBvZmZzZXRcIiksZCh0PHRoaXMubGVuZ3RoLFwidHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLFkoZSwyNTUpKSx0Pj10aGlzLmxlbmd0aHx8KHRoaXNbdF09ZSl9LGYucHJvdG90eXBlLndyaXRlVUludDE2TEU9ZnVuY3Rpb24oZSx0LG4pe3ModGhpcyxlLHQsITAsbil9LGYucHJvdG90eXBlLndyaXRlVUludDE2QkU9ZnVuY3Rpb24oZSx0LG4pe3ModGhpcyxlLHQsITEsbil9LGYucHJvdG90eXBlLndyaXRlVUludDMyTEU9ZnVuY3Rpb24oZSx0LG4pe2wodGhpcyxlLHQsITAsbil9LGYucHJvdG90eXBlLndyaXRlVUludDMyQkU9ZnVuY3Rpb24oZSx0LG4pe2wodGhpcyxlLHQsITEsbil9LGYucHJvdG90eXBlLndyaXRlSW50OD1mdW5jdGlvbihlLHQsbil7bnx8KGQobnVsbCE9ZSxcIm1pc3NpbmcgdmFsdWVcIiksZChudWxsIT10LFwibWlzc2luZyBvZmZzZXRcIiksZCh0PHRoaXMubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLEYoZSwxMjcsLTEyOCkpLHQ+PXRoaXMubGVuZ3RofHwoMDw9ZT90aGlzLndyaXRlVUludDgoZSx0LG4pOnRoaXMud3JpdGVVSW50OCgyNTUrZSsxLHQsbikpfSxmLnByb3RvdHlwZS53cml0ZUludDE2TEU9ZnVuY3Rpb24oZSx0LG4pe0IodGhpcyxlLHQsITAsbil9LGYucHJvdG90eXBlLndyaXRlSW50MTZCRT1mdW5jdGlvbihlLHQsbil7Qih0aGlzLGUsdCwhMSxuKX0sZi5wcm90b3R5cGUud3JpdGVJbnQzMkxFPWZ1bmN0aW9uKGUsdCxuKXtMKHRoaXMsZSx0LCEwLG4pfSxmLnByb3RvdHlwZS53cml0ZUludDMyQkU9ZnVuY3Rpb24oZSx0LG4pe0wodGhpcyxlLHQsITEsbil9LGYucHJvdG90eXBlLndyaXRlRmxvYXRMRT1mdW5jdGlvbihlLHQsbil7VSh0aGlzLGUsdCwhMCxuKX0sZi5wcm90b3R5cGUud3JpdGVGbG9hdEJFPWZ1bmN0aW9uKGUsdCxuKXtVKHRoaXMsZSx0LCExLG4pfSxmLnByb3RvdHlwZS53cml0ZURvdWJsZUxFPWZ1bmN0aW9uKGUsdCxuKXt4KHRoaXMsZSx0LCEwLG4pfSxmLnByb3RvdHlwZS53cml0ZURvdWJsZUJFPWZ1bmN0aW9uKGUsdCxuKXt4KHRoaXMsZSx0LCExLG4pfSxmLnByb3RvdHlwZS5maWxsPWZ1bmN0aW9uKGUsdCxuKXtpZih0PXR8fDAsbj1ufHx0aGlzLmxlbmd0aCxkKFwibnVtYmVyXCI9PXR5cGVvZihlPVwic3RyaW5nXCI9PXR5cGVvZihlPWV8fDApP2UuY2hhckNvZGVBdCgwKTplKSYmIWlzTmFOKGUpLFwidmFsdWUgaXMgbm90IGEgbnVtYmVyXCIpLGQodDw9bixcImVuZCA8IHN0YXJ0XCIpLG4hPT10JiYwIT09dGhpcy5sZW5ndGgpe2QoMDw9dCYmdDx0aGlzLmxlbmd0aCxcInN0YXJ0IG91dCBvZiBib3VuZHNcIiksZCgwPD1uJiZuPD10aGlzLmxlbmd0aCxcImVuZCBvdXQgb2YgYm91bmRzXCIpO2Zvcih2YXIgcj10O3I8bjtyKyspdGhpc1tyXT1lfX0sZi5wcm90b3R5cGUuaW5zcGVjdD1mdW5jdGlvbigpe2Zvcih2YXIgZT1bXSx0PXRoaXMubGVuZ3RoLG49MDtuPHQ7bisrKWlmKGVbbl09ayh0aGlzW25dKSxuPT09SC5JTlNQRUNUX01BWF9CWVRFUyl7ZVtuKzFdPVwiLi4uXCI7YnJlYWt9cmV0dXJuXCI8QnVmZmVyIFwiK2Uuam9pbihcIiBcIikrXCI+XCJ9LGYucHJvdG90eXBlLnRvQXJyYXlCdWZmZXI9ZnVuY3Rpb24oKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgVWludDhBcnJheSl0aHJvdyBuZXcgRXJyb3IoXCJCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtpZihmLl91c2VUeXBlZEFycmF5cylyZXR1cm4gbmV3IGYodGhpcykuYnVmZmVyO2Zvcih2YXIgZT1uZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aCksdD0wLG49ZS5sZW5ndGg7dDxuO3QrPTEpZVt0XT10aGlzW3RdO3JldHVybiBlLmJ1ZmZlcn07dmFyIHQ9Zi5wcm90b3R5cGU7ZnVuY3Rpb24gUyhlLHQsbil7cmV0dXJuXCJudW1iZXJcIiE9dHlwZW9mIGU/bjp0PD0oZT1+fmUpP3Q6MDw9ZXx8MDw9KGUrPXQpP2U6MH1mdW5jdGlvbiBqKGUpe3JldHVybihlPX5+TWF0aC5jZWlsKCtlKSk8MD8wOmV9ZnVuY3Rpb24gQyhlKXtyZXR1cm4oQXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24oZSl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfSkoZSl9ZnVuY3Rpb24gayhlKXtyZXR1cm4gZTwxNj9cIjBcIitlLnRvU3RyaW5nKDE2KTplLnRvU3RyaW5nKDE2KX1mdW5jdGlvbiBUKGUpe2Zvcih2YXIgdD1bXSxuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWUuY2hhckNvZGVBdChuKTtpZihyPD0xMjcpdC5wdXNoKGUuY2hhckNvZGVBdChuKSk7ZWxzZSBmb3IodmFyIG89bixpPSg1NTI5Njw9ciYmcjw9NTczNDMmJm4rKyxlbmNvZGVVUklDb21wb25lbnQoZS5zbGljZShvLG4rMSkpLnN1YnN0cigxKS5zcGxpdChcIiVcIikpLHU9MDt1PGkubGVuZ3RoO3UrKyl0LnB1c2gocGFyc2VJbnQoaVt1XSwxNikpfXJldHVybiB0fWZ1bmN0aW9uIE0oZSl7cmV0dXJuIGEudG9CeXRlQXJyYXkoZSl9ZnVuY3Rpb24gYyhlLHQsbixyKXtmb3IodmFyIG89MDtvPHImJiEobytuPj10Lmxlbmd0aHx8bz49ZS5sZW5ndGgpO28rKyl0W28rbl09ZVtvXTtyZXR1cm4gb31mdW5jdGlvbiBOKGUpe3RyeXtyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGUpfWNhdGNoKGUpe3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1NTMzKX19ZnVuY3Rpb24gWShlLHQpe2QoXCJudW1iZXJcIj09dHlwZW9mIGUsXCJjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyXCIpLGQoMDw9ZSxcInNwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlXCIpLGQoZTw9dCxcInZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGVcIiksZChNYXRoLmZsb29yKGUpPT09ZSxcInZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50XCIpfWZ1bmN0aW9uIEYoZSx0LG4pe2QoXCJudW1iZXJcIj09dHlwZW9mIGUsXCJjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyXCIpLGQoZTw9dCxcInZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZVwiKSxkKG48PWUsXCJ2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlXCIpLGQoTWF0aC5mbG9vcihlKT09PWUsXCJ2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudFwiKX1mdW5jdGlvbiBEKGUsdCxuKXtkKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSxkKGU8PXQsXCJ2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcIiksZChuPD1lLFwidmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZVwiKX1mdW5jdGlvbiBkKGUsdCl7aWYoIWUpdGhyb3cgbmV3IEVycm9yKHR8fFwiRmFpbGVkIGFzc2VydGlvblwiKX1mLl9hdWdtZW50PWZ1bmN0aW9uKGUpe3JldHVybiBlLl9pc0J1ZmZlcj0hMCxlLl9nZXQ9ZS5nZXQsZS5fc2V0PWUuc2V0LGUuZ2V0PXQuZ2V0LGUuc2V0PXQuc2V0LGUud3JpdGU9dC53cml0ZSxlLnRvU3RyaW5nPXQudG9TdHJpbmcsZS50b0xvY2FsZVN0cmluZz10LnRvU3RyaW5nLGUudG9KU09OPXQudG9KU09OLGUuY29weT10LmNvcHksZS5zbGljZT10LnNsaWNlLGUucmVhZFVJbnQ4PXQucmVhZFVJbnQ4LGUucmVhZFVJbnQxNkxFPXQucmVhZFVJbnQxNkxFLGUucmVhZFVJbnQxNkJFPXQucmVhZFVJbnQxNkJFLGUucmVhZFVJbnQzMkxFPXQucmVhZFVJbnQzMkxFLGUucmVhZFVJbnQzMkJFPXQucmVhZFVJbnQzMkJFLGUucmVhZEludDg9dC5yZWFkSW50OCxlLnJlYWRJbnQxNkxFPXQucmVhZEludDE2TEUsZS5yZWFkSW50MTZCRT10LnJlYWRJbnQxNkJFLGUucmVhZEludDMyTEU9dC5yZWFkSW50MzJMRSxlLnJlYWRJbnQzMkJFPXQucmVhZEludDMyQkUsZS5yZWFkRmxvYXRMRT10LnJlYWRGbG9hdExFLGUucmVhZEZsb2F0QkU9dC5yZWFkRmxvYXRCRSxlLnJlYWREb3VibGVMRT10LnJlYWREb3VibGVMRSxlLnJlYWREb3VibGVCRT10LnJlYWREb3VibGVCRSxlLndyaXRlVUludDg9dC53cml0ZVVJbnQ4LGUud3JpdGVVSW50MTZMRT10LndyaXRlVUludDE2TEUsZS53cml0ZVVJbnQxNkJFPXQud3JpdGVVSW50MTZCRSxlLndyaXRlVUludDMyTEU9dC53cml0ZVVJbnQzMkxFLGUud3JpdGVVSW50MzJCRT10LndyaXRlVUludDMyQkUsZS53cml0ZUludDg9dC53cml0ZUludDgsZS53cml0ZUludDE2TEU9dC53cml0ZUludDE2TEUsZS53cml0ZUludDE2QkU9dC53cml0ZUludDE2QkUsZS53cml0ZUludDMyTEU9dC53cml0ZUludDMyTEUsZS53cml0ZUludDMyQkU9dC53cml0ZUludDMyQkUsZS53cml0ZUZsb2F0TEU9dC53cml0ZUZsb2F0TEUsZS53cml0ZUZsb2F0QkU9dC53cml0ZUZsb2F0QkUsZS53cml0ZURvdWJsZUxFPXQud3JpdGVEb3VibGVMRSxlLndyaXRlRG91YmxlQkU9dC53cml0ZURvdWJsZUJFLGUuZmlsbD10LmZpbGwsZS5pbnNwZWN0PXQuaW5zcGVjdCxlLnRvQXJyYXlCdWZmZXI9dC50b0FycmF5QnVmZmVyLGV9fS5jYWxsKHRoaXMsTyhcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LE8oXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXJcIil9LHtcImJhc2U2NC1qc1wiOjIsYnVmZmVyOjMsaWVlZTc1NDoxMCxsWXBvSTI6MTF9XSw0OltmdW5jdGlvbihjLGQsZSl7IWZ1bmN0aW9uKGUsdCxhLG4scixvLGksdSxzKXt2YXIgYT1jKFwiYnVmZmVyXCIpLkJ1ZmZlcixmPTQsbD1uZXcgYShmKTtsLmZpbGwoMCk7ZC5leHBvcnRzPXtoYXNoOmZ1bmN0aW9uKGUsdCxuLHIpe2Zvcih2YXIgbz10KGZ1bmN0aW9uKGUsdCl7ZS5sZW5ndGglZiE9MCYmKG49ZS5sZW5ndGgrKGYtZS5sZW5ndGglZiksZT1hLmNvbmNhdChbZSxsXSxuKSk7Zm9yKHZhciBuLHI9W10sbz10P2UucmVhZEludDMyQkU6ZS5yZWFkSW50MzJMRSxpPTA7aTxlLmxlbmd0aDtpKz1mKXIucHVzaChvLmNhbGwoZSxpKSk7cmV0dXJuIHJ9KGU9YS5pc0J1ZmZlcihlKT9lOm5ldyBhKGUpLHIpLDgqZS5sZW5ndGgpLHQ9cixpPW5ldyBhKG4pLHU9dD9pLndyaXRlSW50MzJCRTppLndyaXRlSW50MzJMRSxzPTA7czxvLmxlbmd0aDtzKyspdS5jYWxsKGksb1tzXSw0KnMsITApO3JldHVybiBpfX19LmNhbGwodGhpcyxjKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sYyhcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L2hlbHBlcnMuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMX1dLDU6W2Z1bmN0aW9uKHYsZSxfKXshZnVuY3Rpb24obCxjLHUsZCxoLHAsZyx5LHcpe3ZhciB1PXYoXCJidWZmZXJcIikuQnVmZmVyLGU9dihcIi4vc2hhXCIpLHQ9dihcIi4vc2hhMjU2XCIpLG49dihcIi4vcm5nXCIpLGI9e3NoYTE6ZSxzaGEyNTY6dCxtZDU6dihcIi4vbWQ1XCIpfSxzPTY0LGE9bmV3IHUocyk7ZnVuY3Rpb24gcihlLG4pe3ZhciByPWJbZT1lfHxcInNoYTFcIl0sbz1bXTtyZXR1cm4gcnx8aShcImFsZ29yaXRobTpcIixlLFwiaXMgbm90IHlldCBzdXBwb3J0ZWRcIikse3VwZGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gdS5pc0J1ZmZlcihlKXx8KGU9bmV3IHUoZSkpLG8ucHVzaChlKSxlLmxlbmd0aCx0aGlzfSxkaWdlc3Q6ZnVuY3Rpb24oZSl7dmFyIHQ9dS5jb25jYXQobyksdD1uP2Z1bmN0aW9uKGUsdCxuKXt1LmlzQnVmZmVyKHQpfHwodD1uZXcgdSh0KSksdS5pc0J1ZmZlcihuKXx8KG49bmV3IHUobikpLHQubGVuZ3RoPnM/dD1lKHQpOnQubGVuZ3RoPHMmJih0PXUuY29uY2F0KFt0LGFdLHMpKTtmb3IodmFyIHI9bmV3IHUocyksbz1uZXcgdShzKSxpPTA7aTxzO2krKylyW2ldPTU0XnRbaV0sb1tpXT05Ml50W2ldO3JldHVybiBuPWUodS5jb25jYXQoW3Isbl0pKSxlKHUuY29uY2F0KFtvLG5dKSl9KHIsbix0KTpyKHQpO3JldHVybiBvPW51bGwsZT90LnRvU3RyaW5nKGUpOnR9fX1mdW5jdGlvbiBpKCl7dmFyIGU9W10uc2xpY2UuY2FsbChhcmd1bWVudHMpLmpvaW4oXCIgXCIpO3Rocm93IG5ldyBFcnJvcihbZSxcIndlIGFjY2VwdCBwdWxsIHJlcXVlc3RzXCIsXCJodHRwOi8vZ2l0aHViLmNvbS9kb21pbmljdGFyci9jcnlwdG8tYnJvd3NlcmlmeVwiXS5qb2luKFwiXFxuXCIpKX1hLmZpbGwoMCksXy5jcmVhdGVIYXNoPWZ1bmN0aW9uKGUpe3JldHVybiByKGUpfSxfLmNyZWF0ZUhtYWM9cixfLnJhbmRvbUJ5dGVzPWZ1bmN0aW9uKGUsdCl7aWYoIXR8fCF0LmNhbGwpcmV0dXJuIG5ldyB1KG4oZSkpO3RyeXt0LmNhbGwodGhpcyx2b2lkIDAsbmV3IHUobihlKSkpfWNhdGNoKGUpe3QoZSl9fTt2YXIgbyxmPVtcImNyZWF0ZUNyZWRlbnRpYWxzXCIsXCJjcmVhdGVDaXBoZXJcIixcImNyZWF0ZUNpcGhlcml2XCIsXCJjcmVhdGVEZWNpcGhlclwiLFwiY3JlYXRlRGVjaXBoZXJpdlwiLFwiY3JlYXRlU2lnblwiLFwiY3JlYXRlVmVyaWZ5XCIsXCJjcmVhdGVEaWZmaWVIZWxsbWFuXCIsXCJwYmtkZjJcIl0sbT1mdW5jdGlvbihlKXtfW2VdPWZ1bmN0aW9uKCl7aShcInNvcnJ5LFwiLGUsXCJpcyBub3QgaW1wbGVtZW50ZWQgeWV0XCIpfX07Zm9yKG8gaW4gZiltKGZbb10sbyl9LmNhbGwodGhpcyx2KFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sdihcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vbWQ1XCI6NixcIi4vcm5nXCI6NyxcIi4vc2hhXCI6OCxcIi4vc2hhMjU2XCI6OSxidWZmZXI6MyxsWXBvSTI6MTF9XSw2OltmdW5jdGlvbih3LGIsZSl7IWZ1bmN0aW9uKGUscixvLGksdSxhLGYsbCx5KXt2YXIgdD13KFwiLi9oZWxwZXJzXCIpO2Z1bmN0aW9uIG4oZSx0KXtlW3Q+PjVdfD0xMjg8PHQlMzIsZVsxNCsodCs2ND4+Pjk8PDQpXT10O2Zvcih2YXIgbj0xNzMyNTg0MTkzLHI9LTI3MTczMzg3OSxvPS0xNzMyNTg0MTk0LGk9MjcxNzMzODc4LHU9MDt1PGUubGVuZ3RoO3UrPTE2KXt2YXIgcz1uLGE9cixmPW8sbD1pLG49YyhuLHIsbyxpLGVbdSswXSw3LC02ODA4NzY5MzYpLGk9YyhpLG4scixvLGVbdSsxXSwxMiwtMzg5NTY0NTg2KSxvPWMobyxpLG4scixlW3UrMl0sMTcsNjA2MTA1ODE5KSxyPWMocixvLGksbixlW3UrM10sMjIsLTEwNDQ1MjUzMzApO249YyhuLHIsbyxpLGVbdSs0XSw3LC0xNzY0MTg4OTcpLGk9YyhpLG4scixvLGVbdSs1XSwxMiwxMjAwMDgwNDI2KSxvPWMobyxpLG4scixlW3UrNl0sMTcsLTE0NzMyMzEzNDEpLHI9YyhyLG8saSxuLGVbdSs3XSwyMiwtNDU3MDU5ODMpLG49YyhuLHIsbyxpLGVbdSs4XSw3LDE3NzAwMzU0MTYpLGk9YyhpLG4scixvLGVbdSs5XSwxMiwtMTk1ODQxNDQxNyksbz1jKG8saSxuLHIsZVt1KzEwXSwxNywtNDIwNjMpLHI9YyhyLG8saSxuLGVbdSsxMV0sMjIsLTE5OTA0MDQxNjIpLG49YyhuLHIsbyxpLGVbdSsxMl0sNywxODA0NjAzNjgyKSxpPWMoaSxuLHIsbyxlW3UrMTNdLDEyLC00MDM0MTEwMSksbz1jKG8saSxuLHIsZVt1KzE0XSwxNywtMTUwMjAwMjI5MCksbj1kKG4scj1jKHIsbyxpLG4sZVt1KzE1XSwyMiwxMjM2NTM1MzI5KSxvLGksZVt1KzFdLDUsLTE2NTc5NjUxMCksaT1kKGksbixyLG8sZVt1KzZdLDksLTEwNjk1MDE2MzIpLG89ZChvLGksbixyLGVbdSsxMV0sMTQsNjQzNzE3NzEzKSxyPWQocixvLGksbixlW3UrMF0sMjAsLTM3Mzg5NzMwMiksbj1kKG4scixvLGksZVt1KzVdLDUsLTcwMTU1ODY5MSksaT1kKGksbixyLG8sZVt1KzEwXSw5LDM4MDE2MDgzKSxvPWQobyxpLG4scixlW3UrMTVdLDE0LC02NjA0NzgzMzUpLHI9ZChyLG8saSxuLGVbdSs0XSwyMCwtNDA1NTM3ODQ4KSxuPWQobixyLG8saSxlW3UrOV0sNSw1Njg0NDY0MzgpLGk9ZChpLG4scixvLGVbdSsxNF0sOSwtMTAxOTgwMzY5MCksbz1kKG8saSxuLHIsZVt1KzNdLDE0LC0xODczNjM5NjEpLHI9ZChyLG8saSxuLGVbdSs4XSwyMCwxMTYzNTMxNTAxKSxuPWQobixyLG8saSxlW3UrMTNdLDUsLTE0NDQ2ODE0NjcpLGk9ZChpLG4scixvLGVbdSsyXSw5LC01MTQwMzc4NCksbz1kKG8saSxuLHIsZVt1KzddLDE0LDE3MzUzMjg0NzMpLG49aChuLHI9ZChyLG8saSxuLGVbdSsxMl0sMjAsLTE5MjY2MDc3MzQpLG8saSxlW3UrNV0sNCwtMzc4NTU4KSxpPWgoaSxuLHIsbyxlW3UrOF0sMTEsLTIwMjI1NzQ0NjMpLG89aChvLGksbixyLGVbdSsxMV0sMTYsMTgzOTAzMDU2Mikscj1oKHIsbyxpLG4sZVt1KzE0XSwyMywtMzUzMDk1NTYpLG49aChuLHIsbyxpLGVbdSsxXSw0LC0xNTMwOTkyMDYwKSxpPWgoaSxuLHIsbyxlW3UrNF0sMTEsMTI3Mjg5MzM1Myksbz1oKG8saSxuLHIsZVt1KzddLDE2LC0xNTU0OTc2MzIpLHI9aChyLG8saSxuLGVbdSsxMF0sMjMsLTEwOTQ3MzA2NDApLG49aChuLHIsbyxpLGVbdSsxM10sNCw2ODEyNzkxNzQpLGk9aChpLG4scixvLGVbdSswXSwxMSwtMzU4NTM3MjIyKSxvPWgobyxpLG4scixlW3UrM10sMTYsLTcyMjUyMTk3OSkscj1oKHIsbyxpLG4sZVt1KzZdLDIzLDc2MDI5MTg5KSxuPWgobixyLG8saSxlW3UrOV0sNCwtNjQwMzY0NDg3KSxpPWgoaSxuLHIsbyxlW3UrMTJdLDExLC00MjE4MTU4MzUpLG89aChvLGksbixyLGVbdSsxNV0sMTYsNTMwNzQyNTIwKSxuPXAobixyPWgocixvLGksbixlW3UrMl0sMjMsLTk5NTMzODY1MSksbyxpLGVbdSswXSw2LC0xOTg2MzA4NDQpLGk9cChpLG4scixvLGVbdSs3XSwxMCwxMTI2ODkxNDE1KSxvPXAobyxpLG4scixlW3UrMTRdLDE1LC0xNDE2MzU0OTA1KSxyPXAocixvLGksbixlW3UrNV0sMjEsLTU3NDM0MDU1KSxuPXAobixyLG8saSxlW3UrMTJdLDYsMTcwMDQ4NTU3MSksaT1wKGksbixyLG8sZVt1KzNdLDEwLC0xODk0OTg2NjA2KSxvPXAobyxpLG4scixlW3UrMTBdLDE1LC0xMDUxNTIzKSxyPXAocixvLGksbixlW3UrMV0sMjEsLTIwNTQ5MjI3OTkpLG49cChuLHIsbyxpLGVbdSs4XSw2LDE4NzMzMTMzNTkpLGk9cChpLG4scixvLGVbdSsxNV0sMTAsLTMwNjExNzQ0KSxvPXAobyxpLG4scixlW3UrNl0sMTUsLTE1NjAxOTgzODApLHI9cChyLG8saSxuLGVbdSsxM10sMjEsMTMwOTE1MTY0OSksbj1wKG4scixvLGksZVt1KzRdLDYsLTE0NTUyMzA3MCksaT1wKGksbixyLG8sZVt1KzExXSwxMCwtMTEyMDIxMDM3OSksbz1wKG8saSxuLHIsZVt1KzJdLDE1LDcxODc4NzI1OSkscj1wKHIsbyxpLG4sZVt1KzldLDIxLC0zNDM0ODU1NTEpLG49ZyhuLHMpLHI9ZyhyLGEpLG89ZyhvLGYpLGk9ZyhpLGwpfXJldHVybiBBcnJheShuLHIsbyxpKX1mdW5jdGlvbiBzKGUsdCxuLHIsbyxpKXtyZXR1cm4gZygodD1nKGcodCxlKSxnKHIsaSkpKTw8b3x0Pj4+MzItbyxuKX1mdW5jdGlvbiBjKGUsdCxuLHIsbyxpLHUpe3JldHVybiBzKHQmbnx+dCZyLGUsdCxvLGksdSl9ZnVuY3Rpb24gZChlLHQsbixyLG8saSx1KXtyZXR1cm4gcyh0JnJ8biZ+cixlLHQsbyxpLHUpfWZ1bmN0aW9uIGgoZSx0LG4scixvLGksdSl7cmV0dXJuIHModF5uXnIsZSx0LG8saSx1KX1mdW5jdGlvbiBwKGUsdCxuLHIsbyxpLHUpe3JldHVybiBzKG5eKHR8fnIpLGUsdCxvLGksdSl9ZnVuY3Rpb24gZyhlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCk7cmV0dXJuKGU+PjE2KSsodD4+MTYpKyhuPj4xNik8PDE2fDY1NTM1Jm59Yi5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiB0Lmhhc2goZSxuLDE2KX19LmNhbGwodGhpcyx3KFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sdyhcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L21kNS5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMX1dLDc6W2Z1bmN0aW9uKGUsbCx0KXshZnVuY3Rpb24oZSx0LG4scixvLGksdSxzLGYpe3ZhciBhO2wuZXhwb3J0cz1hfHxmdW5jdGlvbihlKXtmb3IodmFyIHQsbj1uZXcgQXJyYXkoZSkscj0wO3I8ZTtyKyspMD09KDMmcikmJih0PTQyOTQ5NjcyOTYqTWF0aC5yYW5kb20oKSksbltyXT10Pj4+KCgzJnIpPDwzKSYyNTU7cmV0dXJuIG59fS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9ybmcuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMX1dLDg6W2Z1bmN0aW9uKGMsZCxlKXshZnVuY3Rpb24oZSx0LG4scixvLHMsYSxmLGwpe3ZhciBpPWMoXCIuL2hlbHBlcnNcIik7ZnVuY3Rpb24gdShsLGMpe2xbYz4+NV18PTEyODw8MjQtYyUzMixsWzE1KyhjKzY0Pj45PDw0KV09Yztmb3IodmFyIGUsdCxuLHI9QXJyYXkoODApLG89MTczMjU4NDE5MyxpPS0yNzE3MzM4NzksdT0tMTczMjU4NDE5NCxzPTI3MTczMzg3OCxkPS0xMDA5NTg5Nzc2LGg9MDtoPGwubGVuZ3RoO2grPTE2KXtmb3IodmFyIHA9byxnPWkseT11LHc9cyxiPWQsYT0wO2E8ODA7YSsrKXtyW2FdPWE8MTY/bFtoK2FdOnYoclthLTNdXnJbYS04XV5yW2EtMTRdXnJbYS0xNl0sMSk7dmFyIGY9bShtKHYobyw1KSwoZj1pLHQ9dSxuPXMsKGU9YSk8MjA/ZiZ0fH5mJm46IShlPDQwKSYmZTw2MD9mJnR8ZiZufHQmbjpmXnRebikpLG0obShkLHJbYV0pLChlPWEpPDIwPzE1MTg1MDAyNDk6ZTw0MD8xODU5Nzc1MzkzOmU8NjA/LTE4OTQwMDc1ODg6LTg5OTQ5NzUxNCkpLGQ9cyxzPXUsdT12KGksMzApLGk9byxvPWZ9bz1tKG8scCksaT1tKGksZyksdT1tKHUseSkscz1tKHMsdyksZD1tKGQsYil9cmV0dXJuIEFycmF5KG8saSx1LHMsZCl9ZnVuY3Rpb24gbShlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCk7cmV0dXJuKGU+PjE2KSsodD4+MTYpKyhuPj4xNik8PDE2fDY1NTM1Jm59ZnVuY3Rpb24gdihlLHQpe3JldHVybiBlPDx0fGU+Pj4zMi10fWQuZXhwb3J0cz1mdW5jdGlvbihlKXtyZXR1cm4gaS5oYXNoKGUsdSwyMCwhMCl9fS5jYWxsKHRoaXMsYyhcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGMoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTF9XSw5OltmdW5jdGlvbihjLGQsZSl7IWZ1bmN0aW9uKGUsdCxuLHIsdSxzLGEsZixsKXtmdW5jdGlvbiBiKGUsdCl7dmFyIG49KDY1NTM1JmUpKyg2NTUzNSZ0KTtyZXR1cm4oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTw8MTZ8NjU1MzUmbn1mdW5jdGlvbiBvKGUsbCl7dmFyIGMsZD1uZXcgQXJyYXkoMTExNjM1MjQwOCwxODk5NDQ3NDQxLDMwNDkzMjM0NzEsMzkyMTAwOTU3Myw5NjE5ODcxNjMsMTUwODk3MDk5MywyNDUzNjM1NzQ4LDI4NzA3NjMyMjEsMzYyNDM4MTA4MCwzMTA1OTg0MDEsNjA3MjI1Mjc4LDE0MjY4ODE5ODcsMTkyNTA3ODM4OCwyMTYyMDc4MjA2LDI2MTQ4ODgxMDMsMzI0ODIyMjU4MCwzODM1MzkwNDAxLDQwMjIyMjQ3NzQsMjY0MzQ3MDc4LDYwNDgwNzYyOCw3NzAyNTU5ODMsMTI0OTE1MDEyMiwxNTU1MDgxNjkyLDE5OTYwNjQ5ODYsMjU1NDIyMDg4MiwyODIxODM0MzQ5LDI5NTI5OTY4MDgsMzIxMDMxMzY3MSwzMzM2NTcxODkxLDM1ODQ1Mjg3MTEsMTEzOTI2OTkzLDMzODI0MTg5NSw2NjYzMDcyMDUsNzczNTI5OTEyLDEyOTQ3NTczNzIsMTM5NjE4MjI5MSwxNjk1MTgzNzAwLDE5ODY2NjEwNTEsMjE3NzAyNjM1MCwyNDU2OTU2MDM3LDI3MzA0ODU5MjEsMjgyMDMwMjQxMSwzMjU5NzMwODAwLDMzNDU3NjQ3NzEsMzUxNjA2NTgxNywzNjAwMzUyODA0LDQwOTQ1NzE5MDksMjc1NDIzMzQ0LDQzMDIyNzczNCw1MDY5NDg2MTYsNjU5MDYwNTU2LDg4Mzk5Nzg3Nyw5NTgxMzk1NzEsMTMyMjgyMjIxOCwxNTM3MDAyMDYzLDE3NDc4NzM3NzksMTk1NTU2MjIyMiwyMDI0MTA0ODE1LDIyMjc3MzA0NTIsMjM2MTg1MjQyNCwyNDI4NDM2NDc0LDI3NTY3MzQxODcsMzIwNDAzMTQ3OSwzMzI5MzI1Mjk4KSx0PW5ldyBBcnJheSgxNzc5MDMzNzAzLDMxNDQxMzQyNzcsMTAxMzkwNDI0MiwyNzczNDgwNzYyLDEzNTk4OTMxMTksMjYwMDgyMjkyNCw1Mjg3MzQ2MzUsMTU0MTQ1OTIyNSksbj1uZXcgQXJyYXkoNjQpO2VbbD4+NV18PTEyODw8MjQtbCUzMixlWzE1KyhsKzY0Pj45PDw0KV09bDtmb3IodmFyIHIsbyxoPTA7aDxlLmxlbmd0aDtoKz0xNil7Zm9yKHZhciBpPXRbMF0sdT10WzFdLHM9dFsyXSxwPXRbM10sYT10WzRdLGc9dFs1XSx5PXRbNl0sdz10WzddLGY9MDtmPDY0O2YrKyluW2ZdPWY8MTY/ZVtmK2hdOmIoYihiKChvPW5bZi0yXSxtKG8sMTcpXm0obywxOSledihvLDEwKSksbltmLTddKSwobz1uW2YtMTVdLG0obyw3KV5tKG8sMTgpXnYobywzKSkpLG5bZi0xNl0pLGM9YihiKGIoYih3LG0obz1hLDYpXm0obywxMSlebShvLDI1KSksYSZnXn5hJnkpLGRbZl0pLG5bZl0pLHI9YihtKHI9aSwyKV5tKHIsMTMpXm0ociwyMiksaSZ1Xmkmc151JnMpLHc9eSx5PWcsZz1hLGE9YihwLGMpLHA9cyxzPXUsdT1pLGk9YihjLHIpO3RbMF09YihpLHRbMF0pLHRbMV09Yih1LHRbMV0pLHRbMl09YihzLHRbMl0pLHRbM109YihwLHRbM10pLHRbNF09YihhLHRbNF0pLHRbNV09YihnLHRbNV0pLHRbNl09Yih5LHRbNl0pLHRbN109Yih3LHRbN10pfXJldHVybiB0fXZhciBpPWMoXCIuL2hlbHBlcnNcIiksbT1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+dHxlPDwzMi10fSx2PWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj50fTtkLmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIGkuaGFzaChlLG8sMzIsITApfX0uY2FsbCh0aGlzLGMoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxjKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvc2hhMjU2LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vaGVscGVyc1wiOjQsYnVmZmVyOjMsbFlwb0kyOjExfV0sMTA6W2Z1bmN0aW9uKGUsdCxmKXshZnVuY3Rpb24oZSx0LG4scixvLGksdSxzLGEpe2YucmVhZD1mdW5jdGlvbihlLHQsbixyLG8pe3ZhciBpLHUsbD04Km8tci0xLGM9KDE8PGwpLTEsZD1jPj4xLHM9LTcsYT1uP28tMTowLGY9bj8tMToxLG89ZVt0K2FdO2ZvcihhKz1mLGk9byYoMTw8LXMpLTEsbz4+PS1zLHMrPWw7MDxzO2k9MjU2KmkrZVt0K2FdLGErPWYscy09OCk7Zm9yKHU9aSYoMTw8LXMpLTEsaT4+PS1zLHMrPXI7MDxzO3U9MjU2KnUrZVt0K2FdLGErPWYscy09OCk7aWYoMD09PWkpaT0xLWQ7ZWxzZXtpZihpPT09YylyZXR1cm4gdT9OYU46MS8wKihvPy0xOjEpO3UrPU1hdGgucG93KDIsciksaS09ZH1yZXR1cm4obz8tMToxKSp1Kk1hdGgucG93KDIsaS1yKX0sZi53cml0ZT1mdW5jdGlvbihlLHQsbCxuLHIsYyl7dmFyIG8saSx1PTgqYy1yLTEscz0oMTw8dSktMSxhPXM+PjEsZD0yMz09PXI/TWF0aC5wb3coMiwtMjQpLU1hdGgucG93KDIsLTc3KTowLGY9bj8wOmMtMSxoPW4/MTotMSxjPXQ8MHx8MD09PXQmJjEvdDwwPzE6MDtmb3IodD1NYXRoLmFicyh0KSxpc05hTih0KXx8dD09PTEvMD8oaT1pc05hTih0KT8xOjAsbz1zKToobz1NYXRoLmZsb29yKE1hdGgubG9nKHQpL01hdGguTE4yKSx0KihuPU1hdGgucG93KDIsLW8pKTwxJiYoby0tLG4qPTIpLDI8PSh0Kz0xPD1vK2E/ZC9uOmQqTWF0aC5wb3coMiwxLWEpKSpuJiYobysrLG4vPTIpLHM8PW8rYT8oaT0wLG89cyk6MTw9bythPyhpPSh0Km4tMSkqTWF0aC5wb3coMixyKSxvKz1hKTooaT10Kk1hdGgucG93KDIsYS0xKSpNYXRoLnBvdygyLHIpLG89MCkpOzg8PXI7ZVtsK2ZdPTI1NSZpLGYrPWgsaS89MjU2LHItPTgpO2ZvcihvPW88PHJ8aSx1Kz1yOzA8dTtlW2wrZl09MjU1Jm8sZis9aCxvLz0yNTYsdS09OCk7ZVtsK2YtaF18PTEyOCpjfX0uY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2llZWU3NTRcIil9LHtidWZmZXI6MyxsWXBvSTI6MTF9XSwxMTpbZnVuY3Rpb24oZSxoLHQpeyFmdW5jdGlvbihlLHQsbixyLG8sZixsLGMsZCl7dmFyIGksdSxzO2Z1bmN0aW9uIGEoKXt9KGU9aC5leHBvcnRzPXt9KS5uZXh0VGljaz0odT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuc2V0SW1tZWRpYXRlLHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93LnBvc3RNZXNzYWdlJiZ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcix1P2Z1bmN0aW9uKGUpe3JldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGUpfTpzPyhpPVtdLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGZ1bmN0aW9uKGUpe3ZhciB0PWUuc291cmNlO3QhPT13aW5kb3cmJm51bGwhPT10fHxcInByb2Nlc3MtdGlja1wiIT09ZS5kYXRhfHwoZS5zdG9wUHJvcGFnYXRpb24oKSwwPGkubGVuZ3RoJiZpLnNoaWZ0KCkoKSl9LCEwKSxmdW5jdGlvbihlKXtpLnB1c2goZSksd2luZG93LnBvc3RNZXNzYWdlKFwicHJvY2Vzcy10aWNrXCIsXCIqXCIpfSk6ZnVuY3Rpb24oZSl7c2V0VGltZW91dChlLDApfSksZS50aXRsZT1cImJyb3dzZXJcIixlLmJyb3dzZXI9ITAsZS5lbnY9e30sZS5hcmd2PVtdLGUub249YSxlLmFkZExpc3RlbmVyPWEsZS5vbmNlPWEsZS5vZmY9YSxlLnJlbW92ZUxpc3RlbmVyPWEsZS5yZW1vdmVBbGxMaXN0ZW5lcnM9YSxlLmVtaXQ9YSxlLmJpbmRpbmc9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWRcIil9LGUuY3dkPWZ1bmN0aW9uKCl7cmV0dXJuXCIvXCJ9LGUuY2hkaXI9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkXCIpfX0uY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzc1wiKX0se2J1ZmZlcjozLGxZcG9JMjoxMX1dfSx7fSxbMV0pKDEpfSk7IiwiZXhwb3J0IGNvbnN0IGZvcndhcmRDb250ZXh0TWVudUNsaWNrcyA9ICgpID0+IHtcbiAgY2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoKGluZm8sIHRhYikgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdpbmZvJywgaW5mbylcbiAgICBpZiAoaW5mby5tZW51SXRlbUlkID09PSAnc2V0dGluZ3MnKSB7XG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoe1xuICAgICAgICB1cmw6IGNocm9tZS5ydW50aW1lLmdldFVSTCgnL3NyYy9wYWdlcy9zZXR0aW5ncy9pbmRleC5odG1sJyksXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBpbmZvLnNlbGVjdGlvblRleHRcbiAgICAgIGNvbnN0IGlkID0gaW5mby5tZW51SXRlbUlkXG4gICAgICBpZiAodGFiPy5pZClcbiAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiLmlkLCB7XG4gICAgICAgICAgYWN0aW9uOiAnZm9yd2FyZC1jb250ZXh0LW1lbnUtY2xpY2snLFxuICAgICAgICAgIHBheWxvYWQ6IHsgc2VsZWN0ZWRUZXh0LCBpZCB9LFxuICAgICAgICB9KVxuICAgIH1cbiAgfSlcbn1cbiIsIi8qKlxuICogV2UgZmV0Y2ggdGhlIHNob3J0Y3V0IGFzc2lnbmVkIHRvIHNpZGViYXIgZnJvbSBjaHJvbWUuY29tbWFuZHMuZ2V0QWxsXG4gKiBhbmQgc2VuZCBpdCB0byBjbGllbnQgdmlhIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlLlxuICpcbiAqIFdlIGFyZSBkb2luZyB0aGlzIGJlY2F1c2Ugd2UgY2Fubm90IGRpcmVjdGx5IGFjY2VzcyB0aGUgY2hyb21lLmNvbW1hbmRzXG4gKiBmcm9tIHRoZSBjb250ZW50IHNjcmlwdC5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlbmRTaWRlYmFyU2hvcnRjdXQgPSAoKSA9PiB7XG4gIGNocm9tZS5jb21tYW5kcy5nZXRBbGwoZnVuY3Rpb24gKGNvbW1hbmRzKSB7XG4gICAgLy8gR2V0IHNob3J0Y3V0XG4gICAgY29uc3Qgc2hvcnRjdXQgPSBjb21tYW5kcy5maW5kKChjKSA9PiBjLm5hbWUgPT09ICdvcGVuLXNpZGViYXInKT8uc2hvcnRjdXRcblxuICAgIC8vIFNlbmQgc2hvcnRjdXQgdG8gY2xpZW50XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIGlmICh0YWJzWzBdLmlkKVxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7XG4gICAgICAgICAgYWN0aW9uOiAnc2lkZWJhci1zaG9ydGN1dCcsXG4gICAgICAgICAgc2hvcnRjdXQsXG4gICAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cbiIsIi8qKlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIGFsbCB0aGUgbGlzdGVuZXJzIHRoYXQgdG9nZ2xlIHRoZSBzaWRlYmFyLlxuICogVGhlIHNpZGViYXIgY2FuIGJlIHRvZ2dsZWQgYnk6XG4gKiAxKSBDbGlja2luZyBvbiB0aGUgZXh0ZW5zaW9uIGljb25cbiAqIDIpIFByZXNzaW5nIHRoZSBrZXlib2FyZCBzaG9ydGN1dFxuICogMykgUHJvZ3JhbW1hdGljYWxseSB2aWEgdGhlIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZSBsaXN0ZW5lclxuICogICAgKHVzZWQgYnkgdGhlIGNsb3NlIGJ1dHRvbiBpbiB0aGUgc2lkZWJhcilcbiAqL1xuZXhwb3J0IGNvbnN0IHNpZGViYXJUb2dnbGVMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gIC8vIFRvZ2dsZSBzaWRlYmFyIHdoZW4gdXNlciBwZXJmb3JtcyBhIGtleWJvYXJkIHNob3J0Y3V0XG4gIGNocm9tZS5jb21tYW5kcy5vbkNvbW1hbmQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKGNvbW1hbmQpIHtcbiAgICBjb25zb2xlLmxvZyhg8J+amiBbQ29tbWFuZCBSZWNlaXZlZF0gJHtjb21tYW5kfWApXG4gICAgaWYgKGNvbW1hbmQgPT09ICdvcGVuLXNpZGViYXInKSB7XG4gICAgICB0b2dnbGVTaWRlYmFyKClcbiAgICB9XG4gIH0pXG5cbiAgLy8gVG9nZ2xlIHNpZGViYXIgd2hlbiB1c2VyIGNsaWNrcyBvbiB0aGUgZXh0ZW5zaW9uIGljb25cbiAgY2hyb21lLmFjdGlvbi5vbkNsaWNrZWQuYWRkTGlzdGVuZXIodG9nZ2xlU2lkZWJhcilcblxuICAvLyBUb2dnbGUgc2lkZWJhciBwcm9ncmFtbWF0aWNhbGx5XG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoXG4gICAgbWVzc2FnZSxcbiAgICBfc2VuZGVyLFxuICAgIHNlbmRSZXNwb25zZSxcbiAgKSB7XG4gICAgaWYgKFxuICAgICAgbWVzc2FnZS5hY3Rpb24gPT09ICdjbG9zZS1zaWRlYmFyJyB8fFxuICAgICAgbWVzc2FnZS5hY3Rpb24gPT09ICdvcGVuLXNpZGViYXInXG4gICAgKSB7XG4gICAgICB0b2dnbGVTaWRlYmFyKClcbiAgICB9XG4gICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAnZ2VuZXJhdGUnKSB7XG4gICAgICBtZXNzYWdlLnByb21wdFxuICAgIH1cbiAgICBzZW5kUmVzcG9uc2UoeyBhY3Rpb246ICdjbG9zZS1zaWRlYmFyJyB9KVxuICB9KVxufVxuXG5jb25zdCB0b2dnbGVTaWRlYmFyID0gKCkgPT4ge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIGlmICh0YWJzWzBdLmlkKSB7XG4gICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7IGFjdGlvbjogJ29wZW4tc2lkZWJhcicgfSlcbiAgICB9XG4gIH0pXG59XG4iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMubWFwIn0=
 globalThis.define=__define;  })(globalThis.define);