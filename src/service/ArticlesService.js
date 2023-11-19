import { getRequest, postRequest } from './FetchService'
import LocalStorageService from './StorageService'

const _apiBase = 'https://blog.kata.academy/api/'

const getHeader = () => {
  const token = LocalStorageService.getToken()
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
  if (token) {
    headers.Authorization = `Token ${token}`
  }

  return headers
}

export const getArticlesList = (page = 1) => {
  const offset = (page - 1) * 5
  return getRequest(`${_apiBase}articles?limit=5&offset=${offset}`, getHeader())
}

export const getArticleService = (slug) => {
  return getRequest(`${_apiBase}articles/${slug}`, getHeader()).then((data) => data.article)
}

export const createArticleService = (body) => {
  const header = getHeader()
  return postRequest(`${_apiBase}articles`, JSON.stringify(body), header)
}

export const editArticleService = (slug, body) => {
  const header = getHeader()
  return postRequest(`${_apiBase}articles/${slug}`, JSON.stringify(body), header, 'PUT')
}

export const removeArticleService = (slug) => {
  const header = getHeader()
  return postRequest(`${_apiBase}articles/${slug}`, null, header, 'DELETE')
}

export const putLikeService = (slug, addOrRemove) => {
  const request = addOrRemove ? 'POST' : 'DELETE'
  const header = getHeader()
  return postRequest(`${_apiBase}articles/${slug}/favorite`, null, header, request)
}
