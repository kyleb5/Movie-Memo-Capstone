import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function MoviePosterCard({ movieObj }) {
  const imagePath = 'https://image.tmdb.org/t/p/w300/';

  return (
    <div className="text-center">
      <Link href={`/movie/${movieObj.id}`} passHref>
        {movieObj.poster_path ? (
          <Card.Img
            src={`${imagePath}${movieObj.poster_path}`}
            alt={movieObj.title}
            style={{
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.5)',
            }}
          />
        ) : (
          <div className="push-down">No poster available</div>
        )}
      </Link>
      <b>{movieObj.title}</b>
      <p>{movieObj.release_date}</p>
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
