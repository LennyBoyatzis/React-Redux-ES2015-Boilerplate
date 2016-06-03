import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers'
import { loadState, saveState } from './localStorage'
import createLogger from 'redux-logger'
import throttle from 'lodash/throttle'

export default configureStore() {
  const logger = createLogger()
  const persistedState = loadState()

  const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(logger)
  )

  store.subscribe(throttle(() => {
    saveState()
  }, 1000))

  return store;
}
