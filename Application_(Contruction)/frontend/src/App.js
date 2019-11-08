import React, { Component } from 'react'
import logo from './logo.png'
import './App.css'
import Login from './containers/Login/Login'
import HomePage from './containers/HomePage/HomePage'
class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header>
        {window.sessionStorage.getItem('loggedIn') === null
          ? <Login />
          : <HomePage />
        }
      </div>
    )
  }
}

export default App
