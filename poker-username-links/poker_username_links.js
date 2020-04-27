// ==UserScript==
// @name         Poker Username Links
// @namespace    https://greasyfork.org/en/scripts/ TODO:
// @version      1.0
// @description  Turns usernames into links in the poker room.
// @author       Cryosis7 [926640]
// @match        https://www.torn.com/loader.php?sid=holdem
// ==/UserScript==
'use strict';

const players = [];

new MutationObserver(mutationList => mutationList.forEach(mutation => {
    if (mutation.addedNodes.length && !mutation.addedNodes[0].firstChild.className.includes('sitin-btn'))
        addProfileLink(mutation.addedNodes[0].firstChild);
    else if (mutation.type === 'attributes')
        addProfileLink(mutation.target);
    if (mutation.type === 'attributes')
        console.log(mutation);


})).observe(document.querySelector('#tableWrap'), { childList: true, subtree: true, attributeFilter: ['id'], attributeOldValue: true })


/**
 * Turns the players name into a link to their profile.
 * @param {HTML Element} playerNode 
 */
function addProfileLink(playerElement) {
    console.log('Adding Link To: ');
    console.log(playerElement);
    let playerId = playerElement.id.split('-')[1];
    let name = playerElement.querySelector('[class^="name_"').innerText;
    playerElement.querySelector('[class^="name_"]').innerHTML = `<a href="https://www.torn.com/profiles.php?XID=${playerId}">${name}</a>`
}