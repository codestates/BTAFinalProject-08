export const utils = {
  getSessionStorageData: (key) =>
    new Promise((resolve) => {
      chrome.storage.session.get(key, resolve);
    }),
  getSyncStorageData: (key) =>
    new Promise((resolve) => {
      chrome.storage.sync.get(key, resolve);
    }),
};
