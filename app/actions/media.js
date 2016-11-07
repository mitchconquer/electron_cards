import { remote } from 'electron';
const mediaFlashcards = remote.getGlobal('globalObj').mediaFlashcards;
const desktopDir = remote.getGlobal('globalObj').desktopDir;
import { processing } from './files';
import { push } from 'react-router-redux';

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
  return {
    type: UPDATE_FILTER,
    newFilter
  };
}

// ACTION CREATOR CREATORS

export function createApkg() {
  return (dispatch, getState) => {
    const { files, media } = getState();
    const videoFile = files.videoFile.path;
    dispatch(processing(true));

    mediaFlashcards.createAnkiDb(videoFile, mediaToArray(media.allMedia))
      .then(
        dbFile => mediaFlashcards.createApkg(dbFile, mediaFlashcards.quickName(videoFile), desktopDir)
      )
      .then(
        () => mediaFlashcards.rmFiles('./pkg')
      )
      .then(
        () => dispatch(processing(false))
      )
      .then(
        () => dispatch(push('/'))
      );
  };
}

function mediaToArray(mediaObject) {
  return Object.keys(mediaObject).map(key => mediaObject[key]);
}
