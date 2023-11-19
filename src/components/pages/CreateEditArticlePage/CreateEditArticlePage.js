import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { once } from 'lodash'

import CreateEditForm from '../../CreateEditForm/CreateEditForm'
import { createArticleService, getArticleService, editArticleService } from '../../../service/ArticlesService'
import LocalStorageService from '../../../service/StorageService'
import userActions from '../../../reducers/UserReducer/UserActions'
import articleActions from '../../../reducers/ArticlesReducer/ArticlesActions'
import ArticlesListActions from '../../../reducers/ArticlesListReducer/ArticlesListActions'
import Spinner from '../../Spinner/Spinner'

const CreateEditArticlePage = () => {
  const dispatch = useDispatch()
  const createEditStatus = useSelector((state) => state.article.createEditStatus)
  const content = useSelector((state) => state.article.content)
  const userInfo = LocalStorageService.getUserInfo()
  const onLoad = useSelector((state) => state.article.onLoad)

  const location = useLocation()

  useEffect(() => {
    dispatch(ArticlesListActions.changePage(1))
  }, [dispatch])

  if (userInfo === '') {
    return <Navigate to="/sign-in" />
  }

  if (createEditStatus) {
    setTimeout(() => {
      dispatch(articleActions.changeCreateEditStatus(false))
    }, 500)
    return <Navigate to="/" />
  }

  if (location.pathname === '/new-article') {
    const create = once((data) => {
      const { tagList } = data
      const newTagsList = tagList.filter((item) => item.tag.match(/[\S]/) !== null).map(({ tag }) => tag)
      const body = { article: { ...data, tagList: newTagsList } }

      createArticleService(body)
        .then((res) => {
          if (res.article) {
            dispatch(articleActions.changeCreateEditStatus(true))
          } else {
            dispatch(userActions.changeFetchFail(true))
          }
        })
        .catch(() => dispatch(userActions.changeFetchFail(true)))
    })

    return <CreateEditForm formTitle="Create new article" submitFunc={create} reset />
  }

  let slug
  const params = useParams()

  if (content) {
    slug = content.slug
  } else {
    dispatch(articleActions.makeLoadStatus())
    getArticleService(params.slug)
      .then((data) => {
        if (data.author.username !== userInfo.username) {
          dispatch(articleActions.changeCreateEditStatus(true))
        }
        dispatch(articleActions.getArticle(data))
      })
      .catch((error) => dispatch(articleActions.failDownloadArticle(error.message)))
  }

  if (onLoad) {
    return <Spinner />
  }

  const edit = once((data) => {
    const { tagList } = data
    let newTagsList = tagList.filter((item) => item.tag.match(/[\S]/) !== null).map(({ tag }) => tag)

    if (!newTagsList || newTagsList.length < 1 || newTagsList === null) {
      newTagsList = ['']
    }
    const body = { article: { ...data, tagList: newTagsList } }

    editArticleService(slug, body)
      .then((res) => {
        if (res.article) {
          dispatch(articleActions.changeCreateEditStatus(true))
        } else {
          dispatch(userActions.changeFetchFail(true))
        }
      })
      .catch(() => dispatch(userActions.changeFetchFail(true)))
  })

  return <CreateEditForm formTitle="Edit article" submitFunc={edit} {...content} />
}

export default CreateEditArticlePage
