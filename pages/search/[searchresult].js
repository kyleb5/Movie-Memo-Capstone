import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { getUserSearch } from '../../utils/data/themoviedb';
import MoviePosterCard from '../../components/MoviePosterCard';

export default function ViewSearchResult() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const searchResult = router.query.searchresult;

  useEffect(() => {
    getUserSearch(searchResult)
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }, [searchResult]);

  return (
    <Container className="text-center pushdown-top">
      {movies.length === 0 ? ( // Check if there are no movies
        <div>No movies available</div>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col xs={6} sm={3} key={movie.id} style={{ marginBottom: '20px' }}>
              <MoviePosterCard
                movieObj={{
                  title: movie.title,
                  id: movie.id,
                  poster_path: movie.poster_path,
                  firebaseKey: movie.firebaseKey,
                  release_date: movie.release_date,
                }}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
