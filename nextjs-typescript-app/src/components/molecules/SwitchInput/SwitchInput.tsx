import React, { FC } from 'react'
import classes from './classes.module.scss'
import { Control, Controller } from 'react-hook-form'
import { MovieState, updateMovieState } from 'app/api/actions'
import { FormValues } from 'components/molecules/MoviesForm/MoviesForm'

export interface SwitchInputPropType {
  ariaLabel: string
  id: number
  control: Control<FormValues>
}

const SwitchInput: FC<SwitchInputPropType> = ({ id, ariaLabel, control }) => {
  const handleToggleState = (id: number, state: string) => {
    try {
      updateMovieState({ state, id })
    } catch (error) {
      return alert(error)
    }
  }

  const stateLabel = (value: boolean) => {
    const label = value ? MovieState.Activated : MovieState.Deactivated
    return label
  }

  return (
    <Controller
      name={`${id}.isActive`}
      control={control}
      render={({ field }) => {
        return (
          <div className={classes.switch}>
            <input
              aria-label={ariaLabel}
              type="checkbox"
              id={`${id}.isActive`}
              checked={!!field.value}
              {...field}
            />
            <label
              htmlFor={`${id}.isActive`}
              tabIndex={0}
              onClick={() => {
                handleToggleState(id, stateLabel(!field.value))
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLLabelElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  field.onChange(!field.value)
                }
              }}
            ></label>
            <p>{stateLabel(!!field.value)}</p>
          </div>
        )
      }}
    />
  )
}

export default SwitchInput
