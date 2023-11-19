import type { Atom, ExtractAtomArgs, ExtractAtomResult, ExtractAtomValue, WritableAtom } from 'jotai/vanilla';
import { useAtomValue } from './useAtomValue.mjs';
type SetAtom<Args extends any[], Result> = (...args: Args) => Result;
type Options = Parameters<typeof useAtomValue>[1];
export declare function useAtom<Value, Args extends any[], Result>(atom: WritableAtom<Value, Args, Result>, options?: Options): [Awaited<Value>, SetAtom<Args, Result>];
export declare function useAtom<Value>(atom: Atom<Value>, options?: Options): [Awaited<Value>, never];
export declare function useAtom<AtomType extends WritableAtom<any, any[], any>>(atom: AtomType, options?: Options): [
    Awaited<ExtractAtomValue<AtomType>>,
    SetAtom<ExtractAtomArgs<AtomType>, ExtractAtomResult<AtomType>>
];
export declare function useAtom<AtomType extends Atom<any>>(atom: AtomType, options?: Options): [Awaited<ExtractAtomValue<AtomType>>, never];
export {};
