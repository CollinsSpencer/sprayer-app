import { combineReducers } from 'redux'
import {
  // Action types
  AMOUNT_UNITS_SET,
  AMOUNT_VALUE_SET,
  AUTH_UPDATED,
  FIELD_SET,
  FIELDS_ADD_REQUEST,
  FIELDS_ADD_COMMIT,
  FIELDS_ADD_ROLLBACK,
  FIELDS_FETCH_COMMIT,
  FIELDSEASON_SET,
  FIELDSEASON_CROP_TYPE_SET,
  FIELDSEASON_NUMBER_OF_ACRES_SET,
  FIELDSEASON_START_DATE_SET,
  FIELDSEASON_END_DATE_SET,
  FIELDSEASONS_ADD_REQUEST,
  FIELDSEASONS_ADD_COMMIT,
  FIELDSEASONS_ADD_ROLLBACK,
  FIELDSEASONS_FETCH_COMMIT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  MODE_SET,
  OWNER_SET,
  OWNERS_ADD_REQUEST,
  OWNERS_ADD_COMMIT,
  OWNERS_ADD_ROLLBACK,
  OWNERS_FETCH_COMMIT,
  PRICE_UNITS_SET,
  PRICE_VALUE_SET,
  SPRAY_SET,
  SPRAYS_ADD_REQUEST,
  SPRAYS_ADD_COMMIT,
  SPRAYS_ADD_ROLLBACK,
  SPRAYS_FETCH_COMMIT,
  SPRAYAPPLICATIONS_FETCH_COMMIT,
  SPRAYAPPLICATIONS_ADD_REQUEST,
  SPRAYAPPLICATIONS_ADD_COMMIT,
  SPRAYAPPLICATIONS_ADD_ROLLBACK,

  // Other Constants
  Modes,
} from '../actions'

const amount = (state = {}, action) => {
  switch (action.type) {
    case SPRAYAPPLICATIONS_ADD_COMMIT:
      return { units: null, value: '' }
    case AMOUNT_UNITS_SET:
      return { ...state, units: action.units }
    case AMOUNT_VALUE_SET:
      return { ...state, value: action.value }
    default:
      return state
  }
}

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

const field = (state = '', action) => {
  switch (action.type) {
    case OWNER_SET:
    case OWNERS_ADD_COMMIT:
      return ''
    case FIELD_SET:
      return {
        ...state,
        previousField: null,
        uuid: action.payload.uuid,
        name: action.payload.name,
        owner: action.payload.owner,
        syncing: false,
      }
    case FIELDS_ADD_REQUEST:
      return {
        previousField: state,
        uuid: action.payload.uuid,
        name: action.payload.name,
        owner: action.payload.owner,
        syncing: true,
      }
    case FIELDS_ADD_COMMIT:
      return {
        uuid: action.payload.uuid,
        name: action.payload.name,
        owner: action.payload.owner,
        syncing: false,
      }
    case FIELDS_ADD_ROLLBACK:
      return state.previousField ? state.previousField : ''
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
          uuid: action.payload.uuid,
          name: action.payload.name,
          owner: action.payload.owner,
          syncing: true,
        }
      ]
    case FIELDS_ADD_COMMIT:
      return [...state].map(f => f.uuid === action.meta.uuid ? {
        ...f,
        uuid: action.payload.uuid,
        syncing: false
      } : f)
    case FIELDS_ADD_ROLLBACK:
      return [...state].filter(f => f.uuid !== action.meta.uuid)
    case FIELDS_FETCH_COMMIT:
      return action.payload.results
    default:
      return state
  }
}

const fieldSeason = (state = {}, action) => {
  switch (action.type) {
    case FIELD_SET:
    case FIELDS_ADD_COMMIT:
      return {}
    case FIELDSEASON_SET:
      return action.fieldSeason
    case FIELDSEASON_CROP_TYPE_SET:
      return {
        ...state,
        crop_type: action.payload,
      }
    case FIELDSEASON_NUMBER_OF_ACRES_SET:
      return {
        ...state,
        num_acres: action.payload,
      }
    case FIELDSEASON_START_DATE_SET:
      return {
        ...state,
        start_date: action.payload,
      }
    case FIELDSEASON_END_DATE_SET:
      return {
        ...state,
        end_date: action.payload,
      }
    default:
      return state
  }
}

