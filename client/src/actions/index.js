import fetch from 'cross-fetch'
import uuidv4 from 'uuid'
import { CALL_API } from '../middleware/api'

/*
 * action types
 */

export const AMOUNT_UNITS_SET = 'AMOUNT_UNITS_SET'
export const AMOUNT_VALUE_SET = 'AMOUNT_VALUE_SET'
export const AUTH_UPDATED = 'AUTH_UPDATED'
export const FIELD_SET = 'FIELD_SET'
export const FIELDS_ADD_REQUEST = 'FIELDS_ADD_REQUEST'
export const FIELDS_ADD_COMMIT = 'FIELDS_ADD_COMMIT'
export const FIELDS_ADD_ROLLBACK = 'FIELDS_ADD_ROLLBACK'
export const FIELDS_FETCH_REQUEST = 'FIELDS_FETCH_REQUEST'
export const FIELDS_FETCH_COMMIT = 'FIELDS_FETCH_COMMIT'
export const FIELDS_FETCH_ROLLBACK = 'FIELDS_FETCH_ROLLBACK'
export const FIELDSEASONS_FETCH_REQUEST = 'FIELDSEASONS_FETCH_REQUEST'
export const FIELDSEASONS_FETCH_COMMIT = 'FIELDSEASONS_FETCH_COMMIT'
export const FIELDSEASONS_FETCH_ROLLBACK = 'FIELDSEASONS_FETCH_ROLLBACK'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const MODE_SET = 'MODE_SET'
export const OWNER_SET = 'OWNER_SET'
export const OWNERS_ADD_REQUEST = 'OWNERS_ADD_REQUEST'
export const OWNERS_ADD_COMMIT = 'OWNERS_ADD_COMMIT'
export const OWNERS_ADD_ROLLBACK = 'OWNERS_ADD_ROLLBACK'
export const OWNERS_FETCH_REQUEST = 'OWNERS_FETCH_REQUEST'
export const OWNERS_FETCH_COMMIT = 'OWNERS_FETCH_COMMIT'
export const OWNERS_FETCH_ROLLBACK = 'OWNERS_FETCH_ROLLBACK'
export const PRICE_UNITS_SET = 'PRICE_UNITS_SET'
export const PRICE_VALUE_SET = 'PRICE_VALUE_SET'
export const SPRAY_SET = 'SPRAY_SET'
export const SPRAYS_ADD_REQUEST = 'SPRAYS_ADD_REQUEST'
export const SPRAYS_ADD_COMMIT = 'SPRAYS_ADD_COMMIT'
export const SPRAYS_ADD_ROLLBACK = 'SPRAYS_ADD_ROLLBACK'
export const SPRAYS_FETCH_REQUEST = 'SPRAYS_FETCH_REQUEST'
export const SPRAYS_FETCH_COMMIT = 'SPRAYS_FETCH_COMMIT'
export const SPRAYS_FETCH_ROLLBACK = 'SPRAYS_FETCH_ROLLBACK'
export const SPRAYAPPLICATIONS_FETCH_REQUEST = 'SPRAYAPPLICATIONS_FETCH_REQUEST'
export const SPRAYAPPLICATIONS_FETCH_COMMIT = 'SPRAYAPPLICATIONS_FETCH_COMMIT'
export const SPRAYAPPLICATIONS_FETCH_ROLLBACK = 'SPRAYAPPLICATIONS_FETCH_ROLLBACK'

/*
 * other constants
 */

export const Modes = {
  PLANTING: 'PLANTING',
  SPRAYING: 'SPRAYING',
  HARVESTING: 'HARVESTING',
}

export const Units = {
  GALLONS: 'GALLONS',
  OUNCES: 'OUNCES',
  LITERS: 'LITERS',
}

/*
 * private action creators
 */

const requestLogin = (creds) => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
})
const receiveLogin = (user) => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  id_token: user.id_token
})
const loginError = (message) => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
})
const requestLogout = () => ({
  type: LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true
})
const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false
})

/*
 * public action creators
 */

