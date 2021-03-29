const cors = require('cors')
const express = require('express')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json('Hello!')
})

const invite = require('./invite')
const user = require('./user')

app.use('/invite', invite)
app.use('/user', user)

module.exports = app
