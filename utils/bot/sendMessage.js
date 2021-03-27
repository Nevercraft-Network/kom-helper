function temporaryMessage (message, text) {
  message.channel.send(text)
    .then(message.delete())
    .then(sentMessage => { sentMessage.delete({ timeout: 5000 }) })
}

function dmMessage (message, text) {
  message.author.send(text)
    .then(message.delete())
}

module.exports = {
  dmMessage,
  temporaryMessage
}
