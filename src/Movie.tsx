import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type Genre = {
  id: number;
  name: string;
}

export type MovieProps = {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  genres: Genre[];
  runtime: number;
};

type Props = {
  id: number;
};

export default function Movie(props: Props) {
  const [movie, setMovie] = useState<MovieProps | null>(null);

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.id}?api_key=82c8eb95d42bd3158187fd36f6681c75`
      )
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      });
  }, []);

  const renderMovie = () => {
    if (movie === null) return;
    return (
      <Card sx={{ maxWidth: 345, height: 450 }}>
        <CardMedia
          component="img"
          height="300px"
          width="200px"
          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          onClick = {() => {navigate(`/movie/${movie.id}`)}}
          sx = {{cursor: "pointer"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {movie.vote_average} <br />
            Release Date: {movie.release_date}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return <div>{renderMovie()}</div>;
}
