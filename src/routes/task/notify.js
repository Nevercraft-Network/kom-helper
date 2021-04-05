const express = require('express')
const router = express.Router()
const { isEmpty } = require('../../../utils/verifier')
const client = require('../../../utils/bot/client')
const config = require('../../config')

router.post('/', async (req, res) => {
  const { userId, userName, taskName, taskUrl } = req.body
  if (await isEmpty([userId, userName, taskName, taskUrl])) return res.status(400).json({ status: 'missing data' })

  const user = await client.users.fetch(userId)
  client.channels.cache.get(config.notifyChannel)
    .send(`@here\nNovo voluntário na task **${taskName}**:\n\n**Nome:** ${userName}\n**Discord:** <@${user.id}>\n\nPara aceitar ou recusar, acesse ${taskUrl} `)
    .then(() => { return res.status(204).end() })
    .catch(error => { return res.status(500).json({ error: error.message }) })
})

module.exports = router
