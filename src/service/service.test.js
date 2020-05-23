/* globals describe, test, expect */
import Service from './index'

describe('addParamsToEndpoint', () => {
  test('returns an url when no params are added', () => {
    const url = Service.addParamsToEndpoint('domain.com', new Map([]))
    expect(url).toEqual('domain.com')
  })

  test('returns an url with param when added', () => {
    const url = Service.addParamsToEndpoint('domain.com', new Map([['param1', 10]]))
    expect(url).toEqual('domain.com?param1=10')
  })

  test('returns an url with multiple params when added', () => {
    const url = Service.addParamsToEndpoint(
      'domain.com',
      new Map([
        ['param1', 10],
        ['param2', 20]
      ])
    )
    expect(url).toEqual('domain.com?param1=10&param2=20')
  })

  test('returns an url with multiple params without changing its order', () => {
    const url = Service.addParamsToEndpoint(
      'domain.com',
      new Map([
        ['z', 10],
        ['a', 20],
        [1, 30],
        [0, 40]
      ])
    )
    expect(url).toEqual('domain.com?z=10&a=20&1=30&0=40')
  })
})
