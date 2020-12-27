import axios from 'axios';

// Search Api
export async function getData() {
    const selectUrl = 'http://localhost:4000/data';
    const response = await axios.get<TypeBoard[]>(selectUrl);
    return response.data;
}

// Save Api
export async function saveData() {
  return true
}

// Remove Api
export async function removeData() {
  return true
}

export interface TypeBoard {
  id: number
  boardId: number
  boardTitle: string
  boardContent: string  
}