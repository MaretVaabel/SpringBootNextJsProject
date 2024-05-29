'use client'
import React, { FC, useState } from 'react'
import classes from './classes.module.scss'
import Container from 'components/atoms/Container/Container'
import Button, { AppearanceTypes, SizeTypes } from '../Button/Button'
import { getAllMovies } from 'app/api/actions'
import { keys, size, slice } from 'lodash'
import { useSelector } from 'react-redux'

interface DataTablePropTypes {
  headings?: String[]
  data?: any
  title?: String
}

const DataTable: FC<DataTablePropTypes> = async () => {
  // const data = await getAllMovies()
  const data = useSelector((state: any) => state.movies.movies)
  console.log('data', data)
  const headings = keys(data)
  const [currentPage, setCurrentPage] = useState(1)
  const nbPerPage = 5
  const lastIndex = currentPage * nbPerPage
  const startIndex = lastIndex - nbPerPage
  const numberOfPages = Math.ceil(size(data) / nbPerPage)
  const records = slice(data, startIndex, lastIndex)

  const nextPage = () => {
    if (currentPage != numberOfPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <Container>
      {/* <h4 className={classes.title} hidden={!title}>
        {'Movies'}
      </h4> */}
      <table className={classes.dataTable}>
        <thead>
          <tr>
            {headings.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* TODO: add proper typing */}
          {records.map((d: any, i: any) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.nom}</td>
              <td>{d.number}</td>
              <td>{d.service}</td>
              <td>
                <Button
                  ariaLabel={'delete'}
                  size={SizeTypes.S}
                  appearance={AppearanceTypes.Primary}
                  className={classes.button}
                  type="submit"
                >
                  {'Delete'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="">
        <div className="">
          <span className="" onClick={() => prevPage()}>
            prev
          </span>
          <div className="">
            <span>{currentPage}</span>
            <span>/</span>
            <span>{numberOfPages}</span>
          </div>
          <span className="" onClick={() => nextPage()}>
            next
          </span>
        </div>
      </div>
    </Container>
  )
}

export default DataTable
