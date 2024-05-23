import axios from 'axios';
const API_KEY = '43937771-7a09e506748022e7cd8e25746';

export function fetchPhotosByQuery(query) {
  return axios
    .get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(response => response.data.hits)
    .catch(error => console.error(error));
}
