const initialState = {
  // rooms: [],
  channels: [{
    id: '0',
    name: 'Channel 1'
  }, {
    id: '1',
    name: 'Channel 2'
  }]
}

export default function (state = initialState, { type, data }) {
  switch (type) {
    default: return state
  }
}
