import { useStore } from 'jotai/react';
import type { WritableAtom } from 'jotai/vanilla';
type Options = Parameters<typeof useStore>[0] & {
    dangerouslyForceHydrate?: boolean;
};
type AnyWritableAtom = WritableAtom<unknown, any[], any>;
type AtomMap<A = AnyWritableAtom, V = unknown> = Map<A, V>;
type AtomTuple<A = AnyWritableAtom, V = unknown> = readonly [A, V];
type InferAtoms<T extends Iterable<AtomTuple>> = {
    [K in keyof T]: T[K] extends AtomTuple<infer A> ? A extends AnyWritableAtom ? AtomTuple<A, ReturnType<A['read']>> : T[K] : never;
};
export declare function useHydrateAtoms<T extends Array<AtomTuple>>(values: InferAtoms<T>, options?: Options): void;
export declare function useHydrateAtoms<T extends AtomMap>(values: T, options?: Options): void;
export declare function useHydrateAtoms<T extends Iterable<AtomTuple>>(values: InferAtoms<T>, options?: Options): void;
export {};
