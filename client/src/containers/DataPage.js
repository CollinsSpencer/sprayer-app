import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BackButton from '../components/BackButton'
import DownloadSheet from '../components/DownloadSheet'

class DataPage extends Component {
  render() {
    return (
    	<div>
	    	<div>
	        <BackButton></BackButton>
	    	</div>
	      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
	        <h2>Data Analysis</h2>
	      </div>
	      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
	      	<DownloadSheet></DownloadSheet>
	      </div>
      </div>
    )
  }
}

export default withRouter(connect()(DataPage))
