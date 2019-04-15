import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreatableSelect from 'react-select/lib/Creatable'

import {
  addOwner,
  setOwner,
} from '../actions'

const OwnerSelector = ({ options, selectedOwner, addOwner, setOwner }) => {
  return (
    <div>
      Owner:
      <CreatableSelect
        options={options}
        onChange={setOwner}
        onCreateOption={addOwner}
        value={selectedOwner}
        placeholder="Select Field Owner"
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  const { owner, owners } = state
  console.log(owner)
  console.log(owner)
  return {
    options: owners.map(owner => {
      return { label: owner.name, value: owner.id }
    }),
    selectedOwner: owner,
  }
}

const mapDispatchToProps = {
  addOwner,
  setOwner,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnerSelector))
