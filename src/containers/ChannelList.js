// I pledge my honor that I have abided by the Stevens Honor System
import React from 'react'
import { connect } from 'react-redux'
import { List, AutoSizer } from 'react-virtualized'
import Icon from '../components/Icon'

import './channellist.scss'

class ChannelList extends React.Component {
  constructor () {
    super()
    this.getChannel = this.getChannel.bind(this)
  }
  getChannel ({ index, key, style }) {
    const channel = this.props.channels[index]
    return <div className='channel flex-container' key={key} style={style}>
      <Icon icon='pound' />
      <span className='flex'>{channel.name}</span>
    </div>
  }
  render () {
    return <nav className='channel-list'>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            rowHeight={40}
            rowCount={this.props.channels.length}
            rowRenderer={this.getChannel} />
        )}
      </AutoSizer>
    </nav>
  }
}

const mapStateToProps = ({ rooms }) => {
  return {
    channels: rooms.channels
  }
}

export default connect(mapStateToProps)(ChannelList)
