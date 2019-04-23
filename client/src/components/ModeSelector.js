import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Select from 'react-select/lib/Select'

import {
  setModeToPlanting,
  setModeToSpraying,
  setModeToHarvesting,
  setMode
} from '../actions'

const ModeSelector = ({ options, currentMode, setMode }) => {
  return (
    <div>
      Mode:
      <Select
        options={options}
        onChange={setMode}
        value={currentMode}
      />
    </div>
  )
}

const options = [
  { label: 'Planting', value: setModeToPlanting },
  { label: 'Spraying', value: setModeToSpraying },
  { label: 'Harvesting', value: setModeToHarvesting }
]

const mapStateToProps = (state) => {
  const { mode } = state
  console.log(mode)
  return { currentMode: mode }
}

const mapDispatchToProps = {
  setModeToPlanting,
  setModeToSpraying,
  setModeToHarvesting,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModeSelector))