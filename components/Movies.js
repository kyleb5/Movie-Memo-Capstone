import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';

export default function PopularMovies({ movieObj }) {
  const imagePath = 'https://image.tmdb.org/t/p/w300';

  return (
    <div>
      <b>{movieObj.title}</b>
      <Image src={`${imagePath}${movieObj.poster_path}`} thumbnail />
      <p>{movieObj.overview}</p>
    </div>
  );
}

PopularMovies.propTypes = {
  movieObj: PropTypes.shape({
    title: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
};
