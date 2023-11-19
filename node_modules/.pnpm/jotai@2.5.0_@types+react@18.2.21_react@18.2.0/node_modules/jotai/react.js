'use strict';

var ReactExports = require('react');
var vanilla = require('jotai/vanilla');

var StoreContext = ReactExports.createContext(undefined);
var useStore = function useStore(options) {
  var store = ReactExports.useContext(StoreContext);
  return (options == null ? void 0 : options.store) || store || vanilla.getDefaultStore();
};
var Provider = function Provider(_ref) {
  var children = _ref.children,
    store = _ref.store;
  var storeRef = ReactExports.useRef();
  if (!store && !storeRef.current) {
    storeRef.current = vanilla.createStore();
  }
  return ReactExports.createElement(StoreContext.Provider, {
    value: store || storeRef.current
  }, children);
};

var isPromiseLike = function isPromiseLike(x) {
  return typeof (x == null ? void 0 : x.then) === 'function';
};
var use = ReactExports.use || function (promise) {
  if (promise.status === 'pending') {
    throw promise;
  } else if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else {
    promise.status = 'pending';
    promise.then(function (v) {
      promise.status = 'fulfilled';
      promise.value = v;
    }, function (e) {
      promise.status = 'rejected';
      promise.reason = e;
    });
    throw promise;
  }
};
function useAtomValue(atom, options) {
  var store = useStore(options);
  var _useReducer = ReactExports.useReducer(function (prev) {
      var nextValue = store.get(atom);
      if (Object.is(prev[0], nextValue) && prev[1] === store && prev[2] === atom) {
        return prev;
      }
      return [nextValue, store, atom];
    }, undefined, function () {
      return [store.get(atom), store, atom];
    }),
    _useReducer$ = _useReducer[0],
    valueFromReducer = _useReducer$[0],
    storeFromReducer = _useReducer$[1],
    atomFromReducer = _useReducer$[2],
    rerender = _useReducer[1];
  var value = valueFromReducer;
  if (storeFromReducer !== store || atomFromReducer !== atom) {
    rerender();
    value = store.get(atom);
  }
  var delay = options == null ? void 0 : options.delay;
  ReactExports.useEffect(function () {
    var unsub = store.sub(atom, function () {
      if (typeof delay === 'number') {
        setTimeout(rerender, delay);
        return;
      }
      rerender();
    });
    rerender();
    return unsub;
  }, [store, atom, delay]);
  ReactExports.useDebugValue(value);
  return isPromiseLike(value) ? use(value) : value;
}

function useSetAtom(atom, options) {
  var store = useStore(options);
  var setAtom = ReactExports.useCallback(function () {
    if (process.env.NODE_ENV !== 'production' && !('write' in atom)) {
      throw new Error('not writable atom');
    }
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return store.set.apply(store, [atom].concat(args));
  }, [store, atom]);
  return setAtom;
}

function useAtom(atom, options) {
  return [useAtomValue(atom, options), useSetAtom(atom, options)];
}

exports.Provider = Provider;
exports.useAtom = useAtom;
exports.useAtomValue = useAtomValue;
exports.useSetAtom = useSetAtom;
exports.useStore = useStore;
