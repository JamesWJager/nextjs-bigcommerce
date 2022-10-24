<<<<<<< HEAD
import { FC, useRef, useEffect, useCallback, ReactNode } from 'react'
import s from './Modal.module.css'
import FocusTrap from '@lib/focus-trap'
import { Cross } from '@components/icons'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

interface ModalProps {
  className?: string
  children?: ReactNode
  onClose: () => void
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
=======
import { FC, useRef, useEffect, useCallback } from 'react'
import Portal from '@reach/portal'
import s from './Modal.module.css'
import { Cross } from '@components/icons'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import FocusTrap from '@lib/focus-trap'
interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
  onEnter?: () => void | null
}

const Modal: FC<Props> = ({ children, open, onClose, onEnter = null }) => {
>>>>>>> parent of f3a6202 (testing)
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
<<<<<<< HEAD
    const modal = ref.current

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: true })
      window.addEventListener('keydown', handleKey)
    }
    return () => {
      clearAllBodyScrollLocks()
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  return (
    <div className={s.root}>
      <div className={s.modal} role="dialog" ref={ref}>
        <button
          onClick={() => onClose()}
          aria-label="Close panel"
          className={s.close}
        >
          <Cross className="h-6 w-6" />
        </button>
        <FocusTrap focusFirst>{children}</FocusTrap>
      </div>
    </div>
=======
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current)
        window.addEventListener('keydown', handleKey)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
      clearAllBodyScrollLocks()
    }
  }, [open, handleKey])

  return (
    <Portal>
      {open ? (
        <div className={s.root}>
          <div className={s.modal} role="dialog" ref={ref}>
            <button
              onClick={() => onClose()}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none absolute right-0 top-0 m-6"
            >
              <Cross className="h-6 w-6" />
            </button>
            <FocusTrap focusFirst>{children}</FocusTrap>
          </div>
        </div>
      ) : null}
    </Portal>
>>>>>>> parent of f3a6202 (testing)
  )
}

export default Modal
