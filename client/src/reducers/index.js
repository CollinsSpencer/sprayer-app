import { combineReducers } from 'redux'
import uuidv4 from 'uuid'
import {
  // Action types
  SET_MODE,
  SET_FIELD,
  ADD_FIELD,

  // Other Constants
  Modes,
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

const rootReducer = combineReducers({
  mode,
  field,
  fields,
})

export default rootReducer
