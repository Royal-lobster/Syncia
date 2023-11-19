/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
import { Readable } from 'node:stream';
import { FormDataEncoder } from 'form-data-encoder';
import { MultipartBody } from '../uploads.mjs';
export async function getMultipartRequestOptions(form, opts) {
  const encoder = new FormDataEncoder(form);
  const readable = Readable.from(encoder);
  const body = new MultipartBody(readable);
  const headers = {
    ...opts.headers,
    ...encoder.headers,
    'Content-Length': encoder.contentLength,
  };
  return { ...opts, body: body, headers };
}
//# sourceMappingURL=getMultipartRequestOptions.node.mjs.map
