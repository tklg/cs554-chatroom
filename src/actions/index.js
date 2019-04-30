// I pledge my honor that I have abided by the Stevens Honor System

import io from 'socket.io-client'
let socket
let u = window.location.origin
if (/8081/.test(u)) u = u.replace('8081', '3000')

export const connect = () => (dispatch, getState) => {
  socket = io.connect(u)

  socket.on('connect', () => {
    dispatch({
      type: 'CONNECTED',
      data: true
    })
  })

  socket.on('disconnect', () => {
    dispatch({
      type: 'CONNECTED',
      data: false
    })
  })

  socket.on('message', (m) => {
    
  })
}

export const setWorking = (b) => ({
  type: 'SET_WORKING',
  data: b
})
