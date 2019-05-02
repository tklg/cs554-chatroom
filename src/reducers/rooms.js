const initialState = {
  // rooms: [],
  channels: [{
    id: '0',
    name: 'Channel 1'
  }, {
    id: '1',
    name: 'Channel 2'
  }],
  active: '0',
  messages: {
    '0': [{
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
    '1': []
  },
  invites: [{
    id: '0',
    slug: 'abcdef',
    name: 'private channel'
  }]
}

export default function (state = initialState, { type, data }) {
  switch (type) {
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
      const newMessages = [...state.messages[data.channel]].concat(data instanceof Array ? data : [data])
      return {
        ...state,
        messages: {
          ...state.messages,
          [data.channel]: newMessages
        }
      }
    default: return state
  }
}
