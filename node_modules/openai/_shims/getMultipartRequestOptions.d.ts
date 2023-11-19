/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
import { FormData } from './formdata.js';
import type { RequestOptions } from '../core.js';
export declare function getMultipartRequestOptions<T extends {} = Record<string, unknown>>(
  form: FormData,
  opts: RequestOptions<T>,
): Promise<RequestOptions<T>>;
//# sourceMappingURL=getMultipartRequestOptions.d.ts.map
