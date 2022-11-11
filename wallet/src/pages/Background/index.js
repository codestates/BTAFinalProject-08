console.log('This is the background page.');
console.log('Put the background scripts here.');

console.log('This is the background page.');
console.log('Put the background scripts here.');

let winid;
// After the tab has been created, open a window to inject the tab
async function openPopup() {
  if (winid !== undefined) {
    try {
      const window = await chrome.windows.get(winid, { populate: true });
      console.log(window, 'window!!!');
      if (window?.tabs?.lengh) {
        const tabs = window.tabs[0];
        chrome.windows.update(tabs.id, {
          active: true,
          url: '/popup.html',
        });
      }

      console.log('ge');
    } catch {
      chrome.windows.create(
        {
          url: '/popup.html',
          type: 'popup',
          width: 430,
          height: 500,
          top: 400,
          left: 400,
        },
        function (win) {
          winid = win.id;
        }
      );
    }
  } else {
    chrome.windows.create(
      {
        url: '/popup.html',
        type: 'popup',
        width: 430,
        height: 500,
        top: 400,
        left: 400,
      },
      function (win) {
        winid = win.id;
      }
    );
  }
}
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  openPopup();
  sendResponse('got it!', request.greeting, sender);
});
