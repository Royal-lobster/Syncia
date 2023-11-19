"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _plugin() {
  const data = require("@parcel/plugin");
  _plugin = function () {
    return data;
  };
  return data;
}
function _pluginSvgo() {
  const data = _interopRequireDefault(require("@svgr/plugin-svgo"));
  _pluginSvgo = function () {
    return data;
  };
  return data;
}
function _pluginJsx() {
  const data = _interopRequireDefault(require("@svgr/plugin-jsx"));
  _pluginJsx = function () {
    return data;
  };
  return data;
}
function _core() {
  const data = require("@svgr/core");
  _core = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = new (_plugin().Transformer)({
  async loadConfig({
    config
  }) {
    let svgrResult = await config.getConfig(['.svgrrc', '.svgrrc.json', '.svgrrc.js', '.svgrrc.cjs', '.svgrrc.mjs', 'svgr.config.json', 'svgr.config.js', 'svgr.config.cjs', 'svgr.config.mjs']);
    let svgoResult = await config.getConfig(['svgo.config.js', 'svgo.config.cjs', 'svgo.config.mjs', 'svgo.config.json']);
    return {
      svgr: svgrResult === null || svgrResult === void 0 ? void 0 : svgrResult.contents,
      svgo: svgoResult === null || svgoResult === void 0 ? void 0 : svgoResult.contents
    };
  },
  async transform({
    asset,
    config
  }) {
    var _config$svgr;
    let code = await asset.getCode();
    const jsx = await (0, _core().transform)(code, {
      svgoConfig: config.svgo,
      ...config.svgr,
      runtimeConfig: false
    }, {
      caller: {
        name: '@parcel/transformer-svg-react',
        defaultPlugins: [_pluginSvgo().default, _pluginJsx().default]
      },
      filePath: asset.filePath
    });
    asset.type = (_config$svgr = config.svgr) !== null && _config$svgr !== void 0 && _config$svgr.typescript ? 'tsx' : 'jsx';
    asset.bundleBehavior = null;
    asset.setCode(jsx);
    return [asset];
  }
});
exports.default = _default;