const express = require('express')
const client = require('../../../utils/bot/client')
const fetch = require('../../../utils/database/fetch')
const { isEmpty } = require('../../../utils/verifier')
const router = express.Router()

router.get('/:taskId', async (req, res) => {
  const { taskId } = req.params
  if (await isEmpty([taskId])) return res.status(400).json({ status: 'missing data' })
  const taskDb = await fetch.task(taskId)
  const task = client.channels.cache.find(task => task.name === taskDb.name)
  if (task !== undefined) return res.json({ status: true })
  else return res.json({ status: false })
})

module.exports = router
