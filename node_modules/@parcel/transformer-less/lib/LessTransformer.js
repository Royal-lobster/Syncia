"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _plugin() {
  const data = require("@parcel/plugin");
  _plugin = function () {
    return data;
  };
  return data;
}
function _sourceMap() {
  const data = _interopRequireDefault(require("@parcel/source-map"));
  _sourceMap = function () {
    return data;
  };
  return data;
}
function _less() {
  const data = _interopRequireDefault(require("less"));
  _less = function () {
    return data;
  };
  return data;
}
var _loadConfig = require("./loadConfig");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// E.g: ~library/file.less
const WEBPACK_ALIAS_RE = /^~[^/]/;
var _default = new (_plugin().Transformer)({
  loadConfig({
    config
  }) {
    return (0, _loadConfig.load)({
      config
    });
  },
  async transform({
    asset,
    options,
    config,
    resolve
  }) {
    asset.type = 'css';
    asset.meta.hasDependencies = false;
    let code = await asset.getCode();
    let result;
    try {
      let lessConfig = config ? {
        ...config.config
      } : {};
      if (asset.env.sourceMap) {
        lessConfig.sourceMap = {};
      }
      lessConfig.filename = asset.filePath;
      lessConfig.plugins = [...(lessConfig.plugins || []), urlPlugin({
        asset
      }), resolvePathPlugin({
        asset,
        resolve
      })];
      result = await _less().default.render(code, lessConfig);
    } catch (err) {
      // For the error reporter
      err.fileName = err.filename;
      err.loc = {
        line: err.line,
        column: err.column
      };
      throw err;
    }
    if (result.map != null) {
      let map = new (_sourceMap().default)(options.projectRoot);
      let rawMap = JSON.parse(result.map);
      map.addVLQMap({
        ...rawMap,
        sources: rawMap.sources.map(s => _path().default.relative(options.projectRoot, s))
      });
      asset.setMap(map);
    }
    asset.setCode(result.css);
    return [asset];
  }
});
exports.default = _default;
function urlPlugin({
  asset
}) {
  return {
    install(less, pluginManager) {
      // This is a hack; no such interface exists, even conceptually, in Less.

      const visitor = new less.visitors.Visitor({
        visitUrl(node) {
          const valueNode = node.value;
          const stringValue = valueNode.value;
          if (!stringValue.startsWith('#') // IE's `behavior: url(#default#VML)`)
          ) {
            valueNode.value = asset.addURLDependency(stringValue, {});
          }
          return node;
        }
      });

      // $FlowFixMe[method-unbinding]
      visitor.run = visitor.visit;
      pluginManager.addVisitor(visitor);
    }
  };
}
function resolvePathPlugin({
  asset,
  resolve
}) {
  return {
    install(less, pluginManager) {
      class LessFileManager extends less.FileManager {
        supports() {
          return true;
        }
        supportsSync() {
          return false;
        }
        async loadFile(rawFilename, currentDirectory, options) {
          let filename = rawFilename;
          if (WEBPACK_ALIAS_RE.test(filename)) {
            let correctPath = filename.replace(/^~/, '');
            throw new Error(`The @import path "${filename}" is using webpack specific syntax, which isn't supported by Parcel.\n\nTo @import files from node_modules, use "${correctPath}"`);
          }

          // Based on https://github.com/less/less.js/blob/master/packages/less/src/less-node/file-manager.js
          let isAbsoluteFilename = this.isPathAbsolute(filename);
          let paths = isAbsoluteFilename ? [''] : [currentDirectory];
          if (options.paths) {
            paths.push(...options.paths);
          }
          let prefixes = options.prefixes || [''];
          let fileParts = this.extractUrlParts(filename);
          let filePath;
          let contents;
          if (filename[0] !== '~') {
            outer: for (let p of paths) {
              for (let prefix of prefixes) {
                filePath = fileParts.rawPath + prefix + fileParts.filename;
                if (p) {
                  filePath = _path().default.join(p, filePath);
                }
                if (options.ext) {
                  filePath = this.tryAppendExtension(filePath, options.ext);
                }
                try {
                  contents = await asset.fs.readFile(filePath, 'utf8');
                  break outer;
                } catch (err) {
                  asset.invalidateOnFileCreate({
                    filePath
                  });
                }
              }
            }
          }
          if (!contents) {
            filePath = await resolve(asset.filePath, filename, {
              packageConditions: ['less', 'style']
            });
            contents = await asset.fs.readFile(filePath, 'utf8');
          }
          if (filePath) {
            asset.invalidateOnFileChange(filePath);
          }
          return {
            contents,
            filename: filePath
          };
        }
      }
      pluginManager.addFileManager(new LessFileManager());
    }
  };
}