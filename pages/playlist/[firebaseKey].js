import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { getPlaylistByMovie } from '../../utils/data/playlistData';
import { getMovieById } from '../../utils/data/themoviedb';
import PlaylistMovieCard from '../../components/PlaylistMovieCard';

export default function ViewPlaylist() {
  // https://stackoverflow.com/questions/44566340/show-a-component-on-hover-in-reactjs
  // CALL COMPONENTS ON HOVER ^
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  /* useEffect(() => {
    getPlaylistByMovie(firebaseKey).then(setMovies);
  }, [firebaseKey]); */

  useEffect(() => {
    if (firebaseKey) {
      // Getting the movies of the playlist that match the playlist firebase key
      getPlaylistByMovie(firebaseKey).then((playlistMovies) => {
        const movieDetail = [];

        // MUST ASYNC AWAIT, movies didn't load properly without it
        const processMovie = async (movie) => {
          const movieData = await getMovieById(movie.apiID);
          // merging movie data with movie details from firebase using spread syntax
          const movieDetails = { ...movie, ...movieData };
          movieDetail.push(movieDetails);

          // checks if all movies have been processed then sets the movies as updated
          if (movieDetail.length === playlistMovies.length) {
            setMovies(movieDetail); // Use movieDetail here
            // console.warn(movieDetail);
          }
        };

        playlistMovies.forEach(processMovie);
      });
    }
  }, [firebaseKey]);

  // console.warn(movies);

  return (
    <Container className="text-center pushdown-top">
      <div>
        <div>
          <h1>Favorite</h1>
          <Row>
            {/* Im using the filter to get the favorite movies as if they are true then mapping over to render them */}
            {movies
              .filter((movie) => movie.favorite)
              .map((movie) => (
                <Col xs={6} sm={3} key={movie.id} style={{ marginBottom: '20px' }}>
                  <PlaylistMovieCard
                    movieObj={{
                      title: movie.title,
                      id: movie.id,
                      poster_path: movie.poster_path,
                      firebaseKey: movie.firebaseKey,
                    }}
                  />
                </Col>
              ))}
          </Row>
        </div>
        <div>
          <h1>Watched</h1>
          <Row>
            {/* Im using the filter to get the favorite movies as if they are true then mapping over to render them */}
            {movies
              .filter((movie) => movie.watched)
              .map((movie) => (
                <Col xs={6} sm={3} key={movie.id} style={{ marginBottom: '20px' }}>
                  <PlaylistMovieCard
                    movieObj={{
                      title: movie.title,
                      id: movie.id,
                      poster_path: movie.poster_path,
                      firebaseKey: movie.firebaseKey,
                    }}
                  />
                </Col>
              ))}
          </Row>
        </div>
        <div>
          <h1>Watch List</h1>
          <Row>
            {/* Im using the filter to get the favorite movies as if they are true then mapping over to render them */}
            {movies
              .filter((movie) => movie.watchlist)
              .map((movie) => (
                <Col xs={6} sm={3} key={movie.id} style={{ marginBottom: '20px' }}>
                  <PlaylistMovieCard
                    movieObj={{
                      title: movie.title,
                      id: movie.id,
                      poster_path: movie.poster_path,
                      firebaseKey: movie.firebaseKey,
                    }}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </Container>
  );
}
