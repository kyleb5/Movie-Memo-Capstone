import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { getPlaylistByMovie, getSinglePlaylist } from '../../utils/data/playlistData';
import { getMovieById } from '../../utils/data/themoviedb';
import PlaylistMovieCard from '../../components/PlaylistMovieCard';

export default function ViewPlaylist() {
  const [movies, setMovies] = useState([]);
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getMovieDetails = () => {
    // Getting the movies of the playlist that match the playlist firebase key
    getPlaylistByMovie(firebaseKey).then((playlistMovies) => {
      const movieDetail = [];

      // playlistMovies length is 0 it will set the state as nothing and end the getMovieDetails early.
      if (playlistMovies.length === 0) {
        setMovies([]);
        return;
      }
      const processMovie = async (movie) => {
        const movieData = await getMovieById(movie.apiID);
        // merging movie data with movie details from firebase using spread syntax
        const movieDetails = { ...movie, ...movieData };
        // merge every movie detail to the array
        movieDetail.push(movieDetails);

        // checks if all movies have been processed then sets the movies as updated
        if (movieDetail.length === playlistMovies.length) {
          setMovies(movieDetail);
        }
      };

      playlistMovies.forEach(processMovie);
    });
  };

  const getPlaylistInfo = () => {
    getSinglePlaylist(firebaseKey).then(setPlaylistInfo);
  };

  useEffect(() => {
    getMovieDetails();
    getPlaylistInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCards = () => {
    getMovieDetails();
  };

  const timestamp = playlistInfo.created;
  const date = new Date(timestamp);

  return (
    <Container className="text-center pushdown-top">
      <div>
        <div className="container mt-5">
          <h1 className="display-4">Playlist - {playlistInfo.title}</h1>
          <p className="lead">Description - {playlistInfo.description}</p>
          <p>Category - {playlistInfo.category}</p>
          <p>
            Created On - {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
          </p>
        </div>
        <div>
          <h1>Favorite Movies</h1>
          <Row>
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
            {movies.filter((movie) => movie.favorite).length === 0 && (
              <Col xs={12} className="mt-3">
                <p className="text-muted">None Added</p>
              </Col>
            )}
          </Row>
        </div>
        <div>
          <h1>Watched Movies</h1>
          <Row>
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
            {movies.filter((movie) => movie.watched).length === 0 && (
              <Col xs={12} className="mt-3">
                <p className="text-muted">None Added</p>
              </Col>
            )}
          </Row>
        </div>
        <div>
          <h1>Want to Watch</h1>
          <Row>
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
            {movies.filter((movie) => movie.watchlist).length === 0 && (
              <Col xs={12} className="mt-3">
                <p className="text-muted">None Added</p>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </Container>
  );
}
