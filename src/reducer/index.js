const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_IMAGES':
      return {
        ...state,
        loading: true
      }
    case 'IMAGES_RECEIVED':
      return {
        ...state,
        images: [...(state.images || []), ...action.images],
        pagination: action.pagination,
        loading: false
      }
    case 'COPY_TO_CLIPBOARD':
      return { ...state, copiedLink: action.copiedLink }
    case 'SHOW_LINK':
      return { ...state, displayLink: true }
    case 'HIDE_LINK':
      return { ...state, displayLink: false }
    case 'OPEN_MODAL':
      return { ...state, displayModal: true, modalInfo: action.modalInfo }
    case 'CLOSE_MODAL':
      return { ...state, displayModal: false, modalInfo: undefined }
    default:
      return state
  }
}
export default reducer
