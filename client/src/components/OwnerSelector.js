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
  changeHandler = (newValue, action) => {
    const { addOwner, setOwner } = this.props
    if (action.action === 'create-option') {
      addOwner(newValue.label)
    } else {
      setOwner({
        name: newValue.label,
        uuid: newValue.value,
      })
    }
  }
  render() {
    const { options, selectedOwner } = this.props

    return (
      <div>
        <CreatableSelect
          options={options}
          onChange={this.changeHandler}
          value={selectedOwner}
          placeholder="Select Field Owner"
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { owner, owners } = state
  let selectedOwner = ''
  if (Object.keys(owner).length > 0) {
    selectedOwner = { label: owner.name, value: owner.uuid }
  }
  return {
    options: owners.map(owner => {
      return { label: owner.name, value: owner.uuid }
    }),
    selectedOwner,
  }
}

const mapDispatchToProps = {
  addOwner,
  fetchOwners,
  setOwner,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnerSelector))
