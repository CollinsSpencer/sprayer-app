import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Form,
  Col
} from 'react-bootstrap'
import SpraySelector from '../components/SpraySelector'
import UnitSelector from '../components/UnitSelector'

class RecordForm extends Component {
  render() {
    return (
      <div>
        <Form.Row>
            <Col>
             <SpraySelector></SpraySelector>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" id="price"/>
            </Col>
            <Col>
              <UnitSelector></UnitSelector>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" id="amount"/>
            </Col>
            <Col>
              <UnitSelector></UnitSelector>
            </Col>
          </Form.Row>
      </div>
    );
  }
}

export default withRouter(RecordForm)