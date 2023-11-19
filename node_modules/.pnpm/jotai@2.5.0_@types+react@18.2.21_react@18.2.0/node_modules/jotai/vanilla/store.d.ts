import type { Atom, WritableAtom } from './atom';
type AnyValue = unknown;
type AnyError = unknown;
type AnyAtom = Atom<AnyValue>;
type OnUnmount = () => void;
/**
 * Immutable map from a dependency to the dependency's atom state
 * when it was last read.
 * We can skip recomputation of an atom by comparing the atom state
 * of each dependency to that dependencies's current revision.
 */
type Dependencies = Map<AnyAtom, AtomState>;
/**
 * Immutable atom state,
 * tracked for both mounted and unmounted atoms in a store.
 */
type AtomState<Value = AnyValue> = {
    d: Dependencies;
} & ({
    e: AnyError;
} | {
    v: Value;
});
type Listeners = Set<() => void>;
type Dependents = Set<AnyAtom>;
/**
 * State tracked for mounted atoms. An atom is considered "mounted" if it has a
 * subscriber, or is a transitive dependency of another atom that has a
 * subscriber.
 *
 * The mounted state of an atom is freed once it is no longer mounted.
 */
type Mounted = {
    /** The list of subscriber functions. */
    l: Listeners;
    /** Atoms that depend on *this* atom. Used to fan out invalidation. */
    t: Dependents;
    /** Function to run when the atom is unmounted. */
    u?: OnUnmount;
};
type StoreListenerRev2 = (action: {
    type: 'write';
    flushed: Set<AnyAtom>;
} | {
    type: 'async-write';
    flushed: Set<AnyAtom>;
} | {
    type: 'sub';
    flushed: Set<AnyAtom>;
} | {
    type: 'unsub';
} | {
    type: 'restore';
    flushed: Set<AnyAtom>;
}) => void;
/**
 * Create a new store. Each store is an independent, isolated universe of atom
 * states.
 *
 * Jotai atoms are not themselves state containers. When you read or write an
 * atom, that state is stored in a store. You can think of a Store like a
 * multi-layered map from atoms to states, like this:
 *
 * ```
 * // Conceptually, a Store is a map from atoms to states.
 * // The real type is a bit different.
 * type Store = Map<VersionObject, Map<Atom, AtomState>>
 * ```
 *
 * @returns A store.
 */
export declare const createStore: () => {
    get: <Value>(atom: Atom<Value>) => Value;
    set: <Value_1, Args extends unknown[], Result>(atom: WritableAtom<Value_1, Args, Result>, ...args: Args) => Result;
    sub: (atom: AnyAtom, listener: () => void) => () => void;
    dev_subscribe_store: (l: StoreListenerRev2, rev: 2) => () => void;
    dev_get_mounted_atoms: () => IterableIterator<AnyAtom>;
    dev_get_atom_state: (a: AnyAtom) => AtomState<unknown> | undefined;
    dev_get_mounted: (a: AnyAtom) => Mounted | undefined;
    dev_restore_atoms: (values: Iterable<readonly [AnyAtom, AnyValue]>) => void;
} | {
    get: <Value>(atom: Atom<Value>) => Value;
    set: <Value_1, Args extends unknown[], Result>(atom: WritableAtom<Value_1, Args, Result>, ...args: Args) => Result;
    sub: (atom: AnyAtom, listener: () => void) => () => void;
    dev_subscribe_store?: never;
    dev_get_mounted_atoms?: never;
    dev_get_atom_state?: never;
    dev_get_mounted?: never;
    dev_restore_atoms?: never;
};
export declare const getDefaultStore: () => {
    get: <Value>(atom: Atom<Value>) => Value;
    set: <Value_1, Args extends unknown[], Result>(atom: WritableAtom<Value_1, Args, Result>, ...args: Args) => Result;
    sub: (atom: AnyAtom, listener: () => void) => () => void;
    dev_subscribe_store: (l: StoreListenerRev2, rev: 2) => () => void;
    dev_get_mounted_atoms: () => IterableIterator<AnyAtom>;
    dev_get_atom_state: (a: AnyAtom) => AtomState<unknown> | undefined;
    dev_get_mounted: (a: AnyAtom) => Mounted | undefined;
    dev_restore_atoms: (values: Iterable<readonly [AnyAtom, AnyValue]>) => void;
} | {
    get: <Value>(atom: Atom<Value>) => Value;
    set: <Value_1, Args extends unknown[], Result>(atom: WritableAtom<Value_1, Args, Result>, ...args: Args) => Result;
    sub: (atom: AnyAtom, listener: () => void) => () => void;
    dev_subscribe_store?: never;
    dev_get_mounted_atoms?: never;
    dev_get_atom_state?: never;
    dev_get_mounted?: never;
    dev_restore_atoms?: never;
};
export {};
