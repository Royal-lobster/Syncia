'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = add;

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _manager = require('./manager');

var _startShell = require('./startShell');

var _startShell2 = _interopRequireDefault(_startShell);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function add(project, variables) {
  return (0, _manager.getEnv)(project).then(_ref => {
    var _ref2 = _slicedToArray(_ref, 2);

    let vars = _ref2[0];
    let project = _ref2[1];

    // add all values
    variables.forEach(_ref3 => {
      var _ref4 = _slicedToArray(_ref3, 2);

      let name = _ref4[0];
      let value = _ref4[1];

      name = name.trim();
      vars[name] = value;
      console.log(`Exported ${ name }="${ value }" inside ${ project }...`);
    });

    // write to config
    let biomeProject = _path2.default.join((0, _constants.biomeFolderName)(), `${ project }.json`);
    return _fsPromise2.default.writeFile(biomeProject, JSON.stringify(vars, null, 2));
  });
}