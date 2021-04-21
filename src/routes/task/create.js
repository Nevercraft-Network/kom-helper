const createChannel = require('../../../utils/bot/createChannel')
const createRole = require('../../../utils/bot/createRole')
const express = require('express')
const router = express.Router()
const config = require('../../config')
const { isEmpty } = require('../../../utils/verifier')
const { Permissions } = require('discord.js')
const { viewChannels, messageHistory, sendMessages } = require('../../../utils/discordPermissions.json')

const serverId = config.serverId

router.post('/', async (req, res) => {
  const { taskName } = req.body
  if (await isEmpty([taskName])) return res.status(400).json({ status: 'missing data' })
  try {
    const permissions = new Permissions(3263488)
    const taskRole = await createRole(serverId, taskName)
    const taskCategory = await createChannel.category(serverId, taskName, {
      permission: [{ id: taskRole.id, allow: permissions.toArray() }]
    })
    await createChannel.text(serverId, 'avisos', {
      parent: taskCategory.id,
      permission: [{ id: taskRole.id, allow: [viewChannels, messageHistory], deny: [sendMessages] }]
    })
    await createChannel.text(serverId, 'geral', { parent: taskCategory.id })
    await createChannel.voice(serverId, 'voz', { parent: taskCategory.id })
    return res.json({ status: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(error)
  }
})

module.exports = router
