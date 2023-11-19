'use strict';
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.fileFromPath = void 0;
const file_from_path_1 = require('formdata-node/file-from-path');
let warned = false;
async function fileFromPath(path, ...args) {
  if (!warned) {
    console.warn(`fileFromPath is deprecated; use fs.createReadStream(${JSON.stringify(path)}) instead`);
    warned = true;
  }
  return await (0, file_from_path_1.fileFromPath)(path, ...args);
}
exports.fileFromPath = fileFromPath;
//# sourceMappingURL=fileFromPath.node.js.map
