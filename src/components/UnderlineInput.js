'use strict'

import React from 'react'
import './underlineinput.scss'

const UnderlineInput = ({ className, placeholder, pattern, iRef, ...props }) => (
  <div className={'underlined-input ' + (className || '')}>
    <input
      ref={iRef}
      className={(props.value.length ? 'has-content' : '') + (pattern
        ? (props.value.length && !pattern.test(props.value) ? ' invalid' : '')
        : '')}
      autoComplete='nothing'
      {...props} />
    <div className='reacts-to'>
      <label className='placeholder'>{placeholder}</label>
      <div className='underline' />
    </div>
  </div>
)

export default UnderlineInput
