import axios, { AxiosInstance } from 'axios'
import { setInterceptors } from './common/interceptors'

// const apiRootPath = '/api'

function createInstance () {
  const instance: AxiosInstance = axios.create({
    // baseURL: apiRootPath
  })
  return setInterceptors(instance)
}

export const instance = createInstance()
