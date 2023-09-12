import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { getMovieById } from '../../utils/data/themoviedb';
import 'react-circular-progressbar/dist/styles.css';

export default function ViewMovie() {
  const imagePath = 'https://image.tmdb.org/t/p/original/';
  const [movieDetails, setMovieDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getMovieById(id).then(setMovieDetails);
    }
  }, [id]);

  // https://codesandbox.io/s/vymm4oln6y?file=/index.js:3013-3023
  // eslint-disable-next-line react/prop-types
  function VoteAvgCircle({ voteAverage }) {
    // Get the average out of 10
    const percentage = (voteAverage / 10) * 100;
    // value={percentage}
    // text={`${percentage.toFixed(1)}%`}
    return (
      <div className="center-container">
        <div className="percentage-circle-container">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={4}
            styles={buildStyles({
              textSize: '12',
              pathColor: 'red',
              textColor: 'red',
              trailColor: 'black',
            })}
            transition={{
              duration: 2000,
              delay: 1000,
            }}
          />
        </div>
      </div>
    );
  }

  const roundVoteAverage = (movieDetails.vote_average / 10) * 100;
  return (
    <div>
      <div className="image-container">
        {/* Conditional Rendering Fixed Error Undefined for Backdrop */}
        {movieDetails.backdrop_path && <Card.Img className="image-style" src={`${imagePath}${movieDetails.backdrop_path}`} draggable="false" />}
      </div>
      <div className="text-center">
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{movieDetails.title}</h1>
        <p style={{ fontSize: '1rem' }}>{movieDetails.overview}</p>
        <div className="vote-average-container">
          <VoteAvgCircle id="push-right" voteAverage={movieDetails.vote_average} />
          <p>
            Voting Average {roundVoteAverage} out of 100 from {movieDetails.vote_count} votes
          </p>
        </div>
        {movieDetails.budget && movieDetails.revenue && (
          <p>
            <b>Budget</b> - ${movieDetails.budget} <b>Revenue</b> - ${movieDetails.revenue}
          </p>
        )}
        <Link href={`/movie/add/${movieDetails.id}`} passHref>
          <Button variant="danger" className="m-2">
            Add To Playlist
          </Button>
        </Link>
      </div>
    </div>
  );
}
