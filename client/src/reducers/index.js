import { combineReducers } from 'redux'
import uuidv4 from 'uuid'
import {
  // Action types
  SET_MODE,
  SET_FIELD,
  ADD_FIELD,
  LOGIN_CLEAR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,

  // Other Constants
  Modes,
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
  auth,
  mode,
  field,
  fields,
})

export default rootReducer
