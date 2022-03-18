import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Genre, MovieProps } from "./Movie";
import "./MoviePage.css";
import NavBar from "./NavBar";

type Props = {};

type Cast = {
  id: number;
  name: string;
  popularity: number;
};

function compare(a: Cast, b: Cast) {
  if (a.popularity < b.popularity) {
    return 1;
  }
  if (a.popularity > b.popularity) {
    return -1;
  }
  return 0;
}

export default function MoviePage({}: Props) {
  let { id } = useParams();

  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=82c8eb95d42bd3158187fd36f6681c75`
      )
      .then((movieResponse) => {
        setMovie(movieResponse.data);

        axios
          .get(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=82c8eb95d42bd3158187fd36f6681c75`
          )
          .then((castResponse) => {
            const allActors = castResponse.data.cast.sort(compare);

            setCast([allActors[0], allActors[1], allActors[2]]);
          });
      });
  }, []);

  if (movie === null) {
    return <div></div>;
  }

  const movieGenres: string = movie.genres // [{id: 1, name: "Action"}, {id: 2, name: "Adventure"}]
    .map((genre: Genre) => genre.name) // ["Action", "Adventure"]
    .join(", "); // "Action, Adventure"

  const movieCast: string = cast.map((actor: Cast) => actor.name).join(", ");

  const movieDuration: string = `${Math.floor(movie.runtime / 60)} h ${
    movie.runtime % 60
  } min`;
  const movieReleaseYear: number = new Date(movie.release_date).getFullYear();

  return (
    <div className="rootContainer">
      <div>
        <h2>{movie.title}</h2>
      </div>
      <div className="content">
        <div className="primaryContainer">
          <div>
            <img
              width={800}
              height={450}
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            />
          </div>
          <h4 style={{ marginTop: 40 }}>About</h4>
          <div style={{ fontSize: 20 }}>{movie.overview}</div>
        </div>
        <div className="secondaryContainer">
          <div className="chip">{movieDuration}</div>
          <div className="chip">{movieReleaseYear}</div>
          <h4>Cast</h4>
          <div>{movieCast}</div>
          <h4>Genres</h4>
          <div>{movieGenres}</div>
        </div>
      </div>
    </div>
  );
}
