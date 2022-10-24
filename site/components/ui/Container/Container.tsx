<<<<<<< HEAD
import cn from 'clsx'
import React, { FC } from 'react'

interface ContainerProps {
=======
import cn from 'classnames'
import React, { FC } from 'react'

interface Props {
>>>>>>> parent of f3a6202 (testing)
  className?: string
  children?: any
  el?: HTMLElement
  clean?: boolean
}

<<<<<<< HEAD
const Container: FC<ContainerProps> = ({
  children,
  className,
  el = 'div',
  clean = false, // Full Width Screen
}) => {
  const rootClassName = cn(className, {
    'mx-auto max-w-7xl px-6 w-full': !clean,
  })

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any
=======
const Container: FC<Props> = ({ children, className, el = 'div', clean }) => {
  const rootClassName = cn(className, {
    'mx-auto max-w-8xl px-6': !clean,
  })

  let Component: React.ComponentType<React.HTMLAttributes<
    HTMLDivElement
  >> = el as any
>>>>>>> parent of f3a6202 (testing)

  return <Component className={rootClassName}>{children}</Component>
}

export default Container
