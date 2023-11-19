import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import { removeArticleService } from '../../service/ArticlesService'
import userActions from '../../reducers/UserReducer/UserActions'
import articleActions from '../../reducers/ArticlesReducer/ArticlesActions'

import classes from './ModalWindows.module.scss'

const ModalWindow = () => {
  const dispatch = useDispatch()
  const createEditStatus = useSelector((state) => state.article.createEditStatus)
  const content = useSelector((state) => state.article.content)

  if (createEditStatus) {
    setTimeout(() => {
      dispatch(articleActions.changeCreateEditStatus(false))
    }, 500)
    return <Navigate to="/articles" />
  }

  const navigate = useNavigate()

  return (
    <div className={classes.modalContainer}>
      <div className={classes.messageContainer}>
        <span className={classes.message}>Are you sure to delete this article?</span>
      </div>
      <div className={classes.btnContainer}>
        <button
          type="button"
          className={`${classes.btn} ${classes.no}`}
          onClick={() => {
            dispatch(articleActions.setModal(false))
          }}
        >
          No
        </button>
        <button
          type="button"
          className={`${classes.btn} ${classes.yes}`}
          onClick={() => {
            navigate('/articles')
            dispatch(articleActions.setModal(false))
            removeArticleService(content.slug)
              .then((res) => {
                if (!res.error) {
                  dispatch(articleActions.changeCreateEditStatus(true))
                } else {
                  dispatch(userActions.changeFetchFail(true))
                }
              })
              .catch(() => dispatch(userActions.changeFetchFail(true)))
          }}
        >
          Yes
        </button>
      </div>
    </div>
  )
}

export default ModalWindow
