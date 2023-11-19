class LocalStorageService {
  static getToken = () => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData !== null) {
      return userData.token
    }
    return false
  }

  static getUserInfo = () => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData !== null) {
      return userData
    }
    return ''
  }
}

export default LocalStorageService
