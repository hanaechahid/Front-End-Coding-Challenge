import axios from 'axios';

//get all repositories in page 0
export function getAllRepositories(page) {
     return axios.get(`https://api.github.com/search/repositories?q=created:>2017-11-22&sort=stars&order=desc&page=${page}`);
}