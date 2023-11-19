import React from 'react'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({ auth, link, children }) => {
  if (auth) {
    return children
  }
  return <Navigate to={link} />
}

RequireAuth.defaultProps = {
  auth: false,
}

export default RequireAuth
