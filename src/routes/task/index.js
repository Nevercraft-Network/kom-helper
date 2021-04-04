const express = require('express')
const app = express()

const create = require('./create')
const list = require('./list')
const notify = require('./notify')

app.use('/', create)
app.use('/', list)
app.use('/notify', notify)

module.exports = app
