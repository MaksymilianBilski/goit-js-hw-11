// const axios = require('../node_modules/axios/dist/axios/');
// import { page } from './index';
// const KEY = '30839127-8a41b37b8b94b94b2633e44b5';
// const imageType = 'photo';
// const imageOrientation = 'horizontal';
// const safesearch = 'true';
// const perPage = 20;
// const URL =
//   'https://pixabay.com/api/?key=' +
//   KEY +
//   '&image_type=' +
//   imageType +
//   '&image_orientation=' +
//   imageOrientation +
//   '&safesearch=' +
//   safesearch +
//   '&per_page=' +
//   perPage;

// async function fetchData(inputValue) {
//   try {
//     const response = await axios.get(
//       `${URL + '&q=' + inputValue + '&page=' + page}`
//     );
//     const data = await response.data;
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export { fetchData, perPage };

//2 METODA

import { Notify } from 'notiflix';
import { input, page } from './index';
const axios = require('../node_modules/axios/dist/axios/');
const URL = 'https://pixabay.com/api/?';

async function fetchPhotos(value) {
  value = input.value;
  const searchParams = new URLSearchParams({
    key: '30839127-8a41b37b8b94b94b2633e44b5',
    q: value,
    safesearch: true,
    orientation: 'horizontal',
    image_type: 'photo',
    page: page,
    per_page: 10,
  });
  try {
    const response = await axios.get(URL + searchParams);
    if (response.data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { fetchPhotos };
