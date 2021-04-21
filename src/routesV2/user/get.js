const express = require('express')
const router = express.Router()
const config = require('../../config')
const client = require('../../../utils/bot/client')
const { isEmpty } = require('../../../utils/verifier')
const fetchGuild = require('../../../utils/bot/guild')

router.get('/:discordId', async (req, res) => {
  const { discordId } = req.params
  if (await isEmpty([discordId])) return res.status(400).json({ status: 'missing data' })

  try {
    const guild = await fetchGuild(config.serverId)
    const User = await client.users.fetch(discordId)
    await guild.members.fetch(User)
    return res.json({ status: true })
  } catch (error) {
    if (error.message === 'Unknown Member') return res.json({ status: false })
    if (error.message === 'Unknown User') return res.status(500).json({ status: 'invalid userID' })
    else return res.status(500).json({ error: error.message })
  }
})

module.exports = router
