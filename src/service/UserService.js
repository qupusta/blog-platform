/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { postRequest, getRequest } from './FetchService'

const _apiBase = 'https://blog.kata.academy/api/'

export const getRegistrationService = ({ username, email, password }) => {
  const userData = {
    "user": {
      "username": username,
      "email": email,
      "password": password,
    },
  }

  return postRequest(`${_apiBase}users`, JSON.stringify(userData))
}

export const getAuthService = ({ email, password }) => {
  const authData = {
    user: {
      email,
      password,
    },
  }

  return postRequest(`${_apiBase}users/login`, JSON.stringify(authData))
}

export const getUserDataService = (token) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Token ${token}`,
  }

  return getRequest(`${_apiBase}user`, headers)
}

export const changeUserDataService = (body, token) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Token ${token}`,
  }
  const { email, username, password, image } = body

  const fullBody = {
    "user": {
      "email": email,
      "username": username,
      "password": password,
      "image": image
    }
  }

  return postRequest(`${_apiBase}user`, JSON.stringify(fullBody), headers, 'PUT')
}
