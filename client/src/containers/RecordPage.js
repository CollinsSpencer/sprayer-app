import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
} from 'react-router-dom'
import {
  Form,
  Col,
  Container,
  Dropdown
} from 'react-bootstrap'
import BackButton from '../components/BackButton'
import OwnerSelector from '../components/OwnerSelector'
import FieldSelector from '../components/FieldSelector'
import SpraySelector from '../components/SpraySelector'
import UnitSelector from '../components/UnitSelector'

class RecordPage extends Component {
  constructor() {
    super();

    this.state = {
      spray: '',
      amount: '',
      price: '',
      unit: '',
      items: []
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    let items = [...this.state.items];

    items.push({
      username: this.state.username,
      password: this.state.password
    });

    this.setState({
      items,
      username: '',
      password: ''
    });
  };

  handleInputChange = (e) => {
    let input = e.target;
    let name = e.target.name;
    let value = input.value;

    this.setState({
      [name]: value
    })
  };

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
            <Col>
      			 <SpraySelector></SpraySelector>
            </Col>
            <Col>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number"/>
            </Col>
          </Form.Row>
          <Form.Row>
      			<Col>
      				<Form.Label>Amount</Form.Label>
      				<Form.Control type="number"/>
      			</Col>
            <Col>
              <UnitSelector></UnitSelector>
            </Col>
        	</Form.Row>
        </Form>
      </Container>
    )
  }
}

export default withRouter(connect()(RecordPage))
