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
    <div className="text-center">
      <Link href={`/movie/${movieObj.id}`} passHref>
        <Card.Img src={`${imagePath}${movieObj.poster_path}`} />
      </Link>
      <div>
        <Button variant="edit">
          <Link href={`/movie/edit/${movieObj.firebaseKey}`} passHref>
            <BiSolidEdit size={30} />
          </Link>
        </Button>
        <Button onClick={deleteThisMovie} variant="delete">
          <BiTrash size={30} />
        </Button>
      </div>
      <b>{movieObj.title}</b>
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
