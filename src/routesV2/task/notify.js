const express = require('express')
const router = express.Router()
const { isEmpty } = require('../../../utils/verifier')
const client = require('../../../utils/bot/client')
const config = require('../../config')
const fetch = require('../../../utils/database/fetch')

router.post('/:taskId', async (req, res) => {
  const { taskId } = req.params
  const { userId } = req.body
  if (await isEmpty([userId, taskId])) return res.status(400).json({ status: 'missing data' })
  const user = await fetch.user(userId)
  const task = await fetch.task(taskId)
  const taskUrl = config.frontUrl + '/progresso/ver-tarefa/' + task.id

  client.channels.cache.get(config.notifyChannel)
    .send(`@here\nNovo voluntário na task **${task.name}**:\n\n**Nome:** ${user.nick}\n**Discord:** <@${user.discordId}>\n\nPara aceitar ou recusar, acesse ${taskUrl} `)
    .then(() => { return res.status(204).end() })
    .catch(error => { return res.status(500).json({ error: error.message }) })
})

module.exports = router
