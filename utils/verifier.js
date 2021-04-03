async function isEmpty (variables) {
  let verifier = false
  variables.forEach(variable => {
    if (variable === undefined || variable === '') verifier = true
  })
  return verifier
}

module.exports = { isEmpty }
