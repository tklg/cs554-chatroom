import Ajax from '../lib/Ajax'
import { setWorking } from './index'

let u = window.location.origin
if (/8081/.test(u)) u = u.replace('8081', '3000')
const getUrl = str => `${u}/api/${str}`

export const fetchUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(setWorking(true))
    const user = await Ajax.get(getUrl(`members/${id}`))
    dispatch({ type: 'ADD_MEMBER', data: user })
  } catch (e) {

  } finally {
    dispatch(setWorking(false))
  }
}

export const fetchInvite = (id) => async (dispatch, getState) => {
  try {
    dispatch(setWorking(true))
    const invite = await Ajax.get(getUrl(`invite/${id}`))
    dispatch({ type: 'ADD_INVITE', data: invite })
  } catch (e) {

  } finally {
    dispatch(setWorking(false))
  }
}
