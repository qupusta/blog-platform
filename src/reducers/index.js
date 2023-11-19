import { combineReducers } from 'redux'

import ArticlesListReducer from './ArticlesListReducer/ArticlesListReducer'
import articleReducer from './ArticlesReducer/ArticlesReducer'
import userReducer from './UserReducer/UserReducer'

const rootReducer = combineReducers({
  list: ArticlesListReducer,
  article: articleReducer,
  user: userReducer,
})

export default rootReducer
