import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
  Redirect,
} from 'react-router-dom'
import {
  Container,
  Row,
  Form,
  Button,
  Col
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {
  loginUser,
} from '../actions'

class LoginPage extends Component {
  render() {
    const { errorMessage, redirect, location } = this.props

    if (redirect === true) {
      if (location.state !== undefined && location.state.from !== undefined) {
        return <Redirect to={location.state.from} />
      }
      return <Redirect to='/' />
    }

    return (
      <Container>
        <Row style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <Form>
            <Form.Row>
              <Col xs={5} md={4}>
              </Col>
              <Col xs={8} md={4} style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <h2>Login</h2>
              </Col>
              <Col xs={5} md={4}>
              </Col>
            </Form.Row>
            <Form.Row>
              <input type="text" ref="username" className="form-control" placeholder="Username" />
            </Form.Row>
            <Form.Row>
              <input type="password" ref="password" className="form-control" placeholder="Password" />
            </Form.Row>
            <Form.Row>
              <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Button
                  variant="primary"
                  onClick={(event) => this.handleClick(event)}
                  type="submit">
                  Login
                </Button>
              </Col>
            </Form.Row>

            {errorMessage &&
              <p>{errorMessage}</p>
            }
          </Form>
        </Row>
      </Container>
    )
  }
  handleClick(e) {
    e.preventDefault()
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.loginUser(creds)
  }
}

LoginPage.propTypes = {
  errorMessage: PropTypes.string,
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
  loginUser: PropTypes.func.isRequired,
  redirect: PropTypes.bool,
}

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    redirect: auth.isAuthenticated,
    errorMessage: auth.errorMessage,
  }
}

const mapDispatchToProps = {
  loginUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
