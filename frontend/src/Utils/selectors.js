export const selectUser = (state) => state.user

export const selectPhotographer = (photographerId) => (state) => {
  return state.photographer[photographerId] ?? { status: 'void' }
}


export const selectPhotographers = (state) => state.photographers

export const selectMedias = (state) => state.medias

export const selectMedia = (mediaId) => (state) => {
  return state.media[mediaId] ?? { status: 'void' }
}