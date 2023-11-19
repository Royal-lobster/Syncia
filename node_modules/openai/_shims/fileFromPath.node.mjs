/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
import { fileFromPath as _fileFromPath } from 'formdata-node/file-from-path';
let warned = false;
export async function fileFromPath(path, ...args) {
  if (!warned) {
    console.warn(`fileFromPath is deprecated; use fs.createReadStream(${JSON.stringify(path)}) instead`);
    warned = true;
  }
  return await _fileFromPath(path, ...args);
}
//# sourceMappingURL=fileFromPath.node.mjs.map
