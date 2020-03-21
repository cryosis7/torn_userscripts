// ==UserScript==
// @name         Don't Train
// @namespace    https://greasyfork.org/en/scripts/383075-don-t-train
// @version      0.1.1
// @description  Disables the gym to prevent you from training while stacking.
// @author       Cryosis
// @downloadURL  https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/dont-train/dont_train.js
// @updateURL    https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/dont-train/dont_train.js
// @match        *.torn.com/gym.php*
// ==/UserScript==

$(window).load(function() {
    $('#gymroot').replaceWith(`
    <div class='m-top10'>
        <div class='title-black top-round' aria-level='5'>STOP</div>
        <div class="bottom-round cont-gray p10">
            <p>You are <span style='color: red; font-weight:bold'>NOT</span> allowed to train right now!
            <br/><br/>
            If you want to train, disable this script.</p>
        </div>
        <hr class="page-head-delimiter m-top10">
    </div>
    `)
    $('.doctorn-widgets').remove();
});