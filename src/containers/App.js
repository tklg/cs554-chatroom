// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { connect } from 'react-redux'
import { connect as connectSocket } from '../actions'

import Progress from '../components/Progress'
import ChannelList from './ChannelList'
import Channel from './Channel'
import IconButton from '../components/IconButton'
import Icon from '../components/Icon'
import './app.scss'

class App extends React.Component {
  componentDidMount () {
    if (!this.props.connected) this.props.dispatch(connectSocket())
  }
  render () {
    const activeChannelID = this.props.match.url.replace('/channels/', '')
    const activeChannel = this.props.channels.find(x => x.id === activeChannelID)

    return <div className='app flex flex-container flex-vertical'>
      <header className='header flex-container'>
        <h1 className='logo room-name flex-container'>
          <span className='flex'>Chatroom</span>
          <IconButton icon='add' />
        </h1>
        <h2 className='channel-name flex flex-container'>
          <span className='flex flex-container'>
            <Icon icon='pound' className='pound' />
            <span className='flex'>{activeChannel.name}</span>
          </span>
          <nav>
            <IconButton icon='account-plus' />
          </nav>
        </h2>
        <span className={'connection' + (this.props.connected ? '' : ' red')} />
      </header>
      <main className='flex flex-container flex-vertical'>
        <Progress working={this.props.working} />
        <div className='flex flex-container'>
          <ChannelList />
          <Channel />
        </div>
      </main>
    </div>
  }
}

const mapStateToProps = ({ app, rooms }) => {
  return {
    ...app,
    channels: rooms.channels
  }
}

export default connect(mapStateToProps)(App)
