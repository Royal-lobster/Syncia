"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }




var _chunkGEVDEBBWjs = require('./chunk-GEVDEBBW.js');







var _chunkB7UJSB4Njs = require('./chunk-B7UJSB4N.js');

// node_modules/.pnpm/sourcemap-codec@1.4.8/node_modules/sourcemap-codec/dist/sourcemap-codec.es.js
function encode(decoded) {
  var sourceFileIndex = 0;
  var sourceCodeLine = 0;
  var sourceCodeColumn = 0;
  var nameIndex = 0;
  var mappings = "";
  for (var i = 0; i < decoded.length; i++) {
    var line = decoded[i];
    if (i > 0)
      mappings += ";";
    if (line.length === 0)
      continue;
    var generatedCodeColumn = 0;
    var lineMappings = [];
    for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
      var segment = line_1[_i];
      var segmentMappings = encodeInteger(segment[0] - generatedCodeColumn);
      generatedCodeColumn = segment[0];
      if (segment.length > 1) {
        segmentMappings += encodeInteger(segment[1] - sourceFileIndex) + encodeInteger(segment[2] - sourceCodeLine) + encodeInteger(segment[3] - sourceCodeColumn);
        sourceFileIndex = segment[1];
        sourceCodeLine = segment[2];
        sourceCodeColumn = segment[3];
      }
      if (segment.length === 5) {
        segmentMappings += encodeInteger(segment[4] - nameIndex);
        nameIndex = segment[4];
      }
      lineMappings.push(segmentMappings);
    }
    mappings += lineMappings.join(",");
  }
  return mappings;
}
function encodeInteger(num) {
  var result = "";
  num = num < 0 ? -num << 1 | 1 : num << 1;
  do {
    var clamped = num & 31;
    num >>>= 5;
    if (num > 0) {
      clamped |= 32;
    }
    result += chars[clamped];
  } while (num > 0);
  return result;
}
var charToInteger, chars, i;
var init_sourcemap_codec_es = _chunkB7UJSB4Njs.__esm.call(void 0, {
  "node_modules/.pnpm/sourcemap-codec@1.4.8/node_modules/sourcemap-codec/dist/sourcemap-codec.es.js"() {
    "use strict";
    charToInteger = {};
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    for (i = 0; i < chars.length; i++) {
      charToInteger[chars.charCodeAt(i)] = i;
    }
  }
});

