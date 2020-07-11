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

    let textbox = elementCreator('input', { type: 'textbox', id: 'beneficiaryTextbox', class: 'm-right5', style: 'border: 1px solid #333; border-radius: 4px;' });
    let label = elementCreator('label', { class: 'm-right5' }, '<b>Enter user to send items to</b>');
    let textboxWrapper = elementCreator('div', { style: 'margin: 5px' });
    textboxWrapper.appendChild(label);
    textboxWrapper.appendChild(textbox);
    document.querySelector('.main-items-cont-wrap').insertBefore(textboxWrapper, document.querySelector('.items-wrap'))
}

/**
 * Uses horribly hacky work around since Torn's now using React.
 * @param {Element} item The input element to set the value of.
 */
function setField(item) {
    let lastValue = item.value;
    item.value = document.querySelector('#beneficiaryTextbox').value || NAME;
    let event = new Event('input', { bubbles: true });
    event.simulated = true;
    let tracker = item._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    item.dispatchEvent(event);
}

/**
 * Creates an HTML element according to the given parameters
 * 
 * @param {String} type The HTML type to create ('div')
 * @param {Object} attributes Attributes to set {'class': 'wrapper'}
 * @param {String} html 'Inner text/html to set'
 */
function elementCreator(type = 'div', attributes, html) {
    let el = document.createElement(type);
    for (let attribute in attributes)
        el.setAttribute(attribute, attributes[attribute])
    if (html) el.innerHTML = html;
    return el
}