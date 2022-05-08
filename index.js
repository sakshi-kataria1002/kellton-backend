// Import Express
const express = require('express')
const mongoose = require('mongoose')
const apiroute = require('./routes/api_route')
const cors = require('cors')
const authRoute = require('./routes/auth_route')

// Initialize the Application
const app = express()

// Setup Server Port
const PORT = "8080"
// Setup Server Port.
//const port = 8080
//app.use(express.json()) // Set Content Type to JSON

// Send Message for your localhost.
//app.use('/', apiroute)
//app.use(cors({
//    origin: '*' //client where we are sending the data
//}))

//app.get('/', (request, response) => {
//    response.send('Hello the first ecommerce backend response')
//})

//MongoDB Database connection.
//const url = "mongodb+srv://sakshi_kataria:12345@kelltontech.yr85k.mongodb.net/Kellton-Ecommerce?retryWrites=true&w=majority"

//mongoose.connect(url, {useNewUrlParser:true})
//.then(() => {
//    console.log('Database Connected')
//}).catch(error => console.log(error))

// Launch the Ecommerce Backend App
//app.listen(port, () => {
//    console.log(`Running the Ecommerce Backend on Port: 
//    "http://localhost:${port}/"`)
//})
//MongoDB Database connection.End

// USER AUTHENTICATION
app.get("/", (req,res) => {
    res.send("Running JWT App")
})

app.listen(PORT, () => 
    console.log(`Server is up an running at ${PORT}`)
)

const dotenv = require('dotenv')

// Accessing the Environment Variables
dotenv.config()

//Connecting the database
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser:true},
    () => console.log("Database Connected")
)

// Middlewares
app.use(express.json(), cors())

// Route Middleware
app.use("/api/users", apiroute)
app.use("/api/users", authRoute)
