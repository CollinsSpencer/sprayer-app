import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
} from 'react-router-dom'
import {
  Container,
  Row
} from 'react-bootstrap'
import SprayBar from '../components/SprayBar'
import LogoutButton from '../components/LogoutButton'
import RecentData from '../components/RecentData'

class HomePage extends Component {
  render() {
    const {auth} = this.props
    return (
      <Container>
        <SprayBar></SprayBar>
        { auth.isAuthenticated ? (
          <LogoutButton></LogoutButton>
        ):(
          <Link to="/login"></Link>
        )}
        <Row xs={8} md={4} style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <RecentData></RecentData>
        </Row>
      </Container>
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
