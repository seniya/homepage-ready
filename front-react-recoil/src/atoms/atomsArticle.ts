import { selector } from 'recoil'
import * as API from '../api/apiArticle'

export const articlesQuery = selector({
  key: 'articlesQuerySelector',
  get: async ({ get }) => {
    try {
      const response = await API.fetchArticles()
      return response
    } catch (error) {
      console.log('error : ', error)
      throw error
    }
  }
}) 