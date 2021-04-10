const express = require('express')
const app = express()

const add = require('./add')
const remove = require('./delete')

app.use('/', add)
app.use('/', remove)

module.exports = app
