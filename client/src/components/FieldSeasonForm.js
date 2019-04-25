import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'
import { DatePicker } from 'react-bootstrap-date-picker'

import {
  addNewFieldSeason,
  setEndDate,
  setNumberOfAcres,
  setStartDate,
} from '../actions'

class FieldSeasonForm extends Component {
  render() {
    const {
      addNewFieldSeason,
      setEndDate,
      setNumberOfAcres,
      setStartDate,
    } = this.props
    const {
      cropType,
      endDate,
      numberOfAcres,
      startDate,
    } = this.props.fieldSeason

    const handleStartDateChange = (date) => {
      setStartDate(date)
    }
    const handleEndDateChange = (date) => {
      setEndDate(date)
    }
    const handleNumberOfAcresChange = (event) => {
      setNumberOfAcres(event.target.val)
    }
    const handleSubmitCreateFieldSeason = (event) => {
      event.preventDefault();
      addNewFieldSeason(cropType, endDate, numberOfAcres, startDate);
      this.setState({inFormMode: false})
    }

    let fieldSeasonCreator = null
    if (this.state.inFormMode) {
      fieldSeasonCreate = (
        <div>
          <Form.Row>
            <Col>
              <Form.Label>Number of Acres</Form.Label>
              <Form.Control
                type="tel"
                value={numberOfAcres}
                onChangeEvent={handleNumberOfAcresChange}
                selectAllOnFocus={true}
              />
            </Col>
            <Col>
              <Form.Label>Crop Type</Form.Label>
              {/* <CropTypeSelector></CropTypeSelector> */}
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                id="start-date-picker"
                value={startDate}
                maxDate={endDate}
                onChange={handleStartDateChange}
              />
            </Col>
            <Col>
              <Form.Label>End Date</Form.Label>
              <DatePicker
                id="end-date-picker"
                value={endDate}
                minDate={startDate}
                onChange={handleEndDateChange}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                type="submit"
                variant="primary"
                onClick={handleSubmitCreateFieldSeason}
              >
                Save Season Information for Field
            </Button>
            </Col>
          </Form.Row>
        </div>
      )
    } else {
      fieldSeasonCreator = (
        <div>
          <Button 
            variant="secondary"
            onClick={this.setState({inFormMode: true})}
          />
        </div>
      )
    }

    return (
      <div>
        <Form.Row>
          <Col>
            <h3>Field Season Information</h3>
          </Col>
        </Form.Row>
        {/* If there is already a field season already created for the selected field, create a dropdown */}
        {/* Display a button that allows the user to enter new field season information */}
        {fieldSeasonCreator}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { fieldSeason } = state
  return {
    fieldSeason,
  }
}

const mapDispatchToProps = {
  addNewFieldSeason,
  setEndDate,
  setNumberOfAcres,
  setStartDate,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FieldSeasonForm))