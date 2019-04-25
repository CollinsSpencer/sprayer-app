import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreatableSelect from 'react-select/lib/Creatable'

import {
  addField,
  fetchFields,
  setField,
} from '../actions'

class FieldSelector extends Component {
  componentDidMount() {
    this.props.fetchFields()
  }
  changeHandler = (newValue, action) => {
    const { addField, owner, setField } = this.props
    if (action.action === 'create-option') {
      addField(newValue.label, owner)
    } else {
      setField({
        name: newValue.label,
        uuid: newValue.value,
      })
    }
  }
  render() {
    const { options, selectedField } = this.props
    return (
      <div>
        <CreatableSelect
          options={options}
          onChange={this.changeHandler}
          value={selectedField}
          placeholder="Select Field"
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { owner, field, fields } = state
  let selectedField = ''
  if (Object.keys(field).length > 0) {
    selectedField = { label: field.name, value: field.uuid }
  }
  return {
    options: fields
      .filter(field => field.owner.uuid === owner.uuid)
      .map(field => ({ label: field.name, value: field.uuid })),
    owner,
    selectedField,
  }
}

const mapDispatchToProps = {
  addField,
  fetchFields,
  setField,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FieldSelector))