// node_modules/.pnpm/magic-string@0.25.9/node_modules/magic-string/dist/magic-string.es.js
var magic_string_es_exports = {};
_chunkB7UJSB4Njs.__export.call(void 0, magic_string_es_exports, {
  Bundle: () => Bundle,
  SourceMap: () => SourceMap,
  default: () => MagicString
});
function guessIndent(code) {
  var lines = code.split("\n");
  var tabbed = lines.filter(function(line) {
    return /^\t+/.test(line);
  });
  var spaced = lines.filter(function(line) {
    return /^ {2,}/.test(line);
  });
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "	";
  }
  var min = spaced.reduce(function(previous, current) {
    var numSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(" ");
}
function getRelativePath(from, to) {
  var fromParts = from.split(/[/\\]/);
  var toParts = to.split(/[/\\]/);
  fromParts.pop();
  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  if (fromParts.length) {
    var i = fromParts.length;
    while (i--) {
      fromParts[i] = "..";
    }
  }
  return fromParts.concat(toParts).join("/");
}
function isObject(thing) {
  return toString3.call(thing) === "[object Object]";
}
function getLocator(source) {
  var originalLines = source.split("\n");
  var lineOffsets = [];
  for (var i = 0, pos = 0; i < originalLines.length; i++) {
    lineOffsets.push(pos);
    pos += originalLines[i].length + 1;
  }
  return function locate(index) {
    var i2 = 0;
    var j = lineOffsets.length;
    while (i2 < j) {
      var m = i2 + j >> 1;
      if (index < lineOffsets[m]) {
        j = m;
      } else {
        i2 = m + 1;
      }
    }
    var line = i2 - 1;
    var column = index - lineOffsets[line];
    return { line, column };
  };
}
var BitSet, Chunk, btoa, SourceMap, toString3, Mappings, n, warned, MagicString, hasOwnProp, Bundle;
var init_magic_string_es = _chunkB7UJSB4Njs.__esm.call(void 0, {
  "node_modules/.pnpm/magic-string@0.25.9/node_modules/magic-string/dist/magic-string.es.js"() {
    "use strict";
    init_sourcemap_codec_es();
    BitSet = function BitSet2(arg) {
      this.bits = arg instanceof BitSet2 ? arg.bits.slice() : [];
    };
    BitSet.prototype.add = function add(n2) {
      this.bits[n2 >> 5] |= 1 << (n2 & 31);
    };
    BitSet.prototype.has = function has(n2) {
      return !!(this.bits[n2 >> 5] & 1 << (n2 & 31));
    };
    Chunk = function Chunk2(start, end, content) {
      this.start = start;
      this.end = end;
      this.original = content;
      this.intro = "";
      this.outro = "";
      this.content = content;
      this.storeName = false;
      this.edited = false;
      Object.defineProperties(this, {
        previous: { writable: true, value: null },
        next: { writable: true, value: null }
      });
    };
    Chunk.prototype.appendLeft = function appendLeft(content) {
      this.outro += content;
    };
    Chunk.prototype.appendRight = function appendRight(content) {
      this.intro = this.intro + content;
    };
    Chunk.prototype.clone = function clone() {
      var chunk = new Chunk(this.start, this.end, this.original);
      chunk.intro = this.intro;
      chunk.outro = this.outro;
      chunk.content = this.content;
      chunk.storeName = this.storeName;
      chunk.edited = this.edited;
      return chunk;
    };
    Chunk.prototype.contains = function contains(index) {
      return this.start < index && index < this.end;
    };
    Chunk.prototype.eachNext = function eachNext(fn) {
      var chunk = this;
      while (chunk) {
        fn(chunk);
        chunk = chunk.next;
      }
    };
    Chunk.prototype.eachPrevious = function eachPrevious(fn) {
      var chunk = this;
      while (chunk) {
        fn(chunk);
        chunk = chunk.previous;
      }
    };
    Chunk.prototype.edit = function edit(content, storeName, contentOnly) {
      this.content = content;
      if (!contentOnly) {
        this.intro = "";
        this.outro = "";
      }
      this.storeName = storeName;
      this.edited = true;
      return this;
    };
    Chunk.prototype.prependLeft = function prependLeft(content) {
      this.outro = content + this.outro;
    };
    Chunk.prototype.prependRight = function prependRight(content) {
      this.intro = content + this.intro;
    };
    Chunk.prototype.split = function split(index) {
      var sliceIndex = index - this.start;
      var originalBefore = this.original.slice(0, sliceIndex);
      var originalAfter = this.original.slice(sliceIndex);
      this.original = originalBefore;
      var newChunk = new Chunk(index, this.end, originalAfter);
      newChunk.outro = this.outro;
      this.outro = "";
      this.end = index;
      if (this.edited) {
        newChunk.edit("", false);
        this.content = "";
      } else {
        this.content = originalBefore;
      }
      newChunk.next = this.next;
      if (newChunk.next) {
        newChunk.next.previous = newChunk;
      }
      newChunk.previous = this;
      this.next = newChunk;
      return newChunk;
    };
    Chunk.prototype.toString = function toString() {
      return this.intro + this.content + this.outro;
    };
    Chunk.prototype.trimEnd = function trimEnd(rx) {
      this.outro = this.outro.replace(rx, "");
      if (this.outro.length) {
        return true;
      }
      var trimmed = this.content.replace(rx, "");
      if (trimmed.length) {
        if (trimmed !== this.content) {
          this.split(this.start + trimmed.length).edit("", void 0, true);
        }
        return true;
      } else {
        this.edit("", void 0, true);
        this.intro = this.intro.replace(rx, "");
        if (this.intro.length) {
          return true;
        }
      }
    };
    Chunk.prototype.trimStart = function trimStart(rx) {
      this.intro = this.intro.replace(rx, "");
      if (this.intro.length) {
        return true;
      }
      var trimmed = this.content.replace(rx, "");
      if (trimmed.length) {
        if (trimmed !== this.content) {
          this.split(this.end - trimmed.length);
          this.edit("", void 0, true);
        }
        return true;
      } else {
        this.edit("", void 0, true);
        this.outro = this.outro.replace(rx, "");
        if (this.outro.length) {
          return true;
        }
      }
    };
    btoa = function() {
      throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
    };
    if (typeof window !== "undefined" && typeof window.btoa === "function") {
      btoa = function(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
      };
    } else if (typeof Buffer === "function") {
      btoa = function(str) {
        return Buffer.from(str, "utf-8").toString("base64");
      };
    }
    SourceMap = function SourceMap2(properties) {
      this.version = 3;
      this.file = properties.file;
      this.sources = properties.sources;
      this.sourcesContent = properties.sourcesContent;
      this.names = properties.names;
      this.mappings = encode(properties.mappings);
    };
    SourceMap.prototype.toString = function toString2() {
      return JSON.stringify(this);
    };
    SourceMap.prototype.toUrl = function toUrl() {
      return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
    };
    toString3 = Object.prototype.toString;
    Mappings = function Mappings2(hires) {
      this.hires = hires;
      this.generatedCodeLine = 0;
      this.generatedCodeColumn = 0;
      this.raw = [];
      this.rawSegments = this.raw[this.generatedCodeLine] = [];
      this.pending = null;
    };
    Mappings.prototype.addEdit = function addEdit(sourceIndex, content, loc, nameIndex) {
      if (content.length) {
        var segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
        if (nameIndex >= 0) {
          segment.push(nameIndex);
        }
        this.rawSegments.push(segment);
      } else if (this.pending) {
        this.rawSegments.push(this.pending);
      }
      this.advance(content);
      this.pending = null;
    };
    Mappings.prototype.addUneditedChunk = function addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
      var originalCharIndex = chunk.start;
      var first = true;
      while (originalCharIndex < chunk.end) {
        if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
          this.rawSegments.push([this.generatedCodeColumn, sourceIndex, loc.line, loc.column]);
        }
        if (original[originalCharIndex] === "\n") {
          loc.line += 1;
          loc.column = 0;
          this.generatedCodeLine += 1;
          this.raw[this.generatedCodeLine] = this.rawSegments = [];
          this.generatedCodeColumn = 0;
          first = true;
        } else {
          loc.column += 1;
          this.generatedCodeColumn += 1;
          first = false;
        }
        originalCharIndex += 1;
      }
      this.pending = null;
    };
    Mappings.prototype.advance = function advance(str) {
      if (!str) {
        return;
      }
      var lines = str.split("\n");
      if (lines.length > 1) {
        for (var i = 0; i < lines.length - 1; i++) {
          this.generatedCodeLine++;
          this.raw[this.generatedCodeLine] = this.rawSegments = [];
        }
        this.generatedCodeColumn = 0;
      }
      this.generatedCodeColumn += lines[lines.length - 1].length;
    };
    n = "\n";
    warned = {
      insertLeft: false,
      insertRight: false,
      storeName: false
    };
    MagicString = function MagicString2(string, options) {
      if (options === void 0)
        options = {};
      var chunk = new Chunk(0, string.length, string);
      Object.defineProperties(this, {
        original: { writable: true, value: string },
        outro: { writable: true, value: "" },
        intro: { writable: true, value: "" },
        firstChunk: { writable: true, value: chunk },
        lastChunk: { writable: true, value: chunk },
        lastSearchedChunk: { writable: true, value: chunk },
        byStart: { writable: true, value: {} },
        byEnd: { writable: true, value: {} },
        filename: { writable: true, value: options.filename },
        indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
        sourcemapLocations: { writable: true, value: new BitSet() },
        storedNames: { writable: true, value: {} },
        indentStr: { writable: true, value: guessIndent(string) }
      });
      this.byStart[0] = chunk;
      this.byEnd[string.length] = chunk;
    };
    MagicString.prototype.addSourcemapLocation = function addSourcemapLocation(char) {
      this.sourcemapLocations.add(char);
    };
    MagicString.prototype.append = function append(content) {
      if (typeof content !== "string") {
        throw new TypeError("outro content must be a string");
      }
      this.outro += content;
      return this;
    };
    MagicString.prototype.appendLeft = function appendLeft2(index, content) {
      if (typeof content !== "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(index);
      var chunk = this.byEnd[index];
      if (chunk) {
        chunk.appendLeft(content);
      } else {
        this.intro += content;
      }
      return this;
    };
    MagicString.prototype.appendRight = function appendRight2(index, content) {
      if (typeof content !== "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(index);
      var chunk = this.byStart[index];
      if (chunk) {
        chunk.appendRight(content);
      } else {
        this.outro += content;
      }
      return this;
    };
    MagicString.prototype.clone = function clone2() {
      var cloned = new MagicString(this.original, { filename: this.filename });
      var originalChunk = this.firstChunk;
      var clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
      while (originalChunk) {
        cloned.byStart[clonedChunk.start] = clonedChunk;
        cloned.byEnd[clonedChunk.end] = clonedChunk;
        var nextOriginalChunk = originalChunk.next;
        var nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
        if (nextClonedChunk) {
          clonedChunk.next = nextClonedChunk;
          nextClonedChunk.previous = clonedChunk;
          clonedChunk = nextClonedChunk;
        }
        originalChunk = nextOriginalChunk;
      }
      cloned.lastChunk = clonedChunk;
      if (this.indentExclusionRanges) {
        cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
      }
      cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
      cloned.intro = this.intro;
      cloned.outro = this.outro;
      return cloned;
    };
    MagicString.prototype.generateDecodedMap = function generateDecodedMap(options) {
      var this$1$1 = this;
      options = options || {};
      var sourceIndex = 0;
      var names = Object.keys(this.storedNames);
      var mappings = new Mappings(options.hires);
      var locate = getLocator(this.original);
      if (this.intro) {
        mappings.advance(this.intro);
      }
      this.firstChunk.eachNext(function(chunk) {
        var loc = locate(chunk.start);
        if (chunk.intro.length) {
          mappings.advance(chunk.intro);
        }
        if (chunk.edited) {
          mappings.addEdit(
            sourceIndex,
            chunk.content,
            loc,
            chunk.storeName ? names.indexOf(chunk.original) : -1
          );
        } else {
          mappings.addUneditedChunk(sourceIndex, chunk, this$1$1.original, loc, this$1$1.sourcemapLocations);
        }
        if (chunk.outro.length) {
          mappings.advance(chunk.outro);
        }
      });
      return {
        file: options.file ? options.file.split(/[/\\]/).pop() : null,
        sources: [options.source ? getRelativePath(options.file || "", options.source) : null],
        sourcesContent: options.includeContent ? [this.original] : [null],
        names,
        mappings: mappings.raw
      };
    };
    MagicString.prototype.generateMap = function generateMap(options) {
      return new SourceMap(this.generateDecodedMap(options));
    };
    MagicString.prototype.getIndentString = function getIndentString() {
      return this.indentStr === null ? "	" : this.indentStr;
    };
    MagicString.prototype.indent = function indent(indentStr, options) {
      var pattern = /^[^\r\n]/gm;
      if (isObject(indentStr)) {
        options = indentStr;
        indentStr = void 0;
      }
      indentStr = indentStr !== void 0 ? indentStr : this.indentStr || "	";
      if (indentStr === "") {
        return this;
      }
      options = options || {};
      var isExcluded = {};
      if (options.exclude) {
        var exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
        exclusions.forEach(function(exclusion) {
          for (var i = exclusion[0]; i < exclusion[1]; i += 1) {
            isExcluded[i] = true;
          }
        });
      }
      var shouldIndentNextCharacter = options.indentStart !== false;
      var replacer = function(match) {
        if (shouldIndentNextCharacter) {
          return "" + indentStr + match;
        }
        shouldIndentNextCharacter = true;
        return match;
      };
      this.intro = this.intro.replace(pattern, replacer);
      var charIndex = 0;
      var chunk = this.firstChunk;
      while (chunk) {
        var end = chunk.end;
        if (chunk.edited) {
          if (!isExcluded[charIndex]) {
            chunk.content = chunk.content.replace(pattern, replacer);
            if (chunk.content.length) {
              shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
            }
          }
        } else {
          charIndex = chunk.start;
          while (charIndex < end) {
            if (!isExcluded[charIndex]) {
              var char = this.original[charIndex];
              if (char === "\n") {
                shouldIndentNextCharacter = true;
              } else if (char !== "\r" && shouldIndentNextCharacter) {
                shouldIndentNextCharacter = false;
                if (charIndex === chunk.start) {
                  chunk.prependRight(indentStr);
                } else {
                  this._splitChunk(chunk, charIndex);
                  chunk = chunk.next;
                  chunk.prependRight(indentStr);
                }
              }
            }
            charIndex += 1;
          }
        }
        charIndex = chunk.end;
        chunk = chunk.next;
      }
      this.outro = this.outro.replace(pattern, replacer);
      return this;
    };
    MagicString.prototype.insert = function insert() {
      throw new Error(
        "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
      );
    };
    MagicString.prototype.insertLeft = function insertLeft(index, content) {
      if (!warned.insertLeft) {
        console.warn(
          "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
        );
        warned.insertLeft = true;
      }
      return this.appendLeft(index, content);
    };
    MagicString.prototype.insertRight = function insertRight(index, content) {
      if (!warned.insertRight) {
        console.warn(
          "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
        );
        warned.insertRight = true;
      }
      return this.prependRight(index, content);
    };
    MagicString.prototype.move = function move(start, end, index) {
      if (index >= start && index <= end) {
        throw new Error("Cannot move a selection inside itself");
      }
      this._split(start);
      this._split(end);
      this._split(index);
      var first = this.byStart[start];
      var last = this.byEnd[end];
      var oldLeft = first.previous;
      var oldRight = last.next;
      var newRight = this.byStart[index];
      if (!newRight && last === this.lastChunk) {
        return this;
      }
      var newLeft = newRight ? newRight.previous : this.lastChunk;
      if (oldLeft) {
        oldLeft.next = oldRight;
      }
      if (oldRight) {
        oldRight.previous = oldLeft;
      }
      if (newLeft) {
        newLeft.next = first;
      }
      if (newRight) {
        newRight.previous = last;
      }
      if (!first.previous) {
        this.firstChunk = last.next;
      }
      if (!last.next) {
        this.lastChunk = first.previous;
        this.lastChunk.next = null;
      }
      first.previous = newLeft;
      last.next = newRight || null;
      if (!newLeft) {
        this.firstChunk = first;
      }
      if (!newRight) {
        this.lastChunk = last;
      }
      return this;
    };
    MagicString.prototype.overwrite = function overwrite(start, end, content, options) {
      if (typeof content !== "string") {
        throw new TypeError("replacement content must be a string");
      }
      while (start < 0) {
        start += this.original.length;
      }
      while (end < 0) {
        end += this.original.length;
      }
      if (end > this.original.length) {
        throw new Error("end is out of bounds");
      }
      if (start === end) {
        throw new Error(
          "Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead"
        );
      }
      this._split(start);
      this._split(end);
      if (options === true) {
        if (!warned.storeName) {
          console.warn(
            "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
          );
          warned.storeName = true;
        }
        options = { storeName: true };
      }
      var storeName = options !== void 0 ? options.storeName : false;
      var contentOnly = options !== void 0 ? options.contentOnly : false;
      if (storeName) {
        var original = this.original.slice(start, end);
        Object.defineProperty(this.storedNames, original, { writable: true, value: true, enumerable: true });
      }
      var first = this.byStart[start];
      var last = this.byEnd[end];
      if (first) {
        var chunk = first;
        while (chunk !== last) {
          if (chunk.next !== this.byStart[chunk.end]) {
            throw new Error("Cannot overwrite across a split point");
          }
          chunk = chunk.next;
          chunk.edit("", false);
        }
        first.edit(content, storeName, contentOnly);
      } else {
        var newChunk = new Chunk(start, end, "").edit(content, storeName);
        last.next = newChunk;
        newChunk.previous = last;
      }
      return this;
    };
    MagicString.prototype.prepend = function prepend(content) {
      if (typeof content !== "string") {
        throw new TypeError("outro content must be a string");
      }
      this.intro = content + this.intro;
      return this;
    };
    MagicString.prototype.prependLeft = function prependLeft2(index, content) {
      if (typeof content !== "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(index);
      var chunk = this.byEnd[index];
      if (chunk) {
        chunk.prependLeft(content);
      } else {
        this.intro = content + this.intro;
      }
      return this;
    };
    MagicString.prototype.prependRight = function prependRight2(index, content) {
      if (typeof content !== "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(index);
      var chunk = this.byStart[index];
      if (chunk) {
        chunk.prependRight(content);
      } else {
        this.outro = content + this.outro;
      }
      return this;
    };
    MagicString.prototype.remove = function remove(start, end) {
      while (start < 0) {
        start += this.original.length;
      }
      while (end < 0) {
        end += this.original.length;
      }
      if (start === end) {
        return this;
      }
      if (start < 0 || end > this.original.length) {
        throw new Error("Character is out of bounds");
      }
      if (start > end) {
        throw new Error("end must be greater than start");
      }
      this._split(start);
      this._split(end);
      var chunk = this.byStart[start];
      while (chunk) {
        chunk.intro = "";
        chunk.outro = "";
        chunk.edit("");
        chunk = end > chunk.end ? this.byStart[chunk.end] : null;
      }
      return this;
    };
    MagicString.prototype.lastChar = function lastChar() {
      if (this.outro.length) {
        return this.outro[this.outro.length - 1];
      }
      var chunk = this.lastChunk;
      do {
        if (chunk.outro.length) {
          return chunk.outro[chunk.outro.length - 1];
        }
        if (chunk.content.length) {
          return chunk.content[chunk.content.length - 1];
        }
        if (chunk.intro.length) {
          return chunk.intro[chunk.intro.length - 1];
        }
      } while (chunk = chunk.previous);
      if (this.intro.length) {
        return this.intro[this.intro.length - 1];
      }
      return "";
    };
    MagicString.prototype.lastLine = function lastLine() {
      var lineIndex = this.outro.lastIndexOf(n);
      if (lineIndex !== -1) {
        return this.outro.substr(lineIndex + 1);
      }
      var lineStr = this.outro;
      var chunk = this.lastChunk;
      do {
        if (chunk.outro.length > 0) {
          lineIndex = chunk.outro.lastIndexOf(n);
          if (lineIndex !== -1) {
            return chunk.outro.substr(lineIndex + 1) + lineStr;
          }
          lineStr = chunk.outro + lineStr;
        }
        if (chunk.content.length > 0) {
          lineIndex = chunk.content.lastIndexOf(n);
          if (lineIndex !== -1) {
            return chunk.content.substr(lineIndex + 1) + lineStr;
          }
          lineStr = chunk.content + lineStr;
        }
        if (chunk.intro.length > 0) {
          lineIndex = chunk.intro.lastIndexOf(n);
          if (lineIndex !== -1) {
            return chunk.intro.substr(lineIndex + 1) + lineStr;
          }
          lineStr = chunk.intro + lineStr;
        }
      } while (chunk = chunk.previous);
      lineIndex = this.intro.lastIndexOf(n);
      if (lineIndex !== -1) {
        return this.intro.substr(lineIndex + 1) + lineStr;
      }
      return this.intro + lineStr;
    };
    MagicString.prototype.slice = function slice(start, end) {
      if (start === void 0)
        start = 0;
      if (end === void 0)
        end = this.original.length;
      while (start < 0) {
        start += this.original.length;
      }
      while (end < 0) {
        end += this.original.length;
      }
      var result = "";
      var chunk = this.firstChunk;
      while (chunk && (chunk.start > start || chunk.end <= start)) {
        if (chunk.start < end && chunk.end >= end) {
          return result;
        }
        chunk = chunk.next;
      }
      if (chunk && chunk.edited && chunk.start !== start) {
        throw new Error("Cannot use replaced character " + start + " as slice start anchor.");
      }
      var startChunk = chunk;
      while (chunk) {
        if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
          result += chunk.intro;
        }
        var containsEnd = chunk.start < end && chunk.end >= end;
        if (containsEnd && chunk.edited && chunk.end !== end) {
          throw new Error("Cannot use replaced character " + end + " as slice end anchor.");
        }
        var sliceStart = startChunk === chunk ? start - chunk.start : 0;
        var sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
        result += chunk.content.slice(sliceStart, sliceEnd);
        if (chunk.outro && (!containsEnd || chunk.end === end)) {
          result += chunk.outro;
        }
        if (containsEnd) {
          break;
        }
        chunk = chunk.next;
      }
      return result;
    };
    MagicString.prototype.snip = function snip(start, end) {
      var clone4 = this.clone();
      clone4.remove(0, start);
      clone4.remove(end, clone4.original.length);
      return clone4;
    };
    MagicString.prototype._split = function _split(index) {
      if (this.byStart[index] || this.byEnd[index]) {
        return;
      }
      var chunk = this.lastSearchedChunk;
      var searchForward = index > chunk.end;
      while (chunk) {
        if (chunk.contains(index)) {
          return this._splitChunk(chunk, index);
        }
        chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
      }
    };
    MagicString.prototype._splitChunk = function _splitChunk(chunk, index) {
      if (chunk.edited && chunk.content.length) {
        var loc = getLocator(this.original)(index);
        throw new Error(
          "Cannot split a chunk that has already been edited (" + loc.line + ":" + loc.column + ' \u2013 "' + chunk.original + '")'
        );
      }
      var newChunk = chunk.split(index);
      this.byEnd[index] = chunk;
      this.byStart[index] = newChunk;
      this.byEnd[newChunk.end] = newChunk;
      if (chunk === this.lastChunk) {
        this.lastChunk = newChunk;
      }
      this.lastSearchedChunk = chunk;
      return true;
    };
    MagicString.prototype.toString = function toString4() {
      var str = this.intro;
      var chunk = this.firstChunk;
      while (chunk) {
        str += chunk.toString();
        chunk = chunk.next;
      }
      return str + this.outro;
    };
    MagicString.prototype.isEmpty = function isEmpty() {
      var chunk = this.firstChunk;
      do {
        if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim()) {
          return false;
        }
      } while (chunk = chunk.next);
      return true;
    };
    MagicString.prototype.length = function length() {
      var chunk = this.firstChunk;
      var length3 = 0;
      do {
        length3 += chunk.intro.length + chunk.content.length + chunk.outro.length;
      } while (chunk = chunk.next);
      return length3;
    };
    MagicString.prototype.trimLines = function trimLines() {
      return this.trim("[\\r\\n]");
    };
    MagicString.prototype.trim = function trim(charType) {
      return this.trimStart(charType).trimEnd(charType);
    };
    MagicString.prototype.trimEndAborted = function trimEndAborted(charType) {
      var rx = new RegExp((charType || "\\s") + "+$");
      this.outro = this.outro.replace(rx, "");
      if (this.outro.length) {
        return true;
      }
      var chunk = this.lastChunk;
      do {
        var end = chunk.end;
        var aborted = chunk.trimEnd(rx);
        if (chunk.end !== end) {
          if (this.lastChunk === chunk) {
            this.lastChunk = chunk.next;
          }
          this.byEnd[chunk.end] = chunk;
          this.byStart[chunk.next.start] = chunk.next;
          this.byEnd[chunk.next.end] = chunk.next;
        }
        if (aborted) {
          return true;
        }
        chunk = chunk.previous;
      } while (chunk);
      return false;
    };
    MagicString.prototype.trimEnd = function trimEnd2(charType) {
      this.trimEndAborted(charType);
      return this;
    };
    MagicString.prototype.trimStartAborted = function trimStartAborted(charType) {
      var rx = new RegExp("^" + (charType || "\\s") + "+");
      this.intro = this.intro.replace(rx, "");
      if (this.intro.length) {
        return true;
      }
      var chunk = this.firstChunk;
      do {
        var end = chunk.end;
        var aborted = chunk.trimStart(rx);
        if (chunk.end !== end) {
          if (chunk === this.lastChunk) {
            this.lastChunk = chunk.next;
          }
          this.byEnd[chunk.end] = chunk;
          this.byStart[chunk.next.start] = chunk.next;
          this.byEnd[chunk.next.end] = chunk.next;
        }
        if (aborted) {
          return true;
        }
        chunk = chunk.next;
      } while (chunk);
      return false;
    };
    MagicString.prototype.trimStart = function trimStart2(charType) {
      this.trimStartAborted(charType);
      return this;
    };
    hasOwnProp = Object.prototype.hasOwnProperty;
    Bundle = function Bundle2(options) {
      if (options === void 0)
        options = {};
      this.intro = options.intro || "";
      this.separator = options.separator !== void 0 ? options.separator : "\n";
      this.sources = [];
      this.uniqueSources = [];
      this.uniqueSourceIndexByFilename = {};
    };
    Bundle.prototype.addSource = function addSource(source) {
      if (source instanceof MagicString) {
        return this.addSource({
          content: source,
          filename: source.filename,
          separator: this.separator
        });
      }
      if (!isObject(source) || !source.content) {
        throw new Error(
          "bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`"
        );
      }
      ["filename", "indentExclusionRanges", "separator"].forEach(function(option) {
        if (!hasOwnProp.call(source, option)) {
          source[option] = source.content[option];
        }
      });
      if (source.separator === void 0) {
        source.separator = this.separator;
      }
      if (source.filename) {
        if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
          this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
          this.uniqueSources.push({ filename: source.filename, content: source.content.original });
        } else {
          var uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
          if (source.content.original !== uniqueSource.content) {
            throw new Error("Illegal source: same filename (" + source.filename + "), different contents");
          }
        }
      }
      this.sources.push(source);
      return this;
    };
    Bundle.prototype.append = function append2(str, options) {
      this.addSource({
        content: new MagicString(str),
        separator: options && options.separator || ""
      });
      return this;
    };
    Bundle.prototype.clone = function clone3() {
      var bundle = new Bundle({
        intro: this.intro,
        separator: this.separator
      });
      this.sources.forEach(function(source) {
        bundle.addSource({
          filename: source.filename,
          content: source.content.clone(),
          separator: source.separator
        });
      });
      return bundle;
    };
    Bundle.prototype.generateDecodedMap = function generateDecodedMap2(options) {
      var this$1$1 = this;
      if (options === void 0)
        options = {};
      var names = [];
      this.sources.forEach(function(source) {
        Object.keys(source.content.storedNames).forEach(function(name) {
          if (!~names.indexOf(name)) {
            names.push(name);
          }
        });
      });
      var mappings = new Mappings(options.hires);
      if (this.intro) {
        mappings.advance(this.intro);
      }
      this.sources.forEach(function(source, i) {
        if (i > 0) {
          mappings.advance(this$1$1.separator);
        }
        var sourceIndex = source.filename ? this$1$1.uniqueSourceIndexByFilename[source.filename] : -1;
        var magicString = source.content;
        var locate = getLocator(magicString.original);
        if (magicString.intro) {
          mappings.advance(magicString.intro);
        }
        magicString.firstChunk.eachNext(function(chunk) {
          var loc = locate(chunk.start);
          if (chunk.intro.length) {
            mappings.advance(chunk.intro);
          }
          if (source.filename) {
            if (chunk.edited) {
              mappings.addEdit(
                sourceIndex,
                chunk.content,
                loc,
                chunk.storeName ? names.indexOf(chunk.original) : -1
              );
            } else {
              mappings.addUneditedChunk(
                sourceIndex,
                chunk,
                magicString.original,
                loc,
                magicString.sourcemapLocations
              );
            }
          } else {
            mappings.advance(chunk.content);
          }
          if (chunk.outro.length) {
            mappings.advance(chunk.outro);
          }
        });
        if (magicString.outro) {
          mappings.advance(magicString.outro);
        }
      });
      return {
        file: options.file ? options.file.split(/[/\\]/).pop() : null,
        sources: this.uniqueSources.map(function(source) {
          return options.file ? getRelativePath(options.file, source.filename) : source.filename;
        }),
        sourcesContent: this.uniqueSources.map(function(source) {
          return options.includeContent ? source.content : null;
        }),
        names,
        mappings: mappings.raw
      };
    };
    Bundle.prototype.generateMap = function generateMap2(options) {
      return new SourceMap(this.generateDecodedMap(options));
    };
    Bundle.prototype.getIndentString = function getIndentString2() {
      var indentStringCounts = {};
      this.sources.forEach(function(source) {
        var indentStr = source.content.indentStr;
        if (indentStr === null) {
          return;
        }
        if (!indentStringCounts[indentStr]) {
          indentStringCounts[indentStr] = 0;
        }
        indentStringCounts[indentStr] += 1;
      });
      return Object.keys(indentStringCounts).sort(function(a, b) {
        return indentStringCounts[a] - indentStringCounts[b];
      })[0] || "	";
    };
    Bundle.prototype.indent = function indent2(indentStr) {
      var this$1$1 = this;
      if (!arguments.length) {
        indentStr = this.getIndentString();
      }
      if (indentStr === "") {
        return this;
      }
      var trailingNewline = !this.intro || this.intro.slice(-1) === "\n";
      this.sources.forEach(function(source, i) {
        var separator = source.separator !== void 0 ? source.separator : this$1$1.separator;
        var indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);
        source.content.indent(indentStr, {
          exclude: source.indentExclusionRanges,
          indentStart
          //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
        });
        trailingNewline = source.content.lastChar() === "\n";
      });
      if (this.intro) {
        this.intro = indentStr + this.intro.replace(/^[^\n]/gm, function(match, index) {
          return index > 0 ? indentStr + match : match;
        });
      }
      return this;
    };
    Bundle.prototype.prepend = function prepend2(str) {
      this.intro = str + this.intro;
      return this;
    };
    Bundle.prototype.toString = function toString5() {
      var this$1$1 = this;
      var body = this.sources.map(function(source, i) {
        var separator = source.separator !== void 0 ? source.separator : this$1$1.separator;
        var str = (i > 0 ? separator : "") + source.content.toString();
        return str;
      }).join("");
      return this.intro + body;
    };
    Bundle.prototype.isEmpty = function isEmpty2() {
      if (this.intro.length && this.intro.trim()) {
        return false;
      }
      if (this.sources.some(function(source) {
        return !source.content.isEmpty();
      })) {
        return false;
      }
      return true;
    };
    Bundle.prototype.length = function length2() {
      return this.sources.reduce(
        function(length3, source) {
          return length3 + source.content.length();
        },
        this.intro.length
      );
    };
    Bundle.prototype.trimLines = function trimLines2() {
      return this.trim("[\\r\\n]");
    };
    Bundle.prototype.trim = function trim2(charType) {
      return this.trimStart(charType).trimEnd(charType);
    };
    Bundle.prototype.trimStart = function trimStart3(charType) {
      var rx = new RegExp("^" + (charType || "\\s") + "+");
      this.intro = this.intro.replace(rx, "");
      if (!this.intro) {
        var source;
        var i = 0;
        do {
          source = this.sources[i++];
          if (!source) {
            break;
          }
        } while (!source.content.trimStartAborted(charType));
      }
      return this;
    };
    Bundle.prototype.trimEnd = function trimEnd3(charType) {
      var rx = new RegExp((charType || "\\s") + "+$");
      var source;
      var i = this.sources.length - 1;
      do {
        source = this.sources[i--];
        if (!source) {
          this.intro = this.intro.replace(rx, "");
          break;
        }
      } while (!source.content.trimEndAborted(charType));
      return this;
    };
  }
});

