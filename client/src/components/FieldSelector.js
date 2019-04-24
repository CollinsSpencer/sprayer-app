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
  render() {
    const { options, selectedField, addField, setField } = this.props
    return (
      <div>
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
  const { owner, field, fields } = state
  return {
    options: fields
      // .reduce(field => field.owner === owner) // TODO
      .map(field => {
      return { label: field.name, value: field.id }
    }),
    selectedField: field,
  }
}

const mapDispatchToProps = {
  addField,
  fetchFields,
  setField,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FieldSelector))
