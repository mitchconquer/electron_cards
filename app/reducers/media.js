// @flow
import { RESET_MEDIA, UPDATE_FILTER, UPDATE_MEDIA } from '../actions/media';
import mediaLocal from './media_local';

export const initialState = {
  allMedia: {
    ...mediaLocal
  },
  filter: ''
};

export default function media(state = initialState, action = {}) {
  const mediaState = {...state};
  switch (action.type) {
    case RESET_MEDIA:
      action.media.forEach(item => {
        mediaState.allMedia[item.index] = item;
      });
      return mediaState;
    case UPDATE_MEDIA:
      let newState ={filter: '', allMedia: {}};
      newState.filter = `${state.filter}`;
      Object.keys(state.allMedia).forEach(key => {
        if (state.allMedia[key].index !== action.updatedMedia.index) {
          newState.allMedia[key] = {...state.allMedia[key]};
        }
      });
      console.log({toUpdate: newState.allMedia[action.updatedMedia.index], updatedMedia: action.updatedMedia})
      newState.allMedia[action.updatedMedia.index] = action.updatedMedia;
      return newState;
    case UPDATE_FILTER:
      mediaState.filter = action.newFilter;
      return mediaState;
    default:
      return state;
  }
}


function _filterMedia(filter, allMedia) {
  return allMedia;
}