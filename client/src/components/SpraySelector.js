import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreatableSelect from 'react-select/lib/Creatable'

import {
  addSpray,
  fetchSprays,
  setSpray,
} from '../actions'

class SpraySelector extends Component {
  componentDidMount() {
    this.props.fetchSprays()
  }
  changeHandler = (newValue, action) => {
    const { addSpray, setSpray } = this.props
    if (action.action === 'create-option') {
      addSpray(newValue.label)
    } else {
      setSpray({
        name: newValue.label,
        uuid: newValue.value,
      })
    }
  }
  render() {
    const { options, selectedSpray } = this.props

    return (
      <div>
        <CreatableSelect
          options={options}
          onChange={this.changeHandler}
          value={selectedSpray}
          placeholder="Select Spray"
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { spray, sprays } = state
  let selectedSpray = ''
  if (Object.keys(spray).length > 0) {
    selectedSpray = { label: spray.name, value: spray.uuid }
  }
  return {
    options: sprays.map(spray => {
      return { label: spray.name, value: spray.uuid }
    }),
    selectedSpray: selectedSpray,
  }
}

const mapDispatchToProps = {
  addSpray,
  fetchSprays,
  setSpray,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpraySelector))
