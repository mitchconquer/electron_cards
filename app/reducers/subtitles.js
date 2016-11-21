// @flow
import { COMBINE_MEDIA, REMOVE_MEDIA, RESET_MEDIA, UPDATE_MEDIA } from '../actions/media'
import undoable, { includeAction } from 'redux-undo'

export const initialState = {};

function subtitles(state = initialState, action = {}) {
  let newState = {};
  switch (action.type) {
    case COMBINE_MEDIA:
      Object.keys(state).forEach(key => {
        const notNew = state[key].index !== action.updatedMedia.index;
        const notToRemove = state[key].index !== action.toRemove;
        if (notNew && notToRemove) {
          newState[key] = {...state[key]};
        }
      });
      newState[action.updatedMedia.index] = action.updatedMedia;
      return newState
    case REMOVE_MEDIA:
      Object.keys(state).forEach(index => {
        if (parseInt(index) !== action.index) {
          newState[index] = {...state[index]}
        }
      })
      return newState
    case RESET_MEDIA:
      action.media.forEach(item => {
        newState[item.index] = item;
      });
      return newState;
    case UPDATE_MEDIA:
      Object.keys(state).forEach(key => {
        if (state[key].index !== action.updatedMedia.index) {
          newState[key] = {...state[key]};
        }
      });
      newState[action.updatedMedia.index] = action.updatedMedia;
      return newState;
    default:
      return state;
  }
}

const undoableSubtitles = undoable(subtitles, {
  filter: includeAction([COMBINE_MEDIA, UPDATE_MEDIA, REMOVE_MEDIA])
})

export default undoableSubtitles
