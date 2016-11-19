// @flow
import { REMOVE_MEDIA, RESET_MEDIA, UPDATE_FILTER, UPDATE_MEDIA } from '../actions/media';

export const initialState = {
  allMedia: {},
  filter: ''
};

export default function media(state = initialState, action = {}) {
  const mediaState = {...state};
  let newState = {};
  switch (action.type) {
    case REMOVE_MEDIA:
      newState = {
        filter: `${state.filter}`,
        allMedia: {}
      }
      Object.keys(state.allMedia)
      .filter(index => index !== action.index)
      .forEach(index => {
        newState.allMedia[index] = {...state[index]}
      })
      return newState
    case RESET_MEDIA:
      action.media.forEach(item => {
        mediaState.allMedia[item.index] = item;
      });
      return mediaState;
    case UPDATE_MEDIA:
      newState = {filter: '', allMedia: {}};
      newState.filter = `${state.filter}`;
      Object.keys(state.allMedia).forEach(key => {
        if (state.allMedia[key].index !== action.updatedMedia.index) {
          newState.allMedia[key] = {...state.allMedia[key]};
        }
      });
      newState.allMedia[action.updatedMedia.index] = action.updatedMedia;
      console.log('Updated in UPDATE_MEDIA', newState.allMedia[action.updatedMedia.index])
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