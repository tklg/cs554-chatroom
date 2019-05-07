import Ajax from '../lib/Ajax'
import { setWorking, setValue } from './index'
import { push } from 'connected-react-router'

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

export const createInvite = (id) => async (dispatch, getState) => {
  try {
    dispatch(setWorking(true))
    const invite = await Ajax.post(getUrl(`invite/${id}`))
    dispatch({ type: 'CREATE_INVITE', data: invite })
  } catch (e) {

  } finally {
    dispatch(setWorking(false))
  }
}

export const acceptInvite = (slug) => async (dispatch, getState) => {
  try {
    dispatch(setWorking(true))
    const channel = await Ajax.post(getUrl(`invite/${slug}/accept`))

    dispatch({
      type: 'ADD_CHANNEL',
      data: channel
    })
    dispatch(push(channel.id))
  } catch (e) {

  } finally {
    dispatch(setWorking(false))
  }
}

export const createChannel = name => async (dispatch, getState) => {
  try {
    dispatch(setWorking(true))
    const channel = await Ajax.post(getUrl(`channels`), {
      data: {
        name
      }
    })

    dispatch({
      type: 'ADD_CHANNEL',
      data: channel
    })
    dispatch(push(channel.id))
    dispatch(setValue('channelCreateModal', null))
  } catch (e) {

  } finally {
    dispatch(setWorking(false))
  }
}

export const loadMessages = id => async (dispatch, getState) => {
  const { rooms } = getState()
  if (rooms.channels.find(x => x.id === rooms.active).loaded) return
  try {
    dispatch(setWorking(true))
    const messages = await Ajax.get(getUrl(`channels/${id}/messages`))

    dispatch({
      type: 'ADD_MESSAGE',
      data: messages
    })
    dispatch({
      type: 'SET_CHANNEL_LOADED',
      data: id
    })
  } catch (e) {

  } finally {
    dispatch(setWorking(false))
  }
}
