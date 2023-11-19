(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('jotai/react'), require('jotai/vanilla/utils'), require('jotai/vanilla')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'jotai/react', 'jotai/vanilla/utils', 'jotai/vanilla'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jotaiReactUtils = {}, global.React, global.jotaiReact, global.jotaiVanillaUtils, global.jotaiVanilla));
})(this, (function (exports, react$1, react, utils, vanilla) { 'use strict';

  function useResetAtom(anAtom, options) {
    var setAtom = react.useSetAtom(anAtom, options);
    var resetAtom = react$1.useCallback(function () {
      return setAtom(utils.RESET);
    }, [setAtom]);
    return resetAtom;
  }

  function useReducerAtom(anAtom, reducer, options) {
    var _useAtom = react.useAtom(anAtom, options),
      state = _useAtom[0],
      setState = _useAtom[1];
    var dispatch = react$1.useCallback(function (action) {
      setState(function (prev) {
        return reducer(prev, action);
      });
    }, [setState, reducer]);
    return [state, dispatch];
  }

  function useAtomCallback(callback, options) {
    var anAtom = react$1.useMemo(function () {
      return vanilla.atom(null, function (get, set) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }
        return callback.apply(void 0, [get, set].concat(args));
      });
    }, [callback]);
    return react.useSetAtom(anAtom, options);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var hydratedMap = new WeakMap();
  function useHydrateAtoms(values, options) {
    var store = react.useStore(options);
    var hydratedSet = getHydratedSet(store);
    for (var _iterator = _createForOfIteratorHelperLoose(values), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        atom = _step$value[0],
        value = _step$value[1];
      if (!hydratedSet.has(atom) || options != null && options.dangerouslyForceHydrate) {
        hydratedSet.add(atom);
        store.set(atom, value);
      }
    }
  }
  var getHydratedSet = function getHydratedSet(store) {
    var hydratedSet = hydratedMap.get(store);
    if (!hydratedSet) {
      hydratedSet = new WeakSet();
      hydratedMap.set(store, hydratedSet);
    }
    return hydratedSet;
  };

  exports.useAtomCallback = useAtomCallback;
  exports.useHydrateAtoms = useHydrateAtoms;
  exports.useReducerAtom = useReducerAtom;
  exports.useResetAtom = useResetAtom;

}));
