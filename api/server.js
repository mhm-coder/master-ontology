const express = require('express')
const colors = require('colors')
const {errorHandler} = require("./middlewares/errorMiddleware");
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const {conceptRouter, userRouter} = require("./routes");
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/concepts', conceptRouter)
app.use('/api/users', userRouter)
app.use(errorHandler)

app.listen(port, () => console.log(`Sever on ${port}`))