import MoviesForm from 'components/molecules/MoviesForm/MoviesForm'
import { MovieType, getAllMovies } from './api/actions'

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) => {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  //TODO: Make pagination, filtering and sorting in BE and send the params
  const data: MovieType[] = await getAllMovies()

  return (
    <main>
      <MoviesForm data={data} query={query} currentPage={currentPage} />
    </main>
  )
}

export default Home
