/*
export enum BrowserType {
  chrome = "Chrome",
  firefox = "FF",
}

export const getBroswer = () => {
  const ua = navigator.userAgent;
  if (ua.indexOf("Firefox") > -1) {
    return BrowserType.firefox;
  }
  if (ua.indexOf("Chrome") > -1) {
    return BrowserType.chrome;
  }
 };
*/

import PromptSettings from "../components/Settings/Sections/PromptSettings";

/**
 * Get the url of the active tab
 * @returns {string} url of the active tab
 */
export const getActiveTabUrl = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      if (activeTab.url) {
        const url = new URL(activeTab.url);
        resolve(`${url.protocol}//${url.hostname}`);
      } else {
        reject(new Error("Unable to get active tab URL."));
      }
    });
  });
};
