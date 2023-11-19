import React from 'react'
import { Link } from 'react-router-dom'

import classes from './FormFooter.module.scss'

const FormFooter = ({ text, link, linkText }) => (
  <div className={classes.footer}>
    <span className={classes.text}>{text}</span>
    <Link className={`${classes.text} ${classes.link}`} to={link}>
      {linkText}
    </Link>
  </div>
)

export default FormFooter
