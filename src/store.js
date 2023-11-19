import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const composeEnchancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: { warnAfter: 128 },
      }),
  },
  composeEnchancers(applyMiddleware(thunk))
)

export default store
