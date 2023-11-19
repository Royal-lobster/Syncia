'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.biomeLocalName = biomeLocalName;
exports.biomeFolderName = biomeFolderName;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _untildify = require('untildify');

var _untildify2 = _interopRequireDefault(_untildify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The file that is in each individual project. Defaults to Biomefile.
function biomeLocalName() {
  return process.env.BIOME_LOCAL_NAME || 'Biomefile';
}

// The folder that contains all the individual configs. Defaults to ~/.biome
function biomeFolderName() {
  return _path2.default.resolve((0, _untildify2.default)(process.env.BIOME_FOLDER_NAME || '~/.biome'));
}