const axios = require('../node_modules/axios/dist/axios/');
import { page } from './index';
const KEY = '30839127-8a41b37b8b94b94b2633e44b5';
const imageType = 'photo';
const imageOrientation = 'horizontal';
const safesearch = 'true';
const perPage = 20;
const URL =
  'https://pixabay.com/api/?key=' +
  KEY +
  '&image_type=' +
  imageType +
  '&image_orientation=' +
  imageOrientation +
  '&safesearch=' +
  safesearch +
  '&per_page=' +
  perPage;

async function fetchData(inputValue) {
  try {
    const response = await axios.get(
      `${URL + '&q=' + inputValue + '&page=' + page}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { fetchData, perPage };
