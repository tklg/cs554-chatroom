const initialState = {
  loginEmail: '',
  loginPassword: '',
  registerEmail: '',
  registerPassword: '',
  registerPasswordConfirmation: '',
  error: {
    login: '',
    register: ''
  },
  page: 'login'
}

export default function (state = initialState, { type, data }) {
  switch (type) {
    case 'LOGIN_SET_VALUE':
      return {
        ...state,
        [data.key]: data.value
      }
    case 'LOGIN_SET_ERROR':
      return {
        ...state,
        error: {
          ...state.error,
          ...data
        }
      }
    default: return state
  }
}
