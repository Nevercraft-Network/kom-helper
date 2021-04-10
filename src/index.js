const express = require('express')
const sleep = require('../utils/sleep')
const client = require('../utils/bot/client')
const fetchGuild = require('../utils/bot/guild')
const { temporaryMessage } = require('../utils/bot/sendMessage')
const config = require('./config')
require('dotenv').config()

const prefix = config.prefix

const app = express()

const routes = require('./routes')
const knex = require('./database/knex')
const axios = require('axios')

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
        .then(async category => {
          if (category.type !== 'category') return temporaryMessage(message, ':x:  Você precisa informar o ID de uma categoria!')
          else {
            category.permissionOverwrites.forEach(async role => {
              const guild = await fetchGuild(message.guild.id)
              const fetchRole = await guild.roles.fetch(role.id)
              if (fetchRole.name === category.name) fetchRole.delete()
            })
            await sleep(1000)
            category.children.forEach(async channel => {
              channel.delete(channel.id)
              await sleep(500)
            })
            await sleep(1000)
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

client.on('guildMemberAdd', async (member) => {
  const memberId = member.id
  knex
    .where({ approved: true, user_id: memberId })
    .select('*')
    .from('task_volunteers')
    .then(volunteers => {
      volunteers.forEach(volunteer => {
        knex
          .where({ id: volunteer.task_id })
          .select('name')
          .from('tasks')
          .then(task => {
            axios.post('https://kom-helper-dev.herokuapp.com/v1/role', {
              userId: memberId,
              taskName: task[0].name
            })
              .then(() => { })
              .catch(error => { console.lof(error.message) })
          })
      })
    })
})

app.listen(config.port, '0.0.0.0', () => { console.log('API is running on port ' + config.port + '!') })
