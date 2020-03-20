// ==UserScript==
// @name         Clean Travel
// @namespace    http://cryosis.co/
// @version      0.3
// @description  Cleaner travel screen
// @author       Cryosis
// @match        *.torn.com/index.php*
// ==/UserScript==

$(window).load(function() {
    if ($('h4#skip-to-content:contains(Traveling)').length)
    {
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
