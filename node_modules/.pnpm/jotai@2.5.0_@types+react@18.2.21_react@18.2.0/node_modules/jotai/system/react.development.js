System.register(['react', 'jotai/vanilla'], (function (exports) {
  'use strict';
  var createContext, useContext, useRef, createElement, ReactExports, useReducer, useEffect, useDebugValue, useCallback, getDefaultStore, createStore;
  return {
    setters: [function (module) {
      createContext = module.createContext;
      useContext = module.useContext;
      useRef = module.useRef;
      createElement = module.createElement;
      ReactExports = module.default;
      useReducer = module.useReducer;
      useEffect = module.useEffect;
      useDebugValue = module.useDebugValue;
      useCallback = module.useCallback;
    }, function (module) {
      getDefaultStore = module.getDefaultStore;
      createStore = module.createStore;
    }],
    execute: (function () {

      exports({
        useAtom: useAtom,
        useAtomValue: useAtomValue,
        useSetAtom: useSetAtom
      });

      const StoreContext = createContext(void 0);
      const useStore = exports('useStore', (options) => {
        const store = useContext(StoreContext);
        return (options == null ? void 0 : options.store) || store || getDefaultStore();
      });
      const Provider = exports('Provider', ({
        children,
        store
      }) => {
        const storeRef = useRef();
        if (!store && !storeRef.current) {
          storeRef.current = createStore();
        }
        return createElement(
          StoreContext.Provider,
          {
            value: store || storeRef.current
          },
          children
        );
      });

      const isPromiseLike = (x) => typeof (x == null ? void 0 : x.then) === "function";
      const use = ReactExports.use || ((promise) => {
        if (promise.status === "pending") {
          throw promise;
        } else if (promise.status === "fulfilled") {
          return promise.value;
        } else if (promise.status === "rejected") {
          throw promise.reason;
        } else {
          promise.status = "pending";
          promise.then(
            (v) => {
              promise.status = "fulfilled";
              promise.value = v;
            },
            (e) => {
              promise.status = "rejected";
              promise.reason = e;
            }
          );
          throw promise;
        }
      });
      function useAtomValue(atom, options) {
        const store = useStore(options);
        const [[valueFromReducer, storeFromReducer, atomFromReducer], rerender] = useReducer(
          (prev) => {
            const nextValue = store.get(atom);
            if (Object.is(prev[0], nextValue) && prev[1] === store && prev[2] === atom) {
              return prev;
            }
            return [nextValue, store, atom];
          },
          void 0,
          () => [store.get(atom), store, atom]
        );
        let value = valueFromReducer;
        if (storeFromReducer !== store || atomFromReducer !== atom) {
          rerender();
          value = store.get(atom);
        }
        const delay = options == null ? void 0 : options.delay;
        useEffect(() => {
          const unsub = store.sub(atom, () => {
            if (typeof delay === "number") {
              setTimeout(rerender, delay);
              return;
            }
            rerender();
          });
          rerender();
          return unsub;
        }, [store, atom, delay]);
        useDebugValue(value);
        return isPromiseLike(value) ? use(value) : value;
      }

      function useSetAtom(atom, options) {
        const store = useStore(options);
        const setAtom = useCallback(
          (...args) => {
            if (!("write" in atom)) {
              throw new Error("not writable atom");
            }
            return store.set(atom, ...args);
          },
          [store, atom]
        );
        return setAtom;
      }

      function useAtom(atom, options) {
        return [
          useAtomValue(atom, options),
          // We do wrong type assertion here, which results in throwing an error.
          useSetAtom(atom, options)
        ];
      }

    })
  };
}));
