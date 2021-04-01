const cors = require('cors')
const express = require('express')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json('Hello!')
})

const user = require('./user')
const task = require('./task')

app.use('/user', user)
app.use('/task', task)

module.exports = app
