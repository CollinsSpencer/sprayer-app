import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const RecentData = () => {
  return (
    <div>
      <h2>Recent Data</h2>
      <ul>
        <li>yeahyeahyeah</li>
      </ul>
    </div>
  )
}

export default withRouter(connect()(RecentData))
