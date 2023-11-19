#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _preflight = require('./preflight');

var _preflight2 = _interopRequireDefault(_preflight);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _use = require('./use');

var _use2 = _interopRequireDefault(_use);

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _ls = require('./ls');

var _ls2 = _interopRequireDefault(_ls);

var _edit = require('./edit');

var _edit2 = _interopRequireDefault(_edit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(require("../package").version);

// ----------------------------------------------------------------------------
// biome init <project>
// Create a new project
// ----------------------------------------------------------------------------
_commander2.default.command('init [project] [template]').description(`Create a new project with the specified name, and save an alias to this folder. If project is omitted, try to rehydrate a preexisting environment from a Biomefile.`).action((project, template) => {
  (0, _init2.default)(project, template).then(project => {
    console.log(`Created new project ${ project }. Add new vars with ${ _chalk2.default.green("biome add") } or fire it up with ${ _chalk2.default.green("biome use") }.`.replace('\n', ''));
  }).catch(console.error.bind(console));
});

// ----------------------------------------------------------------------------
// biome add [COMMAND]=[value]
// add an environment variable to the project's variables
// ----------------------------------------------------------------------------
_commander2.default.command('add [project]').description("Add a variable to a project. Specify like NAME=value.").action(project => {
  // if the first part was not a project, reset the variable
  if (project.indexOf('=') !== -1) {
    project = undefined;
  }

  // get variables, strip out project if it was passed
  let args = process.argv.slice(3);
  if (args[0].indexOf('=') === -1) {
    args = args.slice(1);
  }

  if (args.length === 0) {
    console.error("No args were passed. Pass variables like NAME=value.");
  } else {
    // collect all matches
    let allMatches = args.map(arg => arg.split('='));
    (0, _add2.default)(project, allMatches).then(out => {
      console.log(`Sourced all variables. Try ${ _chalk2.default.green("biome use") } to try out what you just added.`);
    }).catch(console.log.error.bind(console));
  }
});

// ----------------------------------------------------------------------------
// biome use [project]
// Open a shell containing a project's variables
// ----------------------------------------------------------------------------
_commander2.default.command('use [project]').description("Open a shell with a project's associated variables included.").action(project => {
  (0, _use2.default)(project).catch(console.error.bind(console));
});

// ----------------------------------------------------------------------------
// biome edit [project]
// Open $EDITOR with the project's global json.
// ----------------------------------------------------------------------------
_commander2.default.command('edit <project>').description("Open $EDITOR with the project's associated environment variables.").action(project => {
  (0, _edit2.default)(project).catch(console.error.bind(console));
});

// ----------------------------------------------------------------------------
// biome vars [project]
// Echo all variables to stdout for a project.
// ----------------------------------------------------------------------------
_commander2.default.command('vars [project]').description("Echo all variables.").option('--only-vars', "Only log out a shell script that can be parsed").action((project, _ref) => {
  let options = _ref.options;

  if (options.find(i => i.long === '--only-vars')) {
    console.info = function () {};
  }
  (0, _use.vars)(project).then(console.log.bind(console)).catch(console.error.bind(console));
});

(0, _preflight2.default)().then(out => {
  if (process.argv.length === 2) {
    // list status if no args were specified
    (0, _ls2.default)().catch(console.error.bind(console));
  } else {
    _commander2.default.parse(process.argv);
  }
});