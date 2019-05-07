import Ajax from '../lib/Ajax'
import { setWorking } from './index'
import { push } from 'connected-react-router'

let _url = `${window.location.origin}/api`
if (window.location.origin.indexOf('localhost') > -1) _url = 'http://localhost:3000/api'
const getUrl = str => `${_url}/${str}`

export const setValue = (k, v) => ({
  type: 'LOGIN_SET_VALUE',
  data: { key: k, value: v }
})

export const setError = str => ({
  type: 'LOGIN_SET_ERROR',
  data: str
})

export const clearError = () => ({
  type: 'LOGIN_SET_ERROR',
  data: {
    login: '',
    register: ''
  }
})

export const login = (e) => async (dispatch, getState) => {
  e.preventDefault()
  dispatch(setWorking(true))
  dispatch(clearError())
  try {
    const { loginEmail: email, loginPassword: password } = getState().login
    /* const res = */await Ajax.post(getUrl('login'), {
      data: {
        email,
        password
      }
    })

    /* console.log(res)
    dispatch({
      type: 'SET_USER',
      data: res
    }) */
    dispatch(push('/'))
  } catch (e) {
    dispatch(setError({ login: e.toString() }))
  } finally {
    dispatch(setWorking(false))
  }
}

export const register = (e) => async (dispatch, getState) => {
  e.preventDefault()
  dispatch(setWorking(true))
  dispatch(clearError())
  try {
    const { registerEmail: email, registerPassword: password, registerPasswordConfirmation: passwordConfirmation } = getState().login
    /* const res = */await Ajax.post(getUrl('users'), {
      data: {
        email,
        password,
        passwordConfirmation
      }
    })

    /* console.log(res)
    dispatch({
      type: 'SET_USER',
      data: res
    }) */
    dispatch(push('/'))
  } catch (e) {
    dispatch(setError({ register: e.toString() }))
  } finally {
    dispatch(setWorking(false))
  }
}
