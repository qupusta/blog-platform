import React from 'react'
import { nanoid } from '@reduxjs/toolkit'

import classes from './Tags.module.scss'

const Tags = ({ tags }) => {
  const tagList = tags.map((tag) => (
    <li key={nanoid()} className={classes.tagItem}>
      {tag}
    </li>
  ))

  return <ul className={classes.tags}>{tagList}</ul>
}

export default Tags
