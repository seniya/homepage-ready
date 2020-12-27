import { AxiosInstance } from 'axios'

export function setInterceptors (instance: AxiosInstance) {
  instance.interceptors.request.use(
    function (config) {
      config.headers.Authorization = localStorage.getItem('token')
      return config
    },
    function (error) {
      // switch (error.response.status) {
      //   case 400:
      //     Vue.prototype.$toast.error(`잘못된 요청입니다(${error.response.status}:${error.message})`)
      //     break
      //   case 401:          
      //     Vue.prototype.$toast.error(`인증 오류입니다(${error.response.status}:${error.message})`)
      //     break
      //   case 403:
      //     Vue.prototype.$toast.error(`이용 권한이 없습니다(${error.response.status}:${error.message})`)
      //     break
      //   default:
      //     Vue.prototype.$toast.error(`알수 없는 오류입니다(${error.response.status}:${error.message})`)
      //     break
      // }
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      console.log(`${response.config.url}`, response)
      return response
    },
    function (error) {
      return Promise.reject(error)
    }
  )
  return instance
}
