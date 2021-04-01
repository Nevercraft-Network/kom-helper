const express = require('express')
const client = require('../utils/bot/client')
const config = require('./config')
require('dotenv').config()

const app = express()

const routes = require('./routes')

app.use('/v1', routes)

client.on('ready', async () => {
  client.user.setActivity('seus pedidos de ajuda!', { type: 'LISTENING' })
  console.log('Bot is running!')
})

app.listen(config.port, '0.0.0.0', () => { console.log('API is running on port ' + config.port + '!') })
