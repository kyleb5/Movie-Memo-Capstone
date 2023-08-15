import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getPopularMovies } from '../utils/data/themoviedb';

import Movies from '../components/Movies';

function Home() {
  const [movies, setMovies] = useState([]);

  const getAllMovies = () => {
    getPopularMovies()
      .then((movieResults) => {
        setMovies(movieResults.results);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <Container className="text-center d-flex flex-column justify-content-center align-items-center">
      <h1>Popular Movies</h1>
      <Row className="justify-content-center">
        {movies.slice(0, 4).map((movie) => (
          <Col xs={6} sm={3} id={movie.id} key={movie.id} style={{ marginBottom: '20px' }}>
            <Movies movieObj={{ title: movie.title, id: movie.id, poster_path: movie.poster_path }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
