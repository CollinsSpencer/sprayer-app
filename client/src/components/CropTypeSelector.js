import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'

import {
  CropTypes,
} from '../actions'

const cropTypes = [
  { value: CropTypes.CORN, label: 'Corn' },
  { value: CropTypes.BEANS, label: 'Beans' },
  { value: CropTypes.KALE, label: 'Kale' }
];

class CropTypeSelector extends Component {
  handleChange = (selectedOption) => {
    this.props.callbackAction(selectedOption.value)
  }
  render() {
    const selectedValue = cropTypes.find(u => u.value === this.props.selectedValue)
    return (
      <div>
        <Select
          value={selectedValue}
          onChange={this.handleChange}
          options={cropTypes}
        />
      </div>
    );
  }
}

export default withRouter(connect()(CropTypeSelector))
