const Discord = require('discord.js')
const config = require('../../src/config')

const client = new Discord.Client()

client.login(config.discordToken)

module.exports = client
