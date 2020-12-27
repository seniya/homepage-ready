import axios from 'axios'

export async function getBoards() {
  const response = await axios.get<TypeBoard[]>(
    `/api/boards/`
  );
  return response.data
}

export async function getBoard(_id: string) {
  const response = await axios.get<TypeBoard>(
    `/api/boards/${_id}`
  );
  return response.data
}

export interface TypeBoard {
  _id: string
  name: string
  title: string
  createLv: number  
  readLv: number
  categories: [String]
  tags: [String]
}