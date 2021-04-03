const express = require('express')
const app = express()

const create = require('./create')
const notify = require('./notify')

app.use('/', create)
app.use('/notify', notify)

module.exports = app
