const createChannel = require('../../../utils/bot/createChannel')
const createRole = require('../../../utils/bot/createRole')
const express = require('express')
const router = express.Router()
const config = require('../../config')
const { isEmpty } = require('../../../utils/verifier')
const { Permissions } = require('discord.js')
const { viewChannels, messageHistory, sendMessages } = require('../../../utils/discordPermissions.json')
const fetch = require('../../../utils/database/fetch')

const serverId = config.serverId

router.post('/:taskId', async (req, res) => {
  const { taskId } = req.params
  if (await isEmpty([taskId])) return res.status(400).json({ status: 'missing data' })
  try {
    const task = await fetch.task(taskId)
    const taskRole = await createRole(serverId, task.name)
    const taskCategory = await createChannel.category(serverId, task.name, {
      permission: [{ id: taskRole.id, allow: (new Permissions(3263488)).toArray() }]
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
