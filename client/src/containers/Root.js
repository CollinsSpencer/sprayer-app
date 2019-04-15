import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import RecordPage from './RecordPage'
import NoMatchPage from './NoMatchPage'
import DataPage from './DataPage'

const Root = ({ store }) => (
  <Provider store={store}>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/record" component={RecordPage} />
      <Route path="/data" component={DataPage} />
      <Route component={NoMatchPage} />
    </Switch>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root
