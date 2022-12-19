import React from "react";

const MovieCardInModal = ({ movie_id, movie_poster, movieId, setMovieId }) => {
  return (
    <>
      {/* <div style={{display:"inline-block"}}> */}
      <img
        onClick={() => {
          setMovieId(movie_id);
        }}
        src={`https://www.themoviedb.org/t/p/w154${movie_poster}`}
        alt={movie_id}
      />
      {/* </div>  */}
    </>
  );
};

export default MovieCardInModal;
