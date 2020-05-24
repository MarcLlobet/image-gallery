/* globals describe, test, expect */
import * as actions from './index'

describe('Actions', () => {
  test('should create an action for getImages', () => {
    const expectedAction = {
      type: 'GET_IMAGES'
    }
    expect(actions.getImages()).toEqual(expectedAction)
  })

  test('should create an action for copyToClipboard', () => {
    const expectedAction = {
      type: 'COPY_TO_CLIPBOARD'
    }
    expect(actions.copyToClipboard()).toEqual(expect.objectContaining(expectedAction))
  })

  test('should create an action for loadMoreImages', () => {
    const expectedAction = {
      type: 'LOAD_MORE_IMAGES'
    }
    expect(actions.loadMoreImages()).toEqual(expectedAction)
  })
})
