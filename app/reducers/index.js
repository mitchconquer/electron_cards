// @flow
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import files from './files'
import filter from './filter'
import media from './media'

const rootReducer = combineReducers({
  files,
  filter,
  media,
  routing
})

export default rootReducer
