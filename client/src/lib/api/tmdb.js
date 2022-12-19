import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { "content-type": "application/json" },
});

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("response error", error);
    return Promise.reject(error);
  }
);

export const getPopularMovies = apiClient.get(
  `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
);
export const getTopRatedMovies = apiClient.get(
  `movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
);
export const getUpComingMovies = apiClient.get(
  `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
);
export const getGenreMovies = apiClient.get(
  `genre/movie/list?api_key=${API_KEY}&language=en-US`
);

