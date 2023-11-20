export const getRequest = async (
  url,
  headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }
) => {
  const request = await fetch(url, {
    method: 'GET',
    headers,
  }).then((result) => result.json())
  return request
}

export const postRequest = async (
  url,
  body,
  headers = {
    'Content-Type': 'application/json;charset=utf-8',
  },
  method = 'POST'
) => {
  const request = await fetch(url, {
    method,
    headers,
    body,
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err)
    })

  return request
}
