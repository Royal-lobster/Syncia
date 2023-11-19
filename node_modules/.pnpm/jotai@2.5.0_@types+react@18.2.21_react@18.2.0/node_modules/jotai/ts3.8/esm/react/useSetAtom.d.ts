import type { ExtractAtomArgs, ExtractAtomResult, WritableAtom } from 'jotai/vanilla';
import { useStore } from './Provider';
type SetAtom<Args extends any[], Result> = (...args: Args) => Result;
type Store = ReturnType<typeof useStore>;
type Options = {
    store?: Store;
};
export declare function useSetAtom<Value, Args extends any[], Result>(atom: WritableAtom<Value, Args, Result>, options?: Options): SetAtom<Args, Result>;
export declare function useSetAtom<AtomType extends WritableAtom<any, any[], any>>(atom: AtomType, options?: Options): SetAtom<ExtractAtomArgs<AtomType>, ExtractAtomResult<AtomType>>;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;