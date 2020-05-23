const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_IMAGES':
      return { ...state, loading: true }
    case 'IMAGES_RECEIVED':
      return { ...state, images: action.json, loading: false }
    case 'COPY_TO_CLIPBOARD':
      return { ...state, copiedLink: action.copiedLink }
    case 'SHOW_LINK':
      return { ...state, displayLink: true }
    case 'HIDE_LINK':
      return { ...state, displayLink: false }
    default:
      return state
  }
}
export default reducer
