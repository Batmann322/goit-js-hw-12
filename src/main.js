import { fetchPhotosByQuery } from './js/pixabay-api.js';
import { renderImages } from './js/render-function.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('#loader');
const input = document.querySelector('#search-input');
const gallery = document.querySelector('#gallery');
const form = document.querySelector('#search-form');

form.addEventListener('submit', event => {
  event.preventDefault();
  gallery.innerHTML = '';
  const query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  loader.classList.remove('hidden');

  const lightbox = new SimpleLightbox('.image-card a', {
    captionsData: 'alt',
    captionDelay: 250,
    overlay: true,
    overlayOpacity: 0.7,
  });

  fetchPhotosByQuery(query)
    .then(images => {
      loader.classList.add('hidden');
      renderImages(images, gallery);
      lightbox.refresh();
      input.value = '';
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    });
});
