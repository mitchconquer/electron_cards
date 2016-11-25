import { remote } from 'electron';
const mediaFlashcards = remote.getGlobal('globalObj').mediaFlashcards;
const desktopDir = remote.getGlobal('globalObj').desktopDir;
import { processing } from './files';
import { push } from 'react-router-redux';

export const RESET_MEDIA = 'RESET_MEDIA';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_MEDIA = 'UPDATE_MEDIA';
export const REMOVE_MEDIA = 'REMOVE_MEDIA';
export const COMBINE_MEDIA = 'COMBINE_MEDIA';

// ACTION CREATORS

/**
 * Creates action to set media in store
 * @param {array} media - An array of objects containing subtitle text, times, ids and media file names
 */

export function combineMedia(updatedMedia, toRemove) {
  return {
    type: COMBINE_MEDIA,
    updatedMedia,
    toRemove
  }
}

export function removeMedia(index) {
  return {
    type: REMOVE_MEDIA,
    index
  }
}

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
  return {
    type: UPDATE_MEDIA,
    updatedMedia: {...updatedMedia}
  };
}

// ACTION CREATOR CREATORS

export function combineSubtitles(index1, index2) {
  if (index1 === index2) {
    return;
  }

  return (dispatch, getState) => {
    const { files, subtitles } = getState();

    let target, source;
    if (index1 < index2) {
      target = subtitles.present[index1];
      source = subtitles.present[index2];
    } else {
      target = subtitles.present[index2];
      source = subtitles.present[index1];
    }

    const merged = mediaFlashcards.combineSubtitles(target, source, {replaceMedia: false});

    const videoFile = files.videoFile.path;
    dispatch(processing(true));

    mediaFlashcards.updateAudio(videoFile, merged)
      .then(
        updatedMedia => dispatch(combineMedia(updatedMedia, source.index))
      )
      .then(
        () => dispatch(processing(false))
      );
  };

}

export function createApkg() {
  return (dispatch, getState) => {
    const { files, subtitles } = getState();
    const videoFile = files.videoFile.path;
    dispatch(processing(true));

    mediaFlashcards.createAnkiDb(videoFile, mediaToArray(subtitles.present))
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
    const { files } = getState()
    const videoFile = files.videoFile.path
    const subtitleData = {
      ...newMedia, 
      media: mediaFlashcards.updateFileVersionHash(newMedia.media)
    }

    // Problems:
    // 1. Redux devtools says the updateMedia() dispatch is happening in two steps
    //    The duration and endtime are updated when we dispatch processing(true)
    //    and then the media filename is updated when updateMedia() is dispatched
    //    like expected.
    // 2. When you click `undo`, the updated time (possibly the endtime as well?) 
    //    are not being updated.
    // 3. The app is insanely slow since adding redux-undo. State object is 8.4mb. 
    //    Should see if can use Immutable.js to reduce size of state.

    dispatch(processing(true))

    mediaFlashcards.updateAudio(videoFile, subtitleData)
      .then(
        updatedMedia => dispatch(updateMedia(updatedMedia))
      )
      .then(
        () => dispatch(processing(false))
      )
  }
}

function mediaToArray(mediaObject) {
  return Object.keys(mediaObject).map(key => mediaObject[key])
}
