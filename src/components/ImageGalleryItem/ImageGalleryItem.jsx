import {
  ImageGalleryListItem,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled'

export default function ImageGalleryItem({
  src,
  imageName,
  onImageClick,
  largeImageURL,
}) {
  return (
    <ImageGalleryListItem>
      <ImageGalleryItemImg
        src={src}
        alt={imageName}
        onClick={() => onImageClick(largeImageURL)}
      />
    </ImageGalleryListItem>
  )
}
