import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Link,
  withRouter,
} from 'react-router-dom'
import ModeSelector from '../components/ModeSelector'
import FieldSelector from '../components/FieldSelector'
import RecentData from '../components/RecentData'

class HomePage extends Component {
  render() {
    return (
      <div>
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

export default withRouter(connect()(HomePage))
