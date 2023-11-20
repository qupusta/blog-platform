import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { getAuthService } from '../../../service/UserService'
import userActions from '../../../reducers/UserReducer/UserActions'
import AuthRegForm from '../../AuthRegForm/AuthRegForm'

import classes from './SignInPage.module.scss'

const SignInPage = () => {
  const dispatch = useDispatch()
  const statusAuth = useSelector((state) => state.user.isAuth)
  const [doubleControl, setDControl] = useState(true)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => {
    if (doubleControl) {
      setDControl(false)
      getAuthService(data)
        .then((res) => {
          if (res.errors) {
            dispatch(userActions.changeAuthStatus(res))
            setDControl(true)
          } else {
            dispatch(userActions.changeAuthStatus(false))
            dispatch(userActions.successAuth(res.user))
            localStorage.setItem('user', JSON.stringify(res.user))
            dispatch(userActions.changeLoginStatus(true))
            setDControl(true)
          }
        })
        .catch((error) => {
          dispatch(userActions.changeAuthStatus(error.message))
          setDControl(true)
        })
    }
  }

  const errorInputClass = `${classes.input} ${classes.errorInput}`

  return (
    <AuthRegForm
      title="Sign In"
      onSubmit={handleSubmit(onSubmit)}
      btnLabel="Login"
      status={statusAuth}
      footer={{ text: 'Don’t have an account?', link: '/sign-up', linkText: 'Sign Up.' }}
    >
      <label className={classes.label} htmlFor="email">
        Email
      </label>
      <input
        {...register('email', {
          required: true,
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/,
        })}
        id="email"
        aria-invalid={errors.email ? 'true' : 'false'}
        className={errors.email?.type ? errorInputClass : classes.input}
        placeholder="Email"
      />
      {errors.email?.type === 'required' && <p role="alert">Email is required</p>}
      {errors.email?.type === 'pattern' && <p role="alert">Enter a valid email</p>}

      <label className={classes.label} htmlFor="password">
        Password
      </label>
      <input
        {...register('password', {
          required: true,
        })}
        id="password"
        aria-invalid={errors.password ? 'true' : 'false'}
        className={errors.password?.type ? errorInputClass : classes.input}
        placeholder="Password"
      />
      {errors.password?.type === 'required' && <p role="alert">Password is required</p>}
    </AuthRegForm>
  )
}

export default SignInPage
