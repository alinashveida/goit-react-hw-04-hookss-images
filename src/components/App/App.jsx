import React, { useState } from 'react'
import Searchbar from '../Searchbar/Searchbar'
import ImagesInfo from '../ImagesInfo/ImagesInfo'
import { Container, ModalImg } from './App.styled'
import Modal from '../Modal/Modal'

export default function App() {
  const [imageName, setImageName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [largeImageURL, setLargeImageURL] = useState('')

  const toggleModal = (largeImageURL) => {
    setShowModal(!showModal)
    setLargeImageURL(largeImageURL || '')
  }

  const onSubmit = (imageName) => {
    setImageName(imageName)

    console.log(imageName)
  }

  return (
    <Container>
      <Searchbar onSubmit={onSubmit}></Searchbar>
      <ImagesInfo imageName={imageName} onImageClick={toggleModal}></ImagesInfo>
      {showModal && (
        <Modal onClose={toggleModal}>
          <ModalImg src={largeImageURL}></ModalImg>
        </Modal>
      )}
    </Container>
  )
}
