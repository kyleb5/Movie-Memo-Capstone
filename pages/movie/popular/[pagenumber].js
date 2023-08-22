import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
import { getPopularMoviesPage } from '../../../utils/data/themoviedb';
import PopularMoviesByPage from '../../../components/PopularMoviesByPage';

export default function PopularMoviesPage() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const page = router.query;
  const pageNumber = parseInt(page.pagenumber, 10);
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

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center">
        <h1>No movies to display</h1>
        <h4>Please return to the home page</h4>
      </div>
    );
  }

  return (
    <Container className="text-center">
      <Row>
        {movies.map((movie) => (
          <Col xs={6} sm={3} key={movie.id} style={{ marginBottom: '20px' }}>
            <div key={movie.id}>
              <PopularMoviesByPage movieObj={{ title: movie.title, id: movie.id, poster_path: movie.poster_path }} />
            </div>
          </Col>
        ))}
      </Row>
      <Button variant="danger" size="lg" onClick={handlePrevPage}>
        Previous Page
      </Button>
      <Button variant="danger" size="lg" onClick={handleNextPage}>
        Next Page
      </Button>
    </Container>
  );
}
