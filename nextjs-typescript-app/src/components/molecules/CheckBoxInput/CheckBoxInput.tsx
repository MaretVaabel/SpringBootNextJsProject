import React, { FC } from 'react'
import classes from './classes.module.scss'
import { Control, Controller, useWatch } from 'react-hook-form'
import { FormValues } from 'components/molecules/MoviesForm/MoviesForm'
import { includes, keys, pickBy } from 'lodash'

interface CheckBoxInputType {
  id: string
  control: Control<FormValues>
}

const CheckBoxInput: FC<CheckBoxInputType> = ({ id, control }) => {
  const selectedValues = useWatch({
    control,
  })
  const selectedIds = keys(pickBy(selectedValues, 'isChecked'))

  return (
    <Controller
      name={`${id}.isChecked`}
      control={control}
      render={({ field }) => {
        return (
          <div className={classes.checkbox}>
            <input
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  field.onChange(!field.value)
                }
              }}
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
