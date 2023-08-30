import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const API_KEY2 = 'AIzaSyCdNsu9gl8rInBWpqvli1Ha6gvp2BYXhIU'
const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY2}`
const STORAGE_KEY = 'searchDB'
export const locService = {
    getLocs,
    getSearchResult
}


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
    return storageService.query(STORAGE_KEY)
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(locs)
    //     }, 2000)
    // })
}

function _createLoc(name, lat, lng) {
    return {
        name,
        lat,
        lng,
        createdAt: new Date()
    }
}


function _setupLocs() {

}



const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]




