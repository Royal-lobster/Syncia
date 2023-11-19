import type { WritableAtom } from 'jotai/vanilla';
import { RESET } from './constants';
type Unsubscribe = () => void;
type SetStateActionWithReset<Value> = Value | typeof RESET | ((prev: Value) => Value | typeof RESET);
export interface AsyncStorage<Value> {
    getItem: (key: string, initialValue: Value) => PromiseLike<Value>;
    setItem: (key: string, newValue: Value) => PromiseLike<void>;
    removeItem: (key: string) => PromiseLike<void>;
    subscribe?: (key: string, callback: (value: Value) => void, initialValue: Value) => Unsubscribe;
}
export interface SyncStorage<Value> {
    getItem: (key: string, initialValue: Value) => Value;
    setItem: (key: string, newValue: Value) => void;
    removeItem: (key: string) => void;
    subscribe?: (key: string, callback: (value: Value) => void, initialValue: Value) => Unsubscribe;
}
export interface AsyncStringStorage {
    getItem: (key: string) => PromiseLike<string | null>;
    setItem: (key: string, newValue: string) => PromiseLike<void>;
    removeItem: (key: string) => PromiseLike<void>;
}
export interface SyncStringStorage {
    getItem: (key: string) => string | null;
    setItem: (key: string, newValue: string) => void;
    removeItem: (key: string) => void;
}
export declare function createJSONStorage<Value>(getStringStorage: () => AsyncStringStorage): AsyncStorage<Value>;
export declare function createJSONStorage<Value>(getStringStorage: () => SyncStringStorage): SyncStorage<Value>;
export declare function atomWithStorage<Value>(key: string, initialValue: Value, storage: AsyncStorage<Value>, unstable_options?: {
    unstable_getOnInit?: boolean;
}): WritableAtom<Value | Promise<Value>, [
    SetStateActionWithReset<Value | Promise<Value>>
], Promise<void>>;
export declare function atomWithStorage<Value>(key: string, initialValue: Value, storage?: SyncStorage<Value>, unstable_options?: {
    unstable_getOnInit?: boolean;
}): WritableAtom<Value, [SetStateActionWithReset<Value>], void>;
export {};
