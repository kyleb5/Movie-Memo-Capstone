import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
import { getTopRatedMoviesByPage } from '../../../utils/data/themoviedb';
import TopRatedMovies from '../../../components/TopRatedMovies';

export default function TopRatedMoviesPages() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const page = router.query;
  const pageNumber = parseInt(page.pagenumber, 10);
  if (pageNumber <= 0) {
    // eslint-disable-next-line no-const-assign
    pageNumber = 1;
    router.push('/movie/top-rated/1');
  }

  useEffect(() => {
    getTopRatedMoviesByPage(pageNumber).then((data) => {
      setMovies(data.results);
    });
  }, [pageNumber]);

  const handleNextPage = () => {
    const nextPage = pageNumber + 1;
    router.push(`/movie/top-rated/${nextPage}`);
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      const prevPage = pageNumber - 1;
      router.push(`/movie/top-rated/${prevPage}`);
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
      <h1>Top Rated Movies</h1>
      <Row>
        {movies.map((movie) => (
          <Col xs={6} sm={3} key={movie.id} style={{ marginBottom: '20px' }}>
            <div key={movie.id}>
              <TopRatedMovies movieObj={{ title: movie.title, id: movie.id, poster_path: movie.poster_path }} />
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
