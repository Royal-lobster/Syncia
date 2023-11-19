type Getter = <Value>(atom: Atom<Value>) => Value;
type Setter = <Value, Args extends unknown[], Result>(atom: WritableAtom<Value, Args, Result>, ...args: Args) => Result;
type SetAtom<Args extends unknown[], Result> = <A extends Args>(...args: A) => Result;
type Read<Value, SetSelf = never> = (get: Getter, options: {
    readonly signal: AbortSignal;
    readonly setSelf: SetSelf;
}) => Value;
type Write<Args extends unknown[], Result> = (get: Getter, set: Setter, ...args: Args) => Result;
type WithInitialValue<Value> = {
    init: Value;
};
type OnUnmount = () => void;
type OnMount<Args extends unknown[], Result> = <S extends SetAtom<Args, Result>>(setAtom: S) => OnUnmount | void;
export interface Atom<Value> {
    toString: () => string;
    read: Read<Value>;
    debugLabel?: string;
    /**
     * To ONLY be used by Jotai libraries to mark atoms as private. Subject to change.
     * @private
     */
    debugPrivate?: boolean;
}
export interface WritableAtom<Value, Args extends unknown[], Result> extends Atom<Value> {
    read: Read<Value, SetAtom<Args, Result>>;
    write: Write<Args, Result>;
    onMount?: OnMount<Args, Result>;
}
type SetStateAction<Value> = Value | ((prev: Value) => Value);
export type PrimitiveAtom<Value> = WritableAtom<Value, [
    SetStateAction<Value>
], void>;
export declare function atom<Value, Args extends unknown[], Result>(read: Read<Value, SetAtom<Args, Result>>, write: Write<Args, Result>): WritableAtom<Value, Args, Result>;
export declare function atom<Value>(read: Read<Value>): Atom<Value>;
export declare function atom<Value, Args extends unknown[], Result>(initialValue: Value, write: Write<Args, Result>): WritableAtom<Value, Args, Result> & WithInitialValue<Value>;
export declare function atom<Value>(initialValue: Value): PrimitiveAtom<Value> & WithInitialValue<Value>;
export {};
declare type Awaited<T> = T extends Promise<infer V> ? V : T;