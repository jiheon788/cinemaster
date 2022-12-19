import { useEffect, useState } from "react";
import axios from "axios";
import BookMark from "./BookMark";

const API_KEY = process.env.REACT_APP_API_KEY;

const MovieIntroduction = ({movieId})=>{
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(()=>{
    getMovieInfoByMovieId(movieId)
  },[])
  useEffect(()=>{
    getMovieInfoByMovieId(movieId)
  },[movieId])

  const getMovieInfoByMovieId = (mId) => {
    axios.get(
      `https://api.themoviedb.org/3/movie/${mId}?api_key=${API_KEY}&language=en-US`).then(res=>{
        setMovieInfo(res.data)
      }).catch(err=>{
        console.log(err)     
      })
  };
  // console.log(movieInfo)
  return (
    <>
      <div className="movie-info-area">
        <div className="flex-box">
          <div>
            <h1 className="white-xl-font">
              {movieInfo.original_title}
            </h1>
            <p className="grey-small-font mb-5">
              {movieInfo.release_date}&nbsp;/&nbsp;
              {parseInt(movieInfo.runtime / 60) + "h "+movieInfo.runtime % 60 + "min"}&nbsp;/&nbsp;
              {
                movieInfo.genres ? (
                  <>
                    {
                      movieInfo.genres.map((genre)=>{
                        return genre.name + " "
                      })
                    }
                  </>
                ):(<> {movieInfo.tagline} </>)
              }
            </p>
          </div>
          <BookMark movieId={movieId} />
          

        </div>
        
        <p className="white-small-font">
          SUMMARY
        </p>
        <p className="grey-small-font">
          {movieInfo.overview}
        </p>
      </div>
    </>
  )
}

export default MovieIntroduction;