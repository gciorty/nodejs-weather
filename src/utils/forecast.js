const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bcaba697a0494fd8b8107ecec00e578a/' + latitude+ ',' + longitude + '?units=si';

    request({ url , json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            callback('Error with your coordinates. Try another search.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + 'C degree. There is a ' + body.currently.precipProbability + '% change of rain');
        }
    });
}

module.exports = forecast;
    