import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreatableSelect from 'react-select/lib/Creatable'

import {
  addField,
  setField,
  fetchFields,
} from '../actions'


const FieldSelector = ({ options, selectedField, addField, setField, fetchFields }) => {
  const loadFieldData = (e) => {
    e.preventDefault()
    fetchFields()
  }
  return (
    <div>
      <button
        onClick={(event) => loadFieldData(event)}
        type="text"
      >
        Load Field Data
      </button>

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
