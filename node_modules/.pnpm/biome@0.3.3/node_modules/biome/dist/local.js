'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjectMetadata = getProjectMetadata;

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get the project metadata (name) of the project in the cwd,
// or if specified, a custom directory.
function getProjectMetadata(project) {
  let cwd = arguments.length <= 1 || arguments[1] === undefined ? process.cwd() : arguments[1];

  let biomeFile = _path2.default.join(cwd, (0, _constants.biomeLocalName)());
  return _fsPromise2.default.readJson(biomeFile);
}