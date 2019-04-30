// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { connect } from 'react-redux'
import { connect as connectSocket } from '../actions'

import Progress from '../components/Progress'
import './app.scss'

class App extends React.Component {
  componentDidMount () {
    if (!this.props.connected) this.props.dispatch(connectSocket())
  }
  render () {
    return <div className='app flex flex-container flex-vertical'>
      <header className='header flex-container'>
        <h1 className='flex'>Chatroom</h1>
        <span className={'connection' + (this.props.connected ? '' : ' red')} />
      </header>
      <main className='flex flex-container flex-vertical'>
        <Progress working={this.props.working} />

      </main>
    </div>
  }
}

const mapStateToProps = ({ app }) => {
  return {
    ...app
  }
}

export default connect(mapStateToProps)(App)
