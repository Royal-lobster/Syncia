'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = fetchTemplate;
exports.default = init;

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _untildify = require('untildify');

var _untildify2 = _interopRequireDefault(_untildify);

var _inquirerPromise = require('inquirer-promise');

var _inquirerPromise2 = _interopRequireDefault(_inquirerPromise);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// given a template url, return user-populated data.
function fetchTemplate(data) {
  if (data && Object.keys(data).length >= 0) {
    let keys = Object.keys(data);
    return _inquirerPromise2.default.prompt(keys.map(key => {
      let value = data[key];
      return {
        type: "input",
        message: `Enter a value for ${ key }`,
        name: key,
        default: value
      };
    }));
  } else {
    console.error("The passed template URL doesn't return JSON. Learn more about template URLs at https://github.com/1egoman/biome/blob/master/resources/templateURL.md");
    return;
  }
}

function init(project, template) {
  let biomeFile = _path2.default.join(process.cwd(), (0, _constants.biomeLocalName)());

  // step 0: Read the Biomefile and see if there's a template
  return _fsPromise2.default.readJSON(biomeFile).catch(error => {
    return {}; // No biomefile
  }).then(biomefile => {
    project = biomefile.name || project;

    if (!project || project.length === 0) {
      console.error("Project names need to be at least 1 character long.");
      throw new Error("Project names need to be at least 1 character long.");
    }

    if (template || typeof biomefile.template === "string") {
      // a template url
      return (0, _requestPromise2.default)(template || biomefile.template).then(JSON.parse).then(fetchTemplate);
    } else if (biomefile.template) {
      return fetchTemplate(biomefile.template);
    } else {
      // no template
      return _bluebird2.default.resolve({});
    }
  }).then(data => {
    // step 1: write stuff to local Biomefile
    return _bluebird2.default.all([data, _fsPromise2.default.writeFile(biomeFile, JSON.stringify({
      name: project,
      template
    }, null, 2))]);
  }).then(_ref => {
    var _ref2 = _slicedToArray(_ref, 2);

    let data = _ref2[0];
    let file = _ref2[1];

    // step 2: write creds file in the ~/.biome folder
    let biomeProject = _path2.default.join((0, _constants.biomeFolderName)(), `${ project }.json`);
    return _fsPromise2.default.writeFile(biomeProject, JSON.stringify(data, null, 2));
  }).then(f => project);
}