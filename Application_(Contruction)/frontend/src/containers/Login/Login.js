import React, { Component } from 'react'
import './Login.css'
import Admin from '../Admin/Admin'
import config from '../../config/keys'
import CryptoJS from 'crypto-js'
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      admin: false,
      validationErrror: false
    }
    this.validation = this.validation.bind(this)
    this.isValid = this.isValid.bind(this)
  }
  async validation () {
    const response = await fetch('http://localhost:5000/api/users/')
    console.log('the responce', response)

    const users = await response.json()
    console.log('befrore mapping users', users)
    users.map(user => this.isValid(user), this.setState({
      validationErrror: true
    })
    )
  }

  async isValid (user) {
    const username = await document.getElementsByClassName('username').username.value
    const password = await document.getElementsByClassName('password').password.value
    const decryptedPassword = await this.encryption(user.password, 'decrypt')
    if (username === config.adminUsername && password === config.adminPassword) {
      await this.setState({
        admin: true
      })
    }
    if (user.username === username && decryptedPassword === password) {
      window.sessionStorage.setItem('loggedIn', 'true')
      window.sessionStorage.setItem('username', JSON.stringify(user.username))
      window.sessionStorage.setItem('permisions', JSON.stringify(user.permisions))
      window.location.reload()
      return true
    } else return false
  }

  async encryption (pwData, method) {
    var data = await [pwData]
    if (method === 'decrypt') {
    // Decrypt
      var bytes = await CryptoJS.AES.decrypt(data.toString(), config.encryptionPassword)
      var decryptedData = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      return (decryptedData[0])
    }
  }

  render () {
    return (

      <div className='Login'>

        {!this.state.admin
          ? <div>
            <div className='heading'>Login</div>
            <p className='subtitles'>
          Username
            </p>
            <input className='username' name='username' type='text' placeholder='Username' />
            <p className='subtitles'>
          Password
            </p>

            <p>
              <input className='password ' name='password' type='password' placeholder='Password' />
            </p>
            {this.state.validationErrror
              ? <div className='incorrect-details'>Incorrect details</div> : null
            }
            <p>
              <button className='button' onClick={this.validation}>Login</button>
            </p>
          </div>
          : <Admin />
        }
      </div>
    )
  }
}

export default Login
