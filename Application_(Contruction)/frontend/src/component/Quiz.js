import React, { Component } from 'react'
import './Quiz.css'
class Quiz extends Component {
  constructor (props) {
    super(props)
    this.state = {
      permisions: this.props.permisions,
      username: this.props.username,
      quizzes: this.props.quizzes,
      view: 'quiz',
      currentQuizId: this.props.currentId,
      currentQuizName: this.props.currentQuizName,
      questionsArr: [],
      currentQuestion: null
    }
    this.addQuestion = this.addQuestion.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.editQuestion = this.editQuestion.bind(this)
    this.editAnswer = this.editAnswer.bind(this)
    this.deleteAnswer = this.deleteAnswer.bind(this)
    this.addAnswer = this.addAnswer.bind(this)
  }
  async getQuestions () {
    const response = await fetch('http://localhost:5000/api/questions/')
    const questions = await response.json()
    let questionsArr = []
    questions.map(question => {
      if (question.quizId === this.state.currentQuizId) {
        const questionsObject = {
          questionId: question._id,
          question: question.name,
          answers: question.answers,
          quizId: question.quizId
        }
        Object.entries(questionsObject)
        questionsArr.push(questionsObject)
        const newAnswersName = 'new-answer'
        this.setState({
          questionsArr: questionsArr.map((question, i) => (
            <div key={i}className='quiz-question'>
              {this.state.permisions === 'edit'
                ? <div className='questions'>
                  <div className='delete-button' onClick={() => this.deleteQuestion(question.questionId)}>Delete Question</div>
                  <div>
                    <h3>                  { question.question }</h3>
                    <form>
                      <input className='edit-question-name' type='text' name='editQuestion' placeholder='Edit Question ' />
                    </form>
                    <button className='button edit-question' onClick={() => this.editQuestion(question.questionId)}>Edit Question</button>
                  </div>
                  <div />
                </div>
                : <h3>                  { question.question }</h3>}
              {this.state.permisions === 'edit'
                ? <div className='answers'>
                  {question.answers.map((answer, i) =>
                    <div key={i} id={i}>{String.fromCharCode(97 + i).toUpperCase()}: {answer}
                      <div className='edit-answer-textbox'>
                        <p>
                          <input id={question.questionId + i}className={newAnswersName + i} type='text' name='editAnswer' placeholder='Edit or New Answer' />
                        </p>
                      </div>
                      <div className='button answer-buttons' onClick={() => this.addAnswer(question, i)}><p>Add</p></div>
                      <div className='button answer-buttons' onClick={() => this.editAnswer(question, i)}><p>Edit </p></div>
                      <div className='button answer-buttons' onClick={() => this.deleteAnswer(question, i)}>  <p>Delete  </p></div>
                    </div>)}
                </div>
                : this.state.permisions === 'view'
                  ? <div className='answers'>
                    {question.answers.map((answer, i) =>
                      <div key={i} id={i}>{String.fromCharCode(97 + i).toUpperCase()}: {answer}
                      </div>)}
                  </div>
                  : null}
            </div>
          )),
          currentQuestionId: this.questionId,
          currentQuestionName: this.question
        })
      }
    }, console.log(this.state.answer))
  }

  async addAnswer (question, i) {
    const url = 'http://localhost:5000/api/questions/' + question.questionId
    const newAnswer = await document.getElementsByClassName('new-answer' + i)
    const newAnswerFormatted = newAnswer.editAnswer.value
    const answerObject = question
    await answerObject.answers.splice(i, 0, newAnswerFormatted)
    const data = answerObject
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      console.log('Success:', JSON.stringify(json))
      this.getQuestions()
    } catch (error) {
      console.error('Error:', error)
    }
  }
  async deleteAnswer (question, i) {
    const url = 'http://localhost:5000/api/questions/' + question.questionId
    const answerObject = question
    await answerObject.answers.splice(i, 1)
    const data = answerObject
    console.log('data', data)
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      console.log('Success:', JSON.stringify(json))
      this.getQuestions()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async editAnswer (question, i) {
    const url = 'http://localhost:5000/api/questions/' + question.questionId
    const newAnswer = await document.getElementsByClassName('new-answer' + i)
    const newAnswerFormatted = newAnswer.editAnswer.value
    const answerObject = question
    await answerObject.answers.splice(i, 1, newAnswerFormatted)
    const data = answerObject
    console.log('data', data)
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      console.log('Success:', JSON.stringify(json))
      this.getQuestions()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async addQuestion () {
    console.log('add')
    const url = 'http://localhost:5000/api/questions/'
    const newQuestion = await document.getElementsByClassName('new-question-name')
    const newAnswer1 = await document.getElementsByClassName('new-answer-name1')
    const newAnswer2 = await document.getElementsByClassName('new-answer-name2')
    const newAnswer3 = await document.getElementsByClassName('new-answer-name3')
    const newAnswer4 = await document.getElementsByClassName('new-answer-name4')
    const newAnswer5 = await document.getElementsByClassName('new-answer-name5')
    const newAnswers = [newAnswer1.newAnswer1.value, newAnswer2.newAnswer2.value, newAnswer3.newAnswer3.value, newAnswer4.newAnswer4.value, newAnswer5.newAnswer5.value]
    this.setState({
      name: newQuestion.newQuestion.value,
      quizId: this.state.currentQuizId
    })
    const data = {
      name: newQuestion.newQuestion.value,
      quizId: this.state.currentQuizId,
      answers: newAnswers
    }
    console.log(data)
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      console.log('Success:', JSON.stringify(json))
      this.getQuestions()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async deleteQuestion (id) {
    console.log('delete', id)

    console.log('delete', id)
    const url = 'http://localhost:5000/api/questions/' + id
    try {
      const response = await fetch(url, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      console.log('Success:', JSON.stringify(json))
      this.getQuestions()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async editQuestion (id) {
    console.log('Edit', id)
    const url = 'http://localhost:5000/api/questions/' + id
    const editQuestion = await document.getElementsByClassName('edit-question-name')
    console.log('editQuestion', editQuestion)
    const data = {
      name: editQuestion.editQuestion.value,
      quizId: this.state.currentQuizId
    }
    console.log(data)
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('res', response)
      const json = await response.json()
      console.log('Success:', JSON.stringify(json))
      this.getQuestions()
    } catch (error) {
      console.error('Error:', error)
    }
  }
  home () {
    window.location.reload()
  }
  componentDidMount () {
    this.getQuestions()
  }
  render () {
    return (
      <div className='Quiz' >
        <div className='back-to-quizzes' onClick={this.home}>
          Back
        </div>
        <div className='heading'>
          {this.props.currentQuizName}
        </div>
        {this.state.permisions === 'edit'
          ? <form>
            <input className='new-question-name' required type='text' name='newQuestion' placeholder='Question Name' />
            <input className='new-answer-name1' required type='text' name='newAnswer1' placeholder='Option 1' />
            <input className='new-answer-name2' required type='text' name='newAnswer2' placeholder='Option 2' />
            <input className='new-answer-name3' required type='text' name='newAnswer3' placeholder='Option 3' />
            <input className='new-answer-name4' required type='text' name='newAnswer4' placeholder='Option 4' />
            <input className='new-answer-name5' required type='text' name='newAnswer5' placeholder='Option 5' />
            <div onClick={this.addQuestion} type='submit' className='show-questions delete-button' >Add Question</div>

          </form> : null
        }
        <div className='quiz-question-container'>
          {this.state.questionsArr }
        </div>

      </div>
    )
  }
}

export default Quiz
