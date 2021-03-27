const client = require('./client')

async function fetchGuild (serverID) {
  try {
    const Guild = await client.guilds.fetch(serverID)
    return Guild
  } catch (err) {
    return new Error(err.message)
  }
}

module.exports = fetchGuild
