// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { connect } from 'react-redux'

import './channel.scss'

class Channel extends React.Component {
  render () {
    return <div className='channel flex flex-container flex-vertical'>
      <div className='message-container flex' />
      <footer className='channel-footer'>
        <form>
          <textarea value={'abcABC'} />
          <button type='submit' className='hidden' />
        </form>
      </footer>
    </div>
  }
}

const mapStateToProps = ({ rooms }) => {
  return {
    channels: rooms.channels
  }
}

export default connect(mapStateToProps)(Channel)