const fieldSeasons = (state = [], action) => {
  switch (action.type) {
    case FIELDSEASONS_ADD_REQUEST:
      return [
        ...state,
        {
          uuid: action.payload.uuid,
          crop_type: action.payload.crop_type,
          num_acres: action.payload.num_acres,
          start_date: action.payload.start_date,
          end_date: action.payload.end_date,
          field: action.payload.field,
          syncing: true,
        }
      ]
    case FIELDSEASONS_ADD_COMMIT:
      return [...state].map(f => f.uuid === action.meta.uuid ? {
        ...f,
        uuid: action.payload.uuid,
        syncing: false
      } : f)
    case FIELDSEASONS_ADD_ROLLBACK:
      return [...state].filter(f => f.uuid !== action.meta.uuid)
    case FIELDSEASONS_FETCH_COMMIT:
      return action.payload.results
    default:
      return state
  }
}

const owner = (state = '', action) => {
  switch (action.type) {
    case OWNER_SET:
      return {
        ...state,
        previousOwner: null,
        uuid: action.payload.uuid,
        name: action.payload.name,
        syncing: false,
      }
    case OWNERS_ADD_REQUEST:
      return {
        previousOwner: state,
        uuid: action.payload.uuid,
        name: action.payload.name,
        syncing: true,
      }
    case OWNERS_ADD_COMMIT:
      return {
        uuid: action.payload.uuid,
        name: action.payload.name,
        syncing: false,
      }
    case OWNERS_ADD_ROLLBACK:
      return state.previousOwner ? state.previousOwner : ''
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
          uuid: action.payload.uuid,
          name: action.payload.name,
          syncing: true,
        }
      ]
    case OWNERS_ADD_COMMIT:
      return [...state].map(o => o.uuid === action.meta.uuid ? {
        ...o,
        uuid: action.payload.uuid,
        syncing: false
      } : o)
    case OWNERS_ADD_ROLLBACK:
      return [...state].filter(o => o.uuid !== action.meta.uuid)
    case OWNERS_FETCH_COMMIT:
      return action.payload.results
    default:
      return state
  }
}

const price = (state = {}, action) => {
  switch (action.type) {
    case SPRAYAPPLICATIONS_ADD_COMMIT:
      return { units: null, value: '' }
    case PRICE_UNITS_SET:
      return { ...state, units: action.units }
    case PRICE_VALUE_SET:
      return { ...state, value: action.value }
    default:
      return state
  }
}

const spray = (state = '', action) => {
  switch (action.type) {
    case SPRAYAPPLICATIONS_ADD_COMMIT:
      return ''
    case SPRAY_SET:
      return {
        uuid: action.payload.uuid,
        name: action.payload.name,
        syncing: false,
      }
    case SPRAYS_ADD_REQUEST:
      return {
        uuid: action.payload.uuid,
        name: action.payload.name,
        syncing: true,
      }
    case SPRAYS_ADD_COMMIT:
      return {
        uuid: action.payload.uuid,
        name: action.payload.name,
        syncing: false,
      }
    case SPRAYS_ADD_ROLLBACK:
      return ''
    default:
      return state
  }
}

const sprays = (state = [], action) => {
  switch (action.type) {
    case SPRAYS_FETCH_COMMIT:
      return action.payload.results
    case SPRAYS_ADD_REQUEST:
      return [
        ...state,
        {
          uuid: action.payload.uuid,
          name: action.payload.name,
          syncing: true,
        }
      ]
    case SPRAYS_ADD_COMMIT:
      // We want to replace the locally created ID with the ID from the server.
      // Note that we don't direct manipulate `state`!
      return [...state].map(s => s.uuid === action.meta.uuid ? {
        ...s,
        uuid: action.payload.uuid,
        syncing: false
      } : s)
    case SPRAYS_ADD_ROLLBACK:
      // We have decided to stop retrying to sync the data.
      // Remove the item completely from the list.
      return [...state].filter(s => s.uuid !== action.meta.uuid)
    default:
      return state
  }
}

const sprayApplications = (state = [], action) => {
  switch (action.type) {
    case SPRAYAPPLICATIONS_FETCH_COMMIT:
      return action.payload.results
    case SPRAYAPPLICATIONS_ADD_REQUEST:
      return [
        ...state,
        {
          uuid: action.payload.uuid,
          name: action.payload.name,
          syncing: true,
        }
      ]
    case SPRAYAPPLICATIONS_ADD_COMMIT:
      return [...state].map(s => s.uuid === action.meta.uuid ? {
        ...s,
        uuid: action.payload.uuid,
        syncing: false
      } : s)
    case SPRAYAPPLICATIONS_ADD_ROLLBACK:
      return [...state].filter(s => s.uuid !== action.meta.uuid)
    default:
      return state
  }
}

const appReducer = combineReducers({
  amount,
  auth,
  mode,
  field,
  fields,
  fieldSeason,
  fieldSeasons,
  owner,
  owners,
  price,
  spray,
  sprays,
  sprayApplications,
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_REQUEST) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer
