import React, { Component } from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
  Navbar,
  Nav
} from 'react-bootstrap'
<<<<<<< HEAD

class SprayBar extends Component {
  handleClick(e) {
    e.preventDefault()
=======
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
>>>>>>> cd22fc9e71a6b4fd5c64fd4d13c7876a100d2ca5
  }

  render() {
    const {auth} = this.props
    return (
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/"><Navbar.Brand>Sprayer App</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
<<<<<<< HEAD
            <Nav.Link href="/record" onSelect={(event) => this.handleClick(event)}>Record Data</Nav.Link>
            <Nav.Link href="/data" onSelect={(event) => this.handleClick(event)}>View Data</Nav.Link>
=======
            <LinkContainer to="/record"><Nav.Link>Record Data</Nav.Link></LinkContainer>
            <LinkContainer to="/data"><Nav.Link>View Data</Nav.Link></LinkContainer>
            <NavDropdown title={this.getModeDropdownText()} id="basic-nav-dropdown">
              <NavDropdown.Item active={this.props.currentMode === Modes.PLANTING} onSelect={this.props.setModeToPlanting}>Plant</NavDropdown.Item>
              <NavDropdown.Item active={this.props.currentMode === Modes.SPRAYING} onSelect={this.props.setModeToSpraying}>Spray</NavDropdown.Item>
              <NavDropdown.Item active={this.props.currentMode === Modes.HARVESTING} onSelect={this.props.setModeToHarvesting}>Harvest</NavDropdown.Item>
            </NavDropdown>
>>>>>>> cd22fc9e71a6b4fd5c64fd4d13c7876a100d2ca5
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

<<<<<<< HEAD
export default withRouter(SprayBar)
=======
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
>>>>>>> cd22fc9e71a6b4fd5c64fd4d13c7876a100d2ca5
