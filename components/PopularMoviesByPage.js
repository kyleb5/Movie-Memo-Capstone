import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function PopularMoviesByPage({ movieObj }) {
  const imagePath = 'https://image.tmdb.org/t/p/w300';

  return (
    <div className="text-center">
      <b>{movieObj.title}</b>
      <Link href={`/movie/${movieObj.id}`} passHref>
        <Card.Img src={`${imagePath}${movieObj.poster_path}`} />
      </Link>
    </div>
  );
}

PopularMoviesByPage.propTypes = {
  movieObj: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
