const initialState = {
  self: {
    name: 'User 1'
  },
  users: {
    '0': {
      name: 'User 1'
    },
    '1': {
      name: 'User 2'
    }
  }
}

export default function (state = initialState, { type, data }) {
  switch (type) {
    default: return state
  }
}
