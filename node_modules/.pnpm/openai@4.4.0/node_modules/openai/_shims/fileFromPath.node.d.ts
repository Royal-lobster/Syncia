/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
import type { File, FilePropertyBag } from './formdata.node.js';
export type FileFromPathOptions = Omit<FilePropertyBag, 'lastModified'>;
/**
 * @deprecated use fs.createReadStream('./my/file.txt') instead
 */
export declare function fileFromPath(path: string): Promise<File>;
export declare function fileFromPath(path: string, filename?: string): Promise<File>;
export declare function fileFromPath(path: string, options?: FileFromPathOptions): Promise<File>;
export declare function fileFromPath(
  path: string,
  filename?: string,
  options?: FileFromPathOptions,
): Promise<File>;
//# sourceMappingURL=fileFromPath.node.d.ts.map
