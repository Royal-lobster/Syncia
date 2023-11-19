import { useCallback, useMemo } from 'react';
import { useSetAtom, useAtom, useStore } from 'jotai/react';
import { RESET } from 'jotai/vanilla/utils';
import { atom } from 'jotai/vanilla';

function useResetAtom(anAtom, options) {
  const setAtom = useSetAtom(anAtom, options);
  const resetAtom = useCallback(() => setAtom(RESET), [setAtom]);
  return resetAtom;
}

function useReducerAtom(anAtom, reducer, options) {
  const [state, setState] = useAtom(anAtom, options);
  const dispatch = useCallback(
    (action) => {
      setState((prev) => reducer(prev, action));
    },
    [setState, reducer]
  );
  return [state, dispatch];
}

function useAtomCallback(callback, options) {
  const anAtom = useMemo(
    () => atom(null, (get, set, ...args) => callback(get, set, ...args)),
    [callback]
  );
  return useSetAtom(anAtom, options);
}

const hydratedMap = /* @__PURE__ */ new WeakMap();
function useHydrateAtoms(values, options) {
  const store = useStore(options);
  const hydratedSet = getHydratedSet(store);
  for (const [atom, value] of values) {
    if (!hydratedSet.has(atom) || (options == null ? void 0 : options.dangerouslyForceHydrate)) {
      hydratedSet.add(atom);
      store.set(atom, value);
    }
  }
}
const getHydratedSet = (store) => {
  let hydratedSet = hydratedMap.get(store);
  if (!hydratedSet) {
    hydratedSet = /* @__PURE__ */ new WeakSet();
    hydratedMap.set(store, hydratedSet);
  }
  return hydratedSet;
};

export { useAtomCallback, useHydrateAtoms, useReducerAtom, useResetAtom };
