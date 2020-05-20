// ==UserScript==
// @name         Clean Travel
// @namespace    https://greasyfork.org/en/scripts/386587-clean-travel
// @version      0.3.1
// @description  Cleaner travel screen
// @author       cryosis7 [926640]
// @downloadURL  https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/clean-travel/clean_travel.js
// @updateURL    https://raw.githubusercontent.com/cryosis7/torn_userscripts/master/clean-travel/clean_travel.js
// @match        *.torn.com/index.php*
// ==/UserScript==

$(window).load(function() {
    if ($('h4#skip-to-content:contains(Traveling)').length) {
        let forums = $('a:contains(Forums)');
        $(forums).appendTo($('#top-page-links-list'));
        $(forums).addClass('right line-h24');
        $(forums).css('textDecoration', 'none');

        let settings = $('a[href="/preferences.php"]')
        $(settings).appendTo($('#top-page-links-list'));
        $(settings).addClass('right line-h24');
        $(settings).removeClass('top_header_link');
        $(settings).text('Settings');
        $(settings).css('textDecoration', 'none');

        $('[class|="custom-bg"]').css('background-color', 'white');
        $('body').css('background', 'none');
        $('.stage').remove();
        $('[class*="tooltip"]').remove();
        $('[class*="popup"]').remove();
        $('[class*="header"]').remove();
        $('.delimiter-999').eq(0).remove();
    }
});