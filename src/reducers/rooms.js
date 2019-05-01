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
    }],
    '1': []
  }
}

export default function (state = initialState, { type, data }) {
  switch (type) {
    default: return state
  }
}
