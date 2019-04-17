import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'

import {
  setModeToPlanting,
  setModeToSpraying,
  setModeToHarvesting,
} from '../actions'

const modes = [
  { value: setModeToPlanting, label: 'Planting' },
  { value: setModeToSpraying, label: 'Spraying' },
  { value: setModeToHarvesting, label: 'Harvesting' }
];

class ModeSelector extends Component {
  state = {
    mode: modes[1]
  }
  handleChange = (mode) => {
    this.setState({ mode });
    console.log(this.state.mode.value)
  }
  render() {
    const { mode } = this.state;

    return (
      <div>
        Mode
        <Select
          value={mode}
          onChange={this.handleChange}
          options={modes}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { mode } = state
  return { currentMode: mode }
}

const mapDispatchToProps = {
  setModeToPlanting,
  setModeToSpraying,
  setModeToHarvesting,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModeSelector))
