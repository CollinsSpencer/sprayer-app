import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Container
} from 'react-bootstrap'
import DownloadSheet from '../components/DownloadSheet'
import SprayBar from '../components/SprayBar'

class DataPage extends Component {
  render() {
    return (
    	<Container>
	    	<SprayBar></SprayBar>
	    	<div>
		      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
		        <h2>Data Analysis</h2>
		      </div>
		      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
		      	<DownloadSheet></DownloadSheet>
		      </div>
	      </div>
	    </Container>
    )
  }
}

export default withRouter(connect()(DataPage))
