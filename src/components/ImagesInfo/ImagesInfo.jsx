import React, { Component, useState, useEffect } from 'react'
import ImageGallery from '../ImageGallery/ImageGallery'
import { onError } from '../../NotifyError'
import Spinner from '../Spinner/Spinner'
import { ImagesInfoText } from './ImagesInfo.styled'
import { fetchImages } from '../../services/Api'
import Button from '../Button/Button'

// export default function ImagesInfo({ imageName, onImageClick }) {
//   const [image, setImage] = useState([])
//   const [error, setError] = useState(false)
//   const [page, setPage] = useState(1)
//   const [status, setStatus] = useState('idle')

//   useEffect(() => {
//     if (!imageName) {
//       return
//     }
//     setStatus('pending')

//     let imageArray

//     async function Fetch() {
//       try {
//         fetchImages(imageName, page).then((data) => {
//           imageArray = data.hits
//           setStatus('resolved')

//           if (imageArray === 0) {
//             onError('Ваш запрос не дал результата')
//           }
//         })
//       } catch (error) {
//         setStatus('rejected')
//         setError(error.message)
//       }
//     }

//     Fetch()
//   }, [imageName, page])

//   // useEffect(() => {
//   //   // if (!imageName) {
//   //   //   return
//   //   // }
//   //   setStatus('pending')
//   //   // resetPage()

//   //   fetchImages(imageName, page)
//   //     .then((data) => {
//   //       setImage(data.hits)
//   //       setStatus('resolved')

//   //       if (image.length === 0) {
//   //         onError('Ваш запрос не дал результата')
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       setStatus('rejected') && setError(error.message)
//   //     })
//   // }, [imageName, page])

//   // useEffect(() => {
//   //   if (!imageName) {
//   //     return
//   //   }
//   //   setStatus('pending')
//   //   // resetPage()

//   //   async function Fetch() {
//   //     try {
//   //       const imageArray = fetchImages(imageName, page).then((data) => {
//   //         return data.hits
//   //       })

//   //       console.log(imageArray)

//   //       if (imageArray.length === 0) {
//   //         onError('Ваш запрос не дал результата')
//   //       }

//   //       setImage(imageArray)
//   //       setStatus('resolved')
//   //     } catch (error) {
//   //       setStatus('rejected')
//   //       setError(error.message)
//   //     }
//   //   }

//   //   Fetch()
//   // }, [imageName, page])

//   const onButtonLoadMore = (event) => {
//     setPage((state) => state + 1)

//     scrollToEnd()
//   }

//   const scrollToEnd = () => {
//     setTimeout(() => {
//       window.scrollBy({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       })
//     }, 1000)
//   }

//   const resetPage = () => {
//     setPage(1)
//   }

//   return (
//     <>
//       {status === 'idle' && <ImagesInfoText>Введите ваш запрос</ImagesInfoText>}

//       {status === 'pending' && (
//         <>
//           <Spinner />
//         </>
//       )}

//       {status === 'rejected' && <>{error.message}</>}

//       {status === 'resolved' && (
//         <>
//           <ImageGallery
//             images={image}
//             imageName={imageName}
//             onImageClick={onImageClick}
//           />

//           {image.length > 0 && <Button onClick={onButtonLoadMore}></Button>}
//         </>
//       )}
//     </>
//   )
// }

export default class ImagesInfo extends Component {
  state = {
    image: null,
    error: null,
    page: 1,
    status: 'idle',
  }

  componentDidUpdate(prevProps, prevState) {
    const nextName = this.props.imageName
    const prevName = prevProps.imageName

    const nextPage = this.state.page
    const prevPage = prevState.page

    if (prevName !== nextName) {
      this.setState({ status: 'pending' })

      this.resetPage()

      fetchImages(nextName, nextPage)
        .then((data) => {
          this.setState({ image: data.hits, status: 'resolved' })
          if (this.state.image.length === 0) {
            onError('Ваш запрос не дал результата')
          }
        })
        .catch((error) => this.setState({ error: true, status: 'rejected' }))
    }

    if (prevPage !== nextPage) {
      fetchImages(nextName, nextPage)
        .then((data) => {
          this.setState({ status: 'resolved' })
          this.setState((prevState) => {
            return { image: [...prevState.image, ...data.hits] }
          })
        })
        .catch((error) => this.setState({ error: true, status: 'rejected' }))
    }
  }

  onButtonLoadMore = (event) => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 }
    })
    this.scrollToEnd()
  }

  scrollToEnd = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }, 1000)
  }

  resetPage = () => {
    this.setState({
      page: 1,
    })
  }

  render() {
    const { image, error, status } = this.state
    const { imageName, onImageClick } = this.props

    if (status === 'idle') {
      return <ImagesInfoText>Введите ваш запрос</ImagesInfoText>
    }
    if (status === 'pending') {
      return (
        <>
          <Spinner />
        </>
      )
    }
    if (status === 'rejected') {
      return <>{error.message}</>
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageGallery
            images={image}
            imageName={imageName}
            onImageClick={onImageClick}
          />

          {image.length > 0 && (
            <Button onClick={this.onButtonLoadMore}></Button>
          )}
        </>
      )
    }
  }
}
