// ==UserScript==
// @name         Max Bits 'n' Bobs Filter
// @namespace    http://cryosis.co/
// @version      0.2
// @description  Auto-Maxes the items in Bits 'n' Bobs
// @author       Cryosis7 [926640]
// @match        *.torn.com/shops.php?step=bitsnbobs*
// ==/UserScript==

$(window).load(function () {
    let itemList = $(".buy-act-wrap");
    $(itemList).find('input, [value="1"]').val('100');
})