/* eslint-disable implicit-arrow-linebreak */
import { clientCredentials } from '../client';
// CALLS FOR PLAYLIST DATA

const endpoint = clientCredentials.databaseURL;

const getMoviesByUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/movie.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getSingleMovie = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/movie/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteMovieFromPlaylist = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/movie/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createMovie = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/movie.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateMovie = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/movie/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getMoviesByPlaylist = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/movie.json?orderBy="playlistID"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// eslint-disable-next-line object-curly-newline
export { getMoviesByUser, deleteMovieFromPlaylist, createMovie, updateMovie, getSingleMovie, getMoviesByPlaylist };
