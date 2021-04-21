const express = require('express')
const app = express()

const get = require('./get')

app.use('/', get)

module.exports = app
