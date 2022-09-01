import React from "react";
import Carousel from "react-multi-carousel";
import MovieCard from "../components/MovieCard";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const responsiveforRank = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
    slidesToSlide: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MovieSlide = ({ movies, isRanking }) => {
  // console.log(movies);
  return (
    <div>
      {isRanking ? (
        <>
          <Carousel
            responsive={responsiveforRank}
            autoPlay={false}
            infinite={false}
          >
            {movies.map((movie, index) => (
                <MovieCard
                  key={index}
                  movie_id={movie.id}
                  movie_poster={movie.poster_path}
                  isRanking={isRanking}
                  rank={index + 1}
                />
            ))}
          </Carousel>
        </>
      ) : (
        <>
          <Carousel responsive={responsive} autoPlay={false} infinite={true}>
            {movies.map((movie, index) => (
                <MovieCard
                  key={index}
                  movie_id={movie.id}
                  movie_poster={movie.poster_path}
                />
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};

export default MovieSlide;
