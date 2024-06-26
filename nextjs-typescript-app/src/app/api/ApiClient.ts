import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import ApiClientInterceptor from './ApiClientInterceptor'

export interface AxiosRequestConfigWithRetries extends AxiosRequestConfig {
  retries?: number
}

interface ApiClient {
  baseURL: string
  count: number
  instance: AxiosInstance
  debug_mode: boolean
}

class ApiClient {
  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.count = 0
    this.instance = axios.create({
      baseURL,
      timeout: 40000,
    })
    this.debug_mode = process.env.NODE_ENV !== 'production'
    this.instance.interceptors.response.use(undefined, ApiClientInterceptor)
  }

  setBaseUrl = (baseUrl: string) => {
    this.instance.defaults.baseURL = baseUrl
  }

  createCancelTokenSource = () => axios.CancelToken.source()

  setLocale = (locale = 'et') => {
    this.instance.defaults.headers.common['Accept-Language'] = locale
  }

  setAccessToken = (accessToken?: string) => {
    this.instance.defaults.headers.common.Authorization =
      accessToken === null ? null : `Bearer ${accessToken}`
  }

  debug = (title: string, content: object) => {
    if (this.debug_mode && (title || content)) {
      if (title) {
        // console.log(`=== DEBUG: ${title} ===========================`)
      }
      if (content) {
        // console.log(content)
      }
    }
  }

  request = async (
    config: AxiosRequestConfigWithRetries & {
      retries?: number
      hideError?: boolean
    }
  ) => {
    try {
      const response = await this.instance.request(config)
      this.count += 1

      return response.data
    } catch (error) {
      return //alert(error)
    }
  }

  get = async (url: string, params = {}, config = {}) =>
    this.request({
      ...config,
      method: 'get',
      url,
      params,
    })
  post = async (url: string, data = {}, config = {}) =>
    this.request({
      ...config,
      method: 'post',
      url,
      data,
    })

  put = async (url: string, data = {}, config = {}) =>
    this.request({
      ...config,
      method: 'put',
      url,
      data,
    })

  delete = async (url: string, data = {}, config = {}) =>
    this.request({
      ...config,
      method: 'delete',
      url,
      data,
    })
}

export default ApiClient
