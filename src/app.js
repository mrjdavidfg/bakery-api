import express from 'express'
import 'express-async-errors' //prevents wrapping async functions for error handling
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
})
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: process.env.CORS_ORIGIN.split(' ')
  })
)

// Instanciate Models
import './model/User'

//Routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
app.use('/auth', authRoute)
app.use('/user', userRoute)

const middleware = require('./middleware')
app.use(middleware.mongoErrorHandler)

export default app