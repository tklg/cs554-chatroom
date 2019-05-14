const initialState = {
  self: null,
  users: [
    /*{
      id: '0',
      name: 'User 1'
    }, {
      id: '1',
      name: 'User 2'
    }*/
  ]
}

export default function (state = initialState, { type, data }) {
  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        self: data,
        users: [...state.users, data]
      }
    case 'ADD_MEMBER':
      return {
        ...state,
        users: [...state.users, ...(data instanceof Array ? data : [data])]
      }
    default: return state
  }
}
