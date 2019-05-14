const initialState = {
  // rooms: [],
  channels: [/*{
    id: '0',
    name: 'Channel 1',
    loaded: true
  }, {
    id: '1',
    name: 'Channel 2',
    loaded: false
  }*/],
  active: '0',
  messages: {
    /*'0': [{
      user: '1',
      content: 'Test message\n```line\n2```',
      timestamp: 1556727762060
    }, {
      user: '0',
      content: '*Test* **message** ***2*** ~~strikethrough~~ __underline__',
      timestamp: 1556723762060
    }, {
      user: '0',
      content: '`Test message group`',
      timestamp: 1556723162060
    }, {
      user: '1',
      content: `test invite to private channel ${window.location.origin}/i/abcdef aaaa`,
      timestamp: 1553723762060
    }, {
      user: '1',
      content: `continued line after embed`,
      timestamp: 1553623762060
    }],
    '1': []*/
  },
  invites: [/*{
    id: '0',
    slug: 'abcdef',
    name: 'private channel',
    info: '2 members'
  }*/]
}

export default function (state = initialState, { type, data }) {
  switch (type) {
    case 'ROOMS_SET_VALUE':
      return {
        ...state,
        [data.key]: data.value
      }
    case 'ADD_CHANNEL':
      return {
        ...state,
        channels: [...state.channels].concat(data instanceof Array ? data : [data])
      }
    case 'ADD_INVITE':
      return {
        ...state,
        invites: [...state.invites].concat(data instanceof Array ? data : [data])
      }
    case 'ADD_MESSAGE':
      const id = data instanceof Array ? data[0].channel : data.channel
      const newMessages = [...(state.messages[id] || [])].concat(data instanceof Array ? data : [data])
      return {
        ...state,
        messages: {
          ...state.messages,
          [id]: newMessages
        }
      }
    case 'SET_CHANNEL_LOADED':
      return {
        ...state,
        channels: [...state.channels].map(c => {
          c.loaded = c.id === data
          return c
        })
      }
    default: return state
  }
}
