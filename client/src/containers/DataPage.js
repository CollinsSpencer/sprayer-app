import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Container,
  Row,
  Table
} from 'react-bootstrap'
import DownloadSheet from '../components/DownloadSheet'
import DisplayData from '../components/DisplayData'
import SprayBar from '../components/SprayBar'

import {
  fetchFieldSeasons,
  fetchFields,
  fetchOwners,
  fetchSprayApplications,
  fetchSprays
} from '../actions'

class DataPage extends Component {
  componentDidMount() {
    const { fetchFieldSeasons, fetchFields, fetchOwners, fetchSprayApplications } = this.props

    fetchFieldSeasons()
    fetchFields()
    fetchOwners()
    fetchSprayApplications()
  }
  render() {
    const { dataSet } = this.props
    console.log(dataSet)
    const displaySet = dataSet.map((d, i) => <DisplayData key={i} data={d} />)

    return (
      <Container>
        <SprayBar></SprayBar>
        <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Data Analysis</h2>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DownloadSheet></DownloadSheet>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataPage))
