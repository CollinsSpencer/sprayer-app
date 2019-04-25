import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  calculateCost
} from '../utilities'

class DisplayData extends Component {
  render() {
    const { data } = this.props

    return (
      <tr>
        <td>{data.field_season.field.owner.name}</td>
        <td>{data.date.substr(0,10)}</td>
        <td>{data.field_season.field.name}</td>
        <td>{data.field_season.num_acres}</td>
        <td>{data.spray.name}</td>
        <td>{data.amount} {data.amount_unit == 'GALLONS' ? 'gal' : 'OUNCES' ? 'oz' : 'l'}</td>
        <td>${(data.price/100).toFixed(2)} per {data.price_unit == 'GALLONS' ? 'gal' : 'OUNCES' ? 'oz' : 'l'}</td>
        <td>${calculateCost(data.price/100, data.price_unit, data.amount, data.amount_unit)}</td>
      </tr>
    )
  }
}

export default withRouter(connect()(DisplayData))
