// @flow
import { RESET_MEDIA } from '../actions/media';
import mediaLocal from './media_local';

export const initialState = {...mediaLocal};

export default function media(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_MEDIA:
      // const newState = {};
      // action.media.forEach(item => {
      //   newState[item.index] = item;
      // });
      // return newState;
      return mediaLocal;
    default:
      return state;
  }
}
