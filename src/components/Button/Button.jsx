import { ButtonLoadMore } from './Button.styled'
import React from 'react'

export default function Button({ onClick }) {
  return (
    <ButtonLoadMore type="button" onClick={onClick}>
      Load more
    </ButtonLoadMore>
  )
}
