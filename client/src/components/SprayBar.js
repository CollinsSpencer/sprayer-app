import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavDropdown
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Modes,
  setModeToPlanting,
  setModeToSpraying,
  setModeToHarvesting,
} from '../actions'
import LogoutButton from '../components/LogoutButton'

class SprayBar extends Component {
  getModeDropdownText() {
    if (this.props.currentMode === Modes.PLANTING) {
      return 'Planting'
    } else if (this.props.currentMode === Modes.SPRAYING) {
      return 'Spraying'
    } else if (this.props.currentMode === Modes.HARVESTING) {
      return 'Harvesting'
    }
    return 'Select Mode'
  }

  render() {
    const {auth} = this.props
    return (
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/"><Navbar.Brand>Sprayer App</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/record"><Nav.Link>Record Data</Nav.Link></LinkContainer>
            <LinkContainer to="/data"><Nav.Link>View Data</Nav.Link></LinkContainer>
            <NavDropdown title={this.getModeDropdownText()} id="basic-nav-dropdown">
              <NavDropdown.Item active={this.props.currentMode === Modes.PLANTING} onSelect={this.props.setModeToPlanting}>Plant</NavDropdown.Item>
              <NavDropdown.Item active={this.props.currentMode === Modes.SPRAYING} onSelect={this.props.setModeToSpraying}>Spray</NavDropdown.Item>
              <NavDropdown.Item active={this.props.currentMode === Modes.HARVESTING} onSelect={this.props.setModeToHarvesting}>Harvest</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          { auth.isAuthenticated ? (
            <LogoutButton></LogoutButton>
          ):(
            <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
          )}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth, mode } = state
  return {
    auth,
    currentMode: mode,
  }
}

const mapDispatchToProps = {
  setModeToPlanting,
  setModeToSpraying,
  setModeToHarvesting,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SprayBar))