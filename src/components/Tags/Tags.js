import React from 'react'
import { nanoid } from '@reduxjs/toolkit'

import classes from './Tags.module.scss'

const Tags = ({ tags }) => {
  const tagList = tags.map((tag) => (
    <button key={nanoid()} className={classes.tagItem} type="button">
      {tag}
    </button>
  ))

  return <div className={classes.tags}>{tagList}</div>
}

export default Tags
