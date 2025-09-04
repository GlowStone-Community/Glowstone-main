import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 5000,
  withCredentials: true, // 允许跨域携带凭证
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器：自动注入 token
axiosInstance.interceptors.request.use(async (request) => {
  try {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')

    if (token && request.headers) {
      request.headers.Authorization = `Bearer ${token}`
    }
    console.log('Axios Request:', request)
    return request
  } catch (error) {
    console.error('获取 token 失败:', error)
    console.log('Axios Request:', request)
    return request
  }
})

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Axios Response:', response)
    return response
  },
  (error) => {
    console.error('Axios Error:', error)
    
    // 处理 401 未授权错误（token过期或无效）
    if (error.response && error.response.status === 401) {
      console.log('Token已过期或无效，清除认证状态')
      
      // 清除localStorage中的token
      localStorage.removeItem('token')
      
      // 如果是在浏览器环境中，可以触发一个自定义事件来通知其他组件
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('tokenExpired'))
      }
    }
    
    return Promise.reject(error)
  }
)

// 方法链类
class AxiosChain {
  private config: AxiosRequestConfig = {}
  private instance: AxiosInstance
  private _url: string = ''
  private _method: string = 'get'
  private _data: any = undefined

  constructor(instance: AxiosInstance) {
    this.instance = instance
    this.config = {
      headers: {},
      params: {},
      timeout: 5000,
      baseURL: instance.defaults.baseURL, // 默认baseURL
    }
  }

  api(url: string) {
    this._url = url
    return this
  }

  method(method: string) {
    this._method = method.toLowerCase()
    return this
  }

  header(key: string, value: any) {
    this.config.headers![key] = value
    return this
  }

  headers(headersObj: Record<string, any>) {
    this.config.headers = { ...this.config.headers, ...headersObj }
    return this
  }

  param(key: string, value: any) {
    this.config.params![key] = value
    return this
  }

  timeout(ms: number) {
    this.config.timeout = ms
    return this
  }

  baseURL(url: string) {
    this.config.baseURL = url
    return this
  }

  data(data: any) {
    this._data = data
    return this
  }

  async request(): Promise<AxiosResponse> {
    if (!this._url) throw new Error('API url is required')
    const method = this._method
    
    // 使用 axios 实例的方法确保拦截器生效
    if (method === 'get') {
      return this.instance.get(this._url, { ...this.config })
    } else if (method === 'post') {
      return this.instance.post(this._url, this._data, { ...this.config })
    } else if (method === 'put') {
      return this.instance.put(this._url, this._data, { ...this.config })
    } else if (method === 'delete') {
      return this.instance.delete(this._url, { ...this.config })
    } else if (method === 'patch') {
      return this.instance.patch(this._url, this._data, { ...this.config })
    } else {
      // 对于其他方法，仍然使用 request 方法
      return this.instance.request({
        url: this._url,
        method,
        data: this._data,
        ...this.config,
      })
    }
  }
}

// 导出 axios 实例和方法链类
export const axiosClient = axiosInstance
export const axiosChain = () => new AxiosChain(axiosInstance)

// 默认导出
export default axiosInstance