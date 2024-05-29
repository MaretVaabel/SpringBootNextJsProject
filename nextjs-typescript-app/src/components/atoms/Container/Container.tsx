import { PropsWithChildren, Ref, forwardRef } from 'react'
import classNames from 'classnames'
import classes from './classes.module.scss'

interface ContainerProps {
  className?: string
  id?: string
}

const Container = (
  { children, className, id }: PropsWithChildren<ContainerProps>,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <section
      ref={ref}
      className={classNames(classes.container, className)}
      id={id}
    >
      {children}
    </section>
  )
}

export default forwardRef(Container)
