import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreatableSelect from 'react-select/lib/Creatable'

import {
  addOwner,
  fetchOwners,
  setOwner,
} from '../actions'

class OwnerSelector extends Component {
  componentDidMount() {
    this.props.fetchOwners()
  }
  render() {
    const { options, selectedOwner, addOwner, setOwner } = this.props

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
}

const mapStateToProps = (state) => {
  const { owner, owners } = state
  return {
    options: owners.map(owner => {
      return { label: owner.name, value: owner.id }
    }),
    selectedOwner: owner,
  }
}

const mapDispatchToProps = {
  addOwner,
  fetchOwners,
  setOwner,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnerSelector))
