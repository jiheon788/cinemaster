import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCardInModal from '../../MovieCardInModal';

const API_KEY = process.env.REACT_APP_API_KEY;



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
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`).then(res=>{
      setRcmdMovies(res.data.results)
    }).catch(err=>{console.log(err)})
  },[])

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`).then(res=>{
      setRcmdMovies(res.data.results)
    }).catch(err=>{console.log(err)})
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