import { apiClient } from '.'
import { endpoints } from './endpoints'

export enum MovieState {
  Activated = 'activated',
  Deactivated = 'deactivated',
}
export enum MovieCategories {
  Action = 'action',
  Comedy = 'comedy',
  Drama = 'drama',
  Fantasy = 'fantasy',
  Horror = 'horror',
  Mystery = 'mystery',
  Romance = 'romance',
  Thriller = 'thriller',
  Documentary = 'documentary',
}
export interface MovieType {
  id: number
  name: string
  rate?: number
  year?: number
  state: MovieState
  category?: MovieCategories
}
export interface MoviesDataType {
  movies: MovieType[]
}

export async function getAllMovies() {
  const response = await apiClient.get(endpoints.MOVIES)
  return response
}

export async function updateMovieState({
  state,
  id,
}: {
  state: string
  id: number
}) {
  const response = await apiClient.put(`${endpoints.UPDATE}/${id}`, {
    state,
  })
  return response
}

export async function deleteMovieById(id: number) {
  const response = await apiClient.delete(`${endpoints.DELETE}/${id}`)

  //TODO: chance the cached data and revalidate
  window.location.reload()
  return response
}

export interface MoviePayload {
  name: string
  category: string
  rate?: number
  year?: number
  state: string
}
export async function addMovie(payload: MoviePayload) {
  const response = await apiClient.post(endpoints.ADD, payload)

  //TODO: chance the cached data and revalidate
  window.location.reload()
  return response
}
