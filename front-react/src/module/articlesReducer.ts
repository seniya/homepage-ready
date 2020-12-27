import {
  ActionType,
  createReducer,
  createAsyncAction
} from 'typesafe-actions'
import { IArticle } from '../api/article';

const FETCH_ARTICLES = {
  REQUEST: 'ARTICLES_FETCH_REQUEST',
  SUCCESS: 'ARTICLES_FETCH_SUCCESS',
  FAILURE: 'ARTICLES_FETCH_FAILURE'
}

interface IRequest {

}

interface IResponse {
  articles: IArticle[]
}

interface IError {
  success: boolean,
  message: string
}

export const fetchArticles =
  createAsyncAction(FETCH_ARTICLES.REQUEST, FETCH_ARTICLES.SUCCESS, FETCH_ARTICLES.FAILURE)<IRequest, IResponse, IError>()

const actions = {
  fetchArticles
}

type Actions = ActionType<typeof actions>
type State = { articles: IArticle[], message: string }

const initialState: State = { articles: [], message: '' }

const reducer = createReducer<State, Actions>(initialState)
  .handleAction(fetchArticles.success, (state, action) => {
    return { ...state, articles: action.payload.articles }
  })
  .handleAction(fetchArticles.failure, (state, action) => {
    return { ...state, message: action.payload.message }
  })
  .handleAction(fetchArticles.request, (state) => {
    return { ...state }
  })

export default reducer