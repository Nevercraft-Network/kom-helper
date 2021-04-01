require('dotenv').config()

module.exports = {
  port: process.env.PORT || '3000',
  discordToken: process.env.DISCORD_TOKEN,
  serverId: process.env.SERVER_ID || '826891441137516555',
  lobbyChannel: process.env.LOBBY_CHANNEL || '',
  prefix: process.env.PREFIX || '!'
}
