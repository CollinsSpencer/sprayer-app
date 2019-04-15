import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
} from 'react-router-dom'
import BackButton from '../components/BackButton';

class RecordPage extends Component {
  render() {
    return (
      <div>
        <BackButton></BackButton>
        <h2>Record Data</h2>
      </div>
    )
  }
}

export default withRouter(connect()(RecordPage))
