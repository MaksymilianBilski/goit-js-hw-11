const form = document.querySelector('#search-form');
const input = document.querySelector('input[type=text]');
const button = document.querySelector('button[type=submit]');
const gallery = document.querySelector('.gallery');
const fetchBtn = document.querySelector('.load-more');

import { fetchData } from './fetch';
import { Notify } from 'notiflix';

let newArr = [];
let page = 0;
let totalHits = 0;

fetchBtn.style.display = 'none';

//
function getData() {
  inputValue = input.value;
  return fetchData(inputValue).then(response => {
    const dataArray = response.hits;
    totalHits = response.totalHits;
    console.log(totalHits);
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

async function createGallery() {
  try {
    await getData();
    createMarkup();
  } catch (error) {
    console.log(error);
  }
}

function cleanGallery() {
  newArr = [];
  gallery.innerHTML = '';
}
form.addEventListener('submit', e => {
  e.preventDefault();
  fetchBtn.style.display = 'block';
  if (gallery.children.length >= 1) {
    console.log(gallery.children.length);
    gallery.innerHTML = '';
    newArr = [];
  }
  page = 1;
  createGallery();
  if (gallery.children.length <= 1) {
    console.log(gallery.children.length);
    Notify.success(`Hooray! We found ${totalHits} images.`);
  }
});

fetchBtn.addEventListener('click', e => {
  e.preventDefault();
  if (gallery.children.length > 1) {
    gallery.innerHTML = '';
  }
  page += 1;
  // let newArr = [];
  createGallery();
});

export { page };
