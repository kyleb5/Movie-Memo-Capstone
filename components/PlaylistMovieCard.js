import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BiSolidEdit, BiTrash } from 'react-icons/bi';

export default function PlaylistMovieCard({ movieObj }) {
  const imagePath = 'https://image.tmdb.org/t/p/w300/';
  console.warn(movieObj);

  return (
    <div className="text-center">
      <Link href={`/movie/${movieObj.id}`} passHref>
        <Card.Img src={`${imagePath}${movieObj.poster_path}`} />
      </Link>
      <div>
        <Link href={`/movie/edit/${movieObj.firebaseKey}`} passHref>
          <BiSolidEdit size={30} />
        </Link>
        <BiTrash size={30} />
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
};
