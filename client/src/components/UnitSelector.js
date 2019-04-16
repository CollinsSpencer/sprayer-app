import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  setUnitsToGallons,
  setUnitsToQuarts,
  setUnitsToLiters,
} from '../actions'

const UnitSelector = ({ currentUnit, setUnitsToGallons, setUnitsToQuarts, setUnitsToLiters }) => (
  <div>
    <div onClick={setUnitsToGallons}>Gallons</div>
    <div onClick={setUnitsToQuarts}>Quarts</div>
    <div onClick={setUnitsToLiters}>Liters</div>
  </div>
)

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
