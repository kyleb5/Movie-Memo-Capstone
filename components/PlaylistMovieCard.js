import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BiSolidEdit, BiTrash } from 'react-icons/bi';
import { deleteMovieFromPlaylist } from '../utils/data/movieData';

function PlaylistMovieCard({ movieObj, onUpdate }) {
  const imagePath = 'https://image.tmdb.org/t/p/w300/';
  // console.warn(movieObj);

  const deleteThisMovie = () => {
    if (window.confirm(`Delete ${movieObj.title}?`)) {
      deleteMovieFromPlaylist(movieObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="text-center movie-card">
      <Link href={`/movie/${movieObj.id}`} passHref>
        <Card.Img draggable="false" src={`${imagePath}${movieObj.poster_path}`} />
      </Link>
      <b>{movieObj.title}</b>
      <div>
        <Button variant="edit">
          <Link href={`/movie/edit/${movieObj.firebaseKey}`} passHref>
            <div>
              <BiSolidEdit size={30} />
            </div>
          </Link>
        </Button>
        <Button onClick={deleteThisMovie} variant="delete">
          <div>
            <BiTrash size={30} />
          </div>
        </Button>
      </div>
    </div>
  );
}

PlaylistMovieCard.propTypes = {
  movieObj: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlaylistMovieCard;
