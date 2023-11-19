import React, { useEffect, useCallback } from 'react'
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import format from 'date-fns/format'
import { useParams, Link, Navigate } from 'react-router-dom'

import articleActions from '../../../reducers/ArticlesReducer/ArticlesActions'
import userActions from '../../../reducers/UserReducer/UserActions'
import { editArticleService, getArticleService } from '../../../service/ArticlesService'
import Spinner from '../../Spinner/Spinner'
import ErrorIndicator from '../../ErrorIndicator/ErrorIndicator'
import Tags from '../../Tags/Tags'
import ModalWindow from '../../modalWindow/ModalWindow'
import LocalStorageService from '../../../service/StorageService'

import classes from './ArticlePage.module.scss'

const ArticlePage = () => {
  const dispatch = useDispatch()
  const articleContent = useSelector((state) => state.article.content)
  const onLoad = useSelector((state) => state.article.onLoad)
  const onFail = useSelector((state) => state.article.onFail)
  const createEditStatus = useSelector((state) => state.article.createEditStatus)
  const { slug } = useParams()
  const isDisplayModal = useSelector((state) => state.article.displayModal)
  const isUserEdit = useSelector((state) => state.article.isUserEdit)
  const token = LocalStorageService.getToken()

  const controlBlock = (
    <>
      <button
        type="button"
        className={`${classes.deleteBtn} ${classes.controlBtn}`}
        onClick={() => dispatch(articleActions.setModal(true))}
      >
        Delete
      </button>
      <Link to={`/articles/${slug}/edit`} className={`${classes.editBtn} ${classes.controlBtn}`}>
        Edit
      </Link>
      {isDisplayModal ? <ModalWindow /> : null}
    </>
  )
  const isControl = !isUserEdit ? controlBlock : null

  const getArticle = useCallback(() => {
    dispatch(articleActions.setLoad())
    getArticleService(slug)
      .then((res) => dispatch(articleActions.getArticle(res)))
      .catch((err) => dispatch(articleActions.failDownloading(err.message)))
  }, [slug, dispatch])

  useEffect(() => {
    getArticle()
  }, [getArticle])

  useEffect(() => {
    if (token && articleContent) {
      editArticleService(slug, articleContent)
        .then((res) => {
          if (res.article) {
            dispatch(articleActions.changeIsUserEditStatus(true))
          }
        })
        .catch(() => {
          dispatch(userActions.changeFetchFail(true))
          dispatch(articleActions.changeIsUserEditStatus(false))
        })
    }
  }, [slug, token])

  if (onLoad) {
    return (
      <div className={classes['indicator-wrapper']}>
        <h2>Article is loading</h2>
        <Spinner />
      </div>
    )
  }

  if (onFail) {
    return <ErrorIndicator errorMessage={onFail} />
  }

  if (createEditStatus) {
    setTimeout(() => {
      dispatch(articleActions.changeCreateEditStatus(false))
    }, 500)
    return <Navigate to="/articles" />
  }

  if (articleContent) {
    const { title, body, author, createdAt, description, tagList } = articleContent
    const { image, username } = author
    const avatar = 'https://static.productionready.io/images/smiley-cyrus.jpg'

    return (
      <div className={classes.article}>
        <div className={classes.header}>
          <div className={classes.headContainer}>
            <div className={classes.headInfo}>
              <span className={classes.title}>{title}</span>
            </div>
            <Tags tags={tagList} />
            <p className={classes.description}>{description}</p>
          </div>
          <div className={classes.authorInfo}>
            <div className={classes.authorContainer}>
              <span className={classes.name}>{username}</span>
              <span className={classes.date}>{format(new Date(createdAt), 'MMMM d, y')}</span>
            </div>
            <img src={image === '' ? avatar : image} alt="avatar" className={classes.avatar} width="46" height="46" />
            {isControl}
          </div>
        </div>
        <Markdown className={classes.text} remarkPlugins={[remarkGfm]}>
          {body}
        </Markdown>
      </div>
    )
  }
  return null
}

export default ArticlePage
