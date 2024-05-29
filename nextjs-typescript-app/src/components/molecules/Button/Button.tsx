import { FC, PropsWithChildren, forwardRef } from 'react'
import classNames from 'classnames'
import classes from './classes.module.scss'
import BaseButton, {
  BaseButtonProps,
} from 'components/atoms/BaseButton/BaseButton'
import Image from 'next/image'

export enum AppearanceTypes {
  Primary = 'primary',
  Secondary = 'secondary',
  Text = 'text',
  Icon = 'icon',
}
export enum SizeTypes {
  L = 'l',
  M = 'm',
  S = 's',
  XS = 'xs',
}

export type IconProps = {
  icon?: string
  ariaLabel?: string
}
export interface ButtonProps extends BaseButtonProps {
  appearance?: AppearanceTypes
  size?: SizeTypes
  ariaLabel: string
  hidden?: boolean
  className?: string
  icon?: string
}

export const Icon: FC<IconProps> = ({ icon: IconComponent, ariaLabel }) => {
  if (!IconComponent) return null

  return (
    <Image
      src={IconComponent}
      height={18}
      width={18}
      alt={ariaLabel || 'image'}
    />
  )
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  function Button(
    {
      appearance = 'primary',
      size = 'm',
      ariaLabel,
      icon,
      hidden,
      className,
      children,
      disabled,
      ...rest
    },
    ref
  ) {
    if (hidden) return null

    return (
      <BaseButton
        ref={ref}
        className={classNames(
          classes.btn,
          classes[appearance],
          classes[size],
          disabled && classes.disabled,
          className
        )}
        disabled={disabled}
        loaderClass={classes.loader}
        {...rest}
        aria-label={ariaLabel}
      >
        <Icon icon={icon} ariaLabel={ariaLabel} />
        <span hidden={!children} className={classes.buttonText}>
          {children}
        </span>
      </BaseButton>
    )
  }
)

export default Button
