import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactExport from 'react-data-export'
import { connect } from 'react-redux'

import {
  fetchFieldSeasons,
  fetchFields,
  fetchOwners,
  fetchSprayApplications,
  fetchSprays
} from '../actions'

import {
  calculateCost
} from '../utilities'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

class DownloadSheet extends Component {
  componentDidMount() {
    const { fetchFieldSeasons, fetchFields, fetchOwners, fetchSprayApplications } = this.props

    fetchFieldSeasons()
    fetchFields()
    fetchOwners()
    fetchSprayApplications()
  }

  render() {
    const { dataSet } = this.props
    const displayData = dataSet.map(d =>{
      return {
        Owner_Name: d.field_season.field.owner.name,
        Date: d.date.substr(0,10),
        Field_Name: d.field_season.field.name,
        Field_Acres: d.field_season.num_acres,
        Spray: d.spray.name,
        Cost: d.price/100,
        Cost_Unit: d.price_unit == 'GALLONS' ? 'gal' : 'OUNCES' ? 'oz' : 'l',
        Usage_Amount: d.amount,
        Usage_Unit: d.amount_unit == 'GALLONS' ? 'gal' : 'OUNCES' ? 'oz' : 'l',
        Total_Cost: calculateCost(d.price/100, d.price_unit, d.amount, d.amount_unit)
      }
    })

    return (
      <ExcelFile filename="DataAnalysis">
        <ExcelSheet data={displayData} name="Summary">
          <ExcelColumn label="Owner" value="Owner_Name" />
          <ExcelColumn label="Date" value="Date" />
          <ExcelColumn label="Field Name" value="Field_Name" />
          <ExcelColumn label="Acres" value="Field_Acres" />
          <ExcelColumn label="Spray" value="Spray" />
          <ExcelColumn label="Cost" value="Cost" />
          <ExcelColumn label="Cost Unit" value="Cost_Unit" />
          <ExcelColumn label="Usage" value="Usage_Amount" />
          <ExcelColumn label="Usage Unit" value="Usage_Unit" />
          <ExcelColumn label="Total Cost" value="Total_Cost"/>
        </ExcelSheet>
      </ExcelFile>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DownloadSheet))
