const express = require('express')
const client = require('../../../utils/bot/client')
const { isEmpty } = require('../../../utils/verifier')
const router = express.Router()

router.get('/', async (req, res) => {
  const { taskName } = req.query
  if (await isEmpty([taskName])) return res.status(400).json({ status: 'missing data' })
  const task = client.channels.cache.find(task => task.name === taskName)
  if (task !== undefined) return res.json({ status: true })
  else return res.json({ status: false })
})

module.exports = router
