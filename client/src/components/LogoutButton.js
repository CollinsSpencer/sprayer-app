import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Button,
} from 'react-bootstrap'
import {
  logoutUser,
} from '../actions'

const LogoutButton = ({ logoutUser }) => {
  return (
    <Button
      onClick={logoutUser}
      variant="outline-secondary"
    >
      Logout
    </Button>
  )
}

const mapDispatchToProps = {
  logoutUser,
}

export default withRouter(connect(null, mapDispatchToProps)(LogoutButton))
