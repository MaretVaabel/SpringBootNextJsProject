import {
  useMemo,
  useRef,
  useState,
  MouseEvent,
  useEffect,
  forwardRef,
} from 'react'
import classNames from 'classnames'
import { FieldError } from 'react-hook-form'
import BaseButton from 'components/atoms/BaseButton/BaseButton'
import { useClickAway } from 'ahooks'
import ArrowIcon from 'assets/icons/arrow-gray.svg'
import Image from 'next/image'
import classes from './classes.module.scss'
import { find, map, join } from 'lodash'
import DropdownContent from 'components/molecules/DropdownContent/DropdownContent'
import { Field } from '@radix-ui/react-form'

export type DropDownOptions = {
  label: string
  value: string | number
}

export interface SelectionControlsInputProps {
  name: string
  error?: FieldError
  ariaLabel: string
  value?: string | number
  options: DropDownOptions[]
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  hidden?: boolean
  innerClassName?: string
}

const SelectionInput = forwardRef<
  HTMLInputElement,
  SelectionControlsInputProps
>(function SelectionInput(props, ref) {
  const {
    name,
    value,
    error,
    options,
    disabled,
    placeholder,
    className,
    innerClassName,
    hidden,
    ...rest
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [focusElement, setFocusElement] = useState<HTMLElement | null>(null)

  const toggleDropdown = (event: MouseEvent | KeyboardEvent) => {
    setIsOpen(!isOpen)
    if (!document.querySelector('.select-focus') && !isOpen) {
      const target = event?.target as HTMLElement
      target.classList.add('select-focus')
      setFocusElement(target)
    }
  }

  const clickAwayInputRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (document.querySelector('.select-focus') && !isOpen) {
      focusElement?.classList.remove('select-focus')
      focusElement?.focus()
    }
  }, [focusElement, isOpen])

  useClickAway(() => {
    setIsOpen(false)
  }, [clickAwayInputRef, ...(wrapperRef?.current ? [wrapperRef] : [])])

  const singleValue: DropDownOptions | undefined = find(options, {
    value,
  }) as unknown as DropDownOptions

  const valueAsArray = [singleValue]

  const selectedOptionLabels = map(valueAsArray, (value) => value?.label)

  const singleSelectMenuLabel = value
    ? join(selectedOptionLabels, ',')
    : placeholder

  const dropdownMenuLabel = singleSelectMenuLabel

  const dropdownProps = useMemo(
    () => ({
      name,
      options,
      disabled,
      isOpen,
      value,
      setIsOpen,
      ...rest,
    }),
    [name, options, disabled, isOpen, value, rest]
  )

  if (hidden) return null

  return (
    <Field
      ref={clickAwayInputRef}
      name={name}
      className={classNames(
        classes.selectionsContainer,
        disabled && classes.disabled,
        error && classes.error,
        className
      )}
    >
      <div
        className={classNames(classes.inputContainer, innerClassName)}
        ref={wrapperRef}
      >
        <BaseButton
          className={classes.toggleDropdown}
          id={name}
          disabled={disabled}
          onClick={toggleDropdown}
        >
          <p className={classes.selectedValue}>{dropdownMenuLabel}</p>
          <Image
            src={ArrowIcon}
            alt="arrow icon"
            className={classNames(
              isOpen && !error && !disabled && classes.openDropdownIcon
            )}
          />
        </BaseButton>

        <DropdownContent
          {...{
            ...dropdownProps,
            wrapperRef,
            clickAwayInputRef,
          }}
        />
        <span
          className={classNames(classes.subText, {
            [classes.hidden]: !error,
          })}
        >
          {error?.message}
        </span>
      </div>
    </Field>
  )
})

export default SelectionInput
