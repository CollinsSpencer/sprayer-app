import React, { Component } from 'react'
import {
  withRouter
} from 'react-router-dom'
import {
  Navbar,
  Nav
} from 'react-bootstrap'

class SprayBar extends Component {
  handleClick(e) {
    e.preventDefault()
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/" onSelect={(event) => this.handleClick(event)}>Sprayer App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/record" onSelect={(event) => this.handleClick(event)}>Record Data</Nav.Link>
            <Nav.Link href="/data" onSelect={(event) => this.handleClick(event)}>View Data</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(SprayBar)