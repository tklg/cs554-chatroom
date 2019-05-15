// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { connect } from 'react-redux'
import { parser } from '../lib/Markdown'
import Invite from '../components/Invite'
import { fetchInvite } from '../actions/rooms'

import './message.scss'

const fetching = new Map()

class Message extends React.Component {
  constructor () {
    super()
    this.state = {
      embeds: []
    }
    this.updateEmbeds = this.updateEmbeds.bind(this)
  }
  updateEmbeds () {
    const embeds = []
    for (const msg of this.props.messages) {
      const match = /(?:https?:\/\/)?(?:www\.)?localhost:3000\/i\/(.{6})/.exec(msg)
      if (match) {
        const slug = match[1]
        const invite = this.props.invites.find(x => x.slug === slug)
        if (!invite) {
          if (!fetching.has(slug)) {
            fetching.set(slug, true)
            this.props.dispatch(fetchInvite(slug))
          }
        } else {
          embeds.push(<Invite {...invite} key={invite.id} dispatch={this.props.dispatch} />)
        }
      }
    }
    return embeds
  }
  componentDidMount () {
    this.setState({
      embeds: this.updateEmbeds()
    })
  }
  componentDidUpdate (prevProps, prevState) {
    const embeds = this.updateEmbeds()
    if (prevState.embeds.length !== embeds.length) {
      this.setState({
        embeds
      }, () => {
        this.props.measure()
      })
    }
    if (prevProps.messages.length !== this.props.messages.length) {
      this.props.measure()
    }
  }
  render () {
    // call this.props.measure in onLoad of any images
    return <div className='message' key={this.props.keyProp} style={this.props.style} >
      <span className='name'>{this.props.user.name}</span>
      <span className='timestamp'>{this.props.timestamp}</span>
      {
        this.props.messages.map((x, i) => <div className='p' key={i}>{parser(x)}</div>)
      }
      <div className='embeds'>
        {this.state.embeds}
      </div>
    </div>
  }
}

const mapStateToProps = ({ rooms }, props) => {
  return {
    invites: rooms.invites,
    ...props
  }
}

export default connect(mapStateToProps)(Message)
