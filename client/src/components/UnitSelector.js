import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'

import {
  setUnitsToGallons,
  setUnitsToQuarts,
  setUnitsToLiters,
} from '../actions'

const units = [
  { value: setUnitsToGallons, label: 'Gallons' },
  { value: setUnitsToQuarts, label: 'Quarts' },
  { value: setUnitsToLiters, label: 'Liters' }
];

class UnitSelector extends Component {
  state = {
    selectedOption: null
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <div>
        Unit
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={units}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { unit } = state
  return { currentUnit: unit }
}

const mapDispatchToProps = {
  setUnitsToGallons,
  setUnitsToQuarts,
  setUnitsToLiters,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnitSelector))
