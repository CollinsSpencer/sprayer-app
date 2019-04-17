import fetch from 'cross-fetch'

/*
 * action types
 */

export const LOGIN_CLEAR = 'LOGIN_CLEAR'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const MODE_SET = 'MODE_SET'
export const FIELD_SET = 'FIELD_SET'
export const FIELD_ADD = 'FIELD_ADD'
export const FIELDS_FETCH_REQUEST = 'FIELDS_FETCH_REQUEST'
export const FIELDS_FETCH_COMMIT = 'FIELDS_FETCH_COMMIT'
export const FIELDS_FETCH_ROLLBACK = 'FIELDS_FETCH_ROLLBACK'

/*
 * other constants
 */

export const Modes = {
  PLANTING: 'PLANTING',
  SPRAYING: 'SPRAYING',
  HARVESTING: 'HARVESTING',
}

/*
 * action creators
 */

const requestLogin = (creds) => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}
const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}
const loginError = (message) => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}
const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}
const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}
export const clearLogin = () => ({ type: LOGIN_CLEAR })
export const setModeToPlanting = () => ({ type: MODE_SET, mode: Modes.PLANTING })
export const setModeToSpraying = () => ({ type: MODE_SET, mode: Modes.SPRAYING })
export const setModeToHarvesting = () => ({ type: MODE_SET, mode: Modes.HARVESTING })
export const setField = (id) => ({ type: FIELD_SET, id: id })
export const addField = (field_name) => ({ type: FIELD_ADD, field_name: field_name })
export const fetchTodos = () => {
  return {
    type: FIELDS_FETCH_REQUEST,
    payload: [],
    meta: {
      offline: {
        // the network action to execute:
        effect: { url: `/fields`, method: 'GET' },
        // action to dispatch when effect succeeds:
        commit: { type: FIELDS_FETCH_COMMIT },
      }
    }
  }
}

/*
 * thunk action creators
 */

// Call the API to get a token and
// dispatch actions along the way
export function loginUser(creds) {

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
        console.log(response)
        console.log(user)
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
      }).catch(err => console.log("Error: ", err))
  }
}
// Refresh the access token
export function refreshAccessToken(refreshToken) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `refresh=${refreshToken}`
  }

  return dispatch => {
    return fetch('http://localhost:8000/api/token/refresh/', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        console.log(response)
        console.log(user)
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.detail))
          return Promise.reject(user)
        } else {
          // If refresh was successful, set the token in local storage
          localStorage.setItem('access_token', user.access)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
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

