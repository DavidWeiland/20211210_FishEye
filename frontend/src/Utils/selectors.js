export const selectUser = (state) => state.user

export const selectPhotographer = (state) => state.photographer

export const selectPhotographers = (state) => state.photographers

export const selectMedias = (state) => state.medias

export const selectMedia = (mediaId) => (state) => {
  return state.media[mediaId] ?? { status: 'void' }
}