const axios = require('../node_modules/axios/dist/axios/');
const URL = 'https://pixabay.com/api/?key=';
const KEY = '30839127-8a41b37b8b94b94b2633e44b5';

async function fetchData(inputValue) {
  try {
    const response = await axios.get(`${URL + KEY + '&q=' + inputValue}`);
    const data = await response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export { fetchData };
