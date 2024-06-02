'use client'
import React, { FC, Suspense, useMemo } from 'react'
import classes from './classes.module.scss'
import { Root } from '@radix-ui/react-form'
import { SubmitHandler, useForm } from 'react-hook-form'
import DataTable from 'components/molecules/DataTable/DataTable'
import Container from 'components/atoms/Container/Container'
import Button, {
  SizeTypes,
  AppearanceTypes,
} from 'components/molecules/Button/Button'
import { MovieState, MovieType, deleteMovieById } from 'app/api/actions'
import TablePagination from 'components/molecules/TablePagination/TablePagination'
import { keys, map, pickBy, reduce, size, slice, toNumber } from 'lodash'
import SearchInput from '../SearchInput/SearchInput'
import Loader from 'components/atoms/Loader/Loader'

interface MoviesFormType {
  data: MovieType[]
  query: string
  currentPage: number
}
export type FormValues = {
  [key: string]: {
    isChecked: string
    isActive: string
  }
}

const MoviesForm: FC<MoviesFormType> = ({ data, query, currentPage }) => {
  const nbPerPage = 5
  const lastIndex = currentPage * nbPerPage
  const startIndex = lastIndex - nbPerPage
  const numberOfPages = Math.ceil(size(data) / nbPerPage)
  const moviesData = slice(data, startIndex, lastIndex)

  const defaultValues = useMemo(
    () =>
      reduce(
        data,
        (result, { id, state }) => {
          if (!id) return result

          return {
            ...result,
            [id]: {
              isChecked: false,
              isActive: state === MovieState.Activated,
            },
          }
        },
        {}
      ),
    [data]
  )

  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = (value) => {
    const moviesIds = keys(pickBy(value))
    try {
      //TODO: do modal for this
      const res = confirm(
        `Are you sure you want to delete ${size(moviesIds)} movies!`
      )
      if (res) {
        Promise.all([
          map(moviesIds, (id) => deleteMovieById(toNumber(id))),
        ]).then()
      } else {
        window.location.reload()
      }
    } catch (error) {
      return alert(error)
    }
  }
  return (
    <Container className={classes.moviesContainer}>
      <h1>{'Movies'}</h1>
      <Button
        ariaLabel={'addNew'}
        size={SizeTypes.S}
        appearance={AppearanceTypes.Primary}
        className={classes.addButton}
        href={'/NewMovie'}
        label={'Add new movie'}
      />
      <SearchInput placeholder={'Search by name and id'} />
      <Root id="movies" onSubmit={handleSubmit(onSubmit)}>
        <Suspense key={query + currentPage} fallback={<Loader />}>
          <DataTable control={control} data={moviesData} />
        </Suspense>
      </Root>

      <TablePagination numberOfPages={numberOfPages} />

      <div className={classes.buttonContainer}>
        <span>{'Delete selected Movies'}</span>
        <Button
          form={'movies'}
          ariaLabel={'delete'}
          size={SizeTypes.S}
          appearance={AppearanceTypes.Primary}
          className={classes.button}
          type="submit"
          label={'Delete'}
        />
      </div>
    </Container>
  )
}

export default MoviesForm
