const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
// heroku port
const port = process.env.PORT || 3000

// Define paths for  Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gabriel Ciortea'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gabriel Ciortea'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Area',
        name: 'Gabriel Ciortea',
        helpText: 'This is the help test'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address must be provided"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            //console.log(location);
            //console.log(forecastData);
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*',(req, res) => {
    res.render('404', {
        title: 'Error Page',
        msgError: '404 - Help Article Not Found',
        name: 'Gabriel ciorea'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        msgError: '404 Page not found',
        name: 'Gabriel ciorea'
    })
})

app.listen(port, () => {
    console.log('Server up on port '+ port )
})