export const setAmountUnits = (units) => ({ type: AMOUNT_UNITS_SET, units })
export const setAmountValue = (value) => ({ type: AMOUNT_VALUE_SET, value })
export const setField = (id) => ({ type: FIELD_SET, id: id })
export const addField = (field_name) => ({
  [CALL_API]: {
    authenticated: true,
    endpoint: 'fields/',
    method: 'POST',
    json: {
      id: uuidv4(),
      name: field_name,
      owner: 'http://localhost:8000/api/owners/1/', // TODO
      user: 'http://localhost:8000/api/users/1/', // TODO
    },
    types: [FIELDS_ADD_REQUEST, FIELDS_ADD_COMMIT, FIELDS_ADD_ROLLBACK],
  }
})
export const fetchFields = () => ({
  [CALL_API]: {
    authenticated: true,
    endpoint: 'fields/',
    method: 'GET',
    payload: [],
    types: [FIELDS_FETCH_REQUEST, FIELDS_FETCH_COMMIT, FIELDS_FETCH_ROLLBACK],
  }
})
export const fetchFieldSeasons = () => ({
  [CALL_API]: {
    authenticated: true,
    endpoint: 'field-seasons/',
    method: 'GET',
    payload: [],
    types: [FIELDSEASONS_FETCH_REQUEST, FIELDSEASONS_FETCH_COMMIT, FIELDSEASONS_FETCH_ROLLBACK],
  }
})
export const setModeToPlanting = () => ({ type: MODE_SET, mode: Modes.PLANTING })
export const setModeToSpraying = () => ({ type: MODE_SET, mode: Modes.SPRAYING })
export const setModeToHarvesting = () => ({ type: MODE_SET, mode: Modes.HARVESTING })
export const setOwner = (owner) => ({ type: OWNER_SET, payload: owner })
export const addOwner = (owner_name) => ({
  [CALL_API]: {
    authenticated: true,
    endpoint: 'owners/',
    method: 'POST',
    json: {
      id: uuidv4(),
      name: owner_name,
    },
    types: [OWNERS_ADD_REQUEST, OWNERS_ADD_COMMIT, OWNERS_ADD_ROLLBACK],
  }
})
export const fetchOwners = () => ({
  [CALL_API]: {
    authenticated: true,
    endpoint: 'owners/',
    method: 'GET',
    payload: [],
    types: [OWNERS_FETCH_REQUEST, OWNERS_FETCH_COMMIT, OWNERS_FETCH_ROLLBACK],
  }
})
export const setPriceUnits = (units) => ({ type: PRICE_UNITS_SET, units })
export const setPriceValue = (value) => ({ type: PRICE_VALUE_SET, value })
export const setSpray = (spray) => ({ type: SPRAY_SET, payload: spray })
export const addSpray = (spray_name) => ({
  [CALL_API]: {
    authenticated: true,
    endpoint: 'sprays/',
    method: 'POST',
    json: {
      id: uuidv4(),
      name: spray_name,
    },
    types: [SPRAYS_ADD_REQUEST, SPRAYS_ADD_COMMIT, SPRAYS_ADD_ROLLBACK],
  }
})
export const fetchSprays = () => ({
  [CALL_API]: {
    authenticated: true,
    endpoint: 'sprays/',
    method: 'GET',
    payload: [],
    types: [SPRAYS_FETCH_REQUEST, SPRAYS_FETCH_COMMIT, SPRAYS_FETCH_ROLLBACK],
  }
})
export const fetchSprayApplications = () => ({
  [CALL_API]: {
    authenticated: true,
    endpoint: 'spray-applications/',
    method: 'GET',
    payload: [],
    types: [SPRAYAPPLICATIONS_FETCH_REQUEST, SPRAYAPPLICATIONS_FETCH_COMMIT, SPRAYAPPLICATIONS_FETCH_ROLLBACK],
  }
})

/*
 * thunk action creators
 */

// Call the API to get a token and
// dispatch actions along the way
export const loginUser = (creds) => {

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return fetch('http://localhost:8000/api/token/', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.detail))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('refresh_token', user.refresh)
          localStorage.setItem('access_token', user.access)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.error("Error: ", err))
  }
}
// Log the user out
export const logoutUser = () => {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('access_token')
    dispatch(receiveLogout())
  }
}
