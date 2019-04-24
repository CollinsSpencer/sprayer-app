import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Form,
  Col
} from 'react-bootstrap'
import CurrencyInput from 'react-currency-input';
import SpraySelector from '../components/SpraySelector'
import UnitSelector from '../components/UnitSelector'

import {
  setAmountUnits,
  setAmountValue,
  setPriceUnits,
  setPriceValue,
} from '../actions'

class RecordForm extends Component {
  render() {
    const {
      amountUnits,
      amountValue,
      priceUnits,
      priceValue,
      setAmountUnits,
      setAmountValue,
      setPriceUnits,
      setPriceValue,
    } = this.props
    const handlePriceChange = (_event, _maskedValue, floatValue) => {
      setPriceValue(floatValue)
    }
    const handleAmountChange = (event) => {
      const val = event.target.value
      if (event.target.validity.valid) {
        setAmountValue(val)
      }
    }

    return (
      <div>
        <Form.Row>
          <Col>
            <Form.Label>Spray</Form.Label>
            <SpraySelector></SpraySelector>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Label>Price</Form.Label>
            <CurrencyInput
              type="tel"
              prefix="$"
              className="form-control"
              value={priceValue}
              onChangeEvent={handlePriceChange}
              selectAllOnFocus={true}
            />
          </Col>
          <Col>
            <Form.Label>Per Unit</Form.Label>
            <UnitSelector
              callbackAction={setPriceUnits}
              selectedValue={priceUnits}
            ></UnitSelector>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="tel"
              value={amountValue}
              onChange={handleAmountChange}
              pattern="^\d*\.?\d*$"
            />
          </Col>
          <Col>
            <Form.Label>Per Unit</Form.Label>
            <UnitSelector
              callbackAction={setAmountUnits}
              selectedValue={amountUnits}
            ></UnitSelector>
          </Col>
        </Form.Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { amount, price } = state
  return {
    amountUnits: amount.units,
    amountValue: amount.value,
    priceUnits: price.units,
    priceValue: price.value,
  }
}

const mapDispatchToProps = {
  setAmountUnits,
  setAmountValue,
  setPriceUnits,
  setPriceValue,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecordForm))