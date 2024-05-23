import axios from 'axios';

const API_KEY = '43937771-7a09e506748022e7cd8e25746';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPhotosByQuery(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
