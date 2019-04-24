import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactExport from 'react-data-export'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const sprayApplication = [
    {
        Owner_Name: 'Ron Swanson',
        Date: '07/21/2018',
        Spray: "Old Spice",
        Cost: 4.50,
        Cost_Unit: 'gal',
        Usage_Amount: 1.04,
        Usage_Unit: 'gal',
        Field_Name: 'Thunder',
        Field_Acres: 15
    },
    {
        Owner_Name: 'Ron Swanson',
        Date: '07/22/2018',
        Spray: "Dove",
        Cost: 1.20,
        Cost_Unit: 'oz',
        Usage_Amount: 12.04,
        Usage_Unit: 'oz',
        Field_Name: 'Grassy Boi',
        Field_Acres: 8.2
    },
    {
        Owner_Name: 'Bob Vance',
        Date: '06/01/2018',
        Spray: "Old Spice",
        Cost: 4.50,
        Cost_Unit: 'gal',
        Usage_Amount: 4.18,
        Usage_Unit: 'gal',
        Field_Name: 'Thunder',
        Field_Acres: 18.4
    },
    {
        Owner_Name: 'Jessica Day',
        Date: '07/10/2018',
        Spray: "Axe",
        Cost: 3.45,
        Cost_Unit: 'liter',
        Usage_Amount: 9.1,
        Usage_Unit: 'liter',
        Field_Name: 'Liberty',
        Field_Acres: 24
    }
];

class DownloadSheet extends Component {
  render() {
    return (
      <ExcelFile filename="DataAnalysis">
        <ExcelSheet data={sprayApplication} name="Summary">
            <ExcelColumn label="Owner" value="Owner_Name"/>
            <ExcelColumn label="Date" value="Date"/>
            <ExcelColumn label="Field Name" value="Field_Name"/>
            <ExcelColumn label="Acres" value="Field_Acres"/>
            <ExcelColumn label="Spray" value="Spray"/>
            <ExcelColumn label="Cost" value="Cost"/>
            <ExcelColumn label="Cost Unit" value="Cost_Unit"/>
            <ExcelColumn label="Usage" value="Usage_Amount"/>
            <ExcelColumn label="Usage Unit" value="Usage_Unit"/>
        </ExcelSheet>
    </ExcelFile>
    )
  }
}

export default withRouter(DownloadSheet)
