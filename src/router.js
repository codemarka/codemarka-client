import React from 'react'
import {  withRouter } from 'react-router-dom';

import Layout from './containers/public/Layout';
import Routes from './routes'; 

const router = (props) => {
  return (
      <Layout>
          <Routes {...props} />
      </Layout>
  )
}

export default withRouter(router)
