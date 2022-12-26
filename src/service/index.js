export const defaultParams = {
  q: 'design',
  limit: 25,
  offset: 0,
  rating: 'G',
  lang: 'en'
}

class Service {
  constructor(url, key) {
    this.url = url
    this.key = key
  }

  addParamsToEndpoint(endpoint, parameters) {
    const endPointParams = [...parameters.entries()].reduce(
      (prev, [param, value], index) => `${prev}${!index ? '?' : '&'}${param}=${value}`,
      ''
    )

    return `${endpoint}${endPointParams}`
  }

  endpoint(params = {}) {
    const parameters = new Map()
    parameters.set('api_key', this.key)

    const modifiedParams = Object.entries(defaultParams).reduce(
      (prev, [param, value]) => ({
        ...prev,
        ...(param in params ? { [param]: params[param] } : { [param]: value })
      }),
      {}
    )

    Object.entries(modifiedParams).forEach(([param, value]) => {
      parameters.set(param, value)
    })

    return {
      search: this.addParamsToEndpoint(`${this.url}/search`, parameters)
    }
  }
}

const url = 'https://api.giphy.com/v1/gifs'
const apiKey = 'DxPQQKtw0DEFRWX54uNu2XpURiyhh8gA'

export default new Service(url, apiKey)
