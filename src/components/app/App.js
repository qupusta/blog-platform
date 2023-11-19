import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Header } from '../header/Header'
import ArticlesList from '../pages/ArticlesList/ArticlesList'
import ArticlePage from '../pages/AriclePage/ArticlePage'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import RequireAuth from '../RequireAuth/RequireAuth'
import userActions from '../../reducers/UserReducer/UserActions'
import LocalStorageService from '../../service/StorageService'
import { getUserDataService } from '../../service/UserService'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import CreateEditArticlePage from '../pages/CreateEditArticlePage/CreateEditArticlePage'

import classes from './App.module.scss'

const App = () => {
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.user.isLogin)

  useEffect(() => {
    const token = LocalStorageService.getToken()
    if (token) {
      dispatch(userActions.successAuth())
      getUserDataService(token)
        .then((res) => {
          dispatch(userActions.successAuth(res.user))
          dispatch(userActions.changeLoginStatus(true))
        })
        .catch(() => {
          localStorage.removeItem('user')
        })
    }
  }, [dispatch])

  return (
    <section>
      <Header />
      <main className={classes.wrapper}>
        <Routes>
          <Route
            path="/sign-in"
            element={
              <RequireAuth auth={!isLogin} link={'/articles'}>
                <SignInPage />
              </RequireAuth>
            }
          />
          <Route
            path="/sign-up"
            element={
              <RequireAuth auth={!isLogin} link={'/profile'}>
                <SignUpPage />
              </RequireAuth>
            }
          />
          <Route path="/new-article" element={<CreateEditArticlePage />} />
          <Route path="/articles/:slug/edit" element={<CreateEditArticlePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/" element={<ArticlesList />} />
        </Routes>
      </main>
    </section>
  )
}

export default App
