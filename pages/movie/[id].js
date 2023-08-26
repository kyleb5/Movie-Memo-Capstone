import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { getMovieById } from '../../utils/data/themoviedb';

export default function ViewMovie() {
  const imagePath = 'https://image.tmdb.org/t/p/original';
  const [movieDetails, setMovieDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getMovieById(id).then(setMovieDetails);
    }
  }, [id]);

  return (
    <div className="image-container">
      <Card.Img className="image-style" src={`${imagePath}${movieDetails.backdrop_path}`} />
      <div>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{movieDetails.title}</h1>
        <p style={{ fontSize: '1rem' }}>{movieDetails.overview}</p>
      </div>
    </div>
  );
}
