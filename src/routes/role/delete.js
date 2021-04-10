const express = require('express')
const router = express.Router()
const client = require('../../../utils/bot/client')
const { isEmpty } = require('../../../utils/verifier')
const config = require('../../config')

router.delete('/', async (req, res) => {
  const { userId, taskName } = req.query
  if (await isEmpty([userId, taskName])) return res.status(400).json({ status: 'missing data' })
  const guild = await client.guilds.fetch(config.serverId)
  const role = guild.roles.cache.find(role => role.name === taskName)
  const member = await guild.members.fetch(userId)
  await member.roles.remove(role)
    .then(() => res.status(204).end())
    .catch(error => {
      if (error.message.startsWith('Supplied roles is not')) {
        return res.status(400).json({ error: 'task not found' })
      } else return res.status(500).json({ error: error.message })
    })
})

module.exports = router
