'use client'
import Loader from 'components/atoms/Loader/Loader'
import Link from 'next/link'
import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  MouseEvent,
  KeyboardEvent,
  forwardRef,
} from 'react'
interface SharedProps {
  hidden?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
  loaderClass?: string
  locale?: string
}

export type BaseButtonProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>

const isKeyboardEvent = (
  event: MouseEvent | KeyboardEvent
): event is KeyboardEvent => {
  return (event as KeyboardEvent).getModifierState !== undefined
}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  function BaseButton(props, ref) {
    const {
      onClick,
      disabled,
      className,
      children,
      href,
      loading,
      hidden,
      type = 'button',
      loaderClass,
      ...rest
    } = props

    if (hidden) return null

    const onClickHandler = <T extends HTMLElement>(
      event: MouseEvent<T> | KeyboardEvent
    ) => {
      if (disabled || loading || !onClick) return
      if (isKeyboardEvent(event)) {
        const handlePress = onClick as unknown as KeyboardEventHandler
        handlePress(event)
      } else (onClick as unknown as MouseEventHandler<T>)(event)
    }

    if (href) {
      return (
        <Link
          {...rest}
          href={disabled ? '#' : href}
          onClick={onClickHandler}
          role="button"
          className={className}
        >
          {loading ? (
            <Loader loading={loading} className={loaderClass} />
          ) : (
            children
          )}
        </Link>
      )
    }

    // For other clickable elements that are not links, we use a button
    return (
      <button
        {...rest}
        disabled={disabled}
        type={type}
        className={className}
        onClick={onClickHandler}
        ref={ref}
      >
        {loading ? (
          <Loader loading={loading} className={loaderClass} />
        ) : (
          children
        )}
      </button>
    )
  }
)

export default BaseButton
