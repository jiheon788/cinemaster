import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import allMovieReducer from "./allMovieReducer";

export default combineReducers({
  movie: movieReducer,
  allMovie: allMovieReducer,
});
