import { configureStore } from '@reduxjs/toolkit'

// Import reducers

import movies from 'store/movies/reducer'

const store = configureStore({
  reducer: {
    movies,

    // Add more reducers as needed
  },
})
export default store
