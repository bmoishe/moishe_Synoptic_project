const express = require('express')
const router = express.Router()

// Answers Model
const Answers = require('../../models/Answers')

// ./routes/api/answer
// @route GET api/answer
// @desc Get All answer
// @access Public
router.get('/', (req, res) => {
  Answers.find()
    .sort({ date: -1 })
    .then(answers => res.json(answers))
})

// routes/api/answer
// @route POST api/answer
// @desc Create a answer
// @access Public

router.post('/', (req, res) => {
  const body = req.body
  console.log(body)
  const newAnswers = new Answers({
    optionOne: body.optionOne,
    optionTwo: body.optionTwo,
    optionThree: body.optionThree,
    optionFour: body.optionFour,
    questionId: body.questionId
  })

  newAnswers.save().then(answer => res.json(answer), err => console.log('error: ', err))
  console.log('We have saved a new quiz called ' + body.name + ' to the DB: ', newAnswers)
  // This saves to the database and returns it in json
})

// routes/api/answers.js
// @route DELETE api/answer/:id
// @desc Delete a answer
// @access Public
router.delete('/:id', (req, res) => {
  // /:id is a placeholder for what we pass in as an id
  Answers.findById(req.params.id)
  // req.params.id gets id from the params we pass
    .then(answer => answer.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

// @route PATCH api/answer/:id
// @desc change a answer
// @access Public

router.patch('/:id', (req, res) => {
  var updateObject = req.body
  var id = req.params.id
  Answers.findById(id)
    .then(answer => answer.update({ $set: updateObject }).then(answer.save()).then(() => res.json({ success: true })), console.log(`you have updated ${req.params.id}`))
    .catch(err => console.log(err).then(res.status(404).json({ success: false })))
})

// At the bottom to make this accessible
module.exports = router
