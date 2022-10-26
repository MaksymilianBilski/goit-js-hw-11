const form = document.querySelector('search-form#search-form');
const input = document.querySelector('input[type=text]');
const button = document.querySelector('button[type=submit]');
const gallery = document.querySelector('.gallery');
const fetchBtn = document.querySelector('.fetch-button');
import { fetchData, page } from './fetch';
const newArr = [];

function getData() {
  return fetchData('flower').then(response => {
    const dataArray = response.hits;
    for (item of dataArray) {
      newArr.push(item);
    }
  });
}

function createMarkup() {
  for (item of newArr) {
    gallery.insertAdjacentHTML(
      'afterbegin',
      `<div class="photo-card">
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width="420" />
        <div class="info">
          <p class="info-item">
            <b>LIKES: ${item.likes}</b>
          </p>
          <p class="info-item">
            <b>VIEWS: ${item.views}</b>
          </p>
          <p class="info-item">
            <b>COMMENTS: ${item.comments}</b>
          </p>
          <p class="info-item">
            <b>DOWNLOADS: ${item.downloads}</b>
          </p>
        </div>
      </div>`
    );
  }
}

async function createGallery() {
  try {
    await getData();
    createMarkup();
  } catch (error) {
    console.log(error);
  }
}

function cleanGallery() {
  gallery.innerHTML = '';
}

fetchBtn.addEventListener('click', () => {
  createGallery();
  page += 1;
  if (gallery.children.length > 1) {
    gallery.innerHTML = '';
  }
});
