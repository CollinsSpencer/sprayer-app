import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreatableSelect from 'react-select/lib/Creatable'

import {
  addField,
  setField,
  fetchFields,
} from '../actions'


class FieldSelector extends Component {
  componentDidMount() {
    this.props.fetchFields()
  }
  render() {
    const { options, selectedField, addField, setField } = this.props

    return (
      <div>
        Field:
        <CreatableSelect
          options={options}
          onChange={setField}
          onCreateOption={addField}
          value={selectedField}
          placeholder="Select Field"
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { field, fields } = state
  return {
    options: fields.map(field => {
      return { label: field.name, value: field.id }
    }),
    selectedField: field,
  }
}

const mapDispatchToProps = {
  addField,
  setField,
  fetchFields,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FieldSelector))
