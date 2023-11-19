'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isFsReadStream = void 0;
const node_fs_1 = require('node:fs');
function isFsReadStream(value) {
  return value instanceof node_fs_1.ReadStream;
}
exports.isFsReadStream = isFsReadStream;
//# sourceMappingURL=node-readable.node.js.map
