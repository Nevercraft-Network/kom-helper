const cors = require('cors')
const express = require('express')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json('Hello!')
})

app.get('/wakeup', (req, res) => {
  res.json('Hello!')
})

const role = require('./role')
const task = require('./task')
const test = require('./test')
const user = require('./user')

app.use('/role', role)
app.use('/task', task)
app.use('/test', test)
app.use('/user', user)

module.exports = app
