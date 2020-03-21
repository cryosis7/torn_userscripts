// ==UserScript==
// @name         Max Bits 'n' Bobs Filter
// @namespace    https://greasyfork.org/en/scripts/398355-max-bits-n-bobs-filter
// @version      0.2.1
// @description  Auto-Maxes the items in Bits 'n' Bobs
// @author       Cryosis7 [926640]
// @downloadURL  https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/max-bitsnbobs/Max%20Bits%20'n%20Bobs.js
// @updateURL    https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/max-bitsnbobs/Max%20Bits%20'n%20Bobs.js
// @match        *.torn.com/shops.php?step=bitsnbobs*
// ==/UserScript==

$(window).load(function () {
    $(".buy-act-wrap").find('input, [value="1"]').val('100');
})