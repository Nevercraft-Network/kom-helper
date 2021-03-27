const express = require('express')
const client = require('../../../utils/bot/client')
const router = express.Router()

router.get('/', async (req, res) => {
  const guild = await client.guilds.fetch('667412102964838400')
  const channel = guild.channels.cache.get('814336715715772476')
  const invite = await channel.createInvite({
    maxUses: 1,
    maxAge: 30,
    createdTimestamp: +new Date()
  })
  res.json(invite.url)
})

module.exports = router
