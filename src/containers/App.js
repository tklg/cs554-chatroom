// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { connect } from 'react-redux'
import { connect as connectSocket, setValue } from '../actions'
import { Link } from 'react-router-dom'
import Progress from '../components/Progress'
import ChannelList from './ChannelList'
import Channel from './Channel'
import IconButton from '../components/IconButton'
import InviteModal from './InviteModal'
import ChannelCreateModal from './ChannelCreateModal'
import Icon from '../components/Icon'
import { push } from 'connected-react-router'
import './app.scss'

class App extends React.Component {
  componentWillMount () {
    if (!this.props.user) this.props.dispatch(push('/'))
  }
  componentDidMount () {
    if (!this.props.connected) this.props.dispatch(connectSocket())
  }
  render () {
    if (!this.props.user) return <div />
    const activeChannelID = this.props.match.url.replace('/channels/', '')
    const activeChannel = this.props.channels.find(x => x.id === activeChannelID)

    return <div className='app flex flex-container flex-vertical'>
      <div className={'connection-issue' + (this.props.connected ? '' : ' active')}>
        Could not connect to server. Trying again...
      </div>
      <header className='header flex-container'>
        <h1 className='logo room-name flex-container'>
          <span className='flex'>Chatroom</span>
          <IconButton icon='add' onClick={e => this.props.dispatch(setValue('channelCreateModal', {}))} />
        </h1>
        <h2 className='channel-name flex flex-container'>
          <span className='flex flex-container'>
            <Icon icon='pound' className='pound' />
            <span className='flex'>{activeChannel.name}</span>
          </span>
          <nav>
            <IconButton icon='account-plus' onClick={e => this.props.dispatch(setValue('inviteModal', {}))} />
          </nav>
        </h2>
      </header>
      <main className='flex flex-container flex-vertical'>
        <Progress working={this.props.working} />
        <div className='flex flex-container'>
          <div className='flex-container flex-vertical left-nav'>
            <ChannelList />
            <div className='user-info flex-container'>
              <div className='flex flex-container flex-vertical'>
                <span className='name'>{this.props.user.name}</span>
                <a href='/logout'>Log out</a>
              </div>
              <Link to='/settings'><IconButton icon='settings' /></Link>
            </div>
          </div>
          <Channel />
        </div>
      </main>

      <InviteModal data={this.props.inviteModal} />
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

export default connect(mapStateToProps)(App)
