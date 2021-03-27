const cors = require('cors')
const express = require('express')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json('Hello!')
})

module.exports = app
