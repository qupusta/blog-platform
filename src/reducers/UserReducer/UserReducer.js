const initState = {
  isRegister: false,
  successReg: false,
  isAuth: false,
  userInfo: null,
  isEdit: false,
  isLogin: false,
  isError: false,
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_REGISTER_STATUS': {
      return { ...state, isRegister: action.errors }
    }
    case 'SUCCESS_REGISTRATION': {
      return { ...state, successReg: action.status }
    }
    case 'CHANGE_AUTH_STATUS': {
      return { ...state, isAuth: action.errors }
    }
    case 'SUCCESS_AUTH': {
      return { ...state, userInfo: action.user }
    }
    case 'CHANGE_EDIT_STATUS': {
      return { ...state, isEdit: action.errors }
    }
    case 'SUCCESS_EDITING': {
      return { ...state, userInfo: action.user }
    }
    case 'CHANGE_LOGIN_STATUS': {
      return { ...state, isLogin: action.status }
    }
    case 'CHANGE_FETCH_FAIL': {
      return { ...state, fetchFail: action.status }
    }
    default:
      return state
  }
}

export default userReducer
