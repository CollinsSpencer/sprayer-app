import { combineReducers } from 'redux'
import {
  // Action types
  AUTH_UPDATED,
  MODE_SET,
  FIELD_SET,
  FIELDS_ADD_REQUEST,
  FIELDS_ADD_COMMIT,
  FIELDS_ADD_ROLLBACK,
  FIELDS_FETCH_COMMIT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  UNITS_SET,
  OWNER_SET,
  OWNERS_ADD_REQUEST,
  OWNERS_ADD_COMMIT,
  OWNERS_ADD_ROLLBACK,
  OWNERS_FETCH_COMMIT,
  SPRAY_SET,
  SPRAYS_ADD_REQUEST,
  SPRAYS_ADD_COMMIT,
  SPRAYS_ADD_ROLLBACK,

  // Other Constants
  Modes,
  Units,
} from '../actions'

const auth = (state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('refresh_token') ? true : false // TODO Update this to look at time
}, action) => {
  switch (action.type) {
    case AUTH_UPDATED:
      return {
        isFetching: false,
        isAuthenticated: localStorage.getItem('refresh_token') ? true : false // TODO Update this to look at time
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
    case FIELDS_ADD_REQUEST:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          owner: action.payload.owner,
          syncing: true,
          user: action.payload.user,
        }
      ]
    case FIELDS_ADD_COMMIT:
      return [...state].map(f => f.id === action.meta.id ? {
        ...f,
        id: action.payload.id,
        syncing: false
      } : f)
    case FIELDS_ADD_ROLLBACK:
      return [...state].filter(f => f.id !== action.meta.id)
    case FIELDS_FETCH_COMMIT:
      return action.payload.results
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
    case OWNERS_ADD_REQUEST:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          syncing: true,
        }
      ]
    case OWNERS_ADD_COMMIT:
      return [...state].map(o => o.id === action.meta.id ? {
        ...o,
        id: action.payload.id,
        syncing: false
      } : o)
    case OWNERS_ADD_ROLLBACK:
      return [...state].filter(o => o.id !== action.meta.id)
    case OWNERS_FETCH_COMMIT:
      return action.payload.results
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
    case SPRAYS_ADD_REQUEST:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          syncing: true,
        }
      ]
    case SPRAYS_ADD_COMMIT:
      // We want to replace the locally created ID with the ID from the server.
      // Note that we don't direct manipulate `state`!
      return [...state].map(s => s.id === action.meta.id ? {
        ...s,
        id: action.payload.id,
        syncing: false
      } : s)
    case SPRAYS_ADD_ROLLBACK:
      // We have decided to stop retrying to sync the data.
      // Remove the item completely from the list.
      return [...state].filter(s => s.id !== action.meta.id)
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
