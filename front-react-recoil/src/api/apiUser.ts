import { AxiosResponse } from 'axios'
import { instance } from './instance'

export async function fetchUsers() {
  const response: AxiosResponse<IResponseUsers> = await instance({
    method: 'GET',
    url: `/api/users/`
  })
  return response.data
}

export async function fetchUser(_id: string) {
  const response: AxiosResponse<IResponseUser> = await instance({
    method: 'GET',
    url: `/api/users/${_id}`
  })
  return response.data
}

export async function addUser(user: any) {
  const response: AxiosResponse<IResponseUser> = await instance({
    method: 'POST',
    url: `/api/sign/up`,
    data: user
  })
  return response.data
}

export interface IResponseUsers {
  success: boolean,
  data: [IUser],
  token: string,
  msg: string
}

export interface IResponseUser {
  success: boolean,
  data: IUser,
  token: string,
  msg: string
}

export interface IUser {
  _id?: string
  id: string | null
  pwd?: string | null
  name: string | null
  age?: number  
  lv?: number
  inCnt?: number
  email?: string
  photo?: string
  googleId?: string
  facebookId?: string
  retry?: number
  termsAgree?: boolean
  approval?: boolean
}