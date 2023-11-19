import type { SetStateAction, WritableAtom } from 'jotai/vanilla';
import { RESET } from './constants';
type Read<Value, Args extends unknown[], Result> = WritableAtom<Value, Args, Result>['read'];
export declare function atomWithDefault<Value>(getDefault: Read<Value, [SetStateAction<Value> | typeof RESET], void>): WritableAtom<Value, [SetStateAction<Value> | typeof RESET], void>;
export {};
