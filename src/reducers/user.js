const initialState = {
  self: {
    name: 'User 1',
    email: 'test@test.test',
    password: '',
    passwordConfirmation: ''
  },
  users: [
    {
      id: '0',
      name: 'User 1'
    }, {
      id: '1',
      name: 'User 2'
    }
  ]
}

export default function (state = initialState, { type, data }) {
  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        self: data
      }
    case 'ADD_MEMBER':
      return {
        ...state,
        users: [...state.users].concat(data instanceof Array ? data : [data])
      }
    default: return state
  }
}
