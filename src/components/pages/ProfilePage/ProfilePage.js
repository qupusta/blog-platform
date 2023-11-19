import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import LocalStorageService from '../../../service/StorageService'
import userActions from '../../../reducers/UserReducer/UserActions'
import AuthRegForm from '../../AuthRegForm/AuthRegForm'
import { changeUserDataService } from '../../../service/UserService'

import classes from './ProfilePage.module.scss'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const statusEdit = useSelector((state) => state.user.isEdit)
  const userInfo = LocalStorageService.getUserInfo()
  const [doubleControl, setDControl] = useState(true)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => {
    if (doubleControl) {
      const token = LocalStorageService.getToken()

      setDControl(false)
      changeUserDataService(data, token)
        .then((res) => {
          if (res.errors) {
            dispatch(userActions.changeEditStatus(res.errors))
            setDControl(true)
          } else {
            dispatch(userActions.changeEditStatus('success'))
            dispatch(userActions.successEditing(res.user))
            localStorage.setItem('user', JSON.stringify(res.user))
            setDControl(true)

            setTimeout(() => {
              dispatch(userActions.changeEditStatus('redirect'))
              dispatch(userActions.changeEditStatus(false))
            }, 2500)
          }
        })
        .catch((error) => {
          dispatch(userActions.changeEditStatus(error.message))
          setDControl(true)
        })
    }
  }

  if (statusEdit === 'redirect') {
    return <Navigate replace to="/" />
  }

  if (userInfo === '') {
    return <Navigate replace to="/sign-in" />
  }

  const { username, email, image } = userInfo
  const errorInputClass = `${classes.input} ${classes.errorInput}`
  return (
    <AuthRegForm title="Edit Profile" onSubmit={handleSubmit(onSubmit)} btnLabel="Save" status={statusEdit}>
      <label className={classes.label} htmlFor="username">
        Username
      </label>
      <input
        {...register('username', {
          required: true,
          minLength: 3,
          maxLength: 20,
        })}
        placeholder="Username"
        defaultValue={username}
        aria-invalid={errors.username ? 'true' : 'false'}
        className={errors.username?.type ? errorInputClass : classes.input}
      />
      {errors.username?.type === 'required' && <p role="alert">Username is required</p>}
      {errors.username?.type === 'minLength' && <p role="alert">Username must be at least 3 characters</p>}
      {errors.username?.type === 'maxLength' && <p role="alert">Username must be no longer 20 characters</p>}

      <label className={classes.label} htmlFor="Email">
        Email
      </label>
      <input
        {...register('email', {
          required: true,
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/,
        })}
        aria-invalid={errors.email ? 'true' : 'false'}
        className={errors.email?.type ? errorInputClass : classes.input}
        placeholder="Email"
        defaultValue={email}
      />
      {errors.email?.type === 'required' && <p role="alert">Password is required</p>}
      {errors.email?.type === 'pattern' && <p role="alert">Enter a valid email</p>}

      <label className={classes.label} htmlFor="password">
        New password
      </label>
      <input
        {...register('password', {
          required: true,
          minLength: 8,
          maxLength: 40,
        })}
        aria-invalid={errors.password ? 'true' : 'false'}
        className={errors.password?.type ? errorInputClass : classes.input}
        placeholder="Password"
      />
      {errors.password?.type === 'required' && <p role="alert">Password is required</p>}
      {errors.password?.type === 'minLength' && <p role="alert">Your password must be at least 8 characters</p>}
      {errors.password?.type === 'maxLength' && <p role="alert">Your password must be no longer 40 characters</p>}

      <label className={classes.label} htmlFor="image">
        Avatar image
      </label>
      <input
        {...register('image', {
          required: true,
          pattern: /^https?:\/\/\S+(?:jpg|jpeg|png)$/,
        })}
        aria-invalid={errors.image ? 'true' : 'false'}
        className={errors.image?.type ? errorInputClass : classes.input}
        placeholder="Avatar image"
        defaultValue={image}
      />
      {errors.image?.type === 'pattern' && <p role="alert">You must use a valid URL for the image</p>}
    </AuthRegForm>
  )
}

export default ProfilePage
