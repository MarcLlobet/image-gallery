/* globals jest, describe, test, expect */
import { connect } from 'react-redux'
import { put, takeEvery, takeLatest, delay, all } from 'redux-saga/effects'
import { getImages } from '../actions'
import Sagas, { fetchImages, fetchClipboard, showLink, hideLink, actionWatcher } from './index'

describe('Sagas', () => {
  test('sagas default export is listening all actions', () => {
    const generator = Sagas()
    expect(generator.next().value).toEqual(all([actionWatcher()]))
  })

  test('should dispatch all actions', () => {
    const generator = actionWatcher()
    expect(generator.next().value).toEqual(takeEvery('GET_IMAGES', fetchImages))
    expect(generator.next().value).toEqual(takeEvery('COPY_TO_CLIPBOARD', fetchClipboard))
    expect(generator.next().value).toEqual(takeEvery('LINK_COPIED', showLink))
    expect(generator.next().value).toEqual(takeLatest('SHOW_LINK', hideLink))
    expect(generator.next().done).toBeTruthy()
  })

  test('should dispatch action "GET_IMAGES"', () => {
    const mockComponent = () => ({})
    const mockParams = { params: { limit: 10, offset: 0 } }
    const mapDispatchToProps = {
      getImages: getImages.call(mockParams)
    }
    const mockResponse = {
      data: [],
      pagination: {}
    }
    const generator = fetchImages(mockParams)
    connect(null, mapDispatchToProps)(mockComponent)

    expect(generator.next().value).resolves.toEqual({ mockResponse })
  })

  test('should dispatch action "LINK_COPIED"', () => {
    const generator = showLink()
    expect(generator.next().value).toEqual(put({ type: 'SHOW_LINK' }))
  })

  test('should dispatch action "HIDE_LINK"', () => {
    const generator = hideLink()
    expect(generator.next().value).toEqual(delay(2000))
    expect(generator.next().value).toEqual(put({ type: 'HIDE_LINK' }))
  })
})
