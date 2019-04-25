import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'

import {
  Units,
} from '../actions'

const units = [
  { value: Units.GALLONS, label: 'Gallons' },
  { value: Units.OUNCES, label: 'Ounces' },
  { value: Units.LITERS, label: 'Liters' }
];

class UnitSelector extends Component {
  handleChange = (selectedOption) => {
    this.props.callbackAction(selectedOption.value)
  }
  render() {
    const selectedValue = this.props.selectedValue ? units.find(u => u.value === this.props.selectedValue) : null
    return (
      <div>
        <Select
          value={selectedValue}
          onChange={this.handleChange}
          options={units}
        />
      </div>
    );
  }
}

export default withRouter(connect()(UnitSelector))
