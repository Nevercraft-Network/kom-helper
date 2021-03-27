const express = require('express')
const client = require('../utils/bot/client')
require('dotenv').config()

const app = express()

const routes = require('./routes')

app.use('/', routes)

client.on('ready', async () => {
  client.user.setActivity('seus pedidos de ajuda!', { type: 'LISTENING' })
  console.log('Bot is running!')
})

app.listen(process.env.PORT, '0.0.0.0', () => { console.log('API is running!') })
