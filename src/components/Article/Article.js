import React from 'react'
import format from 'date-fns/format'
import { Link } from 'react-router-dom'

import Tags from '../Tags/Tags'
import LikeButton from '../LikeButton/LikeButton'

import classes from './Article.module.scss'

const Article = ({ title, author, createdAt, description, slug, tagList, favorited, favoritesCount }) => {
  let { image, username } = author

  if (image === '' || image === null) {
    image = 'https://static.productionready.io/images/smiley-cyrus.jpg'
  }

  if (image === '' || image === null) {
    username = 'Anonymous'
  }

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headContainer}>
          <div className={classes.headInfo}>
            <Link to={`/articles/${slug}`} style={{ textDecoration: 'none' }}>
              <h1 className={classes.title}>{title}</h1>
            </Link>
            <LikeButton favorited={favorited} favoritesCount={favoritesCount} slug={slug} />
          </div>
          <Tags tags={tagList} />
        </div>
        <div className={classes.authorInfo}>
          <div className={classes.authorContainer}>
            <span className={classes.name}>{username}</span>
            <span className={classes.date}>{format(new Date(createdAt), 'MMMM d, y')}</span>
          </div>
          <picture>
            <source srcSet={image} />
            <img src={image} alt="avatar" className={classes.avatar} width="46" height="46" />
          </picture>
        </div>
      </div>
      <p className={classes.description}>{description}</p>
    </>
  )
}

export default Article
