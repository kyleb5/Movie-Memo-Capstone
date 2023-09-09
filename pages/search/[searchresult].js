import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// eslint-disable-next-line object-curly-newline
import { Col, Container, Row, Button } from 'react-bootstrap';
import { getUserSearch } from '../../utils/data/themoviedb';
import MoviePosterCard from '../../components/MoviePosterCard';

export default function ViewSearchResult() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const searchResult = router.query.searchresult;

  const fetchMovies = (searchQuery, page) => {
    getUserSearch(searchQuery, page)
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  useEffect(() => {
    // Fetch movies for the current page
    fetchMovies(searchResult, currentPage);
  }, [searchResult, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <Container className="text-center pushdown-top">
      {movies.length === 0 ? (
        // Check if there are no movies
        <div>No movies available</div>
      ) : (
        <div>
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
          <div>
            <Button style={{ marginRight: '10px' }} variant="danger" onClick={handlePrevPage}>
              Previous Page
            </Button>
            <Button variant="danger" onClick={handleNextPage}>
              Next Page
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}
