import * as types from './actionTypes'

const initialState = {
  errorMessage: '',
  movies: [],
}

const reducer = (state = initialState, action) => {
  //NOTE: without out endpoints and sagas I add payload to response
  const response = action.payload
  switch (action.type) {
    case types.GET_MOVIES:
      return {
        ...state,
        movies: response.data,
      }

    default:
      return state
  }
}

export default reducer
