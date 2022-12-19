import Modal from "react-modal";
import { useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import React, { lazy, Suspense } from 'react';

const GetRecommendations = lazy(() => import('./contents/GetRecommendations'));
const GetSimilarMovies = lazy(() => import('./contents/GetSimilarMovies'));
const Reviews = lazy(() => import('./contents/Reviews'));
const MovieTrailer = lazy(() => import('./contents/MovieTrailer'));
const MovieIntroduction = lazy(() => import('./contents/MovieIntroduction'));



const renderLoader = () => <p>Loading</p>;


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
      <Suspense fallback={renderLoader()}>
      
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
      </Suspense>

      
    </Modal>
  );
};

export default MovieModal;
