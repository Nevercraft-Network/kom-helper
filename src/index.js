const express = require('express')
const client = require('../utils/bot/client')
const fetchGuild = require('../utils/bot/guild')
const { temporaryMessage } = require('../utils/bot/sendMessage')
const config = require('./config')
require('dotenv').config()

const prefix = config.prefix

const app = express()

const routes = require('./routes')

app.use('/v1', routes)

client.on('ready', async () => {
  client.user.setActivity('seus pedidos de ajuda!', { type: 'LISTENING' })
  console.log('Bot is running!')
})

client.on('message', async (message) => {
  const messageArray = message.content.toLowerCase().split(' ')
  const command = messageArray[0]
  if (message.author.bot) return
  if (message.channel.type === 'dm') return
  if (!message.member.hasPermission('ADMINISTRATOR')) return
  if (!command.startsWith(prefix)) return

  if (command === `${prefix}delete`) {
    if (messageArray[1] === null || messageArray[1] === undefined) return temporaryMessage(message, ':x:  Você precisa informar o ID de uma categoria!')
    else {
      const categoryId = messageArray[1]
      await client.channels.fetch(categoryId)
        .then(category => {
          if (category.type !== 'category') return temporaryMessage(message, ':x:  Você precisa informar o ID de uma categoria!')
          else {
            category.permissionOverwrites.forEach(async role => {
              const guild = await fetchGuild(message.guild.id)
              const fetchRole = await guild.roles.fetch(role.id)
              if (fetchRole.name === category.name) fetchRole.delete()
            })
            category.children.forEach(channel => {
              channel.delete(channel.id)
            })
            category.delete()
            return temporaryMessage(message, ':white_check_mark:  Categoria, canais e cargos deletados!')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})

app.listen(config.port, '0.0.0.0', () => { console.log('API is running on port ' + config.port + '!') })
