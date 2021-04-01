const fetchGuild = require('./guild')

async function createRole (serverId, roleName) {
  const guild = await fetchGuild(serverId)
  const role = guild.roles.create({
    data: {
      name: roleName
    }
  })
  return role
}

exports.default = createRole
