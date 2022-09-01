import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import $ from "jquery";
import MovieModal from "../../modals/MovieModal";
import emptyBox from "./../../../assets/images/empty.png";
const API_KEY = process.env.REACT_APP_API_KEY;

const MyMovieCard = ({ movieId }) => {
  const [movieInfo, setMovieInfo] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const getMovieInfoById = (movie_id) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
      )
      .then((res) => {
        setMovieInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovieInfoById(movieId);
  }, []);

  return (
    <>
      <div
        className="card set-inline"
        onClick={() => {
          setOpen(true);
          $("body").css("overflow", "hidden");
          $(".react-multiple-carousel__arrow").css("display", "none");
        }}
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_face${movieInfo.poster_path})`,
          margin: "15px 10px",
        }}
      ></div>
      <MovieModal isOpen={isOpen} setOpen={setOpen} movie_id={movieId} />
    </>
  );
};

const MyPick = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [myMovieIds, setMyMovieIds] = useState([]);

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/cart/list/${cookies.userData.shortId}`
      )
      .then((res) => {
        if (res.data.empty) {
          setMyMovieIds([]);
          return;
        }
        //찜영화의 아이디만 담긴 배열
        setMyMovieIds(res.data.result);
        // console.log("degv", res.data.empty)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="mt-4 flex-box-left">
        <span className="material-icons color-icons">bookmark</span>
        <h1 className="white-xl-font set-inline">My Pick</h1>
      </div>
      {myMovieIds.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <img
            src={emptyBox}
            style={{ transform: "rotate(-5deg)" }}
            width="300px"
            className="m-5"
          />
        </div>
      ) : (
        <>
          {myMovieIds.map((movieId, index) => (
            <MyMovieCard key={index} movieId={movieId} />
          ))}
        </>
      )}
    </>
  );
};

export default MyPick;
