import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Movie, { MovieProps } from "./Movie";
import { Grid } from "@mui/material";
import NavBar, { Search, SearchIconWrapper, StyledInputBase } from "./NavBar";
import SearchIcon from "@mui/icons-material/Search";

type PopularMovies = {
  page: number;
  results: MovieProps[];
};

function HomePage() {
  const [page, setPage] = useState(1);
  const [popularMovies, setPopularMovies] = useState<PopularMovies | null>(
    null
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<PopularMovies | null>(
    null
  );

  useEffect(() => {
    if (searchKeyword === "") {
      setFilteredMovies(popularMovies);
    } else {
      if (!popularMovies) return;
      const moviesThatContainKeyword = { ...popularMovies };
      moviesThatContainKeyword.results =
        moviesThatContainKeyword.results.filter((movie) =>
          movie.title
            .toLocaleLowerCase()
            .includes(searchKeyword.toLocaleLowerCase())
        );
      setFilteredMovies(moviesThatContainKeyword);
    }
  }, [searchKeyword]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=82c8eb95d42bd3158187fd36f6681c75&page=${page}`
      )
      .then((response) => {
        setPopularMovies(response.data);
        setFilteredMovies(response.data);
      });
  }, [page]);

  const renderPopularMovies = () => {
    if (filteredMovies === null) return null;

    return filteredMovies.results.map((movie: MovieProps) => (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Movie key={movie.id} id={movie.id} />
      </Grid>
    ));
  };

  const nextButton = () => {
    return (
      <button
        className="button-9"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
    );
  };

  const previousButton = () => {
    return (
      <button
        className="button-9"
        onClick={() => {
          setPage(page - 1 > 0 ? page - 1 : page);
        }}
      >
        Previous
      </button>
    );
  };

  return (
    <div className="App">
      <div className="searchBarContainer">
        {previousButton()}
        <Search className="searchBar">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            sx={{ width: "100%" }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
          />
        </Search>
        {nextButton()}
      </div>
      <Grid sx={{ marginTop: "5px" }} container spacing={1}>
        {renderPopularMovies()}
      </Grid>
    </div>
  );
}

export default HomePage;
