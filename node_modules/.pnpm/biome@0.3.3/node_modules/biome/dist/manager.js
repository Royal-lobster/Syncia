'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.findVariablesFor = findVariablesFor;
exports.getEnv = getEnv;

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _userHome = require('user-home');

var _userHome2 = _interopRequireDefault(_userHome);

var _constants = require('./constants');

var _local = require('./local');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get the project metadata (name) of the project in the cwd,
// or if specified, a custom directory.
function findVariablesFor(project) {
  console.info(`Sourcing variables for ${ project }...`);
  let biomeProject = _path2.default.join((0, _constants.biomeFolderName)(), `${ project }.json`);
  return _fsPromise2.default.readJson(biomeProject).then(vars => {
    if (vars.$include) {
      // find all subprojects, and include them
      return _bluebird2.default.all(vars.$include.map(getEnv)).then(subProjects => {
        subProjects = subProjects.map(i => i[0]); // extract just the values
        let combinedVars = Object.assign.apply(this, subProjects);
        delete vars.$include;
        return _extends({}, vars, combinedVars);
      });
    } else {
      // no including of others
      return vars;
    }
  });
}

// given a project, return the associated environment vars
function getEnv(project) {
  if (project) {
    // return the env variables directly for the project
    return _bluebird2.default.all([findVariablesFor(project), project]);
  } else {
    // look for a local project
    return (0, _local.getProjectMetadata)(project).then(meta => {
      // get local Biomefile
      console.info(`Found Biomefile for ${ meta.name }...`);
      return _bluebird2.default.all([findVariablesFor(meta.name), meta.name]);
    });
  }
}