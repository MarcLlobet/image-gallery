import { put, takeEvery, takeLatest, delay, all } from 'redux-saga/effects'
import Service from '../service'

function* showLink() {
  yield put({ type: 'SHOW_LINK' })
}

function* hideLink() {
  yield delay(2000)
  yield put({ type: 'HIDE_LINK' })
}

function* fetchClipboard(action) {
  yield navigator.clipboard.writeText(action.copiedLink).then(response => response)
  yield put({ type: 'LINK_COPIED' })
}

function* fetchImages() {
  const json = yield fetch(Service.endpoint().search).then(response => response.json())
  yield put({ type: 'IMAGES_RECEIVED', json })
}

function* actionWatcher() {
  yield takeEvery('GET_IMAGES', fetchImages)
  yield takeEvery('COPY_TO_CLIPBOARD', fetchClipboard)
  yield takeEvery('LINK_COPIED', showLink)
  yield takeLatest('SHOW_LINK', hideLink)
}

export default function* rootSaga() {
  yield all([actionWatcher()])
  // yield takeEvery('GET_IMAGES', fetchImages)
  // yield takeEvery('COPY_TO_CLIPBOARD', fetchClipboard)
}
