import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled'
import React, { useState } from 'react'
import { onError } from '../../NotifyError'

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('')

  const handleNameChange = (event) => {
    const value = event.currentTarget.value
    setImageName(value.toLowerCase())
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (imageName.trim() === '') {
      console.log('Ведите имя покемона')
      onError('Введите текст')
      return
    }

    onSubmit(imageName)

    setImageName('')
  }

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel></SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
          value={imageName}
        ></SearchFormInput>
      </SearchForm>
    </SearchbarHeader>
  )
}
