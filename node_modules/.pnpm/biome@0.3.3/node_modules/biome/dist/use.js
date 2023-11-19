'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = use;
exports.vars = vars;

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _manager = require('./manager');

var _startShell = require('./startShell');

var _startShell2 = _interopRequireDefault(_startShell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// given a project, open a subshell with its associated variables
function use(project) {
  return (0, _manager.getEnv)(project).then(_ref => {
    var _ref2 = _slicedToArray(_ref, 2);

    let vars = _ref2[0];
    let project = _ref2[1];

    return (0, _startShell2.default)(project, vars);
  });
}

// # run this after every cd
// [[ -f /tmp/sourcefrombiome ]] && source /tmp/sourcefrombiome && rm /tmp/sourcefrombiome

// echo vars in shell format
function vars(project) {
  return (0, _manager.getEnv)(project).then(_ref3 => {
    var _ref4 = _slicedToArray(_ref3, 2);

    let vars = _ref4[0];
    let project = _ref4[1];

    // turn make all the variables into a string
    let shellVars = `
# Biome config
export BIOME_SHELL=true
export BIOME_PROJECT="${ project }"
export BIOME_NVARS="${ Object.keys(vars).length }"\n
# Project variables
`.trim() + '\n';

    // set each one
    for (let variable in vars) {
      shellVars += `export ${ variable }="${ vars[variable] }"\n`;
    }

    // add an unset function
    if (Object.keys(vars).length > 0) {
      shellVars += "function envoff {\n";
      for (let variable in vars) {
        shellVars += `  unset ${ variable }\n`;
      }
      shellVars += "}";
    }

    // write to tmp
    return shellVars;
  });
}