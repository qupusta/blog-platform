import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'
import { nanoid } from '@reduxjs/toolkit'

import ArticlesListActions from '../../../reducers/ArticlesListReducer/ArticlesListActions'
import { getArticlesList } from '../../../service/ArticlesService'
import Article from '../../Article/Article'
import Spinner from '../../Spinner/Spinner'
import ErrorIndicator from '../../ErrorIndicator/ErrorIndicator'

import classes from './ArticlesList.module.scss'

const ArticlesList = () => {
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.list.articles)
  const articlesCount = useSelector((state) => state.list.articlesCount)
  const page = useSelector((state) => state.list.page)
  const onLoad = useSelector((state) => state.list.onLoad)
  const onFail = useSelector((state) => state.list.onFail)

  useEffect(() => {
    dispatch(ArticlesListActions.setLoad())
    getArticlesList(page)
      .then((res) => dispatch(ArticlesListActions.getArticles(res)))
      .catch((err) => dispatch(ArticlesListActions.failDownloadArticles(err.message)))
  }, [dispatch, page])

  if (onLoad) {
    return (
      <div className={classes['indicator-wrapper']}>
        <h2>Loading</h2>
        <Spinner />
      </div>
    )
  }

  if (onFail) {
    return <ErrorIndicator errorMessage={onFail} />
  }

  const elements = articles.map((article, index) => {
    return (
      <li className={classes['article-li']} key={nanoid()}>
        <Article {...article} index={index} />
      </li>
    )
  })

  return (
    <>
      <ul className={classes.list}>
        {elements}
        <Pagination
          style={{ margin: '0 auto' }}
          size="small"
          total={articlesCount}
          current={page}
          pageSize={5}
          showSizeChanger={false}
          onChange={(pageNum) => dispatch(ArticlesListActions.changePage(pageNum))}
        />
      </ul>
    </>
  )
}

export default ArticlesList
