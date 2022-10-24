<<<<<<< HEAD
import cn from 'clsx'
import s from './Sidebar.module.css'
import { useEffect, useRef } from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
interface SidebarProps {
  children: any
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ children, onClose }) => {
  const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const onKeyDownSidebar = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.focus()
    }

    const contentElement = contentRef.current

    if (contentElement) {
      disableBodyScroll(contentElement, { reserveScrollBarGap: true })
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [])

  return (
    <div
      className={cn(s.root)}
      ref={sidebarRef}
      onKeyDown={onKeyDownSidebar}
      tabIndex={1}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className={s.backdrop} onClick={onClose} />
        <section className="absolute inset-y-0 right-0 w-full md:w-auto max-w-full flex outline-none md:pl-10">
          <div className="h-full w-full md:w-screen md:max-w-md">
            <div className={s.sidebar} ref={contentRef}>
              {children}
            </div>
          </div>
        </section>
      </div>
    </div>
=======
import s from './Sidebar.module.css'
import Portal from '@reach/portal'
import { FC, useEffect, useRef } from 'react'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

interface Props {
  children: any
  open: boolean
  onClose: () => void
}

const Sidebar: FC<Props> = ({ children, open = false, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [open])

  return (
    <Portal>
      {open ? (
        <div className={s.root} ref={ref}>
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={onClose}
            />
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 outline-none">
              <div className="h-full md:w-screen md:max-w-md">
                <div className="h-full flex flex-col text-base bg-accents-1 shadow-xl overflow-y-auto">
                  {children}
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </Portal>
>>>>>>> parent of f3a6202 (testing)
  )
}

export default Sidebar
