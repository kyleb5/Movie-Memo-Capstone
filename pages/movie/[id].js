import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMovieById } from '../../utils/data/themoviedb';

export default function ViewMovie() {
  const [movieDetails, setMovieDetails] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getMovieById(id).then(setMovieDetails);
  }, [id]);

  return (
    <div className="pushdown-top">
      {movieDetails.title}
      <p>{movieDetails.overview}</p>
    </div>
  );
}
