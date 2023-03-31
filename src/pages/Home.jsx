import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../components/api';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
  width: 100%;
  > ul,
  li {
    list-style: none;
  }
  > ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(data => {
      if (data) {
        setMovies(data);
      }
    });
  }, []);
  return (
    <Container>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default Home;
