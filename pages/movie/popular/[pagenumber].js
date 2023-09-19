/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
import { getPopularMoviesPage } from '../../../utils/data/themoviedb';
import MoviePosterCard from '../../../components/MoviePosterCard';

export default function PopularMoviesPage() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const page = router.query;
  // page.pagenumber is a string so parsing it into a integer.
  // I was forced to put 10 as it was missing "radix" which parses it as octal
  let pageNumber = parseInt(page.pagenumber, 10);
  if (pageNumber <= 0) {
    // eslint-disable-next-line no-const-assign
    pageNumber = 1;
    router.push('/movie/popular/1');
  }

  useEffect(() => {
    getPopularMoviesPage(pageNumber).then((data) => {
      setMovies(data.results);
    });
  }, [pageNumber]);

  const handleNextPage = () => {
    const nextPage = pageNumber + 1;
    router.push(`/movie/popular/${nextPage}`);
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      const prevPage = pageNumber - 1;
      router.push(`/movie/popular/${prevPage}`);
    }
  };

  // IF movies is undefined OR movies.length is an empty array then --
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center">
        <h1>No movies to display</h1>
        <h4>Please return to the home page</h4>
      </div>
    );
  }

  return (
    <Container className="text-center pushdown-top">
      <h1>Popular Movies</h1>
      <Row>
        {movies.map((movie) => (
          <Col xs={6} sm={3} key={movie.id} style={{ marginBottom: '20px' }}>
            <div key={movie.id}>
              <MoviePosterCard movieObj={{ title: movie.title, id: movie.id, poster_path: movie.poster_path, release_date: movie.release_date }} />
            </div>
          </Col>
        ))}
      </Row>
      <Button style={{ marginRight: '10px' }} variant="danger" size="lg" onClick={handlePrevPage}>
        Previous Page
      </Button>
      <Button variant="danger" size="lg" onClick={handleNextPage}>
        Next Page
      </Button>
    </Container>
  );
}
