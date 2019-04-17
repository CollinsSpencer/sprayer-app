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
import BackButton from '../components/BackButton'
import OwnerSelector from '../components/OwnerSelector'
import FieldSelector from '../components/FieldSelector'
import SprayForm from '../components/SprayForm'

/*https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c*/

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
          <SprayForm></SprayForm>
          <Form.Row>
            <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <Button variant="primary" onClick={this.addSpray}>Add Spray</Button>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <button type="submit" value="Submit">Submit</button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
    )
  }
}

export default withRouter(connect()(RecordPage))
