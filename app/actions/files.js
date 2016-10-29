export const SET_FILES = 'SET_FILES';

// ACTION CREATORS

/**
 * Creates action to set multiple files.
 * @param {array} files - An array of File blobs converted to objects, must have basicType `videoFile` or `subtitlesFile` properties
 */
export function setFiles(files) {
  return {
    type: SET_FILES,
    files
  };
}