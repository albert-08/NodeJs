const db = require('mongoose')

db.Promise = global.Promise

async function connect(mongoUrl) {
  await db.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('[db] Succesfully connected')).catch(err => console.error('[db]', err.message))
}

module.exports = connect