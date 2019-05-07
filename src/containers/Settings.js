import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Progress from '../components/Progress'
import IconButton from '../components/IconButton'
import UnderlineInput from '../components/UnderlineInput'
import { saveUser } from '../actions'

import './settings.scss'

class Settings extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
      oldPassword: ''
    }
    this.setValue = this.setValue.bind(this)
  }
  componentDidMount () {
    const { email, name } = this.props.user
    this.setState({
      email,
      name
    })
  }
  setValue (key, value) {
    this.setState({
      [key]: value
    })
  }
  render () {
    return <div className='app settings flex flex-container flex-vertical'>
      <header className='header flex-container'>
        <h1 className='logo room-name flex-container'>
          <Link to={`/channels/${this.props.activeChannel}`}><IconButton icon='arrow-left' /></Link>
          <span className='flex'>Settings</span>
        </h1>
        <h2 className='flex' />
        <span className={'connection' + (this.props.connected ? '' : ' red')} />
      </header>
      <main className='flex flex-container flex-vertical'>
        <Progress working={this.props.working} />
        <div className='flex'>
          <div className='group'>
            <h1>Account settings</h1>
            <UnderlineInput
              placeholder='Display name'
              value={this.state.name}
              onChange={e => this.setValue('name', e.target.value)}
              required />
            <UnderlineInput
              placeholder='Email address'
              type='email'
              value={this.state.email}
              pattern={/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/}
              onChange={e => this.setValue('email', e.target.value)}
              required />
            <UnderlineInput
              placeholder='New password'
              type='password'
              value={this.state.password}
              onChange={e => this.setValue('password', e.target.value)} />
            <UnderlineInput
              placeholder='Confirm new password'
              type='password'
              value={this.state.passwordConfirmation}
              onChange={e => this.setValue('passwordConfirmation', e.target.value)} />
            <UnderlineInput
              placeholder='Current password'
              type='password'
              value={this.state.oldPassword}
              onChange={e => this.setValue('oldPassword', e.target.value)} />

            <div className='buttons'>
              <button className='btn' onClick={e => this.props.dispatch(saveUser(this.state))}>Save</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  }
}

const mapStateToProps = ({ app, user, rooms }) => {
  return {
    ...app,
    activeChannel: rooms.active,
    user: user.self
  }
}

export default connect(mapStateToProps)(Settings)
