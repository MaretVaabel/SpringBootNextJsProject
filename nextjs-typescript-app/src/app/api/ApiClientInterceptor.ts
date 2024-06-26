import { get } from 'lodash'
import axios from 'axios'
import { AxiosRequestConfigWithRetries } from './ApiClient'

interface ResultInterface {
  promise?: Promise<unknown>
  resolve?: (value: unknown) => void
  reject?: (value: unknown) => void
}

interface ResponseInterface {
  status: number
}

interface ErrorInterface {
  response?: ResponseInterface
  code: string
  config: object
}

const Defer = () => {
  const result: ResultInterface = {}
  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

const interceptor = (error: ErrorInterface) => {
  const { response } = error

  if (
    (response &&
      (response.status === 429 ||
        response.status === 0 ||
        response.status > 500 ||
        response.status === 403)) ||
    error.code === 'ECONNABORTED'
  ) {
    const deferred = Defer()
    let retries = get(error, 'config.retries', 0)
    const retryLimit = 2

    if (retries >= retryLimit) {
      if (response) {
        return Promise.reject(response)
      }
       
      return Promise.reject({
        status: 0,
        data: '',
      })
    }

    const defaultDelay = 1000 * retries + Math.round(1000 * Math.random())
    retries += 1

    const configWithRetry: AxiosRequestConfigWithRetries = {
      ...error.config,
      retries,
    }

    setTimeout(async () => {
      try {
        const res = axios.request(configWithRetry)
        deferred?.resolve?.(res)
      } catch (err) {
        deferred?.reject?.(err)
      }
    }, defaultDelay)

    return deferred.promise
  }

  return Promise.reject(error)
}

export default interceptor
