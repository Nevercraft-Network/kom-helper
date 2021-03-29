const client = require('../../../utils/bot/client')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const { userId } = req.query
  console.log(userId)
  const guild = await client.guilds.fetch('667412102964838400')
  if (userId === undefined || userId === '') return res.status(400).json({ error: 'missing data' })
  await client.users.fetch(userId)
    .then(async User => {
      if (User === undefined) return res.status(500).json({ error: 'invalid userID' })
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
