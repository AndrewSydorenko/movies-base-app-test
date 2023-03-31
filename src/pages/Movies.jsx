import { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { searchMovies } from '../components/api';

function Movies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const paramsQuery = searchParams.get('query') ?? '';
    if (paramsQuery) {
      searchMovies(paramsQuery).then(data => {
        if (data) {
          setMovies(data);
        }
      });
    }
  }, [searchParams]);

  const handleSubmit = event => {
    event.preventDefault();

    if (query === '') {
      return setSearchParams({});
    }
    setSearchParams({ query });

    searchMovies(query).then(data => {
      if (data) {
        setMovies(data);
      }
    });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
