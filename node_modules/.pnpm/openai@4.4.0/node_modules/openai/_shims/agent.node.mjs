/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
import KeepAliveAgent from 'agentkeepalive';
import { AbortController as AbortControllerPolyfill } from 'abort-controller';
const defaultHttpAgent = new KeepAliveAgent({ keepAlive: true, timeout: 5 * 60 * 1000 });
const defaultHttpsAgent = new KeepAliveAgent.HttpsAgent({ keepAlive: true, timeout: 5 * 60 * 1000 });
// Polyfill global object if needed.
if (typeof AbortController === 'undefined') {
  AbortController = AbortControllerPolyfill;
}
export const getDefaultAgent = (url) => {
  if (defaultHttpsAgent && url.startsWith('https')) return defaultHttpsAgent;
  return defaultHttpAgent;
};
//# sourceMappingURL=agent.node.mjs.map
