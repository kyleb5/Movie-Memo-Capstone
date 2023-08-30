import { getMoviesByPlaylist } from './movieData';
import { getSinglePlaylist } from './playlistData';

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

export default viewPlaylistDetails;
