/* eslint-disable implicit-arrow-linebreak */
const getPopularMovies = () =>
  new Promise((resolve, reject) => {
    fetch('https://api.themoviedb.org/3/movie/popular', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTFmNzQzYWExZGM4YTliZjUyMDQ3OTllZTUwZmUxYSIsInN1YiI6IjY0YzA0NTg3NmQ0Yzk3MDBmZjQ5OWQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FrWw_KxHGj6KpZi-C1hbe0ynzxsyw2vSgxu96prCDkA' },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export default getPopularMovies;
