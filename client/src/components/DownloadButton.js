import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactExport from 'react-data-export'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

class DownloadButton extends Component {
  render() {
    return (
      <ExcelFile>
        <ExcelSheet data={dataSet1} name="Summary">
            <ExcelColumn label="Product" value="product"/>
            <ExcelColumn label="Price" value="price"/>
            <ExcelColumn label="Amount Used" value="amount"/>
            <ExcelColumn label="Cost" value="cost"/>
        </ExcelSheet>
    </ExcelFile>
    )
  }
}

export default withRouter(DownloadButton)
