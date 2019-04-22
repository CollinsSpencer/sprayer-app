import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreatableSelect from 'react-select/lib/Creatable'

import {
  addSpray,
  setSpray,
} from '../actions'

const SpraySelector = ({ options, selectedSpray, addSpray, setSpray }) => {
  return (
    <div>
      Spray:
      <CreatableSelect
        options={options}
        onChange={setSpray}
        onCreateOption={addSpray}
        value={selectedSpray}
        placeholder="Select Spray"
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  const { spray, sprays } = state
  return {
    options: sprays.map(spray => {
      return { label: spray.name, value: spray.id }
    }),
    selectedSpray: spray,
  }
}

const mapDispatchToProps = {
  addSpray,
  setSpray,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpraySelector))
