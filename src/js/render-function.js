import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderImages(images, container) {
  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  const markup = images
    .map(
      image => `
    <div class="image-card">
      <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" title=""/></a>
      <div class="image-info">
        <p><span>Перегляди: </span>${image.views}</p>
        <p><span>Загрузки: </span>${image.downloads}</p>
        <p><span>Лайки: </span>${image.likes}</p>
        <p><span>Коменти: </span>${image.comments}</p>
      </div>
    </div>
  `
    )
    .join('');
  container.innerHTML = markup;
}
