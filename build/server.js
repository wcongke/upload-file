const config = require('../config')
const app = require('../server/index')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const port = process.env.PORT || config.dev.port

const server = app.listen(port, () => {
  console.log(`> Listening at http://localhost:${port}`)
})
