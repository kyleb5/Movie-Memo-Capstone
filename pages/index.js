/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getPopularMovies, getTopRatedMovies } from '../utils/data/themoviedb';
import PopularMovies from '../components/PopularMovies';
import TopRatedMovies from '../components/TopRatedMovies';

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const getAllPopularMovies = () => {
    getPopularMovies()
      .then((movieResults) => {
        setPopularMovies(movieResults.results);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const getAllTopRatedMovies = () => {
    getTopRatedMovies()
      .then((movieResults) => {
        setTopRatedMovies(movieResults.results);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getAllPopularMovies();
    getAllTopRatedMovies();
  }, []);

  return (
    <Container className="text-center d-flex flex-column justify-content-center align-items-center pushdown-top">
      {/* POPULAR MOVIES */}
      <h1>Popular Movies</h1>
      <Row>
        {popularMovies.slice(0, 4).map((movie) => (
          <Col xs={6} sm={3} id={movie.id} key={movie.id} style={{ marginBottom: '20px' }}>
            <PopularMovies movieObj={{ title: movie.title, id: movie.id, poster_path: movie.poster_path }} />
          </Col>
        ))}
      </Row>
      <Link href="/movie/popular/1" passHref>
        <Button variant="danger" size="large">
          Show More
        </Button>
      </Link>
      <hr />
      {/* TOP RATED */}
      <h1>Top Rated Movies</h1>
      <Row>
        {topRatedMovies.slice(0, 4).map((movie) => (
          <Col xs={6} sm={3} id={movie.id} key={movie.id} style={{ marginBottom: '20px' }}>
            <TopRatedMovies movieObj={{ title: movie.title, id: movie.id, poster_path: movie.poster_path }} />
          </Col>
        ))}
      </Row>
      <Link href="/movie/top-rated/1" passHref>
        <Button variant="danger" size="large">
          Show More
        </Button>
      </Link>
    </Container>
  );
}

export default Home;
