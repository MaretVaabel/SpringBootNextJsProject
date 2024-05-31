import MoviesForm from 'components/molecules/MoviesForm/MoviesForm'
import { MovieType, getAllMovies } from './api/actions'

export default async function Home() {
  const data: MovieType[] = await getAllMovies()

  return (
    <main>
      <MoviesForm data={data} />
    </main>
  )
}
