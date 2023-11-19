"use strict";

require("earlgrey-runtime/5");var tmp$0 = undefined;var $targ$1 = undefined;var accum$0 = undefined;var $targ$2 = undefined;var accum$1 = undefined;var $targ$3 = undefined;var accum$2 = undefined;var $targ$4 = undefined;var accum$3 = undefined;var $targ$5 = undefined;var accum$4 = undefined;var $targ$25 = undefined;var accum$13 = undefined;var $targ$26 = undefined;var accum$14 = undefined;var accum$15 = undefined;var accum$16 = undefined;var accum$17 = undefined;var accum$18 = undefined;var accum$19 = undefined;var accum$20 = undefined;var accum$21 = undefined;var accum$22 = undefined;var accum$23 = undefined;var accum$24 = undefined;var accum$25 = undefined;var accum$26 = undefined;var m$23 = undefined;var $targ$33 = undefined;var $targ$34 = undefined;var $targ$35 = undefined;var $targ$36 = undefined;var $targ$37 = undefined;var $targ$38 = undefined;var $targ$39 = undefined;var $targ$40 = undefined;var $targ$41 = undefined;var $targ$42 = undefined;var $targ$43 = undefined;var $targ$44 = undefined;var $targ$45 = undefined;var $targ$46 = undefined;var $targ$47 = undefined;var $targ$48 = undefined;var $targ$49 = undefined;var $targ$50 = undefined;var TYPEID$0 = undefined;var registry$0 = undefined;var object__minus__name$0 = undefined;var make__minus__type__minus__id$0 = undefined;var register$0 = undefined;var register__minus__all$0 = undefined;var _type__minus__id$0 = undefined;var get__minus__handler$0 = undefined;var maybe__minus__handler$0 = undefined;var extend__minus__handler$0 = undefined;var object__minus__serializer$0 = undefined;var singleton__minus__serializer$0 = undefined;var register__minus__singleton$0 = undefined;var register__minus__singletons$0 = undefined;var register__minus__function$0 = undefined;var register__minus__functions$0 = undefined;var Serializer$0 = undefined;var default__minus__serializer$0 = undefined;var serialize$0 = undefined;var deserialize$0 = undefined;var shallow__minus__copy$0 = undefined;var deep__minus__copy$0 = undefined;var cmds$0 = undefined;var $targ$0 = undefined;if ((tmp$0 = send(global, "@@KAISER", true), tmp$0 === undefined || tmp$0 === null ? tmp$0 : tmp$0.loaded)) {
  return global["@@KAISER"];
}TYPEID$0 = Symbol("TYPEID");registry$0 = __amp____colon__(($targ$1 = { typeId: "native:null" }, accum$0 = {}, accum$0["native:null"] = $targ$1, accum$0), __amp____colon__(($targ$2 = { typeId: "native:undefined" }, accum$1 = {}, accum$1["native:undefined"] = $targ$2, accum$1), __amp____colon__(($targ$3 = { typeId: "native:boolean" }, accum$2 = {}, accum$2["native:boolean"] = $targ$3, accum$2), __amp____colon__(($targ$4 = { typeId: "native:number" }, accum$3 = {}, accum$3["native:number"] = $targ$4, accum$3), ($targ$5 = { typeId: "native:string" }, accum$4 = {}, accum$4["native:string"] = $targ$5, accum$4)))));object__minus__name$0 = function objectName() {
  var tmp$1 = undefined;var tmp$3 = undefined;var tmp$2 = undefined;var name$0 = undefined;var m$1$0 = undefined;var object$0 = undefined;var req$0 = undefined;var t0$0 = undefined;var m$0$0 = undefined;m$0$0 = arguments;t0$0 = m$0$0.length;if (t0$0 >= 1 && t0$0 <= 2) {
    object$0 = m$0$0[0];if (1 >= t0$0) {
      req$0 = true;
    } else {
      req$0 = m$0$0[1];
    }m$1$0 = (tmp$1 = object$0, tmp$1 === undefined || tmp$1 === null ? tmp$1 : tmp$1.name) || (tmp$2 = (tmp$3 = object$0, tmp$3 === undefined || tmp$3 === null ? tmp$3 : tmp$3.constructor), tmp$2 === undefined || tmp$2 === null ? tmp$2 : tmp$2.name);if (!m$1$0 && req$0) {
      throw ErrorFactory(["kaiser", "nameRequired"]).create("The object or function to register must have a name field or its constructor must have a name.");
    } else {
      if (!m$1$0) {
        return "";
      } else {
        name$0 = m$1$0;return name$0;
      }
    }
  } else {
    return ___match_error(m$0$0, "{object, req = true}");
  }
};make__minus__type__minus__id$0 = function makeTypeId(object$1, temp$0$0) {
  var t0$1 = undefined;var name__minus__variant$0 = undefined;var dv$0 = undefined;var data__minus__version$0 = undefined;var m$2$0 = undefined;var version$0 = undefined;var package$1 = undefined;var use__minus__version$0 = undefined;var type__minus__id$2 = undefined;var type__minus__id$1 = undefined;var ph$1$0 = undefined;var type__minus__id$0 = undefined;var variant$0 = undefined;var $$131$0 = undefined;var $$132$0 = undefined;var t0$2 = undefined;var policy$0 = undefined;var ph$0$0 = undefined;t0$1 = temp$0$0;policy$0 = t0$1;ph$0$0 = t0$1;t0$2 = ph$0$0;if (($$132$0 = ___hasprop(t0$2, "typeId")) && (type__minus__id$0 = t0$2.typeId, ___hasprop(t0$2, "variant"))) {
    variant$0 = t0$2.variant;return type__minus__id$0 + "/" + JSON.stringify(variant$0);
  } else {
    if ($$132$0 && (type__minus__id$1 = t0$2.typeId, ___hasprop(t0$2, "nameVariant"))) {
      ph$1$0 = t0$2.nameVariant;if (ph$1$0 === true) {
        return type__minus__id$1 + "/" + object__minus__name$0(object$1);
      } else {
        name__minus__variant$0 = ph$1$0;return type__minus__id$1 + "/" + name__minus__variant$0;
      }
    } else {
      if ($$132$0) {
        type__minus__id$2 = t0$2.typeId;return type__minus__id$2;
      } else {
        if (___hasprop(t0$2, "package")) {
          package$1 = t0$2["package"];if (___hasprop(t0$2, "useVersion")) {
            use__minus__version$0 = t0$2.useVersion;
          } else {
            use__minus__version$0 = null;
          }m$2$0 = use__minus__version$0;if (!m$2$0) {
            version$0 = "";
          } else {
            if ((dv$0 = package$1.dataVersion, dv$0)) {
              data__minus__version$0 = "d" + dv$0;
            } else {
              data__minus__version$0 = package$1.version;
            }if (m$2$0 === "major") {
              version$0 = "@" + data__minus__version$0.split(".")[0];
            } else {
              if (m$2$0 === "minor") {
                version$0 = "@" + send(data__minus__version$0.split("."), range(0, 2 - 1)).join(".");
              } else {
                if (m$2$0 === "patch") {
                  version$0 = "@" + data__minus__version$0;
                } else {
                  version$0 = ___match_error(m$2$0, ".patch");
                }
              }
            }
          }return "npm:" + package$1.name + version$0 + "/" + (policy$0.name || policy$0.nameVariant || object__minus__name$0(object$1));
        } else {
          throw ErrorFactory(["kaiser", "register", "id"]).create("No typeId provided.");
        }
      }
    }
  }
};register$0 = function register(object$2, _policy$0) {
  var $targ$9 = undefined;var $targ$10 = undefined;var $targ$11 = undefined;var t0$3 = undefined;var bridge$$262$0 = undefined;var bridge$$265$0 = undefined;var m$3$0 = undefined;var policy$1 = undefined;var $targ$6 = undefined;var type__minus__id$3 = undefined;var prev$0 = undefined;var $targ$7 = undefined;var $targ$8 = undefined;if (!_policy$0.deserialize && _policy$0.create) {
    $targ$9 = function (x$0) {
      var r$0 = undefined;r$0 = _policy$0.create();_policy$0.fill(r$0, x$0);return r$0;
    };_policy$0.deserialize = $targ$9;void 0;
  }if (_policy$0.deserialize && !_policy$0.create) {
    $targ$10 = null;_policy$0.create = $targ$10;void 0;
  }if (_policy$0.deserialize && !_policy$0.fill) {
    $targ$11 = null;_policy$0.fill = $targ$11;void 0;
  }policy$1 = __amp__(object__minus__serializer$0(object$2), _policy$0);if (policy$1.target !== "self" && object$2.prototype && !policy$1.ignorePrototype) {
    return register$0(object$2.prototype, _policy$0);
  }$targ$6 = make__minus__type__minus__id$0(object$2, policy$1);t0$3 = $targ$6;policy$1.typeId = t0$3;type__minus__id$3 = t0$3;if (Object.isFrozen(object$2)) {
    throw ErrorFactory(["kaiser", "frozen"]).create("kaiser cannot register frozen objects as serializable types; " + "either register them before freezing them, or register their prototypes.");
  }prev$0 = send(registry$0, type__minus__id$3);if (prev$0 && prev$0 !== policy$1) {
    m$3$0 = prev$0.onDuplicate;bridge$$262$0 = m$3$0;if (bridge$$262$0 === "error" || policy$1.onDuplicate === "error") {
      throw ErrorFactory(["kaiser", "duplicateId"]).create("Duplicate typeId: \"" + type__minus__id$3 + "\". You can control this error" + " with the onDuplicate option to kaiser.register" + " (onDuplicate: \"error\" (default), \"(warn-)keep\" or \"(warn-)replace\").");
    } else {
      if (m$3$0 === "warnKeep") {
        console.warn("WARNING: Duplicate typeId: \"" + type__minus__id$3 + "\". Keeping previous.");return false;
      } else {
        bridge$$265$0 = m$3$0;if (bridge$$265$0 === "warn" || bridge$$265$0 === "warnReplace") {
          console.warn("WARNING: Duplicate typeId: \"" + type__minus__id$3 + "\". Replacing.");
        } else {
          if (m$3$0 === "keep") {
            return false;
          } else {
            if (m$3$0 === "replace") {
              undefined;
            } else {
              ___match_error(m$3$0, ".replace");
            }
          }
        }
      }
    }
  }$targ$7 = policy$1;registry$0[type__minus__id$3] = $targ$7;$targ$8 = type__minus__id$3;object$2[TYPEID$0] = $targ$8;return true;
};register__minus__all$0 = function registerAll(objects$0, policy$2) {
  var m$4 = undefined;var acc$0 = undefined;var temp$1 = undefined;acc$0 = [];temp$1 = null;m$4 = null;$1: for (var _iterator = objects$0[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
    m$4 = _step.value;
    var object$3 = undefined;object$3 = m$4;temp$1 = register$0(object$3, __amp__(policy$2, { nameVariant: object__minus__name$0(object$3) }));acc$0.push(temp$1);
  }return acc$0;
};_type__minus__id$0 = function _typeId(temp$2$0) {
  var t0$4 = undefined;var bridge$$343$0 = undefined;var object$4 = undefined;var ph$2$0 = undefined;t0$4 = temp$2$0;object$4 = t0$4;ph$2$0 = t0$4;bridge$$343$0 = ph$2$0;if (bridge$$343$0 === null || bridge$$343$0 === void 0) {
    return "native:" + object$4;
  } else {
    if (typeof ph$2$0 === "boolean") {
      return "native:boolean";
    } else {
      if (typeof ph$2$0 === "number") {
        return "native:number";
      } else {
        if (typeof ph$2$0 === "string") {
          return "native:string";
        } else {
          return send(object$4, TYPEID$0);
        }
      }
    }
  }
};get__minus__handler$0 = function getHandler(obj$0) {
  var p$0 = undefined;var t0$5 = undefined;var policy$3 = undefined;var ph$3$0 = undefined;var m$5$0 = undefined;var tid$0 = undefined;tid$0 = _type__minus__id$0(obj$0);m$5$0 = send(registry$0, tid$0);if (m$5$0 === void 0) {
    throw ErrorFactory(["kaiser"]).create("No handler for typeId \"" + tid$0 + "\" for object " + obj$0);
  } else {
    policy$3 = m$5$0;if (___hasprop(m$5$0, "target")) {
      ph$3$0 = m$5$0.target;
    } else {
      ph$3$0 = "other";
    }if (ph$3$0 === "self" && !Object.hasOwnProperty.call(obj$0, TYPEID$0)) {
      throw ErrorFactory(["kaiser"]).create("Object has no typeId: " + obj$0);
    } else {
      t0$5 = ph$3$0;if (t0$5 === "direct" && (p$0 = Object.getPrototypeOf(obj$0), !Object.hasOwnProperty.call(p$0, TYPEID$0))) {
        throw ErrorFactory(["kaiser"]).create("Object has no typeId: " + obj$0);
      } else {
        return policy$3;
      }
    }
  }
};maybe__minus__handler$0 = function maybeHandler(obj$1) {
  var rval$0 = undefined;rval$0 = false;try {
    rval$0 = get__minus__handler$0(obj$1);rval$0;
  } catch (excv$0) {
    var e$1 = undefined;var e$0 = undefined;var t0$6 = undefined;t0$6 = excv$0;if (getChecker(ErrorFactory(["kaiser"]))(t0$6)) {
      e$0 = t0$6;rval$0 = null;rval$0;
    } else {
      e$1 = excv$0;throw e$1;rval$0;
    }
  }return rval$0;
};extend__minus__handler$0 = function extendHandler(obj$2, properties$0) {
  var h$0 = undefined;h$0 = get__minus__handler$0(obj$2);return __amp____colon__(h$0, properties$0);
};object__minus__serializer$0 = function objectSerializer(proto$0) {
  var accum$5 = undefined;var accum$6 = undefined;var accum$7 = undefined;var accum$8 = undefined;return __amp____colon__({ onDuplicate: "replace", target: "direct", ignorePrototype: false }, __amp____colon__((accum$5 = {}, accum$5.serialize = function serialize(x$1) {
    return object(items(x$1));
  }, accum$5), __amp____colon__((accum$6 = {}, accum$6.deserialize = function deserialize(x$2) {
    var m$6 = undefined;var rval$1 = undefined;rval$1 = Object.create(proto$0);m$6 = null;$2: for (var _iterator = items(x$2)[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      m$6 = _step.value;
      var $targ$12 = undefined;var k$0 = undefined;var v$0 = undefined;var t0$7 = undefined;var t1$0 = undefined;t0$7 = m$6;if (Array.isArray(t0$7) && (t1$0 = t0$7.length, t1$0 === 2)) {
        k$0 = t0$7[0];v$0 = t0$7[1];$targ$12 = v$0;rval$1[k$0] = $targ$12;void 0;
      } else {
        ___match_error(m$6);
      }
    }return rval$1;
  }, accum$6), __amp____colon__((accum$7 = {}, accum$7.create = function create() {
    return Object.create(proto$0);
  }, accum$7), (accum$8 = {}, accum$8.fill = function fill(rval$2, x$3) {
    var m$7 = undefined;m$7 = null;$3: for (var _iterator = items(x$3)[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      m$7 = _step.value;
      var $targ$13 = undefined;var k$1 = undefined;var v$1 = undefined;var t0$8 = undefined;var t1$1 = undefined;t0$8 = m$7;if (Array.isArray(t0$8) && (t1$1 = t0$8.length, t1$1 === 2)) {
        k$1 = t0$8[0];v$1 = t0$8[1];$targ$13 = v$1;rval$2[k$1] = $targ$13;void 0;
      } else {
        ___match_error(m$7);
      }
    }return rval$2;
  }, accum$8)))));
};singleton__minus__serializer$0 = function singletonSerializer(object$5) {
  var accum$9 = undefined;var accum$10 = undefined;return __amp____colon__({ target: "self" }, __amp____colon__((accum$9 = {}, accum$9.serialize = function serialize(temp$3$0) {
    return null;
  }, accum$9), (accum$10 = {}, accum$10.deserialize = function deserialize(temp$4$0) {
    return object$5;
  }, accum$10)));
};register__minus__singleton$0 = function registerSingleton() {
  var policy$4 = undefined;var type__minus__id$4 = undefined;var t0$10 = undefined;var object$6 = undefined;var ph$5$0 = undefined;var t0$9 = undefined;var m$8$0 = undefined;m$8$0 = arguments;t0$9 = m$8$0.length;if (t0$9 >= 1 && t0$9 <= 2) {
    object$6 = m$8$0[0];if (1 >= t0$9) {
      ph$5$0 = null;
    } else {
      ph$5$0 = m$8$0[1];
    }if (ph$5$0 === null) {
      return function (o$0) {
        return register__minus__singleton$0(o$0, object$6);
      };
    } else {
      t0$10 = ph$5$0;if (typeof t0$10 === "string") {
        type__minus__id$4 = t0$10;register$0(object$6, __amp__(singleton__minus__serializer$0(object$6), { typeId: type__minus__id$4 }));return object$6;
      } else {
        policy$4 = ph$5$0;register$0(object$6, __amp__(singleton__minus__serializer$0(object$6), policy$4));return object$6;
      }
    }
  } else {
    return ___match_error(m$8$0, "{object, match = null}");
  }
};register__minus__singletons$0 = function registerSingletons(objects$1, _policy$1) {
  var type__minus__id$5 = undefined;var m$9$0 = undefined;var m$10 = undefined;var acc$1 = undefined;var temp$5 = undefined;var policy$5 = undefined;m$9$0 = _policy$1;if (typeof m$9$0 === "string") {
    type__minus__id$5 = m$9$0;policy$5 = { typeId: type__minus__id$5 };
  } else {
    policy$5 = _policy$1;
  }acc$1 = [];temp$5 = null;m$10 = null;$4: for (var _iterator = objects$1[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
    m$10 = _step.value;
    var object$7 = undefined;object$7 = m$10;temp$5 = register$0(object$7, __amp__(singleton__minus__serializer$0(object$7), __amp__(policy$5, { nameVariant: object__minus__name$0(object$7) })));acc$1.push(temp$5);
  }return acc$1;
};register__minus__function$0 = register__minus__singleton$0;register__minus__functions$0 = register__minus__singletons$0;Serializer$0 = function Serializer() {
  var $targ$14 = undefined;var $targ$16 = undefined;var accum$11 = undefined;var $targ$17 = undefined;var accum$12 = undefined;var t0$12 = undefined;var acquire$0 = undefined;var $targ$15 = undefined;var wl$0 = undefined;var white__minus__list$0 = undefined;var ph$7$0 = undefined;var t0$11 = undefined;var t1$2 = undefined;var m$11$0 = undefined;var __at___$0 = undefined;if (!getChecker(Serializer$0)(this)) {
    __at___$0 = Object.create(Serializer$0.prototype);
  } else {
    __at___$0 = this;
  }m$11$0 = arguments;t0$11 = m$11$0.length;if (t0$11 >= 0 && t0$11 <= 1) {
    if (0 >= t0$11) {
      t1$2 = null;
    } else {
      t1$2 = m$11$0[0];
    }white__minus__list$0 = t1$2;ph$7$0 = t1$2;if (ph$7$0 === null) {
      $targ$14 = null;__at___$0.whiteList = $targ$14;void 0;
    } else {
      $targ$15 = __amp____colon__({ native: true }, __amp____colon__(($targ$16 = true, accum$11 = {}, accum$11["builtin:Object"] = $targ$16, accum$11), ($targ$17 = true, accum$12 = {}, accum$12["builtin:Array"] = $targ$17, accum$12)));t0$12 = $targ$15;__at___$0.whiteList = t0$12;wl$0 = t0$12;acquire$0 = function acquire(temp$6$0) {
        var t0$13 = undefined;var m$12 = undefined;var acc$2 = undefined;var temp$7 = undefined;var $targ$18 = undefined;var $targ$19 = undefined;var $targ$20 = undefined;var tid$2 = undefined;var tid$1 = undefined;var $$757$0 = undefined;var t0$14 = undefined;var t1$3 = undefined;var t2$0 = undefined;var w$0 = undefined;var ph$8$0 = undefined;t0$13 = temp$6$0;w$0 = t0$13;ph$8$0 = t0$13;if (Array.isArray(ph$8$0)) {
          acc$2 = [];temp$7 = null;m$12 = null;$5: for (var _iterator = w$0[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
            m$12 = _step.value;
            var entry$0 = undefined;entry$0 = m$12;temp$7 = acquire$0(entry$0);acc$2.push(temp$7);
          }return acc$2;
        } else {
          if (typeof ph$8$0 === "string") {
            $targ$18 = true;wl$0[w$0] = $targ$18;return void 0;
          } else {
            t0$14 = ph$8$0;if (___hasprop(t0$14, "prototype") && (t1$3 = t0$14.prototype, t2$0 = TYPEID$0, ___hasprop(t1$3, t2$0))) {
              tid$1 = send(t1$3, t2$0);$targ$19 = true;wl$0[tid$1] = $targ$19;return void 0;
            } else {
              t1$3 = TYPEID$0;if (___hasprop(t0$14, t1$3)) {
                tid$2 = send(t0$14, t1$3);$targ$20 = true;wl$0[tid$2] = $targ$20;return void 0;
              } else {
                return ___match_error(ph$8$0, "{^TYPEID => tid}");
              }
            }
          }
        }
      };acquire$0(white__minus__list$0 || []);
    }
  } else {
    ___match_error(m$11$0, "{match white-list = null}");
  }return __at___$0;
};Serializer$0.prototype.toObject = function () {
  var bridge$$874$0 = undefined;var bridge$$873$0 = undefined;var bridge$$872$0 = undefined;var bridge$$871$0 = undefined;var m$14$0 = undefined;var t0$16 = undefined;var t1$4 = undefined;var $targ$21 = undefined;var d$0 = undefined;var i$0 = undefined;var $targ$22 = undefined;var bridge$$955$0 = undefined;var bridge$$954$0 = undefined;var bridge$$953$0 = undefined;var m$16 = undefined;var acc$3 = undefined;var temp$8 = undefined;var m$17 = undefined;var acc$4 = undefined;var temp$9 = undefined;var bridge$$952$0 = undefined;var m$15$0 = undefined;var policy$6 = undefined;var tid$3 = undefined;var ser0$0 = undefined;var ser1$0 = undefined;var rval$3 = undefined;var obj$3 = undefined;var recursive$0 = undefined;var seen$0 = undefined;var t0$15 = undefined;var m$13$0 = undefined;var __at___$1 = undefined;var self$0 = undefined;__at___$1 = this;self$0 = this;m$13$0 = arguments;t0$15 = m$13$0.length;if (t0$15 >= 1 && t0$15 <= 3) {
    obj$3 = m$13$0[0];if (1 >= t0$15) {
      recursive$0 = true;
    } else {
      recursive$0 = m$13$0[1];
    }if (2 >= t0$15) {
      seen$0 = new Map();
    } else {
      seen$0 = m$13$0[2];
    }m$14$0 = obj$3;bridge$$871$0 = m$14$0;if ((bridge$$872$0 = bridge$$871$0, (bridge$$873$0 = bridge$$872$0, (bridge$$874$0 = bridge$$873$0, bridge$$874$0 === null || bridge$$874$0 === void 0) || typeof bridge$$873$0 === "boolean") || typeof bridge$$872$0 === "number") || typeof bridge$$871$0 === "string") {
      return { typeId: "native", data: obj$3 };
    } else {
      undefined;
    }if (seen$0.has(obj$3)) {
      $targ$21 = seen$0.get(obj$3);t0$16 = $targ$21;if (Array.isArray(t0$16) && (t1$4 = t0$16.length, t1$4 === 2)) {
        d$0 = t0$16[0];i$0 = t0$16[1];
      } else {
        ___match_error($targ$21, "{d, i}");
      }[d$0, i$0];$targ$22 = i$0;d$0.ref = $targ$22;return { ref: i$0 };
    }rval$3 = {};seen$0.set(obj$3, [rval$3, seen$0.size]);__amp____colon__(rval$3, (policy$6 = get__minus__handler$0(obj$3), tid$3 = policy$6.typeId, __at___$1.whiteList && !send(send(__at___$1, "whiteList", true), tid$3) ? (function () {
      throw ErrorFactory(["kaiser", "serialize"]).create("Object with type id \"" + tid$3 + "\" is not white-listed for serialization: " + obj$3);
    })() : undefined, ser0$0 = policy$6.serialize(obj$3), ser1$0 = (m$15$0 = ser0$0, !recursive$0 ? ser0$0 : (bridge$$952$0 = m$15$0, (bridge$$953$0 = bridge$$952$0, (bridge$$954$0 = bridge$$953$0, (bridge$$955$0 = bridge$$954$0, bridge$$955$0 === null || bridge$$955$0 === void 0) || typeof bridge$$954$0 === "string") || typeof bridge$$953$0 === "number") || typeof bridge$$952$0 === "boolean" ? ser0$0 : Array.isArray(m$15$0) ? (acc$3 = [], temp$8 = null, m$16 = null, (function () {
      $6: for (var _iterator = ser0$0[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        m$16 = _step.value;
        var x$4 = undefined;x$4 = m$16;temp$8 = __at___$1.toObject(x$4, recursive$0, seen$0);acc$3.push(temp$8);
      }
    })(), acc$3) : getChecker(Object)(m$15$0) ? object((acc$4 = [], temp$9 = null, m$17 = null, (function () {
      $7: for (var _iterator = items(ser0$0)[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        m$17 = _step.value;
        var k$2 = undefined;var v$2 = undefined;var t0$17 = undefined;var t1$5 = undefined;t0$17 = m$17;if (Array.isArray(t0$17) && (t1$5 = t0$17.length, t1$5 === 2)) {
          k$2 = t0$17[0];v$2 = t0$17[1];temp$9 = [k$2, __at___$1.toObject(v$2, recursive$0, seen$0)];acc$4.push(temp$9);
        } else {
          ___match_error(m$17);
        }
      }
    })(), acc$4)) : ___match_error(m$15$0, "Object? "))), { typeId: tid$3, data: ser1$0 }));return rval$3;
  } else {
    return ___match_error(m$13$0, "{obj, recursive = true, seen = new Map{}}");
  }
};Serializer$0.prototype.fromObject = function () {
  var rval$4 = undefined;var $targ$23 = undefined;var $targ$24 = undefined;var x$6 = undefined;var policy$8 = undefined;var policy$7 = undefined;var m$21$0 = undefined;var deser$0 = undefined;var assim$0 = undefined;var tid$4 = undefined;var obj$4 = undefined;var recursive$1 = undefined;var made$0 = undefined;var t0$18 = undefined;var m$18$0 = undefined;var __at___$2 = undefined;var self$1 = undefined;__at___$2 = this;self$1 = this;m$18$0 = arguments;t0$18 = m$18$0.length;if (t0$18 >= 1 && t0$18 <= 3) {
    obj$4 = m$18$0[0];if (1 >= t0$18) {
      recursive$1 = true;
    } else {
      recursive$1 = m$18$0[1];
    }if (2 >= t0$18) {
      made$0 = {};
    } else {
      made$0 = m$18$0[2];
    }assim$0 = function assim(temp$10$0) {
      var t0$19 = undefined;var bridge$$1102$0 = undefined;var bridge$$1101$0 = undefined;var bridge$$1100$0 = undefined;var m$19 = undefined;var acc$5 = undefined;var temp$11 = undefined;var $$1106$0 = undefined;var m$20 = undefined;var acc$6 = undefined;var temp$12 = undefined;var $$1110$0 = undefined;var ph$11$0 = undefined;var ph$10$0 = undefined;var $$1111$0 = undefined;var bridge$$1099$0 = undefined;var t0$20 = undefined;var data$0 = undefined;var ph$9$0 = undefined;t0$19 = temp$10$0;data$0 = t0$19;ph$9$0 = t0$19;bridge$$1099$0 = ph$9$0;if ((bridge$$1100$0 = bridge$$1099$0, (bridge$$1101$0 = bridge$$1100$0, (bridge$$1102$0 = bridge$$1101$0, bridge$$1102$0 === null || bridge$$1102$0 === void 0) || typeof bridge$$1101$0 === "string") || typeof bridge$$1100$0 === "number") || typeof bridge$$1099$0 === "boolean") {
        return data$0;
      } else {
        t0$20 = ph$9$0;if (Array.isArray(t0$20)) {
          ph$10$0 = t0$20;if (recursive$1) {
            acc$5 = [];temp$11 = null;m$19 = null;$8: for (var _iterator = data$0[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
              m$19 = _step.value;
              var x$5 = undefined;x$5 = m$19;temp$11 = __at___$2.fromObject(x$5, recursive$1, made$0);acc$5.push(temp$11);
            }return acc$5;
          } else {
            return data$0.slice(0);
          }
        } else {
          if (getChecker(Object)(t0$20)) {
            ph$11$0 = t0$20;if (recursive$1) {
              return object((acc$6 = [], temp$12 = null, m$20 = null, (function () {
                $9: for (var _iterator2 = items(data$0)[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
                  m$20 = _step2.value;
                  var k$3 = undefined;var v$3 = undefined;var t0$21 = undefined;var t1$6 = undefined;t0$21 = m$20;if (Array.isArray(t0$21) && (t1$6 = t0$21.length, t1$6 === 2)) {
                    k$3 = t0$21[0];v$3 = t0$21[1];temp$12 = [k$3, __at___$2.fromObject(v$3, recursive$1, made$0)];acc$6.push(temp$12);
                  } else {
                    ___match_error(m$20);
                  }
                }
              })(), acc$6));
            } else {
              return object(items(data$0));
            }
          } else {
            return ___match_error(ph$9$0, "Object? match");
          }
        }
      }
    };tid$4 = obj$4.typeId;if (tid$4 === undefined) {
      if (Object.hasProperty.call(made$0, obj$4.ref)) {
        return send(made$0, obj$4.ref);
      } else {
        throw ErrorFactory(["kaiser", "noRef"]).create("Could not deserialize object reference " + obj$4.ref + " because it is nested recursively and kaiser does not know how to build it.");
      }
    } else {
      if (__at___$2.whiteList && !send(send(__at___$2, "whiteList", true), tid$4)) {
        throw ErrorFactory(["kaiser", "deserialize"]).create("Cannot deserialize " + obj$4.data + ": typeId \"" + tid$4 + "\" is not in the whitelist");
      }if (tid$4 === "native") {
        return obj$4.data;
      } else {
        m$21$0 = send(registry$0, tid$4);if (m$21$0 === void 0) {
          throw ErrorFactory(["kaiser", "deserialize"]).create("No deserializer for typeId \"" + tid$4 + "\"");
        } else {
          policy$7 = m$21$0;if (obj$4.ref !== undefined && policy$7.create) {
            rval$4 = policy$7.create();$targ$23 = rval$4;made$0[obj$4.ref] = $targ$23;policy$7.fill(rval$4, assim$0(obj$4.data));deser$0 = rval$4;
          } else {
            policy$8 = m$21$0;x$6 = policy$8.deserialize(assim$0(obj$4.data));if (obj$4.ref) {
              $targ$24 = x$6;made$0[obj$4.ref] = $targ$24;void 0;
            }deser$0 = x$6;
          }
        }return deser$0;
      }
    }
  } else {
    return ___match_error(m$18$0, "{obj, recursive = true, made = {=}}");
  }
};Serializer$0.prototype.serialize = function serialize(obj$5) {
  var __at___$3 = undefined;var self$2 = undefined;__at___$3 = this;self$2 = this;return JSON.stringify(__at___$3.toObject(obj$5));
};Serializer$0.prototype.deserialize = function deserialize(repr$0) {
  var __at___$4 = undefined;var self$3 = undefined;__at___$4 = this;self$3 = this;return __at___$4.fromObject(JSON.parse(repr$0));
};Serializer$0.prototype.shallowCopy = function (obj$6) {
  var __at___$5 = undefined;var self$4 = undefined;__at___$5 = this;self$4 = this;return __at___$5.fromObject(__at___$5.toObject(obj$6, false), false);
};Serializer$0.prototype.deepCopy = function (obj$7) {
  var __at___$6 = undefined;var self$5 = undefined;__at___$6 = this;self$5 = this;return __at___$6.fromObject(__at___$6.toObject(obj$7));
};__amp____colon__(Serializer$0, __amp____colon__(($targ$25 = "Serializer", accum$13 = {}, accum$13["::name"] = $targ$25, accum$13), ($targ$26 = true, accum$14 = {}, accum$14["::egclass"] = $targ$26, accum$14)));default__minus__serializer$0 = Serializer$0();serialize$0 = default__minus__serializer$0.serialize.bind(default__minus__serializer$0);deserialize$0 = default__minus__serializer$0.deserialize.bind(default__minus__serializer$0);shallow__minus__copy$0 = default__minus__serializer$0.shallowCopy.bind(default__minus__serializer$0);deep__minus__copy$0 = default__minus__serializer$0.deepCopy.bind(default__minus__serializer$0);register$0(Array.prototype, __amp____colon__({ typeId: "builtin:Array", onDuplicate: "replace", target: "direct" }, __amp____colon__((accum$15 = {}, accum$15.serialize = function serialize(obj$8) {
  return obj$8;
}, accum$15), __amp____colon__((accum$16 = {}, accum$16.deserialize = function deserialize(obj$9) {
  return obj$9;
}, accum$16), __amp____colon__((accum$17 = {}, accum$17.create = function create() {
  return [];
}, accum$17), (accum$18 = {}, accum$18.fill = function fill(a$0, obj$10) {
  send(send(a$0, "splice", true), [0, a$0.length].concat(obj$10));return a$0;
}, accum$18))))));register$0(Object.prototype, __amp____colon__({ typeId: "builtin:Object", onDuplicate: "replace", target: "direct" }, __amp____colon__((accum$19 = {}, accum$19.serialize = function serialize(obj$11) {
  return obj$11;
}, accum$19), __amp____colon__((accum$20 = {}, accum$20.deserialize = function deserialize(obj$12) {
  return obj$12;
}, accum$20), __amp____colon__((accum$21 = {}, accum$21.create = function create() {
  return {};
}, accum$21), (accum$22 = {}, accum$22.fill = function fill(o$1, obj$13) {
  __amp____colon__(o$1, obj$13);return o$1;
}, accum$22))))));register$0(Date.prototype, __amp____colon__({ typeId: "builtin:Date", onDuplicate: "replace", target: "direct" }, __amp____colon__((accum$23 = {}, accum$23.serialize = function serialize(obj$14) {
  return String(obj$14);
}, accum$23), (accum$24 = {}, accum$24.deserialize = function deserialize(s$0) {
  return new Date(s$0);
}, accum$24))));register$0(Error.prototype, __amp____colon__({ typeId: "builtin:Error", onDuplicate: "replace", target: "direct" }, __amp____colon__((accum$25 = {}, accum$25.serialize = function serialize(obj$15) {
  var $targ$29 = undefined;var rval$5 = undefined;var $targ$27 = undefined;var $targ$28 = undefined;rval$5 = object(items(obj$15));$targ$27 = obj$15.message;rval$5.message = $targ$27;$targ$28 = obj$15.stack;rval$5.stack = $targ$28;if (send(obj$15, Symbol.errorTags)) {
    $targ$29 = send(obj$15, Symbol.errorTags);rval$5["::tags"] = $targ$29;void 0;
  }return rval$5;
}, accum$25), (accum$26 = {}, accum$26.deserialize = function deserialize(s$1) {
  var m$22 = undefined;var $targ$32 = undefined;var e$2 = undefined;var $targ$30 = undefined;e$2 = Error(s$1.message);m$22 = null;$10: for (var _iterator = items(s$1)[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
    m$22 = _step.value;
    var $targ$31 = undefined;var k$4 = undefined;var v$4 = undefined;var t0$22 = undefined;var t1$7 = undefined;t0$22 = m$22;if (Array.isArray(t0$22) && (t1$7 = t0$22.length, t1$7 === 2 && (k$4 = t0$22[0], v$4 = t0$22[1], !__in__(k$4, ["message", "::tags"])))) {
      $targ$31 = v$4;e$2[k$4] = $targ$31;void 0;
    } else {
      false;
    }
  }$targ$30 = s$1.stack;e$2.stack = $targ$30;if (s$1["::tags"]) {
    $targ$32 = s$1["::tags"];e$2[Symbol.errorTags] = $targ$32;void 0;
  }return e$2;
}, accum$26))));cmds$0 = { register: register$0, registerAll: register__minus__all$0, registerSingleton: register__minus__singleton$0, registerSingletons: register__minus__singletons$0, registerFunction: register__minus__function$0, registerFunctions: register__minus__functions$0 };m$23 = null;$0: for (var _iterator = (function () {
  var tmp$4 = undefined;return (tmp$4 = send(global, "@@KAISER", true), tmp$4 === undefined || tmp$4 === null ? tmp$4 : tmp$4.waitingList) || [];
})()[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
  m$23 = _step.value;
  var cmd$0 = undefined;var args$0 = undefined;var t0$23 = undefined;var t1$8 = undefined;t0$23 = m$23;if (Array.isArray(t0$23) && (t1$8 = t0$23.length, t1$8 === 2)) {
    cmd$0 = t0$23[0];args$0 = t0$23[1];send(send(cmds$0, cmd$0, true), args$0);
  } else {
    ___match_error(m$23);
  }
}$targ$0 = module.exports;global["@@KAISER"] = $targ$0;$targ$33 = TYPEID$0;exports.TYPEID = $targ$33;$targ$34 = get__minus__handler$0;exports.getHandler = $targ$34;$targ$35 = maybe__minus__handler$0;exports.maybeHandler = $targ$35;$targ$36 = extend__minus__handler$0;exports.extendHandler = $targ$36;$targ$37 = Serializer$0;exports.Serializer = $targ$37;$targ$38 = default__minus__serializer$0;exports.defaultSerializer = $targ$38;$targ$39 = serialize$0;exports.serialize = $targ$39;$targ$40 = deserialize$0;exports.deserialize = $targ$40;$targ$41 = shallow__minus__copy$0;exports.shallowCopy = $targ$41;$targ$42 = deep__minus__copy$0;exports.deepCopy = $targ$42;$targ$43 = register$0;exports.register = $targ$43;$targ$44 = register__minus__all$0;exports.registerAll = $targ$44;$targ$45 = register__minus__singleton$0;exports.registerSingleton = $targ$45;$targ$46 = register__minus__singletons$0;exports.registerSingletons = $targ$46;$targ$47 = register__minus__function$0;exports.registerFunction = $targ$47;$targ$48 = register__minus__functions$0;exports.registerFunctions = $targ$48;$targ$49 = registry$0;exports.registry = $targ$49;$targ$50 = true;exports.loaded = $targ$50;void 0;
//# sourceMappingURL=index.js.map

