import { combineReducers } from 'redux'
import uuidv4 from 'uuid'
import {
  // Action types
  MODE_SET,
  FIELD_SET,
  FIELD_ADD,
  FIELDS_FETCH_REQUEST,
  FIELDS_FETCH_COMMIT,
  LOGIN_CLEAR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  UNITS_SET,
  OWNER_SET,
  OWNER_ADD,
  SPRAY_SET,
  SPRAY_ADD,

  // Other Constants
  Modes,
  Units,
} from '../actions'

const auth = (state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('refresh_token') ? true : false // TODO Update this to look at time
}, action) => {
  switch (action.type) {
    case LOGIN_CLEAR:
      return {
        ...state,
        errorMessage: ''
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds.username,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      }
    default:
      return state
  }
}

const mode = (state = Modes.SPRAYING, action) => {
  switch (action.type) {
    case MODE_SET:
      return action.mode
    default:
      return state
  }
}

const unit = (state = Units.GALLONS, action) => {
  switch (action.type) {
    case UNITS_SET:
      return action.unit
    default:
      return state
  }
}

const field = (state = '', action) => {
  switch (action.type) {
    case FIELD_SET:
      return action.id
    default:
      return state
  }
}

const fields = (state = [], action) => {
  switch (action.type) {
    case FIELDS_FETCH_REQUEST:
      return action.payload
    case FIELDS_FETCH_COMMIT:
      return action.payload
    case FIELD_ADD:
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
    case OWNER_SET:
      return action.id
    default:
      return state
  }
}

const owners = (state = [], action) => {
  switch (action.type) {
    case OWNER_ADD:
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
    case SPRAY_SET:
      return action.id
    default:
      return state
  }
}

const sprays = (state = [], action) => {
  switch (action.type) {
    case SPRAY_ADD:
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
  auth,
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
