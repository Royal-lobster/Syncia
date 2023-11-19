'use strict';
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 *
 * This is a stub that gets replaced by fileFromPath.node.js for node environments
 * in the package export map
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.fileFromPath = void 0;
async function fileFromPath() {
  throw new Error(
    'The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/openai/openai-node#file-uploads',
  );
}
exports.fileFromPath = fileFromPath;
//# sourceMappingURL=fileFromPath.js.map
