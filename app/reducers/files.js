// @flow
import { SET_FILES } from '../actions/files';

export const initialState = {};

export default function files(state = initialState, action = {}) {
  switch (action.type) {
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
