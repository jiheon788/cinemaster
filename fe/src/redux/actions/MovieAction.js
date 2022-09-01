import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });
      const popularMovieApi = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const topRatedApi = api.get(
        `movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const upComingApi = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );
      const genreApi = api.get(
        `genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

      //
      let [popularMovies, topRatedMovies, upComingMovies, genreList] =
        await Promise.all([
          popularMovieApi,
          topRatedApi,
          upComingApi,
          genreApi,
        ]);
      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upComingMovies: upComingMovies.data,
          genreList: genreList.data.genres,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIES_FAILURE" });
    }
  };
}

function getAllMovies() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_ALL_MOVIES_REQUEST" });
      const popularMovieApi = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const topRatedApi = api.get(
        `movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const upComingApi = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      //
      let [popularMovies, topRatedMovies, upComingMovies] = await Promise.all([
        popularMovieApi,
        topRatedApi,
        upComingApi,
      ]);

      const arr = [
        ...popularMovies.data.results,
        ...topRatedMovies.data.results,
        ...upComingMovies.data.results,
      ];

      /*
       * popularMovies, topRatedMovies, upComingMovies 겹치는 ID존재해서
       * 중복 제거 함
       */
      var allMovies = [];
      var flag = true;
      for (var i = 0; i < arr.length; i++) {
        flag = true;
        // 향상된 for문 사용 가능
        for (var value in allMovies) {
          if (allMovies[value].id === arr[i].id) {
            flag = false;
          }
        }

        if (flag) {
          allMovies.push(arr[i]);
        }
      }
      //develop-sense.tistory.com/entry/JavaScript-배열-key-중복-제거-ft동일-키-배열-합치기 [특별한 일상:티스토리]
      dispatch({
        type: "GET_ALL_MOVIES_SUCCESS",
        payload: {
          allMovies: allMovies,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_ALL_MOVIES_FAILURE" });
    }
  };
}

export const movieAction = {
  getMovies,
  getAllMovies,
};
