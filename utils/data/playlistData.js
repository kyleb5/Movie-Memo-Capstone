/* eslint-disable implicit-arrow-linebreak */
import { clientCredentials } from '../client';
// CALLS FOR PLAYLIST DATA

const endpoint = clientCredentials.databaseURL;

// Get USER playlist by there user id
const getPlaylists = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/playlist.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// DELETE playlist
const deletePlaylist = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/playlist/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE playlist
const createPlaylist = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/playlist.json`, {
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

// UPDATE playlist
const updatePlaylist = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/playlist/${payload.firebaseKey}.json`, {
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

// eslint-disable-next-line object-curly-newline
export { getPlaylists, deletePlaylist, createPlaylist, updatePlaylist };
