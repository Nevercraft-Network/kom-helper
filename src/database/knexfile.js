const config = require('../config')

module.exports = {

  production: {
    client: 'pg',
    connection: config.databaseUrl + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: '../database/migrations',
      tableName: 'knex_migrations'
    }
  }
}
