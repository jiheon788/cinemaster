import React, { useEffect, useState } from "react";
import { movieAction } from "../redux/actions/MovieAction";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useCookies } from "react-cookie";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import ClipLoader from "react-spinners/ClipLoader";
import "./../assets/css/App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [recommendList, setRecommendList] = useState([]);
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies, loading } =
    useSelector((state) => state.movie);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    dispatch(movieAction.getMovies());

    /*
     * 추천 영화 목록 서버에서 가져오기
     */
    if (cookies.userData) {
      recommendMovieListLoad().then((res) => {
        res.data.movieList.map((x) => {
          /*
           * API 서버에서 영화 데이터 가져오기
           */
          recommendMovieListTmdbLoad(x.movieId)
            .then((res2) => {
              setRecommendList((apidata) => [...apidata, res2.data]);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    }
  }, []);

  const recommendMovieListLoad = async () => {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/recommend/${cookies.userData.shortId}`
    );
  };

  const recommendMovieListTmdbLoad = async (movie_id) => {
    return await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    );
  };

  // loading이 true면 loading spinners, false면 data
  // true: data 도착전, false: data 도착후 or err
  if (loading) {
    return (
      <div className="loading-box">
        <ClipLoader color="#ffff" loading={loading} size={150} />
      </div>
    );
  }

  return (
    <div>
      {popularMovies.results && (
        <Banner
          movie={
            popularMovies.results[
              Math.floor(Math.random() * popularMovies.results.length)
            ]
          }
        />
      )}

      <div className="section-margin">
        <h1 className="white-big-font">Ranking</h1>
        <MovieSlide movies={popularMovies.results} isRanking={true} />
      </div>
      <div className="section-margin">
        <h1 className="white-big-font">Top Rated Movie</h1>
        <MovieSlide movies={topRatedMovies.results} />
      </div>
      <div className="section-margin">
        <h1 className="white-big-font">Upcoming Movie</h1>
        <MovieSlide movies={upComingMovies.results} />
      </div>

      {recommendList.length === 0 ? (
        <div
          className="review-create-btn mb-5"
          onClick={() => {
            if (cookies.userData) {
              navigate("./eval");
            } else {
              navigate("/login");
              // alert("로그인이 필요합니다.")
            }
          }}
        >
          <h2 className="white-xl-font">
            Click Here for Recommended Movies :)
          </h2>
        </div>
      ) : (
        <div className="section-margin">
          <h1 className="white-big-font">Recommend Movie</h1>
          <MovieSlide movies={recommendList} />
        </div>
      )}
    </div>
  );
};

export default Home;
