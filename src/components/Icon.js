import React from 'react'
import './icon.scss'

function getSVG (icon) {
  switch (icon) {
    case 'delete': return 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'
    case 'add': return 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'
    case 'close': return 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
    case 'check': return 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z'
    case 'logout': return 'M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z'
    case 'dots-vertical': return 'M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z'
    default: return icon || 'missing icon prop'
  }
}

function bsvg (icon) {
  return `<svg viewBox="0 0 24 24"><path d="${getSVG(icon)}" /></svg>`
}

const Icon = props => {
  return (
    <span className={'icon' + (props.className ? ' ' + props.className : '')} dangerouslySetInnerHTML={{ __html: bsvg(props.icon) }} />
  )
}

export default Icon
