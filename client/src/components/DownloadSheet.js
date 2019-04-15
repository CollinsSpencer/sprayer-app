import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactExport from 'react-data-export'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const exampleSet = [
    {
        product: "Product 1",
        price: 44.99,
        amount: 0,
        cost: 0
    },
    {
        product: "Product 2",
        price: 36.74,
        amount: 23.38,
        cost: 858.98
    },
    {
        product: "Product 3",
        price: 26.9,
        amount: 34.72,
        cost: 933.97
    },
    {
        product: "Product 4",
        price: 42.96,
        amount: 4.75,
        cost: 204.06
    }
];

class DownloadSheet extends Component {
  render() {
    return (
      <ExcelFile>
        <ExcelSheet data={exampleSet} name="Summary">
            <ExcelColumn label="Product" value="product"/>
            <ExcelColumn label="Price" value="price"/>
            <ExcelColumn label="Amount Used" value="amount"/>
            <ExcelColumn label="Cost" value="cost"/>
        </ExcelSheet>
    </ExcelFile>
    )
  }
}

export default withRouter(DownloadSheet)
