import { call, put, takeLatest } from 'redux-saga/effects'

import * as types from './actionTypes'
import { apiClient } from '.'
import { endpoints } from './endpoints'

function* getAllMovies() {
  try {
    const response = yield call(apiClient.get(endpoints.MOVIES))
    if (response) {
      yield put({ type: types.GET_MOVIES_SUCCESS, response })
    }
  } catch (error) {
    const response = error?.response?.data
    yield put({ type: types.GET_MOVIES_FAILURE, response })
  }
}

const sagas = [takeLatest(types.GET_MOVIES, getAllMovies)]

export default sagas
