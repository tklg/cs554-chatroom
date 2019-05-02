// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { connect } from 'react-redux'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import moment from 'moment'
import Message from './Message'
import { fetchUser } from '../actions/rooms.js'

import './messagelist.scss'

const cache = new CellMeasurerCache({
  defaultHeight: 80,
  fixedWidth: true
})

moment.fn.fromNowOrDate = function (x) {
  if (Math.abs(moment().diff(this)) > 60000 * 60 * 24) { // 1 day
    return this.format('MMMM D [at] h:mm a')
  }
  return this.fromNow(x)
}

class MessageList extends React.Component {
  constructor () {
    super()
    this.getMessage = this.getMessage.bind(this)
  }
  getMessage ({ index, key, style, parent }) {
    const message = this.props.messages[index]
    return (<CellMeasurer
      columnIndex={0}
      rowIndex={index}
      key={key}
      cache={cache}
      parent={parent}
    >
      {({ getRowHeight, measure }) => (<Message {...message} measure={measure} style={style} keyProp={key} />)}
    </CellMeasurer>)
  }
  render () {
    return <div className='message-container flex'>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            rowCount={this.props.messages.length}
            rowRenderer={this.getMessage} />
        )}
      </AutoSizer>
    </div>
  }
}

const mapStateToProps = ({ rooms, user, router }, dispatch) => {
  const active = router.location.pathname.split('/')[2]
  return {
    channels: rooms.channels,
    messages: rooms.messages[active].reduce((a, x) => {
      const prev = a[a.length - 1] || {}
      if (x.user === prev.userID) { // merge messages from same user
        prev.messages.push(x.content)
      } else { // add message from other user to list
        const item = {
          ...x,
          user: user.users.find(y => y.id === x.user) || { name: 'loading...' },
          userID: x.user,
          timestamp: moment(x.timestamp).fromNowOrDate(),
          messages: [x.content]
        }
        delete item.content
        if (!user.users[x.user]) dispatch(fetchUser(x.user))
        a.push(item)
      }
      return a
    }, [])
  }
}

export default connect(mapStateToProps)(MessageList)
