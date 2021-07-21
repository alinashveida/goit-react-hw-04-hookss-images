export function fetchImages(name, page) {
  const KEY = '21785158-d7699e1d635f5d39ae805dbbd'
  const URL = `https://pixabay.com/api/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`

  return fetch(URL).then((responce) => {
    if (responce.ok) {
      return responce.json()
    }

    return Promise.reject(new Error('Ваш запрос не дал результата'))
  })
}
