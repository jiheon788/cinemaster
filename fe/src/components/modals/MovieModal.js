import Modal from "react-modal";
import { useEffect, useState } from "react";
import GetRecommendations from "./contents/GetRecommendations";
import GetSimilarMovies from "./contents/GetSimilarMovies";
import Reviews from "./contents/Reviews";
import $ from "jquery";
import MovieTrailer from "./contents/MovieTrailer";
import MovieIntroduction from "./contents/MovieIntroduction";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "850px",
    backgroundColor: "rgba(24, 24, 24, 1)",
    // background: "linear-gradient(to bottom, black 40%, #242424 90%)",
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
    // transform: 'translate(-10%, -10%)',
    border: "none",
    borderRadius: "20px",
    outline: "none",
    padding: "0px",
    boxShadow: "0 6px 500px rgb(0 0 0 / 60%)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(051, 051, 051, 0.5)",
    backdropFilter: "blur(7px)",
    zIndex: 2,
  },
};

const MovieModal = ({ isOpen, setOpen, movie_id }) => {
  const navigate = useNavigate("/");
  const [movieId, setMovieId] = useState(movie_id);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        $("body").css("overflow", "auto");
        $(".react-multiple-carousel__arrow").css("display", "inline-block");
        navigate("/");
        setOpen(false);
      }}
      style={customStyles}
    >
      <MovieTrailer movieId={movieId} />
      <div className="modal-box">
        <MovieIntroduction movieId={movieId} />

        <h1 className="white-big-font" style={{ marginTop: "30px" }}>
          Recommendations
        </h1>
        <GetRecommendations movieId={movieId} setMovieId={setMovieId} />

        <h1 className="white-big-font" style={{ marginTop: "30px" }}>
          Similar Movies
        </h1>
        <GetSimilarMovies movieId={movieId} setMovieId={setMovieId} />

        <h1 className="white-big-font" style={{ marginTop: "30px" }}>
          REVIEW
        </h1>
        <Reviews movieId={movieId} />
      </div>
    </Modal>
  );
};

export default MovieModal;
