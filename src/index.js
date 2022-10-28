const form = document.querySelector('#search-form');
const input = document.querySelector('input[type=text]');
const button = document.querySelector('button[type=submit]');
const gallery = document.querySelector('.gallery');
const fetchBtn = document.querySelector('.load-more');

import { fetchData, perPage } from './fetch';
import { Notify } from 'notiflix';

let newArr = [];
let page = 0;
let total = 0;

fetchBtn.style.display = 'none';

//creating an array of images data
function getData() {
  const inputValue = input.value;
  return fetchData(inputValue).then(response => {
    const dataArray = response.hits;
    total = response.total;
    for (const item of dataArray) {
      newArr.push(item);
    }
  });
}

//creating each of data-images markups
async function createMarkup() {
  for (const item of newArr) {
    gallery.insertAdjacentHTML(
      'beforeend',
      `<div class="photo-card">
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width="420" height="420" />
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

//creating gallery
async function createGallery() {
  try {
    await getData();
    await createMarkup();
    if (total >= 1) {
      fetchBtn.style.display = 'block';
    }
    if (total <= 1) {
      fetchBtn.style.display = 'none';
    }
    if (total > 0 && page < 2) {
      setTimeout(() => {
        Notify.success(`Hooray! We found ${total} images.`);
      }, 250);
    }
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (gallery.children.length >= 1) {
    gallery.innerHTML = '';
    newArr = [];
  }
  page = 1;
  createGallery();
});

fetchBtn.addEventListener('click', e => {
  e.preventDefault();
  if (gallery.children.length > 1) {
    gallery.innerHTML = '';
  }
  page += 1;
  createGallery();
  let totalPages = total / perPage;
  if (page > totalPages) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
});

export { page };
