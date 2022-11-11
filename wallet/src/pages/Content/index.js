import { printLine } from './modules/print';

console.log('Content script works!, 11');
console.log('Must reload extension for modifications to take effect.');

const container = document.head || document.documentElement;
const scriptElement = document.createElement('script');
scriptElement.src = chrome.runtime.getURL('injectScript.bundle.js');
scriptElement.type = 'text/javascript';
chrome.storage.sync.get((item) => console.log({ item }));
container.insertBefore(scriptElement, container.children[0]);
scriptElement.remove();

if (document.readyState !== 'complete') {
  window.addEventListener('load', afterWindowLoaded);
} else {
  afterWindowLoaded();
}

function afterWindowLoaded() {
  //Everything that needs to happen after the window is fully loaded.
  document.getElementById('gege').addEventListener('click', function () {
    chrome.runtime.sendMessage({ greeting: 'hello' }, function (response) {
      console.log(response);
    });
  });
}

printLine("Using the 'printLine' function from the Print Module");