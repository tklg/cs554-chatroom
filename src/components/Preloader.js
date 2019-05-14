import React from 'react'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import { load, connect as connectSocket } from '../actions'

import './preloader.scss'

class Preloader extends React.Component {
  componentDidMount () {
    this.props.dispatch(load())
    if (!this.props.connected) this.props.dispatch(connectSocket())
  }
  render () {
    // preloader: load all messages, channels, users, then redirect to /channels/[first channel id]
    return <div className='preloader flex flex-container flex-center'>
      <Spinner />

      <div className='info'>
        <span>Loading: </span><span>{this.props.loadStep}</span>
      </div>
    </div>
  }
}

const mapStateToProps = ({ app }) => {
  let step
  for (const s in app.load) if (app.load[s]) step = s
  return {
    connected: app.connected,
    loadStep: step
  }
}

export default connect(mapStateToProps)(Preloader)
