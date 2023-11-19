'use strict';
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.getMultipartRequestOptions = void 0;
const uploads_1 = require('../uploads.js');
async function getMultipartRequestOptions(form, opts) {
  return { ...opts, body: new uploads_1.MultipartBody(form) };
}
exports.getMultipartRequestOptions = getMultipartRequestOptions;
//# sourceMappingURL=getMultipartRequestOptions.js.map
