const initState = {
  articles: [],
  articlesCount: 0,
  page: 1,
  onLoad: true,
  onFail: false,
}

const ArticlesListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_LOAD':
      return { ...state, onLoad: true, onFail: false }
    case 'GET_ARTICLES_LIST': {
      const { articles, articlesCount } = action.data
      return { ...state, articles, articlesCount, onLoad: false }
    }
    case 'CHANGE_PAGE':
      return { ...state, page: action.page, onLoad: true }
    case 'FAIL_DOWNLOADING': {
      return { ...state, onLoad: false, onFail: action.error }
    }
    default:
      return state
  }
}

export default ArticlesListReducer
