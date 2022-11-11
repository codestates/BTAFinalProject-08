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

printLine("Using the 'printLine' function from the Print Module");
