const client = require('./client')

async function category (serverID, name, options = {}) {
  const defaultParams = {}
  const type = 'category'

  Object.assign(defaultParams, { type: type })

  if (options.hasOwnProperty('permission')) {
    Object.assign(defaultParams, { permissionOverwrites: options.permission })
  }

  let createdChannel = ''
  await client.guilds.fetch(serverID)
    .then(async guild => {
      createdChannel = await guild.channels.create(name, defaultParams)
    })
    .catch(err => {
      if (err) {
        console.log({ error: err.message })
      }
    })
  return createdChannel
}

async function voice (serverID, name, options = {}) {
  const defaultParams = {}
  const type = 'voice'

  Object.assign(defaultParams, { type: type })

  if (options.hasOwnProperty('parent')) {
    Object.assign(defaultParams, { parent: options.parent })
  }
  if (options.hasOwnProperty('bitrate')) {
    Object.assign(defaultParams, { bitrate: options.bitrate })
  }
  if (options.hasOwnProperty('permission')) {
    Object.assign(defaultParams, { permissionOverwrites: options.permission })
  }

  let createdChannel = ''
  await client.guilds.fetch(serverID)
    .then(async guild => {
      createdChannel = await guild.channels.create(name, defaultParams)
    })
    .catch(err => {
      if (err) {
        console.log({ error: err.message })
      }
    })
  return createdChannel
}

async function text (serverID, name, options = {}) {
  const defaultParams = {}
  const type = 'text'

  Object.assign(defaultParams, { type: type })

  if (options.hasOwnProperty('parent')) {
    Object.assign(defaultParams, { parent: options.parent })
  }
  if (options.hasOwnProperty('permission')) {
    Object.assign(defaultParams, { permissionOverwrites: options.permission })
  }

  let createdChannel = ''
  await client.guilds.fetch(serverID)
    .then(async guild => {
      createdChannel = await guild.channels.create(name, defaultParams)
    })
    .catch(err => {
      if (err) {
        console.log({ error: err.message })
      }
    })
  return createdChannel
}

module.exports = {
  category,
  voice,
  text
}
