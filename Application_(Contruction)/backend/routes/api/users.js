const express = require('express')
const router = express.Router()
var CryptoJS = require('crypto-js')
const encryptionPassword = require('../../config/keys').encryptionPassword
// encryption
function encryption (pwData, method) {
  var data = [pwData]
  if (method === 'encrypt') {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionPassword)
    console.log(ciphertext)
    return (ciphertext)
  }
  if (method === 'decrypt') {
  // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), encryptionPassword)
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    console.log(decryptedData)
    return (decryptedData)
  }
}

// User Model
const User = require('../../models/Users')

// ./routes/api/user
// @route GET api/user
// @desc Get All users
// @access Public
router.get('/', (req, res) => {
  // getUsers ()
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
})

// routes/api/user
// @route POST api/user
// @desc Create a user
// @access Public

router.post('/', (req, res) => {
  const body = req.body
  console.log(body)
  console.log(body.password)
  const password = encryption(body.password, 'encrypt')
  console.log('pw encrypted', password)
  const newUser = new User({
    username: body.username,
    password: password,
    permisions: body.permisions
  })

  newUser.save().then(user => res.json(user), err => console.log('error: ', err))
  console.log('We have saved a new user called ' + body.username + ' to the DB: ', newUser)
  // This saves to the database and returns it in json
})

// routes/api/user.js
// @route DELETE api/user/:id
// @desc Delete a user
// @access Public
router.delete('/:id', (req, res) => {
  // /:id is a placeholder for what we pass in as an id
  User.findById(req.params.id)
  // req.params.id gets id from the params we pass
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

// @route PATCH api/user/:id
// @desc change a user
// @access Public

router.patch('/:id', (req, res) => {
  var updateObject = req.body
  var id = req.params.id
  User.findById(id)
    .then(user => user.update({ $set: updateObject }).then(user.save()).then(() => res.json({ success: true })), console.log(`you have updated ${req.params.id}`))
    .catch(err => console.log(err).then(res.status(404).json({ success: false })))
})

// At the bottom to make this accessible
module.exports = router
