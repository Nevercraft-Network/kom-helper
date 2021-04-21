const knex = require('../../src/database/knex')

async function user (id) {
  return knex('users')
    .where({ id })
    .select({
      nick: 'nickname',
      email: 'email',
      verified: 'verified',
      discordId: 'discord_id'
    })
    .then(async data => { return data[0] })
}

async function task (id) {
  return knex('tasks')
    .where({ id })
    .select({
      id: 'id',
      name: 'name',
      description: 'description',
      needHelp: 'need_help',
      finished: 'finished'
    })
    .then(async data => { return data[0] })
}

async function taskVolunteers (id) {
  return knex('task_volunteers')
    .where({ task_id: id })
    .join('users', 'task_volunteers.user_id', 'users.id')
    .select({
      userId: 'user_id',
      nickname: 'nickname',
      verified: 'verified',
      approved: 'approved',
      discordId: 'discord_id'
    })
}

module.exports = {
  task,
  user,
  taskVolunteers
}
