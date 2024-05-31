import React, { FC } from 'react'
import classes from './classes.module.scss'
import { Control, Controller, useWatch } from 'react-hook-form'
import { FormValues } from 'components/molecules/MoviesForm/MoviesForm'
import { includes, keys, pickBy } from 'lodash'

interface CheckBoxInputType {
  name: string
  id: string
  label?: string
  value?: boolean
  control: Control<FormValues>
}

const CheckBoxInput: FC<CheckBoxInputType> = ({ id, control }) => {
  const selectedValues = useWatch({
    control,
  })
  const selectedIds = keys(pickBy(selectedValues))
  //TODO: Fix a bug about selecting movies in multiple pages
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => {
        return (
          <div className={classes.checkbox}>
            <input
              type="checkbox"
              checked={includes(selectedIds, id)}
              aria-label={'delete'}
              className={classes.checkbox1}
              {...field}
            />
          </div>
        )
      }}
    />
  )
}

export default CheckBoxInput
