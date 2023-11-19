'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preflight;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// code to run before the app to set up the filesystem
function preflight() {
  // create a ~/.biome folder
  return _fsPromise2.default.stat((0, _constants.biomeFolderName)()).then(exists => {
    return true;
  }).catch(err => {
    return _fsPromise2.default.mkdirp((0, _constants.biomeFolderName)());
  });
}