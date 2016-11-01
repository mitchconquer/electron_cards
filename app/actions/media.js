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
