import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Select from 'react-select';

import 'react-datepicker/dist/react-datepicker.css'

import {
  addFieldSeason,
  fetchFieldSeasons,
  setFieldSeason,
  setFieldSeasonCropType,
  setFieldSeasonNumberOfAcres,
  setFieldSeasonStartDate,
  setFieldSeasonEndDate,
} from '../actions'

class FieldSeasonForm extends Component {
  constructor(props) {
    super(props);
    this.state = { inFormMode: false };
  }
  componentDidMount() {
    this.props.fetchFieldSeasons()
  }
  render() {
    const {
      addFieldSeason,
      field,
      fieldSeason,
      fieldSeasons,
      fieldSeasonsOptions,
      setFieldSeason,
      setFieldSeasonCropType,
      setFieldSeasonNumberOfAcres,
      setFieldSeasonStartDate,
      setFieldSeasonEndDate,
    } = this.props
    const {
      crop_type,
      end_date,
      num_acres,
      start_date,
    } = fieldSeason

    const startDate = new Date(new Date(start_date).getTime() + (new Date().getTimezoneOffset() * 60000))
    const endDate = new Date(new Date(end_date).getTime() + (new Date().getTimezoneOffset() * 60000))

    const handleSetFieldSeason = (newValue) => {
      const fs = fieldSeasons.find(fs => fs.uuid === newValue.value)
      setFieldSeason(fs)
    }
    const handleNumberOfAcresChange = (event) => {
      setFieldSeasonNumberOfAcres(event.target.val)
    }
    const handleCropTypeChange = (event) => {
      setFieldSeasonCropType(event.target.val)
    }
    const handleStartDateChange = (date) => {
      let dateString = date.toString()
      if (date instanceof Date) {
        dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)
      }
      setFieldSeasonStartDate(dateString)
    }
    const handleEndDateChange = (date) => {
      let dateString = date.toString()
      if (date instanceof Date) {
        dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)
      }
      setFieldSeasonEndDate(dateString)
    }
    const handleSubmitCreateFieldSeason = (event) => {
      event.preventDefault();
      addFieldSeason(crop_type, num_acres, startDate, endDate, field);
      this.setState({ inFormMode: false })
    }

    let fieldSeasonSelector = null
    if (fieldSeasonsOptions.length > 0) {
      fieldSeasonSelector = (
        <div>
          <Form.Label>Select Existing Season Information for Field</Form.Label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={fieldSeasonsOptions[0]}
            name="fieldSeasons"
            options={fieldSeasonsOptions}
            onChange={handleSetFieldSeason}
          />
        </div>
      )
    } else {
      fieldSeasonSelector = null
    }

    let fieldSeasonCreator = null
    if (this.state.inFormMode) {
      fieldSeasonCreator = (
        <div>
          <Form.Row>
            <Col>
              <Form.Label>Number of Acres</Form.Label>
              <Form.Control
                type="tel"
                value={num_acres}
                onChange={handleNumberOfAcresChange}
                selectAllOnFocus={true}
                pattern="^\d*\.?\d*$"
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
              <div>
                <DatePicker
                  id="start-date-picker"
                  className="form-control"
                  selectsStart
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={endDate}
                  dateFormat="yyyy-MM-dd"
                  onChange={handleStartDateChange}
                />
              </div>
            </Col>
            <Col>
              <Form.Label>End Date</Form.Label>
              <div>
                <DatePicker
                  id="end-date-picker"
                  className="form-control"
                  selectsEnd
                  selected={endDate}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="yyyy-MM-dd"
                  onChange={handleEndDateChange}
                />
              </div>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                type="submit"
                variant="primary"
                onClick={handleSubmitCreateFieldSeason}
              >Save New Season Information for Field</Button>
            </Col>
          </Form.Row>
        </div>
      )
    } else {
      fieldSeasonCreator = (
        <div>
          <Button
            variant="secondary"
            onClick={() => this.setState({ inFormMode: true })}
          >Add New Season Information for Field</Button>
        </div>
      )
    }

    return (
      <div>
        <Form.Row>
          <Col>
            <h4>Field Season Information</h4>
          </Col>
        </Form.Row>
        {/* If there is already a field season already created for the selected field, create a dropdown */}
        {fieldSeasonSelector}
        {/* Display a button that allows the user to enter new field season information */}
        {fieldSeasonCreator}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { field, fieldSeason, fieldSeasons } = state
  return {
    field,
    fieldSeason,
    fieldSeasons,
    fieldSeasonsOptions: fieldSeasons
      .filter(fs => fs.field.uuid === field.uuid)
      .map(fs => ({ label: `${fs.num_acres} acres of ${fs.crop_type} from ${fs.start_date} to ${fs.end_date}`, value: fs.uuid })),

  }
}

const mapDispatchToProps = {
  addFieldSeason,
  fetchFieldSeasons,
  setFieldSeason,
  setFieldSeasonCropType,
  setFieldSeasonNumberOfAcres,
  setFieldSeasonStartDate,
  setFieldSeasonEndDate,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FieldSeasonForm))