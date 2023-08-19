import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getPopularMovies } from '../utils/data/themoviedb';
import PopularMovies from '../components/PopularMovies';

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);

  const getAllPopularMovies = () => {
    getPopularMovies()
      .then((movieResults) => {
        setPopularMovies(movieResults.results);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getAllPopularMovies();
  }, []);

  return (
    <Container className="text-center d-flex flex-column justify-content-center align-items-center">
      <h1>Popular Movies</h1>
      <Row className="justify-content-center">
        {popularMovies.slice(0, 4).map((movie) => (
          <Col xs={6} sm={3} id={movie.id} key={movie.id} style={{ marginBottom: '20px' }}>
            <PopularMovies movieObj={{ title: movie.title, id: movie.id, poster_path: movie.poster_path }} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
