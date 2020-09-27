const request = require("request");

const getWeather = (lat, long, callback) => {
    const WEATHER_BASE_URL ="http://api.weatherstack.com"
    const WEATHER_SECRET_KEY = "afd5f8ff1e0fd9846e48f49b4084bde2"
    const weatherQueryType = "current"
    const weatherQueryPlace = long +","+ lat
    const url = `${WEATHER_BASE_URL}/${weatherQueryType}?access_key=${WEATHER_SECRET_KEY}&query=${weatherQueryPlace}`
    request(
        {url: url, json: true}, 
        (err, res) => {
            if(err)
                callback("No network connectivity!", undefined)
            else if(res.body.error)
                callback("PLease enter proper query string for place!", undefined)
            else
                callback(undefined, res.body)
        }
    );
}

module.exports = {getWeather: getWeather}


