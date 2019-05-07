// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { connect } from 'react-redux'
import { connect as connectSocket, setValue } from '../actions'
import Progress from '../components/Progress'
import UnderlineInput from '../components/UnderlineInput'
import Icon from '../components/Icon'
import ChannelCreateModal from './ChannelCreateModal'
import { push } from 'connected-react-router'
import './startscreen.scss'

class StartScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      invite: ''
    }
    this.setValue = this.setValue.bind(this)
  }
  setValue (e) {
    this.setState({
      invite: e.target.value
    }, () => {
      if (/(?:https?:\/\/)?(?:www\.)?localhost:8081\/i\/(.{6})/.test(e.target.value)) {
        this.dispatch(push(e.target.value))
      }
    })
  }
  render () {
    return <div className='app startscreen flex flex-container flex-vertical'>
      <div className={'connection-issue' + (this.props.connected ? '' : ' active')}>
        Could not connect to server. Trying again...
      </div>
      <header className='header flex-container'>
        <h1 className='logo room-name flex-container'>
          <span className='flex'>Chatroom</span>
        </h1>
        <h2 className='channel-name flex flex-container' />
      </header>
      <main className='flex flex-container flex-vertical'>
        <Progress working={this.props.working} />
        <div className='flex flex-container flex-center'>
          <div className='options'>
            <button className='btn flex-container' onClick={e => this.props.dispatch(setValue('channelCreateModal', {}))}>
              <span className='flex'>Create a new channel</span>
              <Icon icon='add' />
            </button>
            <span>or</span>
            <h2>Enter a channel invite</h2>
            <UnderlineInput
              autoFocus
              placeholder='https://localhost:8081/i/123456'
              value={this.state.invite}
              onChange={this.setValue} />
          </div>
        </div>
      </main>

      <ChannelCreateModal data={this.props.channelCreateModal} />
    </div>
  }
}

const mapStateToProps = ({ app, rooms, user }) => {
  return {
    ...app,
    channels: rooms.channels,
    user: user.self
  }
}

export default connect(mapStateToProps)(StartScreen)
