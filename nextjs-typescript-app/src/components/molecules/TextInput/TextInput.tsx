'use client'
import { forwardRef, useRef } from 'react'
import classNames from 'classnames'
import { Field, Control } from '@radix-ui/react-form'
import classes from './classes.module.scss'
import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  name: string
  className?: string
  error?: FieldError
  ariaLabel: string
  subText?: string
  isLabelText?: boolean
  value?: string | number | null
  isSearch?: boolean
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    const {
      ariaLabel,
      error,
      name,
      className,
      value,
      placeholder,
      disabled,
      hidden,
      subText,
      isSearch,
      ...rest
    } = props
    const wrapperRef = useRef(null)
    const inputProps = {
      ...(placeholder ? { placeholder } : {}),
      className: classes.inputField,
      ref,
      value: value ?? undefined,
      'aria-label': ariaLabel,
      disabled: disabled,
      ...rest,
    }
    if (hidden) return null

    return (
      <Field
        name={name}
        className={classNames(
          classes.container,
          error && classes.error,
          isSearch && classes.searchInputContainer,
          className
        )}
      >
        <div className={classes.inputContainer} ref={wrapperRef}>
          <Control asChild>
            <input
              {...(inputProps as unknown as InputHTMLAttributes<HTMLInputElement>)}
            />
          </Control>
          <span
            className={classNames(classes.subText, {
              [classes.hidden]: !error && !subText,
            })}
          >
            {error?.message || subText}
          </span>
        </div>
      </Field>
    )
  }
)

export default TextInput
