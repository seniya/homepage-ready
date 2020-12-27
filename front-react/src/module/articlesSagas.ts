import { takeEvery, call, put } from 'redux-saga/effects'

import { fetchArticles } from '../api/article';

function* fetch() {
  try {
    const articles = yield call(fetchArticles)
    yield put({ type: 'ARTICLES_FETCH_SUCCESS', payload: { articles: articles.data } })
  } catch (e) {
    yield put({ type: 'ARTICLES_FETCH_FAILURE', payload: { message: e.message } })
  }
}

export default function* articlesSagas() {
  yield takeEvery("ARTICLES_FETCH_REQUEST", fetch)
}