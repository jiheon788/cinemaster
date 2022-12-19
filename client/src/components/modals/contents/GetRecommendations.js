import { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCardInModal from '../../MovieCardInModal';
import { getRecommendationedMovies } from '../../../lib/api/tmdb';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide : 5
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


const GetRecommendations = ({movieId, setMovieId})=>{
  const [rcmdMovies, setRcmdMovies] = useState([])

  useEffect(()=>{
    getRecommendationedMovies(movieId).then(res => {
      setRcmdMovies(res.data.results)
    }).catch(err => {
      console.log(err)
    })
  },[movieId])


  return ( 
    <div>
      <Carousel
        responsive={responsive}
        // autoPlay={movies.deviceType !== "mobile" ? true : false}
        infinite={true}
      > 
        {
          rcmdMovies.map((movie, index)=>{
            return <MovieCardInModal key={index} movie_id={movie.id} movie_poster={movie.poster_path} movieId={movieId} setMovieId={setMovieId} />
          })
        }
      </Carousel>
    </div>
  )
}
export default GetRecommendations;