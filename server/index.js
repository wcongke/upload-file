const upload = require('./upload')

const express = require('express')

const app = express()

app.get('/api/upload', upload.upload)

module.exports = app
