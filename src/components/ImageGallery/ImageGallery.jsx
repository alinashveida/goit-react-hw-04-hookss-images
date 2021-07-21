import { ImageGalleryList } from './ImageGallery.styled'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'

export default function ImageGallery({ images, imageName, onImageClick }) {
  return (
    <ImageGalleryList>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          imageName={imageName}
          onImageClick={onImageClick}
          largeImageURL={image.largeImageURL}
        />
      ))}
    </ImageGalleryList>
  )
}
