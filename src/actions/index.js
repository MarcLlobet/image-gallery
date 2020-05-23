export const getImages = () => ({
  type: 'GET_IMAGES'
})

export const copyToClipboard = copiedLink => ({
  type: 'COPY_TO_CLIPBOARD',
  copiedLink
})
