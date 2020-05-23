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
