const express = require('express')
const router = express.Router()
const client = require('../../../utils/bot/client')
const config = require('../../config')

router.post('/', async (req, res) => {
  const { userId, taskName } = req.body
  const guild = await client.guilds.fetch(config.serverId)
  const role = guild.roles.cache.find(role => role.name === taskName)
  const member = await guild.members.fetch(userId)
  await member.roles.add(role)
    .then(() => res.status(204))
    .catch(error => {
      if (error.message.startsWith('Supplied roles is not a Role')) {
        return res.status(400).json({ error: 'task not found' })
      } else return res.status(500).json({ error: error.message })
    })
})

module.exports = router
