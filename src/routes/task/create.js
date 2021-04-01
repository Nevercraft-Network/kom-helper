const createChannel = require('../../../utils/bot/createChannel')
const { default: createRole } = require('../../../utils/bot/createRole')
const express = require('express')
const router = express.Router()
const config = require('../../config')

const serverId = config.serverId

router.post('/', async (req, res) => {
  const { taskName } = req.body
  if (taskName === undefined || taskName === '') return res.status(400).json({ status: 'missing data' })
  createRole(serverId, taskName)
    .then(async role => {
      createChannel.category(serverId, taskName, {
        permission: [{
          id: role.id,
          allow: [
            'VIEW_CHANNEL',
            'SEND_MESSAGES',
            'EMBED_LINKS',
            'ATTACH_FILES',
            'READ_MESSAGE_HISTORY',
            'CONNECT',
            'SPEAK'
          ]
        }]
      })
        .then(category => {
          createChannel.text(serverId, 'avisos', { parent: category.id, permission: [{ id: role.id, allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'], deny: ['SEND_MESSAGES'] }] })
          createChannel.text(serverId, 'geral', { parent: category.id })
          createChannel.voice(serverId, 'voz', { parent: category.id })
          return res.json({ status: true })
        })
        .catch(error => {
          res.status(500).json({ error: error.message })
          console.log(error)
        })
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
      console.log(error)
    })
})

module.exports = router
