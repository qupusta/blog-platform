import React from 'react'

import classes from './ErrorIndicator.module.scss'

const ErrorIndicator = ({ errorMessage }) => (
  <div className={classes.error}>
    <p className={classes.text}>{`Download failed: ${errorMessage}.`}</p>
    <p className={classes.text}>Please, refresh the page.</p>
  </div>
)

export default ErrorIndicator
