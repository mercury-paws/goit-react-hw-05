import axios from "axios";

//faux-api.com/api/v1/films_13649321056340447/<id>

axios.defaults.baseURL = "https://faux-api.com/api/v1/films_13649321056340447";

export const fetchLikedFilms = async (movieId) => {
  const response = await axios.get(`${movieId}`);
  //   return response.data.results;
  console.log(response);
};
