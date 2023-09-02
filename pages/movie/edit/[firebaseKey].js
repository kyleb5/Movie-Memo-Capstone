import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMovie } from '../../../utils/data/movieData';
import MovieForm from '../../../components/forms/MovieForm';

export default function EditMovie() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMovie(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return <MovieForm obj={editItem} />;
}
