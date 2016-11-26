// @flow
import { COMBINE_MEDIA, REMOVE_MEDIA, RESET_MEDIA, TOGGLE_CHECKBOX, UPDATE_MEDIA } from '../actions/media'
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
      return {
        ...action.media
      }
    case TOGGLE_CHECKBOX:
      return {
        ...state,
        [action.index]: {
          ...state[action.index],
          selected: !state[action.index].selected
        }
      }
    case UPDATE_MEDIA:
      return {
        ...state,
        [action.updatedMedia.index]: {
          ...action.updatedMedia
        }
      }
    default:
      return state;
  }
}

const undoableSubtitles = undoable(subtitles, {
  filter: includeAction([COMBINE_MEDIA, UPDATE_MEDIA, REMOVE_MEDIA])
})

export default undoableSubtitles
