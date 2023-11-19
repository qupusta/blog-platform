const userActions = {
  changeRegStatus: (errors) => ({ type: 'CHANGE_REG_STATUS', errors }),

  successRegistration: (status) => ({ type: 'SUCCESS_REGISTRATION', status }),

  changeAuthStatus: (errors) => ({ type: 'CHANGE_AUTH_STATUS', errors }),

  successAuth: (user) => ({ type: 'SUCCESS_AUTH', user }),

  changeEditStatus: (errors) => ({ type: 'CHANGE_EDIT_STATUS', errors }),

  successEditing: (user) => ({ type: 'SUCCESS_EDITING', user }),

  changeLoginStatus: (status) => ({ type: 'CHANGE_LOGIN_STATUS', status }),

  changeFetchFail: (status) => ({ type: 'CHANGE_FETCH_FAIL', status }),
}

export default userActions
