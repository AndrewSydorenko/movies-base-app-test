import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../components/api';

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLOcationRef = useRef(location.state?.from ?? '/movies');
  useEffect(() => {
    async function fetchMovieDetails() {
      const movieData = await getMovieDetails(movieId);
      setMovie(movieData);
    }
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button>
        <Link to={backLinkLOcationRef.current}>Go back</Link>
      </button>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <ul>
        <li>Released: {movie.release_date}</li>
        <li>Runtime: {movie.runtime} minutes</li>
        <li>Genres: {movie.genres.map(genre => genre.name).join(', ')}</li>
        <li>Rating: {movie.vote_average}</li>
      </ul>
      <nav>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}

export default MovieDetails;
