const Model = require('./model')

function addMessage(message) {
  const myMessage = new Model(message)
  myMessage.save()
}

async function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    let filter = {}
    if (filterUser !== null) {
      filter = { user: filterUser }
    }
    Model.find(filter)
      .populate('user')
      .exec((error, populated) => {
        if (error) {
          reject(error)
          return false
        }
        resolve(populated)
      })
  })
}

function removeMessage(id) {
  return Model.deleteOne({
    id:id
  })
}

async function updateText(id, message) {
  const foundedMessage = await Model.findOne({
    id: id
  })

  foundedMessage.message = message

  const newMessage = await foundedMessage.save()
  return newMessage
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText: updateText,
  remove: removeMessage
}