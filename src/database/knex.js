const knexdb = require('knex')

const config = require('./knexfile')['production']

const knex = knexdb(config)

module.exports = knex
