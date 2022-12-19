import { useEffect, useState } from "react";
import axios from "axios";
import { getTrailerByMovieId } from "../../../lib/api/tmdb";
const API_KEY = process.env.REACT_APP_API_KEY;


const MovieTrailer = ({movieId})=>{
  const [trailerKey, setTrailerKey] = useState("");
  
  useEffect(() => {
    getTrailerByMovieId(movieId).then((res) => {
      res.data.results.map((video) => {
        if (video.type == "Trailer") {
          setTrailerKey(video.key);
        }
      });
    }).catch((err) => {
        console.log(err);
    });
  }, [movieId]);

  let youtubeUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&controls=0&playlist=${trailerKey}`;
  
  return (
    <>
      <div className="trailer-box">
        <iframe
          style={{ width: "850px", height: "480px", border: "none"}}
          src={youtubeUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </>
  )
}

export default MovieTrailer;