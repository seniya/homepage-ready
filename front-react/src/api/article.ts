import axios from 'axios'

export async function fetchArticles() {
  const response = await axios.get<IArticle[]>(
    `/api/articles/`
  );
  return response.data
}

export async function fetchArticle(_id: string) {
  const response = await axios.get<IArticle>(
    `/api/articles/${_id}`
  );
  return response.data
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