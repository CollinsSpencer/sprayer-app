import { combineReducers } from 'redux'
import uuidv4 from 'uuid'
import {
  // Action types
  SET_MODE,
  SET_UNITS,
  SET_FIELD,
  ADD_FIELD,
  SET_OWNER,
  ADD_OWNER,
  SET_SPRAY,
  ADD_SPRAY,

  // Other Constants
  Modes,
  Units,
} from '../actions'

// Updates mode
const mode = (state = Modes.SPRAYING, action) => {
  switch (action.type) {
    case SET_MODE:
      return action.mode
    default:
      return state
  }
}

const unit = (state = Units.GALLONS, action) => {
  switch (action.type) {
    case SET_UNITS:
      return action.unit
    default:
      return state
  }
}

const field = (state = '', action) => {
  switch (action.type) {
    case SET_FIELD:
      return action.id
    default:
      return state
  }
}

const fields = (state = [], action) => {
  switch (action.type) {
    case ADD_FIELD:
      return [
        ...state,
        {
          id: uuidv4(),
          name: action.field_name,
        }
      ]
    default:
      return state
  }
}

const owner = (state = '', action) => {
  switch (action.type) {
    case SET_OWNER:
      return action.id
    default:
      return state
  }
}

const owners = (state = [], action) => {
  switch (action.type) {
    case ADD_OWNER:
      return [
        ...state,
        {
          id: uuidv4(),
          name: action.owner_name,
        }
      ]
    default:
      return state
  }
}

const spray = (state = '', action) => {
  switch (action.type) {
    case SET_SPRAY:
      return action.id
    default:
      return state
  }
}

const sprays = (state = [], action) => {
  switch (action.type) {
    case ADD_SPRAY:
      return [
        ...state,
        {
          id: uuidv4(),
          name: action.spray_name,
        }
      ]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  mode,
  unit,
  field,
  fields,
  owner,
  owners,
  spray,
  sprays,
})

export default rootReducer
