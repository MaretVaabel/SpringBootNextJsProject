import { Dispatch, RefObject, SetStateAction, forwardRef, useRef } from 'react'
import classNames from 'classnames'
import { map, isEmpty, toString } from 'lodash'
import { SelectionControlsInputProps } from 'components/molecules/SelectionInput/SelectionInput'
import { useClickAway } from 'ahooks'
import classes from './classes.module.scss'
import Button, {
  AppearanceTypes,
  SizeTypes,
} from 'components/molecules/Button/Button'

interface DropdownContentComponentProps extends SelectionControlsInputProps {
  isOpen?: boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
  className?: string
  wrapperRef?: RefObject<HTMLDivElement>
}

const EmptyContent = ({ hidden }: { hidden?: boolean }) => {
  if (hidden) return null
  return (
    <li className={classes.dropdownMenuItem}>
      <p className={classes.option}>{'List is empty'}</p>
    </li>
  )
}

const DropdownContent = forwardRef<
  HTMLDivElement,
  DropdownContentComponentProps
>(function DropdownContentComponent(
  {
    disabled,
    isOpen,
    options,
    value,
    onChange,
    setIsOpen,
    wrapperRef,
    className,
  },
  ref
) {
  const scrollContainer = useRef(null)
  const typedRef = ref as RefObject<HTMLDivElement>

  useClickAway(() => {
    if (setIsOpen) {
      setIsOpen(false)
    }
  }, [typedRef, wrapperRef])

  const handleSingleSelect = (selectedOption: string) => {
    onChange(selectedOption ? selectedOption : '')

    if (setIsOpen) {
      setIsOpen(false)
    }
  }

  if (disabled || !isOpen) return null

  return (
    <div className={classNames(classes.dropdownMenu, className)} ref={ref}>
      <ul ref={scrollContainer}>
        <EmptyContent hidden={!isEmpty(options)} />
        {map(options, (option) => {
          return (
            <li key={option.value} className={classes.dropdownMenuItem}>
              <Button
                className={classes.option}
                appearance={AppearanceTypes.Text}
                size={SizeTypes.S}
                onClick={() => handleSingleSelect(toString(option?.value))}
                autoFocus={isOpen && option.value === value}
                ariaLabel={'option'}
                label={option?.label}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
})

export default DropdownContent
