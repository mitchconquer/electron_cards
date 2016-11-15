import { remote } from 'electron';
const mediaFlashcards = remote.getGlobal('globalObj').mediaFlashcards;
const desktopDir = remote.getGlobal('globalObj').desktopDir;
import { processing } from './files';
import { push } from 'react-router-redux';

export const RESET_MEDIA = 'RESET_MEDIA';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_MEDIA = 'UPDATE_MEDIA';

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

export function updateMedia(updatedMedia) {
  console.log('action creater updateMedia()')
  return {
    type: UPDATE_MEDIA,
    updatedMedia
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

export function updateMediaTimes(newMedia) {
  return (dispatch, getState) => {
    const { files } = getState();
    const videoFile = files.videoFile.path;
    dispatch(processing(true));

    console.log({newMedia})
    mediaFlashcards.updateAudio(videoFile, newMedia)
      .then(
        updatedMedia => {dispatch(updateMedia(updatedMedia)); return updatedMedia;}
      )
      .then(
        updatedMedia => {console.log('this is the `then` after dispatching updateMedia()'); console.log(updatedMedia)}
      )
      .then(
        () => dispatch(processing(false))
      );
  };
}

function mediaToArray(mediaObject) {
  return Object.keys(mediaObject).map(key => mediaObject[key]);
}
