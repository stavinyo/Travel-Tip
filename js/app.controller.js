import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onGetSearchResult = onGetSearchResult
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

function onGetSearchResult(location) {
    console.log('value:', location)
    locService.getSearchResult(location)
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    locService.getLocs()
        .then(locations => {
            if (!locations) return
            mapService.addMarker(locations[locations.length - 1])
            onGetLocs()
        })
}


// DONE: X Y COORD
function addEventListenerLoc() {
    const gMap = mapService.getMap()
    gMap.addListener('click', ev => {
        const locName = prompt('Enter position name:')
        if (!locName || locName.trim() === '') return

        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()

        console.log('locName: ', locName, ' | lat:', lat, ' | lng:', lng)
        onCreateLoc(locName, lat, lng)
        onAddMarker()
    })
}

function onCreateLoc(locName, lat, lng) {
    locService.createLoc(locName, lat, lng)
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            if (!locs) return
            console.log('Locations:', locs)
            // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
            const strHTMLs = locs.map(loc => `<div class="loc-container">
                            <div class="loc-info">
                                <h1>Name: ${loc.name}</h1>
                                <p>Lan: ${loc.lat}</p>
                                <p>Lng: ${loc.lng}</p>
                                <p>ID: </p>
                            </div>
                            <button onclick="onRemoveLoc()" class="btn btn-go">go</button>
                            <button onclick="onGoLoc()"class="btn btn-remove">remove</button>
                        </div>`
            )
            document.querySelector('.locs').innerHTML = strHTMLs
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            // onPanTo()
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo() { //:TODO: parameters to add: lat, lng
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}