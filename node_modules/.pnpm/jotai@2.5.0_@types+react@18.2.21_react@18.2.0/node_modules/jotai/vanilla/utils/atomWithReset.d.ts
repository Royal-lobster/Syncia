import type { WritableAtom } from 'jotai/vanilla';
import { RESET } from './constants';
type SetStateActionWithReset<Value> = Value | typeof RESET | ((prev: Value) => Value | typeof RESET);
export declare function atomWithReset<Value>(initialValue: Value): WritableAtom<Value, [SetStateActionWithReset<Value>], void>;
export {};
