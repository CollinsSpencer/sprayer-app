import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  logoutUser,
} from '../actions'

const LogoutButton = ({logoutUser}) => {
  return (
    <button
      onClick={logoutUser}>
      Logout
    </button>
  )
}

const mapDispatchToProps = {
  logoutUser,
}

export default withRouter(connect(null, mapDispatchToProps)(LogoutButton))
