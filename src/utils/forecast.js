var request = require('request');

const forecast = (address, callback) => {

  const ACCESS_KEY = '25f031ae550aab256ccde5e2020dde77';
  const QUERY = 'Lagos'
  const FORECAST_DAYS = 2;

  const url = `http://api.weatherstack.com/forecast?access_key=${ACCESS_KEY}&query=${address}&units=m`;

  request({url, json: true}, (error, response) => {
    
    if(error) {
      callback('Unable to connect to weather service!', undefined)
    } else if(response.body.error) {
      callback('Unable to find forecast for location. Check your location and try again', undefined)
    } else {
      const {temperature, precip} = response.body.current

      callback(undefined, {
        response: `It is currently ${temperature} degrees out. There is a ${precip}% chance of rain`,
        location: response.body.request.query,
        latitude: response.body.location.lat,
        longitude: response.body.location.lon,
        time: response.body.current.observation_time,
      })
    }
  })
}

module.exports = forecast;