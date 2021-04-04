const express = require('express')
const client = require('../../../utils/bot/client')
const router = express.Router()

router.get('/', async (req, res) => {
  const { taskName } = req.query
  const task = client.channels.cache.find(task => task.name === taskName)
  if (task !== undefined) return res.json({ status: true })
  else return res.json({ status: false })
})

module.exports = router
