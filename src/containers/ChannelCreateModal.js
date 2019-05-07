import React from 'react'
import { connect } from 'react-redux'
import Modal from '../components/Modal'
import UnderlineInput from '../components/UnderlineInput'
import { createChannel } from '../actions/rooms'
import { setValue } from '../actions'
import './invitemodal.scss'

class InviteModal extends React.Component {
  constructor () {
    super()
    this.state = {
      name: ''
    }
    this.close = this.close.bind(this)
    this.update = this.update.bind(this)
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.data && !this.props.data) {
      this.setState({
        name: ''
      })
    }
  }
  update (e) {
    this.setState({
      name: e.target.value
    })
  }
  close () {
    this.setState({
      name: ''
    })
    this.props.dispatch(setValue('channelCreateModal', null))
  }
  render () {
    return <Modal active={this.props.data} className='invite-modal' onClose={this.close} >
      <header className='modal-header'><h1>New channel</h1></header>
      <div className='channel-name'>
        <UnderlineInput value={this.state.name} onChange={this.update} placeholder='Channel name' />
      </div>
      <footer>
        <div className='buttons'>
          <button className='btn btn-clear' onClick={this.close} >Cancel</button>
          <button className='btn' onClick={e => this.props.dispatch(createChannel(this.state.name))} >Create</button>
        </div>
      </footer>
    </Modal>
  }
}
/*
const mapStateToProps = ({ router }) => {
  const active = router.location.pathname.split('/')[2]
  return {
    activeChannel: active
  }
}
*/

export default connect()(InviteModal)
