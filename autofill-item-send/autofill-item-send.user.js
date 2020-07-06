// ==UserScript==
// @name         Autofill Item Send
// @namespace    https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/
// @version      0.1
// @description  Auto-fills a persons name to send an item to.
// @author       Cryosis7 [926640]
// @match        *www.torn.com/item.php*
// ==/UserScript==

const NAME = "Cryosis7 [926640]";

window.onload = run;

async function run() {
    while (!document.querySelectorAll('.items-wrap').length)
        await new this.Promise(resolve => this.setTimeout(resolve, 50))

    new MutationObserver((mutations) => {
        mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE)
                node.querySelectorAll('input[name="userID"]').forEach(setField);
        }))
    }).observe(document.querySelector('.items-wrap'), { subtree: true, childList: true })
}

/**
 * Uses horribly hacky work around since Torn's now using React.
 * @param {Element} item The input element to set the value of.
 */
function setField(item) {
    let lastValue = item.value;
    item.value = NAME;
    let event = new Event('input', { bubbles: true });
    event.simulated = true;
    let tracker = item._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    item.dispatchEvent(event);
}