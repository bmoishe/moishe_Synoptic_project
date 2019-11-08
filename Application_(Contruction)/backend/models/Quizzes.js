const mongoose = require('mongoose')
const Schema = mongoose.Schema

// This will create the Schema for the object saved into the database
const QuizSchema = new Schema({
  quiz: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
// module.exports allows access to the file
// mongoose.model('quiz', QuizSchema) will save the schema into the database with 'quiz' as the name of the table
module.exports = Quiz = mongoose.model('quiz', QuizSchema)
