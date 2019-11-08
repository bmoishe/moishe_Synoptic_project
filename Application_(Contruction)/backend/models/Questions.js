const mongoose = require('mongoose')
const Schema = mongoose.Schema

// This will create the Schema for the object saved into the database
const QuestionSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  quizId: {
    type: String,
    require: true
  },
  answers: {
    type: Array,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
// module.exports allows access to the file
// mongoose.model('question', QuestionSchema) will save the schema into the database with 'question' as the name of the table
module.exports = Question = mongoose.model('question', QuestionSchema)
