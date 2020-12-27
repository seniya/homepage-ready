import * as API from '../api/posts';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, createReducer } from '@reduxjs/toolkit';


// Action Type
const SEARCH_DATA_ASYNC = 'SEARCH_DATA_ASYNC';
const SEARCH_DATA = 'SEARCH_DATA';
const SAVE_DATA_ASYNC = 'SAVE_DATA_ASYNC';
const REMOVE_DATA_ASYNC = 'REMOVE_DATA_ASYNC';


// Action Creator
export const searchDataAsync = createAction(SEARCH_DATA_ASYNC);
export const searchData = createAction(SEARCH_DATA);
export const saveDataAsync = createAction(SAVE_DATA_ASYNC, (data, lastId) => ({payload: {data, lastId}}));
export const removeDataAsync = createAction(REMOVE_DATA_ASYNC)

export function* boardSaga() {
    yield takeEvery(SEARCH_DATA_ASYNC, searchDataSaga);
    yield takeEvery(SAVE_DATA_ASYNC, saveDataSaga);
    yield takeEvery(REMOVE_DATA_ASYNC, removeDataSaga);
}

export function* searchDataSaga() {
    const response = yield call(API.getData);
    yield put(searchData(response));
}

export function* saveDataSaga({payload}) {
    const response = yield call(API.saveData, payload);
    if(response != null && (response.status === 201 || response.status === 200)) {
        yield put(searchDataAsync());
    }
}

export function* removeDataSaga({payload: id}) {
    const response = yield call(API.removeData, id);
    if(response.status === 200) {
        yield put(searchDataAsync());
    }
}


// initState
const initialState = {
    boards: [],
    lastId: 0
}


// Toolkit Reducer
export default createReducer(initialState, {
    [SEARCH_DATA]: (state, {payload: data}) => {
        state.boards.length=0;
        for(let i = 0 ; i < data.length ; i++) {
            state.boards.push({
                id: data[i].id,
                boardId: data[i].id,
                boardTitle: data[i].boardTitle,
                boardContent: data[i].boardContent
            });
            if(i === data.length-1) {
                state.lastId = data[i].id;
            }
        }
    }
})