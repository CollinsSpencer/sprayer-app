import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Link,
  withRouter,
} from 'react-router-dom'

import FieldSelector from '../components/FieldSelector'
import LogoutButton from '../components/LogoutButton'
import ModeSelector from '../components/ModeSelector'
import RecentData from '../components/RecentData'

class HomePage extends Component {
  render() {
    const {auth} = this.props
    return (
      <div>
        { auth.isAuthenticated ? (
          <LogoutButton></LogoutButton>
        ):(
          <Link to="/login"></Link>
        )}
        <ModeSelector></ModeSelector>
        <FieldSelector></FieldSelector>
        <Link to="/record">Record Data</Link>
        <hr />
        <RecentData></RecentData>
        <Link to="/data">View Data</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    auth,
  }
}

export default withRouter(connect(mapStateToProps)(HomePage))
