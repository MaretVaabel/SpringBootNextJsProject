'use client'
import React, { FC, useState } from 'react'
import classes from './classes.module.scss'
import { Root } from '@radix-ui/react-form'
import { SubmitHandler, useForm } from 'react-hook-form'
import DataTable from 'components/molecules/DataTable/DataTable'
import Container from 'components/atoms/Container/Container'
import Button, {
  SizeTypes,
  AppearanceTypes,
} from 'components/molecules/Button/Button'
import { MovieType, deleteMovieById } from 'app/api/actions'
import TablePagination from 'components/molecules/TablePagination/TablePagination'
import { keys, map, pickBy, size, slice, toNumber } from 'lodash'

interface MoviesFormType {
  data: MovieType[]
}
export type FormValues = {
  [key: string]: string
}

const MoviesForm: FC<MoviesFormType> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const nbPerPage = 5
  const lastIndex = currentPage * nbPerPage
  const startIndex = lastIndex - nbPerPage
  const numberOfPages = Math.ceil(size(data) / nbPerPage)
  const moviesData = slice(data, startIndex, lastIndex)

  const { control, handleSubmit, watch } = useForm<FormValues>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FormValues> = (value) => {
    const moviesIds = keys(pickBy(value))

    try {
      //TODO: do modal for this
      const res = confirm(
        `Are you sure you want to delete ${size(moviesIds)} movies!`
      )
      if (!!res) {
        Promise.all([
          map(moviesIds, (id) => deleteMovieById(toNumber(id))),
        ]).then((values) => {})
      } else {
        window.location.reload()
      }
    } catch (error) {
      return alert(error)
    }
  }
  return (
    <Root onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <DataTable control={control} data={moviesData} />
        <TablePagination
          numberOfPages={numberOfPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />

        <div className={classes.buttonContainer}>
          <span>{'Delete selected Movies'}</span>
          <Button
            ariaLabel={'delete'}
            size={SizeTypes.S}
            appearance={AppearanceTypes.Primary}
            className={classes.button}
            type="submit"
          >
            {'Delete'}
          </Button>
        </div>
      </Container>
    </Root>
  )
}

export default MoviesForm
