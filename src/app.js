const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
// const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: "Akunne Pascal"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About us",
    name: "Akunne Pascal"
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'We are here to help',
    title: "Help",
    name: "Akunne Pascal"
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: "Help page not found"
  })
})

// app.get('/products', (req, res) => {
//   if(!req.query.search) {
//     return res.send({
//       error: "You must provide a search term"
//     })
//   }
//   console.log(req.query.search)
//   res.send({
//     products: []
//   })
// })

app.get('/weather', (req, res) => {

  if(!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    })
  }

  forecast(req.query.address, (error, {response, location} = {}) => {

    if(error) {
      return res.send({error})
    }
  
    res.send({
      Data: response,
      Location: location,
      address: req.query.address
    });
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    error: "Page not found"
  })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})