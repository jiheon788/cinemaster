import React, { useEffect, useState } from "react";
import EvaluationCard from "./pages/user/EvaluationCard";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Evaluation = () => {
  const [movieIds, setMovieIds] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);

  const getRandomIds = () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/eval/20")
      .then((res) => {
        console.log(res);

        setMovieIds(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRandomIds();
  }, []);

  // useEffect(() => {
  //   console.log(movieList);
  // }, [movieList]);

  const onClickSubmitBtn = () => {
    console.log("onClickSubmitBtn", movieList);

    sendMyEval()
      .then((res) => {
        console.log("성공");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMyEval = async () => {
    console.log("movieList", movieList);
    return await axios.post(`${process.env.REACT_APP_PYTHON_SERVER_URL}/eval`, {
      shortId: cookies.userData.shortId,
      movieList,
    });
  };

  const onClickCancleBtn = () => {
    if (window.confirm("정말 취소하시겠습니까? \n별점 정보가 사라집니다.")) {
      navigate("/");
    }
  };

  return (
    <>
    <div className="mt-4 flex-box-left mb-5">
      <span className="material-symbols-outlined color-icons">
        star
      </span>
      <h1 className="white-xl-font set-inline">Evaluation</h1>
    </div>

    
    <div>
      {movieIds.length === 0 ? (
        <></>
      ) : (
        <>
          {movieIds.map((movieId, index) => (
            <EvaluationCard
              key={index}
              movieId={movieId}
              movieList={movieList}
              setMovieList={setMovieList}
            />
          ))}
        </>
      )}
      <div className="eval-button-form">
        <button
          className="grey-button-small"
          style={{ width: "150px", height: "50px" }}
          onClick={onClickCancleBtn}
        >
          CANCEL
        </button>
        <button
          className="color-button-small"
          style={{ width: "150px", height: "50px" }}
          onClick={onClickSubmitBtn}
        >
          SUBMIT
        </button>
      </div>
    </div>
    </>
  );
};

export default Evaluation;
