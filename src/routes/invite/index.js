const express = require('express')
const app = express()

const create = require('./create')

app.use('/create', create)

module.exports = app
