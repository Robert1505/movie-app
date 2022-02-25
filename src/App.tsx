import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Movie, { MovieProps } from "./Movie";

type PopularMovies = {
  page: number;
  results: MovieProps[];
};

function App() {
  const [page, setPage] = useState(1);
  const [popularMovies, setPopularMovies] = useState<PopularMovies | null>(
    null
  );

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=82c8eb95d42bd3158187fd36f6681c75&page=${page}`
      )
      .then((response) => {
        setPopularMovies(response.data);
      });
  }, [page]);

  const renderPopularMovies = () => {
    if (popularMovies === null) return null;

    return popularMovies.results.map((movie: MovieProps) => (
      <Movie key={movie.id} id={movie.id} />
    ));
  };

  const nextButton = () => {
    return <button onClick = {() => {
      setPage(page + 1)
    }}>Next</button>
  }

  const previousButton = () => {
    return <button onClick = {() => {
      setPage(page - 1 > 0 ? page - 1 : page)
    }}>Previous</button>
  }

  return <div className="App">
    {renderPopularMovies()}
    {previousButton()}
    {nextButton()}
  </div>;
}

export default App;
