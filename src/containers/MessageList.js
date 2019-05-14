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
    this.listRef = React.createRef()
    this.getMessage = this.getMessage.bind(this)
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.messages.length !== prevProps.messages.length) {
      this.listRef.current.scrollToRow(this.props.messages.length)
      this.listRef.current.recomputeRowHeights(this.props.messages.length)
      for (const x of this.props.messages) {
        if (!this.props.users[x.user]) this.props.dispatch(fetchUser(x.user))
      }
    }
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
            ref={this.listRef}
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

const mapStateToProps = ({ rooms, user, router }) => {
  const active = router.location.pathname.split('/')[2]
  return {
    channels: rooms.channels,
    messages: (rooms.messages[active] || []).reduce((a, x) => {
      const prev = a[a.length - 1] || {}
      const match = /(?:https?:\/\/)?(?:www\.)?localhost:8081\/i\/(.{6})/.exec(prev.content)
      if (x.user === prev.userID && !match) { // merge messages from same user
        prev.messages.push(x.content)
      } else { // add message from other user to list
        const item = {
          ...x,
          user: user.users.find(y => y.id === x.user) || { name: 'loading...' },
          userID: x.user,
          timestamp: moment(x.timestamp).fromNowOrDate(),
          messages: [x.content]
        }
        a.push(item)
      }
      return a
    }, []),
    users: user.users
  }
}

export default connect(mapStateToProps)(MessageList)
