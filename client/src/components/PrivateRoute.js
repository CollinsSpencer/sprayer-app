import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    auth,
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))
