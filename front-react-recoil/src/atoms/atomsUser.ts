import { atom } from 'recoil'
import * as API from '../api/apiUser'

export const userAtom = atom<API.IUser>({
  key: 'userAtom',
  default: {
    _id: '',
    id: null,
    pwd: null,
    name: null
  }
})

export const singUpAction = async (userInfo: any) => {
  try {
    const response = await API.addUser(userInfo)
    return response
  } catch (error) {
    console.log('error : ', error)
    throw error
  }
}
