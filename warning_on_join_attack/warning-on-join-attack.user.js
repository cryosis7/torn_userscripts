// ==UserScript==
// @name         Warning On Join Attack
// @namespace    https://github.com/cryosis7/torn_userscripts
// @version      0.1
// @description  Helps you keep from joining an attack when you don't want to.
// @author       Cryosis7 [926640]
// @match        https://www.torn.com/loader.php?sid=attack&user2ID=*
// @grant        none
// ==/UserScript==

run();

async function run() {
    while (!document.querySelector('div[class^="dialog"]'))
        await sleep(10);

    let x = document.querySelector('div[class^="colored"]');
    if (x.innerText === "JOIN FIGHT")
        x.style.background = 'linear-gradient(180deg, hsla(0,0%,100%,0.65),rgba(255,203,42,0.5))';
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}