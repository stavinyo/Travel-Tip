import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onCreateLoc = onCreateLoc
//-------------------------Tal--------------------------//
//-------------------------Stav--------------------------//

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            addEventListenerLoc()
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    let location = mapService.getLastClickLoc()
    console.log('Adding a marker', location)
    mapService.addMarker(location)
    // onGetLocs()
}

function onCreateLoc(loc) {
    locService.createLoc(loc)
}

// DONE: X Y COORD
function addEventListenerLoc() {
    const gMap = mapService.getMap()
    gMap.addListener('click', ev => {
        const locName = prompt('enter position name:')
        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()


        console.log('lat:', lat, ' | lng:', lng)

        const loc = { locName, lat, lng }
        onCreateLoc(loc)
        console.log(clickPos)
    })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}