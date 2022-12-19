import { useEffect, useState } from "react";
import BookMark from "./BookMark";
import { getMovieInfoByMovieId } from "../../../lib/api/tmdb";

const MovieIntroduction = ({movieId})=>{
  const [movieInfo, setMovieInfo] = useState({});
  
  useEffect(()=>{
    getMovieInfoByMovieId(movieId).then(res => {
      setMovieInfo(res.data)
    }).catch(err => {
      console.log(err)     
    })
  },[movieId])

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