import { getPopularMovies, getTopRatedMovies, getUpComingMovies } from "../../lib/api/tmdb"

function getMovies() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });
      let [popularMovies, topRatedMovies, upComingMovies] =
        await Promise.all([
          getPopularMovies,
          getTopRatedMovies,
          getUpComingMovies,
        ]);
      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upComingMovies: upComingMovies.data,
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

      let [popularMovies, topRatedMovies, upComingMovies] = await Promise.all([
        getPopularMovies,
        getTopRatedMovies,
        getUpComingMovies,
      ]);
      
      const arr = [
        ...popularMovies.data.results,
        ...topRatedMovies.data.results,
        ...upComingMovies.data.results,
      ];

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
      
      dispatch({
        type: "GET_ALL_MOVIES_SUCCESS",
        payload: {
          allMovies
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
