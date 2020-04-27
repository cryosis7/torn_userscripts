// ==UserScript==
// @name         Fill Bank Vault
// @namespace    https://greasyfork.org/en/scripts/386032-fill-bank-vault
// @version      0.2.2
// @description  Gives you several monetary values to pre-fill the property vault fields
// @author       cryosis7 [926640]
// @downloadURL  https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/fill-vault/fill_vault.js
// @updateURL    https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/fill-vault/fill_vault.js
// @match        *.torn.com/properties.php*
// ==/UserScript==

$(window).load(function() {
    let amounts = ['1m', '5m', '10m', '30m', '50m']
    setListener();
    waitForVault()

    function waitForVault() {
        if ($('div.title-black:contains(Extra large vault)').length)
            addButtons()
        else {
            setTimeout(waitForVault, 500)
        }
    }

    function addButtons() {
        if (!$('.preset-btn').length) {
            let btns = amounts.map(x => `<button class="torn-btn preset-btn" style ="margin-right:10px">$${x}</button>`)
            $('div.title-black:contains(Extra large vault)').before(btns)

            $('.preset-btn').each((index, element) => element.onclick = function() {
                $('.input-money-group').has('[name="withdraw"]').children('[type="text"]').val($(element).text().replace('$', ''));
                $('.input-money-group').has('[name="deposit"]').children('[type="text"]').val($(element).text().replace('$', ''));
                $('.input-money-group').has('[name="withdraw"]').children('[type="text"]').click()
                $('.input-money-group').has('[name="deposit"]').children('[type="text"]').click()
            });
        }
    }

    function setListener() {
        let targetNode = document.querySelectorAll("span#user-money")[0];
        let config = { attributes: true }

        let observer = new MutationObserver(function(mutations) {
            for (let mutation of mutations)
                if (mutation.type === 'attributes')
                    setTimeout(addButtons, 1000)
        })

        observer.observe(targetNode, config)
    }
});