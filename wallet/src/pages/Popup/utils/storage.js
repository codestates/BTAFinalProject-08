export const utils = {
  getStorageData: (key) =>
    new Promise((resolve) => {
      chrome.storage.session.get(key, resolve);
    }),
};
