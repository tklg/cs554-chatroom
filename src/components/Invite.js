import React from 'react'
import './invite.scss'

const Invite = props => (
  <div className='invite flex-container'>
    <h1 className='flex'>{`#${props.name}`}</h1>
    <button className='btn'>Join</button>
  </div>
)

export default Invite
