import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreatableSelect from 'react-select/lib/Creatable'

import {
  addField,
  setField,
} from '../actions'

const FieldSelector = ({ options, selectedField, addField, setField }) => {
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
      {JSON.stringify(selectedField)}
    </div>
  )
}

const mapStateToProps = (state) => {
  const { field, fields } = state
  console.log(field)
  console.log(fields)
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
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FieldSelector))
