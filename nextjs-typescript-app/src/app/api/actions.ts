import { apiClient } from '.'
import { endpoints } from './endpoints'

export async function getAllMovies() {
  const response = await apiClient.get(endpoints.MOVIES)
  console.log('response', response)
  return response
}

//import axios from 'axios'

// const axiosClient = axios.create()
// axiosClient.defaults.baseURL = 'http://127.0.0.1'

// export async function getAllMovies() {
//   const response = await axiosClient.get(endpoints.MOVIES)
//   console.log('response', response)
//   return response.data
// }
