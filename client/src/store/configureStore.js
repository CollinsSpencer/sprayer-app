import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux'
import thunk from 'redux-thunk'
import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'

import api from '../middleware/api'
import { apiEffect, apiDiscard } from './offlineConfig'
// import localIds from "../middlewares/redux-offline-localids"
// import OfflineReducer from "../reducers/offline";
import rootReducer from '../reducers'

/* eslint-disable-next-line no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(
      thunk,
      api,
    ),
    offline({
      ...offlineConfig,
      effect: apiEffect,
      discard: apiDiscard,
    }),
    // localIds({reducer: OfflineReducer}),
  ),

)

export default configureStore
