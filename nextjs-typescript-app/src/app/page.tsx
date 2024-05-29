'use client'
import DataTable from 'components/molecules/DataTable/DataTable'
import { getAllMovies } from 'app/api/actions'

export default function Home() {
  // const moviesData = getAllMovies()
  // console.log(moviesData)
  return (
    <main>
      <div>Here comes page components</div>
      <DataTable />
    </main>
  )
}
