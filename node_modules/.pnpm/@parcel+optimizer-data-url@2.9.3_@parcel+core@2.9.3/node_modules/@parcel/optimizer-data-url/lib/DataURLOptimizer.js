"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _plugin() {
  const data = require("@parcel/plugin");
  _plugin = function () {
    return data;
  };
  return data;
}
function _utils() {
  const data = require("@parcel/utils");
  _utils = function () {
    return data;
  };
  return data;
}
function _mime() {
  const data = _interopRequireDefault(require("mime"));
  _mime = function () {
    return data;
  };
  return data;
}
function _isbinaryfile() {
  const data = require("isbinaryfile");
  _isbinaryfile = function () {
    return data;
  };
  return data;
}
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const fixedEncodeURIComponent = str => {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
};
var _default = new (_plugin().Optimizer)({
  async optimize({
    bundle,
    contents
  }) {
    var _mime$getType;
    let bufferContents = await (0, _utils().blobToBuffer)(contents);
    let hasBinaryContent = await (0, _isbinaryfile().isBinaryFile)(bufferContents);

    // Follows the data url format referenced here:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    let mimeType = (_mime$getType = _mime().default.getType(bundle.name)) !== null && _mime$getType !== void 0 ? _mime$getType : '';
    let encoding = hasBinaryContent ? ';base64' : '';
    let content = fixedEncodeURIComponent(hasBinaryContent ? bufferContents.toString('base64') : bufferContents.toString());
    return {
      contents: `data:${mimeType}${encoding},${content}`
    };
  }
});
exports.default = _default;