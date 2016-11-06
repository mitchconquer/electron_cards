import { remote } from 'electron';
const mediaFlashcards = remote.getGlobal('globalObj').mediaFlashcards;
import { processing } from './files';

export const RESET_MEDIA = 'RESET_MEDIA';
export const UPDATE_FILTER = "UPDATE_FILTER";

// ACTION CREATORS

/**
 * Creates action to set media in store
 * @param {array} media - An array of objects containing subtitle text, times, ids and media file names
 */
export function resetMedia(media) {
  return {
    type: RESET_MEDIA,
    media
  };
}

export function updateFilter(newFilter) {
  console.log('updating filter with ', newFilter)
  return {
    type: UPDATE_FILTER,
    newFilter
  };
}

// ACTION CREATOR CREATORS

export function createApkg() {
  return (dispatch, getState) => {
    const { files, media } = getState();
    console.log({path: files.videoFile.path})
    const videoFile = files.videoFile.path;
    console.log({videoFile, createApkg: 'processing'})
    dispatch(processing(true));
    mediaFlashcards.createAnkiDb(videoFile, mediaArray(media))
      .then(
        dbFile => {console.log({dbFile}); return mediaFlashcards.createApkg(dbFile, mediaFlashcards.quickName(videoFile))}
      )
      .then(
        () => dispatch(processing(false))
      );
  };
}

function mediaArray(mediaObject) {
  return Object.keys(mediaObject).map(key => mediaObject[key]);
}
