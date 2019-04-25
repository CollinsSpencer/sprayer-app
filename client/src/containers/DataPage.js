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

const dataSet = [
  {
    Owner_Name: 'Ron Swanson',
    Date: '07/21/2018',
    Spray: "Old Spice",
    Cost: 4.50,
    Cost_Unit: 'gal',
    Usage_Amount: 1.04,
    Usage_Unit: 'gal',
    Field_Name: 'Thunder',
    Field_Acres: 15
  },
  {
    Owner_Name: 'Ron Swanson',
    Date: '07/22/2018',
    Spray: "Dove",
    Cost: 1.20,
    Cost_Unit: 'oz',
    Usage_Amount: 12.04,
    Usage_Unit: 'oz',
    Field_Name: 'Grassy Boi',
    Field_Acres: 8.2
  },
  {
    Owner_Name: 'Bob Vance',
    Date: '06/01/2018',
    Spray: "Old Spice",
    Cost: 4.50,
    Cost_Unit: 'gal',
    Usage_Amount: 4.18,
    Usage_Unit: 'gal',
    Field_Name: 'Thunder',
    Field_Acres: 18.4
  },
  {
    Owner_Name: 'Jessica Day',
    Date: '07/10/2018',
    Spray: "Axe",
    Cost: 3.45,
    Cost_Unit: 'liter',
    Usage_Amount: 9.1,
    Usage_Unit: 'liter',
    Field_Name: 'Liberty',
    Field_Acres: 24
  }
];

class DataPage extends Component {
  componentDidMount() {
    const { fetchFieldSeasons, fetchFields, fetchOwners, fetchSprayApplications } = this.props

    fetchFieldSeasons()
    fetchFields()
    fetchOwners()
    fetchSprayApplications()
  }
  render() {
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
  console.log(sprayApplications)
  return {
    dataSet: sprayApplications
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
