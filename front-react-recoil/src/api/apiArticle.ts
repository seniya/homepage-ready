import { AxiosResponse } from 'axios'
import { instance } from './instance'

export async function fetchArticles() {
  const response: AxiosResponse<IResponseArticles> = await instance({
    method: 'GET',
    url: `/api/articles/`
  })
  return response.data
}

export async function fetchArticle(_id: string) {
  const response: AxiosResponse<IResponseArticle> = await instance({
    method: 'GET',
    url: `/api/articles/${_id}`
  })
  return response.data
}

export interface IResponseArticles {
  success: boolean,
  data: [IArticle],
  token: string,
  msg: string
}

export interface IResponseArticle {
  success: boolean,
  data: IArticle,
  token: string,
  msg: string
}

export interface IArticle {
  _id: string
  title: string
  subTitle: string
  content: number  
  readLv: number
  category: string
  tags: [string],
  createDate: number,
  updateDate: number,
  _board: string,
  _user: string
}