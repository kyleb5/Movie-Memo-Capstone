/* eslint-disable implicit-arrow-linebreak */
import { deleteMovieFromPlaylist, getMoviesByPlaylist } from './movieData';
import { getSinglePlaylist, deletePlaylist } from './playlistData';

const viewPlaylistDetails = (playlistFirebaseKey) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    getSinglePlaylist(playlistFirebaseKey)
      .then((playlistObject) => {
        getMoviesByPlaylist(playlistObject.firebaseKey).then((movieObject) => {
          resolve({ movieObject, ...playlistObject });
        });
      })
      .catch((error) => reject(error));
  });

const deletePlaylistMovies = (playlistId) =>
  new Promise((resolve, reject) => {
    getMoviesByPlaylist(playlistId)
      .then((moviesArray) => {
        const deleteMoviePromises = moviesArray.map((movie) => deleteMovieFromPlaylist(movie.firebaseKey));

        Promise.all(deleteMoviePromises).then(() => {
          deletePlaylist(playlistId).then(resolve);
        });
      })
      .catch((error) => reject(error));
  });

export { deletePlaylistMovies, viewPlaylistDetails };
