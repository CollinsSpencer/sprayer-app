import { AUTH_UPDATED } from '../actions'

// const BASE_URL = 'http://localhost:8000/api/'

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticated, method = 'POST', payload, json } = callAPI

  const [requestType, successType, errorType] = types

  const accessTokenBefore = localStorage.getItem('access_token') || null
  const refreshTokenBefore = localStorage.getItem('refresh_token') || null

  console.group()
  console.log(endpoint)
  console.log(types)
  console.log(authenticated)
  console.log(method)
  console.log(payload)
  console.log(json)
  console.groupEnd()

  if (payload == null) {
    payload = json
  }

  next({
    type: requestType,
    payload,
    meta: {
      offline: {
        // the network action to execute:
        effect: {
          url: endpoint,
          method,
          json,
          authenticated,
        },
        // action to dispatch when effect succeeds:
        commit: { type: successType, meta: json },
        // action to dispatch if network action fails permanently:
        rollback: { type: errorType, meta: json },
      }
    }
  })

  const accessTokenAfter = localStorage.getItem('access_token') || null
  const refreshTokenAfter = localStorage.getItem('refresh_token') || null

  if (accessTokenBefore !== accessTokenAfter || refreshTokenBefore !== refreshTokenAfter || refreshTokenAfter == null) {
    // The access token was refreshed, or the refresh token was expired or missing.
    // We can dispatch an action to make sure our auth store item is up to date.
    // Done here because there is no access to dispatch in the `discard` function of redux-offline.
    store.dispatch({
      type: AUTH_UPDATED,
    })
  }

}
