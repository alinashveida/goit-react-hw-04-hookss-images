import React, { useState, useEffect } from 'react'
import ImageGallery from '../ImageGallery/ImageGallery'
import { onError } from '../../NotifyError'
import Spinner from '../Spinner/Spinner'
import { ImagesInfoText } from './ImagesInfo.styled'
import { fetchImages } from '../../services/Api'
import Button from '../Button/Button'

export default function ImagesInfo({ imageName, onImageClick }) {
  const [image, setImage] = useState([])
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!imageName) {
      return
    }

    setStatus('pending')

    let imageArray
    resetPage()

    async function Fetch() {
      try {
        fetchImages(imageName, page).then((data) => {
          imageArray = data.hits

          if (imageArray.length === 0) {
            onError('Ваш запрос не дал результата')
          }

          setImage(imageArray)

          setStatus('resolved')
        })
      } catch (error) {
        setStatus('rejected')
        setError(error.message)
      }
    }

    Fetch()
  }, [imageName])

  useEffect(() => {
    if (!imageName) {
      return
    }

    setStatus('pending')

    let imageArray

    async function Fetch() {
      try {
        fetchImages(imageName, page).then((data) => {
          imageArray = data.hits

          if (imageArray.length === 0) {
            onError('Ваш запрос не дал результата')
          }

          setImage((state) => [...state, ...imageArray])

          setStatus('resolved')
        })
      } catch (error) {
        setStatus('rejected')
        setError(error.message)
      }
    }

    Fetch()
  }, [page])

  const onButtonLoadMore = (event) => {
    setPage((page) => page + 1)

    scrollToEnd()
  }

  const scrollToEnd = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }, 1000)
  }

  const resetPage = () => {
    setPage(1)
  }

  return (
    <>
      {status === 'idle' && <ImagesInfoText>Введите ваш запрос</ImagesInfoText>}

      {status === 'pending' && (
        <>
          <Spinner />
        </>
      )}

      {status === 'rejected' && <>{error.message}</>}

      {status === 'resolved' && (
        <>
          <ImageGallery
            images={image}
            imageName={imageName}
            onImageClick={onImageClick}
          />

          {image.length > 0 && <Button onClick={onButtonLoadMore}></Button>}
        </>
      )}
    </>
  )
}
