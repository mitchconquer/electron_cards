import { remote } from 'electron';
const mediaFlashcards = remote.getGlobal('globalObj').mediaFlashcards;
import { processing } from './files';

export const RESET_MEDIA = 'RESET_MEDIA';

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

// ACTION CREATOR CREATORS

export function createApkg() {
  const videoFile = this.state.files.videoFile.path;
  dispatch(processing(true));
  mediaFlashcards.createAnkiDb(videoFile, this.state.media)
    .then(
      dbFile => {console.log({dbFile}); return mediaFlashcards.apkgCreater(dbFile, mediaFlashcards.quickName(videoFile))}
    )
    .then(
      () => dispatch(processing(false))
    );
}
