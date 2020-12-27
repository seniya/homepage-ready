import { selector, selectorFamily } from 'recoil'
import * as API from '../api/apiBoard'

export const boardsQuery = selector({
  key: 'boardsQuerySelector',
  get: async () => {    
    try {
      const response = await API.fetchBoards()
      return response
    } catch (error) {
      console.log('error : ', error)
      throw error
    }
  }
}) 

export const boardQuery = selectorFamily({
  key: 'boardQuerySelector',
  get: _id => async () => {
    console.log('boardsQuerySelector _id : ', _id)
    try {
      const response = await API.fetchBoard(_id)
      return response
    } catch (error) {
      console.log('error : ', error)
      throw error
    }
  }
}) 

// export const boardsQuery = selector({
//   key: 'boardsQuerySelector',
//   get: _id => async () => {
//     // console.log('boardsQuerySelector _id : ', _id)
//     try {
//       const response = await API.fetchBoards()
//       return response
//     } catch (error) {
//       console.log('error : ', error)
//       throw error
//     }
//   }
// }) 

