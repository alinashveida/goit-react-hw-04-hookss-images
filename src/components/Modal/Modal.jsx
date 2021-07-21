import { ModalContainer, Overlay } from './Modal.styled'
import { createPortal } from 'react-dom'
import React, { useEffect } from 'react'

const ModalRoot = document.querySelector('#modal-root')

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClose()
      console.log('e')
    }
  }

  const handlerBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose()
    }
  }

  return createPortal(
    <Overlay onClick={handlerBackdropClick}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>,
    ModalRoot,
  )
}
