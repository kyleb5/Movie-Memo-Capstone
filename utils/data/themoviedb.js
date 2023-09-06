/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */

const auth = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTFmNzQzYWExZGM4YTliZjUyMDQ3OTllZTUwZmUxYSIsInN1YiI6IjY0YzA0NTg3NmQ0Yzk3MDBmZjQ5OWQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FrWw_KxHGj6KpZi-C1hbe0ynzxsyw2vSgxu96prCDkA';

// ///////////////////////
//                      //
//    POPULAR MOVIES    //
//                      //
// ///////////////////////

const getPopularMovies = () =>
  new Promise((resolve, reject) => {
    fetch('https://api.themoviedb.org/3/movie/popular', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `${auth}` },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getPopularMoviesPage = (pageNumber) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `${auth}` },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// ///////////////////////
//                      //
//  TOP RATED MOVIESS   //
//                      //
// ///////////////////////

const getTopRatedMovies = () =>
  new Promise((resolve, reject) => {
    fetch('https://api.themoviedb.org/3/movie/top_rated', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `${auth}` },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getTopRatedMoviesByPage = (pageNumber) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `${auth}` },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getMovieById = (movieID) =>
  new Promise((resolve, reject) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieID}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `${auth}` },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// ///////////////////////
//                      //
//  SEARCH MOVIES       //
//                      //
// ///////////////////////

export { getPopularMovies, getMovieById, getPopularMoviesPage, getTopRatedMovies, getTopRatedMoviesByPage };
