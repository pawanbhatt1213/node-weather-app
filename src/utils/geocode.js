const request = require("request");

const getGeo = (place, callback) => {
    const MAPBOX_BASE_URL ="https://api.mapbox.com/geocoding/v5/mapbox.places"
    const MAPBOX_SECRET_KEY = "pk.eyJ1IjoidGVtcHVzZXIxMjEzIiwiYSI6ImNrZmJmdmsyMjE1ZGMzMW84MXZjcmN0MHAifQ.S5cOD2hQzKWVnORrQixVLg"
    const mapboxQueryPlace = encodeURIComponent(place)
    const url = `${MAPBOX_BASE_URL}/${mapboxQueryPlace}.json?access_token=${MAPBOX_SECRET_KEY}&limit=1`
    request(
        { url: url, json: true},
        (err, res) =>{
            if(err)
                callback("No network connectivity!", undefined)
            else if(res.body.features.length ==  0)
                callback("PLease enter proper query string for place!", undefined)
            else{
                callback(undefined, {
                    latitude: res.body.features[0].center[0],
                    longitude: res.body.features[0].center[1],
                    location: res.body.features[0].place_name
                })
                
            }
        }
    )
}

module.exports = {getGeo: getGeo}
