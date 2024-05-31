'use client'
import React, { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { updateMovieState } from 'app/api/actions'
import { split, toNumber } from 'lodash'
import SwitchInput from 'components/molecules/SwitchInput/SwitchInput'

interface MoviesStateToggleType {
  name: string
  id: string
  label?: string
  value: boolean
}
type FormValues = {
  [key: string]: string
}

const MoviesStateToggle: FC<MoviesStateToggleType> = ({
  name,
  id,
  label,
  value,
}) => {
  const { control } = useForm<FormValues>({
    mode: 'onChange',
  })

  const handleToggleState = (name: string, value: boolean) => {
    const movieId = toNumber(split(name, '-')[0])
    try {
      updateMovieState({ state: value, id: movieId })
    } catch (error) {
      return alert(error)
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <SwitchInput
            ariaLabel={name}
            id={id}
            defaultValue={value}
            label={label}
            onClick={() => handleToggleState(name, !value)}
            {...field}
          />
        )
      }}
    />
  )
}

export default MoviesStateToggle
