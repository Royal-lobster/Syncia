var background = function() {
  "use strict";
  function defineBackground(arg) {
    if (arg == null || typeof arg === "function") return { main: arg };
    return arg;
  }
  var _MatchPattern = class {
    constructor(matchPattern) {
      if (matchPattern === "<all_urls>") {
        this.isAllUrls = true;
        this.protocolMatches = [..._MatchPattern.PROTOCOLS];
        this.hostnameMatch = "*";
        this.pathnameMatch = "*";
      } else {
        const groups = /(.*):\/\/(.*?)(\/.*)/.exec(matchPattern);
        if (groups == null)
          throw new InvalidMatchPattern(matchPattern, "Incorrect format");
        const [_, protocol, hostname, pathname] = groups;
        validateProtocol(matchPattern, protocol);
        validateHostname(matchPattern, hostname);
        this.protocolMatches = protocol === "*" ? ["http", "https"] : [protocol];
        this.hostnameMatch = hostname;
        this.pathnameMatch = pathname;
      }
    }
    includes(url) {
      if (this.isAllUrls)
        return true;
      const u = typeof url === "string" ? new URL(url) : url instanceof Location ? new URL(url.href) : url;
      return !!this.protocolMatches.find((protocol) => {
        if (protocol === "http")
          return this.isHttpMatch(u);
        if (protocol === "https")
          return this.isHttpsMatch(u);
        if (protocol === "file")
          return this.isFileMatch(u);
        if (protocol === "ftp")
          return this.isFtpMatch(u);
        if (protocol === "urn")
          return this.isUrnMatch(u);
      });
    }
    isHttpMatch(url) {
      return url.protocol === "http:" && this.isHostPathMatch(url);
    }
    isHttpsMatch(url) {
      return url.protocol === "https:" && this.isHostPathMatch(url);
    }
    isHostPathMatch(url) {
      if (!this.hostnameMatch || !this.pathnameMatch)
        return false;
      const hostnameMatchRegexs = [
        this.convertPatternToRegex(this.hostnameMatch),
        this.convertPatternToRegex(this.hostnameMatch.replace(/^\*\./, ""))
      ];
      const pathnameMatchRegex = this.convertPatternToRegex(this.pathnameMatch);
      return !!hostnameMatchRegexs.find((regex) => regex.test(url.hostname)) && pathnameMatchRegex.test(url.pathname);
    }
    isFileMatch(url) {
      throw Error("Not implemented: file:// pattern matching. Open a PR to add support");
    }
    isFtpMatch(url) {
      throw Error("Not implemented: ftp:// pattern matching. Open a PR to add support");
    }
    isUrnMatch(url) {
      throw Error("Not implemented: urn:// pattern matching. Open a PR to add support");
    }
    convertPatternToRegex(pattern) {
      const escaped = this.escapeForRegex(pattern);
      const starsReplaced = escaped.replace(/\\\*/g, ".*");
      return RegExp(`^${starsReplaced}$`);
    }
    escapeForRegex(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  };
  var MatchPattern = _MatchPattern;
  MatchPattern.PROTOCOLS = ["http", "https", "file", "ftp", "urn"];
  var InvalidMatchPattern = class extends Error {
    constructor(matchPattern, reason) {
      super(`Invalid match pattern "${matchPattern}": ${reason}`);
    }
  };
  function validateProtocol(matchPattern, protocol) {
    if (!MatchPattern.PROTOCOLS.includes(protocol) && protocol !== "*")
      throw new InvalidMatchPattern(
        matchPattern,
        `${protocol} not a valid protocol (${MatchPattern.PROTOCOLS.join(", ")})`
      );
  }
  function validateHostname(matchPattern, hostname) {
    if (hostname.includes(":"))
      throw new InvalidMatchPattern(matchPattern, `Hostname cannot include a port`);
    if (hostname.includes("*") && hostname.length > 1 && !hostname.startsWith("*."))
      throw new InvalidMatchPattern(
        matchPattern,
        `If using a wildcard (*), it must go at the start of the hostname`
      );
  }
  const logoText = " ____                   _\n/ ___| _   _ _ __   ___(_) __ _\n\\___ \\| | | | '_ \\ / __| |/ _` |\n ___) | |_| | | | | (__| | (_| |\n|____/ \\__, |_| |_|\\___|_|\\__,_|\n       |___/";
  const msgText = (msg) => `
${" ".repeat(14 - msg.length / 2)}[${msg}]`;
  const backgroundLog = () => {
    console.log(logoText, msgText("Background Loaded"));
  };
  background;
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var lib = {};
  var dedent = { exports: {} };
  var hasRequiredDedent;
  function requireDedent() {
    if (hasRequiredDedent) return dedent.exports;
    hasRequiredDedent = 1;
    (function(module) {
      function dedent2(strings) {
        var raw = void 0;
        if (typeof strings === "string") {
          raw = [strings];
        } else {
          raw = strings.raw;
        }
        var result2 = "";
        for (var i = 0; i < raw.length; i++) {
          result2 += raw[i].replace(/\\\n[ \t]*/g, "").replace(/\\`/g, "`");
          if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
            result2 += arguments.length <= i + 1 ? void 0 : arguments[i + 1];
          }
        }
        var lines = result2.split("\n");
        var mindent = null;
        lines.forEach(function(l) {
          var m = l.match(/^(\s+)\S+/);
          if (m) {
            var indent = m[1].length;
            if (!mindent) {
              mindent = indent;
            } else {
              mindent = Math.min(mindent, indent);
            }
          }
        });
        if (mindent !== null) {
          result2 = lines.map(function(l) {
            return l[0] === " " ? l.slice(mindent) : l;
          }).join("\n");
        }
        result2 = result2.trim();
        return result2.replace(/\\n/g, "\n");
      }
      {
        module.exports = dedent2;
      }
    })(dedent);
    return dedent.exports;
  }
  var objectorarray;
  var hasRequiredObjectorarray;
  function requireObjectorarray() {
    if (hasRequiredObjectorarray) return objectorarray;
    hasRequiredObjectorarray = 1;
    objectorarray = (val) => {
      return val != null && typeof val === "object" && val.constructor !== RegExp;
    };
    return objectorarray;
  }
  var parse;
  var hasRequiredParse;
  function requireParse() {
    if (hasRequiredParse) return parse;
    hasRequiredParse = 1;
    function Parse(data) {
      if (!(this instanceof Parse)) {
        return new Parse(data);
      }
      this.err = null;
      this.value = null;
      try {
        this.value = JSON.parse(data);
      } catch (err) {
        this.err = err;
      }
    }
    parse = Parse;
    return parse;
  }
  var hasRequiredLib;
  function requireLib() {
    if (hasRequiredLib) return lib;
    hasRequiredLib = 1;
    var __importDefault = lib.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(lib, "__esModule", { value: true });
    const dedent_1 = __importDefault(requireDedent());
    const objectorarray_1 = __importDefault(requireObjectorarray());
    const fast_json_parse_1 = __importDefault(requireParse());
    const ENDENT_ID = "twhZNwxI1aFG3r4";
    function endent2(strings, ...values) {
      let result2 = "";
      for (let i = 0; i < strings.length; i++) {
        result2 += strings[i];
        if (i < values.length) {
          let value = values[i];
          let isJson = false;
          if (fast_json_parse_1.default(value).value) {
            value = fast_json_parse_1.default(value).value;
            isJson = true;
          }
          if (value && value[ENDENT_ID] || isJson) {
            let rawlines = result2.split("\n");
            let l = rawlines[rawlines.length - 1].search(/\S/);
            let endentation = l > 0 ? " ".repeat(l) : "";
            let valueJson = isJson ? JSON.stringify(value, null, 2) : value[ENDENT_ID];
            let valueLines = valueJson.split("\n");
            valueLines.forEach((l2, index) => {
              if (index > 0) {
                result2 += "\n" + endentation + l2;
              } else {
                result2 += l2;
              }
            });
          } else if (typeof value === "string" && value.includes("\n")) {
            let endentations = result2.match(/(?:^|\n)( *)$/);
            if (typeof value === "string") {
              let endentation = endentations ? endentations[1] : "";
              result2 += value.split("\n").map((str, i2) => {
                str = ENDENT_ID + str;
                return i2 === 0 ? str : `${endentation}${str}`;
              }).join("\n");
            } else {
              result2 += value;
            }
          } else {
            result2 += value;
          }
        }
      }
      result2 = dedent_1.default(result2);
      return result2.split(ENDENT_ID).join("");
    }
    endent2.pretty = (data) => {
      return objectorarray_1.default(data) ? { [ENDENT_ID]: JSON.stringify(data, null, 2) } : data;
    };
    lib.default = endent2;
    return lib;
  }
  var libExports = requireLib();
  const endent = /* @__PURE__ */ getDefaultExportFromCjs(libExports);
  function commonjsRequire(path) {
    throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var object_hash = { exports: {} };
  var hasRequiredObject_hash;
  function requireObject_hash() {
    if (hasRequiredObject_hash) return object_hash.exports;
    hasRequiredObject_hash = 1;
    (function(module, exports) {
      !function(e) {
        module.exports = e();
      }(function() {
        return function r(o, i, u) {
          function s(n, e2) {
            if (!i[n]) {
              if (!o[n]) {
                var t = "function" == typeof commonjsRequire && commonjsRequire;
                if (!e2 && t) return t(n, true);
                if (a) return a(n, true);
                throw new Error("Cannot find module '" + n + "'");
              }
              e2 = i[n] = { exports: {} };
              o[n][0].call(e2.exports, function(e3) {
                var t2 = o[n][1][e3];
                return s(t2 || e3);
              }, e2, e2.exports, r, o, i, u);
            }
            return i[n].exports;
          }
          for (var a = "function" == typeof commonjsRequire && commonjsRequire, e = 0; e < u.length; e++) s(u[e]);
          return s;
        }({ 1: [function(w, b, m) {
          !(function(e, n, s, c, d, h, p, g, y) {
            var r = w("crypto");
            function t(e2, t2) {
              t2 = u(e2, t2);
              var n2;
              return void 0 === (n2 = "passthrough" !== t2.algorithm ? r.createHash(t2.algorithm) : new l()).write && (n2.write = n2.update, n2.end = n2.update), f(t2, n2).dispatch(e2), n2.update || n2.end(""), n2.digest ? n2.digest("buffer" === t2.encoding ? void 0 : t2.encoding) : (e2 = n2.read(), "buffer" !== t2.encoding ? e2.toString(t2.encoding) : e2);
            }
            (m = b.exports = t).sha1 = function(e2) {
              return t(e2);
            }, m.keys = function(e2) {
              return t(e2, { excludeValues: true, algorithm: "sha1", encoding: "hex" });
            }, m.MD5 = function(e2) {
              return t(e2, { algorithm: "md5", encoding: "hex" });
            }, m.keysMD5 = function(e2) {
              return t(e2, { algorithm: "md5", encoding: "hex", excludeValues: true });
            };
            var o = r.getHashes ? r.getHashes().slice() : ["sha1", "md5"], i = (o.push("passthrough"), ["buffer", "hex", "binary", "base64"]);
            function u(e2, t2) {
              var n2 = {};
              if (n2.algorithm = (t2 = t2 || {}).algorithm || "sha1", n2.encoding = t2.encoding || "hex", n2.excludeValues = !!t2.excludeValues, n2.algorithm = n2.algorithm.toLowerCase(), n2.encoding = n2.encoding.toLowerCase(), n2.ignoreUnknown = true === t2.ignoreUnknown, n2.respectType = false !== t2.respectType, n2.respectFunctionNames = false !== t2.respectFunctionNames, n2.respectFunctionProperties = false !== t2.respectFunctionProperties, n2.unorderedArrays = true === t2.unorderedArrays, n2.unorderedSets = false !== t2.unorderedSets, n2.unorderedObjects = false !== t2.unorderedObjects, n2.replacer = t2.replacer || void 0, n2.excludeKeys = t2.excludeKeys || void 0, void 0 === e2) throw new Error("Object argument required.");
              for (var r2 = 0; r2 < o.length; ++r2) o[r2].toLowerCase() === n2.algorithm.toLowerCase() && (n2.algorithm = o[r2]);
              if (-1 === o.indexOf(n2.algorithm)) throw new Error('Algorithm "' + n2.algorithm + '"  not supported. supported values: ' + o.join(", "));
              if (-1 === i.indexOf(n2.encoding) && "passthrough" !== n2.algorithm) throw new Error('Encoding "' + n2.encoding + '"  not supported. supported values: ' + i.join(", "));
              return n2;
            }
            function a(e2) {
              if ("function" == typeof e2) return null != /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e2));
            }
            function f(o2, t2, i2) {
              i2 = i2 || [];
              function u2(e2) {
                return t2.update ? t2.update(e2, "utf8") : t2.write(e2, "utf8");
              }
              return { dispatch: function(e2) {
                return this["_" + (null === (e2 = o2.replacer ? o2.replacer(e2) : e2) ? "null" : typeof e2)](e2);
              }, _object: function(t3) {
                var n2, e2 = Object.prototype.toString.call(t3), r2 = /\[object (.*)\]/i.exec(e2);
                r2 = (r2 = r2 ? r2[1] : "unknown:[" + e2 + "]").toLowerCase();
                if (0 <= (e2 = i2.indexOf(t3))) return this.dispatch("[CIRCULAR:" + e2 + "]");
                if (i2.push(t3), void 0 !== s && s.isBuffer && s.isBuffer(t3)) return u2("buffer:"), u2(t3);
                if ("object" === r2 || "function" === r2 || "asyncfunction" === r2) return e2 = Object.keys(t3), o2.unorderedObjects && (e2 = e2.sort()), false === o2.respectType || a(t3) || e2.splice(0, 0, "prototype", "__proto__", "constructor"), o2.excludeKeys && (e2 = e2.filter(function(e3) {
                  return !o2.excludeKeys(e3);
                })), u2("object:" + e2.length + ":"), n2 = this, e2.forEach(function(e3) {
                  n2.dispatch(e3), u2(":"), o2.excludeValues || n2.dispatch(t3[e3]), u2(",");
                });
                if (!this["_" + r2]) {
                  if (o2.ignoreUnknown) return u2("[" + r2 + "]");
                  throw new Error('Unknown object type "' + r2 + '"');
                }
                this["_" + r2](t3);
              }, _array: function(e2, t3) {
                t3 = void 0 !== t3 ? t3 : false !== o2.unorderedArrays;
                var n2 = this;
                if (u2("array:" + e2.length + ":"), !t3 || e2.length <= 1) return e2.forEach(function(e3) {
                  return n2.dispatch(e3);
                });
                var r2 = [], t3 = e2.map(function(e3) {
                  var t4 = new l(), n3 = i2.slice();
                  return f(o2, t4, n3).dispatch(e3), r2 = r2.concat(n3.slice(i2.length)), t4.read().toString();
                });
                return i2 = i2.concat(r2), t3.sort(), this._array(t3, false);
              }, _date: function(e2) {
                return u2("date:" + e2.toJSON());
              }, _symbol: function(e2) {
                return u2("symbol:" + e2.toString());
              }, _error: function(e2) {
                return u2("error:" + e2.toString());
              }, _boolean: function(e2) {
                return u2("bool:" + e2.toString());
              }, _string: function(e2) {
                u2("string:" + e2.length + ":"), u2(e2.toString());
              }, _function: function(e2) {
                u2("fn:"), a(e2) ? this.dispatch("[native]") : this.dispatch(e2.toString()), false !== o2.respectFunctionNames && this.dispatch("function-name:" + String(e2.name)), o2.respectFunctionProperties && this._object(e2);
              }, _number: function(e2) {
                return u2("number:" + e2.toString());
              }, _xml: function(e2) {
                return u2("xml:" + e2.toString());
              }, _null: function() {
                return u2("Null");
              }, _undefined: function() {
                return u2("Undefined");
              }, _regexp: function(e2) {
                return u2("regex:" + e2.toString());
              }, _uint8array: function(e2) {
                return u2("uint8array:"), this.dispatch(Array.prototype.slice.call(e2));
              }, _uint8clampedarray: function(e2) {
                return u2("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(e2));
              }, _int8array: function(e2) {
                return u2("int8array:"), this.dispatch(Array.prototype.slice.call(e2));
              }, _uint16array: function(e2) {
                return u2("uint16array:"), this.dispatch(Array.prototype.slice.call(e2));
              }, _int16array: function(e2) {
                return u2("int16array:"), this.dispatch(Array.prototype.slice.call(e2));
              }, _uint32array: function(e2) {
                return u2("uint32array:"), this.dispatch(Array.prototype.slice.call(e2));
              }, _int32array: function(e2) {
                return u2("int32array:"), this.dispatch(Array.prototype.slice.call(e2));
              }, _float32array: function(e2) {
                return u2("float32array:"), this.dispatch(Array.prototype.slice.call(e2));
              }, _float64array: function(e2) {
                return u2("float64array:"), this.dispatch(Array.prototype.slice.call(e2));
              }, _arraybuffer: function(e2) {
                return u2("arraybuffer:"), this.dispatch(new Uint8Array(e2));
              }, _url: function(e2) {
                return u2("url:" + e2.toString());
              }, _map: function(e2) {
                u2("map:");
                e2 = Array.from(e2);
                return this._array(e2, false !== o2.unorderedSets);
              }, _set: function(e2) {
                u2("set:");
                e2 = Array.from(e2);
                return this._array(e2, false !== o2.unorderedSets);
              }, _file: function(e2) {
                return u2("file:"), this.dispatch([e2.name, e2.size, e2.type, e2.lastModfied]);
              }, _blob: function() {
                if (o2.ignoreUnknown) return u2("[blob]");
                throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n');
              }, _domwindow: function() {
                return u2("domwindow");
              }, _bigint: function(e2) {
                return u2("bigint:" + e2.toString());
              }, _process: function() {
                return u2("process");
              }, _timer: function() {
                return u2("timer");
              }, _pipe: function() {
                return u2("pipe");
              }, _tcp: function() {
                return u2("tcp");
              }, _udp: function() {
                return u2("udp");
              }, _tty: function() {
                return u2("tty");
              }, _statwatcher: function() {
                return u2("statwatcher");
              }, _securecontext: function() {
                return u2("securecontext");
              }, _connection: function() {
                return u2("connection");
              }, _zlib: function() {
                return u2("zlib");
              }, _context: function() {
                return u2("context");
              }, _nodescript: function() {
                return u2("nodescript");
              }, _httpparser: function() {
                return u2("httpparser");
              }, _dataview: function() {
                return u2("dataview");
              }, _signal: function() {
                return u2("signal");
              }, _fsevent: function() {
                return u2("fsevent");
              }, _tlswrap: function() {
                return u2("tlswrap");
              } };
            }
            function l() {
              return { buf: "", write: function(e2) {
                this.buf += e2;
              }, end: function(e2) {
                this.buf += e2;
              }, read: function() {
                return this.buf;
              } };
            }
            m.writeToStream = function(e2, t2, n2) {
              return void 0 === n2 && (n2 = t2, t2 = {}), f(t2 = u(e2, t2), n2).dispatch(e2);
            };
          }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_9a5aa49d.js", "/");
        }, { buffer: 3, crypto: 5, lYpoI2: 11 }], 2: [function(e, t, f) {
          !(function(e2, t2, n, r, o, i, u, s, a) {
            !function(e3) {
              var a2 = "undefined" != typeof Uint8Array ? Uint8Array : Array, t3 = "+".charCodeAt(0), n2 = "/".charCodeAt(0), r2 = "0".charCodeAt(0), o2 = "a".charCodeAt(0), i2 = "A".charCodeAt(0), u2 = "-".charCodeAt(0), s2 = "_".charCodeAt(0);
              function f2(e4) {
                e4 = e4.charCodeAt(0);
                return e4 === t3 || e4 === u2 ? 62 : e4 === n2 || e4 === s2 ? 63 : e4 < r2 ? -1 : e4 < r2 + 10 ? e4 - r2 + 26 + 26 : e4 < i2 + 26 ? e4 - i2 : e4 < o2 + 26 ? e4 - o2 + 26 : void 0;
              }
              e3.toByteArray = function(e4) {
                var t4, n3;
                if (0 < e4.length % 4) throw new Error("Invalid string. Length must be a multiple of 4");
                var r3 = e4.length, r3 = "=" === e4.charAt(r3 - 2) ? 2 : "=" === e4.charAt(r3 - 1) ? 1 : 0, o3 = new a2(3 * e4.length / 4 - r3), i3 = 0 < r3 ? e4.length - 4 : e4.length, u3 = 0;
                function s3(e5) {
                  o3[u3++] = e5;
                }
                for (t4 = 0; t4 < i3; t4 += 4, 0) s3((16711680 & (n3 = f2(e4.charAt(t4)) << 18 | f2(e4.charAt(t4 + 1)) << 12 | f2(e4.charAt(t4 + 2)) << 6 | f2(e4.charAt(t4 + 3)))) >> 16), s3((65280 & n3) >> 8), s3(255 & n3);
                return 2 == r3 ? s3(255 & (n3 = f2(e4.charAt(t4)) << 2 | f2(e4.charAt(t4 + 1)) >> 4)) : 1 == r3 && (s3((n3 = f2(e4.charAt(t4)) << 10 | f2(e4.charAt(t4 + 1)) << 4 | f2(e4.charAt(t4 + 2)) >> 2) >> 8 & 255), s3(255 & n3)), o3;
              }, e3.fromByteArray = function(e4) {
                var t4, n3, r3, o3, i3 = e4.length % 3, u3 = "";
                function s3(e5) {
                  return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e5);
                }
                for (t4 = 0, r3 = e4.length - i3; t4 < r3; t4 += 3) n3 = (e4[t4] << 16) + (e4[t4 + 1] << 8) + e4[t4 + 2], u3 += s3((o3 = n3) >> 18 & 63) + s3(o3 >> 12 & 63) + s3(o3 >> 6 & 63) + s3(63 & o3);
                switch (i3) {
                  case 1:
                    u3 = (u3 += s3((n3 = e4[e4.length - 1]) >> 2)) + s3(n3 << 4 & 63) + "==";
                    break;
                  case 2:
                    u3 = (u3 = (u3 += s3((n3 = (e4[e4.length - 2] << 8) + e4[e4.length - 1]) >> 10)) + s3(n3 >> 4 & 63)) + s3(n3 << 2 & 63) + "=";
                }
                return u3;
              };
            }(void 0 === f ? this.base64js = {} : f);
          }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib");
        }, { buffer: 3, lYpoI2: 11 }], 3: [function(O, e, H) {
          !(function(e2, n, f, r, h, p, g, y, w) {
            var a = O("base64-js"), i = O("ieee754");
            function f(e3, t2, n2) {
              if (!(this instanceof f)) return new f(e3, t2, n2);
              var r2, o2, i2, u2, s2 = typeof e3;
              if ("base64" === t2 && "string" == s2) for (e3 = (u2 = e3).trim ? u2.trim() : u2.replace(/^\s+|\s+$/g, ""); e3.length % 4 != 0; ) e3 += "=";
              if ("number" == s2) r2 = j(e3);
              else if ("string" == s2) r2 = f.byteLength(e3, t2);
              else {
                if ("object" != s2) throw new Error("First argument needs to be a number, array or string.");
                r2 = j(e3.length);
              }
              if (f._useTypedArrays ? o2 = f._augment(new Uint8Array(r2)) : ((o2 = this).length = r2, o2._isBuffer = true), f._useTypedArrays && "number" == typeof e3.byteLength) o2._set(e3);
              else if (C(u2 = e3) || f.isBuffer(u2) || u2 && "object" == typeof u2 && "number" == typeof u2.length) for (i2 = 0; i2 < r2; i2++) f.isBuffer(e3) ? o2[i2] = e3.readUInt8(i2) : o2[i2] = e3[i2];
              else if ("string" == s2) o2.write(e3, 0, t2);
              else if ("number" == s2 && !f._useTypedArrays && !n2) for (i2 = 0; i2 < r2; i2++) o2[i2] = 0;
              return o2;
            }
            function b(e3, t2, n2, r2) {
              return f._charsWritten = c(function(e4) {
                for (var t3 = [], n3 = 0; n3 < e4.length; n3++) t3.push(255 & e4.charCodeAt(n3));
                return t3;
              }(t2), e3, n2, r2);
            }
            function m(e3, t2, n2, r2) {
              return f._charsWritten = c(function(e4) {
                for (var t3, n3, r3 = [], o2 = 0; o2 < e4.length; o2++) n3 = e4.charCodeAt(o2), t3 = n3 >> 8, n3 = n3 % 256, r3.push(n3), r3.push(t3);
                return r3;
              }(t2), e3, n2, r2);
            }
            function v(e3, t2, n2) {
              var r2 = "";
              n2 = Math.min(e3.length, n2);
              for (var o2 = t2; o2 < n2; o2++) r2 += String.fromCharCode(e3[o2]);
              return r2;
            }
            function o(e3, t2, n2, r2) {
              r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 1 < e3.length, "Trying to read beyond buffer length"));
              var o2, r2 = e3.length;
              if (!(r2 <= t2)) return n2 ? (o2 = e3[t2], t2 + 1 < r2 && (o2 |= e3[t2 + 1] << 8)) : (o2 = e3[t2] << 8, t2 + 1 < r2 && (o2 |= e3[t2 + 1])), o2;
            }
            function u(e3, t2, n2, r2) {
              r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 3 < e3.length, "Trying to read beyond buffer length"));
              var o2, r2 = e3.length;
              if (!(r2 <= t2)) return n2 ? (t2 + 2 < r2 && (o2 = e3[t2 + 2] << 16), t2 + 1 < r2 && (o2 |= e3[t2 + 1] << 8), o2 |= e3[t2], t2 + 3 < r2 && (o2 += e3[t2 + 3] << 24 >>> 0)) : (t2 + 1 < r2 && (o2 = e3[t2 + 1] << 16), t2 + 2 < r2 && (o2 |= e3[t2 + 2] << 8), t2 + 3 < r2 && (o2 |= e3[t2 + 3]), o2 += e3[t2] << 24 >>> 0), o2;
            }
            function _(e3, t2, n2, r2) {
              if (r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 1 < e3.length, "Trying to read beyond buffer length")), !(e3.length <= t2)) return r2 = o(e3, t2, n2, true), 32768 & r2 ? -1 * (65535 - r2 + 1) : r2;
            }
            function E(e3, t2, n2, r2) {
              if (r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 3 < e3.length, "Trying to read beyond buffer length")), !(e3.length <= t2)) return r2 = u(e3, t2, n2, true), 2147483648 & r2 ? -1 * (4294967295 - r2 + 1) : r2;
            }
            function I(e3, t2, n2, r2) {
              return r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(t2 + 3 < e3.length, "Trying to read beyond buffer length")), i.read(e3, t2, n2, 23, 4);
            }
            function A(e3, t2, n2, r2) {
              return r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(t2 + 7 < e3.length, "Trying to read beyond buffer length")), i.read(e3, t2, n2, 52, 8);
            }
            function s(e3, t2, n2, r2, o2) {
              o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 1 < e3.length, "trying to write beyond buffer length"), Y(t2, 65535));
              o2 = e3.length;
              if (!(o2 <= n2)) for (var i2 = 0, u2 = Math.min(o2 - n2, 2); i2 < u2; i2++) e3[n2 + i2] = (t2 & 255 << 8 * (r2 ? i2 : 1 - i2)) >>> 8 * (r2 ? i2 : 1 - i2);
            }
            function l(e3, t2, n2, r2, o2) {
              o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 3 < e3.length, "trying to write beyond buffer length"), Y(t2, 4294967295));
              o2 = e3.length;
              if (!(o2 <= n2)) for (var i2 = 0, u2 = Math.min(o2 - n2, 4); i2 < u2; i2++) e3[n2 + i2] = t2 >>> 8 * (r2 ? i2 : 3 - i2) & 255;
            }
            function B(e3, t2, n2, r2, o2) {
              o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 1 < e3.length, "Trying to write beyond buffer length"), F(t2, 32767, -32768)), e3.length <= n2 || s(e3, 0 <= t2 ? t2 : 65535 + t2 + 1, n2, r2, o2);
            }
            function L(e3, t2, n2, r2, o2) {
              o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 3 < e3.length, "Trying to write beyond buffer length"), F(t2, 2147483647, -2147483648)), e3.length <= n2 || l(e3, 0 <= t2 ? t2 : 4294967295 + t2 + 1, n2, r2, o2);
            }
            function U(e3, t2, n2, r2, o2) {
              o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 3 < e3.length, "Trying to write beyond buffer length"), D(t2, 34028234663852886e22, -34028234663852886e22)), e3.length <= n2 || i.write(e3, t2, n2, r2, 23, 4);
            }
            function x(e3, t2, n2, r2, o2) {
              o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 7 < e3.length, "Trying to write beyond buffer length"), D(t2, 17976931348623157e292, -17976931348623157e292)), e3.length <= n2 || i.write(e3, t2, n2, r2, 52, 8);
            }
            H.Buffer = f, H.SlowBuffer = f, H.INSPECT_MAX_BYTES = 50, f.poolSize = 8192, f._useTypedArrays = function() {
              try {
                var e3 = new ArrayBuffer(0), t2 = new Uint8Array(e3);
                return t2.foo = function() {
                  return 42;
                }, 42 === t2.foo() && "function" == typeof t2.subarray;
              } catch (e4) {
                return false;
              }
            }(), f.isEncoding = function(e3) {
              switch (String(e3).toLowerCase()) {
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
                  return true;
                default:
                  return false;
              }
            }, f.isBuffer = function(e3) {
              return !(null == e3 || !e3._isBuffer);
            }, f.byteLength = function(e3, t2) {
              var n2;
              switch (e3 += "", t2 || "utf8") {
                case "hex":
                  n2 = e3.length / 2;
                  break;
                case "utf8":
                case "utf-8":
                  n2 = T(e3).length;
                  break;
                case "ascii":
                case "binary":
                case "raw":
                  n2 = e3.length;
                  break;
                case "base64":
                  n2 = M(e3).length;
                  break;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  n2 = 2 * e3.length;
                  break;
                default:
                  throw new Error("Unknown encoding");
              }
              return n2;
            }, f.concat = function(e3, t2) {
              if (d(C(e3), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."), 0 === e3.length) return new f(0);
              if (1 === e3.length) return e3[0];
              if ("number" != typeof t2) for (o2 = t2 = 0; o2 < e3.length; o2++) t2 += e3[o2].length;
              for (var n2 = new f(t2), r2 = 0, o2 = 0; o2 < e3.length; o2++) {
                var i2 = e3[o2];
                i2.copy(n2, r2), r2 += i2.length;
              }
              return n2;
            }, f.prototype.write = function(e3, t2, n2, r2) {
              isFinite(t2) ? isFinite(n2) || (r2 = n2, n2 = void 0) : (a2 = r2, r2 = t2, t2 = n2, n2 = a2), t2 = Number(t2) || 0;
              var o2, i2, u2, s2, a2 = this.length - t2;
              switch ((!n2 || a2 < (n2 = Number(n2))) && (n2 = a2), r2 = String(r2 || "utf8").toLowerCase()) {
                case "hex":
                  o2 = function(e4, t3, n3, r3) {
                    n3 = Number(n3) || 0;
                    var o3 = e4.length - n3;
                    (!r3 || o3 < (r3 = Number(r3))) && (r3 = o3), d((o3 = t3.length) % 2 == 0, "Invalid hex string"), o3 / 2 < r3 && (r3 = o3 / 2);
                    for (var i3 = 0; i3 < r3; i3++) {
                      var u3 = parseInt(t3.substr(2 * i3, 2), 16);
                      d(!isNaN(u3), "Invalid hex string"), e4[n3 + i3] = u3;
                    }
                    return f._charsWritten = 2 * i3, i3;
                  }(this, e3, t2, n2);
                  break;
                case "utf8":
                case "utf-8":
                  i2 = this, u2 = t2, s2 = n2, o2 = f._charsWritten = c(T(e3), i2, u2, s2);
                  break;
                case "ascii":
                case "binary":
                  o2 = b(this, e3, t2, n2);
                  break;
                case "base64":
                  i2 = this, u2 = t2, s2 = n2, o2 = f._charsWritten = c(M(e3), i2, u2, s2);
                  break;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  o2 = m(this, e3, t2, n2);
                  break;
                default:
                  throw new Error("Unknown encoding");
              }
              return o2;
            }, f.prototype.toString = function(e3, t2, n2) {
              var r2, o2, i2, u2, s2 = this;
              if (e3 = String(e3 || "utf8").toLowerCase(), t2 = Number(t2) || 0, (n2 = void 0 !== n2 ? Number(n2) : s2.length) === t2) return "";
              switch (e3) {
                case "hex":
                  r2 = function(e4, t3, n3) {
                    var r3 = e4.length;
                    (!t3 || t3 < 0) && (t3 = 0);
                    (!n3 || n3 < 0 || r3 < n3) && (n3 = r3);
                    for (var o3 = "", i3 = t3; i3 < n3; i3++) o3 += k(e4[i3]);
                    return o3;
                  }(s2, t2, n2);
                  break;
                case "utf8":
                case "utf-8":
                  r2 = function(e4, t3, n3) {
                    var r3 = "", o3 = "";
                    n3 = Math.min(e4.length, n3);
                    for (var i3 = t3; i3 < n3; i3++) e4[i3] <= 127 ? (r3 += N(o3) + String.fromCharCode(e4[i3]), o3 = "") : o3 += "%" + e4[i3].toString(16);
                    return r3 + N(o3);
                  }(s2, t2, n2);
                  break;
                case "ascii":
                case "binary":
                  r2 = v(s2, t2, n2);
                  break;
                case "base64":
                  o2 = s2, u2 = n2, r2 = 0 === (i2 = t2) && u2 === o2.length ? a.fromByteArray(o2) : a.fromByteArray(o2.slice(i2, u2));
                  break;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  r2 = function(e4, t3, n3) {
                    for (var r3 = e4.slice(t3, n3), o3 = "", i3 = 0; i3 < r3.length; i3 += 2) o3 += String.fromCharCode(r3[i3] + 256 * r3[i3 + 1]);
                    return o3;
                  }(s2, t2, n2);
                  break;
                default:
                  throw new Error("Unknown encoding");
              }
              return r2;
            }, f.prototype.toJSON = function() {
              return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
            }, f.prototype.copy = function(e3, t2, n2, r2) {
              if (t2 = t2 || 0, (r2 = r2 || 0 === r2 ? r2 : this.length) !== (n2 = n2 || 0) && 0 !== e3.length && 0 !== this.length) {
                d(n2 <= r2, "sourceEnd < sourceStart"), d(0 <= t2 && t2 < e3.length, "targetStart out of bounds"), d(0 <= n2 && n2 < this.length, "sourceStart out of bounds"), d(0 <= r2 && r2 <= this.length, "sourceEnd out of bounds"), r2 > this.length && (r2 = this.length);
                var o2 = (r2 = e3.length - t2 < r2 - n2 ? e3.length - t2 + n2 : r2) - n2;
                if (o2 < 100 || !f._useTypedArrays) for (var i2 = 0; i2 < o2; i2++) e3[i2 + t2] = this[i2 + n2];
                else e3._set(this.subarray(n2, n2 + o2), t2);
              }
            }, f.prototype.slice = function(e3, t2) {
              var n2 = this.length;
              if (e3 = S(e3, n2, 0), t2 = S(t2, n2, n2), f._useTypedArrays) return f._augment(this.subarray(e3, t2));
              for (var r2 = t2 - e3, o2 = new f(r2, void 0, true), i2 = 0; i2 < r2; i2++) o2[i2] = this[i2 + e3];
              return o2;
            }, f.prototype.get = function(e3) {
              return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e3);
            }, f.prototype.set = function(e3, t2) {
              return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e3, t2);
            }, f.prototype.readUInt8 = function(e3, t2) {
              if (t2 || (d(null != e3, "missing offset"), d(e3 < this.length, "Trying to read beyond buffer length")), !(e3 >= this.length)) return this[e3];
            }, f.prototype.readUInt16LE = function(e3, t2) {
              return o(this, e3, true, t2);
            }, f.prototype.readUInt16BE = function(e3, t2) {
              return o(this, e3, false, t2);
            }, f.prototype.readUInt32LE = function(e3, t2) {
              return u(this, e3, true, t2);
            }, f.prototype.readUInt32BE = function(e3, t2) {
              return u(this, e3, false, t2);
            }, f.prototype.readInt8 = function(e3, t2) {
              if (t2 || (d(null != e3, "missing offset"), d(e3 < this.length, "Trying to read beyond buffer length")), !(e3 >= this.length)) return 128 & this[e3] ? -1 * (255 - this[e3] + 1) : this[e3];
            }, f.prototype.readInt16LE = function(e3, t2) {
              return _(this, e3, true, t2);
            }, f.prototype.readInt16BE = function(e3, t2) {
              return _(this, e3, false, t2);
            }, f.prototype.readInt32LE = function(e3, t2) {
              return E(this, e3, true, t2);
            }, f.prototype.readInt32BE = function(e3, t2) {
              return E(this, e3, false, t2);
            }, f.prototype.readFloatLE = function(e3, t2) {
              return I(this, e3, true, t2);
            }, f.prototype.readFloatBE = function(e3, t2) {
              return I(this, e3, false, t2);
            }, f.prototype.readDoubleLE = function(e3, t2) {
              return A(this, e3, true, t2);
            }, f.prototype.readDoubleBE = function(e3, t2) {
              return A(this, e3, false, t2);
            }, f.prototype.writeUInt8 = function(e3, t2, n2) {
              n2 || (d(null != e3, "missing value"), d(null != t2, "missing offset"), d(t2 < this.length, "trying to write beyond buffer length"), Y(e3, 255)), t2 >= this.length || (this[t2] = e3);
            }, f.prototype.writeUInt16LE = function(e3, t2, n2) {
              s(this, e3, t2, true, n2);
            }, f.prototype.writeUInt16BE = function(e3, t2, n2) {
              s(this, e3, t2, false, n2);
            }, f.prototype.writeUInt32LE = function(e3, t2, n2) {
              l(this, e3, t2, true, n2);
            }, f.prototype.writeUInt32BE = function(e3, t2, n2) {
              l(this, e3, t2, false, n2);
            }, f.prototype.writeInt8 = function(e3, t2, n2) {
              n2 || (d(null != e3, "missing value"), d(null != t2, "missing offset"), d(t2 < this.length, "Trying to write beyond buffer length"), F(e3, 127, -128)), t2 >= this.length || (0 <= e3 ? this.writeUInt8(e3, t2, n2) : this.writeUInt8(255 + e3 + 1, t2, n2));
            }, f.prototype.writeInt16LE = function(e3, t2, n2) {
              B(this, e3, t2, true, n2);
            }, f.prototype.writeInt16BE = function(e3, t2, n2) {
              B(this, e3, t2, false, n2);
            }, f.prototype.writeInt32LE = function(e3, t2, n2) {
              L(this, e3, t2, true, n2);
            }, f.prototype.writeInt32BE = function(e3, t2, n2) {
              L(this, e3, t2, false, n2);
            }, f.prototype.writeFloatLE = function(e3, t2, n2) {
              U(this, e3, t2, true, n2);
            }, f.prototype.writeFloatBE = function(e3, t2, n2) {
              U(this, e3, t2, false, n2);
            }, f.prototype.writeDoubleLE = function(e3, t2, n2) {
              x(this, e3, t2, true, n2);
            }, f.prototype.writeDoubleBE = function(e3, t2, n2) {
              x(this, e3, t2, false, n2);
            }, f.prototype.fill = function(e3, t2, n2) {
              if (t2 = t2 || 0, n2 = n2 || this.length, d("number" == typeof (e3 = "string" == typeof (e3 = e3 || 0) ? e3.charCodeAt(0) : e3) && !isNaN(e3), "value is not a number"), d(t2 <= n2, "end < start"), n2 !== t2 && 0 !== this.length) {
                d(0 <= t2 && t2 < this.length, "start out of bounds"), d(0 <= n2 && n2 <= this.length, "end out of bounds");
                for (var r2 = t2; r2 < n2; r2++) this[r2] = e3;
              }
            }, f.prototype.inspect = function() {
              for (var e3 = [], t2 = this.length, n2 = 0; n2 < t2; n2++) if (e3[n2] = k(this[n2]), n2 === H.INSPECT_MAX_BYTES) {
                e3[n2 + 1] = "...";
                break;
              }
              return "<Buffer " + e3.join(" ") + ">";
            }, f.prototype.toArrayBuffer = function() {
              if ("undefined" == typeof Uint8Array) throw new Error("Buffer.toArrayBuffer not supported in this browser");
              if (f._useTypedArrays) return new f(this).buffer;
              for (var e3 = new Uint8Array(this.length), t2 = 0, n2 = e3.length; t2 < n2; t2 += 1) e3[t2] = this[t2];
              return e3.buffer;
            };
            var t = f.prototype;
            function S(e3, t2, n2) {
              return "number" != typeof e3 ? n2 : t2 <= (e3 = ~~e3) ? t2 : 0 <= e3 || 0 <= (e3 += t2) ? e3 : 0;
            }
            function j(e3) {
              return (e3 = ~~Math.ceil(+e3)) < 0 ? 0 : e3;
            }
            function C(e3) {
              return (Array.isArray || function(e4) {
                return "[object Array]" === Object.prototype.toString.call(e4);
              })(e3);
            }
            function k(e3) {
              return e3 < 16 ? "0" + e3.toString(16) : e3.toString(16);
            }
            function T(e3) {
              for (var t2 = [], n2 = 0; n2 < e3.length; n2++) {
                var r2 = e3.charCodeAt(n2);
                if (r2 <= 127) t2.push(e3.charCodeAt(n2));
                else for (var o2 = n2, i2 = (55296 <= r2 && r2 <= 57343 && n2++, encodeURIComponent(e3.slice(o2, n2 + 1)).substr(1).split("%")), u2 = 0; u2 < i2.length; u2++) t2.push(parseInt(i2[u2], 16));
              }
              return t2;
            }
            function M(e3) {
              return a.toByteArray(e3);
            }
            function c(e3, t2, n2, r2) {
              for (var o2 = 0; o2 < r2 && !(o2 + n2 >= t2.length || o2 >= e3.length); o2++) t2[o2 + n2] = e3[o2];
              return o2;
            }
            function N(e3) {
              try {
                return decodeURIComponent(e3);
              } catch (e4) {
                return String.fromCharCode(65533);
              }
            }
            function Y(e3, t2) {
              d("number" == typeof e3, "cannot write a non-number as a number"), d(0 <= e3, "specified a negative value for writing an unsigned value"), d(e3 <= t2, "value is larger than maximum value for type"), d(Math.floor(e3) === e3, "value has a fractional component");
            }
            function F(e3, t2, n2) {
              d("number" == typeof e3, "cannot write a non-number as a number"), d(e3 <= t2, "value larger than maximum allowed value"), d(n2 <= e3, "value smaller than minimum allowed value"), d(Math.floor(e3) === e3, "value has a fractional component");
            }
            function D(e3, t2, n2) {
              d("number" == typeof e3, "cannot write a non-number as a number"), d(e3 <= t2, "value larger than maximum allowed value"), d(n2 <= e3, "value smaller than minimum allowed value");
            }
            function d(e3, t2) {
              if (!e3) throw new Error(t2 || "Failed assertion");
            }
            f._augment = function(e3) {
              return e3._isBuffer = true, e3._get = e3.get, e3._set = e3.set, e3.get = t.get, e3.set = t.set, e3.write = t.write, e3.toString = t.toString, e3.toLocaleString = t.toString, e3.toJSON = t.toJSON, e3.copy = t.copy, e3.slice = t.slice, e3.readUInt8 = t.readUInt8, e3.readUInt16LE = t.readUInt16LE, e3.readUInt16BE = t.readUInt16BE, e3.readUInt32LE = t.readUInt32LE, e3.readUInt32BE = t.readUInt32BE, e3.readInt8 = t.readInt8, e3.readInt16LE = t.readInt16LE, e3.readInt16BE = t.readInt16BE, e3.readInt32LE = t.readInt32LE, e3.readInt32BE = t.readInt32BE, e3.readFloatLE = t.readFloatLE, e3.readFloatBE = t.readFloatBE, e3.readDoubleLE = t.readDoubleLE, e3.readDoubleBE = t.readDoubleBE, e3.writeUInt8 = t.writeUInt8, e3.writeUInt16LE = t.writeUInt16LE, e3.writeUInt16BE = t.writeUInt16BE, e3.writeUInt32LE = t.writeUInt32LE, e3.writeUInt32BE = t.writeUInt32BE, e3.writeInt8 = t.writeInt8, e3.writeInt16LE = t.writeInt16LE, e3.writeInt16BE = t.writeInt16BE, e3.writeInt32LE = t.writeInt32LE, e3.writeInt32BE = t.writeInt32BE, e3.writeFloatLE = t.writeFloatLE, e3.writeFloatBE = t.writeFloatBE, e3.writeDoubleLE = t.writeDoubleLE, e3.writeDoubleBE = t.writeDoubleBE, e3.fill = t.fill, e3.inspect = t.inspect, e3.toArrayBuffer = t.toArrayBuffer, e3;
            };
          }).call(this, O("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, O("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer");
        }, { "base64-js": 2, buffer: 3, ieee754: 10, lYpoI2: 11 }], 4: [function(c, d, e) {
          !(function(e2, t, a, n, r, o, i, u, s) {
            var a = c("buffer").Buffer, f = 4, l = new a(f);
            l.fill(0);
            d.exports = { hash: function(e3, t2, n2, r2) {
              for (var o2 = t2(function(e4, t3) {
                e4.length % f != 0 && (n3 = e4.length + (f - e4.length % f), e4 = a.concat([e4, l], n3));
                for (var n3, r3 = [], o3 = t3 ? e4.readInt32BE : e4.readInt32LE, i3 = 0; i3 < e4.length; i3 += f) r3.push(o3.call(e4, i3));
                return r3;
              }(e3 = a.isBuffer(e3) ? e3 : new a(e3), r2), 8 * e3.length), t2 = r2, i2 = new a(n2), u2 = t2 ? i2.writeInt32BE : i2.writeInt32LE, s2 = 0; s2 < o2.length; s2++) u2.call(i2, o2[s2], 4 * s2, true);
              return i2;
            } };
          }).call(this, c("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
        }, { buffer: 3, lYpoI2: 11 }], 5: [function(v, e, _) {
          !(function(l, c, u, d, h, p, g, y, w) {
            var u = v("buffer").Buffer, e2 = v("./sha"), t = v("./sha256"), n = v("./rng"), b = { sha1: e2, sha256: t, md5: v("./md5") }, s = 64, a = new u(s);
            function r(e3, n2) {
              var r2 = b[e3 = e3 || "sha1"], o2 = [];
              return r2 || i("algorithm:", e3, "is not yet supported"), { update: function(e4) {
                return u.isBuffer(e4) || (e4 = new u(e4)), o2.push(e4), e4.length, this;
              }, digest: function(e4) {
                var t2 = u.concat(o2), t2 = n2 ? function(e5, t3, n3) {
                  u.isBuffer(t3) || (t3 = new u(t3)), u.isBuffer(n3) || (n3 = new u(n3)), t3.length > s ? t3 = e5(t3) : t3.length < s && (t3 = u.concat([t3, a], s));
                  for (var r3 = new u(s), o3 = new u(s), i2 = 0; i2 < s; i2++) r3[i2] = 54 ^ t3[i2], o3[i2] = 92 ^ t3[i2];
                  return n3 = e5(u.concat([r3, n3])), e5(u.concat([o3, n3]));
                }(r2, n2, t2) : r2(t2);
                return o2 = null, e4 ? t2.toString(e4) : t2;
              } };
            }
            function i() {
              var e3 = [].slice.call(arguments).join(" ");
              throw new Error([e3, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join("\n"));
            }
            a.fill(0), _.createHash = function(e3) {
              return r(e3);
            }, _.createHmac = r, _.randomBytes = function(e3, t2) {
              if (!t2 || !t2.call) return new u(n(e3));
              try {
                t2.call(this, void 0, new u(n(e3)));
              } catch (e4) {
                t2(e4);
              }
            };
            var o, f = ["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], m = function(e3) {
              _[e3] = function() {
                i("sorry,", e3, "is not implemented yet");
              };
            };
            for (o in f) m(f[o]);
          }).call(this, v("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, v("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
        }, { "./md5": 6, "./rng": 7, "./sha": 8, "./sha256": 9, buffer: 3, lYpoI2: 11 }], 6: [function(w, b, e) {
          !(function(e2, r, o, i, u, a, f, l, y) {
            var t = w("./helpers");
            function n(e3, t2) {
              e3[t2 >> 5] |= 128 << t2 % 32, e3[14 + (t2 + 64 >>> 9 << 4)] = t2;
              for (var n2 = 1732584193, r2 = -271733879, o2 = -1732584194, i2 = 271733878, u2 = 0; u2 < e3.length; u2 += 16) {
                var s2 = n2, a2 = r2, f2 = o2, l2 = i2, n2 = c(n2, r2, o2, i2, e3[u2 + 0], 7, -680876936), i2 = c(i2, n2, r2, o2, e3[u2 + 1], 12, -389564586), o2 = c(o2, i2, n2, r2, e3[u2 + 2], 17, 606105819), r2 = c(r2, o2, i2, n2, e3[u2 + 3], 22, -1044525330);
                n2 = c(n2, r2, o2, i2, e3[u2 + 4], 7, -176418897), i2 = c(i2, n2, r2, o2, e3[u2 + 5], 12, 1200080426), o2 = c(o2, i2, n2, r2, e3[u2 + 6], 17, -1473231341), r2 = c(r2, o2, i2, n2, e3[u2 + 7], 22, -45705983), n2 = c(n2, r2, o2, i2, e3[u2 + 8], 7, 1770035416), i2 = c(i2, n2, r2, o2, e3[u2 + 9], 12, -1958414417), o2 = c(o2, i2, n2, r2, e3[u2 + 10], 17, -42063), r2 = c(r2, o2, i2, n2, e3[u2 + 11], 22, -1990404162), n2 = c(n2, r2, o2, i2, e3[u2 + 12], 7, 1804603682), i2 = c(i2, n2, r2, o2, e3[u2 + 13], 12, -40341101), o2 = c(o2, i2, n2, r2, e3[u2 + 14], 17, -1502002290), n2 = d(n2, r2 = c(r2, o2, i2, n2, e3[u2 + 15], 22, 1236535329), o2, i2, e3[u2 + 1], 5, -165796510), i2 = d(i2, n2, r2, o2, e3[u2 + 6], 9, -1069501632), o2 = d(o2, i2, n2, r2, e3[u2 + 11], 14, 643717713), r2 = d(r2, o2, i2, n2, e3[u2 + 0], 20, -373897302), n2 = d(n2, r2, o2, i2, e3[u2 + 5], 5, -701558691), i2 = d(i2, n2, r2, o2, e3[u2 + 10], 9, 38016083), o2 = d(o2, i2, n2, r2, e3[u2 + 15], 14, -660478335), r2 = d(r2, o2, i2, n2, e3[u2 + 4], 20, -405537848), n2 = d(n2, r2, o2, i2, e3[u2 + 9], 5, 568446438), i2 = d(i2, n2, r2, o2, e3[u2 + 14], 9, -1019803690), o2 = d(o2, i2, n2, r2, e3[u2 + 3], 14, -187363961), r2 = d(r2, o2, i2, n2, e3[u2 + 8], 20, 1163531501), n2 = d(n2, r2, o2, i2, e3[u2 + 13], 5, -1444681467), i2 = d(i2, n2, r2, o2, e3[u2 + 2], 9, -51403784), o2 = d(o2, i2, n2, r2, e3[u2 + 7], 14, 1735328473), n2 = h(n2, r2 = d(r2, o2, i2, n2, e3[u2 + 12], 20, -1926607734), o2, i2, e3[u2 + 5], 4, -378558), i2 = h(i2, n2, r2, o2, e3[u2 + 8], 11, -2022574463), o2 = h(o2, i2, n2, r2, e3[u2 + 11], 16, 1839030562), r2 = h(r2, o2, i2, n2, e3[u2 + 14], 23, -35309556), n2 = h(n2, r2, o2, i2, e3[u2 + 1], 4, -1530992060), i2 = h(i2, n2, r2, o2, e3[u2 + 4], 11, 1272893353), o2 = h(o2, i2, n2, r2, e3[u2 + 7], 16, -155497632), r2 = h(r2, o2, i2, n2, e3[u2 + 10], 23, -1094730640), n2 = h(n2, r2, o2, i2, e3[u2 + 13], 4, 681279174), i2 = h(i2, n2, r2, o2, e3[u2 + 0], 11, -358537222), o2 = h(o2, i2, n2, r2, e3[u2 + 3], 16, -722521979), r2 = h(r2, o2, i2, n2, e3[u2 + 6], 23, 76029189), n2 = h(n2, r2, o2, i2, e3[u2 + 9], 4, -640364487), i2 = h(i2, n2, r2, o2, e3[u2 + 12], 11, -421815835), o2 = h(o2, i2, n2, r2, e3[u2 + 15], 16, 530742520), n2 = p(n2, r2 = h(r2, o2, i2, n2, e3[u2 + 2], 23, -995338651), o2, i2, e3[u2 + 0], 6, -198630844), i2 = p(i2, n2, r2, o2, e3[u2 + 7], 10, 1126891415), o2 = p(o2, i2, n2, r2, e3[u2 + 14], 15, -1416354905), r2 = p(r2, o2, i2, n2, e3[u2 + 5], 21, -57434055), n2 = p(n2, r2, o2, i2, e3[u2 + 12], 6, 1700485571), i2 = p(i2, n2, r2, o2, e3[u2 + 3], 10, -1894986606), o2 = p(o2, i2, n2, r2, e3[u2 + 10], 15, -1051523), r2 = p(r2, o2, i2, n2, e3[u2 + 1], 21, -2054922799), n2 = p(n2, r2, o2, i2, e3[u2 + 8], 6, 1873313359), i2 = p(i2, n2, r2, o2, e3[u2 + 15], 10, -30611744), o2 = p(o2, i2, n2, r2, e3[u2 + 6], 15, -1560198380), r2 = p(r2, o2, i2, n2, e3[u2 + 13], 21, 1309151649), n2 = p(n2, r2, o2, i2, e3[u2 + 4], 6, -145523070), i2 = p(i2, n2, r2, o2, e3[u2 + 11], 10, -1120210379), o2 = p(o2, i2, n2, r2, e3[u2 + 2], 15, 718787259), r2 = p(r2, o2, i2, n2, e3[u2 + 9], 21, -343485551), n2 = g(n2, s2), r2 = g(r2, a2), o2 = g(o2, f2), i2 = g(i2, l2);
              }
              return Array(n2, r2, o2, i2);
            }
            function s(e3, t2, n2, r2, o2, i2) {
              return g((t2 = g(g(t2, e3), g(r2, i2))) << o2 | t2 >>> 32 - o2, n2);
            }
            function c(e3, t2, n2, r2, o2, i2, u2) {
              return s(t2 & n2 | ~t2 & r2, e3, t2, o2, i2, u2);
            }
            function d(e3, t2, n2, r2, o2, i2, u2) {
              return s(t2 & r2 | n2 & ~r2, e3, t2, o2, i2, u2);
            }
            function h(e3, t2, n2, r2, o2, i2, u2) {
              return s(t2 ^ n2 ^ r2, e3, t2, o2, i2, u2);
            }
            function p(e3, t2, n2, r2, o2, i2, u2) {
              return s(n2 ^ (t2 | ~r2), e3, t2, o2, i2, u2);
            }
            function g(e3, t2) {
              var n2 = (65535 & e3) + (65535 & t2);
              return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
            }
            b.exports = function(e3) {
              return t.hash(e3, n, 16);
            };
          }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
        }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 7: [function(e, l, t) {
          !(function(e2, t2, n, r, o, i, u, s, f) {
            l.exports = function(e3) {
              for (var t3, n2 = new Array(e3), r2 = 0; r2 < e3; r2++) 0 == (3 & r2) && (t3 = 4294967296 * Math.random()), n2[r2] = t3 >>> ((3 & r2) << 3) & 255;
              return n2;
            };
          }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
        }, { buffer: 3, lYpoI2: 11 }], 8: [function(c, d, e) {
          !(function(e2, t, n, r, o, s, a, f, l) {
            var i = c("./helpers");
            function u(l2, c2) {
              l2[c2 >> 5] |= 128 << 24 - c2 % 32, l2[15 + (c2 + 64 >> 9 << 4)] = c2;
              for (var e3, t2, n2, r2 = Array(80), o2 = 1732584193, i2 = -271733879, u2 = -1732584194, s2 = 271733878, d2 = -1009589776, h = 0; h < l2.length; h += 16) {
                for (var p = o2, g = i2, y = u2, w = s2, b = d2, a2 = 0; a2 < 80; a2++) {
                  r2[a2] = a2 < 16 ? l2[h + a2] : v(r2[a2 - 3] ^ r2[a2 - 8] ^ r2[a2 - 14] ^ r2[a2 - 16], 1);
                  var f2 = m(m(v(o2, 5), (f2 = i2, t2 = u2, n2 = s2, (e3 = a2) < 20 ? f2 & t2 | ~f2 & n2 : !(e3 < 40) && e3 < 60 ? f2 & t2 | f2 & n2 | t2 & n2 : f2 ^ t2 ^ n2)), m(m(d2, r2[a2]), (e3 = a2) < 20 ? 1518500249 : e3 < 40 ? 1859775393 : e3 < 60 ? -1894007588 : -899497514)), d2 = s2, s2 = u2, u2 = v(i2, 30), i2 = o2, o2 = f2;
                }
                o2 = m(o2, p), i2 = m(i2, g), u2 = m(u2, y), s2 = m(s2, w), d2 = m(d2, b);
              }
              return Array(o2, i2, u2, s2, d2);
            }
            function m(e3, t2) {
              var n2 = (65535 & e3) + (65535 & t2);
              return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
            }
            function v(e3, t2) {
              return e3 << t2 | e3 >>> 32 - t2;
            }
            d.exports = function(e3) {
              return i.hash(e3, u, 20, true);
            };
          }).call(this, c("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
        }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 9: [function(c, d, e) {
          !(function(e2, t, n, r, u, s, a, f, l) {
            function b(e3, t2) {
              var n2 = (65535 & e3) + (65535 & t2);
              return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
            }
            function o(e3, l2) {
              var c2, d2 = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), t2 = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), n2 = new Array(64);
              e3[l2 >> 5] |= 128 << 24 - l2 % 32, e3[15 + (l2 + 64 >> 9 << 4)] = l2;
              for (var r2, o2, h = 0; h < e3.length; h += 16) {
                for (var i2 = t2[0], u2 = t2[1], s2 = t2[2], p = t2[3], a2 = t2[4], g = t2[5], y = t2[6], w = t2[7], f2 = 0; f2 < 64; f2++) n2[f2] = f2 < 16 ? e3[f2 + h] : b(b(b((o2 = n2[f2 - 2], m(o2, 17) ^ m(o2, 19) ^ v(o2, 10)), n2[f2 - 7]), (o2 = n2[f2 - 15], m(o2, 7) ^ m(o2, 18) ^ v(o2, 3))), n2[f2 - 16]), c2 = b(b(b(b(w, m(o2 = a2, 6) ^ m(o2, 11) ^ m(o2, 25)), a2 & g ^ ~a2 & y), d2[f2]), n2[f2]), r2 = b(m(r2 = i2, 2) ^ m(r2, 13) ^ m(r2, 22), i2 & u2 ^ i2 & s2 ^ u2 & s2), w = y, y = g, g = a2, a2 = b(p, c2), p = s2, s2 = u2, u2 = i2, i2 = b(c2, r2);
                t2[0] = b(i2, t2[0]), t2[1] = b(u2, t2[1]), t2[2] = b(s2, t2[2]), t2[3] = b(p, t2[3]), t2[4] = b(a2, t2[4]), t2[5] = b(g, t2[5]), t2[6] = b(y, t2[6]), t2[7] = b(w, t2[7]);
              }
              return t2;
            }
            var i = c("./helpers"), m = function(e3, t2) {
              return e3 >>> t2 | e3 << 32 - t2;
            }, v = function(e3, t2) {
              return e3 >>> t2;
            };
            d.exports = function(e3) {
              return i.hash(e3, o, 32, true);
            };
          }).call(this, c("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
        }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 10: [function(e, t, f) {
          !(function(e2, t2, n, r, o, i, u, s, a) {
            f.read = function(e3, t3, n2, r2, o2) {
              var i2, u2, l = 8 * o2 - r2 - 1, c = (1 << l) - 1, d = c >> 1, s2 = -7, a2 = n2 ? o2 - 1 : 0, f2 = n2 ? -1 : 1, o2 = e3[t3 + a2];
              for (a2 += f2, i2 = o2 & (1 << -s2) - 1, o2 >>= -s2, s2 += l; 0 < s2; i2 = 256 * i2 + e3[t3 + a2], a2 += f2, s2 -= 8) ;
              for (u2 = i2 & (1 << -s2) - 1, i2 >>= -s2, s2 += r2; 0 < s2; u2 = 256 * u2 + e3[t3 + a2], a2 += f2, s2 -= 8) ;
              if (0 === i2) i2 = 1 - d;
              else {
                if (i2 === c) return u2 ? NaN : 1 / 0 * (o2 ? -1 : 1);
                u2 += Math.pow(2, r2), i2 -= d;
              }
              return (o2 ? -1 : 1) * u2 * Math.pow(2, i2 - r2);
            }, f.write = function(e3, t3, l, n2, r2, c) {
              var o2, i2, u2 = 8 * c - r2 - 1, s2 = (1 << u2) - 1, a2 = s2 >> 1, d = 23 === r2 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f2 = n2 ? 0 : c - 1, h = n2 ? 1 : -1, c = t3 < 0 || 0 === t3 && 1 / t3 < 0 ? 1 : 0;
              for (t3 = Math.abs(t3), isNaN(t3) || t3 === 1 / 0 ? (i2 = isNaN(t3) ? 1 : 0, o2 = s2) : (o2 = Math.floor(Math.log(t3) / Math.LN2), t3 * (n2 = Math.pow(2, -o2)) < 1 && (o2--, n2 *= 2), 2 <= (t3 += 1 <= o2 + a2 ? d / n2 : d * Math.pow(2, 1 - a2)) * n2 && (o2++, n2 /= 2), s2 <= o2 + a2 ? (i2 = 0, o2 = s2) : 1 <= o2 + a2 ? (i2 = (t3 * n2 - 1) * Math.pow(2, r2), o2 += a2) : (i2 = t3 * Math.pow(2, a2 - 1) * Math.pow(2, r2), o2 = 0)); 8 <= r2; e3[l + f2] = 255 & i2, f2 += h, i2 /= 256, r2 -= 8) ;
              for (o2 = o2 << r2 | i2, u2 += r2; 0 < u2; e3[l + f2] = 255 & o2, f2 += h, o2 /= 256, u2 -= 8) ;
              e3[l + f2 - h] |= 128 * c;
            };
          }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/ieee754/index.js", "/node_modules/gulp-browserify/node_modules/ieee754");
        }, { buffer: 3, lYpoI2: 11 }], 11: [function(e, h, t) {
          !(function(e2, t2, n, r, o, f, l, c, d) {
            var i, u, s;
            function a() {
            }
            (e2 = h.exports = {}).nextTick = (u = "undefined" != typeof window && window.setImmediate, s = "undefined" != typeof window && window.postMessage && window.addEventListener, u ? function(e3) {
              return window.setImmediate(e3);
            } : s ? (i = [], window.addEventListener("message", function(e3) {
              var t3 = e3.source;
              t3 !== window && null !== t3 || "process-tick" !== e3.data || (e3.stopPropagation(), 0 < i.length && i.shift()());
            }, true), function(e3) {
              i.push(e3), window.postMessage("process-tick", "*");
            }) : function(e3) {
              setTimeout(e3, 0);
            }), e2.title = "browser", e2.browser = true, e2.env = {}, e2.argv = [], e2.on = a, e2.addListener = a, e2.once = a, e2.off = a, e2.removeListener = a, e2.removeAllListeners = a, e2.emit = a, e2.binding = function(e3) {
              throw new Error("process.binding is not supported");
            }, e2.cwd = function() {
              return "/";
            }, e2.chdir = function(e3) {
              throw new Error("process.chdir is not supported");
            };
          }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process");
        }, { buffer: 3, lYpoI2: 11 }] }, {}, [1])(1);
      });
    })(object_hash);
    return object_hash.exports;
  }
  var object_hashExports = requireObject_hash();
  const hash = /* @__PURE__ */ getDefaultExportFromCjs(object_hashExports);
  const prompts = [
    {
      name: "Review Selection",
      children: [
        {
          name: "Summarize",
          prompt: endent`
          Read the following text and summarize it in less than half the original length.
        `
        },
        {
          name: "key takeaways",
          prompt: endent`
          Read the following text and identify the key takeaways in list format.
        `
        },
        {
          name: "Questions",
          prompt: endent`
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
          prompt: endent`
          Read the following text and fix any grammar and spelling mistakes.
        `
        },
        {
          name: "Change Tone",
          children: [
            {
              name: "Formal",
              prompt: endent`
              Read the following text and make it more formal.
            `
            },
            {
              name: "Informal",
              prompt: endent`
              Read the following text and make it more informal.
            `
            },
            {
              name: "Neutral",
              prompt: endent`
              Read the following text and make it more neutral.
            `
            },
            {
              name: "Strong",
              prompt: endent`
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
              prompt: endent`
              Read the following text and make it shorter.
            `
            },
            {
              name: "Longer",
              prompt: endent`
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
              prompt: endent`
              Read the following text and add details to make it more informative.
            `
            },
            {
              name: "Add Examples",
              prompt: endent`
              Read the following text and add examples to make it more informative.
            `
            },
            {
              name: "Add Emphasis",
              prompt: endent`
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
          prompt: endent`
          Read the following text and reply to it in a positive way.
        `
        },
        {
          name: "Negative",
          prompt: endent`
          Read the following text and reply to it in a negative way.
        `
        }
      ]
    }
  ];
  const recursiveAddId = (prompts2, _parentId = "") => {
    return prompts2.map((prompt) => {
      const id = hash(prompt);
      return {
        id,
        ...prompt,
        children: prompt.children ? recursiveAddId(prompt.children, id) : void 0
      };
    });
  };
  const defaultPrompts = recursiveAddId(prompts);
  background;
  const getStoredPrompts = async () => {
    const storedPrompts = await getStoredLocalPrompts();
    if (!storedPrompts) {
      chrome.storage.local.set({ PROMPTS: defaultPrompts }, () => {
        console.log("ℹ️ Default prompts stored from getStoredPrompts.ts");
      });
    }
    return storedPrompts ?? defaultPrompts;
  };
  const getStoredLocalPrompts = async () => {
    const storedLocalPrompts = await new Promise((resolve) => {
      chrome.storage.local.get("PROMPTS", (result2) => {
        resolve(result2.PROMPTS);
      });
    });
    return storedLocalPrompts;
  };
  background;
  const createContextMenu = async () => {
    const prompts2 = await getStoredPrompts();
    const contextMenuItems = [];
    const createChildContextMenu = (prompts22, parentId) => {
      for (const prompt of prompts22) {
        contextMenuItems.push({
          id: prompt.id,
          title: prompt.name,
          contexts: ["selection"],
          parentId
        });
        if (prompt.children) createChildContextMenu(prompt.children, prompt.id);
      }
    };
    createChildContextMenu(prompts2);
    contextMenuItems.push(
      {
        id: "separator",
        type: "separator",
        contexts: ["selection"]
      },
      {
        id: "settings",
        title: "Settings",
        contexts: ["selection"]
      }
    );
    chrome.contextMenus.removeAll();
    for (const item of contextMenuItems) {
      chrome.contextMenus.create(item);
    }
  };
  const createContextMenuOnStorageChange = () => {
    chrome.storage.onChanged.addListener(() => {
      console.log("📝 Storage changed");
      createContextMenu();
    });
  };
  background;
  const forwardContextMenuClicks = () => {
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === "settings") {
        chrome.tabs.create({
          url: chrome.runtime.getURL("/src/pages/settings/index.html")
        });
      } else {
        const selectedText = info.selectionText;
        const id = info.menuItemId;
        if (tab == null ? void 0 : tab.id)
          chrome.tabs.sendMessage(tab.id, {
            action: "forward-context-menu-click",
            payload: { selectedText, id }
          });
      }
    });
  };
  background;
  const captureScreenListener = async () => {
    chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
      if (request.action === "captureVisibleTab") {
        chrome.tabs.captureVisibleTab((dataUrl) => {
          sendResponse(dataUrl);
        });
        return true;
      }
    });
  };
  background;
  const sendSidebarShortcut = () => {
    chrome.commands.getAll((commands) => {
      var _a;
      const shortcut = (_a = commands.find((c) => c.name === "open-sidebar")) == null ? void 0 : _a.shortcut;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (info.status === "complete" && tabId === tabs[0].id) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: "sidebar-shortcut",
                shortcut
              });
              chrome.tabs.onUpdated.removeListener(listener);
            }
          });
        }
      });
    });
  };
  background;
  const sidebarToggleListeners = () => {
    chrome.commands.onCommand.addListener((command) => {
      console.log(`🚚 [Command Received] ${command}`);
      if (command === "open-sidebar") {
        toggleSidebar();
      }
    });
    chrome.action.onClicked.addListener(toggleSidebar);
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message.action === "close-sidebar" || message.action === "open-sidebar") {
        toggleSidebar();
      }
      if (message.action === "generate") {
        message.prompt;
      }
      if (message.action === "close-sidebar") {
        sendResponse({ action: "close-sidebar" });
      }
    });
  };
  const toggleSidebar = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "open-sidebar" });
      }
    });
  };
  background;
  const definition = defineBackground({
    main() {
      backgroundLog();
      sidebarToggleListeners();
      sendSidebarShortcut();
      captureScreenListener();
      createContextMenu();
      forwardContextMenuClicks();
      createContextMenuOnStorageChange();
    }
  });
  background;
  function initPlugins() {
  }
  var browserPolyfill$1 = { exports: {} };
  var browserPolyfill = browserPolyfill$1.exports;
  var hasRequiredBrowserPolyfill;
  function requireBrowserPolyfill() {
    if (hasRequiredBrowserPolyfill) return browserPolyfill$1.exports;
    hasRequiredBrowserPolyfill = 1;
    (function(module, exports) {
      (function(global, factory) {
        {
          factory(module);
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : browserPolyfill, function(module2) {
        if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
          throw new Error("This script should only be loaded in a browser extension.");
        }
        if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
          const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
          const wrapAPIs = (extensionAPIs) => {
            const apiMetadata = {
              "alarms": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "clearAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "bookmarks": {
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getChildren": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getRecent": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getSubTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTree": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "browserAction": {
                "disable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "enable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "getBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "openPopup": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "browsingData": {
                "remove": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "removeCache": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCookies": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeDownloads": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFormData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeHistory": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeLocalStorage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePasswords": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePluginData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "settings": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "commands": {
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "contextMenus": {
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "cookies": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAllCookieStores": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "devtools": {
                "inspectedWindow": {
                  "eval": {
                    "minArgs": 1,
                    "maxArgs": 2,
                    "singleCallbackArg": false
                  }
                },
                "panels": {
                  "create": {
                    "minArgs": 3,
                    "maxArgs": 3,
                    "singleCallbackArg": true
                  },
                  "elements": {
                    "createSidebarPane": {
                      "minArgs": 1,
                      "maxArgs": 1
                    }
                  }
                }
              },
              "downloads": {
                "cancel": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "download": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "erase": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFileIcon": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "open": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "pause": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFile": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "resume": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "extension": {
                "isAllowedFileSchemeAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "isAllowedIncognitoAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "history": {
                "addUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "deleteRange": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getVisits": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "i18n": {
                "detectLanguage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAcceptLanguages": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "identity": {
                "launchWebAuthFlow": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "idle": {
                "queryState": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "management": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getSelf": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setEnabled": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "uninstallSelf": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "notifications": {
                "clear": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPermissionLevel": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "pageAction": {
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "hide": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "permissions": {
                "contains": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "request": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "runtime": {
                "getBackgroundPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPlatformInfo": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "openOptionsPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "requestUpdateCheck": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "sendMessage": {
                  "minArgs": 1,
                  "maxArgs": 3
                },
                "sendNativeMessage": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "setUninstallURL": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "sessions": {
                "getDevices": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getRecentlyClosed": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "restore": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "storage": {
                "local": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                },
                "managed": {
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  }
                },
                "sync": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              },
              "tabs": {
                "captureVisibleTab": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "detectLanguage": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "discard": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "duplicate": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "executeScript": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getZoom": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getZoomSettings": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goBack": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goForward": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "highlight": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "insertCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "query": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "reload": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "sendMessage": {
                  "minArgs": 2,
                  "maxArgs": 3
                },
                "setZoom": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "setZoomSettings": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "update": {
                  "minArgs": 1,
                  "maxArgs": 2
                }
              },
              "topSites": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "webNavigation": {
                "getAllFrames": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFrame": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "webRequest": {
                "handlerBehaviorChanged": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "windows": {
                "create": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getLastFocused": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              }
            };
            if (Object.keys(apiMetadata).length === 0) {
              throw new Error("api-metadata.json has not been included in browser-polyfill");
            }
            class DefaultWeakMap extends WeakMap {
              constructor(createItem, items = void 0) {
                super(items);
                this.createItem = createItem;
              }
              get(key) {
                if (!this.has(key)) {
                  this.set(key, this.createItem(key));
                }
                return super.get(key);
              }
            }
            const isThenable = (value) => {
              return value && typeof value === "object" && typeof value.then === "function";
            };
            const makeCallback = (promise, metadata) => {
              return (...callbackArgs) => {
                if (extensionAPIs.runtime.lastError) {
                  promise.reject(new Error(extensionAPIs.runtime.lastError.message));
                } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                  promise.resolve(callbackArgs[0]);
                } else {
                  promise.resolve(callbackArgs);
                }
              };
            };
            const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
            const wrapAsyncFunction = (name, metadata) => {
              return function asyncFunctionWrapper(target, ...args) {
                if (args.length < metadata.minArgs) {
                  throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                }
                if (args.length > metadata.maxArgs) {
                  throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                }
                return new Promise((resolve, reject) => {
                  if (metadata.fallbackToNoCallback) {
                    try {
                      target[name](...args, makeCallback({
                        resolve,
                        reject
                      }, metadata));
                    } catch (cbError) {
                      console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                      target[name](...args);
                      metadata.fallbackToNoCallback = false;
                      metadata.noCallback = true;
                      resolve();
                    }
                  } else if (metadata.noCallback) {
                    target[name](...args);
                    resolve();
                  } else {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  }
                });
              };
            };
            const wrapMethod = (target, method, wrapper) => {
              return new Proxy(method, {
                apply(targetMethod, thisObj, args) {
                  return wrapper.call(thisObj, target, ...args);
                }
              });
            };
            let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
            const wrapObject = (target, wrappers = {}, metadata = {}) => {
              let cache = /* @__PURE__ */ Object.create(null);
              let handlers = {
                has(proxyTarget2, prop) {
                  return prop in target || prop in cache;
                },
                get(proxyTarget2, prop, receiver) {
                  if (prop in cache) {
                    return cache[prop];
                  }
                  if (!(prop in target)) {
                    return void 0;
                  }
                  let value = target[prop];
                  if (typeof value === "function") {
                    if (typeof wrappers[prop] === "function") {
                      value = wrapMethod(target, target[prop], wrappers[prop]);
                    } else if (hasOwnProperty(metadata, prop)) {
                      let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                      value = wrapMethod(target, target[prop], wrapper);
                    } else {
                      value = value.bind(target);
                    }
                  } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                    value = wrapObject(value, wrappers[prop], metadata[prop]);
                  } else if (hasOwnProperty(metadata, "*")) {
                    value = wrapObject(value, wrappers[prop], metadata["*"]);
                  } else {
                    Object.defineProperty(cache, prop, {
                      configurable: true,
                      enumerable: true,
                      get() {
                        return target[prop];
                      },
                      set(value2) {
                        target[prop] = value2;
                      }
                    });
                    return value;
                  }
                  cache[prop] = value;
                  return value;
                },
                set(proxyTarget2, prop, value, receiver) {
                  if (prop in cache) {
                    cache[prop] = value;
                  } else {
                    target[prop] = value;
                  }
                  return true;
                },
                defineProperty(proxyTarget2, prop, desc) {
                  return Reflect.defineProperty(cache, prop, desc);
                },
                deleteProperty(proxyTarget2, prop) {
                  return Reflect.deleteProperty(cache, prop);
                }
              };
              let proxyTarget = Object.create(target);
              return new Proxy(proxyTarget, handlers);
            };
            const wrapEvent = (wrapperMap) => ({
              addListener(target, listener, ...args) {
                target.addListener(wrapperMap.get(listener), ...args);
              },
              hasListener(target, listener) {
                return target.hasListener(wrapperMap.get(listener));
              },
              removeListener(target, listener) {
                target.removeListener(wrapperMap.get(listener));
              }
            });
            const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onRequestFinished(req) {
                const wrappedReq = wrapObject(req, {}, {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
                listener(wrappedReq);
              };
            });
            const onMessageWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onMessage(message, sender, sendResponse) {
                let didCallSendResponse = false;
                let wrappedSendResponse;
                let sendResponsePromise = new Promise((resolve) => {
                  wrappedSendResponse = function(response) {
                    didCallSendResponse = true;
                    resolve(response);
                  };
                });
                let result2;
                try {
                  result2 = listener(message, sender, wrappedSendResponse);
                } catch (err) {
                  result2 = Promise.reject(err);
                }
                const isResultThenable = result2 !== true && isThenable(result2);
                if (result2 !== true && !isResultThenable && !didCallSendResponse) {
                  return false;
                }
                const sendPromisedResult = (promise) => {
                  promise.then((msg) => {
                    sendResponse(msg);
                  }, (error) => {
                    let message2;
                    if (error && (error instanceof Error || typeof error.message === "string")) {
                      message2 = error.message;
                    } else {
                      message2 = "An unexpected error occurred";
                    }
                    sendResponse({
                      __mozWebExtensionPolyfillReject__: true,
                      message: message2
                    });
                  }).catch((err) => {
                    console.error("Failed to send onMessage rejected reply", err);
                  });
                };
                if (isResultThenable) {
                  sendPromisedResult(result2);
                } else {
                  sendPromisedResult(sendResponsePromise);
                }
                return true;
              };
            });
            const wrappedSendMessageCallback = ({
              reject,
              resolve
            }, reply) => {
              if (extensionAPIs.runtime.lastError) {
                if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                  resolve();
                } else {
                  reject(new Error(extensionAPIs.runtime.lastError.message));
                }
              } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                reject(new Error(reply.message));
              } else {
                resolve(reply);
              }
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                const wrappedCb = wrappedSendMessageCallback.bind(null, {
                  resolve,
                  reject
                });
                args.push(wrappedCb);
                apiNamespaceObj.sendMessage(...args);
              });
            };
            const staticWrappers = {
              devtools: {
                network: {
                  onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                }
              },
              runtime: {
                onMessage: wrapEvent(onMessageWrappers),
                onMessageExternal: wrapEvent(onMessageWrappers),
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 1,
                  maxArgs: 3
                })
              },
              tabs: {
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 2,
                  maxArgs: 3
                })
              }
            };
            const settingMetadata = {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            };
            apiMetadata.privacy = {
              network: {
                "*": settingMetadata
              },
              services: {
                "*": settingMetadata
              },
              websites: {
                "*": settingMetadata
              }
            };
            return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
          };
          module2.exports = wrapAPIs(chrome);
        } else {
          module2.exports = globalThis.browser;
        }
      });
    })(browserPolyfill$1);
    return browserPolyfill$1.exports;
  }
  var browserPolyfillExports = requireBrowserPolyfill();
  const originalBrowser = /* @__PURE__ */ getDefaultExportFromCjs(browserPolyfillExports);
  const browser = originalBrowser;
  function print(method, ...args) {
    if (typeof args[0] === "string") {
      const message = args.shift();
      method(`[wxt] ${message}`, ...args);
    } else {
      method("[wxt]", ...args);
    }
  }
  const logger = {
    debug: (...args) => print(console.debug, ...args),
    log: (...args) => print(console.log, ...args),
    warn: (...args) => print(console.warn, ...args),
    error: (...args) => print(console.error, ...args)
  };
  let ws;
  function getDevServerWebSocket() {
    if (ws == null) {
      const serverUrl = `${"ws:"}//${"localhost"}:${3e3}`;
      logger.debug("Connecting to dev server @", serverUrl);
      ws = new WebSocket(serverUrl, "vite-hmr");
      ws.addWxtEventListener = ws.addEventListener.bind(ws);
      ws.sendCustom = (event, payload) => ws == null ? void 0 : ws.send(JSON.stringify({ type: "custom", event, payload }));
      ws.addEventListener("open", () => {
        logger.debug("Connected to dev server");
      });
      ws.addEventListener("close", () => {
        logger.debug("Disconnected from dev server");
      });
      ws.addEventListener("error", (event) => {
        logger.error("Failed to connect to dev server", event);
      });
      ws.addEventListener("message", (e) => {
        try {
          const message = JSON.parse(e.data);
          if (message.type === "custom") {
            ws == null ? void 0 : ws.dispatchEvent(
              new CustomEvent(message.event, { detail: message.data })
            );
          }
        } catch (err) {
          logger.error("Failed to handle message", err);
        }
      });
    }
    return ws;
  }
  function keepServiceWorkerAlive() {
    setInterval(async () => {
      await browser.runtime.getPlatformInfo();
    }, 5e3);
  }
  function reloadContentScript(payload) {
    const manifest = browser.runtime.getManifest();
    if (manifest.manifest_version == 2) {
      void reloadContentScriptMv2();
    } else {
      void reloadContentScriptMv3(payload);
    }
  }
  async function reloadContentScriptMv3({
    registration,
    contentScript
  }) {
    if (registration === "runtime") {
      await reloadRuntimeContentScriptMv3(contentScript);
    } else {
      await reloadManifestContentScriptMv3(contentScript);
    }
  }
  async function reloadManifestContentScriptMv3(contentScript) {
    const id = `wxt:${contentScript.js[0]}`;
    logger.log("Reloading content script:", contentScript);
    const registered = await browser.scripting.getRegisteredContentScripts();
    logger.debug("Existing scripts:", registered);
    const existing = registered.find((cs) => cs.id === id);
    if (existing) {
      logger.debug("Updating content script", existing);
      await browser.scripting.updateContentScripts([{ ...contentScript, id }]);
    } else {
      logger.debug("Registering new content script...");
      await browser.scripting.registerContentScripts([{ ...contentScript, id }]);
    }
    await reloadTabsForContentScript(contentScript);
  }
  async function reloadRuntimeContentScriptMv3(contentScript) {
    logger.log("Reloading content script:", contentScript);
    const registered = await browser.scripting.getRegisteredContentScripts();
    logger.debug("Existing scripts:", registered);
    const matches = registered.filter((cs) => {
      var _a, _b;
      const hasJs = (_a = contentScript.js) == null ? void 0 : _a.find((js) => {
        var _a2;
        return (_a2 = cs.js) == null ? void 0 : _a2.includes(js);
      });
      const hasCss = (_b = contentScript.css) == null ? void 0 : _b.find((css) => {
        var _a2;
        return (_a2 = cs.css) == null ? void 0 : _a2.includes(css);
      });
      return hasJs || hasCss;
    });
    if (matches.length === 0) {
      logger.log(
        "Content script is not registered yet, nothing to reload",
        contentScript
      );
      return;
    }
    await browser.scripting.updateContentScripts(matches);
    await reloadTabsForContentScript(contentScript);
  }
  async function reloadTabsForContentScript(contentScript) {
    const allTabs = await browser.tabs.query({});
    const matchPatterns = contentScript.matches.map(
      (match) => new MatchPattern(match)
    );
    const matchingTabs = allTabs.filter((tab) => {
      const url = tab.url;
      if (!url)
        return false;
      return !!matchPatterns.find((pattern) => pattern.includes(url));
    });
    await Promise.all(
      matchingTabs.map(async (tab) => {
        try {
          await browser.tabs.reload(tab.id);
        } catch (err) {
          logger.warn("Failed to reload tab:", err);
        }
      })
    );
  }
  async function reloadContentScriptMv2(_payload) {
    throw Error("TODO: reloadContentScriptMv2");
  }
  {
    try {
      const ws2 = getDevServerWebSocket();
      ws2.addWxtEventListener("wxt:reload-extension", () => {
        browser.runtime.reload();
      });
      ws2.addWxtEventListener("wxt:reload-content-script", (event) => {
        reloadContentScript(event.detail);
      });
      if (true) {
        ws2.addEventListener(
          "open",
          () => ws2.sendCustom("wxt:background-initialized")
        );
        keepServiceWorkerAlive();
      }
    } catch (err) {
      logger.error("Failed to setup web socket connection with dev server", err);
    }
    browser.commands.onCommand.addListener((command) => {
      if (command === "wxt:reload-extension") {
        browser.runtime.reload();
      }
    });
  }
  let result;
  try {
    initPlugins();
    result = definition.main();
    if (result instanceof Promise) {
      console.warn(
        "The background's main() function return a promise, but it must be synchronous"
      );
    }
  } catch (err) {
    logger.error("The background crashed on startup!");
    throw err;
  }
  const result$1 = result;
  return result$1;
}();
background;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3d4dEAwLjE5LjIzX0B0eXBlcytub2RlQDE4LjE5LjU3X3JvbGx1cEA0LjI5LjFfeWFtbEAyLjYuMC9ub2RlX21vZHVsZXMvd3h0L2Rpc3Qvc2FuZGJveC9kZWZpbmUtYmFja2dyb3VuZC5tanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQHdlYmV4dC1jb3JlK21hdGNoLXBhdHRlcm5zQDEuMC4zL25vZGVfbW9kdWxlcy9Ad2ViZXh0LWNvcmUvbWF0Y2gtcGF0dGVybnMvbGliL2luZGV4LmpzIiwiLi4vLi4vc3JjL2xvZ3MudHN4IiwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RlZGVudEAwLjcuMC9ub2RlX21vZHVsZXMvZGVkZW50L2Rpc3QvZGVkZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL29iamVjdG9yYXJyYXlAMS4wLjUvbm9kZV9tb2R1bGVzL29iamVjdG9yYXJyYXkvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZmFzdC1qc29uLXBhcnNlQDEuMC4zL25vZGVfbW9kdWxlcy9mYXN0LWpzb24tcGFyc2UvcGFyc2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZW5kZW50QDIuMS4wL25vZGVfbW9kdWxlcy9lbmRlbnQvbGliL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL29iamVjdC1oYXNoQDMuMC4wL25vZGVfbW9kdWxlcy9vYmplY3QtaGFzaC9kaXN0L29iamVjdF9oYXNoLmpzIiwiLi4vLi4vc3JjL2NvbmZpZy9wcm9tcHRzL2RlZmF1bHQudHMiLCIuLi8uLi9zcmMvbGliL2dldFN0b3JlZFByb21wdHMudHMiLCIuLi8uLi9zcmMvZW50cnlwb2ludHMvYmFja2dyb3VuZC9xdWljay1tZW51L2NyZWF0ZUNvbnRleHRNZW51LnRzIiwiLi4vLi4vc3JjL2VudHJ5cG9pbnRzL2JhY2tncm91bmQvcXVpY2stbWVudS9mb3J3YXJkQ29udGV4dE1lbnUudHMiLCIuLi8uLi9zcmMvZW50cnlwb2ludHMvYmFja2dyb3VuZC9zaWRlYmFyL2NhcHR1cmVTY3JlZW5MaXN0ZW5lci50cyIsIi4uLy4uL3NyYy9lbnRyeXBvaW50cy9iYWNrZ3JvdW5kL3NpZGViYXIvc2VuZFNpZGViYXJTaG9ydGN1dC50cyIsIi4uLy4uL3NyYy9lbnRyeXBvaW50cy9iYWNrZ3JvdW5kL3NpZGViYXIvc2lkZWJhclRvZ2dsZUxpc3RlbmVycy50cyIsIi4uLy4uL3NyYy9lbnRyeXBvaW50cy9iYWNrZ3JvdW5kL2luZGV4LnRzIiwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbEAwLjEyLjAvbm9kZV9tb2R1bGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9kaXN0L2Jyb3dzZXItcG9seWZpbGwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vd3h0QDAuMTkuMjNfQHR5cGVzK25vZGVAMTguMTkuNTdfcm9sbHVwQDQuMjkuMV95YW1sQDIuNi4wL25vZGVfbW9kdWxlcy93eHQvZGlzdC9icm93c2VyL2luZGV4Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZGVmaW5lQmFja2dyb3VuZChhcmcpIHtcbiAgaWYgKGFyZyA9PSBudWxsIHx8IHR5cGVvZiBhcmcgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHsgbWFpbjogYXJnIH07XG4gIHJldHVybiBhcmc7XG59XG4iLCIvLyBzcmMvaW5kZXgudHNcbnZhciBfTWF0Y2hQYXR0ZXJuID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihtYXRjaFBhdHRlcm4pIHtcbiAgICBpZiAobWF0Y2hQYXR0ZXJuID09PSBcIjxhbGxfdXJscz5cIikge1xuICAgICAgdGhpcy5pc0FsbFVybHMgPSB0cnVlO1xuICAgICAgdGhpcy5wcm90b2NvbE1hdGNoZXMgPSBbLi4uX01hdGNoUGF0dGVybi5QUk9UT0NPTFNdO1xuICAgICAgdGhpcy5ob3N0bmFtZU1hdGNoID0gXCIqXCI7XG4gICAgICB0aGlzLnBhdGhuYW1lTWF0Y2ggPSBcIipcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ3JvdXBzID0gLyguKik6XFwvXFwvKC4qPykoXFwvLiopLy5leGVjKG1hdGNoUGF0dGVybik7XG4gICAgICBpZiAoZ3JvdXBzID09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkTWF0Y2hQYXR0ZXJuKG1hdGNoUGF0dGVybiwgXCJJbmNvcnJlY3QgZm9ybWF0XCIpO1xuICAgICAgY29uc3QgW18sIHByb3RvY29sLCBob3N0bmFtZSwgcGF0aG5hbWVdID0gZ3JvdXBzO1xuICAgICAgdmFsaWRhdGVQcm90b2NvbChtYXRjaFBhdHRlcm4sIHByb3RvY29sKTtcbiAgICAgIHZhbGlkYXRlSG9zdG5hbWUobWF0Y2hQYXR0ZXJuLCBob3N0bmFtZSk7XG4gICAgICB2YWxpZGF0ZVBhdGhuYW1lKG1hdGNoUGF0dGVybiwgcGF0aG5hbWUpO1xuICAgICAgdGhpcy5wcm90b2NvbE1hdGNoZXMgPSBwcm90b2NvbCA9PT0gXCIqXCIgPyBbXCJodHRwXCIsIFwiaHR0cHNcIl0gOiBbcHJvdG9jb2xdO1xuICAgICAgdGhpcy5ob3N0bmFtZU1hdGNoID0gaG9zdG5hbWU7XG4gICAgICB0aGlzLnBhdGhuYW1lTWF0Y2ggPSBwYXRobmFtZTtcbiAgICB9XG4gIH1cbiAgaW5jbHVkZXModXJsKSB7XG4gICAgaWYgKHRoaXMuaXNBbGxVcmxzKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgdSA9IHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIgPyBuZXcgVVJMKHVybCkgOiB1cmwgaW5zdGFuY2VvZiBMb2NhdGlvbiA/IG5ldyBVUkwodXJsLmhyZWYpIDogdXJsO1xuICAgIHJldHVybiAhIXRoaXMucHJvdG9jb2xNYXRjaGVzLmZpbmQoKHByb3RvY29sKSA9PiB7XG4gICAgICBpZiAocHJvdG9jb2wgPT09IFwiaHR0cFwiKVxuICAgICAgICByZXR1cm4gdGhpcy5pc0h0dHBNYXRjaCh1KTtcbiAgICAgIGlmIChwcm90b2NvbCA9PT0gXCJodHRwc1wiKVxuICAgICAgICByZXR1cm4gdGhpcy5pc0h0dHBzTWF0Y2godSk7XG4gICAgICBpZiAocHJvdG9jb2wgPT09IFwiZmlsZVwiKVxuICAgICAgICByZXR1cm4gdGhpcy5pc0ZpbGVNYXRjaCh1KTtcbiAgICAgIGlmIChwcm90b2NvbCA9PT0gXCJmdHBcIilcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGdHBNYXRjaCh1KTtcbiAgICAgIGlmIChwcm90b2NvbCA9PT0gXCJ1cm5cIilcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNVcm5NYXRjaCh1KTtcbiAgICB9KTtcbiAgfVxuICBpc0h0dHBNYXRjaCh1cmwpIHtcbiAgICByZXR1cm4gdXJsLnByb3RvY29sID09PSBcImh0dHA6XCIgJiYgdGhpcy5pc0hvc3RQYXRoTWF0Y2godXJsKTtcbiAgfVxuICBpc0h0dHBzTWF0Y2godXJsKSB7XG4gICAgcmV0dXJuIHVybC5wcm90b2NvbCA9PT0gXCJodHRwczpcIiAmJiB0aGlzLmlzSG9zdFBhdGhNYXRjaCh1cmwpO1xuICB9XG4gIGlzSG9zdFBhdGhNYXRjaCh1cmwpIHtcbiAgICBpZiAoIXRoaXMuaG9zdG5hbWVNYXRjaCB8fCAhdGhpcy5wYXRobmFtZU1hdGNoKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGhvc3RuYW1lTWF0Y2hSZWdleHMgPSBbXG4gICAgICB0aGlzLmNvbnZlcnRQYXR0ZXJuVG9SZWdleCh0aGlzLmhvc3RuYW1lTWF0Y2gpLFxuICAgICAgdGhpcy5jb252ZXJ0UGF0dGVyblRvUmVnZXgodGhpcy5ob3N0bmFtZU1hdGNoLnJlcGxhY2UoL15cXCpcXC4vLCBcIlwiKSlcbiAgICBdO1xuICAgIGNvbnN0IHBhdGhuYW1lTWF0Y2hSZWdleCA9IHRoaXMuY29udmVydFBhdHRlcm5Ub1JlZ2V4KHRoaXMucGF0aG5hbWVNYXRjaCk7XG4gICAgcmV0dXJuICEhaG9zdG5hbWVNYXRjaFJlZ2V4cy5maW5kKChyZWdleCkgPT4gcmVnZXgudGVzdCh1cmwuaG9zdG5hbWUpKSAmJiBwYXRobmFtZU1hdGNoUmVnZXgudGVzdCh1cmwucGF0aG5hbWUpO1xuICB9XG4gIGlzRmlsZU1hdGNoKHVybCkge1xuICAgIHRocm93IEVycm9yKFwiTm90IGltcGxlbWVudGVkOiBmaWxlOi8vIHBhdHRlcm4gbWF0Y2hpbmcuIE9wZW4gYSBQUiB0byBhZGQgc3VwcG9ydFwiKTtcbiAgfVxuICBpc0Z0cE1hdGNoKHVybCkge1xuICAgIHRocm93IEVycm9yKFwiTm90IGltcGxlbWVudGVkOiBmdHA6Ly8gcGF0dGVybiBtYXRjaGluZy4gT3BlbiBhIFBSIHRvIGFkZCBzdXBwb3J0XCIpO1xuICB9XG4gIGlzVXJuTWF0Y2godXJsKSB7XG4gICAgdGhyb3cgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQ6IHVybjovLyBwYXR0ZXJuIG1hdGNoaW5nLiBPcGVuIGEgUFIgdG8gYWRkIHN1cHBvcnRcIik7XG4gIH1cbiAgY29udmVydFBhdHRlcm5Ub1JlZ2V4KHBhdHRlcm4pIHtcbiAgICBjb25zdCBlc2NhcGVkID0gdGhpcy5lc2NhcGVGb3JSZWdleChwYXR0ZXJuKTtcbiAgICBjb25zdCBzdGFyc1JlcGxhY2VkID0gZXNjYXBlZC5yZXBsYWNlKC9cXFxcXFwqL2csIFwiLipcIik7XG4gICAgcmV0dXJuIFJlZ0V4cChgXiR7c3RhcnNSZXBsYWNlZH0kYCk7XG4gIH1cbiAgZXNjYXBlRm9yUmVnZXgoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgXCJcXFxcJCZcIik7XG4gIH1cbn07XG52YXIgTWF0Y2hQYXR0ZXJuID0gX01hdGNoUGF0dGVybjtcbk1hdGNoUGF0dGVybi5QUk9UT0NPTFMgPSBbXCJodHRwXCIsIFwiaHR0cHNcIiwgXCJmaWxlXCIsIFwiZnRwXCIsIFwidXJuXCJdO1xudmFyIEludmFsaWRNYXRjaFBhdHRlcm4gPSBjbGFzcyBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWF0Y2hQYXR0ZXJuLCByZWFzb24pIHtcbiAgICBzdXBlcihgSW52YWxpZCBtYXRjaCBwYXR0ZXJuIFwiJHttYXRjaFBhdHRlcm59XCI6ICR7cmVhc29ufWApO1xuICB9XG59O1xuZnVuY3Rpb24gdmFsaWRhdGVQcm90b2NvbChtYXRjaFBhdHRlcm4sIHByb3RvY29sKSB7XG4gIGlmICghTWF0Y2hQYXR0ZXJuLlBST1RPQ09MUy5pbmNsdWRlcyhwcm90b2NvbCkgJiYgcHJvdG9jb2wgIT09IFwiKlwiKVxuICAgIHRocm93IG5ldyBJbnZhbGlkTWF0Y2hQYXR0ZXJuKFxuICAgICAgbWF0Y2hQYXR0ZXJuLFxuICAgICAgYCR7cHJvdG9jb2x9IG5vdCBhIHZhbGlkIHByb3RvY29sICgke01hdGNoUGF0dGVybi5QUk9UT0NPTFMuam9pbihcIiwgXCIpfSlgXG4gICAgKTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlSG9zdG5hbWUobWF0Y2hQYXR0ZXJuLCBob3N0bmFtZSkge1xuICBpZiAoaG9zdG5hbWUuaW5jbHVkZXMoXCI6XCIpKVxuICAgIHRocm93IG5ldyBJbnZhbGlkTWF0Y2hQYXR0ZXJuKG1hdGNoUGF0dGVybiwgYEhvc3RuYW1lIGNhbm5vdCBpbmNsdWRlIGEgcG9ydGApO1xuICBpZiAoaG9zdG5hbWUuaW5jbHVkZXMoXCIqXCIpICYmIGhvc3RuYW1lLmxlbmd0aCA+IDEgJiYgIWhvc3RuYW1lLnN0YXJ0c1dpdGgoXCIqLlwiKSlcbiAgICB0aHJvdyBuZXcgSW52YWxpZE1hdGNoUGF0dGVybihcbiAgICAgIG1hdGNoUGF0dGVybixcbiAgICAgIGBJZiB1c2luZyBhIHdpbGRjYXJkICgqKSwgaXQgbXVzdCBnbyBhdCB0aGUgc3RhcnQgb2YgdGhlIGhvc3RuYW1lYFxuICAgICk7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZVBhdGhuYW1lKG1hdGNoUGF0dGVybiwgcGF0aG5hbWUpIHtcbiAgcmV0dXJuO1xufVxuZXhwb3J0IHtcbiAgSW52YWxpZE1hdGNoUGF0dGVybixcbiAgTWF0Y2hQYXR0ZXJuXG59O1xuIiwiY29uc3QgbG9nb1RleHQgPVxuICBcIiBfX19fICAgICAgICAgICAgICAgICAgIF9cXG4vIF9fX3wgXyAgIF8gXyBfXyAgIF9fXyhfKSBfXyBfXFxuXFxcXF9fXyBcXFxcfCB8IHwgfCAnXyBcXFxcIC8gX198IHwvIF9gIHxcXG4gX19fKSB8IHxffCB8IHwgfCB8IChfX3wgfCAoX3wgfFxcbnxfX19fLyBcXFxcX18sIHxffCB8X3xcXFxcX19ffF98XFxcXF9fLF98XFxuICAgICAgIHxfX18vXCJcblxuY29uc3QgbXNnVGV4dCA9IChtc2c6IHN0cmluZykgPT4gYFxcbiR7JyAnLnJlcGVhdCgxNCAtIG1zZy5sZW5ndGggLyAyKX1bJHttc2d9XWBcblxuZXhwb3J0IGNvbnN0IGNvbnRlbnRTY3JpcHRMb2cgPSAoaXRlbTogc3RyaW5nKSA9PiB7XG4gIGNvbnNvbGUubG9nKGxvZ29UZXh0LCBtc2dUZXh0KGAke2l0ZW19IFNjcmlwdCBMb2FkZWRgKSlcbn1cblxuZXhwb3J0IGNvbnN0IGJhY2tncm91bmRMb2cgPSAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGxvZ29UZXh0LCBtc2dUZXh0KCdCYWNrZ3JvdW5kIExvYWRlZCcpKVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIGRlZGVudChzdHJpbmdzKSB7XG5cbiAgdmFyIHJhdyA9IHZvaWQgMDtcbiAgaWYgKHR5cGVvZiBzdHJpbmdzID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gZGVkZW50IGNhbiBiZSB1c2VkIGFzIGEgcGxhaW4gZnVuY3Rpb25cbiAgICByYXcgPSBbc3RyaW5nc107XG4gIH0gZWxzZSB7XG4gICAgcmF3ID0gc3RyaW5ncy5yYXc7XG4gIH1cblxuICAvLyBmaXJzdCwgcGVyZm9ybSBpbnRlcnBvbGF0aW9uXG4gIHZhciByZXN1bHQgPSBcIlwiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhdy5sZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdCArPSByYXdbaV0uXG4gICAgLy8gam9pbiBsaW5lcyB3aGVuIHRoZXJlIGlzIGEgc3VwcHJlc3NlZCBuZXdsaW5lXG4gICAgcmVwbGFjZSgvXFxcXFxcblsgXFx0XSovZywgXCJcIikuXG5cbiAgICAvLyBoYW5kbGUgZXNjYXBlZCBiYWNrdGlja3NcbiAgICByZXBsYWNlKC9cXFxcYC9nLCBcImBcIik7XG5cbiAgICBpZiAoaSA8IChhcmd1bWVudHMubGVuZ3RoIDw9IDEgPyAwIDogYXJndW1lbnRzLmxlbmd0aCAtIDEpKSB7XG4gICAgICByZXN1bHQgKz0gYXJndW1lbnRzLmxlbmd0aCA8PSBpICsgMSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1tpICsgMV07XG4gICAgfVxuICB9XG5cbiAgLy8gbm93IHN0cmlwIGluZGVudGF0aW9uXG4gIHZhciBsaW5lcyA9IHJlc3VsdC5zcGxpdChcIlxcblwiKTtcbiAgdmFyIG1pbmRlbnQgPSBudWxsO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7XG4gICAgdmFyIG0gPSBsLm1hdGNoKC9eKFxccyspXFxTKy8pO1xuICAgIGlmIChtKSB7XG4gICAgICB2YXIgaW5kZW50ID0gbVsxXS5sZW5ndGg7XG4gICAgICBpZiAoIW1pbmRlbnQpIHtcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgZmlyc3QgaW5kZW50ZWQgbGluZVxuICAgICAgICBtaW5kZW50ID0gaW5kZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWluZGVudCA9IE1hdGgubWluKG1pbmRlbnQsIGluZGVudCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpZiAobWluZGVudCAhPT0gbnVsbCkge1xuICAgIHJlc3VsdCA9IGxpbmVzLm1hcChmdW5jdGlvbiAobCkge1xuICAgICAgcmV0dXJuIGxbMF0gPT09IFwiIFwiID8gbC5zbGljZShtaW5kZW50KSA6IGw7XG4gICAgfSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIC8vIGRlZGVudCBlYXRzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UgdG9vXG4gIHJlc3VsdCA9IHJlc3VsdC50cmltKCk7XG5cbiAgLy8gaGFuZGxlIGVzY2FwZWQgbmV3bGluZXMgYXQgdGhlIGVuZCB0byBlbnN1cmUgdGhleSBkb24ndCBnZXQgc3RyaXBwZWQgdG9vXG4gIHJldHVybiByZXN1bHQucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIik7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZGVkZW50O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAodmFsKSA9PiB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgIT09IFJlZ0V4cFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIFBhcnNlIChkYXRhKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXJzZSkpIHtcbiAgICByZXR1cm4gbmV3IFBhcnNlKGRhdGEpXG4gIH1cbiAgdGhpcy5lcnIgPSBudWxsXG4gIHRoaXMudmFsdWUgPSBudWxsXG4gIHRyeSB7XG4gICAgdGhpcy52YWx1ZSA9IEpTT04ucGFyc2UoZGF0YSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhpcy5lcnIgPSBlcnJcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnNlXG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRlZGVudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkZWRlbnRcIikpO1xuY29uc3Qgb2JqZWN0b3JhcnJheV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJvYmplY3RvcmFycmF5XCIpKTtcbmNvbnN0IGZhc3RfanNvbl9wYXJzZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJmYXN0LWpzb24tcGFyc2VcIikpO1xuY29uc3QgRU5ERU5UX0lEID0gXCJ0d2haTnd4STFhRkczcjRcIjtcbmZ1bmN0aW9uIGVuZGVudChzdHJpbmdzLCAuLi52YWx1ZXMpIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IHN0cmluZ3NbaV07XG4gICAgICAgIGlmIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgICAgICAgbGV0IGlzSnNvbiA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGZhc3RfanNvbl9wYXJzZV8xLmRlZmF1bHQodmFsdWUpLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBmYXN0X2pzb25fcGFyc2VfMS5kZWZhdWx0KHZhbHVlKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBpc0pzb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh2YWx1ZSAmJiB2YWx1ZVtFTkRFTlRfSURdKSB8fCBpc0pzb24pIHtcbiAgICAgICAgICAgICAgICBsZXQgcmF3bGluZXMgPSByZXN1bHQuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgbGV0IGwgPSByYXdsaW5lc1tyYXdsaW5lcy5sZW5ndGggLSAxXS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgICAgIGxldCBlbmRlbnRhdGlvbiA9IGwgPiAwID8gXCIgXCIucmVwZWF0KGwpIDogXCJcIjtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVKc29uID0gaXNKc29uXG4gICAgICAgICAgICAgICAgICAgID8gSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpXG4gICAgICAgICAgICAgICAgICAgIDogdmFsdWVbRU5ERU5UX0lEXTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVMaW5lcyA9IHZhbHVlSnNvbi5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgICAgICB2YWx1ZUxpbmVzLmZvckVhY2goKGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcblwiICsgZW5kZW50YXRpb24gKyBsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICAgIGxldCBlbmRlbnRhdGlvbnMgPSByZXN1bHQubWF0Y2goLyg/Ol58XFxuKSggKikkLyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kZW50YXRpb24gPSBlbmRlbnRhdGlvbnMgPyBlbmRlbnRhdGlvbnNbMV0gOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdChcIlxcblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoc3RyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBFTkRFTlRfSUQgKyBzdHI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSA9PT0gMCA/IHN0ciA6IGAke2VuZGVudGF0aW9ufSR7c3RyfWA7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ID0gZGVkZW50XzEuZGVmYXVsdChyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQuc3BsaXQoRU5ERU5UX0lEKS5qb2luKFwiXCIpO1xufVxuZW5kZW50LnByZXR0eSA9IChkYXRhKSA9PiB7XG4gICAgcmV0dXJuIG9iamVjdG9yYXJyYXlfMS5kZWZhdWx0KGRhdGEpXG4gICAgICAgID8geyBbRU5ERU5UX0lEXTogSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikgfVxuICAgICAgICA6IGRhdGE7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZW5kZW50O1xuIiwiIWZ1bmN0aW9uKGUpe3ZhciB0O1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGUpOihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3Q9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/dD1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJih0PXNlbGYpLHQub2JqZWN0SGFzaD1lKCkpfShmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbiByKG8saSx1KXtmdW5jdGlvbiBzKG4sZSl7aWYoIWlbbl0pe2lmKCFvW25dKXt2YXIgdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFlJiZ0KXJldHVybiB0KG4sITApO2lmKGEpcmV0dXJuIGEobiwhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIituK1wiJ1wiKX1lPWlbbl09e2V4cG9ydHM6e319O29bbl1bMF0uY2FsbChlLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIHQ9b1tuXVsxXVtlXTtyZXR1cm4gcyh0fHxlKX0sZSxlLmV4cG9ydHMscixvLGksdSl9cmV0dXJuIGlbbl0uZXhwb3J0c31mb3IodmFyIGE9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxlPTA7ZTx1Lmxlbmd0aDtlKyspcyh1W2VdKTtyZXR1cm4gc30oezE6W2Z1bmN0aW9uKHcsYixtKXshZnVuY3Rpb24oZSxuLHMsYyxkLGgscCxnLHkpe1widXNlIHN0cmljdFwiO3ZhciByPXcoXCJjcnlwdG9cIik7ZnVuY3Rpb24gdChlLHQpe3Q9dShlLHQpO3ZhciBuO3JldHVybiB2b2lkIDA9PT0obj1cInBhc3N0aHJvdWdoXCIhPT10LmFsZ29yaXRobT9yLmNyZWF0ZUhhc2godC5hbGdvcml0aG0pOm5ldyBsKS53cml0ZSYmKG4ud3JpdGU9bi51cGRhdGUsbi5lbmQ9bi51cGRhdGUpLGYodCxuKS5kaXNwYXRjaChlKSxuLnVwZGF0ZXx8bi5lbmQoXCJcIiksbi5kaWdlc3Q/bi5kaWdlc3QoXCJidWZmZXJcIj09PXQuZW5jb2Rpbmc/dm9pZCAwOnQuZW5jb2RpbmcpOihlPW4ucmVhZCgpLFwiYnVmZmVyXCIhPT10LmVuY29kaW5nP2UudG9TdHJpbmcodC5lbmNvZGluZyk6ZSl9KG09Yi5leHBvcnRzPXQpLnNoYTE9ZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSl9LG0ua2V5cz1mdW5jdGlvbihlKXtyZXR1cm4gdChlLHtleGNsdWRlVmFsdWVzOiEwLGFsZ29yaXRobTpcInNoYTFcIixlbmNvZGluZzpcImhleFwifSl9LG0uTUQ1PWZ1bmN0aW9uKGUpe3JldHVybiB0KGUse2FsZ29yaXRobTpcIm1kNVwiLGVuY29kaW5nOlwiaGV4XCJ9KX0sbS5rZXlzTUQ1PWZ1bmN0aW9uKGUpe3JldHVybiB0KGUse2FsZ29yaXRobTpcIm1kNVwiLGVuY29kaW5nOlwiaGV4XCIsZXhjbHVkZVZhbHVlczohMH0pfTt2YXIgbz1yLmdldEhhc2hlcz9yLmdldEhhc2hlcygpLnNsaWNlKCk6W1wic2hhMVwiLFwibWQ1XCJdLGk9KG8ucHVzaChcInBhc3N0aHJvdWdoXCIpLFtcImJ1ZmZlclwiLFwiaGV4XCIsXCJiaW5hcnlcIixcImJhc2U2NFwiXSk7ZnVuY3Rpb24gdShlLHQpe3ZhciBuPXt9O2lmKG4uYWxnb3JpdGhtPSh0PXR8fHt9KS5hbGdvcml0aG18fFwic2hhMVwiLG4uZW5jb2Rpbmc9dC5lbmNvZGluZ3x8XCJoZXhcIixuLmV4Y2x1ZGVWYWx1ZXM9ISF0LmV4Y2x1ZGVWYWx1ZXMsbi5hbGdvcml0aG09bi5hbGdvcml0aG0udG9Mb3dlckNhc2UoKSxuLmVuY29kaW5nPW4uZW5jb2RpbmcudG9Mb3dlckNhc2UoKSxuLmlnbm9yZVVua25vd249ITA9PT10Lmlnbm9yZVVua25vd24sbi5yZXNwZWN0VHlwZT0hMSE9PXQucmVzcGVjdFR5cGUsbi5yZXNwZWN0RnVuY3Rpb25OYW1lcz0hMSE9PXQucmVzcGVjdEZ1bmN0aW9uTmFtZXMsbi5yZXNwZWN0RnVuY3Rpb25Qcm9wZXJ0aWVzPSExIT09dC5yZXNwZWN0RnVuY3Rpb25Qcm9wZXJ0aWVzLG4udW5vcmRlcmVkQXJyYXlzPSEwPT09dC51bm9yZGVyZWRBcnJheXMsbi51bm9yZGVyZWRTZXRzPSExIT09dC51bm9yZGVyZWRTZXRzLG4udW5vcmRlcmVkT2JqZWN0cz0hMSE9PXQudW5vcmRlcmVkT2JqZWN0cyxuLnJlcGxhY2VyPXQucmVwbGFjZXJ8fHZvaWQgMCxuLmV4Y2x1ZGVLZXlzPXQuZXhjbHVkZUtleXN8fHZvaWQgMCx2b2lkIDA9PT1lKXRocm93IG5ldyBFcnJvcihcIk9iamVjdCBhcmd1bWVudCByZXF1aXJlZC5cIik7Zm9yKHZhciByPTA7cjxvLmxlbmd0aDsrK3Ipb1tyXS50b0xvd2VyQ2FzZSgpPT09bi5hbGdvcml0aG0udG9Mb3dlckNhc2UoKSYmKG4uYWxnb3JpdGhtPW9bcl0pO2lmKC0xPT09by5pbmRleE9mKG4uYWxnb3JpdGhtKSl0aHJvdyBuZXcgRXJyb3IoJ0FsZ29yaXRobSBcIicrbi5hbGdvcml0aG0rJ1wiICBub3Qgc3VwcG9ydGVkLiBzdXBwb3J0ZWQgdmFsdWVzOiAnK28uam9pbihcIiwgXCIpKTtpZigtMT09PWkuaW5kZXhPZihuLmVuY29kaW5nKSYmXCJwYXNzdGhyb3VnaFwiIT09bi5hbGdvcml0aG0pdGhyb3cgbmV3IEVycm9yKCdFbmNvZGluZyBcIicrbi5lbmNvZGluZysnXCIgIG5vdCBzdXBwb3J0ZWQuIHN1cHBvcnRlZCB2YWx1ZXM6ICcraS5qb2luKFwiLCBcIikpO3JldHVybiBufWZ1bmN0aW9uIGEoZSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZSlyZXR1cm4gbnVsbCE9L15mdW5jdGlvblxccytcXHcqXFxzKlxcKFxccypcXClcXHMqe1xccytcXFtuYXRpdmUgY29kZVxcXVxccyt9JC9pLmV4ZWMoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpfWZ1bmN0aW9uIGYobyx0LGkpe2k9aXx8W107ZnVuY3Rpb24gdShlKXtyZXR1cm4gdC51cGRhdGU/dC51cGRhdGUoZSxcInV0ZjhcIik6dC53cml0ZShlLFwidXRmOFwiKX1yZXR1cm57ZGlzcGF0Y2g6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXNbXCJfXCIrKG51bGw9PT0oZT1vLnJlcGxhY2VyP28ucmVwbGFjZXIoZSk6ZSk/XCJudWxsXCI6dHlwZW9mIGUpXShlKX0sX29iamVjdDpmdW5jdGlvbih0KXt2YXIgbixlPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KSxyPS9cXFtvYmplY3QgKC4qKVxcXS9pLmV4ZWMoZSk7cj0ocj1yP3JbMV06XCJ1bmtub3duOltcIitlK1wiXVwiKS50b0xvd2VyQ2FzZSgpO2lmKDA8PShlPWkuaW5kZXhPZih0KSkpcmV0dXJuIHRoaXMuZGlzcGF0Y2goXCJbQ0lSQ1VMQVI6XCIrZStcIl1cIik7aWYoaS5wdXNoKHQpLHZvaWQgMCE9PXMmJnMuaXNCdWZmZXImJnMuaXNCdWZmZXIodCkpcmV0dXJuIHUoXCJidWZmZXI6XCIpLHUodCk7aWYoXCJvYmplY3RcIj09PXJ8fFwiZnVuY3Rpb25cIj09PXJ8fFwiYXN5bmNmdW5jdGlvblwiPT09cilyZXR1cm4gZT1PYmplY3Qua2V5cyh0KSxvLnVub3JkZXJlZE9iamVjdHMmJihlPWUuc29ydCgpKSwhMT09PW8ucmVzcGVjdFR5cGV8fGEodCl8fGUuc3BsaWNlKDAsMCxcInByb3RvdHlwZVwiLFwiX19wcm90b19fXCIsXCJjb25zdHJ1Y3RvclwiKSxvLmV4Y2x1ZGVLZXlzJiYoZT1lLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4hby5leGNsdWRlS2V5cyhlKX0pKSx1KFwib2JqZWN0OlwiK2UubGVuZ3RoK1wiOlwiKSxuPXRoaXMsZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe24uZGlzcGF0Y2goZSksdShcIjpcIiksby5leGNsdWRlVmFsdWVzfHxuLmRpc3BhdGNoKHRbZV0pLHUoXCIsXCIpfSk7aWYoIXRoaXNbXCJfXCIrcl0pe2lmKG8uaWdub3JlVW5rbm93bilyZXR1cm4gdShcIltcIityK1wiXVwiKTt0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gb2JqZWN0IHR5cGUgXCInK3IrJ1wiJyl9dGhpc1tcIl9cIityXSh0KX0sX2FycmF5OmZ1bmN0aW9uKGUsdCl7dD12b2lkIDAhPT10P3Q6ITEhPT1vLnVub3JkZXJlZEFycmF5czt2YXIgbj10aGlzO2lmKHUoXCJhcnJheTpcIitlLmxlbmd0aCtcIjpcIiksIXR8fGUubGVuZ3RoPD0xKXJldHVybiBlLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIG4uZGlzcGF0Y2goZSl9KTt2YXIgcj1bXSx0PWUubWFwKGZ1bmN0aW9uKGUpe3ZhciB0PW5ldyBsLG49aS5zbGljZSgpO3JldHVybiBmKG8sdCxuKS5kaXNwYXRjaChlKSxyPXIuY29uY2F0KG4uc2xpY2UoaS5sZW5ndGgpKSx0LnJlYWQoKS50b1N0cmluZygpfSk7cmV0dXJuIGk9aS5jb25jYXQociksdC5zb3J0KCksdGhpcy5fYXJyYXkodCwhMSl9LF9kYXRlOmZ1bmN0aW9uKGUpe3JldHVybiB1KFwiZGF0ZTpcIitlLnRvSlNPTigpKX0sX3N5bWJvbDpmdW5jdGlvbihlKXtyZXR1cm4gdShcInN5bWJvbDpcIitlLnRvU3RyaW5nKCkpfSxfZXJyb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJlcnJvcjpcIitlLnRvU3RyaW5nKCkpfSxfYm9vbGVhbjpmdW5jdGlvbihlKXtyZXR1cm4gdShcImJvb2w6XCIrZS50b1N0cmluZygpKX0sX3N0cmluZzpmdW5jdGlvbihlKXt1KFwic3RyaW5nOlwiK2UubGVuZ3RoK1wiOlwiKSx1KGUudG9TdHJpbmcoKSl9LF9mdW5jdGlvbjpmdW5jdGlvbihlKXt1KFwiZm46XCIpLGEoZSk/dGhpcy5kaXNwYXRjaChcIltuYXRpdmVdXCIpOnRoaXMuZGlzcGF0Y2goZS50b1N0cmluZygpKSwhMSE9PW8ucmVzcGVjdEZ1bmN0aW9uTmFtZXMmJnRoaXMuZGlzcGF0Y2goXCJmdW5jdGlvbi1uYW1lOlwiK1N0cmluZyhlLm5hbWUpKSxvLnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXMmJnRoaXMuX29iamVjdChlKX0sX251bWJlcjpmdW5jdGlvbihlKXtyZXR1cm4gdShcIm51bWJlcjpcIitlLnRvU3RyaW5nKCkpfSxfeG1sOmZ1bmN0aW9uKGUpe3JldHVybiB1KFwieG1sOlwiK2UudG9TdHJpbmcoKSl9LF9udWxsOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJOdWxsXCIpfSxfdW5kZWZpbmVkOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJVbmRlZmluZWRcIil9LF9yZWdleHA6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJyZWdleDpcIitlLnRvU3RyaW5nKCkpfSxfdWludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gdShcInVpbnQ4YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDhjbGFtcGVkYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJ1aW50OGNsYW1wZWRhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJpbnQ4YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDE2YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJ1aW50MTZhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQxNmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiB1KFwiaW50MTZhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF91aW50MzJhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gdShcInVpbnQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2ludDMyYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJpbnQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2Zsb2F0MzJhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gdShcImZsb2F0MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9mbG9hdDY0YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJmbG9hdDY0YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfYXJyYXlidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJhcnJheWJ1ZmZlcjpcIiksdGhpcy5kaXNwYXRjaChuZXcgVWludDhBcnJheShlKSl9LF91cmw6ZnVuY3Rpb24oZSl7cmV0dXJuIHUoXCJ1cmw6XCIrZS50b1N0cmluZygpKX0sX21hcDpmdW5jdGlvbihlKXt1KFwibWFwOlwiKTtlPUFycmF5LmZyb20oZSk7cmV0dXJuIHRoaXMuX2FycmF5KGUsITEhPT1vLnVub3JkZXJlZFNldHMpfSxfc2V0OmZ1bmN0aW9uKGUpe3UoXCJzZXQ6XCIpO2U9QXJyYXkuZnJvbShlKTtyZXR1cm4gdGhpcy5fYXJyYXkoZSwhMSE9PW8udW5vcmRlcmVkU2V0cyl9LF9maWxlOmZ1bmN0aW9uKGUpe3JldHVybiB1KFwiZmlsZTpcIiksdGhpcy5kaXNwYXRjaChbZS5uYW1lLGUuc2l6ZSxlLnR5cGUsZS5sYXN0TW9kZmllZF0pfSxfYmxvYjpmdW5jdGlvbigpe2lmKG8uaWdub3JlVW5rbm93bilyZXR1cm4gdShcIltibG9iXVwiKTt0aHJvdyBFcnJvcignSGFzaGluZyBCbG9iIG9iamVjdHMgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcXG4oc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9wdWxlb3Mvb2JqZWN0LWhhc2gvaXNzdWVzLzI2KVxcblVzZSBcIm9wdGlvbnMucmVwbGFjZXJcIiBvciBcIm9wdGlvbnMuaWdub3JlVW5rbm93blwiXFxuJyl9LF9kb213aW5kb3c6ZnVuY3Rpb24oKXtyZXR1cm4gdShcImRvbXdpbmRvd1wiKX0sX2JpZ2ludDpmdW5jdGlvbihlKXtyZXR1cm4gdShcImJpZ2ludDpcIitlLnRvU3RyaW5nKCkpfSxfcHJvY2VzczpmdW5jdGlvbigpe3JldHVybiB1KFwicHJvY2Vzc1wiKX0sX3RpbWVyOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJ0aW1lclwiKX0sX3BpcGU6ZnVuY3Rpb24oKXtyZXR1cm4gdShcInBpcGVcIil9LF90Y3A6ZnVuY3Rpb24oKXtyZXR1cm4gdShcInRjcFwiKX0sX3VkcDpmdW5jdGlvbigpe3JldHVybiB1KFwidWRwXCIpfSxfdHR5OmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJ0dHlcIil9LF9zdGF0d2F0Y2hlcjpmdW5jdGlvbigpe3JldHVybiB1KFwic3RhdHdhdGNoZXJcIil9LF9zZWN1cmVjb250ZXh0OmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJzZWN1cmVjb250ZXh0XCIpfSxfY29ubmVjdGlvbjpmdW5jdGlvbigpe3JldHVybiB1KFwiY29ubmVjdGlvblwiKX0sX3psaWI6ZnVuY3Rpb24oKXtyZXR1cm4gdShcInpsaWJcIil9LF9jb250ZXh0OmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJjb250ZXh0XCIpfSxfbm9kZXNjcmlwdDpmdW5jdGlvbigpe3JldHVybiB1KFwibm9kZXNjcmlwdFwiKX0sX2h0dHBwYXJzZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdShcImh0dHBwYXJzZXJcIil9LF9kYXRhdmlldzpmdW5jdGlvbigpe3JldHVybiB1KFwiZGF0YXZpZXdcIil9LF9zaWduYWw6ZnVuY3Rpb24oKXtyZXR1cm4gdShcInNpZ25hbFwiKX0sX2ZzZXZlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdShcImZzZXZlbnRcIil9LF90bHN3cmFwOmZ1bmN0aW9uKCl7cmV0dXJuIHUoXCJ0bHN3cmFwXCIpfX19ZnVuY3Rpb24gbCgpe3JldHVybntidWY6XCJcIix3cml0ZTpmdW5jdGlvbihlKXt0aGlzLmJ1Zis9ZX0sZW5kOmZ1bmN0aW9uKGUpe3RoaXMuYnVmKz1lfSxyZWFkOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYnVmfX19bS53cml0ZVRvU3RyZWFtPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gdm9pZCAwPT09biYmKG49dCx0PXt9KSxmKHQ9dShlLHQpLG4pLmRpc3BhdGNoKGUpfX0uY2FsbCh0aGlzLHcoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSx3KFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvZmFrZV85YTVhYTQ5ZC5qc1wiLFwiL1wiKX0se2J1ZmZlcjozLGNyeXB0bzo1LGxZcG9JMjoxMX1dLDI6W2Z1bmN0aW9uKGUsdCxmKXshZnVuY3Rpb24oZSx0LG4scixvLGksdSxzLGEpeyFmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjt2YXIgYT1cInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheT9VaW50OEFycmF5OkFycmF5LHQ9XCIrXCIuY2hhckNvZGVBdCgwKSxuPVwiL1wiLmNoYXJDb2RlQXQoMCkscj1cIjBcIi5jaGFyQ29kZUF0KDApLG89XCJhXCIuY2hhckNvZGVBdCgwKSxpPVwiQVwiLmNoYXJDb2RlQXQoMCksdT1cIi1cIi5jaGFyQ29kZUF0KDApLHM9XCJfXCIuY2hhckNvZGVBdCgwKTtmdW5jdGlvbiBmKGUpe2U9ZS5jaGFyQ29kZUF0KDApO3JldHVybiBlPT09dHx8ZT09PXU/NjI6ZT09PW58fGU9PT1zPzYzOmU8cj8tMTplPHIrMTA/ZS1yKzI2KzI2OmU8aSsyNj9lLWk6ZTxvKzI2P2UtbysyNjp2b2lkIDB9ZS50b0J5dGVBcnJheT1mdW5jdGlvbihlKXt2YXIgdCxuO2lmKDA8ZS5sZW5ndGglNCl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0XCIpO3ZhciByPWUubGVuZ3RoLHI9XCI9XCI9PT1lLmNoYXJBdChyLTIpPzI6XCI9XCI9PT1lLmNoYXJBdChyLTEpPzE6MCxvPW5ldyBhKDMqZS5sZW5ndGgvNC1yKSxpPTA8cj9lLmxlbmd0aC00OmUubGVuZ3RoLHU9MDtmdW5jdGlvbiBzKGUpe29bdSsrXT1lfWZvcih0PTA7dDxpO3QrPTQsMClzKCgxNjcxMTY4MCYobj1mKGUuY2hhckF0KHQpKTw8MTh8ZihlLmNoYXJBdCh0KzEpKTw8MTJ8ZihlLmNoYXJBdCh0KzIpKTw8NnxmKGUuY2hhckF0KHQrMykpKSk+PjE2KSxzKCg2NTI4MCZuKT4+OCkscygyNTUmbik7cmV0dXJuIDI9PXI/cygyNTUmKG49ZihlLmNoYXJBdCh0KSk8PDJ8ZihlLmNoYXJBdCh0KzEpKT4+NCkpOjE9PXImJihzKChuPWYoZS5jaGFyQXQodCkpPDwxMHxmKGUuY2hhckF0KHQrMSkpPDw0fGYoZS5jaGFyQXQodCsyKSk+PjIpPj44JjI1NSkscygyNTUmbikpLG99LGUuZnJvbUJ5dGVBcnJheT1mdW5jdGlvbihlKXt2YXIgdCxuLHIsbyxpPWUubGVuZ3RoJTMsdT1cIlwiO2Z1bmN0aW9uIHMoZSl7cmV0dXJuXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIuY2hhckF0KGUpfWZvcih0PTAscj1lLmxlbmd0aC1pO3Q8cjt0Kz0zKW49KGVbdF08PDE2KSsoZVt0KzFdPDw4KStlW3QrMl0sdSs9cygobz1uKT4+MTgmNjMpK3Mobz4+MTImNjMpK3Mobz4+NiY2Mykrcyg2MyZvKTtzd2l0Y2goaSl7Y2FzZSAxOnU9KHUrPXMoKG49ZVtlLmxlbmd0aC0xXSk+PjIpKStzKG48PDQmNjMpK1wiPT1cIjticmVhaztjYXNlIDI6dT0odT0odSs9cygobj0oZVtlLmxlbmd0aC0yXTw8OCkrZVtlLmxlbmd0aC0xXSk+PjEwKSkrcyhuPj40JjYzKSkrcyhuPDwyJjYzKStcIj1cIn1yZXR1cm4gdX19KHZvaWQgMD09PWY/dGhpcy5iYXNlNjRqcz17fTpmKX0uY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliXCIpfSx7YnVmZmVyOjMsbFlwb0kyOjExfV0sMzpbZnVuY3Rpb24oTyxlLEgpeyFmdW5jdGlvbihlLG4sZixyLGgscCxnLHksdyl7dmFyIGE9TyhcImJhc2U2NC1qc1wiKSxpPU8oXCJpZWVlNzU0XCIpO2Z1bmN0aW9uIGYoZSx0LG4pe2lmKCEodGhpcyBpbnN0YW5jZW9mIGYpKXJldHVybiBuZXcgZihlLHQsbik7dmFyIHIsbyxpLHUscz10eXBlb2YgZTtpZihcImJhc2U2NFwiPT09dCYmXCJzdHJpbmdcIj09cylmb3IoZT0odT1lKS50cmltP3UudHJpbSgpOnUucmVwbGFjZSgvXlxccyt8XFxzKyQvZyxcIlwiKTtlLmxlbmd0aCU0IT0wOyllKz1cIj1cIjtpZihcIm51bWJlclwiPT1zKXI9aihlKTtlbHNlIGlmKFwic3RyaW5nXCI9PXMpcj1mLmJ5dGVMZW5ndGgoZSx0KTtlbHNle2lmKFwib2JqZWN0XCIhPXMpdGhyb3cgbmV3IEVycm9yKFwiRmlyc3QgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBudW1iZXIsIGFycmF5IG9yIHN0cmluZy5cIik7cj1qKGUubGVuZ3RoKX1pZihmLl91c2VUeXBlZEFycmF5cz9vPWYuX2F1Z21lbnQobmV3IFVpbnQ4QXJyYXkocikpOigobz10aGlzKS5sZW5ndGg9cixvLl9pc0J1ZmZlcj0hMCksZi5fdXNlVHlwZWRBcnJheXMmJlwibnVtYmVyXCI9PXR5cGVvZiBlLmJ5dGVMZW5ndGgpby5fc2V0KGUpO2Vsc2UgaWYoQyh1PWUpfHxmLmlzQnVmZmVyKHUpfHx1JiZcIm9iamVjdFwiPT10eXBlb2YgdSYmXCJudW1iZXJcIj09dHlwZW9mIHUubGVuZ3RoKWZvcihpPTA7aTxyO2krKylmLmlzQnVmZmVyKGUpP29baV09ZS5yZWFkVUludDgoaSk6b1tpXT1lW2ldO2Vsc2UgaWYoXCJzdHJpbmdcIj09cylvLndyaXRlKGUsMCx0KTtlbHNlIGlmKFwibnVtYmVyXCI9PXMmJiFmLl91c2VUeXBlZEFycmF5cyYmIW4pZm9yKGk9MDtpPHI7aSsrKW9baV09MDtyZXR1cm4gb31mdW5jdGlvbiBiKGUsdCxuLHIpe3JldHVybiBmLl9jaGFyc1dyaXR0ZW49YyhmdW5jdGlvbihlKXtmb3IodmFyIHQ9W10sbj0wO248ZS5sZW5ndGg7bisrKXQucHVzaCgyNTUmZS5jaGFyQ29kZUF0KG4pKTtyZXR1cm4gdH0odCksZSxuLHIpfWZ1bmN0aW9uIG0oZSx0LG4scil7cmV0dXJuIGYuX2NoYXJzV3JpdHRlbj1jKGZ1bmN0aW9uKGUpe2Zvcih2YXIgdCxuLHI9W10sbz0wO288ZS5sZW5ndGg7bysrKW49ZS5jaGFyQ29kZUF0KG8pLHQ9bj4+OCxuPW4lMjU2LHIucHVzaChuKSxyLnB1c2godCk7cmV0dXJuIHJ9KHQpLGUsbixyKX1mdW5jdGlvbiB2KGUsdCxuKXt2YXIgcj1cIlwiO249TWF0aC5taW4oZS5sZW5ndGgsbik7Zm9yKHZhciBvPXQ7bzxuO28rKylyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGVbb10pO3JldHVybiByfWZ1bmN0aW9uIG8oZSx0LG4scil7cnx8KGQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKG51bGwhPXQsXCJtaXNzaW5nIG9mZnNldFwiKSxkKHQrMTxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKTt2YXIgbyxyPWUubGVuZ3RoO2lmKCEocjw9dCkpcmV0dXJuIG4/KG89ZVt0XSx0KzE8ciYmKG98PWVbdCsxXTw8OCkpOihvPWVbdF08PDgsdCsxPHImJihvfD1lW3QrMV0pKSxvfWZ1bmN0aW9uIHUoZSx0LG4scil7cnx8KGQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKG51bGwhPXQsXCJtaXNzaW5nIG9mZnNldFwiKSxkKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKTt2YXIgbyxyPWUubGVuZ3RoO2lmKCEocjw9dCkpcmV0dXJuIG4/KHQrMjxyJiYobz1lW3QrMl08PDE2KSx0KzE8ciYmKG98PWVbdCsxXTw8OCksb3w9ZVt0XSx0KzM8ciYmKG8rPWVbdCszXTw8MjQ+Pj4wKSk6KHQrMTxyJiYobz1lW3QrMV08PDE2KSx0KzI8ciYmKG98PWVbdCsyXTw8OCksdCszPHImJihvfD1lW3QrM10pLG8rPWVbdF08PDI0Pj4+MCksb31mdW5jdGlvbiBfKGUsdCxuLHIpe2lmKHJ8fChkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZChudWxsIT10LFwibWlzc2luZyBvZmZzZXRcIiksZCh0KzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlLmxlbmd0aDw9dCkpcmV0dXJuIHI9byhlLHQsbiwhMCksMzI3Njgmcj8tMSooNjU1MzUtcisxKTpyfWZ1bmN0aW9uIEUoZSx0LG4scil7aWYocnx8KGQoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKG51bGwhPXQsXCJtaXNzaW5nIG9mZnNldFwiKSxkKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSwhKGUubGVuZ3RoPD10KSlyZXR1cm4gcj11KGUsdCxuLCEwKSwyMTQ3NDgzNjQ4JnI/LTEqKDQyOTQ5NjcyOTUtcisxKTpyfWZ1bmN0aW9uIEkoZSx0LG4scil7cmV0dXJuIHJ8fChkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZCh0KzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksaS5yZWFkKGUsdCxuLDIzLDQpfWZ1bmN0aW9uIEEoZSx0LG4scil7cmV0dXJuIHJ8fChkKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZCh0Kzc8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksaS5yZWFkKGUsdCxuLDUyLDgpfWZ1bmN0aW9uIHMoZSx0LG4scixvKXtvfHwoZChudWxsIT10LFwibWlzc2luZyB2YWx1ZVwiKSxkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZChudWxsIT1uLFwibWlzc2luZyBvZmZzZXRcIiksZChuKzE8ZS5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksWSh0LDY1NTM1KSk7bz1lLmxlbmd0aDtpZighKG88PW4pKWZvcih2YXIgaT0wLHU9TWF0aC5taW4oby1uLDIpO2k8dTtpKyspZVtuK2ldPSh0JjI1NTw8OCoocj9pOjEtaSkpPj4+OCoocj9pOjEtaSl9ZnVuY3Rpb24gbChlLHQsbixyLG8pe298fChkKG51bGwhPXQsXCJtaXNzaW5nIHZhbHVlXCIpLGQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKG51bGwhPW4sXCJtaXNzaW5nIG9mZnNldFwiKSxkKG4rMzxlLmxlbmd0aCxcInRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxZKHQsNDI5NDk2NzI5NSkpO289ZS5sZW5ndGg7aWYoIShvPD1uKSlmb3IodmFyIGk9MCx1PU1hdGgubWluKG8tbiw0KTtpPHU7aSsrKWVbbitpXT10Pj4+OCoocj9pOjMtaSkmMjU1fWZ1bmN0aW9uIEIoZSx0LG4scixvKXtvfHwoZChudWxsIT10LFwibWlzc2luZyB2YWx1ZVwiKSxkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZChudWxsIT1uLFwibWlzc2luZyBvZmZzZXRcIiksZChuKzE8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksRih0LDMyNzY3LC0zMjc2OCkpLGUubGVuZ3RoPD1ufHxzKGUsMDw9dD90OjY1NTM1K3QrMSxuLHIsbyl9ZnVuY3Rpb24gTChlLHQsbixyLG8pe298fChkKG51bGwhPXQsXCJtaXNzaW5nIHZhbHVlXCIpLGQoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxkKG51bGwhPW4sXCJtaXNzaW5nIG9mZnNldFwiKSxkKG4rMzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxGKHQsMjE0NzQ4MzY0NywtMjE0NzQ4MzY0OCkpLGUubGVuZ3RoPD1ufHxsKGUsMDw9dD90OjQyOTQ5NjcyOTUrdCsxLG4scixvKX1mdW5jdGlvbiBVKGUsdCxuLHIsbyl7b3x8KGQobnVsbCE9dCxcIm1pc3NpbmcgdmFsdWVcIiksZChcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLGQobnVsbCE9bixcIm1pc3Npbmcgb2Zmc2V0XCIpLGQobiszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLEQodCwzNDAyODIzNDY2Mzg1Mjg4NmUyMiwtMzQwMjgyMzQ2NjM4NTI4ODZlMjIpKSxlLmxlbmd0aDw9bnx8aS53cml0ZShlLHQsbixyLDIzLDQpfWZ1bmN0aW9uIHgoZSx0LG4scixvKXtvfHwoZChudWxsIT10LFwibWlzc2luZyB2YWx1ZVwiKSxkKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksZChudWxsIT1uLFwibWlzc2luZyBvZmZzZXRcIiksZChuKzc8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksRCh0LDE3OTc2OTMxMzQ4NjIzMTU3ZTI5MiwtMTc5NzY5MzEzNDg2MjMxNTdlMjkyKSksZS5sZW5ndGg8PW58fGkud3JpdGUoZSx0LG4sciw1Miw4KX1ILkJ1ZmZlcj1mLEguU2xvd0J1ZmZlcj1mLEguSU5TUEVDVF9NQVhfQllURVM9NTAsZi5wb29sU2l6ZT04MTkyLGYuX3VzZVR5cGVkQXJyYXlzPWZ1bmN0aW9uKCl7dHJ5e3ZhciBlPW5ldyBBcnJheUJ1ZmZlcigwKSx0PW5ldyBVaW50OEFycmF5KGUpO3JldHVybiB0LmZvbz1mdW5jdGlvbigpe3JldHVybiA0Mn0sNDI9PT10LmZvbygpJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LnN1YmFycmF5fWNhdGNoKGUpe3JldHVybiExfX0oKSxmLmlzRW5jb2Rpbmc9ZnVuY3Rpb24oZSl7c3dpdGNoKFN0cmluZyhlKS50b0xvd2VyQ2FzZSgpKXtjYXNlXCJoZXhcIjpjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpjYXNlXCJhc2NpaVwiOmNhc2VcImJpbmFyeVwiOmNhc2VcImJhc2U2NFwiOmNhc2VcInJhd1wiOmNhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOnJldHVybiEwO2RlZmF1bHQ6cmV0dXJuITF9fSxmLmlzQnVmZmVyPWZ1bmN0aW9uKGUpe3JldHVybiEobnVsbD09ZXx8IWUuX2lzQnVmZmVyKX0sZi5ieXRlTGVuZ3RoPWZ1bmN0aW9uKGUsdCl7dmFyIG47c3dpdGNoKGUrPVwiXCIsdHx8XCJ1dGY4XCIpe2Nhc2VcImhleFwiOm49ZS5sZW5ndGgvMjticmVhaztjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpuPVQoZSkubGVuZ3RoO2JyZWFrO2Nhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwicmF3XCI6bj1lLmxlbmd0aDticmVhaztjYXNlXCJiYXNlNjRcIjpuPU0oZSkubGVuZ3RoO2JyZWFrO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOm49MiplLmxlbmd0aDticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIG59LGYuY29uY2F0PWZ1bmN0aW9uKGUsdCl7aWYoZChDKGUpLFwiVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG5saXN0IHNob3VsZCBiZSBhbiBBcnJheS5cIiksMD09PWUubGVuZ3RoKXJldHVybiBuZXcgZigwKTtpZigxPT09ZS5sZW5ndGgpcmV0dXJuIGVbMF07aWYoXCJudW1iZXJcIiE9dHlwZW9mIHQpZm9yKG89dD0wO288ZS5sZW5ndGg7bysrKXQrPWVbb10ubGVuZ3RoO2Zvcih2YXIgbj1uZXcgZih0KSxyPTAsbz0wO288ZS5sZW5ndGg7bysrKXt2YXIgaT1lW29dO2kuY29weShuLHIpLHIrPWkubGVuZ3RofXJldHVybiBufSxmLnByb3RvdHlwZS53cml0ZT1mdW5jdGlvbihlLHQsbixyKXtpc0Zpbml0ZSh0KT9pc0Zpbml0ZShuKXx8KHI9bixuPXZvaWQgMCk6KGE9cixyPXQsdD1uLG49YSksdD1OdW1iZXIodCl8fDA7dmFyIG8saSx1LHMsYT10aGlzLmxlbmd0aC10O3N3aXRjaCgoIW58fGE8KG49TnVtYmVyKG4pKSkmJihuPWEpLHI9U3RyaW5nKHJ8fFwidXRmOFwiKS50b0xvd2VyQ2FzZSgpKXtjYXNlXCJoZXhcIjpvPWZ1bmN0aW9uKGUsdCxuLHIpe249TnVtYmVyKG4pfHwwO3ZhciBvPWUubGVuZ3RoLW47KCFyfHxvPChyPU51bWJlcihyKSkpJiYocj1vKSxkKChvPXQubGVuZ3RoKSUyPT0wLFwiSW52YWxpZCBoZXggc3RyaW5nXCIpLG8vMjxyJiYocj1vLzIpO2Zvcih2YXIgaT0wO2k8cjtpKyspe3ZhciB1PXBhcnNlSW50KHQuc3Vic3RyKDIqaSwyKSwxNik7ZCghaXNOYU4odSksXCJJbnZhbGlkIGhleCBzdHJpbmdcIiksZVtuK2ldPXV9cmV0dXJuIGYuX2NoYXJzV3JpdHRlbj0yKmksaX0odGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6aT10aGlzLHU9dCxzPW4sbz1mLl9jaGFyc1dyaXR0ZW49YyhUKGUpLGksdSxzKTticmVhaztjYXNlXCJhc2NpaVwiOmNhc2VcImJpbmFyeVwiOm89Yih0aGlzLGUsdCxuKTticmVhaztjYXNlXCJiYXNlNjRcIjppPXRoaXMsdT10LHM9bixvPWYuX2NoYXJzV3JpdHRlbj1jKE0oZSksaSx1LHMpO2JyZWFrO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOm89bSh0aGlzLGUsdCxuKTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIlVua25vd24gZW5jb2RpbmdcIil9cmV0dXJuIG99LGYucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKGUsdCxuKXt2YXIgcixvLGksdSxzPXRoaXM7aWYoZT1TdHJpbmcoZXx8XCJ1dGY4XCIpLnRvTG93ZXJDYXNlKCksdD1OdW1iZXIodCl8fDAsKG49dm9pZCAwIT09bj9OdW1iZXIobik6cy5sZW5ndGgpPT09dClyZXR1cm5cIlwiO3N3aXRjaChlKXtjYXNlXCJoZXhcIjpyPWZ1bmN0aW9uKGUsdCxuKXt2YXIgcj1lLmxlbmd0aDsoIXR8fHQ8MCkmJih0PTApOyghbnx8bjwwfHxyPG4pJiYobj1yKTtmb3IodmFyIG89XCJcIixpPXQ7aTxuO2krKylvKz1rKGVbaV0pO3JldHVybiBvfShzLHQsbik7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6cj1mdW5jdGlvbihlLHQsbil7dmFyIHI9XCJcIixvPVwiXCI7bj1NYXRoLm1pbihlLmxlbmd0aCxuKTtmb3IodmFyIGk9dDtpPG47aSsrKWVbaV08PTEyNz8ocis9TihvKStTdHJpbmcuZnJvbUNoYXJDb2RlKGVbaV0pLG89XCJcIik6bys9XCIlXCIrZVtpXS50b1N0cmluZygxNik7cmV0dXJuIHIrTihvKX0ocyx0LG4pO2JyZWFrO2Nhc2VcImFzY2lpXCI6Y2FzZVwiYmluYXJ5XCI6cj12KHMsdCxuKTticmVhaztjYXNlXCJiYXNlNjRcIjpvPXMsdT1uLHI9MD09PShpPXQpJiZ1PT09by5sZW5ndGg/YS5mcm9tQnl0ZUFycmF5KG8pOmEuZnJvbUJ5dGVBcnJheShvLnNsaWNlKGksdSkpO2JyZWFrO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOnI9ZnVuY3Rpb24oZSx0LG4pe2Zvcih2YXIgcj1lLnNsaWNlKHQsbiksbz1cIlwiLGk9MDtpPHIubGVuZ3RoO2krPTIpbys9U3RyaW5nLmZyb21DaGFyQ29kZShyW2ldKzI1NipyW2krMV0pO3JldHVybiBvfShzLHQsbik7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiByfSxmLnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm57dHlwZTpcIkJ1ZmZlclwiLGRhdGE6QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyfHx0aGlzLDApfX0sZi5wcm90b3R5cGUuY29weT1mdW5jdGlvbihlLHQsbixyKXtpZih0PXR8fDAsKHI9cnx8MD09PXI/cjp0aGlzLmxlbmd0aCkhPT0obj1ufHwwKSYmMCE9PWUubGVuZ3RoJiYwIT09dGhpcy5sZW5ndGgpe2Qobjw9cixcInNvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0XCIpLGQoMDw9dCYmdDxlLmxlbmd0aCxcInRhcmdldFN0YXJ0IG91dCBvZiBib3VuZHNcIiksZCgwPD1uJiZuPHRoaXMubGVuZ3RoLFwic291cmNlU3RhcnQgb3V0IG9mIGJvdW5kc1wiKSxkKDA8PXImJnI8PXRoaXMubGVuZ3RoLFwic291cmNlRW5kIG91dCBvZiBib3VuZHNcIikscj50aGlzLmxlbmd0aCYmKHI9dGhpcy5sZW5ndGgpO3ZhciBvPShyPWUubGVuZ3RoLXQ8ci1uP2UubGVuZ3RoLXQrbjpyKS1uO2lmKG88MTAwfHwhZi5fdXNlVHlwZWRBcnJheXMpZm9yKHZhciBpPTA7aTxvO2krKyllW2krdF09dGhpc1tpK25dO2Vsc2UgZS5fc2V0KHRoaXMuc3ViYXJyYXkobixuK28pLHQpfX0sZi5wcm90b3R5cGUuc2xpY2U9ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLmxlbmd0aDtpZihlPVMoZSxuLDApLHQ9Uyh0LG4sbiksZi5fdXNlVHlwZWRBcnJheXMpcmV0dXJuIGYuX2F1Z21lbnQodGhpcy5zdWJhcnJheShlLHQpKTtmb3IodmFyIHI9dC1lLG89bmV3IGYocix2b2lkIDAsITApLGk9MDtpPHI7aSsrKW9baV09dGhpc1tpK2VdO3JldHVybiBvfSxmLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGNvbnNvbGUubG9nKFwiLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuXCIpLHRoaXMucmVhZFVJbnQ4KGUpfSxmLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gY29uc29sZS5sb2coXCIuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC5cIiksdGhpcy53cml0ZVVJbnQ4KGUsdCl9LGYucHJvdG90eXBlLnJlYWRVSW50OD1mdW5jdGlvbihlLHQpe2lmKHR8fChkKG51bGwhPWUsXCJtaXNzaW5nIG9mZnNldFwiKSxkKGU8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlPj10aGlzLmxlbmd0aCkpcmV0dXJuIHRoaXNbZV19LGYucHJvdG90eXBlLnJlYWRVSW50MTZMRT1mdW5jdGlvbihlLHQpe3JldHVybiBvKHRoaXMsZSwhMCx0KX0sZi5wcm90b3R5cGUucmVhZFVJbnQxNkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG8odGhpcyxlLCExLHQpfSxmLnByb3RvdHlwZS5yZWFkVUludDMyTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdSh0aGlzLGUsITAsdCl9LGYucHJvdG90eXBlLnJlYWRVSW50MzJCRT1mdW5jdGlvbihlLHQpe3JldHVybiB1KHRoaXMsZSwhMSx0KX0sZi5wcm90b3R5cGUucmVhZEludDg9ZnVuY3Rpb24oZSx0KXtpZih0fHwoZChudWxsIT1lLFwibWlzc2luZyBvZmZzZXRcIiksZChlPHRoaXMubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLCEoZT49dGhpcy5sZW5ndGgpKXJldHVybiAxMjgmdGhpc1tlXT8tMSooMjU1LXRoaXNbZV0rMSk6dGhpc1tlXX0sZi5wcm90b3R5cGUucmVhZEludDE2TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gXyh0aGlzLGUsITAsdCl9LGYucHJvdG90eXBlLnJlYWRJbnQxNkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIF8odGhpcyxlLCExLHQpfSxmLnByb3RvdHlwZS5yZWFkSW50MzJMRT1mdW5jdGlvbihlLHQpe3JldHVybiBFKHRoaXMsZSwhMCx0KX0sZi5wcm90b3R5cGUucmVhZEludDMyQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gRSh0aGlzLGUsITEsdCl9LGYucHJvdG90eXBlLnJlYWRGbG9hdExFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEkodGhpcyxlLCEwLHQpfSxmLnByb3RvdHlwZS5yZWFkRmxvYXRCRT1mdW5jdGlvbihlLHQpe3JldHVybiBJKHRoaXMsZSwhMSx0KX0sZi5wcm90b3R5cGUucmVhZERvdWJsZUxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEEodGhpcyxlLCEwLHQpfSxmLnByb3RvdHlwZS5yZWFkRG91YmxlQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQSh0aGlzLGUsITEsdCl9LGYucHJvdG90eXBlLndyaXRlVUludDg9ZnVuY3Rpb24oZSx0LG4pe258fChkKG51bGwhPWUsXCJtaXNzaW5nIHZhbHVlXCIpLGQobnVsbCE9dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLGQodDx0aGlzLmxlbmd0aCxcInRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxZKGUsMjU1KSksdD49dGhpcy5sZW5ndGh8fCh0aGlzW3RdPWUpfSxmLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFPWZ1bmN0aW9uKGUsdCxuKXtzKHRoaXMsZSx0LCEwLG4pfSxmLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFPWZ1bmN0aW9uKGUsdCxuKXtzKHRoaXMsZSx0LCExLG4pfSxmLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFPWZ1bmN0aW9uKGUsdCxuKXtsKHRoaXMsZSx0LCEwLG4pfSxmLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFPWZ1bmN0aW9uKGUsdCxuKXtsKHRoaXMsZSx0LCExLG4pfSxmLnByb3RvdHlwZS53cml0ZUludDg9ZnVuY3Rpb24oZSx0LG4pe258fChkKG51bGwhPWUsXCJtaXNzaW5nIHZhbHVlXCIpLGQobnVsbCE9dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLGQodDx0aGlzLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxGKGUsMTI3LC0xMjgpKSx0Pj10aGlzLmxlbmd0aHx8KDA8PWU/dGhpcy53cml0ZVVJbnQ4KGUsdCxuKTp0aGlzLndyaXRlVUludDgoMjU1K2UrMSx0LG4pKX0sZi5wcm90b3R5cGUud3JpdGVJbnQxNkxFPWZ1bmN0aW9uKGUsdCxuKXtCKHRoaXMsZSx0LCEwLG4pfSxmLnByb3RvdHlwZS53cml0ZUludDE2QkU9ZnVuY3Rpb24oZSx0LG4pe0IodGhpcyxlLHQsITEsbil9LGYucHJvdG90eXBlLndyaXRlSW50MzJMRT1mdW5jdGlvbihlLHQsbil7TCh0aGlzLGUsdCwhMCxuKX0sZi5wcm90b3R5cGUud3JpdGVJbnQzMkJFPWZ1bmN0aW9uKGUsdCxuKXtMKHRoaXMsZSx0LCExLG4pfSxmLnByb3RvdHlwZS53cml0ZUZsb2F0TEU9ZnVuY3Rpb24oZSx0LG4pe1UodGhpcyxlLHQsITAsbil9LGYucHJvdG90eXBlLndyaXRlRmxvYXRCRT1mdW5jdGlvbihlLHQsbil7VSh0aGlzLGUsdCwhMSxuKX0sZi5wcm90b3R5cGUud3JpdGVEb3VibGVMRT1mdW5jdGlvbihlLHQsbil7eCh0aGlzLGUsdCwhMCxuKX0sZi5wcm90b3R5cGUud3JpdGVEb3VibGVCRT1mdW5jdGlvbihlLHQsbil7eCh0aGlzLGUsdCwhMSxuKX0sZi5wcm90b3R5cGUuZmlsbD1mdW5jdGlvbihlLHQsbil7aWYodD10fHwwLG49bnx8dGhpcy5sZW5ndGgsZChcIm51bWJlclwiPT10eXBlb2YoZT1cInN0cmluZ1wiPT10eXBlb2YoZT1lfHwwKT9lLmNoYXJDb2RlQXQoMCk6ZSkmJiFpc05hTihlKSxcInZhbHVlIGlzIG5vdCBhIG51bWJlclwiKSxkKHQ8PW4sXCJlbmQgPCBzdGFydFwiKSxuIT09dCYmMCE9PXRoaXMubGVuZ3RoKXtkKDA8PXQmJnQ8dGhpcy5sZW5ndGgsXCJzdGFydCBvdXQgb2YgYm91bmRzXCIpLGQoMDw9biYmbjw9dGhpcy5sZW5ndGgsXCJlbmQgb3V0IG9mIGJvdW5kc1wiKTtmb3IodmFyIHI9dDtyPG47cisrKXRoaXNbcl09ZX19LGYucHJvdG90eXBlLmluc3BlY3Q9ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10sdD10aGlzLmxlbmd0aCxuPTA7bjx0O24rKylpZihlW25dPWsodGhpc1tuXSksbj09PUguSU5TUEVDVF9NQVhfQllURVMpe2VbbisxXT1cIi4uLlwiO2JyZWFrfXJldHVyblwiPEJ1ZmZlciBcIitlLmpvaW4oXCIgXCIpK1wiPlwifSxmLnByb3RvdHlwZS50b0FycmF5QnVmZmVyPWZ1bmN0aW9uKCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFVpbnQ4QXJyYXkpdGhyb3cgbmV3IEVycm9yKFwiQnVmZmVyLnRvQXJyYXlCdWZmZXIgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7aWYoZi5fdXNlVHlwZWRBcnJheXMpcmV0dXJuIG5ldyBmKHRoaXMpLmJ1ZmZlcjtmb3IodmFyIGU9bmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpLHQ9MCxuPWUubGVuZ3RoO3Q8bjt0Kz0xKWVbdF09dGhpc1t0XTtyZXR1cm4gZS5idWZmZXJ9O3ZhciB0PWYucHJvdG90eXBlO2Z1bmN0aW9uIFMoZSx0LG4pe3JldHVyblwibnVtYmVyXCIhPXR5cGVvZiBlP246dDw9KGU9fn5lKT90OjA8PWV8fDA8PShlKz10KT9lOjB9ZnVuY3Rpb24gaihlKXtyZXR1cm4oZT1+fk1hdGguY2VpbCgrZSkpPDA/MDplfWZ1bmN0aW9uIEMoZSl7cmV0dXJuKEFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKGUpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKX0pKGUpfWZ1bmN0aW9uIGsoZSl7cmV0dXJuIGU8MTY/XCIwXCIrZS50b1N0cmluZygxNik6ZS50b1N0cmluZygxNil9ZnVuY3Rpb24gVChlKXtmb3IodmFyIHQ9W10sbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgcj1lLmNoYXJDb2RlQXQobik7aWYocjw9MTI3KXQucHVzaChlLmNoYXJDb2RlQXQobikpO2Vsc2UgZm9yKHZhciBvPW4saT0oNTUyOTY8PXImJnI8PTU3MzQzJiZuKyssZW5jb2RlVVJJQ29tcG9uZW50KGUuc2xpY2UobyxuKzEpKS5zdWJzdHIoMSkuc3BsaXQoXCIlXCIpKSx1PTA7dTxpLmxlbmd0aDt1KyspdC5wdXNoKHBhcnNlSW50KGlbdV0sMTYpKX1yZXR1cm4gdH1mdW5jdGlvbiBNKGUpe3JldHVybiBhLnRvQnl0ZUFycmF5KGUpfWZ1bmN0aW9uIGMoZSx0LG4scil7Zm9yKHZhciBvPTA7bzxyJiYhKG8rbj49dC5sZW5ndGh8fG8+PWUubGVuZ3RoKTtvKyspdFtvK25dPWVbb107cmV0dXJuIG99ZnVuY3Rpb24gTihlKXt0cnl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlKX1jYXRjaChlKXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg2NTUzMyl9fWZ1bmN0aW9uIFkoZSx0KXtkKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSxkKDA8PWUsXCJzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZVwiKSxkKGU8PXQsXCJ2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlXCIpLGQoTWF0aC5mbG9vcihlKT09PWUsXCJ2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudFwiKX1mdW5jdGlvbiBGKGUsdCxuKXtkKFwibnVtYmVyXCI9PXR5cGVvZiBlLFwiY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlclwiKSxkKGU8PXQsXCJ2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWVcIiksZChuPD1lLFwidmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZVwiKSxkKE1hdGguZmxvb3IoZSk9PT1lLFwidmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnRcIil9ZnVuY3Rpb24gRChlLHQsbil7ZChcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksZChlPD10LFwidmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlXCIpLGQobjw9ZSxcInZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWVcIil9ZnVuY3Rpb24gZChlLHQpe2lmKCFlKXRocm93IG5ldyBFcnJvcih0fHxcIkZhaWxlZCBhc3NlcnRpb25cIil9Zi5fYXVnbWVudD1mdW5jdGlvbihlKXtyZXR1cm4gZS5faXNCdWZmZXI9ITAsZS5fZ2V0PWUuZ2V0LGUuX3NldD1lLnNldCxlLmdldD10LmdldCxlLnNldD10LnNldCxlLndyaXRlPXQud3JpdGUsZS50b1N0cmluZz10LnRvU3RyaW5nLGUudG9Mb2NhbGVTdHJpbmc9dC50b1N0cmluZyxlLnRvSlNPTj10LnRvSlNPTixlLmNvcHk9dC5jb3B5LGUuc2xpY2U9dC5zbGljZSxlLnJlYWRVSW50OD10LnJlYWRVSW50OCxlLnJlYWRVSW50MTZMRT10LnJlYWRVSW50MTZMRSxlLnJlYWRVSW50MTZCRT10LnJlYWRVSW50MTZCRSxlLnJlYWRVSW50MzJMRT10LnJlYWRVSW50MzJMRSxlLnJlYWRVSW50MzJCRT10LnJlYWRVSW50MzJCRSxlLnJlYWRJbnQ4PXQucmVhZEludDgsZS5yZWFkSW50MTZMRT10LnJlYWRJbnQxNkxFLGUucmVhZEludDE2QkU9dC5yZWFkSW50MTZCRSxlLnJlYWRJbnQzMkxFPXQucmVhZEludDMyTEUsZS5yZWFkSW50MzJCRT10LnJlYWRJbnQzMkJFLGUucmVhZEZsb2F0TEU9dC5yZWFkRmxvYXRMRSxlLnJlYWRGbG9hdEJFPXQucmVhZEZsb2F0QkUsZS5yZWFkRG91YmxlTEU9dC5yZWFkRG91YmxlTEUsZS5yZWFkRG91YmxlQkU9dC5yZWFkRG91YmxlQkUsZS53cml0ZVVJbnQ4PXQud3JpdGVVSW50OCxlLndyaXRlVUludDE2TEU9dC53cml0ZVVJbnQxNkxFLGUud3JpdGVVSW50MTZCRT10LndyaXRlVUludDE2QkUsZS53cml0ZVVJbnQzMkxFPXQud3JpdGVVSW50MzJMRSxlLndyaXRlVUludDMyQkU9dC53cml0ZVVJbnQzMkJFLGUud3JpdGVJbnQ4PXQud3JpdGVJbnQ4LGUud3JpdGVJbnQxNkxFPXQud3JpdGVJbnQxNkxFLGUud3JpdGVJbnQxNkJFPXQud3JpdGVJbnQxNkJFLGUud3JpdGVJbnQzMkxFPXQud3JpdGVJbnQzMkxFLGUud3JpdGVJbnQzMkJFPXQud3JpdGVJbnQzMkJFLGUud3JpdGVGbG9hdExFPXQud3JpdGVGbG9hdExFLGUud3JpdGVGbG9hdEJFPXQud3JpdGVGbG9hdEJFLGUud3JpdGVEb3VibGVMRT10LndyaXRlRG91YmxlTEUsZS53cml0ZURvdWJsZUJFPXQud3JpdGVEb3VibGVCRSxlLmZpbGw9dC5maWxsLGUuaW5zcGVjdD10Lmluc3BlY3QsZS50b0FycmF5QnVmZmVyPXQudG9BcnJheUJ1ZmZlcixlfX0uY2FsbCh0aGlzLE8oXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxPKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyXCIpfSx7XCJiYXNlNjQtanNcIjoyLGJ1ZmZlcjozLGllZWU3NTQ6MTAsbFlwb0kyOjExfV0sNDpbZnVuY3Rpb24oYyxkLGUpeyFmdW5jdGlvbihlLHQsYSxuLHIsbyxpLHUscyl7dmFyIGE9YyhcImJ1ZmZlclwiKS5CdWZmZXIsZj00LGw9bmV3IGEoZik7bC5maWxsKDApO2QuZXhwb3J0cz17aGFzaDpmdW5jdGlvbihlLHQsbixyKXtmb3IodmFyIG89dChmdW5jdGlvbihlLHQpe2UubGVuZ3RoJWYhPTAmJihuPWUubGVuZ3RoKyhmLWUubGVuZ3RoJWYpLGU9YS5jb25jYXQoW2UsbF0sbikpO2Zvcih2YXIgbixyPVtdLG89dD9lLnJlYWRJbnQzMkJFOmUucmVhZEludDMyTEUsaT0wO2k8ZS5sZW5ndGg7aSs9ZilyLnB1c2goby5jYWxsKGUsaSkpO3JldHVybiByfShlPWEuaXNCdWZmZXIoZSk/ZTpuZXcgYShlKSxyKSw4KmUubGVuZ3RoKSx0PXIsaT1uZXcgYShuKSx1PXQ/aS53cml0ZUludDMyQkU6aS53cml0ZUludDMyTEUscz0wO3M8by5sZW5ndGg7cysrKXUuY2FsbChpLG9bc10sNCpzLCEwKTtyZXR1cm4gaX19fS5jYWxsKHRoaXMsYyhcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGMoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9oZWxwZXJzLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtidWZmZXI6MyxsWXBvSTI6MTF9XSw1OltmdW5jdGlvbih2LGUsXyl7IWZ1bmN0aW9uKGwsYyx1LGQsaCxwLGcseSx3KXt2YXIgdT12KFwiYnVmZmVyXCIpLkJ1ZmZlcixlPXYoXCIuL3NoYVwiKSx0PXYoXCIuL3NoYTI1NlwiKSxuPXYoXCIuL3JuZ1wiKSxiPXtzaGExOmUsc2hhMjU2OnQsbWQ1OnYoXCIuL21kNVwiKX0scz02NCxhPW5ldyB1KHMpO2Z1bmN0aW9uIHIoZSxuKXt2YXIgcj1iW2U9ZXx8XCJzaGExXCJdLG89W107cmV0dXJuIHJ8fGkoXCJhbGdvcml0aG06XCIsZSxcImlzIG5vdCB5ZXQgc3VwcG9ydGVkXCIpLHt1cGRhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHUuaXNCdWZmZXIoZSl8fChlPW5ldyB1KGUpKSxvLnB1c2goZSksZS5sZW5ndGgsdGhpc30sZGlnZXN0OmZ1bmN0aW9uKGUpe3ZhciB0PXUuY29uY2F0KG8pLHQ9bj9mdW5jdGlvbihlLHQsbil7dS5pc0J1ZmZlcih0KXx8KHQ9bmV3IHUodCkpLHUuaXNCdWZmZXIobil8fChuPW5ldyB1KG4pKSx0Lmxlbmd0aD5zP3Q9ZSh0KTp0Lmxlbmd0aDxzJiYodD11LmNvbmNhdChbdCxhXSxzKSk7Zm9yKHZhciByPW5ldyB1KHMpLG89bmV3IHUocyksaT0wO2k8cztpKyspcltpXT01NF50W2ldLG9baV09OTJedFtpXTtyZXR1cm4gbj1lKHUuY29uY2F0KFtyLG5dKSksZSh1LmNvbmNhdChbbyxuXSkpfShyLG4sdCk6cih0KTtyZXR1cm4gbz1udWxsLGU/dC50b1N0cmluZyhlKTp0fX19ZnVuY3Rpb24gaSgpe3ZhciBlPVtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKFwiIFwiKTt0aHJvdyBuZXcgRXJyb3IoW2UsXCJ3ZSBhY2NlcHQgcHVsbCByZXF1ZXN0c1wiLFwiaHR0cDovL2dpdGh1Yi5jb20vZG9taW5pY3RhcnIvY3J5cHRvLWJyb3dzZXJpZnlcIl0uam9pbihcIlxcblwiKSl9YS5maWxsKDApLF8uY3JlYXRlSGFzaD1mdW5jdGlvbihlKXtyZXR1cm4gcihlKX0sXy5jcmVhdGVIbWFjPXIsXy5yYW5kb21CeXRlcz1mdW5jdGlvbihlLHQpe2lmKCF0fHwhdC5jYWxsKXJldHVybiBuZXcgdShuKGUpKTt0cnl7dC5jYWxsKHRoaXMsdm9pZCAwLG5ldyB1KG4oZSkpKX1jYXRjaChlKXt0KGUpfX07dmFyIG8sZj1bXCJjcmVhdGVDcmVkZW50aWFsc1wiLFwiY3JlYXRlQ2lwaGVyXCIsXCJjcmVhdGVDaXBoZXJpdlwiLFwiY3JlYXRlRGVjaXBoZXJcIixcImNyZWF0ZURlY2lwaGVyaXZcIixcImNyZWF0ZVNpZ25cIixcImNyZWF0ZVZlcmlmeVwiLFwiY3JlYXRlRGlmZmllSGVsbG1hblwiLFwicGJrZGYyXCJdLG09ZnVuY3Rpb24oZSl7X1tlXT1mdW5jdGlvbigpe2koXCJzb3JyeSxcIixlLFwiaXMgbm90IGltcGxlbWVudGVkIHlldFwiKX19O2ZvcihvIGluIGYpbShmW29dLG8pfS5jYWxsKHRoaXMsdihcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LHYoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL21kNVwiOjYsXCIuL3JuZ1wiOjcsXCIuL3NoYVwiOjgsXCIuL3NoYTI1NlwiOjksYnVmZmVyOjMsbFlwb0kyOjExfV0sNjpbZnVuY3Rpb24odyxiLGUpeyFmdW5jdGlvbihlLHIsbyxpLHUsYSxmLGwseSl7dmFyIHQ9dyhcIi4vaGVscGVyc1wiKTtmdW5jdGlvbiBuKGUsdCl7ZVt0Pj41XXw9MTI4PDx0JTMyLGVbMTQrKHQrNjQ+Pj45PDw0KV09dDtmb3IodmFyIG49MTczMjU4NDE5MyxyPS0yNzE3MzM4Nzksbz0tMTczMjU4NDE5NCxpPTI3MTczMzg3OCx1PTA7dTxlLmxlbmd0aDt1Kz0xNil7dmFyIHM9bixhPXIsZj1vLGw9aSxuPWMobixyLG8saSxlW3UrMF0sNywtNjgwODc2OTM2KSxpPWMoaSxuLHIsbyxlW3UrMV0sMTIsLTM4OTU2NDU4Niksbz1jKG8saSxuLHIsZVt1KzJdLDE3LDYwNjEwNTgxOSkscj1jKHIsbyxpLG4sZVt1KzNdLDIyLC0xMDQ0NTI1MzMwKTtuPWMobixyLG8saSxlW3UrNF0sNywtMTc2NDE4ODk3KSxpPWMoaSxuLHIsbyxlW3UrNV0sMTIsMTIwMDA4MDQyNiksbz1jKG8saSxuLHIsZVt1KzZdLDE3LC0xNDczMjMxMzQxKSxyPWMocixvLGksbixlW3UrN10sMjIsLTQ1NzA1OTgzKSxuPWMobixyLG8saSxlW3UrOF0sNywxNzcwMDM1NDE2KSxpPWMoaSxuLHIsbyxlW3UrOV0sMTIsLTE5NTg0MTQ0MTcpLG89YyhvLGksbixyLGVbdSsxMF0sMTcsLTQyMDYzKSxyPWMocixvLGksbixlW3UrMTFdLDIyLC0xOTkwNDA0MTYyKSxuPWMobixyLG8saSxlW3UrMTJdLDcsMTgwNDYwMzY4MiksaT1jKGksbixyLG8sZVt1KzEzXSwxMiwtNDAzNDExMDEpLG89YyhvLGksbixyLGVbdSsxNF0sMTcsLTE1MDIwMDIyOTApLG49ZChuLHI9YyhyLG8saSxuLGVbdSsxNV0sMjIsMTIzNjUzNTMyOSksbyxpLGVbdSsxXSw1LC0xNjU3OTY1MTApLGk9ZChpLG4scixvLGVbdSs2XSw5LC0xMDY5NTAxNjMyKSxvPWQobyxpLG4scixlW3UrMTFdLDE0LDY0MzcxNzcxMykscj1kKHIsbyxpLG4sZVt1KzBdLDIwLC0zNzM4OTczMDIpLG49ZChuLHIsbyxpLGVbdSs1XSw1LC03MDE1NTg2OTEpLGk9ZChpLG4scixvLGVbdSsxMF0sOSwzODAxNjA4Myksbz1kKG8saSxuLHIsZVt1KzE1XSwxNCwtNjYwNDc4MzM1KSxyPWQocixvLGksbixlW3UrNF0sMjAsLTQwNTUzNzg0OCksbj1kKG4scixvLGksZVt1KzldLDUsNTY4NDQ2NDM4KSxpPWQoaSxuLHIsbyxlW3UrMTRdLDksLTEwMTk4MDM2OTApLG89ZChvLGksbixyLGVbdSszXSwxNCwtMTg3MzYzOTYxKSxyPWQocixvLGksbixlW3UrOF0sMjAsMTE2MzUzMTUwMSksbj1kKG4scixvLGksZVt1KzEzXSw1LC0xNDQ0NjgxNDY3KSxpPWQoaSxuLHIsbyxlW3UrMl0sOSwtNTE0MDM3ODQpLG89ZChvLGksbixyLGVbdSs3XSwxNCwxNzM1MzI4NDczKSxuPWgobixyPWQocixvLGksbixlW3UrMTJdLDIwLC0xOTI2NjA3NzM0KSxvLGksZVt1KzVdLDQsLTM3ODU1OCksaT1oKGksbixyLG8sZVt1KzhdLDExLC0yMDIyNTc0NDYzKSxvPWgobyxpLG4scixlW3UrMTFdLDE2LDE4MzkwMzA1NjIpLHI9aChyLG8saSxuLGVbdSsxNF0sMjMsLTM1MzA5NTU2KSxuPWgobixyLG8saSxlW3UrMV0sNCwtMTUzMDk5MjA2MCksaT1oKGksbixyLG8sZVt1KzRdLDExLDEyNzI4OTMzNTMpLG89aChvLGksbixyLGVbdSs3XSwxNiwtMTU1NDk3NjMyKSxyPWgocixvLGksbixlW3UrMTBdLDIzLC0xMDk0NzMwNjQwKSxuPWgobixyLG8saSxlW3UrMTNdLDQsNjgxMjc5MTc0KSxpPWgoaSxuLHIsbyxlW3UrMF0sMTEsLTM1ODUzNzIyMiksbz1oKG8saSxuLHIsZVt1KzNdLDE2LC03MjI1MjE5NzkpLHI9aChyLG8saSxuLGVbdSs2XSwyMyw3NjAyOTE4OSksbj1oKG4scixvLGksZVt1KzldLDQsLTY0MDM2NDQ4NyksaT1oKGksbixyLG8sZVt1KzEyXSwxMSwtNDIxODE1ODM1KSxvPWgobyxpLG4scixlW3UrMTVdLDE2LDUzMDc0MjUyMCksbj1wKG4scj1oKHIsbyxpLG4sZVt1KzJdLDIzLC05OTUzMzg2NTEpLG8saSxlW3UrMF0sNiwtMTk4NjMwODQ0KSxpPXAoaSxuLHIsbyxlW3UrN10sMTAsMTEyNjg5MTQxNSksbz1wKG8saSxuLHIsZVt1KzE0XSwxNSwtMTQxNjM1NDkwNSkscj1wKHIsbyxpLG4sZVt1KzVdLDIxLC01NzQzNDA1NSksbj1wKG4scixvLGksZVt1KzEyXSw2LDE3MDA0ODU1NzEpLGk9cChpLG4scixvLGVbdSszXSwxMCwtMTg5NDk4NjYwNiksbz1wKG8saSxuLHIsZVt1KzEwXSwxNSwtMTA1MTUyMykscj1wKHIsbyxpLG4sZVt1KzFdLDIxLC0yMDU0OTIyNzk5KSxuPXAobixyLG8saSxlW3UrOF0sNiwxODczMzEzMzU5KSxpPXAoaSxuLHIsbyxlW3UrMTVdLDEwLC0zMDYxMTc0NCksbz1wKG8saSxuLHIsZVt1KzZdLDE1LC0xNTYwMTk4MzgwKSxyPXAocixvLGksbixlW3UrMTNdLDIxLDEzMDkxNTE2NDkpLG49cChuLHIsbyxpLGVbdSs0XSw2LC0xNDU1MjMwNzApLGk9cChpLG4scixvLGVbdSsxMV0sMTAsLTExMjAyMTAzNzkpLG89cChvLGksbixyLGVbdSsyXSwxNSw3MTg3ODcyNTkpLHI9cChyLG8saSxuLGVbdSs5XSwyMSwtMzQzNDg1NTUxKSxuPWcobixzKSxyPWcocixhKSxvPWcobyxmKSxpPWcoaSxsKX1yZXR1cm4gQXJyYXkobixyLG8saSl9ZnVuY3Rpb24gcyhlLHQsbixyLG8saSl7cmV0dXJuIGcoKHQ9ZyhnKHQsZSksZyhyLGkpKSk8PG98dD4+PjMyLW8sbil9ZnVuY3Rpb24gYyhlLHQsbixyLG8saSx1KXtyZXR1cm4gcyh0Jm58fnQmcixlLHQsbyxpLHUpfWZ1bmN0aW9uIGQoZSx0LG4scixvLGksdSl7cmV0dXJuIHModCZyfG4mfnIsZSx0LG8saSx1KX1mdW5jdGlvbiBoKGUsdCxuLHIsbyxpLHUpe3JldHVybiBzKHRebl5yLGUsdCxvLGksdSl9ZnVuY3Rpb24gcChlLHQsbixyLG8saSx1KXtyZXR1cm4gcyhuXih0fH5yKSxlLHQsbyxpLHUpfWZ1bmN0aW9uIGcoZSx0KXt2YXIgbj0oNjU1MzUmZSkrKDY1NTM1JnQpO3JldHVybihlPj4xNikrKHQ+PjE2KSsobj4+MTYpPDwxNnw2NTUzNSZufWIuZXhwb3J0cz1mdW5jdGlvbihlKXtyZXR1cm4gdC5oYXNoKGUsbiwxNil9fS5jYWxsKHRoaXMsdyhcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LHcoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9tZDUuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTF9XSw3OltmdW5jdGlvbihlLGwsdCl7IWZ1bmN0aW9uKGUsdCxuLHIsbyxpLHUscyxmKXt2YXIgYTtsLmV4cG9ydHM9YXx8ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LG49bmV3IEFycmF5KGUpLHI9MDtyPGU7cisrKTA9PSgzJnIpJiYodD00Mjk0OTY3Mjk2Kk1hdGgucmFuZG9tKCkpLG5bcl09dD4+PigoMyZyKTw8MykmMjU1O3JldHVybiBufX0uY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvcm5nLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtidWZmZXI6MyxsWXBvSTI6MTF9XSw4OltmdW5jdGlvbihjLGQsZSl7IWZ1bmN0aW9uKGUsdCxuLHIsbyxzLGEsZixsKXt2YXIgaT1jKFwiLi9oZWxwZXJzXCIpO2Z1bmN0aW9uIHUobCxjKXtsW2M+PjVdfD0xMjg8PDI0LWMlMzIsbFsxNSsoYys2ND4+OTw8NCldPWM7Zm9yKHZhciBlLHQsbixyPUFycmF5KDgwKSxvPTE3MzI1ODQxOTMsaT0tMjcxNzMzODc5LHU9LTE3MzI1ODQxOTQscz0yNzE3MzM4NzgsZD0tMTAwOTU4OTc3NixoPTA7aDxsLmxlbmd0aDtoKz0xNil7Zm9yKHZhciBwPW8sZz1pLHk9dSx3PXMsYj1kLGE9MDthPDgwO2ErKyl7clthXT1hPDE2P2xbaCthXTp2KHJbYS0zXV5yW2EtOF1eclthLTE0XV5yW2EtMTZdLDEpO3ZhciBmPW0obSh2KG8sNSksKGY9aSx0PXUsbj1zLChlPWEpPDIwP2YmdHx+ZiZuOiEoZTw0MCkmJmU8NjA/ZiZ0fGYmbnx0Jm46Zl50Xm4pKSxtKG0oZCxyW2FdKSwoZT1hKTwyMD8xNTE4NTAwMjQ5OmU8NDA/MTg1OTc3NTM5MzplPDYwPy0xODk0MDA3NTg4Oi04OTk0OTc1MTQpKSxkPXMscz11LHU9dihpLDMwKSxpPW8sbz1mfW89bShvLHApLGk9bShpLGcpLHU9bSh1LHkpLHM9bShzLHcpLGQ9bShkLGIpfXJldHVybiBBcnJheShvLGksdSxzLGQpfWZ1bmN0aW9uIG0oZSx0KXt2YXIgbj0oNjU1MzUmZSkrKDY1NTM1JnQpO3JldHVybihlPj4xNikrKHQ+PjE2KSsobj4+MTYpPDwxNnw2NTUzNSZufWZ1bmN0aW9uIHYoZSx0KXtyZXR1cm4gZTw8dHxlPj4+MzItdH1kLmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIGkuaGFzaChlLHUsMjAsITApfX0uY2FsbCh0aGlzLGMoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxjKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvc2hhLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtcIi4vaGVscGVyc1wiOjQsYnVmZmVyOjMsbFlwb0kyOjExfV0sOTpbZnVuY3Rpb24oYyxkLGUpeyFmdW5jdGlvbihlLHQsbixyLHUscyxhLGYsbCl7ZnVuY3Rpb24gYihlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCk7cmV0dXJuKGU+PjE2KSsodD4+MTYpKyhuPj4xNik8PDE2fDY1NTM1Jm59ZnVuY3Rpb24gbyhlLGwpe3ZhciBjLGQ9bmV3IEFycmF5KDExMTYzNTI0MDgsMTg5OTQ0NzQ0MSwzMDQ5MzIzNDcxLDM5MjEwMDk1NzMsOTYxOTg3MTYzLDE1MDg5NzA5OTMsMjQ1MzYzNTc0OCwyODcwNzYzMjIxLDM2MjQzODEwODAsMzEwNTk4NDAxLDYwNzIyNTI3OCwxNDI2ODgxOTg3LDE5MjUwNzgzODgsMjE2MjA3ODIwNiwyNjE0ODg4MTAzLDMyNDgyMjI1ODAsMzgzNTM5MDQwMSw0MDIyMjI0Nzc0LDI2NDM0NzA3OCw2MDQ4MDc2MjgsNzcwMjU1OTgzLDEyNDkxNTAxMjIsMTU1NTA4MTY5MiwxOTk2MDY0OTg2LDI1NTQyMjA4ODIsMjgyMTgzNDM0OSwyOTUyOTk2ODA4LDMyMTAzMTM2NzEsMzMzNjU3MTg5MSwzNTg0NTI4NzExLDExMzkyNjk5MywzMzgyNDE4OTUsNjY2MzA3MjA1LDc3MzUyOTkxMiwxMjk0NzU3MzcyLDEzOTYxODIyOTEsMTY5NTE4MzcwMCwxOTg2NjYxMDUxLDIxNzcwMjYzNTAsMjQ1Njk1NjAzNywyNzMwNDg1OTIxLDI4MjAzMDI0MTEsMzI1OTczMDgwMCwzMzQ1NzY0NzcxLDM1MTYwNjU4MTcsMzYwMDM1MjgwNCw0MDk0NTcxOTA5LDI3NTQyMzM0NCw0MzAyMjc3MzQsNTA2OTQ4NjE2LDY1OTA2MDU1Niw4ODM5OTc4NzcsOTU4MTM5NTcxLDEzMjI4MjIyMTgsMTUzNzAwMjA2MywxNzQ3ODczNzc5LDE5NTU1NjIyMjIsMjAyNDEwNDgxNSwyMjI3NzMwNDUyLDIzNjE4NTI0MjQsMjQyODQzNjQ3NCwyNzU2NzM0MTg3LDMyMDQwMzE0NzksMzMyOTMyNTI5OCksdD1uZXcgQXJyYXkoMTc3OTAzMzcwMywzMTQ0MTM0Mjc3LDEwMTM5MDQyNDIsMjc3MzQ4MDc2MiwxMzU5ODkzMTE5LDI2MDA4MjI5MjQsNTI4NzM0NjM1LDE1NDE0NTkyMjUpLG49bmV3IEFycmF5KDY0KTtlW2w+PjVdfD0xMjg8PDI0LWwlMzIsZVsxNSsobCs2ND4+OTw8NCldPWw7Zm9yKHZhciByLG8saD0wO2g8ZS5sZW5ndGg7aCs9MTYpe2Zvcih2YXIgaT10WzBdLHU9dFsxXSxzPXRbMl0scD10WzNdLGE9dFs0XSxnPXRbNV0seT10WzZdLHc9dFs3XSxmPTA7Zjw2NDtmKyspbltmXT1mPDE2P2VbZitoXTpiKGIoYigobz1uW2YtMl0sbShvLDE3KV5tKG8sMTkpXnYobywxMCkpLG5bZi03XSksKG89bltmLTE1XSxtKG8sNylebShvLDE4KV52KG8sMykpKSxuW2YtMTZdKSxjPWIoYihiKGIodyxtKG89YSw2KV5tKG8sMTEpXm0obywyNSkpLGEmZ15+YSZ5KSxkW2ZdKSxuW2ZdKSxyPWIobShyPWksMilebShyLDEzKV5tKHIsMjIpLGkmdV5pJnNedSZzKSx3PXkseT1nLGc9YSxhPWIocCxjKSxwPXMscz11LHU9aSxpPWIoYyxyKTt0WzBdPWIoaSx0WzBdKSx0WzFdPWIodSx0WzFdKSx0WzJdPWIocyx0WzJdKSx0WzNdPWIocCx0WzNdKSx0WzRdPWIoYSx0WzRdKSx0WzVdPWIoZyx0WzVdKSx0WzZdPWIoeSx0WzZdKSx0WzddPWIodyx0WzddKX1yZXR1cm4gdH12YXIgaT1jKFwiLi9oZWxwZXJzXCIpLG09ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+PnR8ZTw8MzItdH0sdj1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+dH07ZC5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBpLmhhc2goZSxvLDMyLCEwKX19LmNhbGwodGhpcyxjKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sYyhcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYTI1Ni5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMX1dLDEwOltmdW5jdGlvbihlLHQsZil7IWZ1bmN0aW9uKGUsdCxuLHIsbyxpLHUscyxhKXtmLnJlYWQ9ZnVuY3Rpb24oZSx0LG4scixvKXt2YXIgaSx1LGw9OCpvLXItMSxjPSgxPDxsKS0xLGQ9Yz4+MSxzPS03LGE9bj9vLTE6MCxmPW4/LTE6MSxvPWVbdCthXTtmb3IoYSs9ZixpPW8mKDE8PC1zKS0xLG8+Pj0tcyxzKz1sOzA8cztpPTI1NippK2VbdCthXSxhKz1mLHMtPTgpO2Zvcih1PWkmKDE8PC1zKS0xLGk+Pj0tcyxzKz1yOzA8czt1PTI1Nip1K2VbdCthXSxhKz1mLHMtPTgpO2lmKDA9PT1pKWk9MS1kO2Vsc2V7aWYoaT09PWMpcmV0dXJuIHU/TmFOOjEvMCoobz8tMToxKTt1Kz1NYXRoLnBvdygyLHIpLGktPWR9cmV0dXJuKG8/LTE6MSkqdSpNYXRoLnBvdygyLGktcil9LGYud3JpdGU9ZnVuY3Rpb24oZSx0LGwsbixyLGMpe3ZhciBvLGksdT04KmMtci0xLHM9KDE8PHUpLTEsYT1zPj4xLGQ9MjM9PT1yP01hdGgucG93KDIsLTI0KS1NYXRoLnBvdygyLC03Nyk6MCxmPW4/MDpjLTEsaD1uPzE6LTEsYz10PDB8fDA9PT10JiYxL3Q8MD8xOjA7Zm9yKHQ9TWF0aC5hYnModCksaXNOYU4odCl8fHQ9PT0xLzA/KGk9aXNOYU4odCk/MTowLG89cyk6KG89TWF0aC5mbG9vcihNYXRoLmxvZyh0KS9NYXRoLkxOMiksdCoobj1NYXRoLnBvdygyLC1vKSk8MSYmKG8tLSxuKj0yKSwyPD0odCs9MTw9bythP2QvbjpkKk1hdGgucG93KDIsMS1hKSkqbiYmKG8rKyxuLz0yKSxzPD1vK2E/KGk9MCxvPXMpOjE8PW8rYT8oaT0odCpuLTEpKk1hdGgucG93KDIsciksbys9YSk6KGk9dCpNYXRoLnBvdygyLGEtMSkqTWF0aC5wb3coMixyKSxvPTApKTs4PD1yO2VbbCtmXT0yNTUmaSxmKz1oLGkvPTI1NixyLT04KTtmb3Iobz1vPDxyfGksdSs9cjswPHU7ZVtsK2ZdPTI1NSZvLGYrPWgsby89MjU2LHUtPTgpO2VbbCtmLWhdfD0xMjgqY319LmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pZWVlNzU0XCIpfSx7YnVmZmVyOjMsbFlwb0kyOjExfV0sMTE6W2Z1bmN0aW9uKGUsaCx0KXshZnVuY3Rpb24oZSx0LG4scixvLGYsbCxjLGQpe3ZhciBpLHUscztmdW5jdGlvbiBhKCl7fShlPWguZXhwb3J0cz17fSkubmV4dFRpY2s9KHU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93LnNldEltbWVkaWF0ZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5wb3N0TWVzc2FnZSYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXIsdT9mdW5jdGlvbihlKXtyZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShlKX06cz8oaT1bXSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixmdW5jdGlvbihlKXt2YXIgdD1lLnNvdXJjZTt0IT09d2luZG93JiZudWxsIT09dHx8XCJwcm9jZXNzLXRpY2tcIiE9PWUuZGF0YXx8KGUuc3RvcFByb3BhZ2F0aW9uKCksMDxpLmxlbmd0aCYmaS5zaGlmdCgpKCkpfSwhMCksZnVuY3Rpb24oZSl7aS5wdXNoKGUpLHdpbmRvdy5wb3N0TWVzc2FnZShcInByb2Nlc3MtdGlja1wiLFwiKlwiKX0pOmZ1bmN0aW9uKGUpe3NldFRpbWVvdXQoZSwwKX0pLGUudGl0bGU9XCJicm93c2VyXCIsZS5icm93c2VyPSEwLGUuZW52PXt9LGUuYXJndj1bXSxlLm9uPWEsZS5hZGRMaXN0ZW5lcj1hLGUub25jZT1hLGUub2ZmPWEsZS5yZW1vdmVMaXN0ZW5lcj1hLGUucmVtb3ZlQWxsTGlzdGVuZXJzPWEsZS5lbWl0PWEsZS5iaW5kaW5nPWZ1bmN0aW9uKGUpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkXCIpfSxlLmN3ZD1mdW5jdGlvbigpe3JldHVyblwiL1wifSxlLmNoZGlyPWZ1bmN0aW9uKGUpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZFwiKX19LmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3NcIil9LHtidWZmZXI6MyxsWXBvSTI6MTF9XX0se30sWzFdKSgxKX0pOyIsImltcG9ydCBlbmRlbnQgZnJvbSAnZW5kZW50J1xuaW1wb3J0IHR5cGUgeyBQcm9tcHQgfSBmcm9tICcuLi8uLi9ob29rcy91c2VQcm9tcHRzJ1xuaW1wb3J0IGhhc2ggZnJvbSAnb2JqZWN0LWhhc2gnXG5cbnR5cGUgUHJvbXB0V2l0aG91dElkID0gT21pdDxQcm9tcHQsICdpZCcgfCAnY2hpbGRyZW4nPiAmIHtcbiAgY2hpbGRyZW4/OiBQcm9tcHRXaXRob3V0SWRbXVxufVxuXG5jb25zdCBwcm9tcHRzOiBQcm9tcHRXaXRob3V0SWRbXSA9IFtcbiAge1xuICAgIG5hbWU6ICdSZXZpZXcgU2VsZWN0aW9uJyxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnU3VtbWFyaXplJyxcbiAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIHN1bW1hcml6ZSBpdCBpbiBsZXNzIHRoYW4gaGFsZiB0aGUgb3JpZ2luYWwgbGVuZ3RoLlxuICAgICAgICBgLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2tleSB0YWtlYXdheXMnLFxuICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICBSZWFkIHRoZSBmb2xsb3dpbmcgdGV4dCBhbmQgaWRlbnRpZnkgdGhlIGtleSB0YWtlYXdheXMgaW4gbGlzdCBmb3JtYXQuXG4gICAgICAgIGAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnUXVlc3Rpb25zJyxcbiAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIGlkZW50aWZ5IHRoZSBrZXkgcXVlc3Rpb25zIHRoYXQgaXQgcmFpc2VzLlxuICAgICAgICBgLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgbmFtZTogJ0VkaXQgU2VsZWN0aW9uJyxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnRml4IEdyYW1tYXIgYW5kIFNwZWxsaW5nJyxcbiAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIGZpeCBhbnkgZ3JhbW1hciBhbmQgc3BlbGxpbmcgbWlzdGFrZXMuXG4gICAgICAgIGAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnQ2hhbmdlIFRvbmUnLFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdGb3JtYWwnLFxuICAgICAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBtYWtlIGl0IG1vcmUgZm9ybWFsLlxuICAgICAgICAgICAgYCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdJbmZvcm1hbCcsXG4gICAgICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIG1ha2UgaXQgbW9yZSBpbmZvcm1hbC5cbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnTmV1dHJhbCcsXG4gICAgICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIG1ha2UgaXQgbW9yZSBuZXV0cmFsLlxuICAgICAgICAgICAgYCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdTdHJvbmcnLFxuICAgICAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBtYWtlIGl0IG1vcmUgc3Ryb25nIGFuZCBhc3NlcnRpdmUuXG4gICAgICAgICAgICBgLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnQ2hhbmdlIExlbmd0aCcsXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1Nob3J0ZXInLFxuICAgICAgICAgICAgcHJvbXB0OiBlbmRlbnRgXG4gICAgICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCBtYWtlIGl0IHNob3J0ZXIuXG4gICAgICAgICAgICBgLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0xvbmdlcicsXG4gICAgICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIG1ha2UgaXQgbG9uZ2VyLlxuICAgICAgICAgICAgYCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0NoYW5nZSBTdHJ1Y3R1cmUnLFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdBZGQgRGV0YWlscycsXG4gICAgICAgICAgICBwcm9tcHQ6IGVuZGVudGBcbiAgICAgICAgICAgICAgUmVhZCB0aGUgZm9sbG93aW5nIHRleHQgYW5kIGFkZCBkZXRhaWxzIHRvIG1ha2UgaXQgbW9yZSBpbmZvcm1hdGl2ZS5cbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQWRkIEV4YW1wbGVzJyxcbiAgICAgICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgICAgICBSZWFkIHRoZSBmb2xsb3dpbmcgdGV4dCBhbmQgYWRkIGV4YW1wbGVzIHRvIG1ha2UgaXQgbW9yZSBpbmZvcm1hdGl2ZS5cbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQWRkIEVtcGhhc2lzJyxcbiAgICAgICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgICAgICBSZWFkIHRoZSBmb2xsb3dpbmcgdGV4dCBhbmQgYWRkIGVtcGhhc2lzIHRvIG1ha2UgaXQgbW9yZSBpbXBhY3RmdWwuXG4gICAgICAgICAgICBgLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnUmVwbHknLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdQb3NpdGl2ZScsXG4gICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCByZXBseSB0byBpdCBpbiBhIHBvc2l0aXZlIHdheS5cbiAgICAgICAgYCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdOZWdhdGl2ZScsXG4gICAgICAgIHByb21wdDogZW5kZW50YFxuICAgICAgICAgIFJlYWQgdGhlIGZvbGxvd2luZyB0ZXh0IGFuZCByZXBseSB0byBpdCBpbiBhIG5lZ2F0aXZlIHdheS5cbiAgICAgICAgYCxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl1cblxuY29uc3QgcmVjdXJzaXZlQWRkSWQgPSAoXG4gIHByb21wdHM6IFByb21wdFdpdGhvdXRJZFtdLFxuICBfcGFyZW50SWQgPSAnJyxcbik6IFByb21wdFtdID0+IHtcbiAgcmV0dXJuIHByb21wdHMubWFwKChwcm9tcHQpID0+IHtcbiAgICBjb25zdCBpZCA9IGhhc2gocHJvbXB0KVxuICAgIHJldHVybiB7XG4gICAgICBpZCxcbiAgICAgIC4uLnByb21wdCxcbiAgICAgIGNoaWxkcmVuOiBwcm9tcHQuY2hpbGRyZW5cbiAgICAgICAgPyByZWN1cnNpdmVBZGRJZChwcm9tcHQuY2hpbGRyZW4sIGlkKVxuICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICB9XG4gIH0pIGFzIFByb21wdFtdXG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UHJvbXB0cyA9IHJlY3Vyc2l2ZUFkZElkKHByb21wdHMpXG4iLCJpbXBvcnQgdHlwZSB7IFByb21wdCB9IGZyb20gJy4uL2hvb2tzL3VzZVByb21wdHMnXG5pbXBvcnQgeyBkZWZhdWx0UHJvbXB0cyB9IGZyb20gJy4uL2NvbmZpZy9wcm9tcHRzL2RlZmF1bHQnXG5cbmV4cG9ydCBjb25zdCBnZXRTdG9yZWRQcm9tcHRzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzdG9yZWRQcm9tcHRzID0gYXdhaXQgZ2V0U3RvcmVkTG9jYWxQcm9tcHRzKClcbiAgaWYgKCFzdG9yZWRQcm9tcHRzKSB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgUFJPTVBUUzogZGVmYXVsdFByb21wdHMgfSwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ+KEue+4jyBEZWZhdWx0IHByb21wdHMgc3RvcmVkIGZyb20gZ2V0U3RvcmVkUHJvbXB0cy50cycpXG4gICAgfSlcbiAgfVxuICByZXR1cm4gc3RvcmVkUHJvbXB0cyA/PyBkZWZhdWx0UHJvbXB0c1xufVxuXG5jb25zdCBnZXRTdG9yZWRMb2NhbFByb21wdHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHN0b3JlZExvY2FsUHJvbXB0cyA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdQUk9NUFRTJywgKHJlc3VsdCkgPT4ge1xuICAgICAgcmVzb2x2ZShyZXN1bHQuUFJPTVBUUylcbiAgICB9KVxuICB9KVxuICByZXR1cm4gc3RvcmVkTG9jYWxQcm9tcHRzIGFzIFByb21wdFtdIHwgbnVsbFxufVxuIiwiaW1wb3J0IHR5cGUgeyBQcm9tcHQgfSBmcm9tICcuLi8uLi8uLi9ob29rcy91c2VQcm9tcHRzJ1xuaW1wb3J0IHsgZ2V0U3RvcmVkUHJvbXB0cyB9IGZyb20gJy4uLy4uLy4uL2xpYi9nZXRTdG9yZWRQcm9tcHRzJ1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIG5hdGl2ZSBjb250ZXh0IG1lbnUgZm9yIHRoZSBxdWljayBtZW51LlxuICogVGhpcyB3aWxsIGFsbG93IHVzZXJzIHRvIHJpZ2h0IGNsaWNrIG9uIGFueSBzZWxlY3RlZCB0ZXh0IGFuZCBzZWUgdGhlIHByb21wdFxuICogYWN0aW9ucyBvbiB0aGUgdGV4dC5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZG9jcy9leHRlbnNpb25zL3JlZmVyZW5jZS9jb250ZXh0TWVudXMvXG4gKlxuICogSXQgcGVyZm9ybXMgdGhlIGZvbGxvd2luZyBzdGVwczpcbiAqIDEuIEdldCB0aGUgcHJvbXB0cyBmcm9tIHN0b3JhZ2VcbiAqIDIuIENyZWF0ZSB0aGUgdGV4dCBhY3Rpb25zIGF0IHN0YXJ0XG4gKiAzLiBSZW1vdmUgYWxsIHRoZSBleGlzdGluZyBjb250ZXh0IG1lbnVzXG4gKiA0LiBDcmVhdGUgdGhlIG1lbnUgZm9yIHJlc3Qgb2YgdGhlIGl0ZW1zXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnRleHRNZW51ID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBwcm9tcHRzID0gYXdhaXQgZ2V0U3RvcmVkUHJvbXB0cygpXG4gIGNvbnN0IGNvbnRleHRNZW51SXRlbXM6IGNocm9tZS5jb250ZXh0TWVudXMuQ3JlYXRlUHJvcGVydGllc1tdID0gW11cblxuICAvLyBDcmVhdGUgdGV4dCBhY3Rpb25zIGNvbnRleHQgbWVudVxuICBjb25zdCBjcmVhdGVDaGlsZENvbnRleHRNZW51ID0gKHByb21wdHM6IFByb21wdFtdLCBwYXJlbnRJZD86IHN0cmluZykgPT4ge1xuICAgIGZvciAoY29uc3QgcHJvbXB0IG9mIHByb21wdHMpIHtcbiAgICAgIGNvbnRleHRNZW51SXRlbXMucHVzaCh7XG4gICAgICAgIGlkOiBwcm9tcHQuaWQsXG4gICAgICAgIHRpdGxlOiBwcm9tcHQubmFtZSxcbiAgICAgICAgY29udGV4dHM6IFsnc2VsZWN0aW9uJ10sXG4gICAgICAgIHBhcmVudElkLFxuICAgICAgfSlcbiAgICAgIGlmIChwcm9tcHQuY2hpbGRyZW4pIGNyZWF0ZUNoaWxkQ29udGV4dE1lbnUocHJvbXB0LmNoaWxkcmVuLCBwcm9tcHQuaWQpXG4gICAgfVxuICB9XG4gIGNyZWF0ZUNoaWxkQ29udGV4dE1lbnUocHJvbXB0cylcblxuICAvLyBDcmVhdGUgU2V0dGluZ3MgY29udGV4dCBtZW51XG4gIGNvbnRleHRNZW51SXRlbXMucHVzaChcbiAgICB7XG4gICAgICBpZDogJ3NlcGFyYXRvcicsXG4gICAgICB0eXBlOiAnc2VwYXJhdG9yJyxcbiAgICAgIGNvbnRleHRzOiBbJ3NlbGVjdGlvbiddLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdzZXR0aW5ncycsXG4gICAgICB0aXRsZTogJ1NldHRpbmdzJyxcbiAgICAgIGNvbnRleHRzOiBbJ3NlbGVjdGlvbiddLFxuICAgIH0sXG4gIClcblxuICAvLyBCZWZvcmUgY3JlYXRpbmcgdGhlIGNvbnRleHQgbWVudSwgcmVtb3ZlIGFsbCB0aGUgZXhpc3RpbmcgY29udGV4dCBtZW51c1xuICBjaHJvbWUuY29udGV4dE1lbnVzLnJlbW92ZUFsbCgpXG5cbiAgLy8gQ3JlYXRlIGNvbnRleHQgbWVudVxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgY29udGV4dE1lbnVJdGVtcykge1xuICAgIGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKGl0ZW0pXG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBjb250ZXh0IG1lbnUgb24gc3RvcmFnZSBjaGFuZ2UuXG4gKiBUaGlzIHdpbGwgYWxsb3cgdXNlcnMgdG8gc2VlIHRoZSBjaGFuZ2VzIGluIHRoZSBjb250ZXh0IG1lbnUgd2hlbiB1c2VyXG4gKiBjaGFuZ2UgdGhlIHByb21wdHMuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVDb250ZXh0TWVudU9uU3RvcmFnZUNoYW5nZSA9ICgpID0+IHtcbiAgY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygn8J+TnSBTdG9yYWdlIGNoYW5nZWQnKVxuICAgIGNyZWF0ZUNvbnRleHRNZW51KClcbiAgfSlcbn1cbiIsImV4cG9ydCBjb25zdCBmb3J3YXJkQ29udGV4dE1lbnVDbGlja3MgPSAoKSA9PiB7XG4gIGNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKChpbmZvLCB0YWIpID0+IHtcbiAgICBpZiAoaW5mby5tZW51SXRlbUlkID09PSAnc2V0dGluZ3MnKSB7XG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoe1xuICAgICAgICB1cmw6IGNocm9tZS5ydW50aW1lLmdldFVSTCgnL3NyYy9wYWdlcy9zZXR0aW5ncy9pbmRleC5odG1sJyksXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBpbmZvLnNlbGVjdGlvblRleHRcbiAgICAgIGNvbnN0IGlkID0gaW5mby5tZW51SXRlbUlkXG4gICAgICBpZiAodGFiPy5pZClcbiAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiLmlkLCB7XG4gICAgICAgICAgYWN0aW9uOiAnZm9yd2FyZC1jb250ZXh0LW1lbnUtY2xpY2snLFxuICAgICAgICAgIHBheWxvYWQ6IHsgc2VsZWN0ZWRUZXh0LCBpZCB9LFxuICAgICAgICB9KVxuICAgIH1cbiAgfSlcbn1cbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGNhcHR1cmUgdGhlIGN1cnJlbnQgdGFiIHNjcmVlbi5cbiAqIEl0IGlzIHVzZWQgaW4gdGhlIHNpZGViYXIgdG8gY2FwdHVyZSB0aGUgc2NyZWVuIGFmdGVyXG4gKiB1c2VyIHNuaXBlcyB0aGUgc2NyZWVuLlxuICovXG5leHBvcnQgY29uc3QgY2FwdHVyZVNjcmVlbkxpc3RlbmVyID0gYXN5bmMgKCkgPT4ge1xuICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIF9zZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ2NhcHR1cmVWaXNpYmxlVGFiJykge1xuICAgICAgY2hyb21lLnRhYnMuY2FwdHVyZVZpc2libGVUYWIoKGRhdGFVcmwpID0+IHtcbiAgICAgICAgc2VuZFJlc3BvbnNlKGRhdGFVcmwpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRydWUgLy8gVGhpcyB3aWxsIGtlZXAgdGhlIG1lc3NhZ2UgY2hhbm5lbCBvcGVuIHVudGlsIGBzZW5kUmVzcG9uc2VgIGlzIGNhbGxlZC5cbiAgICB9XG4gIH0pXG59XG4iLCIvKipcbiAqIFdlIGZldGNoIHRoZSBzaG9ydGN1dCBhc3NpZ25lZCB0byBzaWRlYmFyIGZyb20gY2hyb21lLmNvbW1hbmRzLmdldEFsbFxuICogYW5kIHNlbmQgaXQgdG8gY2xpZW50IHZpYSBjaHJvbWUudGFicy5zZW5kTWVzc2FnZS5cbiAqXG4gKiBXZSBhcmUgZG9pbmcgdGhpcyBiZWNhdXNlIHdlIGNhbm5vdCBkaXJlY3RseSBhY2Nlc3MgdGhlIGNocm9tZS5jb21tYW5kc1xuICogZnJvbSB0aGUgY29udGVudCBzY3JpcHQuXG4gKi9cbmV4cG9ydCBjb25zdCBzZW5kU2lkZWJhclNob3J0Y3V0ID0gKCkgPT4ge1xuICBjaHJvbWUuY29tbWFuZHMuZ2V0QWxsKChjb21tYW5kcykgPT4ge1xuICAgIC8vIEdldCBzaG9ydGN1dFxuICAgIGNvbnN0IHNob3J0Y3V0ID0gY29tbWFuZHMuZmluZCgoYykgPT4gYy5uYW1lID09PSAnb3Blbi1zaWRlYmFyJyk/LnNob3J0Y3V0XG5cbiAgICAvLyBTZW5kIHNob3J0Y3V0IHRvIGNsaWVudFxuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgICBpZiAodGFic1swXS5pZCkge1xuICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gbGlzdGVuZXIodGFiSWQsIGluZm8pIHtcbiAgICAgICAgICBpZiAoaW5mby5zdGF0dXMgPT09ICdjb21wbGV0ZScgJiYgdGFiSWQgPT09IHRhYnNbMF0uaWQpIHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHtcbiAgICAgICAgICAgICAgYWN0aW9uOiAnc2lkZWJhci1zaG9ydGN1dCcsXG4gICAgICAgICAgICAgIHNob3J0Y3V0LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cbiIsIi8qKlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIGFsbCB0aGUgbGlzdGVuZXJzIHRoYXQgdG9nZ2xlIHRoZSBzaWRlYmFyLlxuICogVGhlIHNpZGViYXIgY2FuIGJlIHRvZ2dsZWQgYnk6XG4gKiAxKSBDbGlja2luZyBvbiB0aGUgZXh0ZW5zaW9uIGljb25cbiAqIDIpIFByZXNzaW5nIHRoZSBrZXlib2FyZCBzaG9ydGN1dFxuICogMykgUHJvZ3JhbW1hdGljYWxseSB2aWEgdGhlIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZSBsaXN0ZW5lclxuICogICAgKHVzZWQgYnkgdGhlIGNsb3NlIGJ1dHRvbiBpbiB0aGUgc2lkZWJhcilcbiAqL1xuZXhwb3J0IGNvbnN0IHNpZGViYXJUb2dnbGVMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gIC8vIFRvZ2dsZSBzaWRlYmFyIHdoZW4gdXNlciBwZXJmb3JtcyBhIGtleWJvYXJkIHNob3J0Y3V0XG4gIGNocm9tZS5jb21tYW5kcy5vbkNvbW1hbmQuYWRkTGlzdGVuZXIoKGNvbW1hbmQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhg8J+amiBbQ29tbWFuZCBSZWNlaXZlZF0gJHtjb21tYW5kfWApXG4gICAgaWYgKGNvbW1hbmQgPT09ICdvcGVuLXNpZGViYXInKSB7XG4gICAgICB0b2dnbGVTaWRlYmFyKClcbiAgICB9XG4gIH0pXG5cbiAgLy8gVG9nZ2xlIHNpZGViYXIgd2hlbiB1c2VyIGNsaWNrcyBvbiB0aGUgZXh0ZW5zaW9uIGljb25cbiAgY2hyb21lLmFjdGlvbi5vbkNsaWNrZWQuYWRkTGlzdGVuZXIodG9nZ2xlU2lkZWJhcilcblxuICAvLyBUb2dnbGUgc2lkZWJhciBwcm9ncmFtbWF0aWNhbGx5XG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgX3NlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKFxuICAgICAgbWVzc2FnZS5hY3Rpb24gPT09ICdjbG9zZS1zaWRlYmFyJyB8fFxuICAgICAgbWVzc2FnZS5hY3Rpb24gPT09ICdvcGVuLXNpZGViYXInXG4gICAgKSB7XG4gICAgICB0b2dnbGVTaWRlYmFyKClcbiAgICB9XG4gICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAnZ2VuZXJhdGUnKSB7XG4gICAgICBtZXNzYWdlLnByb21wdFxuICAgIH1cbiAgICBpZiAobWVzc2FnZS5hY3Rpb24gPT09ICdjbG9zZS1zaWRlYmFyJykge1xuICAgICAgc2VuZFJlc3BvbnNlKHsgYWN0aW9uOiAnY2xvc2Utc2lkZWJhcicgfSlcbiAgICB9XG4gIH0pXG59XG5cbmNvbnN0IHRvZ2dsZVNpZGViYXIgPSAoKSA9PiB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgaWYgKHRhYnNbMF0uaWQpIHtcbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHsgYWN0aW9uOiAnb3Blbi1zaWRlYmFyJyB9KVxuICAgIH1cbiAgfSlcbn1cbiIsImltcG9ydCB7IGJhY2tncm91bmRMb2cgfSBmcm9tICcuLi8uLi9sb2dzJ1xuaW1wb3J0IHtcbiAgY3JlYXRlQ29udGV4dE1lbnUsXG4gIGNyZWF0ZUNvbnRleHRNZW51T25TdG9yYWdlQ2hhbmdlLFxufSBmcm9tICcuL3F1aWNrLW1lbnUvY3JlYXRlQ29udGV4dE1lbnUnXG5pbXBvcnQgeyBmb3J3YXJkQ29udGV4dE1lbnVDbGlja3MgfSBmcm9tICcuL3F1aWNrLW1lbnUvZm9yd2FyZENvbnRleHRNZW51J1xuaW1wb3J0IHsgY2FwdHVyZVNjcmVlbkxpc3RlbmVyIH0gZnJvbSAnLi9zaWRlYmFyL2NhcHR1cmVTY3JlZW5MaXN0ZW5lcidcbmltcG9ydCB7IHNlbmRTaWRlYmFyU2hvcnRjdXQgfSBmcm9tICcuL3NpZGViYXIvc2VuZFNpZGViYXJTaG9ydGN1dCdcbmltcG9ydCB7IHNpZGViYXJUb2dnbGVMaXN0ZW5lcnMgfSBmcm9tICcuL3NpZGViYXIvc2lkZWJhclRvZ2dsZUxpc3RlbmVycydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQmFja2dyb3VuZCh7XG4gIG1haW4oKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBsb2dnaW5nXG4gICAgYmFja2dyb3VuZExvZygpXG5cbiAgICAvLyBTaWRlYmFyIGZ1bmN0aW9uYWxpdHlcbiAgICBzaWRlYmFyVG9nZ2xlTGlzdGVuZXJzKClcbiAgICBzZW5kU2lkZWJhclNob3J0Y3V0KClcbiAgICBjYXB0dXJlU2NyZWVuTGlzdGVuZXIoKVxuXG4gICAgLy8gUXVpY2sgbWVudSBmdW5jdGlvbmFsaXR5XG4gICAgY3JlYXRlQ29udGV4dE1lbnUoKVxuICAgIGZvcndhcmRDb250ZXh0TWVudUNsaWNrcygpXG4gICAgY3JlYXRlQ29udGV4dE1lbnVPblN0b3JhZ2VDaGFuZ2UoKVxuICB9LFxufSlcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiLCBbXCJtb2R1bGVcIl0sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZmFjdG9yeShtb2R1bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QpO1xuICAgIGdsb2JhbC5icm93c2VyID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsVGhpcyA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgLyogd2ViZXh0ZW5zaW9uLXBvbHlmaWxsIC0gdjAuMTIuMCAtIFR1ZSBNYXkgMTQgMjAyNCAxODowMToyOSAqL1xuICAvKiAtKi0gTW9kZTogaW5kZW50LXRhYnMtbW9kZTogbmlsOyBqcy1pbmRlbnQtbGV2ZWw6IDIgLSotICovXG4gIC8qIHZpbTogc2V0IHN0cz0yIHN3PTIgZXQgdHc9ODA6ICovXG4gIC8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICAgKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBpZiAoIShnbG9iYWxUaGlzLmNocm9tZSAmJiBnbG9iYWxUaGlzLmNocm9tZS5ydW50aW1lICYmIGdsb2JhbFRoaXMuY2hyb21lLnJ1bnRpbWUuaWQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBzY3JpcHQgc2hvdWxkIG9ubHkgYmUgbG9hZGVkIGluIGEgYnJvd3NlciBleHRlbnNpb24uXCIpO1xuICB9XG4gIGlmICghKGdsb2JhbFRoaXMuYnJvd3NlciAmJiBnbG9iYWxUaGlzLmJyb3dzZXIucnVudGltZSAmJiBnbG9iYWxUaGlzLmJyb3dzZXIucnVudGltZS5pZCkpIHtcbiAgICBjb25zdCBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UgPSBcIlRoZSBtZXNzYWdlIHBvcnQgY2xvc2VkIGJlZm9yZSBhIHJlc3BvbnNlIHdhcyByZWNlaXZlZC5cIjtcblxuICAgIC8vIFdyYXBwaW5nIHRoZSBidWxrIG9mIHRoaXMgcG9seWZpbGwgaW4gYSBvbmUtdGltZS11c2UgZnVuY3Rpb24gaXMgYSBtaW5vclxuICAgIC8vIG9wdGltaXphdGlvbiBmb3IgRmlyZWZveC4gU2luY2UgU3BpZGVybW9ua2V5IGRvZXMgbm90IGZ1bGx5IHBhcnNlIHRoZVxuICAgIC8vIGNvbnRlbnRzIG9mIGEgZnVuY3Rpb24gdW50aWwgdGhlIGZpcnN0IHRpbWUgaXQncyBjYWxsZWQsIGFuZCBzaW5jZSBpdCB3aWxsXG4gICAgLy8gbmV2ZXIgYWN0dWFsbHkgbmVlZCB0byBiZSBjYWxsZWQsIHRoaXMgYWxsb3dzIHRoZSBwb2x5ZmlsbCB0byBiZSBpbmNsdWRlZFxuICAgIC8vIGluIEZpcmVmb3ggbmVhcmx5IGZvciBmcmVlLlxuICAgIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgICAvLyBKU09OIGZpbGUuXG4gICAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhhcGlNZXRhZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImFwaS1tZXRhZGF0YS5qc29uIGhhcyBub3QgYmVlbiBpbmNsdWRlZCBpbiBicm93c2VyLXBvbHlmaWxsXCIpO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgKi9cbiAgICAgIGNsYXNzIERlZmF1bHRXZWFrTWFwIGV4dGVuZHMgV2Vha01hcCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNyZWF0ZUl0ZW0sIGl0ZW1zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc3VwZXIoaXRlbXMpO1xuICAgICAgICAgIHRoaXMuY3JlYXRlSXRlbSA9IGNyZWF0ZUl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgZ2V0KGtleSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdXBlci5nZXQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGFuIG9iamVjdCB3aXRoIGEgYHRoZW5gIG1ldGhvZCwgYW5kIGNhblxuICAgICAgICogdGhlcmVmb3JlIGJlIGFzc3VtZWQgdG8gYmVoYXZlIGFzIGEgUHJvbWlzZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHRoZW5hYmxlLlxuICAgICAgICovXG4gICAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBmdW5jdGlvbiB3aGljaCwgd2hlbiBjYWxsZWQsIHdpbGwgcmVzb2x2ZSBvciByZWplY3RcbiAgICAgICAqIHRoZSBnaXZlbiBwcm9taXNlIGJhc2VkIG9uIGhvdyBpdCBpcyBjYWxsZWQ6XG4gICAgICAgKlxuICAgICAgICogLSBJZiwgd2hlbiBjYWxsZWQsIGBjaHJvbWUucnVudGltZS5sYXN0RXJyb3JgIGNvbnRhaW5zIGEgbm9uLW51bGwgb2JqZWN0LFxuICAgICAgICogICB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIElmIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCBleGFjdGx5IG9uZSBhcmd1bWVudCwgdGhlIHByb21pc2UgaXNcbiAgICAgICAqICAgcmVzb2x2ZWQgdG8gdGhhdCB2YWx1ZS5cbiAgICAgICAqIC0gT3RoZXJ3aXNlLCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB0byBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGVcbiAgICAgICAqICAgZnVuY3Rpb24ncyBhcmd1bWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHByb21pc2VcbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVzb2x1dGlvbiBhbmQgcmVqZWN0aW9uIGZ1bmN0aW9ucyBvZiBhXG4gICAgICAgKiAgICAgICAgcHJvbWlzZS5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVzb2x2ZVxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVzb2x1dGlvbiBmdW5jdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb21pc2UucmVqZWN0XG4gICAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZWplY3Rpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgd3JhcHBlZCBtZXRob2Qgd2hpY2ggaGFzIGNyZWF0ZWQgdGhlIGNhbGxiYWNrLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9ufVxuICAgICAgICogICAgICAgIFRoZSBnZW5lcmF0ZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IG1ha2VDYWxsYmFjayA9IChwcm9taXNlLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gKC4uLmNhbGxiYWNrQXJncykgPT4ge1xuICAgICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyB8fCBjYWxsYmFja0FyZ3MubGVuZ3RoIDw9IDEgJiYgbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzWzBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHBsdXJhbGl6ZUFyZ3VtZW50cyA9IG51bUFyZ3MgPT4gbnVtQXJncyA9PSAxID8gXCJhcmd1bWVudFwiIDogXCJhcmd1bWVudHNcIjtcblxuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGEgd3JhcHBlciBmdW5jdGlvbiBmb3IgYSBtZXRob2Qgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBhbmQgbWV0YWRhdGEuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgICAqICAgICAgICBUaGUgbmFtZSBvZiB0aGUgbWV0aG9kIHdoaWNoIGlzIGJlaW5nIHdyYXBwZWQuXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1pbkFyZ3NcbiAgICAgICAqICAgICAgICBUaGUgbWluaW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG11c3QgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBmZXdlciB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWF4QXJnc1xuICAgICAgICogICAgICAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbWF5IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggbW9yZSB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbihvYmplY3QsIC4uLiopfVxuICAgICAgICogICAgICAgVGhlIGdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLlxuICAgICAgICovXG4gICAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBtb3N0ICR7bWV0YWRhdGEubWF4QXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWF4QXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgQVBJIG1ldGhvZCBoYXMgY3VycmVudGx5IG5vIGNhbGxiYWNrIG9uIENocm9tZSwgYnV0IGl0IHJldHVybiBhIHByb21pc2Ugb24gRmlyZWZveCxcbiAgICAgICAgICAgICAgLy8gYW5kIHNvIHRoZSBwb2x5ZmlsbCB3aWxsIHRyeSB0byBjYWxsIGl0IHdpdGggYSBjYWxsYmFjayBmaXJzdCwgYW5kIGl0IHdpbGwgZmFsbGJhY2tcbiAgICAgICAgICAgICAgLy8gdG8gbm90IHBhc3NpbmcgdGhlIGNhbGxiYWNrIGlmIHRoZSBmaXJzdCBjYWxsIGZhaWxzLlxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzLCBtYWtlQ2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgIH0sIG1ldGFkYXRhKSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGNiRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bmFtZX0gQVBJIG1ldGhvZCBkb2Vzbid0IHNlZW0gdG8gc3VwcG9ydCB0aGUgY2FsbGJhY2sgcGFyYW1ldGVyLCBgICsgXCJmYWxsaW5nIGJhY2sgdG8gY2FsbCBpdCB3aXRob3V0IGEgY2FsbGJhY2s6IFwiLCBjYkVycm9yKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncyk7XG5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhLm5vQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YS5ub0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MsIG1ha2VDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgfSwgbWV0YWRhdGEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHdyYXBNZXRob2QgPSAodGFyZ2V0LCBtZXRob2QsIHdyYXBwZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShtZXRob2QsIHtcbiAgICAgICAgICBhcHBseSh0YXJnZXRNZXRob2QsIHRoaXNPYmosIGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyLmNhbGwodGhpc09iaiwgdGFyZ2V0LCAuLi5hcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcblxuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IHdyYXBPYmplY3QgPSAodGFyZ2V0LCB3cmFwcGVycyA9IHt9LCBtZXRhZGF0YSA9IHt9KSA9PiB7XG4gICAgICAgIGxldCBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHtcbiAgICAgICAgICBoYXMocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldCB8fCBwcm9wIGluIGNhY2hlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0KHByb3h5VGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY2FjaGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0YXJnZXRbcHJvcF07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1ldGhvZCBvbiB0aGUgdW5kZXJseWluZyBvYmplY3QuIENoZWNrIGlmIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgICAgLy8gYW55IHdyYXBwaW5nLlxuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygd3JhcHBlcnNbcHJvcF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgYSBzcGVjaWFsLWNhc2Ugd3JhcHBlciBmb3IgdGhpcyBtZXRob2QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyc1twcm9wXSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBhc3luYyBtZXRob2QgdGhhdCB3ZSBoYXZlIG1ldGFkYXRhIGZvci4gQ3JlYXRlIGFcbiAgICAgICAgICAgICAgICAvLyBQcm9taXNlIHdyYXBwZXIgZm9yIGl0LlxuICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyID0gd3JhcEFzeW5jRnVuY3Rpb24ocHJvcCwgbWV0YWRhdGFbcHJvcF0pO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcE1ldGhvZCh0YXJnZXQsIHRhcmdldFtwcm9wXSwgd3JhcHBlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1ldGhvZCB0aGF0IHdlIGRvbid0IGtub3cgb3IgY2FyZSBhYm91dC4gUmV0dXJuIHRoZVxuICAgICAgICAgICAgICAgIC8vIG9yaWdpbmFsIG1ldGhvZCwgYm91bmQgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuYmluZCh0YXJnZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAoaGFzT3duUHJvcGVydHkod3JhcHBlcnMsIHByb3ApIHx8IGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBwcm9wKSkpIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBvYmplY3QgdGhhdCB3ZSBuZWVkIHRvIGRvIHNvbWUgd3JhcHBpbmcgZm9yIHRoZSBjaGlsZHJlblxuICAgICAgICAgICAgICAvLyBvZi4gQ3JlYXRlIGEgc3ViLW9iamVjdCB3cmFwcGVyIGZvciBpdCB3aXRoIHRoZSBhcHByb3ByaWF0ZSBjaGlsZFxuICAgICAgICAgICAgICAvLyBtZXRhZGF0YS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbcHJvcF0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgXCIqXCIpKSB7XG4gICAgICAgICAgICAgIC8vIFdyYXAgYWxsIHByb3BlcnRpZXMgaW4gKiBuYW1lc3BhY2UuXG4gICAgICAgICAgICAgIHZhbHVlID0gd3JhcE9iamVjdCh2YWx1ZSwgd3JhcHBlcnNbcHJvcF0sIG1ldGFkYXRhW1wiKlwiXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBXZSBkb24ndCBuZWVkIHRvIGRvIGFueSB3cmFwcGluZyBmb3IgdGhpcyBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgLy8gc28ganVzdCBmb3J3YXJkIGFsbCBhY2Nlc3MgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2FjaGUsIHByb3AsIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWNoZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVmaW5lUHJvcGVydHkocHJveHlUYXJnZXQsIHByb3AsIGRlc2MpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlLCBwcm9wLCBkZXNjKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cbiAgICAgICAgbGV0IHByb3h5VGFyZ2V0ID0gT2JqZWN0LmNyZWF0ZSh0YXJnZXQpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHByb3h5VGFyZ2V0LCBoYW5kbGVycyk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgICAqXG4gICAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAqL1xuICAgICAgY29uc3Qgd3JhcEV2ZW50ID0gd3JhcHBlck1hcCA9PiAoe1xuICAgICAgICBhZGRMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyLCAuLi5hcmdzKSB7XG4gICAgICAgICAgdGFyZ2V0LmFkZExpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSwgLi4uYXJncyk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICB0YXJnZXQucmVtb3ZlTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb25zdCBvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBzIGFuIG9uUmVxdWVzdEZpbmlzaGVkIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgd2lsbCByZXR1cm4gYVxuICAgICAgICAgKiBgZ2V0Q29udGVudCgpYCBwcm9wZXJ0eSB3aGljaCByZXR1cm5zIGEgYFByb21pc2VgIHJhdGhlciB0aGFuIHVzaW5nIGFcbiAgICAgICAgICogY2FsbGJhY2sgQVBJLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxXG4gICAgICAgICAqICAgICAgICBUaGUgSEFSIGVudHJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldHdvcmsgcmVxdWVzdC5cbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBvblJlcXVlc3RGaW5pc2hlZChyZXEpIHtcbiAgICAgICAgICBjb25zdCB3cmFwcGVkUmVxID0gd3JhcE9iamVjdChyZXEsIHt9IC8qIHdyYXBwZXJzICovLCB7XG4gICAgICAgICAgICBnZXRDb250ZW50OiB7XG4gICAgICAgICAgICAgIG1pbkFyZ3M6IDAsXG4gICAgICAgICAgICAgIG1heEFyZ3M6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsaXN0ZW5lcih3cmFwcGVkUmVxKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgb25NZXNzYWdlV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogV3JhcHMgYSBtZXNzYWdlIGxpc3RlbmVyIGZ1bmN0aW9uIHNvIHRoYXQgaXQgbWF5IHNlbmQgcmVzcG9uc2VzIGJhc2VkIG9uXG4gICAgICAgICAqIGl0cyByZXR1cm4gdmFsdWUsIHJhdGhlciB0aGFuIGJ5IHJldHVybmluZyBhIHNlbnRpbmVsIHZhbHVlIGFuZCBjYWxsaW5nIGFcbiAgICAgICAgICogY2FsbGJhY2suIElmIHRoZSBsaXN0ZW5lciBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZSwgdGhlIHJlc3BvbnNlIGlzXG4gICAgICAgICAqIHNlbnQgd2hlbiB0aGUgcHJvbWlzZSBlaXRoZXIgcmVzb2x2ZXMgb3IgcmVqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHsqfSBtZXNzYWdlXG4gICAgICAgICAqICAgICAgICBUaGUgbWVzc2FnZSBzZW50IGJ5IHRoZSBvdGhlciBlbmQgb2YgdGhlIGNoYW5uZWwuXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzZW5kZXJcbiAgICAgICAgICogICAgICAgIERldGFpbHMgYWJvdXQgdGhlIHNlbmRlciBvZiB0aGUgbWVzc2FnZS5cbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbigqKX0gc2VuZFJlc3BvbnNlXG4gICAgICAgICAqICAgICAgICBBIGNhbGxiYWNrIHdoaWNoLCB3aGVuIGNhbGxlZCB3aXRoIGFuIGFyYml0cmFyeSBhcmd1bWVudCwgc2VuZHNcbiAgICAgICAgICogICAgICAgIHRoYXQgdmFsdWUgYXMgYSByZXNwb25zZS5cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqICAgICAgICBUcnVlIGlmIHRoZSB3cmFwcGVkIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgd2hpY2ggd2lsbCBsYXRlclxuICAgICAgICAgKiAgICAgICAgeWllbGQgYSByZXNwb25zZS4gRmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uTWVzc2FnZShtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICAgIGxldCBkaWRDYWxsU2VuZFJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHdyYXBwZWRTZW5kUmVzcG9uc2U7XG4gICAgICAgICAgbGV0IHNlbmRSZXNwb25zZVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHdyYXBwZWRTZW5kUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSBsaXN0ZW5lcihtZXNzYWdlLCBzZW5kZXIsIHdyYXBwZWRTZW5kUmVzcG9uc2UpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVzdWx0ID0gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgaXNSZXN1bHRUaGVuYWJsZSA9IHJlc3VsdCAhPT0gdHJ1ZSAmJiBpc1RoZW5hYmxlKHJlc3VsdCk7XG5cbiAgICAgICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgZGlkbid0IHJldHVybmVkIHRydWUgb3IgYSBQcm9taXNlLCBvciBjYWxsZWRcbiAgICAgICAgICAvLyB3cmFwcGVkU2VuZFJlc3BvbnNlIHN5bmNocm9ub3VzbHksIHdlIGNhbiBleGl0IGVhcmxpZXJcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZXJlIHdpbGwgYmUgbm8gcmVzcG9uc2Ugc2VudCBmcm9tIHRoaXMgbGlzdGVuZXIuXG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSAmJiAhaXNSZXN1bHRUaGVuYWJsZSAmJiAhZGlkQ2FsbFNlbmRSZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEEgc21hbGwgaGVscGVyIHRvIHNlbmQgdGhlIG1lc3NhZ2UgaWYgdGhlIHByb21pc2UgcmVzb2x2ZXNcbiAgICAgICAgICAvLyBhbmQgYW4gZXJyb3IgaWYgdGhlIHByb21pc2UgcmVqZWN0cyAoYSB3cmFwcGVkIHNlbmRNZXNzYWdlIGhhc1xuICAgICAgICAgIC8vIHRvIHRyYW5zbGF0ZSB0aGUgbWVzc2FnZSBpbnRvIGEgcmVzb2x2ZWQgcHJvbWlzZSBvciBhIHJlamVjdGVkXG4gICAgICAgICAgLy8gcHJvbWlzZSkuXG4gICAgICAgICAgY29uc3Qgc2VuZFByb21pc2VkUmVzdWx0ID0gcHJvbWlzZSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4obXNnID0+IHtcbiAgICAgICAgICAgICAgLy8gc2VuZCB0aGUgbWVzc2FnZSB2YWx1ZS5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKG1zZyk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIC8vIFNlbmQgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciBpZiB0aGUgcmVqZWN0ZWQgdmFsdWVcbiAgICAgICAgICAgICAgLy8gaXMgYW4gaW5zdGFuY2Ugb2YgZXJyb3IsIG9yIHRoZSBvYmplY3QgaXRzZWxmIG90aGVyd2lzZS5cbiAgICAgICAgICAgICAgbGV0IG1lc3NhZ2U7XG4gICAgICAgICAgICAgIGlmIChlcnJvciAmJiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciB8fCB0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBfX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X186IHRydWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgIC8vIFByaW50IGFuIGVycm9yIG9uIHRoZSBjb25zb2xlIGlmIHVuYWJsZSB0byBzZW5kIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzZW5kIG9uTWVzc2FnZSByZWplY3RlZCByZXBseVwiLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHNlbmQgdGhlIHJlc29sdmVkIHZhbHVlIGFzIGFcbiAgICAgICAgICAvLyByZXN1bHQsIG90aGVyd2lzZSB3YWl0IHRoZSBwcm9taXNlIHJlbGF0ZWQgdG8gdGhlIHdyYXBwZWRTZW5kUmVzcG9uc2VcbiAgICAgICAgICAvLyBjYWxsYmFjayB0byByZXNvbHZlIGFuZCBzZW5kIGl0IGFzIGEgcmVzcG9uc2UuXG4gICAgICAgICAgaWYgKGlzUmVzdWx0VGhlbmFibGUpIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQoc2VuZFJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTGV0IENocm9tZSBrbm93IHRoYXQgdGhlIGxpc3RlbmVyIGlzIHJlcGx5aW5nLlxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjayA9ICh7XG4gICAgICAgIHJlamVjdCxcbiAgICAgICAgcmVzb2x2ZVxuICAgICAgfSwgcmVwbHkpID0+IHtcbiAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAvLyBEZXRlY3Qgd2hlbiBub25lIG9mIHRoZSBsaXN0ZW5lcnMgcmVwbGllZCB0byB0aGUgc2VuZE1lc3NhZ2UgY2FsbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIC8vIHRoZSBwcm9taXNlIHRvIHVuZGVmaW5lZCBhcyBpbiBGaXJlZm94LlxuICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS93ZWJleHRlbnNpb24tcG9seWZpbGwvaXNzdWVzLzEzMFxuICAgICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UgPT09IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyZXBseSAmJiByZXBseS5fX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X18pIHtcbiAgICAgICAgICAvLyBDb252ZXJ0IGJhY2sgdGhlIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGludG9cbiAgICAgICAgICAvLyBhbiBFcnJvciBpbnN0YW5jZS5cbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKHJlcGx5Lm1lc3NhZ2UpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlcGx5KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZSA9IChuYW1lLCBtZXRhZGF0YSwgYXBpTmFtZXNwYWNlT2JqLCAuLi5hcmdzKSA9PiB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IG1ldGFkYXRhLm1pbkFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IGxlYXN0ICR7bWV0YWRhdGEubWluQXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWluQXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBjb25zdCB3cmFwcGVkQ2IgPSB3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjay5iaW5kKG51bGwsIHtcbiAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICByZWplY3RcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhcmdzLnB1c2god3JhcHBlZENiKTtcbiAgICAgICAgICBhcGlOYW1lc3BhY2VPYmouc2VuZE1lc3NhZ2UoLi4uYXJncyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHN0YXRpY1dyYXBwZXJzID0ge1xuICAgICAgICBkZXZ0b29sczoge1xuICAgICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICAgIG9uUmVxdWVzdEZpbmlzaGVkOiB3cmFwRXZlbnQob25SZXF1ZXN0RmluaXNoZWRXcmFwcGVycylcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bnRpbWU6IHtcbiAgICAgICAgICBvbk1lc3NhZ2U6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgb25NZXNzYWdlRXh0ZXJuYWw6IHdyYXBFdmVudChvbk1lc3NhZ2VXcmFwcGVycyksXG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0YWJzOiB7XG4gICAgICAgICAgc2VuZE1lc3NhZ2U6IHdyYXBwZWRTZW5kTWVzc2FnZS5iaW5kKG51bGwsIFwic2VuZE1lc3NhZ2VcIiwge1xuICAgICAgICAgICAgbWluQXJnczogMixcbiAgICAgICAgICAgIG1heEFyZ3M6IDNcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2V0dGluZ01ldGFkYXRhID0ge1xuICAgICAgICBjbGVhcjoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBhcGlNZXRhZGF0YS5wcml2YWN5ID0ge1xuICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICBzZXJ2aWNlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgd2Vic2l0ZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gd3JhcE9iamVjdChleHRlbnNpb25BUElzLCBzdGF0aWNXcmFwcGVycywgYXBpTWV0YWRhdGEpO1xuICAgIH07XG5cbiAgICAvLyBUaGUgYnVpbGQgcHJvY2VzcyBhZGRzIGEgVU1EIHdyYXBwZXIgYXJvdW5kIHRoaXMgZmlsZSwgd2hpY2ggbWFrZXMgdGhlXG4gICAgLy8gYG1vZHVsZWAgdmFyaWFibGUgYXZhaWxhYmxlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gd3JhcEFQSXMoY2hyb21lKTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFRoaXMuYnJvd3NlcjtcbiAgfVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1icm93c2VyLXBvbHlmaWxsLmpzLm1hcFxuIiwiaW1wb3J0IG9yaWdpbmFsQnJvd3NlciBmcm9tIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI7XG5leHBvcnQgY29uc3QgYnJvd3NlciA9IG9yaWdpbmFsQnJvd3NlcjtcbiJdLCJuYW1lcyI6WyJkZWRlbnQiLCJyZXN1bHQiLCJ0aGlzIiwicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwiZW5kZW50IiwibCIsImkiLCJlIiwicmVxdWlyZSIsInQiLCJuIiwiciIsIm8iLCJ1IiwiYSIsInMiLCJmIiwiYyIsImQiLCJwcm9tcHRzIiwibW9kdWxlIiwicHJveHlUYXJnZXQiLCJ2YWx1ZSIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7O0FBQU8sV0FBUyxpQkFBaUIsS0FBSztBQUNwQyxRQUFJLE9BQU8sUUFBUSxPQUFPLFFBQVEsV0FBWSxRQUFPLEVBQUUsTUFBTSxJQUFLO0FBQ2xFLFdBQU87QUFBQSxFQUNUO0FDRkEsTUFBSSxnQkFBZ0IsTUFBTTtBQUFBLElBQ3hCLFlBQVksY0FBYztBQUN4QixVQUFJLGlCQUFpQixjQUFjO0FBQ2pDLGFBQUssWUFBWTtBQUNqQixhQUFLLGtCQUFrQixDQUFDLEdBQUcsY0FBYyxTQUFTO0FBQ2xELGFBQUssZ0JBQWdCO0FBQ3JCLGFBQUssZ0JBQWdCO0FBQUEsTUFDM0IsT0FBVztBQUNMLGNBQU0sU0FBUyx1QkFBdUIsS0FBSyxZQUFZO0FBQ3ZELFlBQUksVUFBVTtBQUNaLGdCQUFNLElBQUksb0JBQW9CLGNBQWMsa0JBQWtCO0FBQ2hFLGNBQU0sQ0FBQyxHQUFHLFVBQVUsVUFBVSxRQUFRLElBQUk7QUFDMUMseUJBQWlCLGNBQWMsUUFBUTtBQUN2Qyx5QkFBaUIsY0FBYyxRQUFRO0FBRXZDLGFBQUssa0JBQWtCLGFBQWEsTUFBTSxDQUFDLFFBQVEsT0FBTyxJQUFJLENBQUMsUUFBUTtBQUN2RSxhQUFLLGdCQUFnQjtBQUNyQixhQUFLLGdCQUFnQjtBQUFBLE1BQzNCO0FBQUEsSUFDQTtBQUFBLElBQ0UsU0FBUyxLQUFLO0FBQ1osVUFBSSxLQUFLO0FBQ1AsZUFBTztBQUNULFlBQU0sSUFBSSxPQUFPLFFBQVEsV0FBVyxJQUFJLElBQUksR0FBRyxJQUFJLGVBQWUsV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUk7QUFDakcsYUFBTyxDQUFDLENBQUMsS0FBSyxnQkFBZ0IsS0FBSyxDQUFDLGFBQWE7QUFDL0MsWUFBSSxhQUFhO0FBQ2YsaUJBQU8sS0FBSyxZQUFZLENBQUM7QUFDM0IsWUFBSSxhQUFhO0FBQ2YsaUJBQU8sS0FBSyxhQUFhLENBQUM7QUFDNUIsWUFBSSxhQUFhO0FBQ2YsaUJBQU8sS0FBSyxZQUFZLENBQUM7QUFDM0IsWUFBSSxhQUFhO0FBQ2YsaUJBQU8sS0FBSyxXQUFXLENBQUM7QUFDMUIsWUFBSSxhQUFhO0FBQ2YsaUJBQU8sS0FBSyxXQUFXLENBQUM7QUFBQSxNQUNoQyxDQUFLO0FBQUEsSUFDTDtBQUFBLElBQ0UsWUFBWSxLQUFLO0FBQ2YsYUFBTyxJQUFJLGFBQWEsV0FBVyxLQUFLLGdCQUFnQixHQUFHO0FBQUEsSUFDL0Q7QUFBQSxJQUNFLGFBQWEsS0FBSztBQUNoQixhQUFPLElBQUksYUFBYSxZQUFZLEtBQUssZ0JBQWdCLEdBQUc7QUFBQSxJQUNoRTtBQUFBLElBQ0UsZ0JBQWdCLEtBQUs7QUFDbkIsVUFBSSxDQUFDLEtBQUssaUJBQWlCLENBQUMsS0FBSztBQUMvQixlQUFPO0FBQ1QsWUFBTSxzQkFBc0I7QUFBQSxRQUMxQixLQUFLLHNCQUFzQixLQUFLLGFBQWE7QUFBQSxRQUM3QyxLQUFLLHNCQUFzQixLQUFLLGNBQWMsUUFBUSxTQUFTLEVBQUUsQ0FBQztBQUFBLE1BQ25FO0FBQ0QsWUFBTSxxQkFBcUIsS0FBSyxzQkFBc0IsS0FBSyxhQUFhO0FBQ3hFLGFBQU8sQ0FBQyxDQUFDLG9CQUFvQixLQUFLLENBQUMsVUFBVSxNQUFNLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxtQkFBbUIsS0FBSyxJQUFJLFFBQVE7QUFBQSxJQUNsSDtBQUFBLElBQ0UsWUFBWSxLQUFLO0FBQ2YsWUFBTSxNQUFNLHFFQUFxRTtBQUFBLElBQ3JGO0FBQUEsSUFDRSxXQUFXLEtBQUs7QUFDZCxZQUFNLE1BQU0sb0VBQW9FO0FBQUEsSUFDcEY7QUFBQSxJQUNFLFdBQVcsS0FBSztBQUNkLFlBQU0sTUFBTSxvRUFBb0U7QUFBQSxJQUNwRjtBQUFBLElBQ0Usc0JBQXNCLFNBQVM7QUFDN0IsWUFBTSxVQUFVLEtBQUssZUFBZSxPQUFPO0FBQzNDLFlBQU0sZ0JBQWdCLFFBQVEsUUFBUSxTQUFTLElBQUk7QUFDbkQsYUFBTyxPQUFPLElBQUksYUFBYSxHQUFHO0FBQUEsSUFDdEM7QUFBQSxJQUNFLGVBQWUsUUFBUTtBQUNyQixhQUFPLE9BQU8sUUFBUSx1QkFBdUIsTUFBTTtBQUFBLElBQ3ZEO0FBQUEsRUFDQTtBQUNBLE1BQUksZUFBZTtBQUNuQixlQUFhLFlBQVksQ0FBQyxRQUFRLFNBQVMsUUFBUSxPQUFPLEtBQUs7QUFDL0QsTUFBSSxzQkFBc0IsY0FBYyxNQUFNO0FBQUEsSUFDNUMsWUFBWSxjQUFjLFFBQVE7QUFDaEMsWUFBTSwwQkFBMEIsWUFBWSxNQUFNLE1BQU0sRUFBRTtBQUFBLElBQzlEO0FBQUEsRUFDQTtBQUNBLFdBQVMsaUJBQWlCLGNBQWMsVUFBVTtBQUNoRCxRQUFJLENBQUMsYUFBYSxVQUFVLFNBQVMsUUFBUSxLQUFLLGFBQWE7QUFDN0QsWUFBTSxJQUFJO0FBQUEsUUFDUjtBQUFBLFFBQ0EsR0FBRyxRQUFRLDBCQUEwQixhQUFhLFVBQVUsS0FBSyxJQUFJLENBQUM7QUFBQSxNQUN2RTtBQUFBLEVBQ0w7QUFDQSxXQUFTLGlCQUFpQixjQUFjLFVBQVU7QUFDaEQsUUFBSSxTQUFTLFNBQVMsR0FBRztBQUN2QixZQUFNLElBQUksb0JBQW9CLGNBQWMsZ0NBQWdDO0FBQzlFLFFBQUksU0FBUyxTQUFTLEdBQUcsS0FBSyxTQUFTLFNBQVMsS0FBSyxDQUFDLFNBQVMsV0FBVyxJQUFJO0FBQzVFLFlBQU0sSUFBSTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsTUFDRDtBQUFBLEVBQ0w7QUM5RkEsUUFBTSxXQUNKO0FBRUYsUUFBTSxVQUFVLENBQUMsUUFBZ0I7QUFBQSxFQUFLLElBQUksT0FBTyxLQUFLLElBQUksU0FBUyxDQUFDLENBQUMsSUFBSSxHQUFHO0FBTXJFLFFBQU0sZ0JBQWdCLE1BQU07QUFDakMsWUFBUSxJQUFJLFVBQVUsUUFBUSxtQkFBbUIsQ0FBQztBQUFBLEVBQ3BEOzs7Ozs7Ozs7Ozs7QUNUQSxlQUFTQSxRQUFPLFNBQVM7QUFFdkIsWUFBSSxNQUFNO0FBQ1YsWUFBSSxPQUFPLFlBQVksVUFBVTtBQUUvQixnQkFBTSxDQUFDLE9BQU87QUFBQSxRQUNsQixPQUFTO0FBQ0wsZ0JBQU0sUUFBUTtBQUFBLFFBQ2xCO0FBR0UsWUFBSUMsVUFBUztBQUNiLGlCQUFTLElBQUksR0FBRyxJQUFJLElBQUksUUFBUSxLQUFLO0FBQ25DLFVBQUFBLFdBQVUsSUFBSSxDQUFDLEVBRWYsUUFBUSxlQUFlLEVBQUUsRUFHekIsUUFBUSxRQUFRLEdBQUc7QUFFbkIsY0FBSSxLQUFLLFVBQVUsVUFBVSxJQUFJLElBQUksVUFBVSxTQUFTLElBQUk7QUFDMUQsWUFBQUEsV0FBVSxVQUFVLFVBQVUsSUFBSSxJQUFJLFNBQVksVUFBVSxJQUFJLENBQUM7QUFBQSxVQUN2RTtBQUFBLFFBQ0E7QUFHRSxZQUFJLFFBQVFBLFFBQU8sTUFBTSxJQUFJO0FBQzdCLFlBQUksVUFBVTtBQUNkLGNBQU0sUUFBUSxTQUFVLEdBQUc7QUFDekIsY0FBSSxJQUFJLEVBQUUsTUFBTSxXQUFXO0FBQzNCLGNBQUksR0FBRztBQUNMLGdCQUFJLFNBQVMsRUFBRSxDQUFDLEVBQUU7QUFDbEIsZ0JBQUksQ0FBQyxTQUFTO0FBRVosd0JBQVU7QUFBQSxZQUNsQixPQUFhO0FBQ0wsd0JBQVUsS0FBSyxJQUFJLFNBQVMsTUFBTTtBQUFBLFlBQzFDO0FBQUEsVUFDQTtBQUFBLFFBQ0EsQ0FBRztBQUVELFlBQUksWUFBWSxNQUFNO0FBQ3BCLFVBQUFBLFVBQVMsTUFBTSxJQUFJLFNBQVUsR0FBRztBQUM5QixtQkFBTyxFQUFFLENBQUMsTUFBTSxNQUFNLEVBQUUsTUFBTSxPQUFPLElBQUk7QUFBQSxVQUMvQyxDQUFLLEVBQUUsS0FBSyxJQUFJO0FBQUEsUUFDaEI7QUFHRSxRQUFBQSxVQUFTQSxRQUFPLEtBQU07QUFHdEIsZUFBT0EsUUFBTyxRQUFRLFFBQVEsSUFBSTtBQUFBLE1BQ3BDO0FBRW1DO0FBQ2pDLHlCQUFpQkQ7QUFBQSxNQUNuQjtBQUFBOzs7Ozs7OztBQzFEYyxvQkFBRyxDQUFDLFFBQVE7QUFDeEIsYUFBTyxPQUFPLFFBQVEsT0FBTyxRQUFRLFlBQVksSUFBSSxnQkFBZ0I7QUFBQSxJQUN2RTs7Ozs7Ozs7QUNBQSxhQUFTLE1BQU8sTUFBTTtBQUNwQixVQUFJLEVBQUUsZ0JBQWdCLFFBQVE7QUFDNUIsZUFBTyxJQUFJLE1BQU0sSUFBSTtBQUFBLE1BQ3pCO0FBQ0UsV0FBSyxNQUFNO0FBQ1gsV0FBSyxRQUFRO0FBQ2IsVUFBSTtBQUNGLGFBQUssUUFBUSxLQUFLLE1BQU0sSUFBSTtBQUFBLE1BQzdCLFNBQVEsS0FBSztBQUNaLGFBQUssTUFBTTtBQUFBLE1BQ2Y7QUFBQSxJQUNBO0FBRUEsWUFBaUI7Ozs7Ozs7QUNkakIsUUFBSSxrQkFBMkJFLElBQUssbUJBQW9CLFNBQVUsS0FBSztBQUNuRSxhQUFRLE9BQU8sSUFBSSxhQUFjLE1BQU0sRUFBRSxXQUFXLElBQUs7QUFBQSxJQUM1RDtBQUNELFdBQU8sZUFBZSxLQUFTLGNBQWMsRUFBRSxPQUFPLE1BQU07QUFDNUQsVUFBTSxXQUFXLGdCQUFnQkMsZUFBaUI7QUFDbEQsVUFBTSxrQkFBa0IsZ0JBQWdCQyxzQkFBd0I7QUFDaEUsVUFBTSxvQkFBb0IsZ0JBQWdCQyxjQUEwQjtBQUNwRSxVQUFNLFlBQVk7QUFDbEIsYUFBU0MsUUFBTyxZQUFZLFFBQVE7QUFDaEMsVUFBSUwsVUFBUztBQUNiLGVBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxRQUFRLEtBQUs7QUFDckMsUUFBQUEsV0FBVSxRQUFRLENBQUM7QUFDbkIsWUFBSSxJQUFJLE9BQU8sUUFBUTtBQUNuQixjQUFJLFFBQVEsT0FBTyxDQUFDO0FBQ3BCLGNBQUksU0FBUztBQUNiLGNBQUksa0JBQWtCLFFBQVEsS0FBSyxFQUFFLE9BQU87QUFDeEMsb0JBQVEsa0JBQWtCLFFBQVEsS0FBSyxFQUFFO0FBQ3pDLHFCQUFTO0FBQUEsVUFDekI7QUFDWSxjQUFLLFNBQVMsTUFBTSxTQUFTLEtBQU0sUUFBUTtBQUN2QyxnQkFBSSxXQUFXQSxRQUFPLE1BQU0sSUFBSTtBQUNoQyxnQkFBSSxJQUFJLFNBQVMsU0FBUyxTQUFTLENBQUMsRUFBRSxPQUFPLElBQUk7QUFDakQsZ0JBQUksY0FBYyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSTtBQUMxQyxnQkFBSSxZQUFZLFNBQ1YsS0FBSyxVQUFVLE9BQU8sTUFBTSxDQUFDLElBQzdCLE1BQU0sU0FBUztBQUNyQixnQkFBSSxhQUFhLFVBQVUsTUFBTSxJQUFJO0FBQ3JDLHVCQUFXLFFBQVEsQ0FBQ00sSUFBRyxVQUFVO0FBQzdCLGtCQUFJLFFBQVEsR0FBRztBQUNYLGdCQUFBTixXQUFVLE9BQU8sY0FBY007QUFBQSxjQUN2RCxPQUN5QjtBQUNELGdCQUFBTixXQUFVTTtBQUFBLGNBQ2xDO0FBQUEsWUFDQSxDQUFpQjtBQUFBLFVBQ2pCLFdBQ3FCLE9BQU8sVUFBVSxZQUFZLE1BQU0sU0FBUyxJQUFJLEdBQUc7QUFDeEQsZ0JBQUksZUFBZU4sUUFBTyxNQUFNLGVBQWU7QUFDL0MsZ0JBQUksT0FBTyxVQUFVLFVBQVU7QUFDM0Isa0JBQUksY0FBYyxlQUFlLGFBQWEsQ0FBQyxJQUFJO0FBQ25ELGNBQUFBLFdBQVUsTUFDTCxNQUFNLElBQUksRUFDVixJQUFJLENBQUMsS0FBS08sT0FBTTtBQUNqQixzQkFBTSxZQUFZO0FBQ2xCLHVCQUFPQSxPQUFNLElBQUksTUFBTSxHQUFHLFdBQVcsR0FBRyxHQUFHO0FBQUEsY0FDOUMsQ0FBQSxFQUNJLEtBQUssSUFBSTtBQUFBLFlBQ2xDLE9BQ3FCO0FBQ0QsY0FBQVAsV0FBVTtBQUFBLFlBQzlCO0FBQUEsVUFDQSxPQUNpQjtBQUNELFlBQUFBLFdBQVU7QUFBQSxVQUMxQjtBQUFBLFFBQ0E7QUFBQSxNQUNBO0FBQ0ksTUFBQUEsVUFBUyxTQUFTLFFBQVFBLE9BQU07QUFDaEMsYUFBT0EsUUFBTyxNQUFNLFNBQVMsRUFBRSxLQUFLLEVBQUU7QUFBQSxJQUMxQztBQUNBLElBQUFLLFFBQU8sU0FBUyxDQUFDLFNBQVM7QUFDdEIsYUFBTyxnQkFBZ0IsUUFBUSxJQUFJLElBQzdCLEVBQUUsQ0FBQyxTQUFTLEdBQUcsS0FBSyxVQUFVLE1BQU0sTUFBTSxDQUFDLEVBQUMsSUFDNUM7QUFBQSxJQUNUO0FBQ0QsUUFBQSxVQUFrQkE7Ozs7Ozs7Ozs7Ozs7O0FDbEVsQixPQUFDLFNBQVMsR0FBRTtBQUFnQyxlQUFBLFVBQWUsRUFBaUw7QUFBQSxNQUFBLEVBQUUsV0FBVTtBQUFDLGVBQU8sU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsbUJBQVMsRUFBRSxHQUFFRyxJQUFFO0FBQUMsZ0JBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRTtBQUFDLGtCQUFHLENBQUMsRUFBRSxDQUFDLEdBQUU7QUFBQyxvQkFBSSxJQUFFLGNBQVksT0FBT0MsbUJBQVNBO0FBQVEsb0JBQUcsQ0FBQ0QsTUFBRyxFQUFFLFFBQU8sRUFBRSxHQUFFLElBQUU7QUFBRSxvQkFBRyxFQUFFLFFBQU8sRUFBRSxHQUFFLElBQUU7QUFBRSxzQkFBTSxJQUFJLE1BQU0seUJBQXVCLElBQUUsR0FBRztBQUFBLGNBQUM7QUFBQyxjQUFBQSxLQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUMsU0FBUSxDQUFBLEVBQUU7QUFBRSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUtBLEdBQUUsU0FBUSxTQUFTQSxJQUFFO0FBQUMsb0JBQUlFLEtBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFRixFQUFDO0FBQUUsdUJBQU8sRUFBRUUsTUFBR0YsRUFBQztBQUFBLGNBQUMsR0FBRUEsSUFBRUEsR0FBRSxTQUFRLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxZQUFDO0FBQUMsbUJBQU8sRUFBRSxDQUFDLEVBQUU7QUFBQSxVQUFPO0FBQUMsbUJBQVEsSUFBRSxjQUFZLE9BQU9DLG1CQUFTQSxpQkFBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxHQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUUsaUJBQU87QUFBQSxRQUFDLEVBQUUsRUFBQyxHQUFFLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDLFlBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFjLGdCQUFJLElBQUUsRUFBRSxRQUFRO0FBQUUscUJBQVMsRUFBRUQsSUFBRUUsSUFBRTtBQUFDLGNBQUFBLEtBQUUsRUFBRUYsSUFBRUUsRUFBQztBQUFFLGtCQUFJQztBQUFFLHFCQUFPLFlBQVVBLEtBQUUsa0JBQWdCRCxHQUFFLFlBQVUsRUFBRSxXQUFXQSxHQUFFLFNBQVMsSUFBRSxJQUFJLEtBQUcsVUFBUUMsR0FBRSxRQUFNQSxHQUFFLFFBQU9BLEdBQUUsTUFBSUEsR0FBRSxTQUFRLEVBQUVELElBQUVDLEVBQUMsRUFBRSxTQUFTSCxFQUFDLEdBQUVHLEdBQUUsVUFBUUEsR0FBRSxJQUFJLEVBQUUsR0FBRUEsR0FBRSxTQUFPQSxHQUFFLE9BQU8sYUFBV0QsR0FBRSxXQUFTLFNBQU9BLEdBQUUsUUFBUSxLQUFHRixLQUFFRyxHQUFFLEtBQUksR0FBRyxhQUFXRCxHQUFFLFdBQVNGLEdBQUUsU0FBU0UsR0FBRSxRQUFRLElBQUVGO0FBQUEsWUFBRTtBQUFDLGFBQUMsSUFBRSxFQUFFLFVBQVEsR0FBRyxPQUFLLFNBQVNBLElBQUU7QUFBQyxxQkFBTyxFQUFFQSxFQUFDO0FBQUEsWUFBQyxHQUFFLEVBQUUsT0FBSyxTQUFTQSxJQUFFO0FBQUMscUJBQU8sRUFBRUEsSUFBRSxFQUFDLGVBQWMsTUFBRyxXQUFVLFFBQU8sVUFBUyxNQUFLLENBQUM7QUFBQSxZQUFDLEdBQUUsRUFBRSxNQUFJLFNBQVNBLElBQUU7QUFBQyxxQkFBTyxFQUFFQSxJQUFFLEVBQUMsV0FBVSxPQUFNLFVBQVMsTUFBSyxDQUFDO0FBQUEsWUFBQyxHQUFFLEVBQUUsVUFBUSxTQUFTQSxJQUFFO0FBQUMscUJBQU8sRUFBRUEsSUFBRSxFQUFDLFdBQVUsT0FBTSxVQUFTLE9BQU0sZUFBYyxLQUFFLENBQUM7QUFBQSxZQUFDO0FBQUUsZ0JBQUksSUFBRSxFQUFFLFlBQVUsRUFBRSxVQUFXLEVBQUMsTUFBSyxJQUFHLENBQUMsUUFBTyxLQUFLLEdBQUUsS0FBRyxFQUFFLEtBQUssYUFBYSxHQUFFLENBQUMsVUFBUyxPQUFNLFVBQVMsUUFBUTtBQUFHLHFCQUFTLEVBQUVBLElBQUVFLElBQUU7QUFBQyxrQkFBSUMsS0FBRSxDQUFBO0FBQUcsa0JBQUdBLEdBQUUsYUFBV0QsS0FBRUEsTUFBRyxDQUFBLEdBQUksYUFBVyxRQUFPQyxHQUFFLFdBQVNELEdBQUUsWUFBVSxPQUFNQyxHQUFFLGdCQUFjLENBQUMsQ0FBQ0QsR0FBRSxlQUFjQyxHQUFFLFlBQVVBLEdBQUUsVUFBVSxZQUFhLEdBQUNBLEdBQUUsV0FBU0EsR0FBRSxTQUFTLFlBQVcsR0FBR0EsR0FBRSxnQkFBYyxTQUFLRCxHQUFFLGVBQWNDLEdBQUUsY0FBWSxVQUFLRCxHQUFFLGFBQVlDLEdBQUUsdUJBQXFCLFVBQUtELEdBQUUsc0JBQXFCQyxHQUFFLDRCQUEwQixVQUFLRCxHQUFFLDJCQUEwQkMsR0FBRSxrQkFBZ0IsU0FBS0QsR0FBRSxpQkFBZ0JDLEdBQUUsZ0JBQWMsVUFBS0QsR0FBRSxlQUFjQyxHQUFFLG1CQUFpQixVQUFLRCxHQUFFLGtCQUFpQkMsR0FBRSxXQUFTRCxHQUFFLFlBQVUsUUFBT0MsR0FBRSxjQUFZRCxHQUFFLGVBQWEsUUFBTyxXQUFTRixHQUFFLE9BQU0sSUFBSSxNQUFNLDJCQUEyQjtBQUFFLHVCQUFRSSxLQUFFLEdBQUVBLEtBQUUsRUFBRSxRQUFPLEVBQUVBLEdBQUUsR0FBRUEsRUFBQyxFQUFFLFlBQWEsTUFBR0QsR0FBRSxVQUFVLFlBQVcsTUFBS0EsR0FBRSxZQUFVLEVBQUVDLEVBQUM7QUFBRyxrQkFBRyxPQUFLLEVBQUUsUUFBUUQsR0FBRSxTQUFTLEVBQUUsT0FBTSxJQUFJLE1BQU0sZ0JBQWNBLEdBQUUsWUFBVSx5Q0FBdUMsRUFBRSxLQUFLLElBQUksQ0FBQztBQUFFLGtCQUFHLE9BQUssRUFBRSxRQUFRQSxHQUFFLFFBQVEsS0FBRyxrQkFBZ0JBLEdBQUUsVUFBVSxPQUFNLElBQUksTUFBTSxlQUFhQSxHQUFFLFdBQVMseUNBQXVDLEVBQUUsS0FBSyxJQUFJLENBQUM7QUFBRSxxQkFBT0E7QUFBQSxZQUFDO0FBQUMscUJBQVMsRUFBRUgsSUFBRTtBQUFDLGtCQUFHLGNBQVksT0FBT0EsR0FBRSxRQUFPLFFBQU0sd0RBQXdELEtBQUssU0FBUyxVQUFVLFNBQVMsS0FBS0EsRUFBQyxDQUFDO0FBQUEsWUFBQztBQUFDLHFCQUFTLEVBQUVLLElBQUVILElBQUVILElBQUU7QUFBQyxjQUFBQSxLQUFFQSxNQUFHLENBQUE7QUFBRyx1QkFBU08sR0FBRU4sSUFBRTtBQUFDLHVCQUFPRSxHQUFFLFNBQU9BLEdBQUUsT0FBT0YsSUFBRSxNQUFNLElBQUVFLEdBQUUsTUFBTUYsSUFBRSxNQUFNO0FBQUEsY0FBQztBQUFDLHFCQUFNLEVBQUMsVUFBUyxTQUFTQSxJQUFFO0FBQUMsdUJBQU8sS0FBSyxPQUFLLFVBQVFBLEtBQUVLLEdBQUUsV0FBU0EsR0FBRSxTQUFTTCxFQUFDLElBQUVBLE1BQUcsU0FBTyxPQUFPQSxHQUFFLEVBQUVBLEVBQUM7QUFBQSxjQUFDLEdBQUUsU0FBUSxTQUFTRSxJQUFFO0FBQUMsb0JBQUlDLElBQUVILEtBQUUsT0FBTyxVQUFVLFNBQVMsS0FBS0UsRUFBQyxHQUFFRSxLQUFFLG1CQUFtQixLQUFLSixFQUFDO0FBQUUsZ0JBQUFJLE1BQUdBLEtBQUVBLEtBQUVBLEdBQUUsQ0FBQyxJQUFFLGNBQVlKLEtBQUUsS0FBSyxZQUFhO0FBQUMsb0JBQUcsTUFBSUEsS0FBRUQsR0FBRSxRQUFRRyxFQUFDLEdBQUcsUUFBTyxLQUFLLFNBQVMsZUFBYUYsS0FBRSxHQUFHO0FBQUUsb0JBQUdELEdBQUUsS0FBS0csRUFBQyxHQUFFLFdBQVMsS0FBRyxFQUFFLFlBQVUsRUFBRSxTQUFTQSxFQUFDLEVBQUUsUUFBT0ksR0FBRSxTQUFTLEdBQUVBLEdBQUVKLEVBQUM7QUFBRSxvQkFBRyxhQUFXRSxNQUFHLGVBQWFBLE1BQUcsb0JBQWtCQSxHQUFFLFFBQU9KLEtBQUUsT0FBTyxLQUFLRSxFQUFDLEdBQUVHLEdBQUUscUJBQW1CTCxLQUFFQSxHQUFFLEtBQUksSUFBSSxVQUFLSyxHQUFFLGVBQWEsRUFBRUgsRUFBQyxLQUFHRixHQUFFLE9BQU8sR0FBRSxHQUFFLGFBQVksYUFBWSxhQUFhLEdBQUVLLEdBQUUsZ0JBQWNMLEtBQUVBLEdBQUUsT0FBTyxTQUFTQSxJQUFFO0FBQUMseUJBQU0sQ0FBQ0ssR0FBRSxZQUFZTCxFQUFDO0FBQUEsZ0JBQUMsQ0FBQyxJQUFHTSxHQUFFLFlBQVVOLEdBQUUsU0FBTyxHQUFHLEdBQUVHLEtBQUUsTUFBS0gsR0FBRSxRQUFRLFNBQVNBLElBQUU7QUFBQyxrQkFBQUcsR0FBRSxTQUFTSCxFQUFDLEdBQUVNLEdBQUUsR0FBRyxHQUFFRCxHQUFFLGlCQUFlRixHQUFFLFNBQVNELEdBQUVGLEVBQUMsQ0FBQyxHQUFFTSxHQUFFLEdBQUc7QUFBQSxnQkFBQyxDQUFDO0FBQUUsb0JBQUcsQ0FBQyxLQUFLLE1BQUlGLEVBQUMsR0FBRTtBQUFDLHNCQUFHQyxHQUFFLGNBQWMsUUFBT0MsR0FBRSxNQUFJRixLQUFFLEdBQUc7QUFBRSx3QkFBTSxJQUFJLE1BQU0sMEJBQXdCQSxLQUFFLEdBQUc7QUFBQSxnQkFBQztBQUFDLHFCQUFLLE1BQUlBLEVBQUMsRUFBRUYsRUFBQztBQUFBLGNBQUMsR0FBRSxRQUFPLFNBQVNGLElBQUVFLElBQUU7QUFBQyxnQkFBQUEsS0FBRSxXQUFTQSxLQUFFQSxLQUFFLFVBQUtHLEdBQUU7QUFBZ0Isb0JBQUlGLEtBQUU7QUFBSyxvQkFBR0csR0FBRSxXQUFTTixHQUFFLFNBQU8sR0FBRyxHQUFFLENBQUNFLE1BQUdGLEdBQUUsVUFBUSxFQUFFLFFBQU9BLEdBQUUsUUFBUSxTQUFTQSxJQUFFO0FBQUMseUJBQU9HLEdBQUUsU0FBU0gsRUFBQztBQUFBLGdCQUFDLENBQUM7QUFBRSxvQkFBSUksS0FBRSxDQUFBLEdBQUdGLEtBQUVGLEdBQUUsSUFBSSxTQUFTQSxJQUFFO0FBQUMsc0JBQUlFLEtBQUUsSUFBSSxLQUFFQyxLQUFFSixHQUFFLE1BQUs7QUFBRyx5QkFBTyxFQUFFTSxJQUFFSCxJQUFFQyxFQUFDLEVBQUUsU0FBU0gsRUFBQyxHQUFFSSxLQUFFQSxHQUFFLE9BQU9ELEdBQUUsTUFBTUosR0FBRSxNQUFNLENBQUMsR0FBRUcsR0FBRSxLQUFNLEVBQUMsU0FBVTtBQUFBLGdCQUFBLENBQUM7QUFBRSx1QkFBT0gsS0FBRUEsR0FBRSxPQUFPSyxFQUFDLEdBQUVGLEdBQUUsS0FBSSxHQUFHLEtBQUssT0FBT0EsSUFBRSxLQUFFO0FBQUEsY0FBQyxHQUFFLE9BQU0sU0FBU0YsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLFVBQVFOLEdBQUUsT0FBUSxDQUFBO0FBQUEsY0FBQyxHQUFFLFNBQVEsU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLFlBQVVOLEdBQUUsU0FBUSxDQUFFO0FBQUEsY0FBQyxHQUFFLFFBQU8sU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLFdBQVNOLEdBQUUsU0FBUSxDQUFFO0FBQUEsY0FBQyxHQUFFLFVBQVMsU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLFVBQVFOLEdBQUUsU0FBUSxDQUFFO0FBQUEsY0FBQyxHQUFFLFNBQVEsU0FBU0EsSUFBRTtBQUFDLGdCQUFBTSxHQUFFLFlBQVVOLEdBQUUsU0FBTyxHQUFHLEdBQUVNLEdBQUVOLEdBQUUsU0FBVSxDQUFBO0FBQUEsY0FBQyxHQUFFLFdBQVUsU0FBU0EsSUFBRTtBQUFDLGdCQUFBTSxHQUFFLEtBQUssR0FBRSxFQUFFTixFQUFDLElBQUUsS0FBSyxTQUFTLFVBQVUsSUFBRSxLQUFLLFNBQVNBLEdBQUUsU0FBVSxDQUFBLEdBQUUsVUFBS0ssR0FBRSx3QkFBc0IsS0FBSyxTQUFTLG1CQUFpQixPQUFPTCxHQUFFLElBQUksQ0FBQyxHQUFFSyxHQUFFLDZCQUEyQixLQUFLLFFBQVFMLEVBQUM7QUFBQSxjQUFDLEdBQUUsU0FBUSxTQUFTQSxJQUFFO0FBQUMsdUJBQU9NLEdBQUUsWUFBVU4sR0FBRSxVQUFVO0FBQUEsY0FBQyxHQUFFLE1BQUssU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLFNBQU9OLEdBQUUsU0FBVSxDQUFBO0FBQUEsY0FBQyxHQUFFLE9BQU0sV0FBVTtBQUFDLHVCQUFPTSxHQUFFLE1BQU07QUFBQSxjQUFDLEdBQUUsWUFBVyxXQUFVO0FBQUMsdUJBQU9BLEdBQUUsV0FBVztBQUFBLGNBQUMsR0FBRSxTQUFRLFNBQVNOLElBQUU7QUFBQyx1QkFBT00sR0FBRSxXQUFTTixHQUFFLFVBQVU7QUFBQSxjQUFDLEdBQUUsYUFBWSxTQUFTQSxJQUFFO0FBQUMsdUJBQU9NLEdBQUUsYUFBYSxHQUFFLEtBQUssU0FBUyxNQUFNLFVBQVUsTUFBTSxLQUFLTixFQUFDLENBQUM7QUFBQSxjQUFDLEdBQUUsb0JBQW1CLFNBQVNBLElBQUU7QUFBQyx1QkFBT00sR0FBRSxvQkFBb0IsR0FBRSxLQUFLLFNBQVMsTUFBTSxVQUFVLE1BQU0sS0FBS04sRUFBQyxDQUFDO0FBQUEsY0FBQyxHQUFFLFlBQVcsU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLFlBQVksR0FBRSxLQUFLLFNBQVMsTUFBTSxVQUFVLE1BQU0sS0FBS04sRUFBQyxDQUFDO0FBQUEsY0FBQyxHQUFFLGNBQWEsU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLGNBQWMsR0FBRSxLQUFLLFNBQVMsTUFBTSxVQUFVLE1BQU0sS0FBS04sRUFBQyxDQUFDO0FBQUEsY0FBQyxHQUFFLGFBQVksU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLGFBQWEsR0FBRSxLQUFLLFNBQVMsTUFBTSxVQUFVLE1BQU0sS0FBS04sRUFBQyxDQUFDO0FBQUEsY0FBQyxHQUFFLGNBQWEsU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLGNBQWMsR0FBRSxLQUFLLFNBQVMsTUFBTSxVQUFVLE1BQU0sS0FBS04sRUFBQyxDQUFDO0FBQUEsY0FBQyxHQUFFLGFBQVksU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLGFBQWEsR0FBRSxLQUFLLFNBQVMsTUFBTSxVQUFVLE1BQU0sS0FBS04sRUFBQyxDQUFDO0FBQUEsY0FBQyxHQUFFLGVBQWMsU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLGVBQWUsR0FBRSxLQUFLLFNBQVMsTUFBTSxVQUFVLE1BQU0sS0FBS04sRUFBQyxDQUFDO0FBQUEsY0FBQyxHQUFFLGVBQWMsU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLGVBQWUsR0FBRSxLQUFLLFNBQVMsTUFBTSxVQUFVLE1BQU0sS0FBS04sRUFBQyxDQUFDO0FBQUEsY0FBQyxHQUFFLGNBQWEsU0FBU0EsSUFBRTtBQUFDLHVCQUFPTSxHQUFFLGNBQWMsR0FBRSxLQUFLLFNBQVMsSUFBSSxXQUFXTixFQUFDLENBQUM7QUFBQSxjQUFDLEdBQUUsTUFBSyxTQUFTQSxJQUFFO0FBQUMsdUJBQU9NLEdBQUUsU0FBT04sR0FBRSxTQUFVLENBQUE7QUFBQSxjQUFDLEdBQUUsTUFBSyxTQUFTQSxJQUFFO0FBQUMsZ0JBQUFNLEdBQUUsTUFBTTtBQUFFLGdCQUFBTixLQUFFLE1BQU0sS0FBS0EsRUFBQztBQUFFLHVCQUFPLEtBQUssT0FBT0EsSUFBRSxVQUFLSyxHQUFFLGFBQWE7QUFBQSxjQUFDLEdBQUUsTUFBSyxTQUFTTCxJ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RUosRUFBQyxJQUFFRyxPQUFJLEtBQUdFLEtBQUVMLEtBQUUsSUFBRUEsTUFBRztBQUFBLFlBQUc7QUFBQyxxQkFBUyxFQUFFQyxJQUFFRSxJQUFFQyxJQUFFQyxJQUFFQyxJQUFFO0FBQUMsY0FBQUEsT0FBSSxFQUFFLFFBQU1ILElBQUUsZUFBZSxHQUFFLEVBQUUsYUFBVyxPQUFPRSxJQUFFLDJCQUEyQixHQUFFLEVBQUUsUUFBTUQsSUFBRSxnQkFBZ0IsR0FBRSxFQUFFQSxLQUFFLElBQUVILEdBQUUsUUFBTyxzQ0FBc0MsR0FBRSxFQUFFRSxJQUFFLE9BQU0sTUFBTSxJQUFHRixHQUFFLFVBQVFHLE1BQUcsRUFBRUgsSUFBRSxLQUFHRSxLQUFFQSxLQUFFLFFBQU1BLEtBQUUsR0FBRUMsSUFBRUMsSUFBRUMsRUFBQztBQUFBLFlBQUM7QUFBQyxxQkFBUyxFQUFFTCxJQUFFRSxJQUFFQyxJQUFFQyxJQUFFQyxJQUFFO0FBQUMsY0FBQUEsT0FBSSxFQUFFLFFBQU1ILElBQUUsZUFBZSxHQUFFLEVBQUUsYUFBVyxPQUFPRSxJQUFFLDJCQUEyQixHQUFFLEVBQUUsUUFBTUQsSUFBRSxnQkFBZ0IsR0FBRSxFQUFFQSxLQUFFLElBQUVILEdBQUUsUUFBTyxzQ0FBc0MsR0FBRSxFQUFFRSxJQUFFLFlBQVcsV0FBVyxJQUFHRixHQUFFLFVBQVFHLE1BQUcsRUFBRUgsSUFBRSxLQUFHRSxLQUFFQSxLQUFFLGFBQVdBLEtBQUUsR0FBRUMsSUFBRUMsSUFBRUMsRUFBQztBQUFBLFlBQUM7QUFBQyxxQkFBUyxFQUFFTCxJQUFFRSxJQUFFQyxJQUFFQyxJQUFFQyxJQUFFO0FBQUMsY0FBQUEsT0FBSSxFQUFFLFFBQU1ILElBQUUsZUFBZSxHQUFFLEVBQUUsYUFBVyxPQUFPRSxJQUFFLDJCQUEyQixHQUFFLEVBQUUsUUFBTUQsSUFBRSxnQkFBZ0IsR0FBRSxFQUFFQSxLQUFFLElBQUVILEdBQUUsUUFBTyxzQ0FBc0MsR0FBRSxFQUFFRSxJQUFFLHNCQUFxQixxQkFBcUIsSUFBR0YsR0FBRSxVQUFRRyxNQUFHLEVB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QUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFVBQVUsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFdBQVcsR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFNBQVMsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFVBQVUsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFdBQVcsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLE1BQU0sR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFdBQVcsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLEVBQUUsR0FBRSxHQUFFLFVBQVUsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFNBQVMsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFdBQVcsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxLQUFFLEVBQUVBLElBQUVDLElBQUVOLElBQUVJLElBQUVILEdBQUVNLEtBQUUsRUFBRSxHQUFFLElBQUcsVUFBVSxHQUFFRCxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFVBQVUsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFdBQVcsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFNBQVMsR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFVBQVUsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLEVBQUUsR0FBRSxHQUFFLFFBQVEsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFVBQVUsR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLEVBQUUsR0FBRSxHQUFFLFdBQVcsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLEVBQUUsR0FBRSxHQUFFLFdBQVcsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxLQUFFLEVBQUVBLElBQUVDLElBQUVOLElBQUVJLElBQUVILEdBQUVNLEtBQUUsRUFBRSxHQUFFLElBQUcsV0FBVyxHQUFFRCxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLE9BQU8sR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFdBQVcsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFVBQVUsR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFNBQVMsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFdBQVcsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFdBQVcsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLEVBQUUsR0FBRSxHQUFFLFNBQVMsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFFBQVEsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFVBQVUsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFVBQVUsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFNBQVMsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxLQUFFLEVBQUVBLElBQUVDLElBQUVOLElBQUVJLElBQUVILEdBQUVNLEtBQUUsQ0FBQyxHQUFFLElBQUcsVUFBVSxHQUFFRCxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFVBQVUsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFdBQVcsR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFNBQVMsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLEVBQUUsR0FBRSxHQUFFLFVBQVUsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFdBQVcsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFFBQVEsR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFdBQVcsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFVBQVUsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFNBQVMsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFdBQVcsR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFVBQVUsR0FBRUgsS0FBRSxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFTixJQUFFQyxHQUFFTSxLQUFFLENBQUMsR0FBRSxHQUFFLFVBQVUsR0FBRVAsS0FBRSxFQUFFQSxJQUFFSSxJQUFFQyxJQUFFQyxJQUFFTCxHQUFFTSxLQUFFLEVBQUUsR0FBRSxJQUFHLFdBQVcsR0FBRUQsS0FBRSxFQUFFQSxJQUFFTixJQUFFSSxJQUFFQyxJQUFFSixHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFNBQVMsR0FBRUYsS0FBRSxFQUFFQSxJQUFFQyxJQUFFTixJQUFFSSxJQUFFSCxHQUFFTSxLQUFFLENBQUMsR0FBRSxJQUFHLFVBQVUsR0FBRUgsS0FBRSxFQUFFQSxJQUFFSyxFQUFDLEdBQUVKLEtBQUUsRUFBRUEsSUFBRUcsRUFBQyxHQUFFRixLQUFFLEVBQUVBLElBQUVJLEVBQUMsR0FBRVYsS0FBRSxFQUFFQSxJQUFFRCxFQUFDO0FBQUEsY0FBQztBQUFDLHFCQUFPLE1BQU1LLElBQUVDLElBQUVDLElBQUVOLEVBQUM7QUFBQSxZQUFDO0FBQUMscUJBQVMsRUFBRUMsSUFBRUUsSUFBRUMs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QUtFLE1BQUcsT0FBS0MsTUFBRyxPQUFLLEtBQUcsUUFBTUE7QUFBQSxZQUFDO0FBQUMscUJBQVMsRUFBRUgsSUFBRUYsSUFBRTtBQUFDLGtCQUFJWSxJQUFFQyxLQUFFLElBQUksTUFBTSxZQUFXLFlBQVcsWUFBVyxZQUFXLFdBQVUsWUFBVyxZQUFXLFlBQVcsWUFBVyxXQUFVLFdBQVUsWUFBVyxZQUFXLFlBQVcsWUFBVyxZQUFXLFlBQVcsWUFBVyxXQUFVLFdBQVUsV0FBVSxZQUFXLFlBQVcsWUFBVyxZQUFXLFlBQVcsWUFBVyxZQUFXLFlBQVcsWUFBVyxXQUFVLFdBQVUsV0FBVSxXQUFVLFlBQVcsWUFBVyxZQUFXLFlBQVcsWUFBVyxZQUFXLFlBQVcsWUFBVyxZQUFXLFlBQVcsWUFBVyxZQUFXLFlBQVcsV0FBVSxXQUFVLFdBQVUsV0FBVSxXQUFVLFdBQVUsWUFBVyxZQUFXLFlBQVcsWUFBVyxZQUFXLFlBQVcsWUFBVyxZQUFXLFlBQVcsWUFBVyxVQUFVLEdBQUVULEtBQUUsSUFBSSxNQUFNLFlBQVcsWUFBVyxZQUFXLFlBQVcsWUFBVyxZQUFXLFdBQVUsVUFBVSxHQUFFQyxLQUFFLElBQUksTUFBTSxFQUFFO0FBQUUsY0FBQUgsR0FBRUYsTUFBRyxDQUFDLEtBQUcsT0FBSyxLQUFHQSxLQUFFLElBQUdFLEdBQUUsTUFBSUYsS0FBRSxNQUFJLEtBQUcsRUFBRSxJQUFFQTtBQUFFLHVCQUFRTSxJQUFFQyxJQUFFLElBQUUsR0FBRSxJQUFFTCxHQUFFLFFBQU8sS0FBRyxJQUFHO0FBQUMseUJBQVFELEtBQUVHLEdBQUUsQ0FBQyxHQUFFSSxLQUFFSixHQUFFLENBQUMsR0FBRU0sS0FBRU4sR0FBRSxDQUFDLEdBQUUsSUFBRUEsR0FBRSxDQUFDLEdBQUVLLEtBQUVMLEdBQUUsQ0FBQyxHQUFFLElBQUVBLEdBQUUsQ0FBQyxHQUFFLElBQUVBLEdBQUUsQ0FBQyxHQUFFLElBQUVBLEdBQUUsQ0FBQyxHQUFFTyxLQUFFLEdBQUVBLEtBQUUsSUFBR0EsS0FBSSxDQUFBTixHQUFFTSxFQUFDLElBQUVBLEtBQUUsS0FBR1QsR0FBRVMsS0FBRSxDQUFDLElBQUUsRUFBRSxFQUFFLEdBQUdKLEtBQUVGLEdBQUVNLEtBQUUsQ0FBQyxHQUFFLEVBQUVKLElBQUUsRUFBRSxJQUFFLEVBQUVBLElBQUUsRUFBRSxJQUFFLEVBQUVBLElBQUUsRUFBRSxJQUFHRixHQUFFTSxLQUFFLENBQUMsQ0FBQyxJQUFHSixLQUFFRixHQUFFTSxLQUFFLEVBQUUsR0FBRSxFQUFFSixJQUFFLENBQUMsSUFBRSxFQUFFQSxJQUFFLEVBQUUsSUFBRSxFQUFFQSxJQUFFLENBQUMsRUFBRyxHQUFDRixHQUFFTSxLQUFFLEVBQUUsQ0FBQyxHQUFFQyxLQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRSxFQUFFTCxLQUFFRSxJQUFFLENBQUMsSUFBRSxFQUFFRixJQUFFLEVBQUUsSUFBRSxFQUFFQSxJQUFFLEVBQUUsQ0FBQyxHQUFFRSxLQUFFLElBQUUsQ0FBQ0EsS0FBRSxDQUFDLEdBQUVJLEdBQUVGLEVBQUMsQ0FBQyxHQUFFTixHQUFFTSxFQUFDLENBQUMsR0FBRUwsS0FBRSxFQUFFLEVBQUVBLEtBQUVMLElBQUUsQ0FBQyxJQUFFLEVBQUVLLElBQUUsRUFBRSxJQUFFLEVBQUVBLElBQUUsRUFBRSxHQUFFTCxLQUFFTyxLQUFFUCxLQUFFUyxLQUFFRixLQUFFRSxFQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFRCxJQUFFQSxLQUFFLEVBQUUsR0FBRUcsRUFBQyxHQUFFLElBQUVGLElBQUVBLEtBQUVGLElBQUVBLEtBQUVQLElBQUVBLEtBQUUsRUFBRVcsSUFBRU4sRUFBQztBQUFFLGdCQUFBRixHQUFFLENBQUMsSUFBRSxFQUFFSCxJQUFFRyxHQUFFLENBQUMsQ0FBQyxHQUFFQSxHQUFFLENBQUMsSUFBRSxFQUFFSSxJQUFFSixHQUFFLENBQUMsQ0FBQyxHQUFFQSxHQUFFLENBQUMsSUFBRSxFQUFFTSxJQUFFTixHQUFFLENBQUMsQ0FBQyxHQUFFQSxHQUFFLENBQUMsSUFBRSxFQUFFLEdBQUVBLEdBQUUsQ0FBQyxDQUFD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LFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFVBQVU7QUFBQSxZQUNSO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixRQUFRO0FBQUE7QUFBQTtBQUFBLFlBR1Y7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixRQUFRO0FBQUE7QUFBQTtBQUFBLFlBR1Y7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixRQUFRO0FBQUE7QUFBQTtBQUFBLFlBR1Y7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixRQUFRO0FBQUE7QUFBQTtBQUFBLFlBQUE7QUFBQSxVQUdWO0FBQUEsUUFFSjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFVBQVU7QUFBQSxZQUNSO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixRQUFRO0FBQUE7QUFBQTtBQUFBLFlBR1Y7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixRQUFRO0FBQUE7QUFBQTtBQUFBLFlBQUE7QUFBQSxVQUdWO0FBQUEsUUFFSjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFVBQVU7QUFBQSxZQUNSO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixRQUFRO0FBQUE7QUFBQTtBQUFBLFlBR1Y7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixRQUFRO0FBQUE7QUFBQTtBQUFBLFlBR1Y7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixRQUFRO0FBQUE7QUFBQTtBQUFBLFlBQUE7QUFBQSxVQUdWO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUVKO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLFFBQ1I7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQTtBQUFBO0FBQUEsUUFHVjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQTtBQUFBO0FBQUEsUUFBQTtBQUFB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Q1QsU0FBUztBQUFBLGNBQ1Y7QUFBQSxjQUNELEtBQUs7QUFBQSxnQkFDSCxTQUFTO0FBQUEsZ0JBQ1QsU0FBUztBQUFBLGNBQ25CO0FBQUEsWUFDTztBQUNELHdCQUFZLFVBQVU7QUFBQSxjQUNwQixTQUFTO0FBQUEsZ0JBQ1AsS0FBSztBQUFBLGNBQ047QUFBQSxjQUNELFVBQVU7QUFBQSxnQkFDUixLQUFLO0FBQUEsY0FDTjtBQUFBLGNBQ0QsVUFBVTtBQUFBLGdCQUNSLEtBQUs7QUFBQSxjQUNmO0FBQUEsWUFDTztBQUNELG1CQUFPLFdBQVcsZUFBZSxnQkFBZ0IsV0FBVztBQUFBLFVBQzdEO0FBSUQsVUFBQXFCLFFBQU8sVUFBVSxTQUFTLE1BQU07QUFBQSxRQUNwQyxPQUFTO0FBQ0wsVUFBQUEsUUFBTyxVQUFVLFdBQVc7QUFBQSxRQUNoQztBQUFBLE1BQ0EsQ0FBQztBQUFBOzs7OztBQ3RzQ00sUUFBTSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDMsNCw1LDYsNywxNiwxN119
