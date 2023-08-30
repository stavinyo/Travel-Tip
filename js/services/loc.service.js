import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const locService = {
    getLocs,
    getSearchResult,
    createLoc,
}

const API_KEY2 = 'AIzaSyAFqM_CWQDpuTUZGPHlVk_42r5ZJvG-YR4'
const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY2}`
const STORAGE_KEY = 'searchDB'
const MARKS_KEY = 'marksDB'

function getSearchResult(locationKey) {
    console.log('getLocs():', getLocs())
    getLocs().then(locs => {
        const loc = locs.find(loc => loc.name === locationKey)
        if (loc) return Promise.resolve(loc)
        else {
            return axios.get(URL).then(locations => {
                console.log('locations:', locations)
                console.log('locations:', locations.data)
            })
        }
        // locs.find (by name === locationKey)
        // if exist - return location from locs
        // else - fetch api request
        console.log('locs:', locs)
    })
    // console.log('key:', locationKey)
    // const locations = utilService.loadFromStorage(locationKey) || {}
    // if(locations[locationKey]) return Promise.resolve(locations[locationKey])

    console.log('location:', location)
}

function getLocs() {
    const locs = utilService.loadFromStorage(MARKS_KEY) || []
    if (!locs) {
        const tempLoc = [{ name: 'Greatplace', lat: 32.047104, lng: 34.832384 }]
        utilService.saveToStorage(MARKS_KEY, tempLoc)
    }

    return Promise.resolve(utilService.loadFromStorage(MARKS_KEY))

}
function getLocs2() { //FIXME: SAVE LATER

    return storageService.query(STORAGE_KEY)
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(locs)
    //     }, 2000)
    // })
}

function createLoc(name, lat, lng) {
    const newLoc = { name, lat, lng, createdAt: new Date() }
    storageService.post(MARKS_KEY, newLoc)
}

// function _setupLocs() {

// }

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]




