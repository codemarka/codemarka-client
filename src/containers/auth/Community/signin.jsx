import React from "react"
import { Redirect } from "react-router-dom";
import * as APPURL from "../../../config/url";
const CommunitySigin = () => {
  return (
      <h1>This page has moved, redirecting....
          <Redirect to={APPURL.AUTH_SIGN_IN}/>
      </h1>
  )
}

export default CommunitySigin;