// ==UserScript==
// @name         Max Buy
// @namespace    https://greasyfork.org/en/scripts/398361-max-buy/
// @version      0.3.0
// @description  Auto-maxes the items in Torn shops and bazaars
// @author       Cryosis7 [926640]
// @downloadURL  https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/max-buy/max_buy.js
// @updateURL    https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/max-buy/max_buy.js
// @match        *www.torn.com/shops.php?*
// @match        *www.torn.com/bazaar.php*
// ==/UserScript==


// Max Torn Shops
document.querySelectorAll('.buy-act-wrap').forEach(item => item.querySelector('input[value="1"]').value = 100)

// Places an observer on the bazaar root, when it has loaded the bazaar contents it will call observeItem on each listing in the bazaar.
if (document.querySelector('#bazaarroot'))
    new MutationObserver((mutations) => {
        mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.classList && Array.from(node.classList).findIndex(element => element.includes("itemsContainner")) !== -1)
                node.querySelectorAll('div[class^="rowItems"] > [class^="item"]').forEach(observeItem);
        }))
    }).observe(document.querySelector('#bazaarroot'), { subtree: true, childList: true })

/**
 * Sets an observer on the item, to watch for when the user clicks on the shopping cart icon and set the quantity
 * @param {Node} item 
 */
function observeItem(item) {
    let itemObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length === 1 && mutation.addedNodes[0].nodeType === 1 &&
                Array.from(mutation.addedNodes[0].classList).findIndex(element => element.includes("buyMenu")) !== -1) {
                setQuantity(mutation.addedNodes[0])
            }
        })
    });
    itemObserver.observe(item, { subtree: true, childList: true })
}

function setQuantity(item) {
    item.querySelector('input').value = item.querySelector('span[class^="amount"]').innerText.replace(/\D/g, '');
}