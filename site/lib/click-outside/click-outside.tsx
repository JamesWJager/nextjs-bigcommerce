<<<<<<< HEAD
import React, {
  useRef,
  useEffect,
  MouseEvent,
  FC,
  ReactElement,
  forwardRef,
  Ref,
  ReactNode,
} from 'react'
import { mergeRefs } from 'react-merge-refs'
=======
import React, { useRef, useEffect, MouseEvent } from 'react'
>>>>>>> parent of f3a6202 (testing)
import hasParent from './has-parent'

interface ClickOutsideProps {
  active: boolean
  onClick: (e?: MouseEvent) => void
<<<<<<< HEAD
  ref?: Ref<any>
  children?: ReactNode
}

/**
 * Use forward ref to allow this component to be used with other components like
 * focus-trap-react, that rely on the same type of ref forwarding to direct children
 */
const ClickOutside: FC<ClickOutsideProps> = forwardRef(
  ({ active = true, onClick, children }, forwardedRef) => {
    const innerRef = useRef()

    const child = children ? (React.Children.only(children) as any) : undefined

    if (!child || child.type === React.Fragment) {
      /**
       * React Fragments can't be used, as it would not be possible to pass the ref
       * created here to them.
       */
      throw new Error('A valid non Fragment React Children should be provided')
    }

    if (typeof onClick != 'function') {
      throw new Error('onClick must be a valid function')
=======
  children: any
}

const ClickOutside = ({ active = true, onClick, children }: ClickOutsideProps) => {
    const innerRef = useRef()

    const handleClick = (event: any) => {
      if (!hasParent(event.target, innerRef?.current)) {
        if (typeof onClick === 'function') {
          onClick(event)
        }
      }
>>>>>>> parent of f3a6202 (testing)
    }

    useEffect(() => {
      if (active) {
        document.addEventListener('mousedown', handleClick)
        document.addEventListener('touchstart', handleClick)
      }
<<<<<<< HEAD
=======

>>>>>>> parent of f3a6202 (testing)
      return () => {
        if (active) {
          document.removeEventListener('mousedown', handleClick)
          document.removeEventListener('touchstart', handleClick)
        }
      }
    })

<<<<<<< HEAD
    const handleClick = (event: any) => {
      /**
       * Check if the clicked element is contained by the top level tag provided to the
       * ClickOutside component, if not, Outside clicked! Fire onClick cb
       */
      if (!hasParent(event.target, innerRef?.current)) {
        onClick(event)
      }
    }

    /**
     * Preserve the child ref prop if exists and merge it with the one used here and the
     * proxied by the forwardRef method
     */
    const composedRefCallback = (element: ReactElement) => {
      if (typeof child.ref === 'function') {
        child.ref(element)
      } else if (child.ref) {
        child.ref.current = element
      }
    }

    return React.cloneElement(child, {
      ref: mergeRefs([composedRefCallback, innerRef, forwardedRef]),
    })
  }
)

ClickOutside.displayName = 'ClickOutside'
=======
    return React.cloneElement(children, { ref: innerRef })
  }

>>>>>>> parent of f3a6202 (testing)
export default ClickOutside
