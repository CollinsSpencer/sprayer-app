import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
} from 'react-router-dom'
import {
  Form,
  Col,
  Container,
  Button
} from 'react-bootstrap'
import OwnerSelector from '../components/OwnerSelector'
import FieldSelector from '../components/FieldSelector'
import FieldSeasonForm from '../components/FieldSeasonForm';
import SprayForm from '../components/SprayForm'
import SprayBar from '../components/SprayBar'
import {
  addSprayApplication,
} from '../actions'

class RecordPage extends Component {
  handleSubmit(e) {
    e.preventDefault()
    const { amount, fieldSeason, price, spray } = this.props
    this.props.addSprayApplication(amount.value, amount.units, fieldSeason, price.value, price.units, spray)
  }

  render() {
    const { owner } = this.props
    const fieldSelector = owner ? (
      <div>
        <Form.Label>Field</Form.Label>
        <FieldSelector></FieldSelector>
      </div>) : null;

    return (
      <Container>
        <SprayBar></SprayBar>
        <Form>
          <Form.Row>
            <Col xs={5} md={4}>
            </Col>
            <Col xs={8} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h2>Record Data</h2>
            </Col>
            <Col xs={5} md={4}>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>Owner</Form.Label>
              <OwnerSelector></OwnerSelector>
            </Col>
            <Col>
              {fieldSelector}
            </Col>
          </Form.Row>
          <FieldSeasonForm></FieldSeasonForm>
          <SprayForm></SprayForm>
          <Form.Row>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                type="submit"
                variant="primary"
                onClick={(event) => this.handleSubmit(event)}
              >
                Submit
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { amount, fieldSeason, owner, price, spray } = state
  return {
    amount,
    fieldSeason,
    owner,
    price,
    spray,
  }
}

const mapDispatchToProps = {
  addSprayApplication,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecordPage))
