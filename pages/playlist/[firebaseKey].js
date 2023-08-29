import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPlaylistByMovie } from '../../utils/data/playlistData';

export default function ViewPlaylist() {
  const [movie, setMovieDetails] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getPlaylistByMovie(firebaseKey).then(setMovieDetails);
  }, [firebaseKey]);

  console.warn(movie);
  return <div>{movie.title}</div>;
}
