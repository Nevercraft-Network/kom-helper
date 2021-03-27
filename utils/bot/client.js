const Discord = require('discord.js')
const client = new Discord.Client()
const dotenv = require('dotenv')

dotenv.config()

client.login(process.env.DISCORD_TOKEN)

module.exports = client
