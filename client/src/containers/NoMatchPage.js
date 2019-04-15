import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class NoMatchPage extends Component {
  render() {
    return (
      <div>
        <h2>404</h2>
      </div>
    )
  }
}

export default withRouter(connect()(NoMatchPage))
