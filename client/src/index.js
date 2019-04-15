import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './containers/Root'
import * as serviceWorker from './serviceWorker'
import configureStore from './store/configureStore'

// import {
  // addField,
  // setModeToPlanting,
  // setModeToSpraying,
// } from './actions'

const store = configureStore()

// START TEST SECTION
// Log the initial state
// console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => console.log(store.getState()))

// Dispatch some actions
// store.dispatch(setModeToPlanting())
// store.dispatch(setModeToSpraying())
// store.dispatch(addField("Bob's plot"))

// Stop listening to state updates
// unsubscribe()
// END TEST SECTION


ReactDOM.render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
