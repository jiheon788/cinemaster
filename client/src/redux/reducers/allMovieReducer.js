let initialState = {
  allMovies: {},
  loading: true,
};
function allMovieReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_ALL_MOVIES_REQUEST":
      return { ...state, loading: true };
    case "GET_ALL_MOVIES_SUCCESS":
      return {
        ...state,
        allMovies: payload.allMovies,
        loading: false,
      };
    case "GET_ALL_MOVIES_FAILURE":
      return { ...state, loading: false };
    default:
      return { ...state };
  }
}

export default allMovieReducer;
