// Express - Framework web - used for web applications and API creation
const express = require('express')
const app = express()

// Cross Origin Resource (CORS) - Enable comunication between different servers
const cors = require('cors')

// Bring variables from .env file (in root)
require('dotenv-safe').config()

// Start database communication
const db = require('./database/mongoConfig')
db.connect()

// Enable all routes
const userRoutes = require('./routes/userRoutes')

// Start libraries (from modules)
app.use(cors())
app.use(express.json())
app.use('/users', userRoutes)

module.exports = app;