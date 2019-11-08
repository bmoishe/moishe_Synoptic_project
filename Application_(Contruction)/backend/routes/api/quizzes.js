const express = require('express')
const router = express.Router()

// Quiz Model
const Quiz = require('../../models/Quizzes')

// ./routes/api/user
// @route GET api/user
// @desc Get All user
// @access Public
router.get('/', (req, res) => {
  // getUsers ()
  Quiz.find()
    .sort({ date: -1 })
    .then(quizzes => res.json(quizzes))
})

// routes/api/user
// @route POST api/user
// @desc Create a user
// @access Public

router.post('/', (req, res) => {
  const body = req.body
  console.log(body)
  const newQuiz = new Quiz({
    quiz: body.quiz
  })

  newQuiz.save().then(quiz => res.json(quiz), err => console.log('error: ', err))
  console.log('We have saved a new quiz called ' + body.quiz + ' to the DB: ', newQuiz)
  // This saves to the database and returns it in json
})

// routes/api/quizzes.js
// @route DELETE api/quiz/:id
// @desc Delete a quiz
// @access Public
router.delete('/:id', (req, res) => {
  // /:id is a placeholder for what we pass in as an id
  Quiz.findById(req.params.id)
  // req.params.id gets id from the params we pass
    .then(quiz => quiz.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

// @route PATCH api/quiz/:id
// @desc change a quiz
// @access Public

router.patch('/:id', (req, res) => {
  var updateObject = req.body
  var id = req.params.id
  Quiz.findById(id)
    .then(quiz => quiz.update({ $set: updateObject }).then(quiz.save()).then(() => res.json({ success: true })), console.log(`you have updated ${req.params.id}`))
    .catch(err => console.log(err).then(res.status(404).json({ success: false })))
})

// At the bottom to make this accessible
module.exports = router
