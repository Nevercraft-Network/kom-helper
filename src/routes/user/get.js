const client = require('../../../utils/bot/client')
const express = require('express')
const config = require('../../config')
const { isEmpty } = require('../../../utils/verifier')
const router = express.Router()

router.get('/', async (req, res) => {
  const { userId } = req.query
  if (await isEmpty([userId])) return res.status(400).json({ status: 'missing data' })
  const guild = await client.guilds.fetch(config.serverId)
  if (userId === undefined || userId === '') return res.status(400).json({ status: 'missing data' })
  await client.users.fetch(userId)
    .then(async User => {
      if (User === undefined) return res.status(500).json({ status: 'invalid userID' })
      await guild.members.fetch(User)
        .then(() => {
          return res.json({ status: true })
        })
        .catch(error => {
          if (error.message === 'Unknown Member') return res.json({ status: false })
          else return res.status(500).json({ error: error.message })
        })
    })
    .catch(error => {
      return res.status(500).json({ error: error.message })
    })
})

module.exports = router
