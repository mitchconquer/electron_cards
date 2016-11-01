// @flow
import { SET_FILES, PROCESSING } from '../actions/files';

export const initialState = {
  processing: false
};

export default function files(state = initialState, action = {}) {
  switch (action.type) {
    case PROCESSING:
      const nextState = Object.assign({}, state);
      nextState.processing = action.value;
      return nextState;
    case SET_FILES:
      const newState = Object.assign({}, state);
      action.files.forEach(fileData => {
        newState[fileData.basicType] = fileData;
      });
      return newState;
    default:
      return state;
  }
}
