import { useSetAtom } from 'jotai/react';
import { RESET } from 'jotai/vanilla/utils';
import type { WritableAtom } from 'jotai/vanilla';
type Options = Parameters<typeof useSetAtom>[1];
export declare function useResetAtom(anAtom: WritableAtom<unknown, [typeof RESET], unknown>, options?: Options): () => unknown;
export {};
