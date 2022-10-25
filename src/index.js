const form = document.querySelector('search-form#search-form');
const input = document.querySelector('input[type=text]');
const button = document.querySelector('button[type=submit]');
import { fetchData } from './fetch';
fetchData('flower');
