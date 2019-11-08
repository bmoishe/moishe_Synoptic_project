const mongoose = require('mongoose')
const Schema = mongoose.Schema

// This will create the Schema for the object saved into the database
const AnswersSchema = new Schema({
  optionOne: {
    type: String,
    require: true
  },
  optionTwo: {
    type: String,
    require: true
  },
  optionThree: {
    type: String,
    require: true
  },
  optionFour: {
    type: String,
    require: true
  },
  questionId: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
// module.exports allows access to the file
// mongoose.model('user', AnswerSchema) will save the schema into the database with 'answer' as the name of the table
module.exports = Answers = mongoose.model('answer', AnswersSchema)
