import type { Atom, ExtractAtomValue } from 'jotai/vanilla';
import { useStore } from './Provider';
type Store = ReturnType<typeof useStore>;
type Options = {
    store?: Store;
    delay?: number;
};
export declare function useAtomValue<Value>(atom: Atom<Value>, options?: Options): Awaited<Value>;
export declare function useAtomValue<AtomType extends Atom<any>>(atom: AtomType, options?: Options): Awaited<ExtractAtomValue<AtomType>>;
export {};
