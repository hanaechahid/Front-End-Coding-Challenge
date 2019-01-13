import axios from 'axios';
import {calculDate} from '../utils/date.util';

//get all repositories in page 0
export function getAllRepositories(page) {
     const date = calculDate();
     return axios.get(`https://api.github.com/search/repositories?q=${date}&sort=stars&order=desc&page=${page}`);
}