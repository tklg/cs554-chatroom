// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { connect } from 'react-redux'
import MessageList from './MessageList'
import { sendMessage, setValue } from '../actions'
import { loadMessages } from '../actions/rooms'

import './channel.scss'

class Channel extends React.Component {
  constructor () {
    super()
    this.state = {}

    this.setValue = this.setValue.bind(this)
    this.send = this.send.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(setValue('activeChannel', this.props.activeChannel))
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.activeChannel !== this.props.activeChannel) {
      this.props.dispatch(setValue('activeChannel', this.props.activeChannel))

      let c
      if ((c = this.props.channels.find(x => x.id === this.props.activeChannel))) {
        this.props.dispatch(loadMessages(c.id))
      }
    }
  }
  setValue (str) {
    this.setState({
      [this.props.activeChannel]: str
    })
  }
  send (e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      this.props.dispatch(sendMessage(this.props.activeChannel, this.state[this.props.activeChannel]))
      this.setValue('')
    }
  }
  render () {
    return <div className='channel flex flex-container flex-vertical'>
      <MessageList />
      <footer className='channel-footer'>
        <form onKeyDown={this.send}>
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
