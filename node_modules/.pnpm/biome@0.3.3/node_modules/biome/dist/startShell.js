'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startShell;

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _child_process = require('child_process');

var _userHome = require('user-home');

var _userHome2 = _interopRequireDefault(_userHome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startShell(project) {
  let sourceVars = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  // set identifying variable
  process.env.BIOME_SHELL = true;
  process.env.BIOME_PROJECT = project;

  // source any custom variables
  for (let variable in sourceVars) {
    process.env[variable] = sourceVars[variable];
  }

  // start the shell
  if (process.env.SHELL) {
    console.info("This is a biome generated shell.");
    console.info("All variables from the", project, "project have been sourced for you.");
    (0, _child_process.spawnSync)(process.env.SHELL, ['-i'], { stdio: 'inherit' });
  } else {
    console.log("Please put the location of your shell in $SHELL.");
  }
}