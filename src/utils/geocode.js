const request = require('request');

const limit = 1 // Number of returned result

const geocode = (address, callback) => {

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia29kZWNoZWZmIiwiYSI6ImNrY3czdWl0OTA3cHIydm1wcHI3YmcyN20ifQ.oiP5ke4C19cAu7S5TDnbgg&limit=${limit}`

  request({url, json: true}, (error, response) => {
    if(error) {
      callback('Unable to connect to location service');
    } else if(response.body.features.length === 0) {
      callback('Unable to find location, try another search')
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      })
    }
  })
}

geocode('Lagos Nigeria', (error, data) => {
  console.log(error)
  console.log(data)
})