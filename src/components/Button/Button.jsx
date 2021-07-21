import { ButtonLoadMore } from './Button.styled'
import React, { useState } from 'react'

export default function Button({ onClick }) {
  // const [page, setPage] = useState(1)

  return (
    <ButtonLoadMore type="button" onClick={onClick}>
      Load more
    </ButtonLoadMore>
  )
}
