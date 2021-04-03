const express = require('express')
const app = express()

const add = require('./add')

app.use('/add', add)

module.exports = app
