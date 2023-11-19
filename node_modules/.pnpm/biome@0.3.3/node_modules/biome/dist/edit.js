'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = edit;

var _editor = require('editor');

var _editor2 = _interopRequireDefault(_editor);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function edit(project) {
  let biomeProject = _path2.default.join((0, _constants.biomeFolderName)(), `${ project }.json`);
  (0, _editor2.default)(biomeProject, code => {
    console.log("Finished with code", code);
  });
}