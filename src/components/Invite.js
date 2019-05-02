import React from 'react'
import { acceptInvite } from '../actions/rooms'
import './invite.scss'

const Invite = props => (
  <div className='invite flex-container'>
    <h1 className='flex'>{`#${props.name}`}</h1>
    <button className='btn' onClick={e => props.dispatch(acceptInvite(props.slug))}>Join</button>
  </div>
)

export default Invite
