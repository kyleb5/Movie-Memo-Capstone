import React, { useState, useEffect } from 'react';
import getPopularMovies from '../utils/data/themoviedb';
import { useAuth } from '../utils/context/authContext';
import Movies from '../components/Movies';

function Home() {
  const { user } = useAuth();

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
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <div>
        {movies.map((movie) => (
          <div id={movie.id} key={movie.id}>
            <Movies movieObj={{ title: movie.title, overview: movie.overview, poster_path: movie.poster_path }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
