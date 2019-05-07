import React from 'react'
import { connect } from 'react-redux'
import Modal from '../components/Modal'
import { createInvite } from '../actions/rooms'
import { setValue } from '../actions'
import './invitemodal.scss'

class InviteModal extends React.Component {
  constructor () {
    super()
    this.close = this.close.bind(this)
    this.iRef = React.createRef()
  }
  componentDidUpdate (prevProps) {
    if (this.props.data && !prevProps.data) {
      this.props.dispatch(createInvite(this.props.activeChannel))
    }
    if (prevProps.data && this.props.data && this.props.data.url && !prevProps.data.url) {
      this.iRef.current.select()
    }
  }
  close () {
    this.props.dispatch(setValue('inviteModal', null))
  }
  render () {
    return <Modal active={this.props.data} className='invite-modal' onClose={this.close} >
      <header className='modal-header'><h1>New invite</h1></header>
      <div className='invite-link'>
        <input ref={this.iRef} value={(this.props.data && this.props.data.url) ? this.props.data.url : ''} placeholder='Generating invite...' readOnly onFocus={e => e.target.select()} />
      </div>
      <footer>
        <div className='buttons'>
          <button className='btn' onClick={this.close} >Done</button>
        </div>
      </footer>
    </Modal>
  }
}

const mapStateToProps = ({ router }) => {
  const active = router.location.pathname.split('/')[2]
  return {
    activeChannel: active
  }
}

export default connect(mapStateToProps)(InviteModal)
