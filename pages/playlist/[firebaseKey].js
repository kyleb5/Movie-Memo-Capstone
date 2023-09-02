import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { getPlaylistByMovie } from '../../utils/data/playlistData';
import { getMovieById } from '../../utils/data/themoviedb';
import PlaylistMovieCard from '../../components/PlaylistMovieCard';

export default function ViewPlaylist() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getMovieDetails = () => {
    if (firebaseKey) {
      // Getting the movies of the playlist that match the playlist firebase key
      getPlaylistByMovie(firebaseKey).then((playlistMovies) => {
        const movieDetail = [];

        // When I was had 1 movie left I tried the else setMovie([]), that did not work properly but this if statement seem to do the trick. If
        // playlistMovies length is 0 it will set the state as nothing and end the getMovieDetails early.
        if (playlistMovies.length === 0) {
          setMovies([]);
          return;
        }

        // MUST ASYNC AWAIT, movies didn't load properly without it
        const processMovie = async (movie) => {
          const movieData = await getMovieById(movie.apiID);
          // merging movie data with movie details from firebase using spread operator
          const movieDetails = { ...movie, ...movieData };
          movieDetail.push(movieDetails);

          // checks if all movies have been processed then sets the movies as updated
          if (movieDetail.length === playlistMovies.length) {
            setMovies(movieDetail);
          }
        };

        playlistMovies.forEach(processMovie);
      });
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    getMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCards = () => {
    getMovieDetails();
  };
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
                    onUpdate={updateCards}
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
                    onUpdate={updateCards}
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
                    onUpdate={updateCards}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </Container>
  );
}
