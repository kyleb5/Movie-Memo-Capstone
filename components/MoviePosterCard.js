import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function MoviePosterCard({ movieObj }) {
  const imagePath = 'https://image.tmdb.org/t/p/w300/';

  return (
    <div className="text-center">
      <Link href={`/movie/${movieObj.id}`} passHref>
        <div className="movie-card">
          {movieObj.poster_path ? <Card.Img draggable="false" src={`${imagePath}${movieObj.poster_path}`} alt={movieObj.title} /> : <div className="no-poster">No poster available</div>}
          <div className="movie-info">
            <b>{movieObj.title}</b>
            <p>{movieObj.release_date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

MoviePosterCard.propTypes = {
  movieObj: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
    release_date: PropTypes.string,
  }).isRequired,
};
