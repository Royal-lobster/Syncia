'use strict';
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getDefaultAgent = void 0;
const agentkeepalive_1 = __importDefault(require('agentkeepalive'));
const abort_controller_1 = require('abort-controller');
const defaultHttpAgent = new agentkeepalive_1.default({ keepAlive: true, timeout: 5 * 60 * 1000 });
const defaultHttpsAgent = new agentkeepalive_1.default.HttpsAgent({
  keepAlive: true,
  timeout: 5 * 60 * 1000,
});
// Polyfill global object if needed.
if (typeof AbortController === 'undefined') {
  AbortController = abort_controller_1.AbortController;
}
const getDefaultAgent = (url) => {
  if (defaultHttpsAgent && url.startsWith('https')) return defaultHttpsAgent;
  return defaultHttpAgent;
};
exports.getDefaultAgent = getDefaultAgent;
//# sourceMappingURL=agent.node.js.map
