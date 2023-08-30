import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { getPlaylistByMovie } from '../../utils/data/playlistData';
import { getMovieById } from '../../utils/data/themoviedb';
import PopularMovies from '../../components/MoviePosterCard';

export default function ViewPlaylist() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  /* useEffect(() => {
    getPlaylistByMovie(firebaseKey).then(setMovies);
  }, [firebaseKey]); */

  useEffect(() => {
    // Getting the movies of the playlist that match the playlist firebase key
    getPlaylistByMovie(firebaseKey).then((playlistMovies) => {
      const movieDetail = [];

      // MUST ASYNC AWAIT, movies didn't load properly without it
      const processMovie = async (movie) => {
        const movieData = await getMovieById(movie.apiID);
        // merging movie data with movie details from firebase using spread syntax
        const movieDetails = { ...movie, ...movieData };
        movieDetail.push(movieDetails);

        // MOVIES will not appear without this
        // checks if all movies have been processed then sets the movies as updated
        if (movieDetails.length === playlistMovies.length) {
          setMovies(movieDetails);
        }
      };

      playlistMovies.forEach(processMovie);
    });
  }, [firebaseKey]);
  console.warn(movies);

  return (
    <Container className="text-center pushdown-top">
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Movie ID: {movie.apiID}</p>
            <p>Is Favorite: {movie.favorite ? 'Yes' : 'No'}</p>
            <p>Is on Watchlist: {movie.watchlist ? 'Yes' : 'No'}</p>
            <p>Has Watched: {movie.watched ? 'Yes' : 'No'}</p>
          </div>
        ))}
        <div>
          <h1>Favorite</h1>
          <Row>
            {/* Im using the filter to get the favorite movies as if they are true then mapping over to render them */}
            {movies
              .filter((movie) => movie.favorite)
              .map((movie) => (
                <Col xs={6} sm={3} key={movie.id} style={{ marginBottom: '20px' }}>
                  <PopularMovies movieObj={{ title: movie.title, id: movie.id, poster_path: movie.poster_path }} />
                </Col>
              ))}
          </Row>
        </div>
        <div>
          <h1>Watched</h1>
        </div>
        <div>
          <h1>Watch List</h1>
        </div>
      </div>
    </Container>
  );
}
