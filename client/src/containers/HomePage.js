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
import RecentData from '../components/RecentData'

class HomePage extends Component {
  render() {
    return (
      <Container>
        <SprayBar></SprayBar>
        <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <RecentData></RecentData>
        </Row>
      </Container>
    )
  }
}

export default withRouter(connect()(HomePage))
