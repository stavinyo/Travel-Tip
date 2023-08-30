export const mapService = {
    initMap,
    addMarker,
    panTo,
    getLastClickLoc,
    getMap
}

// Var that is used throughout this Module (not global)
var gMap

function getMap() {
    return gMap
}

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
        })
}

function getLastClickLoc() {
    return gLastClickPos
}

// //FIXME: change???
function addMarker(loc) {

    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}


function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    // const API_KEY = 'AIzaSyC-mFfPF44l4nynJmr-GeOLaXo0OnXGa8g'//STAV
    const API_KEY = 'AIzaSyAFqM_CWQDpuTUZGPHlVk_42r5ZJvG-YR4'//TAL
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

