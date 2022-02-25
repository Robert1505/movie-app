import React, { useEffect, useState } from "react";
import axios from "axios";


type MovieProps = {
  title: string;
  vote_average: number;
  release_date: string;
};

type Props = {
    id: string;
}

export default function Movie(props: Props) {

    const [movie, setMovie] = useState<MovieProps | null>(null);

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
        return <div>
          <div>
            {movie.title}
          </div>
          <div>
            Rating: {movie.vote_average}
          </div>
          <div>
            Release Date: {movie.release_date}
          </div>
        </div>;
      };

  return <div>{renderMovie()}</div>;
}
