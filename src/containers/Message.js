// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { parser } from '../lib/Markdown'

import './message.scss'

export default class Message extends React.Component {
  render () {
    // call this.props.measure in onLoad of any images
    return <div className='message' key={this.props.keyProp} style={this.props.style} >
      <span className='name'>{this.props.user.name}</span>
      <span className='timestamp'>{this.props.timestamp}</span>
      {
        this.props.messages.map((x, i) => <div className='p' key={i}>{parser(x)}</div>)
      }
    </div>
  }
}
