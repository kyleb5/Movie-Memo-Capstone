/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../utils/data/themoviedb';
import MoviePosterCard from '../components/MoviePosterCard';
import TopRatedMovies from '../components/TopRatedMovies';

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMoives] = useState([]);

  const getAllPopularMovies = () => {
    getPopularMovies().then((movieResults) => {
      setPopularMovies(movieResults.results);
    });
  };

  const getAllTopRatedMovies = () => {
    getTopRatedMovies().then((movieResults) => {
      setTopRatedMovies(movieResults.results);
    });
  };

  const getAllUpcomingMovies = () => {
    getUpcomingMovies().then((movieResults) => {
      setUpcomingMoives(movieResults.results);
    });
  };

  useEffect(() => {
    getAllPopularMovies();
    getAllTopRatedMovies();
    getAllUpcomingMovies();
  }, []);

  return (
    <Container className="text-center d-flex flex-column justify-content-center align-items-center pushdown-top">
      {/* POPULAR MOVIES */}
      <h1>Popular Movies</h1>
      <Row>
        {popularMovies.slice(0, 4).map((movie) => (
          <Col xs={6} sm={3} id={movie.id} key={movie.id} style={{ marginBottom: '20px' }}>
            <MoviePosterCard movieObj={{ title: movie.title, id: movie.id, poster_path: movie.poster_path }} />
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
      {/* UPCOMING MOVIES */}
      <h1>Upcoming Movies</h1>
      <Row>
        {upcomingMovies.slice(0, 4).map((movie) => (
          <Col xs={6} sm={3} id={movie.id} key={movie.id} style={{ marginBottom: '20px' }}>
            <MoviePosterCard movieObj={{ title: movie.title, id: movie.id, poster_path: movie.poster_path }} />
          </Col>
        ))}
      </Row>
      <Link href="/movie/upcoming/1" passHref>
        <Button variant="danger" size="large">
          Show More
        </Button>
      </Link>
    </Container>
  );
}

export default Home;
