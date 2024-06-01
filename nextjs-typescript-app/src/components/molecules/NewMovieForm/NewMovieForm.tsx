'use client'
import React from 'react'
import classes from './classes.module.scss'
import { Root } from '@radix-ui/react-form'
import Button, {
  AppearanceTypes,
  SizeTypes,
} from 'components/molecules/Button/Button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import TextInput from 'components/molecules/TextInput/TextInput'
import {
  MovieCategories,
  MoviePayload,
  MovieState,
  addMovie,
} from 'app/api/actions'
import SelectionInput from 'components/molecules/SelectionInput/SelectionInput'
import { keys, map, toLower, toNumber } from 'lodash'

interface FormValues {
  name: string
  category: MovieCategories | string
  rate: string
  year: string
  state: MovieState | string
}

const NewMovieForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      category: '',
      rate: '',
      year: '',
      state: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (value) => {
    const data: MoviePayload = {
      ...value,
      rate: toNumber(value.rate),
      year: toNumber(value.year),
    }

    try {
      await addMovie(data)
      reset()
      alert('New movie is created')
    } catch (error) {
      return
    }
  }
  const movieKeys = keys(MovieCategories) as Array<keyof typeof MovieCategories>
  const categoryOptions = map(movieKeys, (key) => {
    return {
      label: key,
      value: key,
    }
  })

  const stateKeys = keys(MovieState) as Array<keyof typeof MovieState>
  const stateOptions = map(stateKeys, (key) => {
    return {
      label: key,
      value: toLower(key),
    }
  })
  return (
    <Root
      className={classes.formContainer}
      id="newMovie"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'Name is required',
        }}
        render={({ field }) => (
          <TextInput
            {...field}
            ariaLabel={'name'}
            type="text"
            placeholder={'Add movie name'}
            error={errors[field.name]}
            className={classes.input}
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        rules={{
          required: 'Category is required',
        }}
        render={({ field }) => (
          <SelectionInput
            className={classes.selectInput}
            ariaLabel={'categories'}
            placeholder={'Select category'}
            options={categoryOptions}
            {...field}
          />
        )}
      />
      <Controller
        name="rate"
        control={control}
        rules={{
          pattern: {
            value: /^\d+(\.\d)?\d*$/i,
            message: 'Rate is incorrect. Rate should be number or decimal',
          },
        }}
        render={({ field }) => (
          <TextInput
            {...field}
            ariaLabel={'rate'}
            type="text"
            placeholder={'Add movie rate'}
            error={errors[field.name]}
            className={classes.input}
          />
        )}
      />
      <Controller
        name="year"
        control={control}
        rules={{
          pattern: {
            value: /^(19[0-9][0-9]|20[01][0-9]||20[02][0-4])$/i, //TODO: make dynamic
            message: 'Year is incorrect. Year can be this year or older',
          },
        }}
        render={({ field }) => (
          <TextInput
            {...field}
            ariaLabel={'year'}
            type="text"
            placeholder={'Add movie published year'}
            error={errors[field.name]}
            className={classes.input}
          />
        )}
      />
      <Controller
        name="state"
        control={control}
        rules={{
          required: 'State is required',
        }}
        render={({ field }) => (
          <SelectionInput
            className={classes.selectInput}
            ariaLabel={'state'}
            placeholder={'Select state'}
            options={stateOptions}
            {...field}
          />
        )}
      />

      <Button
        ariaLabel={'submit'}
        size={SizeTypes.S}
        appearance={AppearanceTypes.Primary}
        className={classes.button}
        type="submit"
        label={'Submit'}
      />
    </Root>
  )
}

export default NewMovieForm
