// @flow
import { REMOVE_MEDIA, RESET_MEDIA, UPDATE_MEDIA } from '../actions/media';

export const initialState = {
  allMedia: {}
};

export default function media(state = initialState, action = {}) {
  const mediaState = {...state};
  let newState = {};
  switch (action.type) {
    case REMOVE_MEDIA:
      newState = {
        allMedia: {}
      }
      Object.keys(state.allMedia).forEach(index => {
        if (parseInt(index) !== action.index) {
          newState.allMedia[index] = {...state.allMedia[index]}
        }
      })
      return newState
    case RESET_MEDIA:
      action.media.forEach(item => {
        mediaState.allMedia[item.index] = item;
      });
      return mediaState;
    case UPDATE_MEDIA:
      newState = {allMedia: {}};
      Object.keys(state.allMedia).forEach(key => {
        if (state.allMedia[key].index !== action.updatedMedia.index) {
          newState.allMedia[key] = {...state.allMedia[key]};
        }
      });
      newState.allMedia[action.updatedMedia.index] = action.updatedMedia;
      return newState;
    default:
      return state;
  }
}
