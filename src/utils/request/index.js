import { service } from './service'

const request = (option) => {
  const { url, method, params, headers } = option
  return service({
    url,
    method,
    params,
    headers
  })
}
export default {
  get: (option) => {
    return request({ method: 'get', ...option })
  },
  post: (option) => {
    return request({ method: 'post', ...option })
  }
}
