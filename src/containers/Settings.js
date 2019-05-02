import React from 'react'
import { connect } from 'react-redux'
import './settings.scss'

class Settings extends React.Component {
  render () {
    return 'settings'
  }
}

const mapStateToProps = ({ app, user }) => {
  return {
    ...app,
    user: user.self
  }
}

export default connect(mapStateToProps)(Settings)
