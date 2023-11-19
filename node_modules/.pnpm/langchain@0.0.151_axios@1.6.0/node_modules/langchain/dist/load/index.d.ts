import { OptionalImportMap, SecretMap } from "./import_type.js";
export declare function load<T>(text: string, secretsMap?: SecretMap, optionalImportsMap?: OptionalImportMap): Promise<T>;
