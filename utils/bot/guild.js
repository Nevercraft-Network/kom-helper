const client = require('./client')

async function fetchGuild (serverID) {
  try {
    return await client.guilds.fetch(serverID)
  } catch (err) {
    return new Error(err.message)
  }
}

module.exports = fetchGuild
