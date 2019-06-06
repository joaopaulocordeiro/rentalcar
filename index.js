const winston = require('winston')
const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/validation')();



//CONNECTION HTTPSERVER
const port = process.env.PORT || 3000
const server = app.listen(port, () => winston.info(`listening on port ${port}...`))

module.exports = server;