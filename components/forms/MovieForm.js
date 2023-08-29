import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { getPlaylists } from '../../utils/data/playlistData';
import { createMovie, updateMovie } from '../../utils/data/movieData';
import { getMovieById } from '../../utils/data/themoviedb';

const initialState = {
  isWatchlist: '',
  isFavorite: '',
  isWatched: '',
};

function MovieForm({ obj }) {
  /* isWatchlist, isFavorite, isWatched */

  const [formInput, setFormInput] = useState(initialState);
  const [playlist, setPlaylist] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getPlaylists(user.uid).then(setPlaylist);
    if (id) {
      getMovieById(id).then(setMovieDetails);
    }

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMovie(formInput).then(() => router.push(`/movie/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMovie(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMovie(patchPayload).then(() => {
          router.push('/'); // TODO: UPDATE THIS LATER
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Movie</h2>

      <h1>Add {movieDetails.title}</h1>

      <FloatingLabel controlId="floatingSelect" label="Author">
        <Form.Select
          aria-label="Playlist"
          name="firebaseKey"
          onChange={handleChange}
          className="mb-3"
          value={obj.firebaseKey} // FIXME: modify code to remove error
          required
        >
          <option value="">Select an Playlist</option>
          {playlist.map((playlists) => (
            <option key={playlists.firebaseKey} value={playlists.firebaseKey}>
              {playlists.title} {playlists.description}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
    </Form>
  );
}

MovieForm.propTypes = {
  obj: PropTypes.shape({
    isWatchlist: PropTypes.bool,
    isFavorite: PropTypes.bool,
    isWatched: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

MovieForm.defaultProps = {
  obj: initialState,
};

export default MovieForm;
