import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Container,
  Row,
  Table
} from 'react-bootstrap'
import DisplayData from '../components/DisplayData'

import {
  fetchFieldSeasons,
  fetchFields,
  fetchOwners,
  fetchSprayApplications,
  fetchSprays
} from '../actions'

class RecentData extends Component {
  componentDidMount() {
    const { fetchFieldSeasons, fetchFields, fetchOwners, fetchSprayApplications } = this.props

    fetchFieldSeasons()
    fetchFields()
    fetchOwners()
    fetchSprayApplications()
  }

  render() {
    const { dataSet } = this.props
    const displaySet = dataSet.slice(0,5).map((d, i) => <DisplayData key={i} data={d} />) //Only take first 5

    return (
      <Container>
        <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Recent Data</h2>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Owner</th>
                <th>Date</th>
                <th>Field</th>
                <th>Acres</th>
                <th>Spray</th>
                <th>Usage</th>
                <th>Cost</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {displaySet}
            </tbody>
          </Table>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { sprayApplications } = state
  return {
    dataSet: sprayApplications,
  }
}

const mapDispatchToProps = {
  fetchFieldSeasons,
  fetchFields,
  fetchOwners,
  fetchSprayApplications,
  fetchSprays
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecentData))
