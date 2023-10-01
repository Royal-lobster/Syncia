export const getCurrentSiteHostName = (): Promise<string> =>
  new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0] as any;
      if (tab) {
        const data = JSON.parse(tab.vivExtData);
        const url = data.urlForThumbnail;
        const title = new URL(url).hostname;
        resolve(title);
      }
    });
  });
