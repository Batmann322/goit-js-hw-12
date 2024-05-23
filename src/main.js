import { fetchPhotosByQuery } from './js/pixabay-api.js';
import { renderImages } from './js/render-function.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentPage = 1;
let currentQuery = '';
const perPage = 15;

const loader = document.querySelector('#loader');
const input = document.querySelector('#search-input');
const gallery = document.querySelector('#gallery');
const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#load-more-btn');

form.addEventListener('submit', async event => {
  event.preventDefault();
  gallery.innerHTML = '';
  currentQuery = input.value.trim();
  currentPage = 1;
  loadMoreBtn.classList.add('hidden');

  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      position: 'topRight',
      message: 'Please enter a search query.',
    });
    return;
  }

  loader.classList.remove('hidden');

  try {
    const { hits, totalHits } = await fetchPhotosByQuery(
      currentQuery,
      currentPage,
      perPage
    );
    loader.classList.add('hidden');
    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: 'No images found. Please try a different query.',
      });
      return;
    }

    renderImages(hits, gallery);
    new SimpleLightbox('.image-card a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    if (hits.length >= perPage) {
      loadMoreBtn.classList.remove('hidden');
    }
    input.value = '';
  } catch (error) {
    loader.classList.add('hidden');
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'Something went wrong. Please try again.',
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loader.classList.remove('hidden');

  try {
    const { hits, totalHits } = await fetchPhotosByQuery(
      currentQuery,
      currentPage,
      perPage
    );
    loader.classList.add('hidden');
    renderImages(hits, gallery);
    const lightbox = new SimpleLightbox('.image-card a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();

    const { height: cardHeight } = document
      .querySelector('.image-card')
      .getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (gallery.children.length >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'Info',
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {}
});
