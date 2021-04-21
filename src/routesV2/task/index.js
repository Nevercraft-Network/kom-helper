const express = require('express')
const app = express()

const create = require('./create')
const remove = require('./delete')
const list = require('./list')
const notify = require('./notify')

app.use('/', create)
app.use('/', remove)
app.use('/', list)
app.use('/notify', notify)

module.exports = app
