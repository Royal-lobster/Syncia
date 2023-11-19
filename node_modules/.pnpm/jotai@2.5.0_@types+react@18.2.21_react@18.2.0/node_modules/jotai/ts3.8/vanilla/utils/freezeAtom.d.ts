import type { Atom } from 'jotai/vanilla';
export declare function freezeAtom<AtomType extends Atom<any>>(anAtom: AtomType): AtomType;
export declare function freezeAtomCreator<CreateAtom extends (...params: any[]) => Atom<any>>(createAtom: CreateAtom): CreateAtom;
declare type Awaited<T> = T extends Promise<infer V> ? V : T;