const express = require('express')
const router = express.Router()

// Question Model
const Questions = require('../../models/Questions')

// ./routes/api/question
// @route GET api/question
// @desc Get All question
// @access Public
router.get('/', (req, res) => {
  // getUsers ()
  Questions.find()
    .sort({ date: -1 })
    .then(questions => res.json(questions))
})

// routes/api/question
// @route POST api/question
// @desc Create a question
// @access Public

router.post('/', (req, res) => {
  const body = req.body
  console.log(body)
  const newQuestion = new Questions({
    name: body.name,
    quizId: body.quizId,
    answers: body.answers
  })

  newQuestion.save().then(question => res.json(question), err => console.log('error: ', err))
  console.log('We have saved a new question called ' + body.question + ' to the DB: ', newQuestion)
  // This saves to the database and returns it in json
})

// routes/api/question.js
// @route DELETE api/question/:id
// @desc Delete a question
// @access Public
router.delete('/:id', (req, res) => {
  // /:id is a placeholder for what we pass in as an id
  Questions.findById(req.params.id)
  // req.params.id gets id from the params we pass
    .then(question => question.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

// @route PATCH api/question/:id
// @desc change a question
// @access Public

router.patch('/:id', (req, res) => {
  var updateObject = req.body
  var id = req.params.id
  Questions.findById(id)
    .then(question => question.update({ $set: updateObject }).then(question.save()).then(() => res.json({ success: true })), console.log(`you have updated ${req.params.id}`))
    .catch(err => console.log(err).then(res.status(404).json({ success: false })))
})

// At the bottom to make this accessible
module.exports = router
