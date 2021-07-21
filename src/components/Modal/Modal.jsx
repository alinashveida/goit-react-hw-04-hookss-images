import { ModalContainer, Overlay } from './Modal.styled'
import { createPortal } from 'react-dom'
import React, { Component, useEffect } from 'react'

const ModalRoot = document.querySelector('#root')

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

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown)
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown)
//   }

//   handleKeyDown = (e) => {
//     if (e.code === 'Escape') {
//       this.props.onClose()
//     }
//   }

//   handlerBackdropClick = (e) => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose()
//     }
//   }

//   render() {
//     return createPortal(
//       <Overlay onClick={this.handlerBackdropClick}>
//         <ModalContainer>{this.props.children}</ModalContainer>
//       </Overlay>,
//       ModalRoot,
//     )
//   }
// }
