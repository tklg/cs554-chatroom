import React from 'react'
import './modal.scss'

const Modal = props => (
  <div className={'modal-container flex-container flex-center' + (props.active ? ' active' : '') + (' ' + props.className)} onClick={props.onClose}>
    <div className='modal' onClick={e => e.stopPropagation()} >
      {props.children}
    </div>
  </div>
)

export default Modal
