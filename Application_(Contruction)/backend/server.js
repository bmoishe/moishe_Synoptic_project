
// requires dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/api/users')
const quizRoutes = require('./routes/api/quizzes')
const questionRoutes = require('./routes/api/questions')
const answerRoutes = require('./routes/api/answers')
// connect to express
const app = express()

// Body Parser middleware
app.use(bodyParser.json())

// Allow access control for origin and headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

// Use user routes
app.use('/api/users', userRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/answers', answerRoutes)
// DB config. this is getting hidden variable from my config file
const db = require('./config/keys').mongoURI

// Connect to mongoDB
mongoose
  .connect(db)
  // after connection attempt return the following
  .then(() => console.log('MongoDB Connected...'))
  // if it errors then return the error
  .catch(err => console.log(err))

// now to run server we want to connect to a port. The process.env.PORT allow me to connect to an external server. I have it to go to port 5000 if not.
const port = process.env.PORT || 5000

// this will listen on this port and callback when it starts on that port
app.listen(port, () => console.log('Server started on port ' + port))
