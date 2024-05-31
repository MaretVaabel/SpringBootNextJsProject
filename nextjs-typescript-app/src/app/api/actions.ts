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
  state: boolean
  id: number
}) {
  const stateLabel = state ? 'activated' : 'deactivated'
  const response = await apiClient.put(`${endpoints.UPDATE}/${id}`, {
    state: stateLabel,
  })

  //TODO: chance the cached data and revalidate
  window.location.reload()
}

export async function deleteMovieById(id: number) {
  const response = await apiClient.delete(`${endpoints.DELETE}/${id}`)

  //TODO: chance the cached data and revalidate
  window.location.reload()
}
