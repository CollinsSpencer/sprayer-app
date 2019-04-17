import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import thunk from 'redux-thunk'
import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'

// import api from '../middleware/api'
import apiEffect from '../middleware/api'
// import localIds from "../middlewares/redux-offline-localids"
// import OfflineReducer from "../reducers/offline";
import rootReducer from '../reducers'
import refreshAccessToken from '../actions'

const discard = async (error, _action, _retries) => {
  if (error === null || error.status === null) return false;

  if (error.status === 401) {
    console.log("REFRESH ACCESS TOKEN")
    const newAccessToken = await refreshAccessToken()
    localStorage.set('access_token', newAccessToken)
    return newAccessToken == null
  }

  return 400 <= error.status && error.status < 500
}

/* eslint-disable-next-line no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(
      thunk,
      // api,
    ),
    offline({
      ...offlineConfig,
      effect: apiEffect,
      discard: discard,
    }),
    // localIds({reducer: OfflineReducer}),
  ),

)

export default configureStore
