// @flow
import { RESET_MEDIA } from '../actions/media';

export const initialState = {};

export default function media(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_MEDIA:
      const newState = {};
      action.media.forEach(item => {
        newState[item.index] = item;
      });
      return newState;
    default:
      return state;
  }
}
