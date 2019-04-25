import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class DisplayData extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.data.field_season.field.owner.name}</td>
        <td>{this.props.data.date.substr(0,10)}</td>
        <td>{this.props.data.field_season.field.name}</td>
        <td>{this.props.data.field_season.num_acres}</td>
        <td>{this.props.data.spray.name}</td>
        <td>{this.props.data.amount} {this.props.data.amount_unit == 'GALLONS' ? 'gal' : 'OUNCES' ? 'oz' : 'l'}</td>
        <td>${(this.props.data.price).toFixed(2)} per {this.props.data.price_unit == 'GALLONS' ? 'gal' : 'OUNCES' ? 'oz' : 'l'}</td>
        <td>${(this.props.data.price * this.props.data.amount).toFixed(2)}</td>
      </tr>
    )
  }
}

export default withRouter(connect()(DisplayData))
