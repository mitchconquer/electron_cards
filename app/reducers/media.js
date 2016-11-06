// @flow
import { RESET_MEDIA, UPDATE_FILTER } from '../actions/media';
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
      // mediaState.allMedia = {...mediaLocal};
      return mediaState;
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