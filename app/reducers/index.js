// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import files from './files';
import media from './media';

const rootReducer = combineReducers({
  files,
  media,
  routing
});

export default rootReducer;
