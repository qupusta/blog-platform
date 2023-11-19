const initState = {
  content: null,
  onLoad: true,
  onFail: false,
  displayModal: false,
  createEditStatus: false,
  isUserEdit: false,
}

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ARTICLE':
      return { ...state, content: action.content, onLoad: false }
    case 'FAIL_DOWNLOADING':
      return { ...state, onLoad: false, onFail: action.error }
    case 'SET_LOAD':
      return { ...state, onLoad: true, onFail: false }
    case 'SET_MODAL':
      return { ...state, displayModal: action.status }
    case 'CHANGE_USER_EDITING_STATUS':
      return { ...state, isUserEdit: action.status }
    case 'CHANGE_ARTICLE_STATUS':
      return { ...state, createEditStatus: action.status }
    default:
      return state
  }
}

export default articleReducer
