import { put, takeEvery, takeLatest, delay, all } from 'redux-saga/effects'
import Service from '../service'

export function* showLink() {
  yield put({ type: 'SHOW_LINK' })
}

export function* hideLink() {
  yield delay(2000)
  yield put({ type: 'HIDE_LINK' })
}

export function* fetchClipboard(action) {
  yield navigator.clipboard.writeText(action.copiedLink).then(response => response)
  yield put({ type: 'LINK_COPIED' })
}

export function* fetchImages(action) {
  const { params } = action
  const json = yield fetch(Service.endpoint(params).search).then(response => response.json())
  const { data: images, pagination } = json
  yield put({ type: 'IMAGES_RECEIVED', images, pagination })
}

export function* actionWatcher() {
  yield takeEvery('GET_IMAGES', fetchImages)
  yield takeEvery('COPY_TO_CLIPBOARD', fetchClipboard)
  yield takeEvery('LINK_COPIED', showLink)
  yield takeLatest('SHOW_LINK', hideLink)
}

export default function* rootSaga() {
  yield all([actionWatcher()])
}
