// Import Express
const express = require('express')
const mongoose = require('mongoose')
const apiroute = require('./routes/api_route')

// Initialize the Application
const app = express()

// Setup Server Port
const port = 8080
app.use(express.json()) // Set Content Type to JSON

// Send Message for your localhost
app.use('/', apiroute)
//app.get('/', (request, response) => {
//    response.send('Hello the first ecommerce backend response')
//})

const url = "mongodb+srv://sakshi_kataria:12345@kelltontech.yr85k.mongodb.net/Kellton-Ecommerce?retryWrites=true&w=majority"

mongoose.connect(url, {useNewUrlParser:true})
.then(() => {
    console.log('Database Connected')
}).catch(error => console.log(error))

// Launch the Ecommerce Backend App
app.listen(port, () => {
    console.log(`Running the Ecommerce Backend on Port: 
    "http://localhost:${port}/"`)
})
