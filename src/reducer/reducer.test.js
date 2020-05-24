/* globals describe, test, expect */
import reducer from './index'

describe('Reducer', () => {
  test('should return the initial state', () => expect(reducer(undefined, {})).toEqual({}))

  test('should handle "GET_IMAGES" action', () => {
    expect(reducer({}, { type: 'GET_IMAGES' })).toEqual({ loading: true })
  })

  test('should handle "IMAGES_RECEIVED" action', () => {
    const mockParam = {
      images: [],
      pagination: {}
    }

    const mockData = {
      images: [],
      pagination: {},
      loading: false
    }
    expect(reducer({}, { type: 'IMAGES_RECEIVED', ...mockParam })).toEqual({
      ...mockData,
      loading: false
    })
  })

  test('should accumulate data in state at "IMAGES_RECEIVED" action', () => {
    const mockState = [1, 2, 3]

    const mockProps = [4, 5, 6]

    const mockParam = {
      images: mockProps,
      pagination: {}
    }

    const mockData = {
      images: [...mockState, ...mockProps],
      pagination: {},
      loading: false
    }

    expect(reducer({ images: mockState }, { type: 'IMAGES_RECEIVED', ...mockParam })).toEqual({
      ...mockData,
      loading: false
    })
  })

  test('should handle "COPY_TO_CLIPBOARD" action', () => {
    const mockCopiedLink = 'link'

    expect(reducer({}, { type: 'COPY_TO_CLIPBOARD', copiedLink: mockCopiedLink })).toEqual({
      copiedLink: mockCopiedLink
    })
  })

  test('should handle "SHOW_LINK" action', () => {
    expect(reducer({}, { type: 'SHOW_LINK' })).toEqual({
      displayLink: true
    })
  })

  test('should handle "HIDE_LINK" action', () => {
    expect(reducer({}, { type: 'HIDE_LINK' })).toEqual({
      displayLink: false
    })
  })
})
