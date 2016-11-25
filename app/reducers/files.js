// @flow
import { SET_FILES, PROCESSING } from '../actions/files';

export const initialState = {
  processing: false
};

export default function files(state = initialState, action = {}) {
  switch (action.type) {
    case PROCESSING:
      return {
        ...state,
        processing: action.value
      }
    case SET_FILES:
      const newState = {
        processing: !!state.processing
      };
      action.files.forEach(fileData => {
        newState[fileData.basicType] = fileData;
      });
      return newState;
    default:
      return state;
  }
}
