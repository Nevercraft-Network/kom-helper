const { camelCase } = require(('camel-case'))

async function sneakyToCamel (oldCase) {
  const newCase = {}
  Object.keys(oldCase).forEach(property => {
    newCase[camelCase(property)] = oldCase[property]
  })
  return newCase
}

module.exports = { sneakyToCamel }
