// ==UserScript==
// @name         Auto Select Car
// @namespace    https://greasyfork.org/en/scripts/398078-auto-select-car
// @version      1.1.1
// @description  Keeps a record of which car you want to use for each racetrack and removes every other car from the selection menu.
// @author       Cryosis7 [926640]
// @match        https://www.torn.com/loader.php?sid=racing
// ==/UserScript==

/**
 * Car stats are used to distinguish between the different cars.
 * Only requires the name field, which can be a substring (NSX, LFA etc.)
 * The qualifiers like 'top speed' are used to differeniate between different versions of the same model car (Dirt NSX vs Tarmac NSX)
 */
const cars = {
    'Ferrari458_TarmacLong3': { 'name': 'Ferrari 458' },
    'LexusLFA_TarmacLong3': { 'name': 'LFA', 'Top Speed': '260' },
    'HondaNSX_TarmacShort3': { 'name': 'NSX', 'Top Speed': '242', 'Brake Dist': '72' },
    'HondaNSX_DirtShort3': { 'name': 'NSX', 'Top Speed': '240', 'Brake Dist': '72' }
};

/**
 * Used for mapping the race-track to the car you want to race.
 * TODO: allow for multiple cars on one track.
 */
const car_track_mappings = {
    'Docks': cars.LexusLFA_TarmacLong3,
    'Uptown': cars.LexusLFA_TarmacLong3,
    'Withdrawal': cars.LexusLFA_TarmacLong3,
    'Speedway': cars.LexusLFA_TarmacLong3,
    'Convict': cars.LexusLFA_TarmacLong3,
    'Meltdown': cars.HondaNSX_TarmacShort3,
    'Industrial': cars.HondaNSX_TarmacShort3,
    'Vector': cars.HondaNSX_TarmacShort3,
    'Underdog': cars.HondaNSX_TarmacShort3,
    'Commerce': cars.HondaNSX_TarmacShort3,
    'Sewage': cars.HondaNSX_TarmacShort3,
    'Mudpit': cars.HondaNSX_DirtShort3,
    'Two Islands': cars.HondaNSX_DirtShort3,
    'Stone Park': cars.HondaNSX_DirtShort3,
    'Parkland': cars.HondaNSX_DirtShort3,
    'Hammerhead': cars.HondaNSX_DirtShort3
};

// Creates the observer when the page loads.
$(() => createObserver());

/**
 * Creates an observer that watches to see when the player tries to change their car.
 */
function createObserver() {
    const raceContainer = $('#racingAdditionalContainer')[0];
    var observer = new MutationObserver(function(mutations) {
        for (let mutation of mutations) {
            if ($(mutation.addedNodes).find('ul.enlist-list') && $('div.enlisted-btn-wrap:contains("Official race")').length)
                filterCars($(mutation.addedNodes).find('ul.enlist-list').children())
        }
    });

    observer.observe(raceContainer, { childList: true });
}

/**
 * Goes through the list of cars, checking them against the criteria.
 * If the car does not meet the criteria, the car is hidden.
 * @param {The selector for the list of cars.} carList 
 */
function filterCars(carList) {
    var racetrack = $('div.enlisted-btn-wrap:contains("Official race")').text().trim().split(' - ')[0];
    var desiredCar = car_track_mappings[racetrack];
    console.log(`Racing ${desiredCar['name']} on ${racetrack}`);

    $(carList).each((index, element) => {
        let correctCar = true;

        for (let stat in desiredCar) {
            if (stat === 'name')
                correctCar = scrubText($(element).find('.remove-info')[0].innerText).includes(scrubText(desiredCar.name))
            else {
                let carStats = scrubText($(element).find('.enlisted-stat')[0].innerText);
                if (carStats.includes(scrubText(stat))) {
                    if (carStats.split(scrubText(stat))[1].startsWith(scrubText(desiredCar[stat])))
                        continue
                    else correctCar = false;
                }
            }
            if (!correctCar) break;
        }

        if (!correctCar) $(element).hide()
    });
}

/**
 * Generic method to clean up text for comparisons.
 * @param {Text to be scrubbed} text 
 */
function scrubText(text) {
    return text.toLowerCase().replace(/[^a-z0-9]*/g, '');
}