// node_modules/.pnpm/rollup-plugin-hashbang@3.0.0_rollup@3.8.1/node_modules/rollup-plugin-hashbang/dist/index.js
var require_dist = _chunkB7UJSB4Njs.__commonJS.call(void 0, {
  "node_modules/.pnpm/rollup-plugin-hashbang@3.0.0_rollup@3.8.1/node_modules/rollup-plugin-hashbang/dist/index.js"(exports, module) {
    "use strict";
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __reExport = (target, module2, copyDefault, desc) => {
      if (module2 && typeof module2 === "object" || typeof module2 === "function") {
        for (let key of __getOwnPropNames(module2))
          if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
            __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
      }
      return target;
    };
    var __toESM = (module2, isNodeMode) => {
      return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
    };
    var __toCommonJS2 = /* @__PURE__ */ ((cache) => {
      return (module2, temp) => {
        return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
      };
    })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
    var src_exports = {};
    __export2(src_exports, {
      default: () => src_default
    });
    var import_fs2 = __toESM(_chunkB7UJSB4Njs.__require.call(void 0, "fs"));
    var import_path2 = __toESM(_chunkB7UJSB4Njs.__require.call(void 0, "path"));
    var import_magic_string = __toESM((init_magic_string_es(), _chunkB7UJSB4Njs.__toCommonJS.call(void 0, magic_string_es_exports)));
    var src_default = () => {
      const shebangs = /* @__PURE__ */ new Map();
      const shebangRe = /^\s*(#!.*)/;
      const outputFiles = /* @__PURE__ */ new Set();
      return {
        name: "hashbang",
        transform(code, id) {
          let match;
          if (match = shebangRe.exec(code)) {
            shebangs.set(id, match[1]);
            const str = new import_magic_string.default(code);
            str.remove(match.index, match[1].length);
            return {
              code: str.toString(),
              map: str.generateMap({ hires: true })
            };
          }
          return null;
        },
        renderChunk(code, { isEntry, facadeModuleId, fileName }, { file, dir, sourcemap }) {
          if (!isEntry || !facadeModuleId || !shebangs.has(facadeModuleId))
            return;
          outputFiles.add(file || import_path2.default.resolve(dir || process.cwd(), fileName));
          const s = new import_magic_string.default(code);
          s.prepend(shebangs.get(facadeModuleId) + "\n");
          return {
            code: s.toString(),
            map: sourcemap ? s.generateMap({ hires: true }) : void 0
          };
        },
        async writeBundle() {
          await Promise.all([...outputFiles].map(async (file) => {
            await import_fs2.default.promises.chmod(file, 493 & ~process.umask());
          }));
        }
      };
    };
    module.exports = __toCommonJS2(src_exports);
  }
});

// src/load.ts
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _joycon = require('joycon'); var _joycon2 = _interopRequireDefault(_joycon);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _bundlerequire = require('bundle-require');
var joycon = new (0, _joycon2.default)();
var loadJson = async (filepath) => {
  try {
    return _chunkB7UJSB4Njs.jsoncParse.call(void 0, await _fs2.default.promises.readFile(filepath, "utf8"));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to parse ${_path2.default.relative(process.cwd(), filepath)}: ${error.message}`
      );
    } else {
      throw error;
    }
  }
};
var jsonLoader = {
  test: /\.json$/,
  load(filepath) {
    return loadJson(filepath);
  }
};
joycon.addLoader(jsonLoader);
async function loadTsupConfig(cwd, configFile) {
  const configJoycon = new (0, _joycon2.default)();
  const configPath = await configJoycon.resolve({
    files: configFile ? [configFile] : [
      "tsup.config.ts",
      "tsup.config.js",
      "tsup.config.cjs",
      "tsup.config.mjs",
      "tsup.config.json",
      "package.json"
    ],
    cwd,
    stopDir: _path2.default.parse(cwd).root,
    packageKey: "tsup"
  });
  if (configPath) {
    if (configPath.endsWith(".json")) {
      let data = await loadJson(configPath);
      if (configPath.endsWith("package.json")) {
        data = data.tsup;
      }
      if (data) {
        return { path: configPath, data };
      }
      return {};
    }
    const config = await _bundlerequire.bundleRequire.call(void 0, {
      filepath: configPath
    });
    return {
      path: configPath,
      data: config.mod.tsup || config.mod.default || config.mod
    };
  }
  return {};
}
async function loadPkg(cwd, clearCache = false) {
  if (clearCache) {
    joycon.clearCache();
  }
  const { data } = await joycon.load(["package.json"], cwd, _path2.default.dirname(cwd));
  return data || {};
}
async function getProductionDeps(cwd, clearCache = false) {
  const data = await loadPkg(cwd, clearCache);
  const deps = Array.from(
    /* @__PURE__ */ new Set([
      ...Object.keys(data.dependencies || {}),
      ...Object.keys(data.peerDependencies || {})
    ])
  );
  return deps;
}
async function getAllDepsHash(cwd) {
  const data = await loadPkg(cwd, true);
  return JSON.stringify({
    ...data.dependencies,
    ...data.peerDependencies,
    ...data.devDependencies
  });
}

// src/log.ts
var _util = require('util'); var _util2 = _interopRequireDefault(_util);
var _worker_threads = require('worker_threads');
var colorize = (type, data, onlyImportant = false) => {
  if (onlyImportant && (type === "info" || type === "success"))
    return data;
  const color = type === "info" ? "blue" : type === "error" ? "red" : type === "warn" ? "yellow" : "green";
  return _chunkGEVDEBBWjs.colorette_exports[color](data);
};
var makeLabel = (name, input, type) => {
  return [
    name && `${_chunkGEVDEBBWjs.dim.call(void 0, "[")}${name.toUpperCase()}${_chunkGEVDEBBWjs.dim.call(void 0, "]")}`,
    colorize(type, input.toUpperCase())
  ].filter(Boolean).join(" ");
};
var silent = false;
function setSilent(isSilent) {
  silent = !!isSilent;
}
function getSilent() {
  return silent;
}
var createLogger = (name) => {
  return {
    setName(_name) {
      name = _name;
    },
    success(label, ...args) {
      return this.log(label, "success", ...args);
    },
    info(label, ...args) {
      return this.log(label, "info", ...args);
    },
    error(label, ...args) {
      return this.log(label, "error", ...args);
    },
    warn(label, ...args) {
      return this.log(label, "warn", ...args);
    },
    log(label, type, ...data) {
      const args = [
        makeLabel(name, label, type),
        ...data.map((item) => colorize(type, item, true))
      ];
      switch (type) {
        case "error": {
          if (!_worker_threads.isMainThread) {
            _optionalChain([_worker_threads.parentPort, 'optionalAccess', _ => _.postMessage, 'call', _2 => _2({
              type: "error",
              text: _util2.default.format(...args)
            })]);
            return;
          }
          return console.error(...args);
        }
        default:
          if (silent)
            return;
          if (!_worker_threads.isMainThread) {
            _optionalChain([_worker_threads.parentPort, 'optionalAccess', _3 => _3.postMessage, 'call', _4 => _4({
              type: "log",
              text: _util2.default.format(...args)
            })]);
            return;
          }
          console.log(...args);
      }
    }
  };
};

// src/lib/report-size.ts
var prettyBytes = (bytes) => {
  if (bytes === 0)
    return "0 B";
  const unit = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const exp = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, exp)).toFixed(2)} ${unit[exp]}`;
};
var getLengthOfLongestString = (strings) => {
  return strings.reduce((max, str) => {
    return Math.max(max, str.length);
  }, 0);
};
var padRight = (str, maxLength) => {
  return str + " ".repeat(maxLength - str.length);
};
var reportSize = (logger, format, files) => {
  const filenames = Object.keys(files);
  const maxLength = getLengthOfLongestString(filenames) + 1;
  for (const name of filenames) {
    logger.success(
      format,
      `${_chunkGEVDEBBWjs.bold.call(void 0, padRight(name, maxLength))}${_chunkGEVDEBBWjs.green.call(void 0, 
        prettyBytes(files[name])
      )}`
    );
  }
};











exports.loadTsupConfig = loadTsupConfig; exports.loadPkg = loadPkg; exports.getProductionDeps = getProductionDeps; exports.getAllDepsHash = getAllDepsHash; exports.setSilent = setSilent; exports.getSilent = getSilent; exports.createLogger = createLogger; exports.reportSize = reportSize; exports.require_dist = require_dist;
