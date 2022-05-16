const express = require('express')
const {errorHandler} = require("./middlewares/errorMiddleware");
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/concepts', require('./routes/concept'))
app.use(errorHandler)

app.listen(port, () => console.log(`Sever on ${port}`))