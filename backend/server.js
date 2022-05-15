const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.use('/api/concepts', require('./routes/concept'))

app.listen(port, () => console.log(`Sever on ${port}`))