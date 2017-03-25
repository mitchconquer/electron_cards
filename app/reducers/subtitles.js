// @flow
import { COMBINE_MEDIA, REMOVE_MEDIA, RESET_MEDIA,
         SELECT_ALL, SELECT_NONE, TOGGLE_CHECKBOX,
         UPDATE_MEDIA, BULK_UPDATE_MEDIA, UPDATE_TEXT
       } from '../actions/media'
import undoable, { includeAction } from 'redux-undo'

export const initialState = {}

function subtitles(state = initialState, action = {}) {
  const newState = {}
  switch (action.type) {
    case BULK_UPDATE_MEDIA:
      const bulkUpdated = {
        ...state
      }
      Object.keys(action.updatedMedia).forEach(key => {
        bulkUpdated[key] = { ...action.updatedMedia[key] }
      })
      return bulkUpdated
    case COMBINE_MEDIA:
      Object.keys(state).forEach(key => {
        const notNew = state[key].index !== action.updatedMedia.index
        const notToRemove = state[key].index !== action.toRemove
        if (notNew && notToRemove) {
          newState[key] = { ...state[key] }
        }
      })
      newState[action.updatedMedia.index] = action.updatedMedia
      return newState
    case REMOVE_MEDIA:
      return Object.keys(state)
        .reduce((remainingMedia, index) => {
          if (parseInt(index) !== action.index) {
            return {
              ...remainingMedia,
              [index]: {
                ...state[index]
              }
            }
          }
          return remainingMedia
        }, {})
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
    case SELECT_ALL:
      // Only select subtitle items that match the fitler
      return Object.values(state)
        .reduce((newState, subtitle) => {
          const filter = action.filter.trim()
          const matches = filter ? subtitle.text.toLowerCase().includes(action.filter.toLowerCase()) : true
          if (matches) {
            return {
              ...newState,
              [subtitle.id]: {
                ...subtitle,
                selected: true
              }
            }
          }
          return {
            ...newState
          }
        }, {})
    case SELECT_NONE:
      const noneSelected = {}
      Object.keys(state).forEach(key => {
        noneSelected[key] = {
          ...state[key],
          selected: false
        }
      })
      return noneSelected
    case UPDATE_MEDIA:
      return {
        ...state,
        [action.updatedMedia.index]: {
          ...action.updatedMedia
        }
      }
    case UPDATE_TEXT:
      return {
        ...state,
        [action.index]: {
          ...state[action.index],
          text: `${action.text}`
        }
      }
    default:
      return state
  }
}

const undoableSubtitles = undoable(subtitles, {
  filter: includeAction([BULK_UPDATE_MEDIA, COMBINE_MEDIA, UPDATE_MEDIA, REMOVE_MEDIA, UPDATE_TEXT]),
  neverSkipReducer: true,
  clearHistoryType: RESET_MEDIA
})

export default undoableSubtitles
