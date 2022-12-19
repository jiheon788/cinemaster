import axios from "axios";

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

export default apiClient;
