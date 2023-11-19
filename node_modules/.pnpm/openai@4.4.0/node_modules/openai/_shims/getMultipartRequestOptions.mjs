/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
import { MultipartBody } from '../uploads.mjs';
export async function getMultipartRequestOptions(form, opts) {
  return { ...opts, body: new MultipartBody(form) };
}
//# sourceMappingURL=getMultipartRequestOptions.mjs.map
