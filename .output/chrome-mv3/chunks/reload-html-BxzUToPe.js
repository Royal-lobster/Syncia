(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function print(method, ...args) {
  if (typeof args[0] === "string") {
    const message = args.shift();
    method(`[wxt] ${message}`, ...args);
  } else {
    method("[wxt]", ...args);
  }
}
const logger = {
  debug: (...args) => print(console.debug, ...args),
  log: (...args) => print(console.log, ...args),
  warn: (...args) => print(console.warn, ...args),
  error: (...args) => print(console.error, ...args)
};
let ws;
function getDevServerWebSocket() {
  if (ws == null) {
    const serverUrl = `${"ws:"}//${"localhost"}:${3e3}`;
    logger.debug("Connecting to dev server @", serverUrl);
    ws = new WebSocket(serverUrl, "vite-hmr");
    ws.addWxtEventListener = ws.addEventListener.bind(ws);
    ws.sendCustom = (event, payload) => ws == null ? void 0 : ws.send(JSON.stringify({ type: "custom", event, payload }));
    ws.addEventListener("open", () => {
      logger.debug("Connected to dev server");
    });
    ws.addEventListener("close", () => {
      logger.debug("Disconnected from dev server");
    });
    ws.addEventListener("error", (event) => {
      logger.error("Failed to connect to dev server", event);
    });
    ws.addEventListener("message", (e) => {
      try {
        const message = JSON.parse(e.data);
        if (message.type === "custom") {
          ws == null ? void 0 : ws.dispatchEvent(
            new CustomEvent(message.event, { detail: message.data })
          );
        }
      } catch (err) {
        logger.error("Failed to handle message", err);
      }
    });
  }
  return ws;
}
{
  try {
    const ws2 = getDevServerWebSocket();
    ws2.addWxtEventListener("wxt:reload-page", (event) => {
      if (event.detail === location.pathname.substring(1))
        location.reload();
    });
  } catch (err) {
    logger.error("Failed to setup web socket connection with dev server", err);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsb2FkLWh0bWwtQnh6VVRvUGUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS93eHRAMC4xOS4yM19AdHlwZXMrbm9kZUAxOC4xOS41N19yb2xsdXBANC4yOS4xX3lhbWxAMi42LjAvbm9kZV9tb2R1bGVzL3d4dC9kaXN0L3ZpcnR1YWwvcmVsb2FkLWh0bWwubWpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHByaW50KG1ldGhvZCwgLi4uYXJncykge1xuICBpZiAoaW1wb3J0Lm1ldGEuZW52Lk1PREUgPT09IFwicHJvZHVjdGlvblwiKVxuICAgIHJldHVybjtcbiAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGFyZ3Muc2hpZnQoKTtcbiAgICBtZXRob2QoYFt3eHRdICR7bWVzc2FnZX1gLCAuLi5hcmdzKTtcbiAgfSBlbHNlIHtcbiAgICBtZXRob2QoXCJbd3h0XVwiLCAuLi5hcmdzKTtcbiAgfVxufVxuY29uc3QgbG9nZ2VyID0ge1xuICBkZWJ1ZzogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUuZGVidWcsIC4uLmFyZ3MpLFxuICBsb2c6ICguLi5hcmdzKSA9PiBwcmludChjb25zb2xlLmxvZywgLi4uYXJncyksXG4gIHdhcm46ICguLi5hcmdzKSA9PiBwcmludChjb25zb2xlLndhcm4sIC4uLmFyZ3MpLFxuICBlcnJvcjogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUuZXJyb3IsIC4uLmFyZ3MpXG59O1xuXG5sZXQgd3M7XG5mdW5jdGlvbiBnZXREZXZTZXJ2ZXJXZWJTb2NrZXQoKSB7XG4gIGlmIChpbXBvcnQubWV0YS5lbnYuQ09NTUFORCAhPT0gXCJzZXJ2ZVwiKVxuICAgIHRocm93IEVycm9yKFxuICAgICAgXCJNdXN0IGJlIHJ1bm5pbmcgV1hUIGRldiBjb21tYW5kIHRvIGNvbm5lY3QgdG8gY2FsbCBnZXREZXZTZXJ2ZXJXZWJTb2NrZXQoKVwiXG4gICAgKTtcbiAgaWYgKHdzID09IG51bGwpIHtcbiAgICBjb25zdCBzZXJ2ZXJVcmwgPSBgJHtfX0RFVl9TRVJWRVJfUFJPVE9DT0xfX30vLyR7X19ERVZfU0VSVkVSX0hPU1ROQU1FX199OiR7X19ERVZfU0VSVkVSX1BPUlRfX31gO1xuICAgIGxvZ2dlci5kZWJ1ZyhcIkNvbm5lY3RpbmcgdG8gZGV2IHNlcnZlciBAXCIsIHNlcnZlclVybCk7XG4gICAgd3MgPSBuZXcgV2ViU29ja2V0KHNlcnZlclVybCwgXCJ2aXRlLWhtclwiKTtcbiAgICB3cy5hZGRXeHRFdmVudExpc3RlbmVyID0gd3MuYWRkRXZlbnRMaXN0ZW5lci5iaW5kKHdzKTtcbiAgICB3cy5zZW5kQ3VzdG9tID0gKGV2ZW50LCBwYXlsb2FkKSA9PiB3cz8uc2VuZChKU09OLnN0cmluZ2lmeSh7IHR5cGU6IFwiY3VzdG9tXCIsIGV2ZW50LCBwYXlsb2FkIH0pKTtcbiAgICB3cy5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCAoKSA9PiB7XG4gICAgICBsb2dnZXIuZGVidWcoXCJDb25uZWN0ZWQgdG8gZGV2IHNlcnZlclwiKTtcbiAgICB9KTtcbiAgICB3cy5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwgKCkgPT4ge1xuICAgICAgbG9nZ2VyLmRlYnVnKFwiRGlzY29ubmVjdGVkIGZyb20gZGV2IHNlcnZlclwiKTtcbiAgICB9KTtcbiAgICB3cy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gY29ubmVjdCB0byBkZXYgc2VydmVyXCIsIGV2ZW50KTtcbiAgICB9KTtcbiAgICB3cy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZSkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcbiAgICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJjdXN0b21cIikge1xuICAgICAgICAgIHdzPy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KG1lc3NhZ2UuZXZlbnQsIHsgZGV0YWlsOiBtZXNzYWdlLmRhdGEgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIGhhbmRsZSBtZXNzYWdlXCIsIGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHdzO1xufVxuXG5pZiAoaW1wb3J0Lm1ldGEuZW52LkNPTU1BTkQgPT09IFwic2VydmVcIikge1xuICB0cnkge1xuICAgIGNvbnN0IHdzID0gZ2V0RGV2U2VydmVyV2ViU29ja2V0KCk7XG4gICAgd3MuYWRkV3h0RXZlbnRMaXN0ZW5lcihcInd4dDpyZWxvYWQtcGFnZVwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5kZXRhaWwgPT09IGxvY2F0aW9uLnBhdGhuYW1lLnN1YnN0cmluZygxKSlcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBzZXR1cCB3ZWIgc29ja2V0IGNvbm5lY3Rpb24gd2l0aCBkZXYgc2VydmVyXCIsIGVycik7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJ3cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVMsTUFBTSxXQUFXLE1BQU07QUFHOUIsTUFBSSxPQUFPLEtBQUssQ0FBQyxNQUFNLFVBQVU7QUFDekIsVUFBQSxVQUFVLEtBQUssTUFBTTtBQUMzQixXQUFPLFNBQVMsT0FBTyxJQUFJLEdBQUcsSUFBSTtBQUFBLEVBQUEsT0FDN0I7QUFDRSxXQUFBLFNBQVMsR0FBRyxJQUFJO0FBQUEsRUFBQTtBQUUzQjtBQUNBLE1BQU0sU0FBUztBQUFBLEVBQ2IsT0FBTyxJQUFJLFNBQVMsTUFBTSxRQUFRLE9BQU8sR0FBRyxJQUFJO0FBQUEsRUFDaEQsS0FBSyxJQUFJLFNBQVMsTUFBTSxRQUFRLEtBQUssR0FBRyxJQUFJO0FBQUEsRUFDNUMsTUFBTSxJQUFJLFNBQVMsTUFBTSxRQUFRLE1BQU0sR0FBRyxJQUFJO0FBQUEsRUFDOUMsT0FBTyxJQUFJLFNBQVMsTUFBTSxRQUFRLE9BQU8sR0FBRyxJQUFJO0FBQ2xEO0FBRUEsSUFBSTtBQUNKLFNBQVMsd0JBQXdCO0FBSy9CLE1BQUksTUFBTSxNQUFNO0FBQ2QsVUFBTSxZQUFZLEdBQUcsS0FBdUIsS0FBSyxXQUF1QixJQUFJLEdBQW1CO0FBQ3hGLFdBQUEsTUFBTSw4QkFBOEIsU0FBUztBQUMvQyxTQUFBLElBQUksVUFBVSxXQUFXLFVBQVU7QUFDeEMsT0FBRyxzQkFBc0IsR0FBRyxpQkFBaUIsS0FBSyxFQUFFO0FBQ3BELE9BQUcsYUFBYSxDQUFDLE9BQU8sWUFBWSx5QkFBSSxLQUFLLEtBQUssVUFBVSxFQUFFLE1BQU0sVUFBVSxPQUFPLFFBQVMsQ0FBQTtBQUMzRixPQUFBLGlCQUFpQixRQUFRLE1BQU07QUFDaEMsYUFBTyxNQUFNLHlCQUF5QjtBQUFBLElBQUEsQ0FDdkM7QUFDRSxPQUFBLGlCQUFpQixTQUFTLE1BQU07QUFDakMsYUFBTyxNQUFNLDhCQUE4QjtBQUFBLElBQUEsQ0FDNUM7QUFDRSxPQUFBLGlCQUFpQixTQUFTLENBQUMsVUFBVTtBQUMvQixhQUFBLE1BQU0sbUNBQW1DLEtBQUs7QUFBQSxJQUFBLENBQ3REO0FBQ0UsT0FBQSxpQkFBaUIsV0FBVyxDQUFDLE1BQU07QUFDaEMsVUFBQTtBQUNGLGNBQU0sVUFBVSxLQUFLLE1BQU0sRUFBRSxJQUFJO0FBQzdCLFlBQUEsUUFBUSxTQUFTLFVBQVU7QUFDekIsbUNBQUE7QUFBQSxZQUNGLElBQUksWUFBWSxRQUFRLE9BQU8sRUFBRSxRQUFRLFFBQVEsS0FBTSxDQUFBO0FBQUE7QUFBQSxRQUN6RDtBQUFBLGVBRUssS0FBSztBQUNMLGVBQUEsTUFBTSw0QkFBNEIsR0FBRztBQUFBLE1BQUE7QUFBQSxJQUM5QyxDQUNEO0FBQUEsRUFBQTtBQUVJLFNBQUE7QUFDVDtBQUV5QztBQUNuQyxNQUFBO0FBQ0YsVUFBTUEsTUFBSyxzQkFBc0I7QUFDakNBLFFBQUcsb0JBQW9CLG1CQUFtQixDQUFDLFVBQVU7QUFDbkQsVUFBSSxNQUFNLFdBQVcsU0FBUyxTQUFTLFVBQVUsQ0FBQztBQUNoRCxpQkFBUyxPQUFPO0FBQUEsSUFBQSxDQUNuQjtBQUFBLFdBQ00sS0FBSztBQUNMLFdBQUEsTUFBTSx5REFBeUQsR0FBRztBQUFBLEVBQUE7QUFFN0U7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==
