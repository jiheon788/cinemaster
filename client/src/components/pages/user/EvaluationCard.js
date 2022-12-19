import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { useCookies } from "react-cookie";
import { findDOMNode } from "react-dom";
import { getMovieInfoByMovieId } from "../../../lib/api/tmdb";
const API_KEY = "637131b35fda1dc6c125beada1dd5b9d";

const IMAGE_URL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
//const IMAGE_URL = "https://img.tmdb.org/t/p/w/200";

// ----------------------별점------------
const EvaluationCard = ({ movieId, movieList, setMovieList }) => {
  const [movieInfo, setMovieInfo] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [form, setForm] = useState({
    movieId: String(movieId),
    rating: 0,
  });

  useEffect(() => {
    getMovieInfoByMovieId(movieId).then((res) => {
      setMovieInfo(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
    movieList.push({ movieId: String(movieId), rating: 0 });
    // setMovieList([...movieList, movieId]);
  }, []);

  useEffect(() => {
    // console.log(form);
    setMovieList(
      movieList.map((movie) =>
        movie.movieId === form.movieId
          ? { ...movie, rating: form.rating }
          : movie
      )
    );
  }, [form]);



  const onChangeForm = (event) => {
    // value 값에 따라 별 색칠
    if (event.target.name === `star ${movieId}`) {
      $(`.star.${movieId} span`).css({
        width: `${event.target.value * 10 * 2}%`,
      });
    }

    // console.log(event.target.name.split(" ")[1], event.target.value);
    setForm({
      ...form,
      movieId: event.target.name.split(" ")[1],
      rating: Number(event.target.value),
    });
  };

  // var movieListTemp = [];

  return (
    <div className="eval-card hover1">
      <div className="eval-imgBox">
        <img
          src={`${IMAGE_URL}${movieInfo.poster_path}`}
          //src={`https://www.themoviedb.org/t/p/w220_and_h330_face/q54qEgagGOYCq5D1903eBVMNkbo.jpg`}
        />
      </div>
      <div className="eval-intro">
        <h1 className="white-big-font">{movieInfo.title}</h1>
        <p className="grey-small-font">{movieInfo.vote_arerage}</p>
        <span>
          <span className={`star ${movieId}`}>
            ★★★★★
            <span>★★★★★</span>{" "}
            <input
              name={`star ${movieId}`}
              type="range"
              step=".5"
              min="0"
              max="5"
              onChange={onChangeForm}
            />
          </span>
        </span>
      </div>
    </div>
  );
};

export default EvaluationCard;
