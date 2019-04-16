import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
} from 'react-router-dom'
import {
  Form,
  Col,
  Container
} from 'react-bootstrap'
import BackButton from '../components/BackButton'
import OwnerSelector from '../components/OwnerSelector'
import FieldSelector from '../components/FieldSelector'
import SpraySelector from '../components/SpraySelector'

class RecordPage extends Component {
  render() {
    return (
      <Container>
        <Form>
        	<Form.Row>
  	        <Col xs={5} md={4}>
  	        	<BackButton></BackButton>
  	        </Col>
  	        <Col xs={8} md={4} style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
  	        	<h2>Record Data</h2>
  	        </Col>
            <Col xs={5} md={4}>
            </Col>
          </Form.Row>
        	<Form.Row>
            <Col>
        		  <OwnerSelector></OwnerSelector>
            </Col>
            <Col>
        		  <FieldSelector></FieldSelector>
            </Col>
        	</Form.Row>
        	<Form.Row>
            <Col md={{ span:6, offset:3 }}>
      			 <SpraySelector></SpraySelector>
            </Col>
          </Form.Row>
          <Form.Row>
      			<Col>
      				<Form.Label>Amount</Form.Label>
      				<Form.Control type="number"/>
      			</Col>
            <Col>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number"/>
            </Col>
        	</Form.Row>
        </Form>
      </Container>
    )
  }
}

export default withRouter(connect()(RecordPage))
