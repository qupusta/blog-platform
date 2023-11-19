import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'

import { getRegistrationService } from '../../../service/UserService'
import userActions from '../../../reducers/UserReducer/UserActions'
import AuthRegForm from '../../AuthRegForm/AuthRegForm'

import classes from './SignUpPage.module.scss'

const SignUpPage = () => {
  const dispatch = useDispatch()
  const statusReg = useSelector((state) => state.user.isRegister)
  const onSuccessReg = useSelector((state) => state.user.SuccessReg)
  const [doubleControl, setDControl] = useState(true)

  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm()
  const onSubmit = (data) => {
    if (doubleControl) {
      setDControl(false)
      getRegistrationService(data)
        .then((res) => {
          if (res.errors) {
            dispatch(userActions.changeRegStatus(res.errors))
            setDControl(true)
          } else {
            dispatch(userActions.changeRegStatus('success'))
            setTimeout(() => {
              dispatch(userActions.changeRegStatus(false))
              dispatch(userActions.successRegistration(true))
              setDControl(true)
              navigate('/sign-in')
            }, 2500)
          }
        })
        .catch((error) => {
          dispatch(userActions.changeRegStatus(error.message))
          setDControl(true)
        })
    }
  }

  if (onSuccessReg) {
    dispatch(userActions.successRegistration(false))
  }

  const errorInputClass = `${classes.input} ${classes.errorInput}`

  return (
    <AuthRegForm
      title="Create new account"
      onSubmit={handleSubmit(onSubmit)}
      btnLabel="Create"
      status={statusReg}
      footer={{ text: 'Already have an account?', link: '/sign-in', linkText: 'Sign In.' }}
    >
      <label className={classes.label} htmlFor="username">
        Username
      </label>
      <input
        {...register('username', {
          required: true,
          minLength: 3,
          maxLength: 20,
        })}
        aria-invalid={errors.username ? 'true' : 'false'}
        className={errors.username?.type ? errorInputClass : classes.input}
        placeholder="Username"
      />
      {errors.username?.type === 'required' && <p role="alert">Username is required</p>}
      {errors.username?.type === 'minLength' && <p role="alert">Your username must be at least 3 characters</p>}
      {errors.username?.type === 'maxLength' && <p role="alert">Your username must be no longer 20 characters</p>}

      <label className={classes.label} htmlFor="email">
        Email address
      </label>
      <input
        {...register('email', {
          required: true,
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/,
        })}
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

      <label className={classes.label} htmlFor="repeat">
        Repeat password
      </label>
      <input
        {...register('repeat', {
          required: true,
          validate: (value) => value === getValues('password'),
        })}
        aria-invalid={errors.repeat ? 'true' : 'false'}
        className={errors.repeat?.type ? errorInputClass : classes.input}
        placeholder="Password"
      />
      {errors.repeat?.type === 'required' && <p role="alert">Enter your password again</p>}
      {errors.repeat?.type === 'validate' && <p role="alert">Passwords must match</p>}

      <hr className={classes.line} />
      <div className={classes.checkboxContainer}>
        <input
          id="agree"
          name="agree"
          type="checkbox"
          className={classes.checkbox}
          {...register('agree', { required: true })}
        />
        <label
          className={errors.agree?.type === 'required' ? `${classes.label} ${classes.errorLabel}` : classes.label}
          htmlFor="agree"
        >
          I agree to the processing of my personal information
        </label>
      </div>
    </AuthRegForm>
  )
}

export default SignUpPage
