import { AxiosResponse } from 'axios'
import { instance } from './instance'

export async function fetchBoards() {
  const response: AxiosResponse<IResponseBoards> = await instance({
    method: 'GET',
    url: `/api/boards/`
  })
  return response.data
}

export async function fetchBoard(_id: any) {
  const response: AxiosResponse<IResponseBoard> = await instance({
    method: 'GET',
    url: `/api/boards/${_id}`
  })
  return response.data
}

export interface IResponseBoards {
  success: boolean,
  data: [IBoard],
  token: string,
  msg: string
}

export interface IResponseBoard {
  success: boolean,
  data: IBoard,
  token: string,
  msg: string
}

export interface IBoard {
  _id: string
  name: string
  title: string
  createLv: number  
  readLv: number
  categories: [String]
  tags: [String]
}