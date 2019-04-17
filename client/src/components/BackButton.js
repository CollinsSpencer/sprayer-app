import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Button
} from 'react-bootstrap'

class BackButton extends Component {
  render() {
    return (
      <Button
        variant="link"
        onClick={(event) => this.handleClick(event)}>
          Back
      </Button>
    )
  }

  handleClick(e) {
    e.preventDefault()
    this.props.history.goBack()
  }
}

export default withRouter(BackButton)
