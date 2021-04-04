const express = require('express')
const router = express.Router()
const config = require('../../config')
const sleep = require('../../../utils/sleep')
const fetchGuild = require('../../../utils/bot/guild')
const client = require('../../../utils/bot/client')
const { isEmpty } = require('../../../utils/verifier')

const serverId = config.serverId

router.delete('/', async (req, res) => {
  const { taskName } = req.query
  if (await isEmpty([taskName])) return res.status(400).json({ status: 'missing data' })
  const category = client.channels.cache.find(task => task.name === taskName)
  if (category === undefined) return res.status(400).json({ error: 'task not found' })
  else if (category.type !== 'category') return res.status(400).json({ status: 'invalid task name' })
  else {
    category.permissionOverwrites.forEach(async role => {
      const guild = await fetchGuild(serverId)
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
    return res.json({ status: true })
  }
})

module.exports = router
