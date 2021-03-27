const client = require('./client')

async function fetchUser (serverID, userID) {
  try {
    const Guild = await client.guilds.fetch(serverID)
    const Member = await Guild.members.fetch(userID)
    return Member
  } catch (err) {
    if (err.message === 'Unknown User') return console.log()
    else return new Error(err.message)
  }
}

async function checkIfUserHasAdmin (Member) {
  if (Member === undefined) return
  try {
    return await Member.permissions.has('ADMINISTRATOR')
  } catch (err) { return new Error(err.message) }
}

module.exports = { fetchUser, checkIfUserHasAdmin }
