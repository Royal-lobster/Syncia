'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReadableStream = void 0;
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
const web_streams_polyfill_1 = require('web-streams-polyfill');
Object.defineProperty(exports, 'ReadableStream', {
  enumerable: true,
  get: function () {
    return web_streams_polyfill_1.ReadableStream;
  },
});
//# sourceMappingURL=ReadableStream.node.js.map
