'use strict';
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.getMultipartRequestOptions = void 0;
const node_stream_1 = require('node:stream');
const form_data_encoder_1 = require('form-data-encoder');
const uploads_1 = require('../uploads.js');
async function getMultipartRequestOptions(form, opts) {
  const encoder = new form_data_encoder_1.FormDataEncoder(form);
  const readable = node_stream_1.Readable.from(encoder);
  const body = new uploads_1.MultipartBody(readable);
  const headers = {
    ...opts.headers,
    ...encoder.headers,
    'Content-Length': encoder.contentLength,
  };
  return { ...opts, body: body, headers };
}
exports.getMultipartRequestOptions = getMultipartRequestOptions;
//# sourceMappingURL=getMultipartRequestOptions.node.js.map
