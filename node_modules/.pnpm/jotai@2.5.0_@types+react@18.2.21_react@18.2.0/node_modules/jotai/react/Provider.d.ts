import type { FunctionComponentElement, ReactNode } from 'react';
import { createStore } from 'jotai/vanilla';
type Store = ReturnType<typeof createStore>;
type Options = {
    store?: Store;
};
export declare const useStore: (options?: Options) => Store;
export declare const Provider: ({ children, store, }: {
    children?: ReactNode;
    store?: Store;
}) => FunctionComponentElement<{
    value: Store | undefined;
}>;
export {};
