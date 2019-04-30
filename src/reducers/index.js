// I pledge my honor that I have abided by the Stevens Honor System'

import { combineReducers } from 'redux'
import user from './user'
import rooms from './rooms'
import login from './login'

function app (state = {
  working: false,
  connected: false
}, { type, data }) {
  switch (type) {
    case 'SET_WORKING':
      return {
        ...state,
        working: data || !state.working
      }
    case 'CONNECTED':
      return {
        ...state,
        connected: data || false
      }
    default: return state
  }
}

export default combineReducers({
  user,
  rooms,
  login,
  app
})
