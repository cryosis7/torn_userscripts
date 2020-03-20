// ==UserScript==
// @name         Don't Train
// @namespace    http://cryosis.co/
// @version      0.1
// @description  Disables the gym to prevent you from training while stacking.
// @author       Cryosis
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
