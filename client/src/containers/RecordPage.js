import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
} from 'react-router-dom'
import {
	Form,
	FormGroup,
	Col
} from 'react-bootstrap'
import BackButton from '../components/BackButton'
import OwnerSelector from '../components/OwnerSelector'
import FieldSelector from '../components/FieldSelector'
import SpraySelector from '../components/SpraySelector'

class RecordPage extends Component {
  render() {
    return (
      <Form>
      	<FormGroup row>
	        <Col>
	        	<BackButton></BackButton>
	        </Col>
	        <Col>
	        	<h2>Record Data</h2>
	        </Col>
        </FormGroup>
      	<FormGroup row>
	      	<Col>
	      		<OwnerSelector></OwnerSelector>
	      	</Col>
	      	<Col>
	      		<FieldSelector></FieldSelector>
	      	</Col>
      	</FormGroup>
      	<FormGroup row>
      		<Col>
      			<SpraySelector></SpraySelector>
      		</Col>
      	</FormGroup>
      </Form>
    )
  }
}

export default withRouter(connect()(RecordPage))
