// ==UserScript==
// @name         Max Buy
// @namespace    https://greasyfork.org/en/scripts/398361-max-buy/
// @version      0.2.4
// @description  Auto-maxes the items in Torn shops and bazaars
// @author       Cryosis7 [926640]
// @downloadURL  https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/max-buy/max_buy.js
// @updateURL    https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/max-buy/max_buy.js
// @match        *www.torn.com/shops.php?*
// @match        *www.torn.com/bazaar.php*
// ==/UserScript==

$(function () {
    $(".buy-act-wrap").find('input, [value="1"]').val('100'); // Torn Shops
})

const bazaarWrapper = $('#bazaar-page-wrap')[0];
var observer = new MutationObserver(function (mutations) {
    for (let mutation of mutations) {
        if ($(mutation.addedNodes).find('ul.items-list'))
            $('ul.items-list').children().each((i, listing) =>
                $(listing).find('.act > input').val($(listing).find('span.instock').text()));
    }
});
observer.observe(bazaarWrapper, { childList: true });
