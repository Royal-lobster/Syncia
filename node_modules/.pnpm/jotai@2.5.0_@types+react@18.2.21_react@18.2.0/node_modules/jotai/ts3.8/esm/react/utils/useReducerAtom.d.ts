import { useAtom } from 'jotai/react';
import type { PrimitiveAtom } from 'jotai/vanilla';
type Options = Parameters<typeof useAtom>[1];
export declare function useReducerAtom<Value, Action>(anAtom: PrimitiveAtom<Value>, reducer: (v: Value, a?: Action) => Value, options?: Options): [
    Value,
    (action?: Action) => void
];
export declare function useReducerAtom<Value, Action>(anAtom: PrimitiveAtom<Value>, reducer: (v: Value, a: Action) => Value, options?: Options): [
    Value,
    (action: Action) => void
];
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;