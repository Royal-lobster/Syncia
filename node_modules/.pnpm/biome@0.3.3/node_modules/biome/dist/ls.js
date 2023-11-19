'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ls;

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ls() {
  return _fsPromise2.default.readdir((0, _constants.biomeFolderName)()).then(files => {
    console.info(`(for help, run ${ _chalk2.default.green("biome --help") })`);
    console.info(`(use ${ _chalk2.default.green("biome init [project]") } to create a new project)`);
    console.info(`(use ${ _chalk2.default.green("biome use <name>") } to activate)`);
    console.info("All biomes:");
    files.forEach(file => {
      let name = file.replace(/\.json$/, '');
      console.info(process.env.BIOME_PROJECT && process.env.BIOME_PROJECT.trim() === name.trim() ? _chalk2.default.red('*') : ' ', name);
    });
  });
}