/* eslint-disable react/prop-types */
import React,{useEffect, useState} from 'react';

import { Redirect } from 'react-router-dom';

const userTokenAlias = 'wx1298'
const userIdAlias = 'u342345'

const OauthSuccess = (props) => {
  
  const [state, setState] = useState('Redirecting.....')
      const {
          match: { params }
      } = props
      const token = params.token
      const user = params.user

  useEffect(() => {

    localStorage.setItem(userTokenAlias,token);
    localStorage.setItem(userIdAlias,user);

    setState(c => <Redirect to='/?a=t' />);
   
  },[token, user])
  return(
      <div>
          {state}
      </div>
  );
}

export default OauthSuccess;