import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import $ from "jquery";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;


const Create = ({
  createIsOpen,
  setCreateIsOpen,
  movieId,
  getReviewDataByMovie,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const [createReview, setCreateReview] = useState({
    movieId: movieId,
    title: "",
    content: "",
    shortId: cookies.userData.shortId,
    star: 0,
    genreList:[]
  });

  // useEffect(()=>{
  //   console.log(createReview);
  // }, [createReview]);

  useEffect(()=>{
    getGenresByMovieId(movieId)
  },[])
  
  let genresArr = []

  const getGenresByMovieId = (mId) => {
    axios.get(
      `https://api.themoviedb.org/3/movie/${mId}?api_key=${API_KEY}&language=en-US`).then(res=>{
        return res.data.genres
      }).then(res=>{
        res.map((genre)=>{
          genresArr.push(genre.name)
        })
        setCreateReview({
          ...createReview,
          genreList: genresArr,
        });
      }).catch(err=>{
        console.log(err)     
      })
  };

  const onChangeCreateReview = (event) => {
    // value 값에 따라 별 색칠
    if (event.target.name === "star") {
      $(`.star span`).css({ width: `${event.target.value * 10 * 2}%` });
    }

    setCreateReview({
      ...createReview,
      [event.target.name]: event.target.value,
    });
  };

  const onClickCreateReviewButton = () => {
    sendCreateReview()
      .then((res) => {
        // alert(res.data.result)
        setCreateIsOpen(false);
        getReviewDataByMovie(movieId);
      })
      .catch((error) => {
        // console.log("작성실패", error);
        alert(error.response.data.fail);
      });
  };

  const sendCreateReview = async () => {
    return await axios.post(
      process.env.REACT_APP_SERVER_URL + "/review/add",
      createReview
    );
  };

  return (
    <div className="review-create-card">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          TITLE
        </label>
        <input
          type="text"
          className="form-control"
          onChange={onChangeCreateReview}
          name="title"
          id="title"
          placeholder="Title Here"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="star" className="form-label">
          STAR
        </label>
        <br />
        <span className="star">
          ★★★★★
          <span>★★★★★</span>
          <input
            name="star"
            type="range"
            step=".5"
            min="0"
            max="5"
            onChange={onChangeCreateReview}
          />
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          CONTENT
        </label>
        <textarea
          className="form-control"
          onChange={onChangeCreateReview}
          name="content"
          id="content"
          rows="5"
          placeholder="Content Here"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          placeholder={cookies.userData.name}
          disabled
        />
      </div>

      <div style={{ textAlign: "right" }}>
        <button
          type="button"
          onClick={() => onClickCreateReviewButton()}
          className="button grey-button-small"
          style={{ marginRight: "5px" }}
        >
          SUBMIT
        </button>
        <button
          type="button"
          onClick={() => {
            setCreateIsOpen(false);
          }}
          className="button grey-button-small"
        >
          BACK
        </button>
      </div>
    </div>
  );
};

export default Create;
