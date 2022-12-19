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

export const getRecommendationedMovies = async (movieId) => {
  return await apiClient({
    method: "get",
    url: `/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
  })
}

export const getSimilarMovies = async (movieId) => {
  return await apiClient({
    method: "get",
    url: `movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
  })
}

export const getMovieInfoByMovieId = async(movieId) => {
  return await apiClient({
    method: "get",
    url: `/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  })
}

export const getTrailerByMovieId = async(movieId) => {
  return await apiClient({
    method: "get",
    url: `/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  })
}

