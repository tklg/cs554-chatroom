// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { connect } from 'react-redux'
import MessageList from './MessageList'

import './channel.scss'

class Channel extends React.Component {
  constructor () {
    super()
    this.state = {}

    this.setValue = this.setValue.bind(this)
  }
  setValue (str) {
    this.setState({
      [this.props.activeChannel]: str
    })
  }
  render () {
    return <div className='channel flex flex-container flex-vertical'>
      <MessageList />
      <footer className='channel-footer'>
        <form>
          <textarea value={this.state[this.props.activeChannel] || ''} onChange={e => this.setValue(e.target.value)} />
          <button type='submit' className='hidden' />
        </form>
      </footer>
    </div>
  }
}

const mapStateToProps = ({ rooms, router }) => {
  const active = router.location.pathname.split('/')[2]
  return {
    channels: rooms.channels,
    activeChannel: active
  }
}

export default connect(mapStateToProps)(Channel)
