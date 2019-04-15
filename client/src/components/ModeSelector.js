import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  setModeToPlanting,
  setModeToSpraying,
  setModeToHarvesting,
} from '../actions'

const ModeSelector = ({ currentMode, setModeToPlanting, setModeToSpraying, setModeToHarvesting }) => (
  <div>
    <div onClick={setModeToPlanting}>Planting</div>
    <div onClick={setModeToSpraying}>Spraying</div>
    <div onClick={setModeToHarvesting}>Harvesting</div>
    {currentMode}
  </div>
)

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
