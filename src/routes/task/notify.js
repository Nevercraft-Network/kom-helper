const express = require('express')
const router = express.Router()
const { isEmpty } = require('../../../utils/verifier')
const client = require('../../../utils/bot/client')
const config = require('../../config')
const knex = require('../../database/knex')

router.post('/', async (req, res) => {
  res.json()
  const { userId, taskId } = req.body
  const userDbQuery = await knex('users')
    .where({ id: userId })
    .select('nickname', 'discord_id')
    .then(user => { return user[0] })
  const taskDbQuery = await knex('tasks')
    .where({ id: taskId })
    .select('name')
    .then(task => { return task[0] })
  const { nickname, discord_id } = userDbQuery
  const taskName = taskDbQuery.name
  const taskUrl = config.frontUrl + '/progresso/ver-tarefa/' + taskId
  if (await isEmpty([userId, taskId])) return res.status(400).json({ status: 'missing data' })

  const user = await client.users.fetch(discord_id)
  client.channels.cache.get(config.notifyChannel)
    .send(`@here\nNovo voluntário na task **${taskName}**:\n\n**Nome:** ${nickname}\n**Discord:** <@${user.id}>\n\nPara aceitar ou recusar, acesse ${taskUrl} `)
    .then(() => { return res.status(204).end() })
    .catch(error => { return res.status(500).json({ error: error.message }) })
})

module.exports = router
