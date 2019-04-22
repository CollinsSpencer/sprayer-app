import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import DataPage from './DataPage'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import NoMatchPage from './NoMatchPage'
import RecordPage from './RecordPage'

const Root = ({ store }) => (
  <Provider store={store}>
    <Switch>
      <PrivateRoute path="/" exact component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <PrivateRoute path="/record" component={RecordPage} />
      <PrivateRoute path="/data" component={DataPage} />
      <Route component={NoMatchPage} />
    </Switch>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root
