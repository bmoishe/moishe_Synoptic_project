const mongoose = require('mongoose')
const Schema = mongoose.Schema

// This will create the Schema for the object saved into the database
const UserSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  permisions: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
// module.exports allows access to the file
// mongoose.model('user', UserSchema) will save the schema into the database with 'user' as the name of the table
module.exports = User = mongoose.model('user', UserSchema)
