import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
} from '../components/api';

const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const Cast = lazy(() => import('../components/Cast'));
const Reviews = lazy(() => import('../components/Reviews'));

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(data => {
      if (data) {
        setTrendingMovies(data.results);
      }
    });
  }, []);

  const handleSearch = query => {
    if (query === '') {
      setSearchResults([]);
      return;
    }
    searchMovies(query).then(data => setSearchResults(data.results));
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </ul>
        <Routes>
          <Route
            path="/"
            element={<Home trendingMovies={trendingMovies} />}
          ></Route>
          <Route
            path="/movies"
            element={
              <Movies
                handleSearch={handleSearch}
                searchResults={searchResults}
              />
            }
          ></Route>
          <Route
            path="/movies/:movieId"
            element={<MovieDetails getMovieDetails={getMovieDetails} />}
          >
            <Route
              path="cast"
              element={<Cast getMovieCredits={getMovieCredits} />}
            ></Route>
            <Route
              path="reviews"
              element={<Reviews getMovieReviews={getMovieReviews} />}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
