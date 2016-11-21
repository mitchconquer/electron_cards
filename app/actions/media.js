import { remote } from 'electron';
const mediaFlashcards = remote.getGlobal('globalObj').mediaFlashcards;
const desktopDir = remote.getGlobal('globalObj').desktopDir;
import { processing } from './files';
import { push } from 'react-router-redux';

export const RESET_MEDIA = 'RESET_MEDIA';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_MEDIA = 'UPDATE_MEDIA';
export const REMOVE_MEDIA = 'REMOVE_MEDIA';

// ACTION CREATORS

/**
 * Creates action to set media in store
 * @param {array} media - An array of objects containing subtitle text, times, ids and media file names
 */

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
    updatedMedia
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
    // mediaFlashcards.rmFile(source.media);
    console.log('combined subtitles media file ', merged.media)

    const videoFile = files.videoFile.path;
    dispatch(processing(true));

    mediaFlashcards.updateAudio(videoFile, merged)
      .then(
        updatedMedia => dispatch(updateMedia(updatedMedia))
      )
      .then(
        () => dispatch(removeMedia(source.index))
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
