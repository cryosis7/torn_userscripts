// ==UserScript==
// @name         Massive Chain Timer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Creates a massive chain timer that helps with chain watching.
// @author       Cryosis7 [926640]
// @match        https://www.torn.com/*
// @grant        none
// ==/UserScript==

const INCLUDE_CHAIN_COUNT = false;

window.onload = function () {
    if (INCLUDE_CHAIN_COUNT) {
        $('#barChain :not([class^="bar-value"], [class^="bar-timeleft"], [class^="bar-stats"])').remove();
        $('#barChain :first-child').css({ 'display': 'block' });
        $('#barChain :first-child').children().css({
            'color': 'black',
            'background': 'wheat',
            'font-size': 'xx-large',
            'font-weight': '900',
            'margin': '2px auto',
            'border': '5px solid red',
            'padding': '0px 5px 5px 5px',
            'text-align': 'center',
            'display': 'block'
        })
    }
    else {
        $('a#barChain').children().remove(':not([class^="bar-stats"])');
        $('a#barChain').children(0).find(':not([class^="bar-timeleft"])').remove();
        $('p[class^="bar-timeleft"]').css({
            'color': ' black',
            'background': ' wheat',
            'font-size': ' xx-large',
            'font-weight': ' 900',
            'margin': ' 0 auto',
            'border': ' 5px solid red',
            'padding': ' 10px',
        })
    }
};