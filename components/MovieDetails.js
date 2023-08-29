import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function MovieDetails({ movieObj }) {
  const imagePath = 'https://image.tmdb.org/t/p/w300';

  return (
    <div className="pushdown-top">
      {movieObj.title}
      <p>{movieObj.overview}</p>
      <Card.Img src={`${imagePath}${movieObj.backdrop_path}`} />
    </div>
  );
}

MovieDetails.propTypes = {
  movieObj: PropTypes.shape({
    title: PropTypes.string,
    backdrop_path: PropTypes.string,
    id: PropTypes.number,
    overview: PropTypes.number,
  }).isRequired,
};
