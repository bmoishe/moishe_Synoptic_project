import React, { Component } from 'react'
import './HomePage.css'
import Quiz from '../../component/Quiz'
class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      permisions: JSON.parse(window.sessionStorage.getItem('permisions')),
      username: JSON.parse(window.sessionStorage.getItem('username')),
      quizzes: [],
      view: 'homepage',
      currentId: '',
      currentQuizName: ''
    }
    this.logout = this.logout.bind(this)
    this.getQuizzes = this.getQuizzes.bind(this)
    this.selectQuiz = this.selectQuiz.bind(this)
    this.createAQuiz = this.createAQuiz.bind(this)
  }

  async selectQuiz (id, name) {
    this.setState({
      view: 'quiz',
      currentId: id,
      currentQuizName: name
    })
  }

  generateQuiz (id, name) {
    return (
      <div id={id}>
        {name}
        <Quiz currentId={id} permisions={this.state.permisions} username={this.state.username}quizName={name} view={this.state.view} />
      </div>
    )
  }

  logout () {
    this.setState({
      permisions: null,
      username: null
    })
    window.sessionStorage.clear()
    window.location.reload()
  }

  async getQuizzes () {
    const response = await fetch('http://localhost:5000/api/quizzes/')
    const quizzes = await response.json()
    this.setState({
      quizzes: quizzes.map((quiz, i) => (
        <div key={i} className='quiz-containers'>
          <div onClick={() => this.selectQuiz(quiz._id, quiz.quiz)} id={quiz._id}>
            <div /><div className='quiz-name'> {i + 1}) {quiz.quiz.toUpperCase()} </div>
          </div>
          {this.state.permisions === 'edit'
            ? <div className='button' onClick={() => this.deleteQuiz(quiz._id)}>Delete</div>
            : null}
        </div>

      ))
    })
  }

  async deleteQuiz (id) {
    console.log('delete', id)
    const url = 'http://localhost:5000/api/quizzes/' + id
    try {
      const response = await fetch(url, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      console.log('Success:', JSON.stringify(json))
      this.getQuizzes()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async createAQuiz () {
    const url = 'http://localhost:5000/api/quizzes/'
    const newQuiz = await document.getElementsByClassName('new-quiz-name')
    this.setState({
      quiz: newQuiz.newQuiz.value
    })
    const data = {
      quiz: newQuiz.newQuiz.value
    }
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
      this.getQuizzes()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  componentDidMount () {
    this.getQuizzes()
  }
  render () {
    const username = this.state.username
    return (
      <div className='home' >
        <div className='welcome'>
          Welcome, {username}
          <span className='logout' onClick={this.logout}> Logout
          </span>
        </div>
        { this.state.view === 'homepage'
          ? <div>
            <div className='heading'>Quizzes</div>
            {
              this.state.permisions === 'edit'
                ? <div className='create-quiz'>
                  <form className='form-container'>
                    <input className='new-quiz-name' type='text' name='newQuiz' placeholder='Quiz Name' required />
                  </form>
                  <div className='create-quiz-button' onClick={this.createAQuiz}>Create Quiz</div>
                </div>
                : null
            }
            <div className='quizzes-container'>{this.state.quizzes}</div>
          </div>
          : <div className='selected-quiz-container'>
            {this.generateQuiz(this.state.currentId, this.state.currentQuizName)}
          </div>

        }
      </div>

    )
  }
}

export default HomePage
