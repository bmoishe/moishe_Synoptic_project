import React, { Component } from 'react'
import './Admin.css'
class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      permisions: ''
    }
    this.sendData = this.sendData.bind(this)
  }

  async sendData () {
    const url = 'http://localhost:5000/api/users/'
    const username = await document.getElementsByClassName('username-admin')
    const password = await document.getElementsByClassName('password-admin')
    const permisions = await document.getElementsByClassName('permisions')

    this.setState({
      username: username.username.value,
      password: password.password.value,
      permisions: permisions.permisions.value
    })
    const data = {
      username: username.username.value,
      password: password.password.value,
      permisions: permisions.permisions.value
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
      window.location.reload()
    } catch (error) {
      console.error('Error:', error)
    }
  }
  render () {
    return (
      <div >
        <div className='heading'>
          Admin
        </div>
        <div className='welcome'>
          <span className='logout' onClick={() => window.location.reload()}> Logout
          </span>
        </div>
        <form className='form-container'>
          <input className='username-admin' type='text' name='username' placeholder='Username' />
          <input className='password-admin'type='password' name='password' placeholder='Password' />
          <select className='permisions'name='permisions'>
            <option value='edit'>Edit </option>
            <option value='restricted'>Restricted</option>
            <option value='view'> View</option>
          </select>
          <div className='admin-button' onClick={this.sendData}> <div className='admin-button-text'> Register a new user</div></div>
        </form>
      </div>
    )
  }
}
export default Admin
