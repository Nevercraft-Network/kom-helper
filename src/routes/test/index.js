const express = require('express')
const app = express()

const test = require('./test')

app.use('/', test)

module.exports = app
