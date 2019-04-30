// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Progress from '../components/Progress'
import UnderlineInput from '../components/UnderlineInput'
import { setValue, login, register } from '../actions/login'
import './login.scss'

class Login extends React.Component {
  render () {
    if (this.props.loggedIn) return <Redirect to='/' />
    return <div className='login flex flex-container flex-center'>
      <div className='view flex-container'>
        <Progress working={this.props.working} />

        <form className='flex' onSubmit={e => this.props.dispatch(login(e))}>
          <h1>Log in</h1>
          <UnderlineInput
            placeholder='Email address'
            type='email'
            value={this.props.loginEmail}
            onChange={e => this.props.dispatch(setValue('loginEmail', e.target.value))}
            required />
          <UnderlineInput
            placeholder='Password'
            type='password'
            value={this.props.loginPassword}
            onChange={e => this.props.dispatch(setValue('loginPassword', e.target.value))}
            required />
          <span className='error'>{this.props.loginError}</span>
          <div className='buttons'>
            <button className='btn'>Log in</button>
          </div>
        </form>

        <form className='flex' onSubmit={e => this.props.dispatch(register(e))}>
          <h1>Sign up</h1>
          <UnderlineInput
            placeholder='Email address'
            type='email'
            value={this.props.registerEmail}
            pattern={/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/}
            onChange={e => this.props.dispatch(setValue('registerEmail', e.target.value))}
            required />
          <UnderlineInput
            placeholder='Password'
            type='password'
            value={this.props.registerPassword}
            onChange={e => this.props.dispatch(setValue('registerPassword', e.target.value))}
            required />
          <UnderlineInput
            placeholder='Password confirmation'
            type='password'
            value={this.props.registerPasswordConfirmation}
            onChange={e => this.props.dispatch(setValue('registerPasswordConfirmation', e.target.value))}
            required />
          <span className='error'>{this.props.registerError}</span>
          <div className='buttons'>
            <button className='btn'>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  }
}

const mapStateToProps = ({ app, login, user }) => {
  return {
    ...login,
    loggedIn: user.self !== null,
    working: app.working,
    loginError: login.error.login,
    registerError: login.error.register
  }
}

export default connect(mapStateToProps)(Login)
