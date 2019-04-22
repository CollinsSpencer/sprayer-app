import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  withRouter
} from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavDropdown
} from 'react-bootstrap'
import {
  setModeToPlanting,
  setModeToSpraying,
  setModeToHarvesting,
} from '../actions'

class SprayBar extends Component {
  state = {
    mode: setModeToSpraying
  }
  handleChange = (mode) => {
    this.setState({ mode });
  }

  handleClick(e) {
    e.preventDefault();
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
            <NavDropdown title="Select Mode" id="basic-nav-dropdown" onSelect={this.handleChange}>
              <NavDropdown.Item eventKey={setModeToPlanting}>Plant</NavDropdown.Item>
              <NavDropdown.Item eventKey={setModeToSpraying}>Spray</NavDropdown.Item>
              <NavDropdown.Item eventKey={setModeToHarvesting}>Harvest</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  const { mode } = state
  return { currentMode: mode }
}

const mapDispatchToProps = {
  setModeToPlanting,
  setModeToSpraying,
  setModeToHarvesting,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SprayBar))