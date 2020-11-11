// ==UserScript==
// @name         Add Attack To Stats Page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a link to a players attack page in the stats page.
// @author       cryosis7 [926640]
// @match        https://www.torn.com/personalstats.php*
// @grant        none
// ==/UserScript==

const ATTACK_URL = "https://www.torn.com/loader2.php?sid=getInAttack&user2ID="

var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
  }

ready(async () => {
    while (!document.querySelector('div[class^="userLabel"]>div[class^="user"]'))
        await sleep(100);

    let el = elementCreator("a", { href: ATTACK_URL + window.location.href.match(/(?<=ID=)\d*/)[0] }, "Attack")
    Object.assign(el.style, { display: "block", padding: "0px 0px 15px 5px" })
    document.querySelector('button[class^="clearUsers"]').parentElement.append(el)
})

function elementCreator(tag, options, textContent) {
    const el = Object.assign(document.createElement(tag), options);
    if (textContent)
        el.textContent = textContent;
    return el;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// let players = document.querySelector('ul.user-info-list-wrap').children;
// [...players].forEach(player => {
//     if (!player.querySelector('a[href="hospitalview.php"]') && !player.querySelector('li[title^="<b>Federal jail"]')) {
//         window.open("https://www.torn.com/personalstats.php?ID=" + player.className.replace("user", "") + "&stats=attackslost&from=1%20month")
//     }
// });