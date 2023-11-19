"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function load({
  config
}) {
  let configFile = await config.getConfig(['.lessrc', '.lessrc.js', '.lessrc.cjs', '.lessrc.mjs'], {
    packageKey: 'less'
  });
  let configContents = {};
  if (configFile != null) {
    configContents = configFile.contents;

    // Resolve relative paths from config file
    if (configContents.paths) {
      configContents.paths = configContents.paths.map(p => _path().default.resolve(_path().default.dirname(configFile.filePath), p));
    }
  }

  // Rewrites urls to be relative to the provided filename
  configContents.rewriteUrls = 'all';
  configContents.plugins = configContents.plugins || [];
  return {
    config: configContents
  };
}