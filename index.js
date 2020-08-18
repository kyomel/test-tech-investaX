require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cors())

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))

app.use(router);

module.exports = app