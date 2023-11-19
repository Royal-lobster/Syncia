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
function _path() {
  const data = _interopRequireDefault(require("path"));
  _path = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = new (_plugin().Reporter)({
  async report({
    event,
    options,
    logger
  }) {
    if (event.type !== 'buildSuccess') {
      return;
    }
    let bundlesByTarget = new Map();
    for (let bundle of event.bundleGraph.getBundles()) {
      let bundles = bundlesByTarget.get(bundle.target.distDir);
      if (!bundles) {
        bundles = [];
        bundlesByTarget.set(bundle.target.distDir, bundles);
      }
      bundles.push(bundle);
    }
    for (let [targetDir, bundles] of bundlesByTarget) {
      let out = [];
      for (let bundle of bundles) {
        bundle.traverseAssets(asset => {
          let deps = event.bundleGraph.getDependencies(asset);
          for (let dep of deps) {
            let resolved = event.bundleGraph.getResolvedAsset(dep);
            if (!resolved) {
              continue;
            }
            out.push({
              source: _path().default.relative(options.projectRoot, asset.filePath),
              target: _path().default.relative(options.projectRoot, resolved.filePath)
            });
          }
        });
      }
      await options.outputFS.writeFile(_path().default.join(targetDir, 'bundle-buddy.json'), JSON.stringify(out));
      logger.info({
        message: `Wrote report to ${_path().default.relative(options.outputFS.cwd(), _path().default.join(targetDir, 'bundle-buddy.json'))}`
      });
    }
  }
});
exports.default = _default;