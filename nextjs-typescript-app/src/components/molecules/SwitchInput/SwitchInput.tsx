import React, { InputHTMLAttributes, forwardRef } from 'react'
import classes from './classes.module.scss'

export interface SwitchInputPropType
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'label' | 'placeholder' | 'defaultValue'
  > {
  ariaLabel: string
  name?: string
  id: string
  label?: string
  defaultValue?: boolean
}

const SwitchInput = forwardRef<HTMLInputElement, SwitchInputPropType>(
  function SwitchInput(
    { name, id, label, ariaLabel, defaultValue, onClick, ...rest },
    ref
  ) {
    return (
      <div className={classes.switch}>
        <input
          ref={ref}
          aria-label={ariaLabel}
          type="checkbox"
          id={id}
          defaultChecked={defaultValue}
          name={name}
          onClick={onClick}
          {...rest}
        />
        <label htmlFor={name} tabIndex={0}></label>
        <p hidden={!label}>{label}</p>
      </div>
    )
  }
)

export default SwitchInput
