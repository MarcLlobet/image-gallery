export const getImages = params => ({
  type: 'GET_IMAGES',
  params
})

export const copyToClipboard = copiedLink => ({
  type: 'COPY_TO_CLIPBOARD',
  copiedLink
})

export const loadMoreImages = () => ({
  type: 'LOAD_MORE_IMAGES'
})

export const openModal = modalInfo => ({
  type: 'OPEN_MODAL',
  modalInfo
})

export const closeModal = () => ({
  type: 'CLOSE_MODAL'
})
