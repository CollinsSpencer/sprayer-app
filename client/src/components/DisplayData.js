import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class DisplayData extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.data.Owner_Name}</td>
        <td>{this.props.data.Date}</td>
        <td>{this.props.data.Field_Name}</td>
        <td>{this.props.data.Field_Acres}</td>
        <td>{this.props.data.Spray}</td>
        <td>{this.props.data.Usage_Amount} {this.props.data.Usage_Unit}</td>
        <td>${this.props.data.Cost} per {this.props.data.Cost_Unit}</td>
        <td>${(this.props.data.Cost * this.props.data.Usage_Amount).toFixed(2)}</td>
      </tr>
    )
  }
}

export default withRouter(connect()(DisplayData))
