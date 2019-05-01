import React from 'react'
import './progress.scss'

const Preloader = props => (
  <div className='preloader'>
    preloader: load all messages, channels, users, then redirect to /channels/[first channel id]
  </div>
)

export default Preloader
