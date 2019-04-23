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
import ModeSelector from '../components/ModeSelector'

class HomePage extends Component {
  render() {
    return (
      <Container>
        <SprayBar></SprayBar>
        <Row>
          <ModeSelector></ModeSelector>
        </Row>
        <Row style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <RecentData></RecentData>
        </Row>
      </Container>
    )
  }
}

export default withRouter(connect()(HomePage))
